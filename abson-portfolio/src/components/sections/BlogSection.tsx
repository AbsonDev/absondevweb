'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const posts = [
  {
    title: 'Como ser produtivo como dev',
    excerpt: 'Dicas práticas para aumentar sua produtividade no desenvolvimento de software.',
    date: '2024-06-01',
  },
  {
    title: 'Tendências em Frontend 2024',
    excerpt: 'O que está em alta no desenvolvimento frontend este ano.',
    date: '2024-05-20',
  },
  {
    title: 'Boas práticas com TypeScript',
    excerpt: 'Como escrever código mais seguro e escalável usando TypeScript.',
    date: '2024-05-10',
  },
];

const BlogSection = () => {
  const { t } = useLanguage();

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
          {posts.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group"
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{post.title}</h3>
              <p className="mb-2" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
              <time className="text-xs" style={{ color: 'var(--text-muted)' }} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </time>
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