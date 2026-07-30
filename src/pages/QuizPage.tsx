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
  Target
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
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
                <h2 className="text-base font-bold text-white">
                  Question {currentIdx + 1} of {questions.length}
                </h2>
              </div>
            </div>

            {/* Adaptive Difficulty Badge & Timer */}
            <div className="flex items-center gap-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                currentQ.difficulty === 'Hard'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30'
              }`}>
                ⚡ {currentQ.difficulty} Level
              </span>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-amber-400">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{timeLeft}s</span>
              </div>
            </div>
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
        /* QUIZ RESULTS PAGE & LEADERBOARD */
        <div className="glass-panel p-8 text-center space-y-6 border border-white/20 animate-fadeIn">
          
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

          <div className="flex items-center justify-center gap-4 pt-4">
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
