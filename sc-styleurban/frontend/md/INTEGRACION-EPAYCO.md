# 💳 Integración de ePayco - StyleUrban

## 📋 Tabla de Contenidos

1. [¿Qué es ePayco?](#qué-es-epayco)
2. [Configuración Inicial](#configuración-inicial)
3. [Obtener Credenciales](#obtener-credenciales)
4. [Configurar el Proyecto](#configurar-el-proyecto)
5. [Métodos de Pago Disponibles](#métodos-de-pago-disponibles)
6. [Detalles de Implementación](#detalles-de-implementación)
7. [Pruebas](#pruebas)
8. [Producción](#producción)

---

## ¿Qué es ePayco?

ePayco es la pasarela de pagos líder en Colombia que permite recibir pagos de múltiples formas:

- 💳 **Tarjetas de Crédito/Débito**: Visa, Mastercard, American Express, Diners
- 🏦 **PSE**: Pagos Seguros en Línea (transferencias bancarias)
- 💵 **Efectivo**: Efecty, Baloto, Gana, Paga Todo
- 📱 **Billeteras Digitales**: Nequi, Daviplata
- 🔄 **Otros**: Cuotas, pagos recurrentes

---

## Configuración Inicial

### 1. Crear Cuenta en ePayco

1. Visita [https://dashboard.epayco.co/register](https://dashboard.epayco.co/register)
2. Completa el formulario de registro
3. Verifica tu correo electrónico
4. Completa la información de tu negocio

### 2. Obtener Credenciales

Una vez registrado:

1. Inicia sesión en [https://dashboard.epayco.co/](https://dashboard.epayco.co/)
2. Ve a **Configuración** → **API Keys**
3. Encontrarás dos tipos de claves:
   - **Claves de Prueba** (para desarrollo)
   - **Claves de Producción** (para tu tienda real)

**Necesitas:**
- `P_CUST_ID_CLIENTE` (Clave Pública)
- `P_KEY` (Clave Privada - NO la compartas)

---

## Configurar el Proyecto

### 1. Crear archivo `.env`

En la carpeta `frontend/`, crea un archivo `.env`:

```bash
# Configuración de ePayco
VITE_EPAYCO_PUBLIC_KEY=tu_clave_publica_aqui
VITE_EPAYCO_TEST_MODE=true
```

### 2. Reemplazar con tus claves

Reemplaza `tu_clave_publica_aqui` con tu `P_CUST_ID_CLIENTE` de ePayco.

**Ejemplo:**
```bash
VITE_EPAYCO_PUBLIC_KEY=491d6e6b6e6d6e6b6e6d6e6b
VITE_EPAYCO_TEST_MODE=true
```

---

## Métodos de Pago Disponibles

La integración actual permite a tus clientes pagar con:

1. **Tarjetas de Crédito/Débito**
2. **PSE** (Transferencia bancaria)
3. **Efectivo** (Efecty, Baloto, etc.)
4. **Nequi**
5. **Daviplata**

Todos estos métodos están habilitados automáticamente en el checkout de ePayco.

---

## Detalles de Implementación

### Cálculo de Impuestos

El sistema calcula automáticamente:

- **Subtotal (Base)**: Precio sin impuestos
- **IVA (19%)**: Impuesto al Valor Agregado
- **INC/ICO (8%)**: Impuesto Nacional al Consumo
- **Total**: Subtotal + IVA + INC

**Fórmula:**
```
Total = Base × 1.27
Base = Total ÷ 1.27
IVA = Base × 0.19
INC = Base × 0.08
```

### Información Enviada a ePayco

Cuando un cliente hace clic en "Pagar con ePayco", se envía:

- Nombre del cliente
- Dirección de envío
- Teléfono
- Productos (nombre, cantidad, precio)
- Subtotal, IVA, INC
- Total a pagar
- Número de pedido

---

## Pruebas

### Modo de Prueba

Por defecto, el sistema está en modo de prueba (`VITE_EPAYCO_TEST_MODE=true`).

### Tarjetas de Prueba

Usa estas tarjetas para probar:

**Visa (Aprobada):**
- Número: `4575623182290326`
- CVV: `123`
- Fecha: Cualquier fecha futura
- Cuotas: 1

**Mastercard (Rechazada):**
- Número: `5254133674403564`
- CVV: `123`
- Fecha: Cualquier fecha futura

**PSE de Prueba:**
- Banco: Banco de Prueba
- Tipo de persona: Natural
- Documento: 123456789

---

## Producción

### Pasar a Producción

1. Obtén tus **claves de producción** en el dashboard de ePayco
2. Actualiza tu archivo `.env`:

```bash
VITE_EPAYCO_PUBLIC_KEY=tu_clave_de_produccion
VITE_EPAYCO_TEST_MODE=false
```

3. Verifica que tu cuenta de ePayco esté completamente activada
4. Realiza una compra de prueba con dinero real (monto pequeño)
5. Verifica que el pago se refleje en tu dashboard de ePayco

### Importante

⚠️ **Antes de ir a producción:**
- Completa toda la información de tu negocio en ePayco
- Verifica tu cuenta bancaria para recibir pagos
- Lee los términos y condiciones
- Configura las URLs de confirmación y respuesta

---

## Soporte

- **Documentación oficial**: [https://docs.epayco.com/](https://docs.epayco.com/)
- **Soporte ePayco**: soporte@epayco.co
- **Dashboard**: [https://dashboard.epayco.co/](https://dashboard.epayco.co/)

---

## Resumen

✅ **Integración completada con:**
- Checkout de ePayco
- Cálculo automático de impuestos (IVA 19%, INC 8%)
- Múltiples métodos de pago
- Modo de prueba y producción
- Interfaz moderna y responsive

🎉 **¡Tu tienda está lista para recibir pagos reales!**

