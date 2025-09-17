import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Forgotpassword from './pages/Forgotpassword'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Placeorders from './pages/Placeorder'
import Product from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import Search from './components/Search'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authsuccess from './pages/Authsuccess'
import Verify from './pages/Verify'
import Scrolltotop from './components/Scrolltotop'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <Search />
      <Scrolltotop />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collections/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<Forgotpassword/>} />
        <Route path='/auth/success' element={<Authsuccess />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/placeorder' element={<Placeorders/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
        <Route path='/terms' element={<TermsConditions />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
