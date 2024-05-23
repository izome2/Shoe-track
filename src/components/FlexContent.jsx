import React from 'react'

const FlexContent = ({ ifExists, endpoint: { title, heading, text, img, } }) => {
  return (
    <>
      <div className={`flex items-center justify-between lg:flex-col lg:justify-center nike-container ${ifExists ? 'flex-row-reverse sm:flex-col' : 'flex-row sm:flex-col'}`}>
        <div className='relative max-w-lg lg:max-w-none w-full md:text-center sm:text-center grid items-center lg:justify-items-center'>
          <div className='absolute inset-0 bg-gradient-to-b from-[#d66894be] to-[#f0a28196] rounded-lg blur-xl z-0 sm:block'></div>
          <div className='relative z-10 p-4 sm:p-2'>
            <h1 className='text-6xl sm:text-4xl font-bold text-gradient'>{heading}</h1>
            <h1 className='text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-white filter drop-shadow-lg'>{title}</h1>
            <p className='xl:text-sm sm:text-xs my-4 text-white drop-shadow-lg'>{text}</p>
          </div>
        </div>
        <div className='flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
          <img
            src={img}
            alt={`img/${heading}`}
            className={`object-cover transitions-theme ${ifExists ? 'rotate-[-20deg] hover:-rotate-12' : 'rotate-[19deg] hover:rotate-12'} sm:rotate-0`}
            style={{ width: "100%", marginTop: '30px' }} 
          />
        </div>
      </div>
    </>
  )
}

export default FlexContent
