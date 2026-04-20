import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const taglines = [
  "Law isn’t broken. Access is.",
  "Stop guessing. Start drafting.",
  "Clarity wins cases.",
  "Better documents. Stronger positions.",
  "If it’s not structured, it’s not strong.",
  "Every word matters in court."
];

const LoadingScreen: React.FC<{ onComplete: () => void; ready?: boolean }> = ({ onComplete, ready = true }) => {
  const [show, setShow] = useState(true);
  const [tagline] = useState(() => taglines[Math.floor(Math.random() * taglines.length)]);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 2000); // Minimum 2 seconds of animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimePassed && ready) {
      const exitTimer = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 500);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [minTimePassed, ready, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo variant="mark" height={100} />
          </motion.div>

          <motion.div
            className="mt-4 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="font-display font-bold text-text-primary tracking-[0.25em] text-[28px]">
              MURDOCK
            </span>
            <span className="font-body font-bold text-[13px] text-center max-w-[300px] text-gold opacity-90 italic">
              "{tagline}"
            </span>
          </motion.div>

          <motion.div
            className="mt-10 h-[2px] w-[200px] overflow-hidden rounded-full bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gold shadow-[0_0_10px_rgba(201,147,58,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
