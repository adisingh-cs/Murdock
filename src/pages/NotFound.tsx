import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden">
    <svg width="400" height="400" viewBox="0 0 600 600" className="absolute opacity-[0.03]" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1="300" y1="300" x2={300 + 280 * Math.cos((i * 15 * Math.PI) / 180)} y2={300 + 280 * Math.sin((i * 15 * Math.PI) / 180)} stroke="white" strokeWidth="1" />
      ))}
      <circle cx="300" cy="300" r="280" fill="none" stroke="white" strokeWidth="1" />
    </svg>
    <span className="absolute font-display font-bold text-[120px] text-white/[0.07] select-none" aria-hidden="true">404</span>
    <motion.div className="relative z-10 text-center px-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <div className="flex justify-center mb-6"><Logo variant="mark" height={64} /></div>
      <h2 className="font-display font-bold text-[36px] text-white mb-3">This document doesn't exist.</h2>
      <p className="font-body text-[17px] mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>Unlike Indian legal documents, this page was never compiled.</p>
      <Link to="/" className="inline-block bg-gold text-navy font-body font-bold text-[15px] px-6 py-3 rounded-lg hover:bg-gold-light transition-colors">Go Back Home →</Link>
      <p className="mt-6 font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Lost? Reach out at <a href="mailto:adisingh.cs@gmail.com" className="hover:text-gold transition-colors">adisingh.cs@gmail.com</a>
      </p>
    </motion.div>
  </div>
);

export default NotFound;
