import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { 
  Building,
  Calendar,
  MapPin,
  ExternalLink,
  Edit,
  Plus,
  Save,
  X,
  Star,
  Award,
  Users,
  TrendingUp,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  Eye,
  Share2,
  Download,
  Trash2
} from 'lucide-react';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  description: string;
  achievements: string[];
  skills: string[];
  teamSize?: number;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  projects?: {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
  recommendations?: {
    from: string;
    title: string;
    avatar?: string;
    text: string;
    date: string;
  }[];
}

const EXPERIENCE_DATA: WorkExperience[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'San Francisco, CA',
    startDate: '2022-03-01',
    current: true,
    type: 'full-time',
    description: 'Leading the development of modern web applications using React, TypeScript, and Node.js. Responsible for architecting scalable frontend solutions and mentoring junior developers.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Led a team of 5 developers on a major product redesign',
      'Implemented automated testing that reduced bugs by 60%',
      'Mentored 3 junior developers who were later promoted'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Team Leadership'],
    teamSize: 8,
    salary: { min: 130000, max: 160000, currency: 'USD' },
    projects: [
      {
        name: 'E-commerce Platform Redesign',
        description: 'Complete overhaul of the company\'s main e-commerce platform',
        technologies: ['React', 'TypeScript', 'GraphQL', 'AWS'],
        url: 'https://techcorp.example.com'
      },
      {
        name: 'Internal Developer Tools',
        description: 'Built custom tools to improve developer productivity',
        technologies: ['Node.js', 'React', 'Docker']
      }
    ],
    recommendations: [
      {
        from: 'Sarah Johnson',
        title: 'Engineering Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
        text: 'Alex is an exceptional developer who consistently delivers high-quality work. Their leadership during the platform redesign was instrumental to our success.',
        date: '2024-01-15'
      }
    ]
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    location: 'Remote',
    startDate: '2020-06-01',
    endDate: '2022-02-28',
    current: false,
    type: 'full-time',
    description: 'Developed and maintained multiple web applications for a fast-growing startup. Worked across the entire stack and contributed to product strategy.',
    achievements: [
      'Built 3 major product features from concept to launch',
      'Reduced server costs by 30% through optimization',
      'Established coding standards and best practices',
      'Participated in hiring and technical interviews'
    ],
    skills: ['JavaScript', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Product Strategy'],
    teamSize: 4,
    projects: [
      {
        name: 'Real-time Analytics Dashboard',
        description: 'Built a comprehensive analytics platform for tracking user behavior',
        technologies: ['React', 'Python', 'PostgreSQL', 'WebSocket']
      }
    ]
  },
  {
    id: '3',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    startDate: '2019-01-01',
    endDate: '2020-05-31',
    current: false,
    type: 'freelance',
    description: 'Provided web development services to small and medium businesses. Specialized in creating custom websites and web applications.',
    achievements: [
      'Completed 25+ projects with 100% client satisfaction',
      'Increased average client revenue by 35% through web optimization',
      'Built long-term relationships with 8 recurring clients',
      'Developed reusable component library'
    ],
    skills: ['React', 'WordPress', 'Shopify', 'PHP', 'Marketing', 'Client Relations'],
    projects: [
      {
        name: 'E-commerce Solutions',
        description: 'Custom online stores for local businesses',
        technologies: ['Shopify', 'JavaScript', 'Liquid']
      },
      {
        name: 'Business Websites',
        description: 'Professional websites for service-based businesses',
        technologies: ['React', 'Gatsby', 'Netlify']
      }
    ]
  }
];

