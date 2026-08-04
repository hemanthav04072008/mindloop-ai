import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { QuickUploadModal } from './components/QuickUploadModal';
import { FocusModeModal } from './components/FocusModeModal';
import { ShareModal } from './components/ShareModal';
import { ToastContainer, type ToastMessage } from './components/Toast';
import { DashboardSkeleton } from './components/LoadingSkeleton';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SummaryPage } from './pages/SummaryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { WeakTopicsPage } from './pages/WeakTopicsPage';
import { PlannerPage } from './pages/PlannerPage';
import { ChatPage } from './pages/ChatPage';
import { ConceptMapPage } from './pages/ConceptMapPage';
import { ProfilePage } from './pages/ProfilePage';

import type { UserProfile, Subject, Flashcard, QuizQuestion, WeakTopic, PlannerTask, MemoryLoopItem } from './types';
import { apiService } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([]);
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([]);
  const [memoryItems, setMemoryItems] = useState<MemoryLoopItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [userRes, subjectsRes, fcRes, quizRes, wtRes, ptRes, memRes] = await Promise.all([
        apiService.getUserProfile(),
        apiService.getSubjects(),
        apiService.getFlashcards(),
        apiService.getQuizQuestions(),
        apiService.getWeakTopics(),
        apiService.getPlannerTasks(),
        apiService.getMemoryLoopItems()
      ]);

      if (userRes.data) setUserProfile(userRes.data);
      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (fcRes.data) setFlashcards(fcRes.data);
      if (quizRes.data) setQuizQuestions(quizRes.data);
      if (wtRes.data) setWeakTopics(wtRes.data);
      if (ptRes.data) setPlannerTasks(ptRes.data);
      if (memRes.data) setMemoryItems(memRes.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize MindLoop API services.');
    } finally {
      setIsLoading(false);
    }
  };

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUploadSuccess = async (docTitle: string) => {
    const res = await apiService.uploadDocument(docTitle);
    if (res.success) {
      addToast('xp', 'Note Transformed!', `Ingested ${docTitle}. Generated 32 Flashcards & AI Summary.`);
      setActiveTab('summary');
    }
  };

  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen bg-[#09090B] text-slate-100 p-8 flex flex-col justify-center items-center">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        user={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenFocusMode={() => setIsFocusModeOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Render Sidebar if not on public landing page */}
        {activeTab !== 'landing' && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            examReadiness={userProfile.examReadinessPercent}
          />
        )}

        {/* Dynamic Page Container */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${activeTab === 'landing' ? 'max-w-full' : ''}`}>
          
          {error && (
            <div className="glass-panel p-4 mb-6 border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={loadInitialData}
                className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-white font-semibold"
              >
                Retry Request
              </button>
            </div>
          )}

          {activeTab === 'landing' && (
            <LandingPage
              onGetStarted={() => {
                addToast('info', 'Welcome to MindLoop', 'Viewing interactive student dashboard.');
                setActiveTab('dashboard');
              }}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              user={userProfile}
              subjects={subjects}
              memoryItems={memoryItems}
              setActiveTab={setActiveTab}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'library' && (
            <DashboardPage
              user={userProfile}
              subjects={subjects}
              memoryItems={memoryItems}
              setActiveTab={setActiveTab}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'summary' && (
            <SummaryPage 
              setActiveTab={setActiveTab} 
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsPage cards={flashcards} />
          )}

          {activeTab === 'quiz' && (
            <QuizPage questions={quizQuestions} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'weak-topics' && (
            <WeakTopicsPage weakTopics={weakTopics} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'planner' && (
            <PlannerPage tasks={plannerTasks} />
          )}

          {activeTab === 'chat' && (
            <ChatPage />
          )}

          {activeTab === 'concept-map' && (
            <ConceptMapPage setActiveTab={setActiveTab} />
          )}

          {activeTab === 'profile' && (
            <ProfilePage user={userProfile} />
          )}

        </main>
      </div>

      {/* Global Modals */}
      <QuickUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <FocusModeModal
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}

export default App;
