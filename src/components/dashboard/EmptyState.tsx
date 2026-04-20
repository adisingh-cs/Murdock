import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="border border-dashed border-border-default rounded-lg py-12 px-6 text-center flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-text-muted" />
      </div>
      <h4 className="text-text-primary text-sm font-semibold mb-1">{title}</h4>
      {description && <p className="text-xs text-text-muted max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
