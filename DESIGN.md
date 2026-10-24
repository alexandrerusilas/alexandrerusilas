---
name: Alexandre Rusilas
description: A night desk for engineering, product, and the work in progress.
colors:
  night-walnut: "#0B1017"
  night-sheet: "#151D28"
  day-sheet: "#F4F1EA"
  day-paper: "#FFFCF7"
  pin-paper: "#F4F1EA"
  night-ink: "#F4F1EA"
  day-ink: "#14202B"
  night-muted: "#97A6B7"
  day-muted: "#3E4C5C"
  mint: "#6EF2B0"
  mint-ink: "#0C6E4A"
  sky: "#7AC7FF"
  sky-ink: "#0E5F93"
  peach: "#FFBC8A"
  warm-ink: "#1A120C"
  day-warm: "#9A4E22"
  night-border: "#2B3542"
  day-border: "#D5D0C6"
  instrument: "#1A2430"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  edge: "2px"
spacing:
  gutter: "24px"
  control: "44px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.edge}"
    padding: "0 18px"
    height: "48px"
    typography: "{typography.body}"
  button-instrument:
    backgroundColor: "{colors.instrument}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.edge}"
    padding: "0 12px"
    height: "44px"
  pin:
    backgroundColor: "{colors.pin-paper}"
    textColor: "{colors.day-ink}"
    rounded: "{rounded.edge}"
    padding: "14px 12px"
    height: "72px"
    typography: "{typography.headline}"
  card-night:
    backgroundColor: "{colors.night-sheet}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.edge}"
    padding: "24px"
---

# Design System: Alexandre Rusilas

## Overview

**Creative North Star: "The night desk"**

The page is one desk seen from above. Night walnut is the table. Sheets sit on it. Three pencils do the drawing: mint for structure, sky for links, peach for the human action and the lamp. The visitor reads a name, a sentence, and one row of practices before turning the next sheet.

The same desk exists in daylight. Colors darken where night mint, sky, and peach would fail as text on paper. Pins stay paper in both themes, so the drawing on the front lip does not disappear into the table.

**Key Characteristics:**

- One sheet, read from the top, not a split hero
- Space Grotesk for the name, Inter for the sheet, JetBrains Mono only in the terminal
- A 1px edge and a soft shadow on instruments, the plaque, pins, and sheets
- Corner registration marks, not a device frame
- Brazilian Portuguese first

## Colors

Night is a walnut table with paper pins. Day is the same table under a lamp that has been switched off.

### Primary

