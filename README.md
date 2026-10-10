# Gimnasio Elite Maya, propuesta de diseño

Prototipo hecho por COFFEDEV_GT. React y esbuild, igual que la propuesta de Coban Travels.

## Ver la página en tu computadora

    npm install
    npm run dev

Abre http://localhost:5174 (el puerto es distinto al de Coban Travels, que usa 5173).

## Fotos

Van en `dev/img` con los nombres que indica `dev/img/LEEME.txt`.

## Qué se cambia y dónde

- Colores: `src/styles.css`, bloque `:root` al inicio.
- Precios, horarios, clases y textos: `src/data.js`.
- Teléfono de WhatsApp: `src/data.js` (`WA_NUMBER` y `PHONE`).

## Publicar

    npm run build

Deja `dist/index.html` y `dist/img`. Para GitHub Pages: sube el proyecto y en
Settings > Pages elige Source: GitHub Actions (el flujo ya está en `.github/workflows`).
