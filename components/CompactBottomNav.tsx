import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Home, 
  Briefcase, 
  Search, 
  MessageSquare, 
  User,
  ChevronUp,
  ChevronDown,
  Plus,
  Bell,
  Settings,
  Bot,
  Compass,
  Filter,
  Zap,
  Users,
  GraduationCap,
  Network,
  Building,
  MapPin,
  Laptop,
  TrendingUp,
  Brain,
  Globe,
  Code,
  Paintbrush,
  Database,
  Smartphone,
  Eye,
  EyeOff,
  Minimize2,
  Maximize2,
  Menu
} from 'lucide-react';

import { getUserProfileType, isNavigationItemActive, isChatInterface } from './navigation/utils';

interface CompactBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadMessages: number;
  userType?: string;
  onLogout?: () => void;
}

export function CompactBottomNav({ currentPage, onNavigate, unreadMessages, userType, onLogout }: CompactBottomNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('main');
  const [isGloballyHidden, setIsGloballyHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Check if we're in a chat interface
  const isInChatInterface = isChatInterface(currentPage);

  // Auto-minimize in chat interfaces on mount
  useEffect(() => {
    if (isInChatInterface) {
      setIsMinimized(true);
      setIsCollapsed(true);
    } else {
      setIsMinimized(false);
    }
  }, [isInChatInterface]);

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY]);

  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  // 🔥 MAIN NAVIGATION - COMPACT VERSION
  const getMainNavItems = () => {
    const isEmployer = userType === 'employer';
    
    return [
      {
        id: 'dashboard',
        label: 'Home',
        icon: Home,
        badge: null,
        color: 'text-blue-600',
        hoverColor: 'hover:bg-blue-50'
      },
      {
        id: isEmployer ? 'find-talent' : 'jobs',
        label: isEmployer ? 'Find Talent' : 'Jobs',
        icon: isEmployer ? Users : Briefcase,
        badge: isEmployer ? 'NEW' : '847',
        color: isEmployer ? 'text-purple-600' : 'text-green-600',
        hoverColor: isEmployer ? 'hover:bg-purple-50' : 'hover:bg-green-50'
      },
      {
        id: 'explore',
        label: 'Discover',
        icon: Compass,
        badge: '23',
        color: 'text-orange-600',
        hoverColor: 'hover:bg-orange-50'
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: MessageSquare,
        badge: unreadMessages > 0 ? unreadMessages.toString() : null,
        color: 'text-red-600',
        hoverColor: 'hover:bg-red-50'
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        badge: null,
        color: 'text-indigo-600',
        hoverColor: 'hover:bg-indigo-50'
      }
    ];
  };

  // 🎯 ALL JOB TYPES - COMPACT
  const jobTypesSection = [
    {
      id: 'freelance-marketplace',
      label: 'Freelance',
      icon: Laptop,
      badge: '234',
      color: 'text-blue-600'
    },
    {
      id: 'full-time-jobs',
      label: 'Full-time',
      icon: Building,
      badge: '456',
      color: 'text-green-600'
    },
    {
      id: 'local-tasks',
      label: 'Local Gigs',
      icon: MapPin,
      badge: '123',
      color: 'text-orange-600'
    },
    {
      id: 'talent-search',
      label: 'Find Talent',
      icon: Users,
      badge: 'PRO',
      color: 'text-purple-600'
    }
  ];

  // 🧠 AI & LEARNING - COMPACT
  const aiLearningSection = [
    {
      id: 'ai-learning',
      label: 'AI Learning',
      icon: GraduationCap,
      badge: 'NEW',
      color: 'text-pink-600'
    },
    {
      id: 'ai-chat',
      label: 'AI Assistant',
      icon: Bot,
      badge: '24/7',
      color: 'text-cyan-600'
    },
    {
      id: 'job-matching',
      label: 'Smart Match',
      icon: Zap,
      badge: 'AI',
      color: 'text-yellow-600'
    }
  ];

  // 🌐 SOCIAL & COMMUNITY - COMPACT
  const socialSection = [
    {
      id: 'social',
      label: 'Community',
      icon: Network,
      badge: '1.2k',
      color: 'text-emerald-600'
    },
    {
      id: 'notifications',
      label: 'Activity',
      icon: Bell,
      badge: '7',
      color: 'text-red-600'
    },
    {
      id: 'advanced-search',
      label: 'Advanced',
      icon: Filter,
      badge: 'PRO',
      color: 'text-violet-600'
    }
  ];

  // 🛠️ TOOLS & SETTINGS - COMPACT
  const toolsSection = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      badge: null,
      color: 'text-blue-600'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      color: 'text-gray-600'
    }
  ];

  const navigationSections = {
    main: { items: getMainNavItems(), title: 'Main' },
    jobs: { items: jobTypesSection, title: 'All Job Types' },
    ai: { items: aiLearningSection, title: 'AI & Learning' },
    social: { items: socialSection, title: 'Social & Tools' },
    tools: { items: toolsSection, title: 'Analytics & Settings' }
  };

  // 🎯 ENHANCED ROUTING LOGIC
  const handleNavigation = (pageId: string) => {
    console.log('🚀 Enhanced Navigation:', { pageId, userType, currentPage });
    
    let targetPage = pageId;
    
    if (pageId === 'jobs') {
      if (userType === 'freelancer') {
        targetPage = 'marketplace';
      } else if (userType === 'full-timer') {
        targetPage = 'full-time-jobs';
      } else if (userType === 'local-gig') {
        targetPage = 'local-tasks';
      } else {
        targetPage = 'full-time-jobs';
      }
    } else if (pageId === 'find-talent') {
      if (userType === 'employer') {
        targetPage = 'talent-search';
      } else {
        targetPage = 'full-time-jobs';
      }
    } else if (pageId === 'jobs-hub') {
      setActiveSection('jobs');
      return;
    } else if (pageId === 'ai-learning') {
      targetPage = 'learning';
    } else if (pageId === 'social') {
      targetPage = 'social';
    }
    
    onNavigate(targetPage);
    setActiveSection('main');
  };

  const renderSection = (sectionKey: string) => {
    const section = navigationSections[sectionKey];
    if (!section) return null;

    return (
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-2"
      >
        {sectionKey !== 'main' && (
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground text-sm">{section.title}</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveSection('main')}
              className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
            >
              Back
            </Button>
          </div>
        )}

        <div className={`grid gap-1 ${
          sectionKey === 'main' 
            ? 'grid-cols-5' 
            : section.items.length <= 3 
              ? 'grid-cols-3' 
              : 'grid-cols-2'
        }`}>
          {section.items.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.id)}
              className={`
                relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200
                ${isNavigationItemActive(item.id, currentPage)
                  ? `${item.color} bg-current/10 shadow-sm ring-1 ring-current/20` 
                  : `text-gray-500 hover:text-gray-700 ${item.hoverColor || 'hover:bg-gray-50'}`
                }
              `}
            >
              <div className="relative">
                <div className={`
                  w-7 h-7 rounded-md flex items-center justify-center
                  ${isNavigationItemActive(item.id, currentPage) ? 'bg-current/10' : 'bg-gray-100'}
                  transition-all duration-200
                `}>
                  <item.icon className="w-4 h-4" />
                </div>
                {item.badge && (
                  <Badge 
                    variant={
                      item.badge === 'NEW' ? 'default' : 
                      item.badge === 'PRO' || item.badge === 'AI' || item.badge === '24/7' ? 'secondary' : 
                      'destructive'
                    } 
                    className="absolute -top-0.5 -right-0.5 min-w-3 h-3 rounded-full p-0 flex items-center justify-center text-[10px] font-medium"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {sectionKey === 'main' && (
          <div className="space-y-2 mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-center gap-1">
              {Object.entries(navigationSections).filter(([key]) => key !== 'main').map(([key, section]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(key)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
                >
                  {key === 'jobs' && <Briefcase className="w-2.5 h-2.5" />}
                  {key === 'ai' && <Brain className="w-2.5 h-2.5" />}
                  {key === 'social' && <Globe className="w-2.5 h-2.5" />}
                  {key === 'tools' && <Settings className="w-2.5 h-2.5" />}
                  <span>{section.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Universal Collapse Button - Always Visible */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsGloballyHidden(!isGloballyHidden)}
        className={`fixed z-[60] w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-sm border border-blue-300/50 rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ${
          isInChatInterface ? 'bottom-4 right-4' : 'bottom-4 left-4'
        }`}
        title={isGloballyHidden ? "Show navigation" : "Hide navigation"}
      >
        {isGloballyHidden ? <Eye className="w-4 h-4 text-white" /> : <EyeOff className="w-4 h-4 text-white" />}
      </motion.button>

      {/* Main Navigation */}
      <AnimatePresence>
        {isVisible && !isGloballyHidden && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className={`fixed z-50 ${
              isInChatInterface ? 'bottom-2 right-16' : 'bottom-2 left-1/2 transform -translate-x-1/2'
            }`}
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  width: isCollapsed || isMinimized ? '48px' : 'auto',
                  height: isMinimized ? '48px' : 'auto',
                  borderRadius: isCollapsed || isMinimized ? '24px' : '16px'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl overflow-hidden"
              >
                {/* Control Buttons - More Compact */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                  {/* Minimize/Maximize Button for Chat Interfaces */}
                  {isInChatInterface && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 backdrop-blur-sm border border-green-300/50 rounded-full shadow-md flex items-center justify-center hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                      title={isMinimized ? "Maximize navigation" : "Minimize navigation"}
                    >
                      {isMinimized ? <Maximize2 className="w-3 h-3 text-white" /> : <Minimize2 className="w-3 h-3 text-white" />}
                    </motion.button>
                  )}

                  {/* Collapse/Expand Button */}
                  {!isMinimized && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      className="w-6 h-6 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
                      title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
                    >
                      <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronUp className="w-3 h-3 text-gray-600" />
                      </motion.div>
                    </motion.button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isMinimized ? (
                    <motion.div
                      key="minimized"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 flex items-center justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMinimized(false)}
                        className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300"
                      >
                        <Menu className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  ) : !isCollapsed ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderSection(activeSection)}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="p-2"
                    >
                      <div className="flex flex-col items-center gap-1">
                        {getMainNavItems().slice(0, 3).map((item) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigation(item.id)}
                            className={`
                              relative p-1.5 rounded-full transition-all duration-200
                              ${isNavigationItemActive(item.id, currentPage)
                                ? `${item.color} bg-current/10` 
                                : `text-gray-500 hover:bg-gray-50`
                              }
                            `}
                          >
                            <item.icon className="w-3 h-3" />
                            {item.badge && (
                              <Badge 
                                variant="destructive" 
                                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full p-0 flex items-center justify-center text-[8px]"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </motion.button>
                        ))}
                        <div className="w-4 h-px bg-gray-200 my-0.5" />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCollapsed(false)}
                          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-50 transition-all duration-200"
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Create Button - More Compact */}
              {!isMinimized && (
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('create')}
                  className="absolute -top-4 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}