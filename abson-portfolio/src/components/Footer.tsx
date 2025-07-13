'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12" style={{ backgroundColor: 'var(--bg-primary)', borderTop: `1px solid var(--border-light)` }}>
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{
                     background: `linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))`
                   }}>
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold font-display">
                <span style={{ color: 'var(--text-primary)' }}>Abson</span>
                <span className="text-gradient">.dev</span>
              </span>
            </div>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('footer.description')}
            </p>
            <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
              <span>{t('footer.made')}</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" />
              <span>{t('footer.by')}</span>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:items-end"
          >
            <div className="flex space-x-4 mb-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:contato@abson.dev', label: 'Email' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary-500)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Abson Santos. {t('footer.rights')}.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;