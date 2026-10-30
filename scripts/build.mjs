import { readFile, mkdir, writeFile } from "node:fs/promises";
const [html, portrait] = await Promise.all([
  readFile(new URL("../site/index.html", import.meta.url), "utf8"),
  readFile(new URL("../site/portrait.base64.txt", import.meta.url), "utf8")
]);
const favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#17262a"/><text x="32" y="43" text-anchor="middle" fill="#d8bc95" font-family="Georgia,serif" font-size="29">JA</text></svg>';
const runtime = "const SECURITY = {\n  \"X-Content-Type-Options\": \"nosniff\",\n  \"Referrer-Policy\": \"strict-origin-when-cross-origin\",\n  \"X-Frame-Options\": \"DENY\",\n  \"Content-Security-Policy\": \"default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'\"\n};\nexport default {\n  async fetch(request) {\n    if (![\"GET\", \"HEAD\"].includes(request.method)) {\n      return new Response(\"Método não permitido\", {status:405,headers:{...SECURITY,Allow:\"GET, HEAD\"}});\n    }\n    const pathname = new URL(request.url).pathname;\n    const onlyHead = request.method === \"HEAD\";\n    if (pathname === \"/\" || pathname === \"/index.html\") {\n      return new Response(onlyHead ? null : PAGE, {\n        status: 200,\n        headers: {...SECURITY,\"Content-Type\":\"text/html; charset=utf-8\",\"Cache-Control\":\"public, max-age=120\"}\n      });\n    }\n    if (pathname === \"/foto-juliana.jpg\") {\n      const bytes = Uint8Array.from(atob(PORTRAIT), ch => ch.charCodeAt(0));\n      return new Response(onlyHead ? null : bytes, {\n        status: 200,\n        headers: {...SECURITY,\"Content-Type\":\"image/jpeg\",\"Cache-Control\":\"public, max-age=86400\"}\n      });\n    }\n    if (pathname === \"/favicon.svg\") {\n      return new Response(onlyHead ? null : FAVICON, {\n        status: 200,\n        headers: {...SECURITY,\"Content-Type\":\"image/svg+xml; charset=utf-8\",\"Cache-Control\":\"public, max-age=86400\"}\n      });\n    }\n    if (pathname === \"/health\") {\n      return new Response(onlyHead ? null : '{\"status\":\"ok\",\"service\":\"corretor\"}', {\n        status: 200,\n        headers: {...SECURITY,\"Content-Type\":\"application/json; charset=utf-8\",\"Cache-Control\":\"no-store\"}\n      });\n    }\n    return new Response(onlyHead ? null : \"Página não encontrada\", {\n      status: 404,\n      headers: {...SECURITY,\"Content-Type\":\"text/plain; charset=utf-8\"}\n    });\n  }\n};";
const js = [
  "// Arquivo gerado automaticamente. Edite site/index.html e execute npm run build.",
  "const PAGE = " + JSON.stringify(html) + ";",
  "const PORTRAIT = " + JSON.stringify(portrait.trim()) + ";",
  "const FAVICON = " + JSON.stringify(favicon) + ";",
  runtime
].join("\n");
await mkdir(new URL("../dist/", import.meta.url), {recursive:true});
await writeFile(new URL("../dist/worker.mjs", import.meta.url), js, "utf8");
console.log("Worker gerado: dist/worker.mjs");
