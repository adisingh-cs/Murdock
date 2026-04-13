import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo variant="mark" height={80} />
          </motion.div>

          <motion.span
            className="mt-6 font-display font-bold text-white tracking-[0.2em] text-[28px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            MURDOCK
          </motion.span>

          <motion.div
            className="mt-6 h-[2px] w-[200px] overflow-hidden rounded-full"
            style={{ background: 'rgba(201,147,58,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gold"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1.4, ease: 'linear' }}
            />
          </motion.div>

          <motion.span
            className="mt-4 font-body text-[13px]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Legal Infrastructure · India
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
