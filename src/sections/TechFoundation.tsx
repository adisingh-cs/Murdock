import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const techStack = [
  { 
    name: 'TypeScript', 
    desc: 'Strictly typed infra orchestration', 
    icon: <img src="https://skillicons.dev/icons?i=ts" className="h-6 w-6" alt="TypeScript" />
  },
  { 
    name: 'FastAPI', 
    desc: 'High-performance AI isolation', 
    icon: <img src="https://skillicons.dev/icons?i=fastapi" className="h-6 w-6" alt="FastAPI" />
  },
  { 
    name: 'PostgreSQL', 
    desc: 'Secure document state audit trail', 
    icon: <img src="https://skillicons.dev/icons?i=postgres" className="h-6 w-6" alt="PostgreSQL" />
  },
  { 
    name: 'Docker', 
    desc: 'Standardized infra deployment', 
    icon: <img src="https://skillicons.dev/icons?i=docker" className="h-6 w-6" alt="Docker" />
  },
];

const pipelineSteps = [
  { name: 'Normalization', info: 'Converting messy inputs to standard JSON' },
  { name: 'Module Routing', info: 'Directing data to specific law engines' },
  { name: 'AI Structuring', info: 'Mapping facts to legal clauses' },
  { name: 'Schema Validation', info: 'Ensuring 100% legal compliance' },
  { name: 'Template Engine', info: 'Dynamic professional formatting' },
  { name: 'Storage & Audit', info: 'Immutable history of document state' },
];

const TechFoundation: React.FC = () => (
  <section id="tech" className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/5">
    {/* Background accent */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        
        <div className="space-y-8">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">The Core Engine</span>
          </motion.div>
          
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight"
          >
            Production-Grade <br />Infrastructure.
          </motion.h2>
          
          <motion.p 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.2 }}
            className="font-body text-[18px] text-text-secondary leading-relaxed max-w-[540px]"
          >
            Murdock is built to handle complexity. We've architected a modular pipeline that isolates AI processing from business logic, ensuring reliability and full auditability.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            {techStack.map((t, i) => (
              <motion.div 
                key={t.name}
                {...reveal}
                transition={{ ...revealTransition, delay: i * 0.1 + 0.3 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-gold/30 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-mono text-[11px] text-text-muted mb-4 group-hover:text-gold transition-colors">{t.icon}</div>
                <h4 className="font-display font-bold text-[16px] text-text-primary mb-2 group-hover:text-gold transition-all">{t.name}</h4>
                <p className="font-body text-[13px] text-text-muted leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          {...reveal}
          transition={{ ...revealTransition, delay: 0.5 }}
          className="relative glass-dark p-8 md:p-12 border border-white/10 rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-50" />
          <h4 className="relative z-10 font-body font-bold text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-10">Document Lifecycle Pipeline</h4>
          
          <div className="relative z-10 space-y-0 text-left">
            {pipelineSteps.map((step, i) => (
              <div key={step.name} className="flex gap-6 group text-left">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-surface-secondary font-mono text-[12px] text-text-muted group-hover:bg-gold group-hover:text-background group-hover:border-gold transition-all duration-300">
                    {i + 1}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/10 to-transparent my-1" />
                  )}
                </div>
                <div className="pt-1.5 pb-8 text-left">
                  <h5 className="font-display font-bold text-[16px] text-text-primary group-hover:text-gold transition-colors text-left">{step.name}</h5>
                  <p className="font-body text-[13px] text-text-muted leading-relaxed text-left">{step.info}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-left">
            <div className="flex flex-wrap gap-3 mb-6">
              {['GPT-4o', 'Claude 3.5', 'Gemini Pro', 'Llama 3'].map(model => (
                <span key={model} className="px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-text-muted">{model}</span>
              ))}
            </div>
            <p className="font-body text-[11px] italic text-text-muted/60 text-left">Agnostic provider layer with automatic failover.</p>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default TechFoundation;

