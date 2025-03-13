
import React from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import AnimatedButton from "@/components/AnimatedButton";
import ProfileCard from "@/components/ProfileCard";
import { LogIn, Sparkles, Rocket, BookOpen, Edit, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  return (
    <div className="relative min-h-screen bg-cosmic overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <Navbar />

      <main className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden">
        <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gradient">
            Your Cosmic Identity
          </h1>
          <p className="text-lg md:text-xl text-cosmic-foreground/80 mb-8 max-w-2xl mx-auto">
            Create your stunning personal profile in the digital cosmos.
            Share a single link to showcase your identity, links, and creations.
          </p>
          
          {user ? (
            <div className="space-y-4">
              <AnimatedButton 
                onClick={() => navigate(`/${user.user_metadata.username || user.id}`)} 
                size="lg" 
                variant="primary" 
                className="w-full sm:w-auto"
                icon={<Rocket size={20} />}
              >
                My Profile
              </AnimatedButton>
              <div className="text-cosmic-foreground/80 mt-2">
                Customize and share your own cosmic identity
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatedButton 
                onClick={signIn} 
                size="lg" 
                variant="primary" 
                className="w-full sm:w-auto"
                icon={<LogIn size={20} />}
              >
                Sign in with Discord
              </AnimatedButton>
              <div className="text-cosmic-foreground/80 mt-2">
                Join the cosmic community and create your profile
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center mb-10 flex justify-center items-center gap-2">
            <Sparkles size={24} className="text-accent" />
            Featured Profiles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Stella Voyager",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                status: "Astro Explorer",
                bio: "Traversing the digital universe one star at a time. Photography, code, and cosmic wonders.",
                socialLinks: [
                  { platform: "Twitter", url: "https://twitter.com" },
                  { platform: "Instagram", url: "https://instagram.com" },
                ],
                theme: "neon"
              },
              {
                name: "Nova Tech",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                status: "Developer",
                bio: "Creating digital experiences that push boundaries. Full-stack developer with a passion for UI/UX.",
                socialLinks: [
                  { platform: "GitHub", url: "https://github.com" },
                  { platform: "LinkedIn", url: "https://linkedin.com" },
                ],
                theme: "cosmic"
              },
              {
                name: "Astral Artist",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
                status: "Digital Creator",
                bio: "Bringing imagination to life through digital art. Exploring the frontiers of creativity.",
                socialLinks: [
                  { platform: "Behance", url: "https://behance.net" },
                  { platform: "Instagram", url: "https://instagram.com" },
                ],
                theme: "aurora"
              }
            ].map((profile, index) => (
              <ProfileCard
                key={index}
                name={profile.name}
                avatar={profile.avatar}
                status={profile.status}
                bio={profile.bio}
                socialLinks={profile.socialLinks}
                theme={profile.theme as any}
                className="transform hover:scale-105 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div className="mt-20 w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center mb-10 flex justify-center items-center gap-2">
            <BookOpen size={24} className="text-accent" />
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <LogIn className="w-8 h-8 text-accent" />,
                title: "Sign In",
                description: "Connect with your Discord account for a seamless experience"
              },
              {
                icon: <Edit className="w-8 h-8 text-accent" />,
                title: "Customize",
                description: "Personalize your profile with themes, links, and your unique style"
              },
              {
                icon: <Share2 className="w-8 h-8 text-accent" />,
                title: "Share",
                description: "Share your profile link anywhere to showcase your digital presence"
              }
            ].map((step, index) => (
              <div key={index} className="bg-cosmic/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="bg-cosmic-dark/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-cosmic-foreground/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-cosmic-dark/80 border-t border-white/10 py-6 px-6 relative z-10">
        <div className="container mx-auto text-center text-sm text-cosmic-foreground/60">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gradient font-bold">x-bio</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
