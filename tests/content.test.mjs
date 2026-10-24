import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { loadContent } from "../scripts/lib/content.mjs";
import { respond } from "../content/terminal.mjs";

test("conteúdo público obrigatório carrega", () => {
  const { profile, projects, links } = loadContent();
  assert.equal(profile.name, "Alexandre Rusilas");
  assert.equal(profile.company, "AppTicket");
  assert.equal(projects.map((project) => project.id).join(","), "painel-magico,pfl-bio,fixscope");
  assert.equal(projects.find((project) => project.id === "fixscope")?.state, "building");
  assert.ok(links.studio.startsWith("https://painelmagico.com"));
  assert.equal(links.portfolio, undefined);
});

test("o terminal não executa entrada como código", () => {
  for (const lang of ["pt", "en"]) {
    const hostile = respond("$(rm -rf /)", lang);
    assert.equal(hostile.effect, null);
    assert.equal(hostile.lines.length, 1);
    assert.doesNotMatch(hostile.lines[0], /rm -rf/);

    const injected = respond('"; console.log(1);', lang);
    assert.equal(injected.effect, null);

    const coffee = respond("coffee", lang);
    assert.equal(coffee.effect, "coffee");
    assert.match(coffee.lines.join(" "), /caf[eé]|coffee|lamp|luminária/i);

    const magic = respond("magic", lang);
    assert.equal(magic.effect, "magic");

    assert.equal(respond("clear", lang).effect, "clear");
    assert.deepEqual(respond("   ", lang).lines, []);
  }
});

test("help não revela o easter egg como comando comum", () => {
  const help = respond("help", "pt").lines.join(" ");
  assert.match(help, /help, about, projects/);
  assert.doesNotMatch(help, /\bmagic\b/);
});

test("readme gerado não inventa métricas", () => {
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /Alexandre Rusilas/);
  assert.match(readme, /FixScope/);
  assert.match(readme, /Painel Mágico/);
  assert.match(readme, /PFL\.bio/);
  assert.doesNotMatch(readme, /\d+\s+(followers|stars|commits)/i);
  assert.doesNotMatch(readme, /github-readme-stats|streak-stats/i);
  assert.doesNotMatch(readme, /CTO/);
  assert.doesNotMatch(readme, /sk-|ghp_|AKIA/);
});
