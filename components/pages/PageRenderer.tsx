import React, { useEffect, memo, lazy, Suspense } from 'react';
import { getUserProfileType } from '../navigation/utils';

// Lazy load heavy components for better performance
const FreelancerDashboard = lazy(() => import('../profiles/FreelancerDashboard').then(m => ({ default: m.FreelancerDashboard })));
const FullTimerDashboard = lazy(() => import('../profiles/FullTimerDashboard').then(m => ({ default: m.FullTimerDashboard })));
const LocalGigDashboard = lazy(() => import('../profiles/LocalGigDashboard').then(m => ({ default: m.LocalGigDashboard })));
const EmployerDashboard = lazy(() => import('../profiles/EmployerDashboard').then(m => ({ default: m.EmployerDashboard })));

// Import other essential components normally
import { UserDashboard } from '../UserDashboard';
import { FreelanceMarketplace } from '../FreelanceMarketplace';
import { FullTimeJobs } from '../FullTimeJobs';
import { LocalTaskHub } from '../LocalTaskHub';
import { SocialNetworkingPlatform } from '../SocialNetworkingPlatform';
import { EnhancedMessagingInterface } from '../EnhancedMessagingInterface';
import { DirectChatInterface } from '../DirectChatInterface';
import { TalentSearchInterface } from '../TalentSearchInterface';
import { NotificationCenter } from '../NotificationCenter';
import { CreateFlow } from '../CreateFlow';
import { ProfileInterface } from '../profile/ProfileInterface';
import { AdvancedAnalyticsHub } from '../AdvancedAnalyticsHub';
import { AdvancedSettingsPage } from '../AdvancedSettingsPage';
import { AILearningStudio } from '../AILearningStudio';
import { JobDetailPage } from '../JobDetailPage';
import { AIChatInterface } from '../AIChatInterface';
import { AIChatbot } from '../AIChatbot';
import { AIJobAssistant } from '../AIJobAssistant';
import { AdvancedJobSearch } from '../advanced/AdvancedJobSearch';
import { JobDiscovery } from '../JobDiscovery';
import { PublicProfileView } from '../PublicProfileView';
import { VideoCallInterface } from '../video/VideoCallInterface';
import { JobMatchingEngine } from '../matching/JobMatchingEngine';

// Profile-specific dashboards are lazy loaded above

// Analytics hubs
import { FreelancerAnalyticsHub } from '../analytics/FreelancerAnalyticsHub';
import { FullTimerAnalyticsHub } from '../analytics/FullTimerAnalyticsHub';
import { LocalGigAnalyticsHub } from '../analytics/LocalGigAnalyticsHub';
import { EmployerAnalyticsHub } from '../analytics/EmployerAnalyticsHub';

interface PageRendererProps {
  primaryRoute: string;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: any;
  handleLogout: () => void;
  handleMessage: (userId: string) => void;
  profileData?: any;
}

