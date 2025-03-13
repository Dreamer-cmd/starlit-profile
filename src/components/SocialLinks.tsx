
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Twitter, 
  Instagram, 
  Github, 
  Twitch,
  Youtube,
  Linkedin,
  Link2,
  Globe,
  MessageCircle
} from "lucide-react";

export type SocialLink = {
  platform: string;
  url: string;
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className,
  size = "md",
}) => {
  // Function to determine icon based on URL or platform name
  const getPlatformIcon = (url: string, platform: string) => {
    const domain = url.toLowerCase();
    
    if (domain.includes("twitter") || domain.includes("x.com")) {
      return <Twitter size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("instagram")) {
      return <Instagram size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("github")) {
      return <Github size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("twitch")) {
      return <Twitch size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("youtube")) {
      return <Youtube size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("linkedin")) {
      return <Linkedin size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("discord") || platform.toLowerCase().includes("discord")) {
      return <MessageCircle size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else if (domain.includes("t.me") || platform.toLowerCase().includes("telegram")) {
      return <MessageCircle size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    } else {
      return <Globe size={size === "sm" ? 16 : size === "md" ? 20 : 24} />;
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-cosmic-foreground rounded-full bg-white/5 border border-white/10 transition-all duration-300",
            sizeClasses[size],
            "hover:border-accent/50 hover:text-accent hover:bg-accent/5 hover:scale-110 group"
          )}
          aria-label={`Visit ${link.platform}`}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {getPlatformIcon(link.url, link.platform)}
          </span>
          <span className="sr-only">{link.platform}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
