
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  theme: string;
  className?: string;
  intensity?: number;
};

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ 
  theme,
  className,
  intensity = 0.3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with device pixel ratio
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    
    // Particle settings based on theme
    let particleColor: string;
    let primaryColor: string;
    let secondaryColor: string;
    let tertiaryColor: string;
    let particleCount = 100;
    let particleSize = 3;
    let particleSpeed = 0.5;
    let connectDistance = 150;
    
    switch (theme) {
      case 'cosmic':
        particleColor = '#8B5CF6';
        primaryColor = '#3B82F6';
        secondaryColor = '#8B5CF6';
        tertiaryColor = '#7C3AED';
        particleCount = 100;
        break;
      case 'neon':
        particleColor = '#3B82F6';
        primaryColor = '#2563EB';
        secondaryColor = '#60A5FA';
        tertiaryColor = '#1D4ED8';
        particleCount = 120;
        break;
      case 'aurora':
        particleColor = '#10B981';
        primaryColor = '#059669';
        secondaryColor = '#34D399';
        tertiaryColor = '#047857';
        particleCount = 80;
        break;
      case 'galaxy':
        particleColor = '#7B68EE';
        primaryColor = '#8B5CF6';
        secondaryColor = '#C4B5FD';
        tertiaryColor = '#6D28D9';
        particleCount = 130;
        break;
      case 'retrowave':
        particleColor = '#EC4899';
        primaryColor = '#BE185D';
        secondaryColor = '#F472B6';
        tertiaryColor = '#DB2777';
        particleCount = 110;
        break;
      default:
        particleColor = '#8B5CF6';
        primaryColor = '#3B82F6';
        secondaryColor = '#8B5CF6';
        tertiaryColor = '#7C3AED';
        particleCount = 100;
    }
    
    // Create particles
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      originalSize: number;
      pulsate: boolean;
      pulsateSpeed: number;
      pulsateDirection: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.originalSize = (Math.random() * particleSize) + 0.5;
        this.size = this.originalSize;
        
        // Randomly choose a color from the theme palette
        const colors = [particleColor, primaryColor, secondaryColor, tertiaryColor];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Add pulsating effect to some particles
        this.pulsate = Math.random() > 0.7;
        this.pulsateSpeed = Math.random() * 0.03 + 0.01;
        this.pulsateDirection = 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Pulsate effect
        if (this.pulsate) {
          this.size += this.pulsateDirection * this.pulsateSpeed;
          
          if (this.size > this.originalSize * 1.5) {
            this.pulsateDirection = -1;
          } else if (this.size < this.originalSize * 0.5) {
            this.pulsateDirection = 1;
          }
        }
        
        // Bounce off edges with slight randomization
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx * (0.9 + Math.random() * 0.2);
          this.x = this.x < 0 ? 0 : canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy = -this.vy * (0.9 + Math.random() * 0.2);
          this.y = this.y < 0 ? 0 : canvas.height;
        }
        
        // Slight random movement
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;
        
        // Dampen velocity
        this.vx *= 0.995;
        this.vy *= 0.995;
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3 * intensity;
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.7 * intensity;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particle array
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw connections between particles
    const drawConnections = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            );
            
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Calculate opacity based on distance
            const opacity = (1 - (distance / connectDistance)) * 0.4 * intensity;
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      drawConnections();
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      
      // Reset particle positions on resize
      for (let i = 0; i < particles.length; i++) {
        particles[i].x = Math.random() * canvas.width;
        particles[i].y = Math.random() * canvas.height;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, intensity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn(
        "fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30",
        className
      )} 
    />
  );
};

export default AmbientBackground;
