import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { QuickUploadModal } from './components/QuickUploadModal';
import { FocusModeModal } from './components/FocusModeModal';
import { ShareModal } from './components/ShareModal';

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

import { 
  INITIAL_USER_PROFILE, 
  MOCK_SUBJECTS, 
  MOCK_FLASHCARDS, 
  MOCK_QUIZ_QUESTIONS, 
  MOCK_WEAK_TOPICS, 
  MOCK_PLANNER_TASKS, 
  MOCK_MEMORY_LOOP_ITEMS 
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  
  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleUploadSuccess = (docTitle: string) => {
    setActiveTab('summary');
  };

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
          
          {activeTab === 'landing' && (
            <LandingPage
              onGetStarted={() => setActiveTab('dashboard')}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              user={userProfile}
              subjects={subjects}
              memoryItems={MOCK_MEMORY_LOOP_ITEMS}
              setActiveTab={setActiveTab}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeTab === 'library' && (
            <DashboardPage
              user={userProfile}
              subjects={subjects}
              memoryItems={MOCK_MEMORY_LOOP_ITEMS}
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
            <FlashcardsPage cards={MOCK_FLASHCARDS} />
          )}

          {activeTab === 'quiz' && (
            <QuizPage questions={MOCK_QUIZ_QUESTIONS} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'weak-topics' && (
            <WeakTopicsPage weakTopics={MOCK_WEAK_TOPICS} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'planner' && (
            <PlannerPage tasks={MOCK_PLANNER_TASKS} />
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

    </div>
  );
}

export default App;
