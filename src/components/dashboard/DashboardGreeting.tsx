import React from 'react';

interface DashboardGreetingProps {
  name: string;
  tier?: string;
  resetDate?: string;
}

const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return 'Working late';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
};

const DashboardGreeting: React.FC<DashboardGreetingProps> = ({ name, tier = 'Free', resetDate }) => {
  return (
    <div className="surface-card p-6 sm:p-8 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)' }}
      />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-2">
          {greeting()}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Welcome back, {name}.
        </h1>
        <p className="text-sm text-text-secondary max-w-xl">
          Pick a module below to draft a new document, or review your recent work.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-bg-tertiary border border-border-default rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {tier} tier
          </span>
          {resetDate && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-bg-tertiary border border-border-default rounded-full px-3 py-1.5">
              Resets {resetDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardGreeting;
