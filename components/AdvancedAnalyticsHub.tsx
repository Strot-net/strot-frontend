import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Target,
  DollarSign,
  Calendar,
  Clock,
  Award,
  Briefcase,
  Star,
  Activity,
  Zap,
  ArrowRight,
  Download,
  Share2,
  RefreshCw,
  Filter,
  ChevronUp,
  ChevronDown,
  Info,
  AlertCircle,
  CheckCircle,
  MapPin,
  Building,
  Globe,
  Sparkles,
  Flame,
  Crown,
  Rocket,
  X
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

interface AnalyticsHubProps {
  onNavigate: (page: string) => void;
}

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: any;
  color: string;
  detailed?: {
    breakdown: { label: string; value: number; percentage: number }[];
    insights: string[];
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

const METRIC_CARDS: MetricCard[] = [
  {
    id: 'profile-views',
    title: 'Profile Views',
    value: '2,847',
    change: '+23.5%',
    trend: 'up',
    description: 'Total profile views this month',
    icon: Eye,
    color: 'text-blue-500',
    detailed: {
      breakdown: [
        { label: 'Direct Search', value: 1420, percentage: 50 },
        { label: 'Job Recommendations', value: 852, percentage: 30 },
        { label: 'Network Discovery', value: 575, percentage: 20 }
      ],
      insights: [
        'Your profile appears in top 10% of search results',
        'Skills optimization increased visibility by 40%',
        'Profile completeness score: 94%'
      ]
    }
  },
  {
    id: 'application-rate',
    title: 'Success Rate',
    value: '34.2%',
    change: '+8.1%',
    trend: 'up',
    description: 'Applications leading to interviews',
    icon: Target,
    color: 'text-green-500',
    detailed: {
      breakdown: [
        { label: 'Technical Roles', value: 42, percentage: 60 },
        { label: 'Leadership Roles', value: 28, percentage: 40 }
      ],
      insights: [
        'Success rate 2x industry average',
        'AI-optimized applications perform 45% better',
        'Best performance: Senior Developer roles'
      ]
    }
  },
  {
    id: 'salary-potential',
    title: 'Salary Potential',
    value: '$142K',
    change: '+$18K',
    trend: 'up',
    description: 'Estimated market value',
    icon: DollarSign,
    color: 'text-purple-500',
    detailed: {
      breakdown: [
        { label: 'Base Salary', value: 120000, percentage: 85 },
        { label: 'Bonuses', value: 22000, percentage: 15 }
      ],
      insights: [
        'Top 15% in your field and location',
        'Skills premium: +$25K for AI expertise',
        '3 companies interested at this range'
      ]
    }
  },
  {
    id: 'network-growth',
    title: 'Network Growth',
    value: '156',
    change: '+42',
    trend: 'up',
    description: 'Professional connections',
    icon: Users,
    color: 'text-orange-500',
    detailed: {
      breakdown: [
        { label: 'Industry Peers', value: 89, percentage: 57 },
        { label: 'Recruiters', value: 34, percentage: 22 },
        { label: 'Mentors', value: 33, percentage: 21 }
      ],
      insights: [
        'Network quality score: 8.7/10',
        'Referral potential increased by 60%',
        '12 potential mentorship opportunities'
      ]
    }
  },
  {
    id: 'skill-ranking',
    title: 'Skill Ranking',
    value: 'Top 5%',
    change: '+2 ranks',
    trend: 'up',
    description: 'React.js expertise ranking',
    icon: Award,
    color: 'text-yellow-500',
    detailed: {
      breakdown: [
        { label: 'Technical Skills', value: 95, percentage: 95 },
        { label: 'Soft Skills', value: 87, percentage: 87 },
        { label: 'Leadership', value: 78, percentage: 78 }
      ],
      insights: [
        'Verified expert in 8 technologies',
        'Teaching others boosts your ranking',
        'Contributing to open source recommended'
      ]
    }
  },
  {
    id: 'market-demand',
    title: 'Market Demand',
    value: 'Very High',
    change: '+15%',
    trend: 'up',
    description: 'Demand for your skill set',
    icon: Flame,
    color: 'text-red-500',
    detailed: {
      breakdown: [
        { label: 'Remote Jobs', value: 234, percentage: 65 },
        { label: 'On-site Jobs', value: 89, percentage: 25 },
        { label: 'Hybrid Jobs', value: 36, percentage: 10 }
      ],
      insights: [
        '360 new jobs posted this week',
        'Remote opportunities increased 45%',
        'Average salary up 12% YoY'
      ]
    }
  }
];

const PERFORMANCE_DATA: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Profile Views',
      data: [1200, 1450, 1800, 2100, 2400, 2847],
      color: '#3b82f6'
    },
    {
      label: 'Applications',
      data: [8, 12, 15, 18, 22, 26],
      color: '#10b981'
    },
    {
      label: 'Interviews',
      data: [2, 4, 5, 6, 8, 9],
      color: '#f59e0b'
    }
  ]
};

