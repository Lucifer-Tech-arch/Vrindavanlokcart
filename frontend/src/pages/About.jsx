import React from 'react'
import Title from '../components/Title'
import { assests } from '../assets/assests'

const About = () => {
  return (
    <div className='pt-[100px]'>

      <div className=' text-center pt-1'>
        <img src={assests.about} className='mx-auto w-[290px] h-[190px] object-contain -rotate-1' alt="" />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assests.aboutbg} className='w-full rounded-2xl md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Vrindavan Lok Cart, your trusted destination for sacred, cultural, and spiritual essentials. Rooted in the divine land of Vrindavan – the eternal abode of Lord Krishna, we are dedicated to bringing the essence of devotion, tradition, and Indian culture right to your doorstep.</p>
          <p>At Vrindavan Lok Cart, we believe that spirituality is not just a practice, but a way of life. Our mission is to connect every devotee with authentic products that reflect the purity of our traditions – from puja samagri, laddo gopal, key-chains, idols, incense, rudraksha, tulsi malas, khadau, and handicrafts to ethnic attire and cultural décor items.</p>
          <b className='text-[#c2410c]'>Our Mission</b>
          <p>At Vrindavan Lok Cart, our mission is to bridge the gap between tradition and modern living – by offering devotees access to pure, sacred, and handcrafted products that carry the timeless essence of Indian spirituality and culture.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
       <div className='border border-gray-300 px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b className='text-[#c2410c]'>Quality Assurance:</b>
        <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
       </div>
       <div className='border border-gray-300 px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b className='text-[#c2410c]'>Convenience:</b>
        <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
       </div>
       <div className='border border-gray-300 px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b className='text-[#c2410c]'>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
       </div>
      </div>
    </div>
  )
}

export default About
