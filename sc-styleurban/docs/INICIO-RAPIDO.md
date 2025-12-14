# 🚀 Inicio Rápido - SC StyleUrban

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Git (para subir a GitHub)

## ⚡ Instalación Rápida

### 1. Instalar dependencias

```bash
# Instalar dependencias raíz
npm install

# Instalar dependencias de frontend y backend
npm run install:all
```

### 2. Configurar variables de entorno (opcional para desarrollo)

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales (opcional para desarrollo local)
```

## 💻 Desarrollo Local

### Opción 1: Iniciar todo junto (Recomendado)

```bash
npm run dev
```

Esto iniciará:
- ✅ Frontend en http://localhost:5173
- ✅ Backend en http://localhost:3000

### Opción 2: Iniciar por separado

**Terminal 1 - Frontend:**
```bash
npm run dev:frontend
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```

**Terminal 3 - Base de datos (solo para desarrollo):**
```bash
cd sc-styleurban/frontend
npm run db
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **JSON Server** (desarrollo): http://localhost:3001
- **Ver pedidos**: http://localhost:3001/orders

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en `sc-styleurban/frontend/dist/`

## 🚀 Desplegar en Vercel

### Paso 1: Subir a GitHub

```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - SC StyleUrban"

# Crear rama main
git branch -M main

# Agregar repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/StyleUrban.git

# Subir a GitHub
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "Import Project"
4. Selecciona tu repositorio "StyleUrban"
5. Vercel detectará automáticamente la configuración
6. Click en "Deploy"

### Paso 3: Configurar Variables de Entorno en Vercel

En el dashboard de Vercel:
1. Ve a Settings > Environment Variables
2. Agrega las siguientes variables:

```
NEQUI_CLIENT_ID=tu_client_id
NEQUI_CLIENT_SECRET=tu_client_secret
NEQUI_API_KEY=tu_api_key
WOMPI_PUBLIC_KEY=pub_prod_tu_key
WOMPI_PRIVATE_KEY=prv_prod_tu_key
WOMPI_EVENTS_SECRET=tu_events_secret
FRONTEND_URL=https://tu-dominio.vercel.app
BACKEND_URL=https://tu-dominio.vercel.app/api
NODE_ENV=production
```

3. Click en "Save"
4. Redeploy el proyecto

## ✅ Verificar que todo funciona

### En Desarrollo:
1. Abre http://localhost:5173
2. Navega por el catálogo
3. Agrega productos al carrito
4. Completa el checkout

### En Producción:
1. Abre tu URL de Vercel
2. Verifica que el frontend carga correctamente
3. Prueba agregar productos al carrito
4. Verifica que la API responde en `/api`

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev                 # Iniciar frontend y backend
npm run dev:frontend        # Solo frontend
npm run dev:backend         # Solo backend

# Build
npm run build              # Build del frontend

# Instalación
npm run install:all        # Instalar todas las dependencias

# Git
git status                 # Ver estado
git add .                  # Agregar cambios
git commit -m "mensaje"    # Hacer commit
git push                   # Subir a GitHub
```

## 📚 Documentación Adicional

- [README Principal](README.md)
- [Integración de Pagos](sc-styleurban/frontend/md/INTEGRACION-PAGOS-REAL.md)
- [Sistema de Pagos](sc-styleurban/frontend/md/SISTEMA-DE-PAGOS.md)

## 🆘 Problemas Comunes

### Error: Puerto ya en uso
```bash
# Matar proceso en puerto 5173 (Frontend)
npx kill-port 5173

# Matar proceso en puerto 3000 (Backend)
npx kill-port 3000
```

### Error: Módulos no encontrados
```bash
npm run install:all
```

### Error en Vercel: Build failed
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel
- Asegúrate de que `vercel.json` esté en la raíz

---

¡Listo para desarrollar! 🎉