- **Mint** (#6EF2B0): Structure. Threads, the selected section, and the terminal prompt at night.
- **Mint ink** (#0C6E4A): The same pencil on the day sheet, where night mint would fail contrast.

### Secondary

- **Sky** (#7AC7FF): Links and the focus ring at night.
- **Sky ink** (#0E5F93): Links on the day sheet.

### Tertiary

- **Peach** (#FFBC8A): The one filled action and the lamp at night. Ink on the plaque is **Warm ink** (#1A120C).
- **Day warm** (#9A4E22): The plaque and lamp on the day sheet, with light ink.

### Neutral

- **Night walnut** (#0B1017): The table.
- **Night sheet** (#151D28): Project sheets and the terminal at night.
- **Day sheet** (#F4F1EA): The table by day, and the pin paper.
- **Day paper** (#FFFCF7): Raised day sheets and day pins.
- **Night ink** (#F4F1EA): Text at night.
- **Day ink** (#14202B): Text by day, and the type on the pins.
- **Night muted** (#97A6B7) and **Day muted** (#3E4C5C): Supporting sentences.
- **Night border** (#2B3542) and **Day border** (#D5D0C6): 1px edges.
- **Instrument** (#1A2430): Lamp, theme, and language controls at night.

### Named Rules

**The Three Pencils Rule.** Mint draws structure, sky draws links, peach draws the human action. A fourth accent is not part of the desk.

**The Paper Pin Rule.** The five practices stay on paper in both themes. Project sheets and the terminal follow the theme surface.

## Typography

**Display Font:** Space Grotesk (with Inter, then system sans)
**Body Font:** Inter (with system sans)
**Label/Mono Font:** JetBrains Mono (with system monospace)

**Character:** The name is a nameplate, tight and large. The sheet is a reading face. Mono is reserved for the terminal, not for decoration.

### Hierarchy

- **Display** (500, clamp(2.75rem, 6vw, 6rem), line-height 0.96): The name, two lines, left.
- **Headline** (500, clamp(2rem, 4vw, 3.25rem), line-height 0.96): Section titles. Max about 16ch.
- **Title** (500, clamp(1.8rem, 3vw, 2.6rem), line-height 0.96): A project name.
- **Body** (400, 1.0625rem, line-height 1.6): The sheet. Reading measure 68ch. The hero sentence stops at 42ch.
- **Label** (400, 0.92rem, JetBrains Mono): Terminal log only.

### Named Rules

**The Nameplate Rule.** Space Grotesk is for the name and headings. It is not the body. The display size stops at 6rem.

## Layout

The desk is one column inside a sheet of `min(1120px, 100% - 48px)`, gutter 24px. The hero is at least one viewport tall on a wide screen, with the name at the top and the five pins on the front lip. Threads arc in the band above the pins.

The text rail holds while the Portuguese labels and the instruments still fit, which is above 720px. Below that, the rail is the monogram plus a menu. The five pins stay in one row until 540px. Below that, "Arquitetura" no longer fits a fifth of the row, so the pins wrap and the threads hide. Other sections stack to one column below 800px. At 360px the instruments wrap onto a second header row so they do not cover the menu button.

Sections start with 96px of air, 72px below 800px. Controls are at least 44px.

## Elevation & Depth

Depth is a sheet sitting on the table: a 1px edge plus one soft shadow. The night shadow adds a faint ink ring so the edge can be seen on walnut. There is no glass, no gradient text, and no hard offset block.

### Shadow Vocabulary

- **Sheet** (`box-shadow: 0 0 0 1px rgba(244, 241, 234, 0.28), 0 14px 24px rgba(0, 0, 0, 0.72)`): Night instruments, plaque, pins, project sheets, and the terminal.
- **Day sheet** (`box-shadow: 0 16px 32px rgba(20, 32, 43, 0.08)`): The same objects on the day table.

### Named Rules

**The One Shadow Rule.** Objects on the desk share the sheet shadow. A second, harder shadow is not part of the system.

## Shapes

Corners are 2px. Edges are 1px. The signature geometry is the mint arc between pins and the four corner registration marks. The monogram is an A drawn as two strokes with a peach bar, not a letter in a circle.

## Components

### Buttons

- **Shape:** 2px radius.
- **Primary:** Peach fill, warm ink, 48px tall, horizontal padding 18px, weight 500, 1px darker edge. Hover lifts 2px when motion is allowed.
- **Instruments:** Night fill #1A2430, 44px tall, used for the lamp, theme, and language. The lamp's pressed state is peach.

### Navigation

Text links in the rail, 44px tall. The current section gets a 2px mint underline. Below 720px the links move into a menu under the rail. Focus is a 2px sky outline, offset 3px.

### Cards / Containers

- **Corner Style:** 2px.
- **Background:** Night sheet or day paper. Pins are the exception and stay paper.
- **Shadow Strategy:** The sheet shadow.
- **Border:** 1px, theme border.
- **Internal Padding:** 24px, 36px 32px on the lead project.
- Category and status sit in the note under the summary. Nothing is labeled above the heading.

### Inputs / Fields

The terminal field is borderless on the sheet. Focus is a sky line under the row. The prompt is mint at night and mint ink by day.

### Chips

Terminal commands are 36px, mono, 1px edge, transparent fill. Filters are text with a mint underline when pressed, not pills.

### Pins

Five paper buttons in one row on wide screens. Selecting one writes a single note. Pressed state adds a mint inset edge. Arrow keys move the selection.

## Do's and Don'ts

- Do keep Brazilian Portuguese as the default and English as a full alternate, not a mix in one sentence.
- Do keep the five practices as one drawing: paper pins and mint arcs.
- Do keep JetBrains Mono inside the terminal.
- Don't put a label above a heading.
- Don't turn the stack into a wall of badges.
- Don't use night mint, sky, or peach as text on the day sheet.
- Don't invent project metrics, clients, or a public FixScope release. The organization link is real. A public repository is not.
---
