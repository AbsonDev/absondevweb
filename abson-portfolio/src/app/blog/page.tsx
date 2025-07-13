'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, ArrowRight, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getAllBlogPosts, getFeaturedBlogPosts, categories, getBlogStats } from '@/data/blog-posts';
import type { BlogPost } from '@/data/types/blog';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date');

  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const stats = getBlogStats();

  // Filter and sort posts
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category.slug === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'views') {
      return (b.views || 0) - (a.views || 0);
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">
              <span style={{ color: 'var(--text-primary)' }}>Meu</span>{' '}
              <span className="text-gradient">Blog</span>
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              Compartilho conhecimentos sobre desenvolvimento, tecnologia e experiências no mundo tech
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Artigos', value: stats.totalPosts, icon: '📝' },
                { label: 'Categorias', value: stats.totalCategories, icon: '🏷️' },
                { label: 'Visualizações', value: stats.totalViews.toLocaleString(), icon: '👁️' },
                { label: 'Tempo Médio', value: stats.averageReadTime, icon: '⏱️' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div 
                    className="text-2xl font-bold text-gradient mb-1"
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding bg-gradient-to-b from-transparent to-var(--bg-secondary)">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--color-primary-500)' }} />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Posts em Destaque
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card card-hover cursor-pointer group"
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: post.category.color }}
                        >
                          {post.category.name}
                        </span>
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Destaque
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p 
                        className="mb-6 leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {post.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
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
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="section-padding">
        <div className="section-container">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Todos os Posts
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                    style={{ color: 'var(--text-muted)' }} 
                  />
                  <input
                    type="text"
                    placeholder="Buscar artigos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="all">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'views')}
                  className="px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="date">Mais recentes</option>
                  <option value="views">Mais vistos</option>
                </select>
              </div>
            </div>

            {/* Results info */}
            <p style={{ color: 'var(--text-muted)' }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              {searchQuery && ` para "${searchQuery}"`}
              {selectedCategory !== 'all' && ` na categoria "${categories.find(c => c.slug === selectedCategory)?.name}"`}
            </p>
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="card card-hover cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: post.category.color }}
                      >
                        {post.category.name}
                      </span>
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {formatDate(post.date)}
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
                      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                        {post.views && (
                          <div className="flex items-center gap-1">
                            <span>👁️</span>
                            <span>{post.views}</span>
                          </div>
                        )}
                      </div>
                      
                      <motion.div
                        className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-300"
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
          </motion.div>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Nenhum artigo encontrado
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Tente ajustar os filtros ou termos de busca
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}