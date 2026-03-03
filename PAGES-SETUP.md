# Cómo hacer que la página se vea en https://robbhedonic.github.io/vue-projects/

El workflow sube el **build** a la rama **gh-pages**. Para que el sitio se muestre (y no en blanco), GitHub Pages debe usar esa rama.

## Pasos (solo una vez)

1. En GitHub: **https://github.com/Robbhedonic/vue-projects** → **Settings**.
2. Menú izquierdo → **Pages**.
3. En **Build and deployment**:
   - **Source**: **Deploy from a branch**
   - **Branch**: **gh-pages** (no "main")
   - **Folder**: **/ (root)**
4. Guardar si hace falta.

En 1–2 minutos el sitio debería verse en: **https://robbhedonic.github.io/vue-projects/**

Si sigue en blanco, abre la página en **modo incógnito** (caché limpia).
