'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const projects = [
    {
      title: t('projects.estoqueMax.title'),
      description: t('projects.estoqueMax.desc'),
      tech: ['Flutter', '.NET Core', 'Azure'],
      image: 'https://cdn.simpleicons.org/flutter',
    },
    {
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.desc'),
      tech: ['Next.js', 'Framer Motion', 'Tailwind'],
      image: 'https://cdn.simpleicons.org/nextdotjs',
    },
    {
      title: t('projects.mobile.title'),
      description: t('projects.mobile.desc'),
      tech: ['Flutter', 'Firebase', 'BLoC'],
      image: 'https://cdn.simpleicons.org/flutter',
    },
  ];

  return (
    <section id="projects" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span style={{ color: 'var(--text-primary)' }}>{t('projects.title').split(' ')[0]}</span> <span className="text-gradient">{t('projects.title').split(' ')[1]}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group"
            >
              <div className="mb-4 flex justify-center">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
              <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="glass px-2 py-1 rounded text-xs" style={{ color: 'var(--color-primary-500)' }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button className="btn-ghost flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  {t('projects.code')}
                </button>
                <button className="btn-ghost flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('projects.demo')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;