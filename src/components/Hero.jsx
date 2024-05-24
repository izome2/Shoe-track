import React, { useEffect, useRef, useState } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './parallax.css';
import Clips from './utils/Clips';
import SocialLink from './utils/SocialLink';
import pattern from './pattirn-01.svg';
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';

const Hero = ({ heroapi: { title, subtitle, btntext, img, sociallinks, videos } }) => {
  const images = [p1, p2, p3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        opacity: 1,
        y: 50,
        transition: { duration: 0.5 },
      });
    }
  }, [controls, inView]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }
      });
    }, { threshold: 1 });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [images.length]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls} className="relative h-auto w-auto flex flex-col">
      <div className='bg-gradient-to-b from-[#f0a281] via-[#ffd893] to-[#da749d] h-[75vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] w-auto absolute top-5 left-5 right-5 bottom-5 opacity-100 z-0 rounded-3xl'></div>
      <img src={pattern} alt="Pattern" className="absolute top-5 z-0 opacity-30" />
      <div className='relative opacity-100 z-20 grid items-center justify-items-center nike-container'>
        <div className='grid items-center justify-items-center mt-28 md:mt-24'>
          <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{title}</h1>
          <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{subtitle}</h1>
          <div className='my-8'></div>
          <div className='grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[0vw] lg:left-[2vw] w-auto h-auto'>
            {videos?.map((val, i) => (
              <Clips key={i} imgsrc={val.imgsrc} clip={val.clip} />
            ))}
          </div>
          <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-[0vw] lg:right-[2vw] gap-12'>
            {sociallinks?.map((val, i) => (
              <SocialLink key={i} icon={val.icon} />
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <span className="parallax-blur" text="Shoe track">Shoe track</span>
          <span className="parallax-text" text="Shoe track">Shoe track</span>
          <motion.img ref={imageRef} className="sneaker-image" src={images[currentImageIndex]} alt="Sneaker" />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
