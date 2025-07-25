import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { FormData, FlowType, timelineOptions } from './constants';

interface PricingStepProps {
  flowType: FlowType;
  formData: FormData;
  onFormDataChange: (data: Partial<FormData>) => void;
}

export function PricingStep({ flowType, formData, onFormDataChange }: PricingStepProps) {
  const getBudgetLabel = () => {
    switch (flowType) {
      case 'job': return 'Annual Salary Range';
      case 'gig': return 'Project Budget';
      case 'task': return 'Task Payment';
      default: return 'Budget';
    }
  };

  const getBudgetPlaceholder = () => {
    switch (flowType) {
      case 'job': return '$50,000 - $80,000';
      case 'gig': return '$500 - $2,000';
      case 'task': return '$25';
      default: return 'Enter budget';
    }
  };

  return (
    <motion.div
      key="step4"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Budget and timeline</h2>
        <p className="text-muted-foreground">
          Set your budget and when you need this completed
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">{getBudgetLabel()} *</label>
          <Input
            placeholder={getBudgetPlaceholder()}
            value={formData.budget}
            onChange={(e) => onFormDataChange({ budget: e.target.value })}
          />
          {flowType === 'job' && (
            <p className="text-xs text-muted-foreground mt-1">
              Competitive salaries attract better candidates
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">Timeline *</label>
          <Select value={formData.timeline} onValueChange={(value) => onFormDataChange({ timeline: value })}>
            <SelectTrigger>
              <SelectValue placeholder="When do you need this completed?" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {flowType === 'job' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm">Remote Work Available</label>
                <p className="text-xs text-muted-foreground">Allow remote or hybrid work</p>
              </div>
              <Switch
                checked={formData.remote || false}
                onCheckedChange={(checked) => onFormDataChange({ remote: checked })}
              />
            </div>
          </div>
        )}

        {flowType === 'task' && (
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm">Mark as Urgent</label>
              <p className="text-xs text-muted-foreground">Highlight this task for faster responses</p>
            </div>
            <Switch
              checked={formData.urgent || false}
              onCheckedChange={(checked) => onFormDataChange({ urgent: checked })}
            />
          </div>
        )}

        {flowType === 'gig' && (
          <div>
            <label className="block text-sm mb-2">Payment Terms</label>
            <Select defaultValue="milestone">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upfront">Pay upfront</SelectItem>
                <SelectItem value="milestone">Milestone payments</SelectItem>
                <SelectItem value="completion">Pay on completion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm mb-2">Pricing Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {flowType === 'job' && (
              <>
                <li>• Include benefits and perks in your description</li>
                <li>• Research market rates for the role</li>
                <li>• Be transparent about salary range</li>
              </>
            )}
            {flowType === 'gig' && (
              <>
                <li>• Consider the complexity of the project</li>
                <li>• Factor in revisions and communication time</li>
                <li>• Competitive pricing attracts more applicants</li>
              </>
            )}
            {flowType === 'task' && (
              <>
                <li>• Fair payment ensures quality work</li>
                <li>• Consider time, effort, and travel required</li>
                <li>• Add tip for exceptional service</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}