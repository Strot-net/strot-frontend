import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Users,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Briefcase,
  Award,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Eye,
  MessageSquare,
  UserPlus,
  Heart,
  Bookmark,
  ArrowLeft,
  Building,
  Code,
  Palette,
  Brain,
  Target,
  Globe,
  Calendar,
  Phone,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Share2,
  CheckCircle,
  Sparkles,
  Crown,
  Shield,
  Zap,
  ThumbsUp,
  Send,
  MoreHorizontal,
  SlidersHorizontal,
  Grid3X3,
  List,
  Verified,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  FileText,
  Camera,
  Video,
  Layers,
  PenTool,
  Database,
  Smartphone,
  Monitor,
  Scissors
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

interface TalentSearchInterfaceProps {
  onNavigate: (page: string) => void;
}

const TALENT_POOL = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Full-Stack Developer',
    experience: '7 years',
    location: 'San Francisco, CA',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
    hourlyRate: '$85-120',
    projectRate: '$15,000-25,000',
    availability: 'Available',
    rating: 4.9,
    reviews: 47,
    completedProjects: 89,
    responseTime: '< 2 hours',
    languages: ['English', 'Mandarin'],
    verified: true,
    premium: true,
    featured: true,
    portfolio: 'sarahchen.dev',
    github: 'github.com/sarahchen',
    linkedin: 'linkedin.com/in/sarahchen',
    matchScore: 95,
    education: 'Stanford University, MS Computer Science',
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'React Professional'],
    bio: 'Passionate full-stack developer with expertise in modern web technologies. Experienced in leading development teams and architecting scalable solutions for enterprise clients.',
    previousWork: ['Google', 'Meta', 'Stripe'],
    workStyle: 'Remote + Hybrid',
    timezone: 'PST',
    lastActive: '2 hours ago',
    strengths: ['Problem Solving', 'Team Leadership', 'Architecture Design'],
    projectTypes: ['Web Applications', 'APIs', 'Cloud Infrastructure'],
    clientRetention: 95,
    onTimeDelivery: 98
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Product Designer',
    experience: '5 years',
    location: 'Austin, TX',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Branding', 'Webflow'],
    hourlyRate: '$70-95',
    projectRate: '$8,000-15,000',
    availability: 'Available in 2 weeks',
    rating: 4.8,
    reviews: 32,
    completedProjects: 67,
    responseTime: '< 4 hours',
    languages: ['English', 'Spanish'],
    verified: true,
    premium: false,
    featured: false,
    portfolio: 'marcusdesign.co',
    linkedin: 'linkedin.com/in/marcusrodriguez',
    matchScore: 88,
    education: 'Art Center College of Design, BFA',
    certifications: ['Google UX Design Certificate', 'Adobe Certified Expert', 'Figma Advanced'],
    bio: 'Creative product designer focused on user-centered design and design systems. Love solving complex problems through simple, elegant solutions that delight users.',
    previousWork: ['Airbnb', 'Dropbox', 'Adobe'],
    workStyle: 'Remote',
    timezone: 'CST',
    lastActive: '1 day ago',
    strengths: ['User Research', 'Visual Design', 'Design Systems'],
    projectTypes: ['Mobile Apps', 'Web Design', 'Brand Identity'],
    clientRetention: 92,
    onTimeDelivery: 96
  },
  {
    id: '3',
    name: 'Emily Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'Digital Marketing Strategist',
    experience: '4 years',
    location: 'New York, NY',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media', 'PPC'],
    hourlyRate: '$60-80',
    projectRate: '$5,000-12,000',
    availability: 'Available',
    rating: 4.7,
    reviews: 28,
    completedProjects: 45,
    responseTime: '< 1 hour',
    languages: ['English', 'French'],
    verified: true,
    premium: true,
    featured: false,
    portfolio: 'emilymarketing.com',
    linkedin: 'linkedin.com/in/emilyjohnson',
    matchScore: 82,
    education: 'Columbia University, MBA Marketing',
    certifications: ['Google Ads Certified', 'HubSpot Certified', 'Facebook Blueprint'],
    bio: 'Results-driven marketing professional with a track record of driving growth through data-driven strategies and creative campaigns.',
    previousWork: ['HubSpot', 'Salesforce', 'Mailchimp'],
    workStyle: 'Hybrid',
    timezone: 'EST',
    lastActive: '30 minutes ago',
    strengths: ['Growth Strategy', 'Data Analysis', 'Campaign Management'],
    projectTypes: ['Marketing Campaigns', 'Brand Strategy', 'Growth Hacking'],
    clientRetention: 89,
    onTimeDelivery: 94
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Data Scientist',
    experience: '6 years',
    location: 'Seattle, WA',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow', 'Statistics'],
    hourlyRate: '$90-130',
    projectRate: '$12,000-20,000',
    availability: 'Available',
    rating: 4.9,
    reviews: 41,
    completedProjects: 73,
    responseTime: '< 3 hours',
    languages: ['English', 'Korean'],
    verified: true,
    premium: true,
    featured: true,
    portfolio: 'davidkim.science',
    github: 'github.com/davidkim',
    linkedin: 'linkedin.com/in/davidkim',
    matchScore: 91,
    education: 'MIT, PhD Data Science',
    certifications: ['Google Data Analytics', 'AWS ML Specialty', 'Tableau Certified'],
    bio: 'Experienced data scientist specializing in machine learning and predictive analytics. Passionate about turning data into actionable business insights.',
    previousWork: ['Microsoft', 'Amazon', 'Netflix'],
    workStyle: 'Remote',
    timezone: 'PST',
    lastActive: '4 hours ago',
    strengths: ['Machine Learning', 'Statistical Analysis', 'Data Visualization'],
    projectTypes: ['Predictive Models', 'Data Pipelines', 'Analytics Dashboards'],
    clientRetention: 96,
    onTimeDelivery: 97
  }
];

