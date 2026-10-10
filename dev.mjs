import { context } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";

// Puerto distinto al de Coban Travels (5173) para poder tener los dos abiertos a la vez
const PORT = 5174;

mkdirSync("dev", { recursive: true });

// Misma plantilla que el build final, pero cargando main.js y main.css por separado
const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gimnasio Elite Maya | Propuesta de diseño (desarrollo)</title>
<link rel="stylesheet" href="/main.css">
</head>
<body>
<div id="root"></div>
<script>new EventSource("/esbuild").addEventListener("change", () => location.reload());</script>
<script src="/main.js"></script>
</body>
</html>`;
writeFileSync("dev/index.html", html);

const ctx = await context({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  outdir: "dev",
  jsx: "automatic",
  loader: { ".css": "css", ".woff2": "dataurl" },
  define: { "process.env.NODE_ENV": '"development"' },
  sourcemap: true,
  logLevel: "info",
});

await ctx.watch();
const { port } = await ctx.serve({ servedir: "dev", port: PORT });
console.log(`\n  Abre http://localhost:${port}\n  Los cambios se recargan solos al guardar.\n`);
