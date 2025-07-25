import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Clock, DollarSign, Briefcase, Tag } from 'lucide-react';
import { FormData, FlowType } from './constants';

interface ReviewStepProps {
  flowType: FlowType;
  formData: FormData;
  onPublish: () => void;
  onSaveDraft: () => void;
}

export function ReviewStep({ flowType, formData, onPublish, onSaveDraft }: ReviewStepProps) {
  const getIcon = () => {
    switch (flowType) {
      case 'job': return <Briefcase className="w-5 h-5" />;
      case 'gig': return <Tag className="w-5 h-5" />;
      case 'task': return <MapPin className="w-5 h-5" />;
      default: return null;
    }
  };

  const getTypeDisplay = () => {
    switch (flowType) {
      case 'job': return 'Job Posting';
      case 'gig': return 'Freelance Gig';
      case 'task': return 'Local Task';
      default: return '';
    }
  };

  return (
    <motion.div
      key="step5"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Review and publish</h2>
        <p className="text-muted-foreground">
          Make sure everything looks good before publishing your {flowType}
        </p>
      </div>

      {/* Preview Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg">{formData.title || 'Untitled'}</h3>
                <Badge variant="secondary">{getTypeDisplay()}</Badge>
                {formData.urgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {formData.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{formData.location || 'Location not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{formData.timeline || 'Timeline not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>{formData.budget || 'Budget not specified'}</span>
          </div>
        </div>

        {formData.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {formData.images.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm mb-2">Images</h4>
            <div className="flex gap-2 overflow-x-auto">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-border flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Category: {formData.category || 'Not specified'}
            {formData.type && ` • ${formData.type}`}
            {formData.experienceLevel && ` • ${formData.experienceLevel}`}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={onPublish}>
              Publish {getTypeDisplay()}
            </Button>
          </div>
        </div>
      </Card>

      {/* Publishing Tips */}
      <Card className="p-4 bg-muted/50">
        <h4 className="text-sm mb-2">Publishing Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Your listing will be visible to all users immediately</li>
          <li>• You can edit or pause your listing at any time</li>
          <li>• Respond quickly to applicants for best results</li>
          <li>• Complete listings get 3x more responses</li>
        </ul>
      </Card>
    </motion.div>
  );
}