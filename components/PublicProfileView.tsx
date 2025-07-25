import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Star, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MessageCircle, 
  Share2, 
  Heart, 
  Eye,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Globe,
  Camera,
  Video,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Plus,
  Settings,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  BookOpen,
  Target,
  Building,
  Code,
  Palette,
  Lightbulb,
  Coffee,
  ChevronRight,
  Filter,
  Search,
  Bell,
  UserPlus,
  UserCheck,
  Download,
  Edit3,
  Link,
  Image as ImageIcon,
  Play,
  Bookmark,
  Flag,
  Trophy,
  Rocket,
  Shield,
  Verified,
  Navigation,
  Laptop,
  Server,
  Database,
  Smartphone,
  Headphones,
  Monitor,
  Wrench,
  Truck,
  Home as HomeIcon,
  Car,
  Package,
  Scissors,
  PaintBucket,
  Hammer,
  Lightbulb as BulbIcon,
  Users2,
  Target as TargetIcon,
  BarChart3,
  PieChart,
  Activity,
  Crown,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PublicProfileProps {
  userId: string;
  onBack: () => void;
  onMessage: (userId: string) => void;
  currentUserType?: 'freelancer' | 'full-timer' | 'local-gig' | 'employer';
  currentUser?: any;
}

interface ProfileData {
  id: string;
  name: string;
  username: string;
  userType: 'freelancer' | 'full-timer' | 'local-gig' | 'employer';
  avatar: string;
  coverImage: string;
  title: string;
  company?: string;
  location: string;
  joinedDate: string;
  isVerified: boolean;
  isOnline: boolean;
  lastSeen?: string;
  bio: string;
  headline: string;
  skills: Array<{ name: string; level: number; verified: boolean; endorsements: number }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
    current: boolean;
    logo?: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
    logo?: string;
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
    tags: string[];
    likes: number;
    views: number;
    date: string;
    type?: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'certification' | 'award' | 'milestone';
    issuer?: string;
    credentialId?: string;
  }>;
  stats: {
    completedProjects: number;
    successRate: number;
    rating: number;
    totalReviews: number;
    responseTime: string;
    profileViews: number;
    connections: number;
    followers: number;
    following: number;
    posts: number;
  };
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    email?: string;
    phone?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
  reviews: Array<{
    id: string;
    reviewer: {
      name: string;
      avatar: string;
      title: string;
      verified: boolean;
    };
    rating: number;
    comment: string;
    date: string;
    project: string;
    helpful: number;
  }>;
  posts: Array<{
    id: string;
    type: 'text' | 'image' | 'video' | 'article' | 'achievement';
    content: string;
    media?: string;
    date: string;
    likes: number;
    comments: number;
    shares: number;
    engagement: Array<{
      user: { name: string; avatar: string };
      type: 'like' | 'comment' | 'share';
      content?: string;
      date: string;
    }>;
  }>;
  specializations?: string[];
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    timezone: string;
    preferredWorkType?: string[];
    nextAvailable?: string;
  };
  interests: string[];
  languages: Array<{ name: string; level: string }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
  }>;
  companyDetails?: {
    name: string;
    industry: string;
    size: string;
    founded: string;
    headquarters: string;
    website: string;
    description: string;
    mission: string;
    values: string[];
    benefits: string[];
    perks: string[];
    locations: Array<{
      city: string;
      type: string;
      employees: number;
    }>;
    achievements: string[];
    socialImpact: string[];
  };
}

