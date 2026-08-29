import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState(null);
  const [userData, setUserData] = useState({ name: '', phone: '', address: '', notes: '' }); 

  // Estado para el carrusel de imágenes del banner
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { img: "/img/Aloha.jpeg", alt: "Aloha", title: "Aloha" },
    { img: "/img/America.jpeg", alt: "América 20 piezas", title: "América 20 piezas" },
    { img: "/img/California10.JPG", alt: "California", title: "California 10" }
  ];

  // Efecto para cambiar de imagen automáticamente cada 3.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const cartSectionRef = useRef(null);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const menuCategorias = [
    {
      titulo: "Tablas Variadas",
      items: [
        { id: 1, name: "Nigiris de salmón rosado", price: 5000, image: "/img/Niguiris.png", ingredientes: "4 unidades de niguiris de arroz con topping de salmón rosado fresco." },
        { id: 2, name: "Sashimis de salmón rosado", price: 9000, image: "/img/Sashimis.png", ingredientes: "4 unidades de rodajas únicas de salmón rosado" },
        { id: 3, name: "Geishas de salmón rosado", price: 7000, image: "/img/Geishas.png", ingredientes: "4 unidades rellenas de queso crema y palta" },
        { id: 4, name: "Yagi 15 piezas", price: 13000, image: "/img/Yagi.png", ingredientes: "5 Philadelphia, 5 Osaka, 5 California. Incluye 2 sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 5, name: "Oke 20 piezas", price: 19000, image: "/img/Oke.png", ingredientes: "5 Philadelphia, 5 Osaka, 5 California, 5 Niguiris de salmón. Incluye sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 6, name: "Nara 30 piezas", price: 0, image: "/img/Nara.JPG", ingredientes: "10 Philadelphia, 10 Osaka, 10 California. Incluye sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 7, name: "Moly Premium 30 piezas", price: 30000, image: "/img/Moly.png", ingredientes: "10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 8, name: "Dundee 40 piezas", price: 0, image: "/img/Dundee.png", ingredientes: "10 Miami, 10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 9, name: "Star 60 piezas", price: 65000, image: "/img/", ingredientes: "10 Kansas Crunch, 10 New York, 10 Islandia, 10 Osaka, 10 MakiCalifornia, 4 Niguiris, 3 Sashimis, 3 Geishas" },
        { id: 10, name: "Aruba 15 piezas", price: 15000, image: "/img/Aruba.png", ingredientes: "5 Queen Roll, 5 Hanko Roll, 5 King Roll. Incluye sobres de soja, wasabi/jebjibre y un par de palitos" },
        { id: 11, name: "América 20 piezas", price: 22000, image: "/img/America.jpeg", ingredientes: "10 New York Roll, 10 King Roll. Incluye sobres de soja y un par de palitos" },
        { id: 12, name: "Roma 30 piezas", price: 30000, image: "/img/Roma.jpeg", ingredientes: "10 Queen Roll, 5 Miami Roll, 5 Hanko Roll, 10 MakiCalifornia. Incluye un blíster y dos sobres de soja + dos pares de palitos" },
        { id: 13, name: "Atlántica 60 piezas", price: 68000, image: "/img/Atlantica.jpeg", ingredientes: "10 New York Roll, 10 Hanko Roll, 10 King Roll, 10 Queen Roll, 10 MakiCalifornia, 3 Tamago Roll, 3 Tokyo Roll, 4 Niguiris de salmón rosado" },
        { id: 14, name: "Paraíso 40 piezas", price: 42000, image: "/img/Paraiso.jpeg", ingredientes: "10 New York Roll, 10 King Roll, 10 Queen Roll, 3 Tamago Roll, 3 Paraíso Roll, 4 Niguiris de salmón rosado" },
        { id: 15, name: "Oslo 15 piezas", price: 21000, image: "/img/Oslo.jpeg", ingredientes: "3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 2 Niguiris de salmón rosado y 2 Sashimis de salmón rosado. Incluye 2 sobres de soja y un par de palitos",  glutenfree: true }
      ]
    },
    {
      titulo: "Combos Signature",
      items: [
        { id: 16, name: "Malmö 20 piezas", price: 25000, image: "/img/Malmo.jpeg", ingredientes: "3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 5 Hanko Roll, 2 Niguiris de salmón rosado.", glutenfree: true },
        { id: 17, name: "Aurora 30 piezas", price: 37000, image: "/img/Aurora.jpeg", ingredientes: "5 Miami Roll, 5 Hanko Roll, 10 Islandia Roll, 3 Tokyo Roll, 3 Tamago Roll, 2 Geishas de salmón rosado.", glutenfree: true },
        { id: 18, name: "Antártida 40 piezas", price: 48000, image: "/img/Antartida.jpeg", ingredientes: "10 Islandia Roll, 5 Miami Roll, 5 Hanko Roll, 6 Tokyo Roll, 6 Tamago Roll, 2 Sashimis, 2 Geishas y 4 Niguiris", glutenfree: true },
        { id: 19, name: "Malvinas 60 piezas", price: 72000, image: "/img/Malvinas.jpeg", ingredientes: "10 New York Roll, 10 Hanko Roll, 10 Islandia Roll, 10 Miami Roll, 6 Paraíso Roll, 6 Tamago Roll, 4 Niguiris, 2 Sashimis y 2 Geishas", glutenfree: true },
        { id: 20, name: "Full salmón 15 piezas", price: 19000, image: "/img/fullsalmon.JPG", ingredientes: "10 Philadelphia, 2 Niguiris, 2 Sashimis y 1 Geisha.", glutenfree: true },
        { id: 21, name: "Full salmón 26 piezas", price: 33000, image: "/img/Fullsalmon26.JPG", ingredientes: "10 Philadelphia, 10 New York, 3 Niguiris, 2 Sashimis y 1 Geisha.", glutenfree: true },
        { id: 22, name: "Full salmón 34 piezas", price: 40000, image: "/img/Fullsalmon34.JPG", ingredientes: "10 Islandia, 10 New York, 5 Philadelphia, 4 Niguiris, 3 Sashimis y 2 Geishas.", glutenfree: true },
        { id: 23, name: "Full salmón 46 piezas", price: 48000, image: "/img/Fullsalmon46.JPG", ingredientes: "10 Miami, 10 Islandia, 10 Suiza, 5 Philadelphia, 5 Niguiris, 3 Sashimis y 3 Geishas", glutenfree: true },
        { id: 24, name: "Full salmón 60 piezas", price: 70000, image: "/img/Fullsalmon46.JPG", ingredientes: "10 Miami, 10 Islandia, 10 Philadelphia, 10 Suiza, 10 Niguiris, 5 Sashimis y 5 Geishas", glutenfree: true },
        { id: 25, name: "Blinders Roll", price: 0, image: "/img/Blinders.jpeg", ingredientes: "10 piezas rellenas de langostinos rebozados en panko, queso philadelphia y topping de salmón ahumado." },
        { id: 26, name: "Peaky Roll", price: 0, image: "/img/Peaky.jpeg", ingredientes: "10 piezas rellenas de salmón ahumado, queso philadelphia y topping de palta.", glutenfree: true },
        { id: 27, name: "Smoked 25 piezas", price: 0, image: "/img/Smokedd.jpeg", ingredientes: "10 Peaky, 10 Blinders y 5 Niguiris Salmón Ahumado." },
        { id: 28, name: "Tamago Protein", price: 8000, image: "/img/Tamago.JPG", ingredientes: "6 piezas envueltas en tamago + salmón rosado + queso crema.", glutenfree: true },
        { id: 29, name: "Paraíso Roll", price: 10000, image: "/img/Paraiso.JPG", ingredientes: "6 piezas rellenas de palta, queso crema y palmito, envueltas en tamago y fetas de salmón.", glutenfree: true },
        { id: 30, name: "New York Salad", price: 12000, image: "/img/Newyork.png", ingredientes: "Arroz, salmón, queso philadelphia, palta, pepinos marinados y sésamo.", glutenfree: true }
      ]
    },
    {
      titulo: "Rolls Especiales & Hot Rolls",
      items: [
        { id: 31, name: "California Salad", price: 11000, image: "/img/California.jpeg", ingredientes: "Arroz, Kanikama, queso philadelphia, palta, pepinos marinados, sésamo.", glutenfree: true },
        { id: 32, name: "Kansas Salad", price: 11000, image: "/img/Kansas.png", ingredientes: "Arroz, Langostinos rebozados, queso philadelphia, palta, pepinos marinados y sésamo." },
        { id: 33, name: "Aloha Poke", price: 11000, image: "/img/Aloha.jpeg", ingredientes: "Base de arroz, salmón fresco, mango, queso crema, pepinos marinados.", glutenfree: true },
        { id: 34, name: "Veggie Poke", price: 11000, image: "/img/Veggie.jpeg", ingredientes: "Base a elección, garbanzos cocidos, maíz crocante, bastones de zanahorias marinadas, rúcula, palta y pepinos.", vegetariano: true },
        { id: 35, name: "Teriyaki Poke", price: 10000, image: "/img/Teriyake.jpeg", ingredientes: "Base de arroz sushi, pollo teriyaki, queso crema, palta, maíz crocante, tiras de pepino." },
        { id: 36, name: "Hawaii Poke", price: 0, image: "/img/Imagen2.jpg", ingredientes: "Pollo crocante, cheddar y panceta fundida" },
        { id: 37, name: "Tartar Poke", price: 10000, image: "/img/Tartar.jpeg", ingredientes: "Base de arroz de sushi y tartar de salmón rosado, palta, queso crema, maíz tostado.", glutenfree: true },
        { id: 38, name: "Paté de Salmón Jet Poke", price: 9000, image: "/img/Paté.jpeg", ingredientes: "Paté de salmón cocido con queso crema, maíz crocante, palta, pepinos marinados." },
        { id: 39, name: "Queen Roll", price: 0, image: "/img/", ingredientes: "10 piezas rellenas de langostinos rebozados con queso crema, palta y topping de salmón ahumado." },
        { id: 40, name: "Buenos Aires Roll", price: 10000, image: "/img/Baires.JPG", ingredientes: "10 piezas rellenas de langostinos rebozados, queso crema, palta y topping de salmón." },
        { id: 41, name: "Miami Roll", price: 10000, image: "/img/Miami.JPG", ingredientes: "10 piezas rellenas de salmón, queso crema y topping de palta con sésamo.", glutenfree: true },
        { id: 42, name: "Hanko Roll", price: 11000, image: "/img/Hanko.jpeg", ingredientes: "10 piezas rellenas de salmón rosado, queso crema.", glutenfree: true },
        { id: 43, name: "Islandia Roll", price: 10000, image: "/img/Islandia.JPG", ingredientes: "10 piezas rellenas de Palta, queso crema y topping de salmón con sésamo. Incluye 2 sobres de soja y un par de palitos", glutenfree: true },
        { id: 44, name: "Phila Hot", price: 10000, image: "/img/Philahot.JPG", ingredientes: "10 piezas tempurizadas rellenas de salmón y queso philadelphia. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 45, name: "King Roll", price: 11000, image: "/img/KingRoll.jpeg", ingredientes: "10 piezas rellenas de langostinos rebozados, queso crema y topping de palta, bañado en tartar de salmón Oh Qué y maíz crocante triturado. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." }
      ]
    },
    {
      titulo: "Sabores individuales",
      items: [
        { id: 46, name: "Boston Roll", price: 10000, image: "/img/Boston.JPG", ingredientes: "10 piezas rellenas de Salmón, queso crema y topping de mango con sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 47, name: "Philadelphia roll", price: 0, image: "/img/Philadelphia.JPG", ingredientes: "10 piezas rellenas de salmón, queso crema y topping de sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 48, name: "Osaka Roll", price: 9000, image: "/img/Osaka.JPG", ingredientes: "10 piezas rellenas de langostino rebozados, queso crema, topping de palta y sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 49, name: "New York Roll", price: 0, image: "/img/Imagen2.jpg", ingredientes: "10 piezas rellenas de salmón, queso crema, palta y topping de sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 50, name: "California Roll", price: 9000, image: "/img/California10.JPG", ingredientes: "10 piezas rellenas de kanikama, queso crema, palta y topping de sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 51, name: "New York Hot", price: 10000, image: "/img/Newyorkhot.JPG", ingredientes: "10 piezas tempurizadas rellenas de salmón, queso crema y palta. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 52, name: "Suiza Roll", price: 11000, image: "/img/suiza.JPG", ingredientes: "10 piezas rellenas de salmón y palta, con topping de sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 53, name: "Kansas Crunch Roll", price: 11000, image: "/img/Kansascrunch.jpeg", ingredientes: "10 piezas rebozadas en panko, rellenas de langostinos rebozados, queso crema y palta. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 54, name: "Jet Roll", price: 7500, image: "/img/JETROLL.png", ingredientes: "10 piezas, rellenas de mix de pasta de salmón cocido con queso crema y ciboulette, con topping de palta y bañado en salsa teriyaki. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 55, name: "Vegan Roll", price: 9000, image: "/img/VeganRoll.jpeg", ingredientes: "10 piezas cubiertas de alga y rellenas de rúcula, palta, bastones de pepino y zanahoria marinada. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", vegetariano: true },
        { id: 56, name: "Veggie Roll", price: 9000, image: "/img/VeggieRoll.jpeg", ingredientes: "10 piezas rellenas de queso crema, zanahoria marinada, morrón en tiras finas y palta, con topping de sésamo. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", vegetariano: true },
        { id: 57, name: "Live Roll", price: 9000, image: "/img/LiveRoll.jpeg", ingredientes: "10 piezas rellenas de zanahoria marinada, palta y rúcula, con topping de mango y tiras de pepino marinado. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).", vegetariano: true }
      ]
    },
    {
      titulo: "Promo 20 piezas y salsas",
      items: [
        { id: 58, name: "New York roll", price: 0, image: "/img/Newyorkroll1.JPG", ingredientes: "20 piezas rellenas de salmón, queso crema, palta y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 59, name: "Phila Hot roll", price: 19000, image: "/img/Philahot10.JPG", ingredientes: "20 piezas tempurizadas rellenas de salmón y queso crema. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 60, name: "New York Hot roll", price: 21000, image: "/img/Newyorkhotpz.JPG", ingredientes: "20 piezas tempurizadas rellenas de salmón, queso crema, palta y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 61, name: "Kansas roll", price: 16000, image: "/img/Kansasroll.JPG", ingredientes: "20 piezas rellenas de langostinos rebozado en panko, queso crema, palta y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 62, name: "California Roll", price: 16000, image: "/img/Californiaroll.JPG", ingredientes: "20 piezas rellenas de kanikama, queso crema, palta y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 63, name: "Suiza Roll", price: 18000, image: "/img/Suizaroll.JPG", ingredientes: "20 piezas rellenas de salmón, palta y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado).", glutenfree: true },
        { id: 64, name: "Philadelphia roll", price: 0, image: "/img/Philadelphiaroll.JPG", ingredientes: "20 piezas rellenas de salmón, queso crema y topping de sésamo. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado)." },
        { id: 65, name: "Salsa Soja", price: 1500, image: "/img/SALSASOJA.png", ingredientes: "40cc de salsa de soja tradicional" },
        { id: 66, name: "Salsa Buenos Aires", price: 1500, image: "/img/SALSABUENOSAIRES.png", ingredientes: "40cc de salsa teriyaki, hecha en casa con lluvia de sésamo " },
        { id: 67, name: "Salsa Maracuyá", price: 1500, image: "/img/SALSAMARACUYA.png", ingredientes: "40cc de salsa dulce de maracuyá, hecha en casa" },
        { id: 68, name: "Salsa Teriyaki", price: 1500, image: "/img/SALSASOJA.png", ingredientes: " 40 cc de salsa dulce a base de soja" }
      ]
    }
  ];

  const sushiItems = menuCategorias.flatMap(cat => cat.items);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sushiItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sushiItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

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

  const calculateSubtotal = () => cart.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 5000; 
  const calculateTotal = () => calculateSubtotal() + (cart.length > 0 ? shippingCost : 0);

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const itemsText = cart.map(i => i.name).join(", ");
    const text = `Hola, mi nombre es ${userData.name}. Teléfono: ${userData.phone}. Dirección: ${userData.address}. Notas: ${userData.notes || 'Ninguna'}. Pedido: ${itemsText}. Total a pagar: $${calculateTotal().toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573246727621?text=${encodeURIComponent(text)}`, '_blank');
  };

  const isShopOpen = new Date().getHours() >= 17 && new Date().getHours() < 23;

  return (
    <>
      <style>{`
        /* Configuración base global para evitar desbordamientos en móviles */
        * { box-sizing: border-box; }
        html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }

        .landing-wrapper { background-color: #f2ede4; font-family: 'Playfair Display', serif; min-height: 100vh; padding: 20px 0; display: flex; flex-direction: column; align-items: center; color: #2b3a3c; width: 100%; }
        
        header { width: 100%; max-width: 1400px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .status-box { border: 1px solid #7d967b; color: #7d967b; padding: 8px 15px; border-radius: 8px; font-size: 0.85rem; font-weight: bold; white-space: nowrap; }
        .logo img { height: 40px; max-width: 150px; object-fit: contain; }
        .cart-box { font-size: 1.5rem; cursor: pointer; position: relative; padding: 5px; display: flex; align-items: center; }
        .cart-count { position: absolute; top: -5px; right: -5px; background: #e95d53; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 50%; font-weight: bold; }
        
        nav { margin-bottom: 40px; width: 100%; text-align: center; display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
        nav a { margin: 0 15px; text-decoration: none; color: #2b3a3c; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; }
        
        .hero-container { position: relative; width: 92%; max-width: 1400px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-bottom: 20px; }
        .hero-img { width: 100%; display: block; height: auto; max-height: 550px; object-fit: cover; transition: opacity 0.5s ease-in-out; }
        .promo-tag { position: absolute; top: 20px; right: 20px; background: #e95d53; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; z-index: 2; }
        
        /* Estilos nuevos para el título flotante y puntos del carrusel */
        .hero-title { 
          position: absolute; 
          bottom: 20px; 
          left: 20px; 
          background: rgba(0, 0, 0, 0.6); 
          color: white; 
          padding: 8px 16px; 
          border-radius: 20px; 
          font-size: 1rem; 
          font-weight: bold; 
          z-index: 2;
        }

        .carousel-dots {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s;
        }

        .dot.active {
          background: white;
          width: 20px;
          border-radius: 4px;
        }
        
        .menu-btn { margin: 20px 0; padding: 15px 40px; background: transparent; border: 1px solid #d4c1a0; border-radius: 30px; font-family: 'Playfair Display', serif; font-size: 1.1rem; cursor: pointer; transition: 0.3s; }
        .menu-btn:hover { background: #d4c1a0; color: white; }
        
        .menu-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px; width: 92%; max-width: 1400px; margin-bottom: 30px; }
        .menu-item { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; display: flex; flex-direction: column; align-items: center; word-break: break-word; position: relative; }
        .menu-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 10px; }
        .btn-pedir { background: #e95d53; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-family: 'Playfair Display', serif; font-weight: bold; width: 100%; transition: 0.2s; margin-top: auto; }
        .btn-pedir:hover { background: #d44c42; }
        
        .reviews-section { background: #0a262a; width: 100%; padding: 40px 5%; color: white; text-align: center; margin-top: 40px; }
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 1400px; margin: 30px auto; }
        .review-card { background: #153b40; padding: 20px; border-radius: 15px; text-align: left; }
        
        .map-section { width: 100%; max-width: 1400px; margin: 40px auto; padding: 0 5%; text-align: center; }
        .map-container { width: 100%; height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-top: 20px;}
        
        .checkout-container { width: 92%; max-width: 1400px; display: grid; grid-template-columns: 1fr 420px; gap: 25px; margin-top: 20px; }
        .cart-section-box, .form-section-box { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); width: 100%; overflow-x: hidden; }
        .form-input { width: 100%; padding: 12px; margin: 8px 0 15px 0; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 0.9rem; }
        .form-textarea { width: 100%; padding: 12px; margin: 8px 0 15px 0; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 0.9rem; resize: vertical; height: 80px; }
        .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #2b3a3c; color: white; padding: 15px 25px; border-radius: 50px; z-index: 1000; box-shadow: 0 5px 15px rgba(0,0,0,0.3); text-align: center; width: 90%; max-width: 400px; }
        
        .footer { background-color: #c5a975; width: 100%; padding: 40px 5%; color: #2b3a3c; margin-top: 40px; }
        .footer-content { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px; }
        .footer-col { flex: 1; min-width: 200px; }
        .footer-col h4 { margin-top: 0; margin-bottom: 15px; }
        .footer-col p { margin: 5px 0; font-size: 0.9rem; }
        
        .address-box { background: #f2ede4; padding: 15px; border-radius: 10px; border: 1px solid #d4c1a0; display: flex; align-items: center; gap: 15px; margin-bottom: 30px; width: 92%; max-width: 1400px; margin-left: auto; margin-right: auto; }
        .address-icon { font-size: 2rem; color: #c5a975; flex-shrink: 0; }
        
        .pagination { display: flex; justify-content: center; gap: 8px; margin: 25px 0; flex-wrap: wrap; padding: 0 10px; }
        .page-btn { padding: 8px 14px; background: white; border: 1px solid #0e7806; color: #7d967b; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: bold; transition: 0.2s; }
        .page-btn:hover { background: #7b7f96; color: white; }
        .page-btn.active { background: #77db70; color: white; }

        /* Media Queries optimizadas para móviles y tablets */
        @media (max-width: 900px) { 
          .checkout-container { grid-template-columns: 1fr; width: 95%; }
        }

        @media (max-width: 768px) { 
          .hero-container, .menu-list, .address-box { width: 95%; }
          header { padding: 0 10px; flex-wrap: wrap; gap: 10px; justify-content: center; }
          .menu-btn { width: 95%; padding: 15px; } 
          nav a { margin: 0 8px; font-size: 0.85rem; } 
          .map-container { height: 250px; } 
          .status-box { font-size: 0.75rem; padding: 6px 10px; }
          .logo img { height: 32px; }
        }
      `}</style>

      <div className="landing-wrapper">
        <header>
          <div className="status-box">{isShopOpen ? "🟢 Abiertos" : "🔴 Cerrados"}</div>
          <div className="logo"><img src="/img/LOGO_rollticio.svg" alt="Logo Rollsticio" /></div>
          <div className="cart-box" onClick={handleCartClick}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#2b3a3c' }}>
              shopping_cart
            </span>
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
        </header>

        <nav>
          <a onClick={() => setShowMenu(false)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>restaurant_menu</span> Menú
          </a>
          <a href="#">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>mail</span> Contacto
          </a>
          <a href="#">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>location_on</span> Ubícanos
          </a>
        </nav>

        {!showMenu && (
          <section className="hero-container">
            <img 
              src={heroSlides[currentSlide].img} 
              alt={heroSlides[currentSlide].alt} 
              className="hero-img" 
            />
            <div className="promo-tag">
  Promo <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>local_offer</span>
</div>
            <div className="hero-title">{heroSlides[currentSlide].title}</div>
            <div className="carousel-dots">
              {heroSlides.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </section>
        )}

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? "Volver al inicio" : "Ver menú completo"}
        </button>

        {showMenu && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', margin: '20px 0', padding: '0 10px', fontSize: '1.4rem' }}>Menú Completo (Página {currentPage} de {totalPages})</h2>
            <div className="menu-list">
              {currentItems.map((item) => (
                <div key={item.id} className="menu-item">
                  {/* Etiqueta Gluten Free */}
                  {item.glutenfree && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#365f73', color: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 2 }}>
                      Gluten Free 🌾
                  </div>
                  )}

                  {/* Etiqueta Vegetariano */}
                  {item.vegetariano && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#8bcf8b', color: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 2 }}>
                      Vegetariano 🥗
                    </div>
                  )}

                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>{item.description}</p>
                  <p style={{ fontSize: '0.75rem', color: '#555', marginBottom: '10px' }}>{item.ingredientes}</p>
                  <p style={{fontWeight: 'bold', color: '#e95d53'}}>${item.price.toLocaleString('es-CO')}</p>
                  <button className="btn-pedir" onClick={() => handleOrder(item)}>Agregar al carrito</button>
                </div>
              ))}
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showMenu && (
          <>
            <h2 style={{marginTop: '40px', textAlign: 'center', padding: '0 10px'}}>Nuestras especialidades</h2>
            <div className="menu-list">
              {sushiItems.slice(0, 3).map((item) => (
                <div key={item.id} className="menu-item">
                  {/* Etiqueta Gluten Free */}
                  {item.glutenfree && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#365f73', color: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 2 }}>
                      Gluten Free 🌾
                    </div>
                  )}

                  {/* Etiqueta Vegetariano */}
                  {item.vegetariano && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#8bcf8b', color: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 2 }}>
                      Vegetariano 🥗
                    </div>
                  )}

                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p style={{fontWeight: 'bold', color: '#e95d53'}}>${item.price.toLocaleString('es-CO')}</p>
                  <button className="btn-pedir" style={{background: 'transparent', border: '1px solid #e95d53', color: '#e95d53'}} onClick={() => handleOrder(item)}>Agregar</button>
                </div>
              ))}
            </div>
          </>
        )}

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
        </section>

        <section className="map-section">
          <h2>¿Dónde estamos ubicados?</h2>
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102434.7937554972!2d-86.86869408076169!3d33.52225332766326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8889142f36d4001d%3A0x2a98f158097b3989!2sBirmingham%2C%20AL!5e0!3m2!1ses-419!2sco!4v1719940000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Ubicación"></iframe>
          </div>
        </section>

        <footer className="footer">
          <div className="address-box" style={{margin: '0 auto'}}>
            <div className="address-icon">📍</div>
            <div>
              <p style={{fontWeight: 'bold'}}>Gorriti 3440, C1172 ACB,</p>
              <p>Cdad. Autónoma de Buenos Aires, Argentina</p>
            </div>
          </div>
        </footer>

        {message && <div className="toast">{message}</div>}
      </div>
    </>
  );
};
export default LandingPage;