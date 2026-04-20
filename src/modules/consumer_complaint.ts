import { z } from 'zod';
import { Shield } from 'lucide-react';
import { ModuleConfig } from './types';

export const consumerComplaintSchema = z.object({
  complainant_name: z.string().min(1, 'Name is required'),
  complainant_address: z.string().min(5, 'Full address is required'),
  complainant_phone: z.string().min(10, 'Valid phone is required'),
  opposite_party_name: z.string().min(1, 'Opposite party name is required'),
  opposite_party_address: z.string().min(5, 'Opposite party address is required'),
  purchase_date: z.string().min(1, 'Purchase date is required'),
  transaction_amount: z.string().min(1, 'Amount is required'),
  defect_description: z.string().min(20, 'Please provide a detailed description (min 20 chars)'),
  relief_sought: z.string().min(10, 'Please specify what relief you are seeking'),
});

export const consumerComplaintConfig: ModuleConfig = {
  id: 'consumer_complaint',
  title: 'Consumer Complaint',
  description: 'Consumer forum & product disputes under CP Act 2019',
  icon: Shield,
  schema: consumerComplaintSchema,
  steps: [
    {
      id: 'personal_info',
      title: 'Personal Details',
      description: 'Your contact information for the complaint',
      fields: [
        {
          id: 'complainant_name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'As per ID proof',
        },
        {
          id: 'complainant_address',
          label: 'Full Address',
          type: 'textarea',
          placeholder: 'Current residential address',
        },
        {
          id: 'complainant_phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: '+91 ...',
        },
      ],
    },
    {
      id: 'dispute_details',
      title: 'Dispute Details',
      description: 'Who are you complaining against?',
      fields: [
        {
          id: 'opposite_party_name',
          label: 'Opposite Party Name',
          type: 'text',
          placeholder: 'Company or Individual name',
        },
        {
          id: 'opposite_party_address',
          label: 'Opposite Party Address',
          type: 'textarea',
          placeholder: 'Registered office address',
        },
      ],
    },
    {
      id: 'transaction_info',
      title: 'Transaction & Facts',
      description: 'Provide details about the purchase and the issue',
      fields: [
        {
          id: 'purchase_date',
          label: 'Date of Purchase/Service',
          type: 'date',
        },
        {
          id: 'transaction_amount',
          label: 'Transaction Amount (INR)',
          type: 'text',
          placeholder: 'e.g., 50,000',
        },
        {
          id: 'defect_description',
          label: 'Description of Defect/Service Deficiency',
          type: 'textarea',
          placeholder: 'Describe exactly what went wrong...',
          aiSuggest: true,
        },
        {
          id: 'relief_sought',
          label: 'Relief Sought',
          type: 'textarea',
          placeholder: 'Refund, replacement, compensation...',
          aiSuggest: true,
        },
      ],
    },
  ],
};
