import { useState } from 'react';

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState(null);
  const [cart, setCart] = useState([]); 
  const [showCart, setShowCart] = useState(false); 
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({ name: '', address: '' });

  // Precios convertidos a números para poder sumar el total
  const sushiItems = [
    { id: 1, name: "Kansas Roll", price: 25000, image: "/img/Imagen2.jpg" },
    { id: 2, name: "California Roll", price: 18000, image: "/img/Imagen2.jpg" },
    { id: 3, name: "Dragon Roll", price: 28000, image: "/img/Imagen2.jpg" },
    { id: 4, name: "Philadelphia Roll", price: 20000, image: "/img/Imagen2.jpg" }
  ];

  const handleOrder = (item) => {
    const currentHour = new Date().getHours();
    // Horario intacto: 5:00pm (17) a 11:00pm (23)
    if (currentHour >= 17 && currentHour < 23) {
      setCart([...cart, item]);
      setMessage(`✅ ¡${item.name} agregado!`);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("❌ Estamos cerrados. Horario: 5:00pm - 11:00pm.");
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + item.price, 0);

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const itemsText = cart.map(i => i.name).join(", ");
    const text = `Hola, mi nombre es ${userData.name}. Dirección: ${userData.address}. Pedido: ${itemsText}. Total a pagar: $${calculateTotal().toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
    setShowForm(false); // Cierra el formulario después de enviar
  };

  const isShopOpen = new Date().getHours() >= 17 && new Date().getHours() < 23;

  return (
    <>
      <style>{`
        .landing-wrapper { background-color: #f2ede4; font-family: 'Playfair Display', serif; min-height: 100vh; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; color: #2b3a3c; box-sizing: border-box; }
        header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .status-box { border: 1px solid #7d967b; color: #7d967b; padding: 8px 15px; border-radius: 8px; font-size: 0.85rem; font-weight: bold; }
        .logo img { height: 40px; }
        .cart-box { font-size: 1.5rem; cursor: pointer; position: relative; }
        .cart-count { position: absolute; top: -5px; right: -10px; background: #e95d53; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 50%; font-weight: bold; }
        
        nav { margin-bottom: 40px; }
        nav a { margin: 0 15px; text-decoration: none; color: #2b3a3c; font-weight: bold; cursor: pointer; }
        
        .hero-container { position: relative; width: 100%; max-width: 800px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-bottom: 20px; }
        .hero-img { width: 100%; display: block; height: auto; }
        .promo-tag { position: absolute; top: 20px; right: 20px; background: #e95d53; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
        
        .menu-btn { margin: 20px 0; padding: 15px 40px; background: transparent; border: 1px solid #d4c1a0; border-radius: 30px; font-family: 'Playfair Display', serif; font-size: 1.1rem; cursor: pointer; transition: 0.3s; }
        .menu-btn:hover { background: #d4c1a0; color: white; }
        
        .menu-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; width: 100%; max-width: 900px; margin-bottom: 30px; }
        .menu-item { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; display: flex; flex-direction: column; align-items: center; }
        .menu-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 10px; }
        .btn-pedir { background: #7d967b; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-family: 'Playfair Display', serif; margin-top: auto; width: 100%; transition: 0.2s; }
        .btn-pedir:hover { background: #5d705c; transform: scale(1.02); }
        
        .reviews-section { background: #0a262a; width: 100%; padding: 40px 5%; color: white; text-align: center; margin-top: 40px; box-sizing: border-box; }
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 900px; margin: 30px auto; }
        .review-card { background: #153b40; padding: 20px; border-radius: 15px; text-align: left; }

        .map-section { width: 100%; max-width: 900px; margin: 40px auto; padding: 0 5%; box-sizing: border-box; text-align: center; }
        .map-container { width: 100%; height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-top: 20px;}

        /* Estilos de Modales */
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 2000; padding: 20px; box-sizing: border-box; }
        .modal-content { background: white; padding: 25px; border-radius: 15px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .modal-content h3 { margin-top: 0; }
        .modal-list { max-height: 200px; overflow-y: auto; margin-bottom: 15px; }
        .form-input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; box-sizing: border-box; }
        .btn-cancel { width: 100%; background: transparent; color: #e95d53; border: 1px solid #e95d53; padding: 10px; margin-top: 10px; border-radius: 20px; cursor: pointer; font-family: inherit; }
        
        .toast { position: fixed; bottom: 20px; background: #2b3a3c; color: white; padding: 15px 25px; border-radius: 50px; z-index: 1000; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }

        @media (max-width: 600px) {
          .menu-btn { width: 100%; padding: 15px; }
          nav a { margin: 0 10px; font-size: 0.9rem; }
          .map-container { height: 250px; }
        }
      `}</style>

      <div className="landing-wrapper">
        
        {/* Header */}
        <header>
          <div className="status-box">{isShopOpen ? "🟢 Abiertos" : "🔴 Cerrados"}</div>
          <div className="logo"><img src="/img/logo_rollsticio.png" alt="Logo Rollsticio" /></div>
          <div className="cart-box" onClick={() => setShowCart(true)}>
            🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
        </header>

        {/* Modal de Carrito */}
        {showCart && !showForm && (
          <div className="modal" onClick={() => setShowCart(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Tu Carrito</h3>
              {cart.length === 0 ? (
                <p>El carrito está vacío</p>
              ) : (
                <>
                  <div className="modal-list">
                    {cart.map((item, index) => (
                      <p key={index} style={{margin: '5px 0', fontSize: '0.9rem'}}>
                        • {item.name} - ${item.price.toLocaleString('es-CO')}
                      </p>
                    ))}
                  </div>
                  <hr style={{borderColor: '#eee', margin: '15px 0'}} />
                  <p style={{fontSize: '1.2rem', textAlign: 'right'}}>
                    <b>Total: ${calculateTotal().toLocaleString('es-CO')}</b>
                  </p>
                  <button className="btn-pedir" onClick={() => setShowForm(true)}>Proceder al pago</button>
                </>
              )}
              <button className="btn-cancel" onClick={() => setShowCart(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Modal de Formulario de Envío */}
        {showForm && (
          <div className="modal" onClick={() => setShowForm(false)}>
            <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={sendToWhatsApp}>
              <h3>Finalizar Pedido</h3>
              <p style={{marginBottom: '20px'}}>Total a pagar: <b>${calculateTotal().toLocaleString('es-CO')}</b></p>
              
              <input 
                className="form-input" 
                placeholder="Tu Nombre (Ej. Juan Pérez)" 
                required 
                onChange={(e) => setUserData({...userData, name: e.target.value})} 
              />
              <input 
                className="form-input" 
                placeholder="Dirección de Entrega" 
                required 
                onChange={(e) => setUserData({...userData, address: e.target.value})} 
              />
              
              <button type="submit" className="btn-pedir" style={{marginTop: '20px', backgroundColor: '#e95d53'}}>
                Confirmar y pedir por WhatsApp 💬
              </button>
              <button type="button" className="btn-cancel" onClick={() => {setShowForm(false); setShowCart(true);}}>
                Volver al carrito
              </button>
            </form>
          </div>
        )}

        <nav>
          <a onClick={() => setShowMenu(false)}>Menú</a>
          <a href="#">Contacto</a>
          <a href="#">Ubícanos</a>
        </nav>

        {/* Hero Section (Se oculta si el menú completo está abierto) */}
        {!showMenu && (
          <section className="hero-container">
            <img src="/img/Imagen2.jpg" alt="Kansas Roll" className="hero-img" />
            <div className="promo-tag">Promo 🏷️</div>
          </section>
        )}

        {/* Botón para alternar el menú */}
        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? "Volver al inicio" : "Ver menú completo"}
        </button>

        {/* Menú Completo (Condicional) */}
        {showMenu && (
          <div className="menu-list">
            {sushiItems.map((item) => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p style={{fontWeight: 'bold', color: '#7d967b'}}>${item.price.toLocaleString('es-CO')}</p>
                <button className="btn-pedir" onClick={() => handleOrder(item)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        )}

        {/* Especialidades */}
        <h2 style={{marginTop: '20px'}}>Nuestras especialidades</h2>
        <div className="menu-list">
          {sushiItems.slice(0, 3).map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p style={{fontWeight: 'bold', color: '#7d967b'}}>${item.price.toLocaleString('es-CO')}</p>
              {/* Opción de pedir directamente desde especialidades también */}
              <button className="btn-pedir" style={{background: 'transparent', border: '1px solid #7d967b', color: '#7d967b'}} onClick={() => handleOrder(item)}>
                Agregar
              </button>
            </div>
          ))}
        </div>

        {/* Reseñas */}
        <section className="reviews-section">
          <h2>¿Qué dicen nuestros clientes?</h2>
          <div className="reviews-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="review-card">
                <p>"¡El mejor sushi que he probado! La calidad es increíble y siempre llega fresco."</p>
                <p style={{fontWeight: 'bold', marginTop: '15px'}}>Rafael Gonzales 5.0 ⭐</p>
              </div>
            ))}
          </div>
          <button className="menu-btn" style={{borderColor: 'white', color: 'white'}}>Dejar mi reseña</button>
        </section>

        {/* Mapa Interactivo (Birmingham, AL) */}
        <section className="map-section">
          <h2>¿Dónde estamos ubicados?</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102434.7937554972!2d-86.86869408076169!3d33.52225332766326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8889142f36d4001d%3A0x2a98f158097b3989!2sBirmingham%2C%20AL!5e0!3m2!1ses-419!2sco!4v1719940000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Ubicación en Birmingham">
            </iframe>
          </div>
        </section>

        {/* Notificaciones (Toast) */}
        {message && <div className="toast">{message}</div>}
      </div>
    </>
  );
};

export default LandingPage;