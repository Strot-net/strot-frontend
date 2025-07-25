import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string; // Add computed name property
  userType: 'candidate' | 'employer';
  profileType?: 'full-timer' | 'freelancer' | 'local-gig' | 'employer';
  avatar?: string;
  company?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  createdAt?: string;
  profile?: {
    skills?: string[];
    experience?: string;
    education?: string;
    portfolio?: string[];
    completeness?: number;
    location?: string;
    preferences?: {
      salary?: { min: number; max: number };
      remote?: boolean;
      jobTypes?: string[];
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Immediate auth check for better performance
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('strot_user');
        const storedToken = localStorage.getItem('strot_auth_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('strot_user');
        localStorage.removeItem('strot_auth_token');
      }
      setIsLoading(false);
    };

    // Immediate execution for faster loading
    checkAuth();

    // Listen for profile updates from other components
    const handleProfileUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.user) {
        setUser(event.detail.user);
      }
    };

    window.addEventListener('strot-profile-updated', handleProfileUpdate as EventListener);
    
    return () => {
      window.removeEventListener('strot-profile-updated', handleProfileUpdate as EventListener);
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Much faster authentication - reduced delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Validate credentials (simple validation for demo)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Mock different user types based on email
      let userType: 'candidate' | 'employer' = 'candidate';
      let profileType: 'full-timer' | 'freelancer' | 'local-gig' | 'employer' = 'full-timer';
      
      if (email.includes('employer') || email.includes('company') || email.includes('hr')) {
        userType = 'employer';
        profileType = 'employer';
      } else if (email.includes('freelancer') || email.includes('freelance')) {
        profileType = 'freelancer';
      } else if (email.includes('gig') || email.includes('local')) {
        profileType = 'local-gig';
      }
      
      const firstName = userType === 'employer' ? 'Company' : 'Alex';
      const lastName = userType === 'employer' ? 'Admin' : 'Johnson';
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        userType,
        profileType,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        company: userType === 'employer' ? 'TechCorp Inc.' : undefined,
        bio: userType === 'employer' ? 'Leading technology company focused on innovation' : 'Passionate professional looking to make an impact',
        location: 'San Francisco, CA',
        createdAt: new Date().toISOString()
      };

      // Generate a mock token
      const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      setUser(userData);
      localStorage.setItem('strot_user', JSON.stringify(userData));
      localStorage.setItem('strot_auth_token', authToken);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: any): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Much faster signup - reduced delay  
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Validate data
      if (!email || !password || !userData.firstName || !userData.lastName) {
        throw new Error('All fields are required');
      }
      
      // For signup, we need the user to select a profile type
      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`,
        userType: 'candidate', // Default to candidate, can be changed in profile selector
        company: userData.company,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        bio: '',
        location: userData.location || '',
        createdAt: new Date().toISOString()
        // Note: profileType will be set when user selects their profile
      };

      // Generate a mock token
      const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      setUser(newUser);
      localStorage.setItem('strot_user', JSON.stringify(newUser));
      localStorage.setItem('strot_auth_token', authToken);
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('strot_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('strot_user');
    localStorage.removeItem('strot_auth_token');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};