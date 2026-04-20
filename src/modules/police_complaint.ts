import { z } from 'zod';
import { Shield } from 'lucide-react';
import { ModuleConfig } from './types';

export const policeComplaintSchema = z.object({
  complainant_name: z.string().min(1, 'Name is required'),
  complainant_contact: z.string().min(10, 'Contact info is required'),
  police_station: z.string().min(1, 'Police Station is required'),
  incident_date: z.string().min(1, 'Date is required'),
  incident_location: z.string().min(1, 'Location is required'),
  offence_type: z.string().min(1, 'Offence type is required'),
  narrative: z.string().min(30, 'Provide a detailed narrative (min 30 chars)'),
  witness_details: z.string().optional(),
});

export const policeComplaintConfig: ModuleConfig = {
  id: 'police_complaint',
  title: 'Police Complaint / FIR',
  description: 'Criminal & safety reporting under CrPC Sec 154',
  icon: Shield,
  schema: policeComplaintSchema,
  steps: [
    {
      id: 'complainant',
      title: 'Complainant Info',
      fields: [
        { id: 'complainant_name', label: 'Full Name', type: 'text' },
        { id: 'complainant_contact', label: 'Contact Details', type: 'text' },
        { id: 'police_station', label: 'Police Station Jurisdiction', type: 'text' },
      ],
    },
    {
      id: 'incident',
      title: 'Incident Details',
      fields: [
        { id: 'incident_date', label: 'Date & Time of Incident', type: 'text' },
        { id: 'incident_location', label: 'Exact Location', type: 'text' },
        { id: 'offence_type', label: 'Type of Offence', type: 'text', placeholder: 'Theft, Assault, Harassment, etc.' },
      ],
    },
    {
      id: 'narrative_step',
      title: 'Detailed Narrative',
      fields: [
        { id: 'narrative', label: 'What happened?', type: 'textarea', aiSuggest: true, placeholder: 'Give a step by step account...' },
        { id: 'witness_details', label: 'Witness Details (Names/Contact)', type: 'textarea' },
      ],
    },
  ],
};
