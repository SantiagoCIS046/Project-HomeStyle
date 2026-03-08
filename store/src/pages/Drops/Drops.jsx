import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, ArrowRight, Box, Scissors, Cpu, Plus, X, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import PillNav from '../../components/PillNav/PillNav';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import './Drops.css';

// Assets
import sudaderaImg from '../../assets/images/sudadera_brutalista.png';
import cargoImg from '../../assets/images/pantalon_cargo.png';
import camisetaImg from '../../assets/images/camiseta_gris.png';
import sneakerImg from '../../assets/images/sneaker_new_drop.png';

// ── Countdown target: 7 days from now at page load ──────────────────────────
const TARGET_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

function useCountdown(target) {
    const calcLeft = () => {
        const diff = Math.max(0, target - Date.now());
        return {
            dias: Math.floor(diff / 86400000),
            hrs: Math.floor((diff % 86400000) / 3600000),
            min: Math.floor((diff % 3600000) / 60000),
            seg: Math.floor((diff % 60000) / 1000),
        };
    };
    const [time, setTime] = useState(calcLeft);
    useEffect(() => {
        const id = setInterval(() => setTime(calcLeft()), 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

const INITIAL_DROPS = [
    {
        id: 101,
        name: 'URBAN NOMAD COLLECTION',
        date: '15.01.24',
        price: '$120,000 COP',
        stock: 'LIMITADA',
        tag: 'VOL.1',
        image: sudaderaImg,
    },
    {
        id: 102,
        name: 'DIGITAL GHOST LAYER',
        date: '01.11.23',
        price: '$85,000 COP',
        stock: 'EDICIÓN LIMITADA',
        tag: 'VOL.2',
        image: cargoImg,
    },
    {
        id: 103,
        name: 'FOUNDATIONS CORE',
        date: '20.08.23',
        price: '$95,000 COP',
        stock: 'AGOTADA',
        tag: 'VOL.3',
        image: sneakerImg,
    },
];

const EMPTY_DROP = { name: '', price: '', stock: 'LIMITADA', image: '' };

const Drops = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [pastDrops, setPastDrops] = useState(INITIAL_DROPS);
    const [showDropModal, setShowDropModal] = useState(false);
    const [dropForm, setDropForm] = useState(EMPTY_DROP);
    const [dropPreview, setDropPreview] = useState('');
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const { dias, hrs, min, seg } = useCountdown(TARGET_DATE);

    useEffect(() => {
        const stored = localStorage.getItem('homestyle_user');
        if (stored) setUser(JSON.parse(stored));
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('homestyle_user');
        setUser(null);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
        }
    };

    const handleDropImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setDropPreview(url);
            setDropForm(f => ({ ...f, image: url }));
        }
    };

    const handleAddDrop = (e) => {
        e.preventDefault();
        if (!dropForm.name.trim()) return;
        const today = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\/+/g, '.');
        const newDrop = {
            id: Date.now(),
            name: dropForm.name.toUpperCase(),
            date: today,
            price: dropForm.price ? `$${Number(dropForm.price).toLocaleString('es-CO')} COP` : 'PRÓXIMAMENTE',
            stock: dropForm.stock || 'LIMITADA',
            tag: `VOL.${pastDrops.length + 1}`,
            image: dropPreview || camisetaImg,
        };
        setPastDrops(prev => [newDrop, ...prev]);
        setDropForm(EMPTY_DROP);
        setDropPreview('');
        setShowDropModal(false);
    };

    return (
        <div className="drops-container">
            {/* ── Navbar ─────────────────────────────────────────────────────── */}
            <nav className="navbar">
                <Link to="/home" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo-grid">
                        <div className="grid-point" /><div className="grid-point" />
                        <div className="grid-point" /><div className="grid-point" />
                    </div>
                    <ShinyText text="HOMESTYLE" speed={2} delay={0.5} className="logo-text-large" color="#b5b5b5" shineColor="#ffffff" />
                </Link>

                <PillNav
                    items={[
                        { label: 'DROPS', href: '/drops' },
                        { label: 'COLECCIONES', href: '/colecciones' },
                        { label: 'INICIO', href: '/home' },
                    ]}
                    activeHref="/drops"
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
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <div className="account-section">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#1A5CFF' }}>{user.name}</span>
                                <div onClick={handleLogout} title="Cerrar Sesión"><User size={20} /></div>
                            </div>
                        ) : (
                            <Link to="/login" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}><User size={20} /></Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ── Hero Drop ──────────────────────────────────────────────────── */}
            <section className="drop-hero">
                <div className="drop-hero-left">
                    <span className="drop-status-badge">ESTADO: EN VENTA</span>
                    <h1 className="drop-hero-title">
                        PRÓXIMO<br />
                        <em className="drop-number">DROP 004</em>
                    </h1>

                    <div className="countdown">
                        {[
                            { label: 'DÍAS', val: String(dias).padStart(2, '0') },
                            { label: 'HRS', val: String(hrs).padStart(2, '0') },
                            { label: 'MIN', val: String(min).padStart(2, '0') },
                            { label: 'SEG', val: String(seg).padStart(2, '0') },
                        ].map(({ label, val }) => (
                            <div className="countdown-unit" key={label}>
                                <span className="countdown-val">{val}</span>
                                <span className="countdown-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="drop-hero-ctas">
                        <button className="btn-notify" onClick={() => document.getElementById('newsletter').scrollIntoView({ behavior: 'smooth' })}>
                            NOTIFICARME LANZAMIENTO <ArrowRight size={14} />
                        </button>
                        <button className="btn-catalog" onClick={() => document.getElementById('drops-pasados').scrollIntoView({ behavior: 'smooth' })}>
                            VER CATÁLOGO
                        </button>
                    </div>
                </div>

                <div className="drop-hero-right">
                    <div className="drop-hero-img-frame">
                        <img src={camisetaImg} alt="Next Drop" className="drop-hero-img" />
                        <div className="drop-hero-img-caption">NFC // INDUSTRIAL — OVERSIZE CARGO TEE / V.4</div>
                    </div>
                </div>
            </section>

            {/* ── Feature Cards ──────────────────────────────────────────────── */}
            <section className="drop-features">
                <div className="drop-features-grid">
                    <div className="feature-card">
                        <Scissors size={28} color="#1A5CFF" className="feature-icon" />
                        <h3>CORTE ARQUITECTÓNICO</h3>
                        <p>Diseño con patrones industriales para una caída perfecta y volumen controlado en hombros y tiras.</p>
                    </div>
                    <div className="feature-card">
                        <Box size={28} color="#1A5CFF" className="feature-icon" />
                        <h3>TEJIDO TÉCNICO</h3>
                        <p>Algodón pesado de 400 GSM con tratamiento especial para una durabilidad extrema en entornos urbanos.</p>
                    </div>
                    <div className="feature-card">
                        <Cpu size={28} color="#1A5CFF" className="feature-icon" />
                        <h3>AUTENTICIDAD DIGITAL</h3>
                        <p>Cada prenda incluye un tag NFC único vinculado a su número de serie en el archivo digital.</p>
                    </div>
                </div>
            </section>

            {/* ── Drops Pasados ──────────────────────────────────────────────── */}
            <section className="drops-pasados" id="drops-pasados">
                <div className="drops-pasados-header">
                    <h2>DROPS PASADOS <span className="drops-archivo-tag">[ARCHIVO]</span></h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn-add-drop" onClick={() => setShowDropModal(true)}>
                            <Plus size={14} /> AGREGAR DROP
                        </button>
                        <button className="btn-ver-historial">VER TODO EL HISTORIAL →</button>
                    </div>
                </div>
                <div className="drops-pasados-grid">
                    {pastDrops.map(drop => (
                        <div className="past-drop-card" key={drop.id}>
                            <div className="past-drop-img-wrap">
                                <img src={drop.image} alt={drop.name} />
                                <span className="past-drop-tag">{drop.tag}</span>
                            </div>
                            <div className="past-drop-info">
                                <div className="past-drop-meta">
                                    <span className="past-drop-date">LANZADO: {drop.date}</span>
                                    <span className={`past-drop-stock ${drop.stock === 'AGOTADA' ? 'sold-out' : ''}`}>
                                        {drop.stock}
                                    </span>
                                </div>
                                <h4>{drop.name}</h4>
                                <p>{drop.price} // EDICIÓN {drop.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Newsletter ─────────────────────────────────────────────────── */}
            <section className="drops-newsletter" id="newsletter">
                <div className="newsletter-content">
                    <div className="newsletter-icon-wrap">
                        <Cpu size={32} color="#1A5CFF" />
                    </div>
                    <h2>ÚNETE AL SISTEMA</h2>
                    <p>RECIBE COORDENADAS DE DROPS SECRETOS Y ACCESO ANTICIPADO DIRECTO A TU CORREO.</p>
                    {subscribed ? (
                        <p className="subscribed-msg">✅ ¡COORDENADAS RECIBIDAS! ESTARÁS LISTO PARA EL PRÓXIMO DROP.</p>
                    ) : (
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="TU@EMAIL.COM"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">SUSCRIPCIÓN</button>
                        </form>
                    )}
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────────────────────────── */}
            <Footer />

            {/* ── Add Drop Modal ── */}
            {showDropModal && (
                <div className="drop-modal-backdrop" onClick={() => setShowDropModal(false)}>
                    <div className="drop-modal" onClick={e => e.stopPropagation()}>
                        <div className="drop-modal-header">
                            <h2>AGREGAR DROP</h2>
                            <button className="drop-modal-close" onClick={() => setShowDropModal(false)}><X size={20} /></button>
                        </div>
                        <form className="drop-modal-form" onSubmit={handleAddDrop}>
                            <div className="dm-field">
                                <label>NOMBRE DEL DROP *</label>
                                <input placeholder="EJ. VOID CARGO SERIES" value={dropForm.name}
                                    onChange={e => setDropForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div className="dm-row">
                                <div className="dm-field">
                                    <label>PRECIO (COP)</label>
                                    <input type="number" placeholder="120000" value={dropForm.price}
                                        onChange={e => setDropForm(f => ({ ...f, price: e.target.value }))} />
                                </div>
                                <div className="dm-field">
                                    <label>ESTADO DE STOCK</label>
                                    <select value={dropForm.stock}
                                        onChange={e => setDropForm(f => ({ ...f, stock: e.target.value }))}>
                                        <option value="LIMITADA">LIMITADA</option>
                                        <option value="EDICIÓN LIMITADA">EDICIÓN LIMITADA</option>
                                        <option value="AGOTADA">AGOTADA</option>
                                        <option value="DISPONIBLE">DISPONIBLE</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dm-field">
                                <label>IMAGEN</label>
                                <label className="dm-upload-btn" htmlFor="drop-img-input">
                                    <Upload size={14} /> SUBIR IMAGEN
                                    <input id="drop-img-input" type="file" accept="image/*" style={{ display: 'none' }}
                                        onChange={handleDropImageChange} />
                                </label>
                                {dropPreview && <img src={dropPreview} alt="preview" className="dm-preview" />}
                            </div>
                            <div className="dm-actions">
                                <button type="button" className="dm-btn-cancel" onClick={() => setShowDropModal(false)}>CANCELAR</button>
                                <button type="submit" className="dm-btn-save">AGREGAR DROP</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drops;
