// Email Service
// Handles sending email notifications using EmailJS

import emailjs from '@emailjs/browser';

// EmailJS Configuration
// IMPORTANTE: Estos valores deben ser configurados en EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_styleurban',
  templateId: 'template_new_order',
  publicKey: 'YOUR_PUBLIC_KEY' // Se debe configurar en EmailJS
};

const ADMIN_EMAIL = 'santiagocisneros046@gmail.com';

export const emailService = {
  /**
   * Inicializa EmailJS con la clave pública
   */
  init() {
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  },

  /**
   * Envía notificación de nuevo pedido al administrador por email
   * @param {Object} orderData - Datos del pedido
   */
  async sendOrderNotificationToAdmin(orderData) {
    try {
      // Formatear el mensaje HTML
      const emailContent = this.formatOrderEmailHTML(orderData);
      
      // Preparar parámetros del email
      const templateParams = {
        to_email: ADMIN_EMAIL,
        to_name: 'Administrador StyleUrban',
        subject: `🛍️ Nuevo Pedido #${orderData.orderNumber}`,
        order_number: orderData.orderNumber,
        customer_name: orderData.customerName,
        customer_phone: orderData.phone,
        customer_email: orderData.email,
        customer_address: orderData.address,
        customer_notes: orderData.notes || 'Sin notas',
        order_status: orderData.status,
        payment_method: orderData.paymentMethod,
        transaction_id: orderData.paymentDetails?.transactionId || 'N/A',
        reference: orderData.paymentDetails?.reference || 'N/A',
        subtotal: this.formatPrice(orderData.subtotal),
        iva: this.formatPrice(orderData.iva),
        inc: this.formatPrice(orderData.inc),
        total: this.formatPrice(orderData.total),
        products_list: this.formatProductsList(orderData.products),
        order_date: new Date(orderData.orderDate).toLocaleString('es-CO'),
        html_content: emailContent
      };

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('✅ Email enviado exitosamente:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Error al enviar email:', error);
      return { success: false, error };
    }
  },

  /**
   * Formatea el precio en formato colombiano
   */
  formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  },

  /**
   * Formatea la lista de productos para el email
   */
  formatProductsList(products) {
    return products.map((product, index) => {
      return `${index + 1}. ${product.name} - Talla: ${product.size} - Cantidad: ${product.quantity} - ${this.formatPrice(product.price * product.quantity)}`;
    }).join('\n');
  },

  /**
   * Formatea el contenido del email en HTML
   */
  formatOrderEmailHTML(orderData) {
    const productRows = orderData.products.map((product, index) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${index + 1}</td>
        <td style="padding: 12px; text-align: left;">${product.name}</td>
        <td style="padding: 12px; text-align: center;">${product.size}</td>
        <td style="padding: 12px; text-align: center;">${product.quantity}</td>
        <td style="padding: 12px; text-align: right;">${this.formatPrice(product.price)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">${this.formatPrice(product.price * product.quantity)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .section-title { color: #2c3e50; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #2c3e50; color: white; padding: 12px; text-align: left; }
          .total-row { background: #e8f5e9; font-weight: bold; font-size: 18px; }
          .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🛍️ NUEVO PEDIDO</h1>
            <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold;">StyleUrban</p>
          </div>
          
          <div class="content">
            <!-- Información del Pedido -->
            <div class="section">
              <div class="section-title">📋 Información del Pedido</div>
              <div class="info-row"><span class="label">Pedido #:</span><span class="value">${orderData.orderNumber}</span></div>
              <div class="info-row"><span class="label">Estado:</span><span class="value" style="color: #27ae60; font-weight: bold;">${orderData.status}</span></div>
              <div class="info-row"><span class="label">Fecha:</span><span class="value">${new Date(orderData.orderDate).toLocaleString('es-CO')}</span></div>
            </div>

            <!-- Datos del Cliente -->
            <div class="section">
              <div class="section-title">👤 Datos del Cliente</div>
              <div class="info-row"><span class="label">Nombre:</span><span class="value">${orderData.customerName}</span></div>
              <div class="info-row"><span class="label">Teléfono:</span><span class="value">${orderData.phone}</span></div>
              <div class="info-row"><span class="label">Email:</span><span class="value">${orderData.email}</span></div>
              <div class="info-row"><span class="label">Dirección:</span><span class="value">${orderData.address}</span></div>
              ${orderData.notes ? `<div class="info-row"><span class="label">Notas:</span><span class="value">${orderData.notes}</span></div>` : ''}
            </div>

            <!-- Productos -->
            <div class="section">
              <div class="section-title">🛒 Productos</div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th style="text-align: center;">Talla</th>
                    <th style="text-align: center;">Cant.</th>
                    <th style="text-align: right;">Precio</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                </tbody>
              </table>
            </div>

            <!-- Resumen de Pago -->
            <div class="section">
              <div class="section-title">💰 Resumen de Pago</div>
              <div class="info-row"><span class="label">Subtotal (Base):</span><span class="value">${this.formatPrice(orderData.subtotal)}</span></div>
              <div class="info-row"><span class="label">IVA (19%):</span><span class="value">${this.formatPrice(orderData.iva)}</span></div>
              <div class="info-row"><span class="label">INC/ICO (8%):</span><span class="value">${this.formatPrice(orderData.inc)}</span></div>
              <div class="info-row total-row"><span class="label">TOTAL:</span><span class="value" style="color: #27ae60; font-size: 20px;">${this.formatPrice(orderData.total)}</span></div>
            </div>

            <!-- Método de Pago -->
            <div class="section">
              <div class="section-title">💳 Método de Pago</div>
              <div class="info-row"><span class="label">Plataforma:</span><span class="value">${orderData.paymentMethod}</span></div>
              ${orderData.paymentDetails?.transactionId ? `<div class="info-row"><span class="label">ID Transacción:</span><span class="value">${orderData.paymentDetails.transactionId}</span></div>` : ''}
              ${orderData.paymentDetails?.reference ? `<div class="info-row"><span class="label">Referencia:</span><span class="value">${orderData.paymentDetails.reference}</span></div>` : ''}
            </div>

            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
              <p style="margin: 0; color: #1b5e20; font-weight: bold; font-size: 16px;">✅ Pedido confirmado y pagado</p>
              <p style="margin: 5px 0 0 0; color: #2e7d32;">Por favor, proceder con el despacho.</p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">StyleUrban - Moda Urbana de Calidad</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">© 2024 Todos los derechos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};

