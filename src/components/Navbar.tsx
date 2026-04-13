import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { GitHubIcon } from './SocialIcons';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'What We Build', href: '#what-we-build' },
  { label: 'For Who', href: '#who-its-for' },
  { label: 'Tech', href: '#tech' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Founder', href: '#founder' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(27, 43, 75, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 py-3 md:px-12">
          <Logo height={36} white className="shrink-0" />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body font-medium text-[14px] text-white/80 hover:text-gold transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* GitHub pill */}
            <motion.a
              href="https://github.com/adisingh-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-body font-medium text-white"
              style={{
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.04, borderColor: 'rgba(201,147,58,0.6)' }}
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>Coming Soon</span>
              <span className="text-gold">☆</span>
            </motion.a>

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('#partner-form')}
              className="bg-gold text-navy font-body font-bold text-[14px] px-5 py-2.5 rounded-lg"
              whileHover={{ scale: 1.03, backgroundColor: '#E8B96A' }}
              whileTap={{ scale: 0.97 }}
            >
              Partner With Us
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-navy p-8 flex flex-col gap-6 pt-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="font-body font-medium text-[16px] text-white/80 hover:text-gold transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
              <motion.button
                onClick={() => scrollTo('#partner-form')}
                className="mt-4 bg-gold text-navy font-body font-bold text-[14px] px-5 py-3 rounded-lg w-full"
                whileTap={{ scale: 0.97 }}
              >
                Partner With Us
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
