import { 
  Subject, 
  Flashcard, 
  QuizQuestion, 
  WeakTopic, 
  PlannerTask, 
  MemoryLoopItem, 
  ConceptNode, 
  ChatMessage, 
  UserProfile 
} from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@stanford.edu",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  xp: 3420,
  level: 14,
  levelTitle: "Neural Architect",
  nextLevelXp: 4000,
  streakDays: 7,
  hoursStudiedTotal: 48.5,
  cardsCompletedTotal: 342,
  overallQuizAccuracy: 88,
  examReadinessPercent: 86,
  badges: [
    { id: 'b1', title: 'Memory Master', icon: '🧠', unlockedAt: '2026-07-28', description: 'Maintained 90%+ retention on 50 consecutive flashcards.' },
    { id: 'b2', title: 'Night Owl', icon: '🦉', unlockedAt: '2026-07-25', description: 'Completed a 2-hour study session after midnight.' },
    { id: 'b3', title: 'Quiz Whiz', icon: '⚡', unlockedAt: '2026-07-20', description: 'Scored 100% on an Adaptive Hard level Quiz.' },
    { id: 'b4', title: '7-Day Streak', icon: '🔥', unlockedAt: 'Today', description: 'Studied every day for a full week without missing.' },
    { id: 'b5', title: 'Concept Weaver', icon: '🌐', unlockedAt: '2026-07-15', description: 'Connected 20+ concepts in the Mind Map visualizer.' }
  ]
};

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'sub-bio',
    title: 'Cellular Respiration & Bioenergetics',
    category: 'Molecular Biology',
    icon: 'Dna',
    readinessScore: 88,
    lastStudied: '2 hours ago',
    totalCards: 32,
    masteredCards: 26,
    weakTopicCount: 2,
    hoursSpent: 14.2,
    summaryPreview: 'Detailed study of Glycolysis, Krebs Cycle, Pyruvate Oxidation, Electron Transport Chain, and Oxidative Phosphorylation yield.',
    color: '#6C63FF'
  },
  {
    id: 'sub-quant',
    title: 'Quantum Mechanics & Wave Functions',
    category: 'Physics',
    icon: 'Atom',
    readinessScore: 74,
    lastStudied: 'Yesterday',
    totalCards: 28,
    masteredCards: 18,
    weakTopicCount: 3,
    hoursSpent: 18.0,
    summaryPreview: 'Schrödinger equation solutions, wave-particle duality, Heisenberg uncertainty principle, quantum tunneling, and Hilbert space vector notation.',
    color: '#4ECDC4'
  },
  {
    id: 'sub-chem',
    title: 'Organic Chemistry Mechanisms',
    category: 'Chemistry',
    icon: 'FlaskConical',
    readinessScore: 92,
    lastStudied: '3 days ago',
    totalCards: 40,
    masteredCards: 37,
    weakTopicCount: 1,
    hoursSpent: 16.3,
    summaryPreview: 'SN1 vs SN2 nucleophilic substitutions, E1/E2 elimination reactions, Markovnikov addition rules, and aromaticity criteria.',
    color: '#FFB84D'
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subjectId: 'sub-bio',
    question: 'What is the net ATP yield per glucose molecule produced solely during Glycolysis?',
    answer: '2 ATP net (4 ATP produced minus 2 ATP consumed during the preparatory energy investment phase).',
    difficulty: 'Easy',
    isFavorite: true,
    isMastered: true
  },
  {
    id: 'fc-2',
    subjectId: 'sub-bio',
    question: 'Where does the Krebs Cycle (Citric Acid Cycle) take place in eukaryotic cells?',
    answer: 'In the mitochondrial matrix, where acetyl-CoA is combined with oxaloacetate to form citrate.',
    difficulty: 'Medium',
    isFavorite: false,
    isMastered: true
  },
  {
    id: 'fc-3',
    subjectId: 'sub-bio',
    question: 'What enzyme drives ATP synthesis by utilizing the proton gradient across the inner mitochondrial membrane?',
    answer: 'ATP Synthase (Complex V), which acts as a rotary motor driven by the proton motive force (PMF).',
    difficulty: 'Hard',
    isFavorite: true,
    isMastered: false
  },
  {
    id: 'fc-4',
    subjectId: 'sub-bio',
    question: 'What is the terminal electron acceptor in the mitochondrial electron transport chain during aerobic respiration?',
    answer: 'Molecular Oxygen (O₂), which reacts with protons and electrons to form water (H₂O).',
    difficulty: 'Easy',
    isFavorite: false,
    isMastered: true
  },
  {
    id: 'fc-5',
    subjectId: 'sub-bio',
    question: 'How many NADH molecules are generated per single molecule of glucose through complete aerobic respiration?',
    answer: '10 NADH total (2 from Glycolysis, 2 from Pyruvate Oxidation, and 6 from the Krebs Cycle).',
    difficulty: 'Medium',
    isFavorite: false,
    isMastered: false
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    subjectId: 'sub-bio',
    type: 'mcq',
    question: 'Which complex in the electron transport chain does NOT directly pump protons across the inner mitochondrial membrane?',
    options: [
      'Complex I (NADH dehydrogenase)',
      'Complex II (Succinate dehydrogenase)',
      'Complex III (Cytochrome bc1 complex)',
      'Complex IV (Cytochrome c oxidase)'
    ],
    correctAnswer: 'Complex II (Succinate dehydrogenase)',
    explanation: 'Complex II accepts electrons from FADH₂ and transfers them to Coenzyme Q without pumping protons across the membrane.',
    topicTag: 'Electron Transport Chain',
    difficulty: 'Hard'
  },
  {
    id: 'q-2',
    subjectId: 'sub-bio',
    type: 'tf',
    question: 'Glycolysis requires molecular oxygen to convert glucose into pyruvate.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Glycolysis is an anaerobic pathway occurring in the cytoplasm; oxygen is only required downstream for oxidative phosphorylation.',
    topicTag: 'Glycolysis',
    difficulty: 'Easy'
  },
  {
    id: 'q-3',
    subjectId: 'sub-bio',
    type: 'mcq',
    question: 'What 4-carbon molecule binds with Acetyl-CoA to initiate the Citric Acid Cycle?',
    options: ['Citrate', 'Oxaloacetate', 'α-Ketoglutarate', 'Malate'],
    correctAnswer: 'Oxaloacetate',
    explanation: 'Oxaloacetate (4C) condenses with Acetyl-CoA (2C) catalyzed by citrate synthase to form Citrate (6C).',
    topicTag: 'Krebs Cycle',
    difficulty: 'Medium'
  },
  {
    id: 'q-4',
    subjectId: 'sub-bio',
    type: 'short',
    question: 'Name the regulatory enzyme that acts as the primary rate-limiting step of Glycolysis.',
    correctAnswer: 'Phosphofructokinase-1',
    explanation: 'Phosphofructokinase-1 (PFK-1) is allosterically inhibited by high ATP and citrate levels and activated by AMP and F2,6BP.',
    topicTag: 'Glycolysis Regulation',
    difficulty: 'Hard'
  }
];

