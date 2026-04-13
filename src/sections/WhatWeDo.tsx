import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const isIsNot = [
  ['A document compiler and infrastructure layer', 'A legal advice platform or chatbot'],
  ['API-first — every capability accessible to developers', 'A locked SaaS that you can\'t extend or integrate'],
  ['Professionally structured, widely acceptable format', 'Court-certified or legally guaranteed documents'],
  ['AI-assisted structuring with human accountability', 'AI making legal decisions on your behalf'],
  ['Open source — community-owned and extensible', 'A black-box product you\'re dependent on'],
];

const steps = [
  { icon: '📝', title: 'You Describe Your Problem', body: 'Fill a simple structured form — your details, what happened, what you want. No legal training required.' },
  { icon: '⚙️', title: 'Murdock Structures It', body: 'Our AI-assisted pipeline validates, structures, and compiles your input into a legally formatted document — with human review flags on critical fields.' },
  { icon: '📄', title: 'You Get a Ready Document', body: 'Download your PDF. Share it. Send it. The document is yours — structured to match what Indian courts and consumer forums expect.' },
];

const WhatWeDo: React.FC = () => (
  <section id="what-we-build" className="bg-navy py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">What We Build</motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-white mb-4">Not a Chatbot. Not a Law Firm. Infrastructure.</motion.h2>
      <motion.p {...reveal} className="font-body text-[19px] leading-[1.8] max-w-[640px] mb-16" style={{ color: 'rgba(255,255,255,0.72)' }}>
        Murdock is the engineering layer between a citizen's problem and a professionally structured legal document. We compile. We validate. We deliver. You stay in control — always.
      </motion.p>

      <motion.div {...reveal} className="glass-dark max-w-[780px] mx-auto mb-20 overflow-hidden">
        <div className="grid grid-cols-2 px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="font-body font-medium text-[14px] text-gold uppercase tracking-[0.08em]">Murdock IS</span>
          <span className="font-body font-medium text-[14px] uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.45)' }}>Murdock IS NOT</span>
        </div>
        {isIsNot.map(([is, isNot], i) => (
          <div key={i} className="grid grid-cols-2 px-6 py-4" style={{ borderBottom: i < isIsNot.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <span className="font-body font-medium text-[16px] text-white pr-4">{is}</span>
            <span className="font-body text-[15px] pr-4" style={{ color: 'rgba(255,255,255,0.45)' }}>{isNot}</span>
          </div>
        ))}
      </motion.div>

      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-8 text-center">How It Works</motion.span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative">
        <div className="hidden md:block absolute top-1/2 left-[33%] right-[33%] h-px border-t-2 border-dashed border-gold/40 -translate-y-1/2 z-0" aria-hidden="true" />
        {steps.map((s, i) => (
          <motion.div key={s.title} {...reveal} transition={{ ...revealTransition, delay: i * 0.15 }} className="glass-dark p-7 text-center relative z-10">
            <div className="text-3xl mb-4">{s.icon}</div>
            <h3 className="font-body font-medium text-[22px] text-white mb-2">{s.title}</h3>
            <p className="font-body text-[17px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...reveal} className="py-8 text-center" style={{ background: 'rgba(201,147,58,0.1)', borderTop: '1px solid rgba(201,147,58,0.3)', borderBottom: '1px solid rgba(201,147,58,0.3)' }}>
        <p className="font-display italic text-[18px] md:text-[22px] max-w-[700px] mx-auto px-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
          "If adding a new legal domain requires touching the core pipeline, the architecture has failed. The pipeline must be a dumb pipe. Modules must be smart plugins."
        </p>
        <span className="font-body font-medium text-[13px] text-gold mt-4 block">— The Golden Rule of Murdock</span>
      </motion.div>
    </div>
  </section>
);

export default WhatWeDo;
