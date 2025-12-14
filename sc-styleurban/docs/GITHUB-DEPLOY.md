# 📤 Guía Completa: Subir a GitHub y Desplegar en Vercel

## 🎯 Objetivo

Esta guía te ayudará a:
1. ✅ Subir tu proyecto completo a GitHub
2. ✅ Desplegar automáticamente en Vercel
3. ✅ Configurar variables de entorno
4. ✅ Mantener el proyecto actualizado

---

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub ([crear cuenta](https://github.com/signup))
- ✅ Cuenta de Vercel ([crear cuenta](https://vercel.com/signup))
- ✅ Git instalado en tu computadora
- ✅ Proyecto funcionando localmente

---

## 🚀 Parte 1: Subir a GitHub

### Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Click en el botón **"+"** (arriba derecha) → **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `StyleUrban` (o el nombre que prefieras)
   - **Description**: "E-commerce de ropa urbana con Vue 3 y Express"
   - **Visibility**: Public o Private (tu elección)
   - ⚠️ **NO** marques "Add a README file"
   - ⚠️ **NO** agregues .gitignore ni licencia
4. Click en **"Create repository"**

### Paso 2: Preparar tu Proyecto Local

Abre la terminal en la carpeta raíz de tu proyecto (`StyleUrban/`) y ejecuta:

```bash
# Verificar que estás en la carpeta correcta
pwd  # En Windows: cd

# Debería mostrar algo como: .../StyleUrban
```

### Paso 3: Inicializar Git (si no está inicializado)

```bash
# Inicializar repositorio Git
git init

# Verificar que .gitignore existe
ls -la | grep .gitignore  # En Windows: dir /a | findstr .gitignore
```

### Paso 4: Agregar Archivos al Repositorio

```bash
# Ver qué archivos se van a subir
git status

# Agregar todos los archivos
git add .

# Verificar archivos agregados (deben aparecer en verde)
git status
```

### Paso 5: Hacer el Primer Commit

```bash
# Crear commit con mensaje descriptivo
git commit -m "Initial commit: SC StyleUrban - Frontend y Backend integrados"

# Verificar que el commit se creó
git log --oneline
```

### Paso 6: Conectar con GitHub

Copia la URL de tu repositorio de GitHub (aparece después de crearlo).
Debería verse así: `https://github.com/tu-usuario/StyleUrban.git`

```bash
# Agregar repositorio remoto
git remote add origin https://github.com/TU-USUARIO/StyleUrban.git

# Verificar que se agregó correctamente
git remote -v
```

### Paso 7: Subir a GitHub

```bash
# Crear rama main
git branch -M main

# Subir código a GitHub
git push -u origin main
```

### ✅ Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Deberías ver todos tus archivos
3. Verifica que aparezcan:
   - ✅ `package.json`
   - ✅ `vercel.json`
   - ✅ `README.md`
   - ✅ Carpeta `sc-styleurban/`
   - ✅ Carpeta `api/`

---

## 🌐 Parte 2: Desplegar en Vercel

### Paso 1: Conectar GitHub con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Sign Up"** o **"Log In"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel para acceder a tus repositorios

### Paso 2: Importar Proyecto

1. En el dashboard de Vercel, click en **"Add New..."** → **"Project"**
2. Busca tu repositorio **"StyleUrban"**
3. Click en **"Import"**

### Paso 3: Configurar Proyecto

Vercel detectará automáticamente la configuración gracias a `vercel.json`.

**Verifica que la configuración sea:**
- **Framework Preset**: Vite
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `sc-styleurban/frontend/dist`
- **Install Command**: `npm install`

⚠️ **NO** hagas click en "Deploy" todavía.

### Paso 4: Configurar Variables de Entorno

1. Click en **"Environment Variables"**
2. Agrega las siguientes variables:

```
NEQUI_CLIENT_ID=tu_client_id_real
NEQUI_CLIENT_SECRET=tu_client_secret_real
NEQUI_API_KEY=tu_api_key_real
WOMPI_PUBLIC_KEY=pub_prod_tu_key_real
WOMPI_PRIVATE_KEY=prv_prod_tu_key_real
WOMPI_EVENTS_SECRET=tu_events_secret_real
NODE_ENV=production
```

3. Para cada variable:
   - Escribe el **Name** (nombre de la variable)
   - Escribe el **Value** (valor de la variable)
   - Selecciona **"Production"**, **"Preview"**, y **"Development"**
   - Click en **"Add"**

### Paso 5: Desplegar

1. Click en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ✅ ¡Listo! Tu sitio está en línea

### Paso 6: Configurar URLs Dinámicas

Después del primer deploy:

1. Copia tu URL de Vercel (ej: `https://style-urban-abc123.vercel.app`)
2. Ve a **Settings** → **Environment Variables**
3. Agrega/actualiza estas variables:

```
FRONTEND_URL=https://tu-dominio.vercel.app
BACKEND_URL=https://tu-dominio.vercel.app/api
```

4. Click en **"Deployments"** → **"Redeploy"**

---

## 🔄 Parte 3: Actualizar el Proyecto

Cada vez que hagas cambios en tu código:

```bash
# 1. Ver cambios
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push

# 5. Vercel desplegará automáticamente
```

---

## ✅ Verificar que Todo Funciona

### Frontend
1. Abre tu URL de Vercel
2. Verifica que el sitio carga correctamente
3. Navega por las páginas
4. Agrega productos al carrito

### Backend API
1. Abre `https://tu-dominio.vercel.app/api`
2. Deberías ver un JSON con información de la API

### Órdenes
1. Completa una compra de prueba
2. Verifica que se guarde correctamente

---

## 🆘 Solución de Problemas

### Error: "Build failed"
- Revisa los logs en Vercel
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que `vercel.json` esté en la raíz

### Error: "API not found"
- Verifica que la carpeta `api/` esté en GitHub
- Revisa que `vercel.json` tenga la configuración correcta

### Error: "Permission denied"
```bash
# Configurar credenciales de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Error: "Remote already exists"
```bash
# Eliminar remote y volver a agregar
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/StyleUrban.git
```

---

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)

---

¡Felicidades! 🎉 Tu proyecto está en línea y listo para recibir actualizaciones automáticas.

