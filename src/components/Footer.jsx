import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = ({ footerAPI: { titles, links } }) => {
  const [Year, setYear] = useState();
  const footerControls = useAnimation();
  const [footerRef, footerInView] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    const getYear = () => setYear(new Date().getFullYear());
    getYear();
  }, []);

  useEffect(() => {
    if (footerInView) {
      footerControls.start({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6 },
      });
    } else {
      footerControls.start({
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
        transition: { duration: 0.6 },
      });
    }
  }, [footerControls, footerInView]);

  return (
    <motion.footer className='bg-theme pt-7 pb-5'
      ref={footerRef}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={footerControls}
    >
      <div className='shoe-container text-white'>
        <div className='grid items-start grid-cols-5 max-w-[1400px] w-full h-[220px] m-auto md:max-w-none md:gap-5'>
          {titles.map((val, i) => {
            const titleControls = useAnimation();
            const [titleRef, titleInView] = useInView();

            useEffect(() => {
              if (titleInView) {
                titleControls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: i * 0.1 },
                });
              } else {
                titleControls.start({
                  opacity: 0,
                  y: 20,
                  transition: { duration: 0.6 },
                });
              }
            }, [titleControls, titleInView]);

            return (
              <motion.div
                key={i}
                ref={titleRef}
                initial={{ opacity: 0, y: 20 }}
                animate={titleControls}
                className="grid items-center"
              >
                <h1 className='text-lg lg:text-base md:text-sm uppercase font-semibold'>{val.title}</h1>
              </motion.div>
            );
          })}
          {links.map((list, i) => (
            <ul key={i} className="grid items-center gap-1">
              {list.map((link, j) => {
                const linkControls = useAnimation();
                const [linkRef, linkInView] = useInView();

                useEffect(() => {
                  if (linkInView) {
                    linkControls.start({
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: j * 0.1 },
                    });
                  } else {
                    linkControls.start({
                      opacity: 0,
                      y: 20,
                      transition: { duration: 0.6 },
                    });
                  }
                }, [linkControls, linkInView]);

                return (
                  <motion.li
                    key={j}
                    ref={linkRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={linkControls}
                    className="text-sm sm:text-xs"
                  >
                    {link.link}
                  </motion.li>
                );
              })}
            </ul>
          ))}
        </div>
        <div className='mt-5 text-center'>
          <p className='text-sm md:text-center'>
            Copyright<sup className='text-base font-bold'>&copy;</sup> All Reserved Rights <span className='font-semibold'>SHOE TRACK STORE {Year}</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
