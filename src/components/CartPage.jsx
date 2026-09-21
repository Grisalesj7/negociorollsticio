import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ======================================================
// CART PAGE
// ======================================================

const CartPage = ({ cart, setCart, userData, setUserData }) => {
  const navigate = useNavigate();

  // ======================================================
  // MODAL DE CARGA (redirección a WhatsApp)
  // ======================================================
  const [isRedirecting, setIsRedirecting] = useState(false);

  // ======================================================
  // HORARIO DEL RESTAURANTE
  // Abierto todos los días de 5:00 PM a 11:00 PM
  // ======================================================

  const getRestaurantStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 17 && currentHour < 23;
  };

  const isRestaurantOpen = getRestaurantStatus();

  // ======================================================
  // AUMENTAR O DISMINUIR CANTIDAD
  // ======================================================

  const updateQuantity = (item, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((cartItem) => {
          const isMatch = cartItem.id
            ? cartItem.id === item.id
            : cartItem.name === item.name;

          if (isMatch) {
            const newQuantity = (cartItem.quantity || 1) + change;
            return newQuantity > 0
              ? { ...cartItem, quantity: newQuantity }
              : cartItem;
          }
          return cartItem;
        })
        .filter((cartItem) => (cartItem.quantity || 1) > 0);
    });
  };

  // ======================================================
  // ELIMINAR PRODUCTO
  // ======================================================

  const removeFromCart = (item) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) =>
        cartItem.id ? cartItem.id !== item.id : cartItem.name !== item.name
      )
    );
  };

  // ======================================================
  // CALCULAR SUBTOTAL
  // ======================================================

  const calculateSubtotal = () =>
    cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

  // ======================================================
  // ENVIAR PEDIDO A WHATSAPP
  // ======================================================

  const sendToWhatsApp = () => {
    const itemsText = cart
      .map((i) => `${i.name} (x${i.quantity || 1})`)
      .join(', ');

    const totalFinal = calculateSubtotal();

    const text = `Hola, quiero realizar el siguiente pedido: ${itemsText}. Total a pagar: $${totalFinal.toLocaleString('es-CO')}`;

    window.open(
      `https://wa.me/573002070981?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  // ======================================================
  // VALIDAR HORARIO ANTES DE IR A WHATSAPP
  // Muestra un modal de carga y luego redirige
  // ======================================================

  const handleCheckout = (e) => {
    e.preventDefault();

    if (isRestaurantOpen) {
      setIsRedirecting(true);

      // Pequeño delay para mostrar el modal antes de abrir WhatsApp
      setTimeout(() => {
        sendToWhatsApp();
        // Ocultamos el modal un momento después de disparar la redirección
        setTimeout(() => setIsRedirecting(false), 800);
      }, 1400);
    } else {
      alert(
        '❌ Estamos cerrados.\n\nNuestro horario de atención es de 5:00 PM a 11:00 PM.'
      );
    }
  };

  // ======================================================
  // DISEÑO
  // ======================================================

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

        html, body, #root {
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        body {
          background: var(--background-main);
          font-family: 'Lato', sans-serif;
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
        .site-footer {
          width: calc(100% - (var(--page-side-space) * 2));
          max-width: 100%;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        /* HEADER */
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
          min-width: 46px;
          min-height: 46px;
          border: 1.5px solid var(--color-gold);
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cart-count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--color-coral);
          color: white;
          font-size: 0.75rem;
          min-width: 22px;
          height: 22px;
          padding: 0 4px;
          border-radius: 50%;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* FOOTER */
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

        /* ==================================================
            MODAL DE REDIRECCIÓN A WHATSAPP
        ================================================== */
        .redirect-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 43, 44, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: overlayFadeIn 0.25s ease;
        }

        .redirect-modal {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid var(--color-gold);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          padding: 40px 35px;
          width: 100%;
          max-width: 360px;
          text-align: center;
          font-family: 'Lato', sans-serif;
          animation: modalPopIn 0.3s ease;
        }

        .redirect-spinner-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
          width: 72px;
          height: 72px;
          position: relative;
        }

        .redirect-spinner {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 5px solid #f1e6c8;
          border-top-color: var(--color-gold);
          animation: redirectSpin 0.9s linear infinite;
        }

        .redirect-wa-icon {
          position: absolute;
          width: 30px;
          height: 30px;
        }

        .redirect-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a2b2c;
          margin: 0 0 8px;
        }

        .redirect-subtitle {
          font-size: 0.9rem;
          color: #6b6b6b;
          margin: 0;
          line-height: 1.5;
        }

        @keyframes redirectSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalPopIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 600px) {
          .redirect-modal {
            max-width: 88vw;
            padding: 32px 22px;
            border-radius: 16px;
          }

          .redirect-spinner-wrap,
          .redirect-spinner {
            width: 60px;
            height: 60px;
          }

          .redirect-wa-icon {
            width: 26px;
            height: 26px;
          }

          .redirect-title {
            font-size: 1.1rem;
          }

          .redirect-subtitle {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 1100px) {
          :root {
            --page-side-space: 40px;
            --grid-gap: 24px;
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

          .main-header {
  background: white;
  border: 1px solid var(--color-gold);
  border-radius: 6px;
  padding: 8px 15px;
  margin: 15px auto;
  width: calc(100% - 30px);
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: ". logo cart";
  gap: 12px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
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
  border: 1.5px solid var(--color-gold);
  background: white;
  box-shadow: none;
  padding: 0;
  min-width: 46px;
  min-height: 46px;
  width: 46px;
  height: 46px;
  border-radius: 12px;
}

          .site-footer {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 30px var(--page-side-space);
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

          /* Marco dorado adaptado al carrito en móviles */
          .cart-box-card {
            background: #ffffff !important;
            border: 1.5px solid var(--color-gold) !important;
            border-radius: 12px !important;
            padding: 20px 15px !important;
            width: calc(100% - 30px) !important;
            margin: 0 auto !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
          }
        }
      `}</style>

      <div className="landing-wrapper">
        {/* ==================================================
            HEADER
        ================================================== */}
        <header className="main-header">
          <div className="header-status desktop-status">
            <div className="status-box">
              {isRestaurantOpen ? ' Abiertos (5:00 PM - 11:00pm)' : ' Cerrados (Abrimos a las 5:00pm)'}
            </div>
          </div>

          <div className="header-logo">
            <button
              type="button"
              className="logo-button"
              onClick={() => navigate('/')}
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
              onClick={() => navigate('/cart')}
              role="button"
              tabIndex={0}
              aria-label="Abrir carrito"
            >
              <img
                src="/img/shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 (1).svg"
                alt="Carrito"
                style={{
                  width: '26px',
                  height: '26px',
                  display: 'block',
                  filter: 'brightness(0) saturate(100%) invert(76%) sepia(47%) saturate(600%) hue-rotate(351deg) brightness(87%) contrast(87%)'
                }}
              />

              {cart.length > 0 && (
                <span className="cart-count">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* ==================================================
            CONTENEDOR DEL CARRITO
        ================================================== */}
        <div
          className="cart-container"
          style={{
            padding: '15px 0 35px 0',
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <div
            className="cart-box-card"
            style={{
              background: '#ffffff',
              width: 'calc(100% - (var(--page-side-space) * 2))',
              maxWidth: '850px',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(26,43,44,0.08)',
              border: '1.5px solid var(--color-gold)',
              boxSizing: 'border-box',
            }}
          >
            <h2
              style={{
                fontSize: '1.6rem',
                marginBottom: '25px',
                color: '#1a2b2c',
                fontWeight: 'bold',
              }}
            >
              Carrito de compras
            </h2>

            {cart.length === 0 ? (
              <div
                style={{
                  padding: '40px 15px',
                  textAlign: 'center',
                  color: '#777',
                  border: '2px dashed #e5dbcc',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                }}
              >
                Tu carrito está vacío. ¡Elige tus rollos favoritos del menú!
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
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
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                        flex: '1 1 250px',
                        minWidth: '0',
                      }}
                    >
                      <img
                        src={
                          item.image ||
                          item.img ||
                          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500'
                        }
                        alt={item.name}
                        style={{
                          width: '85px',
                          height: '85px',
                          minWidth: '85px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          backgroundColor: '#ddd',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          minWidth: '0',
                          flex: 1,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 'bold',
                            fontSize: '1.05rem',
                            color: '#1a2b2c',
                            wordBreak: 'break-word',
                          }}
                        >
                          {item.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            color: '#777',
                            lineHeight: '1.2',
                            wordBreak: 'break-word',
                          }}
                        >
                          {item.description ||
                            'Descripción del producto o ingredientes principales.'}
                        </span>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '8px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: '#d4af37',
                              borderRadius: '20px',
                              overflow: 'hidden',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => updateQuantity(item, -1)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                              }}
                            >
                              -
                            </button>
                            <span
                              style={{
                                padding: '0 8px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: '#fff',
                              }}
                            >
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item, 1)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                              }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item)}
                            title="Eliminar"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '4px',
                            }}
                          >
                            <img
                              src="/img/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                              alt="Eliminar"
                              style={{
                                width: '22px',
                                height: '22px',
                                display: 'block',
                                filter: 'brightness(0) saturate(100%) invert(43%) sepia(87%) saturate(1478%) hue-rotate(334deg) brightness(98%) contrast(97%)'
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginLeft: 'auto',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          color: '#1a2b2c',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        $
                        {(
                          item.price * (item.quantity || 1)
                        ).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                    paddingTop: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: '#1a2b2c',
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#e07a5f',
                      }}
                    >
                      Costo de envío incluido ($5.000)
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#1a2b2c',
                    }}
                  >
                    ${calculateSubtotal().toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            BOTONES INFERIORES
        ================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 calc(var(--page-side-space)) 35px calc(var(--page-side-space))',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              width: '100%',
              maxWidth: '850px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                flex: '1 1 200px',
                background: '#1a2b2c',
                color: '#fff',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              Volver al menú
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              style={{
                flex: '1 1 200px',
                background: '#1a4042',
                color: '#fff',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              Continuar con el pago
            </button>
          </div>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}
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
                Ciudad Autónoma de Buenos Aires, Argentina.
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
      </div>

      {/* ==================================================
          MODAL DE REDIRECCIÓN A WHATSAPP
      ================================================== */}
      {isRedirecting && (
        <div className="redirect-overlay">
          <div className="redirect-modal">
            <div className="redirect-spinner-wrap">
              <div className="redirect-spinner" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="redirect-wa-icon"
              />
            </div>
            <h3 className="redirect-title">Redirigiendo a WhatsApp</h3>
            <p className="redirect-subtitle">
              Estamos preparando tu pedido, en un momento te llevaremos al chat para confirmarlo.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
