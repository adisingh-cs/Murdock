import React from 'react';

interface LogoProps {
  variant?: 'full' | 'mark';
  className?: string;
  height?: number;
  white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', height = 36 }) => {
  const goldColor = '#C9933A';

  const mark = (
    <img 
      src="/logo.png" 
      alt="Murdock Logo" 
      style={{ height: height, width: 'auto' }}
      className="object-contain"
    />
  );

  if (variant === 'mark') {
    return <div className={className}>{mark}</div>;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {mark}
      <div className="flex flex-col">
        <span
          className="font-display font-bold tracking-[0.12em] leading-tight text-text-primary"
          style={{ fontSize: height * 0.45 }}
        >
          MURDOCK
        </span>
        <span
          className="font-body font-medium uppercase tracking-[0.15em]"
          style={{ color: goldColor, fontSize: height * 0.22 }}
        >
          Legal Infrastructure
        </span>
      </div>
    </div>
  );
};

export default Logo;
