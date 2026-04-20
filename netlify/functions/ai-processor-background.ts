import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Background functions natively run asynchronously on Netlify
export const handler: Handler = async (event, context) => {
  console.log("Processing AI job in background...", event.body);

  // Poll job queue, decrypt keys, structure prompt, call OpenAI/Anthropic
  // Write result back to Supabase
};
