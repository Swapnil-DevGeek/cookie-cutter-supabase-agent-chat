import { createClient } from '@supabase/supabase-js';
import { AUTH_CONFIG } from '@/config';

// Get Supabase configuration from centralized config
const supabaseUrl = AUTH_CONFIG.SUPABASE_URL;
const supabaseAnonKey = AUTH_CONFIG.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 