import React, { useState } from 'react'
import { assests } from '../assets/assests';

const Login = () => {

  const [currentstate, setcurrentstate] = useState("Sign-up");

  const onsubmithandler = async (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onsubmithandler} className='flex mt-[100px] flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-[#c2410c] text-3xl'>{currentstate}</p>
        <p className='w-8 flex justify-center items-center sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'>
          <img src={assests.flute} alt="" />
        </p>
      </div>

      {currentstate === "Login" ? "" : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required />}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:text-[#c2410c]'>Forgot Password?</p>
        {
          currentstate === "Login"
            ? <p onClick={() => setcurrentstate("Sign-up")} className='cursor-pointer hover:text-[#c2410c]'>Dont have an account?</p>
            : <p onClick={() => setcurrentstate("Login")} className='cursor-pointer hover:text-[#c2410c]'>Already have an account?</p>
        }
      </div>
      <button className='bg-[#c2410c] cursor-pointer text-white border rounded-lg font-light px-8 py-2 mt-4'>{currentstate === "Login" ? "Sign-In" : "Register"}</button>

       {/* Divider */}
      <div className='flex items-center w-full my-4'>
        <hr className='flex-grow border-gray-400' />
        <span className='px-2 text-sm text-gray-500'>OR</span>
        <hr className='flex-grow border-gray-400' />
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        className='flex items-center cursor-pointer gap-2 bg-white border border-gray-400 rounded-lg shadow px-4 py-2 w-full justify-center hover:bg-gray-100'
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className='w-5 h-5' />
        <span className='text-gray-700'>Continue with Google</span>
      </button>

      {/* Facebook Login */}
      <button
        type="button"
        className='flex cursor-pointer items-center gap-2 bg-[#1877F2] rounded-lg shadow px-4 py-2 w-full justify-center hover:bg-blue-600'
      >
        <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook Logo" className='w-5 h-5 bg-white rounded-full p-[2px]' />
        <span className='text-white'>Continue with Facebook</span>
      </button>
    </form>
  )
}

export default Login
