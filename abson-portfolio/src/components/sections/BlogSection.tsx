'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllBlogPosts } from '@/data/blog-posts';

const BlogSection = () => {
  const { t } = useLanguage();
  
  // Pega os 3 posts mais recentes
  const recentPosts = getAllBlogPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Blog</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('blog.subtitle') || 'Conteúdo, dicas e novidades sobre tecnologia, carreira e desenvolvimento.'}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {recentPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="px-2 py-1 text-xs font-medium rounded-md"
                  style={{ 
                    backgroundColor: post.category.color + '20',
                    color: post.category.color 
                  }}
                >
                  {post.category.name}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{post.title}</h3>
              <p className="mb-3" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <time className="text-xs" style={{ color: 'var(--text-muted)' }} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('pt-BR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--accent-color)' }}
                >
                  Ler mais →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/blog">
            <button className="btn-primary">
              {t('blog.seeMore') || 'Ver mais'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;