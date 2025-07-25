import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BarChart3, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { UltraAdvancedProfile } from './UltraAdvancedProfile';
import { AdvancedSettingsPage } from '../AdvancedSettingsPage';
import { PublicProfileView } from '../PublicProfileView';
import { AnalyticsSelector } from './AnalyticsSelector';
import { getProfileConfig, defaultProfileConfig } from './constants';
import { useAuth } from '../auth/AuthProvider';

interface ProfileInterfaceProps {
  userType: 'freelancer' | 'full-timer' | 'local-gig' | 'employer';
  onNavigate: (page: string) => void;
  onMessage: (userId: string) => void;
  profileData?: any;
}

export function ProfileInterface({ 
  userType, 
  onNavigate, 
  onMessage, 
  profileData 
}: ProfileInterfaceProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPublicView, setShowPublicView] = useState(false);

  // Safely get config with comprehensive fallbacks
  const config = useMemo(() => {
    try {
      if (!userType || typeof userType !== 'string') {
        console.warn('Invalid userType provided to ProfileInterface:', userType);
        return defaultProfileConfig;
      }
      
      const profileConfig = getProfileConfig(userType);
      
      // Double-check that we have a valid config object
      if (!profileConfig || !profileConfig.title || !profileConfig.description) {
        console.warn('Invalid profile config for userType:', userType);
        return defaultProfileConfig;
      }
      
      return profileConfig;
    } catch (error) {
      console.error('Error getting profile config:', error);
      return defaultProfileConfig;
    }
  }, [userType]);

  // Safe user type with fallback
  const safeUserType = useMemo(() => {
    const validTypes = ['freelancer', 'full-timer', 'local-gig', 'employer'];
    return validTypes.includes(userType) ? userType : 'freelancer';
  }, [userType]);

  // Safe message handler
  const handleMessage = (userId: string) => {
    try {
      onMessage?.(userId);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };

  // Safe navigation handler
  const handleNavigate = (page: string) => {
    try {
      onNavigate?.(page);
    } catch (error) {
      console.error('Error handling navigation:', error);
    }
  };

  if (showPublicView) {
    return (
      <PublicProfileView
        userId="current-user"
        onBack={() => setShowPublicView(false)}
        onMessage={handleMessage}
        currentUserType={safeUserType}
        currentUser={user}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with safe config access */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{config?.title || 'Profile'}</h1>
            <p className="text-muted-foreground">{config?.description || 'Manage your profile and settings'}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowPublicView(true)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Public Profile</span>
          </Button>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <UltraAdvancedProfile 
              userType={safeUserType}
              onNavigate={handleNavigate}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsSelector 
              userType={safeUserType} 
              profileData={profileData}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <AdvancedSettingsPage 
              userType={safeUserType}
              onNavigate={handleNavigate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}