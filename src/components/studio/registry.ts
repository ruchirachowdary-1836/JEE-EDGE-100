import type { SimDef } from "./types";
import { projectile, shm, efield, wave, lens } from "./sims-physics";
import { bohr, kinetics, vsepr, orbitals, galvanic } from "./sims-chemistry";
import { transform, derivative, riemann, conics } from "./sims-math";

/** Interactive simulations, keyed by the Animation.key stored in the database. */
export const SIMS: Record<string, SimDef> = Object.fromEntries(
  [projectile, shm, efield, wave, lens, bohr, kinetics, vsepr, orbitals, galvanic, transform, derivative, riemann, conics].map((s) => [s.key, s]),
);

export const SIM_KEYS = Object.keys(SIMS);
