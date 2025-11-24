
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function DealDetailsScreen() {
  const { dealDetails, setDealDetails } = useAssessment();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const salesStages = [
    'Prospecting',
    'Qualification',
    'Needs Analysis',
    'Proposal',
    'Negotiation',
    'Closing',
  ];

  const handleNext = () => {
    if (!dealDetails.clientName || !dealDetails.dealName) {
      alert('Please fill in at least the client name and deal name');
      return;
    }
    router.push('/assessment/credibility');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setTempDate(selectedDate);
      setDealDetails({
        ...dealDetails,
        expectedCloseDate: selectedDate.toISOString().split('T')[0],
      });
    }
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

          <Text style={commonStyles.label}>Deal Value (Optional)</Text>
          <TextInput
            style={commonStyles.input}
            value={dealDetails.dealValue}
            onChangeText={(text) => setDealDetails({ ...dealDetails, dealValue: text })}
            placeholder="e.g., £500,000"
            placeholderTextColor={colors.border}
            keyboardType="numeric"
          />

          <Text style={commonStyles.label}>Expected Close Date (Optional)</Text>
          <TouchableOpacity
            style={[commonStyles.input, styles.dateButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={dealDetails.expectedCloseDate ? styles.dateText : styles.datePlaceholder}>
              {dealDetails.expectedCloseDate || 'Select date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

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
  dateButton: {
    justifyContent: 'center',
  },
  dateText: {
    color: colors.text,
    fontSize: 16,
  },
  datePlaceholder: {
    color: colors.border,
    fontSize: 16,
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
