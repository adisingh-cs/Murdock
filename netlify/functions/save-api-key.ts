import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { encryptKey } from './utils/crypto';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Must be configured in Netlify

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 1. Get Auth Header securely
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Missing Authorization header' }) };
    }

    const token = authHeader.replace('Bearer ', '');
    
    // 2. Validate user identity using Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const { provider, apiKey } = body;

    if (!provider || !apiKey) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Provider and API Key are required' }) };
    }

    // 3. Encrypt the raw key before it touches the DB
    const encryptedKey = encryptKey(apiKey);
    const keyHint = apiKey.slice(-4); // Store last 4 chars for UI display

    // 4. Save to DB using Upsert to handle updates
    const { error: dbError } = await supabase
      .from('api_keys')
      .upsert({
        user_id: user.id,
        provider,
        encrypted_key: encryptedKey,
        key_hint: keyHint,
        created_at: new Date().toISOString()
      }, { onConflict: 'user_id,provider' });

    if (dbError) {
      console.error("DB Error saving key:", dbError);
      return { statusCode: 500, body: JSON.stringify({ error: 'Database error saving key' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Key saved securely", key_hint: keyHint })
    };

  } catch (error: any) {
    console.error("Error in save-api-key:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
