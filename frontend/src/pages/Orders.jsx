import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const Orders = () => {
  const { backendurl, currency, token } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);

  const loadorderdata = async () => {
    try {

      if (!token) {
  
        return null;
      }
      const response = await axios.post(backendurl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allorderitems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['Status'] = order.Status,
            item['payment'] = order.payment,
            item['paymentmethod'] = order.paymentmethod,
            item['date'] = order.date
            allorderitems.push(item);
          })
        }) 
        setorderdata(allorderitems.reverse());
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    loadorderdata();
  }, [token])
  return (
    <div className='mt-[100px]'>

      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {
          orderdata.map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Category: {item.categories}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'> {item.paymentmethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p>{item.Status}</p>
                </div>
                <button onClick={loadorderdata} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-[#c2410c] hover:text-white'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
