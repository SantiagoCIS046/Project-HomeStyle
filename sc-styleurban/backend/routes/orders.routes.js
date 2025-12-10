import express from 'express';
import { obtenerPedido, obtenerTodosPedidos } from '../utils/database.js';

const router = express.Router();

/**
 * GET /api/pedidos/:pedidoId/estado
 * Obtener estado de un pedido
 */
router.get('/:pedidoId/estado', async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pedido = await obtenerPedido({ pedidoId });

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      pedidoId: pedido.pedidoId,
      estado: pedido.estado,
      monto: pedido.monto,
      metodoPago: pedido.metodoPago,
      fechaCreacion: pedido.fechaCreacion,
      fechaPago: pedido.fechaPago || null
    });

  } catch (error) {
    console.error('Error obteniendo estado del pedido:', error);
    res.status(500).json({ error: 'Error obteniendo estado' });
  }
});

/**
 * GET /api/pedidos/:pedidoId
 * Obtener detalles completos de un pedido
 */
router.get('/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pedido = await obtenerPedido({ pedidoId });

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      pedido
    });

  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    res.status(500).json({ error: 'Error obteniendo pedido' });
  }
});

/**
 * GET /api/pedidos
 * Obtener todos los pedidos
 */
router.get('/', async (req, res) => {
  try {
    const pedidos = await obtenerTodosPedidos();

    res.json({
      success: true,
      total: pedidos.length,
      pedidos
    });

  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    res.status(500).json({ error: 'Error obteniendo pedidos' });
  }
});

export default router;

