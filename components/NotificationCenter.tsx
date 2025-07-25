import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Bell,
  BellOff,
  Settings,
  MoreHorizontal,
  CheckCircle,
  X,
  Briefcase,
  MessageSquare,
  Calendar,
  Award,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  Info,
  Clock,
  Star,
  Building,
  Filter
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from './ScrollAnimatedSection';

interface NotificationCenterProps {
  onNavigate: (page: string) => void;
}

interface Notification {
  id: string;
  type: 'job' | 'application' | 'interview' | 'message' | 'achievement' | 'payment' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  actionLabel?: string;
  avatar?: string;
  metadata?: {
    company?: string;
    jobTitle?: string;
    amount?: string;
    sender?: string;
  };
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Your interview with TechCorp Inc. for Senior Frontend Developer is scheduled for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      isImportant: true,
      actionUrl: 'video-call',
      actionLabel: 'Join Interview',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
      metadata: {
        company: 'TechCorp Inc.',
        jobTitle: 'Senior Frontend Developer'
      }
    },
    {
      id: '2',
      type: 'application',
      title: 'Application Status Update',
      description: 'Your application for Product Manager at StartupXYZ has been reviewed and moved to the next round',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false,
      isImportant: false,
      actionUrl: 'applications',
      actionLabel: 'View Application',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      metadata: {
        company: 'StartupXYZ',
        jobTitle: 'Product Manager'
      }
    },
    {
      id: '3',
      type: 'job',
      title: 'New Job Match',
      description: 'We found 3 new jobs that match your preferences. Check them out!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      isRead: true,
      isImportant: false,
      actionUrl: 'jobs',
      actionLabel: 'View Jobs'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message from Recruiter',
      description: 'Sarah Johnson from TechCorp sent you a message about the Senior Frontend Developer position',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: true,
      isImportant: false,
      actionUrl: 'messages',
      actionLabel: 'Reply',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
      metadata: {
        sender: 'Sarah Johnson'
      }
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Profile Milestone',
      description: 'Congratulations! Your profile completion reached 90%. This increases your visibility to employers.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      isImportant: false,
      actionUrl: 'profile',
      actionLabel: 'Complete Profile'
    },
    {
      id: '6',
      type: 'payment',
      title: 'Payment Received',
      description: 'You received $500 for completing the Web Development project for ClientCorp',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: true,
      isImportant: false,
      metadata: {
        amount: '$500'
      }
    },
    {
      id: '7',
      type: 'system',
      title: 'Security Alert',
      description: 'Your account was accessed from a new device. If this wasn\'t you, please secure your account.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      isRead: true,
      isImportant: true,
      actionUrl: 'settings',
      actionLabel: 'Review Security'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job': return Briefcase;
      case 'application': return CheckCircle;
      case 'interview': return Calendar;
      case 'message': return MessageSquare;
      case 'achievement': return Award;
      case 'payment': return DollarSign;
      case 'system': return AlertTriangle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'job': return 'text-blue-500';
      case 'application': return 'text-green-500';
      case 'interview': return 'text-purple-500';
      case 'message': return 'text-orange-500';
      case 'achievement': return 'text-yellow-500';
      case 'payment': return 'text-emerald-500';
      case 'system': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      onNavigate(notification.actionUrl);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'important': return notification.isImportant;
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantCount = notifications.filter(n => n.isImportant).length;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <h1 className="text-xl">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark All Read
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <ScrollAnimatedSection animation="fadeUp">
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="important">
                  Important ({importantCount})
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <TabsContent value={filter} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="p-12 text-center">
                  <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {filter === 'unread' ? 'All caught up! No unread notifications.' : 'You\'re all set. Check back later for updates.'}
                  </p>
                </Card>
              ) : (
                <StaggeredList className="space-y-3">
                  {filteredNotifications.map((notification, index) => {
                    const Icon = getNotificationIcon(notification.type);
                    const iconColor = getNotificationColor(notification.type);
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <Card 
                          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                            !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {notification.avatar ? (
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={notification.avatar} />
                                  <AvatarFallback>
                                    <Icon className={`w-5 h-5 ${iconColor}`} />
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
                                  <Icon className={`w-5 h-5 ${iconColor}`} />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {notification.title}
                                    </p>
                                    {notification.isImportant && (
                                      <Badge variant="destructive" className="text-xs">
                                        Important
                                      </Badge>
                                    )}
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full" />
                                    )}
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                    {notification.description}
                                  </p>
                                  
                                  {notification.metadata && (
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                      {notification.metadata.company && (
                                        <span className="flex items-center gap-1">
                                          <Building className="w-3 h-3" />
                                          {notification.metadata.company}
                                        </span>
                                      )}
                                      {notification.metadata.amount && (
                                        <span className="flex items-center gap-1">
                                          <DollarSign className="w-3 h-3" />
                                          {notification.metadata.amount}
                                        </span>
                                      )}
                                      {notification.metadata.sender && (
                                        <span className="flex items-center gap-1">
                                          <Users className="w-3 h-3" />
                                          {notification.metadata.sender}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="w-3 h-3" />
                                      {formatTimestamp(notification.timestamp)}
                                    </div>
                                    
                                    {notification.actionLabel && (
                                      <Button variant="outline" size="sm" className="text-xs">
                                        {notification.actionLabel}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                      className="w-8 h-8 p-0"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="w-8 h-8 p-0"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </StaggeredList>
              )}
            </TabsContent>
          </Tabs>
        </ScrollAnimatedSection>

        {/* Notification Settings */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.3}>
          <Card className="p-6 mt-8">
            <h3 className="font-semibold mb-4">Notification Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Job Matches</p>
                  <p className="text-sm text-muted-foreground">New jobs that match your profile</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application Updates</p>
                  <p className="text-sm text-muted-foreground">Status changes on your applications</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Interview Reminders</p>
                  <p className="text-sm text-muted-foreground">Upcoming interview notifications</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">New messages from employers</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}