export const PageRenderer = memo(function PageRenderer({
  primaryRoute,
  currentPage,
  setCurrentPage,
  user,
  handleLogout,
  handleMessage,
  profileData
}: PageRendererProps) {

  // 🔥 FIX: Handle redirects in useEffect to prevent setState during render
  useEffect(() => {
    // Handle authenticated user on landing page
    if (primaryRoute === 'landing' && currentPage === 'landing') {
      console.log('🔥 AUTHENTICATED USER ON LANDING - REDIRECTING TO DASHBOARD');
      setCurrentPage('dashboard');
      return;
    }
    
    // Handle unknown routes
    if (!primaryRoute || (primaryRoute !== 'dashboard' && 
                          primaryRoute !== 'freelance-marketplace' && 
                          primaryRoute !== 'full-time-jobs' && 
                          primaryRoute !== 'local-tasks' &&
                          primaryRoute !== 'talent-search' &&
                          primaryRoute !== 'job-discovery' &&
                          primaryRoute !== 'browse' &&
                          primaryRoute !== 'advanced-search' &&
                          primaryRoute !== 'job-matching' &&
                          primaryRoute !== 'learning' &&
                          primaryRoute !== 'ai-chat' &&
                          primaryRoute !== 'ai-chatbot' &&
                          primaryRoute !== 'ai-assistant' &&
                          primaryRoute !== 'social' &&
                          primaryRoute !== 'messages' &&
                          primaryRoute !== 'direct-chat' &&
                          primaryRoute !== 'video-call' &&
                          primaryRoute !== 'profile' &&
                          primaryRoute !== 'public-profile' &&
                          primaryRoute !== 'settings' &&
                          primaryRoute !== 'analytics' &&
                          primaryRoute !== 'notifications' &&
                          primaryRoute !== 'create' &&
                          primaryRoute !== 'job-detail')) {
      console.warn(`🚨 Unknown authenticated route: ${currentPage}, redirecting to dashboard`);
      setCurrentPage('dashboard');
      return;
    }
  }, [primaryRoute, currentPage, setCurrentPage]);

  // Dashboard routing with profile-specific components (lazy loaded)
  const renderDashboard = () => {
    const profileType = getUserProfileType(user);
    console.log('🔥 Loading dashboard for profile type:', profileType);
    
    const DashboardLoadingFallback = () => (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
    
    switch (profileType) {
      case 'freelancer':
        return (
          <Suspense fallback={<DashboardLoadingFallback />}>
            <FreelancerDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />
          </Suspense>
        );
      case 'full-timer':
        return (
          <Suspense fallback={<DashboardLoadingFallback />}>
            <FullTimerDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />
          </Suspense>
        );
      case 'local-gig':
        return (
          <Suspense fallback={<DashboardLoadingFallback />}>
            <LocalGigDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />
          </Suspense>
        );
      case 'employer':
        return (
          <Suspense fallback={<DashboardLoadingFallback />}>
            <EmployerDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />
          </Suspense>
        );
      default:
        return <UserDashboard onNavigate={setCurrentPage} onLogout={handleLogout} userType={profileType} />;
    }
  };

  // Analytics routing with profile-specific components
  const renderAnalytics = () => {
    const profileType = getUserProfileType(user);
    console.log('🔥 Loading analytics for profile type:', profileType);
    
    switch (profileType) {
      case 'freelancer':
        return <FreelancerAnalyticsHub />;
      case 'full-timer':
        return <FullTimerAnalyticsHub />;
      case 'local-gig':
        return <LocalGigAnalyticsHub />;
      case 'employer':
        return <EmployerAnalyticsHub />;
      default:
        return <AdvancedAnalyticsHub userType={profileType} />;
    }
  };

  // Loading screen for redirects
  const renderLoadingScreen = (message: string) => (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );

  // Main routing logic
  switch (primaryRoute) {
    // Dashboard
    case 'dashboard':
      return renderDashboard();

    // Job Types - Universal Access
    case 'freelance-marketplace':
      return <FreelanceMarketplace onNavigate={setCurrentPage} />;
    case 'full-time-jobs':
      return <FullTimeJobs onNavigate={setCurrentPage} />;
    case 'local-tasks':
      return <LocalTaskHub onNavigate={setCurrentPage} />;
    case 'talent-search':
      return <TalentSearchInterface onNavigate={setCurrentPage} />;

    // Discovery & Search
    case 'job-discovery':
    case 'browse':
      return <JobDiscovery onNavigate={setCurrentPage} />;
    case 'advanced-search':
      return <AdvancedJobSearch onNavigate={setCurrentPage} />;
    case 'job-matching':
      return <JobMatchingEngine onNavigate={setCurrentPage} />;

    // AI & Learning
    case 'learning':
      return <AILearningStudio onNavigate={setCurrentPage} />;
    case 'ai-chat':
      return <AIChatInterface onNavigate={setCurrentPage} />;
    case 'ai-chatbot':
      return <AIChatbot onNavigate={setCurrentPage} />;
    case 'ai-assistant':
      return <AIJobAssistant onNavigate={setCurrentPage} />;

    // Social & Community
    case 'social':
      return <SocialNetworkingPlatform onNavigate={setCurrentPage} />;

    // Communication
    case 'messages':
      return <EnhancedMessagingInterface onNavigate={setCurrentPage} />;
    case 'direct-chat':
      return <DirectChatInterface onNavigate={setCurrentPage} />;
    case 'video-call':
      return <VideoCallInterface onNavigate={setCurrentPage} />;

    // Profile & Settings
    case 'profile':
      return (
        <ProfileInterface 
          userType={getUserProfileType(user)} 
          onNavigate={setCurrentPage}
          onMessage={handleMessage}
          profileData={profileData}
        />
      );
    case 'public-profile':
      return <PublicProfileView onNavigate={setCurrentPage} />;
    case 'settings':
      return <AdvancedSettingsPage userType={getUserProfileType(user)} onNavigate={setCurrentPage} />;

    // Analytics & Notifications
    case 'analytics':
      return renderAnalytics();
    case 'notifications':
      return <NotificationCenter onNavigate={setCurrentPage} />;

    // Content & Job Details
    case 'create':
      return <CreateFlow onNavigate={setCurrentPage} userType={getUserProfileType(user)} />;
    case 'job-detail':
      return <JobDetailPage onNavigate={setCurrentPage} onApply={() => {}} />;

    // Special handling for landing page (authenticated users should redirect)
    case 'landing':
      return renderLoadingScreen('Redirecting to dashboard...');

    // Default case for unknown routes
    default:
      return renderLoadingScreen('Page not found. Redirecting to dashboard...');
  }
});