import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Star, 
  Users, 
  Award,
  Calendar,
  Briefcase,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  BookOpen,
  Zap,
  CheckCircle,
  Brain,
  Trophy,
  Lightbulb,
  Rocket,
  Shield,
  Compass,
  Map,
  ArrowUp,
  ArrowRight,
  Building,
  Code,
  Presentation,
  Globe,
  GitBranch,
  Coffee,
  Heart,
  Flame,
  Timer,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { UserProfileData } from '../profile/profileDataGenerator';

const chartConfig = {
  performance: {
    label: "Performance",
    color: "#4f46e5",
  },
  goals: {
    label: "Goals",
    color: "#06b6d4",
  },
  skills: {
    label: "Skills",
    color: "#10b981",
  },
  projects: {
    label: "Projects",
    color: "#f59e0b",
  },
  growth: {
    label: "Growth",
    color: "#8b5cf6",
  }
};

// Generate career-focused data for full-time professionals
function generateCareerData(profileData?: Partial<UserProfileData>) {
  return {
    currentRole: profileData?.title || 'Senior Software Engineer',
    company: profileData?.company || 'Google',
    department: 'Engineering',
    teamSize: 12,
    reportingTo: 'John Smith - Engineering Manager',
    yearsAtCompany: 2.5,
    totalExperience: 6,
    
    careerMetrics: {
      performanceScore: 94,
      goalsCompleted: 8,
      totalGoals: 10,
      skillsLearned: 15,
      certifications: 4,
      promotions: 2,
      salaryGrowth: 45, // percentage
      leadershipRating: 4.3,
      innovationScore: 89,
      teamCollaboration: 96,
      mentorshipHours: 48
    },

    quarterlyPerformance: [
      { quarter: 'Q1 2023', performance: 88, goals: 3, projects: 2, skills: 2, promotion: false },
      { quarter: 'Q2 2023', performance: 91, goals: 4, projects: 3, skills: 3, promotion: false },
      { quarter: 'Q3 2023', performance: 89, goals: 2, projects: 2, skills: 2, promotion: false },
      { quarter: 'Q4 2023', performance: 93, goals: 3, projects: 4, skills: 4, promotion: true },
      { quarter: 'Q1 2024', performance: 96, goals: 4, projects: 3, skills: 3, promotion: false },
      { quarter: 'Q2 2024', performance: 94, goals: 3, projects: 5, skills: 4, promotion: false }
    ],

    skillDevelopment: [
      { skill: 'Technical Leadership', current: 92, target: 95, trend: 'up', importance: 'high' },
      { skill: 'System Architecture', current: 89, target: 92, trend: 'up', importance: 'high' },
      { skill: 'Team Management', current: 78, target: 88, trend: 'up', importance: 'medium' },
      { skill: 'Product Strategy', current: 71, target: 82, trend: 'up', importance: 'medium' },
      { skill: 'Public Speaking', current: 65, target: 75, trend: 'stable', importance: 'low' },
      { skill: 'Data Analysis', current: 84, target: 88, trend: 'up', importance: 'medium' }
    ],

    goalTracking: [
      { 
        id: 1,
        category: 'Technical Skills',
        title: 'Master Cloud Architecture',
        description: 'Complete AWS Solutions Architect certification',
        progress: 75,
        deadline: '2024-03-15',
        priority: 'high',
        status: 'in-progress'
      },
      { 
        id: 2,
        category: 'Leadership',
        title: 'Lead Cross-functional Project',
        description: 'Successfully deliver Q2 product launch',
        progress: 60,
        deadline: '2024-06-30',
        priority: 'high',
        status: 'in-progress'
      },
      { 
        id: 3,
        category: 'Personal Development',
        title: 'Mentor Junior Engineers',
        description: 'Guide 3 junior developers through career growth',
        progress: 90,
        deadline: '2024-12-31',
        priority: 'medium',
        status: 'on-track'
      }
    ],

    projectsLed: [
      {
        name: 'Payment System Redesign',
        status: 'completed',
        impact: 'high',
        duration: '6 months',
        teamSize: 8,
        budget: '$2.4M',
        outcome: '40% faster processing, 99.9% uptime'
      },
      {
        name: 'Mobile App Architecture',
        status: 'in-progress',
        impact: 'high',
        duration: '4 months',
        teamSize: 6,
        budget: '$1.2M',
        outcome: 'Expected 50% performance improvement'
      },
      {
        name: 'DevOps Pipeline Optimization',
        status: 'completed',
        impact: 'medium',
        duration: '3 months',
        teamSize: 4,
        budget: '$800K',
        outcome: '60% faster deployments'
      }
    ],

    careerPath: [
      { year: '2018', role: 'Junior Developer', company: 'StartupABC', salary: 65000, level: 1 },
      { year: '2019', role: 'Software Developer', company: 'StartupABC', salary: 75000, level: 2 },
      { year: '2020', role: 'Senior Developer', company: 'TechCorp', salary: 95000, level: 3 },
      { year: '2022', role: 'Tech Lead', company: 'Google', salary: 140000, level: 4 },
      { year: '2024', role: 'Senior Software Engineer', company: 'Google', salary: 180000, level: 5 }
    ],

    learningActivity: [
      { 
        type: 'Online Course',
        title: 'Advanced System Design',
        provider: 'Coursera',
        progress: 85,
        timeInvested: '24 hours',
        certification: true
      },
      { 
        type: 'Workshop',
        title: 'Leadership in Tech',
        provider: 'Company Training',
        progress: 100,
        timeInvested: '16 hours',
        certification: false
      },
      { 
        type: 'Conference',
        title: 'Google I/O 2024',
        provider: 'Google',
        progress: 100,
        timeInvested: '40 hours',
        certification: false
      }
    ],

    recognitions: [
      {
        type: 'Employee of the Quarter',
        date: '2024-01-15',
        description: 'Outstanding performance in Q4 2023',
        impact: 'Team productivity increased by 25%'
      },
      {
        type: 'Innovation Award',
        date: '2023-09-20',
        description: 'Revolutionary payment optimization algorithm',
        impact: 'Saved company $500K annually'
      },
      {
        type: 'Technical Excellence',
        date: '2023-06-10',
        description: 'Code quality and architecture leadership',
        impact: 'Reduced system bugs by 40%'
      }
    ],

    workLifeBalance: {
      averageWorkHours: 42,
      flexibilityScore: 9.2,
      satisfactionScore: 8.8,
      burnoutRisk: 'low',
      wellnessActivities: ['Meditation', 'Exercise', 'Reading'],
      vacationDaysUsed: 18,
      vacationDaysTotal: 25
    },

    nextMilestones: [
      {
        milestone: 'Staff Engineer Promotion',
        timeframe: '12-18 months',
        requirements: ['Lead 2 major projects', 'Mentor 5+ engineers', 'Technical design docs'],
        probability: 78
      },
      {
        milestone: 'Technical Lead Role',
        timeframe: '6-12 months',
        requirements: ['Complete current project', 'Stakeholder management', 'Team leadership'],
        probability: 92
      }
    ]
  };
}

