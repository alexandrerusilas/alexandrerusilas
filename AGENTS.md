# Agentes

Este repositório personaliza o perfil público https://github.com/alexandrerusilas. O GitHub mostra apenas o `README.md` da raiz. Não há site separado.

## Contexto

Alexandre é Líder de Tecnologia na AppTicket. Também constrói a Painel Mágico, o PFL.bio e o FixScope. Não use o título CTO. Não publique arquitetura interna, incidente, cliente ou repositório privado da AppTicket.

O FixScope está em desenvolvimento. A organização https://github.com/fixscope existe e não tinha repositório público na checagem de 2026-10-24. Não invente versão, métrica ou funcionalidade.

## Arquitetura

- Texto e fatos ficam em `content/`.
- O README é gerado por `node scripts/generate-readme.mjs`. Não edite `README.md` ou `assets/readme/` sem regenerar.
- O perfil não executa JavaScript nem CSS próprio. A composição visual fica em SVG estático, com versão clara, escura e estreita.

## Interface

O README é uma mesa, não um dashboard. Fundo `#0B1017`, folha `#151D28`, tinta `#F4F1EA`, menta, azul e pêssego. Há versão clara equivalente nos SVGs.

Não adicione cartões iguais, sobrancelha acima de título, parede de badges, glassmorphism, neon ou gráfico de vaidade. Não crie um site nem publique no GitHub Pages.

Português é o padrão. O inglês fica num bloco `<details>` do README.

## Segurança

Não adicione token, analytics, segredo ou script de terceiro. Não descreva sistema interno. O e-mail público permitido é `contato@painelmagico.com`.

## Comandos

```bash
node scripts/validate.mjs
node --test tests/*.test.mjs
node scripts/generate-readme.mjs
```

## Qualidade

Antes de encerrar uma mudança visível: gere o README se o conteúdo mudou e rode a validação e os testes. O perfil público só muda depois que o `README.md` entra na branch `main`. Não faça push sem pedido explícito.

Workflows em `.github/workflows/` usam SHA fixo das actions. Não troque por uma tag móvel e não aumente permissão sem necessidade.
