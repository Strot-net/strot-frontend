import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin, DollarSign, Clock, Star } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  posted: string;
  logo?: string;
}

interface RecommendedJobsProps {
  jobs: Job[];
  onViewAll: () => void;
  onJobClick: (jobId: number) => void;
}

export function RecommendedJobs({ jobs, onViewAll, onJobClick }: RecommendedJobsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recommended for You</h3>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All Jobs
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => onJobClick(job.id)}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={job.logo} />
                  <AvatarFallback>
                    {job.company.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {job.match}% match
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{job.match}% match</span>
                </div>
                <Button size="sm" variant="outline">
                  Apply Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}