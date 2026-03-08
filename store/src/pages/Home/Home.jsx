import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import CurvedLoop from '../../components/CurvedLoop/CurvedLoop';
import TiltedCard from '../../components/TiltedCard/TiltedCard';
import PillNav from '../../components/PillNav/PillNav';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import { useCollections } from '../../context/CollectionsContext';
import './Home.css';

// Assets
import logoGridSvg from '../../assets/logo_grid.svg';
import sudaderaImg from '../../assets/images/sudadera_brutalista.png';
import cargoImg from '../../assets/images/pantalon_cargo.png';
import camisetaImg from '../../assets/images/camiseta_gris.png';
import chamarraImg from '../../assets/images/chamarra_negra.png';

const initialProducts = [
    {
        id: 1,
        name: 'Sudadera Estructura',
        price: '$120,000 COP',
        desc: 'GRIS CEMENTO / 400GSM',
        image: sudaderaImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 2,
        name: 'Camiseta Cemento',
        price: '$85,000 COP',
        desc: 'NEGRO CARBÓN / BOXY FIT',
        image: camisetaImg,
        badge: 'EDICIÓN LIMITADA'
    },
    {
        id: 3,
        name: 'Pantalón Cargo Raw',
        price: '$150,000 COP',
        desc: 'VERDE INDUSTRIAL / RIPSTOP',
        image: cargoImg,
        badge: null
    },
    {
        id: 4,
        name: 'Chamarra Industrial',
        price: '$220,000 COP',
        desc: 'PLATA REFLEJANTE / WATERPROOF',
        image: chamarraImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 5,
        name: 'Sudadera Concreto',
        price: '$135,000 COP',
        desc: 'GRIS ARENA / BOXY FIT',
        image: sudaderaImg,
        badge: 'NUEVO DROP'
    },
    {
        id: 6,
        name: 'Tee Manifiesto',
        price: '$90,000 COP',
        desc: 'OFF-WHITE / HEAVY COTTON',
        image: camisetaImg,
        badge: 'EDICIÓN LIMITADA'
    },
    {
        id: 7,
        name: 'Cargo Táctico',
        price: '$180,000 COP',
        desc: 'NEGRO MATE / MULTI-POCKETS',
        image: cargoImg,
        badge: null
    },
    {
        id: 8,
        name: 'Chamarra Radar',
        price: '$250,000 COP',
        desc: 'CARBÓN / WATERPROOF',
        image: chamarraImg,
        badge: 'NUEVO DROP'
    }
];

