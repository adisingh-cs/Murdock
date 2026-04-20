import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
// Netlify provides URL in production, but sometimes background functions need a direct hints.
// We prioritize PROD_URL (user set) > URL (automated) > localhost (dev).
const webhookUrl = process.env.PROD_URL || process.env.URL || 'http://localhost:8888';

if (webhookUrl.includes('localhost') && process.env.NODE_ENV === 'production') {
  console.warn("WARNING: webhookUrl defaulting to localhost in production. Background triggers might fail.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Missing Authorization header' }) };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const { module, language, input_json } = JSON.parse(event.body || '{}');

    if (!module || !input_json) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required parameters' }) };
    }

    // 1. Queue the job in the database with status 'queued'
    const { data: job, error: dbError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        module,
        language: language || 'en',
        input_json,
        status: 'queued',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError || !job) {
      console.error("DB Error creating job:", dbError);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to create job' }) };
    }

    // 2. Safely trigger the background function asynchronously
    // Background functions in Netlify are exposed under /.netlify/functions/[name]-background
    // We send a fire-and-forget HTTP request so the sync function can return immediately.
    try {
      fetch(`${webhookUrl}/.netlify/functions/ai-processor-background`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: job.job_id })
      }).catch(e => console.error("Background trigger fetch promise error:", e));
    } catch(e) {
      console.error("Failed to trigger background task natively:", e);
    }

    // 3. Return the jobId to the client immediately (< 1s)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Job queued successfully",
        job_id: job.job_id,
        status: 'queued'
      })
    };

  } catch (error: any) {
    console.error("Error in generate-request:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