// Enhanced profile data generator with comprehensive, profile-specific content
const getUserBasedProfile = (userId: string, userType: 'freelancer' | 'full-timer' | 'local-gig' | 'employer', currentUser?: any): ProfileData => {
  // Extract user info
  const getUserDisplayName = () => {
    if (currentUser?.name) return currentUser.name;
    if (currentUser?.email) return currentUser.email.split('@')[0];
    return 'User';
  };

  const userName = getUserDisplayName();
  const userEmail = currentUser?.email || 'user@example.com';
  
  const baseProfile = {
    id: userId,
    name: userName,
    username: `@${userName.toLowerCase().replace(/\s+/g, '')}`,
    userType,
    avatar: currentUser?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    location: currentUser?.location || 'San Francisco, CA',
    joinedDate: currentUser?.joinedDate || '2022-03-15',
    isVerified: true,
    isOnline: Math.random() > 0.3,
    bio: currentUser?.bio || 'Passionate professional dedicated to creating exceptional experiences.',
    social: {
      linkedin: currentUser?.social?.linkedin || `https://linkedin.com/in/${userName.toLowerCase().replace(/\s+/g, '')}`,
      github: currentUser?.social?.github || `https://github.com/${userName.toLowerCase().replace(/\s+/g, '')}`,
      twitter: currentUser?.social?.twitter || `https://twitter.com/${userName.toLowerCase().replace(/\s+/g, '')}`,
      website: currentUser?.website || `https://${userName.toLowerCase().replace(/\s+/g, '')}.dev`,
      email: userEmail
    },
    interests: currentUser?.interests || ['Technology', 'Innovation', 'Growth', 'Excellence'],
    languages: currentUser?.languages || [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Conversational' }
    ],
    availability: {
      status: 'available' as const,
      timezone: currentUser?.timezone || 'PST (UTC-8)'
    }
  };

  switch (userType) {
    case 'freelancer':
      return {
        ...baseProfile,
        title: 'Senior Full-Stack Developer & UI/UX Designer',
        headline: 'Crafting digital experiences that drive results 🚀',
        bio: 'Passionate freelance developer with 6+ years of experience building scalable web applications and stunning user interfaces. I specialize in React, Node.js, and modern web technologies, helping startups and enterprises bring their vision to life.',
        specializations: ['Web Development', 'UI/UX Design', 'Mobile Apps', 'E-commerce', 'SaaS Applications'],
        skills: [
          { name: 'React & Next.js', level: 95, verified: true, endorsements: 89 },
          { name: 'TypeScript', level: 92, verified: true, endorsements: 67 },
          { name: 'Node.js & Express', level: 88, verified: true, endorsements: 54 },
          { name: 'UI/UX Design', level: 90, verified: true, endorsements: 76 },
          { name: 'Python & Django', level: 85, verified: false, endorsements: 43 },
          { name: 'GraphQL & APIs', level: 87, verified: true, endorsements: 38 },
          { name: 'AWS & DevOps', level: 82, verified: false, endorsements: 29 },
          { name: 'Figma & Adobe XD', level: 88, verified: true, endorsements: 52 }
        ],
        experience: [
          {
            id: '1',
            title: 'Senior Freelance Developer',
            company: 'Self-Employed',
            duration: '2021 - Present',
            description: 'Independent contractor specializing in full-stack web development for startups and SMBs. Built 40+ applications serving 500K+ users globally.',
            current: true,
            logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            title: 'Lead Frontend Developer',
            company: 'TechStartup Inc.',
            duration: '2019 - 2021',
            description: 'Led frontend development team of 4 developers. Architected React-based micro-frontends serving 1M+ daily active users.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop'
          },
          {
            id: '3',
            title: 'Full-Stack Developer',
            company: 'Digital Agency Co.',
            duration: '2018 - 2019',
            description: 'Developed custom web solutions for 20+ enterprise clients. Specialized in React, Node.js, and cloud deployment.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'B.S. Computer Science',
            institution: 'University of California, Berkeley',
            year: '2018',
            description: 'Specialized in Software Engineering and Human-Computer Interaction. Graduated Magna Cum Laude.',
            logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop'
          }
        ],
        portfolio: [
          {
            id: '1',
            title: 'E-commerce Platform Revolution',
            description: 'Modern React-based e-commerce solution with AI-powered recommendations, real-time inventory, and advanced analytics dashboard.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            link: 'https://ecommerce-demo.com',
            tags: ['React', 'Node.js', 'MongoDB', 'AI/ML', 'Stripe'],
            likes: 347,
            views: 2840,
            date: '2024-01-15',
            type: 'Web Application'
          },
          {
            id: '2',
            title: 'FinTech Mobile Banking App',
            description: 'Secure mobile banking interface with biometric authentication, P2P payments, and investment tracking.',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
            tags: ['React Native', 'UI/UX', 'Security', 'FinTech'],
            likes: 289,
            views: 1567,
            date: '2023-12-20',
            type: 'Mobile App'
          },
          {
            id: '3',
            title: 'SaaS Analytics Dashboard',
            description: 'Real-time analytics platform with interactive charts, custom reporting, and multi-tenant architecture.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
            likes: 198,
            views: 892,
            date: '2023-11-10',
            type: 'SaaS Platform'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Top Rated Freelancer 2024',
            description: 'Achieved top 1% rating on multiple freelance platforms with 98% client satisfaction',
            date: '2024-01-01',
            type: 'award',
            issuer: 'Freelance Community'
          },
          {
            id: '2',
            title: 'AWS Solutions Architect Professional',
            description: 'Advanced certification in cloud architecture and enterprise solutions',
            date: '2023-08-15',
            type: 'certification',
            issuer: 'Amazon Web Services',
            credentialId: 'AWS-PSA-12345'
          }
        ],
        stats: {
          completedProjects: 187,
          successRate: 98,
          rating: 4.95,
          totalReviews: 124,
          responseTime: '< 2 hours',
          profileViews: 28420,
          connections: 1847,
          followers: 3241,
          following: 892,
          posts: 67
        },
        posts: [
          {
            id: '1',
            type: 'achievement',
            content: 'Just shipped another React Native app to the App Store! 🚀 This financial planning app helps users track investments and savings goals. Built with TypeScript and integrated with real-time market data.',
            date: '2024-01-20',
            likes: 156,
            comments: 34,
            shares: 18,
            engagement: []
          }
        ],
        reviews: [
          {
            id: '1',
            reviewer: {
              name: 'Sarah Chen',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=50&h=50&fit=crop&crop=face',
              title: 'CEO at StartupX',
              verified: true
            },
            rating: 5,
            comment: 'Alex delivered an exceptional e-commerce platform that exceeded our expectations. The code quality is outstanding, and the project was delivered 2 weeks ahead of schedule. Highly recommend!',
            date: '2024-01-15',
            project: 'E-commerce Platform Development',
            helpful: 23
          },
          {
            id: '2',
            reviewer: {
              name: 'Michael Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
              title: 'CTO at FinTech Solutions',
              verified: true
            },
            rating: 5,
            comment: 'Incredible work on our mobile banking app. Alex handled complex security requirements with expertise and delivered a beautiful, user-friendly interface.',
            date: '2024-01-10',
            project: 'Mobile Banking Application',
            helpful: 18
          }
        ],
        certifications: [
          {
            name: 'AWS Solutions Architect Professional',
            issuer: 'Amazon Web Services',
            date: '2023-08-15',
            credentialId: 'AWS-PSA-12345',
            url: 'https://aws.amazon.com/verification'
          },
          {
            name: 'Google Cloud Professional Developer',
            issuer: 'Google Cloud',
            date: '2023-05-20',
            credentialId: 'GCP-PD-67890'
          }
        ]
      };

    case 'full-timer':
      return {
        ...baseProfile,
        title: 'Senior Product Manager',
        company: 'Meta (Facebook)',
        headline: 'Building products that connect billions of people 🌎',
        bio: 'Strategic product leader with 8+ years of experience at top tech companies. Led cross-functional teams to launch products used by millions of users globally. Passionate about user-centered design and data-driven decision making.',
        specializations: ['Product Strategy', 'User Experience', 'Data Analytics', 'Team Leadership', 'Go-to-Market'],
        skills: [
          { name: 'Product Strategy', level: 96, verified: true, endorsements: 145 },
          { name: 'User Research & UX', level: 92, verified: true, endorsements: 118 },
          { name: 'Data Analysis', level: 88, verified: true, endorsements: 89 },
          { name: 'Team Leadership', level: 94, verified: true, endorsements: 97 },
          { name: 'Agile & Scrum', level: 90, verified: true, endorsements: 76 },
          { name: 'Go-to-Market Strategy', level: 87, verified: true, endorsements: 64 },
          { name: 'A/B Testing', level: 85, verified: false, endorsements: 43 },
          { name: 'Stakeholder Management', level: 93, verified: true, endorsements: 88 }
        ],
        experience: [
          {
            id: '1',
            title: 'Senior Product Manager',
            company: 'Meta (Facebook)',
            duration: '2022 - Present',
            description: 'Leading product strategy for Instagram Reels, driving 40% growth in engagement. Managing roadmap for features used by 2B+ monthly active users.',
            current: true,
            logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            title: 'Product Manager',
            company: 'Google',
            duration: '2020 - 2022',
            description: 'Launched Google Pay for Business, achieving $500M+ in transaction volume within first year. Led team of 12 engineers and designers.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop'
          },
          {
            id: '3',
            title: 'Associate Product Manager',
            company: 'Uber Technologies',
            duration: '2018 - 2020',
            description: 'Managed rider experience features across 50+ cities. Improved user retention by 25% through data-driven product improvements.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'MBA in Technology Management',
            institution: 'Stanford Graduate School of Business',
            year: '2018',
            description: 'Specialized in Technology Entrepreneurship and Product Management. Winner of Stanford Business Plan Competition.',
            logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            degree: 'B.S. Computer Science',
            institution: 'MIT',
            year: '2016',
            description: 'Focus on Human-Computer Interaction and Software Engineering. Published research on user experience optimization.',
            logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=60&h=60&fit=crop'
          }
        ],
        portfolio: [
          {
            id: '1',
            title: 'Instagram Reels Growth Strategy',
            description: 'Led product strategy resulting in 40% growth in user engagement and 60% increase in content creation.',
            image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop',
            tags: ['Product Strategy', 'User Growth', 'Social Media', 'Analytics'],
            likes: 567,
            views: 4280,
            date: '2024-01-10',
            type: 'Product Launch'
          },
          {
            id: '2',
            title: 'Google Pay Business Platform',
            description: 'End-to-end product management for B2B payment solutions, achieving $500M+ transaction volume in first year.',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
            tags: ['FinTech', 'B2B Product', 'Payments', 'Growth'],
            likes: 423,
            views: 2890,
            date: '2023-11-15',
            type: 'Product Strategy'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Product Manager of the Year 2023',
            description: 'Recognized by Meta leadership for exceptional product impact and team leadership',
            date: '2023-12-01',
            type: 'award',
            issuer: 'Meta Inc.'
          },
          {
            id: '2',
            title: 'Certified Scrum Product Owner',
            description: 'Advanced certification in Agile product management methodologies',
            date: '2023-06-15',
            type: 'certification',
            issuer: 'Scrum Alliance',
            credentialId: 'CSP-PO-98765'
          }
        ],
        stats: {
          completedProjects: 67,
          successRate: 94,
          rating: 4.8,
          totalReviews: 45,
          responseTime: '< 4 hours',
          profileViews: 15420,
          connections: 2847,
          followers: 4562,
          following: 1234,
          posts: 89
        },
        posts: [],
        reviews: [],
        certifications: [
          {
            name: 'Certified Scrum Product Owner',
            issuer: 'Scrum Alliance',
            date: '2023-06-15',
            credentialId: 'CSP-PO-98765'
          },
          {
            name: 'Google Analytics Certified',
            issuer: 'Google',
            date: '2023-03-20',
            credentialId: 'GA-CERT-54321'
          }
        ]
      };
    
    case 'local-gig':
      return {
        ...baseProfile,
        title: 'Multi-Service Local Professional',
        headline: 'Your trusted local expert for home and business services 🏠',
        bio: 'Experienced local service provider with 10+ years in the San Francisco Bay Area. Specializing in home maintenance, pet care, delivery services, and event assistance. Known for reliability, quality work, and excellent customer service.',
        specializations: ['Home Services', 'Pet Care', 'Delivery & Transportation', 'Event Services', 'Handyman Work'],
        skills: [
          { name: 'Home Maintenance', level: 95, verified: true, endorsements: 234 },
          { name: 'Pet Care & Sitting', level: 92, verified: true, endorsements: 187 },
          { name: 'Delivery Services', level: 88, verified: true, endorsements: 156 },
          { name: 'Event Setup/Cleanup', level: 85, verified: false, endorsements: 89 },
          { name: 'Landscaping & Gardening', level: 87, verified: true, endorsements: 123 },
          { name: 'House Cleaning', level: 90, verified: true, endorsements: 167 },
          { name: 'Moving & Packing', level: 83, verified: false, endorsements: 76 },
          { name: 'Assembly & Installation', level: 86, verified: true, endorsements: 98 }
        ],
        experience: [
          {
            id: '1',
            title: 'Independent Service Provider',
            company: 'Self-Employed',
            duration: '2019 - Present',
            description: 'Providing diverse local services across San Francisco Bay Area. Completed 1,200+ gigs with 4.9-star average rating.',
            current: true,
            logo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            title: 'Property Maintenance Specialist',
            company: 'Bay Area Property Management',
            duration: '2016 - 2019',
            description: 'Managed maintenance for 50+ rental properties. Specialized in quick turnarounds and quality repairs.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Certified Home Inspector',
            institution: 'California Real Estate Institute',
            year: '2018',
            description: 'Professional certification in residential property inspection and maintenance.',
            logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=60&h=60&fit=crop'
          }
        ],
        portfolio: [
          {
            id: '1',
            title: 'Complete Home Renovation Project',
            description: 'Led full kitchen and bathroom renovation for luxury home in Palo Alto. Coordinated with contractors and completed on time.',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
            tags: ['Home Renovation', 'Project Management', 'Quality Work'],
            likes: 89,
            views: 567,
            date: '2024-01-05',
            type: 'Home Services'
          },
          {
            id: '2',
            title: 'Pet Care Excellence',
            description: 'Provided exceptional pet sitting services for 50+ families. Specialized in elderly dog care and medication administration.',
            image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
            tags: ['Pet Care', 'Reliability', 'Animal Health'],
            likes: 67,
            views: 345,
            date: '2023-12-15',
            type: 'Pet Services'
          },
          {
            id: '3',
            title: 'Event Setup & Coordination',
            description: 'Successfully managed setup and cleanup for 100+ events including weddings, corporate gatherings, and private parties.',
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
            tags: ['Event Services', 'Organization', 'Team Coordination'],
            likes: 54,
            views: 278,
            date: '2023-11-20',
            type: 'Event Services'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Top Local Service Provider 2023',
            description: 'Recognized as #1 rated service provider in San Francisco Bay Area',
            date: '2023-12-31',
            type: 'award',
            issuer: 'Local Services Association'
          },
          {
            id: '2',
            title: 'Pet First Aid Certified',
            description: 'Professional certification in animal emergency care and safety',
            date: '2023-09-10',
            type: 'certification',
            issuer: 'American Red Cross',
            credentialId: 'ARC-PFA-45678'
          }
        ],
        stats: {
          completedProjects: 1247,
          successRate: 98,
          rating: 4.92,
          totalReviews: 892,
          responseTime: '< 30 minutes',
          profileViews: 8940,
          connections: 567,
          followers: 1234,
          following: 234,
          posts: 34
        },
        posts: [],
        reviews: [
          {
            id: '1',
            reviewer: {
              name: 'Jennifer Park',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=50&h=50&fit=crop&crop=face',
              title: 'Homeowner',
              verified: true
            },
            rating: 5,
            comment: 'Maria did an amazing job with our home maintenance. She was punctual, professional, and the quality of work exceeded our expectations. Highly recommend!',
            date: '2024-01-18',
            project: 'Home Maintenance Services',
            helpful: 15
          }
        ],
        certifications: [
          {
            name: 'Pet First Aid & CPR Certified',
            issuer: 'American Red Cross',
            date: '2023-09-10',
            credentialId: 'ARC-PFA-45678'
          },
          {
            name: 'Certified Home Inspector',
            issuer: 'California Real Estate Institute',
            date: '2018-05-15',
            credentialId: 'CRI-HI-12345'
          }
        ]
      };

    case 'employer':
      return {
        ...baseProfile,
        title: 'Chief Technology Officer',
        company: 'InnovateTech Solutions',
        headline: 'Building the future of work through technology and innovation 🚀',
        bio: 'Visionary technology leader with 15+ years experience scaling engineering teams and building world-class products. Currently CTO at a fast-growing fintech startup, leading 80+ engineers across multiple offices.',
        specializations: ['Engineering Leadership', 'Team Scaling', 'Product Strategy', 'Technical Architecture', 'Startup Growth'],
        companyDetails: {
          name: 'InnovateTech Solutions',
          industry: 'Financial Technology',
          size: '500-1000 employees',
          founded: '2018',
          headquarters: 'San Francisco, CA',
          website: 'https://innovatetech.com',
          description: 'InnovateTech Solutions is a leading fintech company revolutionizing how businesses manage their financial operations. We provide cutting-edge API solutions, payment processing, and financial analytics tools to help companies streamline their financial workflows.',
          mission: 'To democratize access to advanced financial technology and empower businesses of all sizes to achieve financial excellence.',
          values: ['Innovation', 'Transparency', 'Customer Success', 'Diversity & Inclusion', 'Sustainable Growth'],
          benefits: [
            'Comprehensive Health Insurance',
            'Unlimited PTO',
            'Stock Options',
            'Remote Work Flexibility',
            'Learning & Development Budget',
            'Free Lunch & Snacks',
            'Gym Membership',
            'Mental Health Support',
            'Parental Leave',
            'Conference & Training Budget'
          ],
          perks: [
            'Annual company retreats',
            'Quarterly team building events',
            'Innovation time (20% for personal projects)',
            'Open office with game rooms',
            'Commuter benefits',
            'Device & home office budget',
            'Performance bonuses',
            'Career mentorship programs'
          ],
          locations: [
            { city: 'San Francisco', type: 'Headquarters', employees: 300 },
            { city: 'New York', type: 'Office', employees: 150 },
            { city: 'Austin', type: 'Office', employees: 100 },
            { city: 'Remote', type: 'Distributed', employees: 200 }
          ],
          achievements: [
            'Named "Best FinTech Startup" by TechCrunch 2023',
            'Raised $50M Series B funding',
            'Serving 10,000+ businesses globally',
            'SOC 2 Type II certified',
            'Great Place to Work certified'
          ],
          socialImpact: [
            'Financial literacy programs for underserved communities',
            'Open source contributions to fintech ecosystem',
            'Diversity scholarship programs',
            'Carbon neutral operations'
          ]
        },
        skills: [
          { name: 'Engineering Leadership', level: 97, verified: true, endorsements: 267 },
          { name: 'Team Scaling & Hiring', level: 94, verified: true, endorsements: 198 },
          { name: 'Technical Architecture', level: 92, verified: true, endorsements: 156 },
          { name: 'Product Strategy', level: 89, verified: true, endorsements: 134 },
          { name: 'Agile Methodologies', level: 91, verified: true, endorsements: 145 },
          { name: 'Cloud Infrastructure', level: 88, verified: false, endorsements: 98 },
          { name: 'Data Strategy', level: 86, verified: true, endorsements: 87 },
          { name: 'Mentorship & Coaching', level: 95, verified: true, endorsements: 234 }
        ],
        experience: [
          {
            id: '1',
            title: 'Chief Technology Officer',
            company: 'InnovateTech Solutions',
            duration: '2022 - Present',
            description: 'Leading engineering organization of 80+ developers. Scaled team from 15 to 80 people while maintaining high performance and culture.',
            current: true,
            logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            title: 'VP of Engineering',
            company: 'TechGiant Corp',
            duration: '2019 - 2022',
            description: 'Built and managed engineering teams for multiple product lines serving 10M+ users. Led digital transformation initiatives.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop'
          },
          {
            id: '3',
            title: 'Senior Engineering Manager',
            company: 'StartupUnicorn',
            duration: '2016 - 2019',
            description: 'Managed 25-person engineering team through Series A to IPO. Established engineering practices and culture.',
            current: false,
            logo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'M.S. Computer Science',
            institution: 'Stanford University',
            year: '2010',
            description: 'Specialized in Distributed Systems and Machine Learning. Research focus on scalable architectures.',
            logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop'
          },
          {
            id: '2',
            degree: 'Executive Leadership Program',
            institution: 'Harvard Business School',
            year: '2020',
            description: 'Advanced program in executive leadership and organizational development.',
            logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=60&h=60&fit=crop'
          }
        ],
        portfolio: [
          {
            id: '1',
            title: 'Engineering Team Transformation',
            description: 'Successfully scaled engineering team from 15 to 80 people while improving productivity by 40% and reducing time-to-market by 60%.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
            tags: ['Team Leadership', 'Scaling', 'Process Improvement'],
            likes: 234,
            views: 1890,
            date: '2024-01-01',
            type: 'Leadership Initiative'
          },
          {
            id: '2',
            title: 'Cloud Infrastructure Migration',
            description: 'Led migration of legacy systems to cloud-native architecture, achieving 99.9% uptime and 50% cost reduction.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
            tags: ['Cloud Architecture', 'DevOps', 'Cost Optimization'],
            likes: 189,
            views: 1234,
            date: '2023-10-15',
            type: 'Technical Project'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'CTO of the Year 2023',
            description: 'Recognized by TechLeaders Association for innovation in engineering leadership',
            date: '2023-11-15',
            type: 'award',
            issuer: 'TechLeaders Association'
          },
          {
            id: '2',
            title: 'AWS Solutions Architect Professional',
            description: 'Expert-level certification in cloud architecture and solutions design',
            date: '2023-07-20',
            type: 'certification',
            issuer: 'Amazon Web Services',
            credentialId: 'AWS-PSA-98765'
          }
        ],
        stats: {
          completedProjects: 89,
          successRate: 96,
          rating: 4.87,
          totalReviews: 67,
          responseTime: '< 6 hours',
          profileViews: 34560,
          connections: 5670,
          followers: 8900,
          following: 2340,
          posts: 123
        },
        posts: [],
        reviews: [],
        certifications: [
          {
            name: 'AWS Solutions Architect Professional',
            issuer: 'Amazon Web Services',
            date: '2023-07-20',
            credentialId: 'AWS-PSA-98765'
          },
          {
            name: 'Certified ScrumMaster',
            issuer: 'Scrum Alliance',
            date: '2022-04-10',
            credentialId: 'CSM-67890'
          }
        ]
      };

    default:
      return {
        ...baseProfile,
        title: 'Professional',
        headline: 'Dedicated professional focused on excellence',
        skills: [],
        experience: [],
        education: [],
        portfolio: [],
        achievements: [],
        stats: {
          completedProjects: 0,
          successRate: 100,
          rating: 5.0,
          totalReviews: 0,
          responseTime: '< 24 hours',
          profileViews: 100,
          connections: 0,
          followers: 0,
          following: 0,
          posts: 0
        },
        posts: [],
        reviews: [],
        certifications: []
      };
  }
};

