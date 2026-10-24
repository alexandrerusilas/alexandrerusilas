# Conteúdo

Edite os JSON em `content/`. Depois rode `node scripts/generate-readme.mjs`. Não edite `README.md` nem `assets/readme/` à mão: a próxima geração sobrescreve.

## O que mudar

| Arquivo | Conteúdo |
| --- | --- |
| `content/profile.json` | Nome, handles, empresa, ano no GitHub |
| `content/links.json` | URLs e o e-mail público do estúdio |
| `content/projects.json` | Iniciativas publicáveis |
| `content/copy.json` | Textos do site e do README, nos dois idiomas |
| `content/sources.json` | Data e notas da última checagem |
| `content/terminal.mjs` | Respostas locais do playground |

Todo texto visível em português tem par em inglês (`pt` e `en`). O validador recusa campo pela metade.

## Projetos

Um projeto só entra com URL `https` verificada. `state` é `live` ou `building`. `filter` é `products`, `open-source` ou `experiments`.

Não invente métrica, versão, cliente ou funcionalidade. O FixScope permanece "em desenvolvimento" enquanto a organização não tiver repositório público. Não descreva arquitetura interna da AppTicket.

O e-mail publicado é o do estúdio, `contato@painelmagico.com`, porque está no site da Painel Mágico. Não coloque e-mail pessoal.

## Stack

A lista autorizada está em `copy.json`. Nome de tecnologia fica igual nos dois idiomas quando não há tradução. Itens de prática, como arquitetura e segurança, têm as duas formas.

## README

`templates/README.template.md` guarda a ordem das seções. O script preenche os blocos e regrava os SVGs de hero, navegação e projetos, em tema claro e escuro.

Conferir sem gravar:

```bash
node scripts/generate-readme.mjs --check
```

## Tradução

Não use tradução automática em tempo real. Escreva o inglês no JSON. O site mostra os dois no HTML e esconde um com `data-lang`. O README é em português, com um bloco "In English".

## Fontes conferidas em 2026-10-24

- https://github.com/alexandrerusilas
- https://www.linkedin.com/in/alexandrerusilas
- https://pfl.bio/@arusilas
- https://painelmagico.com
- https://pfl.bio
- https://github.com/fixscope

Lacunas de propósito: sem repositório público do FixScope, sem métricas de GitHub, sem stack específica de cada produto, sem detalhes internos da AppTicket. MongoDB aparece no LinkedIn e ficou de fora desta lista para não alargar o catálogo.
