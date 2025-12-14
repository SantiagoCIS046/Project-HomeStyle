# 📧 Configuración de EmailJS para StyleUrban

## 🎯 Objetivo
Configurar EmailJS para enviar notificaciones automáticas por email al administrador cuando se aprueba una compra.

---

## 📋 Pasos para Configurar EmailJS

### 1️⃣ Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Crea una cuenta con tu email (puedes usar: santiagocisneros046@gmail.com)
4. Verifica tu email

---

### 2️⃣ Conectar tu Servicio de Email

1. Una vez dentro del dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail** (o el servicio que prefieras)
4. Conecta tu cuenta de Gmail (santiagocisneros046@gmail.com)
5. Dale un nombre al servicio, por ejemplo: **"StyleUrban Notifications"**
6. Copia el **Service ID** (ejemplo: `service_styleurban`)
7. Guarda el servicio

---

### 3️⃣ Crear Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Dale un nombre: **"Nuevo Pedido StyleUrban"**
4. Configura el template con los siguientes campos:

**Template Settings:**
- **Template Name**: `template_styleurban`
- **From Name**: `{{from_name}}`
- **From Email**: Tu email verificado
- **To Email**: `{{to_email}}`
- **Subject**: `{{subject}}`

**Template Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>🛍️ Nuevo Pedido - StyleUrban</h1>
  
  <h2>📋 Información del Pedido</h2>
  <p><strong>Pedido #:</strong> {{order_number}}</p>
  <p><strong>Estado:</strong> {{order_status}}</p>
  <p><strong>Fecha:</strong> {{order_date}}</p>
  
  <h2>👤 Datos del Cliente</h2>
  <p><strong>Nombre:</strong> {{customer_name}}</p>
  <p><strong>Teléfono:</strong> {{customer_phone}}</p>
  <p><strong>Email:</strong> {{customer_email}}</p>
  <p><strong>Dirección:</strong> {{customer_address}}</p>
  <p><strong>Notas:</strong> {{customer_notes}}</p>
  
  <h2>🛒 Productos</h2>
  <pre>{{products_list}}</pre>
  
  <h2>💰 Resumen de Pago</h2>
  <p><strong>Subtotal:</strong> {{subtotal}}</p>
  <p><strong>IVA (19%):</strong> {{iva}}</p>
  <p><strong>INC/ICO (8%):</strong> {{inc}}</p>
  <p><strong>TOTAL:</strong> {{total}}</p>
  
  <h2>💳 Método de Pago</h2>
  <p><strong>Plataforma:</strong> {{payment_method}}</p>
  <p><strong>ID Transacción:</strong> {{transaction_id}}</p>
  <p><strong>Referencia:</strong> {{reference}}</p>
  
  <hr>
  <p>✅ Pedido confirmado y pagado. Por favor, proceder con el despacho.</p>
  <p>StyleUrban - Moda Urbana de Calidad</p>
</body>
</html>
```

5. Guarda el template
6. Copia el **Template ID** (ejemplo: `template_styleurban`)

---

### 4️⃣ Obtener la Clave Pública (Public Key)

1. Ve a **"Account"** → **"General"**
2. Busca la sección **"API Keys"**
3. Copia tu **Public Key** (ejemplo: `gCqXvZ8kZPuHOLqVu`)

---

### 5️⃣ Actualizar la Configuración en el Código

Abre el archivo `frontend/src/services/notificationService.js` y actualiza:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'TU_SERVICE_ID',      // Reemplaza con tu Service ID
  templateId: 'TU_TEMPLATE_ID',    // Reemplaza con tu Template ID
  publicKey: 'TU_PUBLIC_KEY'       // Reemplaza con tu Public Key
};
```

**Ejemplo:**
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_styleurban',
  templateId: 'template_styleurban',
  publicKey: 'gCqXvZ8kZPuHOLqVu'
};
```

---

## 🧪 Probar el Envío de Emails

1. Abre el archivo `frontend/test-notification.html` en tu navegador
2. Haz clic en el botón **"📧 Enviar Email de Prueba"**
3. Revisa tu bandeja de entrada (o spam) en: santiagocisneros046@gmail.com
4. Deberías recibir un email con los datos del pedido de prueba

---

## ✅ Verificación

Si todo está configurado correctamente:
- ✅ El email se enviará automáticamente sin necesidad de confirmación
- ✅ El administrador recibirá el email en: santiagocisneros046@gmail.com
- ✅ El email contendrá toda la información del pedido formateada

---

## 📝 Notas Importantes

- **Plan Gratuito**: EmailJS ofrece hasta 200 emails gratis por mes
- **Límite de Envío**: Si superas el límite, necesitarás actualizar a un plan de pago
- **Spam**: Los primeros emails pueden caer en spam, marca como "No es spam"
- **Verificación**: Asegúrate de verificar tu email en EmailJS para poder enviar

---

## 🔧 Solución de Problemas

### Error: "Service ID not found"
- Verifica que el Service ID sea correcto
- Asegúrate de haber guardado el servicio en EmailJS

### Error: "Template ID not found"
- Verifica que el Template ID sea correcto
- Asegúrate de haber guardado el template en EmailJS

### Error: "Public Key invalid"
- Verifica que la Public Key sea correcta
- Copia la clave directamente desde EmailJS

### No recibo emails
- Revisa la carpeta de spam
- Verifica que el email del destinatario sea correcto
- Revisa los logs en la consola del navegador

---

## 📧 Contacto

Si tienes problemas con la configuración, revisa la documentación oficial:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)