const SEARCH_FILTERS = {
  experience: ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior (5-8 years)', 'Expert (8+ years)'],
  location: ['San Francisco', 'New York', 'Austin', 'Seattle', 'Remote', 'Los Angeles', 'Chicago', 'Boston'],
  skills: ['React', 'Node.js', 'Python', 'Design', 'Marketing', 'Data Science', 'iOS', 'Android'],
  availability: ['Available Now', 'Available in 1 week', 'Available in 2 weeks', 'Available in 1 month'],
  hourlyRate: ['$30-50/hr', '$50-75/hr', '$75-100/hr', '$100-150/hr', '$150+/hr'],
  projectRate: ['$1K-5K', '$5K-10K', '$10K-20K', '$20K-50K', '$50K+'],
  workStyle: ['Remote', 'On-site', 'Hybrid'],
  rating: ['4.5+ Stars', '4.0+ Stars', '3.5+ Stars'],
  verification: ['Verified Only', 'Premium Only', 'Featured Only']
};

const FEATURED_CATEGORIES = [
  { name: 'Top Rated', count: 89, icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { name: 'Available Now', count: 156, icon: Clock, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { name: 'Premium', count: 43, icon: Crown, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { name: 'Verified', count: 234, icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
];

const TRENDING_SKILLS = [
  { skill: 'React', professionals: 1247, trend: 'up', growth: '+23%' },
  { skill: 'Python', professionals: 892, trend: 'up', growth: '+18%' },
  { skill: 'Figma', professionals: 634, trend: 'up', growth: '+31%' },
  { skill: 'Node.js', professionals: 567, trend: 'up', growth: '+15%' },
  { skill: 'Data Science', professionals: 423, trend: 'up', growth: '+41%' }
];

export function TalentSearchInterface({ onNavigate }: TalentSearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTalent, setSelectedTalent] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('match');

  const filteredTalents = TALENT_POOL.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         talent.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    const matchesFilters = selectedFilters.every(filter => {
      return talent.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
             talent.location.toLowerCase().includes(filter.toLowerCase()) ||
             talent.availability.toLowerCase().includes(filter.toLowerCase()) ||
             (filter.includes('Remote') && talent.workStyle.includes('Remote')) ||
             (filter.includes('Verified') && talent.verified) ||
             (filter.includes('Premium') && talent.premium) ||
             (filter.includes('Featured') && talent.featured);
    });
    
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Mobile-optimized Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="w-8 h-8 p-1 sm:w-auto sm:h-auto sm:p-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">Elite Talent Pool</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Discover top professionals for your projects
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs sm:text-sm"
              >
                <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filters</span>
                {selectedFilters.length > 0 && (
                  <Badge className="ml-1 sm:ml-2 bg-primary text-primary-foreground">
                    {selectedFilters.length}
                  </Badge>
                )}
              </Button>
              
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="w-8 h-8 p-1 rounded-r-none"
                >
                  <Grid3X3 className="w-3 h-3" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="w-8 h-8 p-1 rounded-l-none"
                >
                  <List className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Enhanced Search Bar */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, skills, location, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-sm sm:text-base pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button size="sm" className="h-8">
                  <Search className="w-3 h-3 mr-1" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* Featured Categories */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {FEATURED_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleFilter(category.name)}
                className="cursor-pointer"
              >
                <Card className={`p-3 sm:p-4 text-center hover:shadow-md transition-all duration-300 ${
                  selectedFilters.includes(category.name) ? category.bgColor + ' ' + category.borderColor + ' border-2' : ''
                }`}>
                  <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${category.color}`} />
                  <div className="text-lg sm:text-xl font-bold">{category.count}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{category.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Advanced Filters</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedFilters([])}
                    disabled={selectedFilters.length === 0}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(SEARCH_FILTERS).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-sm mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                      <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex space-x-2 pb-2">
                          {options.map((option) => (
                            <Badge
                              key={option}
                              variant={selectedFilters.includes(option) ? 'default' : 'secondary'}
                              className="cursor-pointer text-xs whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors"
                              onClick={() => toggleFilter(option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header with Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {filteredTalents.length} Elite Professionals Found
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing top matches for your requirements
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value="match">Best Match</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experience</option>
                <option value="availability">Availability</option>
                <option value="recent">Recently Active</option>
              </select>
            </div>
            
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Trending Skills Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Trending Skills</h3>
              <div className="space-y-3">
                {TRENDING_SKILLS.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer transition-colors"
                    onClick={() => setSearchQuery(skill.skill)}
                  >
                    <div>
                      <div className="font-medium text-sm">{skill.skill}</div>
                      <div className="text-xs text-muted-foreground">{skill.professionals} pros</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500">{skill.growth}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Talent Results */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredTalents.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer group relative overflow-hidden">
                    {/* Premium/Featured Badge */}
                    {talent.featured && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        Featured
                      </div>
                    )}
                    
                    {/* Header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-white shadow-lg">
                          <AvatarImage src={talent.avatar} />
                          <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {talent.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{talent.name}</h3>
                          {talent.premium && (
                            <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{talent.title}</p>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{talent.location}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <Clock className="w-3 h-3" />
                          <span>{talent.lastActive}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs mb-1">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {talent.matchScore}% match
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{talent.rating}</span>
                          <span className="text-xs text-muted-foreground">({talent.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {talent.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {talent.skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {talent.skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{talent.skills.length - 6}
                        </Badge>
                      )}
                    </div>

                    {/* Experience & Credentials */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 text-center">
                      <div>
                        <div className="text-sm sm:text-base font-bold text-primary">{talent.experience}</div>
                        <div className="text-xs text-muted-foreground">Experience</div>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-green-600">{talent.completedProjects}</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <div className="text-sm sm:text-base font-bold text-blue-600">{talent.onTimeDelivery}%</div>
                        <div className="text-xs text-muted-foreground">On-Time</div>
                      </div>
                    </div>

                    {/* Pricing & Availability */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Rate</div>
                        <div className="text-xs text-muted-foreground">{talent.hourlyRate}/hour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Project</div>
                        <div className="text-xs text-muted-foreground">{talent.projectRate}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={talent.availability === 'Available' ? 'default' : 'secondary'} className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {talent.availability}
                        </Badge>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Key Strengths</div>
                      <div className="flex flex-wrap gap-1">
                        {talent.strengths.map((strength) => (
                          <Badge key={strength} variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Previous Work */}
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Previously at</div>
                      <div className="flex items-center gap-2">
                        {talent.previousWork.slice(0, 3).map((company) => (
                          <Badge key={company} variant="outline" className="text-xs">
                            <Building className="w-3 h-3 mr-1" />
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs sm:text-sm group-hover:shadow-md transition-shadow">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0">
                        <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0">
                        <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {filteredTalents.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="text-sm">
                  Load More Professionals
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredTalents.length === 0 && (
              <Card className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No professionals found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or removing some filters.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedFilters([]);
                }}>
                  Clear All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}