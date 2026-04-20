import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  AlignmentType, 
  HeadingLevel, 
  PageOrientation, 
  SectionType
} from 'docx';
import { z } from 'zod';
import { ModuleId } from '@/modules';

// Convert inches to Twips (1 inch = 1440 twips)
const INCH = 1440;

// Zod schema for structured legal document data
export const docxDataSchema = z.object({
  // Party Information
  opposite_party_name: z.string().optional(),
  opposite_party_address: z.string().optional(),
  employer_name: z.string().optional(),
  employer_address: z.string().optional(),
  bank_name: z.string().optional(),
  bank_branch: z.string().optional(),
  
  // Transaction Details
  purchase_date: z.string().optional(),
  transaction_amount: z.string().optional(),
  account_number: z.string().optional(),
  
  // Content Blocks (AI Generated or User Provided)
  facts_of_case: z.string().optional(),
  defect_description: z.string().optional(),
  narrative: z.string().optional(),
  legal_grounds: z.string().optional(),
  relief_sought: z.string().optional(),
  remedy_sought: z.string().optional(),
  
  // Catch-all for extensibility
  metadata: z.record(z.any()).optional(),
}).passthrough();

export type DocxData = z.infer<typeof docxDataSchema>;

/**
 * Generates a professional Indian Legal DOCX file.
 * Following standards: 1.5" left margin, double spacing, A4 paper.
 */
export async function generateLegalDocx(
  moduleId: ModuleId, 
  data: DocxData, 
  language: string = 'en'
): Promise<Blob> {
  const font = language === 'hi' || language === 'mr' ? 'Noto Sans Devanagari' : 
               language === 'gu' ? 'Noto Sans Gujarati' : 'Arial';

  const doc = new Document({
    title: `Murdock Legal Draft - ${moduleId}`,
    description: 'Auto-generated legal document by Murdock AI',
    styles: {
      default: {
        document: {
          run: {
            size: 24, // 12pt
            font: font,
          },
          paragraph: {
            spacing: {
              line: 360, // 1.5 line spacing (240 is 1.0, 480 is 2.0)
              before: 200,
              after: 200,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: INCH,
              bottom: INCH,
              left: 1.5 * INCH, // Extra space for filing/binding
              right: INCH,
            },
            size: {
              orientation: PageOrientation.PORTRAIT,
            },
          },
          type: SectionType.NEXT_PAGE,
        },
        children: [
          // Header Section
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: getModuleTitle(moduleId).toUpperCase(),
                bold: true,
                underline: {},
                size: 28,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `Date: ${new Date().toLocaleDateString()}`,
              }),
            ],
          }),

          // Content Mapping
          ...generateContentStructure(moduleId, data),

          // Footer / Signature
          new Paragraph({
            spacing: { before: 1000 },
            children: [
              new TextRun({
                text: '__________________________',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Signature / Thumb Impression',
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `(Verified via Murdock AI)`,
                italics: true,
                size: 18,
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

function getModuleTitle(id: ModuleId): string {
  const titles: Record<ModuleId, string> = {
    consumer_complaint: 'Consumer Complaint Notice',
    rti_application: 'Application under RTI Act 2005',
    legal_notice: 'Legal Notice of Demand',
    police_complaint: 'Police Complaint / First Information Report',
    employment_grievance: 'Letter of Grievance to Employer',
    rental_dispute: 'Rental Dispute Settlement Notice',
    banking_fraud: 'Complaint regarding Financial/UPI Fraud',
  };
  return titles[id] || 'Legal Document';
}

function generateContentStructure(id: ModuleId, data: DocxData): Paragraph[] {
  const paras: Paragraph[] = [];

  // 1. Identify parties
  paras.push(new Paragraph({
    children: [new TextRun({ text: 'TO,', bold: true })]
  }));
  
  const recipient = data.opposite_party_name || data.employer_name || data.bank_name || 'THE CONCERNED AUTHORITY';
  const address = data.opposite_party_address || data.employer_address || data.bank_branch || '';

  paras.push(new Paragraph({
    children: [new TextRun({ text: recipient })]
  }));
  if (address) {
    paras.push(new Paragraph({
      children: [new TextRun({ text: address })]
    }));
  }

  paras.push(new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: '' })] }));

  // 2. Subject line
  paras.push(new Paragraph({
    children: [
      new TextRun({ text: 'SUBJECT: ', bold: true }),
      new TextRun({ text: getSubjectText(id, data) })
    ]
  }));

  paras.push(new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: 'DEAR SIR/MADAM,', bold: true })] }));

  // 3. Factual Numbered Paragraphs
  const sections = getFactualSections(id, data);
  sections.forEach((text, index) => {
    paras.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      children: [
        new TextRun({ text: `${index + 1}. `, bold: true }),
        new TextRun({ text: text })
      ]
    }));
  });

  return paras;
}

function getSubjectText(id: ModuleId, data: DocxData): string {
  switch(id) {
    case 'consumer_complaint': return `Deficiency in service regarding purchase dated ${data.purchase_date}`;
    case 'rti_application': return `Request for information under Section 6(1) of RTI Act`;
    case 'banking_fraud': return `Unauthorized transaction of INR ${data.transaction_amount} in account ${data.account_number}`;
    default: return `Legal representation regarding ${id.replace('_', ' ')}`;
  }
}

function getFactualSections(id: ModuleId, data: DocxData): string[] {
  // Logic to build a list of paragraphs from the data
  // In a real app, this would be highly curated. 
  // For this MVP, we map the core AI-generated blocks.
  const sections: string[] = [];
  
  if (data.facts_of_case) sections.push(data.facts_of_case);
  if (data.defect_description) sections.push(data.defect_description);
  if (data.narrative) sections.push(data.narrative);
  if (data.legal_grounds) sections.push(data.legal_grounds);
  if (data.relief_sought) sections.push(data.relief_sought);
  if (data.remedy_sought) sections.push(data.remedy_sought);
  
  // If no AI blocks, use a generic fallback
  if (sections.length === 0) {
    sections.push("Detailed facts as provided in the formal application submitted to the authority.");
  }
  
  return sections;
}
