
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  theme: string;
  className?: string;
};

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ 
  theme,
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle settings based on theme
    let particleColor: string;
    let backgroundGradient: [string, string];
    let particleCount = 100;
    let particleSize = 3;
    let particleSpeed = 0.5;
    let connectDistance = 150;
    
    switch (theme) {
      case 'cosmic':
        particleColor = '#8B5CF6';
        backgroundGradient = ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0)'];
        particleCount = 100;
        break;
      case 'galaxy':
        particleColor = '#7B68EE';
        backgroundGradient = ['rgba(15, 12, 41, 0)', 'rgba(15, 12, 41, 0)'];
        particleCount = 150;
        break;
      case 'aurora':
        particleColor = '#10B981';
        backgroundGradient = ['rgba(0, 4, 40, 0)', 'rgba(0, 4, 40, 0)'];
        particleCount = 80;
        break;
      case 'retrowave':
        particleColor = '#FF00FF';
        backgroundGradient = ['rgba(63, 13, 64, 0)', 'rgba(63, 13, 64, 0)'];
        particleCount = 120;
        break;
      default:
        particleColor = '#FFFFFF';
        backgroundGradient = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'];
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
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = (Math.random() * particleSize) + 0.5;
        this.color = particleColor;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create particle array
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw gradient background
    const drawBackground = () => {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, backgroundGradient[0]);
      gradient.addColorStop(1, backgroundGradient[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Draw connections between particles
    const drawConnections = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Calculate opacity based on distance
            const opacity = 1 - (distance / connectDistance);
            
            switch (theme) {
              case 'cosmic':
                ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
                break;
              case 'galaxy':
                ctx.strokeStyle = `rgba(123, 104, 238, ${opacity * 0.2})`;
                break;
              case 'aurora':
                ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.2})`;
                break;
              case 'retrowave':
                ctx.strokeStyle = `rgba(255, 0, 255, ${opacity * 0.2})`;
                break;
              default:
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      drawConnections();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn(
        "fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20",
        className
      )} 
    />
  );
};
