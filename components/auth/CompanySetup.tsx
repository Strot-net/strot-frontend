import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Building,
  Users,
  MapPin,
  Globe,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Award,
  Target,
  TrendingUp,
  Briefcase,
  Star,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Camera,
  Link,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react';

interface CompanySetupProps {
  onComplete: (companyData: CompanyData) => void;
  onSkip: () => void;
  onBack: () => void;
}

export interface CompanyData {
  companyName: string;
  industry: string;
  companySize: string;
  founded: string;
  headquarters: string;
  website: string;
  description: string;
  logo?: string;
  coverImage?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  benefits: string[];
  culture: string[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export function CompanySetup({ onComplete, onSkip, onBack }: CompanySetupProps) {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    industry: '',
    companySize: '',
    founded: '',
    headquarters: '',
    website: '',
    description: '',
    socialLinks: {},
    benefits: [],
    culture: [],
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
    'Construction', 'Transportation', 'Media & Entertainment', 'Government',
    'Non-profit', 'Real Estate', 'Energy', 'Food & Beverage', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ];

  const popularBenefits = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)',
    'Stock Options', 'Remote Work', 'Flexible Hours', 'Unlimited PTO',
    'Gym Membership', 'Learning Budget', 'Free Lunch', 'Childcare',
    'Mental Health Support', 'Commuter Benefits', 'Life Insurance'
  ];

  const cultureValues = [
    'Innovation', 'Collaboration', 'Diversity & Inclusion', 'Work-Life Balance',
    'Growth Mindset', 'Transparency', 'Customer Focus', 'Excellence',
    'Sustainability', 'Entrepreneurial', 'Data-Driven', 'Agile'
  ];

  const updateCompanyData = (key: keyof CompanyData | string, value: any) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setCompanyData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CompanyData],
          [child]: value
        }
      }));
    } else {
      setCompanyData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const toggleArrayItem = (array: string[], item: string, key: keyof CompanyData) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    updateCompanyData(key, newArray);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(companyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Company Profile Setup</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Tell us about your company to attract the best talent
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= stepNum 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-background text-muted-foreground border-muted'
                  }`}>
                    {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-sm text-muted-foreground">
                Step {step} of 3: {
                  step === 1 ? 'Basic Information' :
                  step === 2 ? 'Company Culture' :
                  'Contact & Social'
                }
              </div>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold mb-2">Basic Company Information</h3>
                      <p className="text-muted-foreground">Help candidates learn about your organization</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          placeholder="e.g., TechCorp Inc."
                          value={companyData.companyName}
                          onChange={(e) => updateCompanyData('companyName', e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="website"
                            placeholder="https://yourcompany.com"
                            value={companyData.website}
                            onChange={(e) => updateCompanyData('website', e.target.value)}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select value={companyData.industry} onValueChange={(value) => updateCompanyData('industry', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size *</Label>
                        <Select value={companyData.companySize} onValueChange={(value) => updateCompanyData('companySize', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="founded">Founded</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="founded"
                            placeholder="e.g., 2010"
                            value={companyData.founded}
                            onChange={(e) => updateCompanyData('founded', e.target.value)}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="headquarters">Headquarters</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="headquarters"
                            placeholder="e.g., San Francisco, CA"
                            value={companyData.headquarters}
                            onChange={(e) => updateCompanyData('headquarters', e.target.value)}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Company Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your company, mission, and what makes you unique..."
                        value={companyData.description}
                        onChange={(e) => updateCompanyData('description', e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold mb-2">Company Culture & Benefits</h3>
                      <p className="text-muted-foreground">Showcase what makes your company a great place to work</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label>Employee Benefits</Label>
                        <p className="text-sm text-muted-foreground">Select all benefits you offer</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {popularBenefits.map((benefit) => (
                            <Button
                              key={benefit}
                              variant={companyData.benefits.includes(benefit) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleArrayItem(companyData.benefits, benefit, 'benefits')}
                              className="justify-start"
                            >
                              <Check className={`w-4 h-4 mr-2 ${companyData.benefits.includes(benefit) ? 'opacity-100' : 'opacity-0'}`} />
                              {benefit}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Company Culture</Label>
                        <p className="text-sm text-muted-foreground">What values define your workplace?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {cultureValues.map((value) => (
                            <Button
                              key={value}
                              variant={companyData.culture.includes(value) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleArrayItem(companyData.culture, value, 'culture')}
                              className="justify-start"
                            >
                              <Check className={`w-4 h-4 mr-2 ${companyData.culture.includes(value) ? 'opacity-100' : 'opacity-0'}`} />
                              {value}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold mb-2">Contact Information & Social Links</h3>
                      <p className="text-muted-foreground">How can candidates learn more and get in touch?</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Contact Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="careers@company.com"
                              value={companyData.contactInfo.email}
                              onChange={(e) => updateCompanyData('contactInfo.email', e.target.value)}
                              className="pl-10 h-12"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                              id="phone"
                              placeholder="+1 (555) 123-4567"
                              value={companyData.contactInfo.phone}
                              onChange={(e) => updateCompanyData('contactInfo.phone', e.target.value)}
                              className="pl-10 h-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Office Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                          <Textarea
                            id="address"
                            placeholder="123 Business St, Suite 100, City, State 12345"
                            value={companyData.contactInfo.address}
                            onChange={(e) => updateCompanyData('contactInfo.address', e.target.value)}
                            className="pl-10 min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Social Media Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="relative">
                              <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                              <Input
                                placeholder="LinkedIn company page"
                                value={companyData.socialLinks.linkedin || ''}
                                onChange={(e) => updateCompanyData('socialLinks.linkedin', e.target.value)}
                                className="pl-10 h-12"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="relative">
                              <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                              <Input
                                placeholder="Twitter/X profile"
                                value={companyData.socialLinks.twitter || ''}
                                onChange={(e) => updateCompanyData('socialLinks.twitter', e.target.value)}
                                className="pl-10 h-12"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="relative">
                              <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                              <Input
                                placeholder="Facebook page"
                                value={companyData.socialLinks.facebook || ''}
                                onChange={(e) => updateCompanyData('socialLinks.facebook', e.target.value)}
                                className="pl-10 h-12"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="relative">
                              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-600 w-5 h-5" />
                              <Input
                                placeholder="Instagram profile"
                                value={companyData.socialLinks.instagram || ''}
                                onChange={(e) => updateCompanyData('socialLinks.instagram', e.target.value)}
                                className="pl-10 h-12"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t">
                  <div className="flex space-x-3">
                    {step > 1 ? (
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={onBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile Selection
                      </Button>
                    )}
                    
                    <Button variant="ghost" onClick={onSkip}>
                      Skip for now
                    </Button>
                  </div>

                  {step < 3 ? (
                    <Button onClick={nextStep} disabled={step === 1 && !companyData.companyName}>
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleComplete}>
                      Complete Setup
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}