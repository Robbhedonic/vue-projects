# Desplegar el backend para que el login funcione en la web

El front está en **GitHub Pages** (solo archivos estáticos). Para que el **login** funcione en tu sitio público necesitas desplegar el backend y decirle al front dónde está.

---

## 1. Desplegar el backend en Render (gratis)

1. Entra en **[render.com](https://render.com)** y regístrate (con GitHub).
2. **New → Web Service**.
3. Conecta el repositorio **Robbhedonic/vue-projects** (o el que uses).
4. Configuración:
   - **Name:** por ejemplo `vue-project-api`
   - **Root Directory:** `server` (importante)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. En **Environment** añade (Add Environment Variable):
   - `OWNER_EMAIL` = tu email (ej. rccstockholm@outlook.com)
   - `OWNER_PASSWORD` = tu contraseña (la misma que en `server/.env`)
   - `JWT_SECRET` = una frase larga y aleatoria (ej. `mi-clave-secreta-muy-larga-123`)
6. Clic en **Create Web Service**. Espera a que termine el deploy.
7. Copia la URL del servicio (ej. `https://vue-project-api.onrender.com`). **Sin barra final.**

---

## 2. Decirle al front la URL del backend (GitHub)

1. En GitHub abre tu repo **Robbhedonic/vue-projects**.
2. **Settings → Secrets and variables → Actions**.
3. Pestaña **Variables** → **New repository variable**.
4. **Name:** `VITE_API_URL`  
   **Value:** la URL de Render (ej. `https://vue-project-api.onrender.com`), sin barra al final.
5. Guarda.

---

## 3. Volver a desplegar el front

Cualquier push a `main` volverá a construir y desplegar la web usando esa URL. Para forzarlo sin cambiar código:

- **Actions** → workflow **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**.

Cuando termine, en tu web (robbhedonic.github.io) el botón de login llamará al backend en Render y podrás iniciar sesión.

---

## Resumen

| Dónde              | Qué hace |
|-------------------|----------|
| **Render**        | Ejecuta el backend (login, dashboard, subida de imágenes). |
| **GitHub Pages**  | Sirve el front (HTML/JS/CSS). |
| **Variable `VITE_API_URL`** | En el build del front se “quema” la URL del backend para que el navegador sepa a dónde enviar el login. |

Si no configuras `VITE_API_URL`, el build sigue funcionando pero el login en la web mostrará el mensaje de “not available on this deployment”.
