// Reference data for the interactive periodic table.
// Masses are standard atomic weights (rounded); electronegativity is on the Pauling scale
// (null where no accepted value exists). Group 3 placement: La–Lu and Ac–Lr in the f-block rows.

export type Category =
  | "alkali" | "alkaline" | "transition" | "post-transition" | "metalloid"
  | "nonmetal" | "halogen" | "noble" | "lanthanoid" | "actinoid";

export type Element = {
  z: number; symbol: string; name: string; mass: number; group: number | null; period: number;
  category: Category; en: number | null; block: "s" | "p" | "d" | "f";
};

const RAW = `1 H Hydrogen 1.008 1 1 nonmetal 2.20
2 He Helium 4.003 18 1 noble -
3 Li Lithium 6.94 1 2 alkali 0.98
4 Be Beryllium 9.012 2 2 alkaline 1.57
5 B Boron 10.81 13 2 metalloid 2.04
6 C Carbon 12.011 14 2 nonmetal 2.55
7 N Nitrogen 14.007 15 2 nonmetal 3.04
8 O Oxygen 15.999 16 2 nonmetal 3.44
9 F Fluorine 18.998 17 2 halogen 3.98
10 Ne Neon 20.180 18 2 noble -
11 Na Sodium 22.990 1 3 alkali 0.93
12 Mg Magnesium 24.305 2 3 alkaline 1.31
13 Al Aluminium 26.982 13 3 post-transition 1.61
14 Si Silicon 28.085 14 3 metalloid 1.90
15 P Phosphorus 30.974 15 3 nonmetal 2.19
16 S Sulfur 32.06 16 3 nonmetal 2.58
17 Cl Chlorine 35.45 17 3 halogen 3.16
18 Ar Argon 39.95 18 3 noble -
19 K Potassium 39.098 1 4 alkali 0.82
20 Ca Calcium 40.078 2 4 alkaline 1.00
21 Sc Scandium 44.956 3 4 transition 1.36
22 Ti Titanium 47.867 4 4 transition 1.54
23 V Vanadium 50.942 5 4 transition 1.63
24 Cr Chromium 51.996 6 4 transition 1.66
25 Mn Manganese 54.938 7 4 transition 1.55
26 Fe Iron 55.845 8 4 transition 1.83
27 Co Cobalt 58.933 9 4 transition 1.88
28 Ni Nickel 58.693 10 4 transition 1.91
29 Cu Copper 63.546 11 4 transition 1.90
30 Zn Zinc 65.38 12 4 transition 1.65
31 Ga Gallium 69.723 13 4 post-transition 1.81
32 Ge Germanium 72.630 14 4 metalloid 2.01
33 As Arsenic 74.922 15 4 metalloid 2.18
34 Se Selenium 78.971 16 4 nonmetal 2.55
35 Br Bromine 79.904 17 4 halogen 2.96
36 Kr Krypton 83.798 18 4 noble 3.00
37 Rb Rubidium 85.468 1 5 alkali 0.82
38 Sr Strontium 87.62 2 5 alkaline 0.95
39 Y Yttrium 88.906 3 5 transition 1.22
40 Zr Zirconium 91.224 4 5 transition 1.33
41 Nb Niobium 92.906 5 5 transition 1.6
42 Mo Molybdenum 95.95 6 5 transition 2.16
43 Tc Technetium 98 7 5 transition 1.9
44 Ru Ruthenium 101.07 8 5 transition 2.2
45 Rh Rhodium 102.91 9 5 transition 2.28
46 Pd Palladium 106.42 10 5 transition 2.20
47 Ag Silver 107.87 11 5 transition 1.93
48 Cd Cadmium 112.41 12 5 transition 1.69
49 In Indium 114.82 13 5 post-transition 1.78
50 Sn Tin 118.71 14 5 post-transition 1.96
51 Sb Antimony 121.76 15 5 metalloid 2.05
52 Te Tellurium 127.60 16 5 metalloid 2.1
53 I Iodine 126.90 17 5 halogen 2.66
54 Xe Xenon 131.29 18 5 noble 2.6
55 Cs Caesium 132.91 1 6 alkali 0.79
56 Ba Barium 137.33 2 6 alkaline 0.89
57 La Lanthanum 138.91 - 6 lanthanoid 1.10
58 Ce Cerium 140.12 - 6 lanthanoid 1.12
59 Pr Praseodymium 140.91 - 6 lanthanoid 1.13
60 Nd Neodymium 144.24 - 6 lanthanoid 1.14
61 Pm Promethium 145 - 6 lanthanoid -
62 Sm Samarium 150.36 - 6 lanthanoid 1.17
63 Eu Europium 151.96 - 6 lanthanoid -
64 Gd Gadolinium 157.25 - 6 lanthanoid 1.20
65 Tb Terbium 158.93 - 6 lanthanoid -
66 Dy Dysprosium 162.50 - 6 lanthanoid 1.22
67 Ho Holmium 164.93 - 6 lanthanoid 1.23
68 Er Erbium 167.26 - 6 lanthanoid 1.24
69 Tm Thulium 168.93 - 6 lanthanoid 1.25
70 Yb Ytterbium 173.05 - 6 lanthanoid -
71 Lu Lutetium 174.97 - 6 lanthanoid 1.27
72 Hf Hafnium 178.49 4 6 transition 1.3
73 Ta Tantalum 180.95 5 6 transition 1.5
74 W Tungsten 183.84 6 6 transition 2.36
75 Re Rhenium 186.21 7 6 transition 1.9
76 Os Osmium 190.23 8 6 transition 2.2
77 Ir Iridium 192.22 9 6 transition 2.20
78 Pt Platinum 195.08 10 6 transition 2.28
79 Au Gold 196.97 11 6 transition 2.54
80 Hg Mercury 200.59 12 6 transition 2.00
81 Tl Thallium 204.38 13 6 post-transition 1.62
82 Pb Lead 207.2 14 6 post-transition 2.33
83 Bi Bismuth 208.98 15 6 post-transition 2.02
84 Po Polonium 209 16 6 metalloid 2.0
85 At Astatine 210 17 6 halogen 2.2
86 Rn Radon 222 18 6 noble -
87 Fr Francium 223 1 7 alkali 0.7
88 Ra Radium 226 2 7 alkaline 0.9
89 Ac Actinium 227 - 7 actinoid 1.1
90 Th Thorium 232.04 - 7 actinoid 1.3
91 Pa Protactinium 231.04 - 7 actinoid 1.5
92 U Uranium 238.03 - 7 actinoid 1.38
93 Np Neptunium 237 - 7 actinoid 1.36
94 Pu Plutonium 244 - 7 actinoid 1.28
95 Am Americium 243 - 7 actinoid 1.3
96 Cm Curium 247 - 7 actinoid -
97 Bk Berkelium 247 - 7 actinoid -
98 Cf Californium 251 - 7 actinoid -
99 Es Einsteinium 252 - 7 actinoid -
100 Fm Fermium 257 - 7 actinoid -
101 Md Mendelevium 258 - 7 actinoid -
102 No Nobelium 259 - 7 actinoid -
103 Lr Lawrencium 266 - 7 actinoid -
104 Rf Rutherfordium 267 4 7 transition -
105 Db Dubnium 268 5 7 transition -
106 Sg Seaborgium 269 6 7 transition -
107 Bh Bohrium 270 7 7 transition -
108 Hs Hassium 277 8 7 transition -
109 Mt Meitnerium 278 9 7 transition -
110 Ds Darmstadtium 281 10 7 transition -
111 Rg Roentgenium 282 11 7 transition -
112 Cn Copernicium 285 12 7 transition -
113 Nh Nihonium 286 13 7 post-transition -
114 Fl Flerovium 289 14 7 post-transition -
115 Mc Moscovium 290 15 7 post-transition -
116 Lv Livermorium 293 16 7 post-transition -
117 Ts Tennessine 294 17 7 halogen -
118 Og Oganesson 294 18 7 noble -`;

