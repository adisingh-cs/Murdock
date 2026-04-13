import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const contributionTypes = [
  { title: 'Legal Modules', who: 'Developers', desc: 'Add new laws with a simple JSON + Schema approach.' },
  { title: 'Localizations', who: 'Lawyers', desc: 'Translate templates into Hindi, Marathi, and 20+ languages.' },
  { title: 'AI Bridges', who: 'ML Engineers', desc: 'Implement new LLM providers via our standard interface.' },
];

const CodeSnippet: React.FC = () => (
  <div className="glass-dark border border-white/10 rounded-2xl overflow-hidden font-mono text-[13px] leading-relaxed shadow-2xl">
    <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
      </div>
      <span className="text-white/30 text-[10px] uppercase tracking-widest ml-2">consumer_notice.module.ts</span>
    </div>
    <div className="p-6 text-white/70">
      <div className="flex gap-4">
        <span className="text-white/20 select-none">1</span>
        <span><span className="text-gold">export const</span> ConsumerModule = {'{'}</span>
      </div>
      <div className="flex gap-4">
        <span className="text-white/20 select-none">2</span>
        <span className="pl-4">  id: <span className="text-emerald-400">'M-01'</span>,</span>
      </div>
      <div className="flex gap-4">
        <span className="text-white/20 select-none">3</span>
        <span className="pl-4">  law: <span className="text-emerald-400">'CPA 2019'</span>,</span>
      </div>
      <div className="flex gap-4">
        <span className="text-white/20 select-none">4</span>
        <span className="pl-4">  fields: [<span className="text-emerald-400">'amount'</span>, <span className="text-emerald-400">'order_id'</span>],</span>
      </div>
      <div className="flex gap-4">
        <span className="text-white/20 select-none">5</span>
        <span className="pl-4">  template: <span className="text-emerald-400">'./standard.md'</span></span>
      </div>
      <div className="flex gap-4">
        <span className="text-white/20 select-none">6</span>
        <span>{'}'};</span>
      </div>
    </div>
  </div>
);

const OpenSource: React.FC = () => (
  <section id="open-source" className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/5">
    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">Built in Public</span>
          </motion.div>
          
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight"
          >
            Owned by <span className="text-gold italic">Everyone.</span>
          </motion.h2>
          
          <motion.p 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.2 }}
            className="font-body text-[18px] text-text-secondary leading-relaxed"
          >
            Murdock is not a product you rent. It is infrastructure you can inspect, extend, and deploy. 
            The plugin system is designed so that adding a new legal domain requires zero changes to the core.
          </motion.p>

          <motion.div 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.3 }}
            className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="font-body font-bold text-[11px] uppercase tracking-[0.2em] text-text-primary">Private Dev Phase</span>
            </div>
            <div className="space-y-2">
              <p className="font-body text-[14px] text-text-muted">Global repository launch scheduled for Month 7.</p>
              <p className="font-body text-[12px] text-gold/60 font-medium">Currently accepting early-access contributors.</p>
            </div>
            <a 
              href="https://github.com/adisingh-cs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-text-primary text-background rounded-full font-body font-bold text-[13px] hover:bg-gold transition-all duration-300"
            >
              <img src="https://skillicons.dev/icons?i=github" className="w-5 h-5" alt="GitHub" />
              Follow on GitHub
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          <motion.div 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.4 }}
            className="space-y-6"
          >
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.4em] text-gold/60">Development Patterns</span>
            <CodeSnippet />
          </motion.div>

          <div className="grid md:grid-cols-1 gap-6">
            {contributionTypes.map((c, i) => (
              <motion.div 
                key={c.title} 
                {...reveal} 
                transition={{ ...revealTransition, delay: i * 0.1 + 0.6 }}
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gold/30 transition-all duration-500"
              >
                <div className="space-y-1 text-left">
                  <h3 className="font-display text-[20px] font-bold text-text-primary group-hover:text-gold transition-colors text-left">{c.title}</h3>
                  <p className="font-body text-[15px] text-text-secondary text-left">{c.desc}</p>
                </div>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-text-muted uppercase tracking-widest group-hover:text-gold/50 transition-colors">{c.who}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default OpenSource;

