import React from 'react';

const Cart = ({ 
  cart, 
  userData, 
  setUserData, 
  calculateSubtotal, 
  shippingCost, 
  calculateTotal, 
  sendToWhatsApp 
}) => {
  return (
    <div className="checkout-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      
      {/* Sección de productos agregados al carrito */}
      <div className="cart-section-box" style={{ background: '#1e1e1e', padding: '20px', borderRadius: '12px', color: '#fff' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>Tu Carrito</h3>
        {cart.length === 0 ? (
          <div style={{ padding: '30px 0', textAlign: 'center', color: '#888', border: '1px dashed #555', borderRadius: '8px', marginTop: '15px' }}>
            Tu carrito está vacío. ¡Elige tus rollos favoritos del menú!
          </div>
        ) : (
          <div style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333', fontSize: '0.95rem' }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 'bold', color: '#25D366' }}>${item.price.toLocaleString('es-CO')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección del formulario y totales */}
      <div className="form-section-box" style={{ background: '#1e1e1e', padding: '20px', borderRadius: '12px', color: '#fff' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>Datos del Cliente & Pedido</h3>
        <form onSubmit={sendToWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Nombre completo</label>
          <input 
            placeholder="Ej. Ana Pérez" 
            required 
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Teléfono / Celular</label>
          <input 
            placeholder="Ej. 3001234567" 
            required 
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Dirección de entrega</label>
          <input 
            placeholder="Ej. Calle 50 # 45-20" 
            required 
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ccc' }}>Notas adicionales (Opcional)</label>
          <textarea 
            placeholder="Ej. Sin aguacate, tocar timbre fuerte..." 
            value={userData.notes}
            onChange={(e) => setUserData({ ...userData, notes: e.target.value })} 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #555', background: '#2a2a2a', color: '#fff', resize: 'vertical', minHeight: '60px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Subtotal</span>
            <span>${calculateSubtotal().toLocaleString('es-CO')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Costo de envío</span>
            <span>${shippingCost.toLocaleString('es-CO')}</span>
          </div>
          
          <hr style={{ border: '0', borderTop: '1px solid #444', margin: '5px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
            <span>Total a Pagar</span>
            <span style={{ color: '#25D366' }}>${calculateTotal().toLocaleString('es-CO')}</span>
          </div>

          <button 
            type="submit" 
            style={{ background: '#25D366', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' }}
          >
            Finalizar Pedido por WhatsApp 📱
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;