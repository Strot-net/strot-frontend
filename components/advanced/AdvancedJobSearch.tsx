import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Users,
  Briefcase,
  TrendingUp,
  Brain,
  Zap,
  Target,
  Rocket,
  Globe,
  Calendar,
  CheckCircle,
  BookOpen,
  Award,
  Heart,
  Eye,
  Share2,
  Save,
  Download,
  Upload,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  AlertCircle,
  Info,
  Lightbulb,
  Sparkles,
  Bot,
  Wand2,
  SearchCheck,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Bookmark,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

interface AdvancedJobSearchProps {
  onNavigate: (page: string) => void;
}

interface JobListing {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    size: string;
    industry: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
  };
  location: string;
  remote: boolean;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  postedDate: string;
  deadline?: string;
  applications: number;
  views: number;
  featured: boolean;
  urgent: boolean;
  aiMatch: number; // AI match percentage
  saved: boolean;
}

interface SearchFilters {
  query: string;
  location: string;
  remote: boolean;
  jobType: string[];
  experience: string[];
  salaryRange: [number, number];
  companySize: string[];
  industry: string[];
  skills: string[];
  benefits: string[];
  postedWithin: string;
  sortBy: string;
  aiEnabled: boolean;
}

// Enhanced mock data
const generateJobListings = (): JobListing[] => {
  const companies = [
    { name: 'Google', industry: 'Technology', size: 'Large (10k+)', rating: 4.4 },
    { name: 'Meta', industry: 'Technology', size: 'Large (10k+)', rating: 4.1 },
    { name: 'Apple', industry: 'Technology', size: 'Large (10k+)', rating: 4.5 },
    { name: 'Microsoft', industry: 'Technology', size: 'Large (10k+)', rating: 4.3 },
    { name: 'Amazon', industry: 'Technology', size: 'Large (10k+)', rating: 3.9 },
    { name: 'Netflix', industry: 'Entertainment', size: 'Large (1k-10k)', rating: 4.2 },
    { name: 'Uber', industry: 'Transportation', size: 'Large (1k-10k)', rating: 3.8 },
    { name: 'Airbnb', industry: 'Travel', size: 'Medium (100-1k)', rating: 4.3 },
    { name: 'Stripe', industry: 'FinTech', size: 'Medium (100-1k)', rating: 4.6 },
    { name: 'Figma', industry: 'Design Tools', size: 'Medium (100-1k)', rating: 4.5 }
  ];

  const jobTitles = [
    'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
    'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Machine Learning Engineer', 'Security Engineer', 'Mobile Developer', 'Cloud Architect',
    'Technical Lead', 'Engineering Manager', 'Product Designer', 'Data Analyst'
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'Java', 'Go', 'Rust', 'Swift',
    'Kotlin', 'PostgreSQL', 'MongoDB', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Machine Learning', 'AI', 'Data Science', 'UI/UX', 'Figma', 'Sketch'
  ];

  const benefits = [
    'Health Insurance', 'Dental Insurance', '401k', 'Stock Options', 'Remote Work',
    'Flexible Hours', 'Unlimited PTO', 'Gym Membership', 'Learning Budget', 'Free Lunch'
  ];

  const locations = [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
    'Los Angeles, CA', 'Chicago, IL', 'Remote', 'London, UK', 'Toronto, CA'
  ];

  const jobs: JobListing[] = [];

  for (let i = 0; i < 50; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const isRemote = Math.random() > 0.4;
    const location = isRemote ? 'Remote' : locations[Math.floor(Math.random() * locations.length)];

    jobs.push({
      id: `job-${i + 1}`,
      title,
      company: {
        ...company,
        logo: `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 100000000)}?w=100&h=100&fit=crop`,
        reviewCount: Math.floor(Math.random() * 1000) + 50,
        verified: Math.random() > 0.2
      },
      location,
      remote: isRemote,
      type: ['full-time', 'part-time', 'contract', 'internship'][Math.floor(Math.random() * 4)] as any,
      experience: ['entry', 'mid', 'senior', 'executive'][Math.floor(Math.random() * 4)] as any,
      salary: {
        min: 80000 + Math.floor(Math.random() * 120000),
        max: 120000 + Math.floor(Math.random() * 180000),
        currency: 'USD',
        period: 'yearly'
      },
      description: `We are looking for a talented ${title} to join our growing team. This is an exciting opportunity to work on cutting-edge projects and make a real impact in the ${company.industry.toLowerCase()} industry.`,
      requirements: [
        '3+ years of experience in relevant field',
        'Bachelor\'s degree in Computer Science or related field',
        'Strong problem-solving skills',
        'Excellent communication skills'
      ],
      benefits: benefits.slice(0, Math.floor(Math.random() * 5) + 3),
      skills: skills.slice(0, Math.floor(Math.random() * 6) + 3),
      postedDate: `${Math.floor(Math.random() * 30) + 1} days ago`,
      deadline: Math.random() > 0.7 ? `${Math.floor(Math.random() * 14) + 1} days left` : undefined,
      applications: Math.floor(Math.random() * 500) + 10,
      views: Math.floor(Math.random() * 2000) + 100,
      featured: Math.random() > 0.85,
      urgent: Math.random() > 0.9,
      aiMatch: Math.floor(Math.random() * 40) + 60, // 60-100% match
      saved: Math.random() > 0.8
    });
  }

  return jobs.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    return b.aiMatch - a.aiMatch;
  });
};

