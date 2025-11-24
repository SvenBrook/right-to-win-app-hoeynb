
import { AssessmentAnswers, Scores } from '@/types/assessment';

export function calculateScores(answers: AssessmentAnswers): Scores {
  // Credibility = Knowledge × Trust (normalized to 0-100)
  let credibilityKnowledge = answers.credibility.knowledge;
  let credibilityTrust = answers.credibility.trust;
  
  // Gate question: if cannot meet CEO within 7 days, cap at 5
  if (!answers.credibility.gateQuestion) {
    credibilityKnowledge = Math.min(credibilityKnowledge, 5);
    credibilityTrust = Math.min(credibilityTrust, 5);
  }
  
  const credibility = (credibilityKnowledge * credibilityTrust);

  // Capability = Competence × Quantum (normalized to 0-100)
  let capabilityCompetence = answers.capability.competence;
  let capabilityQuantum = answers.capability.quantum;
  
  // Gate question: if cannot reference product in-region and in-industry, cap at 5
  if (!answers.capability.gateQuestion) {
    capabilityCompetence = Math.min(capabilityCompetence, 5);
    capabilityQuantum = Math.min(capabilityQuantum, 5);
  }
  
  const capability = (capabilityCompetence * capabilityQuantum);

  // Commitment = Outcome × Satisfaction (normalized to 0-100)
  let commitment = 0;
  
  // Gate question: if client is not currently buying from us, score = 0
  if (answers.commitment.gateQuestion) {
    commitment = (answers.commitment.outcome * answers.commitment.satisfaction);
  }

  // Control = Mastery × Influence (normalized to 0-100)
  let controlMastery = answers.control.mastery;
  let controlInfluence = answers.control.influence;
  
  // Gate question: if we don't see our fingerprints on the deal, cap at 5
  if (!answers.control.gateQuestion) {
    controlMastery = Math.min(controlMastery, 5);
    controlInfluence = Math.min(controlInfluence, 5);
  }
  
  const control = (controlMastery * controlInfluence);

  // RTW Score = average of all four Cs
  const rtw = Math.round((credibility + capability + commitment + control) / 4);

  return {
    credibility: Math.round(credibility),
    capability: Math.round(capability),
    commitment: Math.round(commitment),
    control: Math.round(control),
    rtw,
  };
}
