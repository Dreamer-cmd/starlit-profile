
import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  glowIntensity: number;
  pulsate: boolean;
  pulsateSpeed: number;
  pulsateDirection: number;
};

type ParticleBackgroundProps = {
  className?: string;
  density?: number;
  interactivity?: boolean;
  colorPalette?: string[];
};

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  className,
  density = 70,
  interactivity = true,
  colorPalette = ["#3B82F6", "#8B5CF6", "#10B981", "#F97316", "#FFFFFF"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const isActive = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
      }
    };

    const createGradient = (particle: Particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x, 
        particle.y, 
        0,
        particle.x, 
        particle.y, 
        particle.size * particle.glowIntensity
      );
      
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      return gradient;
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / (15000 / density));
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const glowFactor = size < 1.5 ? 2 : 3; // smaller particles glow less
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          glowIntensity: Math.random() * 2 + glowFactor,
          pulsate: Math.random() > 0.7, // 30% of particles will pulsate
          pulsateSpeed: Math.random() * 0.01 + 0.005,
          pulsateDirection: 1,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        // Update pulsating effect
        if (particle.pulsate) {
          particle.opacity += particle.pulsateSpeed * particle.pulsateDirection;
          
          if (particle.opacity >= 0.8) {
            particle.pulsateDirection = -1;
          } else if (particle.opacity <= 0.2) {
            particle.pulsateDirection = 1;
          }
        }
        
        // Draw glow effect
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.fillStyle = createGradient(particle);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.glowIntensity, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
    };

    const connectParticles = () => {
      if (!ctx) return;
      
      const maxDistance = 120;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Create gradient for the connection
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color.replace(')', ', ' + (0.1 * (1 - distance / maxDistance)) + ')').replace('rgb', 'rgba'));
            gradient.addColorStop(1, p2.color.replace(')', ', ' + (0.1 * (1 - distance / maxDistance)) + ')').replace('rgb', 'rgba'));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      if (!canvas) return;
      
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Mouse interaction
        if (interactivity) {
          const dx = particle.x - mousePosition.current.x;
          const dy = particle.y - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            
            particle.speedX += forceDirectionX * force * 0.02;
            particle.speedY += forceDirectionY * force * 0.02;
          }
        }
        
        // Add some randomness to movement
        particle.speedX += (Math.random() - 0.5) * 0.01;
        particle.speedY += (Math.random() - 0.5) * 0.01;
        
        // Dampen speed
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
      });
    };

    const animate = () => {
      if (!isActive.current) return;
      
      updateParticles();
      drawParticles();
      connectParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleVisibilityChange = () => {
      isActive.current = document.visibilityState === 'visible';
      
      if (isActive.current && !animationFrameId.current) {
        animate();
      }
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Initialize everything
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      isActive.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [density, interactivity, colorPalette]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ""}`}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ParticleBackground;
