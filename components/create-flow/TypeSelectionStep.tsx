import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Briefcase, Tag, MapPin } from 'lucide-react';
import { FlowType, flowTypes } from './constants';

interface TypeSelectionStepProps {
  selectedType: FlowType;
  onTypeSelect: (type: FlowType) => void;
}

const iconMap = {
  Briefcase,
  Tag,
  MapPin
};

export function TypeSelectionStep({ selectedType, onTypeSelect }: TypeSelectionStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">What would you like to create?</h2>
        <p className="text-muted-foreground">Choose the type of listing you want to post</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flowTypes.map((flowType) => {
          const Icon = iconMap[flowType.icon as keyof typeof iconMap];
          
          return (
            <motion.div
              key={flowType.type}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedType === flowType.type ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'
                }`}
                onClick={() => onTypeSelect(flowType.type)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    flowType.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    flowType.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    'bg-purple-100 dark:bg-purple-900'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      flowType.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      flowType.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`} />
                  </div>
                  <h3 className="mb-2">{flowType.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {flowType.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}