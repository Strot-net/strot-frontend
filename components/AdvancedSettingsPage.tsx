import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { useAuth } from './auth/AuthProvider';
import { useTheme } from './theme/ThemeProvider';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Download,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Key,
  Trash2,
  LogOut,
  Settings,
  Moon,
  Sun,
  Monitor,
  Camera,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Star,
  Crown,
  Zap,
  Target,
  Activity,
  BarChart3,
  Calendar,
  Clock,
  MapPin,
  Languages,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Trash,
  Plus,
  Minus
} from 'lucide-react';
import { ScrollAnimatedSection, StaggeredList } from './ScrollAnimatedSection';

interface AdvancedSettingsPageProps {
  onNavigate: (page: string) => void;
  userType: 'full-timer' | 'freelancer' | 'local-gig' | 'employer';
  onLogout?: () => void;
}

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
}

export function AdvancedSettingsPage({ onNavigate, userType, onLogout }: AdvancedSettingsPageProps) {
  const { user, logout } = useAuth();
  const { theme: currentTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'UTC-8',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    jobAlerts: true,
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    twoFactorAuth: false,
    loginAlerts: true,
    dataExport: 'monthly',
    autoSave: true
  });

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      onNavigate('landing');
    }
  };

  const sections: SettingSection[] = [
    {
      id: 'profile',
      title: 'Profile & Personal',
      description: 'Manage your personal information and profile settings',
      icon: User,
      color: 'text-blue-600',
      badge: 'Updated'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Control how and when you receive notifications',
      icon: Bell,
      color: 'text-green-600'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Manage your privacy settings and account security',
      icon: Shield,
      color: 'text-red-600',
      badge: 'Important'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize the look and feel of your experience',
      icon: Palette,
      color: 'text-purple-600'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Set your location, language, and other preferences',
      icon: Globe,
      color: 'text-orange-600'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Manage your subscription and payment methods',
      icon: CreditCard,
      color: 'text-indigo-600',
      badge: 'Pro'
    },
    {
      id: 'data',
      title: 'Data & Export',
      description: 'Download your data and manage data preferences',
      icon: Download,
      color: 'text-teal-600'
    }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const renderProfileSettings = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro Member
                </Badge>
              </div>
              <div className="text-muted-foreground">{user?.email}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
                <span>•</span>
                <Clock className="w-4 h-4" />
                Joined March 2024
              </div>
            </div>
          </div>
          
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        {/* Profile Completion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Profile Completion</span>
            <span className="text-sm text-muted-foreground">85%</span>
          </div>
          <Progress value={85} className="h-2 mb-2" />
          <div className="text-sm text-muted-foreground">
            Complete your profile to get better job matches
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal details and contact information
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              defaultValue={user?.name?.split(' ')[0]}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              defaultValue={user?.name?.split(' ')[1]}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <textarea
              id="bio"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md resize-none disabled:opacity-50"
              placeholder="Tell us about your professional background..."
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>

      {/* Professional Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g. Senior Software Engineer"
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Current Company</Label>
            <Input
              id="company"
              placeholder="e.g. TechCorp Inc."
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select disabled={!isEditing}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="2-5">2-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Expected Salary Range</Label>
            <Select disabled={!isEditing}>
              <SelectTrigger>
                <SelectValue placeholder="Select salary range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50-75k">$50k - $75k</SelectItem>
                <SelectItem value="75-100k">$75k - $100k</SelectItem>
                <SelectItem value="100-150k">$100k - $150k</SelectItem>
                <SelectItem value="150k+">$150k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'jobAlerts', label: 'Job Alerts', desc: 'Get notified about new job opportunities' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of your activity and opportunities' },
            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and product updates' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
              <Switch
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive notifications on your device' },
            { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified when someone logs into your account' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
              <Switch
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Who can see your profile?</Label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) => handleSettingChange('profileVisibility', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view</SelectItem>
                <SelectItem value="employers">Employers only</SelectItem>
                <SelectItem value="private">Private - Only you</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show Email Address</div>
              <div className="text-sm text-muted-foreground">Allow others to see your email</div>
            </div>
            <Switch
              checked={settings.showEmail}
              onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show Phone Number</div>
              <div className="text-sm text-muted-foreground">Allow others to see your phone</div>
            </div>
            <Switch
              checked={settings.showPhone}
              onCheckedChange={(checked) => handleSettingChange('showPhone', checked)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
            </div>
            <div className="flex items-center gap-2">
              {settings.twoFactorAuth && (
                <Badge variant="default" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              )}
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Smartphone className="w-4 h-4 mr-2" />
              Manage Devices
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="w-4 h-4 mr-2" />
              Login History
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-destructive/20">
        <h3 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Monitor }
            ].map(theme => (
              <motion.button
                key={theme.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleThemeChange(theme.value as 'light' | 'dark' | 'system')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  currentTheme === theme.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <theme.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">{theme.label}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-save drafts</div>
              <div className="text-sm text-muted-foreground">Automatically save your work</div>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
            />
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-background/95 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <h1 className="text-xl">Settings</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScrollAnimatedSection animation="fadeUp">
              <Card className="p-4 sticky top-24">
                <h2 className="font-semibold mb-4">Settings</h2>
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        activeTab === section.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className={`w-4 h-4 ${
                          activeTab === section.id ? 'text-primary-foreground' : section.color
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{section.title}</div>
                          <div className={`text-xs ${
                            activeTab === section.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {section.description}
                          </div>
                        </div>
                      </div>
                      {section.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </nav>
              </Card>
            </ScrollAnimatedSection>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'profile' && renderProfileSettings()}
                  {activeTab === 'notifications' && renderNotificationSettings()}
                  {activeTab === 'privacy' && renderPrivacySettings()}
                  {activeTab === 'appearance' && renderAppearanceSettings()}
                  {activeTab === 'preferences' && (
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Timezone</Label>
                          <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                              <SelectItem value="UTC+0">UTC</SelectItem>
                              <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  )}
                  {activeTab === 'billing' && (
                    <div className="space-y-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Pro Plan</div>
                            <div className="text-sm text-muted-foreground">$29/month</div>
                          </div>
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                            <Crown className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </Card>
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                        <Button variant="outline">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </Card>
                    </div>
                  )}
                  {activeTab === 'data' && (
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Data Export</h3>
                      <div className="space-y-4">
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download All Data
                        </Button>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </ScrollAnimatedSection>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h3 className="text-lg font-semibold">Delete Account</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                This action cannot be undone. This will permanently delete your account and remove all your data.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    handleLogout();
                  }}
                  className="flex-1"
                >
                  Delete Account
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}