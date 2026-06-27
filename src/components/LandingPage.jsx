import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState(null);
  const [cart, setCart] = useState([]); 
  const [showCart, setShowCart] = useState(false); 

  const sushiItems = [
    { id: 1, name: "Kansas Roll", price: "$25.000", image: "/img/Imagen2.jpg" },
    { id: 2, name: "California Roll", price: "$18.000", image: "/img/Imagen2.jpg" },
    { id: 3, name: "Dragon Roll", price: "$28.000", image: "/img/Imagen2.jpg" },
    { id: 4, name: "Philadelphia Roll", price: "$20.000", image: "/img/Imagen2.jpg" }
  ];

  const handleOrder = (item) => {
    const currentHour = new Date().getHours();
    if (currentHour >= 17 && currentHour < 23) {
      setCart([...cart, item]);
      setMessage(`✅ ¡${item.name} agregado!`);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("❌ Estamos cerrados. Horario: 5:00pm - 11:00pm.");
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const sendToWhatsApp = () => {
    const text = `Hola, quiero pedir: ${cart.map(i => i.name).join(", ")}. Total: ${cart.length} productos.`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
  };

  const isShopOpen = new Date().getHours() >= 17 && new Date().getHours() < 23;

  return (
    <>
      <style>{`
        .landing-wrapper { background-color: #f2ede4; font-family: 'Playfair Display', serif; min-height: 100vh; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; color: #2b3a3c; }
        header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .status-box { border: 1px solid #7d967b; color: #7d967b; padding: 8px 15px; border-radius: 8px; font-size: 0.85rem; }
        .logo { font-size: 2rem; font-weight: 700; letter-spacing: 2px; }
        .cart-box { font-size: 1.5rem; cursor: pointer; position: relative; }
        .cart-count { position: absolute; top: -5px; right: -10px; background: #e95d53; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 50%; }
        nav { margin-bottom: 40px; }
        nav a { margin: 0 20px; text-decoration: none; color: #2b3a3c; font-weight: bold; cursor: pointer; }
        .hero-container { position: relative; width: 90%; max-width: 800px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .hero-img { width: 100%; display: block; object-fit: cover; }
        .promo-tag { positi on: absolute; top: 20px; right: 20px; background: #e95d53; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
        .hero-content { position: absolute; bottom: 30px; width: 100%; text-align: center; color: white; }
        .hero-title { font-size: 2.5rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
        .dots { margin-top: 10px; color: rgba(255,255,255,0.7); letter-spacing: 8px; }
        .menu-btn { margin-top: 40px; padding: 15px 40px; background: transparent; border: 1px solid #d4c1a0; border-radius: 30px; font-family: 'Playfair Display', serif; font-size: 1.1rem; cursor: pointer; transition: 0.3s; }
        .menu-btn:hover { background: #d4c1a0; color: white; }
        .menu-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; width: 100%; max-width: 900px; }
        .menu-item { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; text-align: center; }
        .menu-item img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 10px; }
        .btn-pedir { background: #7d967b; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-family: 'Playfair Display', serif; margin-top: 10px; transition: 0.2s; }
        .btn-pedir:hover { background: #5d705c; transform: scale(1.05); }
        .cart-modal { background: white; padding: 20px; border-radius: 15px; width: 90%; max-width: 400px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .toast { position: fixed; bottom: 20px; background: #2b3a3c; color: white; padding: 15px 25px; border-radius: 50px; animation: fadeIn 0.5s; z-index: 1000; }
        .status-footer { margin-top: 50px; padding: 20px; font-weight: bold; animation: pulse 2s infinite; text-align: center;}
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; } }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }

        /* RESPONSIVE DESIGN */
        @media (max-width: 600px) {
          .logo { font-size: 1.5rem; }
          .hero-title { font-size: 1.8rem; }
          nav a { margin: 0 10px; font-size: 0.9rem; }
          .menu-list { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="landing-wrapper">
        <header>
          <div className="status-box">{isShopOpen ? "🟢 Abiertos" : "🔴 Cerrados"}</div>
          <div className="logo">ROLLSTICIO</div>
          <div className="cart-box" onClick={() => setShowCart(!showCart)}>
            🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
        </header>

        {showCart && (
          <div className="cart-modal">
            <h3>Tu Pedido:</h3>
            {cart.length === 0 ? <p>El carrito está vacío</p> : (
              <>
                {cart.map((item, index) => <p key={index}>• {item.name} - {item.price}</p>)}
                <button className="btn-pedir" onClick={sendToWhatsApp}>Pedir por WhatsApp 💬</button>
              </>
            )}
          </div>
        )}

        <nav>
          <a onClick={() => setShowMenu(false)}>Menú</a>
          <a href="#">Contacto</a>
          <a href="#">Ubícanos</a>
        </nav>

        {!showMenu ? (
          <section className="hero-container">
            <img src="/img/Imagen2.jpg" alt="Kansas Roll" className="hero-img" />
            <div className="promo-tag">Promo 🏷️</div>
            <div className="hero-content">
              <h2 className="hero-title">Kansas Roll</h2>
              <div className="dots">••••••</div>
            </div>
          </section>
        ) : (
          <div className="menu-list">
            {sushiItems.map((item) => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button className="btn-pedir" onClick={() => handleOrder(item)}>Pedir ahora</button>
              </div>
            ))}
          </div>
        )}

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? "Volver al inicio" : "Ver menú completo"}
        </button>

        <div className="status-footer">
          {isShopOpen ? "Estamos atendiendo pedidos con gusto 🍣" : "En este momento estamos cerrados. Volvemos a las 5:00pm 🕒"}
        </div>

        {message && <div className="toast">{message}</div>}
      </div>
    </>
  );
};

export default LandingPage;