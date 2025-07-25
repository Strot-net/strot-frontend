import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth, UserType, CandidateSubType } from './AuthProvider';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<UserType>('candidate');
  const [candidateSubType, setCandidateSubType] = useState<CandidateSubType>('job-seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();

  const userTypes = [
    {
      type: 'candidate' as UserType,
      label: 'Candidate',
      description: 'Looking for opportunities',
      icon: '👤',
      subTypes: [
        { type: 'job-seeker' as CandidateSubType, label: 'Job Seeker', desc: 'Full-time positions', icon: '💼' },
        { type: 'freelancer' as CandidateSubType, label: 'Freelancer', desc: 'Project-based work', icon: '🎨' },
        { type: 'gig-worker' as CandidateSubType, label: 'Gig Worker', desc: 'Quick tasks & gigs', icon: '⚡' }
      ]
    },
    {
      type: 'employer' as UserType,
      label: 'Employer',
      description: 'Hiring talent',
      icon: '🏢'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password, userType, candidateSubType);
      } else {
        await signup(email, password, name, userType, candidateSubType);
      }
      onNavigate('dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-xl"
      />

      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('landing')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl">Strot</span>
          </motion.div>

          <h1 className="text-3xl mb-2">
            {isLogin ? 'Welcome Back' : 'Join Strot'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Sign in to continue your journey' 
              : 'Start your career transformation today'
            }
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 shadow-lg border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-4">
                <Label>I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => (
                    <motion.div
                      key={type.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        variant={userType === type.type ? "default" : "outline"}
                        onClick={() => setUserType(type.type)}
                        className="w-full h-auto py-3 px-4"
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{type.icon}</div>
                          <div className="text-sm">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Candidate Sub-type Selection */}
                <AnimatePresence>
                  {userType === 'candidate' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label className="text-sm">What type of work are you seeking?</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {userTypes[0].subTypes?.map((subType) => (
                          <motion.div
                            key={subType.type}
                            whileHover={{ scale: 1.01 }}
                          >
                            <Button
                              type="button"
                              variant={candidateSubType === subType.type ? "secondary" : "ghost"}
                              onClick={() => setCandidateSubType(subType.type)}
                              className="w-full justify-start h-auto py-2"
                              size="sm"
                            >
                              <span className="mr-2">{subType.icon}</span>
                              <div className="text-left">
                                <div className="text-sm">{subType.label}</div>
                                <div className="text-xs text-muted-foreground">{subType.desc}</div>
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
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
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-sm"
                >
                  {isLogin ? (
                    <>Don't have an account? <span className="text-primary ml-1">Sign up</span></>
                  ) : (
                    <>Already have an account? <span className="text-primary ml-1">Sign in</span></>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Features */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.5} className="mt-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Join thousands of professionals</p>
            <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Verified opportunities</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>AI-powered matching</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Secure platform</span>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}