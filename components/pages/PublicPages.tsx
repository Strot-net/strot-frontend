import React from 'react';
import { motion } from 'framer-motion';
import { LandingPage } from '../LandingPage';
import { AboutPage } from './AboutPage';
import { PricingPage } from './PricingPage';
import { ContactPage } from './ContactPage';
import { HowItWorksPage } from './HowItWorksPage';
import { BlogPage } from './BlogPage';
import { DistinctLoginPage } from '../auth/DistinctLoginPage';
import { DistinctSignupPage } from '../auth/DistinctSignupPage';

interface PublicPagesProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  handleLogin: (email: string, password: string, userType?: string) => Promise<void>;
  handleSignup: (email: string, password: string, userData: any) => Promise<void>;
}

export function PublicPages({ 
  currentPage, 
  setCurrentPage, 
  handleLogin, 
  handleSignup 
}: PublicPagesProps) {

  // Create navigation handlers
  const onNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const onGetStarted = () => {
    setCurrentPage('signup');
  };

  const onSignIn = () => {
    setCurrentPage('login');
  };

  console.log('🌐 PublicPages Navigation:', {
    currentPage,
    timestamp: new Date().toISOString()
  });

  // Route to the appropriate public page
  switch (currentPage) {
    case 'landing':
      return (
        <LandingPage 
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
          onNavigate={onNavigate}
        />
      );
    
    case 'about':
      return (
        <AboutPage 
          onNavigate={onNavigate}
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      );
    
    case 'pricing':
      return (
        <PricingPage 
          onNavigate={onNavigate}
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      );
    
    case 'contact':
      return (
        <ContactPage 
          onNavigate={onNavigate}
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      );
    
    case 'how-it-works':
      return (
        <HowItWorksPage 
          onNavigate={onNavigate}
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      );
    
    case 'blog':
      return (
        <BlogPage 
          onNavigate={onNavigate}
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      );
    
    case 'login':
      return (
        <DistinctLoginPage 
          onLogin={handleLogin}
          onNavigate={onNavigate}
        />
      );
    
    case 'signup':
      return (
        <DistinctSignupPage 
          onSignup={handleSignup}
          onNavigate={onNavigate}
        />
      );
    
    default:
      // Unknown public page, redirect to landing
      console.warn(`Unknown public page: ${currentPage}, redirecting to landing`);
      onNavigate('landing');
      return (
        <div className="h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Redirecting to home...</p>
          </div>
        </div>
      );
  }
}