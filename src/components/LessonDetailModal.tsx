import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Youtube,
  CheckCircle2,
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import { Lesson, LessonStep, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';
import confetti from 'canvas-confetti';
import {
  VirtualPhoneIllustration,
  getStepQuizDetails,
  initialPhoneSimulatorState,
  PhoneSimulatorState
} from './VirtualPhoneQuiz';

interface LessonDetailModalProps {
  lesson: Lesson;
  lang: LanguageCode;
  onClose: () => void;
  onCompleteLesson: (lessonId: string) => void;
  onOpenVideo: (title: string, query: string) => void;
  onStartPractice: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  lang,
  onClose,
  onCompleteLesson,
  onOpenVideo,
  onStartPractice,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [viewMode, setViewMode] = useState<'guide' | 'quiz'>('guide');

  // Interactive Quiz & Practice state
  const [practicedSteps, setPracticedSteps] = useState<Set<number>>(new Set());
  const [quizSelection, setQuizSelection] = useState<{ [stepIdx: number]: 'correct' | 'wrong' | null }>({});
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  // Interactive Phone Simulator local states
  const [phoneState, setPhoneState] = useState<PhoneSimulatorState>(initialPhoneSimulatorState);

  const t = translations[lang];
  const step: LessonStep = lesson.steps[currentStepIndex] || lesson.steps[0];
  const totalSteps = lesson.steps.length;
  const isCurrentStepPracticed = practicedSteps.has(currentStepIndex);

  // Auto-speak when step changes and reset local phone simulator state
  useEffect(() => {
    speechService.stop();
    setShowCelebrationBanner(false);
    setPhoneState(initialPhoneSimulatorState);
    const timer = setTimeout(() => {
      speechService.speak(`${step.title}. ${step.speechText}`, lang);
    }, 300);
    return () => {
      clearTimeout(timer);
      speechService.stop();
    };
  }, [currentStepIndex, lesson.id, lang]);

  // Next and Previous step handlers
  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      onCompleteLesson(lesson.id);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
      speechService.speak(t.wellDoneLesson, lang);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setIsFinished(false);
    }
  };

  const toggleVoice = () => {
    if (speechService.getSpeakingState()) {
      speechService.stop();
    } else {
      speechService.speak(`${step.title}. ${step.speechText}`, lang);
    }
  };

  // Trigger celebration when an instruction is followed
  const triggerInstructionSuccess = (actionName: string) => {
    setPracticedSteps((prev) => new Set(prev).add(currentStepIndex));
    setQuizSelection((prev) => ({ ...prev, [currentStepIndex]: 'correct' }));
    setShowCelebrationBanner(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
    });

    const praiseText =
      lang === 'mr'
        ? `शाब्बास! तुम्ही ${actionName} या सूचनेचे अचूक पालन केले.`
        : lang === 'hi'
        ? `शाबाश! आपने ${actionName} निर्देश का बिल्कुल सही पालन किया।`
        : `Well done! You followed the instruction for ${actionName}.`;

    speechService.speak(praiseText, lang);
  };

  const quiz = getStepQuizDetails(
    step,
    lang,
    phoneState,
    setPhoneState,
    triggerInstructionSuccess
  );

  // Render the interactive virtual illustration phone
  const renderInteractiveIllustration = () => (
    <VirtualPhoneIllustration
      step={step}
      lang={lang}
      phoneState={phoneState}
      setPhoneState={setPhoneState}
      quiz={quiz}
      isPracticed={isCurrentStepPracticed}
    />
  );

  return (
    <div
      id="modal-lesson-detail"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-3.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 text-[#0D5C5A] dark:text-teal-300 font-black text-xs uppercase tracking-wider shrink-0 border border-teal-200 dark:border-teal-800">
              {lang === 'mr' ? 'टप्पा' : lang === 'en' ? 'Step' : 'चरण'} {currentStepIndex + 1}/{totalSteps}
            </span>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-xl truncate">
              {lesson.title}
            </h3>
          </div>

          <button
            id="btn-close-lesson-modal"
            type="button"
            onClick={onClose}
            aria-label="Close lesson"
            className="btn-tactile w-10 h-10 rounded-2xl bg-slate-200/80 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Toggle: Guide vs Virtual Quiz */}
        {!isFinished && (
          <div className="px-4 sm:px-6 pt-3 pb-2.5 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 flex-wrap shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('guide')}
                className={`btn-tactile py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'guide'
                    ? 'bg-[#0D5C5A] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{lang === 'mr' ? 'मार्गदर्शिका' : lang === 'en' ? 'Guide' : 'मार्गदर्शिका'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('quiz')}
                className={`btn-tactile py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'quiz'
                    ? 'bg-[#D96B43] text-white shadow-xs ring-2 ring-[#D96B43]/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{lang === 'mr' ? 'सराव क्विझ' : lang === 'en' ? 'Practice Quiz' : 'अभ्यास क्विज़'}</span>
                {isCurrentStepPracticed && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
              </button>
            </div>

            {/* Score & Completion Pill */}
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs font-black">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {practicedSteps.size}/{totalSteps} {lang === 'mr' ? 'सराव पूर्ण' : lang === 'en' ? 'Done' : 'पूर्ण'} (+{practicedSteps.size * 10} {lang === 'en' ? 'pts' : 'अंक'})
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {/* Finished State Celebration Card */}
          {isFinished ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <h4 className="text-3xl font-extrabold text-[#0D5C5A]">{t.wellDoneLesson}</h4>
              <p className="text-lg text-slate-700 font-semibold max-w-md mx-auto">
                {lang === 'en'
                  ? `You have successfully completed all steps and practice for "${lesson.title}".`
                  : lang === 'mr'
                  ? `तुम्ही "${lesson.title}" चे सर्व टप्पे आणि सराव यशस्वीपणे पूर्ण केले आहेत.`
                  : `आपने "${lesson.title}" के सभी कदम और अभ्यास सफलतापूर्वक पूरे कर लिए हैं।`}
              </p>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-md mx-auto">
                <span className="text-sm font-bold text-emerald-900 block">
                  {lang === 'en' ? 'Practice Score' : lang === 'mr' ? 'अभ्यास स्कोअर' : 'अभ्यास स्कोर'}: {practicedSteps.size * 10} {lang === 'en' ? 'points' : lang === 'mr' ? 'गुण' : 'अंक'}
                </span>
                <span className="text-xs text-emerald-700">
                  {lang === 'mr' ? 'तुम्ही आत्मविश्वासाने फोन वापरण्यास तयार आहात!' : lang === 'en' ? 'You are ready to use your phone with confidence!' : 'आप आत्मविश्वास से फोन इस्तेमाल करने के लिए तैयार हैं!'}
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartPractice();
                  }}
                  className="py-4 px-8 rounded-2xl bg-[#D96B43] hover:bg-[#C85A32] text-white font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 ring-4 ring-[#D96B43]/20 cursor-pointer"
                >
                  <Sparkles className="w-6 h-6 text-amber-200" />
                  <span>{t.practiceNowPrompt}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-4 px-6 rounded-2xl bg-slate-200 hover:bg-slate-300 font-bold text-base text-slate-800 cursor-pointer"
                >
                  {lang === 'mr' ? 'पूर्ण झाले' : lang === 'en' ? 'Done' : 'बंद करें'}
                </button>
              </div>
            </div>
          ) : viewMode === 'quiz' ? (
            /* Dedicated Working Quiz Mode */
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Question Header Card */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                    <span>
                      {lang === 'mr' ? 'सराव क्विझ प्रश्न' : lang === 'en' ? 'Practice Quiz Question' : 'अभ्यास क्विज़ प्रश्न'} ({currentStepIndex + 1}/{totalSteps})
                    </span>
                  </span>
                  {quizSelection[currentStepIndex] === 'correct' && (
                    <span className="text-xs bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm animate-in zoom-in-95">
                      <Check className="w-4 h-4" /> {lang === 'mr' ? 'शाब्बास! +10 गुण' : lang === 'en' ? 'Great job! +10 points' : 'शाबाश! +10 अंक'}
                    </span>
                  )}
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {quiz.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                  {lang === 'mr'
                    ? 'खालील फोनवर स्पर्श करा किंवा योग्य पर्यायावर स्पर्श करा:'
                    : lang === 'en'
                    ? 'Tap the phone screen below or choose the correct option:'
                    : 'नीचे फोन पर छुएं या सही विकल्प पर स्पर्श करें:'}
                </p>
              </div>

              {/* Center Interactive Touch Phone */}
              <div className="flex flex-col items-center justify-center py-2">
                {renderInteractiveIllustration()}
                <span className="text-xs text-slate-600 font-bold mt-2 flex items-center gap-1 bg-amber-100 text-amber-950 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                  {lang === 'mr' ? 'स्क्रीन किंवा बटणावर थेट स्पर्श करून सराव पूर्ण करा' : lang === 'en' ? 'Tap the screen or button directly to complete the practice' : 'स्क्रीन या बटन पर सीधा टच करके अभ्यास पूरा करें'}
                </span>
              </div>

              {/* Choices */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                  {lang === 'mr' ? 'खालीलपैकी योग्य कृती निवडा:' : lang === 'en' ? 'Choose the correct action:' : 'नीचे से सही निर्देश चुनें:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Correct Option A */}
                  <button
                    type="button"
                    onClick={quiz.onPerform}
                    className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer select-none touch-manipulation active:scale-98 ${
                      quizSelection[currentStepIndex] === 'correct'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300'
                        : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-sm font-extrabold mt-0.5 shadow-xs">
                      ✓
                    </div>
                    <div className="flex-1">
                      <span className="block">{quiz.correctOption}</span>
                      <span className="text-xs text-emerald-700 font-bold block mt-1">
                        {quiz.actionLabel}
                      </span>
                    </div>
                  </button>

                  {/* Wrong Option B */}
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSelection((prev) => ({ ...prev, [currentStepIndex]: 'wrong' }));
                      speechService.speak(
                        lang === 'mr'
                          ? 'हा चुकीचा पर्याय आहे. कृपया पुन्हा विचार करून सुरक्षित पर्याय निवडा.'
                          : lang === 'en'
                          ? 'This is the incorrect option. Please choose the safe option.'
                          : 'यह गलत विकल्प है। कृपया ध्यान से सुरक्षित विकल्प चुनें।',
                        lang
                      );
                    }}
                    className={`p-4 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer select-none touch-manipulation active:scale-98 ${
                      quizSelection[currentStepIndex] === 'wrong'
                        ? 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300'
                        : 'bg-white border-slate-300 hover:border-rose-400 hover:bg-rose-50/40 text-slate-700'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 text-sm font-extrabold mt-0.5 shadow-xs">
                      ✕
                    </div>
                    <span className="flex-1">{quiz.wrongOption}</span>
                  </button>
                </div>

                {quizSelection[currentStepIndex] === 'wrong' && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-2xl text-rose-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <span className="font-bold">[!]</span>
                    <span>
                      {lang === 'mr'
                        ? 'हा चुकीचा पर्याय आहे! कृपया हिरवा बरोबर पर्याय निवडा किंवा फोनवर स्पर्श करा.'
                        : lang === 'en'
                        ? 'Incorrect option! Please choose the correct green option or tap the phone screen.'
                        : 'यह गलत विकल्प है! कृपया सही विकल्प चुनें या फोन स्क्रीन पर छुएं।'}
                    </span>
                  </div>
                )}

                {/* When step is practiced, show Next Step in Quiz button */}
                {quizSelection[currentStepIndex] === 'correct' && (
                  <div className="pt-2 flex justify-center animate-in zoom-in-95">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="py-3.5 px-8 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-extrabold text-base flex items-center gap-2 shadow-xl ring-4 ring-teal-200 cursor-pointer active:scale-95"
                    >
                      <span>
                        {currentStepIndex === totalSteps - 1
                          ? (lang === 'mr' ? 'सर्व सराव पूर्ण! निकाल पहा' : lang === 'en' ? 'Practice complete! View results' : 'सभी अभ्यास पूरे! परिणाम देखें')
                          : (lang === 'mr' ? 'पुढील सराव पायरी' : lang === 'en' ? 'Next practice step' : 'अगला अभ्यास कदम')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Comprehensive Guide Mode */
            <>
              {/* Interactive Virtual Phone Illustration */}
              <div className="flex flex-col items-center justify-center py-1">
                {renderInteractiveIllustration()}
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-2 flex items-center gap-1">
                  {lang === 'mr' ? 'फोनवरील बटणावर स्पर्श करून प्रत्यक्ष सराव करा' : lang === 'en' ? 'Tap the phone button to practice directly' : 'फोन पर बटन को छूकर सीधे अभ्यास करें'}
                </span>
              </div>

              {/* Celebration Banner when instruction followed */}
              {showCelebrationBanner && (
                <div className="p-3.5 bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 rounded-2xl flex items-center justify-between gap-2 animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.instructionFollowed}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCelebrationBanner(false)}
                    className="text-xs bg-white dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-xl font-bold shadow-xs cursor-pointer border border-emerald-300 dark:border-emerald-700"
                  >
                    {lang === 'en' ? 'OK' : 'ठीक है'}
                  </button>
                </div>
              )}

              {/* Step Title & Instruction Guide */}
              <div className="text-center space-y-2 py-1">
                <span className="inline-block px-3.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0D5C5A] dark:text-teal-300 font-extrabold text-xs">
                  {t.stepLabel} {step.stepNumber} / {totalSteps}
                </span>

                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                  {step.title}
                </h4>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed max-w-xl mx-auto">
                  {step.description}
                </p>

                {/* Helpful Tip (Render only if valid content exists) */}
                {step.tip && /[a-zA-Z0-9\u0900-\u097F]/.test(step.tip) && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-start justify-center gap-2 text-left max-w-lg mx-auto shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{step.tip}</span>
                  </div>
                )}

                {/* Warning Alert (Render only if valid content exists) */}
                {step.warning && /[a-zA-Z0-9\u0900-\u097F]/.test(step.warning) && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 text-rose-950 dark:text-rose-200 text-xs sm:text-sm font-bold flex items-start justify-center gap-2 text-left max-w-lg mx-auto shadow-xs">
                    <span>{step.warning}</span>
                  </div>
                )}
              </div>

              {/* Virtual Working Quiz for THIS specific instruction */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                      Quiz
                    </span>
                    <h5 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                      {t.virtualQuizTitle}
                    </h5>
                  </div>
                  {quizSelection[currentStepIndex] === 'correct' ? (
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {lang === 'mr' ? 'योग्य सराव केला' : lang === 'en' ? 'Correct practice completed' : 'सही अभ्यास किया'}
                    </span>
                  ) : (
                    <span className="text-xs text-[#D96B43] font-bold">
                      {t.practiceInstructionPrompt}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">{quiz.question}</p>

                {/* Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {/* Option A: The correct instruction practice */}
                  <button
                    type="button"
                    onClick={quiz.onPerform}
                    className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                      quizSelection[currentStepIndex] === 'correct'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm ring-2 ring-emerald-300 dark:ring-emerald-800'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <span>{quiz.correctOption}</span>
                  </button>

                  {/* Option B: The incorrect / distractor option */}
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSelection((prev) => ({ ...prev, [currentStepIndex]: 'wrong' }));
                      speechService.speak(
                        lang === 'mr'
                          ? 'कृपया वरील सूचना पुन्हा वाचा आणि सुरक्षित पर्याय निवडा.'
                          : lang === 'en'
                          ? 'Please check the instruction again and choose the safe option.'
                          : 'कृपया निर्देश दोबारा पढ़कर सही विकल्प चुनें।',
                        lang
                      );
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left font-semibold text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                      quizSelection[currentStepIndex] === 'wrong'
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-950 dark:text-rose-100'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-rose-400 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✕
                    </div>
                    <span>{quiz.wrongOption}</span>
                  </button>
                </div>

                {quizSelection[currentStepIndex] === 'wrong' && (
                  <p className="text-xs text-rose-600 dark:text-rose-300 font-bold animate-in fade-in">
                    {lang === 'mr' ? 'चुकीचा पर्याय! कृपया योग्य सराव पर्याय निवडा.' : lang === 'en' ? 'Incorrect option! Please follow the correct instruction.' : 'गलत विकल्प! कृपया ऊपर दिए गए सही निर्देश का पालन करें।'}
                  </p>
                )}
              </div>

              {/* Accessible Voice Audio Button */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className="btn-tactile py-2.5 px-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#0D5C5A] dark:border-teal-400 text-[#0D5C5A] dark:text-teal-300 hover:bg-[#0D5C5A]/10 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-5 h-5 text-[#D96B43]" />
                  <span>{t.listenToThis}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isFinished && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentStepIndex === 0}
                onClick={handlePrev}
                className="btn-tactile py-3 px-5 rounded-2xl bg-slate-200/80 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t.previousStep}</span>
              </button>

              {lesson.youtubeQuery && (
                <button
                  type="button"
                  onClick={() => onOpenVideo(lesson.title, lesson.youtubeQuery!)}
                  className="btn-tactile py-3 px-4 rounded-2xl bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>{lang === 'mr' ? 'व्हिडिओ पहा' : lang === 'en' ? 'Watch Video' : 'वीडियो देखें'}</span>
                </button>
              )}
            </div>

            <button
              id="btn-lesson-next-step"
              type="button"
              onClick={handleNext}
              className="btn-tactile py-3.5 px-7 sm:px-8 rounded-2xl bg-gradient-to-r from-[#0D5C5A] to-[#0A4846] hover:from-[#0A4846] hover:to-[#073634] text-white font-black text-base sm:text-lg flex items-center gap-2 shadow-xl ring-4 ring-[#0D5C5A]/25 cursor-pointer"
            >
              <span>
                {currentStepIndex === totalSteps - 1 ? t.finishLesson : t.nextStep}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
