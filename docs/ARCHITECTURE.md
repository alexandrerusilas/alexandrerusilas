# Arquitetura

O repositório é a superfície pública de Alexandre Rusilas. Ele publica duas experiências a partir da mesma fonte de conteúdo.

## README e portfolio

O `README.md` é a entrada principal, renderizado pelo GitHub no perfil. Ele precisa fazer sentido sozinho. Não há JavaScript, CSS global nem iframe.

O portfolio em `site/` é a extensão interativa, gerada com Astro e publicada no GitHub Pages em `https://alexandrerusilas.github.io/alexandrerusilas/`. O `base` do Astro é `/alexandrerusilas`.

## Diretórios

- `content/` — fatos, textos, projetos e links. Fonte única.
- `templates/README.template.md` — ordem das seções do README.
- `scripts/generate-readme.mjs` — valida o conteúdo e gera o README e os SVGs.
- `assets/readme/` — imagens usadas pelo README. São geradas; não edite à mão.
- `assets/social/og.svg` — origem da imagem de compartilhamento.
- `site/` — portfolio Astro.
- `docs/` — como manter o projeto.
- `.github/workflows/` — CI e publicação.

## Decisões

- O README e o site leem os mesmos JSON. Texto novo entra em `content/`, não espalhado no HTML.
- O terminal do playground responde só a comandos pré-escritos em `content/terminal.mjs`. Não há `eval`, backend nem coleta de input.
- Estatísticas do GitHub não são buscadas. A conta pública não justifica um gráfico, e um gerador externo quebraria o README quando a API falhasse.
- Ícones de marca de terceiros não são usados. Os desenhos são originais.
- O idioma padrão é português. O inglês do site está no HTML e aparece com `data-lang="en"`, sem serviço de tradução.

## Restrições do GitHub

O README aceita Markdown e um subconjunto de HTML. SVG animado e fonte remota não são confiáveis, então os banners usam SVG estático com fonte de sistema e uma versão mais alta para telas estreitas, via `<picture>`. Se o tema escuro não for respeitado, a imagem clara continua legível.

Links do portfolio apontam para o endereço esperado do Pages. Esse endereço só responde depois da ativação descrita em `docs/DEPLOYMENT.md`.
