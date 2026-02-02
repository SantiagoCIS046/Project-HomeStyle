# 🛍️ SC HomeStyle - Tienda de Ropa Online

E-commerce completo con Frontend (Vue 3 + Vite) y Backend (Express + Pagos Reales) integrados en un solo repositorio.

## 🚀 Características

- ✅ **Frontend**: Vue 3 + Vite + Pinia + Vue Router
- ✅ **Backend**: Express.js con API de pagos
- ✅ **Pagos Reales**: Integración con Nequi y Wompi/Bancolombia
- ✅ **Catálogo**: Camisetas Estampadas y Oversize
- ✅ **Carrito**: Persistencia con localStorage
- ✅ **Checkout**: Formulario completo de pedidos
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Deploy**: Listo para GitHub y Vercel

## 📁 Estructura del Proyecto

```
StyleUrban/
├── sc-styleurban/
│   ├── frontend/              # Aplicación Vue 3
│   │   ├── src/
│   │   │   ├── components/   # Componentes Vue
│   │   │   ├── router/       # Vue Router
│   │   │   ├── stores/       # Pinia stores
│   │   │   ├── services/     # Servicios API
│   │   │   └── ...
│   │   ├── public/           # Assets públicos
│   │   └── package.json
│   │
│   └── backend/              # API Express
│       ├── routes/           # Rutas de la API
│       ├── services/         # Servicios de pago
│       ├── utils/            # Utilidades
│       ├── server.js         # Servidor Express
│       └── package.json
│
├── api/                      # Serverless Functions (Vercel)
│   └── index.js             # API unificada para producción
│
├── package.json             # Scripts principales
├── vercel.json              # Configuración de Vercel
├── .env.example             # Variables de entorno
└── README.md                # Este archivo
```

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/StyleUrban.git
cd StyleUrban
```

### 2. Instalar dependencias

```bash
# Instalar dependencias raíz
npm install

# Instalar dependencias de frontend y backend
npm run install:all
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
```

## 💻 Desarrollo Local

### Iniciar Frontend y Backend simultáneamente

```bash
npm run dev
```

Esto iniciará:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

### Iniciar solo Frontend

```bash
npm run dev:frontend
```

### Iniciar solo Backend

```bash
npm run dev:backend
```

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en `sc-styleurban/frontend/dist/`

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube el proyecto a GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/StyleUrban.git
   git push -u origin main
   ```

2. **Conecta con Vercel**:

   - Ve a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

3. **Configura las variables de entorno en Vercel**:

   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega todas las variables de `.env.example`

4. **Deploy**:
   - Click en "Deploy"
   - ¡Listo! Tu tienda estará en línea

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🔐 Variables de Entorno para Producción

En Vercel, configura estas variables:

```
NEQUI_CLIENT_ID=tu_client_id_real
NEQUI_CLIENT_SECRET=tu_client_secret_real
NEQUI_API_KEY=tu_api_key_real
WOMPI_PUBLIC_KEY=pub_prod_tu_key_real
WOMPI_PRIVATE_KEY=prv_prod_tu_key_real
WOMPI_EVENTS_SECRET=tu_events_secret_real
FRONTEND_URL=https://tu-dominio.vercel.app
BACKEND_URL=https://tu-dominio.vercel.app/api
NODE_ENV=production
```

## 🛠️ Tecnologías

### Frontend

- Vue 3
- Vite
- Pinia (State Management)
- Vue Router
- CSS3

### Backend

- Express.js
- Axios
- CORS
- dotenv

### Pagos

- Nequi API
- Wompi API (Bancolombia)

## 📚 Documentación Adicional

- [Integración de Pagos](sc-styleurban/frontend/md/INTEGRACION-PAGOS-REAL.md)
- [Sistema de Pagos](sc-styleurban/frontend/md/SISTEMA-DE-PAGOS.md)
- [Instrucciones de Uso](sc-styleurban/frontend/md/INSTRUCCIONES.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

MIT

## 👨‍💻 Autor

SC StyleUrban

---

**¿Necesitas ayuda?** Revisa la documentación en `sc-styleurban/frontend/md/`
