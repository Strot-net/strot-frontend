// Profile data generator based on actual user information
export interface UserProfileData {
  id: string;
  name: string;
  userType: 'freelancer' | 'full-timer' | 'local-gig' | 'employer';
  avatar: string;
  title: string;
  company?: string;
  location: string;
  joinedDate: string;
  bio: string;
  skills: Array<{ name: string; level: number; verified: boolean; projectsUsed: number }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
    current: boolean;
    earnings?: number;
    projectsCompleted?: number;
  }>;
  projects: Array<{
    id: string;
    title: string;
    client: string;
    value: number;
    duration: string;
    rating: number;
    completion: 'completed' | 'in-progress' | 'cancelled';
    skills: string[];
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'certification' | 'award' | 'milestone';
    impact?: string;
  }>;
  stats: {
    totalEarnings: number;
    completedProjects: number;
    successRate: number;
    rating: number;
    totalReviews: number;
    responseTime: string;
    profileViews: number;
    connections: number;
    monthlyGrowth: number;
  };
  monthlyData: Array<{
    month: string;
    earnings: number;
    projects: number;
    rating: number;
    hoursWorked?: number;
    clientsServed?: number;
    skills?: number;
  }>;
  topClients: Array<{
    name: string;
    projectsCompleted: number;
    totalPaid: number;
    lastWorked: string;
    rating: number;
  }>;
  marketPosition: {
    skillRanking: number;
    categoryRanking: number;
    localRanking?: number;
    trending: boolean;
  };
}

