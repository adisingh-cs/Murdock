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

const Home: React.FC = () => {
  const hasLoaded = sessionStorage.getItem('murdock_loaded');
  const [loading, setLoading] = useState(!hasLoaded);

  const onLoadingComplete = useCallback(() => {
    sessionStorage.setItem('murdock_loaded', '1');
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onComplete={onLoadingComplete} />}</AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Navbar />
          <main>
            <Hero />
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
      )}
    </>
  );
};

export default Home;