export function PublicProfileView({ userId, onBack, onMessage, currentUserType, currentUser }: PublicProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [endorsementGiven, setEndorsementGiven] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Simulate API call to fetch profile data
    setTimeout(() => {
      const profileData = getUserBasedProfile(userId, currentUserType || 'freelancer', currentUser);
      setProfile(profileData);
    }, 500);
  }, [userId, currentUserType, currentUser]);

  const handleEndorse = (skillName: string) => {
    if (!endorsementGiven.includes(skillName) && profile) {
      setEndorsementGiven([...endorsementGiven, skillName]);
      const updatedProfile = {
        ...profile,
        skills: profile.skills.map(skill =>
          skill.name === skillName
            ? { ...skill, endorsements: skill.endorsements + 1 }
            : skill
        )
      };
      setProfile(updatedProfile);
    }
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const toggleEdit = (section: string) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case 'freelancer': return 'Freelancer';
      case 'full-timer': return 'Full-Time Professional';
      case 'local-gig': return 'Local Service Provider';
      case 'employer': return 'Employer';
      default: return 'Professional';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'freelancer': return Laptop;
      case 'full-timer': return Building;
      case 'local-gig': return Navigation;
      case 'employer': return Users2;
      default: return Briefcase;
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'freelancer': return 'from-purple-500 to-pink-600';
      case 'full-timer': return 'from-blue-500 to-indigo-600';
      case 'local-gig': return 'from-green-500 to-emerald-600';
      case 'employer': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const IconComponent = getUserTypeIcon(profile.userType);

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{profile.name}</span>
                    {profile.isVerified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                    <Badge className={`bg-gradient-to-r ${getUserTypeColor(profile.userType)} text-white`}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {getUserTypeLabel(profile.userType)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {profile.stats.connections.toLocaleString()} connections • {profile.stats.followers.toLocaleString()} followers
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Save PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Enhanced Cover & Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Cover Image */}
            <div 
              className="h-48 md:h-80 rounded-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${profile.coverImage})` }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
              {/* Cover overlay with stats */}
              <div className="absolute bottom-4 right-4 flex space-x-4 text-white">
                <div className="text-center">
                  <div className="text-xl font-bold">{profile.stats.profileViews.toLocaleString()}</div>
                  <div className="text-xs">Profile views</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{profile.stats.rating}</div>
                  <div className="text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    Rating
                  </div>
                </div>
              </div>
              
              {/* Online Status Indicator */}
              {profile.isOnline && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                </Avatar>
                {profile.isOnline && (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-8 h-8 bg-green-500 border-4 border-background rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Profile Info */}
          <div className="mt-20 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      {profile.isVerified && (
                        <Verified className="h-6 w-6 text-blue-500" />
                      )}
                      <Badge className={`bg-gradient-to-r ${getUserTypeColor(profile.userType)} text-white`}>
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleEdit('profile')}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing.profile ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                  
                  <p className="text-xl text-muted-foreground">{profile.title}</p>
                  {profile.company && (
                    <p className="text-muted-foreground flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{profile.company}</span>
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{profile.availability.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Bio Section */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">About</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleEdit('bio')}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing.bio ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                  
                  {isEditing.bio ? (
                    <Textarea
                      defaultValue={profile.bio}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <>
                      <div className="bg-muted/50 p-4 rounded-lg mb-4">
                        <p className="text-lg font-medium">{profile.headline}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {showFullBio ? profile.bio : `${profile.bio.substring(0, 200)}...`}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setShowFullBio(!showFullBio)}
                      >
                        {showFullBio ? 'Show less' : 'Show more'}
                      </Button>
                      
                      {/* Specializations */}
                      {profile.specializations && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Specializations</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-sm">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Card>

                {/* Connection Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile.stats.connections.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile.stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile.stats.completedProjects}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile.stats.rating}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      Rating
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col space-y-3 min-w-[200px]">
                <div className="flex space-x-2">
                  <Button onClick={handleConnect} className="flex-1">
                    {isConnected ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onMessage(profile.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="w-full"
                >
                  {isFollowing ? (
                    <>
                      <Heart className="h-4 w-4 mr-2 fill-current text-red-500" />
                      Following
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>

                {/* Availability Status */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${profile.availability.status === 'available' ? 'bg-green-500' : profile.availability.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="font-medium capitalize">{profile.availability.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Response time: {profile.stats.responseTime}
                  </p>
                  {profile.availability.nextAvailable && (
                    <p className="text-sm text-muted-foreground">
                      Next available: {profile.availability.nextAvailable}
                    </p>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Skills Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleEdit('skills')}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing.skills ? 'Save' : 'Edit'}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(profile.skills || []).slice(0, showAllSkills ? undefined : 8).map((skill, index) => (
              <div key={`skill-${index}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{skill.name}</span>
                    {skill.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{skill.endorsements} endorsements</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEndorse(skill.name)}
                      disabled={endorsementGiven.includes(skill.name)}
                      className="h-6 px-2 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">{skill.level}%</div>
              </div>
            ))}
          </div>
          {(profile.skills || []).length > 8 && (
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              {showAllSkills ? 'Show less' : `Show all ${profile.skills.length} skills`}
            </Button>
          )}
        </Card>

        {/* Experience Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Experience</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleEdit('experience')}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing.experience ? 'Save' : 'Edit'}
            </Button>
          </div>
          <div className="space-y-6">
            {(profile.experience || []).map((exp, index) => (
              <div key={exp.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{exp.title}</h4>
                    {exp.current && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Portfolio Section - Enhanced with type-specific content */}
        {(profile.portfolio || []).length > 0 && (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {profile.userType === 'freelancer' ? 'Portfolio' : 
                 profile.userType === 'full-timer' ? 'Projects & Achievements' :
                 profile.userType === 'local-gig' ? 'Service Examples' :
                 'Company Projects'}
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleEdit('portfolio')}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing.portfolio ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {item.views}
                      </div>
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {item.likes}
                      </div>
                    </div>
                    {item.type && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-black/70 text-white">
                          {item.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {item.link && (
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Company Details Section - Only for Employers */}
        {profile.userType === 'employer' && profile.companyDetails && (
          <>
            <Card className="p-6 mb-8 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-purple-600" />
                About {profile.companyDetails.name}
              </h3>
              
              {/* Company Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                  <div className="text-xl font-bold text-purple-600">{profile.companyDetails.industry}</div>
                  <div className="text-sm text-purple-500">Industry</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                  <div className="text-xl font-bold text-purple-600">{profile.companyDetails.size}</div>
                  <div className="text-sm text-purple-500">Company Size</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                  <div className="text-xl font-bold text-purple-600">{profile.companyDetails.founded}</div>
                  <div className="text-sm text-purple-500">Founded</div>
                </div>
              </div>

              {/* Company Description */}
              <div className="mb-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {profile.companyDetails.description}
                </p>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Our Mission</h4>
                  <p className="text-sm text-purple-700">{profile.companyDetails.mission}</p>
                </div>
              </div>

              {/* Company Values */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Company Values</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.companyDetails.values.map((value, index) => (
                    <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-300">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Our Locations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.companyDetails.locations.map((location, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-purple-200">
                      <div>
                        <span className="font-medium">{location.city}</span>
                        <span className="text-sm text-muted-foreground ml-2">({location.type})</span>
                      </div>
                      <span className="text-sm text-purple-600">{location.employees} employees</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Website Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Company Website:</span>
                </div>
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </Card>

            {/* Benefits & Perks */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Benefits & Perks
              </h3>
              
              <Tabs defaultValue="benefits" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="perks">Perks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="benefits" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profile.companyDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="perks" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profile.companyDetails.perks.map((perk, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800">{perk}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Company Achievements */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-orange-600" />
                Company Achievements
              </h3>
              <div className="space-y-3">
                {profile.companyDetails.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <Award className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span className="text-sm text-orange-800">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Impact */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-600" />
                Social Impact & Responsibility
              </h3>
              <div className="space-y-3">
                {profile.companyDetails.socialImpact.map((impact, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-green-200">
                    <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm text-green-800">{impact}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Certifications Section */}
        {(profile.certifications || []).length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6">Certifications & Licenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Award className="w-8 h-8 text-yellow-500 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                    )}
                    {cert.url && (
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Reviews Section - Enhanced for different user types */}
        {(profile.reviews || []).length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              {profile.userType === 'employer' ? 'Employee Reviews' : 'Client Reviews & Testimonials'}
            </h3>
            <div className="space-y-6">
              {profile.reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.reviewer.avatar} />
                      <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{review.reviewer.name}</h4>
                            {review.reviewer.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.reviewer.title}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mb-3">{review.comment}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Project: {review.project}</span>
                        <div className="flex items-center space-x-4">
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <Button size="sm" variant="ghost" className="h-auto p-0">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}