const Home = () => {
    const [user, setUser] = useState(null);
    const [activeFilter, setActiveFilter] = useState('TODOS');
    const [productList, setProductList] = useState(initialProducts);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'CAMISETAS',
        desc: 'NUEVO DROP / CUSTOM',
    });
    const { addToCart, cartCount } = useCart();
    const { collections, publishedCollections } = useCollections();

    // Tick cada 60 s para que las colecciones pendientes se autopubliquen en el UI
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(id);
    }, []);

    // Colecciones aún no publicadas (aparecen en la sección "Próximas")
    const pendingCollections = collections.filter(
        c => new Date(c.publishedAt) > new Date()
    );

    // Merge local products + published collections (dedup by id)
    const mergedProducts = [
        ...productList,
        ...publishedCollections
            .filter(col => !productList.some(p => p.id === col.id))
            .map(col => ({
                id: col.id,
                name: col.name,
                price: `$${col.price.toLocaleString('es-CO')} COP`,
                desc: col.tag,
                image: col.image,
                badge: 'COLECCIÓN',
                category: 'COLECCIONES',
            })),
    ];

    const handleAddProduct = (e) => {
        e.preventDefault();

        let imageSrc = camisetaImg;
        if (newProduct.category === 'SUDADERAS') imageSrc = sudaderaImg;
        if (newProduct.category === 'PANTALONES') imageSrc = cargoImg;
        if (newProduct.category === 'CHAMARRAS') imageSrc = chamarraImg;

        const newEntry = {
            id: Date.now(),
            name: newProduct.name || `Nuevo ${newProduct.category}`,
            price: newProduct.price.includes('$') ? newProduct.price : `$${newProduct.price || '0'} COP`,
            desc: newProduct.desc,
            image: imageSrc,
            badge: 'NUEVO',
            category: newProduct.category // Store category to filter properly
        };

        setProductList([newEntry, ...productList]);
        setIsAddModalOpen(false);
        setNewProduct({ name: '', price: '', category: 'CAMISETAS', desc: 'NUEVO DROP / CUSTOM' });
    };

    const handleEditProductSubmit = (e) => {
        e.preventDefault();

        // If user selects "TODOS" as category, we keep the original image and category
        let imageSrc = editingProduct.image;
        let finalCategory = editingProduct.category;

        if (editingProduct.category === 'CAMISETAS') { imageSrc = camisetaImg; finalCategory = 'CAMISETAS'; }
        if (editingProduct.category === 'SUDADERAS') { imageSrc = sudaderaImg; finalCategory = 'SUDADERAS'; }
        if (editingProduct.category === 'PANTALONES') { imageSrc = cargoImg; finalCategory = 'PANTALONES'; }
        if (editingProduct.category === 'CHAMARRAS') { imageSrc = chamarraImg; finalCategory = 'CHAMARRAS'; }

        const updatedList = productList.map(prod => {
            if (prod.id === editingProduct.id) {
                return {
                    ...prod,
                    name: editingProduct.name,
                    price: editingProduct.price.includes('$') ? editingProduct.price : `$${editingProduct.price} COP`,
                    desc: editingProduct.desc,
                    category: finalCategory,
                    image: imageSrc
                };
            }
            return prod;
        });

        setProductList(updatedList);
        setIsEditModalOpen(false);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            setProductList(productList.filter(prod => prod.id !== id));
        }
    };

    const openEditModal = (product) => {
        // We try to extract just the number from the string for easier editing, or just keep string
        let priceValue = product.price.replace(/[^0-9]/g, '');

        setEditingProduct({
            ...product,
            price: priceValue,
            category: product.category || 'TODOS' // Fallback to "TODOS" to mean keep same
        });
        setIsEditModalOpen(true);
    };

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

                <PillNav
                    items={[
                        { label: 'DROPS', href: '/drops' },
                        { label: 'COLECCIONES', href: '/colecciones' },
                        { label: 'ARCHIVOS', href: '#archivos' },
                        { label: 'NOSOTROS', href: '#nosotros' }
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
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: '#1A5CFF', color: '#fff',
                                fontSize: '0.55rem', fontWeight: 800,
                                width: '16px', height: '16px',
                                borderRadius: '50%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>{cartCount}</span>
                        )}
                    </Link>
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
                        <Link to="/lookbook" className="btn-cta outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>VER LOOKBOOK</Link>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <CurvedLoop
                marqueeText="EDICIÓN LIMITADA // STOCK CRÍTICO // ENVÍOS GLOBALES // BRUTALISMO URBANO // "
                speed={1.5}
                curveAmount={0}
                interactive={false}
            />

            {/* Product Grid */}
            <section className="products-section">
                <div className="section-header">
                    <h2>ÚLTIMOS DROPS</h2>
                    <div className="filter-btns">
                        <button
                            className={`filter-btn ${activeFilter === 'TODOS' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('TODOS')}
                        >TODOS</button>
                        <button
                            className={`filter-btn ${activeFilter === 'CAMISETAS' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('CAMISETAS')}
                        >CAMISETAS</button>
                        <button
                            className={`filter-btn ${activeFilter === 'SUDADERAS' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('SUDADERAS')}
                        >SUDADERAS</button>
                        <button
                            className={`filter-btn ${activeFilter === 'PANTALONES' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('PANTALONES')}
                        >PANTALONES</button>
                        <button
                            className={`filter-btn ${activeFilter === 'CHAMARRAS' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('CHAMARRAS')}
                        >CHAMARRAS</button>
                    </div>
                    <button
                        className="btn-cta primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', borderRadius: '4px' }}
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        + AGREGAR PRODUCTO
                    </button>
                </div>

                <div className="product-grid">
                    {mergedProducts.filter(product => {
                        if (activeFilter === 'TODOS') return true;
                        if (product.category) return product.category === activeFilter;
                        if (activeFilter === 'CAMISETAS' && (product.name.includes('Camiseta') || product.name.includes('Tee') || product.name.includes('CAMISETA') || product.name.includes('TEE'))) return true;
                        if (activeFilter === 'SUDADERAS' && (product.name.includes('Sudadera') || product.name.includes('SUDADERA'))) return true;
                        if (activeFilter === 'PANTALONES' && (product.name.includes('Pantalón') || product.name.includes('Cargo') || product.name.includes('CARGO'))) return true;
                        if (activeFilter === 'CHAMARRAS' && (product.name.includes('Chamarra') || product.name.includes('CHAMARRA'))) return true;
                        return false;
                    }).map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <TiltedCard
                                    imageSrc={product.image}
                                    altText={product.name}
                                    captionText={product.name}
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    imageHeight="100%"
                                    imageWidth="100%"
                                    rotateAmplitude={12}
                                    scaleOnHover={1.05}
                                    showMobileWarning={false}
                                    showTooltip={false}
                                    displayOverlayContent={!!product.badge}
                                    overlayContent={
                                        product.badge && <div className="product-badge">{product.badge}</div>
                                    }
                                />
                            </div>
                            <div className="product-info">
                                <div className="product-name-price">
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                </div>
                                <div className="product-price">{product.price}</div>
                            </div>

                            {activeFilter !== 'TODOS' && (
                                <div className="product-edit-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="btn-cta outline"
                                        style={{ padding: '0.4rem', fontSize: '0.6rem', flex: 1, borderColor: '#666', color: '#ccc' }}
                                    >
                                        EDITAR
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="btn-cta outline"
                                        style={{ padding: '0.4rem', fontSize: '0.6rem', flex: 1, borderColor: '#ff4444', color: '#ff4444' }}
                                    >
                                        ELIMINAR
                                    </button>
                                </div>
                            )}

                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    category: product.category || 'HOMESTYLE',
                                    price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
                                    image: product.image,
                                })}
                            >
                                AGREGAR AL CARRITO
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Próximas Colecciones ── */}
            {pendingCollections.length > 0 && (
                <section className="upcoming-section">
                    {/* Header */}
                    <div className="upcoming-header">
                        <div className="upcoming-header-left">
                            <span className="upcoming-sys-tag">SISTEMA // PRÓXIMOS LANZAMIENTOS</span>
                            <h2 className="upcoming-title">COLECCIONES_<em>PRÓXIMAS</em></h2>
                            <p className="upcoming-desc">
                                Estas piezas saldrán a la venta en las próximas 24 horas.
                                Revisa esta sección para ser el primero en adquirirlas.
                            </p>
                        </div>
                        <div className="upcoming-announce">
                            <span className="upcoming-dot" />
                            <span>EN 24 HORAS A LA VENTA</span>
                        </div>
                    </div>

                    {/* Grid de tarjetas */}
                    <div className="upcoming-grid">
                        {pendingCollections.map(col => {
                            const isLive = new Date(col.publishedAt) <= new Date();
                            return (
                                <div className="upcoming-card" key={col.id}>
                                    <div className="upcoming-card-img">
                                        <img
                                            src={col.image}
                                            alt={col.name}
                                            style={{ filter: isLive ? 'none' : 'grayscale(75%) brightness(0.7)' }}
                                        />
                                        <div className="upcoming-card-overlay">
                                            <span className={`upcoming-status-tag ${isLive ? 'status-live' : 'status-pending'}`}>
                                                {isLive ? '🟢 EN VENTA' : '⏳ PRONTO'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="upcoming-card-info">
                                        <p className="upcoming-card-ref">{col.ref}</p>
                                        <h3 className="upcoming-card-name">{col.name}</h3>
                                        <p className="upcoming-card-price">
                                            ${col.price.toLocaleString('es-CO')} COP
                                        </p>
                                        {isLive ? (
                                            <button
                                                className="upcoming-card-btn upcoming-btn-buy"
                                                onClick={() => addToCart({ id: col.id, name: col.name, price: col.price, image: col.image, category: col.tag })}
                                            >
                                                + AGREGAR AL CARRITO
                                            </button>
                                        ) : (
                                            <button className="upcoming-card-btn upcoming-btn-wait" disabled>
                                                🔒 DISPONIBLE EN 24H
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Footer */}
            <Footer />

            {/* Modal for adding product */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>AGREGAR NUEVO CUADRO (PRODUCTO)</h2>
                        <form onSubmit={handleAddProduct} className="add-product-form">
                            <div className="form-group-custom">
                                <label>NOMBRE DEL PRODUCTO</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: Camiseta Oversize"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group-custom">
                                <label>PRECIO (COP)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Ej: 120000"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group-custom">
                                <label>CATEGORÍA</label>
                                <select
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option value="CAMISETAS">CAMISETAS</option>
                                    <option value="SUDADERAS">SUDADERAS</option>
                                    <option value="PANTALONES">PANTALONES</option>
                                    <option value="CHAMARRAS">CHAMARRAS</option>
                                </select>
                            </div>
                            <div className="form-group-custom">
                                <label>DESCRIPCIÓN BREVE</label>
                                <input
                                    type="text"
                                    placeholder="Ej: NEGRO / 100% ALGODÓN"
                                    value={newProduct.desc}
                                    onChange={e => setNewProduct({ ...newProduct, desc: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cta outline" onClick={() => setIsAddModalOpen(false)}>CANCELAR</button>
                                <button type="submit" className="btn-cta primary">GUARDAR PRODUCTO</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for editing a product */}
            {isEditModalOpen && editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>EDITAR PRODUCTO</h2>
                        <form onSubmit={handleEditProductSubmit} className="add-product-form">
                            <div className="form-group-custom">
                                <label>NOMBRE DEL PRODUCTO</label>
                                <input
                                    type="text"
                                    required
                                    value={editingProduct.name}
                                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group-custom">
                                <label>PRECIO (COP)</label>
                                <input
                                    type="number"
                                    required
                                    value={editingProduct.price}
                                    onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group-custom">
                                <label>CATEGORÍA / IMAGEN</label>
                                <select
                                    value={editingProduct.category}
                                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                >
                                    <option value="CAMISETAS">CAMISETAS</option>
                                    <option value="SUDADERAS">SUDADERAS</option>
                                    <option value="PANTALONES">PANTALONES</option>
                                    <option value="CHAMARRAS">CHAMARRAS</option>
                                    <option value="TODOS">MANTENER IGUAL</option>
                                </select>
                            </div>
                            <div className="form-group-custom">
                                <label>DESCRIPCIÓN BREVE</label>
                                <input
                                    type="text"
                                    value={editingProduct.desc}
                                    onChange={e => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cta outline" onClick={() => { setIsEditModalOpen(false); setEditingProduct(null); }}>CANCELAR</button>
                                <button type="submit" className="btn-cta primary">APLICAR CAMBIOS</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
