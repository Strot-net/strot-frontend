import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  title: string;
  company: string;
  time: string;
  status: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  onViewAll: () => void;
}

export function ActivityFeed({ activities, onViewAll }: ActivityFeedProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Activity</h3>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.company}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {activity.status}
            </Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}