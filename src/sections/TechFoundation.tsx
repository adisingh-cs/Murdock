import React from 'react';
import { motion } from 'framer-motion';
import { reveal } from '../lib/animations';

const techStack = [
  { name: 'Node.js + TypeScript', desc: 'Type-safe API orchestration and pipeline control', icon: '🟢' },
  { name: 'Python + FastAPI', desc: 'Isolated AI microservice — independently scalable', icon: '🐍' },
  { name: 'PostgreSQL + Drizzle ORM', desc: 'Schema-versioned document storage with full audit trail', icon: '🐘' },
  { name: 'Docker + Compose', desc: 'One-command dev and production environment', icon: '🐳' },
];

const pipelineSteps = ['Input Normalization', 'Module Routing', 'AI Structuring', 'Schema Validation', 'Template Selection', 'Output Generation', 'Storage & Audit'];
const aiProviders = ['OpenAI GPT-4o', 'Anthropic Claude', 'Google Gemini', 'Ollama (Self-hosted)'];

const TechFoundation: React.FC = () => (
  <section id="tech" className="bg-white py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <motion.span {...reveal} className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-3">The Foundation</motion.span>
      <motion.h2 {...reveal} className="font-display font-bold text-[30px] md:text-[42px] text-navy mb-4">Production-Grade From Day One.</motion.h2>
      <motion.p {...reveal} className="font-body text-[19px] leading-[1.8] text-slate max-w-[640px] mb-16">
        Murdock is not a prototype. It is architected as a long-term platform — schema-versioned, AI-provider-agnostic, fully containerized, and designed to scale from 10 to 10 million documents without a rewrite.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div {...reveal} className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {techStack.map((t, i) => (
            <div key={t.name} className="p-6" style={{ borderBottom: i < 2 ? '1px solid hsl(var(--warm-gray))' : 'none', borderRight: i % 2 === 0 ? '1px solid hsl(var(--warm-gray))' : 'none' }}>
              <span className="text-xl mb-2 block">{t.icon}</span>
              <h4 className="font-body font-medium text-[15px] text-navy mb-1">{t.name}</h4>
              <p className="font-body text-[13px] text-slate">{t.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...reveal} className="glass-light p-8">
          <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-6">7-Step Document Pipeline</span>
          <div className="space-y-0">
            {pipelineSteps.map((step, i) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-body font-medium shrink-0 ${i === 2 ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>{i + 1}</div>
                  {i < pipelineSteps.length - 1 && <div className="w-px h-6 border-l border-dashed border-warm-gray" />}
                </div>
                <div className="pb-4 flex items-center gap-2">
                  <span className={`font-body font-medium text-[15px] ${i === 2 ? 'text-gold' : 'text-navy'}`}>{step}</span>
                  {i === 2 && <span className="px-2 py-0.5 rounded-full text-[11px] font-body font-medium bg-brand-green/10 text-brand-green border border-brand-green/30">Circuit breaker protected</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div {...reveal} className="text-center">
        <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold block mb-2">AI Provider Abstraction</span>
        <p className="font-body text-[17px] text-slate mb-6 max-w-[500px] mx-auto">Murdock never locks you into one AI model. Switch between providers at runtime — no restart required.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {aiProviders.map((p) => (
            <motion.span key={p} className="px-4 py-2 rounded-full font-body font-medium text-[14px] text-navy bg-white border border-warm-gray cursor-default" whileHover={{ borderColor: '#C9933A' }}>{p}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default TechFoundation;
