import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { AppRouter } from './components/app/AppRouter';
import { Toaster } from './components/ui/sonner';

// Loading screen component
function LoadingScreen({ message = "Loading Strot..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

// Test red text rendering component
function RedTextTest() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded shadow-lg border">
      <div className="space-y-2 text-sm">
        <div className="text-red-500">Red 500 Test</div>
        <div className="text-red-600">Red 600 Test</div>
        <div className="text-destructive">Destructive Test</div>
        <div style={{ color: '#dc2626' }}>Inline Red Test</div>
        <div className="bg-red-500 text-white px-2 py-1 rounded">Red Background</div>
      </div>
    </div>
  );
}

// Main App Content that uses auth hooks
function AppContent() {
  const { user, isAuthenticated, login, signup, logout, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRedTest, setShowRedTest] = useState(true);

  // Debug log to ensure component is working
  console.log('🚀 Strot App Loading:', {
    isAuthenticated,
    user: user?.email,
    currentPage,
    showProfileSelector
  });

  // Hide red test after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowRedTest(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Check if user needs to select profile type
  useEffect(() => {
    if (isAuthenticated && user && !user.profileType) {
      setShowProfileSelector(true);
    } else if (isAuthenticated && user && user.profileType) {
      setShowProfileSelector(false);
      // Set default page based on user type
      if (currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup') {
        setCurrentPage('dashboard');
      }
    }
  }, [isAuthenticated, user, currentPage]);

  // Enhanced login handler
  const handleLogin = async (email: string, password: string, userType?: string) => {
    try {
      setIsTransitioning(true);
      await login(email, password);
      console.log('✅ Login successful - Welcome to Strot!');
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    } finally {
      setIsTransitioning(false);
    }
  };

  // Enhanced signup handler
  const handleSignup = async (email: string, password: string, userData: any) => {
    try {
      setIsTransitioning(true);
      await signup(email, password, userData);
      console.log('✅ Signup successful - Please select your profile type');
      setShowProfileSelector(true);
    } catch (error) {
      console.error('❌ Signup failed:', error);
      throw error;
    } finally {
      setIsTransitioning(false);
    }
  };

  // Enhanced logout handler
  const handleLogout = () => {
    setIsTransitioning(true);
    logout();
    console.log('✅ Logged out successfully');
    setCurrentPage('landing');
    setShowProfileSelector(false);
    setIsTransitioning(false);
  };

  // Optimized profile selection handler
  const handleProfileSelect = async (profileType: string) => {
    if (!user) return;
    
    try {
      setIsTransitioning(true);
      
      // Create updated user immediately
      const updatedUser = { 
        ...user, 
        profileType: profileType as any,
        userType: profileType === 'employer' ? 'employer' : 'candidate'
      };
      
      // Update localStorage synchronously
      localStorage.setItem('strot_user', JSON.stringify(updatedUser));
      
      // Hide profile selector immediately
      setShowProfileSelector(false);
      
      console.log(`✅ Profile set to ${profileType}! Welcome to Strot!`);
      
      // Navigate to dashboard with a small delay for smooth transition
      setTimeout(() => {
        setCurrentPage('dashboard');
        setIsTransitioning(false);
        
        // Force a re-render by updating the auth context
        window.dispatchEvent(new CustomEvent('strot-profile-updated', { 
          detail: { user: updatedUser } 
        }));
      }, 100);
      
    } catch (error) {
      console.error('❌ Profile selection failed:', error);
      setIsTransitioning(false);
    }
  };

  // Show loading state while checking authentication or transitioning
  if (isLoading) {
    return <LoadingScreen message="Initializing Strot..." />;
  }

  if (isTransitioning) {
    return <LoadingScreen message="Setting up your workspace..." />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Red text test overlay - will disappear after 5 seconds */}
      {showRedTest && <RedTextTest />}
      
      <AppRouter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAuthenticated={isAuthenticated}
        showProfileSelector={showProfileSelector}
        user={user}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleLogout={handleLogout}
        handleProfileSelect={handleProfileSelect}
      />
      <Toaster />
    </div>
  );
}

// Main App Component with Providers
export default function App() {
  // Debug log to confirm app is loading
  console.log('🎯 Strot Application Starting...');
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}