
import { createClient } from '@supabase/supabase-js';
import { SocialLink } from '@/components/SocialLinks';

// Supabase URL and key with fallback values for demo purposes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eclcwxnlkpaqvcyxrqgt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbGN3eG5sa3BhcXZjeXhycWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NDc4MzIsImV4cCI6MjAzMjIyMzgzMn0.tAYiwpnhYMGZ2TtkPMpVGIf-V_k-2a2hTqEAYgv-0PE';

// Define types for our tables
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileType;
        Insert: Omit<ProfileType, 'created_at' | 'updated_at'> & { 
          created_at?: string; 
          updated_at?: string 
        };
        Update: Partial<ProfileType>;
      };
      social_links: {
        Row: SocialLinkType;
        Insert: Omit<SocialLinkType, 'id' | 'created_at'> & { 
          id?: string; 
          created_at?: string 
        };
        Update: Partial<SocialLinkType>;
      };
    };
  };
};

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Profile type
export type ProfileType = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  status: string;
  bio: string;
  featured: string;
  theme: string;
  socialLinks?: SocialLink[];
  created_at?: string;
  updated_at?: string;
};

// Social link type
export type SocialLinkType = {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  created_at?: string;
};
