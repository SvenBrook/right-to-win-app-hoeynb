
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import { calculateScores } from '@/utils/scoreCalculator';
import { supabase } from '@/app/integrations/supabase/client';

export default function ControlScreen() {
  const { answers, setAnswers, dealDetails, setScores } = useAssessment();
  const [gateQuestion, setGateQuestion] = useState(answers.control.gateQuestion);
  const [mastery, setMastery] = useState(answers.control.mastery);
  const [influence, setInfluence] = useState(answers.control.influence);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    
    const updatedAnswers = {
      ...answers,
      control: {
        gateQuestion,
        mastery,
        influence,
      },
    };
    
    setAnswers(updatedAnswers);
    
    // Calculate scores
    const calculatedScores = calculateScores(updatedAnswers);
    setScores(calculatedScores);

    try {
      // Save to database
      const { data: dealData, error: dealError } = await supabase
        .from('deals')
        .insert({
          client_name: dealDetails.clientName,
          deal_name: dealDetails.dealName,
          deal_value: dealDetails.dealValue ? parseFloat(dealDetails.dealValue.replace(/[^0-9.-]+/g, '')) : null,
          expected_close_date: dealDetails.expectedCloseDate || null,
          sales_stage: dealDetails.salesStage || null,
          deal_context: dealDetails.dealContext || null,
          credibility_score: calculatedScores.credibility,
          capability_score: calculatedScores.capability,
          commitment_score: calculatedScores.commitment,
          control_score: calculatedScores.control,
          rtw_score: calculatedScores.rtw,
        })
        .select()
        .single();

      if (dealError) {
        console.error('Error saving deal:', dealError);
      } else if (dealData) {
        // Save assessment details
        const { error: assessmentError } = await supabase
          .from('rtw_assessments')
          .insert({
            deal_id: dealData.id,
            credibility_knowledge: updatedAnswers.credibility.knowledge,
            credibility_trust: updatedAnswers.credibility.trust,
            credibility_gate_question: updatedAnswers.credibility.gateQuestion,
            capability_competence: updatedAnswers.capability.competence,
            capability_quantum: updatedAnswers.capability.quantum,
            capability_gate_question: updatedAnswers.capability.gateQuestion,
            commitment_outcome: updatedAnswers.commitment.outcome,
            commitment_satisfaction: updatedAnswers.commitment.satisfaction,
            commitment_gate_question: updatedAnswers.commitment.gateQuestion,
            control_mastery: updatedAnswers.control.mastery,
            control_influence: updatedAnswers.control.influence,
            control_gate_question: updatedAnswers.control.gateQuestion,
            credibility_score: calculatedScores.credibility,
            capability_score: calculatedScores.capability,
            commitment_score: calculatedScores.commitment,
            control_score: calculatedScores.control,
            rtw_score: calculatedScores.rtw,
          });

        if (assessmentError) {
          console.error('Error saving assessment:', assessmentError);
        }
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    }

    setLoading(false);
    router.push('/results');
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={commonStyles.title}>Control Assessment</Text>
        <Text style={[commonStyles.text, styles.subtitle]}>
          Control = Mastery × Influence
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.gateQuestionContainer}>
            <Text style={styles.gateQuestionText}>
              Gate Question: Do we see our fingerprints on the deal?
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
                Note: Mastery and Influence scores will be capped at 5 (50% maximum)
              </Text>
            )}
          </View>

          <AssessmentQuestion
            question="Mastery: Are our fingerprints unique to our organisation? Are we the best in the world at this?"
            value={mastery}
            onValueChange={setMastery}
          />

          <AssessmentQuestion
            question="Influence: Does the client value our mastery? Have we demonstrated benefits to their needs?"
            value={influence}
            onValueChange={setInfluence}
          />

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[buttonStyles.secondaryButton, styles.backButton]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyles.primaryButton, styles.nextButton]}
              onPress={handleComplete}
              disabled={loading}
            >
              <Text style={buttonStyles.primaryButtonText}>
                {loading ? 'Calculating...' : 'View Results'}
              </Text>
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
