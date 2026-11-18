// Keys of the interactive simulations shipped with the app (see src/components/studio/registry.ts).
// New animated lessons can reuse any of these; a brand-new simulation needs a code change.
export const SIM_KEYS = [
  "projectile", "shm", "efield", "wave", "lens",
  "bohr", "kinetics", "vsepr", "orbitals", "galvanic",
  "transform", "derivative", "riemann", "conics",
] as const;
