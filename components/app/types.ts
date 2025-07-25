export type Page = 
  | 'landing' 
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'about'
  | 'how-it-works'
  | 'blog'
  | 'contact'
  | 'pricing'
  | 'privacy'
  | 'terms'
  | 'jobs'
  | 'full-time-jobs' 
  | 'freelance' 
  | 'marketplace'
  | 'tasks' 
  | 'local-tasks'
  | 'advanced-search'
  | 'learn' 
  | 'learning'
  | 'dashboard' 
  | 'profile'
  | 'profile-selector'
  | 'applications'
  | 'saved-jobs'
  | 'assessments'
  | 'messages'
  | 'direct-chat'
  | 'settings'
  | 'create' 
  | 'chat'
  | 'ai-chat'
  | 'video-call'
  | 'employer-dashboard'
  | 'post-job'
  | 'job-listings'
  | 'candidate-search'
  | 'talent-search'
  | 'team-management'
  | 'billing'
  | 'job-detail'
  | 'notifications'
  | 'help'
  | 'company-profile'
  | 'interview-schedule'
  | 'analytics'
  | 'social'
  | 'network'
  | 'connections'
  | 'insights'
  | 'explore'
  | 'activity-feed'
  | 'job-discovery';

export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export const PAGE_TRANSITION = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5
};

export const PROTECTED_ROUTES: Page[] = [
  'dashboard',
  'profile',
  'profile-selector',
  'applications',
  'saved-jobs',
  'assessments',
  'messages',
  'direct-chat',
  'settings',
  'create',
  'video-call',
  'employer-dashboard',
  'post-job',
  'job-listings',
  'candidate-search',
  'talent-search',
  'team-management',
  'billing',
  'notifications',
  'interview-schedule',
  'analytics',
  'jobs',
  'full-time-jobs',
  'freelance',
  'marketplace',
  'tasks',
  'local-tasks',
  'advanced-search',
  'learn',
  'learning',
  'job-detail',
  'help',
  'company-profile',
  'chat',
  'ai-chat',
  'social',
  'network',
  'connections',
  'insights',
  'explore',
  'activity-feed',
  'job-discovery'
];

export const PAGES_WITHOUT_BOTTOM_NAV: Page[] = [
  'chat', 
  'ai-chat',
  'direct-chat', 
  'create', 
  'video-call', 
  'login', 
  'signup', 
  'forgot-password',
  'landing', 
  'profile-selector'
];

export const PAGES_WITHOUT_CHATBOT: Page[] = [
  'chat', 
  'ai-chat',
  'direct-chat', 
  'video-call', 
  'login', 
  'signup', 
  'forgot-password',
  'landing', 
  'profile-selector'
];

// Public pages that don't require authentication
export const PUBLIC_ROUTES: Page[] = [
  'landing',
  'login',
  'signup',
  'forgot-password',
  'about',
  'how-it-works',
  'blog',
  'contact',
  'pricing',
  'privacy',
  'terms'
];