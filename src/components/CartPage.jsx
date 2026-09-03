import React from 'react';
import { useNavigate } from 'react-router-dom';

// Aca debemos de importar los estilos de la app

const CartPage = ({ cart, setCart, userData, setUserData }) => {
  const navigate = useNavigate();

  // Funciones para aumentar o disminuir la cantidad
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

  // Función para eliminar un producto
  const removeFromCart = (item) => {
    setCart(prevCart => prevCart.filter(cartItem => 
      cartItem.id ? cartItem.id !== item.id : cartItem.name !== item.name
    ));
  };

  // Calcular subtotal de los productos
  const calculateSubtotal = () => cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // Envío a WhatsApp con los datos del usuario si los tienes o un texto base
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const itemsText = cart.map(i => `${i.name} (x${i.quantity || 1})`).join(", ");
    const totalFinal = calculateSubtotal();
    const text = `Hola, quiero realizar el siguiente pedido: ${itemsText}. Total a pagar: $${totalFinal.toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ 
      background: '#f4efe6', // Fondo crema general de la app
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      fontFamily: 'serif',
      color: '#1a2b2c',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* 1. HEADER SUPERIOR */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '15px 20px', 
        borderBottom: '1px solid #e5dbcc',
        width: '100%',
        boxSizing: 'border-box',
        gap: '10px'
      }}>
        {/* Izquierda: Estado */}
        <div style={{ justifySelf: 'start' }}>
          <div style={{ 
            border: '1px solid #48d720', 
            padding: '5px 10px', 
            borderRadius: '6px', 
            fontSize: '0.75rem', 
            color: '#4a6b47',
            background: '#eef3ed',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}>
            Abiertos (de 5:00 PM a 11:00 PM)
          </div>
        </div>
        
        {/* Centro: Logotipo centrado */}
        <div style={{ justifySelf: 'center', textAlign: 'center', overflow: 'hidden' }}>
          <img 
            src="/img/LOGO_rollticio.svg" 
            alt="Rollsticio Logo" 
            style={{ height: '35px', maxWidth: '60%', objectFit: 'contain', display: 'block', margin: '0 auto' }} 
          />
        </div>

        {/* Derecha: Botón de carrito */}
        <div style={{ justifySelf: 'end' }}>
          <div style={{ 
            border: '1px solid #d4af37', 
            borderRadius: '8px', 
            padding: '6px 10px', 
            background: '#fff',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '0.9rem'
          }}>
            🛒
          </div>
        </div>
      </div>

      {/* 2. CONTENEDOR CENTRAL DEL CARRITO */}
      <div style={{ padding: '20px 15px', display: 'flex', justifyContent: 'center', flex: 1, boxSizing: 'border-box' }}>
        <div style={{ 
          background: '#ffffff', 
          width: '100%', 
          maxWidth: '850px', 
          padding: '20px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          boxSizing: 'border-box'
        }}>
          
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#1a2b2c', fontWeight: 'bold' }}>
            Carrito de compras
          </h2>

          {cart.length === 0 ? (
            <div style={{ padding: '40px 15px', textAlign: 'center', color: '#888', border: '2px dashed #e5dbcc', borderRadius: '12px', fontSize: '0.95rem' }}>
              Tu carrito está vacío. ¡Elige tus rollos favoritos del menú!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item, index) => (
                <div 
                  key={item.id || index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingBottom: '20px', 
                    borderBottom: '1px solid #f0eae1',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Izquierda: Imagen automática y detalles */}
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flex: '1 1 250px', minWidth: '0' }}>
                    <img 
                      src={item.image || item.img || 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500'} 
                      alt={item.name} 
                      style={{ width: '75px', height: '75px', minWidth: '75px', objectFit: 'cover', borderRadius: '12px', backgroundColor: '#eee' }} 
                    />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0', flex: 1 }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1a2b2c', wordBreak: 'break-word' }}>{item.name}</span>
                      <span style={{ fontSize: '0.8rem', color: '#777', lineHeight: '1.3', wordBreak: 'break-word' }}>
                        {item.description || 'Descripción del producto o ingredientes principales.'}
                      </span>

                      {/* Botones de cantidad (- 1 +) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#d4af37', borderRadius: '20px', overflow: 'hidden' }}>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item, -1)} 
                            style={{ background: 'transparent', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
                            {item.quantity || 1}
                          </span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item, 1)} 
                            style={{ background: 'transparent', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' }}
                          >
                            +
                          </button>
                        </div>

                        <button 
                          type="button"
                          onClick={() => removeFromCart(item)}
                          title="Eliminar"
                          style={{ background: 'transparent', border: 'none', color: '#ff5c5c', cursor: 'pointer', fontSize: '1rem', padding: '4px' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Derecha: Precio */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginLeft: 'auto' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1a2b2c', whiteSpace: 'nowrap' }}>
                      ${(item.price * (item.quantity || 1)).toLocaleString('es-CO')}
                    </span>
                  </div>

                </div>
              ))}

              {/* Total de la orden */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1a2b2c' }}>Total</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a2b2c' }}>
                  ${calculateSubtotal().toLocaleString('es-CO')}
                </span>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* 3. BOTONES INFERIORES DE ACCIÓN */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 15px 25px 15px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '15px', width: '100%', maxWidth: '850px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              flex: '1 1 200px', 
              background: '#3e3e3e', 
              color: '#fff', 
              padding: '14px', 
              borderRadius: '14px', 
              border: 'none', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'center'
            }}
          >
            Volver al menú
          </button>

          <button 
            onClick={sendToWhatsApp}
            style={{ 
              flex: '1 1 200px', 
              background: '#193c3e', 
              color: '#fff', 
              padding: '14px', 
              borderRadius: '14px', 
              border: 'none', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'center'
            }}
          >
            Continuar con el pago
          </button>
        </div>
      </div>

      {/* 4. FOOTER INFERIOR DORADO */}
      <div style={{ 
        background: '#d4af37', 
        padding: '25px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap',
        gap: '20px',
        color: '#1a2b2c',
        fontSize: '0.85rem',
        borderTop: '1px solid #c5a030',
        boxSizing: 'border-box'
      }} >
        <div style={{ flex: '1 1 180px' }}>
          <strong>Contacto</strong><br />
          Tlf: 0200202003<br />
          Correo: correo@gmail.com
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <strong>Dirección</strong><br />
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit.
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <strong>Diseñado por</strong><br />
          <span style={{ background: '#1a2b2c', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginTop: '4px'}}>
  <img src="/img/Logo_footer.svg" alt="Logo" style={{ height: '22px', width: 'auto', display: 'block' }} />
</span>
        </div>
      </div>

    </div>
  );
};

export default CartPage;