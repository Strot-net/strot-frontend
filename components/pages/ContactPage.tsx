import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UniversalNavBar } from '../shared/UniversalNavBar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Zap,
  MessageSquare,
  Users,
  Globe
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function ContactPage({ onNavigate, onGetStarted, onSignIn }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@strot.com',
      action: 'mailto:hello@strot.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us in real-time during business hours',
      contact: 'Available 9 AM - 6 PM PST',
      action: '#'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, SOMA District, San Francisco, CA 94105',
      hours: 'Mon-Fri 9 AM - 6 PM PST'
    },
    {
      city: 'New York',
      address: '456 Innovation Ave, Manhattan, New York, NY 10001',
      hours: 'Mon-Fri 9 AM - 6 PM EST'
    },
    {
      city: 'Remote',
      address: 'We work with talented people around the globe',
      hours: '24/7 Online Support'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UniversalNavBar 
        currentPage="contact" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Have questions about Strot? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <p className="font-medium mb-4">{method.contact}</p>
                    <Button variant="outline" asChild>
                      <a href={method.action}>Contact Now</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            {office.city === 'Remote' ? (
                              <Globe className="w-5 h-5 text-white" />
                            ) : (
                              <MapPin className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{office.city}</h4>
                            <p className="text-muted-foreground mb-2">{office.address}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {office.hours}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Join Our Team</h4>
                      <p className="text-muted-foreground mb-4">
                        We're always looking for talented individuals to join our mission.
                      </p>
                      <Button variant="outline" onClick={() => onNavigate('about')}>
                        View Careers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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