import React from 'react';
import { motion } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';

const Showcase: React.FC = () => {
  return (
    <section className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <motion.div {...reveal} className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-gold/50" />
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-gold/80">Product Interface</span>
          </motion.div>
          
          <motion.h2 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.1 }}
            className="font-display font-bold text-[36px] md:text-[52px] text-text-primary leading-tight max-w-[800px]"
          >
            Engineering elegance for <span className="text-gold italic font-normal">modern</span> law.
          </motion.h2>
          
          <motion.p 
            {...reveal} 
            transition={{ ...revealTransition, delay: 0.2 }}
            className="font-body text-[18px] text-text-secondary leading-relaxed max-w-[640px]"
          >
            A high-fidelity drafting environment where clarity meets compliance. Built to handle the most demanding legal workflows with precision and speed.
          </motion.p>
        </div>

        {/* The Showcase Image Content */}
        <motion.div 
          {...reveal} 
          transition={{ ...revealTransition, delay: 0.4 }}
          className="relative group mx-auto max-w-[1000px]"
        >
          {/* Main Showcase Container */}
          <div className="relative glass-dark p-2 md:p-3 rounded-[32px] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden rounded-[24px] aspect-[16/10] bg-background/50">
              <img 
                src="/murdock-web-img.webp" 
                alt="Murdock Web Showcase" 
                className="w-full h-full object-contain transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              />
              
              {/* Glassy overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 h-32 w-32 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 border-b-2 border-l-2 border-gold/20 rounded-bl-3xl pointer-events-none" />
          </div>
          
          {/* Shadow/Reflection beneath */}
          <div className="mt-12 mx-auto w-3/4 h-12 bg-gold/10 rounded-[100%] blur-[60px] opacity-30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
