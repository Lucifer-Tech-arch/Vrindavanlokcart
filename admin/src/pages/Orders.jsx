import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendurl, currency } from '../App';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {

  const [orders, setorders] = useState([]);

  const fetchallorders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendurl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setorders(response.data.orders);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {

    }

  }

  useEffect(() => {
    fetchallorders();
  }, [token])
  return (
    <div>
      <h3><Title text1={'Orders'} text2={'Page'} /></h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p key={index}>{item.name} - {item.quantity}</p>
                    }
                    else {
                      return <p key={index}>{item.name} - {item.quantity}, </p>
                    }
                  })}
                </div>
                <p>{order.address.firstname + " " + order.address.lastname}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentmethod}</p>
                  <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p>{currency}{order.amount}</p>
                <select>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
