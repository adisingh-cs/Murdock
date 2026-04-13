import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';


const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.querySelector('#problem');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-[#050505] overflow-hidden pt-20 md:pt-24 group">
      {/* Refined Background Treatment */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#050505] to-[#101010] opacity-90" />
      
      {/* User Requested Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 py-10 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-8 max-w-[640px] lg:-translate-y-12">

            <motion.h1 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.1 }} 
              className="text-[48px] md:text-[68px] font-display font-bold text-text-primary leading-[1.05] tracking-tight"
            >
              A fighting chance in <span className="text-gold italic font-normal">your</span> legal system.
            </motion.h1>

            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.2 }} 
              className="font-body text-[18px] md:text-[20px] leading-[1.6] text-text-secondary max-w-[540px]"
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
                className="bg-gold text-background font-body font-bold text-[15px] px-10 py-4 rounded-xl shadow-xl shadow-gold/10 transition-shadow hover:shadow-gold/20 flex items-center gap-2"
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
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative w-full max-w-[500px]">
              <img 
                src="/hero-section-img.webp" 
                alt="Murdock Dashboard" 
                className="w-full h-auto object-contain" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

