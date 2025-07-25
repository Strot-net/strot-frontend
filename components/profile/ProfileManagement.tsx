import { useAuth } from '../auth/AuthProvider';
import { UltraAdvancedProfile } from './UltraAdvancedProfile';

interface ProfileManagementProps {
  onNavigate: (page: string) => void;
}

export function ProfileManagement({ onNavigate }: ProfileManagementProps) {
  const { user } = useAuth();
  
  // Determine profile type from user data
  const getProfileType = () => {
    if (user?.userType === 'employer') return 'employer';
    return user?.profileType || 'full-timer';
  };

  return (
    <UltraAdvancedProfile 
      onNavigate={onNavigate} 
      profileType={getProfileType() as 'full-timer' | 'freelancer' | 'gig-worker' | 'employer'}
    />
  );
}