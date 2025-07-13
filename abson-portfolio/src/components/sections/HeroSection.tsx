'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Play, Sparkles, Code2, Rocket } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 10, // Orange/yellow hues
      };
    };

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const opacity = (100 - distance) / 100 * 0.1;
              ctx.save();
              ctx.globalAlpha = opacity;
              ctx.strokeStyle = `hsl(${particle.hue}, 100%, 60%)`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Hide scroll indicator when user starts scrolling (adjusted for mobile)
  useEffect(() => {
    const handleScroll = () => {
      // Lower threshold for mobile devices
      const threshold = window.innerWidth < 768 ? 50 : 100;
      setShowScrollIndicator(window.scrollY < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) as HTMLElement;
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape" />
        <div className="floating-shape" />
        <div className="floating-shape" />
        <div className="floating-shape" />
        <div className="floating-shape" />
      </div>

      {/* Main Content */}
      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center relative"
        >
          {/* Status Badge */}
          <motion.div
            variants={textVariants}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Disponível para projetos</span>
            <Sparkles className="w-4 h-4 text-primary-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl lg:text-8xl font-bold font-display mb-6"
          >
            <motion.span
              className="block text-white text-shadow-lg"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.5)",
                  "0 0 40px rgba(249, 115, 22, 0.8)",
                  "0 0 20px rgba(249, 115, 22, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Abson
            </motion.span>
            <motion.span
              className="block text-gradient bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Developer
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={textVariants}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-8 max-w-4xl mx-auto"
          >
            Desenvolvedor{' '}
            <motion.span
              className="text-gradient-purple font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Full Stack
            </motion.span>{' '}
            especializado em criar experiências digitais extraordinárias
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transformo ideias em{' '}
            <span className="text-primary-400 font-medium">soluções digitais inovadoras</span> usando
            as tecnologias mais modernas do mercado. Do mobile à nuvem, construo experiências
            que impressionam e resultados que importam.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 mr-2" />
              <span>Ver Projetos</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Rocket className="w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" />
              <span>Baixar CV</span>
            </motion.button>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { name: 'Flutter', icon: '📱' },
              { name: 'Angular', icon: '⚡' },
              { name: '.NET', icon: '💎' },
              { name: 'Next.js', icon: '⚛️' },
              { name: 'Azure', icon: '☁️' },
              { name: 'TypeScript', icon: '🔷' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="glass px-4 py-2 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span className="text-2xl mr-2">{tech.icon}</span>
                <span className="text-gray-300 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-24"
          >
            {[
              { number: "5+", label: "Anos de Experiência" },
              { number: "50+", label: "Projetos Concluídos" },
              { number: "15+", label: "Clientes Satisfeitos" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-gradient mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Positioned at bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScrollIndicator ? 1 : 0, 
          y: showScrollIndicator ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
        style={{ 
          pointerEvents: showScrollIndicator ? 'auto' : 'none'
        }}
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center justify-center space-y-1 group cursor-pointer p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Simplified Mouse Indicator */}
          <div className="relative flex items-center justify-center">
            {/* Glow Effect */}
            <motion.div
              className="absolute w-6 h-8 bg-primary-500/20 rounded-full blur-md"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Mouse Shape - Smaller */}
            <div className="relative w-5 h-8 border border-primary-500/60 rounded-full flex justify-center items-start group-hover:border-primary-400 transition-all duration-300 bg-black/20 backdrop-blur-sm">
              <motion.div
                className="w-1 h-2 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full mt-1"
                animate={{ 
                  y: [0, 10, 0], 
                  opacity: [1, 0.4, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          {/* Single Chevron */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-3 h-3 text-primary-500 group-hover:text-primary-400 transition-colors duration-300" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Code Rain Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-500 font-mono text-xs"
            initial={{ y: -100, x: `${i * 10}%` }}
            animate={{ y: "100vh" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Code2 className="w-4 h-4" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;