import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class NequiService {
  constructor() {
    this.apiUrl = process.env.NEQUI_API_URL || 'https://api.nequi.com/payments/v1';
    this.clientId = process.env.NEQUI_CLIENT_ID;
    this.clientSecret = process.env.NEQUI_CLIENT_SECRET;
    this.apiKey = process.env.NEQUI_API_KEY;
  }

  /**
   * Obtener token de autenticación
   */
  async getAuthToken() {
    try {
      // En producción, esto llamaría a la API real de Nequi
      // Por ahora, simulamos el token
      return 'mock_nequi_token_' + Date.now();
    } catch (error) {
      console.error('Error obteniendo token Nequi:', error);
      throw error;
    }
  }

  /**
   * Crear transacción de pago
   */
  async crearTransaccion(datos) {
    try {
      const { pedidoId, monto, descripcion, telefono } = datos;

      // Generar referencia única
      const reference = `SCU-${pedidoId}-${Date.now()}`;

      // En producción, esto llamaría a la API real de Nequi
      const transaccion = {
        transaccionId: `NEQUI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        reference: reference,
        estado: 'PENDIENTE',
        monto: monto,
        moneda: 'COP',
        descripcion: descripcion,
        telefono: telefono,
        qr: `https://nequi.com/pay/${reference}`,
        linkPago: `https://nequi.com/pay/${reference}`,
        fechaCreacion: new Date().toISOString(),
        // Simular tiempo de expiración (15 minutos)
        expiraEn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      };

      console.log('✅ Transacción Nequi creada:', transaccion.transaccionId);

      return transaccion;

      /* CÓDIGO REAL PARA PRODUCCIÓN:
      const token = await this.getAuthToken();
      
      const response = await axios.post(
        `${this.apiUrl}/transactions`,
        {
          value: monto,
          currency: 'COP',
          reference: reference,
          description: descripcion,
          userPaymentType: 'NEQUI',
          phoneNumber: telefono
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        transaccionId: response.data.transactionId,
        reference: reference,
        estado: response.data.status,
        qr: response.data.qrCode,
        linkPago: response.data.paymentLink,
        ...response.data
      };
      */
    } catch (error) {
      console.error('Error creando transacción Nequi:', error);
      throw error;
    }
  }

  /**
   * Consultar estado de transacción
   */
  async consultarEstado(transaccionId) {
    try {
      // Simulación para desarrollo
      // En producción, consultaría la API real
      return {
        transaccionId: transaccionId,
        estado: 'APPROVED', // PENDING, APPROVED, REJECTED
        monto: 0,
        fechaAprobacion: new Date().toISOString()
      };

      /* CÓDIGO REAL PARA PRODUCCIÓN:
      const token = await this.getAuthToken();
      
      const response = await axios.get(
        `${this.apiUrl}/transactions/${transaccionId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': this.apiKey
          }
        }
      );

      return {
        transaccionId: response.data.transactionId,
        estado: response.data.status,
        monto: response.data.value,
        fechaAprobacion: response.data.approvedAt
      };
      */
    } catch (error) {
      console.error('Error consultando estado Nequi:', error);
      throw error;
    }
  }

  /**
   * Validar webhook de Nequi
   */
  validarWebhook(datos, signature) {
    try {
      // En producción, validar la firma del webhook
      // usando el secret proporcionado por Nequi
      return true;
    } catch (error) {
      console.error('Error validando webhook Nequi:', error);
      return false;
    }
  }
}

export default new NequiService();

