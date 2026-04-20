import { consumerComplaintConfig } from './consumer_complaint';
import { rtiApplicationConfig } from './rti_application';
import { legalNoticeConfig } from './legal_notice';
import { policeComplaintConfig } from './police_complaint';
import { 
  employmentGrievanceConfig, 
  rentalDisputeConfig, 
  bankingFraudConfig 
} from './remaining_modules';
import { ModuleId, ModuleConfig } from './types';

export const MODULE_REGISTRY: Record<ModuleId, ModuleConfig> = {
  consumer_complaint: consumerComplaintConfig,
  rti_application: rtiApplicationConfig,
  legal_notice: legalNoticeConfig,
  police_complaint: policeComplaintConfig,
  employment_grievance: employmentGrievanceConfig,
  rental_dispute: rentalDisputeConfig,
  banking_fraud: bankingFraudConfig,
};

export const getModuleConfig = (id: string): ModuleConfig | undefined => {
  return MODULE_REGISTRY[id as ModuleId];
};

export * from './types';
