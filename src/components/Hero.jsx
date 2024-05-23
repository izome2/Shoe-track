import React, { useEffect, useRef, useState } from 'react';
import './parallax.css';
import Clips from './utils/Clips';
import SocialLink from './utils/SocialLink';
import pattern from './pattirn-01.svg';

const Hero = ({ heroapi: { title, subtitle, btntext, img, sociallinks, videos } }) => {
  const images = [
    './src/assets/p1.png',
    './src/assets/p2.png',
    './src/assets/p3.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
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
    <div className='relative h-auto w-auto flex flex-col'>
      <div className='bg-gradient-to-b from-[#f0a281] via-[#ffd893] to-[#da749d] h-[75vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] w-auto absolute top-5 left-5 right-5 bottom-5 opacity-100 z-0 rounded-3xl'></div>
      <img src={pattern} alt="Pattern" className="absolute top-5 z-0 opacity-30" />
      <div className='relative opacity-100 z-20 grid items-center justify-items-center nike-container'>
        <div className='grid items-center justify-items-center mt-28 md:mt-24'>
          <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{title}</h1>
          <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{subtitle}</h1>
          <div className='my-8'></div>
          <div className='grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[-1.5%] xl:left-0 w-auto h-auto'>
            {videos?.map((val, i) => (
              <Clips
                key={i}
                imgsrc={val.imgsrc}
                clip={val.clip}
              />
            ))}
          </div>
          <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-[-1%] gap-12'>
            {sociallinks?.map((val, i) => (
              <SocialLink
                key={i}
                icon={val.icon}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <span className="parallax-blur" text="Shoe track">Shoe track</span>
          <span className="parallax-text" text="Shoe track">Shoe track</span>
          <img ref={imageRef} className="sneaker-image" src={images[currentImageIndex]} alt="Sneaker" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
