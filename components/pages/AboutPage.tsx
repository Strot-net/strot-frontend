import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UniversalNavBar } from '../shared/UniversalNavBar';
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Globe, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function AboutPage({ onNavigate, onGetStarted, onSignIn }: AboutPageProps) {
  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of connecting people with opportunities that match their skills and aspirations.'
    },
    {
      icon: Target,
      title: 'Purpose Driven',
      description: 'Every feature we build is designed to help professionals find meaningful work and employers find great talent.'
    },
    {
      icon: Heart,
      title: 'Human Centered',
      description: 'Technology should serve humanity, not the other way around. We put people at the center of everything we do.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in the world of work and career development.'
    }
  ];

  const stats = [
    { value: '2M+', label: 'Active Users' },
    { value: '500K+', label: 'Jobs Posted' },
    { value: '150+', label: 'Countries' },
    { value: '98%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar 
        currentPage="about" 
        onNavigate={onNavigate} 
        onGetStarted={onGetStarted} 
        onSignIn={onSignIn} 
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connecting Talent with 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Opportunity</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Strot is revolutionizing how people find work and how businesses find talent. 
              We're building the future of professional connections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              To democratize access to meaningful work by creating a platform where every professional 
              can discover opportunities that match their unique skills, goals, and values.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Globe className="w-12 h-12 text-blue-600" />
              <TrendingUp className="w-12 h-12 text-green-600" />
              <Heart className="w-12 h-12 text-red-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Be part of the platform that's transforming how the world works.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-gray-900 hover:bg-white/90"
            >
              Get Started Today
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