import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Image, Upload, X } from 'lucide-react';
import { FormData, FlowType } from './constants';

interface MediaStepProps {
  flowType: FlowType;
  formData: FormData;
  onFormDataChange: (data: Partial<FormData>) => void;
}

export function MediaStep({ flowType, formData, onFormDataChange }: MediaStepProps) {
  const handleImageUpload = () => {
    // Mock image upload - in real app would handle file upload
    const mockImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
    onFormDataChange({
      images: [...formData.images, mockImageUrl]
    });
  };

  const removeImage = (index: number) => {
    onFormDataChange({
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      key="step3"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Add images and attachments</h2>
        <p className="text-muted-foreground">
          {flowType === 'job' ? 'Add your company logo or office photos' : 
           flowType === 'gig' ? 'Showcase your work with portfolio images' :
           'Add photos to help people understand the task'}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Images (optional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {formData.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group"
              >
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-border"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>

          <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
            <button
              onClick={handleImageUpload}
              className="w-full p-8 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm">Click to upload images</span>
              <span className="text-xs mt-1">PNG, JPG up to 10MB</span>
            </button>
          </Card>
        </div>

        {flowType === 'gig' && (
          <div>
            <label className="block text-sm mb-2">Portfolio Links (optional)</label>
            <div className="space-y-3">
              <input
                type="url"
                placeholder="https://your-portfolio.com"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button variant="outline" size="sm">
                + Add Another Link
              </Button>
            </div>
          </div>
        )}

        {flowType === 'job' && (
          <div>
            <label className="block text-sm mb-2">Job Description Attachments (optional)</label>
            <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
              <button className="w-full p-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Image className="w-6 h-6 mr-2" />
                <span className="text-sm">Upload job description PDF</span>
              </button>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}