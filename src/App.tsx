import React, { useState, useEffect } from 'react';
import {
  AppScreen,
  LanguageCode,
  UserProfile,
  Stage,
  Lesson,
  PracticeTask,
} from './types';
import { getStages, getPracticeTasks } from './data/curriculum';
import { translations } from './data/translations';
import { speechService } from './services/speech';
import { saveProfile } from './services/profileDb';

// Screens
import { IntroVideoScreen } from './screens/IntroVideoScreen';
import { LogoSplashScreen } from './screens/LogoSplashScreen';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { StageDetailScreen } from './screens/StageDetailScreen';
import { PracticeModeScreen } from './screens/PracticeModeScreen';
import { SafetyQuizScreen } from './screens/SafetyQuizScreen';
import { ProfileScreen } from './screens/ProfileScreen';

// Modals & Drawers
import { LessonDetailModal } from './components/LessonDetailModal';
import { YouTubeModal } from './components/YouTubeModal';
import { HelpDrawer } from './components/HelpDrawer';
import { DigitalSathiLogo } from './components/DigitalSathiLogo';

// Icons
import {
  Home,
  BookOpen,
  Smartphone,
  ShieldCheck,
  User,
  HelpCircle,
  Volume2,
  VolumeX,
  Type,
  Globe,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('intro_video');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>([]);

  // Theme state (Bright by default, persisted)
  const [theme, setTheme] = useState<'bright' | 'dark'>(() => {
    const saved = localStorage.getItem('ds_theme');
    return (saved as 'bright' | 'dark') || 'bright';
  });

  // Language state (persisted)
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('ds_language');
    return (saved as LanguageCode) || 'hi';
  });

  // User Profile state (persisted)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ds_active_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* start clean */ }
    }
    const savedFontSize = (localStorage.getItem('ds_font_size') as 'normal' | 'large' | 'xlarge') || 'large';
    return {
      name: '', phone: '', language: language, completedLessons: [], completedPractices: [],
      practiceScore: 0, voiceRate: 0.85, fontSize: savedFontSize,
    };
  });

  // Dynamic curriculum based on active language
  const stages = getStages(language);
  const practiceTasks = getPracticeTasks(language);

  // Stage & Lesson selection states
  const [selectedStage, setSelectedStage] = useState<Stage | null>(() => getStages(language)[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activePracticeTaskId, setActivePracticeTaskId] = useState<string>('practice-call');

  // Update selected stage when language changes
  useEffect(() => {
    const currentStages = getStages(language);
    if (selectedStage) {
      const match = currentStages.find((s) => s.id === selectedStage.id) || currentStages[0];
      setSelectedStage(match);
    } else {
      setSelectedStage(currentStages[0]);
    }
  }, [language]);

  // YouTube modal state
  const [youtubeModal, setYoutubeModal] = useState<{
    isOpen: boolean;
    title: string;
    query: string;
  }>({
    isOpen: false,
    title: '',
    query: '',
  });

  // Help Drawer state
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState(false);

  // Audio Speech speaking indicator state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync speech speaking state
  useEffect(() => {
    const unsub = speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  // Save language
  useEffect(() => {
    localStorage.setItem('ds_language', language);
  }, [language]);

  // Save theme and sync to DOM root and body elements
  useEffect(() => {
    localStorage.setItem('ds_theme', theme);
    const isDarkMode = theme === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark', 'theme-dark');
      document.body.classList.add('dark', 'theme-dark');
      document.documentElement.style.backgroundColor = '#0F172A';
      document.body.style.backgroundColor = '#0F172A';
      document.body.style.color = '#F8FAFC';
    } else {
      document.documentElement.classList.remove('dark', 'theme-dark');
      document.body.classList.remove('dark', 'theme-dark');
      document.documentElement.style.backgroundColor = '#FAF7F2';
      document.body.style.backgroundColor = '#FAF7F2';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  // Save profile
  useEffect(() => {
    if (!userProfile.phone) return;
    localStorage.setItem('ds_active_profile', JSON.stringify(userProfile));
    void saveProfile(userProfile);
  }, [userProfile]);

  // Synchronize dynamic accessible font size across entire DOM (excluding intro page)
  useEffect(() => {
    if (currentScreen === 'intro_video') {
      document.documentElement.removeAttribute('data-font-size');
    } else {
      const size = userProfile.fontSize || 'large';
      document.documentElement.setAttribute('data-font-size', size);
    }
    if (userProfile.fontSize) {
      localStorage.setItem('ds_font_size', userProfile.fontSize);
    }
  }, [userProfile.fontSize, currentScreen]);

  // Ensure language_selection screen is completely bypassed
  useEffect(() => {
    if (currentScreen === 'language_selection') {
      setCurrentScreen(userProfile.phone ? 'home' : 'login');
    }
  }, [currentScreen, userProfile.phone]);

  const t = translations[language];

  // Screen navigation helper with history
  const navigateTo = (screen: AppScreen) => {
    speechService.stop();
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    speechService.stop();
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((history) => history.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Profile updates
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleCompleteLesson = (lessonId: string) => {
    setUserProfile((prev) => {
      if (!prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
        };
      }
      return prev;
    });
  };

  const handleCompletePractice = (taskId: string) => {
    setUserProfile((prev) => {
      if (!prev.completedPractices.includes(taskId)) {
        return {
          ...prev,
          completedPractices: [...prev.completedPractices, taskId],
          practiceScore: Math.min(100, prev.practiceScore + 20),
        };
      }
      return prev;
    });
  };

  // Font size class mapping
  const getFontSizeClass = () => {
    switch (userProfile.fontSize) {
      case 'xlarge':
        return 'text-lg sm:text-xl font-medium';
      case 'normal':
        return 'text-base font-normal';
      case 'large':
      default:
        return 'text-base sm:text-lg font-medium';
    }
  };

  // Check if current screen is part of initial onboarding flow
  const isOnboardingScreen =
    currentScreen === 'intro_video' ||
    currentScreen === 'logo_splash' ||
    currentScreen === 'language_selection' ||
    currentScreen === 'login';

  // Quick font size cycle
  const cycleFontSize = () => {
    const nextSize =
      userProfile.fontSize === 'normal'
        ? 'large'
        : userProfile.fontSize === 'large'
        ? 'xlarge'
        : 'normal';
    handleUpdateProfile({ fontSize: nextSize });
    speechService.speak(
      nextSize === 'xlarge'
        ? language === 'en' ? 'Text size set to extra large.' : language === 'mr' ? 'अक्षरांचा आकार खूप मोठा केला आहे.' : 'अक्षरों का आकार बहुत बड़ा किया गया'
        : nextSize === 'large'
        ? language === 'en' ? 'Text size set to large.' : language === 'mr' ? 'अक्षरांचा आकार मोठा केला आहे.' : 'अक्षरों का आकार बड़ा किया गया'
        : language === 'en' ? 'Text size set to normal.' : language === 'mr' ? 'अक्षरांचा आकार सामान्य केला आहे.' : 'अक्षरों का आकार सामान्य किया गया',
      language
    );
  };

  // Toggle theme between bright and dark (Bright by default)
  const toggleTheme = () => {
    const nextTheme = theme === 'bright' ? 'dark' : 'bright';
    setTheme(nextTheme);
    localStorage.setItem('ds_theme', nextTheme);
    speechService.speak(
      nextTheme === 'bright'
        ? language === 'en' ? 'Bright mode enabled.' : language === 'mr' ? 'उज्ज्वल मोड सुरू केला आहे.' : 'उज्ज्वल मोड सक्रिय किया गया'
        : language === 'en' ? 'Dark mode enabled.' : language === 'mr' ? 'डार्क मोड सुरू केला आहे.' : 'डार्क मोड सक्रिय किया गया',
      language
    );
  };

  // Toggle audio speech stop
  const toggleSpeech = () => {
    if (isSpeaking) {
      speechService.stop();
    } else {
      speechService.speak(t.appName + '. ' + t.appTagline, language);
    }
  };

  // Quick language cycle (Hindi -> Marathi -> English)
  const cycleLanguage = () => {
    const nextLang: LanguageCode = language === 'hi' ? 'mr' : language === 'mr' ? 'en' : 'hi';
    setLanguage(nextLang);
    handleUpdateProfile({ language: nextLang });
    speechService.speak(
      nextLang === 'hi'
        ? 'हिंदी भाषा चुनी गई है'
        : nextLang === 'mr'
        ? 'मराठी भाषा निवडली आहे'
        : 'English language selected',
      nextLang
    );
  };

  const isDark = theme === 'dark';

  return (
    <div
      id="digital-sathi-app-root"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'theme-dark bg-[#0F172A] text-slate-100' : 'bg-[#FAF7F2] text-[#0F172A]'
      } ${getFontSizeClass()}`}
    >
      {/* INITIAL ONBOARDING FLOW SCREENS */}
      {currentScreen === 'intro_video' && (
        <IntroVideoScreen
          lang={language}
          onSelectLanguage={(l) => {
            setLanguage(l);
            handleUpdateProfile({ language: l });
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
          onComplete={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'logo_splash' && (
        <LogoSplashScreen
          onComplete={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'language_selection' && (
        <LanguageSelectionScreen
          selectedLanguage={language}
          onSelectLanguage={(l) => {
            setLanguage(l);
            handleUpdateProfile({ language: l });
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
          onContinue={() => {
            if (!userProfile.phone) {
              setCurrentScreen('login');
            } else {
              navigateBack();
            }
          }}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          lang={language}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLoginSuccess={(profile) => {
            setUserProfile(profile);
            setCurrentScreen('home');
          }}
        />
      )}

      {/* MAIN APPLICATION FRAME FOR AUTHENTICATED/LOGGED IN USER */}
      {!isOnboardingScreen && (
        <>
          {/* Human-Crafted Accessible Top Navigation Bar */}
          <header
            id="ds-main-header"
            className={`sticky top-0 z-40 backdrop-blur-md border-b px-2.5 sm:px-8 py-2.5 sm:py-3.5 transition-colors ${
              isDark
                ? 'bg-[#1E293B]/95 border-slate-700/80 text-white'
                : 'bg-[#FAF7F2]/95 border-[#0D5C5A]/10 text-[#0F172A]'
            }`}
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
              {/* Brand Logo & Back Button */}
              <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                {currentScreen !== 'home' && (
                  <button
                    id="btn-header-back"
                    type="button"
                    onClick={navigateBack}
                    className={`btn-tactile p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-extrabold flex items-center gap-1 shadow-xs transition-all cursor-pointer shrink-0 ${
                      isDark
                        ? 'bg-slate-800 text-teal-300 border-slate-700 hover:bg-slate-700'
                        : 'bg-white text-[#0D5C5A] border-slate-200 hover:bg-slate-50'
                    }`}
                    title="Go to previous page"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    <span className="hidden xs:inline">{language === 'en' ? 'Back' : language === 'mr' ? 'मागे' : 'वापस'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="btn-tactile flex items-center gap-2 sm:gap-3 cursor-pointer text-left group min-w-0 truncate"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white flex items-center justify-center font-black text-sm sm:text-lg shadow-md ring-2 ring-[#0D5C5A]/20 group-hover:scale-105 transition-transform shrink-0">
                    DS
                  </div>
                  <div className="min-w-0">
                    <h1 className={`text-base sm:text-2xl font-black tracking-tight leading-none truncate ${isDark ? 'text-teal-200' : 'text-[#0D5C5A]'}`}>
                      Digital Sathi
                    </h1>
                    <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-bold text-[#D96B43] tracking-wide">
                      {language === 'hi' ? 'डिजिटल साथी' : language === 'mr' ? 'डिजिटल साथी' : 'Your Digital Companion'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Utility Controls for Senior Friendly Comfort */}
              <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
                {/* Theme Toggle Button (Bright / Dark) */}
                <button
                  id="btn-header-theme-toggle"
                  type="button"
                  onClick={toggleTheme}
                  className={`btn-tactile p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-[#0D5C5A] border-slate-200 hover:bg-slate-50'
                  }`}
                  title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0D5C5A]" />}
                  <span className="hidden md:inline">{isDark ? 'Bright' : 'Dark'}</span>
                </button>

                {/* Active Language Pill (Quick Switch on Click) */}
                <button
                  id="btn-header-change-lang"
                  type="button"
                  onClick={cycleLanguage}
                  className={`btn-tactile px-2 py-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Switch Language"
                  aria-label="Switch Language"
                >
                  <Globe className="w-4 h-4 text-[#0D5C5A]" />
                  <span className="text-xs">
                    {language === 'hi' ? 'HI' : language === 'mr' ? 'MR' : 'EN'}
                  </span>
                </button>

                {/* Font Size Adjuster */}
                <button
                  id="btn-header-font-size"
                  type="button"
                  onClick={cycleFontSize}
                  className={`btn-tactile p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Adjust text size"
                  aria-label="Adjust font size"
                >
                  <Type className="w-4 h-4 text-[#0D5C5A]" />
                  <span className="hidden lg:inline">
                    {userProfile.fontSize === 'xlarge'
                      ? (language === 'en' ? 'Extra Large' : language === 'mr' ? 'खूप मोठे' : 'बहुत बड़ा')
                      : userProfile.fontSize === 'large'
                      ? (language === 'en' ? 'Large' : language === 'mr' ? 'मोठे' : 'बड़ा')
                      : (language === 'en' ? 'Normal' : language === 'mr' ? 'मध्यम' : 'सामान्य')}
                  </span>
                </button>

                {/* Live Speech Voice Toggle */}
                <button
                  id="btn-header-voice-toggle"
                  type="button"
                  onClick={toggleSpeech}
                  className={`btn-tactile p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    isSpeaking
                      ? 'bg-[#D96B43] text-white border-[#D96B43] shadow-md animate-pulse'
                      : isDark
                      ? 'bg-teal-950/60 border-teal-800 text-teal-300 hover:bg-teal-900/60'
                      : 'bg-emerald-50/80 border-emerald-200/80 text-[#0D5C5A] hover:bg-emerald-100/70'
                  }`}
                  title="Voice guide"
                  aria-label="Toggle Voice"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span className="hidden md:inline">{language === 'en' ? 'Stop' : language === 'mr' ? 'थांबा' : 'रोकें'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#0D5C5A]" />
                      <span className="hidden md:inline">{language === 'en' ? 'Voice' : language === 'mr' ? 'आवाज' : 'आवाज़'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 max-w-5xl w-full mx-auto p-3.5 sm:p-6 lg:p-8 mb-24 pb-14 overflow-x-hidden">
            {currentScreen === 'home' && (
              <HomeScreen
                profile={userProfile}
                stages={stages}
                lang={language}
                theme={theme}
                onSelectStage={(stage) => {
                  setSelectedStage(stage);
                  navigateTo('stage_detail');
                }}
                onStartPractice={(task) => {
                  if (task) setActivePracticeTaskId(task.id);
                  navigateTo('practice');
                }}
                onOpenSafetyQuiz={() => navigateTo('safety_quiz')}
              />
            )}

            {currentScreen === 'stage_detail' && selectedStage && (
              <StageDetailScreen
                stage={selectedStage}
                completedLessonIds={userProfile.completedLessons}
                lang={language}
                onBack={navigateBack}
                onSelectLesson={(lesson) => setActiveLesson(lesson)}
                onOpenVideo={(title, query) =>
                  setYoutubeModal({ isOpen: true, title, query })
                }
                onStartPractice={() => {
                  const currentTasks = getPracticeTasks(language);
                  const matchingTask = currentTasks.find(
                    (p) => p.stageNumber === selectedStage.stageNumber
                  );
                  if (matchingTask) setActivePracticeTaskId(matchingTask.id);
                  navigateTo('practice');
                }}
              />
            )}

            {currentScreen === 'practice' && (
              <PracticeModeScreen
                completedPracticeIds={userProfile.completedPractices}
                lang={language}
                onBack={navigateBack}
                onPracticeComplete={handleCompletePractice}
                initialTaskId={activePracticeTaskId}
              />
            )}

            {currentScreen === 'safety_quiz' && (
              <SafetyQuizScreen lang={language} onBack={navigateBack} />
            )}

            {currentScreen === 'profile' && (
              <ProfileScreen
                profile={userProfile}
                lang={language}
                onBack={navigateBack}
                onUpdateProfile={handleUpdateProfile}
                onChangeLanguage={cycleLanguage}
                onLogout={() => {
                  speechService.stop();
                  localStorage.removeItem('ds_active_profile');
                  setUserProfile({ name: '', phone: '', language, completedLessons: [], completedPractices: [], practiceScore: 0, voiceRate: 0.85, fontSize: 'large' });
                  setCurrentScreen('login');
                }}
              />
            )}
          </main>

          {/* Persistent Floating "मदद / Help" Button */}
          <div className="fixed bottom-20 sm:bottom-24 right-3.5 sm:right-8 z-40">
            <button
              id="btn-persistent-help-floating"
              type="button"
              onClick={() => setIsHelpDrawerOpen(true)}
              className="btn-tactile py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#D96B43] to-[#CD5B32] hover:from-[#CD5B32] hover:to-[#B84E27] text-white font-black text-sm sm:text-lg flex items-center gap-2 shadow-2xl ring-4 ring-[#D96B43]/25 cursor-pointer active:scale-95"
              aria-label="Open Help"
            >
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t.helpBtn}</span>
            </button>
          </div>

          {/* Senior-Friendly Floating Bottom Navigation Bar */}
          <nav
            id="ds-bottom-nav"
            className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-lg border-t shadow-lg px-2 sm:px-3 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom,12px))] transition-colors ${
              isDark
                ? 'bg-[#1E293B]/95 border-slate-700/80'
                : 'bg-[#FAF7F2]/95 border-[#0D5C5A]/10'
            }`}
          >
            <div className={`max-w-md mx-auto flex items-center justify-around rounded-2xl p-1 shadow-xs border ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-slate-200/80'
            }`}>
              {/* Home */}
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`btn-tactile flex-1 flex flex-col items-center py-1.5 px-1 sm:py-2 rounded-xl transition-all ${
                  currentScreen === 'home'
                    ? isDark ? 'text-teal-300 font-black bg-teal-950/60 shadow-xs' : 'text-[#0D5C5A] font-black bg-[#0D5C5A]/10 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 truncate max-w-full">{t.navHome}</span>
              </button>

              {/* Learn */}
              <button
                type="button"
                onClick={() => {
                  setSelectedStage(stages[0]);
                  navigateTo('stage_detail');
                }}
                className={`btn-tactile flex-1 flex flex-col items-center py-1.5 px-1 sm:py-2 rounded-xl transition-all ${
                  currentScreen === 'stage_detail'
                    ? isDark ? 'text-teal-300 font-black bg-teal-950/60 shadow-xs' : 'text-[#0D5C5A] font-black bg-[#0D5C5A]/10 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 truncate max-w-full">{t.navLearn}</span>
              </button>

              {/* Practice */}
              <button
                type="button"
                onClick={() => navigateTo('practice')}
                className={`btn-tactile flex-1 flex flex-col items-center py-1.5 px-1 sm:py-2 rounded-xl transition-all ${
                  currentScreen === 'practice'
                    ? 'text-[#D96B43] font-black bg-[#D96B43]/15 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-[#D96B43]' : 'text-slate-500 hover:text-[#D96B43]'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 truncate max-w-full">{t.navPractice}</span>
              </button>

              {/* Safety */}
              <button
                type="button"
                onClick={() => navigateTo('safety_quiz')}
                className={`btn-tactile flex-1 flex flex-col items-center py-1.5 px-1 sm:py-2 rounded-xl transition-all ${
                  currentScreen === 'safety_quiz'
                    ? isDark ? 'text-teal-300 font-black bg-teal-950/60 shadow-xs' : 'text-[#0D5C5A] font-black bg-[#0D5C5A]/10 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 truncate max-w-full">{t.navSafety}</span>
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => navigateTo('profile')}
                className={`btn-tactile flex-1 flex flex-col items-center py-1.5 px-1 sm:py-2 rounded-xl transition-all ${
                  currentScreen === 'profile'
                    ? isDark ? 'text-teal-300 font-black bg-teal-950/60 shadow-xs' : 'text-[#0D5C5A] font-black bg-[#0D5C5A]/10 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 truncate max-w-full">{t.navProfile}</span>
              </button>
            </div>
          </nav>

          {/* Step-by-Step Lesson Modal */}
          {activeLesson && (
            <LessonDetailModal
              lesson={activeLesson}
              lang={language}
              onClose={() => setActiveLesson(null)}
              onCompleteLesson={handleCompleteLesson}
              onOpenVideo={(title, query) =>
                setYoutubeModal({ isOpen: true, title, query })
              }
              onStartPractice={() => {
                const currentPracticeTasks = getPracticeTasks(language);
                const matchingTask =
                  currentPracticeTasks.find(
                    (p) => p.stageNumber === activeLesson.stageNumber
                  ) || currentPracticeTasks[0];
                if (matchingTask) setActivePracticeTaskId(matchingTask.id);
                setActiveLesson(null);
                navigateTo('practice');
              }}
            />
          )}

          {/* YouTube Senior Tutorial Modal */}
          <YouTubeModal
            isOpen={youtubeModal.isOpen}
            onClose={() =>
              setYoutubeModal({ isOpen: false, title: '', query: '' })
            }
            title={youtubeModal.title}
            query={youtubeModal.query}
            lang={language}
          />

          {/* Persistent Help Drawer */}
          <HelpDrawer
            isOpen={isHelpDrawerOpen}
            onClose={() => setIsHelpDrawerOpen(false)}
            lang={language}
            onGoHome={() => {
              setIsHelpDrawerOpen(false);
              navigateTo('home');
            }}
            onGoBack={() => {
              setIsHelpDrawerOpen(false);
              navigateBack();
            }}
            currentScreenDescription={language === 'en' ? `Current screen: ${currentScreen}. ${t.welcomeGreeting}. Use the buttons here whenever you need help.` : `वर्तमान स्क्रीन: ${currentScreen}. ${t.welcomeGreeting}, आप किसी भी सहायता के लिए यहां दिए गए बटन दबा सकते हैं।`}
          />
        </>
      )}
    </div>
  );
}
