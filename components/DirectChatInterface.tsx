import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useAuth } from './auth/AuthProvider';
import { 
  ArrowLeft,
  Send, 
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Search,
  Users,
  MessageSquare,
  CheckCircle2,
  Check,
  Clock,
  Pin,
  Star,
  Archive,
  Trash2,
  Image,
  File,
  Calendar,
  Building,
  MapPin,
  Briefcase,
  User,
  Settings,
  Bell,
  Globe
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

interface DirectChatInterfaceProps {
  onNavigate: (page: string) => void;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'job-share';
  status: 'sent' | 'delivered' | 'read';
  data?: any;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  role: string;
  company?: string;
  jobTitle?: string;
  type: 'employer' | 'candidate' | 'recruiter';
}

interface JobShare {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  logo: string;
}

export function DirectChatInterface({ onNavigate }: DirectChatInterfaceProps) {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for your interest! When would you be available for a call?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      online: true,
      role: 'HR Manager',
      company: 'TechCorp Inc.',
      jobTitle: 'Senior Frontend Developer',
      type: 'employer'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I\'ve reviewed your portfolio. Very impressive work!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
      online: false,
      role: 'Lead Designer',
      company: 'DesignStudio',
      jobTitle: 'UX Designer',
      type: 'employer'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Could you share more details about the project timeline?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      online: true,
      role: 'Technical Recruiter',
      company: 'RecruiterPro',
      type: 'recruiter'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Looking forward to working together on this project!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      unreadCount: 1,
      online: false,
      role: 'Freelance Developer',
      type: 'candidate'
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hi! I saw your application for the Senior Frontend Developer position. Your experience with React and TypeScript looks great!',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      content: 'Thank you for reaching out! I\'m very interested in the position. Could you tell me more about the team structure and the projects I\'d be working on?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      content: 'Of course! Our team consists of 8 developers working on our main platform. You\'d be leading the frontend architecture for our new dashboard redesign.',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      content: '',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: 'job-share',
      status: 'read',
      data: {
        id: 'job-1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        salary: '$120,000 - $150,000',
        location: 'San Francisco, CA',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
      }
    },
    {
      id: '5',
      content: 'That sounds perfect! I have experience with similar dashboard projects. When would be a good time for a quick call to discuss further?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      type: 'text',
      status: 'read'
    },
    {
      id: '6',
      content: 'Thanks for your interest! When would you be available for a call?',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      status: 'delivered'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversations.length > 0) {
      setSelectedConversation(conversations[0].id);
    }
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: file.name,
      sender: 'user',
      timestamp: new Date(),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      status: 'sent',
      data: { fileName: file.name, fileSize: file.size }
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case 'read':
        return <CheckCircle2 className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderJobShareMessage = (jobData: JobShare) => (
    <div className="border border-border rounded-lg p-3 bg-background max-w-xs">
      <div className="flex items-start gap-3 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={jobData.logo} />
          <AvatarFallback>{jobData.company.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-1">{jobData.title}</h4>
          <p className="text-xs text-muted-foreground">{jobData.company}</p>
        </div>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{jobData.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          <span>{jobData.salary}</span>
        </div>
      </div>
      <Button size="sm" className="w-full mt-2" onClick={() => onNavigate('job-detail')}>
        View Job Details
      </Button>
    </div>
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <h1 className="text-xl">Messages</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border bg-muted/20 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                    selectedConversation === conversation.id 
                      ? 'bg-primary/10 border-l-2 border-l-primary' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs min-w-5 h-5 rounded-full flex items-center justify-center p-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.type}
                        </Badge>
                        {conversation.company && (
                          <span className="text-xs text-muted-foreground">
                            • {conversation.company}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.jobTitle && (
                        <div className="flex items-center gap-1 mt-1">
                          <Briefcase className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground truncate">
                            {conversation.jobTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-background">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConv.avatar} />
                      <AvatarFallback>{selectedConv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {selectedConv.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{selectedConv.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{selectedConv.role}</span>
                      {selectedConv.company && (
                        <>
                          <span>•</span>
                          <span>{selectedConv.company}</span>
                        </>
                      )}
                      {selectedConv.online ? (
                        <Badge variant="default" className="text-xs">Online</Badge>
                      ) : (
                        <span className="text-xs">Last seen {formatTime(selectedConv.lastMessageTime)}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onNavigate('video-call')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('video-call')}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg p-3 ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          {msg.type === 'text' && (
                            <p className="text-sm">{msg.content}</p>
                          )}
                          
                          {msg.type === 'job-share' && msg.data && (
                            renderJobShareMessage(msg.data)
                          )}
                          
                          {msg.type === 'image' && (
                            <div className="space-y-2">
                              <div className="w-48 h-32 bg-muted-foreground/20 rounded flex items-center justify-center">
                                <Image className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          )}
                          
                          {msg.type === 'file' && (
                            <div className="flex items-center gap-2">
                              <File className="w-4 h-4" />
                              <span className="text-sm">{msg.content}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span>{formatTime(msg.timestamp)}</span>
                          {msg.sender === 'user' && getMessageStatus(msg.status)}
                        </div>
                      </div>
                      
                      <div className={`${msg.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                        <Avatar className="w-8 h-8">
                          {msg.sender === 'user' ? (
                            <AvatarFallback className="text-xs">
                              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          ) : (
                            <AvatarImage src={selectedConv.avatar} />
                          )}
                        </Avatar>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-end gap-2 max-w-4xl mx-auto">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-8 h-8 p-0"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="min-h-10"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx"
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}