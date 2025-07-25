import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Zap, 
  Home, 
  Info, 
  HelpCircle, 
  DollarSign, 
  BookOpen, 
  Mail,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface UniversalNavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

const NAVIGATION_ITEMS = [
  { label: 'Home', href: 'landing', icon: Home },
  { label: 'About', href: 'about', icon: Info },
  { label: 'How It Works', href: 'how-it-works', icon: HelpCircle },
  { label: 'Pricing', href: 'pricing', icon: DollarSign },
  { label: 'Blog', href: 'blog', icon: BookOpen },
  { label: 'Contact', href: 'contact', icon: Mail }
];

export function UniversalNavBar({ currentPage, onNavigate, onGetStarted, onSignIn }: UniversalNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-chart-1 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Strot</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = currentPage === item.href || 
                               (item.href === 'landing' && (currentPage === 'home' || currentPage === ''));
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.href)}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" onClick={onSignIn || (() => onNavigate('login'))}>
              Sign In
            </Button>
            <Button onClick={onGetStarted || (() => onNavigate('signup'))} className="bg-gradient-to-r from-primary to-chart-1 hover:opacity-90">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background py-4"
          >
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = currentPage === item.href || 
                                 (item.href === 'landing' && (currentPage === 'home' || currentPage === ''));
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onNavigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              <div className="pt-3 space-y-2 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (onSignIn) {
                      onSignIn();
                    } else {
                      onNavigate('login');
                    }
                    setIsMenuOpen(false);
                  }} 
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    if (onGetStarted) {
                      onGetStarted();
                    } else {
                      onNavigate('signup');
                    }
                    setIsMenuOpen(false);
                  }} 
                  className="w-full bg-gradient-to-r from-primary to-chart-1 hover:opacity-90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}