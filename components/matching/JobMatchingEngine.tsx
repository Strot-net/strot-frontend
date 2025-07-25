import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAuth } from '../auth/AuthProvider';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  Brain, 
  Target,
  TrendingUp,
  Zap,
  CheckCircle
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  posted: Date;
  urgent: boolean;
  verified: boolean;
  remote: boolean;
  logo?: string;
}

interface JobMatch {
  job: Job;
  matchScore: number;
  matchReasons: string[];
  salaryMatch: number;
  skillsMatch: number;
  locationMatch: number;
  experienceMatch: number;
}

interface JobMatchingEngineProps {
  onNavigate?: (page: string) => void;
  jobs?: Job[];
  showControls?: boolean;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'Build amazing user experiences with React and TypeScript',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'],
    experience: 'Senior',
    posted: new Date('2024-01-20'),
    urgent: false,
    verified: true,
    remote: true
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    description: 'Lead product strategy for our growing fintech platform',
    requirements: ['3+ years PM experience', 'Analytics skills', 'Financial knowledge'],
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'SQL'],
    experience: 'Mid-level',
    posted: new Date('2024-01-19'),
    urgent: true,
    verified: true,
    remote: true
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90,000 - $110,000',
    description: 'Create beautiful and intuitive user experiences',
    requirements: ['3+ years UX experience', 'Figma proficiency', 'Portfolio required'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe Creative Suite'],
    experience: 'Mid-level',
    posted: new Date('2024-01-18'),
    urgent: false,
    verified: true,
    remote: false
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Apply machine learning to solve complex business problems',
    requirements: ['PhD or Masters in Data Science', 'Python/R proficiency', 'ML experience'],
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
    experience: 'Senior',
    posted: new Date('2024-01-17'),
    urgent: false,
    verified: true,
    remote: true
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    company: 'WebDev Co.',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85,000 - $105,000',
    description: 'Build end-to-end web applications',
    requirements: ['3+ years full stack experience', 'React & Node.js', 'Database design'],
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express'],
    experience: 'Mid-level',
    posted: new Date('2024-01-16'),
    urgent: false,
    verified: true,
    remote: true
  }
];

