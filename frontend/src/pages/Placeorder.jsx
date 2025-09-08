import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assests } from '../assets/assests'
import { ShopContext } from '../context/ShopContext'

const Placeorder = () => {

  const [method,setmethod] = useState("");
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 mt-[100px] min-h-[80vh]'>
      {/* Left */}
      <div className='flex flex-col gap-4 w-full sm: max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name'/>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name'/>
        </div>
        <input type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address'/>
        <input type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street'/>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City'/>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode'/>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country'/>
        </div>
        <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'/>
      </div>

      {/* Right Side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          {/* Payment methods */}

          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={() => setmethod("stripe")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe"? "bg-blue-700 border-blue-700": ""}`}></p>
              <img className='h-5 mx-4' src={assests.Stripe} alt="" />
            </div>

            <div onClick={() => setmethod("razorpay")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay"? "bg-blue-700 border-blue-700": ""}`}></p>
              <img className='h-5 mx-4' src={assests.Razorpay} alt="" />
            </div>

            <div onClick={()=> setmethod("cod")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod"? "bg-blue-700 border-blue-700": ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate("/orders")} className='bg-[#c2410c] cursor-pointer border rounded-xl text-white px-13 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Placeorder
