// This file has been moved to /components/pages/BlogPage.tsx
// Redirecting to avoid duplicate imports
export { BlogPage } from './pages/BlogPage';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    title: string;
    verified: boolean;
  };
  publishedAt: Date;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  comments: number;
  views: number;
  isBookmarked: boolean;
  isFeatured: boolean;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Posts', count: 156, icon: FileText },
    { id: 'career', name: 'Career Growth', count: 45, icon: TrendingUp },
    { id: 'skills', name: 'Skill Development', count: 32, icon: Brain },
    { id: 'industry', name: 'Industry Insights', count: 28, icon: BarChart3 },
    { id: 'freelancing', name: 'Freelancing Tips', count: 25, icon: Users },
    { id: 'technology', name: 'Technology', count: 22, icon: Code },
    { id: 'design', name: 'Design', count: 18, icon: Palette },
    { id: 'marketing', name: 'Marketing', count: 15, icon: Megaphone },
    { id: 'startups', name: 'Startups', count: 12, icon: Building }
  ];

  const featuredPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Remote Work: How AI is Transforming Job Matching',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we match talent with opportunities, making remote work more efficient and personalized than ever before.',
      content: 'Full article content would go here...',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
        title: 'Senior Product Manager at Strot',
        verified: true
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      readTime: 8,
      category: 'technology',
      tags: ['AI', 'Remote Work', 'Job Matching', 'Future of Work'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      likes: 234,
      comments: 28,
      views: 1250,
      isBookmarked: false,
      isFeatured: true
    },
    {
      id: '2',
      title: '10 Essential Skills Every Freelancer Needs in 2024',
      excerpt: 'From technical expertise to client communication, explore the must-have skills that will set you apart in the competitive freelancing landscape.',
      content: 'Full article content would go here...',
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Freelance Marketing Consultant',
        verified: true
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      readTime: 12,
      category: 'freelancing',
      tags: ['Freelancing', 'Skills', 'Career Development', 'Professional Growth'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      likes: 189,
      comments: 15,
      views: 892,
      isBookmarked: true,
      isFeatured: true
    },
    {
      id: '3',
      title: 'Building Your Personal Brand: A Complete Guide for Job Seekers',
      excerpt: 'Learn how to create a compelling personal brand that attracts employers and sets you apart from other candidates in today\'s competitive job market.',
      content: 'Full article content would go here...',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Career Coach & LinkedIn Expert',
        verified: true
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      readTime: 15,
      category: 'career',
      tags: ['Personal Branding', 'Job Search', 'LinkedIn', 'Career Development'],
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=400&fit=crop',
      likes: 312,
      comments: 42,
      views: 1847,
      isBookmarked: false,
      isFeatured: true
    }
  ];

  const regularPosts: BlogPost[] = [
    {
      id: '4',
      title: 'Salary Negotiation Strategies That Actually Work',
      excerpt: 'Master the art of salary negotiation with these proven techniques and real-world examples from successful professionals.',
      content: 'Full article content would go here...',
      author: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'HR Director & Compensation Expert',
        verified: true
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      readTime: 10,
      category: 'career',
      tags: ['Salary Negotiation', 'Career Advancement', 'Professional Development'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      likes: 156,
      comments: 22,
      views: 743,
      isBookmarked: false,
      isFeatured: false
    },
    {
      id: '5',
      title: 'The Rise of the Gig Economy: Opportunities and Challenges',
      excerpt: 'Explore how the gig economy is reshaping work patterns and what it means for both workers and businesses in the modern economy.',
      content: 'Full article content would go here...',
      author: {
        name: 'Lisa Wong',
        avatar: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=150&h=150&fit=crop&crop=face',
        title: 'Economic Researcher',
        verified: false
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
      readTime: 14,
      category: 'industry',
      tags: ['Gig Economy', 'Future of Work', 'Economic Trends'],
      image: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&h=400&fit=crop',
      likes: 98,
      comments: 12,
      views: 521,
      isBookmarked: true,
      isFeatured: false
    },
    {
      id: '6',
      title: 'Top Design Trends Shaping User Experience in 2024',
      excerpt: 'Stay ahead of the curve with the latest UX/UI design trends that are defining digital experiences this year.',
      content: 'Full article content would go here...',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        title: 'Senior UX Designer',
        verified: true
      },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
      readTime: 7,
      category: 'design',
      tags: ['UX Design', 'UI Trends', 'Design Thinking', 'User Experience'],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=400&fit=crop',
      likes: 203,
      comments: 18,
      views: 967,
      isBookmarked: false,
      isFeatured: false
    }
  ];

  const allPosts = [...featuredPosts, ...regularPosts];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (selectedPost) {
    const post = allPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedPost(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{categories.find(c => c.id === post.category)?.name}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.author.name}</span>
                      {post.author.verified && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {post.author.title} • {formatDate(post.publishedAt)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </div>
                </div>
              </div>
            </header>

            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />

            <div className="mb-8">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="prose-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h2>Key Insights</h2>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <ul>
                <li>Important point number one about the topic</li>
                <li>Another crucial insight for readers to consider</li>
                <li>Final key takeaway from this section</li>
              </ul>
              
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <h2>Conclusion</h2>
              
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
            </div>

            <footer className="mt-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments}
                  </Button>
                </div>
                
                <Button>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </footer>
          </article>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('landing')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h1 className="text-xl">Strot Blog</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Insights for Your <span className="text-primary">Career Journey</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert advice, industry insights, and practical tips to help you succeed in your career, whether you're a full-time professional, freelancer, or gig worker.
            </p>
          </div>
        </ScrollAnimatedSection>

        {/* Search and Filter */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button variant="outline" className="h-12">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </ScrollAnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-3">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Career Growth', 'Remote Work', 'Freelancing', 'AI', 'Skill Development'].map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {selectedCategory === 'all' && (
              <ScrollAnimatedSection animation="fadeUp" delay={0.3}>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {featuredPosts.slice(0, 1).map((post) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ scale: 1.01 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedPost(post.id)}
                      >
                        <Card className="overflow-hidden">
                          <div className="md:flex">
                            <div className="md:w-2/5">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="md:w-3/5 p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge>{categories.find(c => c.id === post.category)?.name}</Badge>
                                <Badge variant="secondary">Featured</Badge>
                              </div>
                              
                              <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {post.author.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-sm font-medium">{post.author.name}</span>
                                      {post.author.verified && (
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatDate(post.publishedAt)} • {post.readTime} min read
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {post.likes}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    {post.comments}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollAnimatedSection>
            )}

            {/* All Posts */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.4}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredPosts.length} articles
                </div>
              </div>

              <StaggeredList className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 md:h-32 object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {categories.find(c => c.id === post.category)?.name}
                            </Badge>
                            {post.isFeatured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                            {post.isBookmarked && (
                              <Bookmark className="w-4 h-4 text-primary fill-current" />
                            )}
                          </div>
                          
                          <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {post.author.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-medium">{post.author.name}</span>
                                  {post.author.verified && (
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatDate(post.publishedAt)} • {post.readTime} min
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {post.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </StaggeredList>
            </ScrollAnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}