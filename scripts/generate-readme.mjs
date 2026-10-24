import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./lib/content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes("--check");

const font = "ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif";

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function palette(theme) {
  const dark = theme === "dark";
  return {
    bg: dark ? "#0B1017" : "#F4F1EA",
    surface: dark ? "#151D28" : "#FFFCF7",
    fg: dark ? "#F4F1EA" : "#14202B",
    muted: dark ? "#97A6B7" : "#3E4C5C",
    mint: dark ? "#6EF2B0" : "#0C6E4A",
    blue: dark ? "#7AC7FF" : "#0E5F93",
    warm: dark ? "#FFBC8A" : "#9A4E22",
    border: dark ? "#2B3542" : "#D5D0C6",
    ink: dark ? "#0B1017" : "#F4F1EA",
  };
}

function marks(color, x, y, s = 16) {
  return `<path d="M${x} ${y + s} V${y} H${x + s}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
}

function hero({ theme, width, height, mobile }) {
  const c = palette(theme);
  const nameSize = mobile ? 58 : 76;
  const sentenceSize = mobile ? 26 : 24;
  const x = mobile ? 36 : 64;
  const nameY = mobile ? 118 : 176;
  const lineGap = nameSize + 8;
  const handleY = nameY + lineGap + (mobile ? 52 : 48);
  const lines = mobile
    ? ["Engenharia, produto e boas", "ideias em construção."]
    : ["Engenharia, produto e boas ideias em construção."];
  const sentenceY = handleY + (mobile ? 58 : 56);
  const statusY = sentenceY + lines.length * (sentenceSize + 12) + 24;
  const drawing = mobile
    ? constellation(c, 48, statusY + 48, width - 96, height - statusY - 100)
    : constellation(c, 900, 96, 300, 320);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>Alexandre Rusilas — engenharia, produto e boas ideias em construção</title>
  <rect width="${width}" height="${height}" fill="${c.bg}"/>
  <rect x="12" y="12" width="${width - 24}" height="${height - 24}" fill="none" stroke="${c.border}"/>
  ${marks(c.mint, 28, 28)}
  ${marks(c.mint, width - 44, 28)}
  ${marks(c.warm, 28, height - 44)}
  ${marks(c.blue, width - 44, height - 44)}
  <text x="${x}" y="${nameY}" fill="${c.fg}" font-family="${font}" font-size="${nameSize}" font-weight="650">Alexandre</text>
  <text x="${x}" y="${nameY + lineGap}" fill="${c.fg}" font-family="${font}" font-size="${nameSize}" font-weight="650">Rusilas</text>
  <text x="${x}" y="${handleY}" fill="${c.mint}" font-family="${font}" font-size="${mobile ? 22 : 20}">@arusilas · Brasil</text>
  ${lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${sentenceY + index * (sentenceSize + 10)}" fill="${c.muted}" font-family="${font}" font-size="${sentenceSize}">${esc(line)}</text>`,
    )
    .join("\n  ")}
  <text x="${x}" y="${mobile ? statusY : height - 52}" fill="${c.warm}" font-family="${font}" font-size="${mobile ? 20 : 18}">Construindo coisas interessantes.</text>
  ${drawing}
</svg>
`;
}

function constellation(c, x, y, w, h) {
  const pins = [
    [0.08, 0.62],
    [0.3, 0.28],
    [0.5, 0.7],
    [0.72, 0.34],
    [0.9, 0.66],
  ].map(([px, py]) => [x + px * w, y + py * h]);
  const line = pins.map((point, index) => `${index === 0 ? "M" : "L"}${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(" ");
  const dots = pins
    .map(
      ([px, py], index) =>
        `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${index === 2 ? 9 : 7}" fill="${c.bg}" stroke="${index === 4 ? c.warm : index === 3 ? c.blue : c.mint}" stroke-width="2"/>`,
    )
    .join("");
  return `<path d="${line}" fill="none" stroke="${c.mint}" stroke-width="1.5"/>${dots}`;
}

function chip(label) {
  const width = Math.max(132, 28 + label.length * 11);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="48" viewBox="0 0 ${width} 48" role="img">
  <title>${esc(label)}</title>
  <rect x="1" y="1" width="${width - 2}" height="46" rx="2" fill="#151D28" stroke="#2B3542"/>
  <text x="${width / 2}" y="30" text-anchor="middle" fill="#F4F1EA" font-family="${font}" font-size="16">${esc(label)}</text>
</svg>
`;
}

function projectCard(project, theme) {
  const c = palette(theme);
  const accent = project.id === "pfl-bio" ? c.blue : project.id === "fixscope" ? c.mint : c.warm;
  const width = 960;
  const height = 220;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${esc(project.name)}</title>
  <rect width="${width}" height="${height}" fill="${c.bg}"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="${c.surface}" stroke="${c.border}"/>
  ${marks(accent, 28, 28, 14)}
  <text x="56" y="78" fill="${accent}" font-family="${font}" font-size="18">${esc(project.category.pt)} · ${esc(project.status.pt)}</text>
  <text x="56" y="132" fill="${c.fg}" font-family="${font}" font-size="48" font-weight="650">${esc(project.name)}</text>
  <text x="56" y="176" fill="${c.muted}" font-family="${font}" font-size="20">${esc(project.host)}</text>
</svg>
`;
}

