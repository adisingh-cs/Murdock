import React from 'react';

interface LogoProps {
  variant?: 'full' | 'mark';
  className?: string;
  height?: number;
  white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', height = 36, white = false }) => {
  const markSize = height;
  const textColor = white ? '#FFFFFF' : '#1B2B4B';
  const goldColor = '#C9933A';

  const mark = (
    <svg width={markSize} height={markSize} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Murdock logo">
      {/* Document rectangle */}
      <rect x="8" y="4" width="28" height="36" rx="4" stroke={goldColor} strokeWidth="2.5" fill="none" />
      {/* Document lines */}
      <line x1="14" y1="14" x2="30" y2="14" stroke={goldColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="14" y1="20" x2="28" y2="20" stroke={goldColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="14" y1="26" x2="24" y2="26" stroke={goldColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Checkmark circle */}
      <circle cx="34" cy="36" r="10" fill="#1B2B4B" stroke={goldColor} strokeWidth="1.5" />
      <polyline points="29,36 33,40 40,33" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={className}>{mark}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {mark}
      <div className="flex flex-col">
        <span
          className="font-display font-bold tracking-[0.12em] leading-tight"
          style={{ color: textColor, fontSize: height * 0.5 }}
        >
          MURDOCK
        </span>
        <span
          className="font-body font-medium uppercase tracking-[0.1em]"
          style={{ color: goldColor, fontSize: height * 0.25 }}
        >
          Legal Infrastructure · India
        </span>
      </div>
    </div>
  );
};

export default Logo;
