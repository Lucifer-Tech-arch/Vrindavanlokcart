import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

const Verify = () => {

    const { token, setcartitems, backendurl} = useContext(ShopContext);
    const [searchparams, setsearchparams] = useSearchParams()

    const success = searchparams.get('success')
    const orderId = searchparams.get('orderId');
    const navigate = useNavigate();

    const verifyPayment = async() => {
        try {
            if(!token) {
                return null;
            }
            const response = await axios.post(backendurl + '/api/order/verifystripe',{success,orderId}, {headers: {token}});
            if(response.data.success) {
                console.log('success');
                setcartitems({});
                navigate('/orders')
            }
            else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
       verifyPayment();
    },[token,success,orderId])
  return (
    <div className="mt-[100px] text-center">
      <p className="text-lg font-semibold">Verifying your payment...</p>
    </div>
  )
}

export default Verify
