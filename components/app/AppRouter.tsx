import React from 'react';
import { PublicPages } from '../pages/PublicPages';
import { AuthenticatedPages } from '../pages/AuthenticatedPages';
import { ProfileTypeSelector } from '../ProfileTypeSelector';

interface AppRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  showProfileSelector: boolean;
  user: any;
  handleLogin: (email: string, password: string, userType?: string) => Promise<void>;
  handleSignup: (email: string, password: string, userData: any) => Promise<void>;
  handleLogout: () => void;
  handleProfileSelect: (userType: string) => void;
}

export function AppRouter({
  currentPage,
  setCurrentPage,
  isAuthenticated,
  showProfileSelector,
  user,
  handleLogin,
  handleSignup,
  handleLogout,
  handleProfileSelect
}: AppRouterProps) {
  
  try {
    // Show profile selector for new authenticated users
    if (isAuthenticated && showProfileSelector) {
      return (
        <div className="min-h-screen bg-background">
          <ProfileTypeSelector 
            onSelectProfile={handleProfileSelect}
            userName={user?.name || user?.email?.split('@')[0] || 'User'}
          />
        </div>
      );
    }

    // Show authenticated pages for logged-in users with smooth transition
    if (isAuthenticated && user && user.profileType) {
      return (
        <div className="min-h-screen bg-background">
          <AuthenticatedPages
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            handleLogout={handleLogout}
            profileData={user} // Pass user data as profile data
          />
        </div>
      );
    }

    // Handle case where user is authenticated but doesn't have profileType
    if (isAuthenticated && user && !user.profileType) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Setting up your profile...</p>
          </div>
        </div>
      );
    }

    // Show public pages for non-authenticated users
    return (
      <div className="min-h-screen bg-background">
        <PublicPages
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in AppRouter:', error);
    
    // Fallback UI for errors
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            We're having trouble loading the page. Please try refreshing.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}