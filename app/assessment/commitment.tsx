
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import AssessmentQuestion from '@/components/AssessmentQuestion';

export default function CommitmentScreen() {
  const { answers, setAnswers } = useAssessment();
  const [gateQuestion, setGateQuestion] = useState(answers.commitment.gateQuestion);
  const [outcome, setOutcome] = useState(answers.commitment.outcome);
  const [outcomeResponse, setOutcomeResponse] = useState(answers.commitment.outcomeResponse || '');
  const [satisfaction, setSatisfaction] = useState(answers.commitment.satisfaction);
  const [satisfactionResponse, setSatisfactionResponse] = useState(answers.commitment.satisfactionResponse || '');

  const handleNext = () => {
    setAnswers({
      ...answers,
      commitment: {
        gateQuestion,
        outcome,
        outcomeResponse,
        satisfaction,
        satisfactionResponse,
      },
    });
    router.push('/assessment/control');
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={commonStyles.title}>Commitment Assessment</Text>
        <Text style={[commonStyles.text, styles.subtitle]}>
          Commitment = Outcome × Satisfaction
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.gateQuestionContainer}>
            <Text style={styles.gateQuestionText}>
              Gate Question: Is the client currently buying from us?
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  gateQuestion && styles.optionButtonSelected,
                ]}
                onPress={() => setGateQuestion(true)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    gateQuestion && styles.optionButtonTextSelected,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  !gateQuestion && styles.optionButtonSelected,
                ]}
                onPress={() => setGateQuestion(false)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    !gateQuestion && styles.optionButtonTextSelected,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {!gateQuestion && (
              <Text style={styles.warningText}>
                Note: Commitment score will be 0 (but RTW will still be calculated)
              </Text>
            )}
          </View>

          {gateQuestion && (
            <>
              <AssessmentQuestion
                question="Outcome: Have we delivered to the contract? How would an audit score our delivery?"
                value={outcome}
                onValueChange={setOutcome}
                textResponse={outcomeResponse}
                onTextResponseChange={setOutcomeResponse}
              />

              <AssessmentQuestion
                question="Satisfaction: Is the client satisfied with our organisation and delivery? Do they come to us first?"
                value={satisfaction}
                onValueChange={setSatisfaction}
                textResponse={satisfactionResponse}
                onTextResponseChange={setSatisfactionResponse}
              />
            </>
          )}

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[buttonStyles.secondaryButton, styles.backButton]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyles.primaryButton, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={buttonStyles.primaryButtonText}>Next: Control</Text>
            </TouchableOpacity>
          </View>
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
  subtitle: {
    marginBottom: 30,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  gateQuestionContainer: {
    backgroundColor: colors.card,
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.clarityBlue,
  },
  gateQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.focusBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.clarityBlue,
    backgroundColor: colors.card,
    minWidth: 100,
  },
  optionButtonSelected: {
    backgroundColor: colors.clarityBlue,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.clarityBlue,
    textAlign: 'center',
  },
  optionButtonTextSelected: {
    color: colors.textLight,
  },
  warningText: {
    fontSize: 12,
    color: colors.beaconOrange,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 16,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});
