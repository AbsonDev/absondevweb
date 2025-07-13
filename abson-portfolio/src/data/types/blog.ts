export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  lastModified?: string;
  readTime: string;
  category: Category;
  tags: string[];
  image: string;
  featured: boolean;
  published: boolean;
  author: Author;
  seo: SEOData;
  views?: number;
  likes?: number;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'date' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalViews: number;
  averageReadTime: string;
}