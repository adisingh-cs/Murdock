import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { GitHubIcon } from './SocialIcons';

const navLinks = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Work', href: '#what-we-build' },
  { label: 'Foundation', href: '#tech' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Founder', href: '#founder' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 md:px-12 ${
          scrolled ? 'pt-5 pb-6 shadow-2xl shadow-black/20' : 'pt-6 pb-12'
        }`}
        style={{
          background: scrolled ? 'rgba(10, 15, 25, 0.98)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-[1240px] flex items-center justify-between px-6 md:px-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Logo height={32} white />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body font-medium text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-all"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {/* GitHub Pill */}
            <motion.a
              href="https://github.com/adisingh-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-body font-bold text-white transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(201,147,58,0.5)', background: 'rgba(255,255,255,0.08)' }}
              aria-label="GitHub Repository"
            >
              <GitHubIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Coming Soon</span>
              <span className="text-gold opacity-50 text-[10px]">●</span>
            </motion.a>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollTo('#partner-form')}
              className="bg-gold text-navy font-body font-bold text-[13px] uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-lg shadow-gold/10"
              whileHover={{ scale: 1.05, backgroundColor: '#D49F45' }}
              whileTap={{ scale: 0.98 }}
            >
              Partnership
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/80 p-2 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy/90 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-navy border-l border-white/10 p-10 flex flex-col gap-8 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="font-display text-[24px] text-white/80 hover:text-gold transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-auto space-y-4">
                <a
                  href="https://github.com/adisingh-cs"
                  className="flex items-center justify-center gap-3 w-full py-4 border border-white/20 rounded-xl text-white font-body"
                >
                  <GitHubIcon className="w-5 h-5" />
                  GitHub
                </a>
                <button
                  onClick={() => scrollTo('#partner-form')}
                  className="w-full bg-gold text-navy font-body font-bold text-[16px] py-4 rounded-xl"
                >
                  Partner With Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

