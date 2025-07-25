import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Briefcase, 
  Laptop, 
  Navigation, 
  Building, 
  ArrowRight, 
  Star,
  CheckCircle,
  Trophy,
  Target,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';

interface ProfileTypeSelectorProps {
  onSelectProfile: (profileType: string) => void;
  userName: string;
}

const profileTypes = [
  {
    id: 'full-timer',
    title: 'Full-Time Professional',
    description: 'Traditional employment with comprehensive benefits and career growth paths.',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    features: [
      'Career advancement tracking',
      'Comprehensive benefits analysis',
      'Professional development plans',
      'Performance analytics'
    ],
    stats: {
      avgSalary: '$95,000',
      opportunities: '45,230',
      successRate: '89%'
    }
  },
  {
    id: 'freelancer',
    title: 'Freelancer',
    description: 'Independent work with flexible schedules and diverse client opportunities.',
    icon: Laptop,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    features: [
      'Project marketplace access',
      'Client matching algorithm',
      'Payment protection & escrow',
      'Portfolio showcase tools'
    ],
    stats: {
      avgSalary: '$75/hour',
      opportunities: '8,923',
      successRate: '92%'
    }
  },
  {
    id: 'local-gig',
    title: 'Local Gig Worker',
    description: 'Nearby opportunities with immediate earnings and flexible timing.',
    icon: Navigation,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    features: [
      'Location-based matching',
      'Instant payment processing',
      'Flexible scheduling tools',
      'Multi-service capabilities'
    ],
    stats: {
      avgSalary: '$28/hour',
      opportunities: '12,450',
      successRate: '96%'
    }
  },
  {
    id: 'employer',
    title: 'Employer',
    description: 'Advanced recruitment tools with AI-powered candidate matching.',
    icon: Building,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    features: [
      'Advanced candidate filtering',
      'AI-powered matching',
      'Recruitment analytics',
      'Team collaboration tools'
    ],
    stats: {
      avgSalary: 'Save 60%',
      opportunities: '2.3M+ candidates',
      successRate: '94%'
    }
  }
];

export function ProfileTypeSelector({ onSelectProfile, userName }: ProfileTypeSelectorProps) {
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [isSelecting, setIsSelecting] = useState(false);

  const handleProfileSelect = (profileType: string) => {
    setSelectedProfile(profileType);
    setIsSelecting(true);
    
    // Immediate selection with optimistic UI
    onSelectProfile(profileType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Optimized Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-b border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Strot</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <Shield className="w-3 h-3 mr-1" />
                Welcome, {userName}!
              </Badge>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Optimized Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Choose Your Career Path
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Pick Your Professional Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the career path that best matches your goals. Start earning immediately!
          </p>
        </motion.div>

        {/* Optimized Profile Cards - Faster rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {profileTypes.map((profile, index) => {
            const IconComponent = profile.icon;
            const isSelected = selectedProfile === profile.id;
            
            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <Card className={`p-6 h-full cursor-pointer transition-all duration-200 border-2 ${
                  isSelected 
                    ? 'border-primary shadow-xl bg-gradient-to-br ' + profile.bgColor
                    : 'border-border hover:border-primary/50 hover:shadow-lg'
                }`}>
                  {/* Simplified Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available
                    </Badge>
                  </div>

                  {/* Simplified Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{profile.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {profile.description}
                    </p>

                    {/* Simplified Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{profile.stats.avgSalary}</div>
                        <div className="text-xs text-muted-foreground">Earnings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{profile.stats.opportunities}</div>
                        <div className="text-xs text-muted-foreground">Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{profile.stats.successRate}</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                    </div>

                    {/* Simplified Features */}
                    <div className="space-y-1">
                      {profile.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimized Action Button */}
                  <Button
                    onClick={() => handleProfileSelect(profile.id)}
                    disabled={isSelecting}
                    className={`w-full py-4 ${
                      isSelected 
                        ? 'bg-gradient-to-r ' + profile.color + ' hover:opacity-90'
                        : ''
                    }`}
                  >
                    {isSelecting && isSelected ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <>
                        Choose {profile.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Simplified Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-chart-1/5 border-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Achievement System</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 max-w-xl mx-auto">
                Complete tasks, build your reputation, and unlock additional career profiles.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Complete Goals</h4>
                  <p className="text-xs text-muted-foreground">Finish objectives</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Build Reputation</h4>
                  <p className="text-xs text-muted-foreground">Earn ratings</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Unlock Profiles</h4>
                  <p className="text-xs text-muted-foreground">Access opportunities</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}