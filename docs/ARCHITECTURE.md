# Arquitetura

O repositório existe para a página https://github.com/alexandrerusilas. Essa página mostra o `README.md` da raiz quando o repositório é público e tem o mesmo nome do usuário. A documentação do GitHub chama isso de profile README.

Não há outro site. GitHub Pages não faz parte do perfil.

## Como o perfil é montado

O `README.md` é gerado. Ele precisa fazer sentido sozinho, dentro do Markdown e do HTML que o GitHub renderiza. Não há JavaScript, CSS global nem iframe.

## Diretórios

- `content/` — fatos, textos, projetos e links. Fonte única.
- `templates/README.template.md` — ordem das seções do README.
- `scripts/generate-readme.mjs` — valida o conteúdo e gera o README e os SVGs.
- `assets/readme/` — imagens usadas pelo README. São geradas; não edite à mão.
- `docs/` — como manter o projeto.
- `.github/workflows/ci.yml` — confere conteúdo e README.

## Decisões

- Texto novo entra em `content/`, depois o gerador reescreve o README.
- Estatísticas do GitHub não são buscadas. A conta pública não justifica um gráfico, e um gerador externo quebraria o README quando a API falhasse.
- Ícones de marca de terceiros não são usados. Os desenhos são originais.
- O idioma padrão é português. O inglês fica num bloco recolhível.

## Restrições do GitHub

O README aceita Markdown e um subconjunto de HTML. SVG animado e fonte remota não são confiáveis, então os banners usam SVG estático com fonte de sistema e uma versão mais alta para telas estreitas, via `<picture>`. Se o tema escuro não for respeitado, a imagem clara continua legível.

A bio, a foto, a empresa e o link da coluna esquerda do perfil não vêm deste arquivo. Eles ficam em https://github.com/settings/profile.
