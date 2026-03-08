import React, { createContext, useContext, useState } from 'react';

// Default pre-loaded collections
import sudaderaImg from '../assets/images/sudadera_brutalista.png';
import cargoImg from '../assets/images/pantalon_cargo.png';
import camisetaImg from '../assets/images/camiseta_gris.png';
import chamarraImg from '../assets/images/chamarra_negra.png';

const CollectionsContext = createContext(null);
export const useCollections = () => useContext(CollectionsContext);

// Helper: compute publishDate = now + 24 hours
export const scheduledPublish = () => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

const SEED = [
    { id: 1, ref: 'REF_OC001', tag: 'URBAN_CHAOS', name: 'URBAN CHAOS', desc: 'Cortes asimétricos y texturas de asfalto.', image: sudaderaImg, price: 128000, publishedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 2, ref: 'REF_IC401', tag: 'INDUSTRIAL_CORE', name: 'INDUSTRIAL CORE', desc: 'Inspirado en maquinaria pesada y zonas de carga.', image: chamarraImg, price: 185000, publishedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 3, ref: 'REF_TS_M1', tag: 'TECH_SHELL', name: 'TECH SHELL', desc: 'Máximo rendimiento en condiciones hostiles.', image: camisetaImg, price: 210000, publishedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 4, ref: 'REF_MV_21', tag: 'MINIMAL_VOID', name: 'MINIMAL VOID', desc: 'Sin branding, sin ruido. Solo forma y tela.', image: cargoImg, price: 95000, publishedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];

export const CollectionsProvider = ({ children }) => {
    const [collections, setCollections] = useState(SEED);

    // Add a new collection. publishedAt defaults to now + 24 hours.
    const addCollection = (data) => {
        const col = {
            id: Date.now(),
            ref: data.ref || `REF_${String(data.name).replace(/\s+/g, '_').toUpperCase().slice(0, 6)}`,
            tag: data.tag || 'URBAN_CHAOS',
            name: String(data.name).toUpperCase(),
            desc: data.desc || '',
            image: data.image || camisetaImg,
            price: Number(data.price) || 99000,
            publishedAt: scheduledPublish(),   // visible in Home after 24h
        };
        setCollections(prev => [col, ...prev]);
        return col;
    };

    // Edit an existing collection by id
    const editCollection = (id, updates) => {
        setCollections(prev => prev.map(c =>
            c.id === id ? { ...c, ...updates, name: String(updates.name || c.name).toUpperCase() } : c
        ));
    };

    // Delete a collection by id
    const deleteCollection = (id) => {
        setCollections(prev => prev.filter(c => c.id !== id));
    };

    // Collections whose publishedAt <= now (visible on Home page)
    const publishedCollections = collections.filter(
        c => new Date(c.publishedAt) <= new Date()
    );

    return (
        <CollectionsContext.Provider value={{ collections, publishedCollections, addCollection, editCollection, deleteCollection }}>
            {children}
        </CollectionsContext.Provider>
    );
};

export default CollectionsContext;
