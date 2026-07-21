import type { Photo } from "./types";
import { photoSvg } from "./photoart";
import { mulberry32, seedFrom } from "./lib/rng";

/**
 * A library of ordinary everyday photos — coffee, pets, sunsets, meals,
 * friends — rendered photographically (rich gradients, bokeh, depth of
 * field, warm auto-white-balance grade) so a case's camera roll reads like
 * a real person's life, with the unsettling evidence shots standing out
 * among the mundane ones.
 *
 * These carry no evidenceLabel: they are texture, not clues.
 */

let gid = 0;
function uid(): string {
  return `lp${gid++}`;
}

/** Soft out-of-focus highlight — the building block of believable bokeh. */
function bokeh(cx: number, cy: number, r: number, color: string, op: number): string {
  const id = uid();
  return (
    `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0%" stop-color="${color}" stop-opacity="${op}"/>` +
    `<stop offset="70%" stop-color="${color}" stop-opacity="${op * 0.7}"/>` +
    `<stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`
  );
}

function vgrad(id: string, stops: Array<[number, string]>, x2 = 0, y2 = 1): string {
  return (
    `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">` +
    stops.map(([o, c]) => `<stop offset="${o}%" stop-color="${c}"/>`).join("") +
    `</linearGradient>`
  );
}

type Gen = (rand: () => number) => { inner: string; base: string };

