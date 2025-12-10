# SC StyleUrban - Tienda de Ropa Online

Proyecto completo de e-commerce con Frontend (Vue 3 + Vite) y Backend (JSON Server).

## 📁 Estructura del Proyecto

```
sc-styleurban/
├── frontend/              # Aplicación Vue 3 + Vite
│   ├── src/              # Código fuente
│   │   ├── components/   # Componentes Vue
│   │   ├── router/       # Vue Router
│   │   ├── stores/       # Pinia stores
│   │   ├── services/     # Servicios API
│   │   ├── App.vue       # Componente principal
│   │   ├── main.js       # Punto de entrada
│   │   └── style.css     # Estilos globales
│   ├── public/           # Assets públicos
│   ├── md/               # Documentación
│   ├── index.html        # HTML principal
│   ├── vite.config.js    # Configuración Vite
│   └── package.json      # Dependencias frontend
│
├── backend/              # API Backend
│   ├── db.json          # Base de datos JSON
│   └── package.json     # Dependencias backend
│
├── package.json         # Scripts principales
└── README.md           # Este archivo
```

## 🚀 Instalación

### Instalar todas las dependencias

```bash
npm run install:all
```

O manualmente:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## 💻 Desarrollo

### Iniciar Frontend y Backend simultáneamente

```bash
npm run dev:all
```

### Iniciar solo Frontend

```bash
npm run dev:frontend
# o
cd frontend
npm run dev
```

### Iniciar solo Backend

```bash
npm run dev:backend
# o
cd backend
npm run dev
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Ver pedidos**: http://localhost:3001/orders

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en `frontend/dist/`

## 🛠️ Tecnologías

### Frontend
- Vue 3
- Vite
- Pinia (State Management)
- Vue Router
- CSS3

### Backend
- JSON Server (Base de datos local)

## ✨ Características

- ✅ Catálogo de productos (Camisetas Estampadas y Oversize)
- ✅ Carrito de compras con localStorage
- ✅ Sistema de checkout con formulario
- ✅ Métodos de pago (Bancolombia y Nequi)
- ✅ Base de datos de pedidos
- ✅ Diseño responsive
- ✅ Interfaz profesional en blanco y negro

## 📚 Documentación

Toda la documentación se encuentra en `frontend/md/`:
- `INSTRUCCIONES.md` - Guía de uso
- `SUBIR-A-GITHUB.md` - Cómo subir a GitHub y Vercel
- `README.md` - Documentación del frontend

## 🚀 Despliegue

### Vercel (Frontend)

1. Sube el proyecto a GitHub
2. Importa en Vercel
3. Configura el directorio raíz como `frontend`
4. Deploy automático

### Backend en Producción

Para producción, reemplaza JSON Server con:
- Supabase
- Firebase
- MongoDB Atlas
- PlanetScale

## 📝 Licencia

MIT

