import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Car,
  Home,
  Utensils,
  Hammer,
  Scissors,
  Paintbrush,
  ArrowLeft,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Package,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Phone,
  Timer
} from 'lucide-react';
import { ScrollAnimatedSection } from './ScrollAnimatedSection';

interface LocalTaskHubProps {
  onNavigate: (page: string) => void;
}

const SERVICE_CATEGORIES = [
  {
    id: 'delivery',
    name: 'Delivery Services',
    icon: Package,
    count: 1247,
    avgPay: '$18/hr',
    growth: '+32%',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    description: 'Food delivery, package pickup, grocery shopping',
    services: ['Food Delivery', 'Package Delivery', 'Grocery Shopping', 'Pharmacy Runs'],
    demandLevel: 'Very High',
    avgDistance: '2.5 miles',
    peakHours: '11AM-2PM, 5PM-9PM'
  },
  {
    id: 'handyman',
    name: 'Handyman Services',
    icon: Hammer,
    count: 892,
    avgPay: '$25/hr',
    growth: '+28%',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    description: 'Furniture assembly, basic repairs, installations',
    services: ['Furniture Assembly', 'Basic Repairs', 'Installations', 'Maintenance'],
    demandLevel: 'High',
    avgDistance: '5 miles',
    peakHours: '9AM-5PM'
  },
  {
    id: 'cleaning',
    name: 'Cleaning Services',
    icon: Home,
    count: 634,
    avgPay: '$22/hr',
    growth: '+25%',
    color: 'bg-green-50 text-green-600 border-green-200',
    description: 'House cleaning, office cleaning, post-event cleanup',
    services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Move-in/out'],
    demandLevel: 'High',
    avgDistance: '3 miles',
    peakHours: '9AM-3PM'
  },
  {
    id: 'lawn-care',
    name: 'Lawn & Garden',
    icon: Scissors,
    count: 456,
    avgPay: '$20/hr',
    growth: '+22%',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    description: 'Lawn mowing, gardening, yard maintenance',
    services: ['Lawn Mowing', 'Gardening', 'Yard Cleanup', 'Tree Trimming'],
    demandLevel: 'Seasonal',
    avgDistance: '4 miles',
    peakHours: '8AM-6PM'
  },
  {
    id: 'pet-care',
    name: 'Pet Services',
    icon: Heart,
    count: 723,
    avgPay: '$16/hr',
    growth: '+35%',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    description: 'Dog walking, pet sitting, pet transportation',
    services: ['Dog Walking', 'Pet Sitting', 'Pet Transportation', 'Pet Grooming'],
    demandLevel: 'High',
    avgDistance: '2 miles',
    peakHours: '7AM-9AM, 5PM-8PM'
  },
  {
    id: 'moving',
    name: 'Moving Help',
    icon: Car,
    count: 321,
    avgPay: '$30/hr',
    growth: '+18%',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    description: 'Moving assistance, furniture transport, loading/unloading',
    services: ['Moving Help', 'Furniture Transport', 'Loading/Unloading', 'Packing'],
    demandLevel: 'Medium',
    avgDistance: '8 miles',
    peakHours: 'Weekends'
  }
];

const NEARBY_TASKS = [
  {
    id: '1',
    title: 'Grocery Shopping at Safeway',
    description: 'Need someone to pick up groceries for elderly neighbor. List provided, payment via app.',
    category: 'Delivery Services',
    location: 'Downtown SF',
    distance: '0.8 miles',
    estimatedTime: '45 min',
    payment: '$25 + tips',
    urgency: 'High',
    client: {
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop',
      rating: 4.9,
      completedTasks: 45,
      verified: true,
      lastActive: '5 min ago'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 15),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 2),
    requirements: ['Own transportation', 'Phone for communication'],
    featured: true,
    responseTime: '< 10 min',
    tips: 'Usually tips well',
    difficulty: 'Easy'
  },
  {
    id: '2',
    title: 'IKEA Desk Assembly',
    description: 'Need help assembling a large IKEA desk. All tools provided. Should take about 2 hours.',
    category: 'Handyman Services',
    location: 'Mission Bay',
    distance: '1.2 miles',
    estimatedTime: '2 hours',
    payment: '$50',
    urgency: 'Medium',
    client: {
      name: 'Mike R.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      rating: 4.7,
      completedTasks: 28,
      verified: true,
      lastActive: '1 hour ago'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 60),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 8),
    requirements: ['Basic tool knowledge', 'English speaking'],
    featured: false,
    responseTime: '< 30 min',
    tips: 'Provides refreshments',
    difficulty: 'Medium'
  },
  {
    id: '3',
    title: 'Dog Walking - Golden Retriever',
    description: 'Need someone to walk my friendly Golden Retriever for 30 minutes. Very well behaved.',
    category: 'Pet Services',
    location: 'Castro District',
    distance: '0.6 miles',
    estimatedTime: '30 min',
    payment: '$20',
    urgency: 'Low',
    client: {
      name: 'Emma L.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5.0,
      completedTasks: 67,
      verified: true,
      lastActive: '10 min ago'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 30),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 4),
    requirements: ['Experience with dogs', 'Available insurance'],
    featured: false,
    responseTime: '< 5 min',
    tips: 'Regular weekly booking available',
    difficulty: 'Easy'
  }
];

