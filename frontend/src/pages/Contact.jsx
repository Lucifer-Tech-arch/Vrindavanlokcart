import React from 'react'
import { assests } from '../assets/assests'

const Contact = () => {
  return (
    <div className='pt-[100px]'>
      <div className='text-center text-2xl'>
        <img src={assests.contact} className='mx-auto -rotate-1 w-[290px] h-[190px] object-contain' alt="" />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assests.aboutbg} className='w-full rounded-2xl md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-[#c2410c]'>Our Store</p>
          <p className='text-gray-500'>54709 Willims Station <br /> Suite 350, Vrindavan, UP, India</p>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: info@vrindavanlokcart.com</p>
          <p className='font-semibold text-xl text-[#c2410c]'>Careers at Vrindavan LokCart</p>
          <p className='text-gray-500'>Learn more about our teams, workers and job openings. </p>
          <button className='border border-[#c2410c] px-8 py-4 text-sm hover:bg-[#c2410c] hover:text-white tansition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
