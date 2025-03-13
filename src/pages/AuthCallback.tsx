
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        navigate('/');
        return;
      }

      if (data?.session?.user) {
        // Check if user profile exists, if not create one
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        if (!profile) {
          // Create profile with default values
          const username = data.session.user.email?.split('@')[0] || `user_${Math.random().toString(36).substring(2, 7)}`;
          await supabase.from('profiles').insert({
            id: data.session.user.id,
            username: username,
            name: data.session.user.user_metadata.full_name || username,
            avatar: data.session.user.user_metadata.avatar_url || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
            status: "New Explorer",
            bio: "Just joined x-bio!",
            featured: "",
            theme: "cosmic",
          });
        }

        navigate(`/${profile?.username || username}`);
      } else {
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cosmic">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gradient mb-4">Processing login...</h1>
        <div className="w-16 h-16 border-t-4 border-accent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
