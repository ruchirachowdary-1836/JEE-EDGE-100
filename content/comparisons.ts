import type { ComparisonSeed } from "./types";

export const COMPARISONS: ComparisonSeed[] = [
  {
    slug: "velocity-vs-speed", title: "Velocity versus speed", chapter: "kinematics", leftTitle: "Velocity", rightTitle: "Speed",
    rows: [
      { aspect: "Nature", left: "Vector (magnitude and direction)", right: "Scalar (magnitude only)" },
      { aspect: "Definition", left: "$\\vec v = d\\vec r/dt$ — rate of change of displacement", right: "$|d\\vec r/dt|$ — rate of change of distance along the path" },
      { aspect: "Can it be negative?", left: "Its components can be negative", right: "Never negative" },
      { aspect: "Round trip average", left: "Zero (displacement is zero)", right: "Positive (total distance / time)" },
      { aspect: "Uniform circular motion", left: "Changes continuously (direction)", right: "Constant" },
    ],
    summary: "Instantaneous speed always equals the magnitude of instantaneous velocity, but **average** speed is generally greater than the magnitude of average velocity.",
  },
  {
    slug: "average-vs-instantaneous-velocity", title: "Average versus instantaneous velocity", chapter: "kinematics", leftTitle: "Average velocity", rightTitle: "Instantaneous velocity",
    rows: [
      { aspect: "Definition", left: "$\\vec v_{avg} = \\Delta\\vec r/\\Delta t$", right: "$\\vec v = \\lim_{\\Delta t\\to0}\\Delta\\vec r/\\Delta t = d\\vec r/dt$" },
      { aspect: "On an x–t graph", left: "Slope of the chord joining two points", right: "Slope of the tangent at a point" },
      { aspect: "Depends on", left: "Only start and end positions", right: "The motion at that instant" },
      { aspect: "Uniform acceleration (1D)", left: "$(u + v)/2$", right: "$u + at$" },
    ],
    summary: "Average velocity is a property of an interval; instantaneous velocity is a property of an instant. They coincide only for uniform velocity.",
  },
  {
    slug: "work-vs-energy", title: "Work versus energy", chapter: "work-energy-power", leftTitle: "Work", rightTitle: "Energy",
    rows: [
      { aspect: "What it is", left: "A process: transfer of energy by a force through a displacement", right: "A state property: capacity to do work" },
      { aspect: "Expression", left: "$W = \\int \\vec F\\cdot d\\vec s$", right: "$KE = \\tfrac12mv^2$, $U$ depends on configuration" },
      { aspect: "Sign", left: "Positive, negative or zero", right: "KE ≥ 0; potential energy depends on chosen zero" },
      { aspect: "Path dependence", left: "Depends on path for non-conservative forces", right: "State function — depends only on the state" },
      { aspect: "Link", left: "$W_{net} = \\Delta KE$", right: "$W_{conservative} = -\\Delta U$" },
    ],
    summary: "Work is energy in transit; energy is what a system has. Same unit (joule), different roles.",
  },
  {
    slug: "potential-vs-field", title: "Electric potential versus electric field", chapter: "electrostatics", leftTitle: "Electric potential (V)", rightTitle: "Electric field (E)",
    rows: [
      { aspect: "Nature", left: "Scalar", right: "Vector" },
      { aspect: "Definition", left: "Work done per unit charge to bring a test charge from infinity", right: "Force per unit positive test charge" },
      { aspect: "Point charge", left: "$V = \\dfrac{kq}{r}$", right: "$E = \\dfrac{kq}{r^2}$" },
      { aspect: "Relation", left: "$V = -\\int \\vec E\\cdot d\\vec r$", right: "$\\vec E = -\\nabla V$ (in 1D, $E = -dV/dx$)" },
      { aspect: "Unit", left: "volt (J C⁻¹)", right: "N C⁻¹ = V m⁻¹" },
      { aspect: "Inside a charged conductor", left: "Constant (equal to surface value)", right: "Zero" },
    ],
    summary: "$E$ can be zero where $V$ is not (centre of a ring has $E = 0$, $V \\ne 0$), and $V$ can be zero where $E$ is not (midpoint of a dipole).",
  },
  {
    slug: "permutation-vs-combination", title: "Permutations versus combinations", chapter: "permutations-combinations", leftTitle: "Permutation", rightTitle: "Combination",
    rows: [
      { aspect: "Order matters?", left: "Yes — arrangements", right: "No — selections" },
      { aspect: "Formula", left: "$^nP_r = \\dfrac{n!}{(n-r)!}$", right: "$^nC_r = \\dfrac{n!}{r!(n-r)!}$" },
      { aspect: "Relation", left: "$^nP_r = r!\\cdot{}^nC_r$", right: "$^nC_r = {}^nP_r / r!$" },
      { aspect: "Typical words", left: "arrange, order, rank, password, seating", right: "choose, select, committee, team, group" },
      { aspect: "Example (3 from A, B, C, D)", left: "24 ordered arrangements", right: "4 groups" },
    ],
    summary: "Select first (combination), then arrange if order matters (multiply by $r!$).",
  },
  {
    slug: "differentiation-vs-integration", title: "Differentiation versus integration", chapter: "integral-calculus", leftTitle: "Differentiation", rightTitle: "Integration",
    rows: [
      { aspect: "Geometric meaning", left: "Slope of the tangent", right: "Signed area under the curve" },
      { aspect: "Physical meaning", left: "Instantaneous rate (e.g. velocity from position)", right: "Accumulation (e.g. displacement from velocity)" },
      { aspect: "Uniqueness", left: "Derivative is unique", right: "Indefinite integral unique only up to $+C$" },
      { aspect: "Effect on continuity", left: "Can destroy smoothness", right: "Smooths functions (integral of a continuous function is differentiable)" },
      { aspect: "Link", left: "$\\dfrac{d}{dx}\\int_a^x f = f(x)$", right: "$\\int_a^b f'(x)\\,dx = f(b) - f(a)$" },
    ],
    summary: "They are inverse operations, joined by the fundamental theorem of calculus.",
  },
  {
    slug: "order-vs-molecularity", title: "Order versus molecularity", chapter: "chemical-kinetics", leftTitle: "Order", rightTitle: "Molecularity",
    rows: [
      { aspect: "Definition", left: "Sum of powers of concentrations in the experimental rate law", right: "Number of species colliding in one elementary step" },
      { aspect: "Determined by", left: "Experiment", right: "Proposed mechanism (theory)" },
      { aspect: "Possible values", left: "0, fractional, integer, even negative", right: "Positive integers only (1, 2, rarely 3)" },
      { aspect: "Applies to", left: "Overall reaction", right: "Each elementary step" },
      { aspect: "Example", left: "Ester hydrolysis in excess water: first order", right: "Same reaction: bimolecular" },
    ],
    summary: "For an elementary step, order = molecularity. For complex reactions, the rate-determining step sets the order.",
  },
];
