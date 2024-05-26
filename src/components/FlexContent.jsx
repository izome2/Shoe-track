import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FlexContent = ({ ifExists, endpoint: { title, heading, text, img } }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8 },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
        transition: { duration: 0.8 },
      });
    }
  }, [controls, inView]);

  return (
    <div
      className={`flex items-center justify-between lg:flex-col lg:justify-center nike-container ${
        ifExists ? 'flex-row-reverse sm:flex-col' : 'flex-row sm:flex-col'
      } mt-8 sm:mt-12`}
      ref={ref}
    >
      <div className="relative max-w-lg lg:max-w-none w-full md:text-center sm:text-center grid items-center lg:justify-items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d66894be] to-[#f0a28196] rounded-lg blur-xl z-0 sm:block"></div>
        <motion.div
          className="relative z-10 p-4 sm:p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl sm:text-4xl font-bold text-gradient">{heading}</h1>
          <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-white filter drop-shadow-lg">{title}</h1>
          <motion.p
            className="xl:text-sm sm:text-xs my-4 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.6 }}
          >
            {text}
          </motion.p>
        </motion.div>
      </div>
      <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
        {!imageLoaded && (
          <Skeleton
            className={`object-cover ${ifExists ? 'rotate-[-20deg] sm:rotate-0 mt-8 sm:mt-12' : 'rotate-[19deg] sm:rotate-0 mt-8 sm:mt-12'}`}
            style={{
              width: '100%',
              height: 'auto',
              transform: 'scale(1)',
              transition: 'transform 0.5s ease-in-out',
              borderRadius: '20px',
            }}
            duration={1}
          />
        )}
        <img
          src={img}
          alt={`img/${heading}`}
          className={`object-cover transitions-theme ${
            ifExists ? 'rotate-[-20deg] hover:-rotate-12' : 'rotate-[19deg] hover:rotate-12'
          } sm:rotate-0 mt-8 sm:mt-12 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default FlexContent;
