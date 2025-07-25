import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { TypeSelectionStep } from './create-flow/TypeSelectionStep';
import { DetailsStep } from './create-flow/DetailsStep';
import { MediaStep } from './create-flow/MediaStep';
import { PricingStep } from './create-flow/PricingStep';
import { ReviewStep } from './create-flow/ReviewStep';
import { FlowType, steps, initialFormData, FormData } from './create-flow/constants';

interface CreateFlowProps {
  onNavigate: (page: string) => void;
}

export function CreateFlow({ onNavigate }: CreateFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [flowType, setFlowType] = useState<FlowType>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newSkill, setNewSkill] = useState('');

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData({ skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData({ skills: formData.skills.filter(s => s !== skill) });
  };

  const handlePublish = () => {
    // Here you would normally submit to API
    console.log('Publishing:', { flowType, formData });
    onNavigate('dashboard');
  };

  const handleSaveDraft = () => {
    // Here you would normally save draft to API
    console.log('Saving draft:', { flowType, formData });
    onNavigate('dashboard');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return flowType !== null;
      case 2: return formData.title && formData.description && formData.category && formData.location;
      case 3: return true; // Media is optional
      case 4: return formData.budget && formData.timeline;
      case 5: return true;
      default: return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <TypeSelectionStep selectedType={flowType} onTypeSelect={setFlowType} />;
      case 2:
        return (
          <DetailsStep
            flowType={flowType}
            formData={formData}
            onFormDataChange={updateFormData}
            newSkill={newSkill}
            onNewSkillChange={setNewSkill}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
          />
        );
      case 3:
        return <MediaStep flowType={flowType} formData={formData} onFormDataChange={updateFormData} />;
      case 4:
        return <PricingStep flowType={flowType} formData={formData} onFormDataChange={updateFormData} />;
      case 5:
        return (
          <ReviewStep
            flowType={flowType}
            formData={formData}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <h1 className="text-xl">Create New Listing</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep > step.id ? 'bg-primary text-primary-foreground' :
                    currentStep === step.id ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <div className={`text-sm transition-colors ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <Card className="p-8 mb-8">
          <AnimatePresence mode="wait">
            {getStepContent()}
          </AnimatePresence>
        </Card>

        {/* Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between"
        >
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button onClick={handlePublish} disabled={!canProceed()}>
                Publish
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}