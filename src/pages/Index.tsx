
import React, { useEffect, useRef, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedButton from "@/components/AnimatedButton";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { cn } from "@/lib/utils";
import { ArrowDown, LogIn, Rocket, Stars } from "lucide-react";

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Sample profile data for demo
  const sampleProfile = {
    name: "Cosmic Explorer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    status: "Exploring the universe",
    bio: "Digital astronaut sailing through the cosmic web. Building amazing things at the intersection of technology and creativity.",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "GitHub", url: "https://github.com" },
      { platform: "Discord", url: "https://discord.com" },
      { platform: "Instagram", url: "https://instagram.com" },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        setScrollPosition(parallaxRef.current.scrollTop);
      }
    };

    const parallaxElement = parallaxRef.current;
    if (parallaxElement) {
      parallaxElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (parallaxElement) {
        parallaxElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={parallaxRef} className="parallax-container custom-scrollbar">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="parallax-layer layer-0 min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-cosmic-dark opacity-30" />
        
        <div className="container mx-auto z-10 pt-24 pb-12 md:py-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left max-w-lg animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                The Future of Personal Branding
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Your <span className="text-gradient">Cosmic</span> Digital Identity
              </h1>
              <p className="text-lg md:text-xl text-cosmic-foreground/80 mb-8 leading-relaxed">
                Create stunning, animated biography pages that stand out in the digital universe. Connect with your audience through a seamless, stellar experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <AnimatedButton 
                  icon={<LogIn size={18} />} 
                  size="lg" 
                  variant="primary"
                >
                  Login with Discord
                </AnimatedButton>
                <AnimatedButton 
                  icon={<Stars size={18} />} 
                  size="lg" 
                  variant="outline"
                >
                  Explore Profiles
                </AnimatedButton>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute -inset-4 rounded-full bg-accent/10 blur-xl opacity-30" />
              <ProfileCard 
                name={sampleProfile.name}
                avatar={sampleProfile.avatar}
                status={sampleProfile.status}
                bio={sampleProfile.bio}
                socialLinks={sampleProfile.socialLinks}
                theme="cosmic"
                className="animate-scale-in"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <button 
            className="text-cosmic-foreground/70 hover:text-cosmic-foreground transition-colors"
            onClick={() => {
              if (parallaxRef.current) {
                parallaxRef.current.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }
            }}
          >
            <ArrowDown size={24} className="animate-bounce" />
            <span className="sr-only">Scroll Down</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="parallax-layer layer-0 min-h-screen flex items-center relative px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark to-cosmic opacity-50" />
        
        <div className="container mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Cosmic <span className="text-gradient">Features</span>
            </h2>
            <p className="text-lg text-cosmic-foreground/80 max-w-2xl mx-auto">
              Discover the stellar features that make x-bio the ultimate platform for your digital identity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Stunning Animations",
                description: "Captivate visitors with cosmic animations and interactive elements that bring your profile to life.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><Stars size={24} className="text-accent" /></div>,
              },
              {
                title: "Discord Integration",
                description: "Seamlessly log in with Discord and import your profile information and connections.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><MessageCircle size={24} className="text-accent" /></div>,
              },
              {
                title: "Custom Themes",
                description: "Choose from a variety of cosmic themes or create your own to match your personal brand.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><Palette size={24} className="text-accent" /></div>,
              },
              {
                title: "Social Links",
                description: "Connect all your social platforms in one place with beautifully animated icons.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><Link2 size={24} className="text-accent" /></div>,
              },
              {
                title: "Responsive Design",
                description: "Your cosmic profile looks amazing on all devices, from mobile phones to desktop screens.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><Smartphone size={24} className="text-accent" /></div>,
              },
              {
                title: "Personal Domain",
                description: "Get your own custom URL at x-bio.com/username to share with the world.",
                icon: <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4"><Globe size={24} className="text-accent" /></div>,
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "glassmorphism rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg border border-white/10",
                  "flex flex-col items-center text-center"
                )}
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-cosmic-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="parallax-layer layer-0 min-h-screen flex items-center relative px-6">
        <div className="absolute inset-0 bg-cosmic-dark opacity-60" />
        
        <div className="container mx-auto z-10 py-24">
          <div className="max-w-4xl mx-auto glassmorphism rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 gap-2">
                <Rocket size={16} />
                <span>Ready to Launch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Begin Your <span className="text-gradient">Cosmic Journey</span>
              </h2>
              <p className="text-lg text-cosmic-foreground/80 max-w-2xl mx-auto mb-8">
                Join the cosmic community and create your stunning biography page in minutes. Connect with others and showcase your digital identity.
              </p>
              <AnimatedButton 
                icon={<LogIn size={18} />} 
                size="lg" 
                variant="primary"
                className="mx-auto"
              >
                Login with Discord
              </AnimatedButton>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-cosmic-foreground/60 text-sm">
              <span>No credit card required</span>
              <span>•</span>
              <span>Free personal profiles</span>
              <span>•</span>
              <span>Premium themes available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="parallax-layer layer-0 relative px-6 py-12 bg-cosmic-dark/80">
        <div className="container mx-auto z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold tracking-tighter text-gradient">
                x-bio
              </div>
              <p className="text-sm text-cosmic-foreground/60 mt-2">
                Your cosmic digital identity
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <a href="#" className="text-cosmic-foreground/70 hover:text-cosmic-foreground text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-cosmic-foreground/70 hover:text-cosmic-foreground text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-cosmic-foreground/70 hover:text-cosmic-foreground text-sm">
                Contact
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-cosmic-foreground/60">
            © {new Date().getFullYear()} x-bio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Fix missing imports
import { MessageCircle, Palette, Smartphone, Globe, Link2 } from "lucide-react";

export default Index;
