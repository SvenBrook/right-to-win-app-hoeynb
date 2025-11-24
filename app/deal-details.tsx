
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Picker } from '@react-native-picker/picker';

export default function DealDetailsScreen() {
  const { dealDetails, setDealDetails } = useAssessment();

  const salesStages = [
    'Prospecting',
    'Qualification',
    'Needs Analysis',
    'Proposal',
    'Negotiation',
    'Closing',
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!dealDetails.clientName || !dealDetails.dealName || !dealDetails.email) {
      alert('Please fill in the client name, deal name, and email address');
      return;
    }

    if (!validateEmail(dealDetails.email)) {
      alert('Please enter a valid email address');
      return;
    }

    router.push('/assessment/credibility');
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={commonStyles.title}>Deal Details</Text>
        <Text style={[commonStyles.text, styles.subtitle]}>
          Enter the key information about your deal
        </Text>

        <View style={styles.formContainer}>
          <Text style={commonStyles.label}>Client Name *</Text>
          <TextInput
            style={commonStyles.input}
            value={dealDetails.clientName}
            onChangeText={(text) => setDealDetails({ ...dealDetails, clientName: text })}
            placeholder="Enter client name"
            placeholderTextColor={colors.border}
          />

          <Text style={commonStyles.label}>Deal Name *</Text>
          <TextInput
            style={commonStyles.input}
            value={dealDetails.dealName}
            onChangeText={(text) => setDealDetails({ ...dealDetails, dealName: text })}
            placeholder="Enter deal name"
            placeholderTextColor={colors.border}
          />

          <Text style={commonStyles.label}>Email Address *</Text>
          <TextInput
            style={commonStyles.input}
            value={dealDetails.email}
            onChangeText={(text) => setDealDetails({ ...dealDetails, email: text })}
            placeholder="Enter email address"
            placeholderTextColor={colors.border}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={commonStyles.label}>Sales Stage (Optional)</Text>
          <View style={[commonStyles.input, styles.pickerContainer]}>
            <Picker
              selectedValue={dealDetails.salesStage}
              onValueChange={(value) => setDealDetails({ ...dealDetails, salesStage: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select stage" value="" />
              {salesStages.map((stage, index) => (
                <Picker.Item key={index} label={stage} value={stage} />
              ))}
            </Picker>
          </View>

          <Text style={commonStyles.label}>Deal Context (Optional)</Text>
          <TextInput
            style={[commonStyles.input, styles.textArea]}
            value={dealDetails.dealContext}
            onChangeText={(text) => setDealDetails({ ...dealDetails, dealContext: text })}
            placeholder="Add any relevant context about this deal..."
            placeholderTextColor={colors.border}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[buttonStyles.primaryButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={buttonStyles.primaryButtonText}>Next: Credibility</Text>
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
  subtitle: {
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  pickerContainer: {
    padding: 0,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: colors.text,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  nextButton: {
    marginTop: 30,
    width: '100%',
  },
});
