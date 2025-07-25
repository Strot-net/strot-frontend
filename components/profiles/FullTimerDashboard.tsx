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
  BookOpen
} from 'lucide-react';

interface FullTimerDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function FullTimerDashboard({ onNavigate, onLogout }: FullTimerDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Applications', value: '23', change: '+12%', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Interviews', value: '8', change: '+25%', icon: Users, color: 'text-green-600' },
    { label: 'Offers', value: '2', change: '+100%', icon: Award, color: 'text-purple-600' },
    { label: 'Avg Salary', value: '$85k', change: '+5%', icon: DollarSign, color: 'text-yellow-600' }
  ];

  const recentActivities = [
    { icon: Briefcase, text: 'Applied to Senior Software Engineer at TechCorp', time: '2 hours ago', color: 'text-blue-600' },
    { icon: Users, text: 'Interview scheduled with DataFlow Inc', time: '1 day ago', color: 'text-green-600' },
    { icon: Star, text: 'Profile viewed by 12 recruiters', time: '2 days ago', color: 'text-yellow-600' },
    { icon: Award, text: 'Completed skill assessment for React', time: '3 days ago', color: 'text-purple-600' }
  ];

  const quickActions = [
    { icon: Search, label: 'Browse Jobs', route: 'full-time-jobs' },
    { icon: Target, label: 'Job Matching', route: 'job-matching' },
    { icon: BookOpen, label: 'Skill Building', route: 'learning' },
    { icon: BarChart3, label: 'Career Analytics', route: 'analytics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 pb-20">
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Full-Timer Dashboard</h1>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
                    Career Professional
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
                <Badge className="ml-1 h-5 w-5 p-0 text-xs">3</Badge>
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => onNavigate('full-time-jobs')}>
                <Globe className="w-4 h-4 mr-2" />
                Browse Jobs
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
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Professional'}! 👋
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Ready to advance your career? Discover opportunities tailored for full-time professionals.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  Full-Time Professional
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Button 
                onClick={() => onNavigate('full-time-jobs')} 
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 mb-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Find Dream Job
              </Button>
              <div className="text-white/80 text-sm">
                Profile match rate: <span className="font-bold">92%</span>
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
              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
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
            <TabsTrigger value="jobs">Job Hunt</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="career">Career Growth</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
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
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
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
                          className="w-full justify-start hover:bg-blue-600 hover:text-white transition-all"
                          onClick={() => onNavigate(action.route)}
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Career Progress */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Career Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Goal Completion</span>
                        <span className="text-sm font-medium text-blue-900">75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                      <p className="text-xs text-blue-600">
                        You're on track to reach your career goals this quarter
                      </p>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('analytics')}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Career Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Discover Your Next Role</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse thousands of full-time positions from top companies
                  </p>
                  <Button onClick={() => onNavigate('full-time-jobs')}>
                    Browse Full-Time Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Application Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Track Your Applications</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor your job applications and interview progress
                  </p>
                  <Button onClick={() => onNavigate('analytics')}>
                    View Application Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle>Career Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Advance Your Career</h3>
                  <p className="text-muted-foreground mb-6">
                    Access learning resources and skill development programs
                  </p>
                  <Button onClick={() => onNavigate('learning')}>
                    Start Learning Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Professional Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Grow Your Network</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with other professionals and industry leaders
                  </p>
                  <Button onClick={() => onNavigate('social')}>
                    Explore Network
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