export function AdvancedJobSearch({ onNavigate }: AdvancedJobSearchProps) {
  const [jobs] = useState<JobListing[]>(generateJobListings());
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(true);
  const [aiSearchMode, setAiSearchMode] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    remote: false,
    jobType: [],
    experience: [],
    salaryRange: [50000, 300000],
    companySize: [],
    industry: [],
    skills: [],
    benefits: [],
    postedWithin: 'all',
    sortBy: 'relevance',
    aiEnabled: true
  });

  // Filter applications
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesQuery = !filters.query || 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase());

      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesRemote = !filters.remote || job.remote;

      const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.type);

      const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experience);

      const matchesSalary = job.salary.max >= filters.salaryRange[0] && job.salary.min <= filters.salaryRange[1];

      return matchesQuery && matchesLocation && matchesRemote && matchesJobType && matchesExperience && matchesSalary;
    });

    // Sort jobs
    switch (filters.sortBy) {
      case 'salary-high':
        filtered = filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        filtered = filtered.sort((a, b) => a.salary.min - b.salary.min);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => parseInt(a.postedDate) - parseInt(b.postedDate));
        break;
      case 'ai-match':
        filtered = filtered.sort((a, b) => b.aiMatch - a.aiMatch);
        break;
      default:
        // Keep original relevance order
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      location: '',
      remote: false,
      jobType: [],
      experience: [],
      salaryRange: [50000, 300000],
      companySize: [],
      industry: [],
      skills: [],
      benefits: [],
      postedWithin: 'all',
      sortBy: 'relevance',
      aiEnabled: true
    });
  };

  const formatSalary = (salary: JobListing['salary']) => {
    const { min, max, currency, period } = salary;
    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };

    return `${currency} ${formatNumber(min)} - ${formatNumber(max)}${period === 'yearly' ? '/year' : period === 'monthly' ? '/month' : '/hour'}`;
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

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
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <SearchCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Advanced Job Search</h1>
                  <p className="text-xs text-muted-foreground">AI-powered job discovery</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant={aiSearchMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setAiSearchMode(!aiSearchMode)}
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Mode
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <FilterIcon className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
              <Button onClick={() => onNavigate('profile')}>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-full lg:w-80 space-y-6"
              >
                {/* AI Search Card */}
                {aiSearchMode && (
                  <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-blue-900">
                        <Bot className="w-5 h-5" />
                        <span>AI Job Assistant</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Describe your ideal job</Label>
                        <Textarea 
                          placeholder="I'm looking for a remote senior software engineer role at a startup with equity compensation..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Wand2 className="w-4 h-4 mr-2" />
                        Find Matches with AI
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Search Filters */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Search Filters</CardTitle>
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Search */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Job Title or Keywords</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            placeholder="e.g., Software Engineer, Product Manager"
                            value={filters.query}
                            onChange={(e) => updateFilter('query', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            placeholder="e.g., San Francisco, New York, Remote"
                            value={filters.location}
                            onChange={(e) => updateFilter('location', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={filters.remote}
                          onCheckedChange={(checked) => updateFilter('remote', checked)}
                        />
                        <Label>Remote jobs only</Label>
                      </div>
                    </div>

                    <Separator />

                    {/* Job Type */}
                    <div className="space-y-3">
                      <Label>Job Type</Label>
                      <div className="space-y-2">
                        {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              checked={filters.jobType.includes(type)}
                              onCheckedChange={(checked) => {
                                const newTypes = checked 
                                  ? [...filters.jobType, type]
                                  : filters.jobType.filter(t => t !== type);
                                updateFilter('jobType', newTypes);
                              }}
                            />
                            <Label className="capitalize">{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Experience Level */}
                    <div className="space-y-3">
                      <Label>Experience Level</Label>
                      <div className="space-y-2">
                        {['entry', 'mid', 'senior', 'executive'].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              checked={filters.experience.includes(level)}
                              onCheckedChange={(checked) => {
                                const newLevels = checked 
                                  ? [...filters.experience, level]
                                  : filters.experience.filter(l => l !== level);
                                updateFilter('experience', newLevels);
                              }}
                            />
                            <Label className="capitalize">{level} Level</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Salary Range */}
                    <div className="space-y-3">
                      <Label>Salary Range (USD/year)</Label>
                      <div className="px-2">
                        <Slider
                          value={filters.salaryRange}
                          onValueChange={(value) => updateFilter('salaryRange', value)}
                          max={500000}
                          min={30000}
                          step={5000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <span>${filters.salaryRange[0].toLocaleString()}</span>
                          <span>${filters.salaryRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Posted Date */}
                    <div className="space-y-3">
                      <Label>Posted Within</Label>
                      <Select value={filters.postedWithin} onValueChange={(value) => updateFilter('postedWithin', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any time</SelectItem>
                          <SelectItem value="1">Last 24 hours</SelectItem>
                          <SelectItem value="3">Last 3 days</SelectItem>
                          <SelectItem value="7">Last week</SelectItem>
                          <SelectItem value="30">Last month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Saved Searches */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bookmark className="w-4 h-4" />
                      <span>Saved Searches</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Search className="w-4 h-4 mr-2" />
                        Senior React Developer
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Search className="w-4 h-4 mr-2" />
                        Remote Product Manager
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Save Current Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {filteredJobs.length} jobs found
                </h2>
                <p className="text-muted-foreground">
                  {filters.aiEnabled && 'AI-powered results • '}
                  Showing best matches for your profile
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="ai-match">Best AI Match</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Results */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' : 'space-y-4'}>
              {filteredJobs.slice(0, 20).map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:shadow-xl transition-all duration-300 group cursor-pointer relative ${job.featured ? 'ring-2 ring-blue-500/20 bg-blue-50/50' : ''}`}>
                    {/* Job Card Header */}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={job.company.logo} />
                            <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg truncate">{job.title}</h3>
                              {job.featured && (
                                <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
                              )}
                              {job.urgent && (
                                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                              <span className="font-medium">{job.company.name}</span>
                              {job.company.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{job.company.rating}</span>
                                <span className="text-sm">({job.company.reviewCount})</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Briefcase className="w-4 h-4" />
                                <span className="capitalize">{job.type}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.postedDate}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-1 text-green-600 font-semibold">
                                <DollarSign className="w-4 h-4" />
                                <span>{formatSalary(job.salary)}</span>
                              </div>
                              
                              {filters.aiEnabled && (
                                <Badge className={getMatchColor(job.aiMatch)}>
                                  <Brain className="w-3 h-3 mr-1" />
                                  {job.aiMatch}% match
                                </Badge>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {job.description}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {job.skills.slice(0, 4).map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.skills.length - 4}
                                </Badge>
                              )}
                            </div>

                            {/* Benefits */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                <Badge key={benefitIndex} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>

                            {/* Job Footer */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{job.applications} applicants</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{job.views} views</span>
                                </div>
                                {job.deadline && (
                                  <div className="flex items-center space-x-1 text-orange-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{job.deadline}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Heart className={`w-4 h-4 ${job.saved ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                                <Button size="sm">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {filteredJobs.length > 20 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}