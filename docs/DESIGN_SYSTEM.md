# Design system

A página é uma mesa noturna vista de cima: fundo de madeira escura, folhas de papel, três lápis e marcas de registro nos cantos. O dia é a mesma mesa com luz natural. Não é um console, um dashboard nem um currículo.

## Tokens

Definidos em `site/src/styles/global.css`.

| Token | Noite | Dia | Uso |
| --- | --- | --- | --- |
| `--bg` | `#0B1017` | `#F4F1EA` | Fundo |
| `--surface` | `#151D28` | `#FFFCF7` | Folhas |
| `--fg` | `#F4F1EA` | `#14202B` | Texto |
| `--muted` | `#97A6B7` | `#3E4C5C` | Texto de apoio |
| `--primary` | `#6EF2B0` | `#0C6E4A` | Estrutura |
| `--secondary` | `#7AC7FF` | `#0E5F93` | Links |
| `--warm` | `#FFBC8A` | `#9A4E22` | Ação principal e luminária |
| `--border` | `#2B3542` | `#D5D0C6` | Fios de 1px |
| `--shadow` | deslocada, suave | deslocada, suave | Folha sobre a mesa |

O verde claro da noite não é texto no tema claro. Lá o lápis verde escurece para manter contraste.

## Tipo

- Space Grotesk: nome e títulos. Teto de `6rem`.
- Inter: texto e interface. Medida de leitura até `68ch`. A frase do hero fica em `42ch`.
- JetBrains Mono: somente o terminal.

As fontes são empacotadas pelo build, com fallback de sistema. O README não carrega essas fontes; o SVG usa a pilha do sistema.

## Componentes

- Trilho: monograma, seções, luminária, tema e idioma.
- Placa: a única ação preenchida, cor quente.
- Pino: uma prática da mesa, sempre em papel claro. Seleção troca uma única frase.
- Folhas de projeto e o terminal usam `--surface`, não o papel dos pinos. Categoria e estado ficam na nota, abaixo do texto.
- Fios: arcos entre os pinos. No ponteiro fino eles cedem um pouco. Somem abaixo de 540px, quando os cinco rótulos não cabem numa linha. O menu entra abaixo de 720px.
- Abas: sobre e processo. Teclado com setas, Home e End.
- Folha de projeto: a do estúdio ocupa mais espaço que as outras.
- Terminal: folha opcional, com atalhos clicáveis.
- Marcas de canto: registro de desenho, sem texto.

## Movimento

Durações: 160ms para controle, 280ms reservado. Curva `cubic-bezier(0.22, 1, 0.36, 1)`.

O movimento autoral é o fio da mesa. Hover de placa e pino desloca 2px. Não há animação infinita.

Com `prefers-reduced-motion: reduce`, a rolagem é instantânea, os fios não seguem o ponteiro e as transições somem. Todo o conteúdo continua acessível.

## Modo café

A luminária aquece o fundo. É um detalhe editorial, não um status de infraestrutura. A preferência fica no `localStorage`.

## Acessibilidade

Alvo WCAG 2.2 AA. Foco visível, alvo de 44px nos controles, nomes nos links externos, painéis com `hidden`, e um link de pular conteúdo. O idioma do documento muda com o botão EN/PT.
