import React, { useState } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers,
  ThumbsUp,
  ThumbsDown,
  Volume2
} from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardsPageProps {
  cards: Flashcard[];
  onCompleteSession?: () => void;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({ cards, onCompleteSession }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardDeck, setCardDeck] = useState<Flashcard[]>(cards);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(cards.filter(c => c.isFavorite).map(c => c.id)));
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set(cards.filter(c => c.isMastered).map(c => c.id)));

  const currentCard = cardDeck[currentIndex] || cardDeck[0];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardDeck.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardDeck.length) % cardDeck.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
    setCardDeck(shuffled);
    setCurrentIndex(0);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const markMastery = (isEasy: boolean) => {
    if (isEasy) {
      setMasteredIds((prev) => new Set(prev).add(currentCard.id));
    }
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header & Deck Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 border border-white/15">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Interactive 3D Deck</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-[#Outfit]">
            Cellular Respiration Flashcard Loop
          </h1>
        </div>

        {/* Deck Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-[#4ECDC4]" />
            <span>Shuffle Deck</span>
          </button>

          <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
            Card {currentIndex + 1} of {cardDeck.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-emerald-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cardDeck.length) * 100}%` }}
        />
      </div>

      {/* 3D FLIP CARD CONTAINER */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="perspective-1000 w-full aspect-[4/2.6] sm:aspect-[4/2.2] cursor-pointer group select-none"
      >
        <div 
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* FRONT OF CARD (QUESTION) */}
          <div className="absolute inset-0 backface-hidden glass-panel p-8 sm:p-12 flex flex-col justify-between border-2 border-white/15 group-hover:border-[#6C63FF]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                currentCard.difficulty === 'Easy' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : currentCard.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                {currentCard.difficulty} Difficulty
              </span>

              <button
                onClick={(e) => toggleFavorite(currentCard.id, e)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Star className={`w-5 h-5 ${
                  favoriteIds.has(currentCard.id)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-400'
                }`} />
              </button>
            </div>

            <div className="my-auto text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[#Outfit] leading-relaxed max-w-xl mx-auto">
                {currentCard.question}
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full border border-[#6C63FF]/20">
                <RotateCw className="w-3.5 h-3.5" />
                Click card to reveal answer
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
              <span>Cellular Respiration • Question</span>
              <span>Spacebar to flip</span>
            </div>

          </div>

          {/* BACK OF CARD (ANSWER) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-8 sm:p-12 flex flex-col justify-between border-2 border-[#4ECDC4]/40 bg-[#13131A]/90 shadow-[0_20px_60px_rgba(78,205,196,0.2)]">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4ECDC4] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
                Verified AI Answer
              </span>

              <button
                onClick={(e) => toggleFavorite(currentCard.id, e)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Star className={`w-5 h-5 ${
                  favoriteIds.has(currentCard.id)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-400'
                }`} />
              </button>
            </div>

            <div className="my-auto text-center space-y-4">
              <p className="text-lg sm:text-xl font-bold text-emerald-300 leading-relaxed max-w-xl mx-auto">
                {currentCard.answer}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
              <span>Card {currentIndex + 1} Answer</span>
              <span>Click to flip back</span>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER CONTROLS & MASTERY RATING */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 border border-white/15">
        
        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Rate Confidence:</span>
          
          <button
            onClick={() => markMastery(false)}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-400 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Mark Hard</span>
          </button>

          <button
            onClick={() => markMastery(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-400 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Mastered (+10 XP)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
