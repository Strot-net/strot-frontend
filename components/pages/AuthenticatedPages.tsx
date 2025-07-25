import React, { Suspense } from 'react';
import { CompactBottomNav } from '../CompactBottomNav';
import { getUserProfileType, getPrimaryRouteName, isChatInterface } from '../navigation/utils';
import { PageRenderer } from './PageRenderer';

// Loading fallback for suspense
function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  );
}

// Error boundary for catching errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AuthenticatedPages Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface AuthenticatedPagesProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: any;
  handleLogout: () => void;
  profileData?: any;
}

export function AuthenticatedPages({ 
  currentPage, 
  setCurrentPage, 
  user, 
  handleLogout,
  profileData 
}: AuthenticatedPagesProps) {

  // Helper function to handle messaging navigation
  const handleMessage = (userId: string) => {
    setCurrentPage('direct-chat');
  };

  // Check if we're in a chat interface for navigation positioning
  const isInChatInterface = isChatInterface(currentPage);

  // Always include compact bottom navigation for authenticated pages  
  const renderPageWithCompactNav = (pageContent: React.ReactNode) => (
    <>
      {pageContent}
      <CompactBottomNav 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        unreadMessages={3}
        userType={getUserProfileType(user)}
        onLogout={handleLogout}
      />
    </>
  );

  // Get the primary route name and render the appropriate page
  const primaryRoute = getPrimaryRouteName(currentPage);
  
  console.log('🚀 AuthenticatedPages Enhanced Navigation:', {
    currentPage,
    primaryRoute,
    userType: user?.userType,
    profileType: user?.profileType,
    isInChatInterface,
    timestamp: new Date().toISOString()
  });

  // Use PageRenderer to handle the actual page rendering with error boundary and suspense
  const pageContent = (
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingFallback />}>
        <PageRenderer
          primaryRoute={primaryRoute}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          user={user}
          handleLogout={handleLogout}
          handleMessage={handleMessage}
          profileData={profileData}
        />
      </Suspense>
    </ErrorBoundary>
  );

  return renderPageWithCompactNav(pageContent);
}