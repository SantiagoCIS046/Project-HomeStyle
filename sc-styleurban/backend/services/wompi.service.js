import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class WompiService {
  constructor() {
    this.apiUrl = process.env.WOMPI_API_URL || 'https://production.wompi.co/v1';
    this.publicKey = process.env.WOMPI_PUBLIC_KEY;
    this.privateKey = process.env.WOMPI_PRIVATE_KEY;
    this.eventsSecret = process.env.WOMPI_EVENTS_SECRET;
  }

  /**
   * Crear transacción de pago
   */
  async crearTransaccion(datos) {
    try {
      const { pedidoId, monto, descripcion, email, metodoPago, datosTarjeta } = datos;

      // Generar referencia única
      const reference = `SCU-${pedidoId}-${Date.now()}`;

      // Preparar datos de pago según el método
      let paymentMethod = {};
      
      if (metodoPago === 'CARD') {
        paymentMethod = {
          type: 'CARD',
          token: datosTarjeta.token, // Token de la tarjeta tokenizada
          installments: 1
        };
      } else if (metodoPago === 'BANCOLOMBIA_TRANSFER') {
        paymentMethod = {
          type: 'BANCOLOMBIA_TRANSFER',
          user_type: '0', // 0 = Persona Natural
          payment_description: descripcion
        };
      }

      // Simulación para desarrollo
      const transaccion = {
        transaccionId: `WOMPI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        reference: reference,
        estado: 'PENDIENTE',
        monto: monto,
        moneda: 'COP',
        descripcion: descripcion,
        email: email,
        metodoPago: metodoPago,
        linkPago: `https://checkout.wompi.co/l/${reference}`,
        fechaCreacion: new Date().toISOString(),
        expiraEn: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      };

      console.log('✅ Transacción Wompi creada:', transaccion.transaccionId);

      return transaccion;

      /* CÓDIGO REAL PARA PRODUCCIÓN:
      const response = await axios.post(
        `${this.apiUrl}/transactions`,
        {
          amount_in_cents: monto * 100, // Wompi usa centavos
          currency: 'COP',
          customer_email: email,
          payment_method: paymentMethod,
          reference: reference,
          redirect_url: `${process.env.FRONTEND_URL}/pago/confirmacion`
        },
        {
          headers: {
            'Authorization': `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        transaccionId: response.data.data.id,
        reference: reference,
        estado: response.data.data.status,
        linkPago: response.data.data.payment_link_url,
        monto: monto,
        ...response.data.data
      };
      */
    } catch (error) {
      console.error('Error creando transacción Wompi:', error);
      throw error;
    }
  }

  /**
   * Tokenizar tarjeta
   */
  async tokenizarTarjeta(datosTarjeta) {
    try {
      const { cardNumber, cvc, expMonth, expYear, cardHolder } = datosTarjeta;

      // Simulación
      return {
        token: `tok_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        brand: this.detectarMarca(cardNumber),
        lastFour: cardNumber.slice(-4)
      };

      /* CÓDIGO REAL PARA PRODUCCIÓN:
      const response = await axios.post(
        `${this.apiUrl}/tokens/cards`,
        {
          number: cardNumber.replace(/\s/g, ''),
          cvc: cvc,
          exp_month: expMonth,
          exp_year: expYear,
          card_holder: cardHolder
        },
        {
          headers: {
            'Authorization': `Bearer ${this.publicKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        token: response.data.data.id,
        brand: response.data.data.brand,
        lastFour: response.data.data.last_four
      };
      */
    } catch (error) {
      console.error('Error tokenizando tarjeta:', error);
      throw error;
    }
  }

  /**
   * Consultar estado de transacción
   */
  async consultarEstado(transaccionId) {
    try {
      // Simulación
      return {
        transaccionId: transaccionId,
        estado: 'APPROVED', // PENDING, APPROVED, DECLINED, VOIDED, ERROR
        monto: 0,
        fechaAprobacion: new Date().toISOString()
      };

      /* CÓDIGO REAL PARA PRODUCCIÓN:
      const response = await axios.get(
        `${this.apiUrl}/transactions/${transaccionId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.publicKey}`
          }
        }
      );

      return {
        transaccionId: response.data.data.id,
        estado: response.data.data.status,
        monto: response.data.data.amount_in_cents / 100,
        fechaAprobacion: response.data.data.finalized_at
      };
      */
    } catch (error) {
      console.error('Error consultando estado Wompi:', error);
      throw error;
    }
  }

  /**
   * Detectar marca de tarjeta
   */
  detectarMarca(cardNumber) {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'VISA';
    if (number.startsWith('5')) return 'MASTERCARD';
    if (number.startsWith('3')) return 'AMEX';
    return 'UNKNOWN';
  }

  /**
   * Validar webhook de Wompi
   */
  validarWebhook(datos, signature) {
    try {
      // En producción, validar la firma del webhook
      // usando el events_secret proporcionado por Wompi
      return true;
    } catch (error) {
      console.error('Error validando webhook Wompi:', error);
      return false;
    }
  }
}

export default new WompiService();

