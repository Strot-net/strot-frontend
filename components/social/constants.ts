export const TRENDING_TOPICS = [
  { tag: '#AIRevolution', posts: 45620, growth: '+156%', category: 'Technology', hot: true },
  { tag: '#RemoteWork', posts: 28934, growth: '+67%', category: 'Work Culture', hot: true },
  { tag: '#TechLayoffs', posts: 19721, growth: '+89%', category: 'Industry News', hot: false },
  { tag: '#WebDevelopment', posts: 15487, growth: '+23%', category: 'Skills', hot: false },
  { tag: '#StartupLife', posts: 12367, growth: '+41%', category: 'Entrepreneurship', hot: true },
  { tag: '#DataScience', posts: 9856, growth: '+34%', category: 'Technology', hot: false },
  { tag: '#DesignThinking', posts: 8234, growth: '+28%', category: 'Design', hot: false },
  { tag: '#CareerGrowth', posts: 7891, growth: '+19%', category: 'Professional', hot: false },
  { tag: '#OpenSource', posts: 6543, growth: '+52%', category: 'Development', hot: true },
  { tag: '#WomenInTech', posts: 5432, growth: '+31%', category: 'Diversity', hot: false }
];

export const LIVE_EVENTS = [
  {
    id: '1',
    title: 'AI & The Future of Work Summit',
    type: 'Virtual Conference',
    date: new Date('2024-03-15T10:00:00'),
    duration: '3 hours',
    attendees: 12453,
    speakers: ['Satya Nadella', 'Sundar Pichai', 'Jensen Huang'],
    topics: ['AI', 'Future of Work', 'Technology'],
    price: 'Free',
    status: 'Live',
    organizer: {
      name: 'TechCorp Global',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
      verified: true
    },
    description: 'Join industry leaders as they discuss how AI is reshaping the future of work and professional development.',
    registrationLink: '#',
    isLive: true,
    viewers: 8934
  },
  {
    id: '2',
    title: 'Startup Pitch Competition',
    type: 'Competition',
    date: new Date('2024-03-16T14:00:00'),
    duration: '2 hours',
    attendees: 3267,
    speakers: ['Reid Hoffman', 'Marc Benioff'],
    topics: ['Startups', 'Venture Capital', 'Innovation'],
    price: '$25',
    status: 'Upcoming',
    organizer: {
      name: 'Venture Valley',
      avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
      verified: true
    },
    description: 'Watch promising startups pitch their ideas to top VCs and win funding.',
    registrationLink: '#',
    isLive: false,
    viewers: 0
  },
  {
    id: '3',
    title: 'Design Systems Masterclass',
    type: 'Workshop',
    date: new Date('2024-03-17T16:00:00'),
    duration: '4 hours',
    attendees: 1892,
    speakers: ['Brad Frost', 'Alla Kholmatova'],
    topics: ['Design Systems', 'UI/UX', 'Frontend'],
    price: '$99',
    status: 'Upcoming',
    organizer: {
      name: 'Design Academy',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop',
      verified: true
    },
    description: 'Learn to build scalable design systems from industry experts.',
    registrationLink: '#',
    isLive: false,
    viewers: 0
  }
];

