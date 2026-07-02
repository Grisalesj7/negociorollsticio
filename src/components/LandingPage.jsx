import { useState } from 'react';

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
        .landing-wrapper { background-color: #f2ede4; font-family: 'Playfair Display', serif; min-height: 100vh; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; color: #2b3a3c; box-sizing: border-box; }
        header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        
        .hero-container { position: relative; width: 100%; max-width: 800px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .hero-img { width: 100%; display: block; height: auto; }
        
        .menu-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; width: 100%; max-width: 900px; }
        .menu-item { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
        .menu-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; }
        
        .reviews-section { background: #0a262a; width: 100%; padding: 40px 5%; color: white; text-align: center; margin-top: 40px; box-sizing: border-box; }
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 900px; margin: 30px auto; }
        .review-card { background: #153b40; padding: 20px; border-radius: 15px; }

        .map-section { width: 100%; max-width: 900px; margin: 40px auto; padding: 0 5%; box-sizing: border-box; }
        .map-container { width: 100%; height: 300px; border-radius: 15px; overflow: hidden; }

        @media (max-width: 600px) {
          .hero-title { font-size: 1.5rem; }
          .menu-btn { width: 100%; padding: 15px; }
          nav a { margin: 0 5px; font-size: 0.8rem; }
          .map-container { height: 250px; }
        }
        
        .btn-pedir { background: #7d967b; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }
      `}</style>

      <div className="landing-wrapper">
        <header>
          <div className="status-box">{isShopOpen ? "🟢 Abiertos" : "🔴 Cerrados"}</div>
          <div className="logo"><img src="/img/logo_rollsticio.png" alt="Logo" style={{height: '40px'}} /></div>
          <div className="cart-box" onClick={() => setShowCart(!showCart)}>🛒</div>
        </header>

        <nav>
          <a onClick={() => setShowMenu(false)}>Menú</a>
          <a href="#">Contacto</a>
          <a href="#">Ubícanos</a>
        </nav>

        {!showMenu && (
          <section className="hero-container">
            <img src="/img/Imagen2.jpg" alt="Kansas Roll" className="hero-img" />
          </section>
        )}

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? "Volver al inicio" : "Ver menú completo"}
        </button>

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

        <section className="reviews-section">
          <h2>¿Qué dicen nuestros clientes?</h2>
          <div className="reviews-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="review-card">
                <p>"¡El mejor sushi! Calidad increíble."</p>
                <p><b>Rafael Gonzales 5.0 ⭐</b></p>
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>¿Dónde estamos ubicados?</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102434.7937554972!2d-86.86869408076169!3d33.52225332766326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8889142f36d4001d%3A0x2a98f158097b3989!2sBirmingham%2C%20AL!5e0!3m2!1ses-419!2sco!4v1719940000000" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Mapa">
            </iframe>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;