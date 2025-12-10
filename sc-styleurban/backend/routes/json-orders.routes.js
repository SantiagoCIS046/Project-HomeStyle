import express from 'express';
import { leerDB, escribirDB } from '../utils/database.js';

const router = express.Router();

/**
 * GET /orders
 * Obtener todas las órdenes (compatible con JSON Server)
 */
router.get('/orders', async (req, res) => {
  try {
    const db = await leerDB();
    res.json(db.orders || []);
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    res.status(500).json({ error: 'Error obteniendo órdenes' });
  }
});

/**
 * GET /orders/:id
 * Obtener una orden por ID (compatible con JSON Server)
 */
router.get('/orders/:id', async (req, res) => {
  try {
    const db = await leerDB();
    const order = db.orders?.find(o => o.id === req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error obteniendo orden:', error);
    res.status(500).json({ error: 'Error obteniendo orden' });
  }
});

/**
 * POST /orders
 * Crear una nueva orden (compatible con JSON Server)
 */
router.post('/orders', async (req, res) => {
  try {
    const db = await leerDB();
    
    if (!db.orders) {
      db.orders = [];
    }
    
    // Generar ID único
    const newId = db.orders.length > 0 
      ? String(Math.max(...db.orders.map(o => parseInt(o.id) || 0)) + 1)
      : '1';
    
    const newOrder = {
      ...req.body,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    db.orders.push(newOrder);
    await escribirDB(db);
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creando orden:', error);
    res.status(500).json({ error: 'Error creando orden' });
  }
});

/**
 * PATCH /orders/:id
 * Actualizar una orden (compatible con JSON Server)
 */
router.patch('/orders/:id', async (req, res) => {
  try {
    const db = await leerDB();
    const orderIndex = db.orders?.findIndex(o => o.id === req.params.id);
    
    if (orderIndex === -1 || orderIndex === undefined) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    db.orders[orderIndex] = {
      ...db.orders[orderIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    await escribirDB(db);
    
    res.json(db.orders[orderIndex]);
  } catch (error) {
    console.error('Error actualizando orden:', error);
    res.status(500).json({ error: 'Error actualizando orden' });
  }
});

/**
 * DELETE /orders/:id
 * Eliminar una orden (compatible con JSON Server)
 */
router.delete('/orders/:id', async (req, res) => {
  try {
    const db = await leerDB();
    const orderIndex = db.orders?.findIndex(o => o.id === req.params.id);
    
    if (orderIndex === -1 || orderIndex === undefined) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    const deletedOrder = db.orders.splice(orderIndex, 1)[0];
    await escribirDB(db);
    
    res.json(deletedOrder);
  } catch (error) {
    console.error('Error eliminando orden:', error);
    res.status(500).json({ error: 'Error eliminando orden' });
  }
});

export default router;

