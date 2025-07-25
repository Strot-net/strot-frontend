import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  Users,
  UserPlus,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  MapPin,
  Calendar,
  Eye,
  ArrowLeft,
  Plus,
  ArrowRight,
  Rss,
  BarChart3,
  Users2,
  Activity,
  Network,
  Globe,
  Building,
  Briefcase,
  Flame,
  CircleDot,
  Hash,
  ExternalLink,
  CheckCircle,
  UserCheck,
  Ticket,
  X,
  Send,
  ImageIcon,
  Video,
  FileText,
  AtSign,
  Clock,
  Bell,
  Download,
  RefreshCw,
  Star,
  Crown,
  Heart
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';
import { PostCard } from './social/PostCard';
import { PublicProfileView } from './PublicProfileView';
import { 
  TRENDING_TOPICS, 
  LIVE_EVENTS, 
  PROFESSIONAL_GROUPS, 
  INDUSTRY_INSIGHTS, 
  ACTIVITY_FEED, 
  SAMPLE_POSTS 
} from './social/constants';
import { extractHashtags, extractMentions, formatTime, filterPosts } from './social/utils';
import { Post } from './social/types';

interface SocialNetworkingPlatformProps {
  onNavigate: (page: string) => void;
}

export function SocialNetworkingPlatform({ onNavigate }: SocialNetworkingPlatformProps) {
  const [selectedTab, setSelectedTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [filter, setFilter] = useState('all');
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleRepost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            isReposted: !post.isReposted 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: 'user',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Software Developer',
        company: 'Your Company',
        verified: false,
        followers: 1234,
        connections: 567,
        premium: false
      },
      content: newPostContent,
      type: 'text',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      views: 1,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
      tags: extractHashtags(newPostContent),
      mentions: extractMentions(newPostContent),
      engagement: { rate: 0, trend: 'stable' }
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowCreatePost(false);
  };

  const handleProfileClick = (profileId: string) => {
    setViewingProfile(profileId);
  };

  const filteredPosts = filterPosts(posts, filter, isFollowing);

  // If viewing a profile, show the profile view
  if (viewingProfile) {
    return (
      <PublicProfileView 
        profileId={viewingProfile} 
        onNavigate={(page) => {
          if (page === 'network') {
            setViewingProfile(null);
          } else {
            onNavigate(page);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Mobile-optimized Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="w-8 h-8 p-1 sm:w-auto sm:h-auto sm:p-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Network className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">Professional Network</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Connect, share, and grow together
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts, people, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setShowCreatePost(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Post</span>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => onNavigate('messages')}>
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search posts, people, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Enhanced Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <ScrollArea orientation="horizontal" className="w-full whitespace-nowrap">
              <TabsList className="inline-flex h-10 sm:h-12 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-max">
                <TabsTrigger value="feed" className="text-xs sm:text-sm px-3 sm:px-4">
                  <Rss className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Feed
                </TabsTrigger>
                <TabsTrigger value="network" className="text-xs sm:text-sm px-3 sm:px-4">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Network
                </TabsTrigger>
                <TabsTrigger value="events" className="text-xs sm:text-sm px-3 sm:px-4">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="insights" className="text-xs sm:text-sm px-3 sm:px-4">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="groups" className="text-xs sm:text-sm px-3 sm:px-4">
                  <Users2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Groups
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-xs sm:text-sm px-3 sm:px-4">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Left Sidebar */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
                {/* User Profile Card */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="text-center mb-4">
                      <Avatar 
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => onNavigate('profile')}
                      >
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-sm sm:text-base">Alex Johnson</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Software Developer</p>
                      <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Connections</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Profile Views</span>
                        <span className="font-medium text-green-600">+23%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Post Impressions</span>
                        <span className="font-medium">15.7k</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 text-xs sm:text-sm" variant="outline" onClick={() => onNavigate('profile')}>
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      View Profile
                    </Button>
                  </Card>
                </ScrollAnimatedSection>

                {/* Enhanced Trending Topics */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm sm:text-base">Trending Now</h3>
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="space-y-3">
                      {TRENDING_TOPICS.slice(0, 5).map((topic, index) => (
                        <motion.div
                          key={topic.tag}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer transition-colors group"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-blue-600 truncate">{topic.tag}</span>
                              {topic.hot && <Flame className="w-3 h-3 text-orange-500 flex-shrink-0" />}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {topic.posts.toLocaleString()} posts • {topic.category}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500">{topic.growth}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                      View All Trends
                    </Button>
                  </Card>
                </ScrollAnimatedSection>

                {/* Live Events Widget */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm sm:text-base">Live Events</h3>
                      <div className="flex items-center gap-1">
                        <CircleDot className="w-3 h-3 text-red-500 animate-pulse" />
                        <span className="text-xs text-red-500">Live</span>
                      </div>
                    </div>
                    {LIVE_EVENTS.slice(0, 2).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-3 last:mb-0 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={event.organizer.avatar} />
                            <AvatarFallback>{event.organizer.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs line-clamp-2">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">{event.type}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{event.attendees.toLocaleString()} attending</span>
                              {event.isLive && (
                                <div className="flex items-center gap-1">
                                  <CircleDot className="w-2 h-2 text-red-500" />
                                  <span className="text-red-500">Live</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-3 text-xs" onClick={() => setSelectedTab('events')}>
                      <Calendar className="w-3 h-3 mr-2" />
                      View All Events
                    </Button>
                  </Card>
                </ScrollAnimatedSection>
              </div>

              {/* Main Feed */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                {/* Enhanced Create Post */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <Button 
                        variant="outline" 
                        className="flex-1 justify-start text-muted-foreground hover:bg-muted/50"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <span>What's on your mind, Alex?</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm justify-start">
                        <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm justify-start">
                        <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm justify-start">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-500" />
                        Event
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm justify-start">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-purple-500" />
                        Article
                      </Button>
                    </div>
                  </Card>
                </ScrollAnimatedSection>

                {/* Enhanced Feed Filters */}
                <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto">
                  {[
                    { id: 'all', label: 'All Posts', icon: Globe },
                    { id: 'following', label: 'Following', icon: Users },
                    { id: 'trending', label: 'Trending', icon: TrendingUp },
                    { id: 'companies', label: 'Companies', icon: Building },
                    { id: 'jobs', label: 'Jobs', icon: Briefcase }
                  ].map((filterOption) => (
                    <Button
                      key={filterOption.id}
                      variant={filter === filterOption.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(filterOption.id)}
                      className="text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2"
                    >
                      <filterOption.icon className="w-3 h-3" />
                      {filterOption.label}
                    </Button>
                  ))}
                </div>

                {/* Enhanced Posts */}
                <div className="space-y-4 sm:space-y-6">
                  {filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      onLike={handleLike}
                      onRepost={handleRepost}
                      onBookmark={handleBookmark}
                      onNavigateToProfile={handleProfileClick}
                    />
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-3">
                {/* Who to Follow */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm sm:text-base">Who to Follow</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTab('network')}>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          id: '1',
                          name: 'Sarah Chen',
                          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
                          title: 'Product Manager at Google',
                          mutualConnections: 12,
                          verified: true,
                          reason: 'Works in your industry'
                        },
                        {
                          id: '2',
                          name: 'Marcus Rodriguez',
                          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                          title: 'UX Designer at Airbnb',
                          mutualConnections: 8,
                          verified: true,
                          reason: 'Similar interests'
                        }
                      ].map((person, index) => (
                        <motion.div
                          key={person.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="relative">
                            <Avatar 
                              className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                              onClick={() => handleProfileClick(person.id)}
                            >
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            {person.verified && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 
                              className="font-medium text-sm truncate cursor-pointer hover:text-primary transition-colors"
                              onClick={() => handleProfileClick(person.id)}
                            >
                              {person.name}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {person.mutualConnections} mutual connections • {person.reason}
                            </p>
                            
                            <div className="flex gap-1 mt-2">
                              <Button size="sm" className="flex-1 text-xs h-7">
                                <UserPlus className="w-3 h-3 mr-1" />
                                Follow
                              </Button>
                              <Button variant="outline" size="sm" className="w-7 h-7 p-0">
                                <MessageSquare className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </ScrollAnimatedSection>

                {/* Other sidebar content continues... */}
              </div>
            </div>
          </TabsContent>

          {/* Network Tab */}
          <TabsContent value="network" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Your Professional Network</h3>
              <p className="text-sm text-muted-foreground">Advanced connection management, networking analytics, and relationship insights.</p>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Professional Events</h3>
              <p className="text-sm text-muted-foreground">Event discovery, RSVP management, and networking opportunities.</p>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Industry Insights</h3>
              <p className="text-sm text-muted-foreground">Market trends, salary benchmarks, and career growth opportunities.</p>
            </Card>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Professional Groups</h3>
              <p className="text-sm text-muted-foreground">Industry groups, skill-based communities, and professional discussions.</p>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Activity Feed</h3>
              <p className="text-sm text-muted-foreground">Connection updates, job alerts, and professional milestone notifications.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold">Create a post</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowCreatePost(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Alex Johnson</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>
                
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, achievements, or insights with your network..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-32 border-none resize-none text-sm sm:text-base mb-4"
                />
                
                <div className="text-xs text-muted-foreground mb-4">
                  💡 Pro tip: Use #hashtags and @mentions to increase your post visibility
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4 text-red-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Hash className="w-4 h-4 text-purple-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AtSign className="w-4 h-4 text-orange-500" />
                    </Button>
                  </div>
                  
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}