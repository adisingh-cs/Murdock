import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ModuleConfig } from '@/modules';
import { useFormDraft } from '@/hooks/useFormDraft';

interface ModuleFormWizardProps {
  config: ModuleConfig;
  onSubmit: (data: any) => void;
}

const ModuleFormWizard: React.FC<ModuleFormWizardProps> = ({ config, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { draft, setDraft } = useFormDraft(config.id, {});

  const currentStepConfig = config.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;
  const progress = ((currentStep + 1) / config.steps.length) * 100;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger
  } = useForm<any>({
    resolver: zodResolver(config.schema),
    defaultValues: draft
  });

  // Keep draft in sync
  const formData = watch();
  React.useEffect(() => {
    setDraft(formData);
  }, [JSON.stringify(formData), setDraft]);

  const handleNext = async () => {
    // Only validate fields on the current step
    const fieldsToValidate = currentStepConfig.fields.map(f => f.id);
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              Step {currentStep + 1} of {config.steps.length}
            </p>
            <h2 className="text-xl font-display font-bold text-text-primary">
              {currentStepConfig.title}
            </h2>
          </div>
          <span className="text-xs text-text-muted font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-bg-tertiary" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {currentStepConfig.description && (
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentStepConfig.description}
              </p>
            )}

            <div className="space-y-4">
              {currentStepConfig.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.id} className="text-[13px] font-semibold text-text-primary">
                      {field.label}
                    </Label>
                    {field.aiSuggest && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gold uppercase tracking-tighter">
                        <Sparkles className="w-3 h-3" /> AI Assisted
                      </span>
                    )}
                  </div>
                  
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      className="bg-bg-primary border-border-default focus:border-gold/50 min-h-[100px] text-sm"
                      {...register(field.id)}
                    />
                  ) : field.type === 'select' ? (
                    <Select 
                      onValueChange={(val) => setValue(field.id as any, val as any)}
                      defaultValue={formData[field.id]}
                    >
                      <SelectTrigger className="bg-bg-primary border-border-default">
                        <SelectValue placeholder={field.placeholder || "Select an option"} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        id={field.id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-border-default text-gold focus:ring-gold bg-bg-primary"
                        {...register(field.id)}
                      />
                      <Label htmlFor={field.id} className="text-xs font-medium text-text-secondary cursor-pointer">
                        {field.placeholder || "I confirm the above information"}
                      </Label>
                    </div>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-bg-primary border-border-default focus:border-gold/50 h-11 text-sm"
                      {...register(field.id)}
                    />
                  )}

                  {errors[field.id] && (
                    <div className="flex items-center gap-1.5 text-crimson text-xs font-medium animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors[field.id]?.message as string}
                    </div>
                  )}

                  {field.description && (
                    <p className="text-[11px] text-text-muted italic">{field.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-6 border-t border-border-default mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep}
            className="text-text-muted hover:text-text-primary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              className="bg-gold hover:bg-gold-light text-background font-bold px-8 h-11"
            >
              Generate Draft
              <Save className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-bg-tertiary hover:bg-bg-tertiary/80 text-text-primary h-11 px-6 border border-border-default"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModuleFormWizard;
