import React from 'react'
import { ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

const CartCount = ({ onCartToggle, totalQTY, onClearCartItems }) => {
  return (
   <>
      <div className='bg-white h-14 flex items-center justify-between px-3 sticky'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              borderRadius: '1.5rem',
            }}
      >
        <div className='flex items-center gap-3'>
            <div className='grid items-center cursor-pointer' onClick={onCartToggle}>
                <ChevronDoubleLeftIcon className='w-7 h-7 text-[#d46b95] hover:text-orange-500 stroke-[2]' />
            </div>
            <div className='grid items-center'>
            <h1 className='text-lg font-medium text-[#d46b95]'>Your Cart <span className='bg-[#0000000e]  rounded-lg px-2 py-1 text-white-100 font-normal text-sm'>({totalQTY} Items)</span></h1>
            </div>
        </div>
        <div className='flex items-center'>
            <button type='button' onClick={onClearCartItems} className='rounded-xl bg-gradient-to-b from-[#ffa179] to-[#d46b95] active:scale-90 p-0.5'>
                <XMarkIcon className='w-7 h-7 text-white stroke-[2]' />
            </button>
        </div>
      </div>
   </>
  )
}

export default CartCount
