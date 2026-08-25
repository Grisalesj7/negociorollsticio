import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const CartPage = () => {
  const navigate = useNavigate();
  
  // Datos de prueba (aquí luego puedes conectar tu localStorage o contexto)
  const [cart, setCart] = useState([
    { name: 'Roll Especial Rollsticio', price: 25000 },
    { name: 'Té Hatsu', price: 6000 }
  ]);
  
  const [userData, setUserData] = useState({ name: '', phone: '', address: '', notes: '' });

  const shippingCost = 5000;
  const calculateSubtotal = () => cart.reduce((acc, item) => acc + item.price, 0);
  const calculateTotal = () => calculateSubtotal() + (cart.length > 0 ? shippingCost : 0);

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const itemsText = cart.map(i => i.name).join(", ");
    const text = `Hola, mi nombre es ${userData.name}. Teléfono: ${userData.phone}. Dirección: ${userData.address}. Notas: ${userData.notes || 'Ninguna'}. Pedido: ${itemsText}. Total: $${calculateTotal().toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'serif', background: '#121212', minHeight: '100vh', color: '#fff' }}>
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
      />
    </div>
  );
};

export default CartPage;