export const PROFESSIONAL_GROUPS = [
  {
    id: '1',
    name: 'Full-Stack Developers',
    members: 145672,
    description: 'A community for full-stack developers to share knowledge, discuss trends, and network.',
    category: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=150&fit=crop',
    isJoined: true,
    activity: 'Very Active',
    newPosts: 23,
    moderators: ['Alex Chen', 'Sarah Rodriguez'],
    tags: ['JavaScript', 'React', 'Node.js', 'Python'],
    privacy: 'Public',
    weeklyPosts: 156,
    topContributors: [
      { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', posts: 12 },
      { name: 'Lisa Wang', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=50&h=50&fit=crop&crop=face', posts: 9 }
    ]
  },
  {
    id: '2',
    name: 'UX/UI Designers',
    members: 89234,
    description: 'For designers passionate about creating amazing user experiences.',
    category: 'Design',
    avatar: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&h=150&fit=crop',
    isJoined: true,
    activity: 'Active',
    newPosts: 15,
    moderators: ['Emma Davis', 'Chris Park'],
    tags: ['Design', 'Figma', 'Prototyping', 'User Research'],
    privacy: 'Public',
    weeklyPosts: 89,
    topContributors: [
      { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', posts: 8 },
      { name: 'Anna Martinez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', posts: 7 }
    ]
  },
  {
    id: '3',
    name: 'Data Science & AI',
    members: 67891,
    description: 'Discuss the latest in data science, machine learning, and artificial intelligence.',
    category: 'Data Science',
    avatar: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
    isJoined: false,
    activity: 'Very Active',
    newPosts: 31,
    moderators: ['Dr. Jennifer Liu', 'Mark Thompson'],
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
    privacy: 'Public',
    weeklyPosts: 198,
    topContributors: [
      { name: 'Robert Zhang', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', posts: 15 },
      { name: 'Sofia Patel', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=50&h=50&fit=crop&crop=face', posts: 11 }
    ]
  },
  {
    id: '4',
    name: 'Remote Work Professionals',
    members: 234567,
    description: 'Tips, tools, and community for remote workers worldwide.',
    category: 'Work Culture',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop',
    isJoined: true,
    activity: 'Active',
    newPosts: 18,
    moderators: ['Remote Team Lead', 'Digital Nomad Pro'],
    tags: ['Remote Work', 'Productivity', 'Digital Nomad', 'Work-Life Balance'],
    privacy: 'Public',
    weeklyPosts: 134,
    topContributors: [
      { name: 'Taylor Swift', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', posts: 13 },
      { name: 'John Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', posts: 10 }
    ]
  }
];

export const INDUSTRY_INSIGHTS = [
  {
    industry: 'Technology',
    growth: '+24%',
    jobs: 45678,
    avgSalary: '$135k',
    topSkills: ['React', 'Python', 'AWS', 'Kubernetes', 'TypeScript'],
    companies: 2345,
    trend: 'up',
    demandScore: 95,
    insights: [
      'AI/ML roles seeing 300% increase in demand',
      'Cloud expertise remains critical',
      'Full-stack developers most sought after'
    ],
    salaryTrends: {
      junior: '$85k',
      mid: '$120k',
      senior: '$180k',
      lead: '$250k'
    },
    topCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'],
    emergingRoles: ['AI Engineer', 'DevOps Architect', 'Cloud Security Specialist']
  },
  {
    industry: 'Design',
    growth: '+18%',
    jobs: 23456,
    avgSalary: '$105k',
    topSkills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'User Testing'],
    companies: 1567,
    trend: 'up',
    demandScore: 87,
    insights: [
      'UX Research roles increasing rapidly',
      'Design Systems expertise in high demand',
      'Product Design leading salary growth'
    ],
    salaryTrends: {
      junior: '$65k',
      mid: '$95k',
      senior: '$135k',
      lead: '$180k'
    },
    topCompanies: ['Airbnb', 'Uber', 'Spotify', 'Adobe', 'Figma'],
    emergingRoles: ['Service Designer', 'Design Ops Manager', 'AI/UX Researcher']
  },
  {
    industry: 'Marketing',
    growth: '+12%',
    jobs: 34567,
    avgSalary: '$85k',
    topSkills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    companies: 3456,
    trend: 'stable',
    demandScore: 76,
    insights: [
      'Growth marketing roles expanding',
      'Data-driven marketing essential',
      'Content creators in high demand'
    ],
    salaryTrends: {
      junior: '$50k',
      mid: '$75k',
      senior: '$110k',
      lead: '$150k'
    },
    topCompanies: ['HubSpot', 'Salesforce', 'Mailchimp', 'Buffer', 'Hootsuite'],
    emergingRoles: ['Growth Hacker', 'Marketing Automation Specialist', 'Influencer Manager']
  },
  {
    industry: 'Finance',
    growth: '+8%',
    jobs: 28901,
    avgSalary: '$115k',
    topSkills: ['Excel', 'SQL', 'Python', 'Financial Modeling', 'Risk Analysis'],
    companies: 2890,
    trend: 'stable',
    demandScore: 72,
    insights: [
      'FinTech continues rapid growth',
      'Quantitative analysis skills crucial',
      'Regulatory compliance expertise needed'
    ],
    salaryTrends: {
      junior: '$70k',
      mid: '$100k',
      senior: '$145k',
      lead: '$200k'
    },
    topCompanies: ['Goldman Sachs', 'JPMorgan', 'Stripe', 'Square', 'Robinhood'],
    emergingRoles: ['Blockchain Analyst', 'DeFi Developer', 'ESG Analyst']
  }
];

export const ACTIVITY_FEED = [
  {
    id: '1',
    type: 'connection',
    actor: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=50&h=50&fit=crop&crop=face',
      title: 'Product Manager at Google'
    },
    action: 'connected with',
    target: 'you',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    mutualConnections: 12
  },
  {
    id: '2',
    type: 'like',
    actor: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      title: 'Senior Developer at Meta'
    },
    action: 'liked your post',
    target: '"Just shipped our biggest feature yet!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    postId: 'post-123'
  },
  {
    id: '3',
    type: 'comment',
    actor: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      title: 'UX Designer at Airbnb'
    },
    action: 'commented on your post',
    target: '"Great insights on design systems!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    postId: 'post-124',
    comment: 'This is exactly what our team needed to hear. Thanks for sharing!'
  },
  {
    id: '4',
    type: 'mention',
    actor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      title: 'Tech Lead at Spotify'
    },
    action: 'mentioned you in a post',
    target: '"Great collaboration with @you on the new API design"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    postId: 'post-125'
  },
  {
    id: '5',
    type: 'job_application',
    actor: {
      name: 'TechCorp Inc.',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop',
      title: 'Company'
    },
    action: 'viewed your profile',
    target: 'for Senior Frontend Developer position',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    jobId: 'job-456'
  },
  {
    id: '6',
    type: 'achievement',
    actor: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      title: 'Software Developer'
    },
    action: 'earned a new badge',
    target: '"Top Contributor" in Full-Stack Developers group',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    badge: 'top-contributor'
  }
];

