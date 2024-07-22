import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import Success from './Success/Success'
import MyOrders from './pages/MyOrders/MyOrders'
import Contact from './components/Contact/Contact'
import AboutUs from './components/About/AboutUs'
import Pay from "./components/Pay/Pay"

const App = () => {
  
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin && <LoginPopup setShowLogin={setShowLogin}/>}

    <div className='app'>

      <Navbar setShowLogin={setShowLogin}/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path="/success" element={<Success />} />
        <Route path='/myorders' element={<MyOrders/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/pay' element={<Pay/>} />
      </Routes>
      
      <Footer/>
    </div>
    </>
    
  )
}

export default App
