import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Build a stub Supabase client that resolves with safe empty data instead of
 * throwing at module-load time. This prevents the entire app from white-screening
 * when env vars are missing on a given deployment (e.g. preview/CI).
 */
function createStubClient(): SupabaseClient {
  const reason = 'Supabase is not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY).';
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn(reason);
  }

  const noopQuery: any = {
    select: () => noopQuery,
    insert: () => noopQuery,
    update: () => noopQuery,
    delete: () => noopQuery,
    eq: () => noopQuery,
    neq: () => noopQuery,
    gt: () => noopQuery,
    gte: () => noopQuery,
    lt: () => noopQuery,
    lte: () => noopQuery,
    like: () => noopQuery,
    ilike: () => noopQuery,
    in: () => noopQuery,
    order: () => noopQuery,
    limit: () => noopQuery,
    single: () => Promise.resolve({ data: null, error: { message: reason } }),
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
    then: (resolve: any) => resolve({ data: [], error: null, count: 0 }),
  };

  const stub: any = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (_cb: any) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signOut: async () => ({ error: null }),
      updateUser: async () => ({ data: null, error: { message: reason } }),
      signInWithPassword: async () => ({ data: null, error: { message: reason } }),
      signUp: async () => ({ data: null, error: { message: reason } }),
    },
    from: () => noopQuery,
  };

  return stub as SupabaseClient;
}

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createStubClient();
