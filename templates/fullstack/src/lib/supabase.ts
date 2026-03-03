import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabaseUrl = env.get('VITE_SUPABASE_URL');
const supabaseAnonKey = env.get('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
