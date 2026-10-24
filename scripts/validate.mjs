import { loadContent } from "./lib/content.mjs";

const content = loadContent();
console.log(
  `Conteúdo válido: ${content.profile.name}, ${content.projects.length} projetos, fontes de ${content.sources.checkedOn}.`,
);
