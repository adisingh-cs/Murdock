import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export const useJobStatus = (jobId: string | null) => {
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    // Initial fetch
    const fetchStatus = async () => {
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('status, result_json')
        .eq('job_id', jobId)
        .single();
      
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      
      if (data) {
        setStatus(data.status as JobStatus);
        if (data.status === 'completed') {
          setResult(data.result_json);
        }
      }
    };

    fetchStatus();

    // Subscribe to changes
    const subscription = supabase
      .channel(`job_${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as JobStatus;
          setStatus(newStatus);
          if (newStatus === 'completed') {
            setResult(payload.new.result_json);
          }
          if (newStatus === 'failed') {
            setError('Generation failed. Please try again.');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [jobId]);

  return { status, result, error };
};
