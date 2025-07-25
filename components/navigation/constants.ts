// Navigation route mappings and constants
export const NAVIGATION_ROUTES = {
  // Main Dashboard
  DASHBOARD: ['dashboard', 'home'],
  
  // Job Types - Universal Access
  FREELANCE_MARKETPLACE: ['marketplace', 'freelance', 'freelance-marketplace'],
  FULL_TIME_JOBS: ['full-time-jobs', 'jobs', 'careers'],
  LOCAL_TASKS: ['local-tasks', 'tasks', 'gigs', 'local-gigs'],
  TALENT_SEARCH: ['talent-search', 'find-talent', 'hire', 'recruitment'],
  
  // Discovery & Search
  JOB_DISCOVERY: ['job-discovery', 'explore', 'discover'],
  BROWSE: ['browse', 'browse-opportunities'],
  ADVANCED_SEARCH: ['advanced-search', 'advanced-job-search', 'search'],
  JOB_MATCHING: ['job-matching', 'matching', 'smart-matching'],
  
  // AI & Learning
  AI_LEARNING: ['learning', 'learn', 'ai-learning', 'education', 'courses', 'ai-learning-studio'],
  AI_CHAT: ['ai-chat', 'ai-assistant-chat'],
  AI_CHATBOT: ['ai-chatbot', 'chatbot', 'bot'],
  AI_ASSISTANT: ['ai-assistant', 'ai-job-assistant', 'job-assistant'],
  
  // Social & Community
  SOCIAL: ['social', 'network', 'networking', 'community', 'social-platform'],
  
  // Communication
  MESSAGES: ['messages', 'inbox'],
  DIRECT_CHAT: ['direct-chat', 'chat', 'conversation'],
  VIDEO_CALL: ['video-call', 'video', 'video-chat', 'meeting'],
  
  // Profile & Settings
  PROFILE: ['profile', 'my-profile', 'account'],
  PUBLIC_PROFILE: ['public-profile', 'user-profile', 'view-profile'],
  SETTINGS: ['settings', 'preferences', 'configuration'],
  
  // Analytics & Notifications
  ANALYTICS: ['analytics', 'insights', 'stats', 'metrics'],
  NOTIFICATIONS: ['notifications', 'alerts', 'activity'],
  
  // Content & Job Details
  CREATE: ['create', 'post', 'new', 'add'],
  JOB_DETAIL: ['job-detail', 'job-details', 'position', 'opportunity'],
  
  // Special Routes
  LANDING: ['landing']
} as const;

// Active state detection mappings
export const ACTIVE_STATE_MAPPINGS = {
  'dashboard': NAVIGATION_ROUTES.DASHBOARD,
  'jobs-hub': [...NAVIGATION_ROUTES.FREELANCE_MARKETPLACE, ...NAVIGATION_ROUTES.FULL_TIME_JOBS, ...NAVIGATION_ROUTES.LOCAL_TASKS],
  'find-talent': NAVIGATION_ROUTES.TALENT_SEARCH,
  'explore': [...NAVIGATION_ROUTES.JOB_DISCOVERY, ...NAVIGATION_ROUTES.BROWSE, ...NAVIGATION_ROUTES.ADVANCED_SEARCH],
  'messages': [...NAVIGATION_ROUTES.MESSAGES, ...NAVIGATION_ROUTES.DIRECT_CHAT],
  'profile': [...NAVIGATION_ROUTES.PROFILE, ...NAVIGATION_ROUTES.PUBLIC_PROFILE],
  'freelance-marketplace': NAVIGATION_ROUTES.FREELANCE_MARKETPLACE,
  'full-time-jobs': NAVIGATION_ROUTES.FULL_TIME_JOBS,
  'local-tasks': NAVIGATION_ROUTES.LOCAL_TASKS,
  'talent-search': NAVIGATION_ROUTES.TALENT_SEARCH,
  'ai-learning': NAVIGATION_ROUTES.AI_LEARNING,
  'ai-chat': [...NAVIGATION_ROUTES.AI_CHAT, ...NAVIGATION_ROUTES.AI_CHATBOT, ...NAVIGATION_ROUTES.AI_ASSISTANT],
  'job-matching': NAVIGATION_ROUTES.JOB_MATCHING,
  'social': NAVIGATION_ROUTES.SOCIAL,
  'notifications': NAVIGATION_ROUTES.NOTIFICATIONS,
  'advanced-search': NAVIGATION_ROUTES.ADVANCED_SEARCH,
  'analytics': NAVIGATION_ROUTES.ANALYTICS,
  'settings': NAVIGATION_ROUTES.SETTINGS
} as const;

// Chat interface routes for positioning
export const CHAT_INTERFACE_ROUTES = [
  'messages', 'direct-chat', 'ai-chat', 'ai-chatbot', 'ai-assistant', 'inbox', 'chat', 'conversation'
];

// User profile types
export const PROFILE_TYPES = {
  FREELANCER: 'freelancer',
  FULL_TIMER: 'full-timer',
  LOCAL_GIG: 'local-gig',
  EMPLOYER: 'employer'
} as const;

export type ProfileType = typeof PROFILE_TYPES[keyof typeof PROFILE_TYPES];