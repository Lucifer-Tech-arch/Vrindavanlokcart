import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const Navbar = ({ settoken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(5%,65px)]' src={assets.logo} alt="" />
      <Title text1={'VLC'} text2={'Admin Pannel'} />
      <div className='bg-[#c2410c] cursor-pointer text-white flex items-center justify-center px-4 py-2 sm: px-5 sm:py-2 rounded-full text-xs sm:text-sm'>
        <button onClick={() => settoken('')} className='mr-2'>LogOut</button>
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#ffffffff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
      </div>
    </div>
  )
}

export default Navbar

