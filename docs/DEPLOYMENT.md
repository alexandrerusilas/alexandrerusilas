# Atualizar o perfil

O perfil https://github.com/alexandrerusilas mostra o `README.md` da branch `main` deste repositório. Não existe build de site.

## Local

Node.js 22.12 ou mais recente.

```bash
node scripts/validate.mjs
node --test tests/*.test.mjs
node scripts/generate-readme.mjs
```

Para conferir sem gravar:

```bash
node scripts/generate-readme.mjs --check
```

## Publicar no perfil

1. Altere os fatos em `content/`.
2. Rode `node scripts/generate-readme.mjs`.
3. Envie o `README.md` e `assets/readme/` para a branch `main`.

O GitHub passa a mostrar o arquivo assim que o commit chega em `main`. Não há workflow de publicação.

## O que este repositório não controla

A coluna esquerda do perfil (bio, foto, empresa, localização e site) é a configuração da conta, em Settings → Profile. O limite da bio é 160 caracteres.

## Problemas comuns

- O perfil continua com o texto antigo: o README novo ainda não está em `main`, ou o navegador está com a página em cache.
- README diferente do conteúdo: rode o gerador e envie o `README.md` junto com `assets/readme/`.
- Uma imagem não aparece: o caminho precisa ser relativo, como `./assets/readme/hero-dark.svg`, e o arquivo precisa estar no repositório.
