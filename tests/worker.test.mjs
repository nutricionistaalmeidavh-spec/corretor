import test from "node:test";
import assert from "node:assert/strict";
import worker from "../dist/worker.mjs";

const url = path => new Request("https://corretor.nutricionistaalmeidavh.workers.dev" + path);

test("home returns valid HTML with restrictive response headers", async () => {
  const response = await worker.fetch(url("/"));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(response.headers.get("content-security-policy"), /default-src 'none'/);
  const html = await response.text();
  assert.match(html, /Juliana Almeida/);
  assert.match(html, /5516981286309/);
});

test("portrait is self-hosted and a valid JPEG", async () => {
  const response = await worker.fetch(url("/foto-juliana.jpg"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/jpeg");
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(bytes[0], 0xff);
  assert.equal(bytes[1], 0xd8);
});

test("favicon, health and HEAD endpoints work", async () => {
  const favicon = await worker.fetch(url("/favicon.svg"));
  assert.equal(favicon.status, 200);
  assert.match(await favicon.text(), /<svg/);
  const health = await worker.fetch(url("/health"));
  assert.deepEqual(await health.json(), {status:"ok",service:"corretor"});
  const head = await worker.fetch(new Request(url("/").url, {method:"HEAD"}));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

test("unknown routes and unsafe methods do not expose the page", async () => {
  assert.equal((await worker.fetch(url("/admin"))).status, 404);
  assert.equal((await worker.fetch(new Request(url("/").url, {method:"POST"}))).status, 405);
});