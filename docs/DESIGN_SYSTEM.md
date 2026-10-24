# Design system

O perfil do GitHub é o README. A composição visual cabe nos SVGs, porque a página não aceita CSS próprio.

A peça é uma mesa noturna: fundo `#0B1017`, folha `#151D28`, tinta `#F4F1EA`. Três cores de desenho: menta `#6EF2B0`, azul `#7AC7FF` e pêssego `#FFBC8A`. O tema claro usa fundo `#F4F1EA`, tinta `#14202B` e versões escuras das mesmas três cores, para o texto continuar legível.

Os banners usam a fonte do sistema. O GitHub não carrega Space Grotesk nem Inter dentro do README.

Cada SVG tem marca de registro nos cantos e, no hero, cinco pontos ligados. Não há parede de badges, gráfico de contribuições nem ícone de marca de terceiro.

Há quatro arquivos de hero: claro e escuro, em 1280×520 e em 640×820. O README escolhe com `<picture>` e `prefers-color-scheme`.
