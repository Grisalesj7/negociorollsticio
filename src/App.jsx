import { BrowserRouter, Routes, Route } from "react-router-dom";
// 👇 Agregamos "./components/" a las rutas
import LandingPage from "./components/LandingPage"; 
import CartPage from "./components/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;