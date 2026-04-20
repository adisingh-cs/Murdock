export type SupportedProvider = 'openai' | 'anthropic' | 'gemini' | 'groq' | 'openrouter';

export interface AIProviderConfig {
  provider: SupportedProvider;
  apiKey: string;
  model: string;
}

export interface GenerateDocumentParams {
  config: AIProviderConfig;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
}

export const generateDocument = async ({
  config,
  systemPrompt,
  userPrompt,
  temperature = 0.2 // Low temperature for deterministic legal text
}: GenerateDocumentParams): Promise<any> => {
  switch (config.provider) {
    case 'openai':
      return callOpenAI(config, systemPrompt, userPrompt, temperature);
    case 'anthropic':
      return callAnthropic(config, systemPrompt, userPrompt, temperature);
    case 'gemini':
      return callGemini(config, systemPrompt, userPrompt, temperature);
    case 'groq':
      return callGroq(config, systemPrompt, userPrompt, temperature);
    case 'openrouter':
      return callOpenRouter(config, systemPrompt, userPrompt, temperature);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
};

const callOpenAI = async (config: AIProviderConfig, systemPrompt: string, userPrompt: string, temperature: number) => {
  const res = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      response_format: { type: "json_object" }, // Guarantee strict JSON output
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  return JSON.parse(rawContent);
};

const callAnthropic = async (config: AIProviderConfig, systemPrompt: string, userPrompt: string, temperature: number) => {
  // Anthropic does not have a native json_object response format attribute yet, but system prompts restrict it well
  const modifiedSystemPrompt = `${systemPrompt}\n\nYou MUST return only a raw, valid JSON object. Do not wrap it in markdown code blocks.`;
  
  const res = await fetchWithRetry('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      max_tokens: 4000,
      system: modifiedSystemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const data = await res.json();
  const rawContent = data.content[0].text;
  
  try {
    return JSON.parse(rawContent);
  } catch(e) {
    // Sometimes it wraps in markdown anyway
    const stripped = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(stripped);
  }
};

const callGemini = async (config: AIProviderConfig, systemPrompt: string, userPrompt: string, temperature: number) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  
  const res = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature,
        responseMimeType: "application/json"
      }
    })
  });

  const data = await res.json();
  const rawContent = data.candidates[0].content.parts[0].text;
  return JSON.parse(rawContent);
};

const callGroq = async (config: AIProviderConfig, systemPrompt: string, userPrompt: string, temperature: number) => {
  const res = await fetchWithRetry('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  return JSON.parse(rawContent);
};

const callOpenRouter = async (config: AIProviderConfig, systemPrompt: string, userPrompt: string, temperature: number) => {
  const res = await fetchWithRetry('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'HTTP-Referer': 'https://murdock.ai', // Standard for OpenRouter
      'X-Title': 'Murdock Context Engine'
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  try {
     return JSON.parse(rawContent);
  } catch(e) {
     const stripped = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
     return JSON.parse(stripped);
  }
};

/**
 * Robust fetch wrapper with exponential backoff for transient AI API errors.
 */
async function fetchWithRetry(url: string, options: RequestInit, retries = 3, backoff = 1000): Promise<Response> {
  try {
    const res = await fetch(url, options);
    
    // Retry on 408 (Timeout), 429 (Rate Limit), or 5xx (Server Error)
    const transientErrors = [408, 429, 500, 502, 503, 504];
    
    if (!res.ok) {
      if (retries > 0 && transientErrors.includes(res.status)) {
        console.warn(`Transient error ${res.status} calling AI API. Retrying in ${backoff}ms... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`AI API Error (${res.status}): ${errBody.error?.message || res.statusText}`);
    }
    
    return res;
  } catch (error: any) {
    if (retries > 0 && (error.message.includes('fetch') || error.message.includes('network'))) {
      console.warn(`Network error calling AI API. Retrying in ${backoff}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}
