import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assests } from '../assets/assests';
import Carttotal from '../components/Carttotal';

const Cart = () => {
  const { products, currency, cartitems, updatequantity, navigate } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    const tempdata = [];
    for (const itemId in cartitems) {
      if (cartitems[itemId] > 0) {
        const product = products.find((p) => String(p._id) === itemId);
        if (product) {
          tempdata.push({
            ...product,
            quantity: cartitems[itemId],
          });
        }
      }
    }
    setcartdata(tempdata);
  }, [cartitems, products]);

  return (
    <div className="mt-[100px] px-4 sm:px-10">
      {cartdata.length === 0 ? (
        // 🛒 Empty cart
        <div className="flex mt-[150px] flex-col justify-center items-center h-[60vh] gap-4">
          <img
            src={assests.emptycart}
            alt="Empty Cart"
            className="w-[250px] sm:w-[400px]"
          />
          <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="text-white bg-[#c2410c] hover:bg-[#9a3412] transition text-sm px-6 py-3 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        // 🛒 Cart with items
        <>
          <div className="text-2xl mb-6">
            <Title text1={'YOUR'} text2={'CART'} />
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartdata.map((item) => (
              <div
                key={item._id}
                className="py-4 border-b border-gray-300 text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    src={item.image?.[0]}
                    className="w-16 sm:w-20 rounded-lg shadow"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{item.name}</p>
                    <p className="mt-1 text-gray-600 text-sm">
                      {currency}{item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updatequantity(item._id, Number(e.target.value))
                  }
                  className="border rounded-md text-center text-sm sm:text-base max-w-12 sm:max-w-20 px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />

                {/* Delete Button */}
                <img
                  src={assests.binicon}
                  onClick={() => updatequantity(item._id, 0)}
                  className="w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                  alt="Delete"
                />
              </div>
            ))}
          </div>

          {/* Cart Total + Checkout */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <Carttotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/placeorder")}
                  className="text-white bg-[#c2410c] hover:bg-[#9a3412] transition text-sm my-8 px-6 py-3 rounded-md"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
