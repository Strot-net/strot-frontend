// Profile interface configuration with comprehensive fallbacks
export const profileInterfaceConfig = {
  freelancer: {
    title: 'Freelancer Profile',
    description: 'Manage your freelance career and showcase your skills'
  },
  'full-timer': {
    title: 'Professional Profile',
    description: 'Track your career growth and professional development'
  },
  'local-gig': {
    title: 'Service Provider Profile',
    description: 'Manage your local service business and client relationships'
  },
  employer: {
    title: 'Employer Profile',
    description: 'Manage your company profile and hiring initiatives'
  }
} as const;

// Fallback configuration for unknown user types
export const defaultProfileConfig = {
  title: 'Profile',
  description: 'Manage your profile and settings'
};

export const analyticsLabels = {
  freelancer: 'Freelancer Analytics',
  'full-timer': 'Career Analytics',
  'local-gig': 'Service Analytics',
  employer: 'Hiring Analytics'
} as const;

export const profileMetrics = {
  freelancer: {
    primary: ['Total Earnings', 'Active Projects', 'Client Rating', 'Profile Views'],
    secondary: ['Success Rate', 'Response Time', 'Completed Projects', 'Skills Verified']
  },
  'full-timer': {
    primary: ['Performance Score', 'Goals Completed', 'Skills Developed', 'Learning Hours'],
    secondary: ['Team Collaboration', 'Innovation Score', 'Project Impact', 'Leadership']
  },
  'local-gig': {
    primary: ['Weekly Earnings', 'Jobs Completed', 'Average Rating', 'Response Time'],
    secondary: ['Customer Retention', 'Service Quality', 'Peak Hours', 'Geographic Reach']
  },
  employer: {
    primary: ['Total Hires', 'Open Positions', 'Hiring Budget', 'Time to Hire'],
    secondary: ['Quality Score', 'Retention Rate', 'Cost per Hire', 'Team Satisfaction']
  }
} as const;

// Helper function to get safe config
export function getProfileConfig(userType: string) {
  const validUserTypes = ['freelancer', 'full-timer', 'local-gig', 'employer'] as const;
  
  if (validUserTypes.includes(userType as any)) {
    return profileInterfaceConfig[userType as keyof typeof profileInterfaceConfig];
  }
  
  return defaultProfileConfig;
}

// Type definitions
export type UserType = keyof typeof profileInterfaceConfig;
export type ProfileConfig = typeof profileInterfaceConfig[UserType];