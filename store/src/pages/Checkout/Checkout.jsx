import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, CreditCard, Smartphone, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ShinyText from '../../components/ShinyText/ShinyText';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

// ── EmailJS config ─────────────────────────────────────────────────────────
// Fill in your credentials at .env.local (see the file for instructions)
const EJ_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECIPIENT = 'santiagocisneros046@gmail.com';

// Build a clean HTML items table for the email body
function buildItemsHtml(items) {
    return items.map(i =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2240;">${i.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2240;text-align:center;">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2240;text-align:right;">$${(i.price * i.quantity).toLocaleString('es-CO')} COP</td>
        </tr>`
    ).join('');
}

const Checkout = () => {
    const [user, setUser] = useState(null);
    const [payMethod, setPayMethod] = useState('tarjeta');
    const [ordered, setOrdered] = useState(false);
    const [sending, setSending] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const { cartItems, cartCount, placeOrder, lastOrder } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '', correo: '', direccion: '',
        ciudad: '', postal: '',
        cardNum: '', vencimiento: '', cvc: '',
    });

    useEffect(() => {
        const stored = localStorage.getItem('homestyle_user');
        if (stored) {
            const u = JSON.parse(stored);
            setUser(u);
            setForm(f => ({ ...f, nombre: u.name || '', correo: u.email || '' }));
        }
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleOrder = async (e) => {
        e.preventDefault();
        setSending(true);
        setEmailError(null);

        // 1. Place the order into context (clears cart, saves snapshot)
        const order = placeOrder(form.nombre);

        // 2. Send email via EmailJS
        const itemsHtml = buildItemsHtml(order.items);
        const total = `$${order.total.toLocaleString('es-CO')} COP`;
        const estDelivery = new Date(order.dates.entregado).toLocaleDateString('es-CO', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const templateParams = {
            to_email: RECIPIENT,
            to_name: form.nombre || 'Cliente',
            order_id: order.orderId,
            order_date: new Date(order.date).toLocaleDateString('es-CO', { dateStyle: 'full' }),
            items_html: itemsHtml,
            subtotal: total,
            shipping: 'GRATIS',
            total: total,
            est_delivery: estDelivery,
            ciudad: form.ciudad,
            direccion: form.direccion,
        };

        try {
            if (EJ_SERVICE && EJ_TEMPLATE && EJ_KEY &&
                EJ_SERVICE !== 'YOUR_SERVICE_ID') {
                await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, templateParams, EJ_KEY);
            } else {
                // EmailJS not configured yet — log so developer can see
                console.warn('[HomeStyle] EmailJS not configured. Set VITE_EMAILJS_* vars in .env.local');
            }
        } catch (err) {
            console.error('[HomeStyle] EmailJS error:', err);
            setEmailError('El correo no pudo enviarse, pero tu orden fue registrada.');
        } finally {
            setSending(false);
            setOrdered(true);
        }
    };

    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

    /* ── Success screen ──────────────────────────────────── */
    if (ordered && lastOrder) {
        return (
            <div className="checkout-container">
                <nav className="ck-navbar">
                    <Link to="/home" className="ck-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="logo-grid">
                            <div className="grid-point" /><div className="grid-point" />
                            <div className="grid-point" /><div className="grid-point" />
                        </div>
                        <ShinyText text="HOMESTYLE" speed={2} delay={0.5} className="logo-text-large" color="#b5b5b5" shineColor="#ffffff" />
                    </Link>
                </nav>
                <div className="order-success">
                    <CheckCircle size={72} color="#1A5CFF" />
                    <h1>¡PEDIDO CONFIRMADO!</h1>
                    <p className="order-id-display">ORDEN # {lastOrder.orderId}</p>
                    <p>TU COMPRA FUE REGISTRADA. SE HA ENVIADO UNA FACTURA A<br /><strong>{RECIPIENT}</strong></p>
                    {emailError && (
                        <p className="email-warn"><AlertCircle size={14} /> {emailError}</p>
                    )}
                    <div className="success-actions">
                        <Link to="/carrito" className="btn-track-order">VER SEGUIMIENTO →</Link>
                        <Link to="/home" className="btn-back-home">VOLVER AL INICIO</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="ck-navbar">
                <Link to="/home" className="ck-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo-grid">
                        <div className="grid-point" /><div className="grid-point" />
                        <div className="grid-point" /><div className="grid-point" />
                    </div>
                    <ShinyText text="HOMESTYLE" speed={2} delay={0.5} className="logo-text-large" color="#b5b5b5" shineColor="#ffffff" />
                </Link>

                <div className="ck-nav-links">
                    <span className="ck-nav-link disabled">HOMBRES</span>
                    <span className="ck-nav-link disabled">MUJERES</span>
                    <span className="ck-nav-link disabled">ACCESORIOS</span>
                </div>

                <Link to="/carrito" className="ck-cart-pill">
                    <ShoppingBag size={16} />
                    {cartCount} ITEMS
                </Link>
            </nav>

            {/* ── Page Title ─────────────────────────────────────────── */}
            <div className="ck-page-title">
                <div className="ck-title-bar" />
                <div>
                    <h1>FINALIZAR COMPRA</h1>
                    <p className="ck-subtitle">PROTOCOLO DE SEGURIDAD: TRANSACCIÓN ENCRIPTADA</p>
                </div>
            </div>

            {/* ── Main Grid ─────────────────────────────────────────── */}
            <form className="ck-grid" onSubmit={handleOrder}>
                {/* Left column */}
                <div className="ck-left">
                    {/* 01 Shipping */}
                    <section className="ck-section">
                        <h2 className="ck-section-title">
                            <span className="ck-step-num">01</span> DATOS DE ENVÍO
                        </h2>
                        <div className="ck-form-row two-col">
                            <div className="ck-field">
                                <label>NOMBRE COMPLETO</label>
                                <input name="nombre" placeholder="EJ. ALEX VOID" value={form.nombre}
                                    onChange={handleChange} required />
                            </div>
                            <div className="ck-field">
                                <label>CORREO ELECTRÓNICO</label>
                                <input name="correo" type="email" placeholder="USER@HOMESTYLE.VOID" value={form.correo}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="ck-field">
                            <label>DIRECCIÓN INDUSTRIAL</label>
                            <input name="direccion" placeholder="CALLE, NÚMERO, PISO" value={form.direccion}
                                onChange={handleChange} required />
                        </div>
                        <div className="ck-form-row two-col">
                            <div className="ck-field">
                                <label>CIUDAD</label>
                                <input name="ciudad" placeholder="BOGOTÁ" value={form.ciudad}
                                    onChange={handleChange} required />
                            </div>
                            <div className="ck-field">
                                <label>CÓDIGO POSTAL</label>
                                <input name="postal" placeholder="110111" value={form.postal}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                    </section>

                    {/* 02 Payment */}
                    <section className="ck-section">
                        <h2 className="ck-section-title">
                            <span className="ck-step-num">02</span> MÉTODO DE PAGO
                        </h2>

                        <div className="ck-payment-methods">
                            {[
                                { id: 'tarjeta', label: 'TARJETA', icon: <CreditCard size={22} /> },
                                { id: 'paypal', label: 'PAYPAL', icon: <Smartphone size={22} /> },
                                { id: 'apple', label: 'APPLE PAY', icon: <Lock size={22} /> },
                            ].map(m => (
                                <button type="button" key={m.id}
                                    className={`pay-method-btn ${payMethod === m.id ? 'active' : ''}`}
                                    onClick={() => setPayMethod(m.id)}>
                                    {m.icon}<span>{m.label}</span>
                                </button>
                            ))}
                        </div>

                        {payMethod === 'tarjeta' && (
                            <div className="ck-card-fields">
                                <div className="ck-field">
                                    <label>NÚMERO DE TARJETA</label>
                                    <div className="ck-input-icon-wrap">
                                        <input name="cardNum" placeholder="0000 0000 0000 0000"
                                            maxLength={19} value={form.cardNum}
                                            onChange={e => {
                                                const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                const fmt = v.replace(/(.{4})/g, '$1 ').trim();
                                                setForm({ ...form, cardNum: fmt });
                                            }} required />
                                        <Lock size={14} className="ck-input-icon" />
                                    </div>
                                </div>
                                <div className="ck-form-row two-col">
                                    <div className="ck-field">
                                        <label>VENCIMIENTO</label>
                                        <input name="vencimiento" placeholder="MM/YY" maxLength={5}
                                            value={form.vencimiento}
                                            onChange={e => {
                                                let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                                setForm({ ...form, vencimiento: v });
                                            }} required />
                                    </div>
                                    <div className="ck-field">
                                        <label>CVC</label>
                                        <input name="cvc" placeholder="•••" maxLength={3} type="password"
                                            value={form.cvc}
                                            onChange={e => setForm({ ...form, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                            required />
                                    </div>
                                </div>
                            </div>
                        )}

                        {payMethod !== 'tarjeta' && (
                            <div className="ck-external-pay">
                                <p>Serás redirigido a <strong>{payMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}</strong> para completar el pago de forma segura.</p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right column: order summary */}
                <aside className="ck-summary">
                    <h2>RESUMEN DEL PEDIDO</h2>
                    <div className="ck-summary-items">
                        {cartItems.length === 0 ? (
                            <p className="ck-empty">Sin productos en el carrito.</p>
                        ) : cartItems.map(item => (
                            <div className="ck-summary-item" key={item.id}>
                                <div className="ck-summary-item-img">
                                    <img src={item.image} alt={item.name} />
                                    {item.quantity > 1 && <span className="ck-qty-badge">{item.quantity}</span>}
                                </div>
                                <div className="ck-summary-item-info">
                                    <h4>{item.name}</h4>
                                    <span className="ck-item-sub">
                                        {typeof item.category === 'string' ? item.category : 'HOMESTYLE'}
                                    </span>
                                    <p className="ck-item-price">${(item.price * item.quantity).toLocaleString('es-CO')} COP</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ck-summary-totals">
                        <div className="ck-total-row">
                            <span>SUBTOTAL</span>
                            <span>${subtotal.toLocaleString('es-CO')} COP</span>
                        </div>
                        <div className="ck-total-row">
                            <span>ENVÍO STANDARD</span>
                            <span className="ck-free">GRATIS</span>
                        </div>
                        <div className="ck-total-divider" />
                        <div className="ck-total-final">
                            <span>TOTAL</span>
                            <span className="ck-total-price">${subtotal.toLocaleString('es-CO')} COP</span>
                        </div>
                    </div>

                    <button type="submit" className="btn-hacer-compra"
                        disabled={cartItems.length === 0 || sending}>
                        {sending ? 'PROCESANDO...' : <><span>HACER COMPRA</span><ArrowRight size={18} /></>}
                    </button>

                    <p className="ck-legal">
                        Al confirmar, aceptas nuestros Términos de Servicio y la Política de Privacidad Industrial de HomeStyle.
                        No se aceptan devoluciones en artículos de edición limitada.
                    </p>
                </aside>
            </form>

            {/* ── Minimal Footer ─────────────────────────────────────── */}
            <footer className="ck-footer">
                <span className="ck-footer-logo">⚙ HOMESTYLE CORP 2024</span>
                <div className="ck-footer-links">
                    <span>TÉRMINOS</span><span>PRIVACIDAD</span><span>SOPORTE</span>
                </div>
            </footer>
        </div>
    );
};

export default Checkout;
