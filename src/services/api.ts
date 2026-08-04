import type { 
  UserProfile, 
  Subject, 
  AISummary, 
  Flashcard, 
  QuizQuestion, 
  WeakTopic, 
  PlannerTask, 
  MemoryLoopItem, 
  TeamMember,
  ChatMessage,
  ApiResponse 
} from '../types';

import { 
  INITIAL_USER_PROFILE, 
  MOCK_SUBJECTS, 
  MOCK_FLASHCARDS, 
  MOCK_QUIZ_QUESTIONS, 
  MOCK_WEAK_TOPICS, 
  MOCK_PLANNER_TASKS, 
  MOCK_MEMORY_LOOP_ITEMS,
  HACKATHON_TEAM_MEMBERS,
  MOCK_CHAT_MESSAGES
} from '../data/mockData';

import { SAMPLE_NOTE_CELLULAR_RESPIRATION } from '../data/sampleNotes';

// Simulated Network Latency Delay Helper (300ms - 600ms)
const simulateLatency = (ms = 400): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * MindLoop API Service Module
 * 
 * NOTE FOR TEAMMATES (Backend, AI, Firebase, DB Engineers):
 * Replace these placeholder async functions with real fetch/Axios or Firebase Data Connect calls.
 * All return signatures use the standardized ApiResponse<T> interface.
 */

export const apiService = {
  /**
   * Fetch current authenticated User Profile stats & unlocked badges
   */
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    await simulateLatency(300);
    return {
      success: true,
      data: INITIAL_USER_PROFILE,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch list of active Subjects & Transformed PDFs
   */
  async getSubjects(): Promise<ApiResponse<Subject[]>> {
    await simulateLatency(400);
    return {
      success: true,
      data: MOCK_SUBJECTS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch AI Summary for a specific transformed document/subject
   */
  async getSummary(subjectId: string): Promise<ApiResponse<AISummary>> {
    await simulateLatency(350);
    const summary: AISummary = {
      id: `sum-${subjectId}`,
      subjectId: subjectId,
      title: SAMPLE_NOTE_CELLULAR_RESPIRATION.title,
      fileName: 'Cellular_Respiration_Bioenergetics.pdf',
      pageCount: 18,
      keyConcepts: SAMPLE_NOTE_CELLULAR_RESPIRATION.keyConcepts,
      formulas: SAMPLE_NOTE_CELLULAR_RESPIRATION.formulas,
      definitions: SAMPLE_NOTE_CELLULAR_RESPIRATION.definitions,
      examples: SAMPLE_NOTE_CELLULAR_RESPIRATION.examples,
      quotes: SAMPLE_NOTE_CELLULAR_RESPIRATION.quotes,
      transformedAt: new Date().toISOString()
    };
    return {
      success: true,
      data: summary,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch 3D Flashcards deck
   */
  async getFlashcards(subjectId?: string): Promise<ApiResponse<Flashcard[]>> {
    await simulateLatency(300);
    return {
      success: true,
      data: MOCK_FLASHCARDS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch Adaptive Practice Quiz questions
   */
  async getQuizQuestions(subjectId?: string): Promise<ApiResponse<QuizQuestion[]>> {
    await simulateLatency(350);
    return {
      success: true,
      data: MOCK_QUIZ_QUESTIONS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch AI Weak Topics & Radar data
   */
  async getWeakTopics(): Promise<ApiResponse<WeakTopic[]>> {
    await simulateLatency(400);
    return {
      success: true,
      data: MOCK_WEAK_TOPICS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch Today's Planner tasks
   */
  async getPlannerTasks(): Promise<ApiResponse<PlannerTask[]>> {
    await simulateLatency(300);
    return {
      success: true,
      data: MOCK_PLANNER_TASKS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch Spaced Repetition items due today
   */
  async getMemoryLoopItems(): Promise<ApiResponse<MemoryLoopItem[]>> {
    await simulateLatency(350);
    return {
      success: true,
      data: MOCK_MEMORY_LOOP_ITEMS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch 4-Member Hackathon Team members & leaderboard
   */
  async getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
    await simulateLatency(300);
    return {
      success: true,
      data: HACKATHON_TEAM_MEMBERS,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Process PDF/Note Upload and return generated summary & 3D cards metadata
   */
  async uploadDocument(fileName: string): Promise<ApiResponse<{ documentId: string; title: string }>> {
    await simulateLatency(800);
    return {
      success: true,
      data: {
        documentId: `doc-${Date.now()}`,
        title: fileName
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Send query to grounded AI Chat assistant and return response with PDF citations
   */
  async sendChatMessage(message: string): Promise<ApiResponse<ChatMessage>> {
    await simulateLatency(600);
    const aiMessage: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      sender: 'ai',
      text: `Based strictly on your uploaded notes regarding "${message}":\n\nThe mitochondrial inner membrane maintains a tight proton barrier. Electrons flow through Complexes I, III, and IV to build the Proton Motive Force (PMF).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          documentName: 'Cellular_Respiration_Bioenergetics.pdf',
          page: 16,
          paragraphSnippet: 'Section 5.2: Proton Motive Force calculation.'
        }
      ],
      suggestedFollowUps: [
        'Calculate ATP yield for 1 NADH vs FADH2.',
        'Explain Complex II electron transport.'
      ]
    };
    return {
      success: true,
      data: aiMessage,
      timestamp: new Date().toISOString()
    };
  }
};
