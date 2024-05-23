import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CartEmpty = ({ onCartToggle }) => {
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen px-11 text-center gap-7'>
        <iframe
          title="empty-animation"
          src="https://lottie.host/embed/d58228f2-2b78-4005-9dda-8bcdee58a907/tG1HwI0QkA.lottie"
          className='w-56 lg:w-48 sm:w-40 h-auto object-fill transition-all duration-300 hover:scale-110'
          style={{ width: '300px', height: '300px' , marginTop: '-150px' , opacity: '0.8'}}
        ></iframe>
        <button
          type='button'
          className='button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] flex items-center justify-center text-slate-900 py-3 gap-3 text-base px-8 font-semibold rounded-2xl active:scale-110'
          onClick={onCartToggle}
        >
      <ArrowLeftIcon className='w-5 h-5 text-white' />
      <span className='text-white'>Back To Shoe track</span>
        </button>
      </div>
    </>
  );
};

export default CartEmpty;
