
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import SocialLinks, { SocialLink } from "@/components/SocialLinks";
import { cn } from "@/lib/utils";
import { ChevronLeft, Edit, Share2 } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";

type ProfileTheme = "default" | "neon" | "cosmic" | "minimal";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [theme, setTheme] = useState<ProfileTheme>("default");

  // Sample user data for demo
  const userData = {
    name: username || "Cosmic User",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    status: "Digital Explorer",
    bio: "Passionate about technology and design. Building the future one pixel at a time. Always learning, always creating.",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "GitHub", url: "https://github.com" },
      { platform: "Discord", url: "https://discord.com" },
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
    ] as SocialLink[],
  };

  // Theme configuration
  const themeConfigs = {
    default: {
      bgClassName: "bg-cosmic bg-opacity-95",
      cardClassName: "glassmorphism border-white/10",
      textClassName: "text-cosmic-foreground",
      accentClassName: "bg-accent/20 text-accent",
    },
    neon: {
      bgClassName: "bg-cosmic-dark",
      cardClassName: "bg-cosmic-dark border-accent/50 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      textClassName: "text-white glow",
      accentClassName: "bg-accent/20 text-accent shadow-[0_0_10px_rgba(139,92,246,0.3)]",
    },
    cosmic: {
      bgClassName: "bg-gradient-to-br from-cosmic to-cosmic-dark",
      cardClassName: "bg-gradient-to-br from-cosmic-dark/80 to-cosmic-dark border-white/10",
      textClassName: "text-gradient",
      accentClassName: "bg-white/10 text-cosmic-foreground",
    },
    minimal: {
      bgClassName: "bg-cosmic",
      cardClassName: "bg-white/5 backdrop-blur-sm border-white/5",
      textClassName: "text-cosmic-foreground",
      accentClassName: "bg-white/10 text-cosmic-foreground",
    },
  };

  // Animation and parallax effect for planets
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cosmic background elements based on theme
  const renderCosmicBackground = () => {
    if (theme === "minimal") return null;

    return (
      <>
        <div 
          className="absolute w-40 h-40 rounded-full bg-accent/20 blur-3xl -top-20 -left-20 opacity-30 z-0 animate-pulse-glow"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute w-60 h-60 rounded-full bg-cosmic-glow/20 blur-3xl top-40 right-10 opacity-20 z-0 animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div 
          className="absolute w-36 h-36 rounded-full bg-cosmic-highlight/20 blur-3xl bottom-20 left-20 opacity-30 z-0 animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        
        {theme === "cosmic" && (
          <>
            <div 
              className="absolute w-6 h-6 rounded-full bg-cosmic-highlight blur-sm opacity-60 top-1/4 right-1/3 z-0 animate-float"
              style={{ animationDelay: "0s", transform: `translateY(${scrollY * 0.1}px)` }}
            />
            <div 
              className="absolute w-4 h-4 rounded-full bg-accent blur-sm opacity-60 bottom-1/3 left-1/4 z-0 animate-float"
              style={{ animationDelay: "1s", transform: `translateY(${scrollY * 0.2}px)` }}
            />
            <div 
              className="absolute w-8 h-8 rounded-full bg-cosmic-glow blur-sm opacity-50 top-1/3 left-1/3 z-0 animate-float"
              style={{ animationDelay: "2s", transform: `translateY(${scrollY * 0.15}px)` }}
            />
          </>
        )}
        
        {theme === "neon" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)] z-0" />
        )}
      </>
    );
  };

  // Share functionality (simulated)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userData.name}'s x-bio profile`,
        text: `Check out ${userData.name}'s profile on x-bio`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert("Profile link copied to clipboard!");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground className={theme === "neon" ? "opacity-70" : "opacity-40"} />
      <Navbar />
      
      <main className={cn(
        "flex-1 pt-24 pb-12 px-6 relative overflow-hidden transition-colors duration-500",
        themeConfigs[theme].bgClassName
      )}>
        {renderCosmicBackground()}
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <a 
              href="/"
              className="inline-flex items-center text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="ml-1">Back to Home</span>
            </a>
            
            <div className="flex items-center gap-2">
              <AnimatedButton 
                icon={<Share2 size={16} />} 
                variant="outline" 
                size="sm"
                onClick={handleShare}
              >
                Share
              </AnimatedButton>
              <AnimatedButton 
                icon={<Edit size={16} />} 
                variant="ghost" 
                size="sm"
              >
                Edit
              </AnimatedButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="md:col-span-2">
              <div className={cn(
                "rounded-2xl p-8 transition-all duration-500 h-full",
                themeConfigs[theme].cardClassName
              )}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt={`${userData.name}'s avatar`}
                      className={cn(
                        "w-32 h-32 rounded-full object-cover border-2",
                        theme === "neon" ? "border-accent shadow-[0_0_10px_rgba(139,92,246,0.7)]" : 
                        theme === "cosmic" ? "border-white/30" : 
                        "border-white/20"
                      )}
                    />
                    <div 
                      className={cn(
                        "absolute -inset-2 rounded-full opacity-20 blur-md -z-10",
                        theme === "neon" && "bg-accent animate-pulse-glow",
                        theme === "cosmic" && "bg-accent-gradient animate-rotate-slow",
                        (theme === "default" || theme === "minimal") && "bg-white/20"
                      )}
                    />
                  </div>
                  
                  <div className="text-center md:text-left">
                    {/* Name */}
                    <h1 className={cn(
                      "text-3xl md:text-4xl font-bold mb-2",
                      themeConfigs[theme].textClassName
                    )}>
                      {userData.name}
                    </h1>
                    
                    {/* Status */}
                    <div className={cn(
                      "inline-block px-3 py-1 rounded-full text-sm mb-4",
                      themeConfigs[theme].accentClassName
                    )}>
                      {userData.status}
                    </div>
                    
                    {/* Bio */}
                    <p className="text-cosmic-foreground/80 mb-6 max-w-lg leading-relaxed">
                      {userData.bio}
                    </p>
                    
                    {/* Social Links */}
                    <SocialLinks 
                      links={userData.socialLinks} 
                      className="justify-center md:justify-start"
                    />
                  </div>
                </div>
                
                {/* Additional profile content could go here */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h2 className={cn(
                    "text-xl font-bold mb-4",
                    themeConfigs[theme].textClassName
                  )}>
                    About Me
                  </h2>
                  <p className="text-cosmic-foreground/80 leading-relaxed mb-6">
                    This is a sample profile page for the x-bio platform. In a real implementation, users would be able to customize this section with their own content, including adding rich text, images, and other media.
                  </p>
                  <p className="text-cosmic-foreground/80 leading-relaxed">
                    The page features stunning animations, particle effects, and a cosmic theme that can be customized to match the user's personal brand.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Theme Selector */}
            <div className="md:col-span-1">
              <div className={cn(
                "rounded-2xl p-6 transition-all duration-500 sticky top-24",
                themeConfigs[theme].cardClassName
              )}>
                <h2 className={cn(
                  "text-xl font-bold mb-4",
                  themeConfigs[theme].textClassName
                )}>
                  Profile Theme
                </h2>
                
                <div className="space-y-3">
                  {(["default", "neon", "cosmic", "minimal"] as ProfileTheme[]).map((themeOption) => (
                    <button
                      key={themeOption}
                      className={cn(
                        "w-full p-3 rounded-xl border transition-all duration-300 flex items-center",
                        theme === themeOption 
                          ? "border-accent bg-accent/10" 
                          : "border-white/10 hover:border-white/30"
                      )}
                      onClick={() => setTheme(themeOption)}
                    >
                      <div 
                        className={cn(
                          "w-6 h-6 rounded-full mr-3",
                          themeOption === "default" && "bg-cosmic-foreground",
                          themeOption === "neon" && "bg-accent",
                          themeOption === "cosmic" && "bg-accent-gradient",
                          themeOption === "minimal" && "bg-white",
                        )}
                      />
                      <span className="capitalize">{themeOption}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className={cn(
                    "text-lg font-medium mb-3",
                    themeConfigs[theme].textClassName
                  )}>
                    Profile Settings
                  </h3>
                  <p className="text-cosmic-foreground/80 text-sm mb-4">
                    In the full application, logged-in users would be able to customize their profile and theme settings here.
                  </p>
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<Edit size={16} />}
                  >
                    Edit Profile
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={cn(
        "py-6 px-6 border-t transition-colors duration-500",
        theme === "neon" ? "bg-cosmic-dark border-accent/30" :
        theme === "cosmic" ? "bg-cosmic-dark/90 border-white/10" :
        theme === "minimal" ? "bg-cosmic-dark/50 backdrop-blur-md border-white/5" :
        "bg-cosmic-dark/80 border-white/10"
      )}>
        <div className="container mx-auto text-center text-sm text-cosmic-foreground/60">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gradient font-bold">x-bio</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <a href="/" className="hover:text-cosmic-foreground transition-colors">Create your own</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
