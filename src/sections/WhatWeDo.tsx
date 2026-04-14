import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { reveal, revealTransition, staggerParent } from '../lib/animations';
import TiltCard from '../components/TiltCard';

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
  <section id="what-we-do" className="relative bg-secondary py-24 md:py-32 overflow-hidden border-y border-white/5">
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
          className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight"
        >
          Built for compilers. Not for chatbots.
        </motion.h2>
        
        <motion.p 
          {...reveal} 
          transition={{ ...revealTransition, delay: 0.2 }}
          className="font-body text-[18px] text-text-secondary leading-relaxed"
        >
          Murdock is the engineering layer between a citizen's problem and a professionally structured legal document. We provide the engine. You remain the lawyer.
        </motion.p>
      </div>

      {/* Redesigned Comparison Section */}
      <div className="max-w-[1000px] mx-auto mb-32 relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Murdock IS Section */}
          <motion.div 
            {...staggerParent}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/20">
                <Check className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-[22px] font-bold text-text-primary">Murdock Is</h3>
                <p className="font-body text-[12px] uppercase tracking-widest text-gold/60 font-medium">The Engineering Layer</p>
              </div>
            </div>

            <div className="space-y-4">
              {isIsNot.map((item, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 }
                  }}
                  transition={{ ...revealTransition, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <span className="font-body text-[16px] md:text-[17px] text-text-primary font-medium leading-snug">
                      {item.is}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Murdock IS NOT Section */}
          <motion.div 
            {...staggerParent}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <X className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <h3 className="font-display text-[22px] font-bold text-text-muted">Murdock Is Not</h3>
                <p className="font-body text-[12px] uppercase tracking-widest text-text-muted/60 font-medium">The Final Word</p>
              </div>
            </div>

            <div className="space-y-4">
              {isIsNot.map((item, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    initial: { opacity: 0, x: 20 },
                    whileInView: { opacity: 1, x: 0 }
                  }}
                  transition={{ ...revealTransition, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="flex items-start gap-4">
                    <X className="w-5 h-5 text-text-muted mt-1 shrink-0 group-hover:text-red-400 transition-colors" />
                    <span className="font-body text-[15px] md:text-[16px] text-text-secondary leading-snug">
                      {item.isNot}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>


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
            <TiltCard key={s.title}>
              <motion.div 
                {...reveal} 
                transition={{ ...revealTransition, delay: i * 0.15 + 0.5 }} 
                className="relative p-8 glass-light border border-white/5 rounded-2xl hover:border-gold/20 transition-all group h-full"
              >
                <span className="font-mono text-[42px] font-bold text-white/5 absolute top-4 right-6 group-hover:text-gold/5 transition-colors">{s.icon}</span>
                <div className="space-y-4">
                  <h3 className="font-display text-[22px] font-bold text-text-primary group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="font-body text-[15px] leading-relaxed text-text-secondary">{s.body}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>


    </div>
  </section>
);

export default WhatWeDo;

