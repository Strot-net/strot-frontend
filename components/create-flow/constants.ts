export type FlowType = 'job' | 'gig' | 'task' | null;

export const steps = [
  { id: 1, title: 'Type', description: 'Choose what to create' },
  { id: 2, title: 'Details', description: 'Basic information' },
  { id: 3, title: 'Media', description: 'Images and attachments' },
  { id: 4, title: 'Pricing', description: 'Budget and timeline' },
  { id: 5, title: 'Review', description: 'Preview and publish' }
];

export const flowTypes = [
  {
    type: 'job' as const,
    title: 'Job Posting',
    description: 'Post a full-time, part-time, or contract position',
    icon: 'Briefcase',
    color: 'blue'
  },
  {
    type: 'gig' as const,
    title: 'Freelance Gig',
    description: 'Offer a service or skill to freelancers',
    icon: 'Tag',
    color: 'green'
  },
  {
    type: 'task' as const,
    title: 'Local Task',
    description: 'Post a quick task that needs to be done locally',
    icon: 'MapPin',
    color: 'purple'
  }
];

export const categories = {
  job: ['Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'Operations'],
  gig: ['Web Development', 'Graphic Design', 'Writing', 'Marketing', 'Data Entry', 'Video Editing'],
  task: ['Moving', 'Cleaning', 'Delivery', 'Handyman', 'Pet Care', 'Tutoring']
};

export const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
export const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
export const timelineOptions = ['ASAP', 'Within a week', '1-2 weeks', '2-4 weeks', '1+ months'];

export interface FormData {
  title: string;
  description: string;
  category: string;
  skills: string[];
  budget: string;
  timeline: string;
  location: string;
  type: string;
  experienceLevel?: string;
  images: string[];
  urgent?: boolean;
  remote?: boolean;
}

export const initialFormData: FormData = {
  title: '',
  description: '',
  category: '',
  skills: [],
  budget: '',
  timeline: '',
  location: '',
  type: '',
  images: []
};