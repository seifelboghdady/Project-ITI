import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Navbar } from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer"
import { Home } from "./Pages/Home"
function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
