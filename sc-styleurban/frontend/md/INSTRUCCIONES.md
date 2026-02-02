# SC HomeStyle - Instrucciones de Uso

## 🚀 Cómo Ejecutar el Proyecto

### 1. Iniciar el Servidor de Base de Datos

En una terminal, ejecuta:

```bash
npm run db
```

Esto iniciará el servidor JSON en `http://localhost:3001` para almacenar los pedidos.

### 2. Iniciar la Aplicación

En otra terminal (mantén la primera abierta), ejecuta:

```bash
npm run dev
```

Esto iniciará la aplicación en `http://localhost:5173`

## 📦 Funcionalidades Implementadas

### ✅ Catálogo de Productos

- **Camisetas Estampadas**: 12 productos (4 por talla: S, M, L) - $55,000 COP
- **Camisetas Oversize**: 6 productos (talla M) - $70,000 COP
- Selector de talla para cada producto
- Botón "Agregar al Carrito"

### ✅ Carrito de Compras

- **Icono flotante** en la esquina superior derecha
- Muestra el número de productos agregados
- **Panel lateral** con:
  - Lista de productos agregados
  - Nombre, talla, precio y cantidad de cada producto
  - Controles para aumentar/disminuir cantidad
  - Botón para eliminar productos
  - Total del pedido
  - Botón "Proceder al Pago"

### ✅ Página de Checkout

- Formulario con datos del cliente:
  - Nombre completo
  - Número de teléfono
  - Correo electrónico
  - Dirección de envío
  - Notas adicionales (opcional)
- Resumen del pedido con todos los productos

### ✅ Página de Pago

- **Método Bancolombia**: Tarjeta de crédito o débito
- **Método Nequi**: Dinero electrónico
- Información del pedido con número único
- Modal de confirmación al completar el pago

### ✅ Base de Datos

Los pedidos se guardan en `db.json` con la siguiente información:

- Número de pedido único
- Nombre del cliente
- Número de teléfono
- Correo electrónico
- Dirección
- Notas adicionales
- Fecha del pedido
- Estado del pedido
- Método de pago
- Total del pedido
- Lista de productos con:
  - ID del producto
  - Nombre
  - Talla
  - Precio
  - Cantidad
  - Subtotal

## 🎨 Características de Diseño

- **Tema profesional** en blanco y negro con acentos azules
- **Diseño responsive** para móviles y tablets
- **Animaciones suaves** en botones y tarjetas
- **Notificaciones** al agregar productos al carrito
- **Persistencia** del carrito en localStorage

## 📱 Navegación

1. **Página Principal** (`/`): Catálogo de productos
2. **Checkout** (`/checkout`): Formulario de datos del cliente
3. **Pago** (`/payment`): Selección de método de pago

## 🔍 Ver Pedidos en la Base de Datos

Para ver todos los pedidos guardados, abre en tu navegador:

```
http://localhost:3001/orders
```

## 💡 Notas Importantes

- El carrito se guarda automáticamente en el navegador
- Los pedidos se almacenan en `db.json`
- El servidor de base de datos debe estar corriendo para guardar pedidos
- Al completar un pedido, el carrito se vacía automáticamente
