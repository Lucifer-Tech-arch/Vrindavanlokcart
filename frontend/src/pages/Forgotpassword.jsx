import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        {(step === 1 || step === 2)
          ? <h1 className="text-[#c2410c] text-md text-center">Forgot Password</h1>
          : <h1 className="text-[#c2410c] text-md text-center">Reset Password</h1>}
      </div>

      {/* Step 1: Email */}
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
              type="submit"
              className="bg-[#c2410c] mt-2 cursor-pointer text-white border rounded-lg font-light px-8 py-2 mt-1"
            >
              Generate OTP
            </button>
          </div>
        </div>
      )}

      {/* Step 2: OTP */}
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
          <div className="w-full mt-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#c2410c] mt-2 cursor-pointer text-white border rounded-lg font-light px-8 py-2 mt-1"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Reset password */}
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
              type="submit"
              className="bg-[#c2410c] mt-2 cursor-pointer text-white border rounded-lg font-light px-8 py-2 mt-1"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Forgotpassword;