function blockOf(z: number, group: number | null): Element["block"] {
  if (group === null) return "f";
  if (z === 2) return "s";
  if (group <= 2) return "s";
  if (group >= 13) return "p";
  return "d";
}

export const ELEMENTS: Element[] = RAW.split("\n").map((line) => {
  const [z, symbol, name, mass, group, period, category, en] = line.trim().split(/\s+/);
  const g = group === "-" ? null : Number(group);
  return {
    z: Number(z), symbol, name, mass: Number(mass), group: g, period: Number(period),
    category: category as Category, en: en === "-" ? null : Number(en), block: blockOf(Number(z), g),
  };
});

/** Grid position for an 18-column table with f-block rows 9 and 10. */
export function gridPos(e: Element): { row: number; col: number } {
  if (e.group !== null) return { row: e.period, col: e.group };
  const offset = e.category === "lanthanoid" ? e.z - 57 : e.z - 89;
  return { row: e.category === "lanthanoid" ? 9 : 10, col: 3 + offset };
}

// ─── Electronic configuration ───

const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];
const CAP: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
const NOBLE: [number, string][] = [[86, "Rn"], [54, "Xe"], [36, "Kr"], [18, "Ar"], [10, "Ne"], [2, "He"]];

/** Verified ground-state configurations that differ from the simple Aufbau filling order. */
export const CONFIG_EXCEPTIONS: Record<number, { config: string; reason: string }> = {
  24: { config: "[Ar] 3d5 4s1", reason: "Half-filled 3d subshell gives extra exchange-energy stability." },
  29: { config: "[Ar] 3d10 4s1", reason: "Completely filled 3d subshell is extra stable." },
  41: { config: "[Kr] 4d4 5s1", reason: "4d and 5s are very close in energy." },
  42: { config: "[Kr] 4d5 5s1", reason: "Half-filled 4d subshell (like Cr)." },
  44: { config: "[Kr] 4d7 5s1", reason: "4d and 5s are very close in energy." },
  45: { config: "[Kr] 4d8 5s1", reason: "4d and 5s are very close in energy." },
  46: { config: "[Kr] 4d10", reason: "Completely filled 4d with empty 5s — a unique case." },
  47: { config: "[Kr] 4d10 5s1", reason: "Completely filled 4d subshell (like Cu)." },
  57: { config: "[Xe] 5d1 6s2", reason: "The first electron after Ba enters 5d, not 4f." },
  58: { config: "[Xe] 4f1 5d1 6s2", reason: "4f and 5d are close in energy." },
  64: { config: "[Xe] 4f7 5d1 6s2", reason: "Half-filled 4f subshell is retained." },
  78: { config: "[Xe] 4f14 5d9 6s1", reason: "5d and 6s are close in energy (relativistic effects)." },
  79: { config: "[Xe] 4f14 5d10 6s1", reason: "Completely filled 5d subshell (like Cu, Ag)." },
  89: { config: "[Rn] 6d1 7s2", reason: "First electron after Ra enters 6d (like La)." },
  90: { config: "[Rn] 6d2 7s2", reason: "6d is lower than 5f at the start of the actinoids." },
  91: { config: "[Rn] 5f2 6d1 7s2", reason: "5f and 6d are close in energy." },
  92: { config: "[Rn] 5f3 6d1 7s2", reason: "5f and 6d are close in energy." },
  93: { config: "[Rn] 5f4 6d1 7s2", reason: "5f and 6d are close in energy." },
  96: { config: "[Rn] 5f7 6d1 7s2", reason: "Half-filled 5f subshell is retained (like Gd)." },
  103: { config: "[Rn] 5f14 7s2 7p1", reason: "Relativistic stabilisation of 7p (experimentally supported)." },
};

