import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assests } from '../assets/assests';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, cartitems, addtocart, removefromcart } = useContext(ShopContext);
  const itemcount = cartitems[id] || 0;

  return (
    <div className="text-gray-700">
      {/* Product Image with overlay buttons */}
      <div className="relative overflow-hidden rounded-2xl shadow-md group">
        <Link to={`/product/${id}`}>
          <img
            className="hover:scale-110 transition-transform ease-in-out duration-300 w-full h-48 object-cover"
            src={image[0]}
            alt={name}
          />
        </Link>

        {/* Floating Add/Remove Buttons */}
        <div className="absolute bottom-3 right-3">
          {itemcount === 0 ? (
            <button
              onClick={() => addtocart(id)}
              className="flex items-center cursor-pointer justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 shadow-md transition"
            >
              <img src={assests.addiconwhite} alt="add" className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-md">
              <button
                onClick={() => removefromcart(id)}
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 transition"
              >
                <img src={assests.removeiconred} alt="remove" className="w-4 h-4" />
              </button>

              <p className="font-medium">{itemcount}</p>

              <button
                onClick={() => addtocart(id)}
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 transition"
              >
                <img src={assests.addicongreen} alt="add" className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </div>
  )
}

export default ProductItem
