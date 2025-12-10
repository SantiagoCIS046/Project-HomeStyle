import express from 'express';
import nequiService from '../services/nequi.service.js';
import { guardarPedido, actualizarEstadoPedido, obtenerPedido } from '../utils/database.js';

const router = express.Router();

/**
 * POST /api/pagos/nequi/iniciar
 * Iniciar pago con Nequi
 */
router.post('/iniciar', async (req, res) => {
  try {
    const { pedidoId, monto, descripcion, telefono, datosCliente, productos } = req.body;

    // Validaciones
    if (!pedidoId || !monto || !descripcion) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requiere pedidoId, monto y descripción'
      });
    }

    // Crear transacción en Nequi
    const transaccion = await nequiService.crearTransaccion({
      pedidoId,
      monto,
      descripcion,
      telefono
    });

    // Guardar pedido en base de datos
    const pedido = await guardarPedido({
      pedidoId,
      transaccionId: transaccion.transaccionId,
      reference: transaccion.reference,
      monto,
      descripcion,
      metodoPago: 'NEQUI',
      estado: 'PENDIENTE',
      datosCliente,
      productos,
      datosPago: {
        telefono,
        qr: transaccion.qr,
        linkPago: transaccion.linkPago
      },
      fechaCreacion: transaccion.fechaCreacion,
      expiraEn: transaccion.expiraEn
    });

    console.log(`📱 Pago Nequi iniciado - Pedido: ${pedidoId}`);

    res.json({
      success: true,
      transaccionId: transaccion.transaccionId,
      reference: transaccion.reference,
      linkPago: transaccion.linkPago,
      qr: transaccion.qr,
      estado: 'PENDIENTE',
      expiraEn: transaccion.expiraEn,
      message: 'Escanea el código QR o usa el link para pagar con Nequi'
    });

  } catch (error) {
    console.error('Error iniciando pago Nequi:', error);
    res.status(500).json({
      error: 'Error al iniciar pago',
      message: error.message
    });
  }
});

/**
 * POST /api/pagos/nequi/webhook
 * Webhook para recibir confirmación de Nequi
 */
router.post('/webhook', async (req, res) => {
  try {
    const { transaccionId, estado, valor, reference } = req.body;
    const signature = req.headers['x-nequi-signature'];

    console.log('📥 Webhook Nequi recibido:', { transaccionId, estado, reference });

    // Validar webhook
    const esValido = nequiService.validarWebhook(req.body, signature);
    if (!esValido) {
      return res.status(401).json({ error: 'Webhook inválido' });
    }

    // Buscar pedido
    const pedido = await obtenerPedido({ transaccionId });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Validar monto
    if (pedido.monto !== valor) {
      console.error('⚠️ Monto no coincide:', { esperado: pedido.monto, recibido: valor });
      return res.status(400).json({ error: 'Monto no coincide' });
    }

    // Actualizar estado del pedido
    let nuevoEstado = 'PENDIENTE';
    if (estado === 'APPROVED') {
      nuevoEstado = 'PAGADO';
      console.log(`✅ Pago aprobado - Pedido: ${pedido.pedidoId}`);
    } else if (estado === 'REJECTED') {
      nuevoEstado = 'RECHAZADO';
      console.log(`❌ Pago rechazado - Pedido: ${pedido.pedidoId}`);
    }

    await actualizarEstadoPedido(pedido.pedidoId, {
      estado: nuevoEstado,
      fechaPago: new Date().toISOString(),
      estadoTransaccion: estado
    });

    // Aquí puedes agregar notificaciones:
    // - Email al cliente
    // - Push notification al admin
    // - Actualizar inventario
    // - etc.

    res.json({ success: true, message: 'Webhook procesado' });

  } catch (error) {
    console.error('Error procesando webhook Nequi:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

/**
 * GET /api/pagos/nequi/estado/:transaccionId
 * Consultar estado de transacción
 */
router.get('/estado/:transaccionId', async (req, res) => {
  try {
    const { transaccionId } = req.params;

    const estado = await nequiService.consultarEstado(transaccionId);
    const pedido = await obtenerPedido({ transaccionId });

    res.json({
      success: true,
      transaccionId,
      estado: estado.estado,
      pedido: pedido ? {
        pedidoId: pedido.pedidoId,
        monto: pedido.monto,
        estado: pedido.estado
      } : null
    });

  } catch (error) {
    console.error('Error consultando estado Nequi:', error);
    res.status(500).json({ error: 'Error consultando estado' });
  }
});

export default router;

