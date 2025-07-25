export interface SavedSearch {
  id: string;
  name: string;
  filters: AdvancedFilters;
  createdAt: Date;
}

export interface AdvancedFilters {
  keywords: string;
  location: string;
  jobTypes: string[];
  experienceLevels: string[];
  salaryRange: [number, number];
  industries: string[];
  companySizes: string[];
  workArrangements: string[];
  postedWithin: string;
  benefits: string[];
  skills: string[];
  companyRating: number;
  urgentOnly: boolean;
  verifiedOnly: boolean;
  remoteOnly: boolean;
  hasEquity: boolean;
  hasBonus: boolean;
}

export const defaultFilters: AdvancedFilters = {
  keywords: '',
  location: '',
  jobTypes: [],
  experienceLevels: [],
  salaryRange: [0, 300000],
  industries: [],
  companySizes: [],
  workArrangements: [],
  postedWithin: '',
  benefits: [],
  skills: [],
  companyRating: 0,
  urgentOnly: false,
  verifiedOnly: true,
  remoteOnly: false,
  hasEquity: false,
  hasBonus: false
};

export const jobTypeOptions = [
  'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary'
];

export const experienceOptions = [
  'Entry Level', 'Mid Level', 'Senior Level', 'Executive', 'Director'
];

export const industryOptions = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
  'Consulting', 'Media', 'Government', 'Non-profit', 'Real Estate', 'Transportation'
];

export const companySizeOptions = [
  '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
];

export const workArrangementOptions = [
  'Remote', 'Hybrid', 'On-site', 'Flexible hours', 'Compressed work week'
];

export const benefitOptions = [
  'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k',
  'Paid Time Off', 'Flexible Schedule', 'Work from Home', 'Stock Options',
  'Gym Membership', 'Free Lunch', 'Professional Development', 'Commuter Benefits'
];

export const skillOptions = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker',
  'Kubernetes', 'SQL', 'NoSQL', 'GraphQL', 'REST API', 'Microservices',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Product Management',
  'Project Management', 'Agile', 'Scrum', 'Git', 'CI/CD'
];

export const postedWithinOptions = [
  { value: '', label: 'Any time' },
  { value: '1', label: 'Last 24 hours' },
  { value: '3', label: 'Last 3 days' },
  { value: '7', label: 'Last week' },
  { value: '14', label: 'Last 2 weeks' },
  { value: '30', label: 'Last month' }
];