import copy from "./copy.json" with { type: "json" };

const COMMANDS = ["help", "about", "projects", "stack", "coffee", "contact", "clear", "magic"];

export function respond(raw, lang) {
  const command = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (!command) {
    return { command: "", lines: [], effect: null };
  }

  if (command === "clear") {
    return { command, lines: [], effect: "clear" };
  }

  if (!Object.hasOwn(copy.terminal.commands, command) || !COMMANDS.includes(command)) {
    return {
      command,
      lines: [copy.terminal.unknown[lang] ?? copy.terminal.unknown.pt],
      effect: null,
    };
  }

  const text = copy.terminal.commands[command][lang] ?? copy.terminal.commands[command].pt;
  return {
    command,
    lines: text.split("\n"),
    effect: command === "coffee" || command === "magic" ? command : null,
  };
}

export function commandList() {
  return COMMANDS.filter((command) => command !== "magic" && command !== "clear");
}
