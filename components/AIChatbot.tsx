import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
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
  TrendingUp
} from 'lucide-react';

interface AIChatbotProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'default' | 'outline';
  }>;
}

interface QuickAction {
  label: string;
  icon: React.ElementType;
  action: string;
  description: string;
}

export function AIChatbot({ onNavigate }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m Strot AI, your career assistant. I can help you find jobs, improve your profile, schedule interviews, and answer questions about the platform. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    {
      label: 'Find Jobs',
      icon: Search,
      action: 'find-jobs',
      description: 'Search for relevant job opportunities'
    },
    {
      label: 'Resume Help',
      icon: FileText,
      action: 'resume-help',
      description: 'Improve your resume and profile'
    },
    {
      label: 'Interview Tips',
      icon: Star,
      action: 'interview-tips',
      description: 'Get interview preparation advice'
    },
    {
      label: 'Career Advice',
      icon: TrendingUp,
      action: 'career-advice',
      description: 'Get personalized career guidance'
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

  const simulateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('career')) {
      return {
        id: Date.now().toString(),
        content: 'I can help you find the perfect job! Based on your profile, I\'ve found several opportunities that match your skills. Would you like me to show you jobs in full-time positions, freelance projects, or local gigs?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion',
        actions: [
          { label: 'Full-Time Jobs', action: 'full-time-jobs', variant: 'default' },
          { label: 'Freelance Projects', action: 'freelance', variant: 'outline' },
          { label: 'Local Gigs', action: 'tasks', variant: 'outline' }
        ]
      };
    }
    
    if (lowerMessage.includes('profile') || lowerMessage.includes('resume')) {
      return {
        id: Date.now().toString(),
        content: 'I notice your profile is 75% complete. Adding more details can increase your match rate by up to 40%! I can help you optimize your profile, add skills, or update your experience.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion',
        actions: [
          { label: 'Update Profile', action: 'profile', variant: 'default' },
          { label: 'Take Skill Assessment', action: 'assessments', variant: 'outline' }
        ]
      };
    }
    
    if (lowerMessage.includes('interview') || lowerMessage.includes('prepare')) {
      return {
        id: Date.now().toString(),
        content: 'Great! Interview preparation is key to success. I can help you practice common questions, review your application history, or schedule mock interviews. What specific area would you like to work on?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion',
        actions: [
          { label: 'Practice Questions', action: 'learn', variant: 'default' },
          { label: 'Review Applications', action: 'applications', variant: 'outline' }
        ]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return {
        id: Date.now().toString(),
        content: 'I\'m here to help! You can ask me about finding jobs, improving your profile, scheduling interviews, or navigating the platform. You can also use these quick actions to get started.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      content: 'I understand you\'re looking for assistance. I can help you with job searching, profile optimization, interview preparation, and career advice. What would you like to focus on?',
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

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = simulateAIResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessage: Message = {
      id: Date.now().toString(),
      content: `Help me with ${action.replace('-', ' ')}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = simulateAIResponse(actionMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleActionClick = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
      setIsOpen(false);
    }
  };

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
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-primary to-chart-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <MessageCircle className="w-6 h-6" />
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
              height: isMinimized ? 64 : 600 
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
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-semibold">Strot AI</h3>
                  <p className="text-xs text-muted-foreground">Career Assistant</p>
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
                          <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              {msg.actions && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {msg.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant={action.variant || 'outline'}
                                      size="sm"
                                      onClick={() => handleActionClick(action.action)}
                                      className="text-xs"
                                    >
                                      {action.label}
                                    </Button>
                                  ))}
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
                                  <Bot className="w-3 h-3" />
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
                                  <Bot className="w-3 h-3" />
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

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => (
                          <Button
                            key={action.action}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.action)}
                            className="justify-start text-xs"
                          >
                            <action.icon className="w-3 h-3 mr-2" />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        placeholder="Ask me anything..."
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