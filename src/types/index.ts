export interface Subject {
  id: string;
  title: string;
  category: string;
  icon: string;
  readinessScore: number;
  lastStudied: string;
  totalCards: number;
  masteredCards: number;
  weakTopicCount: number;
  hoursSpent: number;
  summaryPreview: string;
  color: string;
}

export type PDFDocument = Subject;

export interface AISummary {
  id: string;
  subjectId: string;
  title: string;
  fileName: string;
  pageCount: number;
  keyConcepts: string[];
  formulas: {
    title: string;
    latex: string;
    explanation: string;
  }[];
  definitions: {
    term: string;
    definition: string;
  }[];
  examples: string[];
  quotes: string[];
  transformedAt: string;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lastReviewed?: string;
  nextReviewDays?: number;
  isFavorite?: boolean;
  isMastered?: boolean;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  type: 'mcq' | 'tf' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  topicTag: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WeakTopic {
  id: string;
  subject: string;
  topicName: string;
  confidenceScore: number; // 0 - 100
  errorRate: number; // %
  lastTested: string;
  recommendation: string;
  urgency: 'High' | 'Medium' | 'Low';
}

export interface AnalyticsData {
  knowledgeScore: number;
  examReadinessGrade: string;
  sevenDayRetention: number;
  weakTopics: WeakTopic[];
  strongTopicsCount: number;
}

export interface PlannerTask {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  timeSlot: string;
  durationMinutes: number;
  type: 'Flashcards' | 'Quiz' | 'Summary Review' | 'Weak Spot Drill';
  isCompleted: boolean;
  date: string; // YYYY-MM-DD
}

export interface MemoryLoopItem {
  id: string;
  conceptTitle: string;
  subjectName: string;
  daysSinceLastReview: number;
  retentionProbability: number; // 0 - 100%
  status: 'Review Today' | 'Optimal' | 'Fading';
  difficultyScore: number;
}

export interface ConceptNode {
  id: string;
  label: string;
  category: string;
  mastery: number; // %
  connections: string[]; // target node ids
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: {
    documentName: string;
    page: number;
    paragraphSnippet: string;
  }[];
  suggestedFollowUps?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  xp: number;
  streak: number;
  status: 'Online' | 'In Quiz' | 'Focusing';
  cardsMastered: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  xp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  streakDays: number;
  hoursStudiedTotal: number;
  cardsCompletedTotal: number;
  overallQuizAccuracy: number;
  examReadinessPercent: number;
  badges: {
    id: string;
    title: string;
    icon: string;
    unlockedAt: string;
    description: string;
  }[];
}

export type User = UserProfile;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
