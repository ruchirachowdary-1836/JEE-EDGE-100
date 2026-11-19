import type { QuestionSeed } from "./types";
import { r } from "./note-helpers";

// Original practice questions written for JEE EDGE 100 (not previous-year questions).
// Levels 1–4 use JEE Main formats; Level 5 uses JEE Advanced formats (one-or-more-correct or matching list).
// Numerical answers are recomputed independently in tests/verify-answers.ts. g = 10 m/s² unless stated.

export const PHYSICS_QUESTIONS_4: QuestionSeed[] = [
  // ── Errors and significant figures ──
  {
    topic: "errors-and-significant-figures", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`The number of significant figures in $0.05040$ is:`,
    options: [
      { text: "4", correct: true, why: "Leading zeros do not count; the zero between 5 and 4 and the trailing zero after the decimal point do: 5, 0, 4, 0." },
      { text: "3", why: "The trailing zero after the decimal point is significant." },
      { text: "5", why: "The leading zero before 5 is only a place-holder." },
      { text: "6", why: "Leading zeros are never significant." },
    ],
    solution: r`Ignore the leading zeros (they only locate the decimal point). Count from the first non-zero digit: 5, 0, 4, 0 → **4** significant figures. A trailing zero after a decimal point records precision, so it counts.`,
    concept: "Rules for significant figures", formula: "Leading zeros: not significant; trailing zeros after a decimal point: significant", whyFormula: "Standard counting rules.", mistakes: "Dropping the final zero.",
  },
  {
    topic: "errors-and-significant-figures", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 7,
    statement: r`$Z = \dfrac{A^2B}{C}$. The percentage errors in $A$, $B$ and $C$ are $1\%$, $2\%$ and $3\%$. Find the maximum percentage error in $Z$.`,
    solution: r`$\dfrac{\Delta Z}{Z} = 2\dfrac{\Delta A}{A} + \dfrac{\Delta B}{B} + \dfrac{\Delta C}{C} = 2(1) + 2 + 3 = 7\%$. Errors add even for the quantity in the denominator.`,
    concept: "Propagation of relative errors", formula: r`$\dfrac{\Delta Z}{Z} = \sum |n_i|\dfrac{\Delta x_i}{x_i}$`, whyFormula: "Maximum error of a product of powers.", mistakes: "Subtracting the error of $C$ because it divides.",
  },
  {
    topic: "errors-and-significant-figures", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`The sum $2.5 + 3.42 + 0.075$, reported with the correct precision, is:`,
    options: [
      { text: "6.0", correct: true, why: "5.995 rounded to one decimal place (the least precise term, 2.5)." },
      { text: "5.995", why: "Keeps more decimal places than the least precise measurement." },
      { text: "6.00", why: "Two decimal places claims more precision than 2.5 has." },
      { text: "6", why: "Drops the decimal place that 2.5 does justify." },
    ],
    solution: r`In addition the result keeps as many **decimal places** as the least precise term. $2.5$ has one decimal place, so $5.995 \to 6.0$.`,
    concept: "Significant figures in addition", formula: "Decimal places of the least precise term", whyFormula: "Addition is limited by absolute uncertainty.", mistakes: "Using the significant-figure rule for multiplication.",
  },
  {
    topic: "errors-and-significant-figures", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 1.1, tolerance: 0.01,
    statement: r`In a simple-pendulum experiment, $L = 100.0\ \text{cm}$ is measured to $\pm0.1\ \text{cm}$ and the period $T = 2.00\ \text{s}$ to $\pm0.01\ \text{s}$. Using $g = 4\pi^2L/T^2$, find the maximum percentage error in $g$.`,
    solution: r`$\dfrac{\Delta g}{g} = \dfrac{\Delta L}{L} + 2\dfrac{\Delta T}{T} = \dfrac{0.1}{100.0} + 2\cdot\dfrac{0.01}{2.00} = 0.001 + 0.010 = 0.011 = 1.1\%$. The timing dominates, which is why many oscillations are timed together.`,
    concept: "Error analysis of an experiment", formula: r`$\dfrac{\Delta g}{g} = \dfrac{\Delta L}{L} + 2\dfrac{\Delta T}{T}$`, whyFormula: "$T$ appears squared.", mistakes: "Forgetting the factor 2 on $T$.",
  },
  {
    topic: "errors-and-significant-figures", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 180,
    statement: "Which of the following statements are correct?",
    options: [
      { text: "The least count of an instrument limits the precision of a measurement, not its accuracy", correct: true, why: "Precision is resolution; accuracy is closeness to the true value (affected by systematic error)." },
      { text: "Repeating a measurement many times reduces systematic error", why: "Repetition averages out random errors only; a systematic offset stays." },
      { text: r`The percentage error in $r^3$ is three times the percentage error in $r$`, correct: true, why: r`$\Delta(r^3)/r^3 = 3\,\Delta r/r$.` },
      { text: r`$2.0 \times 3.00$ should be reported as $6.0$`, correct: true, why: "A product keeps the least number of significant figures (two, from 2.0)." },
    ],
    solution: r`(A) True: least count sets resolution (precision); a miscalibrated instrument can be precise and inaccurate. (B) False: averaging reduces **random** error; systematic error needs calibration or correction. (C) True: powers multiply relative errors. (D) True: in multiplication keep the fewest significant figures (2.0 has two), so $6.0$.`,
    concept: "Precision vs accuracy, error types and significant figures", formula: r`$\dfrac{\Delta(x^n)}{x^n} = n\dfrac{\Delta x}{x}$`, whyFormula: "Each statement tests a different rule.", mistakes: "Confusing random and systematic errors; using the addition rule for a product.",
  },

  // ── Motion in a straight line ──
  {
    topic: "motion-in-a-straight-line", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "The slope of a position–time graph gives:",
    options: [
      { text: "velocity", correct: true, why: r`$v = dx/dt$.` },
      { text: "acceleration", why: "That is the slope of a velocity–time graph." },
      { text: "displacement", why: "Displacement is read directly from the graph, not its slope." },
      { text: "distance travelled", why: "Distance is not a slope." },
    ],
    solution: r`$v = \dfrac{dx}{dt}$, the slope of $x$ against $t$. The slope of $v$–$t$ is acceleration; the area under $v$–$t$ is displacement.`,
    concept: "Motion graphs", formula: r`$v = dx/dt$`, whyFormula: "Definition of velocity.", mistakes: "Mixing up slope and area.",
  },
  {
    topic: "motion-in-a-straight-line", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 25,
    statement: r`A car starts from rest with a constant acceleration of $2\ \text{m s}^{-2}$. How far (in m) does it travel in $5\ \text{s}$?`,
    solution: r`$s = ut + \tfrac12at^2 = 0 + \tfrac12(2)(25) = 25\ \text{m}$.`,
    concept: "Equations of uniformly accelerated motion", formula: r`$s = ut + \tfrac12at^2$`, whyFormula: "Constant acceleration, known time.", mistakes: "Forgetting the ½.",
  },
  {
    topic: "motion-in-a-straight-line", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "A stone is dropped from rest. The distance it falls during the 3rd second is:",
    options: [
      { text: r`$25\ \text{m}$`, correct: true, why: r`$s_n = u + \tfrac a2(2n - 1) = 5\times5$.` },
      { text: r`$45\ \text{m}$`, why: "That is the total distance in 3 s." },
      { text: r`$20\ \text{m}$`, why: "That is the total distance in 2 s." },
      { text: r`$30\ \text{m}$`, why: "Uses $g\\times n$." },
    ],
    solution: r`$s_{3\text{rd}} = s(3) - s(2) = 45 - 20 = 25\ \text{m}$, or directly $s_n = u + \tfrac{g}{2}(2n - 1) = 0 + 5(5) = 25\ \text{m}$.`,
    concept: "Distance in the nth second", formula: r`$s_n = u + \tfrac a2(2n - 1)$`, whyFormula: "Difference of positions at $t = n$ and $t = n - 1$.", mistakes: "Giving the total distance instead of the distance in that second.",
  },
  {
    topic: "motion-in-a-straight-line", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 50,
    statement: r`A driver moving at $20\ \text{m s}^{-1}$ sees an obstacle, reacts after $0.5\ \text{s}$ and then brakes with a deceleration of $5\ \text{m s}^{-2}$. Find the total stopping distance in m.`,
    solution: r`During the reaction time the car moves at constant speed: $20\times0.5 = 10\ \text{m}$. Braking distance: $\dfrac{v^2}{2a} = \dfrac{400}{10} = 40\ \text{m}$. Total $= 50\ \text{m}$.`,
    concept: "Reaction distance plus braking distance", formula: r`$d = vt_r + \dfrac{v^2}{2a}$`, whyFormula: "Two stages with different motion.", mistakes: "Ignoring the reaction distance.",
  },
  {
    topic: "motion-in-a-straight-line", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A particle moves along the $x$-axis with $x = t^3 - 6t^2 + 9t$ (SI units). Which statements are correct?`,
    options: [
      { text: r`It is momentarily at rest at $t = 1\ \text{s}$ and $t = 3\ \text{s}$`, correct: true, why: r`$v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$.` },
      { text: r`Its acceleration is zero at $t = 2\ \text{s}$`, correct: true, why: r`$a = 6t - 12$.` },
      { text: r`The distance travelled from $t = 0$ to $t = 3\ \text{s}$ is $8\ \text{m}$`, correct: true, why: "It goes from 0 to 4 m (t = 1 s) and back to 0 (t = 3 s)." },
      { text: r`Its average velocity from $t = 0$ to $t = 3\ \text{s}$ is $\tfrac83\ \text{m s}^{-1}$`, why: "Displacement is zero, so average velocity is zero (8/3 is the average speed)." },
    ],
    solution: r`$v = 3(t - 1)(t - 3)$: zero at $t = 1, 3$ s. $a = 6t - 12$: zero at $t = 2$ s. Positions: $x(0) = 0$, $x(1) = 4$, $x(3) = 0$. Because the velocity changes sign at $t = 1$ s, distance $= 4 + 4 = 8$ m while displacement $= 0$. Average velocity $= 0$; average speed $= 8/3\ \text{m s}^{-1}$.`,
    concept: "Velocity sign changes, distance vs displacement", formula: r`$v = dx/dt$, $a = dv/dt$`, whyFormula: "Split the motion at every turning point.", mistakes: "Computing distance as $|x(3) - x(0)|$.",
  },

  // ── Vectors in kinematics ──
  {
    topic: "vectors-in-kinematics", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: r`Two vectors, each of magnitude $A$, are inclined at $120^\circ$. The magnitude of their resultant is:`,
    options: [
      { text: r`$A$`, correct: true, why: r`$\sqrt{A^2 + A^2 + 2A^2\cos120^\circ} = A$.` },
      { text: r`$2A$`, why: "That needs the vectors to be parallel." },
      { text: r`$\sqrt3A$`, why: "That is the result at $60^\\circ$." },
      { text: "zero", why: "That needs them to be antiparallel." },
    ],
    solution: r`$R = \sqrt{A^2 + A^2 + 2A\cdot A\cos120^\circ} = \sqrt{2A^2 - A^2} = A$.`,
    concept: "Law of vector addition", formula: r`$R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$`, whyFormula: "Parallelogram law.", mistakes: "Using $\\cos60^\\circ$ for the angle between the vectors.",
  },
  {
    topic: "vectors-in-kinematics", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 5,
    statement: r`Vectors of magnitudes $3$ and $4$ units are perpendicular. Find the magnitude of their sum.`,
    solution: r`$\sqrt{3^2 + 4^2} = 5$.`,
    concept: "Perpendicular vectors", formula: r`$R = \sqrt{A^2 + B^2}$`, whyFormula: r`$\cos90^\circ = 0$.`, mistakes: "Adding magnitudes (7).",
  },
  {
    topic: "vectors-in-kinematics", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 60,
    statement: r`A swimmer can swim at $5\ \text{m s}^{-1}$ in still water. A river flows at $3\ \text{m s}^{-1}$. To cross straight to the point directly opposite, the swimmer must head:`,
    options: [
      { text: r`upstream at $37^\circ$ to the line straight across`, correct: true, why: r`$\sin\theta = 3/5$.` },
      { text: r`upstream at $53^\circ$ to the line straight across`, why: "Uses $\\cos\\theta = 3/5$." },
      { text: "straight across", why: "The river would then carry the swimmer downstream." },
      { text: r`downstream at $37^\circ$`, why: "Heading downstream adds to the drift." },
    ],
    solution: r`The upstream component of the swimmer's velocity must cancel the river: $5\sin\theta = 3 \Rightarrow \theta = 37^\circ$ from the perpendicular, upstream. The crossing speed is then $5\cos37^\circ = 4\ \text{m s}^{-1}$.`,
    concept: "River crossing with zero drift", formula: r`$v\sin\theta = u$`, whyFormula: "Ground velocity must be perpendicular to the bank.", mistakes: "Measuring the angle from the bank instead of the perpendicular.",
  },
  {
    topic: "vectors-in-kinematics", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 60, answer: 10,
    statement: r`Rain falls vertically at $6\ \text{m s}^{-1}$. A cyclist rides horizontally at $8\ \text{m s}^{-1}$. Find the speed of the rain relative to the cyclist in m s⁻¹.`,
    solution: r`$\vec v_{rc} = \vec v_r - \vec v_c$: components $8$ (horizontal, backward) and $6$ (vertical). Magnitude $= \sqrt{64 + 36} = 10\ \text{m s}^{-1}$.`,
    concept: "Relative velocity", formula: r`$\vec v_{AB} = \vec v_A - \vec v_B$`, whyFormula: "Velocity of rain as seen by the cyclist.", mistakes: "Adding the speeds.",
  },
  {
    topic: "vectors-in-kinematics", level: 5, difficulty: "HARD", type: "MATCH", time: 240,
    statement: r`A river $60\ \text{m}$ wide flows at $3\ \text{m s}^{-1}$. A swimmer's speed relative to the water is $5\ \text{m s}^{-1}$. Match each quantity in List-I with its value in List-II.`,
    match: {
      left: ["Minimum time to cross", "Downstream drift when crossing in minimum time", "Time to cross with zero drift", "Angle of heading (from the straight-across line, upstream) for zero drift"],
      right: [r`$12\ \text{s}$`, r`$36\ \text{m}$`, r`$15\ \text{s}$`, r`$37^\circ$`, r`$53^\circ$`],
    },
    options: [
      { text: "P→1, Q→2, R→3, S→4", correct: true, why: "12 s, 36 m, 15 s, 37°." },
      { text: "P→3, Q→2, R→1, S→4", why: "Swaps the two crossing times: heading straight across is the fastest." },
      { text: "P→1, Q→2, R→3, S→5", why: "53° is measured from the bank, not from the straight-across line." },
      { text: "P→1, Q→3, R→2, S→4", why: "Mixes a time with a distance." },
    ],
    solution: r`- **Minimum time:** head straight across: $t = 60/5 = 12\ \text{s}$.
- **Drift then:** $3\times12 = 36\ \text{m}$.
- **Zero drift:** $\sin\theta = 3/5 \Rightarrow \theta = 37^\circ$ upstream; crossing speed $4\ \text{m s}^{-1}$, so $t = 60/4 = 15\ \text{s}$.

So P→1, Q→2, R→3, S→4.`,
    concept: "Minimum-time vs minimum-drift crossings", formula: r`$t_{\min} = d/v$; zero drift: $\sin\theta = u/v$, $t = d/\sqrt{v^2 - u^2}$`, whyFormula: "Two different optimisation goals.", mistakes: "Assuming the zero-drift path is also the fastest.",
  },

  // ── Uniform circular motion ──
  {
    topic: "uniform-circular-motion", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "For a particle in uniform circular motion, which quantity stays constant?",
    options: [
      { text: "speed", correct: true, why: "'Uniform' means constant speed." },
      { text: "velocity", why: "Its direction changes continuously." },
      { text: "acceleration vector", why: "It always points to the centre, so its direction changes." },
      { text: "linear momentum", why: "Its direction changes with the velocity." },
    ],
    solution: "The speed is constant, but the velocity direction turns continuously, so the velocity, momentum and the centripetal acceleration vector all change direction.",
    concept: "Uniform circular motion", formula: r`$a_c = v^2/r$ towards the centre`, whyFormula: "Constant magnitude, changing direction.", mistakes: "Calling the acceleration zero because the speed is constant.",
  },
  {
    topic: "uniform-circular-motion", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 30, answer: 8,
    statement: r`A particle moves in a circle of radius $0.5\ \text{m}$ with angular speed $4\ \text{rad s}^{-1}$. Find its centripetal acceleration in m s⁻².`,
    solution: r`$a_c = \omega^2r = 16\times0.5 = 8\ \text{m s}^{-2}$.`,
    concept: "Centripetal acceleration", formula: r`$a_c = \omega^2r$`, whyFormula: "Given $\\omega$ and $r$ directly.", mistakes: "Using $\\omega r$ (that is the speed).",
  },
  {
    topic: "uniform-circular-motion", level: 3, difficulty: "EASY", type: "MCQ", time: 45,
    statement: r`A particle makes 2 revolutions per second on a circle of radius $0.5\ \text{m}$. Its speed is:`,
    options: [
      { text: r`$2\pi\ \text{m s}^{-1}$`, correct: true, why: r`$v = 2\pi rf = 2\pi(0.5)(2)$.` },
      { text: r`$\pi\ \text{m s}^{-1}$`, why: "Uses one revolution per second." },
      { text: r`$4\pi\ \text{m s}^{-1}$`, why: "Uses the diameter twice." },
      { text: r`$1\ \text{m s}^{-1}$`, why: "Forgets the $2\\pi$ per revolution." },
    ],
    solution: r`$v = \omega r = 2\pi fr = 2\pi(2)(0.5) = 2\pi\ \text{m s}^{-1}$.`,
    concept: "Linear and angular speed", formula: r`$v = \omega r$, $\omega = 2\pi f$`, whyFormula: "Converts revolutions to radians.", mistakes: "Using $f$ instead of $2\\pi f$.",
  },
  {
    topic: "uniform-circular-motion", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 10,
    statement: r`A particle moves on a circle of radius $2\ \text{m}$. At an instant its speed is $4\ \text{m s}^{-1}$ and its speed is increasing at $6\ \text{m s}^{-2}$. Find the magnitude of its acceleration in m s⁻².`,
    solution: r`$a_c = v^2/r = 16/2 = 8\ \text{m s}^{-2}$ (towards the centre), $a_t = 6\ \text{m s}^{-2}$ (along the velocity). They are perpendicular: $a = \sqrt{64 + 36} = 10\ \text{m s}^{-2}$.`,
    concept: "Non-uniform circular motion", formula: r`$a = \sqrt{a_c^2 + a_t^2}$`, whyFormula: "Tangential and centripetal components are perpendicular.", mistakes: "Adding the components directly.",
  },
  {
    topic: "uniform-circular-motion", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A particle starts from rest on a circle of radius $R$ with constant angular acceleration $\alpha$. At time $t$, which statements are correct?`,
    options: [
      { text: r`Its tangential acceleration is $R\alpha$ and does not change with time`, correct: true, why: r`$a_t = R\alpha$.` },
      { text: r`Its centripetal acceleration is $R\alpha^2t^2$`, correct: true, why: r`$\omega = \alpha t$, so $a_c = \omega^2R$.` },
      { text: r`The net acceleration makes $45^\circ$ with the velocity when $\alpha t^2 = 1$`, correct: true, why: r`Then $a_c = a_t$.` },
      { text: r`Its speed is proportional to $t^2$`, why: r`$v = R\alpha t$ is proportional to $t$.` },
    ],
    solution: r`$\omega = \alpha t$, $v = R\alpha t$. Tangential acceleration $a_t = R\alpha$ (constant). Centripetal $a_c = \omega^2R = R\alpha^2t^2$. The angle $\phi$ between the net acceleration and the velocity satisfies $\tan\phi = a_c/a_t = \alpha t^2$, which equals 1 ($\phi = 45^\circ$) when $\alpha t^2 = 1$. Speed grows linearly, not as $t^2$.`,
    concept: "Components of acceleration in circular motion", formula: r`$a_t = R\alpha$, $a_c = \omega^2R$`, whyFormula: "Uniform angular acceleration kinematics.", mistakes: "Treating $a_c$ as constant.",
  },

  // ── Newton's laws and free-body diagrams ──
  {
    topic: "newtons-laws-and-free-body-diagrams", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A person stands on a weighing scale in a lift that is accelerating upward. The scale reads:",
    options: [
      { text: "more than the person's weight", correct: true, why: r`$N = m(g + a)$.` },
      { text: "less than the person's weight", why: "That happens when accelerating downward." },
      { text: "exactly the person's weight", why: "That happens at constant velocity." },
      { text: "zero", why: "That happens only in free fall." },
    ],
    solution: r`For the person: $N - mg = ma \Rightarrow N = m(g + a) > mg$. The scale shows $N$.`,
    concept: "Apparent weight", formula: r`$N = m(g + a)$`, whyFormula: "Newton's second law in the vertical direction.", mistakes: "Thinking velocity (not acceleration) decides the reading.",
  },
  {
    topic: "newtons-laws-and-free-body-diagrams", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`Masses of $3\ \text{kg}$ and $2\ \text{kg}$ hang from the two ends of a light string over a light frictionless pulley. Find the magnitude of their acceleration in m s⁻².`,
    solution: r`$a = \dfrac{(m_1 - m_2)g}{m_1 + m_2} = \dfrac{1\times10}{5} = 2\ \text{m s}^{-2}$.`,
    concept: "Atwood machine", formula: r`$a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$`, whyFormula: "Net driving force over total mass.", mistakes: "Dividing by the difference of masses.",
  },
  {
    topic: "newtons-laws-and-free-body-diagrams", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: "In the Atwood machine of the previous question (3 kg and 2 kg), the tension in the string is:",
    options: [
      { text: r`$24\ \text{N}$`, correct: true, why: r`$T = \dfrac{2m_1m_2g}{m_1 + m_2} = \dfrac{120}{5}$.` },
      { text: r`$30\ \text{N}$`, why: "That is the weight of the heavier mass." },
      { text: r`$20\ \text{N}$`, why: "That is the weight of the lighter mass." },
      { text: r`$25\ \text{N}$`, why: "The average weight is not the tension." },
    ],
    solution: r`For the 2 kg mass: $T - 20 = 2(2) \Rightarrow T = 24\ \text{N}$ (check with 3 kg: $30 - T = 3(2) \Rightarrow T = 24$). The tension lies between the two weights.`,
    concept: "Tension from a free-body diagram", formula: r`$T = \dfrac{2m_1m_2g}{m_1 + m_2}$`, whyFormula: "Apply $F = ma$ to either mass.", mistakes: "Assuming the tension equals one of the weights.",
  },
  {
    topic: "newtons-laws-and-free-body-diagrams", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 120, answer: 4,
    statement: r`A $2\ \text{kg}$ block on a smooth $30^\circ$ incline is tied by a string over a light pulley at the top to a $3\ \text{kg}$ mass hanging vertically. Find the acceleration of the system in m s⁻².`,
    solution: r`Driving force: weight of the hanging mass minus the component of the block's weight along the incline: $30 - 2\times10\times\sin30^\circ = 20\ \text{N}$. $a = 20/5 = 4\ \text{m s}^{-2}$ (hanging mass moving down).`,
    concept: "Connected bodies on an incline", formula: r`$a = \dfrac{m_2g - m_1g\sin\theta}{m_1 + m_2}$`, whyFormula: "Treat the string-connected bodies as one system along the string.", mistakes: "Using the full weight of the block on the incline.",
  },
  {
    topic: "newtons-laws-and-free-body-diagrams", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`Blocks of $2\ \text{kg}$ and $3\ \text{kg}$ touch each other on a smooth floor. A horizontal force of $10\ \text{N}$ pushes the $2\ \text{kg}$ block, which pushes the $3\ \text{kg}$ block. Which statements are correct?`,
    options: [
      { text: r`The acceleration of the blocks is $2\ \text{m s}^{-2}$`, correct: true, why: "10 N / 5 kg." },
      { text: r`The contact force between the blocks is $4\ \text{N}$`, why: "It accelerates the 3 kg block: 3 × 2 = 6 N." },
      { text: r`If the same force pushes the $3\ \text{kg}$ block from the other side instead, the contact force becomes $4\ \text{N}$`, correct: true, why: "Then it accelerates the 2 kg block: 2 × 2 = 4 N." },
      { text: "The contact force is the same whichever block is pushed", why: "It equals the mass in front times the acceleration, which differs." },
    ],
    solution: r`$a = F/(m_1 + m_2) = 2\ \text{m s}^{-2}$ in both cases. The contact force accelerates only the block in front of it: pushing the 2 kg block, $N = 3\times2 = 6\ \text{N}$; pushing the 3 kg block, $N = 2\times2 = 4\ \text{N}$.`,
    concept: "Contact forces between accelerating bodies", formula: r`$N = m_{\text{front}}\,a$`, whyFormula: "Free-body diagram of the block being pushed by the contact force alone.", mistakes: "Taking the contact force equal to the applied force.",
  },

  // ── Dynamics of circular motion ──
  {
    topic: "dynamics-of-circular-motion", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "On a frictionless banked road, the centripetal force on a car is provided by:",
    options: [
      { text: "the horizontal component of the normal reaction", correct: true, why: "The tilted normal force has an inward horizontal component." },
      { text: "friction", why: "There is no friction in this case." },
      { text: "the weight of the car", why: "Weight is vertical, so it cannot point to the centre." },
      { text: "the engine's driving force", why: "That acts along the motion, not towards the centre." },
    ],
    solution: r`On a bank of angle $\theta$: $N\cos\theta = mg$ and $N\sin\theta = mv^2/r$, giving $\tan\theta = v^2/(rg)$.`,
    concept: "Banking of roads", formula: r`$\tan\theta = \dfrac{v^2}{rg}$`, whyFormula: "Resolve the normal force.", mistakes: "Saying gravity supplies the centripetal force.",
  },
  {
    topic: "dynamics-of-circular-motion", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 10,
    statement: r`Find the maximum safe speed (in m s⁻¹) of a car on a level circular road of radius $20\ \text{m}$ if the coefficient of friction is $0.5$.`,
    solution: r`$\mu mg = mv^2/r \Rightarrow v = \sqrt{\mu rg} = \sqrt{0.5\times20\times10} = 10\ \text{m s}^{-1}$.`,
    concept: "Friction as centripetal force", formula: r`$v_{\max} = \sqrt{\mu rg}$`, whyFormula: "Static friction is the only horizontal force.", mistakes: "Forgetting the square root.",
  },
  {
    topic: "dynamics-of-circular-motion", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A road of radius $10\ \text{m}$ is to be banked so that cars at $10\ \text{m s}^{-1}$ need no friction. The banking angle is:`,
    options: [
      { text: r`$45^\circ$`, correct: true, why: r`$\tan\theta = v^2/(rg) = 1$.` },
      { text: r`$30^\circ$`, why: r`Would need $\tan\theta = 1/\sqrt3$.` },
      { text: r`$60^\circ$`, why: r`Would need $\tan\theta = \sqrt3$.` },
      { text: r`$90^\circ$`, why: "A vertical wall is not a road." },
    ],
    solution: r`$\tan\theta = \dfrac{v^2}{rg} = \dfrac{100}{100} = 1 \Rightarrow \theta = 45^\circ$.`,
    concept: "Banking angle", formula: r`$\tan\theta = \dfrac{v^2}{rg}$`, whyFormula: "Frictionless banking condition.", mistakes: "Using $\\sin\\theta$.",
  },
  {
    topic: "dynamics-of-circular-motion", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 3,
    statement: r`A $0.5\ \text{kg}$ stone is whirled in a vertical circle of radius $1\ \text{m}$ on a string. At the top its speed is $4\ \text{m s}^{-1}$. Find the tension (in N) at the top.`,
    solution: r`At the top both tension and weight point to the centre: $T + mg = mv^2/r \Rightarrow T = 0.5\times16 - 5 = 3\ \text{N}$.`,
    concept: "Vertical circular motion", formula: r`$T + mg = \dfrac{mv^2}{r}$ (top)`, whyFormula: "Net inward force at the top.", mistakes: "Using $T - mg$ at the top.",
  },
  {
    topic: "dynamics-of-circular-motion", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A bob on a light string moves in a vertical circle of radius $r$ with the minimum speed needed to complete the circle. Which statements are correct?`,
    options: [
      { text: r`Its speed at the top is $\sqrt{gr}$`, correct: true, why: "At the top the tension is just zero." },
      { text: r`Its speed at the bottom is $\sqrt{5gr}$`, correct: true, why: r`$v_b^2 = gr + 4gr$.` },
      { text: r`The tension at the bottom is $6mg$`, correct: true, why: r`$T - mg = m(5g)$.` },
      { text: r`The tension when the string is horizontal is $3mg$`, correct: true, why: r`$v^2 = 3gr$ there, and the weight has no radial component.` },
    ],
    solution: r`Top: $T = 0$, $mg = mv_t^2/r \Rightarrow v_t^2 = gr$. Energy: $v^2 = v_t^2 + 2g(\text{drop from top})$.

- Bottom (drop $2r$): $v_b^2 = 5gr$; $T_b = mg + m(5g) = 6mg$.
- Horizontal (drop $r$): $v^2 = 3gr$; the weight is tangential there, so $T = mv^2/r = 3mg$.

All four statements are correct.`,
    concept: "Critical condition in a vertical circle with energy conservation", formula: r`$v^2 = v_t^2 + 2gh$; $T = \dfrac{mv^2}{r} + mg\cos\theta$ (from the bottom)`, whyFormula: "Combine the top condition with energy and radial force balance.", mistakes: "Forgetting that the weight has no radial component when the string is horizontal.",
  },

  // ── Conservation of linear momentum ──
  {
    topic: "conservation-of-linear-momentum", level: 1, difficulty: "EASY", type: "MCQ", time: 30,
    statement: "A gun at rest fires a bullet. Just after firing, the total momentum of the gun–bullet system is:",
    options: [
      { text: "zero", correct: true, why: "No external horizontal force; it was zero before firing." },
      { text: "equal to the bullet's momentum", why: "The gun's recoil momentum cancels it." },
      { text: "twice the bullet's momentum", why: "The momenta are equal and opposite." },
      { text: "equal to the gun's momentum", why: "The bullet's momentum cancels it." },
    ],
    solution: "The explosion forces are internal. Total momentum stays zero: the gun's momentum is equal and opposite to the bullet's.",
    concept: "Conservation of momentum", formula: r`$\sum\vec p = \text{constant}$ when $\vec F_{\text{ext}} = 0$`, whyFormula: "Internal forces cancel in pairs.", mistakes: "Thinking firing creates momentum.",
  },
  {
    topic: "conservation-of-linear-momentum", level: 2, difficulty: "EASY", type: "NUMERICAL", time: 45, answer: 2,
    statement: r`A $5\ \text{kg}$ gun fires a $50\ \text{g}$ bullet at $200\ \text{m s}^{-1}$. Find the recoil speed of the gun in m s⁻¹.`,
    solution: r`$MV = mv \Rightarrow V = \dfrac{0.05\times200}{5} = 2\ \text{m s}^{-1}$.`,
    concept: "Recoil", formula: r`$MV = mv$`, whyFormula: "Initial momentum is zero.", mistakes: "Using 50 instead of 0.05 kg.",
  },
  {
    topic: "conservation-of-linear-momentum", level: 3, difficulty: "MEDIUM", type: "MCQ", time: 45,
    statement: r`A $2\ \text{kg}$ ball moving at $3\ \text{m s}^{-1}$ hits a wall and rebounds with the same speed. The magnitude of the impulse on the ball is:`,
    options: [
      { text: r`$12\ \text{N s}$`, correct: true, why: r`$\Delta p = 2(3) - 2(-3)$.` },
      { text: r`$6\ \text{N s}$`, why: "Ignores the reversal of direction." },
      { text: "zero", why: "Speed is unchanged but velocity reverses." },
      { text: r`$18\ \text{N s}$`, why: "Arithmetic slip." },
    ],
    solution: r`Impulse $= \Delta p = m(v_f - v_i) = 2(-3 - 3) = -12\ \text{N s}$; magnitude $12\ \text{N s}$, directed away from the wall.`,
    concept: "Impulse as change in momentum", formula: r`$J = \Delta p$`, whyFormula: "Momentum is a vector; the direction reverses.", mistakes: "Subtracting speeds instead of velocities.",
  },
  {
    topic: "conservation-of-linear-momentum", level: 4, difficulty: "MEDIUM", type: "NUMERICAL", time: 90, answer: 108,
    statement: r`A bomb at rest explodes into two fragments of $1\ \text{kg}$ and $2\ \text{kg}$. The $1\ \text{kg}$ fragment moves at $12\ \text{m s}^{-1}$. Find the total kinetic energy released (in J).`,
    solution: r`Momentum: $1\times12 = 2v \Rightarrow v = 6\ \text{m s}^{-1}$. KE $= \tfrac12(1)(144) + \tfrac12(2)(36) = 72 + 36 = 108\ \text{J}$.`,
    concept: "Explosion: momentum conserved, KE released", formula: r`$K = \dfrac{p^2}{2m}$`, whyFormula: "Equal momenta, so the lighter fragment has more KE.", mistakes: "Assuming equal speeds.",
  },
  {
    topic: "conservation-of-linear-momentum", level: 5, difficulty: "HARD", type: "MULTIPLE", time: 240,
    statement: r`A $60\ \text{kg}$ person stands at one end of a $40\ \text{kg}$ boat, $5\ \text{m}$ long, at rest on still water. The person walks to the other end. Neglect water resistance. Which statements are correct?`,
    options: [
      { text: r`The boat moves $3\ \text{m}$`, correct: true, why: r`$60x_p = 40x_b$, $x_p + x_b = 5$.` },
      { text: r`The person moves $2\ \text{m}$ relative to the shore`, correct: true, why: "5 − 3." },
      { text: "The centre of mass of the person and boat stays at rest", correct: true, why: "No external horizontal force; it started at rest." },
      { text: "The boat moves in the same direction as the person", why: "It moves opposite, keeping the centre of mass fixed." },
    ],
    solution: r`With no horizontal external force, the centre of mass stays fixed. Let the person move $x_p$ and the boat $x_b$ (opposite directions, relative to the shore): $60x_p = 40x_b$ and $x_p + x_b = 5$. So $x_p = 2\ \text{m}$, $x_b = 3\ \text{m}$.`,
    concept: "Centre of mass of an isolated system", formula: r`$m_1\Delta x_1 = m_2\Delta x_2$`, whyFormula: "Fixed centre of mass.", mistakes: "Taking the person's displacement relative to the shore as the boat length.",
  },
];
