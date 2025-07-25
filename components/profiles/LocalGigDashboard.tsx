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
  MapPin,
  Search,
  Target,
  Award,
  DollarSign,
  Users,
  BookOpen,
  Truck,
  Coffee,
  Wrench
} from 'lucide-react';

interface LocalGigDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function LocalGigDashboard({ onNavigate, onLogout }: LocalGigDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Gigs', value: '8', change: '+33%', icon: MapPin, color: 'text-orange-600' },
    { label: 'This Week Earnings', value: '$650', change: '+18%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Customer Rating', value: '4.8', change: '+0.1', icon: Star, color: 'text-yellow-600' },
    { label: 'Completed Tasks', value: '47', change: '+12%', icon: Target, color: 'text-blue-600' }
  ];

  const recentActivities = [
    { icon: MapPin, text: 'Completed delivery for OrderEats', time: '1 hour ago', color: 'text-green-600' },
    { icon: Wrench, text: 'Finished home repair task', time: '3 hours ago', color: 'text-blue-600' },
    { icon: Coffee, text: 'New booking: Coffee shop help', time: '5 hours ago', color: 'text-orange-600' },
    { icon: Star, text: 'Received 5-star review', time: '1 day ago', color: 'text-yellow-600' }
  ];

  const quickActions = [
    { icon: Search, label: 'Find Local Gigs', route: 'local-tasks' },
    { icon: Plus, label: 'Create Service', route: 'create' },
    { icon: MapPin, label: 'Nearby Opportunities', route: 'job-discovery' },
    { icon: BarChart3, label: 'Earnings Report', route: 'analytics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-orange-50 pb-20">
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Local Gig Dashboard</h1>
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-600">
                    Community Helper
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
                <Badge className="ml-1 h-5 w-5 p-0 text-xs">2</Badge>
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('local-tasks')}>
                <Globe className="w-4 h-4 mr-2" />
                Find Gigs
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
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Helper'}! 🚀
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Ready to help your community? Find local gigs and earn money while making a difference.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  Local Gig Worker
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Top Helper
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Button 
                onClick={() => onNavigate('local-tasks')} 
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 mb-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Find Local Gigs
              </Button>
              <div className="text-white/80 text-sm">
                Completion rate: <span className="font-bold">96%</span>
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
              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
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
            <TabsTrigger value="gigs">Local Gigs</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
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
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
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
                          className="w-full justify-start hover:bg-orange-600 hover:text-white transition-all"
                          onClick={() => onNavigate(action.route)}
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Local Area Stats */}
                <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-900">Your Local Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">Available Gigs</span>
                        <span className="text-sm font-medium text-orange-900">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">Avg. Hourly Rate</span>
                        <span className="text-sm font-medium text-orange-900">$18/hr</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">Active Helpers</span>
                        <span className="text-sm font-medium text-orange-900">156</span>
                      </div>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => onNavigate('local-tasks')}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Browse Nearby
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gigs">
            <Card>
              <CardHeader>
                <CardTitle>Available Local Gigs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Find Local Opportunities</h3>
                  <p className="text-muted-foreground mb-6">
                    Discover gigs in your neighborhood and start earning today
                  </p>
                  <Button onClick={() => onNavigate('local-tasks')}>
                    Browse Local Gigs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Wrench className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Offer Your Services</h3>
                  <p className="text-muted-foreground mb-6">
                    Create service listings and let clients find you
                  </p>
                  <Button onClick={() => onNavigate('create')}>
                    Create New Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Track Your Earnings</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor your income and financial performance
                  </p>
                  <Button onClick={() => onNavigate('analytics')}>
                    View Earnings Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Connect with Your Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Network with other local helpers and clients
                  </p>
                  <Button onClick={() => onNavigate('social')}>
                    Join Community
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