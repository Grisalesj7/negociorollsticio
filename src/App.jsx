import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"; 
import CartPage from "./components/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '', address: '', notes: '' });

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              cart={cart} 
              setCart={setCart} 
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cart={cart} 
              setCart={setCart}
              userData={userData}
              setUserData={setUserData}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;