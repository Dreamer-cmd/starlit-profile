
import { createClient } from '@supabase/supabase-js';

// Supabase URL и ключ
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eclcwxnlkpaqvcyxrqgt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbGN3eG5sa3BhcXZjeXhycWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NDc4MzIsImV4cCI6MjAzMjIyMzgzMn0.tAYiwpnhYMGZ2TtkPMpVGIf-V_k-2a2hTqEAYgv-0PE';

// Определяем типы таблиц
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

// Создаем типизированный клиент Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Типы для наших таблиц
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