export function WorkExperience() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const calculateDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let duration = `${years} year${years !== 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      duration += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    
    return duration;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-orange-100 text-orange-800';
      case 'internship': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ScrollAnimatedSection animation="fadeUp">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Work Experience</h2>
            <p className="text-muted-foreground">
              Your professional journey and accomplishments
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Resume
            </Button>
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Summary Stats */}
      <ScrollAnimatedSection animation="fadeUp">
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{EXPERIENCE_DATA.length}</div>
            <div className="text-sm text-muted-foreground">Positions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {EXPERIENCE_DATA.reduce((sum, exp) => {
                const start = new Date(exp.startDate);
                const end = exp.endDate ? new Date(exp.endDate) : new Date();
                return sum + Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
              }, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {[...new Set(EXPERIENCE_DATA.flatMap(exp => exp.skills))].length}
            </div>
            <div className="text-sm text-muted-foreground">Skills Used</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {EXPERIENCE_DATA.filter(exp => exp.recommendations && exp.recommendations.length > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Recommendations</div>
          </Card>
        </div>
      </ScrollAnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Experience Timeline */}
        <div className="lg:col-span-2">
          <ScrollAnimatedSection animation="fadeUp">
            <div className="space-y-6">
              {EXPERIENCE_DATA.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < EXPERIENCE_DATA.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-border z-0" />
                  )}
                  
                  <Card className={`p-6 hover:shadow-md transition-shadow cursor-pointer relative z-10 ${
                    selectedExperience?.id === experience.id ? 'ring-2 ring-primary' : ''
                  }`} onClick={() => setSelectedExperience(experience)}>
                    <div className="flex items-start gap-4">
                      {/* Company Logo / Timeline Dot */}
                      <div className="relative">
                        {experience.companyLogo ? (
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={experience.companyLogo} />
                            <AvatarFallback>{experience.company.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                        )}
                        {experience.current && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{experience.title}</h3>
                              <Badge className={getTypeColor(experience.type)}>
                                {experience.type.replace('-', ' ')}
                              </Badge>
                              {experience.current && (
                                <Badge variant="default" className="bg-green-500">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {experience.company}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {experience.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(experience.startDate)} - {
                                  experience.current ? 'Present' : formatDate(experience.endDate!)
                                }
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {calculateDuration(experience.startDate, experience.endDate)}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(experience.id);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4">
                          {experience.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {experience.teamSize && (
                            <div className="text-center">
                              <div className="text-lg font-semibold">{experience.teamSize}</div>
                              <div className="text-xs text-muted-foreground">Team Size</div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-semibold">{experience.achievements.length}</div>
                            <div className="text-xs text-muted-foreground">Key Achievements</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{experience.skills.length}</div>
                            <div className="text-xs text-muted-foreground">Skills Used</div>
                          </div>
                        </div>

                        {/* Key Skills */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {experience.skills.slice(0, 6).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {experience.skills.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{experience.skills.length - 6} more
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          {experience.recommendations && experience.recommendations.length > 0 && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-1" />
                              {experience.recommendations.length} Recommendation{experience.recommendations.length !== 1 ? 's' : ''}
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollAnimatedSection>
        </div>

        {/* Details Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedExperience ? (
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{selectedExperience.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedExperience.company}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedExperience(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {selectedExperience.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects */}
                    {selectedExperience.projects && selectedExperience.projects.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Notable Projects
                        </h4>
                        <div className="space-y-3">
                          {selectedExperience.projects.map((project, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-sm">{project.name}</h5>
                                {project.url && (
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Salary Information */}
                    {selectedExperience.salary && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Compensation
                        </h4>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-semibold text-green-800">
                            ${selectedExperience.salary.min.toLocaleString()} - ${selectedExperience.salary.max.toLocaleString()} {selectedExperience.salary.currency}
                          </div>
                          <div className="text-sm text-green-600">Annual Base Salary</div>
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {selectedExperience.recommendations && selectedExperience.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Recommendations
                        </h4>
                        <div className="space-y-3">
                          {selectedExperience.recommendations.map((rec, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={rec.avatar} />
                                  <AvatarFallback>{rec.from.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{rec.from}</div>
                                  <div className="text-xs text-muted-foreground">{rec.title}</div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground italic">"{rec.text}"</p>
                              <div className="text-xs text-muted-foreground mt-2">
                                {new Date(rec.date).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Experience
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Star className="w-4 h-4 mr-2" />
                        Request Recommendation
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select an Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any work experience to view detailed information, achievements, and projects.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <ScrollAnimatedSection animation="fadeUp">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Experience
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Compare Salaries
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Colleagues
                </Button>
              </div>
            </Card>
          </ScrollAnimatedSection>
        </div>
      </div>
    </div>
  );
}