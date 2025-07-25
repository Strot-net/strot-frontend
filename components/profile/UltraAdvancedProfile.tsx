import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';
import { Calendar } from '../ui/calendar';
import { useAuth } from '../auth/AuthProvider';
import { getBackNavigation } from '../app/utils';
import { 
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  MapPin,
  Calendar as CalendarIcon,
  Globe,
  Phone,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Camera,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Lock,
  Shield,
  Download,
  Upload,
  Settings,
  Bell,
  Heart,
  Bookmark,
  Share,
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Building,
  Code,
  Palette,
  Wrench,
  Navigation,
  FileText,
  Link,
  ExternalLink,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Users,
  MessageSquare,
  Video,
  Mic,
  BookOpen,
  Certificate,
  Lightbulb,
  Rocket,
  Brain,
  Sparkles,
  Crown,
  Medal,
  Flag,
  ChartBar,
  LineChart,
  Circle,
  Laptop
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from '../ScrollAnimatedSection';

interface UltraAdvancedProfileProps {
  onNavigate: (page: string) => void;
  userType: 'full-timer' | 'freelancer' | 'local-gig' | 'employer';
}

export function UltraAdvancedProfile({ onNavigate, userType }: UltraAdvancedProfileProps) {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSections, setEditingSections] = useState({
    bio: false,
    skills: false,
    experience: false,
    projects: false
  });
  // Extract user data with fallbacks
  const getUserDisplayName = () => {
    if (user?.name) {
      const nameParts = user.name.split(' ');
      return {
        firstName: nameParts[0] || 'User',
        lastName: nameParts.slice(1).join(' ') || ''
      };
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      const nameParts = emailName.split('.');
      return {
        firstName: nameParts[0] || 'User',
        lastName: nameParts[1] || ''
      };
    }
    return { firstName: 'User', lastName: '' };
  };

  const { firstName, lastName } = getUserDisplayName();

  const [profileData, setProfileData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    location: user?.location || 'San Francisco, CA',
    bio: user?.bio || 'Passionate professional dedicated to creating exceptional digital experiences. I believe in the power of technology to transform businesses and improve lives. With expertise in modern development practices and a commitment to continuous learning, I strive to deliver high-quality solutions that make a real impact.',
    website: user?.website || 'https://portfolio.example.com',
    headline: user?.headline || getProfileTypeHeadline(userType),
    timezone: user?.timezone || 'PST',
    languages: user?.languages || ['English'],
    availability: user?.availability || 'Available for opportunities',
    remoteWork: user?.remoteWork ?? true,
    travelWillingness: user?.travelWillingness || 'Occasionally',
    profileVisibility: user?.profileVisibility || 'public'
  });

  // Get profile type specific headline
  function getProfileTypeHeadline(type: string) {
    switch (type) {
      case 'freelancer':
        return 'Freelance Professional | Project Expert | Available for Hire';
      case 'full-timer':
        return 'Software Engineer | Full-Stack Developer | Open to Opportunities';
      case 'local-gig':
        return 'Local Service Provider | Reliable & Professional | Community Focused';
      case 'employer':
        return 'Hiring Manager | Team Leader | Building Great Teams';
      default:
        return 'Professional | Open to Opportunities';
    }
  }

  const profileCompletion = 92;
  
  // Profile-specific content based on type
  const getProfileTypeConfig = () => {
    switch (userType) {
      case 'full-timer':
        return {
          title: 'Full-Time Professional Profile',
          icon: Briefcase,
          color: 'from-blue-500 to-indigo-600',
          bgGradient: 'from-blue-50 to-indigo-50',
          stats: [
            { label: 'Profile Views', value: '2,847', icon: Eye, color: 'text-blue-600' },
            { label: 'Applications', value: '34', icon: FileText, color: 'text-green-600' },
            { label: 'Interviews', value: '12', icon: Video, color: 'text-purple-600' },
            { label: 'Offers', value: '3', icon: Award, color: 'text-orange-600' }
          ],
          achievements: [
            { title: 'Top Candidate', icon: Crown, progress: 95, description: 'Ranked in top 5% of candidates' },
            { title: 'Interview Master', icon: Video, progress: 88, description: '88% interview success rate' },
            { title: 'Quick Responder', icon: Zap, progress: 100, description: 'Always responds within 24 hours' },
            { title: 'Skill Verified', icon: CheckCircle, progress: 100, description: 'All skills verified by employers' }
          ]
        };
      case 'freelancer':
        return {
          title: 'Freelancer Professional Profile',
          icon: Laptop,
          color: 'from-purple-500 to-pink-600',
          bgGradient: 'from-purple-50 to-pink-50',
          stats: [
            { label: 'Projects Completed', value: '127', icon: CheckCircle, color: 'text-purple-600' },
            { label: 'Success Rate', value: '98%', icon: Target, color: 'text-green-600' },
            { label: 'Client Rating', value: '4.9', icon: Star, color: 'text-yellow-600' },
            { label: 'Repeat Clients', value: '78%', icon: Heart, color: 'text-red-600' }
          ],
          achievements: [
            { title: 'Top Rated', icon: Star, progress: 100, description: 'Maintained 4.9+ rating for 6 months' },
            { title: 'Fast Delivery', icon: Zap, progress: 92, description: '92% on-time delivery rate' },
            { title: 'Client Favorite', icon: Heart, progress: 78, description: '78% client retention rate' },
            { title: 'Quality Expert', icon: Award, progress: 95, description: 'Exceeded quality metrics' }
          ]
        };
      case 'local-gig':
        return {
          title: 'Local Gig Worker Profile',
          icon: Navigation,
          color: 'from-green-500 to-emerald-600',
          bgGradient: 'from-green-50 to-emerald-50',
          stats: [
            { label: 'Gigs Completed', value: '456', icon: CheckCircle, color: 'text-green-600' },
            { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
            { label: 'On-Time Rate', value: '96%', icon: Clock, color: 'text-blue-600' },
            { label: 'Service Areas', value: '12', icon: MapPin, color: 'text-purple-600' }
          ],
          achievements: [
            { title: 'Local Hero', icon: MapPin, progress: 100, description: 'Highly rated in your area' },
            { title: 'Speed Demon', icon: Zap, progress: 96, description: '96% on-time completion rate' },
            { title: 'Multi-Talent', icon: Star, progress: 85, description: 'Skilled in 8+ service categories' },
            { title: 'Customer Champion', icon: Heart, progress: 92, description: 'Outstanding customer reviews' }
          ]
        };
      case 'employer':
        return {
          title: 'Employer Profile',
          icon: Building,
          color: 'from-orange-500 to-red-600',
          bgGradient: 'from-orange-50 to-red-50',
          stats: [
            { label: 'Team Members', value: '89', icon: Users, color: 'text-orange-600' },
            { label: 'Open Positions', value: '12', icon: Briefcase, color: 'text-blue-600' },
            { label: 'Hiring Success', value: '87%', icon: Target, color: 'text-green-600' },
            { label: 'Company Rating', value: '4.6', icon: Building, color: 'text-purple-600' }
          ],
          achievements: [
            { title: 'Top Employer', icon: Crown, progress: 87, description: 'Rated as top employer in tech' },
            { title: 'Fast Hiring', icon: Zap, progress: 92, description: 'Quick and efficient hiring process' },
            { title: 'Great Culture', icon: Heart, progress: 95, description: 'Outstanding company culture rating' },
            { title: 'Growth Leader', icon: TrendingUp, progress: 88, description: 'Rapid company growth' }
          ]
        };
      default:
        return {
          title: 'Professional Profile',
          icon: User,
          color: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-50',
          stats: [],
          achievements: []
        };
    }
  };

  const config = getProfileTypeConfig();
  const IconComponent = config.icon;

  const handleBack = () => {
    const backPage = getBackNavigation('profile', isAuthenticated);
    onNavigate(backPage);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const toggleSectionEdit = (section: keyof typeof editingSections) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const profileUnlockSystem = [
    {
      profile: 'Freelancer',
      icon: Laptop,
      progress: 48,
      requirements: 'Prove your freelancing capabilities',
      unlocked: false,
      tasks: [
        { task: 'Complete 3 successful projects', completed: true },
        { task: 'Maintain 4.5+ rating', completed: true },
        { task: 'Build portfolio showcase', completed: false },
        { task: 'Get 10 client reviews', completed: false }
      ]
    },
    {
      profile: 'Local Gig Worker',
      icon: Navigation,
      progress: 25,
      requirements: 'Demonstrate local service skills',
      unlocked: false,
      tasks: [
        { task: 'Complete 5 local tasks', completed: false },
        { task: 'Verify location services', completed: true },
        { task: 'Pass background check', completed: false },
        { task: 'Complete safety training', completed: false }
      ]
    },
    {
      profile: 'Employer',
      icon: Building,
      progress: 15,
      requirements: 'Show leadership and hiring experience',
      unlocked: false,
      tasks: [
        { task: 'Lead a team project', completed: false },
        { task: 'Mentor junior developers', completed: true },
        { task: 'Complete management training', completed: false },
        { task: 'Verify company affiliation', completed: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{config.title}</h1>
                  <p className="text-xs text-muted-foreground">Advanced profile management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing && (
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview Section */}
        <ScrollAnimatedSection animation="fadeUp">
          <Card className={`p-8 mb-8 bg-gradient-to-r ${config.bgGradient} border-2 border-primary/20 relative overflow-hidden`}>
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="relative">
                  <Avatar className="w-40 h-40 border-4 border-white shadow-2xl">
                    <AvatarImage src={user?.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"} />
                    <AvatarFallback className="text-4xl">
                      {profileData.firstName.charAt(0).toUpperCase()}{profileData.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full p-0 shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {profileData.firstName} {profileData.lastName}
                        </h1>
                        <div className="flex gap-2">
                          <Badge className={`bg-gradient-to-r ${config.color} text-white`}>
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xl text-muted-foreground mb-3">{profileData.headline}</p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profileData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <a href={profileData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Portfolio
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Available for opportunities</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-4 lg:mt-0">
                      <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(!isEditing)}>
                          <Edit className="w-4 h-4 mr-2" />
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                        <Button variant="outline">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      
                      {/* Profile Completion */}
                      <div className={`bg-gradient-to-r ${config.bgGradient} rounded-xl p-4 border border-primary/20`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">Profile Strength</span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{profileCompletion}%</span>
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <Progress value={profileCompletion} className="h-3 mb-2" />
                        <div className="text-sm text-muted-foreground">
                          Outstanding profile! You're in the top 5% of professionals.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Stats Grid */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {config.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Bio and About Section */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
          <Card className="p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                About Me
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleSectionEdit('bio')}
              >
                <Edit className="w-4 h-4 mr-2" />
                {editingSections.bio ? 'Save Bio' : 'Edit Bio'}
              </Button>
            </div>
            
            {editingSections.bio ? (
              <Textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Tell us about yourself, your experience, and what drives you..."
                className="min-h-[200px] text-base leading-relaxed"
              />
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed text-muted-foreground mb-4">
                  {profileData.bio}
                </p>
                
                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">5+ years in software development</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <p className="text-sm text-muted-foreground">Top 5% performer globally</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Collaboration</h4>
                    <p className="text-sm text-muted-foreground">Excellent team player</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </ScrollAnimatedSection>

        {/* Skills & Expertise Section */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.3}>
          <Card className="p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Skills & Expertise
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleSectionEdit('skills')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editingSections.skills ? 'Save' : 'Edit Skills'}
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Technical Skills
                </h4>
                <div className="space-y-4">
                  {[
                    { skill: 'React & Next.js', level: 95, color: 'bg-blue-500' },
                    { skill: 'Node.js & Express', level: 90, color: 'bg-green-500' },
                    { skill: 'TypeScript', level: 88, color: 'bg-purple-500' },
                    { skill: 'Python & Django', level: 85, color: 'bg-yellow-500' },
                    { skill: 'AWS & Cloud Services', level: 80, color: 'bg-orange-500' },
                    { skill: 'GraphQL & APIs', level: 85, color: 'bg-pink-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{item.level}%</span>
                          {editingSections.skills && (
                            <Button variant="outline" size="sm" className="h-6 px-2">
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Soft Skills */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Soft Skills
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
                    'Project Management', 'Critical Thinking', 'Adaptability', 'Mentoring'
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border relative group"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium flex-1">{skill}</span>
                      {editingSections.skills && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Experience Timeline */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.4}>
          <Card className="p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Work Experience
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleSectionEdit('experience')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editingSections.experience ? 'Save' : 'Edit Experience'}
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  role: 'Senior Software Engineer',
                  company: 'TechCorp Inc.',
                  duration: '2022 - Present',
                  location: 'San Francisco, CA',
                  type: 'Full-time',
                  description: 'Leading development of scalable web applications serving 1M+ users. Architected microservices infrastructure and mentored junior developers.',
                  achievements: [
                    'Reduced application load time by 40% through optimization',
                    'Led team of 6 developers on critical product features',
                    'Implemented CI/CD pipeline reducing deployment time by 60%'
                  ]
                },
                {
                  role: 'Full Stack Developer',
                  company: 'StartupXYZ',
                  duration: '2020 - 2022',
                  location: 'Remote',
                  type: 'Full-time',
                  description: 'Built MVP from scratch and scaled to 100k users. Worked across the entire stack with React, Node.js, and PostgreSQL.',
                  achievements: [
                    'Developed core platform features used by 100k+ users',
                    'Integrated payment processing with Stripe',
                    'Implemented real-time chat using WebSocket'
                  ]
                },
                {
                  role: 'Junior Developer',
                  company: 'WebDev Agency',
                  duration: '2019 - 2020',
                  location: 'New York, NY',
                  type: 'Full-time',
                  description: 'Created custom websites and web applications for clients. Gained experience in various frameworks and technologies.',
                  achievements: [
                    'Delivered 15+ client projects on time and under budget',
                    'Learned React, Vue.js, and modern development practices',
                    'Contributed to open source projects'
                  ]
                }
              ].map((job, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-primary/20 last:border-l-0 group">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md" />
                  
                  <div className="pb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-semibold">{job.role}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{job.company}</span>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 md:mt-0">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        {editingSections.experience && (
                          <Button variant="outline" size="sm" className="ml-2">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div>
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Portfolio & Projects */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.5}>
          <Card className="p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Laptop className="w-6 h-6 text-primary" />
                Featured Projects
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleSectionEdit('projects')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editingSections.projects ? 'Save' : 'Edit Projects'}
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'E-commerce Platform',
                  description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
                  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
                  tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
                  github: 'https://github.com/johndoe/ecommerce',
                  live: 'https://ecommerce-demo.com',
                  status: 'Live'
                },
                {
                  title: 'Task Management App',
                  description: 'Collaborative task management with real-time updates',
                  image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
                  tech: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
                  github: 'https://github.com/johndoe/taskmanager',
                  live: 'https://taskmanager-demo.com',
                  status: 'Live'
                },
                {
                  title: 'Data Visualization Dashboard',
                  description: 'Interactive dashboard for business analytics',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
                  tech: ['React', 'D3.js', 'Python', 'FastAPI'],
                  github: 'https://github.com/johndoe/dashboard',
                  live: 'https://dashboard-demo.com',
                  status: 'In Progress'
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer relative"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className={project.status === 'Live' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {project.status}
                        </Badge>
                        {editingSections.projects && (
                          <Button variant="outline" size="sm" className="h-6 px-2">
                            <Edit className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Profile unlock system */}
        <ScrollAnimatedSection animation="fadeUp">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Unlock Additional Profiles</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete specific achievements to unlock additional career profiles and expand your opportunities.
              </p>
            </div>
            
            <div className="space-y-8">
              {profileUnlockSystem.map((profile, index) => (
                <motion.div
                  key={profile.profile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 ${profile.unlocked ? 'border-green-500 bg-green-50' : 'border-border'}`}>
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl ${profile.unlocked ? 'bg-green-500' : 'bg-muted'} flex items-center justify-center`}>
                        <profile.icon className={`w-8 h-8 ${profile.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold">{profile.profile} Profile</h4>
                            <p className="text-muted-foreground">{profile.requirements}</p>
                          </div>
                          
                          {profile.unlocked ? (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Unlocked
                            </Badge>
                          ) : (
                            <Button disabled>
                              <Lock className="w-4 h-4 mr-2" />
                              Unlock Profile
                            </Button>
                          )}
                        </div>
                        
                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Unlock Progress</span>
                            <span className="text-sm text-muted-foreground">{profile.progress}%</span>
                          </div>
                          <Progress value={profile.progress} className="h-2" />
                        </div>
                        
                        {/* Requirements */}
                        <div className="space-y-2">
                          <h5 className="font-medium">Requirements:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {profile.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center gap-2 text-sm">
                                {task.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className={task.completed ? 'text-green-700' : 'text-muted-foreground'}>
                                  {task.task}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}