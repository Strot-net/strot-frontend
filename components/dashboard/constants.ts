import { 
  FileText, 
  Calendar, 
  Users, 
  Target,
  CheckCircle,
  Search,
  Brain,
  BookOpen
} from 'lucide-react';

export const DASHBOARD_STATS = [
  { label: 'Applications', value: '12', change: '+3', icon: FileText, color: 'text-blue-600' },
  { label: 'Interviews', value: '3', change: '+1', icon: Calendar, color: 'text-green-600' },
  { label: 'Profile Views', value: '89', change: '+12', icon: Users, color: 'text-purple-600' },
  { label: 'Job Matches', value: '24', change: '+6', icon: Target, color: 'text-orange-600' }
];

export const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'application',
    title: 'Applied to Senior Frontend Developer',
    company: 'TechCorp Inc.',
    time: '2 hours ago',
    status: 'pending'
  },
  {
    id: 2,
    type: 'interview',
    title: 'Interview scheduled with StartupXYZ',
    company: 'StartupXYZ',
    time: '1 day ago',
    status: 'scheduled'
  },
  {
    id: 3,
    type: 'match',
    title: 'New job match: UX Designer',
    company: 'DesignStudio',
    time: '2 days ago',
    status: 'new'
  }
];

export const RECOMMENDED_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'InnovateTech',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    match: 92,
    posted: '1 day ago',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'GrowthCorp',
    location: 'Remote',
    salary: '$120k - $150k',
    match: 88,
    posted: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
  }
];

export const QUICK_ACTIONS = [
  { icon: Search, label: 'Search Jobs', route: 'full-time-jobs' },
  { icon: Users, label: 'Update Profile', route: 'profile' },
  { icon: Brain, label: 'Take Assessment', route: 'assessments' },
  { icon: BookOpen, label: 'Learn Skills', route: 'learning' }
];