import React from 'react';
import ShinyText from '../ShinyText/ShinyText';
import './Footer.css';

const Footer = () => {
    return (
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
    );
};

export default Footer;
