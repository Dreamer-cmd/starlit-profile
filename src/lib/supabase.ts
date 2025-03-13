
import { supabase } from '@/integrations/supabase/client';

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

export { supabase };
