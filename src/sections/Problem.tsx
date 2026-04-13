import React from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const gaps = [
  { 
    id: '01',
    title: 'The High Barrier', 
    body: 'A basic legal notice costs ₹3,000–₹15,000 via a lawyer. 90% of Indians cannot afford their own rights.',
    status: 'Inaccessible'
  },
  { 
    id: '02',
    title: 'Template Trap', 
    body: 'Generic online templates lack jurisdiction awareness and India-specific validation needed for real impact.',
    status: 'Counter-productive'
  },
  { 
    id: '03',
    title: 'The Infra Void', 
    body: 'Developers have zero open-source APIs to build legal tools for the common man. No infrastructure, until now.',
    status: 'Fragmented'
  },
];

const AnimatedMetric: React.FC<{ value: string; label: string; prefix?: string }> = ({ value, label, prefix }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const spring = useSpring(0, { stiffness: 45, damping: 20 });

  React.useEffect(() => { if (isInView) spring.set(parseFloat(numericPart) || 0); }, [isInView, spring, numericPart]);

  const [display, setDisplay] = React.useState('0');
  React.useEffect(() => {
    return spring.on('change', (v: number) => {
      setDisplay(numericPart.includes('.') ? v.toFixed(1) : Math.round(v).toLocaleString());
    });
  }, [spring, numericPart]);

  return (
    <div ref={ref} className="flex flex-col items-center p-8 glass-light border border-white/10 rounded-2xl w-full">
      <div className="flex items-baseline gap-1 mb-2">
        {prefix && <span className="text-gold font-display text-[24px] font-bold">{prefix}</span>}
        <span className="font-display font-bold text-[42px] text-white tracking-tighter">{display}{suffix}</span>
      </div>
      <p className="font-body text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold text-center leading-relaxed">{label}</p>
    </div>
  );
};

const Problem: React.FC = () => (
  <section id="problem" className="relative bg-navy py-24 md:py-32 overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Story Content */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-8">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">The Reality Gap</span>
          </motion.div>
          
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-white leading-[1.1] tracking-tight"
          >
            Access to law is a <span className="text-gold">luxury</span>, not a right.
          </motion.h2>
          
          <motion.p 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.2 }}
            className="font-body text-[18px] leading-[1.7] text-white/60"
          >
            Imagine you bought a defective phone. The company ignored you. You have the right to file a consumer complaint — but you can't. Forms are complex, jargon is archaic, and lawyers charge ₹5,000 just for the first letter. 
            <br /><br />
            The system wins by exhaustion. We're changing that.
          </motion.p>
        </div>

        {/* Gaps Grid */}
        <div className="lg:col-span-12 xl:col-span-7 grid md:grid-cols-1 gap-6">
          {gaps.map((g, i) => (
            <motion.div 
              key={g.title} 
              {...reveal} 
              transition={{ ...revealTransition, delay: i * 0.15 + 0.3 }} 
              className="group p-1 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <div className="p-8 flex flex-col md:flex-row gap-6 items-start">
                <span className="font-mono text-[14px] text-gold/40 font-bold">{g.id}</span>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="font-display text-[22px] font-bold text-white group-hover:text-gold transition-colors">{g.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-white/30 font-bold">{g.status}</span>
                  </div>
                  <p className="font-body text-[15px] leading-relaxed text-white/50">{g.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="mt-24 grid md:grid-cols-3 gap-6">
        <AnimatedMetric value="1.4B" label="Indians with near-zero affordable legal access" />
        <AnimatedMetric value="5.1Cr" label="Total cases pending in Indian courts today" />
        <AnimatedMetric value="0" prefix="₹" label="Cost to draft a valid notice with Murdock" />
      </div>
    </div>
  </section>
);

export default Problem;

