// --- i18n --------------------------------------------------------------
// EN -> PT-BR dictionary for every UI string built in JS (chart titles,
// field labels, empty states, etc). Static HTML text is translated via
// data-pt attributes instead (see applyStaticTranslations below).
const DICT_PT = {
  "Country": "País",
  "Region": "Região",
  "Producer": "Produtor",
  "Altitude": "Altitude",
  "Varietal": "Variedade",
  "Process": "Processo",
  "Roast": "Torra",
  "Rest": "Descanso",
  "Grinder setting": "Ajuste do moedor",
  "Espresso": "Espresso",
  "Drip": "Coado",
  "Reference": "Referência",
  "Price": "Preço",
  "Purchased at": "Comprado em",
  "Acquired": "Adquirido em",
  "Location": "Localização",
  "Visited": "Visitado em",
  "Rating": "Nota",
  "Books": "Livros",
  "Ratio": "Proporção",
  "Cleanup": "Limpeza",
  "Milk (40ml espresso)": "Leite (40ml de espresso)",
  "Foam": "Espuma",
  "Tips": "Dicas",
  "Troubleshooting": "Resolução de problemas",
  "Pouring": "Despejo",
  "Espresso ratios (dry:wet dose)": "Proporções de espresso (dose seca:úmida)",
  "Style": "Estilo",
  "Example (17g dose in)": "Exemplo (dose de 17g)",
  "Not yet rated": "Ainda não avaliado",
  "Low": "Baixa",
  "Average": "Média",
  "Great": "Ótima",
  "Exceptional": "Excepcional",
  "Beans by Country": "Grãos por país",
  "Beans by Roaster": "Grãos por torrefadora",
  "Beans by Roast": "Grãos por torra",
  "Beans by Type": "Grãos por tipo",
  "beans": "grãos",
  "Regular": "Com cafeína",
  "Decaf": "Descafeinado",
  "Nothing here yet.": "Nada por aqui ainda.",
  "No beans match these filters.": "Nenhum grão corresponde a esses filtros.",
  "No recipes match this selection.": "Nenhuma receita corresponde a essa seleção.",
  "No cafes pinned yet.": "Nenhum café marcado ainda.",
  "Could not load data. If you're viewing this via file://, try running a local server (e.g. <code>python3 -m http.server</code>) instead.":
    "Não foi possível carregar os dados. Se você está vendo isso via file://, tente rodar um servidor local (ex.: <code>python3 -m http.server</code>).",
  "Open in Google Maps": "Abrir no Google Maps",
  "channel": "canal",
  "Link": "Link",
  "Coffee Pantry (a personal project)": "Coffee Pantry (um projeto pessoal)"
};

// English step labels (JSON `label` fields) -> PT-BR, since the label
// text lives in data/recipes.json and isn't worth duplicating per-locale
// there for a handful of two/three-word phrases.
const STEP_LABEL_DICT_PT = {
  "grind size": "moagem",
  "preheat": "pré-aquecer",
  "add coffee": "adicionar café",
  "water temperature": "temperatura da água",
  "pour": "despejar",
  "heat up": "aquecer",
  "weigh coffee": "pesar o café",
  "grind": "moer",
  "puck prep": "preparo do disco",
  "prep the shot": "preparar o shot",
  "start the shot": "iniciar o shot",
  "stop the shot": "parar o shot",
  "pull an espresso": "tirar um espresso",
  "pour milk": "despejar o leite",
  "position the wand": "posicionar o vaporizador",
  "start steaming": "iniciar o vapor",
  "stretch the foam": "esticar a espuma",
  "incorporate the foam": "incorporar a espuma",
  "check temperature": "checar a temperatura",
  "tap and swirl": "bater e girar",
  "base pour": "despejo base",
  "pour the art": "desenhar a arte",
  "finish": "finalizar"
};

function getLang() {
  return localStorage.getItem("lang") === "pt" ? "pt" : "en";
}

// Translates a literal EN string built in JS via DICT_PT. Falls back to
// the original string when there's no PT-BR entry or the site is in EN.
function t(str) {
  if (getLang() !== "pt") return str;
  return DICT_PT[str] || str;
}

// Translates a JSON item's recipe-step `label` field.
function tLabel(label) {
  if (getLang() !== "pt") return label;
  return STEP_LABEL_DICT_PT[label] || label;
}

// Picks between an EN string and its PT-BR counterpart directly (for
// nested/array JSON shapes where the `<field>_pt` sibling convention on
// the item itself doesn't apply, e.g. a parallel translated array).
function tPick(en, pt) {
  return getLang() === "pt" && pt ? pt : en;
}

// Reads a JSON item's field, preferring the `<field>_pt` sibling when the
// site is in PT-BR and that sibling exists (falls back to the EN value
// otherwise — not every field has a translation, e.g. proper nouns).
function tf(item, field) {
  if (getLang() === "pt" && item[field + "_pt"] !== undefined) {
    return item[field + "_pt"];
  }
  return item[field];
}

// Swaps every element carrying a data-pt attribute between its English
// text (cached into data-en on first run) and its PT-BR text.
function applyStaticTranslations() {
  const lang = getLang();
  document.querySelectorAll("[data-pt]").forEach((el) => {
    if (!el.dataset.en) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === "pt" ? el.dataset.pt : el.dataset.en;
  });
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyStaticTranslations();
  document.dispatchEvent(new CustomEvent("langchange"));
}

// Marks the nav link matching the current page as active, wires up the
// mobile hamburger toggle, and wires up the EN / PT-BR language toggle.
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.site-nav a").forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav.site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  applyStaticTranslations();
});

// Fetches a JSON data file and renders each item into a container using templateFn.
// Shows a friendly empty state if there's no data yet, or an error hint if the
// fetch fails (common when opening the site directly via file:// instead of a local server).
function loadAndRender(jsonPath, containerId, templateFn) {
  const container = document.getElementById(containerId);
  const render = () =>
    fetch(jsonPath)
      .then((res) => res.json())
      .then((items) => {
        if (!items.length) {
          container.innerHTML = `<p class="empty-state">${t("Nothing here yet.")}</p>`;
          return;
        }
        container.innerHTML = items.map(templateFn).join("");
      })
      .catch((err) => {
        console.error("Failed to load", jsonPath, err);
        container.innerHTML = `<p class="empty-state">${t("Could not load data. If you're viewing this via file://, try running a local server (e.g. <code>python3 -m http.server</code>) instead.")}</p>`;
      });
  render();
  document.addEventListener("langchange", render);
}