export const SAMPLE_POSTS = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      title: 'Senior Software Engineer',
      company: 'Meta',
      verified: true,
      followers: 15420,
      connections: 2834,
      premium: true
    },
    content: '🚀 Just shipped our biggest feature yet! After 6 months of hard work, our team finally launched the new AI-powered recommendation engine. \n\nThe results speak for themselves:\n✅ 40% increase in user engagement\n✅ 25% boost in conversion rates\n✅ 60% reduction in loading time\n\nWhat I learned along the way:\n• Cross-functional collaboration is everything\n• User feedback should drive every decision\n• Small iterations lead to big wins\n• Never underestimate the power of good documentation\n\nProud of what we accomplished together! Shoutout to my amazing team @sarah_chen @mike_dev @lisa_designer 👏\n\n#ProductLaunch #AI #TeamWork #Meta #Engineering #Innovation',
    type: 'text',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
        alt: 'Team celebrating product launch'
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 1247,
    comments: 89,
    shares: 156,
    reposts: 234,
    views: 15420,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    tags: ['ProductLaunch', 'AI', 'TeamWork', 'Meta', 'Engineering', 'Innovation'],
    mentions: ['sarah_chen', 'mike_dev', 'lisa_designer'],
    engagement: { rate: 8.1, trend: 'up' },
    location: 'Menlo Park, CA',
    isPinned: false,
    isPromoted: false
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
      title: 'AI Research Scientist',
      company: 'OpenAI',
      verified: true,
      followers: 43820,
      connections: 5678,
      premium: true
    },
    content: '🧠 THREAD: The AI revolution isn\'t just about technology—it\'s about how we reimagine human potential.\n\nAfter 10 years in AI research, here are my thoughts on what\'s coming next... 1/7 🧵',
    type: 'thread',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 2843,
    comments: 234,
    shares: 567,
    reposts: 891,
    views: 28430,
    isLiked: true,
    isBookmarked: true,
    isReposted: false,
    tags: ['AI', 'Research', 'FutureOfWork', 'Technology', 'Innovation'],
    mentions: [],
    engagement: { rate: 12.3, trend: 'up' },
    threadCount: 7,
    isPinned: false,
    isPromoted: true
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Marcus Design',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      title: 'Senior Product Designer',
      company: 'Airbnb',
      verified: true,
      followers: 28934,
      connections: 3456,
      premium: false
    },
    content: 'What\'s your biggest design challenge right now? 🤔\n\nI\'m curious to hear what the design community is struggling with. Drop your thoughts below! 👇',
    type: 'poll',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    likes: 567,
    comments: 123,
    shares: 89,
    reposts: 45,
    views: 8934,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    tags: ['Design', 'Community', 'DesignChallenges', 'UX'],
    mentions: [],
    engagement: { rate: 6.8, trend: 'stable' },
    poll: {
      question: 'What\'s your biggest design challenge right now?',
      options: [
        { text: 'Design system consistency', votes: 234, percentage: 42 },
        { text: 'User research & validation', votes: 156, percentage: 28 },
        { text: 'Stakeholder alignment', votes: 89, percentage: 16 },
        { text: 'Technical constraints', votes: 78, percentage: 14 }
      ],
      totalVotes: 557,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 20),
      hasVoted: false
    }
  }
];