export function JobMatchingEngine({ onNavigate, jobs = mockJobs, showControls = true }: JobMatchingEngineProps) {
  const { user } = useAuth();
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // AI Matching Algorithm
  const calculateJobMatches = useMemo(() => {
    if (!user?.profile) return [];

    return jobs.map((job: Job) => {
      const userSkills = user.profile?.skills || [];
      const userLocation = user.location || user.profile?.location || '';
      const userPreferences = user.profile?.preferences;
      const userSalaryRange = userPreferences?.salary || { min: 0, max: 200000 };

      // Skills matching (40% weight)
      const jobSkills = job.skills.map((s: string) => s.toLowerCase());
      const userSkillsLower = userSkills.map((s: string) => s.toLowerCase());
      const matchingSkills = jobSkills.filter((skill: string) => 
        userSkillsLower.some((userSkill: string) => 
          userSkill.includes(skill) || skill.includes(userSkill)
        )
      );
      const skillsMatch = matchingSkills.length / Math.max(jobSkills.length, 1) * 100;

      // Location matching (20% weight)
      let locationMatch = 0;
      if (job.remote && userPreferences?.remote) {
        locationMatch = 100;
      } else if (userLocation && job.location.toLowerCase().includes(userLocation.toLowerCase())) {
        locationMatch = 100;
      } else if (job.remote) {
        locationMatch = 80;
      } else {
        locationMatch = 30;
      }

      // Salary matching (25% weight)
      const jobSalaryNumbers = job.salary.match(/\d+/g)?.map(Number) || [0, 200000];
      const jobMinSalary = Math.min(...jobSalaryNumbers) * 1000;
      const jobMaxSalary = Math.max(...jobSalaryNumbers) * 1000;
      
      let salaryMatch = 0;
      if (userSalaryRange.min <= jobMaxSalary && userSalaryRange.max >= jobMinSalary) {
        const overlap = Math.min(userSalaryRange.max, jobMaxSalary) - Math.max(userSalaryRange.min, jobMinSalary);
        const userRange = userSalaryRange.max - userSalaryRange.min;
        salaryMatch = Math.max(0, (overlap / userRange) * 100);
      }

      // Job type matching (15% weight)
      const preferredTypes = userPreferences?.jobTypes || [];
      const typeMatch = preferredTypes.length === 0 ? 100 : 
        (preferredTypes.includes(job.type) ? 100 : 50);

      // Experience level matching
      let experienceMatch = 100; // Default to 100 if we can't determine

      // Calculate overall match score
      const matchScore = (
        skillsMatch * 0.4 +
        locationMatch * 0.2 +
        salaryMatch * 0.25 +
        typeMatch * 0.15
      );

      // Generate match reasons
      const matchReasons: string[] = [];
      if (matchingSkills.length > 0) {
        matchReasons.push(`${matchingSkills.length} matching skills: ${matchingSkills.join(', ')}`);
      }
      if (locationMatch > 80) {
        matchReasons.push(job.remote ? 'Remote work available' : 'Location match');
      }
      if (salaryMatch > 70) {
        matchReasons.push('Salary meets expectations');
      }
      if (job.verified) {
        matchReasons.push('Verified employer');
      }
      if (job.urgent) {
        matchReasons.push('Urgent hiring');
      }

      return {
        job,
        matchScore: Math.round(matchScore),
        matchReasons,
        salaryMatch: Math.round(salaryMatch),
        skillsMatch: Math.round(skillsMatch),
        locationMatch: Math.round(locationMatch),
        experienceMatch: Math.round(experienceMatch)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [user?.profile, jobs]);

  useEffect(() => {
    if (user?.profile && jobs.length > 0) {
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      
      // Simulate AI analysis time
      setTimeout(() => {
        setMatches(calculateJobMatches);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2000);
    }
  }, [user?.profile, jobs, calculateJobMatches]);

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'outline';
  };

  if (!user?.profile) {
    return (
      <Card className="p-8 text-center">
        <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="mb-2">Complete Your Profile</h3>
        <p className="text-muted-foreground mb-4">
          To get personalized job matches, please complete your profile first.
        </p>
        <Button onClick={() => onNavigate?.('profile')}>
          Complete Profile
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={isAnalyzing ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0, ease: "linear" }}
            className="w-12 h-12 bg-gradient-to-r from-primary to-chart-1 rounded-full flex items-center justify-center mr-3"
          >
            <Brain className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <div>
            <h2 className="text-2xl">AI Job Matching</h2>
            <p className="text-muted-foreground">
              {isAnalyzing ? 'Analyzing your profile...' : 
               analysisComplete ? `Found ${matches.length} personalized matches` : 
               'Ready to find your perfect match'}
            </p>
          </div>
        </div>

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Progress value={66} className="w-64 mx-auto" />
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <span>Analyzing skills</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  className="w-2 h-2 bg-chart-1 rounded-full"
                />
                <span>Matching preferences</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                  className="w-2 h-2 bg-chart-2 rounded-full"
                />
                <span>Calculating scores</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Match Results */}
      {analysisComplete && matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {matches.slice(0, showControls ? 5 : matches.length).map((match, index) => (
            <motion.div
              key={match.job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center text-primary-foreground text-sm">
                      {match.job.logo || match.job.company.slice(0, 2)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="truncate">{match.job.title}</h3>
                        {match.job.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                        {match.job.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {match.job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {match.job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {match.job.salary}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {match.job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {match.job.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {match.job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Match reasons: </span>
                          <span>{match.matchReasons.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-4">
                    <Badge 
                      variant={getMatchBadgeVariant(match.matchScore)}
                      className="mb-3"
                    >
                      <Target className="w-3 h-3 mr-1" />
                      {match.matchScore}% match
                    </Badge>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Skills:</span>
                        <span className={getMatchColor(match.skillsMatch)}>
                          {match.skillsMatch}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className={getMatchColor(match.locationMatch)}>
                          {match.locationMatch}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salary:</span>
                        <span className={getMatchColor(match.salaryMatch)}>
                          {match.salaryMatch}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <Button size="sm" className="w-full">
                        Apply Now
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {showControls && matches.length > 5 && (
            <div className="text-center">
              <Button variant="outline" onClick={() => onNavigate?.('jobs')}>
                View All {matches.length} Matches
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {/* No Matches */}
      {analysisComplete && matches.length === 0 && (
        <Card className="p-8 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="mb-2">No Perfect Matches Yet</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find jobs that match your current preferences. Try updating your profile or expanding your criteria.
          </p>
          <div className="flex justify-center space-x-3">
            <Button onClick={() => onNavigate?.('profile')}>
              Update Profile
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('jobs')}>
              Browse All Jobs
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}