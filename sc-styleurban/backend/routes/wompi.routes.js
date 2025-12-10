import express from 'express';
import wompiService from '../services/wompi.service.js';
import { guardarPedido, actualizarEstadoPedido, obtenerPedido } from '../utils/database.js';

const router = express.Router();

/**
 * POST /api/pagos/wompi/tokenizar
 * Tokenizar tarjeta de crédito/débito
 */
router.post('/tokenizar', async (req, res) => {
  try {
    const { cardNumber, cvc, expMonth, expYear, cardHolder } = req.body;

    const token = await wompiService.tokenizarTarjeta({
      cardNumber,
      cvc,
      expMonth,
      expYear,
      cardHolder
    });

    res.json({
      success: true,
      token: token.token,
      brand: token.brand,
      lastFour: token.lastFour
    });

  } catch (error) {
    console.error('Error tokenizando tarjeta:', error);
    res.status(500).json({ error: 'Error tokenizando tarjeta' });
  }
});

/**
 * POST /api/pagos/wompi/iniciar
 * Iniciar pago con Wompi (Bancolombia)
 */
router.post('/iniciar', async (req, res) => {
  try {
    const { 
      pedidoId, 
      monto, 
      descripcion, 
      email, 
      metodoPago, 
      datosTarjeta,
      datosCliente,
      productos 
    } = req.body;

    // Validaciones
    if (!pedidoId || !monto || !descripcion || !email) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requiere pedidoId, monto, descripción y email'
      });
    }

    // Crear transacción en Wompi
    const transaccion = await wompiService.crearTransaccion({
      pedidoId,
      monto,
      descripcion,
      email,
      metodoPago: metodoPago || 'BANCOLOMBIA_TRANSFER',
      datosTarjeta
    });

    // Guardar pedido en base de datos
    const pedido = await guardarPedido({
      pedidoId,
      transaccionId: transaccion.transaccionId,
      reference: transaccion.reference,
      monto,
      descripcion,
      metodoPago: 'WOMPI_BANCOLOMBIA',
      estado: 'PENDIENTE',
      datosCliente,
      productos,
      datosPago: {
        email,
        metodoPago: transaccion.metodoPago,
        linkPago: transaccion.linkPago
      },
      fechaCreacion: transaccion.fechaCreacion,
      expiraEn: transaccion.expiraEn
    });

    console.log(`💳 Pago Wompi iniciado - Pedido: ${pedidoId}`);

    res.json({
      success: true,
      transaccionId: transaccion.transaccionId,
      reference: transaccion.reference,
      linkPago: transaccion.linkPago,
      estado: 'PENDIENTE',
      expiraEn: transaccion.expiraEn,
      message: 'Usa el link para completar el pago con Bancolombia'
    });

  } catch (error) {
    console.error('Error iniciando pago Wompi:', error);
    res.status(500).json({
      error: 'Error al iniciar pago',
      message: error.message
    });
  }
});

/**
 * POST /api/pagos/wompi/webhook
 * Webhook para recibir confirmación de Wompi
 */
router.post('/webhook', async (req, res) => {
  try {
    const { event, data } = req.body;
    const signature = req.headers['x-event-signature'];

    console.log('📥 Webhook Wompi recibido:', event);

    // Validar webhook
    const esValido = wompiService.validarWebhook(req.body, signature);
    if (!esValido) {
      return res.status(401).json({ error: 'Webhook inválido' });
    }

    if (event === 'transaction.updated') {
      const transaction = data.transaction;
      const transaccionId = transaction.id;
      const estado = transaction.status;
      const monto = transaction.amount_in_cents / 100;

      // Buscar pedido
      const pedido = await obtenerPedido({ transaccionId });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      // Validar monto
      if (pedido.monto !== monto) {
        console.error('⚠️ Monto no coincide:', { esperado: pedido.monto, recibido: monto });
        return res.status(400).json({ error: 'Monto no coincide' });
      }

      // Actualizar estado del pedido
      let nuevoEstado = 'PENDIENTE';
      if (estado === 'APPROVED') {
        nuevoEstado = 'PAGADO';
        console.log(`✅ Pago aprobado - Pedido: ${pedido.pedidoId}`);
      } else if (estado === 'DECLINED' || estado === 'ERROR') {
        nuevoEstado = 'RECHAZADO';
        console.log(`❌ Pago rechazado - Pedido: ${pedido.pedidoId}`);
      }

      await actualizarEstadoPedido(pedido.pedidoId, {
        estado: nuevoEstado,
        fechaPago: new Date().toISOString(),
        estadoTransaccion: estado
      });
    }

    res.json({ success: true, message: 'Webhook procesado' });

  } catch (error) {
    console.error('Error procesando webhook Wompi:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

/**
 * GET /api/pagos/wompi/estado/:transaccionId
 * Consultar estado de transacción
 */
router.get('/estado/:transaccionId', async (req, res) => {
  try {
    const { transaccionId } = req.params;

    const estado = await wompiService.consultarEstado(transaccionId);
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
    console.error('Error consultando estado Wompi:', error);
    res.status(500).json({ error: 'Error consultando estado' });
  }
});

export default router;

