# Juliana Almeida — Landing page

Landing page mobile-first, independente de serviços pagos, hospedada no Cloudflare Worker **corretor**.

- Produção: https://corretor.nutricionistaalmeidavh.workers.dev
- Contato: WhatsApp (+55 16 98128-6309), informado no perfil fornecido.
- Conteúdo: imóveis, consórcio/planejamento e seguros.
- Dados: nenhum formulário, banco de dados, cookie de rastreamento ou analytics configurado.
- Foto: recorte otimizado da imagem de perfil fornecida; armazenada no projeto.
- Arquitetura: HTML + CSS + SVG + Worker JavaScript. Sem bibliotecas de frontend ou serviços pagos.

## Arquivos

- site/index.html — conteúdo, layout e links de contato
- site/portrait.base64.txt — foto incorporada no build
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
