import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const modules = [
  { 
    id: 'M-01',
    title: 'Consumer Protection', 
    law: 'Consumer Protection Act, 2019', 
    tags: ['Refunds', 'Defects', 'Overcharging'], 
    output: 'Legal Notice · Forum Complaint · Response Letter',
    color: 'bg-gold/10'
  },
  { 
    id: 'M-02',
    title: 'Housing & Rent', 
    law: 'Rent Control Act · RERA · TP Act', 
    tags: ['Deposits', 'Eviction', 'Maintenance'], 
    output: 'Demand Notice · Vacation Letter · Lease Addendum',
    color: 'bg-white/5'
  },
];

const planned = [
  'Employment Hub', 'UPI & Cyber Fraud', 'E-Commerce Shield', 
  'Insurance Claims', 'Telecom Disputes', 'RTI Automator'
];

const Modules: React.FC = () => (
  <section id="modules" className="relative bg-transparent py-24 md:py-32 overflow-hidden">
    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      
      <div className="grid lg:grid-cols-12 gap-16 items-end mb-20">
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">The Plugin Ecosystem</span>
          </motion.div>
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight"
          >
            Two Domains Today. <br />The <span className="text-gold">Entire Stack</span> Tomorrow.
          </motion.h2>
        </div>
        <div className="lg:col-span-12 xl:col-span-5">
          <motion.p 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.2 }}
            className="font-body text-[18px] text-text-secondary leading-relaxed"
          >
            v1 launches with the most critical pain points for Indian citizens. Our architecture treats every new law as a module. Zero core changes required.
          </motion.p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {modules.map((m, i) => (
          <motion.div 
            key={m.title} 
            {...reveal} 
            transition={{ ...revealTransition, delay: i * 0.15 + 0.3 }} 
            className="group relative p-1 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-gold/30 transition-all duration-500 overflow-hidden"
          >
            <div className="p-10 space-y-6 text-left">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[11px] font-bold text-gold tracking-widest uppercase">{m.id}</span>
                <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">v1 Standard</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display text-[28px] font-bold text-text-primary group-hover:text-gold transition-colors text-left">{m.title}</h3>
                <p className="font-body text-[13px] text-text-muted font-medium tracking-wide text-left">{m.law}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-left">
                {m.tags.map(t => (
                  <span key={t} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-text-secondary font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-body text-[12px] text-text-muted uppercase tracking-widest font-bold">Supported Outputs:</span>
                <span className="font-body text-[12px] text-gold/80 font-medium">{m.output}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roadmap Section */}
      <div className="space-y-10">
        <motion.div {...reveal} className="flex items-center gap-4">
          <span className="font-body font-bold text-[11px] uppercase tracking-[0.4em] text-gold/60">Development Roadmap</span>
          <div className="h-px flex-1 bg-white/5" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {planned.map((p, i) => (
            <motion.div 
              key={p} 
              {...reveal} 
              transition={{ ...revealTransition, delay: i * 0.05 + 0.6 }}
              className="px-6 py-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity group"
            >
              <span className="font-body text-[14px] font-bold text-text-primary group-hover:text-gold transition-colors">{p}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gold/50" />
            </motion.div>
          ))}
          <motion.div 
            {...reveal} 
            transition={{ ...revealTransition, delay: 1.0 }}
            className="px-6 py-5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-gold/50 transition-colors"
          >
            <span className="font-body text-[14px] font-bold text-text-muted group-hover:text-gold transition-colors">Your Module +</span>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default Modules;

