
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assessments: {
        Row: {
          id: string
          created_at: string | null
          first_name: string
          surname: string
          email: string
          mobile: string | null
          brand_advocate: number | null
          investigator: number | null
          team_player: number | null
          leadership_ethics: number | null
          business_acumen: number | null
          products_services: number | null
          sales_planning_selling: number | null
          experience_rating: number | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          first_name: string
          surname: string
          email: string
          mobile?: string | null
          brand_advocate?: number | null
          investigator?: number | null
          team_player?: number | null
          leadership_ethics?: number | null
          business_acumen?: number | null
          products_services?: number | null
          sales_planning_selling?: number | null
          experience_rating?: number | null
        }
        Update: {
          id?: string
          created_at?: string | null
          first_name?: string
          surname?: string
          email?: string
          mobile?: string | null
          brand_advocate?: number | null
          investigator?: number | null
          team_player?: number | null
          leadership_ethics?: number | null
          business_acumen?: number | null
          products_services?: number | null
          sales_planning_selling?: number | null
          experience_rating?: number | null
        }
      }
      deals: {
        Row: {
          id: string
          created_at: string | null
          updated_at: string | null
          client_name: string
          deal_name: string
          email: string | null
          deal_value: number | null
          expected_close_date: string | null
          sales_stage: string | null
          deal_context: string | null
          credibility_score: number | null
          capability_score: number | null
          commitment_score: number | null
          control_score: number | null
          rtw_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          updated_at?: string | null
          client_name: string
          deal_name: string
          email?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          sales_stage?: string | null
          deal_context?: string | null
          credibility_score?: number | null
          capability_score?: number | null
          commitment_score?: number | null
          control_score?: number | null
          rtw_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string | null
          updated_at?: string | null
          client_name?: string
          deal_name?: string
          email?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          sales_stage?: string | null
          deal_context?: string | null
          credibility_score?: number | null
          capability_score?: number | null
          commitment_score?: number | null
          control_score?: number | null
          rtw_score?: number | null
        }
      }
      rtw_assessments: {
        Row: {
          id: string
          created_at: string | null
          deal_id: string | null
          credibility_knowledge: number | null
          credibility_trust: number | null
          credibility_gate_question: boolean | null
          capability_competence: number | null
          capability_quantum: number | null
          capability_gate_question: boolean | null
          commitment_outcome: number | null
          commitment_satisfaction: number | null
          commitment_gate_question: boolean | null
          control_mastery: number | null
          control_influence: number | null
          control_gate_question: boolean | null
          credibility_score: number | null
          capability_score: number | null
          commitment_score: number | null
          control_score: number | null
          rtw_score: number | null
          ai_insights: string | null
          credibility_knowledge_response: string | null
          credibility_trust_response: string | null
          capability_competence_response: string | null
          capability_quantum_response: string | null
          commitment_outcome_response: string | null
          commitment_satisfaction_response: string | null
          control_mastery_response: string | null
          control_influence_response: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          deal_id?: string | null
          credibility_knowledge?: number | null
          credibility_trust?: number | null
          credibility_gate_question?: boolean | null
          capability_competence?: number | null
          capability_quantum?: number | null
          capability_gate_question?: boolean | null
          commitment_outcome?: number | null
          commitment_satisfaction?: number | null
          commitment_gate_question?: boolean | null
          control_mastery?: number | null
          control_influence?: number | null
          control_gate_question?: boolean | null
          credibility_score?: number | null
          capability_score?: number | null
          commitment_score?: number | null
          control_score?: number | null
          rtw_score?: number | null
          ai_insights?: string | null
          credibility_knowledge_response?: string | null
          credibility_trust_response?: string | null
          capability_competence_response?: string | null
          capability_quantum_response?: string | null
          commitment_outcome_response?: string | null
          commitment_satisfaction_response?: string | null
          control_mastery_response?: string | null
          control_influence_response?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          deal_id?: string | null
          credibility_knowledge?: number | null
          credibility_trust?: number | null
          credibility_gate_question?: boolean | null
          capability_competence?: number | null
          capability_quantum?: number | null
          capability_gate_question?: boolean | null
          commitment_outcome?: number | null
          commitment_satisfaction?: number | null
          commitment_gate_question?: boolean | null
          control_mastery?: number | null
          control_influence?: number | null
          control_gate_question?: boolean | null
          credibility_score?: number | null
          capability_score?: number | null
          commitment_score?: number | null
          control_score?: number | null
          rtw_score?: number | null
          ai_insights?: string | null
          credibility_knowledge_response?: string | null
          credibility_trust_response?: string | null
          capability_competence_response?: string | null
          capability_quantum_response?: string | null
          commitment_outcome_response?: string | null
          commitment_satisfaction_response?: string | null
          control_mastery_response?: string | null
          control_influence_response?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
