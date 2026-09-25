import React, { useState } from 'react';
import { ArrowLeft, Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { PracticeTask, LanguageCode } from '../types';
import { getPracticeTasks } from '../data/curriculum';
import { translations } from '../data/translations';
import { PhoneSimulator } from '../components/PhoneSimulator';
import { PhoneSimulatorEnglish } from '../components/PhoneSimulatorEnglish';
import { speechService } from '../services/speech';

interface PracticeModeScreenProps {
  completedPracticeIds: string[];
  lang: LanguageCode;
  onBack: () => void;
  onPracticeComplete: (taskId: string) => void;
  initialTaskId?: string;
}

export const PracticeModeScreen: React.FC<PracticeModeScreenProps> = ({
  completedPracticeIds,
  lang,
  onBack,
  onPracticeComplete,
  initialTaskId,
}) => {
  const currentTasks = getPracticeTasks(lang);
  const initialTask =
    currentTasks.find((t) => t.id === initialTaskId) || currentTasks[0];
  const [selectedTask, setSelectedTask] = useState<PracticeTask>(initialTask);

  const t = translations[lang];

  // Update selected task if initialTaskId or language changes
  React.useEffect(() => {
    const tasks = getPracticeTasks(lang);
    if (initialTaskId) {
      const match = tasks.find((t) => t.id === initialTaskId);
      if (match) {
        setSelectedTask(match);
        return;
      }
    }
    const match = tasks.find((t) => t.id === selectedTask.id) || tasks[0];
    setSelectedTask(match);
  }, [lang, initialTaskId]);

  const handleSelectTask = (task: PracticeTask) => {
    setSelectedTask(task);
  };

  const handleTaskFinished = () => {
    onPracticeComplete(selectedTask.id);
  };

  const handleNextTaskInList = () => {
    const tasks = getPracticeTasks(lang);
    const currentIndex = tasks.findIndex((t) => t.id === selectedTask.id);
    if (currentIndex < tasks.length - 1) {
      handleSelectTask(tasks[currentIndex + 1]);
    } else {
      // Loop back or stay
      handleSelectTask(tasks[0]);
    }
  };

  return (
    <div id="screen-practice-karo" className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#D96B43]/15 text-[#C85A32] font-extrabold text-sm border border-[#D96B43]/30">
            {t.practiceTitle}
          </span>
        </div>
      </div>

      {/* Task Selector Pills */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">
          {lang === 'mr'
            ? 'सराव निवडा:'
            : lang === 'en'
            ? 'Choose a Practice Task:'
            : 'अभ्यास चुनें:'}
        </h3>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {currentTasks.map((task) => {
            const isSelected = selectedTask.id === task.id;
            const isDone = completedPracticeIds.includes(task.id);

            return (
              <button
                key={task.id}
                type="button"
                onClick={() => handleSelectTask(task)}
                className={`py-3 px-4 rounded-2xl font-bold text-sm shrink-0 flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#0D5C5A] text-white ring-4 ring-[#0D5C5A]/20 shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{task.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Virtual Phone Simulation */}
      <div className="p-2 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 sm:border-3 border-[#0D5C5A]/20 shadow-xl overflow-hidden">
        {lang === 'en' ? (
          <PhoneSimulatorEnglish
            key={selectedTask.id}
            task={selectedTask}
            lang={lang}
            onTaskComplete={handleTaskFinished}
            onNextTask={handleNextTaskInList}
          />
        ) : (
          <PhoneSimulator
            key={selectedTask.id}
            task={selectedTask}
            lang={lang}
            onTaskComplete={handleTaskFinished}
            onNextTask={handleNextTaskInList}
          />
        )}
      </div>
    </div>
  );
};
