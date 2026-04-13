import React from 'react';
import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const contributions = [
  ['New legal domain modules', 'Any developer', 'Zero risk to core'],
  ['New language templates (Hindi, Marathi)', 'Translators + lawyers', 'Zero risk to core'],
  ['New AI provider implementations', 'ML engineers', 'Low risk — standard interface'],
];

const OpenSource: React.FC = () => (
  <section id="open-source" className="bg-parchment py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">
        Open Source
      </motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-navy mb-4">
        Built in Public. Owned by Everyone.
      </motion.h2>
      <motion.p {...reveal} className="font-body text-[19px] leading-[1.8] text-slate max-w-[640px] mb-16">
        Murdock is not a product you rent. It is infrastructure you can inspect, extend, deploy, and contribute to. The plugin system is designed so any developer can add a legal domain module with zero changes to the core.
      </motion.p>

      {/* Contribution table */}
      <motion.div {...reveal} className="mb-12 overflow-x-auto">
        <table className="w-full max-w-[780px]">
          <thead>
            <tr className="text-left">
              <th className="font-body font-medium text-[14px] text-navy pb-3 pr-6">Contribution</th>
              <th className="font-body font-medium text-[14px] text-navy pb-3 pr-6">Who</th>
              <th className="font-body font-medium text-[14px] text-navy pb-3">Risk</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map(([what, who, risk]) => (
              <tr key={what} className="border-b border-warm-gray">
                <td className="font-body text-[15px] text-slate py-4 pr-6">{what}</td>
                <td className="font-body text-[15px] text-slate py-4 pr-6">{who}</td>
                <td className="font-body text-[15px] text-slate py-4">{risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Status card */}
      <motion.div {...reveal} className="bg-white border border-warm-gray rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-[780px]">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green inline-block" style={{ animation: 'pulse-dot 2s infinite' }} />
            <span className="font-body font-medium text-[15px] text-navy">Repository opens Month 7</span>
          </div>
          <p className="font-body text-[15px] text-slate leading-relaxed">
            Private development phase: 6 months (in progress)<br />
            Public open-source launch: Month 7+<br />
            License: Permissive open-source (TBD)
          </p>
        </div>
        <a
          href="https://github.com/adisingh-cs"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-2.5 rounded-lg bg-navy text-white font-body font-medium text-[14px] hover:bg-deep-blue transition-colors"
        >
          View GitHub →
        </a>
      </motion.div>
    </div>
  </section>
);

export default OpenSource;
