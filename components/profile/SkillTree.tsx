import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Award,
  Star,
  Lock,
  CheckCircle,
  Target,
  Zap,
  BookOpen,
  TrendingUp,
  Clock,
  Users,
  Lightbulb,
  Rocket,
  Crown,
  Shield,
  Plus,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  progress: number;
  verified: boolean;
  prerequisites: string[];
  unlocks: string[];
  estimatedTime: string;
  marketDemand: 'low' | 'medium' | 'high' | 'very-high';
  salary_impact: number;
  description: string;
  resources: {
    type: 'course' | 'tutorial' | 'practice' | 'certification';
    title: string;
    provider: string;
    duration: string;
    free: boolean;
  }[];
}

const SKILL_TREE_DATA: Skill[] = [
  {
    id: 'html-css',
    name: 'HTML & CSS',
    category: 'Frontend Fundamentals',
    level: 'expert',
    progress: 100,
    verified: true,
    prerequisites: [],
    unlocks: ['javascript', 'responsive-design'],
    estimatedTime: '40 hours',
    marketDemand: 'high',
    salary_impact: 15,
    description: 'Master the foundation of web development with semantic HTML and modern CSS.',
    resources: [
      { type: 'course', title: 'Complete HTML/CSS Course', provider: 'Strot Academy', duration: '20h', free: true },
      { type: 'practice', title: 'CSS Grid & Flexbox Lab', provider: 'CodePen', duration: '5h', free: true }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    level: 'advanced',
    progress: 85,
    verified: true,
    prerequisites: ['html-css'],
    unlocks: ['react', 'nodejs', 'typescript'],
    estimatedTime: '80 hours',
    marketDemand: 'very-high',
    salary_impact: 35,
    description: 'Core programming language for interactive web applications.',
    resources: [
      { type: 'course', title: 'JavaScript Complete Guide', provider: 'Tech Academy', duration: '40h', free: false },
      { type: 'practice', title: 'JS Algorithm Challenges', provider: 'CodeWars', duration: '20h', free: true }
    ]
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend Frameworks',
    level: 'intermediate',
    progress: 65,
    verified: false,
    prerequisites: ['javascript'],
    unlocks: ['react-native', 'nextjs', 'state-management'],
    estimatedTime: '60 hours',
    marketDemand: 'very-high',
    salary_impact: 45,
    description: 'Popular library for building user interfaces with components.',
    resources: [
      { type: 'course', title: 'React Developer Course', provider: 'Meta', duration: '30h', free: false },
      { type: 'tutorial', title: 'React Hooks Deep Dive', provider: 'YouTube', duration: '8h', free: true }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    level: 'beginner',
    progress: 25,
    verified: false,
    prerequisites: ['javascript'],
    unlocks: ['advanced-react', 'backend-frameworks'],
    estimatedTime: '45 hours',
    marketDemand: 'high',
    salary_impact: 25,
    description: 'Typed superset of JavaScript for better code quality.',
    resources: [
      { type: 'course', title: 'TypeScript Fundamentals', provider: 'Microsoft', duration: '25h', free: true },
      { type: 'practice', title: 'TypeScript Exercises', provider: 'GitHub', duration: '10h', free: true }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Development',
    level: 'beginner',
    progress: 30,
    verified: false,
    prerequisites: ['javascript'],
    unlocks: ['express', 'databases', 'api-development'],
    estimatedTime: '50 hours',
    marketDemand: 'high',
    salary_impact: 40,
    description: 'Server-side JavaScript runtime for backend development.',
    resources: [
      { type: 'course', title: 'Node.js Complete Course', provider: 'Udemy', duration: '30h', free: false },
      { type: 'tutorial', title: 'Build REST APIs', provider: 'FreeCodeCamp', duration: '12h', free: true }
    ]
  },
  {
    id: 'databases',
    name: 'Database Design',
    category: 'Backend Development',
    level: 'beginner',
    progress: 0,
    verified: false,
    prerequisites: ['nodejs'],
    unlocks: ['full-stack', 'data-analysis'],
    estimatedTime: '40 hours',
    marketDemand: 'high',
    salary_impact: 30,
    description: 'Design and manage relational and NoSQL databases.',
    resources: [
      { type: 'course', title: 'Database Fundamentals', provider: 'MongoDB University', duration: '20h', free: true },
      { type: 'certification', title: 'SQL Certification', provider: 'Oracle', duration: '15h', free: false }
    ]
  }
];

const CATEGORIES = [
  { name: 'Frontend Fundamentals', color: 'bg-blue-100 text-blue-800', icon: Award },
  { name: 'Programming Languages', color: 'bg-green-100 text-green-800', icon: Zap },
  { name: 'Frontend Frameworks', color: 'bg-purple-100 text-purple-800', icon: Rocket },
  { name: 'Backend Development', color: 'bg-orange-100 text-orange-800', icon: Shield }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-gray-100 text-gray-800';
    case 'intermediate': return 'bg-blue-100 text-blue-800';
    case 'advanced': return 'bg-purple-100 text-purple-800';
    case 'expert': return 'bg-orange-100 text-orange-800';
    case 'master': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'beginner': return Target;
    case 'intermediate': return BookOpen;
    case 'advanced': return TrendingUp;
    case 'expert': return Crown;
    case 'master': return Star;
    default: return Target;
  }
};

const getMarketDemandColor = (demand: string) => {
  switch (demand) {
    case 'low': return 'text-gray-500';
    case 'medium': return 'text-blue-500';
    case 'high': return 'text-green-500';
    case 'very-high': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

export function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = selectedCategory === 'all' 
    ? SKILL_TREE_DATA 
    : SKILL_TREE_DATA.filter(skill => skill.category === selectedCategory);

  const isSkillUnlocked = (skill: Skill) => {
    return skill.prerequisites.every(prereqId => {
      const prereq = SKILL_TREE_DATA.find(s => s.id === prereqId);
      return prereq && prereq.progress >= 75;
    });
  };

  const getOverallProgress = () => {
    const totalProgress = SKILL_TREE_DATA.reduce((sum, skill) => sum + skill.progress, 0);
    return Math.round(totalProgress / SKILL_TREE_DATA.length);
  };

  const getVerifiedSkillsCount = () => {
    return SKILL_TREE_DATA.filter(skill => skill.verified).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ScrollAnimatedSection animation="fadeUp">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-chart-1/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Skill Tree</h2>
              <p className="text-muted-foreground">
                Track your learning progress and unlock new opportunities
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{getOverallProgress()}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-semibold">{SKILL_TREE_DATA.length}</div>
              <div className="text-sm text-muted-foreground">Total Skills</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-green-600">{getVerifiedSkillsCount()}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-blue-600">
                {SKILL_TREE_DATA.filter(s => s.progress > 0 && s.progress < 100).length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-purple-600">
                {SKILL_TREE_DATA.filter(s => s.level === 'expert' || s.level === 'master').length}
              </div>
              <div className="text-sm text-muted-foreground">Expert+</div>
            </div>
          </div>
        </Card>
      </ScrollAnimatedSection>

      {/* Category Filter */}
      <ScrollAnimatedSection animation="fadeUp">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All Skills
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.name)}
              size="sm"
              className="gap-2"
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollAnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Tree Visualization */}
        <div className="lg:col-span-2">
          <ScrollAnimatedSection animation="fadeUp">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Skill Progression Map</h3>
              
              <div className="space-y-6">
                {CATEGORIES.map((category) => {
                  const categorySkills = filteredSkills.filter(skill => skill.category === category.name);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category.name} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <category.icon className="w-5 h-5" />
                        <h4 className="font-semibold">{category.name}</h4>
                        <Badge className={category.color}>
                          {categorySkills.length} skills
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categorySkills.map((skill, index) => {
                          const LevelIcon = getLevelIcon(skill.level);
                          const isUnlocked = isSkillUnlocked(skill);
                          
                          return (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className={`cursor-pointer transition-all ${
                                !isUnlocked ? 'opacity-50' : ''
                              }`}
                              onClick={() => setSelectedSkill(skill)}
                            >
                              <Card className={`p-4 border-2 ${
                                selectedSkill?.id === skill.id ? 'border-primary' : 'border-border'
                              } ${!isUnlocked ? 'bg-muted/30' : ''}`}>
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    {!isUnlocked ? (
                                      <Lock className="w-5 h-5 text-muted-foreground" />
                                    ) : skill.verified ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <LevelIcon className="w-5 h-5 text-primary" />
                                    )}
                                    <span className="font-medium">{skill.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Badge className={getLevelColor(skill.level)} variant="secondary">
                                      {skill.level}
                                    </Badge>
                                    {skill.verified && (
                                      <Badge variant="default" className="bg-green-500 text-white">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <Progress value={skill.progress} className="mb-3" />
                                
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {skill.progress}% complete
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className={`w-4 h-4 ${getMarketDemandColor(skill.marketDemand)}`} />
                                    <span className={`text-xs ${getMarketDemandColor(skill.marketDemand)}`}>
                                      {skill.marketDemand.replace('-', ' ')} demand
                                    </span>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </ScrollAnimatedSection>
        </div>

        {/* Skill Details Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{selectedSkill.name}</h3>
                      <Badge className={getLevelColor(selectedSkill.level)}>
                        {selectedSkill.level}
                      </Badge>
                    </div>
                    {selectedSkill.verified && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedSkill.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedSkill.progress}%</span>
                      </div>
                      <Progress value={selectedSkill.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Time to Master</span>
                        <div className="font-medium">{selectedSkill.estimatedTime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salary Impact</span>
                        <div className="font-medium text-green-600">+{selectedSkill.salary_impact}%</div>
                      </div>
                    </div>

                    {selectedSkill.prerequisites.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Prerequisites</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedSkill.prerequisites.map(prereqId => {
                            const prereq = SKILL_TREE_DATA.find(s => s.id === prereqId);
                            return prereq ? (
                              <Badge key={prereqId} variant="outline" className="text-xs">
                                {prereq.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {selectedSkill.unlocks.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Unlocks</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedSkill.unlocks.map(unlockId => {
                            const unlock = SKILL_TREE_DATA.find(s => s.id === unlockId);
                            return unlock ? (
                              <Badge key={unlockId} variant="secondary" className="text-xs">
                                {unlock.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-sm text-muted-foreground">Learning Resources</span>
                      <div className="space-y-2 mt-2">
                        {selectedSkill.resources.map((resource, index) => (
                          <div key={index} className="p-2 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{resource.title}</span>
                              </div>
                              {resource.free && (
                                <Badge variant="outline" className="text-xs">Free</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {resource.provider} • {resource.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                      {!selectedSkill.verified && selectedSkill.progress >= 80 && (
                        <Button variant="outline" className="w-full">
                          <Award className="w-4 h-4 mr-2" />
                          Take Verification Test
                        </Button>
                      )}
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
                  <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Skill</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on any skill to view details, progress, and learning resources.
                  </p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Skill
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommendations */}
          <ScrollAnimatedSection animation="fadeUp">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recommended Next Steps</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Complete TypeScript</span>
                  </div>
                  <p className="text-xs text-muted-foreground">75% remaining • High market demand</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Get React Certified</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Boost profile credibility</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Rocket className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Learn Node.js</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Unlock full-stack development</p>
                </div>
              </div>
            </Card>
          </ScrollAnimatedSection>
        </div>
      </div>
    </div>
  );
}