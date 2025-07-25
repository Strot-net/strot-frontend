import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Star,
  Filter,
  Sparkles,
  Settings
} from 'lucide-react';

interface AIChatInterfaceProps {
  onNavigate: (page: string) => void;
}

type UserProfile = 'job-seeker' | 'freelancer' | 'gig-worker' | 'employer';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  jobs?: JobRecommendation[];
}

interface JobRecommendation {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  type: string;
}

const userProfiles = [
  { 
    id: 'job-seeker', 
    label: 'Job Seeker', 
    description: 'Looking for full-time positions',
    avatar: '💼'
  },
  { 
    id: 'freelancer', 
    label: 'Freelancer', 
    description: 'Seeking project-based work',
    avatar: '🎨'
  },
  { 
    id: 'gig-worker', 
    label: 'Gig Worker', 
    description: 'Finding quick tasks and gigs',
    avatar: '⚡'
  },
  { 
    id: 'employer', 
    label: 'Employer', 
    description: 'Hiring talent for my company',
    avatar: '🏢'
  }
];

const mockJobRecommendations: JobRecommendation[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    match: 95,
    type: "Full-time"
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $130k",
    match: 88,
    type: "Full-time"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$90k - $110k",
    match: 82,
    type: "Contract"
  }
];

export function AIChatInterface({ onNavigate }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm Strot AI, your personal job assistant. I can help you find the perfect opportunities based on your preferences. What kind of work are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>('job-seeker');
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('frontend') || message.includes('react') || message.includes('developer')) {
      return "Great! I found some excellent frontend developer positions that match your skills. Based on your profile, here are the top recommendations:";
    }
    
    if (message.includes('remote') || message.includes('work from home')) {
      return "Perfect! Remote work is very popular. I've filtered jobs that offer remote or hybrid options. Here are some great matches:";
    }
    
    if (message.includes('salary') || message.includes('pay') || message.includes('money')) {
      return "I understand salary is important! I've found positions that offer competitive compensation in your field:";
    }
    
    if (message.includes('help') || message.includes('find') || message.includes('job')) {
      return "I'd be happy to help you find the perfect job! Let me search our database for positions that match your profile:";
    }
    
    return "I understand your requirements. Let me find some opportunities that would be a great fit for you:";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        jobs: mockJobRecommendations
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Find remote jobs",
    "Show frontend positions", 
    "High salary jobs",
    "Entry level positions"
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('landing')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-chart-1 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg">Strot AI Assistant</h1>
                <p className="text-xs text-muted-foreground">
                  {userProfiles.find(p => p.id === userProfile)?.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowProfileSelector(true)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.type === 'ai' ? (
                    <div className="w-full h-full bg-gradient-to-r from-primary to-chart-1 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </Avatar>
                
                <div className={`space-y-2 ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                } flex flex-col`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-4' 
                        : 'bg-muted mr-4'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </motion.div>
                  
                  {message.jobs && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3 w-full"
                    >
                      {message.jobs.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm">{job.title}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {job.match}% match
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{job.company}</p>
                              </div>
                              <Button size="sm" onClick={() => onNavigate('jobs')}>
                                View
                              </Button>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {job.salary}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {job.type}
                              </Badge>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => onNavigate('jobs')}
                      >
                        View All Recommendations
                      </Button>
                    </motion.div>
                  )}
                  
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start gap-3 mb-6"
            >
              <Avatar className="w-8 h-8">
                <div className="w-full h-full bg-gradient-to-r from-primary to-chart-1 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              </Avatar>
              <div className="bg-muted px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-4 pb-4 max-w-4xl mx-auto w-full"
        >
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(action)}
                  className="text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {action}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t border-border p-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about jobs, skills, or career advice..."
                className="pr-12 min-h-[44px] resize-none"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="absolute right-1 top-1 bottom-1 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Selector Modal */}
      <AnimatePresence>
        {showProfileSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg mb-4">Select Your Profile</h3>
              <div className="space-y-3">
                {userProfiles.map((profile) => (
                  <motion.div
                    key={profile.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={userProfile === profile.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => {
                        setUserProfile(profile.id as UserProfile);
                        setShowProfileSelector(false);
                      }}
                    >
                      <span className="mr-3 text-lg">{profile.avatar}</span>
                      <div className="text-left">
                        <div>{profile.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {profile.description}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}