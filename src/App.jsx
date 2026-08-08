import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Navbar } from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer"
import { Home } from "./Pages/Home"
import { Cart } from "./Components/Cart/Cart"
import { ProductDetail } from "./Components/ProductCard/ProductDetail"
import { useState, useEffect } from "react"

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Checkout from "./pages/Checkout/Checkout";
import ThankYou from "./pages/Checkout/ThankYou";
function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
       
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} /> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />   
      </Routes>

      <Footer/>
    </>
  )
}

export default App