const LOCATION_INSIGHTS = [
  { city: 'San Francisco', jobs: 1240, avgSalary: '$165K', growth: '+12%' },
  { city: 'Seattle', jobs: 890, avgSalary: '$142K', growth: '+8%' },
  { city: 'New York', jobs: 1560, avgSalary: '$155K', growth: '+15%' },
  { city: 'Austin', jobs: 670, avgSalary: '$128K', growth: '+22%' },
  { city: 'Remote', jobs: 2340, avgSalary: '$138K', growth: '+45%' }
];

const INDUSTRY_TRENDS = [
  { industry: 'AI/ML', demand: 98, growth: '+67%', avgSalary: '$180K' },
  { industry: 'Web3/Blockchain', demand: 89, growth: '+45%', avgSalary: '$165K' },
  { industry: 'Cloud Computing', demand: 92, growth: '+34%', avgSalary: '$155K' },
  { industry: 'Cybersecurity', demand: 85, growth: '+28%', avgSalary: '$145K' },
  { industry: 'DevOps', demand: 88, growth: '+25%', avgSalary: '$140K' }
];

const RECOMMENDATIONS = [
  {
    type: 'skill',
    title: 'Learn TypeScript',
    impact: 'High',
    description: 'Could increase job matches by 40% and salary by $15K',
    action: 'Start Course',
    priority: 'high'
  },
  {
    type: 'network',
    title: 'Connect with Tech Leads',
    impact: 'Medium',
    description: 'Expand network in senior technical roles',
    action: 'Find Connections',
    priority: 'medium'
  },
  {
    type: 'profile',
    title: 'Add Portfolio Project',
    impact: 'High',
    description: 'Showcase full-stack capabilities with recent project',
    action: 'Upload Project',
    priority: 'high'
  }
];

