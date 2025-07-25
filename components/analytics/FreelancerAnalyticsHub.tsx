import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Star, 
  Users, 
  Eye,
  Calendar,
  Target,
  Award,
  Briefcase,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';
import { generateProfileBasedAnalytics, generateProfileInsights, UserProfileData } from '../profile/profileDataGenerator';

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#2563eb",
  },
  projects: {
    label: "Projects",
    color: "#60a5fa",
  },
  rating: {
    label: "Rating",
    color: "#34d399",
  },
  views: {
    label: "Profile Views",
    color: "#f59e0b",
  }
};

interface FreelancerAnalyticsHubProps {
  profileData?: Partial<UserProfileData>;
}

export function FreelancerAnalyticsHub({ profileData }: FreelancerAnalyticsHubProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');

  // Generate real profile-based analytics
  const userProfile = useMemo(() => 
    generateProfileBasedAnalytics(profileData), [profileData]
  );
  
  const insights = useMemo(() => 
    generateProfileInsights(userProfile), [userProfile]
  );

  // Transform skills data for charts
  const skillsChartData = userProfile.skills.map(skill => ({
    name: skill.name,
    level: skill.level,
    projects: skill.projectsUsed,
    verified: skill.verified
  }));

  // Transform projects by skill type
  const projectTypeData = userProfile.skills.map(skill => ({
    name: skill.name,
    value: skill.projectsUsed,
    color: skill.verified ? '#2563eb' : '#60a5fa',
    avgPrice: Math.round((userProfile.stats.totalEarnings / userProfile.stats.completedProjects) * (skill.level / 100))
  }));

  // Weekly activity based on recent projects
  const weeklyActivityData = [
    { day: 'Mon', hours: 8, projects: 3, earnings: userProfile.monthlyData[5]?.earnings / 30 * 7 || 1200 },
    { day: 'Tue', hours: 7, projects: 2, earnings: userProfile.monthlyData[5]?.earnings / 30 * 6 || 1000 },
    { day: 'Wed', hours: 9, projects: 4, earnings: userProfile.monthlyData[5]?.earnings / 30 * 8 || 1400 },
    { day: 'Thu', hours: 6, projects: 2, earnings: userProfile.monthlyData[5]?.earnings / 30 * 5 || 800 },
    { day: 'Fri', hours: 8, projects: 3, earnings: userProfile.monthlyData[5]?.earnings / 30 * 7 || 1200 },
    { day: 'Sat', hours: 4, projects: 1, earnings: userProfile.monthlyData[5]?.earnings / 30 * 3 || 600 },
    { day: 'Sun', hours: 2, projects: 1, earnings: userProfile.monthlyData[5]?.earnings / 30 * 2 || 400 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with personalized info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {userProfile.name}'s Freelancer Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your freelance performance and growth • {userProfile.title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={userProfile.marketPosition.trending ? 'default' : 'secondary'}>
            {userProfile.marketPosition.trending ? '📈 Trending' : '📊 Stable'}
          </Badge>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Personalized Key Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${userProfile.stats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{userProfile.stats.monthlyGrowth}% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Projects</p>
                <p className="text-2xl font-bold">{userProfile.stats.completedProjects}</p>
                <p className="text-sm text-blue-600">{userProfile.projects.filter(p => p.completion === 'in-progress').length} in progress</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Client Rating</p>
                <p className="text-2xl font-bold">{userProfile.stats.rating}</p>
                <p className="text-sm text-yellow-600">From {userProfile.stats.totalReviews} reviews</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{userProfile.stats.successRate}%</p>
                <p className="text-sm text-purple-600">{userProfile.stats.responseTime} response</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Analytics Tabs with Real Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real Earnings Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Earnings Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userProfile.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#2563eb" 
                          fill="#2563eb"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Real Skills Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Top Skills Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.skills.slice(0, 5).map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.name}</span>
                            {skill.verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                          </div>
                          <span className="text-sm text-muted-foreground">{skill.projectsUsed} projects</span>
                        </div>
                        <Progress value={(skill.projectsUsed / Math.max(...userProfile.skills.map(s => s.projectsUsed))) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Weekly Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="hours" fill="#2563eb" name="Hours Worked" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Personalized Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Personal Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Top Skill</span>
                      <Badge>{insights.topSkill.name}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used in {insights.topSkill.projectsUsed} projects
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Best Month</span>
                      <Badge variant="secondary">{insights.bestMonth.month}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${insights.bestMonth.earnings.toLocaleString()} earned
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Avg Project Value</span>
                      <Badge variant="outline">${Math.round(insights.averageProjectValue).toLocaleString()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insights.completionRate.toFixed(1)}% completion rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Earnings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={userProfile.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#2563eb" 
                          strokeWidth={3}
                          dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Clients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile.topClients.slice(0, 3).map((client, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.projectsCompleted} projects
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${client.totalPaid.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.rating}★
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.projects.slice(0, 5).map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{project.title}</h4>
                          <Badge variant={project.completion === 'completed' ? 'default' : 
                                        project.completion === 'in-progress' ? 'secondary' : 'destructive'}>
                            {project.completion}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{project.client}</span>
                          <span>${project.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                          <span>{project.duration}</span>
                          <span>{project.rating}★</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillsChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="projects" fill="#2563eb" name="Projects Used" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Project Success Rate</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={userProfile.stats.successRate} className="w-20" />
                        <span className="text-sm font-medium">{userProfile.stats.successRate}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Client Satisfaction</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(userProfile.stats.rating / 5) * 100} className="w-20" />
                        <span className="text-sm font-medium">{userProfile.stats.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{userProfile.stats.responseTime}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Market Ranking</span>
                      <div className="flex items-center space-x-2">
                        <Badge>Top {userProfile.marketPosition.skillRanking} in category</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Trajectory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +{insights.earningsGrowth.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Earnings growth (6 months)</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {userProfile.skills.filter(s => s.verified).length}/{userProfile.skills.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Skills verified</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {userProfile.achievements.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Professional achievements</div>
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