import { createClient } from '@supabase/supabase-js';

/**
 * STEMwise Supabase Client Initialization
 * Used for Authentication and Database context.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration in .env file!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
