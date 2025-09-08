import React from 'react'
import { assests } from '../assets/assests'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assests.logo} className='mb-5 w-[100px]' alt="" />
                <p className='w-full md:w-2/3 text-gray-700'>At Vrindavan Lok Cart, we bring the essence of devotion to your doorstep. From sacred idols and pooja essentials to traditional handicrafts, every product reflects the spiritual charm of Vrindavan. Our mission is to connect your home with the blessings, traditions, and divine energy of our holy land</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Quick Links</p>
                <ul className='flex flex-col gap-1 text-[#c2410c]'>
                    <Link to='/'><li className='cursor-pointer'>Terms & Conditions</li></Link>
                    <Link to='/about'><li className='cursor-pointer'>About us</li></Link>
                    <Link to='/privacypolicy'><li className='cursor-pointer'>Privacy Policy</li></Link>
                    <Link to='/contact'><li className='cursor-pointer'>Contact us</li></Link>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Contact With Us</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='text-[#c2410c]'>+91-7310639238</li>
                    <li className='text-[#c2410c]'>info@vrindavanlokcart.com</li>
                    <li className='text-[#c2410c]'>Instagram</li>
                    <li className='text-[#c2410c]'>Facebook</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© www.vrindavanlokcart.com 2025. All rights reserved</p>
        </div>
    </div>
    )
}

export default Footer
