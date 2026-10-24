declare module "../../../content/terminal.mjs" {
  export function respond(
    raw: string,
    lang: "pt" | "en",
  ): {
    command: string;
    lines: string[];
    effect: "clear" | "coffee" | "magic" | null;
  };
  export function commandList(): string[];
}

declare module "*.mjs" {
  export function respond(
    raw: string,
    lang: "pt" | "en",
  ): {
    command: string;
    lines: string[];
    effect: "clear" | "coffee" | "magic" | null;
  };
  export function commandList(): string[];
}
