import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Plus, X, Upload, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import PillNav from '../../components/PillNav/PillNav';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import { useCollections } from '../../context/CollectionsContext';
import './Colecciones.css';

import cargoImg from '../../assets/images/pantalon_cargo.png';
import camisetaImg from '../../assets/images/camiseta_gris.png';

const FILTERS = ['TODOS_LOS_DATOS', 'URBAN_CHAOS', 'INDUSTRIAL_CORE', 'TECH_SHELL', 'MINIMAL_VOID'];
const EMPTY = { name: '', ref: '', tag: 'URBAN_CHAOS', desc: '', price: '', image: '' };

export default function Colecciones() {
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('TODOS_LOS_DATOS');
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null); // collection being edited
    const [form, setForm] = useState(EMPTY);
    const [previewUrl, setPreviewUrl] = useState('');
    const { cartCount, addToCart } = useCart();
    const { collections, addCollection, editCollection, deleteCollection } = useCollections();

    useEffect(() => {
        const stored = localStorage.getItem('homestyle_user');
        if (stored) setUser(JSON.parse(stored));
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('homestyle_user');
        setUser(null);
    };

    // Open ADD modal
    const openAdd = () => {
        setEditTarget(null);
        setForm(EMPTY);
        setPreviewUrl('');
        setShowModal(true);
    };

    // Open EDIT modal prefilled
    const openEdit = (col, e) => {
        e.stopPropagation();
        setEditTarget(col);
        setForm({
            name: col.name,
            ref: col.ref,
            tag: col.tag,
            desc: col.desc,
            price: String(col.price),
            image: col.image,
        });
        setPreviewUrl(typeof col.image === 'string' && col.image.startsWith('blob') ? col.image : '');
        setShowModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setForm(f => ({ ...f, image: url }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        const data = { ...form, image: previewUrl || form.image };
        if (editTarget) {
            editCollection(editTarget.id, data);
        } else {
            addCollection(data);
        }
        setShowModal(false);
        setForm(EMPTY);
        setPreviewUrl('');
        setEditTarget(null);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm('¿Eliminar esta colección?')) deleteCollection(id);
    };

    const filtered = filter === 'TODOS_LOS_DATOS'
        ? collections
        : collections.filter(c => c.tag === filter);

    const now = new Date();
    // Solo las colecciones que aún no han sido publicadas (pendientes)
    const newEntries = collections.filter(c => new Date(c.publishedAt) > now);

    return (
        <div className="col-container">
            {/* ── Navbar ── */}
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
                        { label: 'COLECCIONES', href: '/colecciones' },
                        { label: 'DROPS', href: '/drops' },
                        { label: 'NOSOTROS', href: '/nosotros' },
                        { label: 'INICIO', href: '/home' },
                    ]}
                    activeHref="/colecciones"
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#000000" pillColor="#ffffff"
                    hoveredPillTextColor="#ffffff" pillTextColor="#000000"
                    theme="dark" initialLoadAnimation={false}
                />

                <div className="nav-actions">
                    <div className="search-bar">
                        <Search size={14} color="#666" />
                        <input type="text" placeholder="BUSCAR ARCHIVO..." />
                    </div>
                    <Link to="/carrito" style={{ color: 'inherit', display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="col-cart-badge">{cartCount}</span>}
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

            {/* ── Hero ── */}
            <section className="col-hero">
                <div className="col-hero-left">
                    <div className="col-system-badge">SYSTEM V2.04</div>
                    <h1 className="col-hero-title">COLECCIONES_</h1>
                    <p className="col-hero-desc">
                        INGENIERÍA TEXTIL PARA EL CAOS URBANO. ESTÉTICA INDUSTRIAL,<br />
                        CORTES OVERSIZE Y RESISTENCIA TÉCNICA.
                    </p>
                </div>
                <button className="btn-add-col" onClick={openAdd}>
                    <Plus size={16} /> AGREGAR COLECCIÓN
                </button>
            </section>

            {/* ── Filter Tabs ── */}
            <div className="col-filters">
                <span className="filter-label">FILTRAR POR ID:</span>
                {FILTERS.map(f => (
                    <button key={f}
                        className={`filter-pill ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}>
                        {f}
                    </button>
                ))}
            </div>

            {/* ── Collections Grid (Smaller Cards) ── */}
            <section className="col-grid-section">
                <div className="col-grid">
                    {filtered.map(col => {
                        const isPending = new Date(col.publishedAt) > now;
                        return (
                            <div className="col-card" key={col.id}>
                                <div className="col-card-img-wrap">
                                    <img src={col.image} alt={col.name} />
                                    <span className="col-card-ref">{col.ref}</span>
                                    {isPending && (
                                        <div className="col-pending-banner">⏳ PUBLICACIÓN PENDIENTE</div>
                                    )}
                                    {/* Edit / Delete overlay */}
                                    <div className="col-card-actions">
                                        <button className="col-action-btn col-edit" onClick={(e) => openEdit(col, e)} title="Editar">
                                            <Pencil size={13} />
                                        </button>
                                        <button className="col-action-btn col-delete" onClick={(e) => handleDelete(col.id, e)} title="Eliminar">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-card-info">
                                    <h3>{col.name}</h3>
                                    <p>{col.desc}</p>
                                    <div className="col-card-footer">
                                        <span className="col-card-price">${col.price.toLocaleString('es-CO')} COP</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Featured Banner ── */}
            <section className="col-featured">
                <div className="col-featured-left">
                    <div className="col-featured-badge">🔴 LIVE DROP: EDICIÓN LIMITADA</div>
                    <h2>OVERSIZE<br />ESSENTIALS</h2>
                    <p>PIEZAS BÁSICAS RE-IMAGINADAS. SILUETAS EXTREMAS PARA EL DÍA A DÍA. SIN LOGOTIPOS, SOLO CONSTRUCCIÓN PURA.</p>
                    <div className="col-featured-ctas">
                        <button className="btn-featured-buy"
                            onClick={() => addToCart({ id: 99, name: 'OVERSIZE ESSENTIALS', price: 159000, image: cargoImg, category: 'LIVE DROP' })}>
                            COMPRAR AHORA
                        </button>
                        <Link to="/lookbook" className="btn-featured-look">VER LOOKBOOK</Link>
                    </div>
                </div>
                <div className="col-featured-right">
                    <img src={camisetaImg} alt="Oversize Essentials" />
                </div>
            </section>

            {/* ── New Entries ── */}
            <section className="col-new-entries">
                <div className="col-new-entries-header">
                    <h2>NUEVAS_ENTRADAS<span className="col-count">[{newEntries.length}]</span></h2>
                    <span className="col-new-label">PRÓXIMOS LANZAMIENTOS</span>
                </div>

                {/* Banner de anuncio */}
                {newEntries.length > 0 && (
                    <div className="col-announce-banner">
                        <span className="col-announce-dot" />
                        <p>
                            <strong>⏰ EN 24 HORAS</strong> — Las siguientes colecciones saldrán a la venta.
                            Prepárate para el lanzamiento.
                        </p>
                    </div>
                )}

                {newEntries.length === 0 ? (
                    <div className="col-no-pending">
                        <p>No hay colecciones pendientes de publicación en este momento.</p>
                    </div>
                ) : (
                    <div className="col-new-grid">
                        {newEntries.slice(0, 4).map(item => (
                            <div className="col-new-card" key={item.id} style={{ cursor: 'default' }}>
                                <div className="col-new-img-wrap">
                                    <img src={item.image} alt={item.name} style={{ filter: 'grayscale(70%)' }} />
                                    <span className="col-new-tag tag-pending">PRÓXIMAMENTE</span>
                                </div>
                                <div className="col-new-info">
                                    <p className="col-new-name">{item.name}</p>
                                    <p className="col-pending-txt">🔒 DISPONIBLE EN 24H — ${item.price.toLocaleString('es-CO')} COP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Footer ── */}
            <Footer />

            {/* ── Add / Edit Modal ── */}
            {showModal && (
                <div className="col-modal-backdrop" onClick={() => setShowModal(false)}>
                    <div className="col-modal" onClick={e => e.stopPropagation()}>
                        <div className="col-modal-header">
                            <h2>{editTarget ? 'EDITAR COLECCIÓN' : 'AGREGAR COLECCIÓN'}</h2>
                            <button className="col-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form className="col-modal-form" onSubmit={handleSubmit}>
                            <div className="cm-field">
                                <label>NOMBRE *</label>
                                <input placeholder="EJ. VOID SERIES" value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div className="cm-row">
                                <div className="cm-field">
                                    <label>PRECIO (COP) *</label>
                                    <input type="number" placeholder="120000" value={form.price} min={0}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
                                </div>
                                <div className="cm-field">
                                    <label>CATEGORÍA</label>
                                    <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
                                        {FILTERS.filter(f => f !== 'TODOS_LOS_DATOS').map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="cm-row">
                                <div className="cm-field">
                                    <label>REFERENCIA</label>
                                    <input placeholder="EJ. REF_VS01" value={form.ref}
                                        onChange={e => setForm(f => ({ ...f, ref: e.target.value }))} />
                                </div>
                            </div>
                            <div className="cm-field">
                                <label>DESCRIPCIÓN</label>
                                <textarea placeholder="Descripción de la colección..."
                                    value={form.desc}
                                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                                    rows={2} />
                            </div>
                            <div className="cm-field">
                                <label>IMAGEN</label>
                                <label className="cm-upload-btn" htmlFor="col-img-input">
                                    <Upload size={14} /> SUBIR IMAGEN
                                    <input id="col-img-input" type="file" accept="image/*" style={{ display: 'none' }}
                                        onChange={handleImageChange} />
                                </label>
                                {(previewUrl || (editTarget && editTarget.image)) && (
                                    <img src={previewUrl || editTarget?.image} alt="preview" className="cm-preview" />
                                )}
                            </div>
                            {!editTarget && (
                                <p className="cm-publish-note">
                                    ⏰ Esta colección aparecerá en la Página Principal en <strong>24 horas</strong>.
                                </p>
                            )}
                            <div className="cm-actions">
                                <button type="button" className="cm-btn-cancel" onClick={() => setShowModal(false)}>CANCELAR</button>
                                <button type="submit" className="cm-btn-save">
                                    {editTarget ? 'GUARDAR CAMBIOS' : 'AGREGAR COLECCIÓN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
