
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, ProfileType } from '@/lib/supabase';
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
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};
