// Serves the GitHub Pages export (pages-site/out) at http://localhost:3200/JEE-EDGE-100/ for local checks.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("pages-site/out");
const base = "/JEE-EDGE-100";
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain", ".woff2": "font/woff2" };

http.createServer((req, res) => {
  let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (url === "/" || !url.startsWith(base)) { res.writeHead(302, { location: base + "/" }); return res.end(); }
  let p = path.join(root, url.slice(base.length));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) { res.writeHead(404, { "content-type": "text/html" }); return res.end(fs.existsSync(path.join(root, "404.html")) ? fs.readFileSync(path.join(root, "404.html")) : "Not found"); }
  res.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
}).listen(3200, () => console.log("static edition on http://localhost:3200/JEE-EDGE-100/"));
