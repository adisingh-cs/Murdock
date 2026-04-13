import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const audiences = [
  { icon: '💼', title: 'Law Firms & Lawyers', body: 'Stop spending billable hours on boilerplate drafting. Use Murdock as your document automation layer — integrate via API, customize templates, deliver faster to clients. You focus on strategy. We handle structure.', tag: 'Reduce drafting time by 80%' },
  { icon: '🏢', title: 'Enterprises & Businesses', body: 'Send legally structured notices to vendors, customers, or counterparties at scale. No legal team bottleneck for routine notices. High-volume API access for business-grade document workflows.', tag: 'API-first · Scale without headcount' },
  { icon: '🏛', title: 'Government & Legal Aid Bodies', body: "Murdock's open-source, schema-driven architecture is purpose-built for integration into public legal aid infrastructure. Compliant, auditable, jurisdiction-aware — and free to adapt under open-source terms.", tag: 'Open Source · Auditable · Extensible' },
  { icon: '{ }', title: 'Developers & Startups', body: 'Build on top of a production-grade legal document API. Add new legal domains as plugins with zero core changes. Murdock is the npm of Indian legal document infrastructure — open, versioned, community-extensible.', tag: 'REST API · Plugin System · OSS' },
];

const WhoItsFor: React.FC = () => (
  <section id="who-its-for" className="bg-background py-24 md:py-32">
    <div className="mx-auto max-w-[1240px] px-6 md:px-12">
      <motion.div {...reveal} className="flex items-center gap-3 mb-6">
        <div className="h-[1px] w-8 bg-gold/50" />
        <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">Ecosystem</span>
      </motion.div>
      <motion.h2 {...reveal} className="font-display font-bold text-[36px] md:text-[52px] text-text-primary max-w-[700px] mb-12">Built for Everyone Who Touches the Legal System in India.</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <motion.div 
            key={a.title} 
            {...reveal} 
            transition={{ ...revealTransition, delay: i * 0.1 }} 
            className="bg-white/[0.02] rounded-2xl p-8 border border-white/5 border-l-[3px] border-l-gold shadow-sm hover:border-gold/30 transition-all duration-500 overflow-hidden relative group" 
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{a.icon}</div>
            <h3 className="font-display font-bold text-[24px] text-text-primary mb-3 group-hover:text-gold transition-colors">{a.title}</h3>
            <p className="font-body text-[16px] leading-[1.7] text-text-secondary mb-6">{a.body}</p>
            <span className="inline-block px-4 py-1.5 rounded bg-white/5 border border-white/10 font-body font-bold text-[10px] uppercase tracking-wider text-text-muted">{a.tag}</span>
            
            {/* Subtle interactive glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoItsFor;
