import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Navbar } from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer"
import { Home } from "./Pages/Home"
import { Cart } from "./Components/Cart/Cart"
import { ProductDetail } from "./Components/ProductCard/ProductDetail"
import { useState, useEffect } from "react"

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
