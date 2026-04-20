import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getModuleConfig, ModuleId } from '@/modules';
import ModuleFormWizard from '@/components/modules/ModuleFormWizard';
import ReviewSection from '@/components/modules/ReviewSection';
import { useJobStatus } from '@/hooks/useJobStatus';
import { preprocessFormData } from '@/lib/preprocessor';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Settings2,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ModuleExecution: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const config = getModuleConfig(moduleId || '');

  const [jobId, setJobId] = useState<string | null>(null);
  const [step, setStep] = useState<'intake' | 'processing' | 'review'>('intake');
  const [language, setLanguage] = useState<'EN' | 'HI' | 'MR' | 'GU'>('EN');

  const { status, result, error } = useJobStatus(jobId);

  React.useEffect(() => {
    if (status === 'completed') {
      setStep('review');
    }
  }, [status]);

  if (!config) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <AlertCircle className="w-12 h-12 text-crimson" />
          <h2 className="text-xl font-bold">Module Not Found</h2>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleFormSubmit = async (data: any) => {
    if (!user) return;
    
    setStep('processing');
    try {
      // Precompute the data for AI context
      const processedData = preprocessFormData(config.id as ModuleId, data, language);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      const response = await fetch('/.netlify/functions/generate-request', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ 
          module: config.id, 
          language: language, 
          input_json: processedData 
        })
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Failed to start generation job';
        try {
          const errData = JSON.parse(text);
          errorMessage = errData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', text);
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      try {
        const resData = JSON.parse(text);
        setJobId(resData.job_id);
      } catch (e) {
        console.error('Failed to parse success response:', text);
        throw new Error('Invalid response from server');
      }

    } catch (err: any) {
      toast.error(err.message || 'Failed to start generation');
      setStep('intake');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-text-muted hover:text-text-primary -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {step === 'intake' && (
            <div className="flex items-center gap-2 bg-bg-tertiary rounded-lg p-1 border border-border-default">
              {(['EN', 'HI', 'MR', 'GU'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                    language === lang 
                    ? 'bg-gold text-background shadow-md' 
                    : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {step === 'intake' && (
          <div className="space-y-6">
            <header className="max-w-2xl mx-auto text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <config.icon className="w-6 h-6 text-gold" />
              </div>
              <h1 className="text-3xl font-display font-bold text-text-primary">{config.title}</h1>
              <p className="text-text-secondary">{config.description}</p>
            </header>
            
            <ModuleFormWizard config={config} onSubmit={handleFormSubmit} />
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-gold/10 border-t-gold animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-gold animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-text-primary">
                {status === 'queued' ? 'Queuing Request...' : 'Drafting Document...'}
              </h2>
              <p className="text-text-secondary max-w-sm mx-auto">
                Our AI is analyzing your inputs and drafting a legally sound document in {language}.
              </p>
            </div>
            
            <Card className="max-w-md w-full border-dashed border-border-default bg-transparent">
              <CardContent className="py-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-gold animate-spin" />
                <span className="text-xs text-text-muted font-mono tracking-tight">
                  Status: {status?.toUpperCase()} | Job ID: {jobId?.slice(0, 8)}...
                </span>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'review' && result && (
          <ReviewSection 
            initialResult={result} 
            onFinalize={(finalData) => {
              console.log('Final Data:', finalData);
              toast.success('Document finalized! Starting download...');
              // Next step: DOCX generation logic
            }} 
          />
        )}

        {error && (
          <div className="p-4 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center gap-3 text-crimson text-sm font-medium mx-auto max-w-md">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
            <Button variant="outline" size="sm" onClick={() => setStep('intake')} className="ml-auto border-crimson/30 text-crimson">
              Retry
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    <path d="M5 3l1 1" /><path d="M19 3l-1 1" /><path d="M5 21l1-1" /><path d="M19 21l-1-1" />
  </svg>
);

export default ModuleExecution;
