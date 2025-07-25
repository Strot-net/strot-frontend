import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, X } from 'lucide-react';
import { FormData, FlowType, categories, jobTypes, experienceLevels } from './constants';

interface DetailsStepProps {
  flowType: FlowType;
  formData: FormData;
  onFormDataChange: (data: Partial<FormData>) => void;
  newSkill: string;
  onNewSkillChange: (skill: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
}

export function DetailsStep({ 
  flowType, 
  formData, 
  onFormDataChange, 
  newSkill, 
  onNewSkillChange, 
  onAddSkill, 
  onRemoveSkill 
}: DetailsStepProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddSkill();
    }
  };

  return (
    <motion.div
      key="step2"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Tell us about your {flowType}</h2>
        <p className="text-muted-foreground">Provide the basic details to attract the right candidates</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Title *</label>
          <Input
            placeholder={`Enter a clear, descriptive title for your ${flowType}`}
            value={formData.title}
            onChange={(e) => onFormDataChange({ title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Description *</label>
          <Textarea
            placeholder={`Describe what you're looking for in detail...`}
            value={formData.description}
            onChange={(e) => onFormDataChange({ description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">Category *</label>
            <Select value={formData.category} onValueChange={(value) => onFormDataChange({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories[flowType as keyof typeof categories]?.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {flowType === 'job' && (
            <div>
              <label className="block text-sm mb-2">Job Type *</label>
              <Select value={formData.type} onValueChange={(value) => onFormDataChange({ type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {flowType === 'job' && (
          <div>
            <label className="block text-sm mb-2">Experience Level *</label>
            <Select value={formData.experienceLevel || ''} onValueChange={(value) => onFormDataChange({ experienceLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label className="block text-sm mb-2">Location *</label>
          <Input
            placeholder={flowType === 'task' ? 'Enter specific address or area' : 'City, State or Remote'}
            value={formData.location}
            onChange={(e) => onFormDataChange({ location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Required Skills</label>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Type a skill and press Enter"
              value={newSkill}
              onChange={(e) => onNewSkillChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button type="button" onClick={onAddSkill} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => onRemoveSkill(skill)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}