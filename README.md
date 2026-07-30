# MindLoop — AI Spaced Repetition & Adaptive Learning Platform

MindLoop is an ultra-modern AI learning platform designed with a glassmorphism + neumorphism hybrid aesthetic. It transforms notes and PDFs into executive summaries, 3D flip flashcards, adaptive quizzes, weak-topic radar analysis, spaced-repetition study plans, floating AI chat with page citations, and gamified mastery tracking.

## 🚀 Quick Start Instructions

### 1. Open in VS Code
Open VS Code, press `Ctrl + O` (or `Cmd + O`), and select the folder:
```
C:\Users\HEMANTH\Desktop\MindLoop
```

### 2. Install Dependencies
Open a terminal in VS Code (`Ctrl + ~`) and run:
```bash
npm install --legacy-peer-deps
```

### 3. Launch Local Development Server
Start the local server with:
```bash
npm run dev
```

Then open **[http://localhost:5173/](http://localhost:5173/)** in Google Chrome.

---

## 📁 Project Structure

```
MindLoop/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Sidebar.tsx
    │   ├── QuickUploadModal.tsx
    │   ├── FocusModeModal.tsx
    │   └── ShareModal.tsx
    ├── pages/
    │   ├── LandingPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── SummaryPage.tsx
    │   ├── FlashcardsPage.tsx
    │   ├── QuizPage.tsx
    │   ├── WeakTopicsPage.tsx
    │   ├── PlannerPage.tsx
    │   ├── ChatPage.tsx
    │   ├── ConceptMapPage.tsx
    │   └── ProfilePage.tsx
    ├── data/
    │   ├── mockData.ts
    │   └── sampleNotes.ts
    └── types/
        └── index.ts
```

---

## 🎨 Tech Stack & Features

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Hybrid Glassmorphism Utilities
- **Animations**: Framer Motion + 3D CSS perspective card flips
- **Icons**: Lucide React
- **Data Visualizations**: Recharts Radar & Performance Heatmaps
- **Celebration Effects**: Canvas Confetti