function picture(dark, light, alt, width, height) {
  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${dark}">
  <img src="${light}" alt="${esc(alt)}" width="${width}" height="${height}">
</picture>`;
}

function buildReadme(content) {
  const { profile, projects, links, copy, root } = content;
  const assetDir = resolve(root, "assets/readme");
  mkdirSync(resolve(assetDir, "nav"), { recursive: true });
  mkdirSync(resolve(assetDir, "projects"), { recursive: true });

  const files = new Map();
  const put = (path, body) => files.set(path, body.endsWith("\n") ? body : `${body}\n`);

  put(resolve(assetDir, "hero-dark.svg"), hero({ theme: "dark", width: 1280, height: 520, mobile: false }));
  put(resolve(assetDir, "hero-light.svg"), hero({ theme: "light", width: 1280, height: 520, mobile: false }));
  put(resolve(assetDir, "hero-mobile-dark.svg"), hero({ theme: "dark", width: 640, height: 820, mobile: true }));
  put(resolve(assetDir, "hero-mobile-light.svg"), hero({ theme: "light", width: 640, height: 820, mobile: true }));

  const nav = [
    ["sobre", "Sobre"],
    ["construindo", "Construindo"],
    ["trabalho", "Trabalho"],
    ["tecnologias", "Tecnologias"],
    ["github", "GitHub"],
    ["contato", "Contato"],
  ];
  for (const [id, label] of nav) put(resolve(assetDir, "nav", `${id}.svg`), chip(label));

  for (const project of projects) {
    put(resolve(assetDir, "projects", `${project.id}-dark.svg`), projectCard(project, "dark"));
    put(resolve(assetDir, "projects", `${project.id}-light.svg`), projectCard(project, "light"));
  }

  const heroHtml = `<picture>
  <source media="(max-width: 640px) and (prefers-color-scheme: dark)" srcset="./assets/readme/hero-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="./assets/readme/hero-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="./assets/readme/hero-dark.svg">
  <img src="./assets/readme/hero-light.svg" alt="Banner de Alexandre Rusilas: engenharia, produto e boas ideias em construção. Cinco pontos ligados representam engenharia, arquitetura, liderança, produto e criação." width="1280" height="520">
</picture>`;

  const navHtml = nav
    .map(([id, label]) => `<a href="#${id}"><img src="./assets/readme/nav/${id}.svg" alt="${esc(label)}" width="${Math.max(132, 28 + label.length * 11)}" height="48"></a>`)
    .join("\n");

  const projectsHtml = projects
    .map((project) => {
      const linksHtml = project.links
        .map((link) => `<a href="${link.url}">${esc(link.label.pt)}</a>`)
        .join(" · ");
      const note = project.note ? `<br>${esc(project.note.pt)}` : "";
      return `${picture(
        `./assets/readme/projects/${project.id}-dark.svg`,
        `./assets/readme/projects/${project.id}-light.svg`,
        `${project.name}. ${project.category.pt}. ${project.status.pt}. ${project.host}`,
        960,
        220,
      )}

**${esc(project.name)}** — ${esc(project.summary.pt)}${note}

${linksHtml}`;
    })
    .join("\n\n");

  const dnaHtml = copy.readme.dna
    .map((item) => `- **${esc(item.pt)}** — ${esc(item.body)}`)
    .join("\n");

  const stackHtml = copy.engineering.stack
    .map((group) => `**${esc(group.pt)}**\n${group.items.map((item) => esc(item.pt)).join(" · ")}`)
    .join("\n\n");

  const beyondHtml = copy.beyond.items.map((item) => `- ${esc(item.pt)}`).join("\n");

  const connectHtml = `${esc(copy.connect.cta.pt)}

- [LinkedIn](${links.linkedin})
- [PFL.bio](${links.pfl})
- [GitHub](${links.github})
- [contato@painelmagico.com](mailto:${links.studioEmail})`;

  const footerHtml = `<p>${esc(copy.footer.line.pt)}</p>

<sub>@${esc(profile.handle)} · ${esc(profile.location)} · ${esc(profile.studio)}</sub>`;

  const introHtml = `${esc(copy.about.intro.pt)}

${esc(copy.about.summary.pt)}

<details>
<summary>In English</summary>

${esc(copy.about.intro.en)}

${esc(copy.hero.sentence.en)}

</details>`;

  const template = readFileSync(resolve(root, "templates/README.template.md"), "utf8");
  const readme = template
    .replaceAll("{{HERO}}", heroHtml)
    .replaceAll("{{NAME}}", profile.name)
    .replaceAll("{{INTRO}}", introHtml)
    .replaceAll("{{NAV}}", navHtml)
    .replaceAll("{{PROJECTS}}", projectsHtml)
    .replaceAll("{{DNA}}", dnaHtml)
    .replaceAll("{{STACK}}", `${esc(copy.engineering.stackLede.pt)}\n\n${stackHtml}`)
    .replaceAll("{{GITHUB}}", esc(copy.github.body.pt))
    .replaceAll("{{BEYOND}}", `${esc(copy.beyond.lede.pt)}\n\n${beyondHtml}`)
    .replaceAll("{{CONNECT}}", connectHtml)
    .replaceAll("{{FOOTER}}", footerHtml)
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()
    .concat("\n");

  return { readme, files, root };
}

const content = loadContent();
const { readme, files, root } = buildReadme(content);
const readmePath = resolve(root, "README.md");

if (check) {
  const mismatches = [];
  const current = readFileSync(readmePath, "utf8");
  if (current !== readme) mismatches.push("README.md");
  for (const [path, body] of files) {
    let existing = "";
    try {
      existing = readFileSync(path, "utf8");
    } catch {
      existing = "";
    }
    if (existing !== body) mismatches.push(path.replace(`${root}/`, ""));
  }
  if (mismatches.length) {
    console.error(`README fora de sincronia:\n${mismatches.map((item) => `- ${item}`).join("\n")}`);
    process.exit(1);
  }
  console.log("README e assets conferem com o conteúdo.");
} else {
  writeFileSync(readmePath, readme);
  for (const [path, body] of files) writeFileSync(path, body);
  console.log(`README gerado com ${files.size} assets.`);
}
