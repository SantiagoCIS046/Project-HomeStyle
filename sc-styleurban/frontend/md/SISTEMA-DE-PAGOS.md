# 💳 Sistema de Pagos - SC StyleUrban

## Métodos de Pago Disponibles

### 1. 🏦 Bancolombia (Tarjetas)

El sistema acepta dos tipos de tarjetas:

#### Tarjeta de Crédito
- Visa
- Mastercard
- American Express

#### Tarjeta de Débito
- Débito Bancolombia
- Débito Visa
- Débito Mastercard

### 2. 📱 Nequi (Dinero Electrónico)

Pago mediante cuenta Nequi con validación de número de celular.

---

## 📋 Información Requerida

### Para Bancolombia:

1. **Tipo de Tarjeta** (Obligatorio)
   - Crédito o Débito

2. **Número de Tarjeta** (Obligatorio)
   - 15-16 dígitos
   - Formato: `1234 5678 9012 3456`
   - Detección automática de marca (Visa, Mastercard, Amex)

3. **Nombre del Titular** (Obligatorio)
   - Como aparece en la tarjeta
   - Mínimo 3 caracteres

4. **Fecha de Vencimiento** (Obligatorio)
   - Formato: `MM/AA`
   - Validación de fecha futura

5. **CVV** (Obligatorio)
   - 3 dígitos (Visa, Mastercard)
   - 4 dígitos (American Express)

### Para Nequi:

1. **Número de Celular** (Obligatorio)
   - 10 dígitos
   - Debe iniciar con 3 (celular colombiano)
   - Formato: `300 123 4567`

2. **Monto a Pagar** (Automático)
   - Se muestra el total del carrito
   - Validación automática

---

## ✅ Validaciones Implementadas

### Bancolombia:

- ✓ Tipo de tarjeta seleccionado
- ✓ Número de tarjeta válido (15-16 dígitos)
- ✓ Nombre del titular (mínimo 3 caracteres)
- ✓ Fecha de vencimiento válida (MM/AA)
- ✓ Tarjeta no vencida
- ✓ CVV válido (3-4 dígitos)
- ✓ Detección automática de marca de tarjeta

### Nequi:

- ✓ Número de celular válido (10 dígitos)
- ✓ Número inicia con 3 (celular colombiano)
- ✓ Formato correcto (XXX XXX XXXX)

---

## 🔒 Seguridad

### Datos Almacenados:

**Bancolombia:**
- Solo se guardan los últimos 4 dígitos de la tarjeta
- Formato: `****1234`
- Tipo de tarjeta (Crédito/Débito)
- Nombre del titular

**Nequi:**
- Número de celular completo
- Método de pago

### Datos NO Almacenados:

- ❌ Número completo de tarjeta
- ❌ CVV
- ❌ Fecha de vencimiento completa

---

## 🎯 Flujo de Pago

### 1. Selección de Método
El usuario selecciona entre Bancolombia o Nequi

### 2. Ingreso de Datos
Se muestra el formulario correspondiente con validación en tiempo real

### 3. Validación
- Formateo automático de campos
- Validación de datos antes de procesar
- Mensajes de error claros

### 4. Procesamiento
- Simulación de procesamiento de pago
- Creación de orden en la base de datos
- Limpieza del carrito

### 5. Confirmación
- Modal de éxito con número de pedido
- Correo de confirmación (simulado)
- Redirección al inicio

---

## 🛠️ Características Técnicas

### Formateo Automático:

- **Tarjeta:** Espacios cada 4 dígitos
- **Fecha:** Formato MM/AA automático
- **CVV:** Solo números
- **Teléfono:** Formato XXX XXX XXXX

### Detección de Marca:

- Visa: Inicia con 4
- Mastercard: Inicia con 5
- American Express: Inicia con 3

### Validación de Fecha:

- Mes válido (01-12)
- Año futuro o actual
- Tarjeta no vencida

---

## 📊 Datos Guardados en la Orden

```json
{
  "orderNumber": "SCU-1234567890-123",
  "paymentMethod": "bancolombia",
  "paymentDetails": {
    "method": "Bancolombia",
    "cardType": "credito",
    "cardNumber": "****1234",
    "cardHolder": "Juan Pérez"
  },
  "status": "Aprobado",
  "total": 165000
}
```

---

## 🚀 Mejoras Futuras

- [ ] Integración con pasarela de pago real
- [ ] Tokenización de tarjetas
- [ ] Pagos recurrentes
- [ ] Más métodos de pago (PSE, Daviplata, etc.)
- [ ] Validación de BIN de tarjetas
- [ ] 3D Secure para mayor seguridad

---

## 📝 Notas Importantes

⚠️ **Desarrollo:** Actualmente el sistema simula el procesamiento de pagos.

⚠️ **Producción:** Para producción se debe integrar con:
- Pasarela de pagos real (Wompi, PayU, Mercado Pago)
- Sistema de validación de tarjetas
- API de Nequi oficial

---

## 🆘 Mensajes de Error

| Error | Causa | Solución |
|-------|-------|----------|
| "Número de tarjeta inválido" | Menos de 15 dígitos | Verificar número completo |
| "La tarjeta está vencida" | Fecha pasada | Usar tarjeta vigente |
| "CVV inválido" | Menos de 3 dígitos | Verificar código de seguridad |
| "Número de celular inválido" | No tiene 10 dígitos | Verificar número completo |
| "Debe iniciar con 3" | No es celular colombiano | Usar número válido |

---

**Última actualización:** 2024
**Versión:** 1.0.0

