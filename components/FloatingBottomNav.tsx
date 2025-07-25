import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  X,
  Eye,
  EyeOff,
  Minimize2,
  Maximize2
} from 'lucide-react';

import { getUserProfileType, isNavigationItemActive, isChatInterface } from './navigation/utils';

interface FloatingBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadMessages: number;
  userType?: string;
  onLogout?: () => void;
}

export function FloatingBottomNav({ currentPage, onNavigate, unreadMessages, userType, onLogout }: FloatingBottomNavProps) {
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

  // 🔥 MAIN NAVIGATION - EMPLOYER GETS "FIND TALENT", OTHERS GET "JOBS"
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
        // 🔥 FIXED: Only employers get "find-talent", everyone else gets "jobs"
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

  // 🎯 ALL JOB TYPES - UNIVERSAL ACCESS
  const jobTypesSection = [
    {
      id: 'freelance-marketplace',
      label: 'Freelance',
      icon: Laptop,
      badge: '234',
      color: 'text-blue-600',
      description: 'Project-based work'
    },
    {
      id: 'full-time-jobs',
      label: 'Full-time',
      icon: Building,
      badge: '456',
      color: 'text-green-600',
      description: 'Career positions'
    },
    {
      id: 'local-tasks',
      label: 'Local Gigs',
      icon: MapPin,
      badge: '123',
      color: 'text-orange-600',
      description: 'Nearby tasks'
    },
    {
      id: 'talent-search',
      label: 'Find Talent',
      icon: Users,
      badge: 'PRO',
      color: 'text-purple-600',
      description: 'Hire professionals'
    }
  ];

  // 🧠 AI & LEARNING
  const aiLearningSection = [
    {
      id: 'ai-learning',
      label: 'AI Learning',
      icon: GraduationCap,
      badge: 'NEW',
      color: 'text-pink-600',
      description: 'Skill development'
    },
    {
      id: 'ai-chat',
      label: 'AI Assistant',
      icon: Bot,
      badge: '24/7',
      color: 'text-cyan-600',
      description: 'Smart guidance'
    },
    {
      id: 'job-matching',
      label: 'Smart Match',
      icon: Zap,
      badge: 'AI',
      color: 'text-yellow-600',
      description: 'Perfect opportunities'
    }
  ];

  // 🌐 SOCIAL & COMMUNITY
  const socialSection = [
    {
      id: 'social',
      label: 'Community',
      icon: Network,
      badge: '1.2k',
      color: 'text-emerald-600',
      description: 'Connect & share'
    },
    {
      id: 'notifications',
      label: 'Activity',
      icon: Bell,
      badge: '7',
      color: 'text-red-600',
      description: 'Latest updates'
    },
    {
      id: 'advanced-search',
      label: 'Advanced',
      icon: Filter,
      badge: 'PRO',
      color: 'text-violet-600',
      description: 'Detailed filters'
    }
  ];

  // 🛠️ TOOLS & SETTINGS
  const toolsSection = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      badge: null,
      color: 'text-blue-600',
      description: 'Performance insights'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      color: 'text-gray-600',
      description: 'Preferences'
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
    
    // 🔥 FIXED: Smart routing based on user type and navigation intent
    if (pageId === 'jobs') {
      // For non-employers, smart route to appropriate job type based on their profile
      if (userType === 'freelancer') {
        targetPage = 'marketplace';
      } else if (userType === 'full-timer') {
        targetPage = 'full-time-jobs';
      } else if (userType === 'local-gig') {
        targetPage = 'local-tasks';
      } else {
        targetPage = 'full-time-jobs'; // Default fallback
      }
    } else if (pageId === 'find-talent') {
      // Only employers should access this
      if (userType === 'employer') {
        targetPage = 'talent-search';
      } else {
        // Non-employers trying to access find-talent get redirected to jobs
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
        className="p-4"
      >
        {sectionKey !== 'main' && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">{section.title}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveSection('main')}
              className="text-muted-foreground hover:text-foreground"
            >
              Back
            </Button>
          </div>
        )}

        <div className={`grid gap-3 ${
          sectionKey === 'main' 
            ? 'grid-cols-5' 
            : section.items.length <= 3 
              ? 'grid-cols-3' 
              : 'grid-cols-2'
        }`}>
          {section.items.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(item.id)}
              className={`
                relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300
                ${isNavigationItemActive(item.id, currentPage)
                  ? `${item.color} bg-current/10 shadow-lg ring-2 ring-current/20` 
                  : `text-gray-500 hover:text-gray-700 ${item.hoverColor || 'hover:bg-gray-50'}`
                }
              `}
            >
              <div className="relative">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${isNavigationItemActive(item.id, currentPage) ? 'bg-current/10' : 'bg-gray-100'}
                  transition-all duration-300
                `}>
                  <item.icon className="w-5 h-5" />
                </div>
                {item.badge && (
                  <Badge 
                    variant={
                      item.badge === 'NEW' ? 'default' : 
                      item.badge === 'PRO' || item.badge === 'AI' || item.badge === '24/7' ? 'secondary' : 
                      'destructive'
                    } 
                    className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs font-medium"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <div className="text-center">
                <span className={`text-xs font-medium block ${sectionKey === 'main' ? '' : 'mb-1'}`}>
                  {item.label}
                </span>
                {sectionKey !== 'main' && 'description' in item && (
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {sectionKey === 'main' && (
          <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              {Object.entries(navigationSections).filter(([key]) => key !== 'main').map(([key, section]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(key)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
                >
                  {key === 'jobs' && <Briefcase className="w-3 h-3" />}
                  {key === 'ai' && <Brain className="w-3 h-3" />}
                  {key === 'social' && <Globe className="w-3 h-3" />}
                  {key === 'tools' && <Settings className="w-3 h-3" />}
                  <span>{section.title}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Logout Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLogout && onLogout()}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200/50 transition-all duration-200"
              >
                <X className="w-3 h-3" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Show Button when globally hidden */}
      <AnimatePresence>
        {isGloballyHidden && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsGloballyHidden(false)}
            className={`fixed bottom-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-lg border border-blue-300/50 rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ${
              isInChatInterface ? 'right-6' : 'left-1/2 transform -translate-x-1/2'
            }`}
            title="Show navigation"
          >
            <Eye className="w-6 h-6 text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-blue-400/30"
            />
          </motion.button>
        )}
      </AnimatePresence>

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
            isInChatInterface ? 'bottom-2 right-2' : 'bottom-6 left-1/2 transform -translate-x-1/2'
          }`}
        >
          <div className="relative">
            <motion.div
              animate={{ 
                width: isCollapsed || isMinimized ? '60px' : 'auto',
                height: isMinimized ? '60px' : 'auto',
                borderRadius: isCollapsed || isMinimized ? '30px' : '24px'
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl overflow-hidden"
            >
              {/* Control Buttons */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                {/* Minimize/Maximize Button for Chat Interfaces */}
                {isInChatInterface && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 backdrop-blur-lg border border-green-300/50 rounded-full shadow-xl flex items-center justify-center hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                    title={isMinimized ? "Maximize navigation" : "Minimize navigation"}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
                  </motion.button>
                )}

                {/* Collapse/Expand Button */}
                {!isMinimized && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-10 h-10 bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
                    title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
                  >
                    <motion.div
                      animate={{ rotate: isCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </motion.button>
                )}

                {/* Global Hide Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsGloballyHidden(true)}
                  className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-lg border border-red-300/50 rounded-full shadow-xl flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                  title="Hide navigation completely"
                >
                  <EyeOff className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {isMinimized ? (
                  <motion.div
                    key="minimized"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMinimized(false)}
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : !isCollapsed ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
                    className="p-3"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {getMainNavItems().slice(0, 3).map((item) => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleNavigation(item.id)}
                          className={`
                            relative p-2 rounded-full transition-all duration-300
                            ${isNavigationItemActive(item.id, currentPage)
                              ? `${item.color} bg-current/10` 
                              : `text-gray-500 hover:bg-gray-50`
                            }
                          `}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.badge && (
                            <Badge 
                              variant="destructive" 
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full p-0 flex items-center justify-center text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </motion.button>
                      ))}
                      <div className="w-6 h-px bg-gray-200 my-1" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsCollapsed(false)}
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-50 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Create Button */}
            {!isMinimized && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate('create')}
                className="absolute -top-6 -right-3 w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
              >
                <Plus className="w-6 h-6" />
              </motion.button>
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}