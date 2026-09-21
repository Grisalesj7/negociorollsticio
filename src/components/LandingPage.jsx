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
     PAGINACIÓN Y FILTROS
     ========================================================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const itemsPerPage = 10;

  // Lista con tus nuevas categorías reales
  const categorias = [
    'Todos',
    'Entradas',
    'Tablas Variadas',
    'Combos Signature',
    'Full Salmón Signature',
    'Full Salmón Clásicas',
    'Salmón Ahumado',
    'Rolls Sin Algas',
    'Salads & Pokes',
    'Nuestros Rolls',
    'Veggie & Vegan',
    'Promos 20 Piezas',
    'Salsas & Extras'
  ];

  /* =========================================================
     MENÚ COMPLETO (Base de datos con Categorías y Etiquetas)
     ========================================================= */

  const baseItems = [
    // ---------------- ENTRADAS ----------------
    { id: 1, categoria: 'Entradas', name: 'Nigiris de salmón rosado', price: 5000, image: '/img/Niguiris.png', ingredientes: '4 unidades de niguiris de arroz con topping de salmón rosado fresco.' },
    { id: 2, categoria: 'Entradas', name: 'Sashimis de salmón rosado', price: 9000, image: '/img/Sashimis.png', ingredientes: '4 unidades de rodajas únicas de salmón rosado.' },
    { id: 3, categoria: 'Entradas', name: 'Geishas de salmón rosado', price: 7000, image: '/img/Geishas.png', ingredientes: '4 unidades rellenas de queso crema y palta.' },

    // ---------------- TABLAS VARIADAS ----------------
    { id: 4, categoria: 'Tablas Variadas', name: 'Yagi 15 piezas', price: 13000, image: '/img/Yagi.png', ingredientes: '5 Philadelphia, 5 Osaka, 5 California. Incluye 2 sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 5, categoria: 'Tablas Variadas', name: 'Oke 20 piezas', price: 19000, image: '/img/Oke.png', ingredientes: '5 Philadelphia, 5 Osaka, 5 California, 5 Niguiris de salmón. Incluye sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 6, categoria: 'Tablas Variadas', name: 'Nara 30 piezas', price: 0, image: '/img/Nara.JPG', ingredientes: '10 Philadelphia, 10 Osaka, 10 California. Incluye sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 7, categoria: 'Tablas Variadas', name: 'Moly Premium 30 piezas', price: 30000, image: '/img/Moly.png', ingredientes: '10 Boston, 10 Buenos Aires, 10 MakiCalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 8, categoria: 'Tablas Variadas', name: 'Dundee 40 piezas', price: 0, image: '/img/Dundee.png', ingredientes: '10 Miami, 10 Boston, 10 Buenos Aires, 10 Makicalifornia. Incluye sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 9, categoria: 'Tablas Variadas', name: 'Star 60 piezas', price: 65000, image: '/img/faltaaqui', ingredientes: '10 Kansas Crunch, 10 New York, 10 Islandia, 10 Osaka, 10 Makicalifornia, 4 Niguiris, 3 Sashimis, 3 Geishas.' },

    // ---------------- COMBOS SIGNATURE ----------------
    { id: 10, categoria: 'Combos Signature', name: 'Aruba 15 piezas', price: 15000, image: '/img/Aruba.png', ingredientes: '5 Queen Roll, 5 Hanko Roll, 5 King Roll. Incluye sobres de soja, wasabi/jengibre y un par de palitos.' },
    { id: 11, categoria: 'Combos Signature', name: 'América 20 piezas', price: 22000, image: '/img/America.jpeg', ingredientes: '10 New York Roll, 10 King Roll. Incluye sobres de soja y un par de palitos.' },
    { id: 12, categoria: 'Combos Signature', name: 'Roma 30 piezas', price: 30000, image: '/img/Roma.jpeg', ingredientes: '10 Queen Roll, 5 Miami Roll, 5 Hanko Roll, 10 Maki California. Incluye un blíster y dos sobres de soja + dos pares de palitos.' },
    { id: 13, categoria: 'Combos Signature', name: 'Atlántica 60 piezas', price: 68000, image: '/img/Atlantica.jpeg', ingredientes: '10 New York Roll, 10 Hanko Roll, 10 King Roll, 10 Queen Roll, 10 Maki California, 3 Tamago Roll, 3 Tokyo Roll, 4 Niguiris de salmón rosado.' },
    { id: 14, categoria: 'Combos Signature', name: 'Paraíso 40 Piezas', price: 42000, image: '/img/Paraiso.jpeg', ingredientes: '10 New York Roll, 10 king roll, 10 Queen Roll, 3 Tamago Roll, 3 Paraíso Roll, 4 Niguiris de salmón rosado.' },

    // ---------------- FULL SALMÓN SIGNATURE ----------------
    { id: 15, categoria: 'Full Salmón Signature', name: 'Oslo 15 piezas', price: 21000, image: '/img/Oslo.jpeg', ingredientes: '3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 2 Niguiris de salmón rosado y 2 Sashimis de salmón rosado. Incluye 2 sobres de soja y un par de palitos.', glutenfree: true },
    { id: 16, categoria: 'Full Salmón Signature', name: 'Malmö 20 piezas', price: 25000, image: '/img/Malmo.jpeg', ingredientes: '3 Tokyo Roll, 3 Tamago Roll, 5 Miami Roll, 5 Hanko Roll, 2 Niguiris de salmón rosado y 2 Sashimis de salmón rosado. Incluye 3 sobres de soja y un par de palitos.', glutenfree: true },
    { id: 17, categoria: 'Full Salmón Signature', name: 'Aurora 30 piezas', price: 37000, image: '/img/Aurora.jpeg', ingredientes: '5 Miami Roll, 5 Hanko Roll, 10 Islandia Roll, 3 Tokyo Roll, 3 Tamago Roll, 2 Geishas de salmón rosado y 2 Niguiris de salmón rosado. Incluye un blíster y dos sobres de soja + dos pares de palitos.', glutenfree: true },
    { id: 18, categoria: 'Full Salmón Signature', name: 'Antártida 40 piezas', price: 48000, image: '/img/Antartida.jpeg', ingredientes: '10 Islandia Roll, 5 Miami Roll, 5 Hanko Roll, 6 Tokyo Roll, 6 Tamago Roll, 2 Sashimis de salmón rosado, 2 Geishas de salmón rosado y 4 Niguiris de salmón rosado.', glutenfree: true },
    { id: 19, categoria: 'Full Salmón Signature', name: 'Malvinas 60 piezas', price: 72000, image: '/img/Malvinas.jpeg', ingredientes: '10 New York Roll, 10 Hanko Roll, 10 Islandia Roll, 10 Miami Roll 6 Paraíso Roll, 6 Tamago Roll, 4 Niguiris de salmón rosado, 2 Sashimis de salmón rosado y 2 Geishas de salmón rosado.', glutenfree: true },

    // ---------------- FULL SALMÓN CLÁSICAS ----------------
    { id: 20, categoria: 'Full Salmón Clásicas', name: 'Full Salmón 15 piezas', price: 19000, image: '/img/fullsalmon.JPG', ingredientes: '10 Philadelphia, 2 Niguiris, 2 Sashimis y 1 Geisha. Incluye 2 sobres de soja y un par de palitos.', glutenfree: true },
    { id: 21, categoria: 'Full Salmón Clásicas', name: 'Full Salmón 26 piezas', price: 33000, image: '/img/Fullsalmon26.JPG', ingredientes: '10 Philadelphia, 10 New York, 3 Niguiris, 2 Sashimis y 1 Geishas. Incluye un blíster y un sobre de soja + dos pares de palitos.', glutenfree: true },
    { id: 22, categoria: 'Full Salmón Clásicas', name: 'Full Salmón 34 piezas', price: 40000, image: '/img/Fullsalmon34.JPG', ingredientes: '10 Islandia, 10 New York, 5 Philadelphia, 4 Niguiris, 3 Sashimis y 2 Geishas. Incluye un blíster y dos sobres de soja + dos pares de palitos.', glutenfree: true },
    { id: 23, categoria: 'Full Salmón Clásicas', name: 'Full Salmón 46 piezas', price: 48000, image: '/img/Fullsalmon46.JPG', ingredientes: '10 Miami, 10 Islandia, 10 Suiza, 5 Philadelphia, 5 Niguiris, 3 Sashimis y 3 Geishas.', glutenfree: true },
    { id: 24, categoria: 'Full Salmón Clásicas', name: 'Full Salmón 60 piezas', price: 70000, image: '/img/fullsalmon.JPG', ingredientes: '10 Miami, 10 Islandia, 10 Philadelphia, 10 Suiza, 10 Niguiris, 5 Sashimis y 5 Geishas.', glutenfree: true },

    // ---------------- SALMÓN AHUMADO ----------------
    { id: 25, categoria: 'Salmón Ahumado', name: 'Blinders Roll', price: 0, image: '/img/Blinders.jpeg', ingredientes: '10 piezas rellenas de langostinos rebozados en panko, queso philadelphia y topping de salmón ahumado. Incluye 2 sobres de soja y un par de palitos.' },
    { id: 26, categoria: 'Salmón Ahumado', name: 'Peaky Roll', price: 0, image: '/img/Peaky.jpeg', ingredientes: '10 piezas rellenas de salmón ahumado, queso philadelphia y topping de palta. Incluye 2 sobres de soja y un par de palitos.', glutenfree: true },
    { id: 27, categoria: 'Salmón Ahumado', name: 'Smoked 25 Piezas', price: 0, image: '/img/Smokedd.jpeg', ingredientes: '10 Peaky, 10 Blinders y 5 Niguiris Salmon Ahumado. Incluye un blíster y un sobre de soja + dos pares de palitos.' },

    // ---------------- ROLLS SIN ALGAS ----------------
    { id: 28, categoria: 'Rolls Sin Algas', name: 'Tamago Protein', price: 8000, image: '/img/Tamago.JPG', ingredientes: '6 piezas envueltas en tamago (lámina de tortilla japonesa) + salmón rosado + queso crema. Incluye 2 sobres de soja y un par de palitos.', glutenfree: true },
    { id: 29, categoria: 'Rolls Sin Algas', name: 'Paraíso Roll', price: 10000, image: '/img/Paraiso.jpeg', ingredientes: '6 piezas rellenas de palta, queso crema y palmito, envueltas en láminas de tamago y fetas de salmón rosado con topping de crocante de batata y un hilo de salsa casera de maracuyá.', glutenfree: true },

    // ---------------- SALADS & POKES ----------------
    { id: 30, categoria: 'Salads & Pokes', name: 'New York Salad', price: 12000, image: '/img/Newyork.png', ingredientes: 'Arroz, salmón, queso philadelphia, palta, pepinos marinados y sésamo. Incluye 2 sobres de soja y un tenedor.', glutenfree: true },
    { id: 31, categoria: 'Salads & Pokes', name: 'California Salad', price: 11000, image: '/img/California.jpeg', ingredientes: 'Arroz, kanikama, queso philadelphia, palta, pepinos marinados, sésamo. Incluye 2 sobres de soja y un tenedor.', glutenfree: true },
    { id: 32, categoria: 'Salads & Pokes', name: 'Kansas Salad', price: 11000, image: '/img/Kansas.png', ingredientes: 'Arroz, langostinos rebozados, queso philadelphia, palta, pepinos marinados y sésamo. Incluye 2 sobres de soja y un tenedor.' },
    { id: 33, categoria: 'Salads & Pokes', name: 'Aloha Poke', price: 11000, image: '/img/Aloha.jpeg', ingredientes: 'Base de arroz, salmón fresco, mango, queso crema, pepinos marinados. Incluye 2 sobres de soja y un tenedor.', glutenfree: true },
    { id: 34, categoria: 'Salads & Pokes', name: 'Veggie Poke', price: 11000, image: '/img/Veggie.jpeg', ingredientes: 'Base a elección (Arroz sushi, rúcula o lechuga), garbanzos cocidos, maíz crocante, bastones de zanahorias marinadas, rúcula, palta y pepinos marinados.', vegetariano: true },
    { id: 35, categoria: 'Salads & Pokes', name: 'Teriyaki Poke', price: 10000, image: '/img/Teriyake.jpeg', ingredientes: 'Base de arroz sushi, pollo teriyaki de la casa, queso crema, palta, maíz crocante, tiras de pepino marinado en aceite de sésamo.' },
    { id: 36, categoria: 'Salads & Pokes', name: 'Hawaii Poke', price: 0, image: '/img/Hawai.png', ingredientes: 'Base de arroz sushi, queso crema, salmón ahumado, mango en cubos y maíz crocante, bañado en semillas de sésamo.', glutenfree: true },
    { id: 37, categoria: 'Salads & Pokes', name: 'Tartar Poke', price: 10000, image: '/img/Tartar.jpeg', ingredientes: 'Base de arroz de sushi y tartar de salmón rosado con ingredientes especiales de la casa, palta, queso crema, maíz tostado, tiras de pepino.' },
    { id: 38, categoria: 'Salads & Pokes', name: 'Paté de Salmón Jet Poke', price: 9000, image: '/img/Paté.jpeg', ingredientes: 'Paté de salmón cocido con queso crema, maíz crocante, palta, pepinos marinados y bañado en semillas de sésamo, con base de arroz.' },

    // ---------------- NUESTROS ROLLS ----------------
    { id: 39, categoria: 'Nuestros Rolls', name: 'Queen Roll', price: 0, image: '/img/faltante', ingredientes: '10 piezas rellenas de langostinos rebozados con queso crema, palta y topping de salmón ahumado, bañado en crocante de batata, sésamo tostado y salsa delimiel.' },
    { id: 40, categoria: 'Nuestros Rolls', name: 'Buenos Aires Roll', price: 10000, image: '/img/Buenosaires.JPG', ingredientes: '10 piezas rellenas de langostinos rebozados, queso crema, palta y topping de salmón con sésamo.' },
    { id: 41, categoria: 'Nuestros Rolls', name: 'Miami Roll', price: 10000, image: '/img/Miami.JPG', ingredientes: '10 piezas rellenas de salmón, queso crema y topping de palta con sésamo.', glutenfree: true },
    { id: 42, categoria: 'Nuestros Rolls', name: 'Hanko Roll', price: 11000, image: '/img/Hanko.jpeg', ingredientes: '10 piezas rellenas de salmón rosado, queso crema, topping de mango y tiras de pepino marinadas en aceite de sésamo, bañado en sésamo tostado.', glutenfree: true },
    { id: 43, categoria: 'Nuestros Rolls', name: 'Islandia Roll', price: 10000, image: '/img/Islandia.JPG', ingredientes: '10 piezas rellenas de Palta, queso crema y topping de salmón con sésamo.', glutenfree: true },
    { id: 44, categoria: 'Nuestros Rolls', name: 'Phila Hot', price: 10000, image: '/img/Philahot.JPG', ingredientes: '10 piezas tempurizadas rellenas de salmón y queso philadelphia.' },
    { id: 45, categoria: 'Nuestros Rolls', name: 'King Roll', price: 11000, image: '/img/KingRoll.jpeg', ingredientes: '10 piezas rellenas de langostinos rebozados, queso crema y topping de palta, bañado en tartar de salmón Oh Qué y maíz crocante triturado.' },
    { id: 46, categoria: 'Nuestros Rolls', name: 'Boston Roll', price: 10000, image: '/img/Boston.JPG', ingredientes: '10 piezas rellenas de Salmón, queso crema y topping de mango con sésamo.', glutenfree: true },
    { id: 47, categoria: 'Nuestros Rolls', name: 'Philadelphia roll', price: 0, image: '/img/Philadelphiaroll.JPG', ingredientes: '10 piezas rellenas de salmón, queso crema y topping de sésamo.', glutenfree: true },
    { id: 48, categoria: 'Nuestros Rolls', name: 'Osaka roll', price: 9000, image: '/img/Osaka.JPG', ingredientes: '10 piezas rellenas de langostino rebozados, queso crema, topping de palta y sésamo.' },
    { id: 49, categoria: 'Nuestros Rolls', name: 'New York roll', price: 0, image: '/img/Newyorkroll1.JPG', ingredientes: '10 piezas rellenas de salmón, queso crema, palta y topping de sésamo.', glutenfree: true },
    { id: 50, categoria: 'Nuestros Rolls', name: 'California Roll', price: 9000, image: '/img/California10.JPG', ingredientes: '10 piezas rellenas de kanikama, queso crema, palta y topping de sésamo.', glutenfree: true },
    { id: 51, categoria: 'Nuestros Rolls', name: 'New York Hot', price: 10000, image: '/img/Newyorkhot.JPG', ingredientes: '10 piezas tempurizadas rellenas de salmón, queso crema y palta.' },
    { id: 52, categoria: 'Nuestros Rolls', name: 'Suiza roll', price: 11000, image: '/img/Suizaroll.JPG', ingredientes: '10 piezas rellenas de salmón y palta, con topping de sésamo.', glutenfree: true },
    { id: 53, categoria: 'Nuestros Rolls', name: 'Kansas Crunch Roll', price: 11000, image: '/img/Kansascrunch.jpeg', ingredientes: '10 piezas rebozadas en panko, rellenas de langostinos rebozados, queso crema y palta.' },
    { id: 54, categoria: 'Nuestros Rolls', name: 'Jet Roll', price: 7500, image: '/img/JETROLL.png', ingredientes: '10 piezas, rellenas de mix de pasta de salmón cocido con queso crema y ciboulette, con topping de palta y bañado en salsa teriyaki.' },

    // ---------------- VEGGIE & VEGAN ----------------
    { id: 55, categoria: 'Veggie & Vegan', name: 'Vegan roll', price: 9000, image: '/img/VeggieRoll.jpeg', ingredientes: '10 piezas cubiertas de alga y rellenas de rúcula, palta, bastones de pepino y zanahoria marinada.', vegetariano: true },
    { id: 56, categoria: 'Veggie & Vegan', name: 'Veggie roll', price: 9000, image: '/img/VeggieRoll.jpeg', ingredientes: '10 piezas rellenas de queso crema, zanahoria marinada, morrón en tiras finas y palta, con topping de sésamo.', vegetariano: true },
    { id: 57, categoria: 'Veggie & Vegan', name: 'Live Roll', price: 9000, image: '/img/VeganRoll.jpeg', ingredientes: '10 piezas rellenas de zanahoria marinada, palta y rúcula, con topping de mango y tiras de pepino marinado.', vegetariano: true },

    // ---------------- PROMOS 20 PIEZAS ----------------
    { id: 58, categoria: 'Promos 20 Piezas', name: 'New York roll 20p', price: 0, image: '/img/Newyork.png', ingredientes: '20 piezas rellenas de salmón, queso crema, palta y topping de sésamo.' },
    { id: 59, categoria: 'Promos 20 Piezas', name: 'Phila Hot roll 20p', price: 19000, image: '/img/Philahot.JPG', ingredientes: '20 piezas tempurizadas rellenas de salmón y queso crema.' },
    { id: 60, categoria: 'Promos 20 Piezas', name: 'New York Hot roll 20p', price: 21000, image: '/img/Newyorkhot.JPG', ingredientes: '20 piezas tempurizadas rellenas de salmón, queso crema, palta y topping de sésamo.' },
    { id: 61, categoria: 'Promos 20 Piezas', name: 'Kansas roll 20p', price: 16000, image: '/img/Kansasroll.JPG', ingredientes: '20 piezas rellenas de langostinos rebozado en panko, queso crema, palta y topping de sésamo.' },
    { id: 62, categoria: 'Promos 20 Piezas', name: 'California roll 20p', price: 16000, image: '/img/California.jpeg', ingredientes: '20 piezas rellenas de kanikama, queso crema, palta y topping de sésamo.', glutenfree: true },
    { id: 63, categoria: 'Promos 20 Piezas', name: 'Suiza roll 20p', price: 18000, image: '/img/Suizaroll.JPG', ingredientes: '20 piezas rellenas de salmón, palta y topping de sésamo.', glutenfree: true },
    { id: 64, categoria: 'Promos 20 Piezas', name: 'Philadelphia roll 20p', price: 0, image: '/img/Philadelphiaroll.JPG', ingredientes: '20 piezas rellenas de salmón, queso crema y topping de sésamo.' },

    // ---------------- SALSAS & EXTRAS ----------------
    { id: 65, categoria: 'Salsas & Extras', name: 'Salsa Soja', price: 1500, image: '/img/SALSASOJA.png', ingredientes: '40cc de salsa de soja tradicional.' },
    { id: 66, categoria: 'Salsas & Extras', name: 'Salsa Buenos Aires', price: 1500, image: '/img/SALSABUENOSAIRES.png', ingredientes: '40cc de salsa teriyaki, hecha en casa con lluvia de sésamo.' },
    { id: 67, categoria: 'Salsas & Extras', name: 'Salsa Maracuyá', price: 1500, image: '/img/SALSAMARACUYA.png', ingredientes: '40cc de salsa dulce de maracuyá, hecha en casa.' },
    { id: 68, categoria: 'Salsas & Extras', name: 'Salsa Teriyaki', price: 1500, image: '/img/SALSASOJA.png', ingredientes: '40 cc de salsa dulce a base de soja.' },
  ];

  /* =========================================================
     PREPARACIÓN DEL MENÚ Y FILTRADO
     ========================================================= */

  const specialtyItems = baseItems.slice(0, 10);

  const itemsFiltrados = baseItems.filter((item) => {
    if (categoriaActiva === 'Todos') return true;
    return item.categoria === categoriaActiva;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemsFiltrados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCategoriaChange = (categoria) => {
    setCategoriaActiva(categoria);
    setCurrentPage(1);
  };

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
      `https://wa.me/573002070981?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  /* =========================================================
     HORARIO
     ========================================================= */

  const currentHour = new Date().getHours();
  const isShopOpen = currentHour >= 17 && currentHour < 23;

  /* =========================================================
     FUNCIONES AUXILIARES PARA EL RENDER
     ========================================================= */

  const getPillText = (name) => {
    const match = name.match(/(\d+)\s*(piezas|u|p)/i);
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

  .main-header,
  .desktop-nav,
  .hero-container,
  .menu-list,
  .checkout-container,
  .map-section,
  .specialties-section {
    width: calc(100% - (var(--page-side-space) * 2));
    max-width: 100%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .reviews-section,
  .site-footer {
    width: 100%;
    max-width: 100%;
  }

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
    font-family: 'Lato', sans-serif;
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
    font-family: 'Lato', sans-serif !important;
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

  padding: 8px 16px;

  border-radius: 24px;

  font-size: 0.95rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 5px;

  z-index: 6;
}

  .hero-title {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);

  color: white;

  padding: 0;

  font-family: 'Playfair Display', serif;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;

  text-align: center;

  text-shadow:
    0 2px 5px rgba(0, 0, 0, 0.85),
    0 3px 10px rgba(0, 0, 0, 0.55);

  width: 90%;
  max-width: 90%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* IMPORTANTE: queda encima del degradado */
  z-index: 4;
}

  .carousel-dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  right: auto;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  z-index: 5;
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
    font-family: 'Lato', sans-serif;
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
    flex-grow: 1;
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
    background: #153b40;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    width: 100%;
    transition: 0.2s;
    margin-top: auto;
    min-height: 44px;
  }

  .btn-pedir:hover {
    background: #1c4a50;
  }

  /* ESTILOS DE FILTROS UNIFICADOS (PC Y MÓVIL) */
  .filters-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px;
    margin: 0 auto 35px;
    gap: 12px;
    position: relative;
    padding: 0 15px;
  }

  .select-pill {
    flex: 1;
    border: 1.5px solid var(--color-gold);
    border-radius: 25px;
    padding: 12px 20px;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: 1.05rem;
    font-weight: bold;
    color: var(--color-text);
    background: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: background 0.2s ease;
  }

  .select-circle {
    width: 48px;
    height: 48px;
    border: 1.5px solid var(--color-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: background 0.2s ease;
  }

  .real-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }
  
  .filters-wrapper:hover .select-pill,
  .filters-wrapper:hover .select-circle {
    background: #fdfaf5;
  }

  .specialties-section {
    font-family: 'Lato', sans-serif;
    padding: 40px 30px;
    background-color: #ffffff;
    border-radius: 15px; 
    box-sizing: border-box;
    margin: 20px auto 40px; 
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
    padding: 0 55px;
    box-sizing: border-box;
  }

  .specialty-viewport {
    width: 100%;
    overflow: hidden;
  }

  .specialty-track {
    --specialty-step: calc((100% + var(--grid-gap)) / 3);
    display: flex;
    gap: var(--grid-gap);
    transition: transform 0.45s ease;
    will-change: transform;
    align-items: stretch;
  }

  .specialty-slide {
    flex: 0 0 calc((100% - (var(--grid-gap) * 2)) / 3);
    min-width: 0;
    box-sizing: border-box;
    display: flex; 
    height: auto;
  }

  .specialty-slide .menu-item {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .specialty-slide .menu-image-container img {
    height: 150px;
  }

  .specialty-slide .menu-item-ing {
    display: -webkit-box;
    -webkit-line-clamp: 3;
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

  .specialty-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: transparent;
    border: none;
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
    filter: brightness(0);
  }

  .specialty-arrow:hover {
    background: transparent;
    transform: translateY(-50%) scale(1.1);
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
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d2a735;
    flex-shrink: 0;
  }

  .location-icon svg {
    width: auto;
    height: 100%;
    display: block;
  }

  .location-divider {
    width: 1.5px;
    height: 52px;
    background: #d2a735;
    margin: 0 25px 0 50px;
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
    font-family: 'Lato', sans-serif;
  }

  .page-btn {
    padding: 8px 14px;
    min-width: 40px;
    background: white;
    border: 1px solid  #d4a72c;
    color: var(--color-green);
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    transition: 0.2s;
  }

  .page-btn:hover {
    background: #1c4a50;
    color: white;
  }

  .page-btn.active {
    background: #153b40;
    color: white;
  }

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
    font-family: 'Lato', sans-serif;
  }

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
      /* Grid ajustado a petición: remueve columna de hamburguesa, centra logo */
      grid-template-columns: 1fr auto 1fr;
      grid-template-areas: ". logo cart";
      gap: 12px;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }

    .mobile-menu-toggle {
      display: flex;
      grid-area: menu;
      background: white;
      border: 1.5px solid var(--color-gold);
      color: var(--color-gold);
      cursor: pointer;
      padding: 0;
      width: 46px;
      height: 46px;
      border-radius: 12px;
      justify-self: start;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
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
      margin: 0 auto 0;
      aspect-ratio: 4 / 3;
      min-height: 230px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .hero-container::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      height: 42%;

      z-index: 2;
      pointer-events: none;

      background: linear-gradient(
        to bottom,
        rgba(242, 236, 227, 0) 0%,
        rgba(242, 236, 227, 0.10) 20%,
        rgba(242, 236, 227, 0.45) 50%,
        rgba(242, 236, 227, 0.85) 78%,
        #F2ECE3 100%
      );
    }

    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
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
      z-index: 4;
    }

    .carousel-dots {
      bottom: 13px;
      right: 10px;
      z-index: 5;
    }

    .menu-btn {
      display: block;

      width: calc(100% - 110px);
      max-width: 305px;
      min-width: 250px;

      height: 60px;

      margin: -30px auto 22px;

      padding: 0 24px;

      border-radius: 32px;

      background: #F2ECE3;

      border: 1.5px solid var(--color-gold);

      box-shadow:
        0 4px 7px rgba(0, 0, 0, 0.18),
        0 1px 2px rgba(212, 167, 44, 0.25);

      position: relative;
      z-index: 10;

      font-family: 'Lato', sans-serif;
      font-size: 1.05rem;
      font-weight: 500;

      color: #1a1a1a;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .menu-btn:active {
      transform: scale(0.98);
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
      font-family: 'Lato', sans-serif;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      background-color: #4b9e4f;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* AJUSTE FILTROS MÓVIL */
    .filters-wrapper {
      width: calc(100% - 30px);
      max-width: 320px;
      margin: 0 auto 25px;
    }

    .select-pill {
      padding: 12px 15px;
      font-size: 1rem;
      font-weight: 500;
      background: transparent;
    }

    .select-circle {
      width: 44px;
      height: 44px;
      background: transparent;
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

    /* =========================================================
       CORRECCIÓN ESPECIALIDADES MÓVIL (Alineación y Contenedores)
       ========================================================= */
    .specialties-section {
      width: calc(100% - 30px) !important;
      max-width: 100% !important;
      background-color: #ffffff !important;
      padding: 20px 10px !important; 
      margin: 15px auto 25px !important;
      border-radius: 12px;
    }

    .specialties-section h2 {
      margin: 0 0 14px;
      font-size: 1.15rem;
      text-align: left;
      color: #16445a;
      padding-left: 5px;
    }

    .specialty-carousel {
      padding: 0 32px !important; 
    }

    .specialty-track {
      --specialty-step: 100%;
      gap: 0;
    }

    .specialty-slide {
      flex-basis: 100%;
      padding: 0;
    }

    .specialty-slide .menu-item {
      padding: 12px;
      border-radius: 8px;
      box-sizing: border-box;
      height: 100%;
      justify-content: space-between;
    }

    .specialty-slide .menu-image-container {
      margin-bottom: 8px;
    }

    .specialty-slide .menu-image-container img {
      height: 160px;
      object-fit: cover;
      border-radius: 6px;
    }

    .specialty-slide .menu-item h3 {
      font-size: 0.98rem;
      min-height: auto;
      margin-bottom: 4px;
      line-height: 1.2;
    }

    .specialty-slide .menu-item-ing {
      font-size: 0.75rem;
      min-height: auto;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .specialty-slide .menu-item-divider {
      margin: 6px 0;
    }

    .specialty-slide .menu-item-bottom {
      margin-top: 0;
      margin-bottom: 8px;
    }

    .specialty-slide .menu-item-pill {
      font-size: 0.7rem;
      padding: 3px 8px;
    }

    .specialty-slide .menu-item-price {
      font-size: 1.05rem;
    }

    .specialty-slide .btn-pedir {
      font-family: 'Lato', sans-serif;
      min-height: 36px;
      padding: 8px 10px;
      font-size: 0.8rem;
      margin-top: 0;
    }

    .specialty-arrow {
      display: flex; 
    }

    .specialty-arrow img {
      width: 24px; 
      height: 24px;
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
      height: 150px;
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
            
            {/* Botón hamburguesa móvil eliminado a petición */}

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
                style={{
                  borderRadius: '12px',
                  background: 'white',
                  border: '1.5px solid var(--color-gold)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/img/shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 (1).svg"
                  alt="Carrito"
                  style={{
                    width: '26px',
                    height: '26px',
                    display: 'block',
                    /* Filtro CSS ajustado para dar un color muy similar a #d4a72c (Dorado de la línea) */
                    filter: 'brightness(0) saturate(100%) invert(76%) sepia(47%) saturate(600%) hue-rotate(351deg) brightness(87%) contrast(87%)'
                  }}
                />

                {cart.length > 0 && (
                  <span
                    className="cart-count"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: 'var(--color-coral)',
                      color: 'white',
                      fontSize: '0.75rem',
                      minWidth: '22px',
                      height: '22px',
                      padding: '0 4px',
                      borderRadius: '50%',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
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

              </div>
            </div>
          )}

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

             <div className="promo-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>Promo</span>
                <img 
                  src="/img/percent_discount_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 (1).svg" 
                  alt="Descuento" 
                  style={{ width: '16px', height: '16px', display: 'block' }}
                />
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

          {!showMenu && (
            <button
              className="menu-btn"
              onClick={() => setShowMenu(true)}
            >
              Ver menú completo
            </button>
          )}

          {/* ===================================================
              CAJA DE ESTADO VERSIÓN MÓVIL
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
              MENÚ COMPLETO
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
                  margin: '20px 0 20px',
                  padding: '0 10px',
                  fontSize: '1.4rem',
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                Menú Completo
              </h2>

              {/* BARRA DE FILTROS (DESPLEGABLE PARA PC Y MÓVIL) */}
              <div className="filters-wrapper">
                <div className="select-pill">
                  {categoriaActiva}
                </div>
                <div className="select-circle">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#2b3a3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* Select transparente superpuesto */}
                <select
                  className="real-select"
                  value={categoriaActiva}
                  onChange={(e) => handleCategoriaChange(e.target.value)}
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

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

              {/* PAGINACIÓN */}
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

              <div className="review-card">
                <p>
                  Pedí por primera vez hoy y la verdad es que está muy rico y fresco. 
                  Me olvidé de sacar foto, pero las piezas tienen un buen tamaño y vienen con una buena cantidad de salmón. 
                  Recomiendo
                </p>

                <p style={{ fontWeight: 'normal' }}>
                  Vitória Monteiro
                  <span style={{ float: 'right' }}>
                    5.0 <span className="review-star">★</span>
                  </span>
                </p>
              </div>

              <div className="review-card">
                <p>
                  Siempre pido a domicilio, es el sushi más rico y más económico de Buenos Aires. 
                  Siempre todo impecable!
                </p>

                <p style={{ fontWeight: 'normal' }}>
                  Fabiana Mata
                  <span style={{ float: 'right' }}>
                    5.0 <span className="review-star">★</span>
                  </span>
                </p>
              </div>

              <div className="review-card">
                <p>
                  Es EXCELENTE. Porque combina buena calidad, buen precio y entrega rápida y prolija.
                  Lo vengo pidiendo todos los domingos con mis compañeros de guardia hace ya tres meses y han cambiado de nombre pero nunca de calidad. Yo pido combos premium selection y full salmon y la verdad es que le ponen muy buena cantidad de salmón.
                  Consumo y realmente recomiendo
                </p>

                <p style={{ fontWeight: 'normal' }}>
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

              <div className="location-icon" aria-hidden="true">
                <img
                  src="/img/location_on_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 (2) (1).svg"
                  alt="Ubicación"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'brightness(0) saturate(100%) invert(73%) sepia(34%) saturate(1039%) hue-rotate(358deg) brightness(91%) contrast(92%)'
                  }}
                />
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
                <p>Tlf: 0200202003</p>
                <p>Correo: correo@gmail.com</p>
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