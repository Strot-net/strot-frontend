export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    company: string;
    verified: boolean;
    followers: number;
    connections: number;
    premium: boolean;
  };
  content: string;
  type: 'text' | 'image' | 'video' | 'article' | 'job' | 'poll' | 'event' | 'thread' | 'quote' | 'achievement';
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  reposts: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isReposted: boolean;
  tags: string[];
  mentions: string[];
  engagement: {
    rate: number;
    trend: 'up' | 'down' | 'stable';
  };
  location?: string;
  isPinned?: boolean;
  isPromoted?: boolean;
  threadCount?: number;
  quotedPost?: Post;
  poll?: {
    question: string;
    options: Array<{ text: string; votes: number; percentage: number }>;
    totalVotes: number;
    endsAt: Date;
    hasVoted: boolean;
  };
  achievements?: {
    badge: string;
    title: string;
    description: string;
  };
}

export interface TrendingTopic {
  tag: string;
  posts: number;
  growth: string;
  category: string;
  hot: boolean;
}

export interface LiveEvent {
  id: string;
  title: string;
  type: string;
  date: Date;
  duration: string;
  attendees: number;
  speakers: string[];
  topics: string[];
  price: string;
  status: string;
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
  registrationLink: string;
  isLive: boolean;
  viewers: number;
}

export interface ProfessionalGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  category: string;
  avatar: string;
  isJoined: boolean;
  activity: string;
  newPosts: number;
  moderators: string[];
  tags: string[];
  privacy: string;
  weeklyPosts: number;
  topContributors: Array<{
    name: string;
    avatar: string;
    posts: number;
  }>;
}

export interface IndustryInsight {
  industry: string;
  growth: string;
  jobs: number;
  avgSalary: string;
  topSkills: string[];
  companies: number;
  trend: string;
  demandScore: number;
  insights: string[];
  salaryTrends: {
    junior: string;
    mid: string;
    senior: string;
    lead: string;
  };
  topCompanies: string[];
  emergingRoles: string[];
}

export interface ActivityFeedItem {
  id: string;
  type: 'connection' | 'like' | 'comment' | 'mention' | 'job_application' | 'achievement';
  actor: {
    name: string;
    avatar: string;
    title: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  mutualConnections?: number;
  postId?: string;
  comment?: string;
  jobId?: string;
  badge?: string;
}