export function AdvancedAnalyticsHub({ onNavigate }: AnalyticsHubProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState<MetricCard | null>(null);
  const [isRealTime, setIsRealTime] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTime) return;
    
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      console.log('Updating real-time metrics...');
    }, 10000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold truncate">Analytics Hub</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Deep insights into your career performance
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-20 sm:w-32 h-8 sm:h-10 text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1M</SelectItem>
                  <SelectItem value="3m">3M</SelectItem>
                  <SelectItem value="6m">6M</SelectItem>
                  <SelectItem value="1y">1Y</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-10">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setIsRealTime(!isRealTime)} className="text-xs sm:text-sm h-8 sm:h-10">
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${isRealTime ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isRealTime ? 'Live' : 'Paused'}</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-24">
        {/* Mobile-optimized Key Metrics Grid */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {METRIC_CARDS.map((metric, index) => {
              const TrendIcon = getTrendIcon(metric.trend);
              
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedMetric(metric)}
                >
                  <Card className="p-3 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between mb-2 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0`}>
                          <metric.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${metric.color}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground truncate">{metric.title}</h3>
                          <div className="text-lg sm:text-2xl font-bold truncate">{metric.value}</div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)} flex-shrink-0`}>
                        <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{metric.description}</p>
                    
                    {isRealTime && (
                      <div className="mt-2 sm:mt-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Real-time</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </ScrollAnimatedSection>

        {/* Mobile-optimized Main Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-5 w-full min-w-[400px] h-10 sm:h-12">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
              <TabsTrigger value="market" className="text-xs sm:text-sm">Market</TabsTrigger>
              <TabsTrigger value="predictions" className="text-xs sm:text-sm">AI Insights</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm">Reports</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab - Mobile optimized */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold">Career Performance Trends</h3>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Customize</span>
                      </Button>
                    </div>
                    
                    {/* Mobile-optimized Chart Visualization */}
                    <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary/5 to-chart-1/5 rounded-lg p-3 sm:p-4">
                      <div className="flex items-end justify-between h-full">
                        {PERFORMANCE_DATA.labels.map((label, index) => (
                          <div key={label} className="flex flex-col items-center flex-1">
                            <div className="w-full max-w-6 sm:max-w-8 mb-2">
                              {PERFORMANCE_DATA.datasets.map((dataset, dsIndex) => (
                                <motion.div
                                  key={dsIndex}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${(dataset.data[index] / Math.max(...dataset.data)) * 100}%` }}
                                  transition={{ delay: index * 0.1 + dsIndex * 0.05 }}
                                  className={`w-full mb-1 rounded-sm`}
                                  style={{ backgroundColor: dataset.color }}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4">
                      {PERFORMANCE_DATA.datasets.map((dataset) => (
                        <div key={dataset.label} className="flex items-center gap-1 sm:gap-2">
                          <div 
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm" 
                            style={{ backgroundColor: dataset.color }}
                          />
                          <span className="text-xs sm:text-sm text-muted-foreground">{dataset.label}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </ScrollAnimatedSection>
              </div>

              {/* AI Recommendations */}
              <div>
                <ScrollAnimatedSection animation="fadeUp">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      <h3 className="text-base sm:text-lg font-semibold">AI Recommendations</h3>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {RECOMMENDATIONS.map((rec, index) => (
                        <motion.div
                          key={rec.type}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            rec.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-xs sm:text-sm">{rec.title}</h4>
                            <Badge variant={rec.impact === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                              {rec.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{rec.description}</p>
                          <Button size="sm" className="w-full text-xs">
                            {rec.action}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </ScrollAnimatedSection>
              </div>
            </div>
          </TabsContent>

          {/* Market Tab - Mobile optimized */}
          <TabsContent value="market" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Location Insights */}
              <ScrollAnimatedSection animation="fadeUp">
                <Card className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    Top Markets for Your Skills
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {LOCATION_INSIGHTS.map((location, index) => (
                      <motion.div
                        key={location.city}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm">{location.city}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {location.jobs} jobs • {location.avgSalary} avg
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`text-xs sm:text-sm font-medium ${location.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {location.growth}
                          </div>
                          <div className="text-xs text-muted-foreground">growth</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </ScrollAnimatedSection>

              {/* Industry Trends */}
              <ScrollAnimatedSection animation="fadeUp">
                <Card className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    Industry Demand Trends
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {INDUSTRY_TRENDS.map((industry, index) => (
                      <motion.div
                        key={industry.industry}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs sm:text-sm">{industry.industry}</span>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm font-medium text-green-600">{industry.growth}</span>
                            <span className="text-xs text-muted-foreground">{industry.avgSalary}</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${industry.demand}%` }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-gradient-to-r from-primary to-chart-1 h-2 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </ScrollAnimatedSection>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="predictions" className="space-y-4 sm:space-y-6">
            <ScrollAnimatedSection animation="fadeUp">
              <Card className="p-6 sm:p-8 text-center">
                <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2">AI-Powered Career Predictions</h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
                  Advanced machine learning algorithms analyze market trends and your profile 
                  to provide personalized career forecasts and optimization strategies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Next 6 Months</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      85% chance of receiving 3+ interview offers with current trajectory
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Salary Projection</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Potential $25K increase with recommended skill additions
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Career Path</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Senior Developer → Tech Lead pathway 78% probability
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4 sm:space-y-6">
            <ScrollAnimatedSection animation="fadeUp">
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Generate Custom Reports</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                    <Download className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm">Performance Report</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm">Market Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2">
                    <Target className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm">Goal Tracking</span>
                  </Button>
                </div>
              </Card>
            </ScrollAnimatedSection>
          </TabsContent>
        </Tabs>

        {/* Mobile-optimized Detailed Metric Modal */}
        <AnimatePresence>
          {selectedMetric && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedMetric(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-lg p-4 sm:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <selectedMetric.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${selectedMetric.color}`} />
                    <h2 className="text-lg sm:text-2xl font-bold">{selectedMetric.title}</h2>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedMetric(null)}>
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>

                {selectedMetric.detailed && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="font-semibold text-sm mb-3 sm:mb-4">Breakdown</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedMetric.detailed.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 sm:w-24 bg-muted rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.percentage}%` }}
                                  transition={{ delay: index * 0.1 }}
                                  className="bg-primary h-2 rounded-full"
                                />
                              </div>
                              <span className="font-medium w-12 sm:w-16 text-right text-sm">{item.value.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-3 sm:mb-4">Key Insights</h3>
                      <div className="space-y-2">
                        {selectedMetric.detailed.insights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}