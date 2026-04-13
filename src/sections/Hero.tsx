import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const AshokaChakra = () => (
  <svg width="600" height="600" viewBox="0 0 600 600" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04]" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => (
      <line key={i} x1="300" y1="300" x2={300 + 280 * Math.cos((i * 15 * Math.PI) / 180)} y2={300 + 280 * Math.sin((i * 15 * Math.PI) / 180)} stroke="white" strokeWidth="1" />
    ))}
    <circle cx="300" cy="300" r="280" fill="none" stroke="white" strokeWidth="1" />
    <circle cx="300" cy="300" r="40" fill="none" stroke="white" strokeWidth="1" />
  </svg>
);

const techLogos = ['Node.js', 'PostgreSQL', 'Docker', 'Python', 'FastAPI'];

const Hero: React.FC = () => {
  const scrollToNext = () => {
    document.querySelector('#problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      <AshokaChakra />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(201,147,58,0.12)', filter: 'blur(120px)', animation: 'blob-drift 8s ease-in-out infinite alternate' }} aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'rgba(46,74,122,0.5)', filter: 'blur(140px)', animation: 'blob-drift 8s ease-in-out infinite alternate-reverse' }} aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 py-32 md:py-0 w-full">
        <div className="max-w-[700px]">
          <motion.div {...reveal} transition={{ ...revealTransition, delay: 0.2 }} className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-green inline-block" style={{ animation: 'pulse-dot 2s infinite' }} />
            <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-gold">Open Source · API-First · Built for India</span>
          </motion.div>

          <motion.h1 {...reveal} transition={{ ...revealTransition, delay: 0.4 }} className="font-display font-bold text-[38px] md:text-[64px] text-white leading-tight mb-6">
            Every Indian Deserves a <span className="text-gold">Fighting Chance</span> in Their Own Legal System.
          </motion.h1>

          <motion.p {...reveal} transition={{ ...revealTransition, delay: 0.6 }} className="font-body text-[19px] leading-[1.8] max-w-[580px] mb-6" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Murdock is open-source infrastructure that turns complex legal processes into structured, ready-to-use documents — for citizens, lawyers, businesses, and developers across India. No jargon. No gatekeeping. Just access.
          </motion.p>

          <motion.div {...reveal} transition={{ ...revealTransition, delay: 0.8 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8" style={{ border: '1px solid rgba(201,147,58,0.4)', background: 'rgba(201,147,58,0.08)' }}>
            <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>⚖ Structured documents — not legal advice. Always reviewed by you.</span>
          </motion.div>

          <motion.div {...reveal} transition={{ ...revealTransition, delay: 1.0 }} className="flex flex-wrap gap-3.5 mb-14">
            <motion.button
              onClick={() => document.querySelector('#partner-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold text-navy font-body font-bold text-[16px] px-7 py-3.5 rounded-[10px]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Fund or Partner With Us
            </motion.button>
            <motion.a
              href="https://github.com/adisingh-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-[16px] text-white px-6 py-3.5 rounded-[10px] inline-block"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
              whileHover={{ borderColor: '#C9933A', color: '#C9933A' }}
            >
              Explore on GitHub →
            </motion.a>
          </motion.div>

          <motion.div {...reveal} transition={{ ...revealTransition, delay: 1.3 }}>
            <p className="font-body text-[12px] uppercase tracking-[0.08em] mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Built with trusted open-source infrastructure</p>
            <div className="flex flex-wrap items-center gap-7">
              {techLogos.map((t) => <span key={t} className="font-mono text-[14px] text-white/40">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </div>

      <button onClick={scrollToNext} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-label="Scroll to explore">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9933A" strokeWidth="2" strokeLinecap="round" style={{ animation: 'bounce-chevron 2s infinite' }}><path d="M6 9l6 6 6-6" /></svg>
        <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Scroll to explore</span>
      </button>
    </section>
  );
};

export default Hero;
