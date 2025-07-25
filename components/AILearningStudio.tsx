import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  GraduationCap,
  Brain,
  Star,
  Play,
  BookOpen,
  Target,
  Award,
  Clock,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  Circle,
  ArrowRight,
  Filter,
  Search,
  Calendar,
  BarChart3,
  Lightbulb,
  Rocket,
  Trophy,
  Medal,
  Bookmark,
  Share2,
  Download,
  MessageSquare,
  ThumbsUp,
  Eye,
  ChevronRight,
  Plus,
  Globe,
  Code,
  Paintbrush,
  Briefcase,
  Database,
  Smartphone,
  Camera,
  Mic,
  PenTool,
  Monitor,
  Headphones,
  Coffee,
  Heart
} from 'lucide-react';

interface AILearningStudioProps {
  onNavigate: (page: string) => void;
}

export function AILearningStudio({ onNavigate }: AILearningStudioProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Learning categories with icons and colors
  const categories = [
    { id: 'all', name: 'All Courses', icon: Globe, color: 'text-gray-600', count: 847 },
    { id: 'tech', name: 'Technology', icon: Code, color: 'text-blue-600', count: 234 },
    { id: 'design', name: 'Design', icon: Paintbrush, color: 'text-purple-600', count: 156 },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'text-green-600', count: 189 },
    { id: 'data', name: 'Data Science', icon: Database, color: 'text-orange-600', count: 98 },
    { id: 'mobile', name: 'Mobile Dev', icon: Smartphone, color: 'text-pink-600', count: 67 },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: 'text-red-600', count: 103 }
  ];

  // Mock user progress data
  const userProgress = {
    totalCourses: 12,
    completedCourses: 8,
    hoursLearned: 147,
    certificatesEarned: 5,
    currentStreak: 15,
    weeklyGoal: 10,
    weeklyProgress: 7.5,
    skillPoints: 2840,
    level: 'Advanced Learner'
  };

  // Featured courses
  const featuredCourses = [
    {
      id: '1',
      title: 'Advanced React Development with TypeScript',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b1089f?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      students: 12456,
      duration: '8 hours',
      level: 'Advanced',
      price: 'FREE',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      category: 'Technology',
      skills: ['React', 'TypeScript', 'Hooks', 'Testing'],
      progress: 65,
      aiRecommended: true,
      trending: true
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Michael Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      students: 8934,
      duration: '12 hours',
      level: 'Beginner',
      price: '$49',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      category: 'Design',
      skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
      progress: 0,
      aiRecommended: true,
      trending: false
    },
    {
      id: '3',
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4.7,
      students: 15678,
      duration: '20 hours',
      level: 'Intermediate',
      price: '$89',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      category: 'Data Science',
      skills: ['Python', 'Pandas', 'Machine Learning', 'Visualization'],
      progress: 25,
      aiRecommended: false,
      trending: true
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      instructor: 'Alex Thompson',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 4.6,
      students: 9876,
      duration: '6 hours',
      level: 'Beginner',
      price: '$39',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      category: 'Marketing',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Strategy'],
      progress: 0,
      aiRecommended: true,
      trending: false
    }
  ];

  // Learning achievements
  const achievements = [
    { id: '1', title: 'First Course Completed', icon: Trophy, color: 'text-yellow-600', earned: true },
    { id: '2', title: '7-Day Learning Streak', icon: Zap, color: 'text-orange-600', earned: true },
    { id: '3', title: 'Technology Master', icon: Code, color: 'text-blue-600', earned: true },
    { id: '4', title: '50 Hours of Learning', icon: Clock, color: 'text-green-600', earned: true },
    { id: '5', title: 'Community Helper', icon: Heart, color: 'text-red-600', earned: false },
    { id: '6', title: 'Course Creator', icon: Lightbulb, color: 'text-purple-600', earned: false }
  ];

  // Current learning path
  const learningPath = [
    { id: '1', title: 'React Fundamentals', completed: true, current: false },
    { id: '2', title: 'Advanced React Patterns', completed: true, current: false },
    { id: '3', title: 'TypeScript Integration', completed: false, current: true },
    { id: '4', title: 'Testing React Apps', completed: false, current: false },
    { id: '5', title: 'Performance Optimization', completed: false, current: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 pb-24">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">AI Learning Studio</h1>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-600">
                    <Brain className="w-3 h-3 mr-1" />
                    AI-Powered Learning
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>{userProgress.currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{userProgress.skillPoints} points</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search Courses
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Welcome Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white"
            >
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  Welcome back to your learning journey! 🚀
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  You're making great progress! Continue your current course or explore new skills with AI-powered recommendations.
                </p>
                <div className="flex items-center space-x-4">
                  <Button 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-white/90"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    AI Recommendations
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Courses Completed', value: userProgress.completedCourses, total: userProgress.totalCourses, icon: BookOpen, color: 'text-blue-600' },
                { label: 'Hours Learned', value: userProgress.hoursLearned, suffix: 'h', icon: Clock, color: 'text-green-600' },
                { label: 'Certificates Earned', value: userProgress.certificatesEarned, icon: Award, color: 'text-purple-600' },
                { label: 'Current Streak', value: userProgress.currentStreak, suffix: ' days', icon: Zap, color: 'text-orange-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground">
                            {stat.value}{stat.suffix || ''}
                            {stat.total && <span className="text-lg text-muted-foreground">/{stat.total}</span>}
                          </p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-blue-600" />
                      <span>Continue Learning</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featuredCourses.filter(course => course.progress > 0).map((course) => (
                        <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex-1">
                                <Progress value={course.progress} className="h-2" />
                              </div>
                              <span className="text-sm text-muted-foreground">{course.progress}%</span>
                            </div>
                          </div>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span>AI Recommendations</span>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Personalized
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {featuredCourses.filter(course => course.aiRecommended).slice(0, 2).map((course) => (
                        <motion.div
                          key={course.id}
                          whileHover={{ y: -4 }}
                          className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <div className="relative">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title}
                              className="w-full h-32 object-cover"
                            />
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Pick
                            </Badge>
                            {course.price === 'FREE' && (
                              <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                                FREE
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-2">{course.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{course.students.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                            <Button size="sm" className="w-full">
                              Start Learning
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Learning Path */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Your Learning Path</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {learningPath.map((step, index) => (
                        <div key={step.id} className="flex items-center space-x-3">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                            ${step.completed 
                              ? 'bg-green-100 text-green-600' 
                              : step.current 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-gray-100 text-gray-400'
                            }
                          `}>
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : step.current ? (
                              <Circle className="w-4 h-4 fill-current" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </div>
                          <span className={`text-sm ${step.current ? 'font-medium' : ''}`}>
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Goal */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Weekly Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeDasharray={`${(userProgress.weeklyProgress / userProgress.weeklyGoal) * 100}, 100`}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-900">
                            {Math.round((userProgress.weeklyProgress / userProgress.weeklyGoal) * 100)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700 mb-2">
                        {userProgress.weeklyProgress} / {userProgress.weeklyGoal} hours this week
                      </p>
                      <p className="text-xs text-blue-600">
                        {userProgress.weeklyGoal - userProgress.weeklyProgress} hours to go!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full bg-current/10 flex items-center justify-center ${achievement.color}`}>
                            <achievement.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{achievement.title}</span>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('achievements')}>
                        View All Achievements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* All Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200">
                    <div className="relative">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {course.aiRecommended && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <Brain className="w-3 h-3 mr-1" />
                            AI Pick
                          </Badge>
                        )}
                        {course.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        {course.price === 'FREE' ? (
                          <Badge className="bg-green-500 text-white">FREE</Badge>
                        ) : (
                          <Badge variant="secondary">{course.price}</Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                          <AvatarFallback>{course.instructor.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{course.instructor}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {course.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      {course.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                          {course.progress > 0 ? 'Continue' : 'Start Learning'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* My Learning Tab */}
          <TabsContent value="my-learning">
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Your Learning Dashboard</h3>
              <p className="text-muted-foreground mb-6">
                Track your progress and manage your enrolled courses
              </p>
              <Button>
                View My Courses
              </Button>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className={`text-center ${achievement.earned ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : 'opacity-60'}`}>
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${achievement.earned ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-200'}`}>
                        <achievement.icon className={`w-8 h-8 ${achievement.earned ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{achievement.title}</h3>
                      {achievement.earned ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Circle className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}