# Cómo hacer que la página se vea (evitar blanco / video/mp2t)

El workflow sube el build a **gh-pages** y también a la carpeta **docs** en **main**. Elige **una** de estas dos en Settings → Pages:

## Opción 1: Rama main, carpeta docs (recomendada)

1. **https://github.com/Robbhedonic/vue-projects/settings/pages**
2. **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: **main**
   - **Folder**: **docs** (no "root")
3. Guardar.

## Opción 2: Rama gh-pages

1. Misma página de Settings → Pages.
2. **Branch**: **gh-pages**
3. **Folder**: **/ (root)**

---

Después de cambiar, espera 1–2 minutos y abre en **modo incógnito**:  
https://robbhedonic.github.io/vue-projects/
