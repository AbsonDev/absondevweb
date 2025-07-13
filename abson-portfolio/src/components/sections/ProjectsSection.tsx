'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'EstoqueMax',
      description: 'Sistema de gestão de estoque com AI e realtime',
      tech: ['Flutter', '.NET Core', 'Azure'],
      image: '🏪',
    },
    {
      title: 'Portfolio Dinâmico',
      description: 'Portfolio moderno com animações avançadas',
      tech: ['Next.js', 'Framer Motion', 'Tailwind'],
      image: '💼',
    },
    {
      title: 'App Mobile',
      description: 'Aplicativo cross-platform de alta performance',
      tech: ['Flutter', 'Firebase', 'BLoC'],
      image: '📱',
    },
  ];

  return (
    <section id="projects" className="section-padding bg-black relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Meus</span> <span className="text-gradient">Projetos</span>
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
              <div className="text-6xl mb-4">{project.image}</div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="glass px-2 py-1 rounded text-xs text-primary-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button className="btn-ghost flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  Código
                </button>
                <button className="btn-ghost flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
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