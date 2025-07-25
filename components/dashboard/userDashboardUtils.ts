export const getUserTypeLabel = (type: string) => {
  switch(type) {
    case 'freelancer': return 'Freelancer';
    case 'full-timer': return 'Full-Time Professional';
    case 'local-gig': return 'Local Service Provider';
    case 'employer': return 'Employer';
    default: return 'Professional';
  }
};

export const getUserTypeColor = (type: string) => {
  switch(type) {
    case 'freelancer': return 'from-purple-500 to-pink-600';
    case 'full-timer': return 'from-blue-500 to-indigo-600';
    case 'local-gig': return 'from-green-500 to-emerald-600';
    case 'employer': return 'from-orange-500 to-red-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const getUserTypeIcon = (type: string) => {
  switch(type) {
    case 'freelancer': return '💼';
    case 'full-timer': return '🏢';
    case 'local-gig': return '🗺️';
    case 'employer': return '👥';
    default: return '⭐';
  }
};