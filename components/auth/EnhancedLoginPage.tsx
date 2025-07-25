import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useAuth } from './AuthProvider';
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Briefcase,
  Laptop,
  Navigation,
  Crown,
  Shield,
  Star,
  Check,
  ChevronRight,
  Globe,
  Sparkles,
  Zap,
  Heart,
  ArrowRight,
  Google,
  Github,
  Linkedin,
  Apple,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from '../ScrollAnimatedSection';

interface EnhancedLoginPageProps {
  onNavigate: (page: string) => void;
}

interface ProfileType {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  features: string[];
  stats: {
    users: string;
    avgSalary: string;
    successRate: string;
  };
  popular?: boolean;
  recommended?: boolean;
}

export function EnhancedLoginPage({ onNavigate }: EnhancedLoginPageProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'profile-select'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    acceptTerms: false,
    marketingOptIn: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const profileTypes: ProfileType[] = [
    {
      id: 'full-timer',
      name: 'Full-Time Professional',
      title: 'Traditional Career Path',
      description: 'Seeking stable employment with comprehensive benefits, career growth, and long-term opportunities.',
      icon: Briefcase,
      color: 'text-blue-600',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
      features: ['Premium job listings', 'Salary negotiation tools', 'Career coaching', 'Professional networking'],
      stats: {
        users: '2.3M+',
        avgSalary: '$95k',
        successRate: '87%'
      },
      popular: true
    },
    {
      id: 'freelancer',
      name: 'Freelance Expert',
      title: 'Independent Professional',
      description: 'Working independently on diverse projects with flexibility, autonomy, and multiple income streams.',
      icon: Laptop,
      color: 'text-purple-600',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      features: ['Project marketplace', 'Client matching', 'Payment protection', 'Portfolio showcase'],
      stats: {
        users: '1.8M+',
        avgSalary: '$75/hr',
        successRate: '92%'
      },
      recommended: true
    },
    {
      id: 'gig-worker',
      name: 'Local Gig Specialist',
      title: 'On-Demand Worker',
      description: 'Earning through local, hands-on opportunities with flexible scheduling and immediate payments.',
      icon: Navigation,
      color: 'text-green-600',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      features: ['Location-based matching', 'Instant payments', 'Safety verification', 'Flexible hours'],
      stats: {
        users: '950k+',
        avgSalary: '$25/hr',
        successRate: '95%'
      }
    },
    {
      id: 'employer',
      name: 'Talent Recruiter',
      title: 'Hiring Manager',
      description: 'Finding and hiring top talent across all categories for your organization or clients.',
      icon: Building,
      color: 'text-orange-600',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      features: ['AI-powered matching', 'Bulk hiring tools', 'Analytics dashboard', 'Team collaboration'],
      stats: {
        users: '485k+',
        avgSalary: 'N/A',
        successRate: '89%'
      }
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
    } else {
      if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onNavigate('dashboard');
      } else if (mode === 'signup') {
        if (step === 1) {
          setStep(2);
          setMode('profile-select');
        }
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSelect = async (profileId: string) => {
    setSelectedProfile(profileId);
    setIsLoading(true);
    
    try {
      await signup({
        ...formData,
        profileType: profileId
      });
      onNavigate('dashboard');
    } catch (error) {
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login
  };

  if (mode === 'profile-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Almost there!</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Choose Your Path</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Select the profile that best matches your career goals. You can unlock additional profiles later as you achieve milestones.
                </p>
              </motion.div>
            </div>

            {/* Profile Selection Grid */}
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {profileTypes.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProfileSelect(profile.id)}
                  className={`cursor-pointer relative overflow-hidden ${
                    selectedProfile === profile.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Card className="h-full p-6 transition-all duration-300 hover:shadow-xl">
                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      {profile.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {profile.recommended && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>

                    {/* Header */}
                    <div className={`h-24 bg-gradient-to-br ${profile.bgGradient} rounded-lg mb-6 flex items-center justify-center`}>
                      <profile.icon className={`w-10 h-10 ${profile.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
                        <p className="text-sm font-medium text-primary mb-2">{profile.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{profile.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-sm">{profile.stats.users}</div>
                          <div className="text-xs text-muted-foreground">Users</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm">{profile.stats.avgSalary}</div>
                          <div className="text-xs text-muted-foreground">Avg. Earnings</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm">{profile.stats.successRate}</div>
                          <div className="text-xs text-muted-foreground">Success Rate</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {profile.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button 
                        className="w-full" 
                        disabled={isLoading}
                        onClick={() => handleProfileSelect(profile.id)}
                      >
                        {isLoading && selectedProfile === profile.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Choose {profile.name}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </StaggeredList>

            {/* Back Button */}
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setMode('signup');
                  setStep(1);
                }}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Registration
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="min-h-screen flex">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-12 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to <span className="text-primary">Strot</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The comprehensive work operating system that connects talent with opportunities across full-time, freelance, and local gig work.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Matching',
                  description: 'Get matched with opportunities that fit your skills and preferences'
                },
                {
                  icon: Shield,
                  title: 'Trusted & Secure',
                  description: 'Verified companies, secure payments, and protected communications'
                },
                {
                  icon: Heart,
                  title: 'Career Growth',
                  description: 'Tools and resources to advance your career and unlock new opportunities'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-background" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold">2.3M+ professionals</div>
                  <div className="text-sm text-muted-foreground">trust Strot for their career</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
                <span className="ml-2 text-sm font-medium">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground">
                {mode === 'login' 
                  ? 'Sign in to access your dashboard and opportunities' 
                  : 'Join thousands of professionals finding their perfect work'
                }
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              {[
                { provider: 'Google', icon: Globe, color: 'hover:bg-red-50 hover:border-red-200' },
                { provider: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-50 hover:border-blue-200' },
                { provider: 'GitHub', icon: Github, color: 'hover:bg-gray-50 hover:border-gray-200' }
              ].map(social => (
                <Button
                  key={social.provider}
                  variant="outline"
                  className={`w-full ${social.color} transition-colors`}
                  onClick={() => handleSocialLogin(social.provider.toLowerCase())}
                >
                  <social.icon className="w-5 h-5 mr-3" />
                  Continue with {social.provider}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            {/* Form */}
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">{errors.general}</span>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.name && <span className="text-sm text-destructive">{errors.name}</span>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <span className="text-sm text-destructive">{errors.email}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <span className="text-sm text-destructive">{errors.password}</span>}
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.confirmPassword && <span className="text-sm text-destructive">{errors.confirmPassword}</span>}
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('terms')}
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('privacy')}
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </button>
                      </Label>
                    </div>
                    {errors.acceptTerms && <span className="text-sm text-destructive">{errors.acceptTerms}</span>}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingOptIn"
                        checked={formData.marketingOptIn}
                        onCheckedChange={(checked) => handleInputChange('marketingOptIn', checked)}
                      />
                      <Label htmlFor="marketingOptIn" className="text-sm">
                        Send me updates about new features and opportunities
                      </Label>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {mode === 'login' && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => {/* Implement forgot password */}}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </Card>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <span className="text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              </span>{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-primary hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {/* Back to Landing */}
            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('landing')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}