export const MOCK_WEAK_TOPICS: WeakTopic[] = [
  {
    id: 'wt-1',
    subject: 'Cellular Respiration',
    topicName: 'Complex II Electron Transfer Dynamics',
    confidenceScore: 42,
    errorRate: 58,
    lastTested: 'Today',
    recommendation: 'Review how FADH₂ enters Complex II and bypasses the first proton pumping site.',
    urgency: 'High'
  },
  {
    id: 'wt-2',
    subject: 'Quantum Mechanics',
    topicName: 'Infinite Square Well Eigenstates',
    confidenceScore: 54,
    errorRate: 46,
    lastTested: 'Yesterday',
    recommendation: 'Practice wave function normalization calculations and parity symmetry rules.',
    urgency: 'High'
  },
  {
    id: 'wt-3',
    subject: 'Cellular Respiration',
    topicName: 'Allosteric Regulation of PFK-1',
    confidenceScore: 65,
    errorRate: 35,
    lastTested: '3 days ago',
    recommendation: 'Solve 5 targeted multiple choice questions on ATP/AMP ratio feedback loops.',
    urgency: 'Medium'
  },
  {
    id: 'wt-4',
    subject: 'Organic Chemistry',
    topicName: 'Stereochemical Outcomes of SN1 vs SN2',
    confidenceScore: 71,
    errorRate: 29,
    lastTested: '4 days ago',
    recommendation: 'Review Walden inversion vs racemization mechanisms.',
    urgency: 'Low'
  }
];

export const MOCK_PLANNER_TASKS: PlannerTask[] = [
  {
    id: 'task-1',
    subjectId: 'sub-bio',
    subjectName: 'Cellular Respiration',
    title: 'Review 15 Spaced Flashcards (Memory Loop™)',
    timeSlot: '09:00 AM',
    durationMinutes: 20,
    type: 'Flashcards',
    isCompleted: true,
    date: '2026-07-30'
  },
  {
    id: 'task-2',
    subjectId: 'sub-bio',
    subjectName: 'Cellular Respiration',
    title: 'Drill Weak Spot: Complex II & Proton Gradient',
    timeSlot: '11:30 AM',
    durationMinutes: 25,
    type: 'Weak Spot Drill',
    isCompleted: true,
    date: '2026-07-30'
  },
  {
    id: 'task-3',
    subjectId: 'sub-quant',
    subjectName: 'Quantum Mechanics',
    title: 'Solve Adaptive Practice Quiz (8 Questions)',
    timeSlot: '03:00 PM',
    durationMinutes: 30,
    type: 'Quiz',
    isCompleted: false,
    date: '2026-07-30'
  },
  {
    id: 'task-4',
    subjectId: 'sub-chem',
    subjectName: 'Organic Chemistry',
    title: 'Read AI Summary of SN1/SN2 Substitution',
    timeSlot: '06:00 PM',
    durationMinutes: 15,
    type: 'Summary Review',
    isCompleted: false,
    date: '2026-07-30'
  }
];

