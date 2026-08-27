import React from 'react';

const Cart = ({ 
  cart, 
  setUserData, 
  userData, 
  calculateSubtotal, 
  shippingCost, 
  calculateTotal, 
  sendToWhatsApp,
  updateQuantity, 
  removeFromCart  
}) => {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '850px', 
      margin: '0 auto', 
      background: '#f5efe6', // Tono crema de fondo similar a la referencia
      padding: '30px', 
      borderRadius: '20px', 
      color: '#1a2b2c',
      fontFamily: 'serif',
      boxSizing: 'border-box' 
    }}>
      
      <h2 style={{ fontSize: '1.6rem', marginBottom: '25px', color: '#1a2b2c', fontWeight: 'bold' }}>
        Carrito de compras
      </h2>

      {/* Contenedor principal de la tarjeta de productos */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        
        {cart.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#777', border: '2px dashed #ddd', borderRadius: '10px' }}>
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
                  borderBottom: '1px solid #eae5dc',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Izquierda: Imagen dinámica del producto */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flex: '1', minWidth: '240px' }}>
                  <img 
                    src={item.image || item.img || 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500'} 
                    alt={item.name} 
                    style={{ width: '85px', height: '85px', objectFit: 'cover', borderRadius: '10px', backgroundColor: '#ddd' }} 
                  />
                  
                  {/* Título, descripción y controles */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#1a2b2c' }}>{item.name}</span>
                    <span style={{ fontSize: '0.82rem', color: '#777', lineHeight: '1.2' }}>
                      {item.description || 'Delicioso rollo preparado al instante con ingredientes frescos.'}
                    </span>

                    {/* Botones de cantidad (- 1 +) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#d4af37', borderRadius: '20px', overflow: 'hidden' }}>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item, -1)} 
                          style={{ background: 'transparent', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
                          {item.quantity || 1}
                        </span>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item, 1)} 
                          style={{ background: 'transparent', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Botón opcional para eliminar */}
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

                {/* Derecha: Precio alineado */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1a2b2c' }}>
                    ${(item.price * (item.quantity || 1)).toLocaleString('es-CO')}
                  </span>
                </div>

              </div>
            ))}

            {/* Bloque de Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1a2b2c' }}>Total</span>
                <span style={{ fontSize: '0.8rem', color: '#e07a5f' }}>Costo de envío incluido ($5.000)</span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a2b2c' }}>
                ${calculateTotal().toLocaleString('es-CO')}
              </span>
            </div>

          </div>
        )}
      </div>

      {/* Botones inferiores de acción */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '25px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => window.history.back()}
          style={{ 
            flex: '1', 
            background: '#333', 
            color: '#fff', 
            padding: '14px', 
            borderRadius: '12px', 
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
            flex: '1', 
            background: '#1a4042', 
            color: '#fff', 
            padding: '14px', 
            borderRadius: '12px', 
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
  );
};

export default Cart;