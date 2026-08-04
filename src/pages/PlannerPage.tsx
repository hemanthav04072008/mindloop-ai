import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Plus,
  Filter
} from 'lucide-react';
import { PlannerTask } from '../types';
import { EmptyState } from '../components/EmptyState';

interface PlannerPageProps {
  tasks: PlannerTask[];
}

export const PlannerPage: React.FC<PlannerPageProps> = ({ tasks: initialTasks }) => {
  const [taskList, setTaskList] = useState<PlannerTask[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState('2026-07-30');
  const [taskFilter, setTaskFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: PlannerTask = {
      id: `task-${Date.now()}`,
      subjectId: 'sub-bio',
      subjectName: 'Cellular Respiration',
      title: newTaskTitle,
      timeSlot: '04:00 PM',
      durationMinutes: 20,
      type: 'Flashcards',
      isCompleted: false,
      date: selectedDate
    };

    setTaskList((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const filteredTasks = taskList.filter((t) => {
    if (taskFilter === 'active') return !t.isCompleted;
    if (taskFilter === 'completed') return t.isCompleted;
    return true;
  });

  const completedCount = taskList.filter((t) => t.isCompleted).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner & Exam Countdown Clock */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/15">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-[#4ECDC4]" />
            <span>Spaced Repetition Scheduler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
            Personalized AI Study Planner
          </h1>
          <p className="text-sm text-slate-300">
            MindLoop balances study loads based on your upcoming exam deadlines and active forgetting curves.
          </p>
        </div>

        {/* Exam Countdown Card */}
        <div className="glass-panel p-4 border border-[#6C63FF]/40 bg-[#6C63FF]/10 space-y-1 text-center shrink-0 w-full md:w-auto">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            Molecular Biology Final Exam
          </div>
          <div className="text-2xl font-extrabold text-[#4ECDC4] font-[#Outfit]">
            6 Days Left
          </div>
          <div className="text-[10px] text-[#6C63FF] font-semibold">
            Scheduled: Aug 5, 2026
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Today's Timeline Tasks (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#6C63FF]" />
              <span>Today's Targets ({completedCount}/{taskList.length})</span>
            </h2>

            <div className="flex items-center gap-2">
              {/* Task Filter Pills */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                {(['all', 'active', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTaskFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      taskFilter === filter
                        ? 'bg-[#6C63FF] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="btn-primary-glow px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <form onSubmit={handleAddNewTask} className="glass-panel p-4 border border-[#4ECDC4]/40 space-y-3 animate-fadeIn">
              <input
                type="text"
                placeholder="Enter study task title (e.g. Review 20 Organic Chemistry Flashcards)..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/[0.04] text-xs text-white placeholder-slate-400 border border-white/10 focus:border-[#4ECDC4] focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-glow px-4 py-1.5 rounded-lg text-xs font-bold text-white"
                >
                  Save Task
                </button>
              </div>
            </form>
          )}

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No Tasks Found"
              description="No tasks match your current filter."
              actionText="Reset Filter"
              onAction={() => setTaskFilter('all')}
            />
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`glass-panel p-4 border transition-all cursor-pointer flex items-center justify-between ${
                    task.isCompleted
                      ? 'border-emerald-500/40 bg-emerald-500/5 text-slate-400'
                      : 'border-white/15 hover:border-[#6C63FF]/50 text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button className="mt-0.5 text-slate-400 hover:text-emerald-400">
                      {task.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <h3 className={`text-sm font-bold font-[#Outfit] ${task.isCompleted ? 'line-through opacity-70' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{task.subjectName}</span>
                        <span>• {task.timeSlot} ({task.durationMinutes} mins)</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#4ECDC4]">
                    {task.type}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right: Weekly Calendar Preview (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4ECDC4]" />
              <span>July / August 2026 Schedule</span>
            </h2>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 font-semibold border-b border-white/10 pb-2">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {[27, 28, 29, 30, 31, 1, 2].map((day, idx) => {
              const isToday = day === 30;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isToday
                      ? 'bg-gradient-to-tr from-[#6C63FF] to-[#4ECDC4] text-white border-none shadow-lg'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/30'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>Tomorrow (Jul 31):</span>
              <span className="font-semibold text-[#4ECDC4]">Quantum Mechanics Quiz</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Aug 2:</span>
              <span className="font-semibold text-amber-400">Full Mock Exam Simulation</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
