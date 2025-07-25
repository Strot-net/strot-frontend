import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Users,
  Star,
  Bookmark,
  Share2,
  ExternalLink,
  Heart,
  Flag,
  CheckCircle,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  Globe,
  Shield,
  AlertCircle,
  MessageSquare,
  Video,
  Phone
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

interface JobDetailPageProps {
  onNavigate: (page: string) => void;
  jobId?: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted: string;
  deadline: string;
  applicants: number;
  isUrgent: boolean;
  isRemote: boolean;
  companyLogo: string;
  companyRating: number;
  companySize: string;
  industry: string;
  experience: string;
  skills: string[];
  employmentType: string;
  workSchedule: string;
  companyDescription: string;
  companyWebsite: string;
  hiringManager: {
    name: string;
    title: string;
    avatar: string;
  };
  similarJobs: Array<{
    id: string;
    title: string;
    company: string;
    salary: string;
    location: string;
  }>;
}

export function JobDetailPage({ onNavigate, jobId }: JobDetailPageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Simulate fetching job data
    const mockJob: Job = {
      id: jobId || '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced Senior Frontend Developer to join our growing engineering team. You will be responsible for building user-facing features, ensuring great user experience, and collaborating with cross-functional teams to deliver high-quality products.',
      requirements: [
        '5+ years of experience in frontend development',
        'Expert knowledge of React, TypeScript, and modern JavaScript',
        'Experience with state management libraries (Redux, Zustand)',
        'Strong understanding of responsive design and CSS frameworks',
        'Experience with testing frameworks (Jest, React Testing Library)',
        'Knowledge of build tools and CI/CD processes',
        'Bachelor\'s degree in Computer Science or equivalent experience'
      ],
      responsibilities: [
        'Develop and maintain high-quality frontend applications',
        'Collaborate with designers to implement pixel-perfect UI/UX',
        'Write clean, maintainable, and well-tested code',
        'Participate in code reviews and mentor junior developers',
        'Optimize applications for maximum speed and scalability',
        'Stay up-to-date with latest frontend technologies and best practices',
        'Work closely with backend teams to integrate APIs'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Flexible working hours and remote work options',
        '401(k) with company matching',
        'Professional development budget ($2,000/year)',
        'Unlimited PTO policy',
        'Modern office with free meals and snacks',
        'Latest MacBook Pro and equipment'
      ],
      posted: '2 days ago',
      deadline: '2024-02-15',
      applicants: 23,
      isUrgent: true,
      isRemote: true,
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
      companyRating: 4.8,
      companySize: '100-500 employees',
      industry: 'Technology',
      experience: 'Senior Level (5+ years)',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Git'],
      employmentType: 'Full-time',
      workSchedule: 'Monday to Friday',
      companyDescription: 'TechCorp Inc. is a leading technology company focused on building innovative solutions that help businesses scale and grow. We have a diverse team of talented individuals who are passionate about creating products that make a difference.',
      companyWebsite: 'https://techcorp.com',
      hiringManager: {
        name: 'Sarah Johnson',
        title: 'Engineering Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face'
      },
      similarJobs: [
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'StartupXYZ',
          salary: '$90k - $120k',
          location: 'Remote'
        },
        {
          id: '3',
          title: 'React Developer',
          company: 'WebTech Solutions',
          salary: '$100k - $130k',
          location: 'New York, NY'
        },
        {
          id: '4',
          title: 'Senior UI Developer',
          company: 'DesignCorp',
          salary: '$110k - $140k',
          location: 'Austin, TX'
        }
      ]
    };

    setJob(mockJob);
  }, [jobId]);

  const handleApply = () => {
    setIsApplied(true);
    // Navigate to application form or external link
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job opportunity: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('jobs')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-lg">Job Details</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={isSaved ? 'text-primary' : ''}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleApply} disabled={isApplied}>
              {isApplied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Applied
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <ScrollAnimatedSection animation="fadeUp">
              <Card className="p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={job.companyLogo} />
                    <AvatarFallback className="text-2xl">
                      {job.company.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{job.title}</h1>
                      {job.isUrgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                      {job.isRemote && (
                        <Badge variant="secondary">Remote</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{job.companyRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Posted {job.posted}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {job.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>

            {/* Job Content Tabs */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
              <Tabs defaultValue="description" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="similar">Similar Jobs</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {job.description}
                    </p>
                    
                    <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h4 className="font-semibold mb-3">Benefits & Perks</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">{index + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h4 className="font-semibold mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="company" className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={job.companyLogo} />
                        <AvatarFallback>{job.company.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.company}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{job.companySize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{job.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{job.companyRating} rating</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {job.companyDescription}
                    </p>
                    
                    <Separator className="my-6" />
                    
                    <h4 className="font-semibold mb-4">Hiring Manager</h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={job.hiringManager.avatar} />
                        <AvatarFallback>
                          {job.hiringManager.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{job.hiringManager.name}</p>
                        <p className="text-sm text-muted-foreground">{job.hiringManager.title}</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="similar" className="space-y-6">
                  <div className="space-y-4">
                    {job.similarJobs.map((similarJob) => (
                      <Card key={similarJob.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{similarJob.title}</h4>
                            <p className="text-sm text-muted-foreground">{similarJob.company}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{similarJob.salary}</span>
                              <span>{similarJob.location}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Job
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollAnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.3}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={handleApply}
                    disabled={isApplied}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Application Submitted
                      </>
                    ) : (
                      'Apply for this Job'
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSave}>
                    <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save for Later'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask Questions
                  </Button>
                </div>
              </Card>
            </ScrollAnimatedSection>

            {/* Job Details */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.4}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Job Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employment Type</span>
                    <span>{job.employmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience Level</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Work Schedule</span>
                    <span>{job.workSchedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry</span>
                    <span>{job.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span>{job.deadline}</span>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>

            {/* Match Score */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.5}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Your Match Score</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <Progress value={92} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Great match! Your skills align well with this role.
                  </p>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Skills match</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Experience level</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Location preference</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span>Salary range (close)</span>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>

            {/* Report Job */}
            <ScrollAnimatedSection animation="fadeUp" delay={0.6}>
              <Card className="p-4">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <Flag className="w-4 h-4 mr-2" />
                  Report this job
                </Button>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}