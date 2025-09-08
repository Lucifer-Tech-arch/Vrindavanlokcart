import React from 'react'
import { assests } from '../assets/assests'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 text-center text-xs py-20 sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assests.handshake} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-[#c2410c]'>Reliable Products</p>
        <p className='text-gray-700'>'Where quality meets trust'</p>
      </div>
      <div>
        <img src={assests.shipped} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-[#c2410c]'>Indian Shipping</p>
        <p className='text-gray-700'>'From Vrindavan to Your Home'</p>
      </div>
      <div>
        <img src={assests.growth} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-[#c2410c]'>Great Value</p>
        <p className='text-gray-700'>'Premium Products, Priced Right'</p>
      </div>
      <div>
        <img src={assests.check} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-[#c2410c]'>Secure Payments</p>
        <p className='text-gray-700'>'Security with Every Purchase'</p>
      </div>
    </div>
  )
}

export default OurPolicy
