import { createContext, useState } from "react";
import { products } from '../assets/assests';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;

    const [search, setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false);
    const [cartitems, setcartitems] = useState({});
    const navigate = useNavigate();

    // ✅ Add to Cart
    const addtocart = (itemId, showToast = true) => {
        setcartitems((prevCart) => {
            const cartCopy = { ...prevCart };
            cartCopy[itemId] = (cartCopy[itemId] || 0) + 1;

            if (showToast) {
                toast.success('Item added to cart!', {
                    position: "top-right",
                    autoClose: 2000,
                });
            }

            return cartCopy;
        });
    };


    // ✅ Remove from Cart
    const removefromcart = (itemId) => {
        setcartitems((prevCart) => {
            const cartCopy = { ...prevCart };
            if (cartCopy[itemId]) {
                cartCopy[itemId] -= 1;
                if (cartCopy[itemId] <= 0) {
                    delete cartCopy[itemId]; // clean up empty items
                }
            }

            toast.info('Item removed from cart', {
                position: "top-right",
                autoClose: 2000,
            });

            return cartCopy;
        });
    };

    // ✅ Cart Item Count
    const cartcount = () => {
        return Object.values(cartitems).reduce((acc, qty) => acc + qty, 0);
    };

    // ✅ Cart Total Amount
    const getcartamount = () => {
        let totalamount = 0;
        for (const itemId in cartitems) {
            const iteminfo = products.find((pro) => pro._id === itemId);
            if (iteminfo) {
                totalamount += iteminfo.price * cartitems[itemId];
            }
        }
        return totalamount;
    };

    // ✅ Update Quantity Directly
    const updatequantity = (itemId, quantity) => {
        setcartitems((prevCart) => {
            const cartCopy = { ...prevCart };
            if (quantity > 0) {
                cartCopy[itemId] = quantity;
            } else {
                delete cartCopy[itemId];
            }
            return cartCopy;
        });
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search, setsearch,
        showsearch, setshowsearch,
        cartitems,
        addtocart,
        removefromcart,   // ✅ now available in context
        cartcount,
        updatequantity,
        getcartamount,
        navigate,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
