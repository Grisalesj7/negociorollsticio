import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const CartPage = ({ cart, setCart, userData, setUserData }) => {
  const navigate = useNavigate();

  const shippingCost = 5000;
  
  // Calcula el subtotal multiplicando el precio por la cantidad de cada producto
  const calculateSubtotal = () => cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const calculateTotal = () => calculateSubtotal() + (cart.length > 0 ? shippingCost : 0);

  // Función para aumentar o disminuir la cantidad del producto
  const updateQuantity = (item, change) => {
    setCart(prevCart => {
      return prevCart.map(cartItem => {
        const isMatch = cartItem.id ? cartItem.id === item.id : cartItem.name === item.name;
        if (isMatch) {
          const newQuantity = (cartItem.quantity || 1) + change;
          return newQuantity > 0 ? { ...cartItem, quantity: newQuantity } : cartItem;
        }
        return cartItem;
      }).filter(cartItem => (cartItem.quantity || 1) > 0);
    });
  };

  // Función para eliminar un producto por completo del carrito
  const removeFromCart = (item) => {
    setCart(prevCart => prevCart.filter(cartItem => 
      cartItem.id ? cartItem.id !== item.id : cartItem.name !== item.name
    ));
  };

  // Función para armar el mensaje y enviarlo a WhatsApp
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const itemsText = cart.map(i => `${i.name} (x${i.quantity || 1})`).join(", ");
    const text = `Hola, mi nombre es ${userData.name}. Teléfono: ${userData.phone}. Dirección: ${userData.address}. Notas: ${userData.notes || 'Ninguna'}. Pedido: ${itemsText}. Total: $${calculateTotal().toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (


    // En tu CartPage.jsx, cambia el contenedor principal así:
      <div style={{ padding: '40px 30px', width: '100%', boxSizing: 'border-box', background: '#121212', minHeight: '100vh', color: '#fff' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'transparent', border: '1px solid #7d967b', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '25px', fontWeight: 'bold' }}
      >
        ← Volver al menú
      </button>

      <h1 style={{ marginBottom: '30px' }}>Tu Carrito de Compras</h1>
      
      <Cart 
        cart={cart}
        userData={userData}
        setUserData={setUserData}
        calculateSubtotal={calculateSubtotal}
        shippingCost={shippingCost}
        calculateTotal={calculateTotal}
        sendToWhatsApp={sendToWhatsApp}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default CartPage;