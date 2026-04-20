import { z } from 'zod';
import { AlertTriangle } from 'lucide-react';
import { ModuleConfig } from './types';

export const legalNoticeSchema = z.object({
  sender_name: z.string().min(1, 'Sender name is required'),
  sender_address: z.string().min(5, 'Sender address is required'),
  recipient_name: z.string().min(1, 'Recipient name is required'),
  recipient_address: z.string().min(5, 'Recipient address is required'),
  subject: z.string().min(5, 'Subject is required'),
  facts_of_case: z.string().min(20, 'Provide at least 20 chars of facts'),
  legal_grounds: z.string().min(10, 'Specify legal grounds'),
  demand: z.string().min(10, 'Specify your demand'),
  deadline_days: z.string().min(1, 'Deadline is required'),
});

export const legalNoticeConfig: ModuleConfig = {
  id: 'legal_notice',
  title: 'Legal Notice',
  description: 'Demand letters & legal warnings under CPC Sec 80',
  icon: AlertTriangle,
  schema: legalNoticeSchema,
  steps: [
    {
      id: 'parties',
      title: 'Parties Involved',
      fields: [
        { id: 'sender_name', label: 'Sender Name', type: 'text' },
        { id: 'sender_address', label: 'Sender Address', type: 'textarea' },
        { id: 'recipient_name', label: 'Recipient Name', type: 'text' },
        { id: 'recipient_address', label: 'Recipient Address', type: 'textarea' },
      ],
    },
    {
      id: 'context',
      title: 'Context & Facts',
      fields: [
        { id: 'subject', label: 'Subject / Title of Notice', type: 'text', placeholder: 'e.g. Notice for Unpaid Dues' },
        { id: 'facts_of_case', label: 'Detailed Facts', type: 'textarea', aiSuggest: true },
        { id: 'legal_grounds', label: 'Legal Basis', type: 'textarea', aiSuggest: true, placeholder: 'Specific sections or laws violated...' },
      ],
    },
    {
      id: 'itc',
      title: 'Instruction to Comply',
      fields: [
        { id: 'demand', label: 'Demand / Resolution Sought', type: 'textarea', aiSuggest: true },
        { id: 'deadline_days', label: 'Deadline (Days)', type: 'number', placeholder: 'e.g. 15' },
      ],
    },
  ],
};
