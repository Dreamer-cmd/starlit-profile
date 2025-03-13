
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  type = "button",
  loading = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative overflow-hidden rounded-full font-medium transition-all duration-300 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-accent-gradient hover:brightness-110 text-white border border-white/10",
    secondary: "bg-secondary hover:bg-secondary/80 text-white border border-white/10",
    outline: "bg-transparent border border-accent/50 hover:border-accent text-accent hover:bg-accent/5",
    ghost: "bg-transparent hover:bg-white/5 text-cosmic-foreground",
  };
  
  const sizeStyles = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "group",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        loading && "opacity-80 cursor-wait",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <span 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 rounded-full",
          isHovered && "opacity-100"
        )}
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-[-2px]">{icon}</span>}
        <span className="transition-transform duration-300 group-hover:translate-x-[1px]">{children}</span>
      </span>

      {/* Shine effect */}
      <span 
        className={cn(
          "absolute top-0 left-0 w-full h-full",
          isHovered ? "animate-background-pan" : ""
        )}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          backgroundSize: "200% 100%",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </button>
  );
};

export default AnimatedButton;
