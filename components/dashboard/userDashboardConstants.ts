import { 
  Briefcase, 
  Search, 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Building, 
  Navigation, 
  Users, 
  DollarSign, 
  Star, 
  Target, 
  FileText, 
  Calendar, 
  Eye, 
  Bell, 
  Award, 
  PlusCircle, 
  MapPin, 
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

// Enhanced Navigation Icons with CORRECTED routes that match AuthenticatedPages
export const NAV_ITEMS = {
  freelancer: [
    { icon: Briefcase, label: 'Browse Projects', route: 'marketplace', color: 'text-purple-600' },
    { icon: Search, label: 'Job Discovery', route: 'full-time-jobs', color: 'text-blue-600' },
    { icon: Brain, label: 'AI Learning', route: 'learning', color: 'text-green-600' },
    { icon: MessageCircle, label: 'Messages', route: 'messages', color: 'text-orange-600' },
    { icon: BarChart3, label: 'Analytics', route: 'analytics', color: 'text-indigo-600' },
  ],
  'full-timer': [
    { icon: Building, label: 'Full-Time Jobs', route: 'full-time-jobs', color: 'text-blue-600' },
    { icon: Search, label: 'Job Discovery', route: 'marketplace', color: 'text-purple-600' },
    { icon: Brain, label: 'AI Learning', route: 'learning', color: 'text-green-600' },
    { icon: MessageCircle, label: 'Messages', route: 'messages', color: 'text-orange-600' },
    { icon: BarChart3, label: 'Analytics', route: 'analytics', color: 'text-indigo-600' },
  ],
  'local-gig': [
    { icon: Navigation, label: 'Local Tasks', route: 'local-tasks', color: 'text-green-600' },
    { icon: Search, label: 'Job Discovery', route: 'full-time-jobs', color: 'text-blue-600' },
    { icon: Brain, label: 'AI Learning', route: 'learning', color: 'text-purple-600' },
    { icon: MessageCircle, label: 'Messages', route: 'messages', color: 'text-orange-600' },
    { icon: BarChart3, label: 'Analytics', route: 'analytics', color: 'text-indigo-600' },
  ],
  employer: [
    { icon: Users, label: 'Find Talent', route: 'talent-search', color: 'text-orange-600' },
    { icon: Search, label: 'Job Discovery', route: 'full-time-jobs', color: 'text-blue-600' },
    { icon: Brain, label: 'AI Learning', route: 'learning', color: 'text-green-600' },
    { icon: MessageCircle, label: 'Messages', route: 'messages', color: 'text-purple-600' },
    { icon: BarChart3, label: 'Analytics', route: 'analytics', color: 'text-indigo-600' },
  ]
};

// Profile-specific stats and data
export const PROFILE_STATS = {
  freelancer: {
    greeting: "Ready to take on new projects?",
    primaryAction: "Browse Projects",
    primaryRoute: "marketplace",
    stats: [
      { label: 'Active Projects', value: '3', change: '+1', icon: Briefcase, color: 'text-purple-600' },
      { label: 'Project Completion', value: '98%', change: '+2%', icon: Target, color: 'text-blue-600' },
      { label: 'Client Rating', value: '4.9', change: '+0.1', icon: Star, color: 'text-yellow-600' },
      { label: 'Success Rate', value: '95%', change: '+3%', icon: TrendingUp, color: 'text-green-600' },
    ],
    recentActivities: [
      { icon: Award, text: 'Project "E-commerce Redesign" completed successfully', time: '2 hours ago', color: 'text-green-600' },
      { icon: MessageCircle, text: 'New message from client Sarah M.', time: '4 hours ago', color: 'text-blue-600' },
      { icon: Star, text: 'Received 5-star review from TechCorp', time: '1 day ago', color: 'text-yellow-600' },
      { icon: CheckCircle, text: 'Project milestone completed successfully', time: '2 days ago', color: 'text-green-600' },
    ],
    quickActions: [
      { icon: Search, label: 'Find New Projects', route: 'marketplace' },
      { icon: FileText, label: 'Submit Proposal', route: 'create' },
      { icon: MessageCircle, label: 'Client Messages', route: 'messages' },
      { icon: BarChart3, label: 'View Analytics', route: 'analytics' },
    ]
  },
  'full-timer': {
    greeting: "Let's advance your career today!",
    primaryAction: "Explore Jobs",
    primaryRoute: "full-time-jobs",
    stats: [
      { label: 'Applications Sent', value: '12', change: '+3', icon: FileText, color: 'text-blue-600' },
      { label: 'Interview Invites', value: '4', change: '+2', icon: Calendar, color: 'text-green-600' },
      { label: 'Profile Views', value: '89', change: '+15', icon: Eye, color: 'text-purple-600' },
      { label: 'Network Growth', value: '156', change: '+23', icon: Users, color: 'text-orange-600' },
    ],
    recentActivities: [
      { icon: Bell, text: 'Interview scheduled with InnovateTech for tomorrow', time: '1 hour ago', color: 'text-green-600' },
      { icon: Eye, text: 'Your profile was viewed by 8 recruiters', time: '3 hours ago', color: 'text-purple-600' },
      { icon: Star, text: 'New job match: Senior React Developer at StartupXYZ', time: '5 hours ago', color: 'text-blue-600' },
      { icon: Users, text: 'Sarah Chen accepted your connection request', time: '1 day ago', color: 'text-orange-600' },
    ],
    quickActions: [
      { icon: Building, label: 'Browse Jobs', route: 'full-time-jobs' },
      { icon: FileText, label: 'Update Resume', route: 'profile' },
      { icon: Users, label: 'Grow Network', route: 'social' },
      { icon: Brain, label: 'Skill Assessment', route: 'learning' },
    ]
  },
  'local-gig': {
    greeting: "New local opportunities await!",
    primaryAction: "Find Local Gigs",
    primaryRoute: "local-tasks",
    stats: [
      { label: 'Gigs Completed', value: '28', change: '+5', icon: Target, color: 'text-green-600' },
      { label: 'Tasks This Week', value: '12', change: '+3', icon: Clock, color: 'text-green-600' },
      { label: 'Customer Rating', value: '4.8', change: 'New!', icon: Star, color: 'text-yellow-600' },
      { label: 'Service Areas', value: '3', change: '+1', icon: MapPin, color: 'text-blue-600' },
    ],
    recentActivities: [
      { icon: Award, text: 'Completed lawn care service for Johnson family', time: '30 min ago', color: 'text-green-600' },
      { icon: Navigation, text: 'New gig request: House cleaning (0.5 mi away)', time: '1 hour ago', color: 'text-blue-600' },
      { icon: Star, text: 'Received excellent review from Maria S.', time: '2 hours ago', color: 'text-yellow-600' },
      { icon: CheckCircle, text: 'Task completed and reviewed positively', time: '3 hours ago', color: 'text-green-600' },
    ],
    quickActions: [
      { icon: Navigation, label: 'Browse Local Gigs', route: 'local-tasks' },
      { icon: PlusCircle, label: 'Add Service', route: 'create' },
      { icon: MapPin, label: 'Update Location', route: 'settings' },
      { icon: Calendar, label: 'Schedule Management', route: 'profile' },
    ]
  },
  employer: {
    greeting: "Time to find your next star hire!",
    primaryAction: "Find Talent",
    primaryRoute: "talent-search",
    stats: [
      { label: 'Active Job Posts', value: '7', change: '+2', icon: Briefcase, color: 'text-blue-600' },
      { label: 'Candidate Pipeline', value: '342', change: '+45', icon: Users, color: 'text-purple-600' },
      { label: 'Interview Rate', value: '23%', change: '+5%', icon: TrendingUp, color: 'text-green-600' },
      { label: 'Time to Hire', value: '12 days', change: '-3', icon: Clock, color: 'text-orange-600' },
    ],
    recentActivities: [
      { icon: Users, text: '15 new applications for Senior Developer position', time: '1 hour ago', color: 'text-blue-600' },
      { icon: Star, text: 'Alex Johnson (95% match) applied to your posting', time: '2 hours ago', color: 'text-green-600' },
      { icon: Calendar, text: 'Interview with Sarah M. scheduled for tomorrow', time: '4 hours ago', color: 'text-purple-600' },
      { icon: Award, text: 'Successfully hired React Developer', time: '1 day ago', color: 'text-green-600' },
    ],
    quickActions: [
      { icon: Users, label: 'Review Candidates', route: 'talent-search' },
      { icon: PlusCircle, label: 'Post New Job', route: 'create' },
      { icon: MessageCircle, label: 'Interview Pipeline', route: 'messages' },
      { icon: BarChart3, label: 'Hiring Analytics', route: 'analytics' },
    ]
  }
};