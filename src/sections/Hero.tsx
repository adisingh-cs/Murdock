import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { reveal, revealTransition } from '../lib/animations';
import Magnetic from '../components/Magnetic';
import ParticleBackground from '../components/ParticleBackground';


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const scrollToNext = () => {
    const el = document.querySelector('#problem');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-transparent overflow-hidden pt-28 pb-20 md:pt-24 md:pb-0 group">
      <ParticleBackground particleCount={800} />
      {/* Refined Background Treatment */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent opacity-40 z-0" />
      
      {/* User Requested Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 py-4 lg:py-0 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          
          {/* Right Column: Visual (Moved above content for mobile) */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end mt-4 lg:mt-0"
            style={{ y: isMobile ? 0 : y2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px]">
              <img 
                src="/hero-section-img.webp" 
                alt="Murdock Dashboard" 
                className="w-full h-auto object-contain drop-shadow-2xl" 
                style={{ maxHeight: isMobile ? '30vh' : 'none' }}
              />
            </div>
          </motion.div>

          {/* Left Column: Content */}
          <div className="order-2 lg:order-1 flex flex-col space-y-6 md:space-y-8 max-w-[640px] lg:-translate-y-12">

            <motion.h1 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.1 }} 
              className="text-[32px] sm:text-[40px] md:text-[68px] font-display font-bold text-text-primary leading-[1.1] md:leading-[1.05] tracking-tight"
            >
              A fighting chance in <br className="md:hidden" /> <span className="text-gold italic font-normal">your</span> legal system.
            </motion.h1>

            <motion.p 
              {...reveal} 
              transition={{ ...revealTransition, delay: 0.2 }} 
              className="font-body text-[15px] md:text-[20px] leading-[1.6] text-text-secondary max-w-full md:max-w-[540px]"
            >
              Building the API-first infrastructure that turns complex laws into structured, ready-to-use documents. Built for a generation that demands access, not gatekeeping.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-6"
              {...reveal}
            >
              <Magnetic>
                <button 
                  onClick={() => {
                    const el = document.querySelector('#partner-form');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-10 py-5 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-all duration-300 shadow-[0_0_20px_rgba(201,147,58,0.3)]"
                >
                  Contact
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

