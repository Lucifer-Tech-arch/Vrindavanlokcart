import React, { useContext, useState, useEffect } from 'react'
import { assests } from '../assets/assests'
import { NavLink, Link, useNavigate, } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const [visible, setvisible] = useState(false);
    const { setshowsearch, cartcount } = useContext(ShopContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic'))

    const handlesearchclick = () => {
        navigate('/collection');
        setshowsearch(true);
    }

    useEffect(() => {
        setProfilePic(localStorage.getItem('profilePic'))
    }, [token])

    return (
        <div className='flex items-center justify-between py-1 pr-5 font-medium fixed top-0 left-0 pl-4 w-full z-50 flex items-center justify-between py-3 font-medium bg-white shadow-md '>
            <Link to='/'><img src={assests.logo} className='w-15' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 mb-2 text-sm text-orange-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-orange-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>SHOP</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-orange-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-orange-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-orange-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handlesearchclick} height="24px" viewBox="0 -960 960 960" width="24px" className='cursor-pointer mb-2' fill='#c2410c'><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

                <div className="group relative">
                    {profilePic && token ? (
                        <img
                            src={profilePic}
                            className="w-8 h-8 rounded-full cursor-pointer"
                        />
                    ) : (
                        <Link to="/login">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="25px"
                                className="cursor-pointer mb-2"
                                viewBox="0 -960 960 960"
                                width="25px"
                                fill="#c2410c"
                            >
                                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                            </svg>
                        </Link>
                    )}

                    {token ? (
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded">
                                <p className="cursor-pointer text-[#c2410c] hover:opacity-75">My Profile</p>
                                <p onClick={() => navigate('/orders')} className="cursor-pointer text-[#c2410c] hover:opacity-75">Orders</p>
                                <p
                                    className="cursor-pointer text-[#c2410c] flex items-center hover:opacity-75"
                                    onClick={() => {

                                        localStorage.removeItem("token");
                                        localStorage.removeItem("profilePic");
                                        toast.success("Logged Out Successfully!", { autoClose: 2000 });
                                        setTimeout(() => {
                                            setProfilePic(null);
                                            navigate('/')
                                            window.location.reload();
                                        }, 2000);
                                    }}
                                >
                                    Logout
                                    <IoIosLogOut className='ml-1 font-bold' />
                                </p>
                            </div>
                        </div>
                    ) : null}

                </div>

                <Link to='/cart' className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#c2410c" className='mb-2 cursor-pointer'><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                    {cartcount() > 0 && (
                        <p className='absolute right-[-5px] bottom-[5px] w-4 text-center leading-4 bg-[#000080] text-white aspect-square rounded-full text-[8px]'>
                            {cartcount()}
                        </p>
                    )}
                </Link>
                <svg onClick={() => setvisible(true)} xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#c2410c" className='mb-2 cursor-pointer sm:hidden '><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </div>
            {/* side bar menu for small screen */}
            <div className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${visible ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setvisible(false)} className='flex items-center gap-4 p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" className='h-4 rotate-180 cursor-pointer' fill="#c2410c"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                        <p className='text-[#c2410c] cursor-pointer'>Back</p>
                    </div>
                    <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border text-[#c2410c]' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border text-[#c2410c]' to='/collection'>SHOP</NavLink>
                    <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border text-[#c2410c]' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border text-[#c2410c]' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
