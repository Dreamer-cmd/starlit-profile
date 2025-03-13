
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key (these are public values)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type ProfileType = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  status: string;
  bio: string;
  featured: string;
  theme: string;
  created_at?: string;
  updated_at?: string;
};

export type SocialLinkType = {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  created_at?: string;
};
