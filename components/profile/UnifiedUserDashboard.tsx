import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Home,
  TrendingUp,
  Calendar,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  Bell,
  Search,
  Filter,
  ArrowRight,
  Plus,
  Eye,
  Heart,
  Share2,
  Bookmark,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  Upload,
  Edit,
  Building,
  Globe,
  Mail,
  Phone,
  FileText,
  Camera,
  Video,
  Sparkles,
  Zap,
  Shield,
  Crown,
  Rocket,
  Coffee,
  Handshake,
  ThumbsUp,
  MessageCircle,
  Timer,
  Briefcase,
  Lightbulb,
  Flame,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  PlayCircle,
  Menu,
  MoreHorizontal
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from '../ScrollAnimatedSection';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'candidate' | 'employer';
  profileType?: 'full-timer' | 'freelancer' | 'gig-worker' | 'employer';
  avatar?: string;
  company?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  createdAt?: string;
}

interface UnifiedUserDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const DASHBOARD_STATS = [
  { 
    label: 'Profile Views', 
    value: '1,247', 
    change: '+23%', 
    icon: Eye, 
    color: 'text-blue-500',
    trend: 'up'
  },
  { 
    label: 'Applications', 
    value: '34', 
    change: '+8', 
    icon: FileText, 
    color: 'text-green-500',
    trend: 'up'
  },
  { 
    label: 'Messages', 
    value: '12', 
    change: '+3', 
    icon: MessageSquare, 
    color: 'text-purple-500',
    trend: 'up'
  },
  { 
    label: 'Success Rate', 
    value: '89%', 
    change: '+5%', 
    icon: Target, 
    color: 'text-orange-500',
    trend: 'up'
  }
];

const RECOMMENDED_ACTIONS = [
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add work experience and skills to increase visibility by 40%',
    icon: Users,
    priority: 'high',
    action: 'profile'
  },
  {
    id: 'skill-assessment',
    title: 'Take Skill Assessment',
    description: 'Verify your expertise and earn trusted skill badges',
    icon: Award,
    priority: 'medium',
    action: 'assessments'
  },
  {
    id: 'apply-jobs',
    title: 'Apply to Recommended Jobs',
    description: '8 new jobs match your profile and preferences',
    icon: Briefcase,
    priority: 'high',
    action: 'jobs'
  },
  {
    id: 'network-expand',
    title: 'Expand Your Network',
    description: 'Connect with professionals in your industry',
    icon: Users,
    priority: 'low',
    action: 'network'
  }
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    type: 'application',
    title: 'Applied to Senior Developer at TechCorp',
    description: 'Your application is being reviewed',
    timestamp: '2 hours ago',
    icon: Briefcase,
    status: 'pending'
  },
  {
    id: '2',
    type: 'profile',
    title: 'Profile viewed by HR Manager',
    description: 'Someone from Innovation Labs viewed your profile',
    timestamp: '5 hours ago',
    icon: Eye,
    status: 'info'
  },
  {
    id: '3',
    type: 'message',
    title: 'New message from recruiter',
    description: 'Sarah from TalentSearch sent you a message',
    timestamp: '1 day ago',
    icon: MessageCircle,
    status: 'unread'
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Skill assessment completed',
    description: 'You earned a React.js expert badge',
    timestamp: '2 days ago',
    icon: Award,
    status: 'success'
  }
];

const TRENDING_OPPORTUNITIES = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'TechVision Inc.',
    location: 'San Francisco, CA',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    match: 95,
    posted: '2 hours ago',
    urgent: true
  },
  {
    id: '2',
    title: 'React Developer (Remote)',
    company: 'StartupX',
    location: 'Remote',
    salary: '$100,000 - $120,000',
    type: 'Full-time',
    match: 88,
    posted: '5 hours ago',
    urgent: false
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Creative Agency',
    location: 'New York, NY',
    salary: '$90,000 - $110,000',
    type: 'Contract',
    match: 82,
    posted: '1 day ago',
    urgent: false
  }
];

const SKILL_INSIGHTS = [
  { skill: 'React.js', demand: 'Very High', trend: 'up', growth: '+15%' },
  { skill: 'TypeScript', demand: 'High', trend: 'up', growth: '+22%' },
  { skill: 'Node.js', demand: 'High', trend: 'stable', growth: '+8%' },
  { skill: 'Python', demand: 'Medium', trend: 'up', growth: '+12%' }
];

const LEARNING_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'Strot Academy',
    duration: '4 hours',
    level: 'Advanced',
    rating: 4.8,
    enrolled: 1250
  },
  {
    id: '2',
    title: 'System Design Interview Prep',
    provider: 'TechMaster',
    duration: '6 hours',
    level: 'Expert',
    rating: 4.9,
    enrolled: 890
  },
  {
    id: '3',
    title: 'Leadership for Tech Professionals',
    provider: 'CareerBoost',
    duration: '3 hours',
    level: 'Intermediate',
    rating: 4.7,
    enrolled: 2100
  }
];

