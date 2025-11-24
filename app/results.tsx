
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { supabase } from '@/app/integrations/supabase/client';

export default function ResultsScreen() {
  const { scores, dealDetails, resetAssessment } = useAssessment();
  const [loading, setLoading] = useState(false);

  if (!scores) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>No scores available</Text>
      </View>
    );
  }

  const handleGenerateInsights = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-rtw-insights', {
        body: {
          dealDetails,
          scores,
        },
      });

      if (error) {
        console.error('Error generating insights:', error);
        alert('Failed to generate insights. Please try again.');
      } else {
        router.push({
          pathname: '/insights',
          params: { insights: data.insights },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
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
            </View>

            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.capability) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.capability) }]}>
                  {scores.capability}
                </Text>
              </View>
              <Text style={styles.cLabel}>Capability</Text>
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
            </View>

            <View style={styles.cContainer}>
              <View style={[styles.cCircle, { borderColor: getScoreColor(scores.control) }]}>
                <Text style={[styles.cScore, { color: getScoreColor(scores.control) }]}>
                  {scores.control}
                </Text>
              </View>
              <Text style={styles.cLabel}>Control</Text>
            </View>
          </View>
        </View>

        {/* Summary table */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
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

        <TouchableOpacity
          style={[buttonStyles.primaryButton, styles.insightsButton]}
          onPress={handleGenerateInsights}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.textLight} />
          ) : (
            <Text style={buttonStyles.primaryButtonText}>Generate AI Insights</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.secondaryButton, styles.newButton]}
          onPress={handleStartNew}
        >
          <Text style={buttonStyles.secondaryButtonText}>Start New Assessment</Text>
        </TouchableOpacity>
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
  rtwCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
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
  insightsButton: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 16,
  },
  newButton: {
    width: '100%',
    maxWidth: 300,
  },
});
