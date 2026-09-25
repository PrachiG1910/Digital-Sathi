import React, { useState } from 'react';
import { Volume2, VolumeX, CheckCircle2, ArrowRight, Globe, Sun, Moon } from 'lucide-react';
import { LanguageCode } from '../types';
import { speechService } from '../services/speech';

interface LanguageSelectionScreenProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onContinue: () => void;
  theme?: 'bright' | 'dark';
  onToggleTheme?: () => void;
}

interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  sampleGreeting: string;
  icon: string;
  voicePhrase: string;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
  theme = 'bright',
  onToggleTheme
}) => {
  const [activeLang, setActiveLang] = useState<LanguageCode>(selectedLanguage);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isDark = theme === 'dark';

  const languages: LanguageOption[] = [
    {
      code: 'hi',
      nativeName: 'हिंदी',
      englishName: 'Hindi',
      sampleGreeting: 'नमस्ते! मैं हिंदी में सीखना चाहता हूँ।',
      icon: 'HI',
      voicePhrase: 'नमस्ते! हिंदी भाषा चुनी गई है।',
    },
    {
      code: 'mr',
      nativeName: 'मराठी',
      englishName: 'Marathi',
      sampleGreeting: 'नमस्कार! मला मराठीत शिकायचे आहे.',
      icon: 'MR',
      voicePhrase: 'नमस्कार! मराठी भाषा निवडली गेली आहे.',
    },
    {
      code: 'en',
      nativeName: 'Simple English',
      englishName: 'English for Seniors',
      sampleGreeting: 'Hello! I want to learn in simple English.',
      icon: 'EN',
      voicePhrase: 'Hello! Simple English language has been selected.',
    },
  ];

  const handleCardClick = (langCode: LanguageCode, voicePhrase: string) => {
    setActiveLang(langCode);
    onSelectLanguage(langCode);
    speechService.speak(voicePhrase, langCode);
  };

  const handleReadTitle = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      speechService.speak(
        activeLang === 'hi'
          ? 'आप किस भाषा में सीखना चाहते हैं? हिंदी, मराठी, या सिंपल इंग्लिश में से अपनी पसंद की भाषा चुनें।'
          : activeLang === 'mr'
          ? 'तुम्हाला कोणत्या भाषेत शिकायचे आहे? हिंदी, मराठी किंवा सोपी इंग्रजी यापैकी आपली भाषा निवडा.'
          : 'Which language do you prefer to learn in? Choose Hindi, Marathi, or Simple English.',
        activeLang
      );
      setIsSpeaking(true);
    }
  };

  return (
    <div
      id="screen-language-select"
      className={`min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0F172A] text-slate-100' : 'bg-[#FAF7F2] text-[#0F172A]'
      }`}
    >
      {/* Ambient Glows */}
      <div
        className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-[#0D5C5A]/30 opacity-60' : 'bg-[#0D5C5A]/10 opacity-70'
        }`}
      />
      <div
        className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-[#D96B43]/25 opacity-60' : 'bg-[#D96B43]/12 opacity-80'
        }`}
      />

      {/* Top Header */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between pb-4 z-20 animate-slide-in-down">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white flex items-center justify-center font-black text-lg shadow-md ring-2 ring-[#0D5C5A]/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className={`text-lg font-black block leading-tight ${isDark ? 'text-white' : 'text-[#0D5C5A]'}`}>
              Digital Sathi
            </span>
            <span className="text-[11px] font-bold text-[#D96B43]">भाषा चयन • Choose Language</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onToggleTheme && (
            <button
              id="btn-lang-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className={`btn-tactile py-2 px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-[#0D5C5A] border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Bright/Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0D5C5A]" />}
              <span className="hidden sm:inline">{isDark ? 'Bright' : 'Dark'}</span>
            </button>
          )}

          <button
            id="btn-lang-listen"
            type="button"
            onClick={handleReadTitle}
            className={`btn-tactile py-2.5 px-4 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer transition-all ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-[#0D5C5A] border-[#0D5C5A]/20 hover:border-[#0D5C5A]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5 text-slate-950" /> : <Volume2 className="w-5 h-5 text-[#D96B43]" />}
            <span>सुनें (Listen)</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl mx-auto my-auto py-6 z-10 animate-slide-in-up">
        {/* Title */}
        <div className="text-center mb-8 space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D96B43]/15 text-[#D96B43] font-extrabold text-xs uppercase tracking-wider border border-[#D96B43]/30">
            {activeLang === 'en' ? 'Language Setting' : activeLang === 'mr' ? 'भाषा पर्याय' : 'भाषा चयन'}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#0D5C5A]'}`}>
            {activeLang === 'hi' ? 'आप किस भाषा में सीखना चाहते हैं?' : activeLang === 'mr' ? 'तुम्हाला कोणत्या भाषेत शिकायचे आहे?' : 'Which language do you prefer to learn in?'}
          </h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto font-medium">
            {activeLang === 'hi'
              ? 'अपनी पसंदीदा भाषा को छूकर चुनें। ऐप की आवाज़ और पाठ उसी भाषा में बदल जाएंगे।'
              : activeLang === 'mr'
              ? 'आपली पसंतीची भाषा निवडा. ॲपची भाषा लगेच बदलेल.'
              : 'Tap to select your language. Voice guidance and text will change immediately.'}
          </p>
        </div>

        {/* 3 Large Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {languages.map((item) => {
            const isSelected = activeLang === item.code;

            return (
              <div
                key={item.code}
                id={`lang-card-${item.code}`}
                onClick={() => handleCardClick(item.code, item.voicePhrase)}
                className={`p-6 sm:p-7 rounded-3xl border-2 flex flex-col justify-between min-h-[200px] cursor-pointer select-none transition-all relative ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white border-teal-400/50 ring-4 ring-teal-500/30 shadow-2xl scale-[1.03]'
                    : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border-slate-700/80 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-md'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`w-10 h-10 rounded-2xl font-black text-sm flex items-center justify-center border ${
                      isSelected
                        ? 'bg-white/20 text-white border-white/30'
                        : isDark
                        ? 'bg-slate-800 text-teal-300 border-slate-700'
                        : 'bg-[#0D5C5A]/10 text-[#0D5C5A] border-[#0D5C5A]/20'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {isSelected ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>चयनित (Active)</span>
                    </div>
                  ) : (
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      छुएं (Tap)
                    </span>
                  )}
                </div>

                {/* Language Names */}
                <div className="mt-4">
                  <h3 className={`text-2xl sm:text-3xl font-black ${isSelected ? 'text-white' : isDark ? 'text-white' : 'text-[#0D5C5A]'}`}>
                    {item.nativeName}
                  </h3>
                  <p className={`text-xs sm:text-sm font-bold mt-0.5 ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                    {item.englishName}
                  </p>
                </div>

                {/* Sample Phrase Preview */}
                <p className={`mt-3 text-xs font-medium italic p-2.5 rounded-xl border ${
                  isSelected
                    ? 'bg-white/10 text-teal-100 border-white/20'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                    : 'bg-[#FAF7F2] text-slate-600 border-slate-200'
                }`}>
                  "{item.sampleGreeting}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Large Continue Button */}
        <div className="mt-9 flex flex-col items-center">
          <button
            id="btn-lang-continue"
            type="button"
            onClick={onContinue}
            className="btn-tactile w-full sm:w-auto min-w-[280px] py-4 px-10 rounded-2xl bg-gradient-to-r from-[#D96B43] via-[#CD5B32] to-[#B84E27] hover:from-[#CD5B32] hover:to-[#A34320] text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-xl ring-4 ring-[#D96B43]/25 cursor-pointer animate-pulse-glow"
          >
            <span>{activeLang === 'en' ? 'Continue' : activeLang === 'mr' ? 'पुढे जा (Continue)' : 'आगे बढ़ें (Continue)'}</span>
            <ArrowRight className="w-7 h-7 stroke-[3]" />
          </button>

          <p className={`mt-3 text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {activeLang === 'en' ? 'You can also change language anytime from your profile.' : 'आप बाद में भी प्रोफाइल से किसी भी समय भाषा बदल सकते हैं।'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={`w-full max-w-3xl mx-auto text-center pt-3 text-xs font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        Digital Sathi • Designed for Senior Comfort & Accessibility
      </div>
    </div>
  );
};


