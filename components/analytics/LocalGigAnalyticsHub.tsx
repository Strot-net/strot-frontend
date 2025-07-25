import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Users,
  Wrench,
  Car,
  Home,
  Phone,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Route,
  Timer,
  Award,
  ThumbsUp,
  MessageCircle,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Truck,
  HardHat,
  Hammer,
  Paintbrush,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';
import { UserProfileData } from '../profile/profileDataGenerator';

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#f97316",
  },
  jobs: {
    label: "Jobs",
    color: "#06b6d4",
  },
  rating: {
    label: "Rating",
    color: "#10b981",
  },
  distance: {
    label: "Distance",
    color: "#8b5cf6",
  }
};

// Generate local gig worker analytics data
function generateLocalGigData(profileData?: Partial<UserProfileData>) {
  return {
    serviceArea: 'San Francisco Bay Area',
    primaryServices: ['Plumbing', 'Electrical', 'Carpentry', 'Painting'],
    yearsActive: 6,
    
    performanceMetrics: {
      weeklyEarnings: 1850,
      jobsCompleted: 342,
      averageRating: 4.95,
      responseTime: '< 15 minutes',
      completionRate: 99.2,
      repeatCustomers: 78,
      serviceRadius: 25, // miles
      averageJobValue: 185
    },

    weeklyData: [
      { day: 'Monday', earnings: 285, jobs: 4, hours: 8, distance: 45 },
      { day: 'Tuesday', earnings: 320, jobs: 5, hours: 9, distance: 52 },
      { day: 'Wednesday', earnings: 245, jobs: 3, hours: 7, distance: 38 },
      { day: 'Thursday', earnings: 380, jobs: 6, hours: 10, distance: 68 },
      { day: 'Friday', earnings: 425, jobs: 7, hours: 11, distance: 72 },
      { day: 'Saturday', earnings: 195, jobs: 2, hours: 5, distance: 28 }
    ],

    monthlyTrendData: [
      { month: 'Jan', earnings: 6800, jobs: 42, rating: 4.9, hours: 168 },
      { month: 'Feb', earnings: 7200, jobs: 45, rating: 4.92, hours: 185 },
      { month: 'Mar', earnings: 7850, jobs: 48, rating: 4.94, hours: 195 },
      { month: 'Apr', earnings: 7600, jobs: 46, rating: 4.93, hours: 188 },
      { month: 'May', earnings: 8200, jobs: 52, rating: 4.95, hours: 210 },
      { month: 'Jun', earnings: 8950, jobs: 58, rating: 4.97, hours: 225 }
    ],

    serviceBreakdown: [
      { service: 'Plumbing', jobs: 89, revenue: 18500, avgPrice: 208, rating: 4.96 },
      { service: 'Electrical', jobs: 67, revenue: 15200, avgPrice: 227, rating: 4.94 },
      { service: 'Carpentry', jobs: 78, revenue: 14600, avgPrice: 187, rating: 4.95 },
      { service: 'Painting', jobs: 45, revenue: 8900, avgPrice: 198, rating: 4.93 },
      { service: 'General Handyman', jobs: 63, revenue: 9800, avgPrice: 156, rating: 4.97 }
    ],

    peakHoursData: [
      { hour: '8 AM', jobs: 12, earnings: 2200 },
      { hour: '9 AM', jobs: 18, earnings: 3400 },
      { hour: '10 AM', jobs: 25, earnings: 4800 },
      { hour: '11 AM', jobs: 22, earnings: 4200 },
      { hour: '12 PM', jobs: 15, earnings: 2850 },
      { hour: '1 PM', jobs: 20, earnings: 3800 },
      { hour: '2 PM', jobs: 28, earnings: 5200 },
      { hour: '3 PM', jobs: 24, earnings: 4600 },
      { hour: '4 PM', jobs: 19, earnings: 3600 },
      { hour: '5 PM', jobs: 16, earnings: 3000 }
    ],

    geographicData: [
      { area: 'Downtown SF', jobs: 89, revenue: 19500, avgDistance: 8, preference: 'high' },
      { area: 'Mission District', jobs: 67, revenue: 14200, avgDistance: 12, preference: 'high' },
      { area: 'Castro', jobs: 45, revenue: 9800, avgDistance: 10, preference: 'medium' },
      { area: 'SOMA', jobs: 78, revenue: 16800, avgDistance: 15, preference: 'high' },
      { area: 'Richmond', jobs: 34, revenue: 7200, avgDistance: 22, preference: 'low' },
      { area: 'Sunset', jobs: 29, revenue: 5900, avgDistance: 25, preference: 'low' }
    ],

    customerInsights: {
      newCustomers: 89,
      returningCustomers: 78,
      customerSatisfaction: 97.8,
      complaintRate: 0.8,
      referralRate: 34.5,
      averageCustomerValue: 450
    },

    recentJobs: [
      {
        id: '1',
        title: 'Kitchen Faucet Repair',
        customer: 'Sarah M.',
        area: 'Mission District',
        service: 'Plumbing',
        duration: '1.5 hours',
        earnings: 185,
        rating: 5,
        date: '2024-01-22',
        status: 'completed'
      },
      {
        id: '2',
        title: 'Light Fixture Installation',
        customer: 'John D.',
        area: 'SOMA',
        service: 'Electrical',
        duration: '2 hours',
        earnings: 225,
        rating: 5,
        date: '2024-01-22',
        status: 'completed'
      },
      {
        id: '3',
        title: 'Deck Repair',
        customer: 'Maria L.',
        area: 'Castro',
        service: 'Carpentry',
        duration: '4 hours',
        earnings: 420,
        rating: 5,
        date: '2024-01-21',
        status: 'completed'
      }
    ],

    upcomingJobs: [
      {
        id: '4',
        title: 'Bathroom Tile Replacement',
        customer: 'Robert K.',
        area: 'Downtown SF',
        service: 'General',
        scheduledTime: '2024-01-25 10:00 AM',
        estimatedDuration: '3-4 hours',
        estimatedEarnings: 380,
        status: 'confirmed'
      }
    ],

    tools: [
      { name: 'Drill Set', condition: 'Excellent', lastMaintenance: '2024-01-10' },
      { name: 'Pipe Wrench Kit', condition: 'Good', lastMaintenance: '2024-01-05' },
      { name: 'Electrical Tester', condition: 'Excellent', lastMaintenance: '2024-01-15' },
      { name: 'Paint Sprayer', condition: 'Fair', lastMaintenance: '2023-12-20' }
    ]
  };
}

