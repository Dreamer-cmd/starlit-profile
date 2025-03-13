
import React from "react";
import { cn } from "@/lib/utils";
import SocialLinks, { SocialLink } from "./SocialLinks";

type ProfileCardProps = {
  name: string;
  avatar: string;
  status?: string;
  bio?: string;
  socialLinks: SocialLink[];
  className?: string;
  theme?: "default" | "neon" | "cosmic" | "minimal";
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatar,
  status,
  bio,
  socialLinks,
  className,
  theme = "default",
}) => {
  // Theme-specific classes
  const themeClasses = {
    default: "glassmorphism border-white/10 bg-opacity-30",
    neon: "bg-cosmic-dark border-accent/50 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    cosmic: "bg-gradient-to-br from-cosmic to-cosmic-dark border-white/10",
    minimal: "bg-white/5 backdrop-blur-sm border-white/5",
  };

  const avatarClasses = {
    default: "border-2 border-white/20",
    neon: "border-2 border-accent shadow-[0_0_10px_rgba(139,92,246,0.7)]",
    cosmic: "border-2 border-white/30",
    minimal: "border border-white/20",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-500 max-w-md w-full",
        themeClasses[theme],
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className={cn(
              "w-24 h-24 rounded-full object-cover animate-float",
              avatarClasses[theme]
            )}
          />
          <div 
            className={cn(
              "absolute -inset-1 rounded-full opacity-20 blur-md -z-10",
              theme === "neon" && "bg-accent animate-pulse-glow",
              theme === "cosmic" && "bg-accent-gradient animate-rotate-slow",
              (theme === "default" || theme === "minimal") && "bg-white/20"
            )}
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold mb-1">
          {theme === "neon" ? (
            <span className="text-white glow">{name}</span>
          ) : theme === "cosmic" ? (
            <span className="text-gradient">{name}</span>
          ) : (
            <span>{name}</span>
          )}
        </h2>

        {/* Status */}
        {status && (
          <div className={cn(
            "px-3 py-1 rounded-full text-sm mb-4",
            theme === "neon" ? "bg-accent/20 text-accent" : 
            theme === "cosmic" ? "bg-white/10 text-cosmic-foreground" :
            "bg-white/10 text-cosmic-foreground"
          )}>
            {status}
          </div>
        )}

        {/* Bio */}
        {bio && (
          <p className="text-cosmic-foreground/80 mb-6 max-w-xs">{bio}</p>
        )}

        {/* Social Links */}
        <SocialLinks links={socialLinks} className="justify-center mt-2" />
      </div>
    </div>
  );
};

export default ProfileCard;
