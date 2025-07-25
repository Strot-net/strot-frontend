import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home,
  Briefcase,
  Laptop,
  Navigation,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { Page } from './app/types';

interface HorizontalCollapsibleChatNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  unreadMessages: number;
  userType?: string;
}

export function HorizontalCollapsibleChatNav({ 
  currentPage, 
  onNavigate, 
  unreadMessages,
  userType = 'candidate'
}: HorizontalCollapsibleChatNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as Page,
      icon: Home,
      label: 'Home',
      isActive: currentPage === 'dashboard'
    },
    {
      id: 'full-time-jobs' as Page,
      icon: Briefcase,
      label: 'Full-Time',
      isActive: currentPage === 'full-time-jobs'
    },
    {
      id: (userType === 'employer' ? 'create' : 'jobs') as Page,
      icon: userType === 'employer' ? Plus : Search,
      label: userType === 'employer' ? 'Post Job' : 'Discover',
      isActive: currentPage === (userType === 'employer' ? 'create' : 'jobs')
    },
    {
      id: 'freelance' as Page,
      icon: Laptop,
      label: 'Freelance',
      isActive: currentPage === 'freelance'
    },
    {
      id: 'tasks' as Page,
      icon: Navigation,
      label: 'Local',
      isActive: currentPage === 'tasks'
    }
  ];

  return (
    <div className="fixed bottom-40 right-6 z-40">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="relative"
      >
        {/* Expanded Navigation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 bottom-0"
            >
              <div className="bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-2xl p-2 flex items-center gap-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsExpanded(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                        item.isActive 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                      
                      {item.id === 'messages' && unreadMessages > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="ml-1 w-5 h-5 text-xs flex items-center justify-center p-0 rounded-full"
                        >
                          {unreadMessages > 9 ? '9+' : unreadMessages}
                        </Badge>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl p-3 flex items-center justify-center transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </motion.div>
          </div>
          
          {/* Active indicator */}
          {navItems.some(item => item.isActive) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
            />
          )}
          
          {/* Quick access indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-1 h-1 bg-primary rounded-full" />
          </motion.div>
        </motion.button>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl blur-xl -z-10" />
      </motion.div>
    </div>
  );
}