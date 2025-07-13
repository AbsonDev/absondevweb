'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, Tag, Eye, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts } from '@/data/blog-posts';
import type { BlogPost } from '@/data/types/blog';

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);

  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post, 3);
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  useEffect(() => {
    const calculateReadingTime = () => {
      const wordsPerMinute = 200;
      const wordCount = post.content.split(' ').length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setEstimatedReadTime(minutes);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    calculateReadingTime();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.content]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 
              key={index} 
              className="text-3xl lg:text-4xl font-bold mb-6 mt-8"
              style={{ color: 'var(--text-primary)' }}
            >
              {paragraph.replace('# ', '')}
            </h1>
          );
        }
        
        if (paragraph.startsWith('## ')) {
          return (
            <h2 
              key={index} 
              className="text-2xl lg:text-3xl font-bold mb-4 mt-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        
        if (paragraph.startsWith('### ')) {
          return (
            <h3 
              key={index} 
              className="text-xl lg:text-2xl font-bold mb-3 mt-5"
              style={{ color: 'var(--text-primary)' }}
            >
              {paragraph.replace('### ', '')}
            </h3>
          );
        }
        
        if (paragraph.startsWith('```')) {
          const codeContent = paragraph.replace(/```[\w]*\n?/, '').replace(/\n?```$/, '');
          return (
            <pre 
              key={index} 
              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm"
            >
              <code>{codeContent}</code>
            </pre>
          );
        }
        
        if (paragraph.startsWith('`') && paragraph.endsWith('`')) {
          return (
            <code 
              key={index}
              className="px-2 py-1 rounded text-sm"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                color: 'var(--text-primary)' 
              }}
            >
              {paragraph.slice(1, -1)}
            </code>
          );
        }
        
        return (
          <p 
            key={index} 
            className="mb-4 leading-relaxed text-lg"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{
              __html: paragraph
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded text-sm bg-gray-200 dark:bg-gray-800">$1</code>')
            }}
          />
        );
      });
  };

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-150"
        style={{
          width: `${readingProgress}%`,
          background: `linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))`
        }}
      />

      {/* Back to Blog */}
      <div className="section-container pt-8 pb-4">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:gap-3"
          style={{ color: 'var(--color-primary-500)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="section-container pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Category */}
          <div className="flex items-center gap-2 mb-6">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
            {post.featured && (
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'var(--color-primary-500)',
                  color: '#ffffff'
                }}
              >
                Destaque
              </span>
            )}
          </div>

          {/* Title */}
          <h1 
            className="text-3xl lg:text-5xl font-bold font-display mb-6 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p 
            className="text-xl leading-relaxed mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {formatDate(post.date)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {post.readTime} de leitura
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {estimatedReadTime} min estimado
              </span>
            </div>

            {post.views && (
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  {post.views} visualizações
                </span>
              </div>
            )}

            {post.likes && (
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  {post.likes} curtidas
                </span>
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: `1px solid var(--border-light)`,
                color: 'var(--text-primary)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Article Content */}
      <article className="section-container pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </motion.div>
      </article>

      {/* Tags */}
      <section className="section-container pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm transition-all duration-300 cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-muted)',
                    border: `1px solid var(--border-light)`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-container pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Previous Post */}
            {previousPost && (
              <Link 
                href={`/blog/${previousPost.slug}`}
                className="card card-hover p-6 block transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <ArrowLeft className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
                  <div>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                      Artigo anterior
                    </p>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {previousPost.title}
                    </h4>
                  </div>
                </div>
              </Link>
            )}

            {/* Next Post */}
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.slug}`}
                className="card card-hover p-6 block transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                      Próximo artigo
                    </p>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {nextPost.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--text-primary)' }}>
                Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card card-hover cursor-pointer group"
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div>
                        {/* Category */}
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white mb-3 inline-block"
                          style={{ backgroundColor: relatedPost.category.color }}
                        >
                          {relatedPost.category.name}
                        </span>
                        
                        {/* Title */}
                        <h3 
                          className="text-lg font-bold mb-3 group-hover:text-gradient transition-all duration-300"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {relatedPost.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p 
                          className="text-sm mb-4 leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {relatedPost.excerpt}
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                          
                          <motion.div
                            className="flex items-center gap-1 font-medium group-hover:gap-2 transition-all duration-300"
                            style={{ color: 'var(--color-primary-500)' }}
                          >
                            <span>Ler</span>
                            <ArrowRight className="w-3 h-3" />
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}