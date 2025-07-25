import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  Building, 
  Target,
  Calendar,
  Briefcase,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  Award,
  Filter,
  Download,
  Eye,
  UserCheck,
  UserPlus,
  Search,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Globe,
  MapPin,
  Mail
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
  hiring: {
    label: "Hiring",
    color: "#8b5cf6",
  },
  candidates: {
    label: "Candidates",
    color: "#06b6d4",
  },
  budget: {
    label: "Budget",
    color: "#10b981",
  },
  retention: {
    label: "Retention",
    color: "#f59e0b",
  }
};

// Generate employer-specific analytics data
function generateEmployerData(profileData?: Partial<UserProfileData>) {
  return {
    companyName: profileData?.company || 'TechCorp Inc.',
    companySize: '500-1000 employees',
    industry: 'Technology',
    founded: '2018',
    
    hiringMetrics: {
      totalHires: 127,
      activePositions: 23,
      candidatesInPipeline: 189,
      averageTimeToHire: 18, // days
      costPerHire: 4500,
      offerAcceptanceRate: 87,
      employeeRetentionRate: 94,
      diversityScore: 78
    },

    // Fixed monthly hiring data with shorter month names to prevent overflow
    monthlyHiringData: [
      { month: 'Jan', hires: 12, applications: 245, interviews: 56, budget: 54 },
      { month: 'Feb', hires: 15, applications: 289, interviews: 67, budget: 68 },
      { month: 'Mar', hires: 18, applications: 312, interviews: 78, budget: 81 },
      { month: 'Apr', hires: 14, applications: 298, interviews: 63, budget: 63 },
      { month: 'May', hires: 22, applications: 367, interviews: 89, budget: 99 },
      { month: 'Jun', hires: 25, applications: 412, interviews: 98, budget: 113 }
    ],

    departmentBreakdown: [
      { department: 'Engineering', hires: 45, openings: 12, budget: 180, avgSalary: 120 },
      { department: 'Product', hires: 18, openings: 5, budget: 90, avgSalary: 110 },
      { department: 'Design', hires: 12, openings: 3, budget: 54, avgSalary: 95 },
      { department: 'Marketing', hires: 22, openings: 6, budget: 88, avgSalary: 85 },
      { department: 'Sales', hires: 30, openings: 8, budget: 120, avgSalary: 75 }
    ],

    candidateSourceData: [
      { source: 'Strot Platform', candidates: 156, hires: 45, cost: 15.6, quality: 92 },
      { source: 'LinkedIn', candidates: 89, hires: 23, cost: 12.4, quality: 87 },
      { source: 'Employee Referrals', candidates: 67, hires: 28, cost: 8.4, quality: 96 },
      { source: 'Job Boards', candidates: 134, hires: 18, cost: 9.8, quality: 78 },
      { source: 'University Partners', candidates: 45, hires: 13, cost: 3.2, quality: 84 }
    ],

    topPerformingRoles: [
      {
        title: 'Senior Frontend Developer',
        applications: 89,
        hires: 8,
        avgTimeToHire: 14,
        salary: '$120,000',
        successRate: 94
      },
      {
        title: 'Product Manager',
        applications: 67,
        hires: 5,
        avgTimeToHire: 22,
        salary: '$135,000',
        successRate: 91
      },
      {
        title: 'UX Designer',
        applications: 45,
        hires: 4,
        avgTimeToHire: 16,
        salary: '$95,000',
        successRate: 89
      }
    ],

    teamSatisfactionData: [
      { metric: 'Job Satisfaction', score: 88, target: 85, trend: 'up' },
      { metric: 'Work-Life Balance', score: 82, target: 80, trend: 'up' },
      { metric: 'Career Growth', score: 79, target: 85, trend: 'down' },
      { metric: 'Compensation', score: 91, target: 88, trend: 'up' },
      { metric: 'Management Quality', score: 86, target: 85, trend: 'stable' },
      { metric: 'Company Culture', score: 93, target: 90, trend: 'up' }
    ],

    diversityMetrics: [
      { category: 'Gender', female: 42, male: 58, target: 50 },
      { category: 'Ethnicity', minority: 34, majority: 66, target: 40 },
      { category: 'Age Groups', under30: 45, over30: 55, target: 45 }
    ],

    budgetAnalysis: {
      totalBudget: 2400000,
      spent: 1680000,
      remaining: 720000,
      efficiency: 78, // cost per hire efficiency
      quarterlyTrend: 5.2 // percentage increase
    },

    upcomingInterviews: [
      {
        candidate: 'Sarah Johnson',
        role: 'Senior React Developer',
        date: '2024-01-25',
        time: '2:00 PM',
        interviewer: 'John Smith',
        stage: 'Technical Round'
      },
      {
        candidate: 'Michael Chen',
        role: 'Product Designer',
        date: '2024-01-25',
        time: '3:30 PM',
        interviewer: 'Lisa Wang',
        stage: 'Portfolio Review'
      },
      {
        candidate: 'Emily Rodriguez',
        role: 'Data Scientist',
        date: '2024-01-26',
        time: '10:00 AM',
        interviewer: 'Alex Johnson',
        stage: 'Final Interview'
      }
    ],

    recentHires: [
      {
        name: 'David Kim',
        role: 'Frontend Developer',
        department: 'Engineering',
        startDate: '2024-01-15',
        salary: '$115,000',
        source: 'Strot Platform'
      },
      {
        name: 'Rachel Green',
        role: 'Product Manager',
        department: 'Product',
        startDate: '2024-01-10',
        salary: '$130,000',
        source: 'Employee Referral'
      }
    ]
  };
}

