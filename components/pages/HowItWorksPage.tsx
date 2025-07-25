import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { UniversalNavBar } from '../shared/UniversalNavBar';
import { 
  UserPlus,
  Search,
  MessageSquare,
  Briefcase,
  ArrowRight,
  Zap,
  Star,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Play
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function HowItWorksPage({ onNavigate, onGetStarted, onSignIn }: HowItWorksPageProps) {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and build a comprehensive profile that showcases your skills, experience, and career goals.',
      details: [
        'Choose your professional focus',
        'Upload your resume and portfolio',
        'Set your preferences and goals',
        'Complete skill assessments'
      ]
    },
    {
      number: 2,
      icon: Search,
      title: 'Discover Opportunities',
      description: 'Our AI-powered system matches you with relevant job opportunities across multiple categories.',
      details: [
        'Get personalized job recommendations',
        'Browse full-time, freelance, and local gigs',
        'Use advanced filters and search',
        'Save interesting opportunities'
      ]
    },
    {
      number: 3,
      icon: MessageSquare,
      title: 'Connect & Apply',
      description: 'Engage with employers, apply to positions, and manage your applications all in one place.',
      details: [
        'One-click applications',
        'Direct messaging with employers',
        'Track application status',
        'Schedule interviews seamlessly'
      ]
    },
    {
      number: 4,
      icon: Briefcase,
      title: 'Land Your Dream Job',
      description: 'Get hired and continue growing your career with ongoing support and new opportunities.',
      details: [
        'Negotiate offers with confidence',
        'Access career development resources',
        'Build your professional network',
        'Track your career progress'
      ]
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithm learns your preferences and matches you with the most relevant opportunities.'
    },
    {
      icon: Users,
      title: 'Diverse Job Types',
      description: 'From full-time careers to freelance projects and local gigs - find work that fits your lifestyle.'
    },
    {
      icon: TrendingUp,
      title: 'Career Analytics',
      description: 'Track your progress, understand market trends, and make data-driven career decisions.'
    },
    {
      icon: Star,
      title: 'Quality Employers',
      description: 'All employers are verified to ensure you connect with legitimate, quality opportunities.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar 
        currentPage="how-it-works" 
        onNavigate={onNavigate} 
        onGetStarted={onGetStarted} 
        onSignIn={onSignIn} 
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-background to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4">
              <Play className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How Strot 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Works</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From profile creation to landing your dream job - discover how Strot simplifies your entire job search journey.
            </p>
            <Button size="lg" onClick={onGetStarted}>
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Four Simple Steps to Success</h2>
            <p className="text-xl text-muted-foreground">
              Our streamlined process gets you from signup to job offer faster than ever
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <step.icon className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-600 font-medium">Step {step.number} Illustration</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Strot?</h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed to accelerate your career success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of professionals who have found their perfect job through Strot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('pricing')}
                className="border-white text-white hover:bg-white/10"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Strot</span>
          </div>
          <p className="text-muted-foreground">
            &copy; 2024 Strot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}