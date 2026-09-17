import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  /* =========================================================
     ESTADOS PRINCIPALES
     ========================================================= */

  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
     MENÚ COMPLETO (68 Productos Manuales)
     ========================================================= */

  const baseItems = [
    // 1-10: TUS PRODUCTOS ORIGINALES
    {
      id: 1,
      name: 'Nigiris de salmón rosado',
      price: 5000,
      image: '/img/Niguiris.png',
      ingredientes: '4 unidades de niguiris de arroz con topping de salmón rosado fresco.',
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
      ingredientes: '5 Philadelphia, 5 Osaka, 5 California. Incluye 2 sobres de soja, wasabi/jengibre y un par de palitos',
    },
    {
      id: 5,
      name: 'Oke 20 piezas',
      price: 19000,
      image: '/img/Oke.png',
      ingredientes: '5 Philadelphia, 5 Osaka, 5 California, 5 Niguiris de salmón. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
    },
    {
      id: 6,
      name: 'Nara 30 piezas',
      price: 0,
      image: '/img/Nara.JPG',
      ingredientes: '10 Philadelphia, 10 Osaka, 10 California. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
    },
    {
      id: 7,
      name: 'Moly Premium 30 piezas',
      price: 30000,
      image: '/img/Moly.png',
      ingredientes: '10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
    },
    {
      id: 8,
      name: 'Dundee 40 piezas',
      price: 0,
      image: '/img/Dundee.png',
      ingredientes: '10 Miami, 10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
    },
    {
      id: 9,
      name: 'Star 60 piezas',
      price: 65000,
      image: '/img/Aloha.jpeg', // Ajustar imagen
      ingredientes: '10 Kansas Crunch, 10 New York, 10 Islandia, 10 Osaka, 10 MakiCalifornia, 4 Niguiris, 3 Sashimis, 3 Geishas',
    },
    {
      id: 10,
      name: 'Aruba 15 piezas',
      price: 15000,
      image: '/img/Aruba.png',
      ingredientes: '5 Queen Roll, 5 Hanko Roll, 5 King Roll. Incluye sobres de soja, wasabi/jengibre y un par de palitos',
    },

    // 11-30: MÁS ROLLS Y TABLAS
    { id: 11, name: 'América 20 piezas', price: 22000, image: '/img/America.jpeg', ingredientes: '10 New York Roll, 10 King Roll. Incluye sobres de soja y un par de palitos' },
    { id: 12, name: 'Roma 30 piezas', price: 30000, image: '/img/Roma.jpeg', ingredientes: '10 Queen Roll, 5 Miami Roll, 5 Hanko Roll, 10 Maki California. Incluye un blíster y dos sobres de soja + dos pares de palitos' },
    { id: 13, name: 'Atlántica 60 piezas', price: 68000, image: '/img/Atlantica.jpeg', ingredientes: '10 New York Roll, 10 Hanko Roll, 10 King Roll, 10 Queen Roll,10 Maki California, 3 Tamago Roll, 3 Tokyo Roll, 4 Niguiris de salmón rosado.' },
    { id: 14, name: 'Paraíso 40 Piezas', price: 42000, image: '/img/Paraiso.jpeg', ingredientes: '10 New York Roll, 10 king roll, 10 Queen Roll, 3 Tamago Roll,3 Paraíso Roll, 4 Niguiris de salmón rosado.' },
    { id: 15, name: 'Oslo 15 piezas', price: 21000, image: '/img/Oslo.jpeg', ingredientes: '3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 2 Niguiris de salmónrosado y 2 Sashimis de salmón rosado. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).',  glutenfree: true },
    { id: 16, name: 'Malmö 20 piezas', price: 25000, image: '/img/Malmo.jpeg', ingredientes: '3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 5 Hanko Roll,2 Niguiris de salmón rosado y 2 Sashimis de salmón rosado. Incluye 3 sobres de soja y un par de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 17, name: 'Aurora 30 piezas', price: 37000, image: '/img/Aurora.jpeg', ingredientes: '5 Miami Roll, 5 Hanko Roll, 10 Islandia Roll, 3 Tokyo Roll,3 Tamago Roll, 2 Geishas de salmón rosado y 2 Niguiris de salmón rosado. Incluye un blíster y dos sobres de soja + dos pares de palitos ', glutenfree: true },
    { id: 18, name: 'Antártida 40 piezas', price: 48000, image: '/img/Antartida.jpeg', ingredientes: '10 Islandia Roll, 5 Miami Roll, 5 Hanko Roll, 6 Tokyo Roll, 6 Tamago Roll, 2 Sashimis de salmón rosado, 2 Geishas de salmón rosado y 4 Niguiris de salmón rosado.', glutenfree: true },
    { id: 19, name: 'Malvinas 60 piezas', price: 72000, image: '/img/Malvinas.jpeg', ingredientes: '10 New York Roll, 10 Hanko Roll, 10 Islandia Roll, 10 Miami Roll 6 Paraíso Roll, 6 Tamago Roll, 4 Niguiris de salmón rosado, 2 Sashimis de salmón rosado y 2 Geishas de salmón rosado.', glutenfree: true },
    { id: 20, name: 'Full Salmón 15 piezas', price: 19000, image: '/img/fullsalmon.JPG', ingredientes: '10 Philadelphia, 2 Niguiris, 2 Sashimis y 1 Geisha. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 21, name: 'Full Salmón 26 piezas', price: 33000, image: '/img/Fullsalmon26.JPG', ingredientes: '10 Philadelphia, 10 New York, 3 Niguiris, 2 Sashimis y 1 Geishas. Incluye un blíster y un sobre de soja + dos pares de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 22, name: 'Full Salmón 34 piezas', price: 40000, image: '/img/Fullsalmon34.JPG', ingredientes: '10 Islandia, 10 New York, 5 Philadelphia, 4 Niguiris, 3 Sashimis y 2 Geishas. Incluye un blíster y dos sobres de soja + dos pares de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 23, name: 'Full Salmón 46 piezas', price: 48000, image: '/img/Fullsalmon46.JPG', ingredientes: '10 Miami, 10 Islandia, 10 Suiza, 5 Philadelphia, 5 Niguiris, 3 Sashimis y 3 Geishas.', glutenfree: true },
    { id: 24, name: 'Full Salmón 60 piezas', price: 70000, image: '/img/Aloha.jpeg', ingredientes: '10 Miami, 10 Islandia, 10 Philadelphia, 10 Suiza, 10 Niguiris, 5 Sashimis y 5 Geishas.', glutenfree: true },
    { id: 25, name: 'Blinders Roll', price: 0, image: '/img/Blinders.jpeg', ingredientes: '10 piezas rellenas de langostinos rebozados en panko, queso philadelphia y topping de salmón ahumado. Incluye 2 sobres de soja y un par de palitos' },
    { id: 26, name: 'Peaky Roll', price: 0, image: '/img/Peaky.jpeg', ingredientes: '10 piezas rellenas de salmón ahumado, queso philadelphia y topping de palta. Incluye 2 sobres de soja y un par de palitos', glutenfree: true },
    { id: 27, name: 'Smoked 25 Piezas', price: 0, image: '/img/Smokedd.jpeg', ingredientes: '10 Peaky, 10 Blinders y 5 Niguiris Salmon Ahumado. Incluye un blíster y un sobre de soja + dos pares de palitos' },
    { id: 28, name: 'Tamago Protein', price: 8000, image: '/img/Tamago.JPG', ingredientes: '6 piezas envueltas en tamago (lámina de tortilla japonesa) + salmón rosado + queso crema. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 29, name: 'Paraíso Roll', price: 10000, image: '/img/Paraiso.JPG', ingredientes: '6 piezas rellenas de palta, queso crema y palmito, envueltas en láminas de tamago y fetas de salmón rosado con topping de crocante de batata y un hilo de salsa casera de maracuyá. Incluye 2 sobres de soja y un par de palitos (otras salsas se venden por separado).', glutenfree: true },
    { id: 30, name: 'New York Salad', price: 12000, image: '/img/Newyork.PNG', ingredientes: 'Arroz, salmón, queso philadelphia, palta, pepinos marinados y sésamo. Incluye 2 sobres de soja y un tenedor (otras salsas se venden por separado).', glutenfree: true },

    // 31-40: VEGETARIANOS Y GLUTEN FREE
    { id: 31, name: 'Veggie Roll Clásico 10u', price: 7500, image: '/img/Aloha.jpeg', ingredientes: 'Palta, pepino y zanahoria.', vegetariano: true },
    { id: 32, name: 'Green Roll 10u', price: 8000, image: '/img/Aloha.jpeg', ingredientes: 'Queso crema, tomates secos, rúcula y palta.', vegetariano: true },
    { id: 33, name: 'Mushroom Roll 10u', price: 8500, image: '/img/Aloha.jpeg', ingredientes: 'Champiñones salteados, queso crema y ciboulette.', vegetariano: true },
    { id: 34, name: 'Tabla Veggie 15 piezas', price: 11000, image: '/img/Aloha.jpeg', ingredientes: '5 Veggie Clásico, 5 Green, 5 Maki Pepino.', vegetariano: true },
    { id: 35, name: 'Tabla Veggie 30 piezas', price: 21000, image: '/img/Aloha.jpeg', ingredientes: 'Mix de nuestros mejores rolls vegetarianos.', vegetariano: true },
    { id: 36, name: 'Nigiris de Palta 4u', price: 4000, image: '/img/Aloha.jpeg', ingredientes: 'Arroz de sushi cubierto con fina lámina de palta fresca.', vegetariano: true, glutenfree: true },
    { id: 37, name: 'Sashimi Pez Blanco 4u', price: 8000, image: '/img/Aloha.jpeg', ingredientes: 'Rodajas de pez blanco de temporada fresco.', glutenfree: true },
    { id: 38, name: 'Sashimi Atún Rojo 4u', price: 11000, image: '/img/Aloha.jpeg', ingredientes: 'Rodajas premium de atún rojo.', glutenfree: true },
    { id: 39, name: 'Nigiris de Langostino 4u', price: 6000, image: '/img/Aloha.jpeg', ingredientes: 'Arroz de sushi con langostino cocido encima.', glutenfree: true },
    { id: 40, name: 'Nigiris de Atún Rojo 4u', price: 6500, image: '/img/Aloha.jpeg', ingredientes: 'Arroz de sushi con topping de atún rojo.', glutenfree: true },

    // 41-50: ENTRADAS Y CALIENTES
    { id: 41, name: 'Gyozas de Cerdo 5u', price: 6500, image: '/img/Aloha.jpeg', ingredientes: 'Empanaditas japonesas al vapor y selladas, rellenas de cerdo y repollo.' },
    { id: 42, name: 'Gyozas Vegetarianas 5u', price: 6000, image: '/img/Aloha.jpeg', ingredientes: 'Empanaditas japonesas rellenas de vegetales.', vegetariano: true },
    { id: 43, name: 'Harumaki de Carne 2u', price: 4500, image: '/img/Aloha.jpeg', ingredientes: 'Arrolladitos primavera de carne fritos, acompañados de salsa agridulce.' },
    { id: 44, name: 'Harumaki de Verdura 2u', price: 4000, image: '/img/Aloha.jpeg', ingredientes: 'Arrolladitos primavera de vegetales fritos.', vegetariano: true },
    { id: 45, name: 'Langostinos Panko 5u', price: 8500, image: '/img/Aloha.jpeg', ingredientes: 'Langostinos rebozados en panko fritos con salsa de mostaza y miel.' },
    { id: 46, name: 'Rabas a la Romana', price: 9000, image: '/img/Aloha.jpeg', ingredientes: 'Anillos de calamar rebozados y fritos, con gajos de limón.' },
    { id: 47, name: 'Bolas de Salmón Fritas 4u', price: 5500, image: '/img/Aloha.jpeg', ingredientes: 'Bolitas de salmón y queso crema empanizadas y fritas.' },
    { id: 48, name: 'Sopa Miso', price: 4500, image: '/img/Aloha.jpeg', ingredientes: 'Clásica sopa japonesa de pasta de soja, con tofu y verdeo.', vegetariano: true },
    { id: 49, name: 'Edamame', price: 5000, image: '/img/Aloha.jpeg', ingredientes: 'Vainas de soja cocidas al vapor con un toque de sal marina.', vegetariano: true, glutenfree: true },
    { id: 50, name: 'Ensalada Wakame', price: 6500, image: '/img/Aloha.jpeg', ingredientes: 'Ensalada tradicional de algas marinas condimentada con sésamo.', vegetariano: true },

    // 51-60: PLATOS PRINCIPALES Y WOKS
    { id: 51, name: 'Wok de Pollo', price: 11000, image: '/img/Aloha.jpeg', ingredientes: 'Fideos o arroz salteados al wok con pollo, vegetales y salsa de soja.' },
    { id: 52, name: 'Wok de Lomo', price: 12500, image: '/img/Aloha.jpeg', ingredientes: 'Fideos o arroz salteados al wok con tiras de lomo y vegetales.' },
    { id: 53, name: 'Wok de Langostinos', price: 13500, image: '/img/Aloha.jpeg', ingredientes: 'Fideos o arroz salteados con langostinos, vegetales y salsa de ostras.' },
    { id: 54, name: 'Wok Vegetariano', price: 9500, image: '/img/Aloha.jpeg', ingredientes: 'Vegetales de estación salteados al wok con fideos de arroz.', vegetariano: true },
    { id: 55, name: 'Yakisoba de Cerdo', price: 11500, image: '/img/Aloha.jpeg', ingredientes: 'Fideos japoneses salteados con vegetales, cerdo y salsa yakisoba.' },
    { id: 56, name: 'Yakimeshi Mixto', price: 12000, image: '/img/Aloha.jpeg', ingredientes: 'Clásico arroz frito japonés salteado con pollo, carne, huevo y vegetales.' },
    { id: 57, name: 'Curry Japonés con Pollo', price: 13000, image: '/img/Aloha.jpeg', ingredientes: 'Estofado de curry espeso con verduras y pollo, servido con arroz blanco.' },
    { id: 58, name: 'Cerdo Agridulce', price: 12500, image: '/img/Aloha.jpeg', ingredientes: 'Trozos de cerdo rebozados bañados en salsa agridulce, acompañado de arroz.' },
    { id: 59, name: 'Pollo Teriyaki', price: 11500, image: '/img/Aloha.jpeg', ingredientes: 'Pechuga de pollo glaseada con salsa teriyaki dulce sobre colchón de arroz.' },
    { id: 60, name: 'Salmón Teriyaki', price: 16000, image: '/img/Aloha.jpeg', ingredientes: 'Filet de salmón rosado con salsa teriyaki acompañado de vegetales salteados.' },

    // 61-68: BEBIDAS Y POSTRES
    { id: 61, name: 'Coca Cola 500ml', price: 1500, image: '/img/Aloha.jpeg', ingredientes: 'Línea regular o zero.' },
    { id: 62, name: 'Sprite 500ml', price: 1500, image: '/img/Aloha.jpeg', ingredientes: 'Línea regular o zero.' },
    { id: 63, name: 'Agua Mineral 500ml', price: 1200, image: '/img/Aloha.jpeg', ingredientes: 'Agua sin gas o con gas.' },
    { id: 64, name: 'Cerveza Stella Artois 1L', price: 3500, image: '/img/Aloha.jpeg', ingredientes: 'Cerveza rubia fría.' },
    { id: 65, name: 'Cerveza Patagonia 730ml', price: 4000, image: '/img/Aloha.jpeg', ingredientes: 'Amber Lager o Bohemian Pilsener.' },
    { id: 66, name: 'Dorayaki', price: 3500, image: '/img/Aloha.jpeg', ingredientes: 'Dulce tradicional japonés, dos bizcochos rellenos de anko (pasta de judías dulces).' },
    { id: 67, name: 'Mochi de Helado 2u', price: 4500, image: '/img/Aloha.jpeg', ingredientes: 'Masa de arroz glutinoso rellena de helado (consultar sabores).' },
    { id: 68, name: 'Helado de Matcha', price: 4000, image: '/img/Aloha.jpeg', ingredientes: 'Copa de helado artesanal sabor té verde.' },
  ];

  const menuCategorias = [
    {
      titulo: 'Menú Completo',
      items: baseItems,
    }
  ];

  /* =========================================================
     PREPARACIÓN DEL MENÚ
     ========================================================= */

  const sushiItems = menuCategorias.flatMap((cat) => cat.items);
  const specialtyItems = sushiItems.slice(0, 10); // Las especialidades siguen siendo las 10 primeras

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
     FUNCIONES AUXILIARES PARA EL RENDER
     ========================================================= */

  // Función para obtener si el nombre dice X piezas o X unidades (Para la etiqueta inferior de la tarjeta)
  const getPillText = (name) => {
    const match = name.match(/(\d+)\s*(piezas|u)/i);
    if (match) {
      return `${match[1]} ${match[2].toLowerCase() === 'u' ? 'Roles' : 'Piezas'}`;
    }
    return 'Porción';
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
<style>{`

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

  :root {
    --page-max-width: 100%;
    --page-side-space: 125px;
    --grid-gap: 40px;

    --background-main: #F2ECE3;
    --color-text: #2b3a3c;
    --color-gold: #d4a72c;
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
    outline: 2px solid var(--color-gold);
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
    border: 1.5px solid var(--color-gold);
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
    border: 1px solid var(--color-gold);
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
     ESTILOS COMUNES DE TARJETAS (MENÚ COMPLETO Y ESPECIALIDADES)
     ========================================================= */

  .menu-list {
    margin: 0 auto 30px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--grid-gap);
  }

  .menu-item {
    background: white;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid var(--color-gold);
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    word-break: break-word;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .menu-image-container {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
  }

  .menu-image-container img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    display: block;
    margin: 0;
  }

  .badge {
    position: absolute;
    top: 8px;
    right: 8px;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    z-index: 2;
  }

  .badge-blue {
    background: #4a90e2; 
  }

  .badge-green {
    background: #8bcf8b;
  }

  .menu-item h3 {
    width: 100%;
    margin: 0 0 6px 0;
    font-size: 1.15rem;
    color: #000;
    line-height: 1.25;
    text-align: left;
  }

  .menu-item-desc {
    font-size: 0.8rem;
    color: #666;
    margin: 0 0 5px 0;
    text-align: left;
    width: 100%;
  }

  .menu-item-ing {
    width: 100%;
    font-size: 0.8rem;
    color: #222;
    line-height: 1.4;
    margin: 0 0 10px 0;
    text-align: left;
    flex-grow: 1; /* Empuja el botón y los precios hacia abajo */
  }

  .menu-item-divider {
    width: 100%;
    height: 1.5px;
    background-color: #d4c1a0;
    border: none;
    margin: 10px 0;
  }

  .menu-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
  }

  .menu-item-pill {
    background-color: #d4c1a0;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .menu-item-price {
    font-weight: 900;
    font-size: 1.15rem;
    color: #000;
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
    font-family: 'Lato', sans-serif;
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
    flex: 1; /* Rellena el alto del slide */
    display: flex;
    flex-direction: column;
  }

  .specialty-slide .menu-image-container img {
    height: 150px;
  }

  .specialty-slide .menu-item-ing {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limita a 3 líneas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .specialty-slide .btn-pedir {
    font-family: 'Lato', sans-serif;
    min-height: 36px;
    padding: 7px 12px;
    font-size: 0.78rem;
    margin-top: auto; 
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

  .specialty-arrow:hover {
    background: transparent;
    transform: translateY(-50%) scale(1.1); /* Efecto zoom ligero */
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
    background: var(--color-gold);
  }

  /* =========================================================
     RESEÑAS
     ========================================================= */

  .reviews-section {
    font-family: 'Lato', sans-serif;
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
    color: var(--color-gold);
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
    font-family: 'Lato', sans-serif;
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
    font-family: 'Lato', sans-serif;
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
      padding: 0 45px; 
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

    .header-status.desktop-status {
      display: none;
    }
    
    .desktop-nav {
      display: none !important;
    }

    .main-header {
      background: white;
      border: 1px solid var(--color-gold);
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
      color: var(--color-gold);
      cursor: pointer;
      padding: 0;
      justify-self: start;
      align-items: center;
    }

    .header-logo {
      grid-area: logo;
      justify-self: center; 
    }

    .header-actions {
      grid-area: cart;
      justify-self: end;
    }

    .logo img {
      height: 24px;
      max-width: 145px;
    }

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

    .menu-btn {
      display: block;
      width: auto;
      margin: -20px auto 20px; 
      padding: 8px 24px;
      border-radius: 20px;
      background: #f1e7da;
      border: 1px solid var(--color-gold);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      position: relative;
      z-index: 10;
      font-size: 0.9rem;
      color: #1a1a1a;
      font-weight: 500;
    }

    .mobile-status-container {
      display: block;
      width: calc(100% - 30px);
      margin: 0 auto 20px;
    }

    .mobile-status-box {
      display: flex;
      align-items: center;
      justify-content: center; 
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

    .menu-item h3 {
      font-size: 1.05rem;
    }

    .menu-item-ing {
      font-size: 0.75rem; 
    }

    .specialties-section {
      width: 100% !important;
      max-width: 100% !important;
      background-color: #ffffff !important;
      padding: 25px 15px 25px !important; 
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
      padding: 0 40px !important; 
    }

    .specialty-track {
      --specialty-step: calc((100% + 12px) / 2);
      gap: 12px;
    }

    .specialty-slide {
      flex-basis: calc((100% - 12px) / 2);
    }

    .specialty-slide .menu-image-container img {
      height: 135px;
    }

    .specialty-slide .menu-item h3 {
      font-size: 0.9rem;
    }

    .specialty-arrow {
      display: flex; 
    }

    .specialty-arrow img {
      width: 30px; 
      height: 30px;
    }

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

    .specialty-slide .menu-image-container img {
      height: 160px;
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

    .menu-image-container img {
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

                    <div className="menu-image-container">
                      {item.glutenfree && (
                        <span className="badge badge-blue">
                          Gluten Free
                        </span>
                      )}

                      {item.vegetariano && (
                        <span className="badge badge-green">
                          Vegetariano
                        </span>
                      )}

                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <h3>{item.name}</h3>

                    {item.description && (
                      <p className="menu-item-desc">
                        {item.description}
                      </p>
                    )}

                    <p className="menu-item-ing">
                      {item.ingredientes}
                    </p>
                    
                    <hr className="menu-item-divider" />

                    <div className="menu-item-bottom">
                      <span className="menu-item-pill">
                        {getPillText(item.name)}
                      </span>
                      <span className="menu-item-price">
                        ${item.price.toLocaleString('es-CO')}
                      </span>
                    </div>

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

                {specialtyIndex > 0 && (
                  <button
                    type="button"
                    className="specialty-arrow prev"
                    onClick={prevSpecialty}
                    aria-label="Productos anteriores"
                  >
                    <img src="/img/Back.svg" alt="Atrás" />
                  </button>
                )}

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

                          <div className="menu-image-container">
                            {item.glutenfree && (
                              <span className="badge badge-blue">
                                Gluten Free
                              </span>
                            )}

                            {item.vegetariano && (
                              <span className="badge badge-green">
                                Vegetariano
                              </span>
                            )}

                            <img
                              src={item.image}
                              alt={item.name}
                            />
                          </div>

                          <h3>{item.name}</h3>

                          <p className="menu-item-ing">
                            {item.ingredientes}
                          </p>
                          
                          <hr className="menu-item-divider" />
                          
                          <div className="menu-item-bottom">
                            <span className="menu-item-pill">
                              {getPillText(item.name)}
                            </span>
                            <span className="menu-item-price">
                              ${item.price.toLocaleString('es-CO')}
                            </span>
                          </div>

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

                {specialtyIndex < specialtyItems.length - 1 && (
                  <button
                    type="button"
                    className="specialty-arrow next"
                    onClick={nextSpecialty}
                    aria-label="Siguientes productos"
                  >
                    <img src="/img/Next.svg" alt="Siguiente" />
                  </button>
                )}

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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    fill="currentColor"
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