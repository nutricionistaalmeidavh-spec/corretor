import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");

test("a página apresenta Juliana e as três áreas de atendimento", () => {
  assert.match(html, /Juliana Almeida/);
  assert.match(html, /Imóveis/);
  assert.match(html, /Consórcio/);
  assert.match(html, /Seguros/);
});

test("todos os atalhos de WhatsApp usam o número publicado", () => {
  const numbers = [...html.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map(match => match[1]);
  assert.ok(numbers.length >= 3);
  assert.ok(numbers.every(number => number === "5516981286309"));
});

test("mobile e acessibilidade possuem estrutura sem scripts de terceiros", () => {
  assert.match(html, /name="viewport"/);
  assert.match(html, /<main id="conteudo"/);
  assert.match(html, /<nav aria-label="Navegação principal"/);
  assert.match(html, /prefers-reduced-motion/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
  assert.doesNotMatch(html, /<form[\s>]/);
});

test("não inventa credenciamento ou garantias comerciais", () => {
  assert.doesNotMatch(html, /CRECI\s*\d+|SUSEP\s*\d+/i);
  assert.doesNotMatch(html, /aprovação garantida|sem análise de crédito/i);
});
test("hero usa a fotografia aprovada e não a antiga ilustração", () => {
  assert.match(html, /src="\/hero-familia\.avif\?v=2"/);
  assert.match(html, /alt="Família passeando por um condomínio residencial ao pôr do sol"/);
  assert.doesNotMatch(html, /viewBox="0 0 560 630"/);
});
