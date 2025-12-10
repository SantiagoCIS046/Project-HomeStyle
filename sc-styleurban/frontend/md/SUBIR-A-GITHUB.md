# 📤 Cómo Subir el Proyecto a GitHub y Vercel

## Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"New"** (Nuevo repositorio)
3. Nombre del repositorio: `sc-styleurban`
4. Descripción: `Tienda de ropa urbana - SC StyleUrban`
5. Selecciona **Public** (Público)
6. **NO** marques "Add a README file" (ya tenemos uno)
7. Haz clic en **"Create repository"**

## Paso 2: Conectar tu Proyecto Local con GitHub

Copia y pega estos comandos en tu terminal (dentro de la carpeta `sc-styleurban`):

```bash
git remote add origin https://github.com/TU-USUARIO/sc-styleurban.git
git branch -M main
git push -u origin main
```

**IMPORTANTE:** Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

## Paso 3: Desplegar en Vercel

### Opción A: Desde la Web (Recomendado)

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en **"Add New Project"**
3. Selecciona **"Import Git Repository"**
4. Busca y selecciona tu repositorio `sc-styleurban`
5. Vercel detectará automáticamente que es un proyecto Vite
6. Haz clic en **"Deploy"**
7. ¡Espera unos segundos y tu sitio estará en línea! 🎉

### Opción B: Desde la Terminal

```bash
npm install -g vercel
vercel login
vercel
```

## 📝 Notas Importantes

### Base de Datos en Producción

⚠️ **IMPORTANTE:** JSON Server no funciona en Vercel (solo para desarrollo local).

Para producción, necesitarás usar una base de datos real como:
- **Supabase** (Gratis, recomendado)
- **Firebase**
- **MongoDB Atlas**
- **PlanetScale**

### Configuración Actual

El proyecto está configurado para funcionar en Vercel con:
- ✅ Enrutamiento SPA (Single Page Application)
- ✅ Build automático con Vite
- ✅ Carrito de compras (funciona con localStorage)
- ⚠️ Base de datos (solo local, necesita configuración adicional para producción)

## 🔧 Comandos Útiles

```bash
# Ver estado de Git
git status

# Ver commits
git log --oneline

# Actualizar cambios en GitHub
git add .
git commit -m "Descripción de los cambios"
git push

# Ver repositorios remotos
git remote -v
```

## 🆘 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/sc-styleurban.git
```

### Error: "Permission denied"
- Verifica que estés autenticado en GitHub
- Usa GitHub Desktop o configura SSH keys

### El sitio no carga en Vercel
- Verifica que el build se completó sin errores
- Revisa los logs en el dashboard de Vercel
- Asegúrate de que `vercel.json` esté en la raíz del proyecto

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Vercel
2. Verifica que todos los archivos estén en GitHub
3. Asegúrate de que `npm run build` funcione localmente

