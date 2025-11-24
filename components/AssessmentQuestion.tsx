
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@/styles/commonStyles';

interface AssessmentQuestionProps {
  question: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function AssessmentQuestion({
  question,
  value,
  onValueChange,
  min = 1,
  max = 10,
}: AssessmentQuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>{min}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={1}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor={colors.clarityBlue}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.clarityBlue}
        />
        <Text style={styles.label}>{max}</Text>
      </View>
      <Text style={styles.value}>Current rating: {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: '100%',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.focusBlue,
    marginBottom: 16,
    lineHeight: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.focusBlue,
    width: 30,
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.clarityBlue,
    textAlign: 'center',
    marginTop: 8,
  },
});
