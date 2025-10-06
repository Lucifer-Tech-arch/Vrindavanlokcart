import React from 'react'
import { assests } from '../assets/assests'

const Contact = () => {
  return (
    <div className='pt-[100px]'>
      <div className='text-center text-2xl'>
        <img
          src={assests.contact}
          className='mx-auto -rotate-1 w-[290px] h-[190px] object-contain'
          alt=''
        />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Google Maps Embed */}
        <div className='w-full rounded-2xl overflow-hidden md:max-w-[450px] shadow-md'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6785971582413!2d77.66023597525497!3d27.579709982829394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973719e4f13fbd3%3A0x6b42201bcb74c2c1!2sPrem%20Mandir%2C%20Vrindavan%2C%20Uttar%20Pradesh%20281504!5e0!3m2!1sen!2sin!4v1696582017465!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right Side Content */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-[#c2410c]'>Our Store</p>
          <p className='text-gray-500'>
            54709 Willims Station <br /> Suite 350, Vrindavan, UP, India
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 <br /> Email: info@vrindavanlokcart.com
          </p>
          <p className='font-semibold text-xl text-[#c2410c]'>
            Careers at Vrindavan LokCart
          </p>
          <p className='text-gray-500'>
            Learn more about our teams, workers and job openings.
          </p>
          <button className='border border-[#c2410c] px-8 py-4 text-sm hover:bg-[#c2410c] hover:text-white transition-all duration-500 cursor-pointer'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
