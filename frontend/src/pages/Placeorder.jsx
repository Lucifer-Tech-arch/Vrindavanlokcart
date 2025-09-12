import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assests } from '../assets/assests'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

  const [method, setmethod] = useState("cod");
  const { navigate, token, backendurl, cartitems, setcartitems, cartcopy, getcartamount, delivery_fee, products } = useContext(ShopContext);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setformdata(data => ({ ...data, [name]: value }));
  }
  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      let orderitems = [];
      for (const productId in cartitems) {
        const quantity = cartitems[productId];
        if (quantity > 0) {
          const iteminfo = products.find(p => String(p._id) === String(productId));
          if (iteminfo) {
            orderitems.push({
              ...iteminfo,
              quantity: quantity
            });
          }
        }
      }

      let orderData = {
        address: formdata,
        items: orderitems,
        amount: getcartamount() + delivery_fee
      }
      switch (method) {

        //API calls for cod
        case 'cod':

          const response = await axios.post(backendurl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setcartitems({});
            navigate('/orders')
          }
          else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responsestripe = await axios.post(backendurl + '/api/order/stripe',orderData,{headers: {token}})
          if(responsestripe.data.success) {
            const {session_url} = responsestripe.data
            window.location.replace(session_url);
          }
          else{
            toast.error(responsestripe.data.message);
          }
          break;

        default:

          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 mt-[100px] min-h-[80vh]'>
      {/* Left */}
      <div className='flex flex-col gap-4 w-full sm: max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='firstname' value={formdata.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' required />
          <input type="text" onChange={onChangeHandler} name='lastname' value={formdata.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' required />
        </div>
        <input type="email" onChange={onChangeHandler} name='email' value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' required />
        <input type="text" onChange={onChangeHandler} name='street' value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' required />
        <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='city' value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' required />
          <input type="text" onChange={onChangeHandler} name='state' value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' required />
        </div>
        <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='zipcode' value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' required />
          <input type="text" onChange={onChangeHandler} name='country' value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' required />
        </div>
        <input type="text" onChange={onChangeHandler} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' required />
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
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-blue-700 border-blue-700" : ""}`}></p>
              <img className='h-5 mx-4' src={assests.Stripe} alt="" />
            </div>

            <div onClick={() => setmethod("razorpay")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-blue-700 border-blue-700" : ""}`}></p>
              <img className='h-5 mx-4' src={assests.Razorpay} alt="" />
            </div>

            <div onClick={() => setmethod("cod")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-blue-700 border-blue-700" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-[#c2410c] cursor-pointer border rounded-xl text-white px-13 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
