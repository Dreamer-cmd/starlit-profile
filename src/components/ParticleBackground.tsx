
import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

type ParticleBackgroundProps = {
  className?: string;
};

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.floor(window.innerWidth * 0.08); // Responsive particle count
      const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#FFFFFF"];

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add slight glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = particle.color;
      });
      
      ctx.globalAlpha = 1;
    };

    const connectParticles = () => {
      if (!ctx) return;
      
      const maxDistance = 100;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.globalAlpha = 0.2 * (1 - distance / maxDistance);
            ctx.strokeStyle = p1.color;
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
        const dx = particle.x - mousePosition.current.x;
        const dy = particle.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          
          particle.speedX += forceDirectionX * force * 0.02;
          particle.speedY += forceDirectionY * force * 0.02;
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
      updateParticles();
      drawParticles();
      connectParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ""}`}
    />
  );
};

export default ParticleBackground;
