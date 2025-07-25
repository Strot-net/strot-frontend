import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { UniversalNavBar } from '../shared/UniversalNavBar';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Star,
  Users,
  Crown,
  Rocket,
  Shield
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function PricingPage({ onNavigate, onGetStarted, onSignIn }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Users,
      features: [
        'Access to job boards',
        'Basic profile creation',
        'Apply to up to 10 jobs/month',
        'Community access',
        'Email support'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious job seekers',
      icon: Star,
      features: [
        'Everything in Free',
        'Unlimited job applications',
        'AI-powered job matching',
        'Advanced profile analytics',
        'Priority support',
        'Resume optimization tools',
        'Interview scheduling'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For organizations and teams',
      icon: Crown,
      features: [
        'Everything in Pro',
        'Team management',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced analytics dashboard',
        'White-label options',
        'API access',
        'Priority implementation'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar 
        currentPage="pricing" 
        onNavigate={onNavigate} 
        onGetStarted={onGetStarted} 
        onSignIn={onSignIn} 
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Choose Your 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Success Path</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From free access to premium features, find the perfect plan to accelerate your career growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full ${plan.popular ? 'border-2 border-blue-200 shadow-2xl' : 'hover:shadow-xl'} transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold mb-2">
                      {plan.price}
                      {plan.price !== 'Custom' && (
                        <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={plan.name === 'Enterprise' ? () => onNavigate('contact') : onGetStarted}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              {
                question: 'Can I upgrade or downgrade my plan anytime?',
                answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at your next billing cycle.'
              },
              {
                question: 'Is there a free trial for the Pro plan?',
                answer: 'Yes, we offer a 14-day free trial for the Pro plan with no credit card required. You can cancel anytime during the trial.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.'
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try Strot risk-free. If you're not completely satisfied, we'll refund your money.
            </p>
            <Button size="lg" onClick={onGetStarted}>
              Start Your Journey Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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