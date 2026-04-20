import React from 'react';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface ModuleTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  accent?: 'gold' | 'sage';
}

const ModuleTile: React.FC<ModuleTileProps> = ({ title, description, icon: Icon, onClick, accent = 'gold' }) => {
  const accentClasses =
    accent === 'sage'
      ? { bg: 'bg-sage/10', text: 'text-sage', hover: 'group-hover:bg-sage/20' }
      : { bg: 'bg-gold/10', text: 'text-gold', hover: 'group-hover:bg-gold/20' };

  return (
    <button
      onClick={onClick}
      className="surface-card group text-left p-5 w-full h-full flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 min-h-[160px]"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-lg ${accentClasses.bg} ${accentClasses.hover} flex items-center justify-center transition-colors`}>
          <Icon className={`w-5 h-5 ${accentClasses.text}`} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all -translate-y-0.5 group-hover:translate-y-0" />
      </div>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-text-primary mb-1 leading-snug">{title}</h3>
        <p className="text-[13px] text-text-muted leading-relaxed">{description}</p>
      </div>
    </button>
  );
};

export default ModuleTile;
