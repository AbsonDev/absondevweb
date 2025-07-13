'use client';

import { useEffect, useRef } from 'react';

const GlitchBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trails = useRef<Array<{ x: number; y: number; age: number; intensity: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Add trail point
      trails.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        age: 0,
        intensity: Math.random() * 0.5 + 0.5
      });

      // Limit trail length
      if (trails.current.length > 50) {
        trails.current.shift();
      }
    };

    // Touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };

      trails.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        age: 0,
        intensity: Math.random() * 0.3 + 0.3
      });

      if (trails.current.length > 30) {
        trails.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw trails
      trails.current.forEach((trail, index) => {
        trail.age += 1;

        // Create glitch effect
        if (trail.age < 30) {
          const glitchOffset = Math.random() * 4 - 2;
          const size = (30 - trail.age) * 0.3 * trail.intensity;

          // Main trail dot
          ctx.fillStyle = `rgba(249, 115, 22, ${(30 - trail.age) / 30 * 0.8})`;
          ctx.fillRect(
            trail.x + glitchOffset,
            trail.y + glitchOffset,
            size,
            size
          );

          // Glitch artifacts
          if (Math.random() < 0.3) {
            ctx.fillStyle = `rgba(249, 115, 22, ${(30 - trail.age) / 30 * 0.4})`;
            ctx.fillRect(
              trail.x + Math.random() * 10 - 5,
              trail.y + Math.random() * 10 - 5,
              Math.random() * 3 + 1,
              Math.random() * 3 + 1
            );
          }

          // Digital noise effect
          if (Math.random() < 0.2) {
            ctx.fillStyle = `rgba(249, 115, 22, ${(30 - trail.age) / 30 * 0.2})`;
            for (let i = 0; i < 3; i++) {
              ctx.fillRect(
                trail.x + Math.random() * 20 - 10,
                trail.y + Math.random() * 20 - 10,
                1,
                1
              );
            }
          }
        }

        // Remove old trails
        if (trail.age > 30) {
          trails.current.splice(index, 1);
        }
      });

      // Add random tech particles
      if (Math.random() < 0.02) {
        ctx.fillStyle = `rgba(249, 115, 22, 0.1)`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1,
          1
        );
      }

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="glitch-canvas"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default GlitchBackground;