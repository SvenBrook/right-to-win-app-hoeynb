
export interface DealDetails {
  clientName: string;
  dealName: string;
  dealValue?: string;
  expectedCloseDate?: string;
  salesStage?: string;
  dealContext?: string;
}

export interface AssessmentAnswers {
  credibility: {
    gateQuestion: boolean;
    knowledge: number;
    knowledgeResponse?: string;
    trust: number;
    trustResponse?: string;
  };
  capability: {
    gateQuestion: boolean;
    competence: number;
    competenceResponse?: string;
    quantum: number;
    quantumResponse?: string;
  };
  commitment: {
    gateQuestion: boolean;
    outcome: number;
    outcomeResponse?: string;
    satisfaction: number;
    satisfactionResponse?: string;
  };
  control: {
    gateQuestion: boolean;
    mastery: number;
    masteryResponse?: string;
    influence: number;
    influenceResponse?: string;
  };
}

export interface Scores {
  credibility: number;
  capability: number;
  commitment: number;
  control: number;
  rtw: number;
}

export interface AssessmentData {
  dealDetails: DealDetails;
  answers: AssessmentAnswers;
  scores: Scores;
}
