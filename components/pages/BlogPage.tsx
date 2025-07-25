import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { UniversalNavBar } from '../shared/UniversalNavBar';
import { 
  Clock, 
  User, 
  Eye,
  ArrowRight,
  Zap,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Users,
  Target
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function BlogPage({ onNavigate, onGetStarted, onSignIn }: BlogPageProps) {
  const featuredPost = {
    title: 'The Future of Remote Work: 5 Trends Shaping 2024',
    excerpt: 'Discover how remote work continues to evolve and what it means for your career in the coming year.',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    views: '2.4k',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop'
  };

  const posts = [
    {
      title: 'How to Negotiate Your Salary in 2024',
      excerpt: 'Master the art of salary negotiation with these proven strategies.',
      author: 'Marcus Rodriguez',
      date: '2024-01-12',
      readTime: '6 min read',
      views: '1.8k',
      category: 'Career',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop'
    },
    {
      title: 'Top Skills Employers Want in 2024',
      excerpt: 'Stay ahead of the curve with these in-demand skills.',
      author: 'Jennifer Kim',
      date: '2024-01-10',
      readTime: '5 min read',
      views: '3.2k',
      category: 'Skills',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop'
    },
    {
      title: 'Building Your Personal Brand Online',
      excerpt: 'Create a compelling online presence that attracts opportunities.',
      author: 'David Thompson',
      date: '2024-01-08',
      readTime: '7 min read',
      views: '1.5k',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
    },
    {
      title: 'The Rise of AI in Job Searching',
      excerpt: 'How artificial intelligence is revolutionizing career discovery.',
      author: 'Alex Foster',
      date: '2024-01-05',
      readTime: '9 min read',
      views: '4.1k',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop'
    }
  ];

  const categories = [
    { name: 'All', count: 156 },
    { name: 'Career', count: 45 },
    { name: 'Trends', count: 32 },
    { name: 'Skills', count: 28 },
    { name: 'Technology', count: 25 },
    { name: 'Branding', count: 26 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar 
        currentPage="blog" 
        onNavigate={onNavigate} 
        onGetStarted={onGetStarted} 
        onSignIn={onSignIn} 
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-background to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Career 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay ahead in your career with expert advice, industry trends, and actionable insights from the world of work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category.name === 'All' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground">
              Fresh insights to help you navigate your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Career Insights
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest career advice and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20"
              />
              <Button className="bg-white text-gray-900 hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Strot</span>
          </div>
          <p className="text-muted-foreground">
            &copy; 2024 Strot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}