import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(name) {
  const path = resolve(root, "content", name);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`Não foi possível ler content/${name}: ${error.message}`);
  }
}

function requireText(value, label, errors) {
  if (!value || typeof value.pt !== "string" || !value.pt.trim() || typeof value.en !== "string" || !value.en.trim()) {
    errors.push(`${label} precisa de texto em pt e en`);
  }
}

export function loadContent() {
  const profile = readJson("profile.json");
  const projects = readJson("projects.json");
  const links = readJson("links.json");
  const copy = readJson("copy.json");
  const sources = readJson("sources.json");
  const errors = [];

  for (const field of ["name", "given", "family", "handle", "github", "location"]) {
    if (!profile[field] || typeof profile[field] !== "string") errors.push(`profile.${field} é obrigatório`);
  }
  requireText(profile.role, "profile.role", errors);
  if (!Number.isInteger(profile.githubSince)) errors.push("profile.githubSince precisa ser um ano");

  const requiredLinks = ["linkedin", "github", "pfl", "pflProduct", "studio", "studioEmail", "fixscope"];
  for (const key of requiredLinks) {
    const value = links[key];
    if (key === "studioEmail") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? "")) errors.push("links.studioEmail inválido");
      continue;
    }
    if (typeof value !== "string" || !value.startsWith("https://")) errors.push(`links.${key} precisa ser https`);
  }

  if (!Array.isArray(projects) || projects.length === 0) errors.push("projects.json precisa ter ao menos um projeto");
  const ids = new Set();
  for (const project of projects) {
    if (!project.id || ids.has(project.id)) errors.push(`projeto sem id único: ${project.name ?? "?"}`);
    ids.add(project.id);
    if (!["products", "open-source", "experiments"].includes(project.filter)) {
      errors.push(`${project.id}: filtro inválido`);
    }
    if (!["live", "building"].includes(project.state)) errors.push(`${project.id}: estado inválido`);
    if (project.verified === false) errors.push(`${project.id}: projeto não verificado não pode ser publicado`);
    if (typeof project.url !== "string" || !project.url.startsWith("https://")) {
      errors.push(`${project.id}: url https obrigatória`);
    }
    requireText(project.summary, `${project.id}.summary`, errors);
    requireText(project.category, `${project.id}.category`, errors);
    requireText(project.status, `${project.id}.status`, errors);
    if (!Array.isArray(project.links) || project.links.length === 0) errors.push(`${project.id}: sem links`);
    for (const link of project.links ?? []) {
      if (typeof link.url !== "string" || !link.url.startsWith("https://")) {
        errors.push(`${project.id}: link sem https`);
      }
    }
  }

  requireText(copy.hero.sentence, "hero.sentence", errors);
  requireText(copy.about.intro, "about.intro", errors);
  if (!Array.isArray(copy.engineering.stack) || copy.engineering.stack.length === 0) {
    errors.push("stack vazia");
  }
  for (const group of copy.engineering.stack ?? []) {
    requireText(group, group.id ?? "stack", errors);
    if (!Array.isArray(group.items) || group.items.length === 0) errors.push(`stack ${group.id} sem itens`);
    for (const item of group.items ?? []) requireText(item, `${group.id} item`, errors);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sources.checkedOn ?? "")) errors.push("sources.checkedOn inválido");

  const joined = JSON.stringify({ profile, projects, links, copy });
  if (/sk-|ghp_|github_pat_|AKIA|BEGIN (RSA |OPENSSH )?PRIVATE KEY/i.test(joined)) {
    errors.push("possível segredo encontrado no conteúdo");
  }

  if (errors.length) {
    throw new Error(`Conteúdo inválido:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }

  return { profile, projects, links, copy, sources, root };
}
