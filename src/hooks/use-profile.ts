
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, ProfileType } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { SocialLink } from '@/components/SocialLinks';

export const useProfile = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const { data: socialLinks, error: socialLinksError } = await supabase
        .from('social_links')
        .select('*')
        .eq('profile_id', profiles?.id);

      if (socialLinksError) {
        throw new Error(socialLinksError.message);
      }

      return {
        ...profiles,
        socialLinks: socialLinks ? socialLinks.map(link => ({ 
          platform: link.platform, 
          url: link.url 
        })) as SocialLink[] : []
      };
    },
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
      // Update the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          username: profileData.username,
          avatar: profileData.avatar,
          status: profileData.status,
          bio: profileData.bio,
          featured: profileData.featured,
          theme: profileData.theme,
        })
        .eq('id', userId);

      if (profileError) {
        throw new Error(profileError.message);
      }

      // Delete existing social links
      const { error: deleteError } = await supabase
        .from('social_links')
        .delete()
        .eq('profile_id', userId);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      // Insert new social links
      if (profileData.socialLinks && profileData.socialLinks.length > 0) {
        const socialLinksToInsert = profileData.socialLinks.map(link => ({
          profile_id: userId,
          platform: link.platform,
          url: link.url,
        }));

        const { error: insertError } = await supabase
          .from('social_links')
          .insert(socialLinksToInsert);

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      return profileData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.username] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};
