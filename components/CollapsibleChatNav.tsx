import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home,
  Briefcase,
  Laptop,
  Navigation,
  Search,
  Plus,
  ChevronUp,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { Page } from './app/types';

interface CollapsibleChatNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  unreadMessages: number;
  userType?: string;
}

export function CollapsibleChatNav({ 
  currentPage, 
  onNavigate, 
  unreadMessages,
  userType = 'candidate'
}: CollapsibleChatNavProps) {
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="relative">
        {/* Expanded Navigation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 mb-2"
            >
              <div className="bg-background/90 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl p-2">
                <div className="flex items-center gap-1">
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
                        className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                          item.isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">{item.label}</span>
                        
                        {item.id === 'messages' && unreadMessages > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 rounded-full"
                          >
                            {unreadMessages > 9 ? '9+' : unreadMessages}
                          </Badge>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-background/90 backdrop-blur-xl rounded-full border border-border/50 shadow-2xl p-4 flex items-center justify-center transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
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
          
          {/* Unread messages indicator */}
          {unreadMessages > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center p-0 rounded-full"
            >
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </Badge>
          )}
        </motion.button>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full blur-xl -z-10" />
      </div>
    </motion.div>
  );
}