export function generateProfileBasedAnalytics(profileData?: Partial<UserProfileData>): UserProfileData {
  // Default data that can be overridden by actual profile data
  const baseData: UserProfileData = {
    id: profileData?.id || 'user-001',
    name: profileData?.name || 'Alex Johnson',
    userType: profileData?.userType || 'freelancer',
    avatar: profileData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: profileData?.title || 'Senior Full-Stack Developer',
    company: profileData?.company,
    location: profileData?.location || 'San Francisco, CA',
    joinedDate: profileData?.joinedDate || '2022-03-15',
    bio: profileData?.bio || 'Passionate developer with expertise in modern web technologies.',
    
    skills: profileData?.skills || [
      { name: 'React', level: 95, verified: true, projectsUsed: 45 },
      { name: 'TypeScript', level: 90, verified: true, projectsUsed: 38 },
      { name: 'Node.js', level: 88, verified: false, projectsUsed: 32 },
      { name: 'Python', level: 85, verified: true, projectsUsed: 28 },
      { name: 'UI/UX Design', level: 92, verified: true, projectsUsed: 35 }
    ],

    experience: profileData?.experience || [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'Tech Startup Inc.',
        duration: '2021 - Present',
        description: 'Led development of React-based applications',
        current: true,
        earnings: 180000,
        projectsCompleted: 45
      },
      {
        id: '2',
        title: 'Full-Stack Developer',
        company: 'Digital Agency',
        duration: '2019 - 2021',
        description: 'Built web applications for various clients',
        current: false,
        earnings: 95000,
        projectsCompleted: 32
      }
    ],

    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        client: 'RetailCorp',
        value: 25000,
        duration: '3 months',
        rating: 5.0,
        completion: 'completed',
        skills: ['React', 'Node.js', 'MongoDB']
      },
      {
        id: '2',
        title: 'Healthcare Dashboard',
        client: 'MedTech Solutions',
        value: 18000,
        duration: '2 months',
        rating: 4.9,
        completion: 'completed',
        skills: ['React', 'TypeScript', 'PostgreSQL']
      },
      {
        id: '3',
        title: 'Mobile Banking App',
        client: 'FinanceBank',
        value: 35000,
        duration: '4 months',
        rating: 4.8,
        completion: 'in-progress',
        skills: ['React Native', 'Node.js', 'Security']
      }
    ],

    achievements: profileData?.achievements || [
      {
        id: '1',
        title: 'AWS Certified Developer',
        description: 'Amazon Web Services Developer Associate Certification',
        date: '2023-06-15',
        type: 'certification',
        impact: 'Improved cloud architecture skills, led to 3 new projects'
      },
      {
        id: '2',
        title: 'Top 1% Freelancer',
        description: 'Ranked in top 1% of freelancers on platform',
        date: '2023-12-01',
        type: 'award',
        impact: 'Increased client inquiries by 150%'
      }
    ],

    stats: {
      totalEarnings: profileData?.stats?.totalEarnings || 275000,
      completedProjects: profileData?.stats?.completedProjects || 127,
      successRate: profileData?.stats?.successRate || 98,
      rating: profileData?.stats?.rating || 4.9,
      totalReviews: profileData?.stats?.totalReviews || 89,
      responseTime: profileData?.stats?.responseTime || '< 2 hours',
      profileViews: profileData?.stats?.profileViews || 1234,
      connections: profileData?.stats?.connections || 567,
      monthlyGrowth: profileData?.stats?.monthlyGrowth || 12.5
    },

    monthlyData: [
      { month: 'Jan', earnings: 18500, projects: 8, rating: 4.8, hoursWorked: 160 },
      { month: 'Feb', earnings: 22300, projects: 10, rating: 4.9, hoursWorked: 180 },
      { month: 'Mar', earnings: 19800, projects: 9, rating: 4.8, hoursWorked: 165 },
      { month: 'Apr', earnings: 26100, projects: 12, rating: 4.9, hoursWorked: 195 },
      { month: 'May', earnings: 29200, projects: 14, rating: 4.9, hoursWorked: 210 },
      { month: 'Jun', earnings: 31500, projects: 16, rating: 5.0, hoursWorked: 220 }
    ],

    topClients: [
      {
        name: 'RetailCorp',
        projectsCompleted: 8,
        totalPaid: 125000,
        lastWorked: '2024-01-15',
        rating: 5.0
      },
      {
        name: 'TechStartup Inc.',
        projectsCompleted: 12,
        totalPaid: 89000,
        lastWorked: '2024-01-10',
        rating: 4.9
      },
      {
        name: 'MedTech Solutions',
        projectsCompleted: 6,
        totalPaid: 67000,
        lastWorked: '2023-12-20',
        rating: 4.8
      }
    ],

    marketPosition: {
      skillRanking: 5, // Top 5 in React development
      categoryRanking: 12, // Top 12 in web development
      trending: true
    }
  };

  // Merge with provided profile data
  return {
    ...baseData,
    ...profileData,
    stats: { ...baseData.stats, ...profileData?.stats },
    monthlyData: profileData?.monthlyData || baseData.monthlyData,
    skills: profileData?.skills || baseData.skills,
    experience: profileData?.experience || baseData.experience,
    projects: profileData?.projects || baseData.projects
  };
}

// Generate profile-specific insights
export function generateProfileInsights(profileData: UserProfileData) {
  const insights = {
    topSkill: profileData.skills.reduce((prev, current) => 
      (prev.projectsUsed > current.projectsUsed) ? prev : current
    ),
    bestMonth: profileData.monthlyData.reduce((prev, current) => 
      (prev.earnings > current.earnings) ? prev : current
    ),
    averageProjectValue: profileData.projects.reduce((sum, project) => 
      sum + project.value, 0
    ) / profileData.projects.length,
    completionRate: (profileData.projects.filter(p => p.completion === 'completed').length / 
      profileData.projects.length) * 100,
    earningsGrowth: calculateGrowthRate(profileData.monthlyData.map(m => m.earnings)),
    mostValuableClient: profileData.topClients.reduce((prev, current) => 
      (prev.totalPaid > current.totalPaid) ? prev : current
    )
  };

  return insights;
}

function calculateGrowthRate(values: number[]): number {
  if (values.length < 2) return 0;
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  return ((lastValue - firstValue) / firstValue) * 100;
}