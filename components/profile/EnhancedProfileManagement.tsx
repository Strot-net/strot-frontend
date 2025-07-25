import { useState } from 'react';
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
  Calendar,
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
  DollarSign,
  Building,
  Code,
  Palette,
  Wrench,
  Navigation,
  FileText,
  Link,
  ExternalLink
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from '../ScrollAnimatedSection';

interface EnhancedProfileManagementProps {
  onNavigate: (page: string) => void;
}

export function EnhancedProfileManagement({ onNavigate }: EnhancedProfileManagementProps) {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications. Love working with React, Node.js, and modern tech stacks.',
    website: 'https://johndoe.dev',
    headline: 'Senior Software Engineer | React Expert | Full-Stack Developer',
    timezone: 'PST',
    languages: ['English', 'Spanish'],
    availability: 'Actively looking',
    remoteWork: true,
    travelWillingness: 'Occasionally',
    profileVisibility: 'public'
  });

  const profileCompletion = 85;
  
  const experiences = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Led development of customer-facing web applications using React and Node.js. Improved application performance by 40% and mentored junior developers.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      current: true
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2021-12',
      description: 'Developed and maintained multiple web applications. Built RESTful APIs and integrated with third-party services.',
      skills: ['JavaScript', 'Python', 'MongoDB', 'Docker'],
      current: false
    }
  ];

  const education = [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.8',
      description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering'
    }
  ];

  const skills = [
    { name: 'React', level: 5, category: 'Frontend', verified: true, endorsements: 23 },
    { name: 'Node.js', level: 4, category: 'Backend', verified: true, endorsements: 18 },
    { name: 'TypeScript', level: 4, category: 'Programming', verified: false, endorsements: 15 },
    { name: 'AWS', level: 3, category: 'Cloud', verified: false, endorsements: 12 },
    { name: 'Python', level: 4, category: 'Programming', verified: true, endorsements: 20 },
    { name: 'UI/UX Design', level: 3, category: 'Design', verified: false, endorsements: 8 }
  ];

  const certifications = [
    {
      id: '1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-123456',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'React Professional Developer',
      issuer: 'Meta',
      issueDate: '2022-11',
      expiryDate: null,
      credentialId: 'META-789012',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Top Performer 2023',
      description: 'Recognized for outstanding performance and leadership',
      date: '2023-12',
      type: 'Award',
      icon: Award
    },
    {
      id: '2',
      title: 'Open Source Contributor',
      description: 'Active contributor to popular React libraries',
      date: '2023-ongoing',
      type: 'Recognition',
      icon: Code
    }
  ];

  const projects = [
    {
      id: '1',
      name: 'E-commerce Dashboard',
      description: 'A comprehensive dashboard for managing online stores with real-time analytics and inventory management.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      status: 'Completed',
      startDate: '2023-08',
      endDate: '2023-11',
      url: 'https://github.com/johndoe/ecommerce-dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      status: 'In Progress',
      startDate: '2024-01',
      endDate: null,
      url: 'https://github.com/johndoe/task-manager',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
    }
  ];

  const handleBack = () => {
    const backPage = getBackNavigation('profile', isAuthenticated);
    onNavigate(backPage);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{profileData.firstName} {profileData.lastName}</h1>
                <p className="text-lg text-muted-foreground mb-2">{profileData.headline}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={profileData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 lg:mt-0">
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button>
                  <Share className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
            
            {/* Profile Completion */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Profile Completion</span>
                <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2 mb-2" />
              <div className="text-sm text-muted-foreground">
                Complete your profile to increase visibility to employers
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold mb-1">1,247</div>
          <div className="text-sm text-muted-foreground">Profile Views</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold mb-1">23</div>
          <div className="text-sm text-muted-foreground">Job Applications</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold mb-1">4.9</div>
          <div className="text-sm text-muted-foreground">Rating</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold mb-1">78%</div>
          <div className="text-sm text-muted-foreground">Profile Rank</div>
        </Card>
      </div>

      {/* About Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">About</h3>
          {isEditing && (
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        {isEditing ? (
          <Textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            className="resize-none"
          />
        ) : (
          <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
        )}
      </Card>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={exp.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Building className="w-4 h-4" />
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.startDate} - {exp.endDate}</span>
                    {exp.current && <Badge variant="default">Current</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <Card key={skill.name} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{skill.name}</h4>
                {skill.verified && (
                  <Badge variant="default" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <Badge variant="outline">{skill.category}</Badge>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Proficiency</span>
                <span className="text-sm">{skill.level}/5</span>
              </div>
              <Progress value={(skill.level / 5) * 100} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{skill.endorsements} endorsements</span>
              <Button size="sm" variant="outline">
                Endorse
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                {project.status}
              </Badge>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" asChild>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {project.startDate} - {project.endDate || 'Present'}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-background/95 border-b border-border"
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
                <User className="w-5 h-5" />
                <h1 className="text-xl">Profile</h1>
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
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ScrollAnimatedSection animation="fadeUp">
              {renderOverview()}
            </ScrollAnimatedSection>
          </TabsContent>

          <TabsContent value="experience">
            <ScrollAnimatedSection animation="fadeUp">
              {renderExperience()}
            </ScrollAnimatedSection>
          </TabsContent>

          <TabsContent value="skills">
            <ScrollAnimatedSection animation="fadeUp">
              {renderSkills()}
            </ScrollAnimatedSection>
          </TabsContent>

          <TabsContent value="projects">
            <ScrollAnimatedSection animation="fadeUp">
              {renderProjects()}
            </ScrollAnimatedSection>
          </TabsContent>

          <TabsContent value="education">
            <ScrollAnimatedSection animation="fadeUp">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Education</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <Card key={edu.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <div className="text-muted-foreground mb-2">{edu.school}</div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>{edu.startDate} - {edu.endDate}</span>
                            <span>GPA: {edu.gpa}</span>
                          </div>
                          <p className="text-muted-foreground">{edu.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollAnimatedSection>
          </TabsContent>

          <TabsContent value="achievements">
            <ScrollAnimatedSection animation="fadeUp">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Achievements & Certifications</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
                
                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert) => (
                      <Card key={cert.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={cert.logo} />
                            <AvatarFallback>{cert.issuer.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{cert.name}</h4>
                            <div className="text-muted-foreground text-sm mb-2">{cert.issuer}</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Issued: {cert.issueDate}
                              {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {cert.credentialId}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Achievements & Awards</h3>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <achievement.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-muted-foreground text-sm">{achievement.description}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.date}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}