'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="section-padding relative overflow-hidden scroll-mt-20" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span style={{ color: 'var(--text-primary)' }}>{t('contact.title').split(' ')[0]} {t('contact.title').split(' ')[1]}</span> <span className="text-gradient">{t('contact.title').split(' ')[2]}</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{t('contact.work.together')}</h3>
            
            {[
              { icon: Mail, title: t('contact.email'), value: 'contato@abson.dev', href: 'mailto:contato@abson.dev' },
              { icon: Phone, title: t('contact.whatsapp'), value: '+55 (11) 99999-9999', href: 'tel:+5511999999999' },
              { icon: MapPin, title: t('contact.location'), value: t('about.location'), href: '#' }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 card p-4"
              >
                <contact.icon className="w-6 h-6" style={{ color: 'var(--color-primary-500)' }} />
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{contact.title}</p>
                  <a href={contact.href} className="font-medium transition-colors" 
                     style={{ color: 'var(--text-primary)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'var(--color-primary-500)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'var(--text-primary)';
                     }}>
                    {contact.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('contact.name')}</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--bg-glass-dark)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                    placeholder={t('contact.name.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('contact.email')}</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--bg-glass-dark)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                    placeholder={t('contact.email.placeholder')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('contact.subject')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass-dark)',
                    border: `1px solid var(--border-color)`,
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                  placeholder={t('contact.subject.placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{t('contact.message')}</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none resize-none transition-colors duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass-dark)',
                    border: `1px solid var(--border-color)`,
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                  placeholder={t('contact.message.placeholder')}
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.send')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;