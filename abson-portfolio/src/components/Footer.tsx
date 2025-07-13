'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold font-display">
                <span className="text-white">Abson</span>
                <span className="text-gradient">.dev</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Transformando ideias em realidade digital com paixão e inovação.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>e muito ☕</span>
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
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Abson Santos. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;