import { z } from 'zod';
import { Briefcase, Home, CreditCard } from 'lucide-react';
import { ModuleConfig } from './types';

// ==========================================
// 5. Employment Grievance
// ==========================================
export const employmentGrievanceSchema = z.object({
  employee_name: z.string().min(1, 'Name is required'),
  employee_id: z.string().optional(),
  designation: z.string().min(1, 'Designation is required'),
  employer_name: z.string().min(1, 'Company name is required'),
  employer_address: z.string().min(5, 'Company address is required'),
  joining_date: z.string().min(1, 'Joining date is required'),
  incident_date: z.string().min(1, 'Incident date is required'),
  grievance_type: z.enum(['wrongful_termination', 'unpaid_salary', 'harassment', 'pf_denial', 'other']),
  dues_amount: z.string().optional(),
  facts: z.string().min(20, 'Please provide detailed facts (min 20 chars)'),
  relief_demanded: z.string().min(10, 'Please specify what you want from the employer'),
  timeline_days: z.string().default('15'),
});

export const employmentGrievanceConfig: ModuleConfig = {
  id: 'employment_grievance',
  title: 'Employment Grievance',
  description: 'Wrongful termination, unpaid dues, or workplace harassment',
  icon: Briefcase,
  schema: employmentGrievanceSchema,
  steps: [
    {
      id: 'parties',
      title: 'Employment Details',
      description: 'Your info and company details',
      fields: [
        { id: 'employee_name', label: 'Full Name', type: 'text', placeholder: 'As on ID' },
        { id: 'employee_id', label: 'Employee ID', type: 'text', placeholder: 'Optional' },
        { id: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g. Senior Manager' },
        { id: 'joining_date', label: 'Date of Joining', type: 'date' },
        { id: 'employer_name', label: 'Company Name', type: 'text' },
        { id: 'employer_address', label: 'Company Address', type: 'textarea' },
      ],
    },
    {
      id: 'grievance',
      title: 'Grievance Factuals',
      description: 'What happened and when?',
      fields: [
        { id: 'grievance_type', label: 'Nature of Grievance', type: 'select', options: [
          { label: 'Wrongful Termination', value: 'wrongful_termination' },
          { label: 'Unpaid Salary/Dues', value: 'unpaid_salary' },
          { label: 'Harassment/POSH', value: 'harassment' },
          { label: 'PF/Benefits Denial', value: 'pf_denial' },
          { label: 'Other', value: 'other' }
        ]},
        { id: 'incident_date', label: 'Date of Incident/Termination', type: 'date' },
        { id: 'dues_amount', label: 'Claim Amount (if any)', type: 'text', placeholder: 'e.g. 2,50,000' },
        { id: 'facts', label: 'Statement of Facts', type: 'textarea', placeholder: 'Explain the sequence of events...', aiSuggest: true },
      ],
    },
    {
      id: 'resolution',
      title: 'Resolution',
      description: 'What are you demanding?',
      fields: [
        { id: 'relief_demanded', label: 'Relief Demanded', type: 'textarea', placeholder: 'e.g. Immediate reinstatement with back wages...', aiSuggest: true },
        { id: 'timeline_days', label: 'Response Timeline (Days)', type: 'select', options: [
          { label: '7 Days', value: '7' },
          { label: '15 Days', value: '15' },
          { label: '30 Days', value: '30' }
        ]},
      ],
    },
  ],
};

// ==========================================
// 6. Rental Dispute Notice
// ==========================================
export const rentalDisputeSchema = z.object({
  sender_role: z.enum(['landlord', 'tenant']),
  landlord_name: z.string().min(1),
  landlord_address: z.string().min(5),
  tenant_name: z.string().min(1),
  tenant_address: z.string().min(5),
  property_address: z.string().min(10),
  lease_start_date: z.string().min(1),
  monthly_rent: z.string().min(1),
  dispute_type: z.enum(['deposit', 'eviction', 'maintenance', 'rent_arrears', 'other']),
  arrears_amount: z.string().optional(),
  dispute_facts: z.string().min(20),
  remedy_sought: z.string().min(10),
  notice_period_days: z.string().default('15'),
});

export const rentalDisputeConfig: ModuleConfig = {
  id: 'rental_dispute',
  title: 'Rental Dispute',
  description: 'Deposit refunds, eviction notices, and rent arrears',
  icon: Home,
  schema: rentalDisputeSchema,
  steps: [
    {
      id: 'roles',
      title: 'Parties',
      fields: [
        { id: 'sender_role', label: 'You are the...', type: 'select', options: [
          { label: 'Landlord', value: 'landlord' },
          { label: 'Tenant', value: 'tenant' }
        ]},
        { id: 'landlord_name', label: 'Landlord Full Name', type: 'text' },
        { id: 'landlord_address', label: 'Landlord Address', type: 'textarea' },
        { id: 'tenant_name', label: 'Tenant Full Name', type: 'text' },
        { id: 'tenant_address', label: 'Tenant Address', type: 'textarea' },
      ],
    },
    {
      id: 'property',
      title: 'Property & Lease',
      fields: [
        { id: 'property_address', label: 'Address of Rented Property', type: 'textarea' },
        { id: 'lease_start_date', label: 'Lease Commencement Date', type: 'date' },
        { id: 'monthly_rent', label: 'Monthly Rent (INR)', type: 'text' },
      ],
    },
    {
      id: 'dispute',
      title: 'The Dispute',
      fields: [
        { id: 'dispute_type', label: 'Core Dispute', type: 'select', options: [
          { label: 'Security Deposit Refund', value: 'deposit' },
          { label: 'Eviction/Vacate Notice', value: 'eviction' },
          { label: 'Maintenance Failures', value: 'maintenance' },
          { label: 'Unpaid Rent Arrears', value: 'rent_arrears' },
          { label: 'Other', value: 'other' }
        ]},
        { id: 'arrears_amount', label: 'Amount in Dispute (if any)', type: 'text' },
        { id: 'dispute_facts', label: 'Factual Narrative', type: 'textarea', aiSuggest: true },
        { id: 'remedy_sought', label: 'Demand / Action Required', type: 'textarea', aiSuggest: true },
        { id: 'notice_period_days', label: 'Notice Period (Days)', type: 'text', placeholder: 'e.g. 15' },
      ],
    },
  ],
};

// ==========================================
// 7. Banking / UPI Fraud
// ==========================================
export const bankingFraudSchema = z.object({
  account_holder: z.string().min(1),
  bank_name: z.string().min(1),
  bank_branch: z.string().min(1),
  account_number: z.string().min(1),
  transaction_id: z.string().min(1),
  transaction_date: z.string().min(1),
  transaction_amount: z.string().min(1),
  fraud_type: z.enum(['phishing', 'vishing', 'upi_fraud', 'sim_swap', 'card_cloning', 'other']),
  narrative: z.string().min(20),
  actions_taken: z.string().min(10),
  bank_complaint_ref: z.string().optional(),
  cybercrime_ref: z.string().optional(),
  relief_sought: z.string().min(10),
});

export const bankingFraudConfig: ModuleConfig = {
  id: 'banking_fraud',
  title: 'Banking / UPI Fraud',
  description: 'Cybercrime, unauthorized transactions, and UPI theft',
  icon: CreditCard,
  schema: bankingFraudSchema,
  steps: [
    {
      id: 'account',
      title: 'Financial Info',
      fields: [
        { id: 'account_holder', label: 'Account Holder Name', type: 'text' },
        { id: 'bank_name', label: 'Bank / Wallet Name', type: 'text' },
        { id: 'bank_branch', label: 'Branch / Office Location', type: 'text' },
        { id: 'account_number', label: 'Account Number / UPI ID', type: 'text' },
      ],
    },
    {
      id: 'incident',
      title: 'Fraud Details',
      fields: [
        { id: 'fraud_type', label: 'Type of Fraud', type: 'select', options: [
          { label: 'Phishing Link', value: 'phishing' },
          { label: 'Vishing (Call) Fraud', value: 'vishing' },
          { label: 'Unauthorized UPI Transfer', value: 'upi_fraud' },
          { label: 'SIM Swap', value: 'sim_swap' },
          { label: 'Card Cloning/ATM', value: 'card_cloning' },
          { label: 'Other', value: 'other' }
        ]},
        { id: 'transaction_id', label: 'Transaction ID / UTR', type: 'text' },
        { id: 'transaction_date', label: 'Date & Time of Fraud', type: 'text', placeholder: 'e.g. 20 April, 2:30 PM' },
        { id: 'transaction_amount', label: 'Amount Involved (INR)', type: 'text' },
        { id: 'narrative', label: 'Sequence of Events', type: 'textarea', aiSuggest: true },
      ],
    },
    {
      id: 'compliance',
      title: 'Reporting & Relief',
      fields: [
        { id: 'actions_taken', label: 'Immediate Actions Taken', type: 'textarea', placeholder: 'e.g. Called bank toll-free, locked card...' },
        { id: 'bank_complaint_ref', label: 'Bank Complaint Ref #', type: 'text' },
        { id: 'cybercrime_ref', label: 'Cybercrime Portal Ref #', type: 'text' },
        { id: 'relief_sought', label: 'Desired Outcome', type: 'textarea', aiSuggest: true },
      ],
    },
  ],
};
