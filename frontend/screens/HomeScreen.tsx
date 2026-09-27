import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Volume2,
  CheckCircle2,
  Award,
  Play,
  Flame,
  Star,
  Sun,
  Sunset,
  Moon,
  Smartphone,
  Phone,
  MessageCircle,
  QrCode,
  ShieldCheck,
  PlaySquare,
  Camera,
  Settings,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { Stage, UserProfile, LanguageCode, PracticeTask } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';
import { InstallAppBanner } from '../components/InstallAppBanner';

interface HomeScreenProps {
  profile: UserProfile;
  stages: Stage[];
  lang: LanguageCode;
  theme?: 'bright' | 'dark';
  onSelectStage: (stage: Stage) => void;
  onStartPractice: (task?: PracticeTask) => void;
  onOpenSafetyQuiz: () => void;
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

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  stages,
  lang,
  theme = 'bright',
  onSelectStage,
  onStartPractice,
  onOpenSafetyQuiz,
}) => {
  const t = translations[lang];

  // Calculate overall progress percentage
  const totalLessons = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = profile.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / (totalLessons || 1)) * 100));

  // Determine time of day for a warm, human greeting
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      return {
        greeting: lang === 'en' ? 'Good morning' : lang === 'mr' ? 'शुभ सकाळ' : 'शुभ प्रभात',
        icon: Sun,
        iconColor: 'text-amber-300',
      };
    }
    if (hour >= 12 && hour < 17) {
      return {
        greeting: lang === 'en' ? 'Good afternoon' : lang === 'mr' ? 'शुभ दुपार' : 'शुभ दोपहर',
        icon: Sun,
        iconColor: 'text-amber-400',
      };
    }
    if (hour >= 17 && hour < 21) {
      return {
        greeting: lang === 'en' ? 'Good evening' : lang === 'mr' ? 'शुभ संध्याकाळ' : 'शुभ संध्या',
        icon: Sunset,
        iconColor: 'text-orange-300',
      };
    }
    return {
      greeting: lang === 'en' ? 'Namaste' : lang === 'mr' ? 'नमस्कार' : 'नमस्ते',
      icon: Moon,
      iconColor: 'text-indigo-200',
    };
  };

  const { greeting, icon: TimeIcon, iconColor } = getGreetingData();

  const handleReadGreeting = () => {
    const text = `${greeting}, ${profile.name || (lang === 'en' ? 'Friend' : lang === 'mr' ? 'मित्रा' : 'साथी')}! ${t.whatToLearnToday}. ${t.safetyGoldenRuleTitle}: ${t.safetyGoldenRuleText}`;
    speechService.speak(text, lang);
  };

  return (
    <div id="screen-home" className="space-y-4 sm:space-y-7 pb-16">
      {/* 1-Click Local PWA Install Banner */}
      <InstallAppBanner lang={lang} theme={theme} />

      {/* Handcrafted Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0D5C5A] via-[#0A4846] to-[#073634] text-white p-4 sm:p-9 shadow-xl border border-[#0D5C5A]/40">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            {/* Friendly Greeting Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-teal-100">
              <TimeIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor}`} />
              <span>
                {greeting}, {profile.name || (lang === 'en' ? 'Learner' : lang === 'mr' ? 'मित्रा' : 'साथी')}!
              </span>
            </div>

            <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t.whatToLearnToday}
            </h2>
            <p className="text-teal-100/90 text-sm sm:text-lg font-normal leading-relaxed">
              {t.homeWelcomeSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReadGreeting}
            className="btn-tactile self-start md:self-center py-2.5 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-base flex items-center gap-2 shadow-md backdrop-blur-md transition-all shrink-0 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            <span>{t.listenToThis}</span>
          </button>
        </div>

        {/* Milestone Progress Bar */}
        <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-white/15 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold text-teal-100 flex items-center gap-1.5 sm:gap-2">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span>{t.overallProgress}: {progressPercent}%</span>
            </span>
            <span className="text-[11px] sm:text-sm font-bold text-teal-200 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-white/10">
              {completedCount} / {totalLessons} {t.lessonsBadge}
            </span>
          </div>
          <div className="w-full h-2.5 sm:h-3 bg-black/30 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Safety Mantra Note */}
      <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FFFDF7] dark:bg-slate-800/90 border-2 border-amber-300/80 dark:border-amber-500/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-5 relative overflow-hidden transition-colors">
        <div className="flex items-start gap-3 sm:gap-5">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md ring-2 sm:ring-4 ring-amber-100 dark:ring-amber-900/40">
            <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-amber-200 dark:border-amber-700/50">
                {lang === 'en' ? 'Daily Safety Tip' : lang === 'mr' ? 'दैनिक सुरक्षा नियम' : 'दैनिक सुरक्षा मंत्र'}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-amber-950 dark:text-amber-100">
                {t.safetyGoldenRuleTitle}
              </h3>
            </div>
            <p className="text-sm sm:text-lg font-medium text-amber-900/90 dark:text-amber-200/90 leading-snug">
              {t.safetyGoldenRuleText}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => speechService.speak(`${t.safetyGoldenRuleTitle}. ${t.safetyGoldenRuleText}`, lang)}
          className="btn-tactile self-end sm:self-center py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-md shrink-0 cursor-pointer transition-all border border-amber-400"
        >
          <Volume2 className="w-4 h-4 text-white dark:text-slate-950" />
          <span>{lang === 'en' ? 'Listen' : lang === 'mr' ? 'ऐका' : 'सुनें'}</span>
        </button>
      </div>

      {/* Handcrafted "Practice Karo" Interactive Hub Banner */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D96B43] via-[#CD5B32] to-[#B84E27] text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 border border-orange-400/30 relative overflow-hidden">
        <div className="space-y-1.5 sm:space-y-2 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{lang === 'en' ? 'Virtual Smartphone Sandbox' : lang === 'mr' ? 'व्हर्च्युअल स्मार्टफोन सराव' : 'वर्चुअल स्मार्टफोन पर अभ्यास'}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black tracking-tight">
            {t.practiceTitle} • {lang === 'en' ? 'Learn by Doing!' : lang === 'mr' ? 'स्वतः करून शिका!' : 'खुद करके सीखें!'}
          </h3>
          <p className="text-orange-100 text-sm sm:text-lg font-normal leading-relaxed">
            {t.practiceSubtitle}
          </p>
        </div>

        <button
          id="btn-home-start-practice"
          type="button"
          onClick={() => onStartPractice()}
          className="btn-tactile w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-white text-[#C85A32] hover:bg-orange-50 font-black text-base sm:text-xl flex items-center justify-center gap-2.5 sm:gap-3 shadow-2xl ring-4 ring-white/30 shrink-0 cursor-pointer"
        >
          <span>{t.practiceNowPrompt}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>
      </div>

      {/* Learning Stages Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D5C5A] tracking-tight">
              {t.allStages}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-0.5">
              {lang === 'en' ? 'Choose a step-by-step topic to begin learning' : lang === 'mr' ? 'शिकण्यासाठी आपल्या आवडीचा टप्पा निवडा' : 'सीखने के लिए अपनी पसंद का विषय चुनें'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSafetyQuiz}
            className="btn-tactile self-start sm:self-center py-2.5 px-4 rounded-2xl bg-teal-50/80 hover:bg-teal-100 dark:bg-teal-950/80 dark:hover:bg-teal-900 border-2 border-teal-200 dark:border-teal-700 text-[#0D5C5A] dark:text-teal-200 font-extrabold text-sm flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#D96B43]" />
            <span>{lang === 'en' ? 'Safety Quiz' : lang === 'mr' ? 'सुरक्षा क्विझ' : 'सुरक्षा क्विज़'}</span>
          </button>
        </div>

        {/* 8 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stages.map((stage) => {
            const completedInThisStage = stage.lessons.filter((l) =>
              profile.completedLessons.includes(l.id)
            ).length;
            const isStageDone = completedInThisStage === stage.lessons.length && stage.lessons.length > 0;
            const StageIcon = getStageIcon(stage.stageNumber);

            return (
              <div
                key={stage.id}
                id={`stage-card-${stage.id}`}
                onClick={() => onSelectStage(stage)}
                className={`card-human p-4 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col justify-between cursor-pointer select-none relative group ${
                  isStageDone
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0D5C5A]/10 text-[#0D5C5A] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <StageIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#0D5C5A]/10 text-[#0D5C5A] font-extrabold text-[11px] sm:text-xs">
                        {lang === 'en' ? 'Stage' : lang === 'mr' ? 'टप्पा' : 'चरण'} {stage.stageNumber}
                      </span>
                    </div>

                    {isStageDone ? (
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                        <span>{lang === 'en' ? 'Completed' : lang === 'mr' ? 'पूर्ण झाले' : 'पूर्ण'}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                        {completedInThisStage}/{stage.lessons.length} {t.lessonsBadge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#0D5C5A] transition-colors leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mt-1 sm:mt-1.5 leading-relaxed">
                    {stage.subtitle || stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0D5C5A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>{t.startLearning}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const desc = stage.subtitle || stage.description || '';
                      speechService.speak(`${stage.title}. ${desc}`, lang);
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Listen to this stage"
                  >
                    <Volume2 className="w-4 h-4 text-[#D96B43]" />
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

