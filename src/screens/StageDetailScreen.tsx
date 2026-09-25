import React from 'react';
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Play,
  Youtube,
  Sparkles,
  ArrowRight,
  BookOpen,
  Smartphone,
  Phone,
  MessageCircle,
  QrCode,
  ShieldCheck,
  PlaySquare,
  Camera,
  Settings
} from 'lucide-react';
import { Stage, Lesson, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface StageDetailScreenProps {
  stage: Stage;
  completedLessonIds: string[];
  lang: LanguageCode;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenVideo: (title: string, query: string) => void;
  onStartPractice: () => void;
}

const getStageIcon = (stageNumber: number) => {
  switch (stageNumber) {
    case 1:
      return Smartphone;
    case 2:
      return Phone;
    case 3:
      return MessageCircle;
    case 4:
      return QrCode;
    case 5:
      return ShieldCheck;
    case 6:
      return PlaySquare;
    case 7:
      return Camera;
    case 8:
    default:
      return Settings;
  }
};

export const StageDetailScreen: React.FC<StageDetailScreenProps> = ({
  stage,
  completedLessonIds,
  lang,
  onBack,
  onSelectLesson,
  onOpenVideo,
  onStartPractice,
}) => {
  const t = translations[lang];
  const StageIcon = getStageIcon(stage.stageNumber);

  const handleReadStage = () => {
    speechService.speak(
      lang === 'en'
        ? `Stage ${stage.stageNumber}: ${stage.title}. ${stage.description || stage.subtitle}. There are ${stage.lessons.length} lessons in this stage.`
        : `चरण ${stage.stageNumber}: ${stage.title}. ${stage.description || stage.subtitle}. इसमें कुल ${stage.lessons.length} पाठ हैं।`,
      lang
    );
  };

  return (
    <div id="screen-stage-detail" className="space-y-6 pb-16">
      {/* Top navigation row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{t.backToHome}</span>
        </button>

        <button
          type="button"
          onClick={handleReadStage}
          className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#0D5C5A]/20 dark:border-teal-700 hover:border-[#0D5C5A] text-[#0D5C5A] dark:text-teal-200 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Volume2 className="w-5 h-5 text-[#E2693D]" />
          <span>{t.listenToThis}</span>
        </button>
      </div>

      {/* Stage Header Banner */}
      <div className="card-human p-5 sm:p-9 bg-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0D5C5A]/10 text-[#0D5C5A] flex items-center justify-center shrink-0">
            <StageIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </div>
          <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#0D5C5A]/10 text-[#0D5C5A] font-extrabold text-xs uppercase tracking-wider">
            {lang === 'en' ? 'Stage' : lang === 'mr' ? 'टप्पा' : 'चरण'} {stage.stageNumber}
          </span>
        </div>

        <h2 className="text-xl sm:text-4xl font-black text-[#0D5C5A] tracking-tight leading-tight">
          {stage.title}
        </h2>
        <p className="mt-2 text-sm sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
          {stage.description || stage.subtitle}
        </p>

        {/* Action bar for Stage */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-3.5">
          <button
            type="button"
            onClick={onStartPractice}
            className="btn-tactile w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E2693D] to-[#CD5B32] hover:from-[#CD5B32] hover:to-[#B84E27] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg ring-4 ring-[#E2693D]/20 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{lang === 'en' ? 'Practice on Virtual Phone' : lang === 'mr' ? 'वर्च्युअल फोनवर सराव करा' : 'वर्चुअल फोन पर अभ्यास करें'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVideo(stage.title, `${stage.title} senior citizen tutorial`)}
            className="btn-tactile w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200/80 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Youtube className="w-5 h-5 text-red-600" />
            <span>{lang === 'en' ? 'Watch Video Tutorial' : lang === 'mr' ? 'व्हिडिओ ट्यूटोरियल पहा' : 'वीडियो ट्यूटोरियल देखें'}</span>
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0D5C5A]" />
            <span>{lang === 'en' ? 'All Lessons in This Stage' : lang === 'mr' ? 'या टप्प्यातील सर्व धडे' : 'इस चरण के सभी पाठ'}</span>
          </h3>
          <span className="text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {stage.lessons.length} {lang === 'en' ? 'lessons' : lang === 'mr' ? 'धडे उपलब्ध' : 'पाठ उपलब्ध'}
          </span>
        </div>

        <div className="space-y-4">
          {stage.lessons.map((lesson, idx) => {
            const isCompleted = completedLessonIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                onClick={() => onSelectLesson(lesson)}
                className={`card-human p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none relative group ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 transition-transform group-hover:scale-105 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-[#0D5C5A]/10 text-[#0D5C5A]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#0D5C5A] transition-colors">
                        {lesson.title}
                      </h4>
                      {isCompleted && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                          {lang === 'en' ? 'Completed' : lang === 'mr' ? 'पूर्ण झाले' : 'सीख लिया'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                      {lesson.shortDesc || lesson.description}
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {lesson.steps.length} {lang === 'en' ? 'simple steps' : lang === 'mr' ? 'सोप्या पायऱ्या' : 'सरल कदम'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(`${lesson.title}. ${lesson.shortDesc || lesson.description}`, lang);
                    }}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Listen to lesson"
                  >
                    <Volume2 className="w-5 h-5 text-[#E2693D]" />
                  </button>

                  <button
                    type="button"
                    className="btn-tactile py-3 px-5 sm:px-6 rounded-2xl bg-[#0D5C5A] text-white hover:bg-[#0A4846] font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{isCompleted ? (lang === 'en' ? 'Review' : lang === 'mr' ? 'पुन्हा पहा' : 'दोबारा देखें') : (lang === 'en' ? 'Start' : lang === 'mr' ? 'सुरू करा' : 'शुरू करें')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
