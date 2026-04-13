import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';
import DocumentCardVisual from '../components/DocumentCardVisual';

const AshokaChakra = () => (
  <svg width="800" height="800" viewBox="0 0 600 600" className="absolute right-[-10%] top-[-10%] opacity-[0.03] scale-150 pointer-events-none" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => (
      <line key={i} x1="300" y1="300" x2={300 + 280 * Math.cos((i * 15 * Math.PI) / 180)} y2={300 + 280 * Math.sin((i * 15 * Math.PI) / 180)} stroke="white" strokeWidth="1" />
    ))}
    <circle cx="300" cy="300" r="280" fill="none" stroke="white" strokeWidth="1" />
    <circle cx="300" cy="300" r="40" fill="none" stroke="white" strokeWidth="1" />
  </svg>
);

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.querySelector('#problem');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-navy overflow-hidden pt-20 md:pt-24">
      <AshokaChakra />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20" 
           style={{ background: 'radial-gradient(circle, rgba(201,147,58,0.3) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 10s ease-in-out infinite' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none opacity-20" 
           style={{ background: 'radial-gradient(circle, rgba(46,74,122,0.4) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'float 12s ease-in-out infinite reverse' }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 py-10 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-8 max-w-[640px] lg:-translate-y-12">

            <motion.h1 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.1 }} 
              className="text-[48px] md:text-[68px] font-display font-bold text-white leading-[1.05] tracking-tight"
            >
              A fighting chance in <span className="text-gold italic font-normal">your</span> legal system.
            </motion.h1>

            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.2 }} 
              className="font-body text-[18px] md:text-[20px] leading-[1.6] text-white/70 max-w-[540px]"
            >
              Building the API-first infrastructure that turns complex laws into structured, ready-to-use documents. Built for a generation that demands access, not gatekeeping.
            </motion.p>

            <motion.div 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.3 }} 
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={() => document.querySelector('#partner-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gold text-navy font-body font-bold text-[15px] px-10 py-4 rounded-xl shadow-xl shadow-gold/10 transition-shadow hover:shadow-gold/20 flex items-center gap-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Visual */}
          <motion.div 
            className="flex justify-center lg:justify-end lg:scale-90"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <DocumentCardVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

