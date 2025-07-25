import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useAuth } from './auth/AuthProvider';
import { 
  Bell,
  Settings,
  LogOut,
  Globe,
  Home,
  Star,
  TrendingUp,
  Clock,
  Zap,
  Brain,
  MessageCircle,
  Plus,
  Sparkles,
  BarChart3,
  Activity,
  Rocket,
  AlertTriangle,
  Briefcase,
  Search,
  Bot,
  Filter,
  ChevronRight
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';
import { NAV_ITEMS, PROFILE_STATS } from './dashboard/userDashboardConstants';
import { getUserTypeLabel, getUserTypeColor } from './dashboard/userDashboardUtils';

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType?: string;
}

export function UserDashboard({ onNavigate, onLogout, userType }: UserDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // CRITICAL FIX: Proper user type mapping without setState during render
  const getUserType = () => {
    const profileType = user?.profileType;
    const authUserType = user?.userType;
    const providedUserType = userType;
    
    console.log('🔥 UserDashboard CRITICAL DEBUG:', {
      profileType,
      authUserType, 
      providedUserType,
      user
    });

    // Map profileType to dashboard userType
    if (profileType === 'full-timer') return 'full-timer';
    if (profileType === 'freelancer') return 'freelancer';
    if (profileType === 'local-gig') return 'local-gig';
    if (profileType === 'gig-worker') return 'local-gig'; // Legacy support
    if (profileType === 'employer') return 'employer';
    
    // Fallback to provided userType or default
    return providedUserType || authUserType || 'freelancer';
  };

  const currentUserType = getUserType();
  console.log('🔥 FINAL USER TYPE:', currentUserType);
  
  // Get profile data with proper fallback
  const getProfileData = () => {
    try {
      return PROFILE_STATS[currentUserType as keyof typeof PROFILE_STATS] || PROFILE_STATS.freelancer;
    } catch (error) {
      console.error('Error getting profile data:', error);
      return {
        greeting: "Ready to take your career to the next level?",
        primaryAction: "Explore Opportunities",
        primaryRoute: "full-time-jobs",
        stats: [
          { label: 'Active Projects', value: '0', change: '0', icon: Briefcase, color: 'text-purple-600' },
          { label: 'Success Rate', value: '100%', change: '0%', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Profile Views', value: '0', change: '0%', icon: Star, color: 'text-blue-600' }
        ],
        recentActivities: [
          { icon: Star, text: 'Welcome to your dashboard!', time: 'Just now', color: 'text-blue-600' }
        ],
        quickActions: [
          { icon: Search, label: 'Explore Opportunities', route: 'full-time-jobs' },
          { icon: Brain, label: 'AI Learning', route: 'learning' }
        ]
      };
    }
  };

  const getNavItems = () => {
    try {
      return NAV_ITEMS[currentUserType as keyof typeof NAV_ITEMS] || NAV_ITEMS.freelancer;
    } catch (error) {
      console.error('Error getting nav items:', error);
      return [
        { icon: Search, label: 'Job Discovery', route: 'full-time-jobs', color: 'text-blue-600' },
        { icon: Brain, label: 'AI Learning', route: 'learning', color: 'text-green-600' }
      ];
    }
  };

  const profileData = getProfileData();
  const navItems = getNavItems();

  console.log('🔥 UserDashboard FINAL DATA:', { profileData: !!profileData, navItems: !!navItems, currentUserType });

  // CRITICAL FIX: Debug navigation calls with proper error handling
  const handleNavigation = (route: string) => {
    try {
      console.log('🔥 NAVIGATION CLICKED:', {
        route,
        currentUserType,
        onNavigate: typeof onNavigate
      });
      
      if (typeof onNavigate !== 'function') {
        console.error('🚨 onNavigate is not a function!', onNavigate);
        return;
      }
      
      onNavigate(route);
    } catch (error) {
      console.error('🚨 Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getUserTypeColor(currentUserType)} flex items-center justify-center`}>
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Dashboard</h1>
                  <Badge variant="secondary" className="text-xs">
                    {getUserTypeLabel(currentUserType)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Profile-Specific Quick Nav - CRITICAL FIX */}
              <div className="hidden md:flex items-center space-x-2">
                {(navItems || []).slice(0, 2).map((item, index) => (
                  <Button
                    key={`nav-${index}-${item.route}`}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation(item.route)}
                    className="flex items-center space-x-2 hover:bg-muted"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                ))}
                
                {/* ⭐ NEW: AI Chatbot Quick Access */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('ai-chat')}
                  className="flex items-center space-x-2 hover:bg-muted bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                >
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="hidden lg:inline text-purple-600">AI Chat</span>
                  <Badge variant="secondary" className="ml-1 text-xs bg-purple-100 text-purple-600">NEW</Badge>
                </Button>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => handleNavigation('notifications')}>
                <Bell className="w-4 h-4" />
                <Badge className="ml-1 h-5 w-5 p-0 text-xs">3</Badge>
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => handleNavigation('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-red-100 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className={`bg-gradient-to-r ${getUserTypeColor(currentUserType)} rounded-xl p-8 mb-8 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.firstName || user?.name?.split(' ')[0] || 'Professional'}! 👋
                </h2>
                <p className="text-white/90 text-lg mb-4">
                  {profileData?.greeting || "Ready to take your career to the next level?"}
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {getUserTypeLabel(currentUserType)}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <Button 
                  onClick={() => handleNavigation(profileData?.primaryRoute || 'full-time-jobs')} 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 mb-4"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {profileData?.primaryAction || "Explore Opportunities"}
                </Button>
                <div className="text-white/80 text-sm">
                  Your success rate: <span className="font-bold">94%</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* ⭐ NEW: AI-Powered Features Section */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* AI Chatbot Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">AI Assistant</h3>
                      <p className="text-xs text-purple-600">Smart career guidance</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-600">NEW</Badge>
                </div>
                <p className="text-sm text-purple-700 mb-4">
                  Get instant answers, career advice, and personalized recommendations powered by AI.
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-purple-600 hover:bg-purple-700" 
                    onClick={() => handleNavigation('ai-chat')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    onClick={() => handleNavigation('ai-chatbot')}
                  >
                    <Bot className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Search Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Filter className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Advanced Search</h3>
                      <p className="text-xs text-blue-600">Powerful job filtering</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-600">Pro</Badge>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  Find exactly what you're looking for with advanced filters, salary ranges, and more.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={() => handleNavigation('advanced-search')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Advanced Search
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimatedSection>

        {/* Enhanced Stats Cards */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(profileData?.stats || []).map((stat, index) => (
              <motion.div
                key={`stat-${index}-${stat.label}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-chart-1/10 flex items-center justify-center">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Enhanced Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity Feed */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity</span>
                      <Badge className="ml-auto">Live</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(profileData?.recentActivities || []).map((activity, index) => (
                        <motion.div
                          key={`activity-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-chart-1/10 flex items-center justify-center flex-shrink-0">
                            <activity.icon className={`w-4 h-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4" onClick={() => handleNavigation('social')}>
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Sidebar - CRITICAL FIX */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(profileData?.quickActions || []).map((action, index) => (
                        <Button 
                          key={`action-${index}-${action.route}`}
                          variant="outline" 
                          className="w-full justify-start hover:bg-primary hover:text-white transition-all"
                          onClick={() => handleNavigation(action.route)}
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                      
                      {/* ⭐ NEW: AI-Powered Quick Actions */}
                      <Button 
                        variant="outline" 
                        className="w-full justify-start hover:bg-purple-600 hover:text-white transition-all border-purple-200"
                        onClick={() => handleNavigation('ai-chat')}
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        Ask AI Assistant
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start hover:bg-blue-600 hover:text-white transition-all border-blue-200"
                        onClick={() => handleNavigation('advanced-search')}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Completion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Strength</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completion</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-3" />
                      <p className="text-xs text-muted-foreground">
                        Complete your profile to get 3x more opportunities
                      </p>
                      <Button size="sm" variant="outline" onClick={() => handleNavigation('profile')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Improve Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Your Activity Feed</h3>
                  <p className="text-muted-foreground mb-6">
                    Track all your professional activities and milestones
                  </p>
                  <Button onClick={() => handleNavigation('social')}>
                    View Full Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Discover Your Next Opportunity</h3>
                  <p className="text-muted-foreground mb-6">
                    AI-powered recommendations tailored for {getUserTypeLabel(currentUserType).toLowerCase()}s
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => handleNavigation(profileData?.primaryRoute || 'full-time-jobs')}>
                      {profileData?.primaryAction || "Explore Opportunities"}
                    </Button>
                    <Button variant="outline" onClick={() => handleNavigation('advanced-search')}>
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Detailed Analytics</h3>
                  <p className="text-muted-foreground mb-6">
                    Get insights into your performance and growth metrics
                  </p>
                  <Button onClick={() => handleNavigation('analytics')}>
                    View Analytics Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth">
            <Card>
              <CardHeader>
                <CardTitle>Professional Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Accelerate Your Growth</h3>
                  <p className="text-muted-foreground mb-6">
                    Personalized learning paths and skill development for your career
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => handleNavigation('learning')}>
                      Start Learning Journey
                    </Button>
                    <Button variant="outline" onClick={() => handleNavigation('ai-chat')}>
                      <Bot className="w-4 h-4 mr-2" />
                      Get AI Guidance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}