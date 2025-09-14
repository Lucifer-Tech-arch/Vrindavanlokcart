import React, { useContext, useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Forgotpassword = () => {
  const navigate = useNavigate();
  const { backendurl } = useContext(ShopContext);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resendTimer, setResendTimer] = useState(0); 

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlesendotp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email", {autoClose: 2000});
    try {
      const response = await axios.post(`${backendurl}/api/user/sendotp`, { email });
      if (response.data.success !== false) {
        toast.success("OTP sent to your email", {autoClose: 2000});
        setStep(2);
        setResendTimer(30);
      } else {
        toast.error(response.data.message, {autoClose: 2000});
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending OTP",{autoClose: 2000});
    }
  };

  const handleverifyotp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP", {autoClose: 2000});
    try {
      const response = await axios.post(`${backendurl}/api/user/verifyotp`, { email, otp });
      if (response.data.success !== false) {
        toast.success("OTP verified", {autoClose: 2000});
        setStep(3);
      } else {
        toast.error(response.data.message, {autoClose: 2000});
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid or expired OTP", {autoClose: 2000});
    }
  };

  const handleresetpassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.error("Fill all password fields", {autoClose: 2000});
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match", {autoClose: 2000});

    try {
      const response = await axios.post(
        `${backendurl}/api/user/resetpassword`,
        { email, newpassword: newPassword },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Password reset successfully", {autoClose: 2000});
        navigate('/login');
      } else {
        toast.error(response.data.message, {autoClose: 2000});
      }
    } catch (error) {
      console.log(error);
      toast.error("Error resetting password", {autoClose: 2000});
    }
  };

  return (
    <form
      className="flex mt-[100px] flex-col items-start w-[100%] p-5 sm:max-w-96 m-auto shadow-xl gap-4 text-gray-800 border border-gray-200 rounded-xl"
    >
      <div className="flex items-center mb-2 gap-4 w-full">
        <FaArrowLeftLong
          className="text-[#c2410c] cursor-pointer"
          size={20}
          onClick={() => navigate('/login')}
        />
        <h1 className="text-[#c2410c] text-md text-center">
          {step < 3 ? "Forgot Password" : "Reset Password"}
        </h1>
      </div>

      {step === 1 && (
        <div className="w-full">
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md border-gray-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="w-full mt-2 flex justify-center">
            <button
              className="bg-[#c2410c] cursor-pointer text-white border rounded-lg font-light px-8 py-2"
              onClick={handlesendotp}
            >
              Generate OTP
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md border-gray-200"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {/* Resend OTP Button with Timer */}
          <div className="w-full mt-3 flex justify-between items-center">
            <button
              className="bg-[#c2410c] text-white border rounded-lg font-light px-6 py-2"
              onClick={handleverifyotp}
            >
              Verify OTP
            </button>

            {resendTimer > 0 ? (
              <span className="text-sm text-gray-500">Resend in {resendTimer}s</span>
            ) : (
              <button
                type="button"
                onClick={handlesendotp}
                className="text-[#c2410c] underline text-sm"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="w-full">
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md border-gray-200"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500 text-2xl cursor-pointer"
              onClick={() => setShowNewPassword(prev => !prev)}
            >
              {showNewPassword ? <IoIosEyeOff /> : <IoMdEye />}
            </button>
          </div>

          <div className="relative mt-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md border-gray-200"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500 text-2xl cursor-pointer"
              onClick={() => setShowConfirmPassword(prev => !prev)}
            >
              {showConfirmPassword ? <IoIosEyeOff /> : <IoMdEye />}
            </button>
          </div>

          <div className="w-full mt-2 flex justify-center">
            <button
              className="bg-[#c2410c] cursor-pointer text-white border rounded-lg font-light px-8 py-2"
              onClick={handleresetpassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </form>
  );
};

export default Forgotpassword;
