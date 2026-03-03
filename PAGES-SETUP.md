# Arreglar página en blanco / error "video/mp2t"

Si ves **página en blanco** y en la consola: *"Failed to load module script... MIME type of video/mp2t"*, GitHub está sirviendo el **código fuente** (archivos `.ts`) en lugar del **sitio ya construido** (archivos `.js`).

## Qué hacer (elige una opción)

### Opción 1: Usar GitHub Actions (recomendado)

1. En GitHub abre tu repo **vue-projects**.
2. Arriba: pestaña **Settings** (no "Code").
3. En el menú izquierdo: **Pages** (en "Code and automation").
4. En **Build and deployment**:
   - Donde dice **Source**, haz clic en el desplegable.
   - Elige **GitHub Actions** (no "Deploy from a branch").
5. No hace falta guardar; se aplica solo.
6. Espera 1–2 minutos y abre en **modo incógnito**:  
   **https://robbhedonic.github.io/vue-projects/**

### Opción 2: Usar la rama gh-pages

1. En GitHub: **Settings** → **Pages**.
2. En **Build and deployment**:
   - **Source**: deja **Deploy from a branch**.
   - **Branch**: cambia a **gh-pages** (no "main").
   - **Folder**: deja **/ (root)**.
3. Guarda si aparece el botón.
4. Abre en incógnito: **https://robbhedonic.github.io/vue-projects/**

## Comprobar que está bien

- Abre: **https://robbhedonic.github.io/vue-projects/build-version.txt**  
  Si ves una línea con "built" y una fecha → se está sirviendo el build.  
  Si sale 404 → sigue sirviendo el código fuente; revisa de nuevo **Settings → Pages** (Source = GitHub Actions **o** Branch = gh-pages).