interface FullTimerAnalyticsHubProps {
  profileData?: Partial<UserProfileData>;
}

export function FullTimerAnalyticsHub({ profileData }: FullTimerAnalyticsHubProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');

  // Generate career-specific analytics
  const careerData = useMemo(() => generateCareerData(profileData), [profileData]);

  const userName = profileData?.name?.split(' ')[0] || 'Your';

  return (
    <div className="space-y-6">
      {/* Professional Header - Blue/Indigo Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            {userName} Professional Growth Hub
          </h1>
          <p className="text-muted-foreground flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>{careerData.currentRole} at {careerData.company}</span>
            <span>•</span>
            <span>{careerData.yearsAtCompany} years at company</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="bg-gradient-to-r from-indigo-500 to-blue-600">
            <Trophy className="h-3 w-3 mr-1" />
            High Performer
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Career Report
          </Button>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="1q">This Quarter</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Professional Key Metrics - Blue/Indigo Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">Performance Score</p>
                <p className="text-2xl font-bold text-indigo-900">{careerData.careerMetrics.performanceScore}</p>
                <p className="text-sm text-green-600">+6 pts this quarter</p>
              </div>
              <Target className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-600 font-medium">Goals Achieved</p>
                <p className="text-2xl font-bold text-cyan-900">{careerData.careerMetrics.goalsCompleted}/{careerData.careerMetrics.totalGoals}</p>
                <p className="text-sm text-cyan-600">{((careerData.careerMetrics.goalsCompleted / careerData.careerMetrics.totalGoals) * 100).toFixed(0)}% completion</p>
              </div>
              <CheckCircle className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Skills Developed</p>
                <p className="text-2xl font-bold text-emerald-900">{careerData.careerMetrics.skillsLearned}</p>
                <p className="text-sm text-emerald-600">{careerData.careerMetrics.certifications} certifications</p>
              </div>
              <Brain className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Leadership Rating</p>
                <p className="text-2xl font-bold text-purple-900">{careerData.careerMetrics.leadershipRating}</p>
                <p className="text-sm text-purple-600">{careerData.careerMetrics.mentorshipHours}h mentoring</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Professional Tabs - Indigo Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-indigo-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Career Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Goals & Growth
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Projects & Impact
            </TabsTrigger>
            <TabsTrigger value="development" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              Learning & Development
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Career Progression - Indigo Theme */}
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-indigo-800">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    <span>Career Progression</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={careerData.careerPath}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="year" stroke="#4338ca" />
                        <YAxis stroke="#4338ca" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="salary" 
                          stroke="#4f46e5" 
                          fill="#4f46e5"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Skill Development Radar - Cyan Theme */}
              <Card className="border-cyan-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-800">
                    <Zap className="h-5 w-5 text-cyan-600" />
                    <span>Skills Development</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={careerData.skillDevelopment}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Current Level"
                          dataKey="current"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Target"
                          dataKey="target"
                          stroke="#0891b2"
                          fill="transparent"
                          strokeDasharray="5 5"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Current Goals Progress */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Current Goals Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerData.goalTracking.map((goal) => (
                    <div key={goal.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-green-900">{goal.title}</span>
                          <Badge 
                            variant={goal.priority === 'high' ? 'default' : 'secondary'}
                            className={goal.priority === 'high' ? 'bg-green-600' : ''}
                          >
                            {goal.priority} priority
                          </Badge>
                        </div>
                        <span className="text-sm text-green-600">Due: {goal.deadline}</span>
                      </div>
                      <p className="text-sm text-green-700 mb-3">{goal.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-700">Progress</span>
                          <span className="text-green-600 font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2 bg-green-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Recognitions */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Recent Recognitions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerData.recognitions.map((recognition, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-purple-200 rounded-lg bg-white">
                      <Trophy className="h-6 w-6 text-purple-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-purple-900">{recognition.type}</h4>
                          <span className="text-sm text-purple-600">{recognition.date}</span>
                        </div>
                        <p className="text-sm text-purple-700 mb-2">{recognition.description}</p>
                        <p className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          Impact: {recognition.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-800">Quarterly Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={careerData.quarterlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="quarter" stroke="#4338ca" />
                        <YAxis domain={[80, 100]} stroke="#4338ca" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="performance" 
                          stroke="#4f46e5" 
                          strokeWidth={3}
                          dot={{ fill: '#4f46e5', strokeWidth: 2, r: 5 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-cyan-800">Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-700">Technical Excellence</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={careerData.careerMetrics.performanceScore} className="w-20 bg-cyan-100" />
                        <span className="text-sm font-medium text-cyan-600">{careerData.careerMetrics.performanceScore}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-700">Team Collaboration</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={careerData.careerMetrics.teamCollaboration} className="w-20 bg-cyan-100" />
                        <span className="text-sm font-medium text-cyan-600">{careerData.careerMetrics.teamCollaboration}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-700">Innovation & Creativity</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={careerData.careerMetrics.innovationScore} className="w-20 bg-cyan-100" />
                        <span className="text-sm font-medium text-cyan-600">{careerData.careerMetrics.innovationScore}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-700">Leadership Potential</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(careerData.careerMetrics.leadershipRating / 5) * 100} className="w-20 bg-cyan-100" />
                        <span className="text-sm font-medium text-cyan-600">{careerData.careerMetrics.leadershipRating}/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Goal Achievement Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerData.goalTracking.map((goal) => (
                    <div key={goal.id} className="p-6 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-green-900 text-lg">{goal.title}</span>
                          <Badge 
                            variant={goal.status === 'completed' ? 'default' : 'secondary'}
                            className={goal.status === 'completed' ? 'bg-green-600' : ''}
                          >
                            {goal.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-green-600">Category: {goal.category}</span>
                      </div>
                      <p className="text-green-700 mb-4">{goal.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-700">Progress</span>
                          <span className="text-green-600 font-medium">{goal.progress}% complete</span>
                        </div>
                        <Progress value={goal.progress} className="h-3 bg-green-100" />
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Deadline: {goal.deadline}</span>
                          <span className="text-green-600">Priority: {goal.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Projects Led</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerData.projectsLed.map((project, index) => (
                    <div key={index} className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-purple-900">{project.name}</h4>
                          <Badge 
                            variant={project.status === 'completed' ? 'default' : 'secondary'}
                            className={project.status === 'completed' ? 'bg-purple-600' : ''}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="border-purple-300 text-purple-700">
                          {project.impact} impact
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-purple-600">Duration:</span>
                          <div className="font-medium text-purple-800">{project.duration}</div>
                        </div>
                        <div>
                          <span className="text-purple-600">Team Size:</span>
                          <div className="font-medium text-purple-800">{project.teamSize} people</div>
                        </div>
                        <div>
                          <span className="text-purple-600">Budget:</span>
                          <div className="font-medium text-purple-800">{project.budget}</div>
                        </div>
                        <div>
                          <span className="text-purple-600">Outcome:</span>
                          <div className="font-medium text-purple-800">{project.outcome}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-800">Learning Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerData.learningActivity.map((activity, index) => (
                      <div key={index} className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-indigo-600" />
                            <span className="font-medium text-indigo-900">{activity.title}</span>
                          </div>
                          {activity.certification && (
                            <Badge className="bg-indigo-600">Certified</Badge>
                          )}
                        </div>
                        <div className="flex justify-between items-center text-sm text-indigo-700">
                          <span>{activity.provider}</span>
                          <span>{activity.timeInvested}</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={activity.progress} className="h-2 bg-indigo-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-cyan-800">Career Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerData.nextMilestones.map((milestone, index) => (
                      <div key={index} className="p-4 border border-cyan-200 rounded-lg bg-cyan-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-cyan-900">{milestone.milestone}</h4>
                          <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                            {milestone.probability}% likely
                          </Badge>
                        </div>
                        <p className="text-sm text-cyan-700 mb-3">Timeline: {milestone.timeframe}</p>
                        <div className="space-y-1">
                          <span className="text-sm text-cyan-600">Requirements:</span>
                          <ul className="text-sm text-cyan-700 ml-4">
                            {milestone.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-center space-x-2">
                                <span>•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}