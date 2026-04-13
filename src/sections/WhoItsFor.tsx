import React from 'react';
import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const audiences = [
  {
    icon: '💼',
    title: 'Law Firms & Lawyers',
    body: 'Stop spending billable hours on boilerplate drafting. Use Murdock as your document automation layer — integrate via API, customize templates, deliver faster to clients. You focus on strategy. We handle structure.',
    tag: 'Reduce drafting time by 80%',
  },
  {
    icon: '🏢',
    title: 'Enterprises & Businesses',
    body: 'Send legally structured notices to vendors, customers, or counterparties at scale. No legal team bottleneck for routine notices. High-volume API access for business-grade document workflows.',
    tag: 'API-first · Scale without headcount',
  },
  {
    icon: '🏛',
    title: 'Government & Legal Aid Bodies',
    body: "Murdock's open-source, schema-driven architecture is purpose-built for integration into public legal aid infrastructure. Compliant, auditable, jurisdiction-aware — and free to adapt under open-source terms.",
    tag: 'Open Source · Auditable · Extensible',
  },
  {
    icon: '{ }',
    title: 'Developers & Startups',
    body: 'Build on top of a production-grade legal document API. Add new legal domains as plugins with zero core changes. Murdock is the npm of Indian legal document infrastructure — open, versioned, community-extensible.',
    tag: 'REST API · Plugin System · OSS',
  },
];

const WhoItsFor: React.FC = () => (
  <section id="who-its-for" className="bg-parchment py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">
        Who This Is For
      </motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-navy max-w-[700px] mb-12">
        Built for Everyone Who Touches the Legal System in India.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <motion.div
            key={a.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-8 border border-warm-gray shadow-sm border-l-[3px] border-l-gold"
            whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(27,43,75,0.14)' }}
          >
            <div className="text-2xl mb-4">{a.icon}</div>
            <h3 className="font-body font-medium text-[22px] text-navy mb-2">{a.title}</h3>
            <p className="font-body text-[17px] leading-[1.75] text-slate mb-4">{a.body}</p>
            <span className="inline-block px-3 py-1 rounded-full font-body font-medium text-[12px] text-navy" style={{ background: 'rgba(27,43,75,0.07)', border: '1px solid rgba(27,43,75,0.15)' }}>
              {a.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoItsFor;
