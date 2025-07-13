'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const isOnBlogPage = pathname?.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navegação adaptativa baseada na página atual
  const navItems = isOnBlogPage ? [
    { name: t('nav.home'), href: '/', id: 'home', isExternal: true },
    { name: 'Blog', href: '/blog', id: 'blog', isExternal: true, isActive: true },
  ] : [
    { name: t('nav.home'), href: '#home', id: 'home', isExternal: false },
    { name: t('nav.about'), href: '#about', id: 'about', isExternal: false },
    { name: t('nav.skills'), href: '#skills', id: 'skills', isExternal: false },
    { name: t('nav.projects'), href: '#projects', id: 'projects', isExternal: false },
    { name: 'Blog', href: '/blog', id: 'blog', isExternal: true },
    { name: t('nav.contact'), href: '#contact', id: 'contact', isExternal: false },
  ];

  const handleNavigation = (href: string, isExternal: boolean) => {
    if (isExternal) {
      // Para links externos (como /blog), use navegação normal
      setIsMenuOpen(false);
      return;
    }
    
    // Para âncoras, use scroll suave
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const headerHeight = 80; // altura do header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 header-no-shadow header-border-transition ${isScrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: isScrolled 
          ? 'var(--bg-glass)' 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        boxShadow: 'none !important'
      }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <Link 
              href={isOnBlogPage ? "/" : "#home"} 
              onClick={isOnBlogPage ? undefined : () => handleNavigation('#home', false)}
              className="text-xl lg:text-2xl font-bold font-display"
            >
              <span style={{ color: 'var(--text-primary)' }}>Abson</span>
              <span className="text-gradient">.dev</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {item.isExternal ? (
                  <Link
                    href={item.href}
                    onClick={() => handleNavigation(item.href, item.isExternal)}
                    className="relative px-4 py-2 rounded-lg font-medium transition-all duration-300 block"
                    style={{
                      color: (item as any).isActive 
                        ? 'var(--color-primary-500)' 
                        : 'var(--text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      if (!(item as any).isActive) {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(item as any).isActive) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    {(item as any).isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundColor: 'var(--color-primary-500)',
                          opacity: 0.1,
                          border: `1px solid var(--color-primary-500)`,
                          borderOpacity: 0.2
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href, item.isExternal)}
                    className="relative px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    style={{
                      color: activeSection === item.id 
                        ? 'var(--color-primary-500)' 
                        : 'var(--text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundColor: 'var(--color-primary-500)',
                          opacity: 0.1,
                          border: `1px solid var(--color-primary-500)`,
                          borderOpacity: 0.2
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Language Selector and CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <LanguageSelector />
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary group"
            >
              <span className="mr-2">{t('header.cta')}</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg backdrop-blur-md transition-colors duration-300"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: `1px solid var(--border-light)`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass-dark mt-2 rounded-xl"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.isExternal ? (
                      <Link
                        href={item.href}
                        onClick={() => handleNavigation(item.href, item.isExternal)}
                        className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300"
                        style={{
                          color: (item as any).isActive 
                            ? 'var(--color-primary-500)' 
                            : 'var(--text-secondary)',
                          backgroundColor: (item as any).isActive 
                            ? 'var(--color-primary-500)' 
                            : 'transparent',
                          backgroundOpacity: (item as any).isActive ? 0.1 : 0
                        }}
                        onMouseEnter={(e) => {
                          if (!(item as any).isActive) {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!(item as any).isActive) {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.href, item.isExternal)}
                        className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300"
                        style={{
                          color: activeSection === item.id 
                            ? 'var(--color-primary-500)' 
                            : 'var(--text-secondary)',
                          backgroundColor: activeSection === item.id 
                            ? 'var(--color-primary-500)' 
                            : 'transparent',
                          backgroundOpacity: activeSection === item.id ? 0.1 : 0
                        }}
                        onMouseEnter={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {item.name}
                      </button>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="px-4 pt-4 space-y-3"
                >
                  <LanguageSelector />
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="btn-primary w-full"
                  >
                    {t('header.cta')}
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 origin-left"
        style={{
          background: `linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))`,
          scaleX: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
};

export default Header;