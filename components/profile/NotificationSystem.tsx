import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell,
  BellRing,
  CheckCircle,
  X,
  Settings,
  Mail,
  MessageSquare,
  Briefcase,
  Users,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
  MoreHorizontal,
  Trash2,
  Archive,
  Clock,
  Zap,
  Building,
  Globe
} from 'lucide-react';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface Notification {
  id: string;
  type: 'job_match' | 'application_update' | 'message' | 'connection' | 'achievement' | 'recommendation' | 'interview' | 'profile_view' | 'skill_verification' | 'learning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  avatar?: string;
  metadata?: {
    company?: string;
    position?: string;
    salary?: string;
    person?: string;
    skill?: string;
    course?: string;
  };
}

const NOTIFICATION_TYPES = {
  job_match: { icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  application_update: { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  message: { icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
  connection: { icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
  achievement: { icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  recommendation: { icon: Star, color: 'text-pink-500', bg: 'bg-pink-50' },
  interview: { icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  profile_view: { icon: Eye, color: 'text-gray-500', bg: 'bg-gray-50' },
  skill_verification: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  learning: { icon: BookOpen, color: 'text-cyan-500', bg: 'bg-cyan-50' }
};

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'job_match',
    title: 'New Job Match',
    message: 'Senior Frontend Developer at TechCorp matches your profile (95% match)',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    priority: 'high',
    actionUrl: '/jobs/123',
    metadata: { company: 'TechCorp', position: 'Senior Frontend Developer', salary: '$140k-160k' }
  },
  {
    id: '2',
    type: 'application_update',
    title: 'Application Status Update',
    message: 'Your application for Product Manager at StartupXYZ has moved to the interview stage',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    priority: 'urgent',
    actionUrl: '/applications/456',
    metadata: { company: 'StartupXYZ', position: 'Product Manager' }
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'Sarah from HR at TechVision sent you a message about the Developer position',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    priority: 'medium',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
    metadata: { person: 'Sarah Johnson', company: 'TechVision' }
  },
  {
    id: '4',
    type: 'connection',
    title: 'New Connection Request',
    message: 'Michael Chen wants to connect with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
    priority: 'low',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    metadata: { person: 'Michael Chen' }
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Skill Verified!',
    message: 'Congratulations! You've earned a verified React.js badge',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: 'medium',
    metadata: { skill: 'React.js' }
  },
  {
    id: '6',
    type: 'interview',
    title: 'Interview Reminder',
    message: 'Your interview with DevCorp is scheduled for tomorrow at 2:00 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    priority: 'high',
    metadata: { company: 'DevCorp' }
  },
  {
    id: '7',
    type: 'profile_view',
    title: 'Profile Views',
    message: 'Your profile was viewed by 5 recruiters this week',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
    priority: 'low'
  },
  {
    id: '8',
    type: 'learning',
    title: 'Course Completed',
    message: 'You completed "Advanced TypeScript" course and earned a certificate',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    read: true,
    priority: 'medium',
    metadata: { course: 'Advanced TypeScript' }
  }
];

const NOTIFICATION_SETTINGS = {
  job_matches: { label: 'Job Matches', enabled: true, email: true, push: true },
  applications: { label: 'Application Updates', enabled: true, email: true, push: true },
  messages: { label: 'Messages', enabled: true, email: false, push: true },
  connections: { label: 'Connection Requests', enabled: true, email: false, push: false },
  achievements: { label: 'Achievements & Badges', enabled: true, email: true, push: true },
  interviews: { label: 'Interview Reminders', enabled: true, email: true, push: true },
  profile_activity: { label: 'Profile Views', enabled: false, email: false, push: false },
  learning: { label: 'Learning Updates', enabled: true, email: false, push: false }
};

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'priority'>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notification every 30 seconds
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'job_match',
          title: 'New Job Alert',
          message: 'A new job matching your skills was just posted',
          timestamp: new Date(),
          read: false,
          priority: 'medium',
          metadata: { company: 'New Company', position: 'Developer' }
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'priority') return notif.priority === 'high' || notif.priority === 'urgent';
    if (selectedType) return notif.type === selectedType;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const priorityCount = notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ScrollAnimatedSection animation="fadeUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-8 h-8 text-primary" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated with your professional activities
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Stats */}
      <ScrollAnimatedSection animation="fadeUp">
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{notifications.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{priorityCount}</div>
            <div className="text-sm text-muted-foreground">Priority</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {notifications.filter(n => n.timestamp.toDateString() === new Date().toDateString()).length}
            </div>
            <div className="text-sm text-muted-foreground">Today</div>
          </Card>
        </div>
      </ScrollAnimatedSection>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <ScrollAnimatedSection animation="fadeUp">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                All Notifications
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
                size="sm"
                className="gap-1"
              >
                <BellRing className="w-4 h-4" />
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'priority' ? 'default' : 'outline'}
                onClick={() => setFilter('priority')}
                size="sm"
                className="gap-1"
              >
                <Zap className="w-4 h-4" />
                Priority ({priorityCount})
              </Button>
            </div>
          </ScrollAnimatedSection>

          {/* Type Filters */}
          <ScrollAnimatedSection animation="fadeUp">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === null ? 'default' : 'outline'}
                onClick={() => setSelectedType(null)}
                size="sm"
              >
                All Types
              </Button>
              {Object.entries(NOTIFICATION_TYPES).map(([type, config]) => {
                const count = notifications.filter(n => n.type === type).length;
                return (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    onClick={() => setSelectedType(type)}
                    size="sm"
                    className="gap-1"
                  >
                    <config.icon className="w-4 h-4" />
                    {type.replace('_', ' ')} ({count})
                  </Button>
                );
              })}
            </div>
          </ScrollAnimatedSection>

          {/* Notifications List */}
          <ScrollAnimatedSection animation="fadeUp">
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <Card className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </Card>
              ) : (
                filteredNotifications.map((notification, index) => {
                  const typeConfig = NOTIFICATION_TYPES[notification.type];
                  const TypeIcon = typeConfig.icon;
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <Card className={`p-4 transition-all hover:shadow-md ${
                        !notification.read ? 'bg-blue-50/50 border-blue-200' : 'hover:bg-muted/30'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Icon/Avatar */}
                          <div className="flex-shrink-0">
                            {notification.avatar ? (
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>
                                  <TypeIcon className="w-5 h-5" />
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`w-10 h-10 rounded-full ${typeConfig.bg} flex items-center justify-center`}>
                                <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                              </div>
                            )}
                            {!notification.read && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full absolute -mt-1 -ml-1" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                                  {notification.priority}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>

                            {/* Metadata */}
                            {notification.metadata && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {notification.metadata.company && (
                                  <Badge variant="outline" className="text-xs">
                                    <Building className="w-3 h-3 mr-1" />
                                    {notification.metadata.company}
                                  </Badge>
                                )}
                                {notification.metadata.position && (
                                  <Badge variant="outline" className="text-xs">
                                    <Briefcase className="w-3 h-3 mr-1" />
                                    {notification.metadata.position}
                                  </Badge>
                                )}
                                {notification.metadata.salary && (
                                  <Badge variant="outline" className="text-xs">
                                    <DollarSign className="w-3 h-3 mr-1" />
                                    {notification.metadata.salary}
                                  </Badge>
                                )}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              {notification.actionUrl && (
                                <Button size="sm">
                                  View Details
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </div>
          </ScrollAnimatedSection>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <ScrollAnimatedSection animation="fadeUp">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                {Object.entries(NOTIFICATION_SETTINGS).map(([key, setting]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{setting.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for {setting.label.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <Switch defaultChecked={setting.email} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <Switch defaultChecked={setting.push} />
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fadeUp">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Quiet Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Don't send notifications during these hours
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">10:00 PM - 8:00 AM</span>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekend Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on weekends
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary email at 8:00 AM
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </Card>
          </ScrollAnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}