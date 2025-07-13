'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Play, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Typing animation for specialties
  const specialties = [
    'AngularDeveloper',
    'FlutterDeveloper', 
    'DotNetDeveloper',
    'FullStackDeveloper',
    'ReactDeveloper',
    'NextJSDeveloper'
  ];
  
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const currentText = specialties[currentSpecialty];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(75);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }
      
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSpecialty, typingSpeed, specialties]);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

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
            <span className="text-sm text-gray-300">{t('hero.available')}</span>
            <Sparkles className="w-4 h-4 text-primary-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={textVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display mb-6 whitespace-nowrap"
            style={{ minWidth: 'fit-content' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>
              Abson
            </span>
            <span style={{ color: 'var(--color-primary-500)' }}>
              .
            </span>
            <motion.span
              style={{ color: 'var(--color-primary-500)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
                style={{ color: 'var(--color-primary-500)' }}
              >
                |
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={textVariants}
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 max-w-4xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('hero.greeting')}{' '}
            <motion.span
              className="text-gradient-purple font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('hero.name')}
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero.subtitle')}
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
              <span>{t('hero.cta')}</span>
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
              { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter' },
              { name: 'Angular', logo: 'https://cdn.simpleicons.org/angular' },
              { name: '.NET', logo: 'https://cdn.simpleicons.org/dotnet' },
              { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs' },
              { name: 'Azure', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg' },
              { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="glass px-4 py-2 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-6 h-6 mr-2"
                />
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-24"
          >
            {[
              { number: "5+", label: t('about.experience') },
              { number: "50+", label: t('about.projects') },
              { number: "15+", label: t('about.clients') }
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
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
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
            <div className="relative w-5 h-8 rounded-full flex justify-center items-start transition-all duration-300 backdrop-blur-sm"
                 style={{
                   border: `1px solid var(--color-primary-500)`,
                   borderOpacity: 0.6,
                   backgroundColor: 'var(--bg-glass-dark)'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = 'var(--color-primary-400)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                 }}>
              <motion.div
                className="w-1 h-2 rounded-full mt-1"
                style={{
                  background: `linear-gradient(to bottom, var(--color-primary-400), var(--color-primary-600))`
                }}
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
            <ChevronDown className="w-3 h-3 transition-colors duration-300" 
                         style={{ color: 'var(--color-primary-500)' }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.color = 'var(--color-primary-400)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.color = 'var(--color-primary-500)';
                         }} />
          </motion.div>
        </motion.button>
      </motion.div>

    </section>
  );
};

export default HeroSection;