import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { decryptKey } from './utils/crypto';
import { generateDocument, SupportedProvider, AIProviderConfig } from './utils/ai-adapters';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
  // Parse payload depending on how it was invoked
  const body = JSON.parse(event.body || '{}');
  const { job_id } = body;

  if (!job_id) {
    console.error("Missing job_id in background function payload");
    return { statusCode: 400, body: "Missing job_id" };
  }

  try {
    // 1. Mark as processing
    await supabase.from('jobs').update({ status: 'processing', updated_at: new Date().toISOString() }).eq('job_id', job_id);

    // 2. Fetch Job details
    const { data: job, error: jobError } = await supabase.from('jobs').select('*').eq('job_id', job_id).single();
    if (jobError || !job) {
      throw new Error("Job not found");
    }

    // 3. Fetch User Settings & API Key
    // We'll prioritize BYOK.
    const defaultProvider = 'openrouter';

    // Attempt to fetch BYOK key for this provider
    const { data: keyRecord } = await supabase
      .from('api_keys')
      .select('encrypted_key')
      .eq('user_id', job.user_id)
      .eq('provider', defaultProvider)
      .single();

    let rawKey = '';

    if (keyRecord && keyRecord.encrypted_key) {
      rawKey = decryptKey(keyRecord.encrypted_key);
    } else {
      // Fallback to platform managed key (OpenRouter)
      rawKey = process.env.OPENROUTER_API_KEY || '';
      if (!rawKey) {
        throw new Error(`No BYOK key found and platform fallback (OPENROUTER_API_KEY) is missing.`);
      }
    }

    const providerConfig: AIProviderConfig = {
      provider: defaultProvider as SupportedProvider,
      apiKey: rawKey,
      model: process.env.OPENROUTER_MODEL || 'google/gemma-4-26b-a4b-it:free' 
    };

    // 4. Construct the prompt dynamically
    // A robust system uses the module configurations via a prompt builder
    const systemPrompt = `You are an expert Indian Legal Advisor drafting a ${job.module} document acting directly on behalf of the user. 
Follow the strict deterministic JSON format below to answer. 
You are permitted to flesh out narrative elements ("Facts" / "Grievance") based on shorthand hints provided.
Do not modify or hallucinate any dates, names, or values mapped to the specific user parameters.
Language requested: ${job.language}. Only generate the final content in this language.`;

    const userPrompt = `Here is the user-provided data JSON. Process and return the final document layout.
Data: ${JSON.stringify(job.input_json)}
Your job is to populate the 'AI_GENERATE' sections contextually relying strictly on Indian Law (${job.input_json?.context?.legal_framework || 'applicable laws'}).`;

    const startTime = Date.now();
    // 5. Call the Provider
    const aiResult = await generateDocument({
      config: providerConfig,
      systemPrompt,
      userPrompt
    });
    const latencyMs = Date.now() - startTime;

    // 6. Validate and mark complete
    const { error: updateError } = await supabase
      .from('jobs')
      .update({
        status: 'complete',
        result_json: aiResult,
        updated_at: new Date().toISOString()
      })
      .eq('job_id', job_id);

    if (updateError) {
      throw new Error(`Failed to save AI results: ${updateError.message}`);
    }

    console.log(`Successfully processed job ${job_id} in ${latencyMs}ms`);

    // Optionally: Write to doc_logs table for observability 
    await supabase.from('doc_logs').insert({
      user_id: job.user_id,
      job_id: job.job_id,
      module: job.module,
      language: job.language,
      provider: defaultProvider,
      latency_ms: latencyMs,
      success: true,
      created_at: new Date().toISOString()
    });

    return { statusCode: 200, body: "Success" };

  } catch (error: any) {
    console.error(`Error processing job ${job_id}:`, error);

    // Update job to failed
    await supabase.from('jobs').update({
      status: 'failed',
      error_message: error.message || 'Unknown error during execution',
      updated_at: new Date().toISOString()
    }).eq('job_id', job_id);

    return { statusCode: 500, body: "Failed" };
  }
};
