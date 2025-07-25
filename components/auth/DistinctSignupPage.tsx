import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input, InputProps } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { 
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  Check,
  X,
  Loader2,
  Shield,
  Star,
  Zap,
  Globe,
  Github,
  Chrome
} from 'lucide-react';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface DistinctSignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (email: string, password: string, userData: any) => Promise<void>;
}

export function DistinctSignupPage({ onNavigate, onSignup }: DistinctSignupPageProps) {
  // Debug logging
  console.log('🔥 DistinctSignupPage rendered');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    acceptTerms: false,
    emailUpdates: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      await onSignup(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        emailUpdates: formData.emailUpdates
      });
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 3) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <ScrollAnimatedSection animation="fadeUp" className="hidden lg:block">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Strot
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Join the Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Professional Growth
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with opportunities that match your skills, build meaningful professional relationships, and accelerate your career growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { icon: Shield, text: 'Secure & trusted platform with verified opportunities' },
                { icon: Star, text: 'AI-powered matching for perfect job fit' },
                { icon: Globe, text: 'Global network of 2M+ professionals' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Right Side - Signup Form */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
          <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Strot</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
              <p className="text-gray-600">Join thousands of professionals growing their careers</p>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className={`w-8 h-2 rounded-full transition-colors ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                <div className={`w-8 h-2 rounded-full transition-colors ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
              </div>
              <div className="text-sm text-gray-500 mt-2">Step {currentStep} of 2</div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className="pl-10"
                            error={!!errors.firstName}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            className="pl-10"
                            error={!!errors.lastName}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="pl-10"
                          error={!!errors.email}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => updateFormData('company', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          className="pl-10 pr-10"
                          error={!!errors.password}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Password strength</span>
                            <span className={`${
                              passwordStrength.strength === 'Weak' ? 'text-red-500' :
                              passwordStrength.strength === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {passwordStrength.strength}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: passwordStrength.width }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          className="pl-10 pr-10"
                          error={!!errors.confirmPassword}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => updateFormData('acceptTerms', checked)}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-5">
                          I agree to the{' '}
                          <button type="button" className="text-blue-600 hover:underline">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button type="button" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </button>
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                      )}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="emailUpdates"
                          checked={formData.emailUpdates}
                          onCheckedChange={(checked) => updateFormData('emailUpdates', checked)}
                        />
                        <Label htmlFor="emailUpdates" className="text-sm">
                          Send me updates about new opportunities and features
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Social Signup */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}
          </Card>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}