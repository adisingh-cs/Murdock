import React from 'react';
import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const modules = [
  {
    icon: '🧾',
    title: 'Consumer Complaints',
    law: 'Consumer Protection Act, 2019',
    types: ['Refund Not Received', 'Defective Product', 'Service Not Rendered', 'Overcharging'],
    output: 'Formal complaint letter + Legal notice · PDF, Text, HTML',
  },
  {
    icon: '🏠',
    title: 'Rental Disputes',
    law: 'Transfer of Property Act 1882 · State Rent Control Acts · RERA',
    types: ['Security Deposit', 'Illegal Eviction', 'Rent Increase', 'Maintenance Neglect'],
    output: 'Formal dispute notice · PDF, Text, HTML',
  },
];

const roadmap = ['Employment', 'Banking & UPI Fraud', 'E-Commerce', 'Real Estate', 'Insurance', 'Telecom', 'Government RTI'];

const Modules: React.FC = () => (
  <section className="bg-navy py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">
        What's Possible
      </motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-white mb-4">
        Two Modules Today. An Entire Legal Stack Tomorrow.
      </motion.h2>
      <motion.p {...reveal} className="font-body text-[19px] leading-[1.8] max-w-[640px] mb-16" style={{ color: 'rgba(255,255,255,0.72)' }}>
        v1 launches with consumer complaints and rental disputes — the two most common legal needs for Indian citizens. The plugin architecture means every new legal domain is a module. Zero changes to the core.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.1 }}
            className="glass-dark p-7 border-t-[3px] border-t-gold"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-body font-medium bg-brand-green text-white mb-4">
              Live in v1
            </span>
            <div className="text-2xl mb-3">{m.icon}</div>
            <h3 className="font-body font-medium text-[22px] text-white mb-1">{m.title}</h3>
            <p className="font-body text-[14px] text-gold mb-4">{m.law}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {m.types.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full text-[12px] font-body text-white/70" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{m.output}</p>
          </motion.div>
        ))}
      </div>

      {/* Roadmap */}
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-6">
        On the Roadmap
      </motion.span>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {roadmap.map((r) => (
          <motion.div
            key={r}
            {...reveal}
            className="shrink-0 snap-start glass-dark px-6 py-5 min-w-[180px] opacity-70"
          >
            <span className="font-body font-medium text-[15px] text-white block mb-2">{r}</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-body text-gold border border-gold/50">
              Planned
            </span>
          </motion.div>
        ))}
        <motion.div
          {...reveal}
          className="shrink-0 snap-start px-6 py-5 min-w-[180px] rounded-2xl opacity-50"
          style={{ border: '1px dashed rgba(255,255,255,0.3)' }}
        >
          <span className="text-2xl block mb-2">+</span>
          <span className="font-body font-medium text-[15px] text-white block">Your Module →</span>
          <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Any developer can add a new legal domain</span>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Modules;