const GENERATORS: Record<string, Gen> = {
  latte: (_rand) => {
    const g = uid();
    return {
      base: "#3b2a1e",
      inner:
        `<defs>${vgrad(g, [[0, "#5a4230"], [100, "#2e2015"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        // wood grain streaks
        Array.from({ length: 6 }, (_, i) => `<rect x="0" y="${40 + i * 60}" width="300" height="3" fill="#22160d" opacity="0.4"/>`).join("") +
        // saucer + cup, overhead
        `<circle cx="150" cy="215" r="98" fill="#efe9df"/>` +
        `<circle cx="150" cy="215" r="72" fill="#f6f2ea"/>` +
        `<circle cx="150" cy="215" r="66" fill="#c9a06a"/>` +
        // latte foam swirl
        `<circle cx="150" cy="215" r="52" fill="#e8d8bf"/>` +
        `<path d="M150 175 q28 40 0 80 q-28 -40 0 -80z" fill="#c99a63" opacity="0.85"/>` +
        `<path d="M150 190 q14 25 0 50 q-14 -25 0 -50z" fill="#e8d8bf"/>` +
        // spoon
        `<rect x="238" y="150" width="9" height="120" rx="4" fill="#cfd2d6" transform="rotate(18 242 210)"/>` +
        `<ellipse cx="250" cy="150" rx="12" ry="17" fill="#dfe2e6" transform="rotate(18 250 150)"/>`,
    };
  },
  brunch: (rand) => {
    const g = uid();
    return {
      base: "#d8d2c8",
      inner:
        `<defs>${vgrad(g, [[0, "#e7e2d8"], [100, "#c7c0b4"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        `<ellipse cx="200" cy="150" rx="120" ry="112" fill="#fbfaf7"/>` +
        `<ellipse cx="200" cy="150" rx="92" ry="86" fill="#f3efe8"/>` +
        // toast
        `<rect x="120" y="95" width="70" height="52" rx="8" fill="#c98f4a"/>` +
        `<rect x="128" y="103" width="54" height="36" rx="4" fill="#e0b878"/>` +
        // eggs
        `<ellipse cx="245" cy="120" rx="34" ry="26" fill="#fdfbf4"/><circle cx="245" cy="120" r="13" fill="#f5b431"/>` +
        `<ellipse cx="255" cy="170" rx="32" ry="24" fill="#fdfbf4"/><circle cx="255" cy="170" r="12" fill="#f5b431"/>` +
        // greens
        Array.from({ length: 7 }, () => `<ellipse cx="${150 + rand() * 60}" cy="${185 + rand() * 30}" rx="${6 + rand() * 5}" ry="4" fill="#5c7a3a" transform="rotate(${rand() * 180} 170 195)"/>`).join("") +
        // coffee cup corner
        `<circle cx="352" cy="70" r="42" fill="#efe9df"/><circle cx="352" cy="70" r="30" fill="#5a3f28"/>`,
    };
  },
  dog: (rand) => {
    const g = uid();
    const coat = ["#c8974e", "#8a5a2e", "#e0c088", "#4a3a2c"][Math.floor(rand() * 4)];
    return {
      base: "#2a2620",
      inner:
        `<defs>${vgrad(g, [[0, "#544738"], [100, "#241d15"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        bokeh(60, 70, 40, "#e8d8a0", 0.25) +
        bokeh(250, 110, 55, "#c8b070", 0.2) +
        // head
        `<ellipse cx="150" cy="235" rx="95" ry="105" fill="${coat}"/>` +
        // muzzle
        `<ellipse cx="150" cy="290" rx="52" ry="60" fill="${coat}" opacity="0.9"/>` +
        `<ellipse cx="150" cy="300" rx="40" ry="42" fill="#e8d8b8" opacity="0.5"/>` +
        // ears
        `<ellipse cx="72" cy="180" rx="30" ry="62" fill="#6e4a26" transform="rotate(-18 72 180)"/>` +
        `<ellipse cx="228" cy="180" rx="30" ry="62" fill="#6e4a26" transform="rotate(18 228 180)"/>` +
        // eyes
        `<ellipse cx="112" cy="215" rx="15" ry="16" fill="#1a120a"/><circle cx="117" cy="210" r="4" fill="#fff" opacity="0.8"/>` +
        `<ellipse cx="188" cy="215" rx="15" ry="16" fill="#1a120a"/><circle cx="193" cy="210" r="4" fill="#fff" opacity="0.8"/>` +
        // nose + tongue
        `<ellipse cx="150" cy="288" rx="20" ry="15" fill="#20140c"/>` +
        `<path d="M138 305 q12 34 24 0z" fill="#c85a5a"/>`,
    };
  },
  cat: (_rand) => {
    const g = uid();
    return {
      base: "#20242c",
      inner:
        `<defs>${vgrad(g, [[0, "#3a4652"], [55, "#2a323c"], [100, "#161b22"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // window frame + soft daylight
        `<rect x="30" y="20" width="200" height="200" rx="4" fill="#aebfce" opacity="0.55"/>` +
        `<rect x="30" y="20" width="200" height="200" fill="none" stroke="#12161c" stroke-width="9"/>` +
        `<path d="M130 20v200M30 120h200" stroke="#12161c" stroke-width="6"/>` +
        bokeh(120, 90, 60, "#dfeaf3", 0.3) +
        // sill
        `<rect x="0" y="210" width="400" height="90" fill="#2b2119"/>` +
        // cat loaf
        `<ellipse cx="300" cy="235" rx="86" ry="58" fill="#3a3630"/>` +
        `<ellipse cx="300" cy="180" rx="46" ry="42" fill="#403b34"/>` +
        `<path d="M262 150 l10 -26 14 20z" fill="#403b34"/><path d="M338 150 l-10 -26 -14 20z" fill="#403b34"/>` +
        `<ellipse cx="284" cy="178" rx="7" ry="10" fill="#b9d84a"/><ellipse cx="316" cy="178" rx="7" ry="10" fill="#b9d84a"/>` +
        `<path d="M295 190 l5 5 5 -5" stroke="#1a1712" stroke-width="2" fill="none"/>`,
    };
  },
  sunset: (rand) => {
    const g = uid();
    return {
      base: "#3a2a3a",
      inner:
        `<defs>${vgrad(g, [[0, "#f4a34a"], [30, "#e8724a"], [60, "#a04a6a"], [100, "#3a2e4e"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // sun glow
        bokeh(280, 150, 90, "#ffdca0", 0.6) +
        `<circle cx="280" cy="155" r="34" fill="#ffe6b0" opacity="0.9"/>` +
        // cloud bands
        Array.from({ length: 4 }, (_, i) => `<ellipse cx="${120 + i * 60}" cy="${80 + i * 22}" rx="${90 - i * 8}" ry="7" fill="#5a3a52" opacity="${0.3 + i * 0.08}"/>`).join("") +
        // rooftop silhouette
        `<path d="M0 300 V235 h40 v-20 h30 v20 h50 v-34 h40 v34 h60 v-14 h40 v14 h90 V300z" fill="#1c1522"/>` +
        Array.from({ length: 8 }, () => `<rect x="${20 + rand() * 360}" y="${240 + rand() * 40}" width="6" height="8" fill="#f4c060" opacity="0.7"/>`).join(""),
    };
  },
  beach: (rand) => {
    const g = uid();
    const s = uid();
    return {
      base: "#8fbfd8",
      inner:
        `<defs>${vgrad(g, [[0, "#9fd0e6"], [50, "#bfe2ee"], [100, "#dff0f4"]])}${vgrad(s, [[0, "#2e86a8"], [100, "#7fc0d4"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        `<rect y="150" width="400" height="70" fill="url(#${s})"/>` +
        // foam line
        `<path d="M0 220 q100 -14 200 2 t200 -2 V240 H0z" fill="#eef7f8"/>` +
        // wet + dry sand
        `<rect y="235" width="400" height="65" fill="#d8c49a"/>` +
        `<rect y="235" width="400" height="14" fill="#c2a878" opacity="0.6"/>` +
        // sun sparkle on water
        Array.from({ length: 16 }, () => `<rect x="${140 + rand() * 180}" y="${158 + rand() * 50}" width="${3 + rand() * 5}" height="2" fill="#fff" opacity="${0.4 + rand() * 0.5}"/>`).join("") +
        // towel corner
        `<rect x="-10" y="250" width="120" height="60" fill="#e0554a" transform="rotate(-6 40 280)"/>`,
    };
  },
  selfie: (rand) => {
    const g = uid();
    const skin = ["#e6b98f", "#c89468", "#8a5e3c", "#f0c9a4"][Math.floor(rand() * 4)];
    const hair = ["#2a1c12", "#5a3a1e", "#141414", "#3a2a1a"][Math.floor(rand() * 4)];
    return {
      base: "#2a2e36",
      inner:
        `<defs>${vgrad(g, [[0, "#5a6472"], [100, "#2e343e"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        bokeh(60, 80, 50, "#c0d0e0", 0.25) +
        bokeh(240, 120, 60, "#a0b0c8", 0.2) +
        // shoulders
        `<path d="M40 400 q110 -120 220 0z" fill="#3a3f4a"/>` +
        // neck + head
        `<rect x="128" y="230" width="44" height="60" fill="${skin}"/>` +
        `<ellipse cx="150" cy="200" rx="72" ry="84" fill="${skin}"/>` +
        // hair
        `<path d="M78 190 q0 -95 72 -95 t72 95 q-6 -50 -72 -54 t-72 54z" fill="${hair}"/>` +
        `<path d="M78 190 q-6 40 4 70 q-24 -46 -14 -92z" fill="${hair}"/>` +
        `<path d="M222 190 q6 40 -4 70 q24 -46 14 -92z" fill="${hair}"/>` +
        // features
        `<ellipse cx="122" cy="196" rx="9" ry="7" fill="#2a2018"/><ellipse cx="178" cy="196" rx="9" ry="7" fill="#2a2018"/>` +
        `<path d="M112 176 q10 -6 20 0M168 176 q10 -6 20 0" stroke="${hair}" stroke-width="3" fill="none"/>` +
        `<path d="M138 244 q12 10 24 0" stroke="#a85a52" stroke-width="4" fill="none" stroke-linecap="round"/>` +
        `<ellipse cx="150" cy="222" rx="7" ry="10" fill="${skin}" opacity="0.6"/>`,
    };
  },
  friends: (_rand) => {
    const g = uid();
    return {
      base: "#241a1e",
      inner:
        `<defs>${vgrad(g, [[0, "#3e2a30"], [100, "#1a1216"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // warm bar bokeh
        bokeh(50, 60, 32, "#f0a850", 0.5) + bokeh(120, 40, 24, "#e08040", 0.4) +
        bokeh(300, 50, 40, "#f0b860", 0.45) + bokeh(360, 90, 26, "#c86840", 0.4) +
        // table
        `<rect y="250" width="400" height="50" fill="#3a2820"/>` +
        // three soft figures raising glasses
        [90, 200, 310].map((x, i) => {
          const skin = ["#d8a878", "#8a5e3c", "#e6c09a"][i];
          const shirt = ["#4a5a6a", "#6a4a5a", "#5a5a3a"][i];
          return (
            `<path d="M${x - 44} 300 q44 -80 88 0z" fill="${shirt}"/>` +
            `<ellipse cx="${x}" cy="150" rx="30" ry="34" fill="${skin}"/>` +
            `<path d="M${x - 30} 150 q0 -40 30 -40 t30 40z" fill="#2a1e16"/>` +
            `<rect x="${x + 30}" y="175" width="14" height="34" rx="3" fill="#e8f0f4" opacity="0.6"/>`
          );
        }).join(""),
    };
  },
  plant: (rand) => {
    const g = uid();
    return {
      base: "#c8ccc4",
      inner:
        `<defs>${vgrad(g, [[0, "#e2e6de"], [100, "#b8bcb2"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        // window light
        `<rect x="30" y="0" width="240" height="230" fill="#f0f3ec" opacity="0.5"/>` +
        `<path d="M150 0v230M30 150h240" stroke="#c0c4bc" stroke-width="8" opacity="0.6"/>` +
        // sill
        `<rect x="0" y="300" width="300" height="100" fill="#d8cec0"/>` +
        // terracotta pot
        `<path d="M100 300 l14 -70 h72 l14 70z" fill="#c07a4e"/>` +
        `<rect x="112" y="222" width="76" height="14" rx="3" fill="#a8663e"/>` +
        // monstera-ish leaves
        Array.from({ length: 6 }, (_, i) => {
          const a = -60 + i * 24;
          const len = 70 + rand() * 40;
          return `<path d="M150 226 q${Math.cos((a * Math.PI) / 180) * 40} -${len} ${Math.cos((a * Math.PI) / 180) * 70} -${len * 1.2}" stroke="#3a6a34" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.92"/>`;
        }).join("") +
        Array.from({ length: 5 }, (_, i) => `<ellipse cx="${110 + i * 20}" cy="${150 - (i % 2) * 30}" rx="20" ry="30" fill="#4a7a3e" transform="rotate(${-40 + i * 20} ${110 + i * 20} 150)"/>`).join(""),
    };
  },
  citynight: (rand) => {
    const g = uid();
    return {
      base: "#0e1220",
      inner:
        `<defs>${vgrad(g, [[0, "#1a2238"], [100, "#080a12"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // building masses
        Array.from({ length: 7 }, (_, i) => `<rect x="${i * 58}" y="${90 + (i % 3) * 40}" width="52" height="210" fill="#0c101c"/>`).join("") +
        // lit windows
        Array.from({ length: 60 }, () => `<rect x="${rand() * 400}" y="${100 + rand() * 180}" width="4" height="5" fill="${rand() > 0.5 ? "#f4d47a" : "#cfe0f0"}" opacity="${0.4 + rand() * 0.5}"/>`).join("") +
        // foreground bokeh (traffic / signs)
        bokeh(80, 250, 34, "#ff5a4a", 0.5) + bokeh(180, 270, 26, "#f0b040", 0.45) +
        bokeh(300, 255, 30, "#40a0f0", 0.4) + bokeh(360, 275, 22, "#f04070", 0.4),
    };
  },
  mountains: (_rand) => {
    const g = uid();
    return {
      base: "#b8c8d0",
      inner:
        `<defs>${vgrad(g, [[0, "#cfe0e8"], [60, "#e8eef0"], [100, "#f4f2ec"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // layered ridges, hazy to sharp
        `<path d="M0 160 L120 90 L240 150 L360 80 L400 130 V300 H0z" fill="#7a90a0" opacity="0.5"/>` +
        `<path d="M0 200 L100 130 L200 195 L320 120 L400 175 V300 H0z" fill="#4a6472" opacity="0.7"/>` +
        `<path d="M0 250 L90 175 L180 245 L300 165 L400 230 V300 H0z" fill="#2e4450"/>` +
        // snow caps
        `<path d="M90 175 l18 22 -36 0z" fill="#eef4f6"/><path d="M300 165 l20 24 -40 0z" fill="#eef4f6"/>` +
        // pine foreground
        Array.from({ length: 5 }, (_, i) => `<path d="M${30 + i * 90} 300 l14 -46 14 46z" fill="#16241e"/>`).join(""),
    };
  },
  concert: (rand) => {
    const g = uid();
    return {
      base: "#120a1e",
      inner:
        `<defs>${vgrad(g, [[0, "#3a1a5a"], [100, "#0a0616"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // stage light beams
        Array.from({ length: 4 }, (_, i) => {
          const c = ["#f04070", "#40b0f0", "#f0c040", "#a040f0"][i];
          const x = 60 + i * 96;
          return `<path d="M${x} 0 L${x - 40} 200 L${x + 40} 200z" fill="${c}" opacity="0.28"/>`;
        }).join("") +
        bokeh(200, 60, 70, "#ffffff", 0.35) +
        // crowd silhouette + phone lights
        `<path d="M0 300 V220 q200 -40 400 0 V300z" fill="#060410"/>` +
        Array.from({ length: 40 }, () => `<circle cx="${rand() * 400}" cy="${210 + rand() * 60}" r="${rand() > 0.7 ? 1.5 : 1}" fill="#0a0a16"/>`).join("") +
        Array.from({ length: 14 }, () => `<rect x="${rand() * 400}" y="${200 + rand() * 30}" width="3" height="5" fill="#e8e8ff" opacity="0.8"/>`).join(""),
    };
  },
  desk: (_rand) => {
    const g = uid();
    return {
      base: "#cabfae",
      inner:
        `<defs>${vgrad(g, [[0, "#d8cdbc"], [100, "#b4a893"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        Array.from({ length: 5 }, (_, i) => `<rect y="${30 + i * 60}" width="400" height="3" fill="#a08a68" opacity="0.35"/>`).join("") +
        // laptop
        `<rect x="120" y="80" width="200" height="130" rx="6" fill="#2a2e34"/>` +
        `<rect x="130" y="88" width="180" height="106" rx="3" fill="#4a6a8a"/>` +
        `<rect x="130" y="88" width="180" height="106" rx="3" fill="url(#${g})" opacity="0.2"/>` +
        // coffee
        `<circle cx="70" cy="120" r="34" fill="#efe9df"/><circle cx="70" cy="120" r="24" fill="#5a3f28"/>` +
        // notebook + pen
        `<rect x="80" y="210" width="120" height="80" rx="4" fill="#f0ece2" transform="rotate(-6 140 250)"/>` +
        `<rect x="220" y="230" width="90" height="7" rx="3" fill="#d08a3a" transform="rotate(20 265 233)"/>`,
    };
  },
  flowers: (rand) => {
    const g = uid();
    const cols = ["#e85a7a", "#f0a040", "#d86ab0", "#f0d050", "#e04a4a", "#c060d0"];
    return {
      base: "#2a2622",
      inner:
        `<defs>${vgrad(g, [[0, "#4a4038"], [100, "#201c18"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        bokeh(60, 70, 44, "#c8b090", 0.22) +
        // vase
        `<path d="M110 400 q-16 -110 40 -150 q56 40 40 150z" fill="#c8d2d8" opacity="0.9"/>` +
        `<path d="M110 400 q-16 -110 40 -150 q56 40 40 150z" fill="#aebac2" opacity="0.4"/>` +
        // stems
        Array.from({ length: 7 }, (_, i) => `<path d="M150 250 q${-40 + i * 14} -50 ${-50 + i * 18} -100" stroke="#3a6a34" stroke-width="4" fill="none"/>`).join("") +
        // blooms
        Array.from({ length: 9 }, (_, i) => {
          const x = 90 + rand() * 120;
          const y = 90 + rand() * 80;
          const c = cols[i % cols.length];
          return Array.from({ length: 6 }, (_, k) => {
            const a = (k / 6) * Math.PI * 2;
            return `<ellipse cx="${x + Math.cos(a) * 12}" cy="${y + Math.sin(a) * 12}" rx="9" ry="13" fill="${c}" transform="rotate(${(a * 180) / Math.PI} ${x + Math.cos(a) * 12} ${y + Math.sin(a) * 12})"/>`;
          }).join("") + `<circle cx="${x}" cy="${y}" r="7" fill="#f0d060"/>`;
        }).join(""),
    };
  },
  car: (_rand) => {
    const g = uid();
    return {
      base: "#5a4a3e",
      inner:
        `<defs>${vgrad(g, [[0, "#f0b060"], [40, "#e08a5a"], [100, "#6a4a5a"]])}</defs>` +
        // windshield sky
        `<rect width="400" height="300" fill="#1a1a1e"/>` +
        `<path d="M40 20 h320 q30 0 30 30 v120 H10 V50 q0 -30 30 -30z" fill="url(#${g})"/>` +
        bokeh(300, 70, 60, "#ffe0a0", 0.6) +
        // road
        `<path d="M10 170 h380 v20 H10z" fill="#2a2a2e"/>` +
        `<path d="M180 175 h40 v10 h-40z" fill="#e8e0c0" opacity="0.8"/>` +
        // dashboard
        `<path d="M0 300 V200 q200 -30 400 0 V300z" fill="#16161a"/>` +
        `<circle cx="120" cy="240" r="24" fill="#0a0a0e"/><circle cx="120" cy="240" r="20" fill="#1a1a20"/>` +
        `<circle cx="280" cy="240" r="24" fill="#0a0a0e"/><circle cx="280" cy="240" r="20" fill="#1a1a20"/>` +
        `<path d="M120 240 l10 -14M280 240 l-8 -14" stroke="#f0a040" stroke-width="2"/>`,
    };
  },
  snow: (rand) => {
    const g = uid();
    return {
      base: "#c4ccd4",
      inner:
        `<defs>${vgrad(g, [[0, "#b8c4d0"], [60, "#d8e0e6"], [100, "#eef2f4"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // bare trees
        Array.from({ length: 4 }, (_, i) => {
          const x = 50 + i * 100;
          return `<path d="M${x} 260 V120" stroke="#2a2620" stroke-width="6"/>` + Array.from({ length: 5 }, (_, k) => `<path d="M${x} ${140 + k * 20} l${(k % 2 ? 1 : -1) * (24 - k * 3)} -14" stroke="#2a2620" stroke-width="3"/>`).join("");
        }).join("") +
        // snowy ground + path
        `<rect y="255" width="400" height="45" fill="#eef2f4"/>` +
        `<path d="M150 300 L190 255 h30 L260 300z" fill="#d0d8de"/>` +
        // falling snow
        Array.from({ length: 40 }, () => `<circle cx="${rand() * 400}" cy="${rand() * 300}" r="${1 + rand() * 2}" fill="#fff" opacity="${0.5 + rand() * 0.4}"/>`).join(""),
    };
  },
  birthday: (_rand) => {
    const g = uid();
    return {
      base: "#1e1620",
      inner:
        `<defs>${vgrad(g, [[0, "#3a2a3e"], [100, "#140e18"]])}</defs>` +
        `<rect width="400" height="300" fill="url(#${g})"/>` +
        // candle glow
        bokeh(200, 130, 120, "#ffcf70", 0.35) +
        // cake
        `<rect x="120" y="180" width="160" height="70" rx="8" fill="#e8c8a0"/>` +
        `<rect x="120" y="180" width="160" height="18" fill="#f4e0c4"/>` +
        `<path d="M120 190 q20 14 40 0 t40 0 t40 0 t40 0" stroke="#d89060" stroke-width="4" fill="none"/>` +
        // candles + flames
        Array.from({ length: 5 }, (_, i) => {
          const x = 145 + i * 28;
          return `<rect x="${x}" y="150" width="6" height="32" fill="#e86a8a"/>` + `<ellipse cx="${x + 3}" cy="144" rx="5" ry="10" fill="#ffd870"/><ellipse cx="${x + 3}" cy="146" rx="2.5" ry="6" fill="#ff9040"/>`;
        }).join("") +
        // soft faces behind
        bokeh(70, 90, 40, "#e0b890", 0.2) + bokeh(330, 100, 44, "#c89870", 0.2),
    };
  },
  workout: (_rand) => {
    const g = uid();
    return {
      base: "#1a1c22",
      inner:
        `<defs>${vgrad(g, [[0, "#2e323c"], [100, "#141620"]])}</defs>` +
        `<rect width="300" height="400" fill="url(#${g})"/>` +
        // mirror
        `<rect x="30" y="20" width="240" height="360" fill="#22262e"/>` +
        `<rect x="30" y="20" width="240" height="360" fill="none" stroke="#3a3f48" stroke-width="4"/>` +
        // reflected figure holding phone
        `<path d="M90 400 q60 -150 120 0z" fill="#3a4048"/>` +
        `<ellipse cx="150" cy="150" rx="40" ry="46" fill="#d0a078"/>` +
        `<path d="M112 150 q0 -50 38 -50 t38 50z" fill="#241c14"/>` +
        // phone rectangle over face (mirror selfie)
        `<rect x="132" y="130" width="36" height="60" rx="6" fill="#0a0a0e"/>` +
        `<circle cx="150" cy="150" r="4" fill="#2a2f38"/>` +
        // dumbbell rack behind
        `<rect x="40" y="300" width="220" height="10" fill="#14161c"/>` +
        Array.from({ length: 5 }, (_, i) => `<circle cx="${60 + i * 45}" cy="290" r="9" fill="#0e1014"/>`).join(""),
    };
  },
};

interface LifePhotoSpec {
  kind: keyof typeof GENERATORS;
  caption: string;
  /** ISO datetime. */
  when: string;
  aspect?: "landscape" | "portrait";
  deleted?: boolean;
}

/**
 * Build a set of realistic everyday photos for a case. Each spec names a
 * scene generator, a personal caption, and a timestamp so the shots weave
 * into the victim's real timeline.
 */
export function buildLifePhotos(caseId: string, specs: LifePhotoSpec[]): Photo[] {
  return specs.map((spec, i) => {
    const gen = GENERATORS[spec.kind];
    const rand = mulberry32(seedFrom(`${caseId}.life.${spec.kind}.${i}`));
    const { inner, base } = gen(rand);
    const aspect =
      spec.aspect ?? (["brunch", "cat", "sunset", "beach", "friends", "citynight", "mountains", "concert", "desk", "car", "snow", "birthday"].includes(spec.kind) ? "landscape" : "portrait");
    return {
      id: `${caseId}-life-${i}`,
      caption: spec.caption,
      timestamp: spec.when,
      aspect,
      deleted: spec.deleted,
      meta: { takenAt: spec.when, device: "This phone" },
      svg: photoSvg(inner, { aspect, base, grade: "warm", grain: 0.09, softness: 0.9, vignette: 0.4 }),
    };
  });
}

export type LifeKind = keyof typeof GENERATORS;
