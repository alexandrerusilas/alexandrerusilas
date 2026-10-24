# Agentes

Este repositório é o perfil público de Alexandre Rusilas: um README de GitHub e um portfolio Astro no mesmo projeto.

## Contexto

Alexandre é Líder de Tecnologia na AppTicket. Também constrói a Painel Mágico, o PFL.bio e o FixScope. Não use o título CTO. Não publique arquitetura interna, incidente, cliente ou repositório privado da AppTicket.

O FixScope está em desenvolvimento. A organização https://github.com/fixscope existe e não tinha repositório público na checagem de 2026-10-24. Não invente versão, métrica ou funcionalidade.

## Arquitetura

- Texto e fatos ficam em `content/`.
- O README é gerado por `node scripts/generate-readme.mjs`. Não edite `README.md` ou `assets/readme/` sem regenerar.
- O site está em `site/` e usa `base: /alexandrerusilas`.
- Comportamento do portfolio fica em `site/src/scripts/main.ts`.
- O terminal importa `content/terminal.mjs`. Comandos novos precisam ser locais, sem `eval` e sem rede.

## Interface

A página é uma mesa, não um dashboard. Fundo `#0B1017`, folha `#151D28`, tinta `#F4F1EA`, menta, azul e pêssego como na `docs/DESIGN_SYSTEM.md`. Há tema claro equivalente.

Não adicione cartões iguais, sobrancelha acima de título, parede de badges, glassmorphism, neon ou gráfico de vaidade.

Respeite `prefers-reduced-motion`. Mantenha foco visível e os dois idiomas. Português é o padrão.

## Segurança

Não adicione token, analytics, segredo ou script de terceiro. Não descreva sistema interno. O e-mail público permitido é `contato@painelmagico.com`.

## Comandos

```bash
node scripts/validate.mjs
node --test tests/*.test.mjs
node scripts/generate-readme.mjs
cd site && npm ci && npm run check && npm run build
```

## Qualidade

Antes de encerrar uma mudança visível: gere o README se o conteúdo mudou, rode a validação, os testes e o build, e olhe o site em 360, 768 e 1440. Não faça push sem pedido explícito.

Workflows em `.github/workflows/` usam SHA fixo das actions. Não troque por uma tag móvel e não aumente permissão sem necessidade.
