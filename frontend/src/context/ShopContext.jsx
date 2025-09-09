import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [search, setsearch] = useState('');
    const [products,setProducts] = useState([]);
    const [showsearch, setshowsearch] = useState(false);
    const [cartitems, setcartitems] = useState({});
    const [token,setToken] = useState("")
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

    //products data from backend api
    const getproductdata = async() => {
        try {
            const response = await axios.get(backendurl+ '/api/product/list')
            if(response.data.success) {
                setProducts(response.data.products);
            }
            else{
                toast.error(response.data.message,{autoClose: 2000});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {autoClose: 2000});
        }
    }

    useEffect(() => {
        getproductdata();
    },[])

    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        } 
    },[])

    const value = {
        products,
        currency,
        delivery_fee,
        search, setsearch,
        showsearch, setshowsearch,
        cartitems,
        addtocart,
        removefromcart,   
        backendurl,
        cartcount,
        updatequantity,
        getcartamount,
        navigate,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
