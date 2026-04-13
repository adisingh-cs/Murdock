import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <motion.div 
        className="relative z-10 text-center px-6" 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center mb-10">
          <Logo variant="mark" height={64} />
        </div>
        
        <h1 className="font-display font-bold text-[80px] md:text-[120px] text-gold mb-2 leading-none">404</h1>
        <h2 className="font-display font-bold text-[24px] md:text-[32px] text-text-primary mb-6">Page Not Found</h2>
        
        <p className="font-body text-[16px] text-text-secondary mb-10">
          Redirecting you back home in a few seconds...
        </p>

        <Link to="/" className="inline-block bg-text-primary text-background font-body font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-gold transition-all duration-300">
          Go Back Home Now →
        </Link>

        <p className="mt-12 font-body text-[13px] text-text-muted">
          Lost? Reach out at <a href="mailto:adisingh.cs@gmail.com" className="text-gold hover:underline transition-all">adisingh.cs@gmail.com</a>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
