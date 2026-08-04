import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Flame,
  Zap,
  Target,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizPageProps {
  questions: QuizQuestion[];
  setActiveTab: (tab: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ questions, setActiveTab }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30s per question
  const [userAnswers, setUserAnswers] = useState<Record<string, { isCorrect: boolean; userAns: string }>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentQ = questions[currentIdx] || questions[0];

  useEffect(() => {
    let timer: any = null;
    if (!isSubmitted && !isQuizComplete && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitAnswer();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, isQuizComplete]);

  const handleSelect = (opt: string) => {
    if (!isSubmitted) setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let isCorrect = false;
    let finalAns = selectedOption || textAnswer;

    if (currentQ.type === 'tf') {
      isCorrect = finalAns === currentQ.correctAnswer.toString();
    } else if (currentQ.type === 'mcq') {
      isCorrect = finalAns === currentQ.correctAnswer;
    } else {
      isCorrect = textAnswer.trim().toLowerCase().includes(currentQ.correctAnswer.toString().toLowerCase());
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { isCorrect, userAns: finalAns }
    }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setTextAnswer('');
      setIsSubmitted(false);
      setTimeLeft(30);
    } else {
      setIsQuizComplete(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setTextAnswer('');
    setIsSubmitted(false);
    setScore(0);
    setIsQuizComplete(false);
    setTimeLeft(30);
    setUserAnswers({});
  };

  const timerColor = timeLeft > 15 ? '#4ECDC4' : timeLeft > 7 ? '#FFB84D' : '#FF4757';
  const progressPercentage = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      {!isQuizComplete ? (
        <>
          {/* Top Bar: Progress & Timer */}
          <div className="glass-panel p-5 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
                  Adaptive Quiz Loop
                </span>
                <h2 className="text-base font-bold text-white font-[#Outfit]">
                  Question {currentIdx + 1} of {questions.length}
                </h2>
              </div>
            </div>

            {/* Adaptive Difficulty Badge, Sound & Timer Ring */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#4ECDC4]" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <span className={`text-xs font-bold px-3 py-1 rounded-full border hidden sm:inline-block ${
                currentQ.difficulty === 'Hard'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30'
              }`}>
                ⚡ {currentQ.difficulty} Level
              </span>

              {/* SVG Circular Timer Ring */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke={timerColor}
                    strokeDasharray={`${(timeLeft / 30) * 100}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    className="stroke-current transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-mono font-extrabold text-white">
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border border-white/15">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Topic Tag: <span className="text-[#4ECDC4]">{currentQ.topicTag}</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-[#Outfit] leading-relaxed">
                {currentQ.question}
              </h1>
            </div>

            {/* OPTIONS AREA */}
            {currentQ.type === 'mcq' || currentQ.type === 'tf' ? (
              <div className="space-y-3">
                {currentQ.options?.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let borderStyle = 'border-white/10 hover:border-[#6C63FF]/50 bg-white/[0.03]';
                  
                  if (isSubmitted) {
                    if (opt === currentQ.correctAnswer) {
                      borderStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300';
                    } else if (isSelected && opt !== currentQ.correctAnswer) {
                      borderStyle = 'border-rose-500 bg-rose-500/15 text-rose-300';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-[#6C63FF] bg-[#6C63FF]/20 text-white shadow-md';
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelect(opt)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${borderStyle}`}
                    >
                      <span className="text-sm font-medium">{opt}</span>
                      {isSubmitted && opt === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {isSubmitted && isSelected && opt !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Short Answer input */
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={isSubmitted}
                  className="w-full p-4 rounded-2xl bg-white/[0.04] text-white border border-white/15 focus:border-[#4ECDC4] focus:outline-none"
                />
              </div>
            )}

            {/* AI Explanation feedback */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-[#13131A] border border-white/15 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4]">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Learning Feedback</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption && !textAnswer}
                  className="btn-primary-glow px-6 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <span>Submit Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="btn-secondary-glow px-6 py-3 rounded-xl text-xs font-bold text-slate-900 flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </>
      ) : (
        /* QUIZ RESULTS PAGE & DETAILED BREAKDOWN */
        <div className="glass-panel p-8 space-y-8 border border-white/20 animate-fadeIn">
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#4ECDC4] p-1 mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(108,99,255,0.5)]">
              <div className="w-full h-full bg-[#13131A] rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-white font-[#Outfit]">
                Quiz Completed!
              </h1>
              <p className="text-sm text-slate-300">
                You scored <span className="text-[#4ECDC4] font-bold">{score} out of {questions.length}</span> ({Math.round((score / questions.length) * 100)}%)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto flex items-center justify-around">
              <div>
                <div className="text-xl font-bold text-emerald-400">+{score * 25} XP</div>
                <div className="text-[11px] text-slate-400">Earned</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-xl font-bold text-[#4ECDC4]">+4%</div>
                <div className="text-[11px] text-slate-400">Exam Readiness</div>
              </div>
            </div>
          </div>

          {/* DETAILED QUESTION BREAKDOWN */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#4ECDC4]" />
              <span>Answer Breakdown & Explanations</span>
            </h3>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userRes = userAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                      {userRes?.isCorrect ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct (+25 XP)
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-white">{q.question}</h4>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">Correct Answer:</span>{' '}
                      <span className="text-emerald-300 font-semibold">{q.correctAnswer.toString()}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 italic pt-1">
                      Explanation: {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('weak-topics')}
              className="btn-primary-glow px-6 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>View Weak Topics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