interface EmployerAnalyticsHubProps {
  profileData?: Partial<UserProfileData>;
}

export function EmployerAnalyticsHub({ profileData }: EmployerAnalyticsHubProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');

  // Generate employer-specific analytics
  const employerData = useMemo(() => 
    generateEmployerData(profileData), [profileData]
  );

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Employer-Specific Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {employerData.companyName} Hiring Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your hiring performance and team growth
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-blue-600">
            <Building className="h-3 w-3 mr-1" />
            {employerData.companySize}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-sm"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Employer Key Metrics - Purple/Blue Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Hires</p>
                <p className="text-2xl font-bold text-purple-900">{employerData.hiringMetrics.totalHires}</p>
                <p className="text-sm text-green-600">+12% from last quarter</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Active Positions</p>
                <p className="text-2xl font-bold text-blue-900">{employerData.hiringMetrics.activePositions}</p>
                <p className="text-sm text-blue-600">Across {employerData.departmentBreakdown.length} departments</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Avg. Time to Hire</p>
                <p className="text-2xl font-bold text-green-900">{employerData.hiringMetrics.averageTimeToHire} days</p>
                <p className="text-sm text-green-600">-3 days improvement</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Retention Rate</p>
                <p className="text-2xl font-bold text-orange-900">{employerData.hiringMetrics.employeeRetentionRate}%</p>
                <p className="text-sm text-orange-600">Above industry avg</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Employer-Specific Tabs with Purple Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-purple-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="hiring" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Hiring Pipeline
            </TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Departments
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Team Insights
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Budget & ROI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FIXED: Monthly Hiring Trend with proper overflow handling */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-800">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span>Monthly Hiring Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full h-[300px] overflow-hidden">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={employerData.monthlyHiringData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="month" 
                            stroke="#6b7280"
                            fontSize={12}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            tick={{ fontSize: 12 }}
                            width={40}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [
                              name === 'hires' ? `${value} hires` : 
                              name === 'budget' ? `$${value}k budget` : value,
                              name === 'hires' ? 'Monthly Hires' : 
                              name === 'budget' ? 'Budget (k)' : name
                            ]}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="hires" 
                            stroke="#8b5cf6" 
                            fill="#8b5cf6"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Candidate Sources - Blue Theme */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Top Candidate Sources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employerData.candidateSourceData.slice(0, 4).map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-blue-900 truncate">{source.source}</span>
                            <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">
                              Quality: {source.quality}%
                            </Badge>
                          </div>
                          <span className="text-sm text-blue-600 whitespace-nowrap">{source.hires} hires</span>
                        </div>
                        <Progress 
                          value={(source.hires / Math.max(...employerData.candidateSourceData.map(s => s.hires))) * 100} 
                          className="h-2 bg-blue-100" 
                        />
                        <div className="flex justify-between text-xs text-blue-600">
                          <span>{source.candidates} candidates</span>
                          <span>Cost: ${source.cost}k</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Interviews - Improved Layout */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Upcoming Interviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.upcomingInterviews.map((interview, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50 gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-green-900">{interview.candidate}</span>
                          <Badge variant="secondary" className="bg-green-200 text-green-800 text-xs">
                            {interview.stage}
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">{interview.role}</p>
                        <p className="text-xs text-green-600">
                          {interview.date} at {interview.time} with {interview.interviewer}
                        </p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Overview - Improved Layout */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Building className="h-5 w-5 text-purple-600" />
                  <span>Company Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-purple-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-purple-600">{employerData.industry}</div>
                    <div className="text-sm text-purple-500">Industry</div>
                  </div>
                  <div className="text-center p-4 border border-purple-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-purple-600">{employerData.founded}</div>
                    <div className="text-sm text-purple-500">Founded</div>
                  </div>
                  <div className="text-center p-4 border border-purple-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-purple-600">{employerData.hiringMetrics.diversityScore}%</div>
                    <div className="text-sm text-purple-500">Diversity Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hiring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">Hiring Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div>
                        <span className="font-medium text-purple-900">Applications Received</span>
                        <div className="text-2xl font-bold text-purple-600">1,247</div>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <span className="font-medium text-blue-900">In Review</span>
                        <div className="text-2xl font-bold text-blue-600">189</div>
                      </div>
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <span className="font-medium text-green-900">Interviews Scheduled</span>
                        <div className="text-2xl font-bold text-green-600">45</div>
                      </div>
                      <Calendar className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div>
                        <span className="font-medium text-orange-900">Offers Extended</span>
                        <div className="text-2xl font-bold text-orange-600">23</div>
                      </div>
                      <Award className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Top Performing Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employerData.topPerformingRoles.map((role, index) => (
                      <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-900 truncate">{role.title}</span>
                          <Badge variant="secondary" className="bg-blue-200 text-blue-800 text-xs whitespace-nowrap">
                            {role.successRate}% success
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
                          <div>Apps: {role.applications}</div>
                          <div>Hires: {role.hires}</div>
                          <div>Time: {role.avgTimeToHire}d</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="w-full h-[400px] overflow-hidden">
                  <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={employerData.departmentBreakdown}
                        margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="department" 
                          stroke="#6b7280"
                          fontSize={12}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          fontSize={12}
                          width={40}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="hires" fill="#8b5cf6" name="Total Hires" />
                        <Bar dataKey="openings" fill="#06b6d4" name="Open Positions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Team Satisfaction Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.teamSatisfactionData.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-900">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{metric.score}%</span>
                          {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                      <Progress value={metric.score} className="h-2 bg-green-100" />
                      <div className="text-xs text-green-600">Target: {metric.target}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600">
                        ${employerData.budgetAnalysis.totalBudget.toLocaleString()}
                      </div>
                      <div className="text-sm text-orange-500">Total Annual Budget</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-700">Spent: ${employerData.budgetAnalysis.spent.toLocaleString()}</span>
                        <span className="text-orange-600">
                          {((employerData.budgetAnalysis.spent / employerData.budgetAnalysis.totalBudget) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={(employerData.budgetAnalysis.spent / employerData.budgetAnalysis.totalBudget) * 100} 
                        className="h-3 bg-orange-100" 
                      />
                      <div className="text-xs text-orange-600">
                        Remaining: ${employerData.budgetAnalysis.remaining.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Cost Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        ${employerData.hiringMetrics.costPerHire.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-500">Cost per Hire</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">
                        {employerData.budgetAnalysis.efficiency}%
                      </div>
                      <div className="text-sm text-blue-500">Efficiency Score</div>
                    </div>
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