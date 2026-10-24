# Deploy e desenvolvimento

Requisitos: Node.js 22.12 ou mais recente, e npm. O portfolio usa Astro 6 porque o Astro 7 exige Node 22.23.4.

## Local

Na raiz:

```bash
node scripts/validate.mjs
node --test tests/*.test.mjs
node scripts/generate-readme.mjs
```

No portfolio:

```bash
cd site
npm ci
npm run dev
```

O site abre em `http://localhost:4321/alexandrerusilas/`. O prefixo é obrigatório.

Outros comandos, dentro de `site/`:

```bash
npm run check
npx prettier --check .
npm run build
npm run preview
```

O build sai em `site/dist`.

## GitHub Pages

1. Faça push da branch `main`.
2. No repositório, abra Settings → Pages.
3. Em Build and deployment, escolha Source: GitHub Actions.
4. O workflow `CI` roda em pull requests e em pushes na `main`.
5. O workflow `Deploy Pages` só publica depois de um `CI` bem-sucedido disparado por push na `main`. Pull request não publica.

A URL esperada é https://alexandrerusilas.github.io/alexandrerusilas/

Ela não responde antes desse ajuste. O link já está no README e no site.

O artifact enviado é `site/dist`. Permissões do deploy: leitura do código, `pages: write` e `id-token: write`. Não há segredo no repositório.

## Problemas comuns

- Página sem estilo: o Pages ainda não foi ativado, ou o `base` deixou de ser `/alexandrerusilas`.
- README diferente do conteúdo: rode o gerador e commit o `README.md` junto com `assets/readme/`.
- `npm ci` falha: o lockfile de `site/package-lock.json` precisa estar commitado.
- Workflow de deploy não aparece: o arquivo precisa existir em `main` pelo menos uma vez.
- Imagem social desatualizada: edite `assets/social/og.svg` e gere de novo `site/public/og-image.png` antes do build.

## CI

O CI valida o JSON, roda os testes do terminal, confere se o README está sincronizado, checa tipos e formatação, faz o build e confirma o prefixo `/alexandrerusilas/` no HTML.
