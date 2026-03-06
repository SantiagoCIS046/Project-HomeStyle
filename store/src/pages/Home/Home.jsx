import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import './Home.css';

// Assets
import sudaderaImg from '../../assets/images/sudadera_brutalista.png';
import cargoImg from '../../assets/images/pantalon_cargo.png';
import camisetaImg from '../../assets/images/camiseta_gris.png';
import chamarraImg from '../../assets/images/chamarra_negra.png';

const products = [
    {
        id: 1,
        name: 'Sudadera Estructura',
        price: '$1,200 MXN',
        desc: 'GRIS CEMENTO / 400GSM',
        image: sudaderaImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 2,
        name: 'Camiseta Cemento',
        price: '$850 MXN',
        desc: 'NEGRO CARBÓN / BOXY FIT',
        image: camisetaImg,
        badge: 'EDICIÓN LIMITADA'
    },
    {
        id: 3,
        name: 'Pantalón Cargo Raw',
        price: '$1,500 MXN',
        desc: 'VERDE INDUSTRIAL / RIPSTOP',
        image: cargoImg,
        badge: null
    },
    {
        id: 4,
        name: 'Chamarra Industrial',
        price: '$2,200 MXN',
        desc: 'PLATA REFLEJANTE / WATERPROOF',
        image: chamarraImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 5,
        name: 'Sudadera Concreto',
        price: '$1,350 MXN',
        desc: 'GRIS ARENA / BOXY FIT',
        image: sudaderaImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 6,
        name: 'Tee Manifiesto',
        price: '$900 MXN',
        desc: 'OFF-WHITE / HEAVY COTTON',
        image: camisetaImg,
        badge: 'EDICIÓN LIMITADA'
    },
    {
        id: 7,
        name: 'Cargo Táctico',
        price: '$1,800 MXN',
        desc: 'NEGRO MATE / MULTI-POCKETS',
        image: cargoImg,
        badge: null
    },
    {
        id: 8,
        name: 'Chamarra Radar',
        price: '$2,500 MXN',
        desc: 'CARBÓN / WATERPROOF',
        image: chamarraImg,
        badge: 'NUEVO DROP'
    }
];

const Home = () => {
    const [user, setUser] = useState(null);

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

    return (
        <div className="home-container">
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

                <div className="nav-links">
                    <a href="#">DROPS</a>
                    <a href="#">COLECCIONES</a>
                    <a href="#">ARCHIVOS</a>
                    <a href="#">NOSOTROS</a>
                </div>

                <div className="nav-actions">
                    <div className="search-bar">
                        <Search size={14} color="#666" />
                        <input type="text" placeholder="BUSCAR..." />
                    </div>
                    <ShoppingBag size={20} />
                    <div className="account-section">
                        {user ? (
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <span className="user-name" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-blue)' }}>
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

            {/* Hero */}
            <section className="hero-home">
                <div className="hero-content-home">
                    <h1>SUBTERRÁNEO</h1>
                    <h1 className="blue-italic">ES NUESTRO</h1>
                    <h1>HOGAR</h1>

                    <div className="hero-subtitle">
                        Nueva colección 'Brutalismo Urbano' ya disponible.
                        Cortes oversize, algodón de 400gsm.
                    </div>

                    <div className="hero-ctas">
                        <button className="btn-cta primary">COMPRAR AHORA</button>
                        <button className="btn-cta outline">VER LOOKBOOK</button>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <div className="promo-banner">
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="promo-item">EDICIÓN LIMITADA //</div>
                        <div className="promo-item">STOCK CRÍTICO //</div>
                        <div className="promo-item">ENVÍOS GLOBALES //</div>
                        <div className="promo-item">BRUTALISMO URBANO //</div>
                    </React.Fragment>
                ))}
            </div>

            {/* Product Grid */}
            <section className="products-section">
                <div className="section-header">
                    <h2>ÚLTIMOS DROPS</h2>
                    <div className="filter-btns">
                        <button className="filter-btn">CAMISETAS</button>
                        <button className="filter-btn">SUDADERAS</button>
                        <button className="filter-btn">PANTALONES</button>
                    </div>
                </div>

                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} />
                                {product.badge && <div className="product-badge">{product.badge}</div>}
                            </div>
                            <div className="product-info">
                                <div className="product-name-price">
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                </div>
                                <div className="product-price">{product.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Branding Section */}
            <section className="raw-section">
                <div className="raw-bg-text">RAW</div>
                <div className="raw-content">
                    <h2>
                        NUESTRA ESTÉTICA NO PIDE <em>PERMISO</em>. ES UNA RESPUESTA BRUTALISTA AL DISEÑO CONVENCIONAL.
                    </h2>
                    <div style={{ marginTop: '2rem', height: '2px', background: '#1A5CFF', width: '300px' }}></div>
                    <p style={{ marginTop: '1rem', fontSize: '0.7rem', fontWeight: '800', color: '#666' }}>
                        PROCESO DE MANUFACTURA: CIUDAD DE MÉXICO
                    </p>
                </div>

                <div className="raw-visuals">
                    <div className="raw-img">
                        <div style={{ fontSize: '0.6rem', fontWeight: '800' }}>DETAIL [001]</div>
                    </div>
                    <div className="raw-img">
                        <div style={{ fontSize: '2rem', fontWeight: '900' }}>2</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="header-logo">
                            <ShinyText
                                text="HOMESTYLE"
                                speed={2}
                                delay={0.5}
                                className="logo-text-large"
                                color="#b5b5b5"
                                shineColor="#ffffff"
                            />
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#666', lineHeight: '1.6' }}>
                            Concepto urbano nacido en las calles. Ropa para quienes viven la ciudad sin filtros.
                        </p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ border: '1px solid #333', padding: '0.5rem' }}>IG</div>
                            <div style={{ border: '1px solid #333', padding: '0.5rem' }}>FB</div>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>TIENDA</h4>
                        <ul>
                            <li><a href="#">TODOS LOS PRODUCTOS</a></li>
                            <li><a href="#">BÁSICOS</a></li>
                            <li><a href="#">COLABORACIONES</a></li>
                            <li><a href="#">GUÍA DE TALLAS</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>SOPORTE</h4>
                        <ul>
                            <li><a href="#">ENVÍOS Y DEVOLUCIONES</a></li>
                            <li><a href="#">RASTREO DE PEDIDO</a></li>
                            <li><a href="#">CONTÁCTANOS</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>NEWSLETTER</h4>
                        <p style={{ fontSize: '0.75rem', marginBottom: '1.5rem', color: '#666' }}>
                            ÚNETE AL ARCHIVO. 10% OFF EN TU PRIMERA COMPRA.
                        </p>
                        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                            <input type="email" placeholder="TU@EMAIL.COM" />
                            <button type="submit">SUSCRIBIRSE</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>© 2024 HOMESTYLE INDUSTRIAL. CD. MX. TODOS LOS DERECHOS RESERVADOS.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>PRIVACIDAD</span>
                        <span>TÉRMINOS</span>
                        <span>COOKIES</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
