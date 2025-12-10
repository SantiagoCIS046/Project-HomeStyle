# 🔌 Integración de Pagos Real - Nequi y Wompi

## 📋 Tabla de Contenidos

1. [Resumen del Sistema](#resumen-del-sistema)
2. [Flujo Completo Nequi](#flujo-completo-nequi)
3. [Flujo Completo Wompi](#flujo-completo-wompi)
4. [Configuración](#configuración)
5. [APIs Implementadas](#apis-implementadas)
6. [Webhooks](#webhooks)
7. [Testing](#testing)

---

## 🎯 Resumen del Sistema

El sistema implementa pagos reales con:

- **Nequi**: Pagos con QR y dinero electrónico
- **Wompi**: Tarjetas de crédito/débito y transferencias Bancolombia

### Arquitectura

```
Frontend (Vue) → Backend (Express) → APIs de Pago (Nequi/Wompi)
                      ↓
                  Base de Datos
                      ↑
                  Webhooks ← APIs de Pago
```

---

## 📱 Flujo Completo NEQUI

### ETAPA 1: Frontend - Inicio del Pago

```javascript
// Usuario selecciona "Pagar con Nequi"
const iniciarPagoNequi = async () => {
  const response = await fetch('http://localhost:3000/api/pagos/nequi/iniciar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pedidoId: "12345",
      monto: 59900,
      descripcion: "Camisa SC UrbanStyle",
      telefono: "3001234567",
      datosCliente: { ... },
      productos: [ ... ]
    })
  });
  
  const data = await response.json();
  // data.linkPago, data.qr, data.transaccionId
};
```

### ETAPA 2: Backend - Creación de Orden

**Archivo**: `backend/routes/nequi.routes.js`

```javascript
POST /api/pagos/nequi/iniciar
```

El backend:
1. Valida datos
2. Llama a API de Nequi
3. Guarda orden con estado "PENDIENTE"
4. Retorna link de pago y QR

### ETAPA 3: Usuario Paga

- Se muestra QR o link de Nequi
- Usuario confirma en app Nequi
- Nequi procesa el pago

### ETAPA 4: Webhook - Confirmación Automática

**Nequi envía**:

```javascript
POST /api/pagos/nequi/webhook
{
  "transaccionId": "ABC123",
  "estado": "APPROVED",
  "valor": 59900,
  "reference": "SCU-12345-..."
}
```

**Backend procesa**:
1. Valida webhook
2. Verifica monto
3. Actualiza pedido a "PAGADO"
4. Envía notificaciones

### ETAPA 5: Confirmación al Usuario

```javascript
GET /api/pedidos/12345/estado
```

Respuesta:
```json
{
  "estado": "PAGADO",
  "pedidoId": "12345",
  "monto": 59900
}
```

---

## 💳 Flujo Completo WOMPI (Bancolombia)

### ETAPA 1: Frontend - Tokenizar Tarjeta

```javascript
// Primero tokenizar la tarjeta
const tokenizarTarjeta = async (datosTarjeta) => {
  const response = await fetch('http://localhost:3000/api/pagos/wompi/tokenizar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cardNumber: "4111111111111111",
      cvc: "123",
      expMonth: "12",
      expYear: "25",
      cardHolder: "Juan Perez"
    })
  });
  
  const { token } = await response.json();
  return token;
};
```

### ETAPA 2: Frontend - Iniciar Pago

```javascript
const iniciarPagoWompi = async (token) => {
  const response = await fetch('http://localhost:3000/api/pagos/wompi/iniciar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pedidoId: "12345",
      monto: 59900,
      descripcion: "Camisa SC UrbanStyle",
      email: "cliente@email.com",
      metodoPago: "CARD",
      datosTarjeta: { token },
      datosCliente: { ... },
      productos: [ ... ]
    })
  });
  
  const data = await response.json();
  // data.linkPago, data.transaccionId
};
```

### ETAPA 3: Backend - Crear Transacción

**Archivo**: `backend/routes/wompi.routes.js`

```javascript
POST /api/pagos/wompi/iniciar
```

El backend:
1. Valida datos
2. Llama a API de Wompi
3. Guarda orden con estado "PENDIENTE"
4. Retorna link de pago

### ETAPA 4: Usuario Paga

- Usuario ingresa al link
- Inicia sesión en Bancolombia
- Autoriza el pago
- Wompi procesa

### ETAPA 5: Webhook - Confirmación

**Wompi envía**:

```javascript
POST /api/pagos/wompi/webhook
{
  "event": "transaction.updated",
  "data": {
    "transaction": {
      "id": "wompi_5678",
      "status": "APPROVED",
      "reference": "SCU-12345-...",
      "amount_in_cents": 5990000
    }
  }
}
```

**Backend procesa**:
1. Valida webhook
2. Verifica monto
3. Actualiza pedido a "PAGADO"

---

## ⚙️ Configuración

### 1. Instalar Dependencias Backend

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Nequi
NEQUI_CLIENT_ID=tu_client_id
NEQUI_CLIENT_SECRET=tu_secret
NEQUI_API_KEY=tu_api_key

# Wompi
WOMPI_PUBLIC_KEY=pub_prod_tu_key
WOMPI_PRIVATE_KEY=prv_prod_tu_key
WOMPI_EVENTS_SECRET=tu_events_secret
```

### 3. Iniciar Backend

```bash
npm run dev
```

El servidor estará en `http://localhost:3000`

---

## 🔌 APIs Implementadas

### Nequi

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/pagos/nequi/iniciar` | POST | Iniciar pago |
| `/api/pagos/nequi/webhook` | POST | Recibir confirmación |
| `/api/pagos/nequi/estado/:id` | GET | Consultar estado |

### Wompi

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/pagos/wompi/tokenizar` | POST | Tokenizar tarjeta |
| `/api/pagos/wompi/iniciar` | POST | Iniciar pago |
| `/api/pagos/wompi/webhook` | POST | Recibir confirmación |
| `/api/pagos/wompi/estado/:id` | GET | Consultar estado |

### Pedidos

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/pedidos/:id/estado` | GET | Estado del pedido |
| `/api/pedidos/:id` | GET | Detalles del pedido |
| `/api/pedidos` | GET | Todos los pedidos |

---

## 🔔 Webhooks

### Configurar URLs de Webhook

**Nequi**:
- URL: `https://tu-dominio.com/api/pagos/nequi/webhook`

**Wompi**:
- URL: `https://tu-dominio.com/api/pagos/wompi/webhook`

### Testing Local con ngrok

```bash
ngrok http 3000
```

Usa la URL de ngrok para configurar webhooks en desarrollo.

---

## 🧪 Testing

### Modo Desarrollo

El sistema actualmente simula las APIs para desarrollo.

### Modo Producción

Para activar APIs reales:

1. Descomenta el código marcado con `/* CÓDIGO REAL PARA PRODUCCIÓN */`
2. Configura credenciales reales en `.env`
3. Configura webhooks en los dashboards de Nequi y Wompi

---

## 📊 Tabla de Responsabilidades

| Etapa | Nequi | Wompi/Bancolombia |
|-------|-------|-------------------|
| Crear orden | Backend → API Nequi | Backend → API Wompi |
| Método pago | QR / Link Nequi | Tarjeta / Transferencia |
| Webhook | ✅ Sí | ✅ Sí |
| Confirmación | ✅ Automática | ✅ Automática |
| Actualización | ✅ Vía webhook | ✅ Vía webhook |

---

**Última actualización**: 2024  
**Versión**: 1.0.0

