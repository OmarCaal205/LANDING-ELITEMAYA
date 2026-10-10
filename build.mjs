import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";

const result = await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  minify: true,
  write: false,
  outdir: "dist",
  jsx: "automatic",
  loader: { ".css": "css", ".woff2": "dataurl" },
  define: { "process.env.NODE_ENV": '"production"' },
});

let js = "";
let css = "";
for (const f of result.outputFiles) {
  if (f.path.endsWith(".js")) js = f.text;
  if (f.path.endsWith(".css")) css = f.text;
}

const template = readFileSync("index.template.html", "utf8");
const html = template
  .replace("/*__CSS__*/", () => css)
  .replace("/*__JS__*/", () => js.replace(/<\/script/g, "<\\/script"));

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);

// Las fotos viajan junto al HTML: dist/index.html + dist/img/
if (existsSync("dev/img")) cpSync("dev/img", "dist/img", { recursive: true });

console.log("OK dist/index.html", (html.length / 1024).toFixed(0) + " KB");