export function UnifiedUserDashboard({ user, onNavigate, onLogout }: UnifiedUserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized Enhanced Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold truncate">Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {getGreeting()}, {user?.firstName}!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
              {/* Mobile: Show only essential buttons */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('notifications')}
                className="w-8 h-8 sm:w-auto sm:h-auto p-1 sm:p-2"
              >
                <Bell className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2 hidden lg:inline">Notifications</span>
              </Button>
              
              {/* Desktop: Show all buttons */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate('profile')}
                className="hidden sm:flex"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden lg:inline">Edit Profile</span>
                <span className="lg:hidden">Profile</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('settings')}
                className="w-8 h-8 sm:w-auto sm:h-auto p-1 sm:p-2"
              >
                <Settings className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2 hidden lg:inline">Settings</span>
              </Button>
              
              {/* Mobile: Menu for overflow actions */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="sm:hidden w-8 h-8 p-1"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              
              {/* Desktop: Logout button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="hidden sm:flex text-xs sm:text-sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Mobile-optimized Welcome Banner */}
        <ScrollAnimatedSection animation="fadeUp">
          <Card className="p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 bg-gradient-to-r from-primary/5 via-background to-chart-1/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  {getGreeting()}, {user?.firstName}! 👋
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4">
                  Ready to take your career to the next level?
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Crown className="w-3 h-3" />
                    <span className="truncate">
                      {user?.profileType === 'full-timer' ? 'Full-Time Pro' :
                       user?.profileType === 'freelancer' ? 'Freelancer' :
                       user?.profileType === 'gig-worker' ? 'Gig Worker' :
                       user?.profileType === 'employer' ? 'Employer' : 'Professional'}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Zap className="w-3 h-3" />
                    85% Complete
                  </Badge>
                </div>
              </div>
              <div className="text-center sm:text-right flex-shrink-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">4.9</div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">Your Rating</div>
                <div className="flex justify-center sm:justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Mobile-optimized Quick Stats */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {DASHBOARD_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <p className={`text-xs sm:text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Mobile-optimized Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-5 w-full min-w-[400px] h-10 sm:h-12">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="opportunities" className="text-xs sm:text-sm">Jobs</TabsTrigger>
              <TabsTrigger value="learning" className="text-xs sm:text-sm">Learning</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
              <TabsTrigger value="network" className="text-xs sm:text-sm">Network</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Recommended Actions */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        <span className="truncate">Recommended Actions</span>
                      </h3>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-1 sm:w-auto sm:h-auto sm:p-2">
                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {RECOMMENDED_ACTIONS.map((action, index) => (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                          onClick={() => onNavigate(action.action)}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              action.priority === 'high' ? 'bg-red-100 text-red-600' :
                              action.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <h4 className="font-medium text-sm sm:text-base truncate">{action.title}</h4>
                                <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs self-start sm:self-auto">
                                  {action.priority}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{action.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </ScrollAnimatedSection>

                {/* Recent Activity */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold">Recent Activity</h3>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('activity')} className="text-xs sm:text-sm">
                        <span className="hidden sm:inline">View All</span>
                        <span className="sm:hidden">All</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {RECENT_ACTIVITY.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activity.status === 'success' ? 'bg-green-100 text-green-600' :
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            activity.status === 'unread' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs sm:text-sm mb-1 line-clamp-1">{activity.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-2">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </ScrollAnimatedSection>
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Trending Opportunities */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        <span className="truncate">Hot Jobs</span>
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => onNavigate('jobs')} className="w-8 h-8 p-1 sm:w-auto sm:h-auto sm:p-2">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {TRENDING_OPPORTUNITIES.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 border border-border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                          onClick={() => onNavigate('job-detail')}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-xs sm:text-sm line-clamp-1 flex-1">{job.title}</h4>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs ml-2 flex-shrink-0">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{job.company}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="truncate flex-1">{job.location}</span>
                            <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                              {job.match}% match
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 text-xs sm:text-sm" onClick={() => onNavigate('jobs')}>
                      <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Find More Jobs
                    </Button>
                  </Card>
                </ScrollAnimatedSection>

                {/* Skill Insights */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">Skill Insights</h3>
                    <div className="space-y-3">
                      {SKILL_INSIGHTS.map((skill, index) => (
                        <div key={skill.skill} className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-sm font-medium truncate block">{skill.skill}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{skill.demand}</span>
                              {skill.trend === 'up' ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              )}
                              <span className="text-xs text-green-600">{skill.growth}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 text-xs sm:text-sm" variant="outline" onClick={() => onNavigate('learn')}>
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Improve Skills
                    </Button>
                  </Card>
                </ScrollAnimatedSection>

                {/* Quick Actions */}
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <Button variant="outline" size="sm" onClick={() => onNavigate('messages')} className="text-xs">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">Messages</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('applications')} className="text-xs">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">Apps</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('saved-jobs')} className="text-xs">
                        <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">Saved</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('profile')} className="text-xs">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">Profile</span>
                      </Button>
                    </div>
                  </Card>
                </ScrollAnimatedSection>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs would be implemented similarly... */}
          <TabsContent value="opportunities">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Job Opportunities</h3>
              <p className="text-sm text-muted-foreground">Advanced job search and recommendations would go here...</p>
            </Card>
          </TabsContent>

          <TabsContent value="learning">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-6">Learning & Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LEARNING_RECOMMENDATIONS.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <h4 className="font-medium mb-2 text-sm sm:text-base line-clamp-2">{course.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2 truncate">{course.provider}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs">
                      <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Start Learning
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Profile Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Profile Views</span>
                    <span className="font-semibold text-sm">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Search Appearances</span>
                    <span className="font-semibold text-sm">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Application Response Rate</span>
                    <span className="font-semibold text-sm">34%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Career Growth</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Skills Verified</span>
                    <span className="font-semibold text-sm">8/12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Certifications</span>
                    <span className="font-semibold text-sm">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Network Connections</span>
                    <span className="font-semibold text-sm">156</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Professional Network</h3>
              <p className="text-sm text-muted-foreground">Network building and professional connections would go here...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}