import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Building, 
  Users, 
  MapPin, 
  Globe, 
  Mail, 
  Phone,
  TrendingUp,
  UserPlus,
  Briefcase,
  Clock,
  Calendar,
  Target,
  Award,
  Star,
  Eye,
  MessageSquare,
  Plus,
  Edit,
  Save,
  Settings,
  BarChart3,
  DollarSign,
  Filter,
  Search,
  ChevronRight,
  Building2,
  Zap,
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Coffee,
  Wifi,
  Car,
  Utensils,
  GraduationCap,
  Dumbbell,
  Shield,
  Smile,
  Lightbulb,
  Rocket,
  Trophy
} from 'lucide-react';

interface EmployerDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function EmployerDashboard({ onNavigate, onLogout }: EmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'TechVision Solutions',
    tagline: 'Building the future of work technology',
    description: 'We are a leading technology company specializing in AI-powered workforce solutions. Our mission is to transform how organizations connect with talent and optimize their human resources.',
    industry: 'Technology & Software',
    size: '251-500 employees',
    founded: '2018',
    headquarters: 'San Francisco, CA',
    website: 'https://techvisionsolutions.com',
    email: 'careers@techvisionsolutions.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/company/techvisionsolutions',
    twitter: 'https://twitter.com/techvisionsol',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
  });

  // Mock data for dashboard metrics
  const dashboardStats = [
    {
      title: 'Active Job Posts',
      value: '24',
      change: '+3 this week',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Applications Received',
      value: '847',
      change: '+127 this week',
      trend: 'up',
      icon: UserPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Interviews Scheduled',
      value: '32',
      change: '+8 this week',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Time to Hire',
      value: '18 days',
      change: '-2 days improved',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Company perks and benefits
  const companyPerks = [
    { icon: Coffee, label: 'Free Coffee & Snacks', category: 'Office' },
    { icon: Wifi, label: 'Remote Work Friendly', category: 'Flexibility' },
    { icon: Car, label: 'Parking Available', category: 'Transport' },
    { icon: Utensils, label: 'Catered Meals', category: 'Food' },
    { icon: GraduationCap, label: 'Learning Budget', category: 'Development' },
    { icon: Dumbbell, label: 'Gym Membership', category: 'Health' },
    { icon: Shield, label: 'Health Insurance', category: 'Health' },
    { icon: Smile, label: 'Mental Health Support', category: 'Wellness' }
  ];

  // Company values
  const companyValues = [
    { icon: Lightbulb, title: 'Innovation', description: 'We embrace new ideas and cutting-edge technology' },
    { icon: Users, title: 'Collaboration', description: 'We believe in the power of teamwork' },
    { icon: Rocket, title: 'Growth', description: 'We foster continuous learning and development' },
    { icon: Trophy, title: 'Excellence', description: 'We strive for the highest quality in everything we do' }
  ];

  // Recent job postings
  const recentJobPosts = [
    {
      id: '1',
      title: 'Senior React Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'San Francisco, CA / Remote',
      salary: '$120k - $160k',
      applications: 45,
      views: 234,
      postedDays: 2,
      status: 'Active',
      urgent: false
    },
    {
      id: '2',
      title: 'Product Marketing Manager',
      department: 'Marketing',
      type: 'Full-time',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      applications: 67,
      views: 189,
      postedDays: 5,
      status: 'Active',
      urgent: true
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      type: 'Contract',
      location: 'Remote',
      salary: '$80 - $100/hour',
      applications: 23,
      views: 156,
      postedDays: 1,
      status: 'Active',
      urgent: false
    }
  ];

  const handleSaveCompanyData = () => {
    setIsEditingCompany(false);
    // Here you would typically save to backend
    console.log('Saving company data:', companyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 pb-24">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={companyData.logo} alt={companyData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {companyData.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-bold text-lg">{companyData.name}</h1>
                  <Badge variant="secondary" className="text-xs">
                    <Building className="w-3 h-3 mr-1" />
                    Employer Dashboard
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => onNavigate('create')}>
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('talent-search')}>
                <Search className="w-4 h-4 mr-2" />
                Find Talent
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Posts</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-24 flex flex-col space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={() => onNavigate('create')}
                  >
                    <Plus className="w-6 h-6" />
                    <span>Post New Job</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-24 flex flex-col space-y-2 border-2 hover:bg-green-50 hover:border-green-200"
                    onClick={() => onNavigate('talent-search')}
                  >
                    <Search className="w-6 h-6 text-green-600" />
                    <span>Search Talent</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-24 flex flex-col space-y-2 border-2 hover:bg-purple-50 hover:border-purple-200"
                    onClick={() => onNavigate('analytics')}
                  >
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Job Posts</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('jobs')}>
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobPosts.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{job.title}</h4>
                              {job.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                              <Badge variant="secondary" className="text-xs">{job.status}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{job.department}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{job.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{job.applications} applications</span>
                              </div>
                              <span>Posted {job.postedDays} days ago</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Hiring Pipeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hiring Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New Applications</span>
                        <span className="font-medium">127</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Under Review</span>
                        <span className="font-medium">45</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interviews</span>
                        <span className="font-medium">32</span>
                      </div>
                      <Progress value={40} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offers Sent</span>
                        <span className="font-medium">8</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Company Rating */}
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-900">Company Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-yellow-900">4.8</p>
                      <p className="text-sm text-yellow-700">Based on 234 reviews</p>
                      <Button variant="outline" size="sm" className="mt-3 border-yellow-300 text-yellow-700">
                        View Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Company Profile Tab */}
          <TabsContent value="company" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Company Information */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Company Information</CardTitle>
                    <Button 
                      variant={isEditingCompany ? "default" : "outline"} 
                      size="sm"
                      onClick={isEditingCompany ? handleSaveCompanyData : () => setIsEditingCompany(true)}
                    >
                      {isEditingCompany ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditingCompany ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Company Name</label>
                          <Input 
                            value={companyData.name}
                            onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Tagline</label>
                          <Input 
                            value={companyData.tagline}
                            onChange={(e) => setCompanyData({...companyData, tagline: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea 
                            value={companyData.description}
                            onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Industry</label>
                            <Input 
                              value={companyData.industry}
                              onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Company Size</label>
                            <Input 
                              value={companyData.size}
                              onChange={(e) => setCompanyData({...companyData, size: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{companyData.name}</h3>
                          <p className="text-muted-foreground">{companyData.tagline}</p>
                        </div>
                        <p className="text-sm">{companyData.description}</p>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{companyData.industry}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{companyData.size}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">Founded {companyData.founded}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{companyData.headquarters}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <a href={companyData.website} className="text-sm text-blue-600 hover:underline">
                                Website
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{companyData.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Company Values */}
                <Card>
                  <CardHeader>
                    <CardTitle>Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companyValues.map((value, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                            <value.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{value.title}</h4>
                            <p className="text-sm text-muted-foreground">{value.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Perks & Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Perks & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {companyPerks.map((perk, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-2">
                            <perk.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-sm font-medium">{perk.label}</p>
                          <Badge variant="secondary" className="text-xs mt-1">{perk.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <a href={companyData.linkedin} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">LinkedIn</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                      </a>
                      <a href={companyData.twitter} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <Twitter className="w-5 h-5 text-sky-500" />
                        <span className="text-sm">Twitter</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                      </a>
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Social Media
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">Company Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Profile Views</span>
                        <span className="font-medium text-green-900">2,340</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Job Post Views</span>
                        <span className="font-medium text-green-900">8,456</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Applications</span>
                        <span className="font-medium text-green-900">1,234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Hires Made</span>
                        <span className="font-medium text-green-900">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Manage Job Posts</h3>
              <p className="text-muted-foreground mb-6">
                Create, edit, and track your job postings
              </p>
              <Button onClick={() => onNavigate('create')}>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Candidate Management</h3>
              <p className="text-muted-foreground mb-6">
                Review applications and manage your hiring pipeline
              </p>
              <Button onClick={() => onNavigate('talent-search')}>
                <Search className="w-4 h-4 mr-2" />
                Search Candidates
              </Button>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Hiring Insights</h3>
              <p className="text-muted-foreground mb-6">
                Get detailed analytics on your hiring performance
              </p>
              <Button onClick={() => onNavigate('analytics')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}