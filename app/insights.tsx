
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';

export default function InsightsScreen() {
  const { insights } = useLocalSearchParams();
  const { resetAssessment } = useAssessment();

  const handleStartNew = () => {
    resetAssessment();
    router.push('/(tabs)/(home)/');
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={commonStyles.title}>AI Insights & Recommendations</Text>

        <View style={styles.insightsCard}>
          <Text style={styles.insightsText}>{insights}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[buttonStyles.secondaryButton, styles.backButton]}
            onPress={() => router.back()}
          >
            <Text style={buttonStyles.secondaryButtonText}>Back to Results</Text>
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
  insightsCard: {
    backgroundColor: colors.card,
    borderRadius: 25,
    padding: 24,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.clarityBlue,
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
