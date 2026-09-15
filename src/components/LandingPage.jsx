import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  /* =========================================================
     ESTADOS PRINCIPALES
     ========================================================= */

  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el Sidebar móvil
  const [message, setMessage] = useState(null);

  const [userData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  /* =========================================================
     CARRUSEL PRINCIPAL
     ========================================================= */

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      img: '/img/Aloha.jpeg',
      alt: 'Aloha Poke',
      title: 'Aloha Poke',
    },
    {
      img: '/img/America.jpeg',
      alt: 'América 20 piezas',
      title: 'América 20 piezas',
    },
    {
      img: '/img/California10.JPG',
      alt: 'California Roll',
      title: 'California Roll',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  /* =========================================================
     NAVEGACIÓN
     ========================================================= */

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoClick = () => {
    setShowMenu(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reviewLink = '#';

  /* =========================================================
     PAGINACIÓN
     ========================================================= */

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* =========================================================
     MENÚ COMPLETO (Simplificado para el ejemplo)
     ========================================================= */

  const menuCategorias = [
    {
      titulo: 'Tablas Variadas',
      items: [
        {
          id: 1,
          name: 'Nigiris de salmón rosado',
          price: 5000,
          image: '/img/Niguiris.png',
          ingredientes:
            '4 unidades de niguiris de arroz con topping de salmón rosado fresco.',
        },
        {
          id: 2,
          name: 'Sashimis de salmón rosado',
          price: 9000,
          image: '/img/Sashimis.png',
          ingredientes: '4 unidades de rodajas únicas de salmón rosado',
        },
        {
          id: 3,
          name: 'Geishas de salmón rosado',
          price: 7000,
          image: '/img/Geishas.png',
          ingredientes: '4 unidades rellenas de queso crema y palta',
        },
        {
          id: 4,
          name: 'Yagi 15 piezas',
          price: 13000,
          image: '/img/Yagi.png',
          ingredientes:
            '5 Philadelphia, 5 Osaka, 5 California. Incluye 2 sobres de soja, wasabi/jengibre y un par de palitos',
        },
        {
          id: 5,
          name: 'Oke 20 piezas',
          price: 19000,
          image: '/img/Oke.png',
          ingredientes:
            '5 Philadelphia, 5 Osaka, 5 California, 5 Niguiris de salmón. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
        },
        {
          id: 6,
          name: 'Nara 30 piezas',
          price: 0,
          image: '/img/Nara.JPG',
          ingredientes:
            '10 Philadelphia, 10 Osaka, 10 California. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
        },
        {
          id: 7,
          name: 'Moly Premium 30 piezas',
          price: 30000,
          image: '/img/Moly.png',
          ingredientes:
            '10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
        },
        {
          id: 8,
          name: 'Dundee 40 piezas',
          price: 0,
          image: '/img/Dundee.png',
          ingredientes:
            '10 Miami, 10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
        },
        {
          id: 9,
          name: 'Star 60 piezas',
          price: 65000,
          image: '/img/',
          ingredientes:
            '10 Kansas Crunch, 10 New York, 10 Islandia, 10 Osaka, 10 MakiCalifornia, 4 Niguiris, 3 Sashimis, 3 Geishas',
        },
        {
          id: 10,
          name: 'Aruba 15 piezas',
          price: 15000,
          image: '/img/Aruba.png',
          ingredientes:
            '5 Queen Roll, 5 Hanko Roll, 5 King Roll. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
        },
      ],
    }
  ];

  /* =========================================================
     PREPARACIÓN DEL MENÚ
     ========================================================= */

  const sushiItems = menuCategorias.flatMap((cat) => cat.items);
  const specialtyItems = sushiItems.slice(0, 10);

  /* =========================================================
     CARRUSEL DE ESPECIALIDADES
     ========================================================= */

  const [specialtyIndex, setSpecialtyIndex] = useState(0);

  const nextSpecialty = () => {
    setSpecialtyIndex((prev) =>
      Math.min(prev + 1, specialtyItems.length - 1)
    );
  };

  const prevSpecialty = () => {
    setSpecialtyIndex((prev) => Math.max(prev - 1, 0));
  };

  /* =========================================================
     PAGINACIÓN DEL MENÚ
     ========================================================= */

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = sushiItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sushiItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 300,
      behavior: 'smooth',
    });
  };

  /* =========================================================
     CARRITO
     ========================================================= */

  const handleOrder = (item) => {
    setCart([...cart, item]);

    setMessage(`✅ ¡${item.name} agregado!`);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + item.price, 0);

  const shippingCost = 5000;

  const calculateTotal = () =>
    calculateSubtotal() + (cart.length > 0 ? shippingCost : 0);

  /* =========================================================
     WHATSAPP
     ========================================================= */

  const sendToWhatsApp = (e) => {
    e.preventDefault();

    const itemsText = cart.map((i) => i.name).join(', ');

    const text = `Hola, mi nombre es ${userData.name}. Teléfono: ${userData.phone}. Dirección: ${userData.address}. Notas: ${userData.notes || 'Ninguna'}. Pedido: ${itemsText}. Total a pagar: $${calculateTotal().toLocaleString('es-CO')}`;

    window.open(
      `https://wa.me/573246727621?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  /* =========================================================
     HORARIO
     ========================================================= */

  const currentHour = new Date().getHours();

  const isShopOpen =
    currentHour >= 17 && currentHour < 23;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
<style>{`

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

  :root {
    --page-max-width: 100%;
    --page-side-space: 125px;
    --grid-gap: 40px;

    --background-main: #F2ECE3;
    --color-text: #2b3a3c;
    --color-gold: #d4af37;
    --color-coral: #e95d53;

    --color-green: #7d967b;
    --color-green-light: #e7f6e7;
    --color-green-border: #8bcf8b;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    background: var(--background-main);
    font-family:
      'Playfair Display',
      Georgia,
      'Times New Roman',
      serif;
  }

  img {
    max-width: 100%;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  /* =========================================================
     CONTENEDOR PRINCIPAL
     ========================================================= */

  .landing-wrapper {
    width: 100%;
    max-width: var(--page-max-width);
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: var(--background-main);
    color: var(--color-text);
    overflow-x: hidden;
  }

  /* =========================================================
     CONTROL DE ANCHO DE SECCIONES
     ========================================================= */

  .main-header,
  .desktop-nav,
  .hero-container,
  .menu-list,
  .checkout-container,
  .map-section {
    width: calc(100% - (var(--page-side-space) * 2));
    max-width: 100%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .specialties-section,
  .reviews-section,
  .site-footer {
    width: 100%;
    max-width: 100%;
  }

  /* =========================================================
     HEADER
     ========================================================= */

  .main-header {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--grid-gap);
    align-items: center;
    padding: 0 0 12px;
    border-bottom: 1px solid #d2a735;
    margin: 0 auto 24px;
  }

  .header-status.desktop-status {
    grid-column: 1 / span 4;
    justify-self: start;
    display: block;
  }
  
  .mobile-menu-toggle {
    display: none;
  }

  .header-logo {
    grid-column: 5 / span 4;
    justify-self: center;
  }

  .header-actions {
    grid-column: 9 / span 4;
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .logo-button {
    appearance: none;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .logo-button:focus-visible {
    outline: 2px solid #d4a72c;
    outline-offset: 5px;
  }

  .status-box {
    border: 1px solid var(--color-green-border);
    color: #3f7143;
    background: var(--color-green-light);
    padding: 8px 15px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(91, 145, 91, 0.08);
  }

  .mobile-status-container {
    display: none;
  }

  .logo img {
    height: 48px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
    display: block;
  }

  .cart-box {
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    border: 1.5px solid #d4a72c;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cart-box:hover {
    background: #fffdf8;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }

  .cart-count {
    position: absolute;
    top: -2px;
    right: -2px;
    background: var(--color-coral);
    color: white;
    font-size: 0.7rem;
    min-width: 20px;
    height: 20px;
    padding: 2px 5px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* =========================================================
     NAVEGACIÓN ESCRITORIO
     ========================================================= */

  .desktop-nav {
    margin: 0 auto 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 28px;
  }

  .desktop-nav a {
    margin: 0;
    padding: 7px 4px;
    text-decoration: none;
    color: var(--color-text);
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: color 0.2s ease;
  }

  .desktop-nav a:hover {
    color: var(--color-coral);
  }

  /* =========================================================
     SIDEBAR MÓVIL
     ========================================================= */
  
  .sidebar-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2000;
    display: flex;
  }
  .sidebar-menu {
    background: var(--background-main);
    width: 250px;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 2px 0 10px rgba(0,0,0,0.2);
    transform: translateX(-100%);
    animation: slideIn 0.3s forwards;
  }
  @keyframes slideIn {
    to { transform: translateX(0); }
  }
  .sidebar-close {
    align-self: flex-end;
    background: transparent;
    border: none;
    color: var(--color-text);
    padding: 5px;
    cursor: pointer;
  }
  .sidebar-menu a {
    color: var(--color-text);
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    border-bottom: 1px solid #d4c1a0;
    padding-bottom: 12px;
    padding-left: 5px;
    cursor: pointer;
  }

  /* =========================================================
     HERO
     ========================================================= */

  .hero-container {
    position: relative;
    aspect-ratio: 16 / 6.5;
    min-height: 280px;
    margin: 0 auto 20px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background: #ddd;
  }

  .hero-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .promo-tag {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--color-coral);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    z-index: 2;
  }

  .hero-title {
    position: absolute;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%);
    color: white;
    padding: 0;
    font-size: clamp(1.2rem, 2.2vw, 2rem);
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
    z-index: 2;
    width: min(90%, 800px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .carousel-dots {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 2;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
  }

  .dot.active {
    background: white;
    width: 20px;
    border-radius: 4px;
  }

  /* =========================================================
     BOTÓN MENÚ
     ========================================================= */

  .menu-btn {
    width: min(360px, 100%);
    max-width: 360px;
    margin: 20px auto;
    padding: 11px 28px;
    background: white;
    border: 1px solid #d4a72c;
    border-radius: 24px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.10);
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.3s;
    box-sizing: border-box;
  }

  .menu-btn:hover {
    background: #d4c1a0;
    color: white;
  }

  /* =========================================================
     MENÚ COMPLETO
     ========================================================= */

  .menu-list {
    margin: 0 auto 30px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--grid-gap);
  }

  .menu-item {
    background: white;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    word-break: break-word;
    position: relative;
    overflow: hidden;
  }

  .menu-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
    display: block;
  }

  .menu-item h3 {
    width: 100%;
    margin: 6px 0;
    line-height: 1.25;
  }

  .menu-item p {
    max-width: 100%;
    line-height: 1.45;
  }

  .btn-pedir {
    background: var(--color-coral);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    width: 100%;
    transition: 0.2s;
    margin-top: auto;
    min-height: 44px;
  }

  .btn-pedir:hover {
    background: #d44c42;
  }

  /* =========================================================
     NUESTRAS ESPECIALIDADES
     ========================================================= */

  .specialties-section {
    padding: 70px var(--page-side-space);
    background-color: #ffffff;
    border-radius: 0;
    box-sizing: border-box;
    margin: 2px 0;
  }
  
  .specialties-section h2 {
    margin: 0 0 18px;
    text-align: left;
    font-size: 1.45rem;
    line-height: 1.2;
    color: #16445a;
    font-weight: 700;
  }

  .specialty-carousel {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 55px; /* Ampliado para que no pise el contenedor principal */
    box-sizing: border-box;
  }

  .specialty-viewport {
    width: 100%;
    overflow: hidden;
  }

  /* FLEXBOX para emparejar alturas */
  .specialty-track {
    --specialty-step: calc((100% + var(--grid-gap)) / 3);
    display: flex;
    gap: var(--grid-gap);
    transition: transform 0.45s ease;
    will-change: transform;
    align-items: stretch; /* Estira las tarjetas para tener la misma altura */
  }

  .specialty-slide {
    flex: 0 0 calc((100% - (var(--grid-gap) * 2)) / 3);
    min-width: 0;
    box-sizing: border-box;
    display: flex; 
    height: auto; /* Permite que tome la altura del contenedor padre flex */
  }

  .specialty-slide .menu-item {
    width: 100%;
    min-height: 0;
    padding: 12px;
    border: 1px solid #d4a72c;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    
    flex: 1; /* Rellena el alto del slide */
    display: flex;
    flex-direction: column;
  }

  .specialty-slide .menu-item img {
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 8px;
  }

  .specialty-slide .menu-item h3 {
    font-size: 0.9rem;
    margin: 4px 0;
    line-height: 1.2;
    flex: none; /* No se estira */
  }

  .specialty-description {
    color: #555;
    font-size: 0.68rem;
    line-height: 1.35;
    margin: 5px 0 10px;
    min-height: 0;
    width: 100%;
    
    /* TRUNCADO CON PUNTOS SUSPENSIVOS (...) Y RELLENO FLEX */
    flex: 1; 
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limita a 3 líneas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .specialty-slide .btn-pedir {
    min-height: 36px;
    padding: 7px 12px;
    font-size: 0.78rem;
    margin-top: auto; /* Asegura que el botón siempre baje al final de la tarjeta */
    flex: none;
  }

  .specialty-add-btn {
    background: #153b40;
    color: white;
    border: none;
    border-radius: 20px;
    box-shadow: none;
  }

  .specialty-add-btn:hover {
    background: #1c4a50;
  }

  /* FLECHAS PERSONALIZADAS SVG */
  .specialty-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: transparent;
    border: none; /* Quitamos bordes */
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .specialty-arrow img {
    width: 38px;
    height: 38px;
    display: block;
    filter: brightness(0); /* ESTO HACE LAS FLECHAS NEGRAS */
  }

  .specialty-arrow:hover:not(:disabled) {
    background: transparent;
    transform: translateY(-50%) scale(1.1); /* Efecto zoom ligero */
  }

  .specialty-arrow:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .specialty-arrow.prev {
    left: 0;
  }

  .specialty-arrow.next {
    right: 0;
  }

  .specialty-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    margin-top: 16px;
  }

  .specialty-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #c9c0b1;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .specialty-dot.active {
    width: 22px;
    border-radius: 8px;
    background: #d4a72c;
  }

  /* =========================================================
     RESEÑAS
     ========================================================= */

  .reviews-section {
    background: #193c46;
    padding: 32px var(--page-side-space) 31px;
    color: white;
    text-align: left;
    margin: 0 auto;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--grid-gap);
  }

  .reviews-section h2 {
    grid-column: 1 / -1;
    margin: 0 0 20px;
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .reviews-grid {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--grid-gap);
    width: 100%;
    max-width: none;
    margin: 0 auto;
  }

  .review-card {
    grid-column: span 4;
    background: #193c46;
    padding: 10px 9px 9px;
    border-radius: 5px;
    text-align: left;
    min-width: 0;
    min-height: 180px;
    box-sizing: border-box;
    border: 1px solid #2b5964;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .review-card p:first-child {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.16;
    color: white;
  }

  .review-card p:last-child {
    margin: 10px 0 0 !important;
    padding-top: 7px;
    border-top: 1px solid #2b5964;
    font-size: 0.72rem;
    line-height: 1;
    color: white;
  }

  .review-star {
    color: #d4a72c;
    font-size: 0.78rem;
    margin-left: 3px;
  }

  .reviews-button {
    grid-column: 5 / span 4;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 161px;
    height: 32px;
    box-sizing: border-box;
    margin: 23px auto 0;
    padding: 0 16px;
    background: #315d6b;
    color: white;
    border: none;
    border-radius: 18px;
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 500;
    transition: 0.2s ease;
  }

  .reviews-button:hover {
    background: #3a6c7b;
    transform: translateY(-1px);
  }

  /* =========================================================
     UBICACIÓN
     ========================================================= */

  .map-section {
    margin: 42px auto 30px;
    padding: 0 0 28px;
    text-align: left;
    box-sizing: border-box;
  }

  .map-section h2 {
    margin: 0 0 20px;
    font-size: 1.45rem;
    color: #16445a;
    font-weight: 700;
  }

  .map-container {
    width: 100%;
    max-width: 100%;
    height: 480px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }

  .map-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  .location-card {
    width: fit-content;
    min-width: 580px;
    max-width: 100%;
    margin: 25px auto 0;
    padding: 22px 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-main);
    border: 1px solid #d2a735;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: left;
  }

  .location-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d2a735;
    flex-shrink: 0;
  }

  .location-icon svg {
    width: 38px;
    height: 38px;
    display: block;
  }

  .location-divider {
    width: 1.5px;
    height: 52px;
    background: #d2a735;
    margin: 0 25px;
    flex-shrink: 0;
  }

  .location-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #16445a;
    font-size: 1.15rem;
    line-height: 1.3;
    letter-spacing: 0.01em;
    min-width: 0;
  }

  .location-info strong {
    font-weight: 700;
  }

  .location-info span {
    font-weight: 400;
  }

  /* =========================================================
     CHECKOUT
     ========================================================= */

  .checkout-container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--grid-gap);
    margin: 20px auto 0;
  }

  .cart-section-box {
    grid-column: span 8;
  }

  .form-section-box {
    grid-column: span 4;
  }

  .cart-section-box,
  .form-section-box {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    width: 100%;
    min-width: 0;
    overflow-x: hidden;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    max-width: 100%;
    padding: 12px;
    margin: 8px 0 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .form-textarea {
    resize: vertical;
    min-height: 80px;
  }

  /* =========================================================
     PAGINACIÓN
     ========================================================= */

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 25px 0;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .page-btn {
    padding: 8px 14px;
    min-width: 40px;
    background: white;
    border: 1px solid #0e7806;
    color: var(--color-green);
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    transition: 0.2s;
  }

  .page-btn:hover {
    background: #7b7f96;
    color: white;
  }

  .page-btn.active {
    background: #77db70;
    color: white;
  }

  /* =========================================================
     FOOTER
     ========================================================= */

  .site-footer {
    background: var(--color-gold);
    padding: 38px var(--page-side-space);
    color: #1a2b2c;
    border-top: 1px solid #c5a030;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 0;
  }

  .footer-content {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--grid-gap);
    align-items: start;
  }

  .footer-col {
    grid-column: span 4;
    min-width: 0;
    line-height: 1.6;
  }

  .footer-col h4 {
    margin: 0 0 10px;
    font-size: 1rem;
  }

  .footer-col p {
    margin: 5px 0;
    font-size: 0.9rem;
  }

  .footer-brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #1a2b2c;
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    margin-top: 4px;
  }

  .footer-brand img {
    height: 22px;
    width: auto;
    display: block;
  }

  /* =========================================================
     MENSAJE
     ========================================================= */

  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #2b3a3c;
    color: white;
    padding: 15px 25px;
    border-radius: 50px;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: min(90%, 400px);
  }

  /* =========================================================
     RESPONSIVE
     ========================================================= */

  @media (max-width: 1100px) {
    :root {
      --page-side-space: 40px;
      --grid-gap: 24px;
    }
    .menu-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .specialty-track {
      --specialty-step: calc((100% + var(--grid-gap)) / 3);
    }
    .specialty-slide {
      flex-basis: calc((100% - (var(--grid-gap) * 2)) / 3);
    }
    .checkout-container {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
    .cart-section-box {
      grid-column: span 7;
    }
    .form-section-box {
      grid-column: span 5;
    }
  }

  @media (max-width: 900px) {
    .specialty-carousel {
      padding: 0 45px; /* Modificado para dar más espacio a las flechas */
    }
    .specialty-track {
      --specialty-step: calc((100% + 18px) / 2);
      gap: 18px;
    }
    .specialty-slide {
      flex-basis: calc((100% - 18px) / 2);
    }
    .checkout-container {
      grid-template-columns: 1fr;
    }
    .cart-section-box,
    .form-section-box {
      grid-column: 1 / -1;
    }
    .menu-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .reviews-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .review-card {
      grid-column: span 6;
    }
    .hero-container {
      aspect-ratio: 16 / 8;
    }
  }

  @media (max-width: 600px) {
    :root {
      --page-side-space: 15px;
    }

    .landing-wrapper {
      padding: 12px 0 0;
    }

    /* Ocultar status del header en móvil (se mueve abajo) */
    .header-status.desktop-status {
      display: none;
    }
    
    /* ESCONDER LA BARRA NAVEGACIÓN EN MÓVIL (para usar Sidebar) */
    .desktop-nav {
      display: none !important;
    }

    /* HEADER AJUSTADO PARA MÓVIL ESTILO TARJETA (Borde dorado, fondo blanco) */
    .main-header {
      background: white;
      border: 1px solid #d4a72c;
      border-radius: 6px;
      padding: 8px 15px;
      margin: 15px auto;
      width: calc(100% - 30px);
      grid-template-columns: auto 1fr auto;
      grid-template-areas: "menu logo cart";
      gap: 12px;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }

    .mobile-menu-toggle {
      display: flex;
      grid-area: menu;
      background: transparent;
      border: none;
      color: #d4a72c;
      cursor: pointer;
      padding: 0;
      justify-self: start;
      align-items: center;
    }

    .header-logo {
      grid-area: logo;
      justify-self: center; /* Logo centrado */
    }

    .header-actions {
      grid-area: cart;
      justify-self: end;
    }

    /* Logo ajustado para parecerse al texto de la imagen */
    .logo img {
      height: 24px;
      max-width: 145px;
    }

    /* Icono del carrito limpio sin borde ni fondo en móvil */
    .cart-box {
      border: none;
      background: transparent;
      box-shadow: none;
      padding: 0;
      min-width: auto;
      min-height: auto;
    }

    .hero-container {
      width: calc(100% - 30px);
      margin: 0 auto 10px;
      aspect-ratio: 4 / 3;
      min-height: 230px;
      border-radius: 12px;
    }

    .hero-img {
      object-position: center;
    }

    .promo-tag {
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      font-size: 0.7rem;
    }

    .hero-title {
      bottom: 14px;
      font-size: 1.05rem;
      width: 88%;
      max-width: 88%;
    }

    .carousel-dots {
      bottom: 13px;
      right: 10px;
    }

    /* Botón MENÚ AJUSTADO (Estilo píldora bajo el hero) */
    .menu-btn {
      display: block;
      width: auto;
      margin: -20px auto 20px; /* Sube un poco para tocar el borde del hero */
      padding: 8px 24px;
      border-radius: 20px;
      background: #f1e7da;
      border: 1px solid #d4a72c;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      position: relative;
      z-index: 10;
      font-size: 0.9rem;
      color: #1a1a1a;
      font-weight: 500;
    }

    /* Caja de Status Móvil (Debajo del botón) */
    .mobile-status-container {
      display: block;
      width: calc(100% - 30px);
      margin: 0 auto 20px;
    }

    .mobile-status-box {
      display: flex;
      align-items: center;
      justify-content: center; /* Texto centrado en celular */
      text-align: center;
      gap: 10px;
      background: #e7f3e7;
      border: 1px solid #7bc07f;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 0.85rem;
      color: #4b9e4f;
      font-weight: 500;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      background-color: #4b9e4f;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .menu-list {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .menu-item {
      padding: 12px;
      border-radius: 12px;
    }

    .menu-item img {
      height: 220px;
    }

    .menu-item h3 {
      font-size: 1.05rem;
    }

    .menu-item p {
      font-size: 0.8rem !important;
    }

    /* Especialidades - Fondo blanco en móvil */
    .specialties-section {
      width: 100% !important;
      max-width: 100% !important;
      background-color: #ffffff !important;
      padding: 25px 15px 25px !important; /* Añadí un poco de padding top para que se vea bien el cuadro blanco */
      margin: 15px 0 0 !important;
      border-radius: 0;
    }

    .specialties-section h2 {
      margin: 0 0 16px;
      font-size: 1.25rem;
      text-align: left;
      color: #16445a;
    }

    .specialty-carousel {
      padding: 0 40px !important; /* Espacio exacto para las flechas en móvil */
    }

    .specialty-track {
      --specialty-step: calc((100% + 12px) / 2);
      gap: 12px;
    }

    .specialty-slide {
      flex-basis: calc((100% - 12px) / 2);
    }

    .specialty-slide .menu-item {
      padding: 10px;
      background: white; /* Las tarjetas siguen siendo blancas */
    }

    .specialty-slide .menu-item img {
      height: 135px;
    }

    .specialty-slide .menu-item h3 {
      font-size: 0.9rem;
    }

    .specialty-description {
      font-size: 0.64rem;
    }

    /* Flechas en móvil restauradas */
    .specialty-arrow {
      display: flex; /* Muestra las flechas que estaban ocultas */
    }

    .specialty-arrow img {
      width: 30px; /* Un poco mas chicas para el celular */
      height: 30px;
    }

    /* Reseñas FULL WIDTH (Borde a Borde) */
    .reviews-section {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 28px var(--page-side-space) 26px;
      grid-template-columns: 1fr;
    }

    .reviews-grid {
      grid-column: 1 / -1;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 0;
    }

    .review-card {
      grid-column: 1 / -1;
      min-height: 160px;
      padding: 10px;
    }

    .reviews-section h2 {
      grid-column: 1 / -1;
      font-size: 1.15rem;
      padding: 0;
    }

    .reviews-button {
      grid-column: 1 / -1;
      width: 161px;
      height: 32px;
      margin-top: 20px;
    }

    /* Ubicación en móvil */
    .map-section {
      margin: 28px auto;
      padding: 0 0 25px;
    }

    .map-section h2 {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .map-container {
      height: 320px;
      padding: 10px;
      border-radius: 4px;
    }

    .location-card {
      max-width: 100%;
      width: 100%;
      min-width: auto; 
      min-height: 58px;
      padding: 15px 15px;
      margin: 20px auto 0;
      justify-content: flex-start;
    }

    .location-icon {
      width: 36px;
      height: 36px;
    }

    .location-icon svg {
      width: 28px;
      height: 28px;
    }

    .location-divider {
      margin: 0 15px;
      height: 40px;
    }

    .location-info {
      font-size: 0.95rem; 
    }

    /* Footer FULL WIDTH (Borde a Borde) */
    .site-footer {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 30px var(--page-side-space);
      border-radius: 0;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 24px;
      text-align: center;
    }

    .footer-col {
      grid-column: 1 / -1;
      width: 100%;
    }

    .pagination {
      gap: 5px;
      padding: 0;
    }

    .page-btn {
      padding: 7px 11px;
      min-width: 36px;
    }

    .toast {
      bottom: 12px;
      padding: 12px 18px;
      font-size: 0.85rem;
      border-radius: 14px;
    }
  }

  @media (max-width: 380px) {

    .specialty-track {
      --specialty-step: 100%;
    }

    .specialty-slide {
      flex-basis: 100%;
    }

    .specialty-slide .menu-item img {
      height: 160px;
    }

    .specialty-description {
      font-size: 0.68rem;
    }

    .logo img {
      height: 22px;
      max-width: 125px;
    }

    .status-box {
      font-size: 0.7rem;
    }

    .hero-container {
      min-height: 205px;
    }

    .menu-item img {
      height: 190px;
    }

    .menu-item h3 {
      font-size: 0.98rem;
    }

    .page-btn {
      min-width: 33px;
      padding: 6px 9px;
      font-size: 0.8rem;
    }
  }

`}</style>

      <div className="landing-wrapper">

        {/* ===================================================
            HEADER
            =================================================== */}

        <header className="main-header">

          <div className="header-status desktop-status">
            <div className="status-box">
              {isShopOpen
                ? 'Abiertos (De 5:00pm a 11:00pm)'
                : 'Cerrados (Abrimos a las 5:00pm)'}
            </div>
          </div>
          
          {/* BOTÓN HAMBURGUESA PARA VERSIÓN MÓVIL */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir menú lateral"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              menu
            </span>
          </button>

          <div className="header-logo">
            <button
              type="button"
              className="logo-button"
              onClick={handleLogoClick}
              aria-label="Volver a la página principal"
              title="Volver a la página principal"
            >
              <span className="logo">
                <img
                  src="/img/LOGO_rollticio.svg"
                  alt="Logo Rollsticio"
                />
              </span>
            </button>
          </div>

          <div className="header-actions">

            <div
              className="cart-box"
              onClick={handleCartClick}
              role="button"
              tabIndex={0}
              aria-label="Abrir carrito"
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '28px',
                  color: '#d4a72c',
                }}
              >
                shopping_cart
              </span>

              {cart.length > 0 && (
                <span className="cart-count">
                  {cart.length}
                </span>
              )}
            </div>

          </div>

        </header>

        {/* ===================================================
            SIDEBAR MÓVIL (Menú de Hamburguesa)
            =================================================== */}
        
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
            <div className="sidebar-menu" onClick={(e) => e.stopPropagation()}>
              
              <button 
                className="sidebar-close" 
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                  close
                </span>
              </button>

              <a onClick={() => { setShowMenu(false); setIsSidebarOpen(false); }}>
                Menú
              </a>
              <a href="#" onClick={() => setIsSidebarOpen(false)}>
                Contacto
              </a>
              <a href="#ubicacion" onClick={() => setIsSidebarOpen(false)}>
                Ubícanos
              </a>

            </div>
          </div>
        )}

        {/* ===================================================
            NAVEGACIÓN ESCRITORIO
            =================================================== */}

        <nav className="desktop-nav">
          <a onClick={() => setShowMenu(false)}>Menú</a>
          <a href="#">Contacto</a>
          <a href="#ubicacion">Ubícanos</a>
        </nav>

        {/* ===================================================
            HERO / PROMOCIÓN
            =================================================== */}

        {!showMenu && (
          <section className="hero-container">

            <img
              src={heroSlides[currentSlide].img}
              alt={heroSlides[currentSlide].alt}
              className="hero-img"
            />

            <div className="promo-tag">
              Promo{' '}
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '14px',
                  verticalAlign: 'middle',
                }}
              >
                settings
              </span>
            </div>

            <div className="hero-title">
              {heroSlides[currentSlide].title}
            </div>

            <div className="carousel-dots">
              {heroSlides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    currentSlide === index
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setCurrentSlide(index)
                  }
                />
              ))}
            </div>

          </section>
        )}

        {/* ===================================================
            BOTÓN MENÚ 
            =================================================== */}

        <button
          className="menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu
            ? 'Volver al inicio'
            : 'Ver menú completo'}
        </button>

        {/* ===================================================
            CAJA DE ESTADO VERSIÓN MÓVIL (Debajo del botón, centrada)
            =================================================== */}

        {!showMenu && (
          <div className="mobile-status-container">
            <div className="mobile-status-box">
              <span className="status-dot"></span>
              {isShopOpen
                ? 'Estamos abiertos (De 5:00pm a 11:00 Pm)'
                : 'Cerrados (Abrimos a las 5:00pm)'}
            </div>
          </div>
        )}

        {/* ===================================================
            MENÚ COMPLETO (Se muestra si se hace click)
            =================================================== */}

        {showMenu && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <h2
              style={{
                textAlign: 'center',
                margin: '20px 0',
                padding: '0 10px',
                fontSize: '1.4rem',
              }}
            >
              Menú Completo
            </h2>

            <div className="menu-list">

              {currentItems.map((item) => (

                <div
                  key={item.id}
                  className="menu-item"
                >

                  {item.glutenfree && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#365f73',
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: '15px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        zIndex: 2,
                      }}
                    >
                      Gluten Free
                    </div>
                  )}

                  {item.vegetariano && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#8bcf8b',
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: '15px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        zIndex: 2,
                      }}
                    >
                      Vegetariano
                    </div>
                  )}

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <h3>{item.name}</h3>

                  {item.description && (
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        marginBottom: '5px',
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#555',
                      marginBottom: '10px',
                    }}
                  >
                    {item.ingredientes}
                  </p>

                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#e95d53',
                    }}
                  >
                    $
                    {item.price.toLocaleString(
                      'es-CO'
                    )}
                  </p>

                  <button
                    className="btn-pedir"
                    onClick={() =>
                      handleOrder(item)
                    }
                  >
                    Agregar al carrito
                  </button>

                </div>

              ))}

            </div>

            {/* =================================================
                PAGINACIÓN
                ================================================= */}

            <div className="pagination">

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    className={`page-btn ${
                      currentPage === index + 1
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      handlePageChange(
                        index + 1
                      )
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

            </div>

          </div>
        )}

        {/* ===================================================
            ESPECIALIDADES
            =================================================== */}

        {!showMenu && (
          <section className="specialties-section">

            <h2>
              Nuestras especialidades
            </h2>

            <div className="specialty-carousel">

              <button
                type="button"
                className="specialty-arrow prev"
                onClick={prevSpecialty}
                disabled={specialtyIndex === 0}
                aria-label="Productos anteriores"
              >
                <img src="/img/Back.svg" alt="Atrás" />
              </button>

              <div className="specialty-viewport">

                <div
                  className="specialty-track"
                  style={{
                    transform: `translateX(calc(-${specialtyIndex} * (var(--specialty-step))))`,
                  }}
                >

                  {specialtyItems.map((item) => (

                    <div
                      className="specialty-slide"
                      key={item.id}
                    >

                      <div className="menu-item">

                        {item.glutenfree && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '15px',
                              right: '15px',
                              background: '#365f73',
                              color: 'white',
                              padding: '3px 10px',
                              borderRadius: '15px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              zIndex: 2,
                            }}
                          >
                            Gluten Free
                          </div>
                        )}

                        {item.vegetariano && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '15px',
                              right: '15px',
                              background: '#8bcf8b',
                              color: 'white',
                              padding: '3px 10px',
                              borderRadius: '15px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              zIndex: 2,
                            }}
                          >
                            Vegetariano
                          </div>
                        )}

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <h3>{item.name}</h3>

                        <p className="specialty-description">
                          {item.ingredientes}
                        </p>

                        <button
                          className="btn-pedir specialty-add-btn"
                          onClick={() =>
                            handleOrder(item)
                          }
                        >
                          Agregar
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              <button
                type="button"
                className="specialty-arrow next"
                onClick={nextSpecialty}
                disabled={
                  specialtyIndex >=
                  specialtyItems.length - 1
                }
                aria-label="Siguientes productos"
              >
                <img src="/img/Next.svg" alt="Siguiente" />
              </button>

            </div>

            <div className="specialty-dots">

              {specialtyItems.map(
                (item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`specialty-dot ${
                      specialtyIndex === index
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setSpecialtyIndex(index)
                    }
                    aria-label={`Ver ${item.name}`}
                  />
                )
              )}

            </div>

          </section>
        )}

        {/* ===================================================
            RESEÑAS
            =================================================== */}

        <section className="reviews-section">

  <h2>
    ¿Qué dicen nuestros clientes?
  </h2>

  <div className="reviews-grid">

    {/* RESEÑA 1 */}
    <div className="review-card">
      <p>
        Pedí por primera vez hoy y la verdad es que está muy rico y fresco. 
        Me olvidé de sacar foto, pero las piezas tienen un buen tamaño y vienen con una buena cantidad de salmón. 
        Recomiendo
      </p>

      <p
        style={{
          fontWeight: 'normal',
        }}
      >
        Vitória Monteiro

        <span style={{ float: 'right' }}>
          5.0 <span className="review-star">★</span>
        </span>
      </p>
    </div>


    {/* RESEÑA 2 */}
    <div className="review-card">
      <p>
        Siempre pido a domicilio, es el sushi más rico y más económico de Buenos Aires. 
        Siempre todo impecable!
      </p>

      <p
        style={{
          fontWeight: 'normal',
        }}
      >
        Fabiana Mata

        <span style={{ float: 'right' }}>
          5.0 <span className="review-star">★</span>
        </span>
      </p>
    </div>


    {/* RESEÑA 3 */}
    <div className="review-card">
      <p>
        Es EXCELENTE. Porque combina buena calidad, buen precio y entrega rápida y prolija.
Lo vengo pidiendo todos los domingos con mis compañeros de guardia hace ya tres meses y han cambiado de nombre pero nunca de calidad. Yo pido combos premium selection y full salmon y la verdad es que le ponen muy buena cantidad de salmón.
Consumo y realmente recomiendo
      </p>

      <p
        style={{
          fontWeight: 'normal',
        }}
      >
        Juli Perin

        <span style={{ float: 'right' }}>
          5.0 <span className="review-star">★</span>
        </span>
      </p>
    </div>

  </div>

  <a
    className="reviews-button"
    href={reviewLink}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => {
      if (reviewLink === '#') {
        e.preventDefault();
      }
    }}
  >
    Dejar mi reseña
  </a>

</section>

        {/* ===================================================
            UBICACIÓN
            =================================================== */}

        <section
          className="map-section"
          id="ubicacion"
        >

          <h2>
            ¿Dónde estamos ubicados?
          </h2>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Gorriti+3440,+C1172+ACB,+Buenos+Aires,+Argentina&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Rollsticio"
            />
          </div>

          <div className="location-card">

            <div
              className="location-icon"
              aria-hidden="true"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M20 10.2C20 15.2 12 21 12 21S4 15.2 4 10.2C4 6.22 7.58 3 12 3s8 3.22 8 7.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

              </svg>

            </div>

            <div className="location-divider" />

            <div className="location-info">

              <strong>
                Gorriti 3440, C1172 ACB,
              </strong>

              <span>
                Cdad. Autónoma de Buenos Aires, Argentina
              </span>

            </div>

          </div>

        </section>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <footer className="site-footer">

          <div className="footer-content">

            <div className="footer-col">

              <h4>Contacto</h4>

              <p>
                Tlf: 0200202003
              </p>

              <p>
                Correo: correo@gmail.com
              </p>

            </div>

            <div className="footer-col">

              <h4>Dirección</h4>

              <p>
                Gorriti 3440, C1172 ACB,
                <br />
                Ciudad Autónoma de Buenos Aires,
                Argentina.
              </p>

            </div>

            <div className="footer-col">

              <h4>Diseñado por</h4>

              <span className="footer-brand">

                <img
                  src="/img/Logo_footer.svg"
                  alt="Logo Rollsticio"
                />

              </span>

            </div>

          </div>

        </footer>

        {/* ===================================================
            MENSAJE TEMPORAL
            =================================================== */}

        {message && (
          <div className="toast">
            {message}
          </div>
        )}

      </div>
    </>
  );
};

export default LandingPage;