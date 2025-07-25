import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  Bookmark,
  TrendingUp,
  Zap,
  Eye,
  Heart,
  Share2,
  ChevronRight,
  Globe,
  Users,
  Award,
  Target,
  Compass,
  Sparkles
} from 'lucide-react';

interface JobDiscoveryProps {
  onNavigate: (page: string) => void;
}

export function JobDiscovery({ onNavigate }: JobDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');

  // Mock trending opportunities data
  const trendingOpportunities = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechFlow Inc.',
      type: 'Full-time',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      tags: ['React', 'TypeScript', 'Node.js'],
      postedTime: '2 hours ago',
      trending: true,
      remote: true,
      urgentHiring: false,
      applications: 45,
      views: 234,
      rating: 4.8
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      company: 'DesignStudio Pro',
      type: 'Freelance',
      location: 'Remote',
      salary: '$80/hour',
      tags: ['Figma', 'Sketch', 'Prototyping'],
      postedTime: '4 hours ago',
      trending: true,
      remote: true,
      urgentHiring: true,
      applications: 23,
      views: 156,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Local Delivery Driver',
      company: 'QuickEats',
      type: 'Gig',
      location: 'Downtown Area',
      salary: '$18-25/hour',
      tags: ['Driving', 'Customer Service', 'Flexible'],
      postedTime: '1 hour ago',
      trending: true,
      remote: false,
      urgentHiring: true,
      applications: 67,
      views: 189,
      rating: 4.6
    },
    {
      id: '4',
      title: 'Content Marketing Manager',
      company: 'GrowthCorp',
      type: 'Full-time',
      location: 'New York, NY',
      salary: '$85k - $110k',
      tags: ['Content Strategy', 'SEO', 'Analytics'],
      postedTime: '6 hours ago',
      trending: false,
      remote: true,
      urgentHiring: false,
      applications: 34,
      views: 145,
      rating: 4.7
    },
    {
      id: '5',
      title: 'AI Research Scientist',
      company: 'InnovateLabs',
      type: 'Full-time',
      location: 'Boston, MA',
      salary: '$140k - $200k',
      tags: ['Machine Learning', 'Python', 'Research'],
      postedTime: '1 day ago',
      trending: true,
      remote: true,
      urgentHiring: false,
      applications: 78,
      views: 456,
      rating: 4.9
    }
  ];

  const categories = [
    { name: 'Tech & Development', count: 2847, icon: Globe, trending: true },
    { name: 'Design & Creative', count: 1923, icon: Sparkles, trending: true },
    { name: 'Marketing & Sales', count: 1654, icon: TrendingUp, trending: false },
    { name: 'Local Services', count: 892, icon: MapPin, trending: true },
    { name: 'Customer Support', count: 756, icon: Users, trending: false },
    { name: 'Data & Analytics', count: 634, icon: Target, trending: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 pb-24">
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Discover Opportunities</h1>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
                    All Types • All Locations
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Discover opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('advanced-search')}>
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('job-matching')}>
                <Zap className="w-4 h-4 mr-2" />
                Smart Match
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="recommended">For You</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white mb-8"
            >
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  Explore Every Opportunity 🚀
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  From full-time careers to quick gigs, discover opportunities that match your goals and lifestyle.
                </p>
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => onNavigate('advanced-search')} 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-white/90"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Advanced Search
                  </Button>
                  <Button 
                    onClick={() => onNavigate('job-matching')} 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Get Matched
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Opportunity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">All Opportunities</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Trending
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent
                    </Button>
                  </div>
                </div>

                {trendingOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                              {opportunity.trending && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {opportunity.urgentHiring && (
                                <Badge variant="destructive">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="font-medium">{opportunity.company}</span>
                              <Badge variant="secondary">{opportunity.type}</Badge>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                <span>{opportunity.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{opportunity.salary}</div>
                            <div className="text-sm text-muted-foreground">{opportunity.postedTime}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {opportunity.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-blue-100 text-blue-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{opportunity.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{opportunity.applications} applied</span>
                            </div>
                          </div>
                          
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
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              onClick={() => onNavigate('job-detail')}
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Browse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.slice(0, 4).map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                              <category.icon className="w-4 h-4 text-blue-600" />
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

                {/* Discovery Stats */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Discovery Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">New Today</span>
                        <span className="text-sm font-medium text-blue-900">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Trending Now</span>
                        <span className="text-sm font-medium text-blue-900">45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Your Matches</span>
                        <span className="text-sm font-medium text-blue-900">23</span>
                      </div>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('job-matching')}>
                        <Target className="w-4 h-4 mr-2" />
                        Get Personalized
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Trending Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Discover the most popular and in-demand opportunities right now
              </p>
              <Button onClick={() => setActiveTab('discover')}>
                View All Trending
              </Button>
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
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        {category.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.count} opportunities available
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Explore Category
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
              <p className="text-muted-foreground mb-6">
                Get AI-powered job recommendations based on your profile and preferences
              </p>
              <Button onClick={() => onNavigate('job-matching')}>
                <Zap className="w-4 h-4 mr-2" />
                Get My Recommendations
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}