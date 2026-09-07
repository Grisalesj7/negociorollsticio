import React from 'react';
import { useNavigate } from 'react-router-dom';

// ======================================================
// CART PAGE
// ======================================================

const CartPage = ({ cart, setCart, userData, setUserData }) => {

  const navigate = useNavigate();

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

            const newQuantity =
              (cartItem.quantity || 1) + change;

            return newQuantity > 0
              ? { ...cartItem, quantity: newQuantity }
              : cartItem;
          }

          return cartItem;

        })
        .filter(
          (cartItem) =>
            (cartItem.quantity || 1) > 0
        );
    });
  };


  // ======================================================
  // ELIMINAR PRODUCTO
  // ======================================================

  const removeFromCart = (item) => {

    setCart((prevCart) =>
      prevCart.filter((cartItem) =>
        cartItem.id
          ? cartItem.id !== item.id
          : cartItem.name !== item.name
      )
    );
  };


  // ======================================================
  // CALCULAR SUBTOTAL
  // ======================================================

  const calculateSubtotal = () =>
    cart.reduce(
      (acc, item) =>
        acc +
        item.price * (item.quantity || 1),
      0
    );


  // ======================================================
  // ENVIAR PEDIDO A WHATSAPP
  // ======================================================

  const sendToWhatsApp = (e) => {

    e.preventDefault();

    const itemsText = cart
      .map(
        (i) =>
          `${i.name} (x${i.quantity || 1})`
      )
      .join(', ');

    const totalFinal = calculateSubtotal();

    const text =
      `Hola, quiero realizar el siguiente pedido: ${itemsText}. ` +
      `Total a pagar: $${totalFinal.toLocaleString('es-CO')}`;

    window.open(
      `https://wa.me/573246727621?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };


  // ======================================================
  // DISEÑO
  // ======================================================

  return (

    <div
      style={{
        background: '#F2ECE3',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'serif',
        color: '#1a2b2c',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >

      {/* ==================================================
                          HEADER
      ================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          padding: '15px 5%',
          borderBottom: '1px solid #e5dbcc',
          width: '100%',
          boxSizing: 'border-box',
          gap: '10px'
        }}
      >

        {/* Estado */}

        <div
          style={{
            justifySelf: 'start'
          }}
        >

          <div
            style={{
              border: '1px solid #48d720',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#4a6b47',
              background: '#eef3ed',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            Abiertos (de 5:00 PM a 11:00 PM)
          </div>

        </div>


        {/* Logo */}

        <div
          style={{
            justifySelf: 'center',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >

          <img
            src="/img/LOGO_rollticio.svg"
            alt="Rollsticio Logo"
            style={{
              height: '35px',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto'
            }}
          />

        </div>


        {/* Carrito */}

        <div
          style={{
            justifySelf: 'end'
          }}
        >

          <div
            style={{
              fontSize: '1.5rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '42px',
              minHeight: '42px',
              border: '1.5px solid #d4a72c',
              background: '#F2ECE3',
              borderRadius: '10px',
              boxSizing: 'border-box',
              transition:
                'background 0.2s ease, transform 0.2s ease'
            }}
          >

            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '28px',
                color: '#2b3c33'
              }}
            >
              shopping_cart
            </span>

            {cart.length > 0 && (

              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#e95d53',
                  color: 'white',
                  fontSize: '0.7rem',
                  minWidth: '20px',
                  height: '20px',
                  padding: '2px 5px',
                  borderRadius: '50%',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                {cart.length}
              </span>

            )}

          </div>

        </div>

      </div>


      {/* ==================================================
                    CONTENEDOR DEL CARRITO
      ================================================== */}

      <div
        style={{
          padding: '35px 5%',
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
          boxSizing: 'border-box',
          width: '100%'
        }}
      >

        <div
          style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '850px',
            padding: '30px',
            borderRadius: '20px',
            boxShadow:
              '0 8px 25px rgba(26,43,44,0.08)',
            border:
              '1px solid rgba(212,175,55,0.20)',
            boxSizing: 'border-box'
          }}
        >

          {/* Título */}

          <h2
            style={{
              fontSize: '1.6rem',
              marginBottom: '25px',
              color: '#1a2b2c',
              fontWeight: 'bold'
            }}
          >
            Carrito de compras
          </h2>


          {/* ==================================================
                        CARRITO VACÍO
          ================================================== */}

          {cart.length === 0 ? (

            <div
              style={{
                padding: '40px 15px',
                textAlign: 'center',
                color: '#777',
                border:
                  '2px dashed #e5dbcc',
                borderRadius: '12px',
                fontSize: '0.95rem'
              }}
            >
              Tu carrito está vacío. ¡Elige tus rollos favoritos del menú!
            </div>

          ) : (

            /* ==================================================
                         PRODUCTOS
            ================================================== */

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
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
                    borderBottom:
                      '1px solid #eae5dc',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}
                >

                  {/* Producto */}

                  <div
                    style={{
                      display: 'flex',
                      gap: '15px',
                      alignItems: 'center',
                      flex: '1 1 250px',
                      minWidth: '0'
                    }}
                  >

                    {/* Imagen */}

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
                        backgroundColor: '#ddd'
                      }}
                    />


                    {/* Información */}

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        minWidth: '0',
                        flex: 1
                      }}
                    >

                      {/* Nombre */}

                      <span
                        style={{
                          fontWeight: 'bold',
                          fontSize: '1.05rem',
                          color: '#1a2b2c',
                          wordBreak: 'break-word'
                        }}
                      >
                        {item.name}
                      </span>


                      {/* Descripción */}

                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: '#777',
                          lineHeight: '1.2',
                          wordBreak: 'break-word'
                        }}
                      >
                        {item.description ||
                          'Descripción del producto o ingredientes principales.'}
                      </span>


                      {/* ==================================================
                              CANTIDAD
                      ================================================== */}

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '8px',
                          flexWrap: 'wrap'
                        }}
                      >

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#d4af37',
                            borderRadius: '20px',
                            overflow: 'hidden'
                          }}
                        >

                          {/* Menos */}

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item, -1)
                            }
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#fff',
                              width: '28px',
                              height: '28px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            -
                          </button>


                          {/* Cantidad */}

                          <span
                            style={{
                              padding: '0 8px',
                              fontSize: '0.9rem',
                              fontWeight: 'bold',
                              color: '#fff'
                            }}
                          >
                            {item.quantity || 1}
                          </span>


                          {/* Más */}

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item, 1)
                            }
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#fff',
                              width: '28px',
                              height: '28px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            +
                          </button>

                        </div>


                        {/* Eliminar */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item)
                          }
                          title="Eliminar"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ff5c5c',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '4px'
                          }}
                        >
                          🗑️
                        </button>

                      </div>

                    </div>

                  </div>


                  {/* ==================================================
                              PRECIO
                  ================================================== */}

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      marginLeft: 'auto'
                    }}
                  >

                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        color: '#1a2b2c',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      $
                      {(
                        item.price *
                        (item.quantity || 1)
                      ).toLocaleString('es-CO')}
                    </span>

                  </div>

                </div>

              ))}


              {/* ==================================================
                              TOTAL
              ================================================== */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  paddingTop: '10px'
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >

                  <span
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#1a2b2c'
                    }}
                  >
                    Total
                  </span>

                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#e07a5f'
                    }}
                  >
                    Costo de envío incluido ($5.000)
                  </span>

                </div>


                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#1a2b2c'
                  }}
                >
                  $
                  {calculateSubtotal().toLocaleString('es-CO')}
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
          padding: '0 5% 35px 5%',
          boxSizing: 'border-box',
          width: '100%'
        }}
      >

        <div
          style={{
            display: 'flex',
            gap: '15px',
            width: '100%',
            maxWidth: '850px',
            flexWrap: 'wrap'
          }}
        >

          {/* Volver al menú */}

          <button
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
              textAlign: 'center'
            }}
          >
            Volver al menú
          </button>


          {/* Continuar con el pago */}

          <button
            onClick={sendToWhatsApp}
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
              textAlign: 'center'
            }}
          >
            Continuar con el pago
          </button>

        </div>

      </div>


      {/* ==================================================
                            FOOTER
      ================================================== */}

      <div
        style={{
          width: '100%',
          background: '#d4af37',
          padding: '38px 5%',
          display: 'grid',
          gridTemplateColumns:
            'repeat(3, minmax(0, 1fr))',
          gap: '35px',
          color: '#1a2b2c',
          borderTop: '1px solid #c5a030',
          boxSizing: 'border-box'
        }}
      >

        {/* Contacto */}

        <div
          style={{
            minWidth: 0,
            lineHeight: 1.6
          }}
        >

          <h4
            style={{
              margin: '0 0 10px',
              fontSize: '1rem'
            }}
          >
            Contacto
          </h4>

          <p
            style={{
              margin: '5px 0',
              fontSize: '0.9rem'
            }}
          >
            Tlf: 0200202003
          </p>

          <p
            style={{
              margin: '5px 0',
              fontSize: '0.9rem'
            }}
          >
            Correo: correo@gmail.com
          </p>

        </div>


        {/* Dirección */}

        <div
          style={{
            minWidth: 0,
            lineHeight: 1.6
          }}
        >

          <h4
            style={{
              margin: '0 0 10px',
              fontSize: '1rem'
            }}
          >
            Dirección
          </h4>

          <p
            style={{
              margin: '5px 0',
              fontSize: '0.9rem'
            }}
          >
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit.
          </p>

        </div>


        {/* Diseñado por */}

        <div
          style={{
            minWidth: 0,
            lineHeight: 1.6
          }}
        >

          <h4
            style={{
              margin: '0 0 10px',
              fontSize: '1rem'
            }}
          >
            Diseñado por
          </h4>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1a2b2c',
              padding: '6px 12px',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          >

            <img
              src="/img/Logo_footer.svg"
              alt="Logo"
              style={{
                height: '22px',
                width: 'auto',
                display: 'block'
              }}
            />

          </span>

        </div>

      </div>


      {/* ==================================================
                    RESPONSIVE
      ================================================== */}

      <style>
        {`

          @media (max-width: 600px) {

            .cart-container {
              padding: 20px 15px !important;
            }

          }

          @media (max-width: 500px) {

            .cart-footer {
              grid-template-columns: 1fr !important;
              text-align: center;
            }

          }

        `}
      </style>

    </div>
  );
};

export default CartPage;