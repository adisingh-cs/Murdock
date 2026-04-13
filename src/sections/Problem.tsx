import React from 'react';
import { motion, useSpring, useInView } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const cards = [
  {
    icon: '₹',
    title: 'Prohibitively Expensive',
    body: 'A simple legal notice costs ₹3,000–₹15,000 when routed through a lawyer. Most citizens simply cannot afford access to their own rights.',
  },
  {
    icon: '📄',
    title: 'Dangerously Generic',
    body: 'Free online templates have zero India-specific validation, no jurisdiction awareness, and no structure that courts and forums actually expect.',
  },
  {
    icon: '🔗',
    title: 'Zero Infrastructure',
    body: 'No unified API. No plugin system. No open platform that developers, law firms, or government bodies can build on top of — until now.',
  },
];

const AnimatedNumber: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const spring = useSpring(0, { stiffness: 40, damping: 20 });

  React.useEffect(() => {
    if (isInView) spring.set(parseFloat(numericPart) || 0);
  }, [isInView, spring, numericPart]);

  const [display, setDisplay] = React.useState('0');
  React.useEffect(() => {
    const unsub = spring.on('change', (v: number) => {
      if (numericPart.includes('.')) setDisplay(v.toFixed(1));
      else setDisplay(Math.round(v).toString());
    });
    return unsub;
  }, [spring, numericPart]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display font-bold text-[48px] text-navy">{display}{suffix}</span>
      <p className="font-body text-[14px] text-slate mt-1">{label}</p>
    </div>
  );
};

const Problem: React.FC = () => (
  <section id="problem" className="bg-parchment py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">
        The Reality
      </motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-navy max-w-[700px] mb-8">
        India Has 1.5 Billion People. Almost None of Them Can Afford a Legal Notice.
      </motion.h2>
      <motion.p {...reveal} className="font-body text-[19px] leading-[1.9] text-slate max-w-[640px] mb-16">
        Imagine you bought a phone online. It arrived defective. The company ignored you. You have every right to file a consumer complaint — but where do you start? The forms are complex. The language is archaic. A lawyer charges ₹5,000 just to draft the first letter. So most people give up. The company wins by default. Murdock exists so that never has to happen again.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-7 border border-warm-gray shadow-sm"
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(27,43,75,0.14)' }}
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xl mb-4">
              {c.icon}
            </div>
            <h3 className="font-body font-medium text-[22px] text-navy mb-2">{c.title}</h3>
            <p className="font-body text-[17px] leading-[1.75] text-slate">{c.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatedNumber value="1.5B+" label="People in India with almost no affordable legal access" />
        <AnimatedNumber value="3Cr+" label="Consumer disputes filed annually, most resolved against the complainant" />
        <AnimatedNumber value="₹0" label="What it should cost to draft your first legal notice" />
      </div>
    </div>
  </section>
);

export default Problem;
