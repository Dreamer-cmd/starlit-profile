
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, ProfileType, formatSupabaseError } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { SocialLink } from '@/components/SocialLinks';

export const useProfile = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      try {
        // Simulating a profile fetch without actually querying Supabase
        console.log(`Fetching profile for ${username}`);
        
        // Return a demo profile for stellar_coder
        if (username === 'stellar_coder') {
          return {
            id: 'demo-user-id',
            name: 'Stellar Coder',
            username: 'stellar_coder',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'Full-Stack Developer',
            bio: 'Building the future with code. React enthusiast and open source contributor.',
            featured: 'Currently working on a revolutionary space travel app that will change how we think about interstellar journeys.',
            theme: 'neon',
            socialLinks: [
              { platform: 'GitHub', url: 'https://github.com' },
              { platform: 'LinkedIn', url: 'https://linkedin.com' },
              { platform: 'Twitter', url: 'https://twitter.com' },
              { platform: 'Instagram', url: 'https://instagram.com' },
            ] as SocialLink[]
          };
        }
        
        // You could add more demo profiles here for testing
        if (username === 'cosmic_dev') {
          return {
            id: 'cosmic-dev-id',
            name: 'Cosmic Developer',
            username: 'cosmic_dev',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'UI/UX Designer',
            bio: 'Creating beautiful interfaces that users love. Design systems enthusiast.',
            featured: 'Just launched a new design system for enterprise applications.',
            theme: 'cosmic',
            socialLinks: [
              { platform: 'Dribbble', url: 'https://dribbble.com' },
              { platform: 'Behance', url: 'https://behance.net' },
            ] as SocialLink[]
          };
        }
        
        throw new Error('Profile not found');
      } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
    },
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      profileData,
      userId,
    }: {
      profileData: Partial<ProfileType> & { socialLinks: SocialLink[] };
      userId: string;
    }) => {
      // Demo implementation without actual Supabase calls
      console.log('Profile update requested:', profileData);
      
      // Simulate a successful update
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }, 500);
      
      return profileData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.username] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: formatSupabaseError(error) || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};

// Mock function to fetch all profiles for the explore page
export const useAllProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      // Return demo profiles
      return [
        {
          id: 'demo-user-id',
          name: 'Stellar Coder',
          username: 'stellar_coder',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          status: 'Full-Stack Developer',
          bio: 'Building the future with code. React enthusiast and open source contributor.',
          featured: 'Currently working on a revolutionary space travel app that will change how we think about interstellar journeys.',
          theme: 'neon',
        },
        {
          id: 'cosmic-dev-id',
          name: 'Cosmic Developer',
          username: 'cosmic_dev',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          status: 'UI/UX Designer',
          bio: 'Creating beautiful interfaces that users love. Design systems enthusiast.',
          featured: 'Just launched a new design system for enterprise applications.',
          theme: 'cosmic',
        },
        {
          id: 'tech-wizard-id',
          name: 'Tech Wizard',
          username: 'tech_wizard',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          status: 'DevOps Engineer',
          bio: 'Automating everything. Kubernetes enthusiast and cloud native advocate.',
          featured: 'Building the future of cloud infrastructure.',
          theme: 'aurora',
        }
      ];
    },
    retry: false,
  });
};
