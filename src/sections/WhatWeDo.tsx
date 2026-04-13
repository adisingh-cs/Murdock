import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const isIsNot = [
  { is: 'A document compiler & infra layer', isNot: 'A legal advice platform or chatbot' },
  { is: 'API-first — extensible for devs', isNot: 'A locked-in, third-party SaaS' },
  { is: 'Structured, widely accepted formats', isNot: 'Court-certified legal representation' },
  { is: 'Community-owned & Open Source', isNot: 'A proprietary "black box" product' },
];

const steps = [
  { icon: '01', title: 'Describe', body: 'Fill a structured form about your situation. No legalese required.' },
  { icon: '02', title: 'Compile', body: 'Our engine validates and maps your input into standard legal structures.' },
  { icon: '03', title: 'Deliver', body: 'Download a clean, formatted PDF ready for submission or review.' },
];

const WhatWeDo: React.FC = () => (
  <section id="what-we-build" className="relative bg-navy py-24 md:py-32 overflow-hidden">
    {/* Decorative radial gradient */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,147,58,0.03)_0%,transparent_70%)] pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="text-center max-w-[800px] mx-auto mb-20 space-y-6">
        <motion.div {...reveal} className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-6 bg-gold/50" />
          <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">Infrastructure, Not Advice</span>
        </motion.div>
        
        <motion.h2 
          {...reveal} 
          transition={{ ...revealTransition, delay: 0.1 }}
          className="font-display font-bold text-[36px] md:text-[52px] text-white leading-tight"
        >
          Built for compilers. Not for chatbots.
        </motion.h2>
        
        <motion.p 
          {...reveal} 
          transition={{ ...revealTransition, delay: 0.2 }}
          className="font-body text-[18px] text-white/60 leading-relaxed"
        >
          Murdock is the engineering layer between a citizen's problem and a professionally structured legal document. We provide the engine. You remain the lawyer.
        </motion.p>
      </div>

      {/* Comparison Grid */}
      <motion.div 
        {...reveal} 
        transition={{ ...revealTransition, delay: 0.3 }}
        className="glass-dark border border-white/5 rounded-3xl overflow-hidden max-w-[900px] mx-auto mb-24"
      >
        <div className="grid grid-cols-2 bg-white/[0.02] border-b border-white/5 py-5 px-8">
          <span className="font-body font-bold text-[11px] uppercase tracking-[0.2em] text-gold">Murdock IS</span>
          <span className="font-body font-bold text-[11px] uppercase tracking-[0.2em] text-white/30">Murdock IS NOT</span>
        </div>
        <div className="divide-y divide-white/5">
          {isIsNot.map((item, i) => (
            <div key={i} className="grid grid-cols-2 py-6 px-8 hover:bg-white/[0.01] transition-colors">
              <span className="font-body font-medium text-[16px] text-white pr-4">{item.is}</span>
              <span className="font-body text-[15px] text-white/30 pr-4">{item.isNot}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Process Section */}
      <div className="space-y-12">
        <motion.span 
          {...reveal} 
          className="font-body font-bold text-[11px] uppercase tracking-[0.4em] text-gold/60 block text-center"
        >
          The Compiler Flow
        </motion.span>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div 
              key={s.title} 
              {...reveal} 
              transition={{ ...revealTransition, delay: i * 0.15 + 0.5 }} 
              className="relative p-8 glass-light border border-white/5 rounded-2xl hover:border-gold/20 transition-all group"
            >
              <span className="font-mono text-[42px] font-bold text-white/5 absolute top-4 right-6 group-hover:text-gold/5 transition-colors">{s.icon}</span>
              <div className="space-y-4">
                <h3 className="font-display text-[22px] font-bold text-white group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="font-body text-[15px] leading-relaxed text-white/50">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </div>
  </section>
);

export default WhatWeDo;

