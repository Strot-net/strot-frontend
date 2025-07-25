import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  SlidersHorizontal,
  ArrowLeft,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  ExternalLink,
  Heart,
  Share2,
  Grid3X3,
  List,
  Sparkles,
  Target,
  Award,
  Globe,
  Calendar,
  Zap,
  Brain,
  Layers,
  BarChart3,
  Settings,
  X,
  Plus,
  Bell,
  LogOut
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from './ScrollAnimatedSection';

interface FullTimeJobsProps {
  onNavigate: (page: string) => void;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  applicants: number;
  isUrgent: boolean;
  isRemote: boolean;
  isFeatured: boolean;
  companyLogo: string;
  companyRating: number;
  companySize: string;
  industry: string;
  experience: string;
  skills: string[];
  matchScore: number;
  viewed: boolean;
  applied: boolean;
  saved: boolean;
}

export function FullTimeJobs({ onNavigate }: FullTimeJobsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState([50000, 200000]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 
    'Sales', 'Design', 'Operations', 'Engineering', 'Consulting'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)', 'Mid Level (2-5 years)', 
    'Senior Level (5+ years)', 'Executive Level (10+ years)'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Most Recent' },
    { value: 'salary', label: 'Highest Salary' },
    { value: 'match', label: 'Best Match' },
    { value: 'company', label: 'Top Companies' }
  ];

  const featuredJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      salaryMin: 120000,
      salaryMax: 150000,
      description: 'Join our innovative team building next-generation web applications. Work with cutting-edge technologies and shape the future of our platform.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership skills'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', '401k', 'Learning Budget'],
      posted: '2 hours ago',
      applicants: 23,
      isUrgent: true,
      isRemote: true,
      isFeatured: true,
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
      companyRating: 4.8,
      companySize: '100-500',
      industry: 'Technology',
      experience: 'Senior Level',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      matchScore: 95,
      viewed: false,
      applied: false,
      saved: false
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      salaryMin: 100000,
      salaryMax: 130000,
      description: 'Lead product strategy and development for our fast-growing fintech platform. Drive innovation and user experience.',
      requirements: ['3+ years PM experience', 'Analytics skills', 'User research background'],
      benefits: ['Health Insurance', 'Equity', 'Flexible Hours', 'Learning Budget'],
      posted: '4 hours ago',
      applicants: 18,
      isUrgent: false,
      isRemote: false,
      isFeatured: false,
      companyLogo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      companyRating: 4.6,
      companySize: '50-100',
      industry: 'Finance',
      experience: 'Mid Level',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
      matchScore: 87,
      viewed: true,
      applied: false,
      saved: true
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $110,000',
      salaryMin: 90000,
      salaryMax: 110000,
      description: 'Create beautiful and intuitive user experiences for our digital products. Work with a talented team of designers and developers.',
      requirements: ['3+ years UX experience', 'Figma proficiency', 'Portfolio required'],
      benefits: ['Health Insurance', 'Remote Work', 'Design Tools', 'Conference Budget'],
      posted: '1 day ago',
      applicants: 31,
      isUrgent: false,
      isRemote: true,
      isFeatured: true,
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&h=150&fit=crop',
      companyRating: 4.7,
      companySize: '20-50',
      industry: 'Design',
      experience: 'Mid Level',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      matchScore: 92,
      viewed: false,
      applied: false,
      saved: false
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      salaryMin: 110000,
      salaryMax: 140000,
      description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with cutting-edge AI technologies.',
      requirements: ['PhD/Masters in Data Science', 'Python/R proficiency', 'ML experience'],
      benefits: ['Health Insurance', 'Stock Options', 'Research Time', 'GPU Access'],
      posted: '2 days ago',
      applicants: 15,
      isUrgent: false,
      isRemote: true,
      isFeatured: false,
      companyLogo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop',
      companyRating: 4.9,
      companySize: '100-500',
      industry: 'Technology',
      experience: 'Senior Level',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Statistics'],
      matchScore: 89,
      viewed: true,
      applied: true,
      saved: false
    }
  ];

  const [jobs, setJobs] = useState<Job[]>(featuredJobs);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });

    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleExperience = (experience: string) => {
    setSelectedExperience(prev =>
      prev.includes(experience)
        ? prev.filter(e => e !== experience)
        : [...prev, experience]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setSalaryRange([50000, 200000]);
    setSelectedIndustries([]);
    setSelectedExperience([]);
    setRemoteOnly(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !locationFilter || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
                           (remoteOnly && job.isRemote);
    
    const matchesSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1];
    
    const matchesIndustry = selectedIndustries.length === 0 || 
                           selectedIndustries.includes(job.industry);
    
    const matchesExperience = selectedExperience.length === 0 || 
                             selectedExperience.includes(job.experience);
    
    const matchesRemote = !remoteOnly || job.isRemote;

    return matchesSearch && matchesLocation && matchesSalary && 
           matchesIndustry && matchesExperience && matchesRemote;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      case 'salary':
        return b.salaryMax - a.salaryMax;
      case 'match':
        return b.matchScore - a.matchScore;
      case 'company':
        return b.companyRating - a.companyRating;
      default:
        return b.matchScore - a.matchScore;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
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
                Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <h1 className="text-xl">Full-Time Jobs</h1>
                <Badge variant="secondary">{sortedJobs.length}</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('notifications')}>
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('profile')}>
                Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters Section */}
        <ScrollAnimatedSection animation="fadeUp">
          <Card className="p-6 mb-8">
            <div className="space-y-6">
              {/* Main Search */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-base"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Location or Remote"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-12 h-12 text-base"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 flex-1"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-12 px-3 rounded-r-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-12 px-3 rounded-l-none border-l"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={() => setRemoteOnly(!remoteOnly)}>
                  <Globe className="w-4 h-4 mr-2" />
                  Remote Only
                  {remoteOnly && <CheckCircle className="w-4 h-4 ml-2 text-green-500" />}
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  $100k+
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Urgent
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Top Companies
                </Button>
                <Button variant="outline" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Match
                </Button>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border pt-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Salary Range */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Salary Range</label>
                        <div className="px-3">
                          <Slider
                            value={salaryRange}
                            onValueChange={setSalaryRange}
                            max={300000}
                            min={30000}
                            step={5000}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${salaryRange[0].toLocaleString()}</span>
                          <span>${salaryRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Industries */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Industry</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {industries.map(industry => (
                            <div key={industry} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={industry}
                                checked={selectedIndustries.includes(industry)}
                                onChange={() => toggleIndustry(industry)}
                                className="rounded"
                              />
                              <label htmlFor={industry} className="text-sm">
                                {industry}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Experience Level */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Experience Level</label>
                        <div className="space-y-2">
                          {experienceLevels.map(level => (
                            <div key={level} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={level}
                                checked={selectedExperience.includes(level)}
                                onChange={() => toggleExperience(level)}
                                className="rounded"
                              />
                              <label htmlFor={level} className="text-sm">
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Options */}
                      <div className="space-y-4">
                        <label className="text-sm font-medium">Options</label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Remote Only</span>
                            <Switch checked={remoteOnly} onCheckedChange={setRemoteOnly} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Featured Jobs</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">High Match Score</span>
                            <Switch />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </ScrollAnimatedSection>

        {/* Job Stats */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{sortedJobs.length}</div>
              <div className="text-sm text-muted-foreground">Jobs Found</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {sortedJobs.filter(j => j.isRemote).length}
              </div>
              <div className="text-sm text-muted-foreground">Remote Jobs</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {sortedJobs.filter(j => j.isUrgent).length}
              </div>
              <div className="text-sm text-muted-foreground">Urgent Hiring</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(sortedJobs.reduce((acc, job) => acc + job.matchScore, 0) / sortedJobs.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Match</div>
            </Card>
          </div>
        </ScrollAnimatedSection>

        {/* Jobs List/Grid */}
        <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl">
              {sortedJobs.length > 0 ? 'Available Positions' : 'No jobs found'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {sortedJobs.length} jobs</span>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="space-y-6">
              {sortedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className={`p-6 hover:shadow-lg transition-all duration-300 ${
                    job.isFeatured ? 'border-primary/50 bg-primary/5' : ''
                  } ${job.viewed ? 'opacity-75' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={job.companyLogo} />
                          <AvatarFallback className="text-lg">
                            {job.company.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            {job.isFeatured && (
                              <Badge variant="default" className="bg-gradient-to-r from-yellow-400 to-orange-500">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {job.isUrgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            {job.isRemote && (
                              <Badge variant="secondary" className="text-xs">Remote</Badge>
                            )}
                            {job.applied && (
                              <Badge variant="default" className="text-xs bg-green-500">Applied</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              <span>{job.company}</span>
                              <div className="flex items-center gap-1 ml-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span>{job.companyRating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 4).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Posted {job.posted}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.applicants} applicants</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              <span>{job.matchScore}% match</span>
                              <Progress value={job.matchScore} className="w-16 h-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                          className="w-10 h-10 p-0"
                        >
                          {job.saved ? (
                            <BookmarkCheck className="w-5 h-5 text-primary" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        {job.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => onNavigate('job-detail')}>
                          View Details
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                        <Button size="sm" disabled={job.applied}>
                          {job.applied ? 'Applied' : 'Apply Now'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 h-full ${
                    job.isFeatured ? 'border-primary/50' : ''
                  }`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={job.companyLogo} />
                          <AvatarFallback>{job.company.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                          className="w-8 h-8 p-0"
                        >
                          {job.saved ? (
                            <BookmarkCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold line-clamp-2">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Posted {job.posted}</span>
                          <span>{job.matchScore}% match</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 border-t">
                      <Button className="w-full" size="sm" disabled={job.applied}>
                        {job.applied ? 'Applied' : 'Apply Now'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </StaggeredList>
          )}
        </ScrollAnimatedSection>

        {/* Load More */}
        {sortedJobs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}