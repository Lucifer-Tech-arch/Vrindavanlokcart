import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assests } from '../assets/assests';
import Relatedproducts from '../components/Relatedproducts';
import { toast } from 'react-toastify';

const Products = () => {
  const { productId } = useParams();
  const { products, currency, addtocart, cartitems, navigate } = useContext(ShopContext);

  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const limit = 200;

  const fetchproduct = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setimage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchproduct();
  }, [productId, products]);

  const handleBuyNow = () => {
    if (!productdata) return;

    const isInCart = cartitems[productdata._id] && cartitems[productdata._id] > 0;

    if (!isInCart) {
      addtocart(productdata._id, false); // 👈 no toast here
    }

    toast.info("Proceeding to checkout...", {
      position: "top-right",
      autoClose: 2000,
    });

    navigate("/placeorder");
  };


  return productdata ? (
    <div className="pt-[100px] border-t-2 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto rounded-lg shadow" />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-xl sm:text-2xl mt-2 text-[#c2410c]">
            {productdata.name}
          </h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assests.staricon} className="w-3.5" />
            <img src={assests.staricon} className="w-3.5" />
            <img src={assests.staricon} className="w-3.5" />
            <img src={assests.staricon} className="w-3.5" />
            <img src={assests.stardullicon} className="w-3.5" />
            <p className="pl-2">(12)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productdata.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5 my-8">
            {productdata.description.length > limit
              ? productdata.description.substring(0, limit) + "..."
              : productdata.description}
          </p>

          {/* Buttons: Add to Cart + Buy Now */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            {/* Add to Cart */}
            <button
              onClick={() => addtocart(productdata._id)}
              className="flex items-center gap-2 w-[170px] text-[#c2410c] text-sm font-medium px-6 py-2 border border-[#c2410c] cursor-pointer hover:bg-[#c2410c] hover:text-white transition-colors duration-200 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
              </svg>
              <span>Add to Cart</span>
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center mt-3 sm:mt-0 w-[170px] bg-[#c2410c] text-white text-sm font-medium px-6 py-2 border border-[#c2410c] cursor-pointer hover:bg-white hover:text-[#c2410c] transition-colors duration-200 rounded-lg"
            >
              <span>Buy Now</span>
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-10">
        <b className="px-5 py-3 text-2xl text-[#c2410c]">Leave a Review</b>
      </div>

      {/* Related Products */}
      <Relatedproducts category={productdata.categories} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Products;
