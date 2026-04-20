import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import WhatWeDo from '../sections/WhatWeDo';
import Showcase from '../sections/Showcase';
import WhoItsFor from '../sections/WhoItsFor';
import TechFoundation from '../sections/TechFoundation';
import Modules from '../sections/Modules';
import OpenSource from '../sections/OpenSource';
import Founder from '../sections/Founder';
import PartnerForm from '../sections/PartnerForm';
import ScrollToTop from '../components/ScrollToTop';
import SEO from '../components/SEO';
import Schema from '../components/Schema';

const Home: React.FC = () => {
  const hasLoaded = sessionStorage.getItem('murdock_loaded');
  const [loading, setLoading] = useState(!hasLoaded);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const onLoadingComplete = useCallback(() => {
    sessionStorage.setItem('murdock_loaded', '1');
    setLoading(false);
  }, []);

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <SEO />
      <Schema />
      <AnimatePresence>
        {loading && (
          <LoadingScreen 
            onComplete={onLoadingComplete} 
            ready={heroLoaded} 
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: loading ? 0 : 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={loading ? "pointer-events-none h-0 overflow-hidden" : ""}
      >
        <Navbar />
        <main>
          <Hero onImageLoad={() => setHeroLoaded(true)} />
          <Problem />
          <WhatWeDo />
          <Showcase />
          <WhoItsFor />
          <TechFoundation />
          <Modules />
          <OpenSource />
          <Founder />
          <PartnerForm />
        </main>
        <Footer />
        <ScrollToTop />
      </motion.div>
    </div>
  );
};

export default Home;
