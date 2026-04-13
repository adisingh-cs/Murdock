import React from 'react';
import { motion } from 'framer-motion';

const DocumentCardVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[380px] aspect-[4/5] mx-auto lg:mx-0">
      {/* Decorative background blobs */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      {/* Main Card */}
      <motion.div 
        className="relative w-full h-full glass-dark border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Card Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-gold/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="px-3 py-1 rounded bg-white/5 border border-white/10 group">
            <span className="font-mono text-[10px] text-white/40 group-hover:text-gold transition-colors italic">document_v1.0.mdk</span>
          </div>
        </div>

        {/* Card Content - Simulated Legal Segments */}
        <div className="flex-1 p-8 space-y-6 overflow-hidden">
          {/* Segment 1: Header Info */}
          <div className="space-y-3">
            <motion.div 
              className="h-2 w-1/3 bg-gold/30 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <motion.div 
              className="h-2 w-full bg-white/10 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </div>

          {/* Segment 2: Main Body with Animated "Typing" Lines */}
          <div className="space-y-4 pt-4">
            {[0.7, 0.9, 0.8, 0.6, 0.95].map((width, i) => (
              <div key={i} className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gold/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    delay: 1.5 + (i * 0.1), 
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="h-full rounded-full bg-white/10"
                  style={{ width: `${width * 100}%` }}
                />
              </div>
            ))}
          </div>

          {/* Segment 3: Structured Data View */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 rounded-xl border border-gold/10 bg-gold/5 flex flex-col gap-2">
              <span className="font-mono text-[9px] text-gold uppercase tracking-wider">Entity identified</span>
              <div className="h-2 w-full bg-gold/20 rounded-full" />
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-2">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">Validation status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom interactive area */}
          <div className="pt-8 flex flex-col items-center">
            <motion.div 
              className="px-6 py-2 rounded-lg border border-gold/40 bg-gold/10 text-gold font-body text-[12px] font-bold cursor-default"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(201,147,58,0)", "0 0 20px 0 rgba(201,147,58,0.2)", "0 0 0 0 rgba(201,147,58,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Compile Final Deed
            </motion.div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
          <svg className="absolute top-0 right-0" width="80" height="80" viewBox="0 0 80 80">
            <path d="M0 0 H80 V80" fill="none" stroke="rgba(201,147,58,0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      </motion.div>

      {/* Floating secondary card */}
      <motion.div 
        className="absolute -bottom-6 -right-6 w-48 p-5 glass-light border border-white/20 shadow-xl"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-background border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold">M</div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white">Legal Engine</span>
            <span className="text-[9px] text-white/40">v1.2 Active</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-white/5 rounded-full" />
          <div className="h-1.5 w-[70%] bg-white/5 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentCardVisual;
