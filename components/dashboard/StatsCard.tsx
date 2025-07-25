import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface StatCardProps {
  stat: {
    label: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
  };
  index: number;
}

export function StatsCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}