
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ParticleProps = {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
  speed?: number;
};

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity = 100,
  particleColor = "#FFFFFF",
  className,
  speed = 1,
}: ParticleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particles = useRef<Array<any>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      if (canvas && canvas.parentNode) {
        const parent = canvas.parentNode as HTMLElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const createParticles = () => {
      const particleDensityFactor = Math.min(dimensions.width, dimensions.height) / 1000;
      const particleCount = Math.floor(particleDensity * particleDensityFactor);
      
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    createParticles();

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      particles.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Loop particles around screen
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.y > dimensions.height) particle.y = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        
        // Random opacity change
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [minSize, maxSize, particleColor, particleDensity, dimensions, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("block", className)}
      style={{ background }}
    />
  );
};
