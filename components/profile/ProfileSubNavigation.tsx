import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { 
  User,
  Briefcase,
  Award,
  BarChart3,
  MessageSquare,
  Settings,
  Network,
  Calendar,
  FileText,
  Target,
  BookOpen,
  Users,
  Bell,
  Shield,
  Eye,
  Globe,
  Zap,
  TrendingUp,
  Heart,
  Star,
  Building,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface ProfileSubNavigationProps {
  profileType: 'full-timer' | 'freelancer' | 'gig-worker' | 'employer';
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const PROFILE_SITEMAPS = {
  'full-timer': {
    'Overview': {
      icon: User,
      sections: ['profile-summary', 'recent-activity', 'quick-actions'],
      badge: null
    },
    'Experience': {
      icon: Briefcase,
      sections: ['work-history', 'projects', 'achievements', 'recommendations'],
      badge: null
    },
    'Skills & Learning': {
      icon: Award,
      sections: ['skill-tree', 'certifications', 'learning-path', 'assessments'],
      badge: 'New'
    },
    'Job Search': {
      icon: Target,
      sections: ['saved-jobs', 'applications', 'interview-tracker', 'job-alerts'],
      badge: '3'
    },
    'Analytics': {
      icon: BarChart3,
      sections: ['profile-views', 'search-appearances', 'application-success', 'salary-insights'],
      badge: null
    },
    'Network': {
      icon: Users,
      sections: ['connections', 'recommendations', 'professional-groups', 'mentorship'],
      badge: '12'
    },
    'Learning Hub': {
      icon: BookOpen,
      sections: ['courses', 'skill-development', 'industry-insights', 'career-paths'],
      badge: null
    },
    'Settings': {
      icon: Settings,
      sections: ['account', 'privacy', 'notifications', 'preferences'],
      badge: null
    }
  },
  'freelancer': {
    'Overview': {
      icon: User,
      sections: ['profile-summary', 'recent-activity', 'earnings-overview'],
      badge: null
    },
    'Portfolio': {
      icon: FileText,
      sections: ['work-samples', 'case-studies', 'client-testimonials', 'media-gallery'],
      badge: null
    },
    'Projects': {
      icon: Briefcase,
      sections: ['active-projects', 'project-history', 'proposals', 'contracts'],
      badge: '2'
    },
    'Skills & Rates': {
      icon: Award,
      sections: ['skill-tree', 'service-packages', 'hourly-rates', 'specializations'],
      badge: null
    },
    'Client Management': {
      icon: Users,
      sections: ['client-relationships', 'reviews-ratings', 'repeat-clients', 'referrals'],
      badge: null
    },
    'Business Analytics': {
      icon: BarChart3,
      sections: ['earnings-analytics', 'project-metrics', 'client-acquisition', 'time-tracking'],
      badge: null
    },
    'Marketing': {
      icon: TrendingUp,
      sections: ['profile-optimization', 'proposal-templates', 'social-presence', 'networking'],
      badge: null
    },
    'Learning & Growth': {
      icon: BookOpen,
      sections: ['skill-development', 'industry-trends', 'business-courses', 'certifications'],
      badge: null
    },
    'Settings': {
      icon: Settings,
      sections: ['account', 'payment-methods', 'tax-settings', 'privacy'],
      badge: null
    }
  },
  'gig-worker': {
    'Overview': {
      icon: User,
      sections: ['dashboard', 'daily-earnings', 'active-gigs', 'quick-actions'],
      badge: null
    },
    'Gig Management': {
      icon: MapPin,
      sections: ['available-gigs', 'scheduled-gigs', 'gig-history', 'favorite-locations'],
      badge: '5'
    },
    'Services': {
      icon: Award,
      sections: ['service-categories', 'skills-verification', 'service-rates', 'availability'],
      badge: null
    },
    'Earnings': {
      icon: DollarSign,
      sections: ['earnings-tracker', 'payment-history', 'tax-documents', 'financial-goals'],
      badge: null
    },
    'Performance': {
      icon: BarChart3,
      sections: ['ratings-reviews', 'completion-stats', 'efficiency-metrics', 'customer-feedback'],
      badge: null
    },
    'Location & Travel': {
      icon: MapPin,
      sections: ['preferred-areas', 'travel-radius', 'location-analytics', 'route-optimization'],
      badge: null
    },
    'Learning': {
      icon: BookOpen,
      sections: ['skill-improvement', 'safety-training', 'platform-updates', 'best-practices'],
      badge: null
    },
    'Settings': {
      icon: Settings,
      sections: ['account', 'vehicle-info', 'insurance', 'notifications'],
      badge: null
    }
  },
  'employer': {
    'Overview': {
      icon: Building,
      sections: ['company-dashboard', 'hiring-summary', 'team-overview', 'quick-actions'],
      badge: null
    },
    'Job Management': {
      icon: Briefcase,
      sections: ['active-jobs', 'job-templates', 'posting-analytics', 'job-performance'],
      badge: null
    },
    'Candidate Pipeline': {
      icon: Users,
      sections: ['applications', 'candidate-search', 'talent-pool', 'screening-tools'],
      badge: '28'
    },
    'Interview Process': {
      icon: Calendar,
      sections: ['interview-scheduling', 'interview-kits', 'feedback-forms', 'decision-tracking'],
      badge: '7'
    },
    'Team Collaboration': {
      icon: Network,
      sections: ['hiring-team', 'collaboration-tools', 'feedback-sharing', 'decision-workflows'],
      badge: null
    },
    'Analytics & Reports': {
      icon: BarChart3,
      sections: ['hiring-metrics', 'sourcing-analytics', 'diversity-reports', 'cost-analysis'],
      badge: null
    },
    'Employer Brand': {
      icon: Star,
      sections: ['company-profile', 'employer-reviews', 'culture-showcase', 'social-presence'],
      badge: null
    },
    'Settings': {
      icon: Settings,
      sections: ['company-settings', 'billing', 'integrations', 'permissions'],
      badge: null
    }
  }
};

export function ProfileSubNavigation({ profileType, activeSection, onSectionChange }: ProfileSubNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const sitemap = PROFILE_SITEMAPS[profileType];

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isExpanded = (sectionName: string) => expandedSections.includes(sectionName);
  const isActive = (sectionKey: string) => activeSection.startsWith(sectionKey.toLowerCase().replace(/\s+/g, '-'));

  return (
    <div className="w-80 bg-background border-r border-border h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold mb-2">
          {profileType === 'full-timer' ? 'Professional Profile' :
           profileType === 'freelancer' ? 'Freelancer Hub' :
           profileType === 'gig-worker' ? 'Gig Worker Dashboard' :
           'Employer Center'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {profileType === 'full-timer' ? 'Manage your career journey' :
           profileType === 'freelancer' ? 'Grow your freelance business' :
           profileType === 'gig-worker' ? 'Optimize your gig performance' :
           'Build your hiring success'}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {Object.entries(sitemap).map(([sectionName, config]) => (
            <div key={sectionName}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const mainSection = sectionName.toLowerCase().replace(/\s+/g, '-');
                  onSectionChange(mainSection);
                  if (config.sections.length > 1) {
                    toggleSection(sectionName);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isActive(sectionName) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <config.icon className="w-5 h-5" />
                  <span className="font-medium">{sectionName}</span>
                  {config.badge && (
                    <Badge variant={config.badge === 'New' ? 'default' : 'secondary'} className="text-xs">
                      {config.badge}
                    </Badge>
                  )}
                </div>
                {config.sections.length > 1 && (
                  <motion.div
                    animate={{ rotate: isExpanded(sectionName) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.button>

              <AnimatePresence>
                {isExpanded(sectionName) && config.sections.length > 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 mt-2 space-y-1">
                      {config.sections.map((subsection) => (
                        <button
                          key={subsection}
                          onClick={() => onSectionChange(`${sectionName.toLowerCase().replace(/\s+/g, '-')}-${subsection}`)}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            activeSection === `${sectionName.toLowerCase().replace(/\s+/g, '-')}-${subsection}`
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {subsection.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">
              {profileType === 'employer' ? '94%' : '4.9'}
            </div>
            <div className="text-xs text-muted-foreground">
              {profileType === 'employer' ? 'Success Rate' : 'Rating'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {profileType === 'gig-worker' ? '$1,240' : 
               profileType === 'freelancer' ? '$8,500' :
               profileType === 'employer' ? '12' : '89%'}
            </div>
            <div className="text-xs text-muted-foreground">
              {profileType === 'gig-worker' ? 'This Week' :
               profileType === 'freelancer' ? 'This Month' :
               profileType === 'employer' ? 'Open Jobs' : 'Complete'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}