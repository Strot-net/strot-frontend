import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from './auth/AuthProvider';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Search,
  Briefcase,
  FileText,
  Settings,
  HelpCircle,
  ArrowUp,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  DollarSign,
  MapPin,
  Filter,
  Heart,
  Bookmark,
  Target,
  Brain,
  Zap,
  Award,
  Globe,
  Calendar,
  Users,
  Building,
  Code,
  Palette,
  Megaphone,
  Calculator,
  Wrench,
  Camera
} from 'lucide-react';

interface AIJobAssistantProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'job-list' | 'preference-form' | 'shortlist';
  data?: any;
}

interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  skills: string[];
  description: string;
  isUrgent: boolean;
  isRemote: boolean;
  logo: string;
}

export function AIJobAssistant({ onNavigate }: AIJobAssistantProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi ${user?.name?.split(' ')[0] || 'there'}! I'm your AI Job Assistant. I can help you find and shortlist jobs based on your preferences, skills, and career goals. What type of opportunities are you looking for today?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    jobTypes: [] as string[],
    salaryRange: [50000, 150000],
    locations: [] as string[],
    skills: [] as string[],
    remote: false,
    experience: '',
    industry: ''
  });
  const [shortlistedJobs, setShortlistedJobs] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote', 'Hybrid'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design'];
  const skillSuggestions = ['React', 'JavaScript', 'Python', 'UI/UX Design', 'Project Management', 'Data Analysis'];

  const mockJobs: JobRecommendation[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'Leading frontend development for next-generation web applications',
      isUrgent: true,
      isRemote: true,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
    },
    {
      id: '2',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      salary: '$90,000 - $110,000',
      type: 'Full-time',
      matchScore: 88,
      skills: ['Figma', 'User Research', 'Prototyping'],
      description: 'Create intuitive user experiences for digital products',
      isUrgent: false,
      isRemote: true,
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&h=150&fit=crop'
    },
    {
      id: '3',
      title: 'Python Developer',
      company: 'DataTech Solutions',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      type: 'Contract',
      matchScore: 82,
      skills: ['Python', 'Django', 'PostgreSQL'],
      description: 'Develop data processing applications and APIs',
      isUrgent: false,
      isRemote: false,
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const analyzeUserMessage = (message: string): Message => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('shortlist') || lowerMessage.includes('filter') || lowerMessage.includes('recommend')) {
      return {
        id: Date.now().toString(),
        content: 'I\'ll help you shortlist jobs based on your preferences. Let me show you some personalized recommendations:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'job-list',
        data: { jobs: mockJobs }
      };
    }
    
    if (lowerMessage.includes('preference') || lowerMessage.includes('criteria') || lowerMessage.includes('requirement')) {
      return {
        id: Date.now().toString(),
        content: 'Let me help you set your job preferences. This will help me provide better recommendations:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'preference-form'
      };
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('money')) {
      return {
        id: Date.now().toString(),
        content: `Based on your profile and market data, here are salary insights for your field:\n\n• Entry Level: $60k - $80k\n• Mid Level: $80k - $120k\n• Senior Level: $120k - $180k\n\nWould you like me to find jobs within a specific salary range?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    if (lowerMessage.includes('remote') || lowerMessage.includes('work from home')) {
      const remoteJobs = mockJobs.filter(job => job.isRemote);
      return {
        id: Date.now().toString(),
        content: `I found ${remoteJobs.length} remote opportunities that match your profile:`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'job-list',
        data: { jobs: remoteJobs }
      };
    }
    
    if (lowerMessage.includes('urgent') || lowerMessage.includes('immediate') || lowerMessage.includes('asap')) {
      const urgentJobs = mockJobs.filter(job => job.isUrgent);
      return {
        id: Date.now().toString(),
        content: `Here are urgent opportunities that need immediate attention:`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'job-list',
        data: { jobs: urgentJobs }
      };
    }
    
    return {
      id: Date.now().toString(),
      content: `I understand you're looking for job opportunities. I can help you with:\n\n• Finding jobs based on your preferences\n• Shortlisting the best matches\n• Analyzing salary trends\n• Filtering by location, skills, or company type\n\nWhat would you like to focus on first?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = analyzeUserMessage(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleJobAction = (jobId: string, action: 'shortlist' | 'apply' | 'save') => {
    if (action === 'shortlist') {
      setShortlistedJobs(prev => 
        prev.includes(jobId) 
          ? prev.filter(id => id !== jobId)
          : [...prev, jobId]
      );
    } else if (action === 'apply' && onNavigate) {
      onNavigate('job-detail');
      setIsOpen(false);
    }
  };

  const renderJobList = (jobs: JobRecommendation[]) => (
    <div className="space-y-3 max-w-sm">
      {jobs.map((job) => (
        <div key={job.id} className="border border-border rounded-lg p-3 bg-background">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={job.logo} />
              <AvatarFallback className="text-xs">
                {job.company.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{job.title}</h4>
              <p className="text-xs text-muted-foreground">{job.company}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {job.matchScore}% match
                </Badge>
                {job.isUrgent && (
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{job.salary}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {job.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={shortlistedJobs.includes(job.id) ? "default" : "outline"}
              onClick={() => handleJobAction(job.id, 'shortlist')}
              className="flex-1 text-xs h-7"
            >
              {shortlistedJobs.includes(job.id) ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Shortlisted
                </>
              ) : (
                <>
                  <Heart className="w-3 h-3 mr-1" />
                  Shortlist
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => handleJobAction(job.id, 'apply')}
              className="flex-1 text-xs h-7"
            >
              Apply
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPreferenceForm = () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <label className="text-sm font-medium mb-2 block">Job Types</label>
        <div className="flex flex-wrap gap-1">
          {jobTypes.map(type => (
            <Button
              key={type}
              size="sm"
              variant={userPreferences.jobTypes.includes(type) ? "default" : "outline"}
              onClick={() => {
                setUserPreferences(prev => ({
                  ...prev,
                  jobTypes: prev.jobTypes.includes(type)
                    ? prev.jobTypes.filter(t => t !== type)
                    : [...prev.jobTypes, type]
                }));
              }}
              className="text-xs h-6"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Salary Range</label>
        <Slider
          value={userPreferences.salaryRange}
          onValueChange={(value) => setUserPreferences(prev => ({ ...prev, salaryRange: value }))}
          max={200000}
          min={30000}
          step={5000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>${userPreferences.salaryRange[0].toLocaleString()}</span>
          <span>${userPreferences.salaryRange[1].toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">Remote Work</span>
        <Switch 
          checked={userPreferences.remote}
          onCheckedChange={(checked) => setUserPreferences(prev => ({ ...prev, remote: checked }))}
        />
      </div>
      
      <Button 
        className="w-full" 
        size="sm"
        onClick={() => {
          const newMessage: Message = {
            id: Date.now().toString(),
            content: 'Perfect! I\'ve updated your preferences. Let me find jobs that match your criteria:',
            sender: 'ai',
            timestamp: new Date(),
            type: 'job-list',
            data: { jobs: mockJobs.filter(job => 
              userPreferences.remote ? job.isRemote : true
            )}
          };
          setMessages(prev => [...prev, newMessage]);
        }}
      >
        Find Matching Jobs
      </Button>
    </div>
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-primary to-chart-1 hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="relative">
                <Brain className="w-6 h-6" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 64 : 650 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-96 bg-background border border-border rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-1/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-chart-1 text-white">
                      <Brain className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Job Assistant</h3>
                  <p className="text-xs text-muted-foreground">Smart Job Shortlisting</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 p-0"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col h-96"
                >
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{msg.content}</p>
                              
                              {msg.type === 'job-list' && msg.data?.jobs && (
                                <div className="mt-3">
                                  {renderJobList(msg.data.jobs)}
                                </div>
                              )}
                              
                              {msg.type === 'preference-form' && (
                                <div className="mt-3">
                                  {renderPreferenceForm()}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-1">
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                          
                          <div className={`${msg.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                            <Avatar className="w-6 h-6">
                              {msg.sender === 'user' ? (
                                <AvatarFallback className="text-xs">
                                  <User className="w-3 h-3" />
                                </AvatarFallback>
                              ) : (
                                <AvatarFallback className="bg-gradient-to-r from-primary to-chart-1 text-white">
                                  <Brain className="w-3 h-3" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Typing Indicator */}
                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex justify-start"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-gradient-to-r from-primary to-chart-1 text-white">
                                  <Brain className="w-3 h-3" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted p-3 rounded-lg">
                                <div className="flex space-x-1">
                                  <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                    className="w-2 h-2 bg-muted-foreground rounded-full"
                                  />
                                  <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 bg-muted-foreground rounded-full"
                                  />
                                  <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 bg-muted-foreground rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick Suggestions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMessage('Show me remote jobs')}
                          className="text-xs"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          Remote Jobs
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMessage('Set my preferences')}
                          className="text-xs"
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          Preferences
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMessage('Urgent opportunities')}
                          className="text-xs"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Urgent
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMessage('Salary insights')}
                          className="text-xs"
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          Salary
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        placeholder="Ask about jobs, set preferences, or get recommendations..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                        size="sm"
                        className="px-3"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}