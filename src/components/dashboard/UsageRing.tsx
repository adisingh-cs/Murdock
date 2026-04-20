import React from 'react';

interface UsageRingProps {
  used: number;
  total: number;
  label?: string;
  size?: number;
  stroke?: number;
}

const UsageRing: React.FC<UsageRingProps> = ({ used, total, label = 'Used', size = 140, stroke = 12 }) => {
  const pct = Math.min(100, total > 0 ? (used / total) * 100 : 0);
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--bg-tertiary)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--gold)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-text-primary leading-none">{used}</span>
        <span className="text-[11px] uppercase tracking-wider text-text-muted mt-1">
          of {total} {label}
        </span>
      </div>
    </div>
  );
};

export default UsageRing;
