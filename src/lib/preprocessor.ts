import { ModuleId } from '@/modules';

/**
 * Deterministic Pre-processor (SRS 4.2)
 * Maps raw form data into a structured format for the AI background function.
 */
export const preprocessFormData = (
  moduleId: ModuleId, 
  data: any, 
  language: string
) => {
  const timestamp = new Date().toISOString();

  // Basic context shared across all modules
  const context = {
    module: moduleId,
    language: language,
    generated_at: timestamp,
    legal_framework: getLegalFramework(moduleId),
  };

  // Module-specific transformations
  let processedData = { ...data };

  switch (moduleId) {
    case 'consumer_complaint':
      processedData.formatted_amount = `INR ${processedData.transaction_amount}`;
      break;
    
    case 'rti_application':
      if (processedData.is_bpl === false || processedData.is_bpl === 'false') {
        processedData.bpl_status = 'Not Applicable';
      } else {
        processedData.bpl_status = 'Below Poverty Line - Fee Exempt';
      }
      break;
    
    case 'employment_grievance':
      processedData.legal_basis = 'Industrial Disputes Act, 1947';
      break;

    case 'rental_dispute':
      processedData.legal_basis = 'Transfer of Property Act, 1882';
      break;

    case 'banking_fraud':
      processedData.legal_basis = 'RBI Integrated Ombudsman Scheme, 2021 & IT Act 2000';
      break;

    default:
      break;
  }

  // Language specific drafting hints (SRS 6.1)
  const langHints: Record<string, string[]> = {
    en: ['Use standard Indian Legal English terminology', 'Use numbered paragraphs'],
    hi: ['Use native Hindi legal vocabulary (Vidhi Shabdavali)', 'Ensure Devanagari script is used for all narrative blocks'],
    mr: ['Use Marathi legal terminology standard in Maharashtra subordinate courts', 'Use Devanagari script'],
    gu: ['Use Gujarati legal vocabulary as accepted in Gujarat administrative offices', 'Use Gujarati script'],
  };

  return {
    context,
    form_data: processedData,
    prompt_hints: [
      `Draft in professional legal ${language}`,
      `Ensure compliance with ${context.legal_framework}`,
      `Keep the tone formal and assertive`,
      ...(langHints[language] || langHints.en)
    ]
  };
};

const getLegalFramework = (moduleId: ModuleId): string => {
  const frameworks: Record<ModuleId, string> = {
    consumer_complaint: 'Consumer Protection Act, 2019',
    rti_application: 'Right to Information Act, 2005',
    legal_notice: 'Code of Civil Procedure, Section 80',
    police_complaint: 'Code of Criminal Procedure, Section 154',
    employment_grievance: 'Industrial Disputes Act, 1947',
    rental_dispute: 'Transfer of Property Act, 1882',
    banking_fraud: 'RBI Integrated Ombudsman Scheme, 2021',
  };
  return frameworks[moduleId];
};
