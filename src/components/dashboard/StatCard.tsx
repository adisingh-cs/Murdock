import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number[];
  accent?: 'gold' | 'sage' | 'crimson';
  hint?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, accent = 'gold', hint }) => {
  const accentColor = accent === 'sage' ? 'var(--sage)' : accent === 'crimson' ? 'var(--crimson)' : 'var(--gold)';

  // simple inline sparkline
  const sparkline = trend && trend.length > 1 ? (() => {
    const max = Math.max(...trend, 1);
    const min = Math.min(...trend, 0);
    const range = max - min || 1;
    const w = 80;
    const h = 28;
    const step = w / (trend.length - 1);
    const points = trend
      .map((v, i) => `${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
      .join(' ');
    return (
      <svg width={w} height={h} className="overflow-visible">
        <polyline
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  })() : null;

  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{label}</span>
        {Icon && <Icon className="w-4 h-4 shrink-0" style={{ color: accentColor }} />}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="font-display text-3xl font-bold text-text-primary leading-none">{value}</div>
          {hint && <div className="text-[11px] text-text-muted mt-1.5">{hint}</div>}
        </div>
        {sparkline}
      </div>
    </div>
  );
};

export default StatCard;
