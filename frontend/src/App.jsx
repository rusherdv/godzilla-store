import Loginpage from "./pages/loginPage"
import Mainpage from "./pages/mainPage"
import Cartpage from "./pages/cartPage"
import CartProvider from "./context/cartContext"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/cart' element={<Cartpage/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
