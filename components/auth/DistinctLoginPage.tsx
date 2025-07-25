import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Sparkles,
  Globe,
  Users,
  Building,
  Briefcase,
  Code,
  Navigation,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Heart,
  Rocket
} from 'lucide-react';

interface DistinctLoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onNavigate: (page: string) => void;
}

export function DistinctLoginPage({ onLogin, onNavigate }: DistinctLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Building,
      title: 'For Companies',
      description: 'Find top talent, post jobs, and build your dream team',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'For Professionals',
      description: 'Discover amazing opportunities and advance your career',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Smart matching technology connects the right people',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Your data is protected with enterprise-grade security',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const stats = [
    { label: 'Active Jobs', value: '10K+', icon: Briefcase },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
    { label: 'Happy Users', value: '50K+', icon: Heart },
    { label: 'Countries', value: '25+', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">Strot</h1>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                Welcome back
              </h2>
              <p className="text-lg text-muted-foreground">
                Continue your professional journey with us
              </p>
            </div>

            {/* Login Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                <p className="text-center text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-800">
                            {error}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-primary hover:underline p-0"
                      onClick={() => onNavigate('forgot-password')}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  {/* Login Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>

                <Separator />

                {/* Social Login Options */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-12">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5 mr-2" />
                    Continue with GitHub
                  </Button>
                </div>

                <Separator />

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-primary hover:underline p-0"
                    onClick={() => onNavigate('signup')}
                  >
                    Sign up here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Features & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Why choose Strot?</h3>
                <p className="text-muted-foreground">
                  The most advanced platform for professional growth
                </p>
              </div>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-6 rounded-xl border ${feature.bg} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${feature.bg} border flex items-center justify-center`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center p-6 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Trusted by professionals worldwide</span>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>SOC 2 certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>50K+ users</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}