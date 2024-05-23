import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { HashtagIcon, HeartIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Title from "./utils/Title";
import { truncate } from "lodash";

const Stories = ({ story: { title, news } }) => {
  const splideOptions = {
    perPage: 4,
    perMove: 1,
    type: 'loop',
    rewind: true,
    keyboard: 'global',
    gap: '6rem',
    pagination: false,
    padding: '4rem',
    breakpoints: {
      1200: { perPage: 3},
      991: { perPage: 2.3},
      768: { perPage: 2},
      500: { perPage: 1.3},
      425: { perPage: 1},
    },
  };

  const slideAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="nike-container mb-11">
      <Title title={title} />
      <div className="mt-7">
        <Splide options={splideOptions}>
          {news.map((val, i) => (
            <SplideSlide key={i} className="mb-0.5">
              <motion.div
                className="relative grid items-center gap-4 pb-2 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-300 ease-in-out ring-1 ring-slate-200 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideAnimation}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-center rounded-3xl">
                  <img
                    src={val.img}
                    alt={`img/story/${i}`}
                    className="w-full h-auto object-cover shadow-md shadow-slate-200 rounded-3xl"
                  />
                </div>
                <div className="flex items-center justify-between w-full px-4 rounded-3xl">
                  <div className="flex items-center gap-0.5 rounded-3xl">
                    <HeartIcon className="icon-style text-red-500 w-5 h-5" />
                    <span className="text-xs font-bold">{val.like}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <ClockIcon className="icon-style w-4 h-4 text-black" />
                    <span className="text-xs font-bold">{val.time}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <HashtagIcon className="icon-style text-[#d16f96]" />
                    <span className="text-xs font-bold text-gradient from-[#d16f96] to-[#ffa57e]">{val.by}</span>
                  </div>
                </div>
                <div className="grid items-center justify-items-start px-4">
                  <h1 className="text-base font-semibold lg:text-sm">{val.title}</h1>
                  <p className="text-sm text-justify lg:text-xs">{truncate(val.text, { length: 175 })}</p>
                </div>
                <div className="flex items-center justify-center px-4 w-full ">
                  <a 
                    href={val.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full px-3 py-3 bg-gradient-to-r from-[#ffa57e] to-[#d16f96] border-0 rounded-lg text-white font-bold text-lg text-center"
                    style={{ borderRadius: "20px" }}
                  >
                    {val.btn}
                  </a>
                </div>
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Stories;