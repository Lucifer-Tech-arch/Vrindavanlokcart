import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

const Collections = () => {

  const { products } = useContext(ShopContext);
  const [showfilter, setfilter] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [sorttype, setsorttype] = useState('relavent');
  const { search, showsearch } = useContext(ShopContext);

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setcategory(prev => [...prev, e.target.value]);
    }
  }

  const applyfilter = () => {

    let productcopy = products.slice();

    if (search && showsearch) {
      productcopy = productcopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productcopy = productcopy.filter(item => category.includes(item.categories));
    }
    setfilterproduct(productcopy);
  }


  const sortproduct = () => {

    let fpcopy = filterproduct.slice();

    switch (sorttype) {
      case "low-high":
        setfilterproduct(fpcopy.sort((a, b) => (a.price - b.price)));
        break;

      case "high-low":
        setfilterproduct(fpcopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyfilter();
        break;
    }
  }

  useEffect(() => {
    applyfilter();
  }, [category, search, showsearch]);

  useEffect(() => {
    sortproduct();
  }, [sorttype]);

  return (
    <div className={`flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  ${showsearch ? "pt-[5px]" : 'pt-[100px]'}`}>

      {/* filter options*/}
      <div className='min-w-60'>
        <p
          onClick={() => setfilter(!showfilter)}
          className='my-2 text-xl flex items-center text-[#c2410c] cursor-pointer gap-2'
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c7c7c7ff"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" /></svg>
          FILTERS
          <svg
            className={`sm:hidden transform transition-transform duration-300 ${showfilter ? 'rotate-90' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#cfceceff"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-[#c2410c]'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'dhup batti'} onChange={togglecategory} name="" id="" />Dhup Batti
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'key rings'} onChange={togglecategory} name="" id="" />Key Rings
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'laddo gopal'} onChange={togglecategory} name="" id="" />Laddo Gopal
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'durga mata'} onChange={togglecategory} name="" id="" />Durga Mata
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'khatu shyam'} onChange={togglecategory} name="" id="" />Khatu Shyam
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'ram darbar'} onChange={togglecategory} name="" id="" />Ram Darbar
            </p>

          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          {/* Product Sort */}
          <select onChange={(e) => (setsorttype(e.target.value))} className='border-1 text-[#c2410c] border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterproduct.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections
