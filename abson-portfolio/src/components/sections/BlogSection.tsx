'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogSection = () => {
  const { t } = useLanguage();
  
  const blogPosts = [
    {
      id: 1,
      title: 'Flutter vs React Native: Qual escolher em 2024?',
      excerpt: 'Uma análise detalhada das duas principais tecnologias para desenvolvimento mobile cross-platform.',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'Mobile Development',
      image: 'https://cdn.simpleicons.org/flutter',
      tags: ['Flutter', 'React Native', 'Mobile']
    },
    {
      id: 2,
      title: 'Clean Architecture com .NET Core',
      excerpt: 'Como implementar uma arquitetura limpa e escalável em projetos .NET Core.',
      date: '2024-01-10',
      readTime: '12 min',
      category: 'Backend',
      image: 'https://cdn.simpleicons.org/dotnet',
      tags: ['.NET Core', 'Architecture', 'Clean Code']
    },
    {
      id: 3,
      title: 'Next.js 15: Novidades e Melhorias',
      excerpt: 'Explorando as principais funcionalidades e melhorias do Next.js 15.',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Frontend',
      image: 'https://cdn.simpleicons.org/nextdotjs',
      tags: ['Next.js', 'React', 'Frontend']
    },
    {
      id: 4,
      title: 'Azure DevOps: CI/CD para Flutter',
      excerpt: 'Configurando pipelines de CI/CD para aplicações Flutter usando Azure DevOps.',
      date: '2023-12-28',
      readTime: '10 min',
      category: 'DevOps',
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg',
      tags: ['Azure', 'DevOps', 'Flutter', 'CI/CD']
    },
    {
      id: 5,
      title: 'TypeScript: Dicas Avançadas',
      excerpt: 'Técnicas avançadas para melhorar sua produtividade com TypeScript.',
      date: '2023-12-20',
      readTime: '7 min',
      category: 'Programming',
      image: 'https://cdn.simpleicons.org/typescript',
      tags: ['TypeScript', 'JavaScript', 'Tips']
    },
    {
      id: 6,
      title: 'Microservices com Docker e Kubernetes',
      excerpt: 'Implementando uma arquitetura de microservices usando containers.',
      date: '2023-12-15',
      readTime: '15 min',
      category: 'Architecture',
      image: 'https://cdn.simpleicons.org/docker',
      tags: ['Docker', 'Kubernetes', 'Microservices']
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="blog" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Meu</span>{' '}
            <span className="text-gradient">Blog</span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Compartilho conhecimentos sobre desenvolvimento, tecnologia e experiências no mundo tech
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card card-hover cursor-pointer group">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary-500)',
                      color: '#ffffff'
                    }}
                  >
                    Destaque
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {blogPosts[0].category}
                  </span>
                </div>
                
                <h3 
                  className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {blogPosts[0].title}
                </h3>
                
                <p 
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blogPosts[0].date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  
                  <motion.div
                    className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all duration-300"
                    style={{ color: 'var(--color-primary-500)' }}
                  >
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="w-full h-64 lg:h-80 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-20 h-20 opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="card card-hover cursor-pointer group"
              whileHover={{ y: -5 }}
            >
              {/* Post Image */}
              <div 
                className="w-full h-48 rounded-lg mb-6 flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-12 h-12 opacity-60"
                />
              </div>
              
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3 h-3" style={{ color: 'var(--color-primary-500)' }} />
                <span 
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: 'var(--color-primary-500)' }}
                >
                  {post.category}
                </span>
              </div>
              
              {/* Title */}
              <h3 
                className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                {post.title}
              </h3>
              
              {/* Excerpt */}
              <p 
                className="mb-4 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {post.excerpt}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <motion.div
                  className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-300"
                  style={{ color: 'var(--color-primary-500)' }}
                >
                  <span>Ler</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/blog">
            <motion.button
              className="btn-secondary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ver todos os posts</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;