export function LocalTaskHub({ onNavigate }: LocalTaskHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationRadius, setLocationRadius] = useState('5');

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours < 1) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="w-8 h-8 p-1 sm:w-auto sm:h-auto sm:p-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">Local Tasks</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Quick tasks & local services
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Badge variant="outline" className="text-xs hidden sm:flex">
                <Navigation className="w-3 h-3 mr-1" />
                Within {locationRadius} miles
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Search & Location */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="sm:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search local tasks by type, location, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select 
                value={locationRadius}
                onChange={(e) => setLocationRadius(e.target.value)}
                className="w-full h-12 pl-10 pr-4 border rounded-lg bg-background"
              >
                <option value="1">Within 1 mile</option>
                <option value="3">Within 3 miles</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
              </select>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* Service Categories */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {SERVICE_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className="cursor-pointer"
              >
                <Card className={`p-4 sm:p-6 hover:shadow-lg transition-all border-2 ${
                  selectedCategory === category.id ? category.color : 'border-border'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base mb-1">{category.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                        <div>
                          <span className="text-muted-foreground">Tasks:</span>
                          <span className="font-medium ml-1">{category.count}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Pay:</span>
                          <span className="font-medium ml-1">{category.avgPay}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Distance:</span>
                          <span className="font-medium ml-1">{category.avgDistance}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Peak:</span>
                          <span className="font-medium ml-1">{category.peakHours}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {category.demandLevel}
                        </Badge>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs font-medium">{category.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimatedSection>

        {/* Nearby Tasks */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Nearby Tasks</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time updates
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {NEARBY_TASKS.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
                    {task.featured && (
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <Badge variant="default" className="bg-yellow-500 text-white text-xs">
                          Urgent Task
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base mb-2">{task.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                      <Badge 
                        variant={task.urgency === 'High' ? 'destructive' : task.urgency === 'Medium' ? 'default' : 'secondary'} 
                        className="text-xs ml-2 flex-shrink-0"
                      >
                        {task.urgency}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-blue-500" />
                        <span>{task.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        <span>{task.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 font-semibold">{task.payment}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-muted-foreground mb-2 block">Requirements:</span>
                      <div className="flex flex-wrap gap-1">
                        {task.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={task.client.avatar} />
                        <AvatarFallback>{task.client.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{task.client.name}</span>
                          {task.client.verified && (
                            <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{task.client.rating}</span>
                          <span>•</span>
                          <span>{task.client.completedTasks} tasks</span>
                          <span>•</span>
                          <span>Active {task.client.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Response:</span>
                          <span className="font-medium ml-1 text-green-600">{task.responseTime}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Difficulty:</span>
                          <span className="font-medium ml-1">{task.difficulty}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-blue-600">💡 {task.tips}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Posted {formatTime(task.postedTime)} • Due in {Math.ceil((task.deadline.getTime() - Date.now()) / (1000 * 60 * 60))}h
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" className="text-xs h-7">
                          <Timer className="w-3 h-3 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* Local Stats */}
        <ScrollAnimatedSection animation="fadeUp">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">3.2k</div>
              <div className="text-sm text-muted-foreground">Tasks Today</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">$22</div>
              <div className="text-sm text-muted-foreground">Avg Per Hour</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2.5mi</div>
              <div className="text-sm text-muted-foreground">Avg Distance</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </Card>
          </div>
        </ScrollAnimatedSection>
      </div>
    </div>
  );
}