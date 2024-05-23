import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from './components';
import { heroapi, toprateslaes, highlight, sneaker, story, footerAPI } from './data/data.js';
import { motion } from 'framer-motion'; 
import './index.css';

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen />
      <Navbar />
      <Cart />
      {showContent && (
        <motion.main className='flex flex-col gap-16 relative scrollbar-y' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0 }}>
          <motion.div initial={{ filter: 'blur(30px)' }} animate={{ filter: 'blur(0)' }} transition={{ duration: 3 }}>
            <Hero heroapi={heroapi} />
          </motion.div>
          <FlexContent endpoint={highlight} ifExists />
          <Sales endpoint={toprateslaes} />
          <FlexContent endpoint={sneaker} />
          <Stories story={story} />
        </motion.main>
      )}
      <Footer footerAPI={footerAPI} />
    </>
  );
};

export default App;
