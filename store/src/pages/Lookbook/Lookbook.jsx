import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CurvedLoop from '../../components/CurvedLoop/CurvedLoop';
import ShinyText from '../../components/ShinyText/ShinyText';
import Footer from '../../components/Footer/Footer';
import './Lookbook.css';

gsap.registerPlugin(ScrollTrigger);

// Reuse images from Home for now 
import sudaderaImg from '../../assets/images/sudadera_brutalista.png';
import cargoImg from '../../assets/images/pantalon_cargo.png';
import camisetaImg from '../../assets/images/camiseta_gris.png';
import chamarraImg from '../../assets/images/chamarra_negra.png';

const Lookbook = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        // Scroll to top when entering
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Intro animation
            gsap.from('.lb-main-title', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.lb-subtitle', {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6
            });

            // Scroll animations for gallery rows
            gsap.utils.toArray('.lb-row').forEach((row, i) => {
                const textBlock = row.querySelector('.lb-text-blocks');
                const imageBlock = row.querySelector('.lb-image-container');

                gsap.from(textBlock, {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    x: row.classList.contains('reverse') ? 50 : -50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });

                gsap.from(imageBlock, {
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0.9,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.2
                });
            });

        }, containerRef);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <div className="lookbook-container" ref={containerRef}>
            {/* Minimal Header */}
            <header className="lb-header">
                <Link to="/home" className="lb-back-btn">
                    <ArrowLeft size={20} />
                    <span>VOLVER AL INICIO</span>
                </Link>
                <div className="lb-logo">
                    <ShinyText
                        text="HOMESTYLE"
                        speed={2}
                        delay={0.5}
                        className="logo-text-lb"
                        color="#b5b5b5"
                        shineColor="#ffffff"
                    />
                </div>
                <div className="lb-spacer"></div>
            </header>

            {/* Title Section */}
            <section className="lb-title-section">
                <h1 className="lb-main-title">BRUTALISMO</h1>
                <h1 className="lb-main-title blue-italic">URBANO</h1>
                <p className="lb-subtitle">
                    COLECCIÓN CERO // VOLUMEN 1. UNA RESPUESTA DIRECTA A LA HIPER ESTETIZACIÓN.
                    PRENDAS CONSTRUIDAS PARA RESISTIR, NO PARA AGRADAR.
                </p>
            </section>

            <CurvedLoop
                marqueeText="ESTÉTICA INDUSTRIAL // SIN FILTROS // 400GSM // "
                speed={1.2}
                curveAmount={0}
                interactive={true}
            />

            {/* Gallery Section */}
            <section className="lb-gallery">
                {/* Look 01 */}
                <div className="lb-row">
                    <div className="lb-text-blocks left">
                        <h2>LOOK [001]</h2>
                        <p>LA 'SUDADERA ESTRUCTURA' REDEFINE EL VOLUMEN. HOMBROS CAÍDOS, TELA PESADA. EL CEMENTO HECHO PRENDA.</p>
                        <div className="lb-details">
                            <span>MATERIAL: 100% ALGODÓN</span>
                            <span>PESO: 400GSM</span>
                            <span>FIT: OVERSIZE / BOXY</span>
                        </div>
                    </div>
                    <div className="lb-image-container right">
                        <img src={sudaderaImg} alt="Sudadera Estructura" className="lb-img" />
                    </div>
                </div>

                {/* Look 02 */}
                <div className="lb-row reverse">
                    <div className="lb-text-blocks right">
                        <h2>LOOK [002]</h2>
                        <p>FUNCIONALIDAD PURA. EL 'PANTALÓN CARGO RAW' ELIMINA LO SUPERFLUO Y REFUERZA LO ESENCIAL.</p>
                        <div className="lb-details">
                            <span>MATERIAL: NYLON RIPSTOP</span>
                            <span>BOLSAS: 6 UTILITARIAS</span>
                            <span>FIT: RELAXED TAPERED</span>
                        </div>
                    </div>
                    <div className="lb-image-container left">
                        <img src={cargoImg} alt="Pantalón Cargo" className="lb-img" />
                    </div>
                </div>

                {/* Look 03 */}
                <div className="lb-row">
                    <div className="lb-text-blocks left">
                        <h2>LOOK [003]</h2>
                        <p>DEFENSA CONTRA LOS ELEMENTOS. LA 'CHAMARRA INDUSTRIAL' USA MATERIALES REFLEJANTES PARA HACERTE VISIBLE EN LA NIEBLA DE LA CIUDAD.</p>
                        <div className="lb-details">
                            <span>MATERIAL: POLY WATERPROOF</span>
                            <span>EXTRA: PANELES REFLEJANTES</span>
                            <span>FIT: TRUE TO SIZE / CROP</span>
                        </div>
                    </div>
                    <div className="lb-image-container right">
                        <img src={chamarraImg} alt="Chamarra Industrial" className="lb-img" />
                    </div>
                </div>

                {/* Look 04 */}
                <div className="lb-row reverse">
                    <div className="lb-text-blocks right">
                        <h2>LOOK [004]</h2>
                        <p>BÁSICO, NO SIMPLE. LA 'CAMISETA CEMENTO' ES EL LIENZO PERFECTO PARA LA CIUDAD. CORTE CUADRADO, CAÍDA PESADA.</p>
                        <div className="lb-details">
                            <span>MATERIAL: 100% ALGODÓN PRE-ENCOGIDO</span>
                            <span>PESO: 300GSM HEAVYWEIGHT</span>
                            <span>FIT: RELAXED / BOXY FIT</span>
                        </div>
                    </div>
                    <div className="lb-image-container left">
                        <img src={camisetaImg} alt="Camiseta Cemento" className="lb-img" />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Lookbook;
