# 🛍️ Project HomeStyle - Tienda de Ropa Online

E-commerce completo con Frontend (Vue 3 + Vite) e integración de pagos con **ePayco**.

**🔗 Repositorio:** https://github.com/SantiagoCIS046/Project-HomeStyle

**🌐 Demo en vivo:** https://home-style-black.vercel.app/

## 🚀 Características

- ✅ **Frontend**: Vue 3 + Vite + Pinia + Vue Router
- ✅ **Pagos**: Integración con ePayco (Tarjetas, PSE, Nequi, Efectivo)
- ✅ **Impuestos**: IVA (19%) + INC/ICO (8%) calculados automáticamente
- ✅ **Catálogo**: Camisetas Estampadas ($55,000) y Oversize ($70,000)
- ✅ **Carrito**: Persistencia con localStorage
- ✅ **Checkout**: Formulario completo de pedidos
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Deploy**: Configurado para Vercel

## 📁 Estructura del Proyecto

```
Project-HomeStyle/
├── sc-styleurban/
│   ├── frontend/              # Aplicación Vue 3
│   │   ├── src/
│   │   │   ├── components/   # Componentes Vue
│   │   │   ├── router/       # Vue Router
│   │   │   ├── stores/       # Pinia stores (cart, auth)
│   │   │   ├── services/     # Servicios (orders, notifications)
│   │   │   ├── config/       # Configuración (ePayco, API)
│   │   │   └── views/        # Vistas (Login, Register, Account)
│   │   ├── public/           # Assets públicos
│   │   └── package.json
│   │
│   └── backend/              # Base de datos JSON
│       └── db.json           # Almacenamiento de pedidos
│
├── package.json             # Scripts principales
├── vercel.json              # Configuración de Vercel
└── README.md                # Este archivo
```

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/SantiagoCIS046/Project-HomeStyle.git
cd Project-HomeStyle
```

### 2. Instalar dependencias

```bash
cd sc-styleurban/frontend
npm install
```

## 💻 Desarrollo Local

```bash
cd sc-styleurban/frontend
npm run dev
```

Esto iniciará el servidor en: **http://localhost:5173** o **http://localhost:5174**

## 📦 Build para Producción

```bash
cd sc-styleurban/frontend
npm run build
```

El build se generará en `sc-styleurban/frontend/dist/`

## 🌐 Despliegue en Vercel

### Subir cambios a GitHub

```bash
git add -A
git commit -m "Descripción del cambio"
git push origin main
```

> **Nota:** Si hay conflictos, usa `git push origin main --force`

### Vercel (Deploy Automático)

El proyecto está conectado a Vercel. Cada push a `main` despliega automáticamente.

**URL de producción:** https://home-style-black.vercel.app/

### Configuración de Vercel

- **Framework Preset:** Vite
- **Root Directory:** `sc-styleurban/frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 💳 Integración ePayco

El proyecto usa **ePayco** para procesar pagos:

- **Tarjetas de crédito/débito**
- **PSE (transferencia bancaria)**
- **Nequi**
- **Efectivo (Efecty, Baloto)**

### Configuración

La llave pública de ePayco está en:
`sc-styleurban/frontend/src/config/epayco.js`

## 🧾 Cálculo de Impuestos

| Concepto        | Porcentaje      |
| --------------- | --------------- |
| Subtotal (Base) | Precio ÷ 1.27   |
| IVA             | 19% sobre base  |
| INC/ICO         | 8% sobre base   |
| **Total**       | Precio completo |

### Precios de productos

| Producto           | Precio (incluye impuestos) |
| ------------------ | -------------------------- |
| Camiseta Estampada | $55,000 COP                |
| Camiseta Oversize  | $70,000 COP                |

## 🛠️ Tecnologías

### Frontend

- Vue 3
- Vite
- Pinia (State Management)
- Vue Router
- CSS3

### Pagos

- ePayco Checkout

### Deploy

- Vercel
- GitHub

## 📚 Documentación Adicional

- [Integración ePayco](sc-styleurban/frontend/md/INTEGRACION-EPAYCO.md)
- [Cálculo de Impuestos](sc-styleurban/frontend/md/CALCULO-IMPUESTOS.md)
- [Instrucciones de Uso](sc-styleurban/frontend/md/INSTRUCCIONES.md)

## 👨‍💻 Autor

**Santiago Cisneros** - [@SantiagoCIS046](https://github.com/SantiagoCIS046)

---

**🔗 Repositorio:** https://github.com/SantiagoCIS046/Project-HomeStyle

**🌐 Demo:** https://home-style-black.vercel.app/
