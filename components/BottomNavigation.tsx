import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { 
  Home, 
  Briefcase, 
  Search, 
  MessageSquare, 
  User 
} from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadMessages: number;
}

export function BottomNavigation({ currentPage, onNavigate, unreadMessages }: BottomNavigationProps) {
  // ORIGINAL BOTTOM NAVIGATION - RESTORED AS REQUESTED
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'full-time-jobs',
      label: 'Jobs',
      icon: Briefcase,
      badge: '284',
      // Handle routing based on user profile type - will be determined in AuthenticatedPages
      routes: ['full-time-jobs', 'jobs', 'marketplace', 'freelance', 'local-tasks', 'tasks']
    },
    {
      id: 'job-discovery',
      label: 'Explore',
      icon: Search,
      badge: '12',
      routes: ['job-discovery', 'explore', 'advanced-search']
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages.toString() : null,
      routes: ['messages', 'direct-chat', 'chat', 'ai-chat']
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      badge: null,
      routes: ['profile', 'public-profile', 'settings']
    }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-background/95 backdrop-blur-lg border-t border-border px-4 py-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navigationItems.map((item) => {
          // Check if current page matches this navigation item
          const isActive = currentPage === item.id || 
                          (item.routes && item.routes.includes(currentPage)) ||
                          (item.id === 'full-time-jobs' && ['jobs', 'full-time-jobs', 'marketplace', 'freelance', 'local-tasks', 'tasks'].includes(currentPage)) ||
                          (item.id === 'job-discovery' && ['explore', 'job-discovery', 'advanced-search'].includes(currentPage)) ||
                          (item.id === 'messages' && ['messages', 'direct-chat', 'chat', 'ai-chat', 'ai-chatbot'].includes(currentPage)) ||
                          (item.id === 'profile' && ['profile', 'public-profile', 'settings', 'analytics'].includes(currentPage));
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}