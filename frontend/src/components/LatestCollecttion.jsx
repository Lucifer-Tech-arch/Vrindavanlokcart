import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';

const LatestCollecttion = () => {

  const {products} = useContext(ShopContext);
  const [latestproducts,setlatestproducts] = useState([]);

  useEffect(() => {
    setlatestproducts(products.slice(0,10));
  },[])
  
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Featured'} text2={'Products'} />
      </div>

      {/* Rendering products */}
      
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
       {
        latestproducts.map((item,index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
       }
     </div>
    </div>
  )
}

export default LatestCollecttion
