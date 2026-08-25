import { createClient } from '@supabase/supabase-js';

let visitRequest: Promise<number | null> | null = null;

export const incrementVisitCounter = () => {
  if (visitRequest) return visitRequest;
  visitRequest = (async () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return null;
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data, error } = await client.rpc('increment_site_visits');
    if (error) return null;
    const count = Number(data);
    return Number.isFinite(count) && count >= 0 ? count : null;
  })();
  return visitRequest;
};
