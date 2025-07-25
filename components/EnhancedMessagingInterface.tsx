import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Plus,
  Star,
  Archive,
  Trash2,
  Pin,
  Paperclip,
  Smile,
  Mic,
  Camera,
  Image as ImageIcon,
  File,
  Users,
  Settings,
  Bell,
  Circle,
  Check,
  CheckCheck,
  Clock,
  Filter,
  ArrowLeft,
  ChevronDown,
  Edit,
  UserPlus,
  Globe,
  Lock,
  Hash,
  AtSign,
  Zap,
  Heart,
  Reply,
  Forward,
  Copy,
  Share2,
  Ban,
  Info
} from 'lucide-react';

interface EnhancedMessagingInterfaceProps {
  onNavigate: (page: string) => void;
}

export function EnhancedMessagingInterface({ onNavigate }: EnhancedMessagingInterfaceProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b1089f?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks for the interview opportunity! Looking forward to hearing back.',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      type: 'direct',
      role: 'Frontend Developer Candidate'
    },
    {
      id: '2',
      name: 'Marketing Team',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Alex: The new campaign is ready for review',
      timestamp: '15 min ago',
      unread: 0,
      online: false,
      type: 'group',
      members: 8
    },
    {
      id: '3',
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Can we schedule a follow-up call this week?',
      timestamp: '1 hour ago',
      unread: 1,
      online: true,
      type: 'direct',
      role: 'Product Manager Candidate'
    },
    {
      id: '4',
      name: 'Design Team',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'New prototypes are ready for feedback',
      timestamp: '2 hours ago',
      unread: 0,
      online: false,
      type: 'group',
      members: 5
    },
    {
      id: '5',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'I have some questions about the role requirements',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      type: 'direct',
      role: 'Data Scientist Candidate'
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Sarah Chen',
      content: 'Hi! Thank you so much for considering my application for the Frontend Developer position.',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      content: 'Hello Sarah! Thanks for your interest. I\'ve reviewed your portfolio and I\'m impressed with your React projects.',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Sarah Chen',
      content: 'That\'s wonderful to hear! I\'m particularly proud of the e-commerce platform I built with Next.js and TypeScript.',
      timestamp: '10:35 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: 'me',
      senderName: 'You',
      content: 'I noticed that project! The performance optimizations you implemented are impressive. Would you be available for a technical interview this week?',
      timestamp: '10:40 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Sarah Chen',
      content: 'Absolutely! I\'m available any day this week after 2 PM. Should I prepare anything specific for the technical discussion?',
      timestamp: '10:45 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '6',
      senderId: 'me',
      senderName: 'You',
      content: 'Perfect! How about Thursday at 3 PM? We\'ll discuss your approach to component architecture and state management. I\'ll send a calendar invite shortly.',
      timestamp: '10:50 AM',
      type: 'text',
      status: 'delivered'
    },
    {
      id: '7',
      senderId: '1',
      senderName: 'Sarah Chen',
      content: 'Thanks for the interview opportunity! Looking forward to hearing back.',
      timestamp: '2 min ago',
      type: 'text',
      status: 'delivered'
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ 
          width: isSidebarCollapsed ? '80px' : '320px'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="border-r border-border bg-card flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h1 className="font-semibold text-lg">Messages</h1>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {!isSidebarCollapsed && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setIsComposeOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
              </Button>
            </div>
          </div>
          
          {!isSidebarCollapsed && (
            <>
              {/* Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                  <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`
                  relative flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${selectedConversation === conversation.id 
                    ? 'bg-primary/10 border-l-2 border-primary' 
                    : 'hover:bg-muted/50'
                  }
                  ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}
                `}
              >
                <div className="relative">
                  <Avatar className={`${isSidebarCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>
                      {conversation.type === 'group' ? (
                        <Users className="w-4 h-4" />
                      ) : (
                        conversation.name.slice(0, 2).toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        {conversation.type === 'group' && (
                          <Badge variant="secondary" className="text-xs">
                            {conversation.members}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.role && (
                      <p className="text-xs text-blue-600 mb-1">{conversation.role}</p>
                    )}
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                )}

                {isSidebarCollapsed && conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-border p-4 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                    <AvatarFallback>
                      {selectedConv.type === 'group' ? (
                        <Users className="w-4 h-4" />
                      ) : (
                        selectedConv.name.slice(0, 2).toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedConv.name}</h2>
                    <div className="flex items-center space-x-2">
                      {selectedConv.online && (
                        <div className="flex items-center space-x-1">
                          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                          <span className="text-xs text-green-600">Online</span>
                        </div>
                      )}
                      {selectedConv.role && (
                        <span className="text-xs text-muted-foreground">• {selectedConv.role}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('video-call')}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                    ${message.senderId === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                    }
                  `}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`
                      flex items-center justify-between mt-1 text-xs
                      ${message.senderId === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}
                    `}>
                      <span>{message.timestamp}</span>
                      {message.senderId === 'me' && (
                        <div className="ml-2">
                          {message.status === 'read' ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : message.status === 'delivered' ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4 bg-card">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 🚨 REMOVED: FloatingBottomNav - IT'S ALREADY INCLUDED IN AuthenticatedPages */}
      {/* The FloatingBottomNav is automatically rendered by the parent component */}
    </div>
  );
}