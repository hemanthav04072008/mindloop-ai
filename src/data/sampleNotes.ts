export interface NoteSection {
  title: string;
  keyConcepts: string[];
  formulas: { title: string; latex: string; explanation: string }[];
  definitions: { term: string; definition: string }[];
  examples: string[];
  quotes: string[];
}

export const SAMPLE_NOTE_CELLULAR_RESPIRATION: NoteSection = {
  title: "Cellular Respiration & Bioenergetics Master Summary",
  keyConcepts: [
    "Aerobic respiration occurs in four main stages: Glycolysis, Pyruvate Oxidation, Citric Acid (Krebs) Cycle, and Oxidative Phosphorylation.",
    "Glycolysis is an anaerobic cytoplasmic process producing 2 net ATP, 2 NADH, and 2 Pyruvate molecules from 1 Glucose.",
    "Pyruvate Dehydrogenase Complex converts pyruvate into Acetyl-CoA in the mitochondrial matrix while reducing NAD+ to NADH and releasing CO₂.",
    "Krebs Cycle oxidizes Acetyl-CoA into CO₂, producing 3 NADH, 1 FADH₂, and 1 GTP/ATP per cycle (x2 per glucose).",
    "Oxidative Phosphorylation creates a proton electrochemical gradient across the inner mitochondrial membrane via Complex I, III, and IV.",
    "ATP Synthase utilizes the proton motive force through chemiosmosis to phosphorylate ADP into ATP, yielding ~28-32 ATP per glucose."
  ],
  formulas: [
    {
      title: "Overall Aerobic Respiration Equation",
      latex: "C_6H_{12}O_6 + 6 O_2 \\longrightarrow 6 CO_2 + 6 H_2O + \\text{30–32 ATP}",
      explanation: "Complete oxidation of 1 mol glucose with oxygen yields carbon dioxide, water, and usable energy."
    },
    {
      title: "Glycolysis Net Stoichiometry",
      latex: "\\text{Glucose} + 2 \\text{NAD}^+ + 2 \\text{ADP} + 2 P_i \\longrightarrow 2 \\text{Pyruvate} + 2 \\text{NADH} + 2 H^+ + 2 \\text{ATP}",
      explanation: "Anaerobic breakdown of 6-carbon hexose into two 3-carbon pyruvate molecules."
    },
    {
      title: "Proton Motive Force (PMF)",
      latex: "\\Delta p = \\Delta \\psi - \\frac{2.3 RT}{F} \\Delta \\text{pH}",
      explanation: "Combines electrical membrane potential (Δψ) and chemical proton concentration gradient (ΔpH)."
    }
  ],
  definitions: [
    {
      term: "Chemiosmosis",
      definition: "The movement of ions across a semipermeable membrane bound structure, down their electrochemical gradient, used to generate ATP."
    },
    {
      term: "Substrate-Level Phosphorylation",
      definition: "Direct enzymatic synthesis of ATP by transferring a phosphate group from a high-energy substrate intermediate directly to ADP."
    },
    {
      term: "Allosteric Inhibition",
      definition: "Regulation of enzyme activity by binding an effector molecule at a site other than the active site (e.g., ATP binding to PFK-1)."
    }
  ],
  examples: [
    "Dinitrophenol (DNP) uncouples proton pumping from ATP synthesis by carrying H+ across the membrane without passing through ATP Synthase, dissipating energy purely as heat.",
    "Rigor mortis occurs post-mortem due to lack of ATP, preventing myosin heads from detaching from actin filaments."
  ],
  quotes: [
    "Life is nothing but an electron looking for a place to rest.",
    "The proton motive force bridges the energy of redox reactions directly to mechanical rotational synthesis of ATP."
  ]
};