export const MOCK_MEMORY_LOOP_ITEMS: MemoryLoopItem[] = [
  {
    id: 'mem-1',
    conceptTitle: 'Complex II FADH₂ Pathway',
    subjectName: 'Cellular Respiration',
    daysSinceLastReview: 4,
    retentionProbability: 45,
    status: 'Review Today',
    difficultyScore: 8.5
  },
  {
    id: 'mem-2',
    conceptTitle: 'Pyruvate Dehydrogenase Reaction',
    subjectName: 'Cellular Respiration',
    daysSinceLastReview: 2,
    retentionProbability: 68,
    status: 'Review Today',
    difficultyScore: 6.2
  },
  {
    id: 'mem-3',
    conceptTitle: 'Schrödinger Time-Independent Eq',
    subjectName: 'Quantum Mechanics',
    daysSinceLastReview: 1,
    retentionProbability: 88,
    status: 'Optimal',
    difficultyScore: 4.1
  },
  {
    id: 'mem-4',
    conceptTitle: 'SN2 Stereospecific Inversion',
    subjectName: 'Organic Chemistry',
    daysSinceLastReview: 5,
    retentionProbability: 52,
    status: 'Fading',
    difficultyScore: 7.0
  }
];

export const MOCK_CONCEPT_NODES: ConceptNode[] = [
  {
    id: 'node-1',
    label: 'Glucose Breakdown',
    category: 'Glycolysis',
    mastery: 95,
    connections: ['node-2', 'node-3'],
    description: 'Initial cleavage of 6-carbon glucose into two 3-carbon pyruvate molecules.'
  },
  {
    id: 'node-2',
    label: 'Pyruvate Oxidation',
    category: 'Link Reaction',
    mastery: 82,
    connections: ['node-4'],
    description: 'Decarboxylation of pyruvate into Acetyl-CoA with production of NADH.'
  },
  {
    id: 'node-3',
    label: 'PFK-1 Allosteric Control',
    category: 'Regulation',
    mastery: 65,
    connections: ['node-1'],
    description: 'Rate-limiting enzymatic control modulated by ATP, AMP, and Citrate.'
  },
  {
    id: 'node-4',
    label: 'Krebs Cycle (TCA)',
    category: 'Mitochondrial Matrix',
    mastery: 88,
    connections: ['node-5', 'node-6'],
    description: 'Cyclic enzymatic pathway reducing NAD+ to NADH and FAD to FADH2.'
  },
  {
    id: 'node-5',
    label: 'Complex II (Succinate DH)',
    category: 'Weak Spot',
    mastery: 42,
    connections: ['node-6'],
    description: 'Membrane-bound complex connecting Krebs cycle directly to electron transfer.'
  },
  {
    id: 'node-6',
    label: 'Proton Gradient & ATP Synthase',
    category: 'Chemiosmosis',
    mastery: 78,
    connections: ['node-1'],
    description: 'Electrochemical motive force driving rotary phosphorylation of ADP to ATP.'
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Why does FADH2 produce fewer ATP molecules than NADH in the electron transport chain?',
    timestamp: '10:42 AM'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'FADH₂ yields approximately 1.5 ATP compared to 2.5 ATP from NADH because FADH₂ feeds its high-energy electrons directly into **Complex II (Succinate Dehydrogenase)** rather than Complex I.\n\nSince Complex II does not span across the membrane to pump protons, electrons from FADH₂ bypass the first proton-pumping stage. Consequently, fewer total H⁺ ions are accumulated in the intermembrane space per electron pair, producing less proton motive force to drive ATP Synthase.',
    timestamp: '10:42 AM',
    citations: [
      {
        documentName: 'Cellular_Respiration_Bioenergetics.pdf',
        page: 14,
        paragraphSnippet: 'Section 4.3: Complex II accepts electrons from succinate via bound FADH2, transferring them to ubiquinone without proton translocation.'
      },
      {
        documentName: 'Cellular_Respiration_Bioenergetics.pdf',
        page: 18,
        paragraphSnippet: 'Table 5.1: Comparative ATP Stoichiometry per Electron Pair (NADH vs FADH2).'
      }
    ],
    suggestedFollowUps: [
      'What is the total P/O ratio for NADH vs FADH2?',
      'How does dinitrophenol (DNP) uncouple this proton gradient?',
      'Generate a quick 3-question quiz on Complex II.'
    ]
  }
];

export const AI_MOTIVATIONAL_QUOTES = [
  { quote: "Repetition is the mother of learning, but adaptive spacing is the father of mastery.", author: "MindLoop AI Engine" },
  { quote: "The brain remembers what it actively retrieves, not what it passively re-reads.", author: "Cognitive Neuroscience Principles" },
  { quote: "Every weak topic identified today becomes your strongest exam advantage tomorrow.", author: "MindLoop Learning Loop" }
];
