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
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '25px', 
      width: '100%',
      boxSizing: 'border-box' 
    }}>
      
      {/* Sección de productos agregados al carrito */}
      <div style={{ background: '#1e1e1e', padding: '24px', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '12px' }}>Tu Carrito</h3>
        
        {cart.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888', border: '1px dashed #555', borderRadius: '8px', marginTop: '15px' }}>
            Tu carrito está vacío. ¡Elige tus rollos favoritos del menú!
          </div>
        ) : (
          <div style={{ marginTop: '15px', maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '5px' }}>
            {cart.map((item, index) => (
              <div key={item.id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #333', fontSize: '0.95rem', gap: '10px' }}>
                
                {/* Nombre y Precio */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minWidth: '0' }}>
                  <span style={{ fontWeight: '500', wordBreak: 'break-word' }}>{item.name}</span>
                  <span style={{ fontWeight: 'bold', color: '#25D366', fontSize: '0.85rem', marginTop: '4px' }}>
                    ${(item.price * (item.quantity || 1)).toLocaleString('es-CO')}
                  </span>
                </div>

                {/* Controles de Cantidad y Eliminar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#2a2a2a', borderRadius: '6px', border: '1px solid #555' }}>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item, -1)} 
                      style={{ background: 'transparent', border: 'none', color: '#fff', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      {item.quantity || 1}
                    </span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item, 1)} 
                      style={{ background: 'transparent', border: 'none', color: '#fff', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Botón para eliminar */}
                  <button 
                    type="button"
                    onClick={() => removeFromCart(item)}
                    title="Eliminar producto"
                    style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.1rem', padding: '6px' }}
                  >
                    🗑️
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección del formulario y totales */}
      <div style={{ background: '#1e1e1e', padding: '24px', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '12px' }}>Datos del Cliente & Pedido</h3>
        <form onSubmit={sendToWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Nombre completo</label>
          <input 
            placeholder="Ej. Ana Pérez" 
            required 
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', width: '100%', boxSizing: 'border-box' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Teléfono / Celular</label>
          <input 
            placeholder="Ej. 3001234567" 
            required 
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })} 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', width: '100%', boxSizing: 'border-box' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Dirección de entrega</label>
          <input 
            placeholder="Ej. Calle 50 # 45-20" 
            required 
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })} 
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', width: '100%', boxSizing: 'border-box' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Notas adicionales (Opcional)</label>
          <textarea 
            placeholder="Ej. Sin aguacate, tocar timbre fuerte..." 
            value={userData.notes}
            onChange={(e) => setUserDate({ ...userData, notes: e.target.value })} // Nota: asegúrate de usar setUserData si estaba escrito diferente
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', resize: 'vertical', minHeight: '60px', width: '100%', boxSizing: 'border-box' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Subtotal</span>
            <span>${calculateSubtotal().toLocaleString('es-CO')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Costo de envío</span>
            <span>${shippingCost.toLocaleString('es-CO')}</span>
          </div>
          
          <hr style={{ border: '0', borderTop: '1px solid #444', margin: '8px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
            <span>Total a Pagar</span>
            <span style={{ color: '#25D366' }}>${calculateTotal().toLocaleString('es-CO')}</span>
          </div>

          <button 
            type="submit" 
            style={{ background: '#25D366', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem', width: '100%' }}
          >
            Finalizar Pedido por WhatsApp 📱
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;