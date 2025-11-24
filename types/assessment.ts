
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
    trust: number;
  };
  capability: {
    gateQuestion: boolean;
    competence: number;
    quantum: number;
  };
  commitment: {
    gateQuestion: boolean;
    outcome: number;
    satisfaction: number;
  };
  control: {
    gateQuestion: boolean;
    mastery: number;
    influence: number;
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
