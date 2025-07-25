import { Page, PROTECTED_ROUTES, PUBLIC_ROUTES, PAGES_WITHOUT_BOTTOM_NAV, PAGES_WITHOUT_CHATBOT } from './types';

export function shouldShowBottomNavigation(
  currentPage: Page,
  isAuthenticated: boolean,
  showProfileSelector: boolean
): boolean {
  if (!isAuthenticated || showProfileSelector) {
    return false;
  }
  
  return !PAGES_WITHOUT_BOTTOM_NAV.includes(currentPage);
}

export function shouldShowChatbot(
  currentPage: Page,
  isAuthenticated: boolean,
  showProfileSelector: boolean
): boolean {
  if (!isAuthenticated || showProfileSelector) {
    return false;
  }
  
  return !PAGES_WITHOUT_CHATBOT.includes(currentPage);
}

export function getBackNavigation(currentPage: Page, isAuthenticated: boolean): Page {
  // Public pages ALWAYS go back to landing page
  const publicPages: Page[] = ['blog', 'about', 'how-it-works', 'pricing', 'contact', 'privacy', 'terms'];
  
  if (publicPages.includes(currentPage)) {
    return 'landing';
  }

  // Login/signup pages go to landing
  if (currentPage === 'login' || currentPage === 'signup') {
    return 'landing';
  }

  // If not authenticated, everything goes to landing
  if (!isAuthenticated) {
    return 'landing';
  }

  // Authenticated pages navigation
  switch (currentPage) {
    case 'profile':
    case 'settings':
    case 'notifications':
    case 'applications':
    case 'saved-jobs':
    case 'assessments':
      return 'dashboard';
    case 'job-detail':
      return 'full-time-jobs'; // or remember previous page
    case 'messages':
    case 'direct-chat':
      return 'dashboard';
    case 'chat':
      return 'dashboard';
    case 'create':
    case 'post-job':
      return 'dashboard';
    case 'video-call':
    case 'interview-schedule':
      return 'messages';
    // Employer specific
    case 'job-listings':
    case 'candidate-search':
    case 'team-management':
    case 'billing':
    case 'analytics':
      return 'employer-dashboard';
    default:
      return 'dashboard';
  }
}

export function isRouteProtected(page: Page): boolean {
  return PROTECTED_ROUTES.includes(page);
}

export function isPublicRoute(page: Page): boolean {
  return PUBLIC_ROUTES.includes(page);
}

export function canAccessPage(page: Page, isAuthenticated: boolean): boolean {
  if (isPublicRoute(page)) {
    return true;
  }
  
  if (isRouteProtected(page)) {
    return isAuthenticated;
  }
  
  return true;
}