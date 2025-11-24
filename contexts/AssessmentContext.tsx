
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DealDetails, AssessmentAnswers, Scores, AssessmentData } from '@/types/assessment';

interface AssessmentContextType {
  dealDetails: DealDetails;
  setDealDetails: (details: DealDetails) => void;
  answers: AssessmentAnswers;
  setAnswers: (answers: AssessmentAnswers) => void;
  scores: Scores | null;
  setScores: (scores: Scores) => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const initialAnswers: AssessmentAnswers = {
  credibility: {
    gateQuestion: false,
    knowledge: 5,
    knowledgeResponse: '',
    trust: 5,
    trustResponse: '',
  },
  capability: {
    gateQuestion: false,
    competence: 5,
    competenceResponse: '',
    quantum: 5,
    quantumResponse: '',
  },
  commitment: {
    gateQuestion: false,
    outcome: 5,
    outcomeResponse: '',
    satisfaction: 5,
    satisfactionResponse: '',
  },
  control: {
    gateQuestion: false,
    mastery: 5,
    masteryResponse: '',
    influence: 5,
    influenceResponse: '',
  },
};

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [dealDetails, setDealDetails] = useState<DealDetails>({
    clientName: '',
    dealName: '',
    dealValue: '',
    expectedCloseDate: '',
    salesStage: '',
    dealContext: '',
  });

  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers);
  const [scores, setScores] = useState<Scores | null>(null);

  const resetAssessment = () => {
    setDealDetails({
      clientName: '',
      dealName: '',
      dealValue: '',
      expectedCloseDate: '',
      salesStage: '',
      dealContext: '',
    });
    setAnswers(initialAnswers);
    setScores(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        dealDetails,
        setDealDetails,
        answers,
        setAnswers,
        scores,
        setScores,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
