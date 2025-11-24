
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';

export default function InsightsScreen() {
  const params = useLocalSearchParams();
  const { resetAssessment } = useAssessment();
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle insights passed as URL parameter
    if (params.insights) {
      setInsights(typeof params.insights === 'string' ? params.insights : params.insights[0]);
      setLoading(false);
    } else {
      setInsights('No insights available. Please generate insights from the results screen.');
      setLoading(false);
    }
  }, [params.insights]);

  const handleStartNew = () => {
    resetAssessment();
    router.push('/(tabs)/(home)/');
  };

  const formatInsights = (text: string) => {
    // Split by numbered lists or bullet points for better readability
    const sections = text.split(/\n\n+/);
    return sections;
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🤖</Text>
          </View>
          <Text style={commonStyles.title}>AI Insights & Recommendations</Text>
          <Text style={styles.subtitle}>
            Based on ImpactWon&apos;s Right-to-Win Methodology
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.clarityBlue} />
            <Text style={styles.loadingText}>Loading insights...</Text>
          </View>
        ) : (
          <View style={styles.insightsCard}>
            {formatInsights(insights).map((section, index) => (
              <View key={index} style={styles.sectionContainer}>
                <Text style={styles.insightsText}>{section.trim()}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[buttonStyles.secondaryButton, styles.backButton]}
            onPress={() => router.back()}
          >
            <Text style={buttonStyles.secondaryButtonText}>← Back to Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.primaryButton, styles.newButton]}
            onPress={handleStartNew}
          >
            <Text style={buttonStyles.primaryButtonText}>Start New Assessment</Text>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.clarityBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  insightsCard: {
    backgroundColor: colors.card,
    borderRadius: 25,
    padding: 24,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.clarityBlue,
    boxShadow: '0px 4px 12px rgba(13, 149, 255, 0.15)',
    elevation: 4,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  insightsText: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  backButton: {
    width: '100%',
    maxWidth: 300,
  },
  newButton: {
    width: '100%',
    maxWidth: 300,
  },
});
