
import { useState, useCallback } from 'react';
import { supabase } from '@/app/integrations/supabase/client';
import { DealDetails, Scores } from '@/types/assessment';

interface InsightsState {
  insights: string | null;
  loading: boolean;
  error: string | null;
}

interface GenerateInsightsParams {
  dealDetails: DealDetails;
  scores: Scores;
}

export function useRTWInsights() {
  const [state, setState] = useState<InsightsState>({
    insights: null,
    loading: false,
    error: null,
  });

  const generateInsights = useCallback(async ({ dealDetails, scores }: GenerateInsightsParams) => {
    setState({ insights: null, loading: true, error: null });

    try {
      console.log('Generating RTW insights...');
      console.log('Deal:', dealDetails.dealName, 'Client:', dealDetails.clientName);
      console.log('RTW Score:', scores.rtw);

      const { data, error } = await supabase.functions.invoke('generate-rtw-insights', {
        body: {
          dealDetails,
          scores,
        },
      });

      if (error) {
        console.error('Error from Edge Function:', error);
        throw new Error(error.message || 'Failed to generate insights');
      }

      if (!data || !data.insights) {
        throw new Error('No insights returned from API');
      }

      console.log('Insights generated successfully');
      setState({ insights: data.insights, loading: false, error: null });
      return data.insights;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Error generating insights:', errorMessage);
      setState({ insights: null, loading: false, error: errorMessage });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ insights: null, loading: false, error: null });
  }, []);

  return {
    insights: state.insights,
    loading: state.loading,
    error: state.error,
    generateInsights,
    reset,
  };
}
