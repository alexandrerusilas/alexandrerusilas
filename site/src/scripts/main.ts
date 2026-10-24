import copy from "../../../content/copy.json" with { type: "json" };
import { respond } from "../../../content/terminal.mjs";

const root = document.documentElement;

function currentLang(): "pt" | "en" {
  return root.dataset.lang === "en" ? "en" : "pt";
}

function remember(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage can be blocked. The page still works for this visit. */
  }
}

function applyLang(next: "pt" | "en") {
  root.dataset.lang = next;
  root.lang = next === "en" ? "en" : "pt-BR";
  document.title = copy.meta.title[next];
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", copy.meta.description[next]);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", copy.meta.title[next]);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", copy.meta.description[next]);
  remember("lang", next);
}

function applyTheme(next: "light" | "dark") {
  root.dataset.theme = next;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "light" ? "#F4F1EA" : "#0B1017");
  remember("theme", next);
}

function setCoffee(on: boolean) {
  if (on) root.dataset.coffee = "on";
  else delete root.dataset.coffee;
  document.querySelector("#lamp")?.setAttribute("aria-pressed", String(on));
  remember("coffee", on ? "on" : "off");
}

function initTheme() {
  document.querySelector("#theme")?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "light" ? "dark" : "light");
  });
}

function initLang() {
  applyLang(currentLang());
  document.querySelector("#lang")?.addEventListener("click", () => {
    applyLang(currentLang() === "en" ? "pt" : "en");
  });
}

function initLamp() {
  setCoffee(root.dataset.coffee === "on");
  document.querySelector("#lamp")?.addEventListener("click", () => {
    setCoffee(root.dataset.coffee !== "on");
  });
}

function initMenu() {
  const rail = document.querySelector(".rail");
  const button = document.querySelector<HTMLButtonElement>("#menu-btn");
  const menu = document.querySelector<HTMLElement>("#menu");
  if (!rail || !button || !menu) return;

  const close = () => {
    rail.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const open = rail.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("a")?.focus();
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const wasOpen = rail.classList.contains("is-open");
      close();
      if (wasOpen) button.focus();
    }
  });

  matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) close();
  });
}

function initTabs(list: HTMLElement) {
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  if (!tabs.length) return;

  const select = (index: number) => {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
      if (panel) panel.hidden = !selected;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", (event) => {
      const key = event.key;
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"].includes(key)) return;
      event.preventDefault();
      const last = tabs.length - 1;
      const next =
        key === "Home"
          ? 0
          : key === "End"
            ? last
            : key === "ArrowLeft" || key === "ArrowUp"
              ? (index + last) % tabs.length
              : (index + 1) % tabs.length;
      select(next);
      tabs[next]?.focus();
    });
  });
}

function initPins() {
  const pins = [...document.querySelectorAll<HTMLButtonElement>(".pin")];
  const note = document.querySelector<HTMLElement>(".pin-note");
  if (!pins.length || !note) return;

  const select = (id: string) => {
    pins.forEach((pin) => pin.setAttribute("aria-pressed", String(pin.dataset.pin === id)));
    note.dataset.active = id;
  };

  pins.forEach((pin, index) => {
    pin.addEventListener("click", () => {
      const id = pin.dataset.pin ?? "hint";
      select(pin.getAttribute("aria-pressed") === "true" ? "hint" : id);
    });
    pin.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? (index + 1) % pins.length
          : (index - 1 + pins.length) % pins.length;
      const target = pins[next];
      if (!target) return;
      target.focus();
      select(target.dataset.pin ?? "hint");
    });
  });
}

function initFilters() {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-filter-btn]")];
  const cards = [...document.querySelectorAll<HTMLElement>(".project")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filterBtn ?? "all";
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item.dataset.filterBtn === filter)),
      );
      cards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.filter !== filter;
      });
    });
  });
}

function initThreads() {
  const svg = document.querySelector<SVGSVGElement>(".threads");
  const pins = [...document.querySelectorAll<HTMLElement>(".pin")];
  const host = document.querySelector(".constellation");
  if (!svg || pins.length < 2 || !host) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wide = matchMedia("(min-width: 801px)");
  let pull: { x: number; y: number } | null = null;
  let frame = 0;

  const draw = () => {
    frame = 0;
    if (!wide.matches) {
      svg.replaceChildren();
      return;
    }
    const box = svg.getBoundingClientRect();
    if (box.width < 10) return;
    const points = pins.map((pin) => {
      const rect = pin.getBoundingClientRect();
      return { x: rect.left + rect.width / 2 - box.left, y: box.height - 1 };
    });
    let d = "";
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index];
      const end = points[index + 1];
      if (!start || !end) continue;
      const midX = (start.x + end.x) / 2;
      let controlX = midX;
      let controlY = 16;
      if (pull && !reduce) {
        const distance = Math.hypot(pull.x - midX, pull.y - 16);
        const influence = Math.max(0, 1 - distance / 320);
        controlX = midX + (pull.x - midX) * influence * 0.35;
        controlY = 16 + (pull.y - 16) * influence * 0.5;
      }
      d += `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)} `;
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    svg.replaceChildren(path);
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(draw);
  };

  schedule();
  window.addEventListener("resize", schedule, { passive: true });
  if (!reduce && fine) {
    host.addEventListener("pointermove", (event) => {
      if (!(event instanceof PointerEvent)) return;
      const box = svg.getBoundingClientRect();
      pull = { x: event.clientX - box.left, y: event.clientY - box.top };
      schedule();
    });
    host.addEventListener("pointerleave", () => {
      pull = null;
      schedule();
    });
  }
}

function initNavigation() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>("#menu a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href") ?? ""))
    .filter((section): section is HTMLElement => section instanceof HTMLElement);

  const hero = document.querySelector("#topo");
  if (hero instanceof HTMLElement) sections.unshift(hero);
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const current = link.getAttribute("href") === `#${visible.target.id}`;
        if (current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
  );
  sections.forEach((section) => observer.observe(section));
}

function initTerminal() {
  const form = document.querySelector<HTMLFormElement>("#term-form");
  const input = document.querySelector<HTMLInputElement>("#term-input");
  const log = document.querySelector<HTMLElement>("#term-log");
  if (!form || !input || !log) return;

  const write = (lines: string[]) => {
    for (const line of lines) {
      const paragraph = document.createElement("p");
      paragraph.textContent = line;
      log.append(paragraph);
    }
    log.scrollTop = log.scrollHeight;
  };

  const run = (value: string) => {
    const result = respond(value, currentLang());
    if (!result.command) return;
    if (result.effect === "clear") {
      log.replaceChildren();
      return;
    }
    const echo = document.createElement("p");
    echo.textContent = `> ${value.trim()}`;
    log.append(echo);
    write(result.lines);
    if (result.effect === "coffee") setCoffee(true);
    if (result.effect === "magic") root.dataset.magic = "on";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run(input.value);
    input.value = "";
  });

  document.querySelectorAll<HTMLButtonElement>("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      const command = button.dataset.command ?? "";
      input.value = command;
      run(command);
      input.focus();
    });
  });
}

function initMagic() {
  const brand = document.querySelector("#brand");
  let clicks = 0;
  brand?.addEventListener("click", () => {
    clicks += 1;
    if (clicks >= 5) root.dataset.magic = "on";
  });
}

export function start() {
  initLang();
  initTheme();
  initLamp();
  initMenu();
  document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach(initTabs);
  initPins();
  initFilters();
  initThreads();
  initNavigation();
  initTerminal();
  initMagic();
}
