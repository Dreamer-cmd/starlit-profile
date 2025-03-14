import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import SocialLinks, { SocialLink } from "@/components/SocialLinks";
import ProfileEditor from "@/components/ProfileEditor";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  Edit, 
  Share2, 
  Settings,
  Star,
  Rocket,
  MessageCircle,
  UserRoundPlus,
  Sparkles,
  BookOpen
} from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useAuth } from "@/context/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";

type ProfileTheme = "default" | "neon" | "cosmic" | "minimal" | "galaxy" | "aurora" | "retrowave";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const safeUsername = username || "stellar_coder";
  
  const { data: profileData, isLoading, error } = useProfile(safeUsername);
  const updateProfile = useUpdateProfile();
  
  const [theme, setTheme] = useState<ProfileTheme>("neon");
  
  useEffect(() => {
    if (profileData?.theme) {
      setTheme(profileData.theme as ProfileTheme);
    }
  }, [profileData]);

  const isOwner = true;

  const userData = profileData || {
    name: "",
    username: "",
    avatar: "",
    status: "",
    bio: "",
    featured: "",
    socialLinks: [] as SocialLink[],
  };

  const themeConfigs = {
    default: {
      bgClassName: "bg-cosmic bg-opacity-95",
      cardClassName: "glassmorphism border-white/10",
      textClassName: "text-cosmic-foreground",
      accentClassName: "bg-accent/20 text-accent",
      ambient: false,
    },
    neon: {
      bgClassName: "bg-cosmic-dark",
      cardClassName: "bg-cosmic-dark border-accent/50 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      textClassName: "text-white glow",
      accentClassName: "bg-accent/20 text-accent shadow-[0_0_10px_rgba(139,92,246,0.3)]",
      ambient: false,
    },
    cosmic: {
      bgClassName: "bg-gradient-to-br from-cosmic to-cosmic-dark",
      cardClassName: "bg-gradient-to-br from-cosmic-dark/80 to-cosmic-dark border-white/10",
      textClassName: "text-gradient",
      accentClassName: "bg-white/10 text-cosmic-foreground",
      ambient: true,
    },
    minimal: {
      bgClassName: "bg-cosmic",
      cardClassName: "bg-white/5 backdrop-blur-sm border-white/5",
      textClassName: "text-cosmic-foreground",
      accentClassName: "bg-white/10 text-cosmic-foreground",
      ambient: false,
    },
    galaxy: {
      bgClassName: "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
      cardClassName: "bg-black/30 backdrop-blur-md border-white/10",
      textClassName: "text-white",
      accentClassName: "bg-[#7b68ee]/20 text-[#7b68ee]",
      ambient: true,
    },
    aurora: {
      bgClassName: "bg-gradient-to-br from-[#000428] to-[#004e92]",
      cardClassName: "bg-black/20 backdrop-blur-md border-teal-500/30",
      textClassName: "text-teal-100",
      accentClassName: "bg-teal-500/20 text-teal-300",
      ambient: true,
    },
    retrowave: {
      bgClassName: "bg-gradient-to-br from-[#3f0d40] to-[#2b0640]",
      cardClassName: "bg-black/30 backdrop-blur-md border-[#ff00ff]/30",
      textClassName: "text-[#ff9ed2]",
      accentClassName: "bg-[#ff00ff]/20 text-[#ff9ed2]",
      ambient: true,
    }
  };

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          toast({
            title: "Link copied!",
            description: "Profile link copied to clipboard",
          });
        })
        .catch(console.error);
    }
  };

  const handleSaveProfile = (updatedData: typeof userData) => {
    updateProfile.mutate({
      profileData: {
        ...updatedData,
        theme,
      },
      userId: userData.id || "demo-user-id",
    });
    
    setIsEditing(false);
  };

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

        {theme === "galaxy" && (
          <>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534790108377-be9c29b29330?q=80&w=2071')] bg-cover bg-center opacity-20 z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,104,238,0.2),transparent_70%)] z-0" />
          </>
        )}

        {theme === "aurora" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(4,120,87,0.2),transparent_70%)] z-0" />
        )}

        {theme === "retrowave" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,255,0.2),transparent_70%)] z-0" />
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cosmic">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-cosmic-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cosmic">
        <div className="text-center max-w-md p-6 bg-cosmic-dark rounded-lg border border-white/10">
          <h2 className="text-xl font-bold text-white mb-2">Profile Not Found</h2>
          <p className="text-cosmic-foreground/80 mb-4">The profile you're looking for doesn't seem to exist.</p>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground className={theme === "neon" ? "opacity-70" : theme === "cosmic" ? "opacity-50" : "opacity-30"} />
      <AmbientBackground theme={theme} />
      <Navbar />
      
      <main className={cn(
        "flex-1 pt-24 pb-12 px-6 relative overflow-hidden transition-colors duration-500",
        themeConfigs[theme].bgClassName
      )}>
        {renderCosmicBackground()}
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <Link 
              to="/"
              className="inline-flex items-center text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="ml-1">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <AnimatedButton 
                icon={<Share2 size={16} />} 
                variant="outline" 
                size="sm"
                onClick={handleShare}
              >
                Share
              </AnimatedButton>
              
              {isOwner && (
                <>
                  <AnimatedButton 
                    icon={<Edit size={16} />} 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </AnimatedButton>
                  <AnimatedButton 
                    icon={<Settings size={16} />} 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </AnimatedButton>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className={cn(
                "rounded-2xl p-8 transition-all duration-500 h-full",
                themeConfigs[theme].cardClassName
              )}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt={`${userData.name}'s avatar`}
                      className={cn(
                        "w-32 h-32 rounded-full object-cover border-2",
                        theme === "neon" ? "border-accent shadow-[0_0_10px_rgba(139,92,246,0.7)]" : 
                        theme === "cosmic" ? "border-white/30" : 
                        theme === "aurora" ? "border-teal-500/50" :
                        theme === "retrowave" ? "border-[#ff00ff]/50" :
                        theme === "galaxy" ? "border-[#7b68ee]/50" :
                        "border-white/20"
                      )}
                    />
                    <div 
                      className={cn(
                        "absolute -inset-2 rounded-full opacity-20 blur-md -z-10",
                        theme === "neon" && "bg-accent animate-pulse-glow",
                        theme === "cosmic" && "bg-accent-gradient animate-rotate-slow",
                        theme === "aurora" && "bg-teal-500/50 animate-pulse-glow",
                        theme === "retrowave" && "bg-[#ff00ff]/50 animate-pulse-glow",
                        theme === "galaxy" && "bg-[#7b68ee]/50 animate-pulse-glow",
                        (theme === "default" || theme === "minimal") && "bg-white/20"
                      )}
                    />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h1 className={cn(
                      "text-3xl md:text-4xl font-bold mb-2",
                      themeConfigs[theme].textClassName
                    )}>
                      {userData.name}
                    </h1>
                    
                    <div className={cn(
                      "inline-block px-3 py-1 rounded-full text-sm mb-4",
                      themeConfigs[theme].accentClassName
                    )}>
                      {userData.status}
                    </div>
                    
                    <p className="text-cosmic-foreground/80 mb-6 max-w-lg leading-relaxed">
                      {userData.bio}
                    </p>
                    
                    <SocialLinks 
                      links={userData.socialLinks || []} 
                      className="justify-center md:justify-start"
                    />
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h2 className={cn(
                    "text-xl font-bold mb-4 flex items-center gap-2",
                    themeConfigs[theme].textClassName
                  )}>
                    <Star size={18} className={theme === "aurora" ? "text-teal-300" : theme === "retrowave" ? "text-[#ff9ed2]" : ""} />
                    Featured
                  </h2>
                  <div className={cn(
                    "p-6 rounded-xl mb-8",
                    theme === "neon" ? "bg-accent/5 border border-accent/30" : 
                    theme === "cosmic" ? "bg-white/5 border border-white/10" : 
                    theme === "aurora" ? "bg-teal-500/5 border border-teal-500/30" :
                    theme === "retrowave" ? "bg-[#ff00ff]/5 border border-[#ff00ff]/30" :
                    theme === "galaxy" ? "bg-[#7b68ee]/5 border border-[#7b68ee]/30" :
                    "bg-white/5 border border-white/10"
                  )}>
                    <p className="text-cosmic-foreground/90 leading-relaxed">
                      {userData.featured}
                    </p>
                  </div>

                  <h2 className={cn(
                    "text-xl font-bold mb-6 flex items-center gap-2",
                    themeConfigs[theme].textClassName
                  )}>
                    <Rocket size={18} className={theme === "aurora" ? "text-teal-300" : theme === "retrowave" ? "text-[#ff9ed2]" : ""} />
                    Projects & Achievements
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[
                      {
                        title: "Project Alpha",
                        description: "A revolutionary space travel app that will change how we think about interstellar journeys.",
                        icon: <Rocket size={16} />
                      },
                      {
                        title: "Cosmic Community",
                        description: "Building a community of space enthusiasts and explorers.",
                        icon: <UserRoundPlus size={16} />
                      },
                      {
                        title: "Stellar Design",
                        description: "Award-winning UI/UX design for space-themed applications.",
                        icon: <Sparkles size={16} />
                      },
                      {
                        title: "Space Chronicles",
                        description: "A blog about space exploration and the future of humanity.",
                        icon: <BookOpen size={16} />
                      }
                    ].map((project, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-300 hover:translate-y-[-2px]",
                          theme === "neon" ? "border-accent/20 bg-accent/5" : 
                          theme === "cosmic" ? "border-white/10 bg-white/5" : 
                          theme === "aurora" ? "border-teal-500/20 bg-teal-500/5" :
                          theme === "retrowave" ? "border-[#ff00ff]/20 bg-[#ff00ff]/5" :
                          theme === "galaxy" ? "border-[#7b68ee]/20 bg-[#7b68ee]/5" :
                          "border-white/10 bg-white/5"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "p-2 rounded-full",
                            theme === "neon" ? "bg-accent/10" : 
                            theme === "cosmic" ? "bg-white/10" : 
                            theme === "aurora" ? "bg-teal-500/10" :
                            theme === "retrowave" ? "bg-[#ff00ff]/10" :
                            theme === "galaxy" ? "bg-[#7b68ee]/10" :
                            "bg-white/10"
                          )}>
                            {project.icon}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{project.title}</h3>
                            <p className="text-cosmic-foreground/70 text-sm">{project.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className={cn(
                    "text-xl font-bold mb-4 flex items-center gap-2",
                    themeConfigs[theme].textClassName
                  )}>
                    <MessageCircle size={18} className={theme === "aurora" ? "text-teal-300" : theme === "retrowave" ? "text-[#ff9ed2]" : ""} />
                    Connect
                  </h2>
                  <p className="text-cosmic-foreground/80 leading-relaxed mb-4">
                    Feel free to reach out for collaborations, questions, or just to say hello! I'm always open to connecting with fellow cosmic explorers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <AnimatedButton
                      icon={<MessageCircle size={16} />}
                      variant="primary"
                      size="md"
                    >
                      Send Message
                    </AnimatedButton>
                    <AnimatedButton
                      icon={<UserRoundPlus size={16} />}
                      variant="outline"
                      size="md"
                    >
                      Follow
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
            
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
                  {(["default", "neon", "cosmic", "minimal", "galaxy", "aurora", "retrowave"] as ProfileTheme[]).map((themeOption) => (
                    <button
                      key={themeOption}
                      className={cn(
                        "w-full p-3 rounded-xl border transition-all duration-300 flex items-center",
                        theme === themeOption 
                          ? themeOption === "aurora" ? "border-teal-500 bg-teal-500/10" :
                            themeOption === "retrowave" ? "border-[#ff00ff] bg-[#ff00ff]/10" :
                            themeOption === "galaxy" ? "border-[#7b68ee] bg-[#7b68ee]/10" :
                            "border-accent bg-accent/10" 
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
                          themeOption === "galaxy" && "bg-gradient-to-br from-[#7b68ee] to-[#24243e]",
                          themeOption === "aurora" && "bg-gradient-to-br from-teal-300 to-teal-500",
                          themeOption === "retrowave" && "bg-gradient-to-br from-[#ff9ed2] to-[#ff00ff]",
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
                    Profile Stats
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cosmic-foreground/70">Profile Views</span>
                      <span className="font-medium">2,547</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cosmic-foreground/70">Followers</span>
                      <span className="font-medium">328</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cosmic-foreground/70">Following</span>
                      <span className="font-medium">142</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cosmic-foreground/70">Joined</span>
                      <span className="font-medium">Apr 2023</span>
                    </div>
                  </div>
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<Edit size={16} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className={cn(
        "py-6 px-6 border-t transition-colors duration-500",
        theme === "neon" ? "bg-cosmic-dark border-accent/30" :
        theme === "cosmic" ? "bg-cosmic-dark/90 border-white/10" :
        theme === "minimal" ? "bg-cosmic-dark/50 backdrop-blur-md border-white/5" :
        theme === "aurora" ? "bg-[#000428]/90 border-teal-500/20" :
        theme === "retrowave" ? "bg-[#3f0d40]/90 border-[#ff00ff]/20" :
        theme === "galaxy" ? "bg-[#0f0c29]/90 border-[#7b68ee]/20" :
        "bg-cosmic-dark/80 border-white/10"
      )}>
        <div className="container mx-auto text-center text-sm text-cosmic-foreground/60">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gradient font-bold">x-bio</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <Link to="/" className="hover:text-cosmic-foreground transition-colors">Create your own</Link>
          </div>
        </div>
      </footer>

      <Dialog open={isEditing && isOwner} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px] bg-cosmic-dark border-white/10">
          <ProfileEditor 
            userData={userData} 
            onSave={handleSaveProfile} 
            onCancel={() => setIsEditing(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
