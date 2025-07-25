import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { useAuth } from '../auth/AuthProvider';
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
  Briefcase,
  Search,
  Target,
  Award,
  DollarSign,
  Users,
  BookOpen,
  Palette,
  Code,
  Camera
} from 'lucide-react';

interface FreelancerDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function FreelancerDashboard({ onNavigate, onLogout }: FreelancerDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Projects', value: '5', change: '+20%', icon: Briefcase, color: 'text-purple-600' },
    { label: 'This Month Earnings', value: '$4.2k', change: '+15%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Client Rating', value: '4.9', change: '+0.2', icon: Star, color: 'text-yellow-600' },
    { label: 'Proposals Sent', value: '12', change: '+8%', icon: Target, color: 'text-blue-600' }
  ];

  const recentActivities = [
    { icon: Briefcase, text: 'Project completed: E-commerce Website Design', time: '2 hours ago', color: 'text-green-600' },
    { icon: MessageCircle, text: 'New message from TechStartup Inc', time: '4 hours ago', color: 'text-blue-600' },
    { icon: DollarSign, text: 'Payment received: $850 for Mobile App UI', time: '1 day ago', color: 'text-green-600' },
    { icon: Star, text: '5-star review from satisfied client', time: '2 days ago', color: 'text-yellow-600' }
  ];

  const quickActions = [
    { icon: Search, label: 'Browse Projects', route: 'marketplace' },
    { icon: Plus, label: 'Create Proposal', route: 'create' },
    { icon: BarChart3, label: 'Earnings Analytics', route: 'analytics' },
    { icon: Users, label: 'Client Network', route: 'social' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-purple-50 pb-20">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Freelancer Dashboard</h1>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-600">
                    Independent Professional
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
                <Badge className="ml-1 h-5 w-5 p-0 text-xs">5</Badge>
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('marketplace')}>
                <Globe className="w-4 h-4 mr-2" />
                Browse Projects
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
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Creator'}! 🎨
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Ready to showcase your skills? Find exciting freelance projects that match your expertise.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  Freelance Professional
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Top Rated
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Button 
                onClick={() => onNavigate('marketplace')} 
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 mb-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Find Projects
              </Button>
              <div className="text-white/80 text-sm">
                Success rate: <span className="font-bold">94%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
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
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0">
                            <activity.icon className={`w-4 h-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4" onClick={() => onNavigate('social')}>
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Sidebar */}
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
                      {quickActions.map((action, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          className="w-full justify-start hover:bg-purple-600 hover:text-white transition-all"
                          onClick={() => onNavigate(action.route)}
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Categories */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-900">Your Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">Web Development</span>
                        <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-600">Expert</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">UI/UX Design</span>
                        <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-600">Expert</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">Photography</span>
                        <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-600">Advanced</Badge>
                      </div>
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onNavigate('profile')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skills
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Manage Your Projects</h3>
                  <p className="text-muted-foreground mb-6">
                    Track progress and communicate with clients
                  </p>
                  <Button onClick={() => onNavigate('marketplace')}>
                    Browse New Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Track Your Proposals</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor proposal status and win rates
                  </p>
                  <Button onClick={() => onNavigate('create')}>
                    Create New Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Financial Insights</h3>
                  <p className="text-muted-foreground mb-6">
                    Track your earnings and financial growth
                  </p>
                  <Button onClick={() => onNavigate('analytics')}>
                    View Earnings Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Enhance Your Skills</h3>
                  <p className="text-muted-foreground mb-6">
                    Learn new skills to increase your earning potential
                  </p>
                  <Button onClick={() => onNavigate('learning')}>
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}