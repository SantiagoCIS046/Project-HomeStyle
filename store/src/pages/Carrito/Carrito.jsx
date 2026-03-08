import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Package, Truck, CheckCircle2, ClipboardList } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import PillNav from '../../components/PillNav/PillNav';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import './Carrito.css';

const Carrito = () => {
    const [user, setUser] = useState(null);
    const { cartItems, removeFromCart, updateQuantity, cartCount, lastOrder } = useCart();
    const navigate = useNavigate();

    // Determine how many tracking steps are completed based on current time
    const getTrackingStep = (order) => {
        if (!order) return -1;
        const now = new Date();
        if (now >= new Date(order.dates.entregado)) return 3;
        if (now >= new Date(order.dates.enviado)) return 2;
        if (now >= new Date(order.dates.empacado)) return 1;
        return 0; // revisado
    };

    const fmtDate = (d) => new Date(d).toLocaleDateString('es-CO', {
        weekday: 'short', day: 'numeric', month: 'short'
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('homestyle_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('homestyle_user');
        setUser(null);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal;

    return (
        <div className="carrito-container">
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/home" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo-grid">
                        <div className="grid-point"></div>
                        <div className="grid-point"></div>
                        <div className="grid-point"></div>
                        <div className="grid-point"></div>
                    </div>
                    <ShinyText
                        text="HOMESTYLE"
                        speed={2}
                        delay={0.5}
                        className="logo-text-large"
                        color="#b5b5b5"
                        shineColor="#ffffff"
                    />
                </Link>

                <PillNav
                    items={[
                        { label: 'DROPS', href: '/home#drops' },
                        { label: 'COLECCIÓN', href: '/home#colecciones' },
                        { label: 'ARCHIVOS', href: '/home#archivos' },
                        { label: 'NOSOTROS', href: '/home#nosotros' }
                    ]}
                    activeHref=""
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#000000"
                    pillColor="#ffffff"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#000000"
                    theme="dark"
                    initialLoadAnimation={false}
                />

                <div className="nav-actions">
                    <div className="search-bar">
                        <Search size={14} color="#666" />
                        <input type="text" placeholder="BUSCAR..." />
                    </div>
                    <Link to="/carrito" style={{ color: 'inherit', display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="cart-badge-count">{cartCount}</span>
                        )}
                    </Link>
                    <div className="account-section">
                        {user ? (
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <span className="user-name" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-blue, #1A5CFF)' }}>
                                    {user.name}
                                </span>
                                <div className="user-icon-wrapper" onClick={handleLogout} title="Cerrar Sesión">
                                    <User size={20} />
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                <User size={20} />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Cart Content */}
            <main className="cart-main-content">
                <div className="cart-header">
                    <h1 className="cart-title">TU CARRITO</h1>
                </div>

                <div className="cart-layout">
                    {/* Left Column: Cart Items */}
                    <div className="cart-items-section">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <p className="empty-cart-msg">Tu carrito está vacío.</p>
                                <Link to="/home" className="btn-continue-shopping" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                                    EXPLORAR PRODUCTOS
                                </Link>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-info-header">
                                            <div className="cart-item-name-cat">
                                                <h3>{item.name}</h3>
                                                <span className="cart-item-category">
                                                    {typeof item.category === 'string' ? item.category : 'HOMESTYLE'}
                                                </span>
                                            </div>
                                            <div className="cart-item-price">
                                                ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                                            </div>
                                        </div>
                                        <div className="cart-item-attributes">
                                            <span className="attr-badge">PRECIO UNIT: ${Number(item.price).toLocaleString('es-CO')} COP</span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="quantity-selector">
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                <span className="remove-icon">🗑️</span> ELIMINAR
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="cart-summary-section">
                        <div className="cart-summary-box">
                            <h2>RESUMEN DEL PEDIDO</h2>

                            <div className="summary-row">
                                <span>SUBTOTAL</span>
                                <span>${subtotal.toLocaleString('es-CO')} COP</span>
                            </div>
                            <div className="summary-row">
                                <span>ENVÍO</span>
                                <span>GRATIS</span>
                            </div>
                            <div className="summary-row">
                                <span>IMPUESTOS</span>
                                <span className="summary-row-bold">CALCULADOS AL FINALIZAR</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total-row">
                                <span>TOTAL</span>
                                <span className="total-price">${total.toLocaleString('es-CO')} COP</span>
                            </div>

                            <div className="summary-actions">
                                <button
                                    className="btn-checkout"
                                    disabled={cartItems.length === 0}
                                    style={{ opacity: cartItems.length === 0 ? 0.5 : 1, cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer' }}
                                    onClick={() => navigate('/checkout')}
                                >
                                    FINALIZAR COMPRA
                                </button>
                                <Link to="/home" className="btn-continue-shopping">SEGUIR COMPRANDO</Link>
                            </div>

                            <div className="secure-payment-badge">
                                <span className="check-icon">🛡️</span> PAGO 100% SEGURO Y ENCRIPTADO
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Order Tracking ──────────────────────────────────────────── */}
            {lastOrder && (
                <section className="order-tracking-section">
                    <div className="tracking-header">
                        <h2 className="tracking-title">SEGUIMIENTO DEL PEDIDO</h2>
                        <span className="tracking-order-id">ORDEN #{lastOrder.orderId}</span>
                    </div>

                    {(() => {
                        const step = getTrackingStep(lastOrder);
                        const steps = [
                            {
                                icon: <ClipboardList size={20} />,
                                label: 'REVISADO POR VENDEDOR',
                                desc: 'Tu pedido fue recibido y está siendo procesado.',
                                date: lastOrder.dates.revisado,
                                done: step >= 0,
                            },
                            {
                                icon: <Package size={20} />,
                                label: 'EMPACADO',
                                desc: 'Tu pedido está siendo preparado y empacado.',
                                date: lastOrder.dates.empacado,
                                done: step >= 1,
                            },
                            {
                                icon: <Truck size={20} />,
                                label: 'ENVIADO',
                                desc: 'Tu paquete está en camino.',
                                date: lastOrder.dates.enviado,
                                done: step >= 2,
                            },
                            {
                                icon: <CheckCircle2 size={20} />,
                                label: 'ENTREGADO',
                                desc: 'Entrega estimada (5 días hábiles).',
                                date: lastOrder.dates.entregado,
                                done: step >= 3,
                            },
                        ];

                        return (
                            <div className="tracking-timeline">
                                {steps.map((s, i) => (
                                    <div key={i} className={`tracking-step ${s.done ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                                        <div className="tracking-step-icon">
                                            {s.icon}
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className={`tracking-connector ${step > i ? 'filled' : ''}`} />
                                        )}
                                        <div className="tracking-step-info">
                                            <span className="tracking-step-label">{s.label}</span>
                                            <span className="tracking-step-desc">{s.desc}</span>
                                            <span className="tracking-step-date">
                                                {s.done ? '✅ ' : '⏳ '}{fmtDate(s.date)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </section>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Carrito;
