import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  Bookmark,
  TrendingUp,
  Award,
  Users,
  Zap,
  ChevronRight,
  Calendar,
  Briefcase,
  Target,
  Globe,
  Sparkles
} from 'lucide-react';

interface FreelanceMarketplaceProps {
  onNavigate: (page: string) => void;
}

export function FreelanceMarketplace({ onNavigate }: FreelanceMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [likedJobs, setLikedJobs] = useState<string[]>([]);

  // Mock data for marketplace feed
  const marketplaceFeed = [
    {
      id: '1',
      title: 'Modern E-commerce Website Design',
      client: 'TechStartup Inc.',
      clientAvatar: '/api/placeholder/40/40',
      budget: '$2,500 - $5,000',
      duration: '2-3 months',
      skills: ['React', 'Node.js', 'UI/UX', 'E-commerce'],
      description: 'Looking for an experienced web developer to create a modern, responsive e-commerce platform with advanced features.',
      location: 'Remote',
      postedTime: '2 hours ago',
      proposals: 12,
      rating: 4.8,
      verified: true,
      urgent: false,
      featured: true,
      likes: 24,
      views: 156,
      category: 'Web Development'
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      client: 'DesignStudio Pro',
      clientAvatar: '/api/placeholder/40/40',
      budget: '$1,200 - $2,500',
      duration: '3-4 weeks',
      skills: ['Figma', 'Sketch', 'Prototyping', 'Mobile Design'],
      description: 'Need a talented designer to create intuitive and engaging mobile app interfaces for iOS and Android.',
      location: 'New York, NY',
      postedTime: '4 hours ago',
      proposals: 8,
      rating: 4.9,
      verified: true,
      urgent: true,
      featured: false,
      likes: 18,
      views: 89,
      category: 'Design'
    },
    {
      id: '3',
      title: 'Content Marketing Strategy',
      client: 'GrowthCorp',
      clientAvatar: '/api/placeholder/40/40',
      budget: '$800 - $1,500',
      duration: '1-2 months',
      skills: ['Content Strategy', 'SEO', 'Social Media', 'Analytics'],
      description: 'Seeking a marketing expert to develop and execute a comprehensive content marketing strategy for B2B SaaS.',
      location: 'Remote',
      postedTime: '6 hours ago',
      proposals: 15,
      rating: 4.7,
      verified: false,
      urgent: false,
      featured: false,
      likes: 31,
      views: 203,
      category: 'Marketing'
    },
    {
      id: '4',
      title: 'Video Production & Editing',
      client: 'MediaFlow Agency',
      clientAvatar: '/api/placeholder/40/40',
      budget: '$1,800 - $3,000',
      duration: '2-3 weeks',
      skills: ['Video Editing', 'Motion Graphics', 'After Effects', 'Premiere'],
      description: 'Professional video editor needed for creating promotional content and social media videos for multiple clients.',
      location: 'Los Angeles, CA',
      postedTime: '1 day ago',
      proposals: 22,
      rating: 4.6,
      verified: true,
      urgent: false,
      featured: true,
      likes: 45,
      views: 287,
      category: 'Video & Animation'
    },
    {
      id: '5',
      title: 'Data Analysis & Visualization',
      client: 'DataInsights LLC',
      clientAvatar: '/api/placeholder/40/40',
      budget: '$2,000 - $4,000',
      duration: '1-2 months',
      skills: ['Python', 'R', 'Tableau', 'Machine Learning'],
      description: 'Looking for a data scientist to analyze customer behavior patterns and create interactive dashboards.',
      location: 'Remote',
      postedTime: '2 days ago',
      proposals: 9,
      rating: 4.8,
      verified: true,
      urgent: true,
      featured: false,
      likes: 27,
      views: 134,
      category: 'Data Science'
    }
  ];

  const categories = [
    { name: 'Web Development', count: 1247, icon: Globe, color: 'text-blue-600' },
    { name: 'Design', count: 892, icon: Sparkles, color: 'text-purple-600' },
    { name: 'Marketing', count: 654, icon: TrendingUp, color: 'text-green-600' },
    { name: 'Video & Animation', count: 543, icon: Eye, color: 'text-red-600' },
    { name: 'Data Science', count: 432, icon: Target, color: 'text-orange-600' },
    { name: 'Writing', count: 321, icon: Briefcase, color: 'text-indigo-600' }
  ];

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleLikeJob = (jobId: string) => {
    setLikedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = marketplaceFeed.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-purple-50 pb-24">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Freelance Marketplace</h1>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-600">
                    {filteredJobs.length} Projects Available
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('advanced-search')}>
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('create')}>
                <Zap className="w-4 h-4 mr-2" />
                Post Project
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Project Feed</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-3 space-y-6">
                <AnimatePresence>
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={job.clientAvatar} alt={job.client} />
                                <AvatarFallback>{job.client.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold">{job.title}</h3>
                                  {job.featured && (
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                      Featured
                                    </Badge>
                                  )}
                                  {job.urgent && (
                                    <Badge variant="destructive">
                                      Urgent
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span>{job.client}</span>
                                  {job.verified && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-600">
                                      <Award className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                    <span>{job.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">{job.budget}</div>
                              <div className="text-sm text-muted-foreground">{job.duration}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="bg-purple-100 text-purple-600">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.postedTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{job.proposals} proposals</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{job.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className={`w-4 h-4 ${likedJobs.includes(job.id) ? 'text-red-500 fill-current' : ''}`} />
                                  <span>{job.likes}</span>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLikeJob(job.id)}
                                className={likedJobs.includes(job.id) ? 'text-red-500' : ''}
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSaveJob(job.id)}
                                className={savedJobs.includes(job.id) ? 'text-purple-500' : ''}
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onNavigate('direct-chat')}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                onClick={() => onNavigate('job-detail')}
                              >
                                Apply Now
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-900">Your Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-700">Proposals Sent</span>
                        <span className="font-semibold text-purple-900">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-700">Projects Won</span>
                        <span className="font-semibold text-purple-900">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-700">Success Rate</span>
                        <span className="font-semibold text-purple-900">41%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.slice(0, 4).map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-current/10 to-current/20 flex items-center justify-center ${category.color}`}>
                              <category.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-current/10 to-current/20 flex items-center justify-center ${category.color}`}>
                          <category.icon className="w-6 h-6" />
                        </div>
                        <Badge variant="secondary">{category.count} projects</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore {category.count} available projects in {category.name.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Saved Projects</h3>
              <p className="text-muted-foreground mb-6">
                {savedJobs.length > 0 
                  ? `You have ${savedJobs.length} saved projects`
                  : 'No saved projects yet. Start browsing to save projects you\'re interested in!'
                }
              </p>
              <Button onClick={() => setActiveTab('feed')}>
                Browse Projects
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Trending Projects</h3>
              <p className="text-muted-foreground mb-6">
                Discover the most popular and high-engagement projects in the marketplace
              </p>
              <Button onClick={() => setActiveTab('feed')}>
                View All Projects
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}