interface LocalGigAnalyticsHubProps {
  profileData?: Partial<UserProfileData>;
}

export function LocalGigAnalyticsHub({ profileData }: LocalGigAnalyticsHubProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');

  // Generate local gig worker analytics
  const gigData = useMemo(() => 
    generateLocalGigData(profileData), [profileData]
  );

  return (
    <div className="space-y-6">
      {/* Local Gig Header - Orange/Teal Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Local Service Analytics
          </h1>
          <p className="text-muted-foreground flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Serving {gigData.serviceArea} • {gigData.yearsActive} years experience</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-red-500">
            <Wrench className="h-3 w-3 mr-1" />
            {gigData.primaryServices.length} Services
          </Badge>
          <Button variant="outline" size="sm">
            <Navigation className="h-4 w-4 mr-2" />
            Service Map
          </Button>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="1w">This Week</option>
            <option value="1m">This Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* Local Gig Key Metrics - Orange/Teal Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Weekly Earnings</p>
                <p className="text-2xl font-bold text-orange-900">${gigData.performanceMetrics.weeklyEarnings}</p>
                <p className="text-sm text-green-600">+15% from last week</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600 font-medium">Jobs Completed</p>
                <p className="text-2xl font-bold text-teal-900">{gigData.performanceMetrics.jobsCompleted}</p>
                <p className="text-sm text-teal-600">{gigData.performanceMetrics.completionRate}% completion rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Customer Rating</p>
                <p className="text-2xl font-bold text-green-900">{gigData.performanceMetrics.averageRating}</p>
                <p className="text-sm text-green-600">From 156 reviews</p>
              </div>
              <Star className="h-8 w-8 text-green-500 fill-current" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Response Time</p>
                <p className="text-2xl font-bold text-blue-900">{gigData.performanceMetrics.responseTime}</p>
                <p className="text-sm text-blue-600">Industry leading</p>
              </div>
              <Timer className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Local Gig Tabs - Orange Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-orange-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Schedule & Jobs
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Service Areas
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Tools & Equipment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance - Orange Theme */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-800">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    <span>Weekly Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gigData.weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                        <XAxis dataKey="day" stroke="#c2410c" />
                        <YAxis stroke="#c2410c" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="earnings" fill="#f97316" name="Daily Earnings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Service Breakdown - Teal Theme */}
              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal-800">
                    <Wrench className="h-5 w-5 text-teal-600" />
                    <span>Service Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gigData.serviceBreakdown.slice(0, 4).map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-teal-900">{service.service}</span>
                            <Badge variant="outline" className="border-teal-300 text-teal-700">
                              {service.rating}★
                            </Badge>
                          </div>
                          <span className="text-sm text-teal-600">${service.revenue.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(service.revenue / Math.max(...gigData.serviceBreakdown.map(s => s.revenue))) * 100} 
                          className="h-2 bg-teal-100" 
                        />
                        <div className="flex justify-between text-xs text-teal-600">
                          <span>{service.jobs} jobs</span>
                          <span>Avg: ${service.avgPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Jobs */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span>Recent Jobs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gigData.recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-green-900">{job.title}</span>
                          <Badge variant="secondary" className="bg-green-200 text-green-800">
                            {job.service}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-green-700">
                          <span>Customer: {job.customer}</span>
                          <span>Area: {job.area}</span>
                          <span>Duration: {job.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-green-600">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{job.rating}.0</span>
                          <span>•</span>
                          <span>{job.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">${job.earnings}</div>
                        <Badge className="bg-green-600">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Insights */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Customer Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-blue-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-blue-600">{gigData.customerInsights.newCustomers}</div>
                    <div className="text-sm text-blue-500">New Customers</div>
                  </div>
                  <div className="text-center p-4 border border-blue-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-blue-600">{gigData.customerInsights.returningCustomers}</div>
                    <div className="text-sm text-blue-500">Returning Customers</div>
                  </div>
                  <div className="text-center p-4 border border-blue-200 rounded-lg bg-white">
                    <div className="text-2xl font-bold text-blue-600">{gigData.customerInsights.referralRate}%</div>
                    <div className="text-sm text-blue-500">Referral Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">Peak Hours Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={gigData.peakHoursData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                        <XAxis dataKey="hour" stroke="#c2410c" />
                        <YAxis stroke="#c2410c" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="jobs" 
                          stroke="#f97316" 
                          fill="#f97316"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-800">Upcoming Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gigData.upcomingJobs.map((job) => (
                      <div key={job.id} className="p-4 border border-teal-200 rounded-lg bg-teal-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-teal-900">{job.title}</span>
                          <Badge className="bg-teal-600">Confirmed</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-teal-700">
                          <div>Customer: {job.customer}</div>
                          <div>Service: {job.service}</div>
                          <div>Scheduled: {job.scheduledTime}</div>
                          <div>Duration: {job.estimatedDuration}</div>
                          <div className="font-medium">Est. Earnings: ${job.estimatedEarnings}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Service Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gigData.serviceBreakdown.map((service, index) => (
                    <Card key={index} className="border-orange-100 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-orange-900">{service.service}</span>
                          {service.service === 'Plumbing' && <Wrench className="h-5 w-5 text-orange-600" />}
                          {service.service === 'Electrical' && <Zap className="h-5 w-5 text-orange-600" />}
                          {service.service === 'Carpentry' && <Hammer className="h-5 w-5 text-orange-600" />}
                          {service.service === 'Painting' && <Paintbrush className="h-5 w-5 text-orange-600" />}
                          {service.service === 'General Handyman' && <HardHat className="h-5 w-5 text-orange-600" />}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-700">Jobs:</span>
                            <span className="text-orange-600 font-medium">{service.jobs}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-700">Revenue:</span>
                            <span className="text-orange-600 font-medium">${service.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-700">Avg Price:</span>
                            <span className="text-orange-600 font-medium">${service.avgPrice}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-700">Rating:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-orange-500 fill-current" />
                              <span className="text-orange-600 font-medium">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card className="border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-800">Service Area Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gigData.geographicData.map((area, index) => (
                    <div key={index} className="p-4 border border-teal-200 rounded-lg bg-teal-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-teal-900">{area.area}</span>
                          <Badge 
                            variant={area.preference === 'high' ? 'default' : area.preference === 'medium' ? 'secondary' : 'outline'}
                            className={area.preference === 'high' ? 'bg-teal-600' : ''}
                          >
                            {area.preference} preference
                          </Badge>
                        </div>
                        <span className="text-sm text-teal-600">{area.avgDistance} mi avg</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-teal-800">{area.jobs}</div>
                          <div className="text-teal-600">Jobs</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-teal-800">${area.revenue.toLocaleString()}</div>
                          <div className="text-teal-600">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-teal-800">${Math.round(area.revenue / area.jobs)}</div>
                          <div className="text-teal-600">Avg Job</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Tools & Equipment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gigData.tools.map((tool, index) => (
                    <div key={index} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-orange-900">{tool.name}</span>
                        <Badge 
                          variant={tool.condition === 'Excellent' ? 'default' : tool.condition === 'Good' ? 'secondary' : 'destructive'}
                          className={tool.condition === 'Excellent' ? 'bg-orange-600' : ''}
                        >
                          {tool.condition}
                        </Badge>
                      </div>
                      <div className="text-sm text-orange-700">
                        Last Maintenance: {tool.lastMaintenance}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Wrench className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}