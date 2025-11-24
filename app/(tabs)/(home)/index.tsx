
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
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

        <Text style={commonStyles.title}>Right-to-Win Deal Check</Text>
        
        <Text style={[commonStyles.text, styles.description]}>
          Run a quick Right-to-Win assessment on your live deal using the 4Cs from CEO-Led Sales:
        </Text>

        <View style={styles.fourCsContainer}>
          <View style={styles.cItem}>
            <View style={[styles.cCircle, { backgroundColor: colors.clarityBlue }]}>
              <Text style={styles.cText}>C</Text>
            </View>
            <Text style={styles.cLabel}>Credibility</Text>
          </View>

          <View style={styles.cItem}>
            <View style={[styles.cCircle, { backgroundColor: colors.clarityBlue }]}>
              <Text style={styles.cText}>C</Text>
            </View>
            <Text style={styles.cLabel}>Capability</Text>
          </View>

          <View style={styles.cItem}>
            <View style={[styles.cCircle, { backgroundColor: colors.clarityBlue }]}>
              <Text style={styles.cText}>C</Text>
            </View>
            <Text style={styles.cLabel}>Commitment</Text>
          </View>

          <View style={styles.cItem}>
            <View style={[styles.cCircle, { backgroundColor: colors.clarityBlue }]}>
              <Text style={styles.cText}>C</Text>
            </View>
            <Text style={styles.cLabel}>Control</Text>
          </View>
        </View>

        <Text style={[commonStyles.text, styles.infoText]}>
          This assessment will help you evaluate your deal's strength across all four competencies and provide actionable insights to improve your chances of winning.
        </Text>

        <TouchableOpacity
          style={[buttonStyles.primaryButton, styles.startButton]}
          onPress={() => router.push('/deal-details')}
        >
          <Text style={buttonStyles.primaryButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.focusBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textLight,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  fourCsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 20,
  },
  cItem: {
    alignItems: 'center',
    width: 80,
  },
  cCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textLight,
  },
  cLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.focusBlue,
    textAlign: 'center',
  },
  infoText: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  startButton: {
    marginTop: 20,
    width: '100%',
    maxWidth: 300,
  },
});
