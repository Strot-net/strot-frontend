import { NAVIGATION_ROUTES, ACTIVE_STATE_MAPPINGS, CHAT_INTERFACE_ROUTES, PROFILE_TYPES } from './constants';

// Helper function to get user profile type with fallback
export const getUserProfileType = (user: any): string => {
  return user?.profileType || user?.userType || PROFILE_TYPES.FULL_TIMER;
};

// Helper function to check if current page is in a specific route group
export const isPageInRouteGroup = (currentPage: string, routeGroup: readonly string[]): boolean => {
  return routeGroup.includes(currentPage);
};

// Helper function to determine active state for navigation items
export const isNavigationItemActive = (itemId: string, currentPage: string): boolean => {
  const mappings = ACTIVE_STATE_MAPPINGS[itemId as keyof typeof ACTIVE_STATE_MAPPINGS];
  return mappings ? mappings.includes(currentPage) : currentPage === itemId;
};

// Helper function to check if we're in a chat interface
export const isChatInterface = (currentPage: string): boolean => {
  return CHAT_INTERFACE_ROUTES.includes(currentPage);
};

// Helper function to find the correct route for a given page
export const findRouteForPage = (currentPage: string): string | null => {
  for (const [routeKey, routePages] of Object.entries(NAVIGATION_ROUTES)) {
    if (routePages.includes(currentPage)) {
      return routeKey;
    }
  }
  return null;
};

// Helper function to get the primary route name for a page
export const getPrimaryRouteName = (currentPage: string): string => {
  // Dashboard routes
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.DASHBOARD)) return 'dashboard';
  
  // Job types
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.FREELANCE_MARKETPLACE)) return 'freelance-marketplace';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.FULL_TIME_JOBS)) return 'full-time-jobs';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.LOCAL_TASKS)) return 'local-tasks';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.TALENT_SEARCH)) return 'talent-search';
  
  // Discovery & Search
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.JOB_DISCOVERY)) return 'job-discovery';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.BROWSE)) return 'browse';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.ADVANCED_SEARCH)) return 'advanced-search';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.JOB_MATCHING)) return 'job-matching';
  
  // AI & Learning
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.AI_LEARNING)) return 'learning';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.AI_CHAT)) return 'ai-chat';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.AI_CHATBOT)) return 'ai-chatbot';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.AI_ASSISTANT)) return 'ai-assistant';
  
  // Social & Community
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.SOCIAL)) return 'social';
  
  // Communication
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.MESSAGES)) return 'messages';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.DIRECT_CHAT)) return 'direct-chat';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.VIDEO_CALL)) return 'video-call';
  
  // Profile & Settings
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.PROFILE)) return 'profile';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.PUBLIC_PROFILE)) return 'public-profile';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.SETTINGS)) return 'settings';
  
  // Analytics & Notifications
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.ANALYTICS)) return 'analytics';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.NOTIFICATIONS)) return 'notifications';
  
  // Content & Job Details
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.CREATE)) return 'create';
  if (isPageInRouteGroup(currentPage, NAVIGATION_ROUTES.JOB_DETAIL)) return 'job-detail';
  
  // Default fallback
  return currentPage;
};

// Helper function to handle smart job routing based on user type
export const getJobsDestination = (userType: string): string => {
  switch (userType) {
    case PROFILE_TYPES.FREELANCER:
      return 'marketplace';
    case PROFILE_TYPES.FULL_TIMER:
      return 'full-time-jobs';
    case PROFILE_TYPES.LOCAL_GIG:
      return 'local-tasks';
    case PROFILE_TYPES.EMPLOYER:
      return 'talent-search';
    default:
      return 'full-time-jobs';
  }
};

// Helper function to handle authentication redirects
export const handleAuthRedirect = (isAuthenticated: boolean, currentPage: string): string => {
  if (isAuthenticated && currentPage === 'landing') {
    return 'dashboard';
  }
  if (!isAuthenticated && currentPage !== 'landing') {
    return 'landing';
  }
  return currentPage;
};