# Juliana Almeida — Landing page

Landing page mobile-first, independente de serviços pagos, hospedada no Cloudflare Worker **corretor**.

- Produção: https://corretor.nutricionistaalmeidavh.workers.dev
- Contato: WhatsApp (+55 16 98128-6309), informado no perfil fornecido.
- Conteúdo: imóveis, consórcio/planejamento e seguros.
- Dados: nenhum formulário, banco de dados, cookie de rastreamento ou analytics configurado.
- Fotos: a imagem de perfil e a fotografia de família no condomínio aprovada pelo cliente estão incorporadas ao Worker; o hero AVIF (~13 KB) é armazenado em `site/hero-familia.base64.txt`.
- Arquitetura: HTML + CSS + SVG + Worker JavaScript. Sem bibliotecas de frontend ou serviços pagos.

## Arquivos

- site/index.html — conteúdo, layout e links de contato
- site/portrait.base64.txt — foto de perfil incorporada no build
- site/hero-familia.base64.txt — fotografia do hero otimizada e hospedada no próprio Worker
- scripts/build.mjs — gera dist/worker.mjs
- wrangler.toml — configuração do Worker existente
- tests/ — testes de conteúdo, assets, rotas e segurança
- .github/workflows/ — QA e deploy somente manuais

## Uso

Requer Node.js 20+.

1. Execute `npm test` para construir e testar.
2. Execute `npx --yes wrangler@4 dev` para desenvolvimento local.
3. Execute `npx --yes wrangler@4 deploy` para publicação manual.

Para deploy via GitHub Actions, configure os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`. Nunca grave credenciais no repositório. Os workflows não disparam a cada commit.

Antes de divulgar, confirmar com Juliana o texto comercial, autorização de uso da foto, credenciais profissionais e identificações eventualmente exigidas para seguros/consórcio. Não foram publicados registros ou promessas não verificados.
