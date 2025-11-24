
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { useRTWInsights } from '@/hooks/useRTWInsights';
import { supabase } from '@/app/integrations/supabase/client';

export default function ResultsScreen() {
  const { scores, dealDetails, answers, resetAssessment } = useAssessment();
  const { generateInsights, loading: insightsLoading } = useRTWInsights();
  const [savingToDB, setSavingToDB] = useState(false);

  if (!scores) {
    return (
      <View style={commonStyles.container}>
        <View style={styles.errorContainer}>
          <Text style={commonStyles.text}>No scores available</Text>
          <TouchableOpacity
            style={buttonStyles.primaryButton}
            onPress={() => router.push('/(tabs)/(home)/')}
          >
            <Text style={buttonStyles.primaryButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleGenerateInsights = async () => {
    try {
      console.log('Starting AI insights generation...');

      // Generate insights using OpenAI
      const insights = await generateInsights({ dealDetails, scores });

      if (!insights) {
        Alert.alert(
          'Error',
          'Failed to generate insights. Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
        return;
      }

      console.log('Insights generated, saving to database...');

      // Save to database
      await saveAssessmentToDB(insights);

      // Navigate to insights screen
      router.push({
        pathname: '/insights',
        params: { insights },
      });
    } catch (error) {
      console.error('Error in handleGenerateInsights:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const saveAssessmentToDB = async (aiInsights: string) => {
    setSavingToDB(true);
    try {
      console.log('Saving assessment to database...');

      // First, create the deal
      const { data: dealData, error: dealError } = await supabase
        .from('deals')
        .insert({
          client_name: dealDetails.clientName,
          deal_name: dealDetails.dealName,
          deal_value: dealDetails.dealValue ? parseFloat(dealDetails.dealValue) : null,
          expected_close_date: dealDetails.expectedCloseDate || null,
          sales_stage: dealDetails.salesStage || null,
          deal_context: dealDetails.dealContext || null,
          credibility_score: scores.credibility,
          capability_score: scores.capability,
          commitment_score: scores.commitment,
          control_score: scores.control,
          rtw_score: scores.rtw,
        })
        .select()
        .single();

      if (dealError) {
        console.error('Error saving deal:', dealError);
        return;
      }

      console.log('Deal saved successfully:', dealData.id);

      // Then, create the assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('rtw_assessments')
        .insert({
          deal_id: dealData.id,
          credibility_knowledge: answers.credibility.knowledge,
          credibility_trust: answers.credibility.trust,
          credibility_gate_question: answers.credibility.gateQuestion,
          capability_competence: answers.capability.competence,
          capability_quantum: answers.capability.quantum,
          capability_gate_question: answers.capability.gateQuestion,
          commitment_outcome: answers.commitment.outcome,
          commitment_satisfaction: answers.commitment.satisfaction,
          commitment_gate_question: answers.commitment.gateQuestion,
          control_mastery: answers.control.mastery,
          control_influence: answers.control.influence,
          control_gate_question: answers.control.gateQuestion,
          credibility_score: scores.credibility,
          capability_score: scores.capability,
          commitment_score: scores.commitment,
          control_score: scores.control,
          rtw_score: scores.rtw,
          ai_insights: aiInsights,
        })
        .select()
        .single();

      if (assessmentError) {
        console.error('Error saving assessment:', assessmentError);
        return;
      }

      console.log('Assessment saved successfully:', assessmentData.id);
    } catch (error) {
      console.error('Error saving to database:', error);
    } finally {
      setSavingToDB(false);
    }
  };

  const handleStartNew = () => {
    resetAssessment();
    router.push('/(tabs)/(home)/');
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return colors.clarityBlue;
    if (score >= 40) return colors.beaconOrange;
    return colors.focusBlue;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Strong';
    if (score >= 40) return 'Moderate';
    return 'Needs Attention';
  };

  const isLoading = insightsLoading || savingToDB;

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>ImpactWon</Text>
          </View>
        </View>

        <Text style={commonStyles.title}>Right-to-Win Results</Text>
        <Text style={[commonStyles.text, styles.dealName]}>
          {dealDetails.dealName} - {dealDetails.clientName}
        </Text>

        {/* Four-bubble diagram */}
        <View style={styles.diagramContainer}>
          {/* Top row */}
          <View style={styles.topRow}>
            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.credibility) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.credibility) }]}>
                  {scores.credibility}
                </Text>
              </View>
              <Text style={styles.cLabel}>Credibility</Text>
              <Text style={[styles.cStatus, { color: getScoreColor(scores.credibility) }]}>
                {getScoreLabel(scores.credibility)}
              </Text>
            </View>

            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.capability) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.capability) }]}>
                  {scores.capability}
                </Text>
              </View>
              <Text style={styles.cLabel}>Capability</Text>
              <Text style={[styles.cStatus, { color: getScoreColor(scores.capability) }]}>
                {getScoreLabel(scores.capability)}
              </Text>
            </View>
          </View>

          {/* Center RTW circle */}
          <View style={styles.centerRow}>
            <View style={[styles.rtwCircle, { borderColor: getScoreColor(scores.rtw) }]}>
              <Text style={[styles.rtwScore, { color: getScoreColor(scores.rtw) }]}>
                {scores.rtw}%
              </Text>
              <Text style={styles.rtwLabel}>RTW Score</Text>
            </View>
          </View>

          {/* Bottom row */}
          <View style={styles.bottomRow}>
            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.commitment) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.commitment) }]}>
                  {scores.commitment}
                </Text>
              </View>
              <Text style={styles.cLabel}>Commitment</Text>
              <Text style={[styles.cStatus, { color: getScoreColor(scores.commitment) }]}>
                {getScoreLabel(scores.commitment)}
              </Text>
            </View>

            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.control) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.control) }]}>
                  {scores.control}
                </Text>
              </View>
              <Text style={styles.cLabel}>Control</Text>
              <Text style={[styles.cStatus, { color: getScoreColor(scores.control) }]}>
                {getScoreLabel(scores.control)}
              </Text>
            </View>
          </View>
        </View>

        {/* Summary table */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Assessment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Credibility:</Text>
            <Text style={[styles.summaryValue, { color: getScoreColor(scores.credibility) }]}>
              {scores.credibility}/100
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Capability:</Text>
            <Text style={[styles.summaryValue, { color: getScoreColor(scores.capability) }]}>
              {scores.capability}/100
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Commitment:</Text>
            <Text style={[styles.summaryValue, { color: getScoreColor(scores.commitment) }]}>
              {scores.commitment}/100
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Control:</Text>
            <Text style={[styles.summaryValue, { color: getScoreColor(scores.control) }]}>
              {scores.control}/100
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.summaryLabelTotal}>Overall RTW:</Text>
            <Text style={[styles.summaryValueTotal, { color: getScoreColor(scores.rtw) }]}>
              {scores.rtw}%
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>Get AI-Powered Insights</Text>
          <Text style={styles.actionDescription}>
            Generate personalized recommendations based on your assessment using OpenAI&apos;s advanced AI.
          </Text>
          
          <TouchableOpacity
            style={[buttonStyles.primaryButton, styles.insightsButton]}
            onPress={handleGenerateInsights}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.textLight} />
                <Text style={[buttonStyles.primaryButtonText, styles.loadingText]}>
                  {savingToDB ? 'Saving...' : 'Generating...'}
                </Text>
              </View>
            ) : (
              <Text style={buttonStyles.primaryButtonText}>🤖 Generate AI Insights</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.secondaryButton, styles.newButton]}
            onPress={handleStartNew}
            disabled={isLoading}
          >
            <Text style={buttonStyles.secondaryButtonText}>Start New Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 60 : 40,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.focusBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
    textAlign: 'center',
  },
  dealName: {
    fontSize: 14,
    marginBottom: 30,
    color: colors.focusBlue,
    fontWeight: '600',
  },
  diagramContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  centerRow: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cContainer: {
    alignItems: 'center',
  },
  cCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    boxShadow: '0px 2px 8px rgba(31, 43, 115, 0.1)',
    elevation: 2,
  },
  cScore: {
    fontSize: 28,
    fontWeight: '700',
  },
  cLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.focusBlue,
    marginTop: 8,
    textAlign: 'center',
  },
  cStatus: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  rtwCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    boxShadow: '0px 4px 12px rgba(31, 43, 115, 0.15)',
    elevation: 4,
  },
  rtwScore: {
    fontSize: 40,
    fontWeight: '700',
  },
  rtwLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.focusBlue,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 25,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
    boxShadow: '0px 2px 8px rgba(31, 43, 115, 0.08)',
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.focusBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryRowTotal: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: colors.focusBlue,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryLabelTotal: {
    fontSize: 18,
    color: colors.focusBlue,
    fontWeight: '700',
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 40,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.focusBlue,
    marginBottom: 12,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  insightsButton: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 16,
  },
  newButton: {
    width: '100%',
    maxWidth: 300,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
});
