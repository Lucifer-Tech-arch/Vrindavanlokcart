import React, { useEffect, useState } from 'react'
import {backendurl, currency} from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import Title from '../components/Title'

const List = ({token}) => {

  const [list,setList] = useState([]); 

  const fetchList = async () => {
     try {
      const response = await axios.get(backendurl+ '/api/product/list',{headers: {token,"Content-Type": "multipart/form-data"}});
      if(response.data.success) {
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message,{autoClose: 2000});
      }
     } catch (error) {
       console.log(error);
       toast.error(error.message,{autoClose: 2000});
     }
  }

  const removeProduct = async(id) => {
    try {

      const response = await axios.post(backendurl + '/api/product/remove', {id},{headers: {token}});

      if(response.data.success) {
        toast.success(response.data.message, {autoClose: 2000});
        await fetchList();
      }
      else{
        toast.error(response.data.message, {autoClose:2000})
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message,{autoClose: 2000})
    }
  }

  useEffect(() => {
    fetchList();
  },[])

  return (
    <>
      <h1 className='mb-2'><Title text1={'All'} text2={'Products List'} /></h1>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------  */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* --------Product List--------- */}
        {
          list.map((item,index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm' key={index}>
              <img src={item.image[0]} className='w-12' alt="" />
              <p>{item.name}</p>
              <p>{item.categories}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000ff"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg></p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
