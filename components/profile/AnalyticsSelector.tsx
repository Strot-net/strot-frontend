import React from 'react';
import { FreelancerAnalyticsHub } from '../analytics/FreelancerAnalyticsHub';
import { FullTimerAnalyticsHub } from '../analytics/FullTimerAnalyticsHub';
import { LocalGigAnalyticsHub } from '../analytics/LocalGigAnalyticsHub';
import { EmployerAnalyticsHub } from '../analytics/EmployerAnalyticsHub';

interface AnalyticsSelectorProps {
  userType: 'freelancer' | 'full-timer' | 'local-gig' | 'employer';
  profileData?: any;
}

export function AnalyticsSelector({ userType, profileData }: AnalyticsSelectorProps) {
  // Safe userType handling with fallback
  const safeUserType = userType || 'freelancer';
  
  try {
    switch (safeUserType) {
      case 'freelancer':
        return <FreelancerAnalyticsHub profileData={profileData} />;
      case 'full-timer':
        return <FullTimerAnalyticsHub profileData={profileData} />;
      case 'local-gig':
        return <LocalGigAnalyticsHub profileData={profileData} />;
      case 'employer':
        return <EmployerAnalyticsHub profileData={profileData} />;
      default:
        console.warn('Unknown user type in AnalyticsSelector:', safeUserType);
        return <FreelancerAnalyticsHub profileData={profileData} />;
    }
  } catch (error) {
    console.error('Error rendering analytics hub:', error);
    // Fallback to FreelancerAnalyticsHub if there's an error
    return <FreelancerAnalyticsHub profileData={profileData} />;
  }
}