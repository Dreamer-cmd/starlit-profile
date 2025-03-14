
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, ProfileType, formatSupabaseError } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { SocialLink } from '@/components/SocialLinks';

// Create a shared store for demo profile data to persist changes across components
let demoProfiles = {
  'stellar_coder': {
    id: 'demo-user-id',
    name: 'Stellar Coder',
    username: 'stellar_coder',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'Full-Stack Developer',
    bio: 'Building the future with code. React enthusiast and open source contributor.',
    featured: 'Currently working on a revolutionary space travel app that will change how we think about interstellar journeys.',
    theme: 'neon',
    socialLinks: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Instagram", url: "https://instagram.com" },
    ] as SocialLink[]
  },
  'cosmic_dev': {
    id: 'cosmic-dev-id',
    name: 'Cosmic Developer',
    username: 'cosmic_dev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'UI/UX Designer',
    bio: 'Creating beautiful interfaces that users love. Design systems enthusiast.',
    featured: 'Just launched a new design system for enterprise applications.',
    theme: 'cosmic',
    socialLinks: [
      { platform: "Dribbble", url: "https://dribbble.com" },
      { platform: "Behance", url: "https://behance.net" },
    ] as SocialLink[]
  },
  'tech_wizard': {
    id: 'tech-wizard-id',
    name: 'Tech Wizard',
    username: 'tech_wizard',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'DevOps Engineer',
    bio: 'Automating everything. Kubernetes enthusiast and cloud native advocate.',
    featured: 'Building the future of cloud infrastructure.',
    theme: 'galaxy',
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/techwizard" },
      { platform: "Twitter", url: "https://twitter.com/tech_wizard" },
    ] as SocialLink[]
  },
  'digital_artist': {
    id: 'digital-artist-id',
    name: 'Digital Artist',
    username: 'digital_artist',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'Creative Explorer',
    bio: 'Creating digital art across multiple mediums. Pushing the boundaries of imagination.',
    featured: 'My latest NFT collection explores the intersection of technology and emotion.',
    theme: 'retrowave',
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/digital_artist" },
      { platform: "ArtStation", url: "https://artstation.com/digital_artist" },
    ] as SocialLink[]
  },
  'nature_lover': {
    id: 'nature-lover-id',
    name: 'Nature Explorer',
    username: 'nature_lover',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'Environmental Photographer',
    bio: 'Documenting the beauty of our planet through photography and conservation efforts.',
    featured: 'My photo series "Hidden Wilderness" was featured in National Geographic.',
    theme: 'aurora',
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/nature_lover" },
      { platform: "Flickr", url: "https://flickr.com/nature_lover" },
    ] as SocialLink[]
  }
};

export const useProfile = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      try {
        console.log(`Fetching profile for ${username}`);
        
        // Return demo profile from our shared store if it exists
        if (demoProfiles[username]) {
          return demoProfiles[username];
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
      profileData: Partial<ProfileType> & { socialLinks?: SocialLink[] };
      userId: string;
    }) => {
      // For demonstration purposes, update our shared store
      console.log('Profile update requested:', profileData);
      
      // Find which demo profile to update
      const username = profileData.username as string;
      const existingProfile = Object.values(demoProfiles).find(
        profile => profile.id === userId || profile.username === username
      );
      
      if (existingProfile) {
        const updatedProfile = {
          ...existingProfile,
          ...profileData,
        };
        
        // Update the demo store
        demoProfiles[username] = updatedProfile;
        
        // Simulate success response
        setTimeout(() => {
          toast({
            title: "Success",
            description: "Profile updated successfully",
          });
        }, 500);
        
        return updatedProfile;
      }
      
      // Fallback to stellar_coder if no profile found
      demoProfiles['stellar_coder'] = {
        ...demoProfiles['stellar_coder'],
        ...profileData,
      };
      
      return demoProfiles['stellar_coder'];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.username] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
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

// Updated function to fetch all profiles for the explore page
export const useAllProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      // Return all demo profiles from our shared store
      return Object.values(demoProfiles);
    },
    retry: false,
  });
};
