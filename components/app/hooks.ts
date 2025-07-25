import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Page } from './types';

export function useAppNavigation() {
  const { user, isAuthenticated, login, signup, logout, updateUser, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [unreadMessages] = useState(3);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  // Redirect logic
  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) {
      return;
    }

    if (isAuthenticated && user) {
      // Special case: if we're on login or signup and user is authenticated, redirect
      if (currentPage === 'login' || currentPage === 'signup') {
        if (!user.profileType) {
          // New user needs to select profile
          setShowProfileSelector(true);
          setCurrentPage('profile-selector');
        } else {
          // Existing user, go to dashboard
          setCurrentPage('dashboard');
        }
        return;
      }

      // If on landing and authenticated, go to dashboard
      if (currentPage === 'landing') {
        setCurrentPage('dashboard');
        return;
      }

      // Check if user needs to select a profile (only for users without profileType)
      if (!user.profileType && currentPage !== 'profile-selector') {
        setShowProfileSelector(true);
        setCurrentPage('profile-selector');
        return;
      }
    } else if (!isAuthenticated && !isLoading) {
      // If user is not authenticated and tries to access protected routes
      const protectedRoutes: Page[] = [
        'dashboard', 'full-time-jobs', 'freelance', 'tasks', 'jobs', 'job-detail', 
        'messages', 'direct-chat', 'chat', 'create', 'video-call', 'notifications', 
        'settings', 'profile', 'learn', 'applications', 'saved-jobs', 'assessments',
        'analytics', 'insights', 'network', 'connections', 'talent-search'
      ];
      
      if (protectedRoutes.includes(currentPage)) {
        setCurrentPage('landing');
      }

      // Reset profile selector state
      setShowProfileSelector(false);
    }
  }, [isAuthenticated, user, currentPage, isLoading]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Navigation will be handled by useEffect after login succeeds
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string, userData: any) => {
    try {
      await signup(email, password, userData);
      // Navigation will be handled by useEffect after signup succeeds
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
    setShowProfileSelector(false);
  };

  const handleProfileSelect = (profileType: string) => {
    if (user) {
      // Update user profile type
      updateUser({
        profileType: profileType as 'full-timer' | 'freelancer' | 'gig-worker' | 'employer',
        userType: profileType === 'employer' ? 'employer' : 'candidate'
      });
      
      // Hide profile selector and navigate to dashboard
      setShowProfileSelector(false);
      setCurrentPage('dashboard');
    }
  };

  const handlePageNavigation = (page: Page) => {
    console.log('🔥 Navigation requested:', { page, currentPage, isAuthenticated, isLoading });
    
    // Always allow navigation to public pages
    const publicPages: Page[] = [
      'landing', 'login', 'signup', 'how-it-works', 'pricing', 'about', 'contact', 
      'blog', 'privacy', 'terms', 'forgot-password'
    ];
    
    if (publicPages.includes(page)) {
      console.log('🔥 Navigating to public page:', page);
      setCurrentPage(page);
      return;
    }

    // For protected routes, check authentication
    const protectedRoutes: Page[] = [
      'dashboard', 'full-time-jobs', 'freelance', 'tasks', 'jobs', 'job-detail', 
      'messages', 'direct-chat', 'chat', 'create', 'video-call', 'notifications', 
      'settings', 'profile', 'learn', 'applications', 'saved-jobs', 'assessments',
      'analytics', 'insights', 'network', 'connections', 'talent-search', 'advanced-search',
      'social', 'marketplace', 'local-tasks'
    ];

    if (protectedRoutes.includes(page)) {
      if (!isAuthenticated && !isLoading) {
        console.log('🔥 Protected route accessed while not authenticated, redirecting to login');
        setCurrentPage('login');
        return;
      }
      
      if (isAuthenticated) {
        console.log('🔥 Navigating to protected page:', page);
        setCurrentPage(page);
        return;
      }
    }

    // For any unknown routes, handle gracefully
    console.log('🔥 Unknown route, attempting navigation:', page);
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage: handlePageNavigation,
    unreadMessages,
    showProfileSelector,
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleSignup,
    handleLogout,
    handleProfileSelect
  };
}