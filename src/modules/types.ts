import { z } from 'zod';
import { LucideIcon } from 'lucide-react';

export type ModuleId = 
  | 'consumer_complaint'
  | 'rti_application'
  | 'legal_notice'
  | 'police_complaint'
  | 'employment_grievance'
  | 'rental_dispute'
  | 'banking_fraud';

export interface ModuleField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'number' | 'checkbox';
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string }[];
  validation?: z.ZodTypeAny;
  aiSuggest?: boolean;
}

export interface ModuleStep {
  id: string;
  title: string;
  description?: string;
  fields: ModuleField[];
}

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  icon: LucideIcon;
  steps: ModuleStep[];
  schema: z.ZodObject<any>;
}
