'use client';

import { motion } from 'framer-motion';
import { User, Heart, Target, Award, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="section-padding relative overflow-hidden scroll-mt-20" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-gradient">{t('about.title').split(' ')[0]}</span> <span style={{ color: 'var(--text-primary)' }}>{t('about.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('about.description')}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Heart, title: t('about.passion'), desc: t('about.passion.desc') },
                { icon: Target, title: t('about.focus'), desc: t('about.focus.desc') },
                { icon: Award, title: t('about.quality'), desc: t('about.quality.desc') },
                { icon: User, title: t('about.experience.user'), desc: t('about.experience.user.desc') }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-hover p-4"
                >
                  <item.icon className="w-8 h-8 mb-3" style={{ color: 'var(--color-primary-500)' }} />
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card p-8 text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white"
                   style={{
                     background: `linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))`
                   }}>
                A
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Abson Santos</h3>
              <p className="font-medium mb-4" style={{ color: 'var(--color-primary-500)' }}>Full Stack Developer</p>
              <div className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {t('about.available')}
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" style={{ color: 'var(--color-primary-500)' }} />
                  {t('about.location')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;