export function aufbau(z: number): { subshell: string; electrons: number }[] {
  const out: { subshell: string; electrons: number }[] = [];
  let left = z;
  for (const s of ORDER) {
    if (left <= 0) break;
    const n = Math.min(CAP[s[1]], left);
    out.push({ subshell: s, electrons: n });
    left -= n;
  }
  return out;
}

export function configuration(z: number): { full: string; condensed: string; exception?: string; aufbauPrediction?: string } {
  const filled = aufbau(z);
  const byN = [...filled].sort((a, b) => Number(a.subshell[0]) - Number(b.subshell[0]) || "spdf".indexOf(a.subshell[1]) - "spdf".indexOf(b.subshell[1]));
  const full = byN.map((x) => `${x.subshell}${x.electrons}`).join(" ");
  const core = NOBLE.find(([nz]) => nz < z);
  let condensed = full;
  if (core) {
    const coreSet = new Set(aufbau(core[0]).map((x) => x.subshell));
    const rest = filled.filter((x) => !coreSet.has(x.subshell) || x.electrons !== CAP[x.subshell[1]]);
    const restSorted = rest.sort((a, b) => Number(a.subshell[0]) - Number(b.subshell[0]) || "spdf".indexOf(a.subshell[1]) - "spdf".indexOf(b.subshell[1]));
    condensed = `[${core[1]}] ${restSorted.map((x) => `${x.subshell}${x.electrons}`).join(" ")}`;
  }
  const ex = CONFIG_EXCEPTIONS[z];
  if (ex) return { full, condensed: ex.config, exception: ex.reason, aufbauPrediction: condensed };
  return { full, condensed };
}

export function unpairedInSubshell(subshell: string, electrons: number) {
  const orbitals = CAP[subshell[1]] / 2;
  return electrons <= orbitals ? electrons : 2 * orbitals - electrons;
}
