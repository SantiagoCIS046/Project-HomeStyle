import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import PillNav from '../../components/PillNav/PillNav';
import Footer from '../../components/Footer/Footer';
import TiltedCard from '../../components/TiltedCard/TiltedCard';
import { useCart } from '../../context/CartContext';
import './Nosotros.css';

// Assets
import heroImg from '../../assets/images/nosotros_hero_bg.png';
import philHoodieImg from '../../assets/images/nosotros_philosophy_hoodie.png';
import philShoesImg from '../../assets/images/nosotros_philosophy_shoes.png';

const Nosotros = () => {
    const [user, setUser] = useState(null);
    const { cartCount } = useCart();

    useEffect(() => {
        const storedUser = localStorage.getItem('homestyle_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('homestyle_user');
        setUser(null);
    };

    return (
        <div className="nosotros-container">
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
                        { label: 'DROPS', href: '/drops' },
                        { label: 'COLECCIONES', href: '/colecciones' },
                        { label: 'NOSOTROS', href: '/nosotros' },
                        { label: 'INICIO', href: '/home' },
                    ]}
                    activeHref="/nosotros"
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
                            <span className="cart-count-badge">{cartCount}</span>
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

            {/* Hero Section */}
            <section className="nosotros-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImg})` }}>
                <div className="nosotros-hero-content">
                    <span className="manifiesto-tag">MANIFIESTO V1.0</span>
                    <h1 className="hero-title">
                        NACIDO EN EL <span className="blue-italic">CAOS URBANO.</span><br />
                        DISEÑADO PARA LA JUNGLA DE CONCRETO.
                    </h1>
                    <p className="hero-desc">
                        No fabricamos ropa, forjamos armaduras para el asfalto. El exceso de tela no es un error, es nuestra declaración de guerra.
                    </p>
                </div>
            </section>

            {/* Filosofía Section */}
            <section className="filosofia-section">
                <div className="filosofia-grid">
                    <div className="filosofia-text">
                        <h2 className="section-title">LA FILOSOFÍA DEL EXCESO</h2>
                        <p className="section-p">
                            El 'oversize' en HomeStyle no es simplemente una talla más grande. Es un movimiento de libertad. Es el rechazo a las siluetas restrictivas impuestas por la moda convencional.
                        </p>
                        
                        <div className="filosofia-points">
                            <div className="point-card">
                                <h3>01. LIBERTAD</h3>
                                <p>MOVIMIENTO SIN RESTRICCIONES EN UN ENTORNO MÁS HOSTIL.</p>
                            </div>
                            <div className="point-card">
                                <h3>02. IDENTIDAD</h3>
                                <p>OCUPAR MÁS ESPACIO FÍSICO COMO ACTO DE REBELIÓN VISUAL.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="filosofia-images">
                        <div className="img-wrapper main-img">
                            <TiltedCard
                                imageSrc={philHoodieImg}
                                altText="Oversize Philosophy"
                                containerHeight="100%"
                                containerWidth="100%"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={12}
                                scaleOnHover={1.05}
                                showMobileWarning={false}
                                showTooltip={false}
                            />
                        </div>
                        <div className="img-wrapper second-img">
                            <TiltedCard
                                imageSrc={philShoesImg}
                                altText="Urban Identity"
                                containerHeight="100%"
                                containerWidth="100%"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={15}
                                scaleOnHover={1.05}
                                showMobileWarning={false}
                                showTooltip={false}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Producción Section */}
            <section className="produccion-section">
                <div className="produccion-header">
                    <span className="tech-tag">| ESPECIFICACIONES TÉCNICAS |</span>
                    <h2 className="section-title large">ÉTICA DE PRODUCCIÓN Y MATERIALES</h2>
                    <span className="version-tag">v2.4</span>
                </div>

                <div className="produccion-grid">
                    <div className="tech-item">
                        <div className="tech-icon">🦾</div>
                        <h3>Heavyweight Cotton</h3>
                        <p>Utilizamos solo algodón de 400 GSM para garantizar una estructura que mantenga su forma radical tras cientos de lavados.</p>
                        <span className="tech-code">URBAN_FABRIC_001</span>
                    </div>

                    <div className="tech-item">
                        <div className="tech-icon">🏭</div>
                        <h3>Kilómetro Cero</h3>
                        <p>Toda nuestra producción es local. Reducimos la huella de carbono mientras apoyamos a los talleres que entienden nuestra estética.</p>
                        <span className="tech-code">LOCAL_PRODUCTION_002</span>
                    </div>

                    <div className="tech-item">
                        <div className="tech-icon">♻️</div>
                        <h3>Zero Waste Pattern</h3>
                        <p>Nuestros patrones oversize están optimizados digitalmente para desperdiciar menos del 3% de tejido por cada prenda cortada.</p>
                        <span className="tech-code">ZERO_WASTE_V1_003</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="nosotros-cta">
                <div className="cta-overlay">
                    <h2 className="cta-title">ÚNETE A LA RESI<span className="blue-italic">STENCIA</span></h2>
                    <p className="cta-desc">NO SIGAS LA CORRIENTE, SÉ LA CORRIENTE.</p>
                    <div className="cta-buttons">
                        <Link to="/colecciones" className="btn-nosotros primary">VER COLECCIÓN</Link>
                        <button className="btn-nosotros outline">SUSCRIBIRME</button>
                    </div>
                    <div className="cta-bg-text">URBAN</div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Nosotros;
