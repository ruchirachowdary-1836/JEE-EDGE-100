/* Consistency checks on the periodic-table data used by the Chemistry Lab. */
import { ELEMENTS, configuration } from "../src/lib/elements";

let errors = 0;
const fail = (m: string) => { errors++; console.log("FAIL", m); };
const periodStart = [1, 3, 11, 19, 37, 55, 87];
ELEMENTS.forEach((e, i) => {
  if (e.z !== i + 1) fail(`${e.symbol}: z ${e.z} at index ${i}`);
  const p = periodStart.filter((s) => e.z >= s).length;
  if (e.period !== p) fail(`${e.symbol}: period ${e.period}, expected ${p}`);
  if (i > 0 && !(e.mass > ELEMENTS[i - 1].mass) && ![19, 28, 53, 91, 93, 95, 97, 118].includes(e.z)) fail(`${e.symbol}: mass ${e.mass} not above ${ELEMENTS[i - 1].symbol}`);
  if (e.en !== null && (e.en < 0.7 || e.en > 4)) fail(`${e.symbol}: EN ${e.en} outside the Pauling range`);
  // electron count of the displayed configuration must equal Z
  const cfg = configuration(e.z).condensed;
  const core: Record<string, number> = { He: 2, Ne: 10, Ar: 18, Kr: 36, Xe: 54, Rn: 86 };
  const m = cfg.match(/^\[(\w+)\]/);
  const count = (m ? core[m[1]] : 0) + [...cfg.replace(/^\[\w+\]/, "").matchAll(/\d[spdf](\d+)/g)].reduce((s, x) => s + Number(x[1]), 0);
  if (count !== e.z) fail(`${e.symbol}: configuration ${cfg} has ${count} electrons`);
});
const known: Record<string, [number, number | null]> = { // [standard atomic weight (rounded), Pauling EN]
  Fe: [55.845, 1.83], Cu: [63.546, 1.9], Br: [79.904, 2.96], Ag: [107.87, 1.93], I: [126.9, 2.66], Au: [196.97, 2.54], Pb: [207.2, 2.33], U: [238.03, 1.38], Cs: [132.91, 0.79], Xe: [131.29, 2.6],
};
for (const [sym, [mass, en]] of Object.entries(known)) {
  const e = ELEMENTS.find((x) => x.symbol === sym)!;
  if (Math.abs(e.mass - mass) > 0.02) fail(`${sym}: mass ${e.mass} vs ${mass}`);
  if (en !== null && (e.en === null || Math.abs(e.en - en) > 0.02)) fail(`${sym}: EN ${e.en} vs ${en}`);
}
const g12 = ELEMENTS.filter((e) => [30, 48, 80].includes(e.z)).map((e) => `${e.symbol}:${e.category}`);
console.log(`group 12 categories: ${g12.join(", ")}`);
console.log(`${ELEMENTS.length} elements checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
