import { z } from 'zod';
import { FileText } from 'lucide-react';
import { ModuleConfig } from './types';

export const rtiApplicationSchema = z.object({
  applicant_name: z.string().min(1, 'Name is required'),
  applicant_address: z.string().min(5, 'Address is required'),
  public_authority: z.string().min(1, 'Public authority name is required'),
  information_sought: z.string().min(10, 'Please describe the information you need'),
  time_period: z.string().min(1, 'Time period is required'),
  is_bpl: z.boolean().default(false),
  payment_details: z.string().optional(),
});

export const rtiApplicationConfig: ModuleConfig = {
  id: 'rti_application',
  title: 'RTI Application',
  description: 'Right to Information requests under RTI Act 2005',
  icon: FileText,
  schema: rtiApplicationSchema,
  steps: [
    {
      id: 'applicant_details',
      title: 'Applicant Details',
      fields: [
        { id: 'applicant_name', label: 'Full Name', type: 'text' },
        { id: 'applicant_address', label: 'Postal Address', type: 'textarea' },
      ],
    },
    {
      id: 'authority_details',
      title: 'Authority Details',
      fields: [
        { 
          id: 'public_authority', 
          label: 'PIO / Public Authority', 
          type: 'text', 
          placeholder: 'e.g. Public Information Officer, Municipal Corp of...' 
        },
      ],
    },
    {
      id: 'info_details',
      title: 'Information Required',
      fields: [
        { 
          id: 'information_sought', 
          label: 'Description of Information', 
          type: 'textarea', 
          aiSuggest: true,
          placeholder: 'List down specific documents or information sought...' 
        },
        { 
          id: 'time_period', 
          label: 'Relevant Time Period', 
          type: 'text', 
          placeholder: 'e.g. FY 2022-23 to 2023-24' 
        },
      ],
    },
    {
      id: 'payment_step',
      title: 'Payment & Category',
      fields: [
        { id: 'is_bpl', label: 'Is the applicant below poverty line?', type: 'select', options: [
          { label: 'No', value: 'false' },
          { label: 'Yes', value: 'true' }
        ]},
        { id: 'payment_details', label: 'Payment Receipt No / Mode', type: 'text', placeholder: 'Not required if BPL' },
      ],
    },
  ],
};
