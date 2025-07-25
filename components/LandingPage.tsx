import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Play,
  Briefcase,
  Laptop,
  Navigation,
  Building,
  Heart,
  Globe,
  Award,
  Clock,
  DollarSign,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Twitter,
  Linkedin,
  Github,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from './ScrollAnimatedSection';
import { HERO_STATS, FEATURES, TESTIMONIALS, FOOTER_LINKS } from './landing/constants';
import { UniversalNavBar } from './shared/UniversalNavBar';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

const iconMap = {
  Briefcase,
  Laptop,
  Navigation,
  Building
};

export function LandingPage({ onNavigate, onGetStarted, onSignIn }: LandingPageProps) {
  const handleGetStarted = () => {
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar currentPage="landing" onNavigate={onNavigate} onGetStarted={onGetStarted} onSignIn={onSignIn} />

      {/* Hero Section - Fixed responsive text and container */}
      <ScrollAnimatedSection animation="fadeUp">
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <Badge className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                The Future of Work is Here
              </Badge>
              
              {/* Fixed responsive heading with proper text sizing and container constraints */}
              <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                  <span className="block">Your Complete Work</span>
                  <span className="block">Operating System</span>
                </h1>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Connect with opportunities across full-time careers, freelance projects, and local gigs. 
                  One platform, endless possibilities for your professional journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12"
            >
              <Button size="lg" onClick={handleGetStarted} className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                Start Your Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('how-it-works')} className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                See How It Works
              </Button>
            </motion.div>

            {/* Hero Stats - Responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
            >
              {HERO_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* Features Section */}
      <ScrollAnimatedSection animation="fadeUp">
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Four Paths to Success</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Whether you're seeking traditional employment, freelance freedom, local opportunities, or looking to hire talent, 
                we've got you covered.
              </p>
            </div>

            <StaggeredList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {FEATURES.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Card className="p-6 sm:p-8 h-full text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </StaggeredList>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* Testimonials */}
      <ScrollAnimatedSection animation="fadeUp">
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Loved by Professionals</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                Join thousands who have transformed their careers with Strot
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 sm:p-6 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm sm:text-base font-semibold">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* CTA Section */}
      <ScrollAnimatedSection animation="fadeUp">
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Career?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8">
              Join millions of professionals who have found their perfect work opportunity on Strot.
            </p>
            <Button size="lg" onClick={handleGetStarted} className="text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6">
              Get Started Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Strot</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                The complete work operating system for the modern professional.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-3 sm:mb-4 capitalize text-sm sm:text-base">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => onNavigate(link.href)}
                        className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-muted-foreground">
            <p className="text-sm sm:text-base">&copy; 2024 Strot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}