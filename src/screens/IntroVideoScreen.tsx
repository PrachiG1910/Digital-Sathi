import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Globe,
  Sun,
  Moon,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Heart,
  PhoneCall
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface IntroVideoScreenProps {
  onComplete: () => void;
  lang: LanguageCode;
  onSelectLanguage?: (lang: LanguageCode) => void;
  theme?: 'bright' | 'dark';
  onToggleTheme?: () => void;
}

// Split string by graphemes to safely support both English letters and Devanagari combined characters
const splitIntoGraphemes = (text: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text)).map((s) => s.segment);
    } catch {
      // Fallback below
    }
  }
  return Array.from(text);
};

// Animated alphabet-by-alphabet component
const AnimatedAlphabetText: React.FC<{
  text: string;
  className?: string;
  delayOffset?: number;
  letterDelay?: number;
}> = ({ text, className = '', delayOffset = 0, letterDelay = 45 }) => {
  const characters = useMemo(() => splitIntoGraphemes(text), [text]);

  return (
    <span className={`inline-flex flex-wrap items-center justify-center ${className}`}>
      {characters.map((char, index) => {
        const isSpace = char === ' ' || char === '\u00A0';
        return (
          <span
            key={`${text}-${index}-${char}`}
            className="animate-letter-reveal"
            style={{
              animationDelay: `${delayOffset + index * letterDelay}ms`,
              minWidth: isSpace ? '0.35em' : undefined,
            }}
          >
            {isSpace ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export const IntroVideoScreen: React.FC<IntroVideoScreenProps> = ({
  onComplete,
  lang,
  onSelectLanguage,
  theme = 'bright',
  onToggleTheme
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const t = translations[lang];
  const isDark = theme === 'dark';

  const languages: { code: LanguageCode; label: string; sub: string }[] = [
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
    { code: 'mr', label: 'मराठी', sub: 'Marathi' },
    { code: 'en', label: 'English', sub: 'Simple English' }
  ];

  // Sync speech state
  useEffect(() => {
    const unsub = speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  const handleLanguageChange = (newLang: LanguageCode) => {
    if (onSelectLanguage) {
      onSelectLanguage(newLang);
    }
    setShowLanguageModal(false);
    const confirmation =
      newLang === 'hi'
        ? 'हिंदी भाषा चुनी गई है।'
        : newLang === 'mr'
        ? 'मराठी भाषा निवडली गेली आहे.'
        : 'English language selected.';
    speechService.speak(confirmation, newLang);
  };

  const handleListenIntro = () => {
    if (isSpeaking) {
      speechService.stop();
    } else {
      const introText =
        lang === 'en'
          ? 'Welcome to Digital Sathi. Learn smartphones step-by-step with voice guidance, safe practice, and zero fear.'
          : lang === 'mr'
          ? 'डिजिटल साथीमध्ये आपले स्वागत आहे. आवाजाच्या सोबतीने स्मार्टफोन सहज आणि सुरक्षितपणे शिका.'
          : 'डिजिटल साथी में आपका स्वागत है। बिना किसी डर के, बोलती आवाज़ और सरल चरणों के साथ स्मार्टफोन चलाना सीखें।';
      speechService.speak(introText, lang);
    }
  };

  const projectNativeName =
    lang === 'hi'
      ? 'डिजिटल साथी'
      : lang === 'mr'
      ? 'डिजिटल साथी'
      : 'Learn Smartphones with Confidence';

  return (
    <div
      id="screen-intro-hero"
      className={`min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? 'vibrant-intro-bg-dark text-slate-100'
          : 'vibrant-intro-bg-bright text-[#0F172A]'
      }`}
    >
      {/* Dynamic Colorful Glowing Voice Wave Mesh (Highly Visible on Phone & Desktop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Ambient Background Lighting */}
        <div
          className={`absolute -top-16 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full blur-3xl opacity-50 transition-opacity ${
            isDark ? 'bg-teal-500/25' : 'bg-teal-400/30'
          }`}
        />
        <div
          className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-50 transition-opacity ${
            isDark ? 'bg-orange-600/25' : 'bg-orange-300/35'
          }`}
        />

        {/* Dynamic Voice Wave Visualizer Mesh SVG — Full Responsive Viewport */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-90 sm:opacity-95">
          <svg
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full preserve-3d"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Vibrant Glowing Linear Gradients */}
              <linearGradient id="voiceMeshGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="35%" stopColor="#06B6D4" />
                <stop offset="70%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>

              <linearGradient id="voiceMeshGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="40%" stopColor="#E2693D" />
                <stop offset="75%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              <linearGradient id="voiceMeshGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="30%" stopColor="#EC4899" />
                <stop offset="70%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              <linearGradient id="voiceMeshGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#E2693D" />
              </linearGradient>

              {/* Glowing Area Fill Gradients */}
              <linearGradient id="voiceMeshArea1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity={isDark ? '0.25' : '0.14'} />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="voiceMeshArea2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2693D" stopOpacity={isDark ? '0.22' : '0.12'} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>

              {/* Neon Glow Filters */}
              <filter id="neonGlowTeal" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="neonGlowOrange" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="10" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Wave 1 - Emerald to Sky Blue with Area Fill */}
            <path
              d="M -100,240 C 150,140 320,380 600,260 C 880,140 1050,380 1300,250 L 1300,600 L -100,600 Z"
              fill="url(#voiceMeshArea1)"
            />
            <path
              d="M -100,240 C 150,140 320,380 600,260 C 880,140 1050,380 1300,250"
              stroke="url(#voiceMeshGrad1)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlowTeal)"
              className="anim-voice-wave-1"
            />

            {/* Glowing Wave 2 - Saffron Coral Neon Wave */}
            <path
              d="M -100,340 C 180,440 400,210 660,330 C 920,450 1100,230 1300,350 L 1300,600 L -100,600 Z"
              fill="url(#voiceMeshArea2)"
            />
            <path
              d="M -100,340 C 180,440 400,210 660,330 C 920,450 1100,230 1300,350"
              stroke="url(#voiceMeshGrad2)"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#neonGlowOrange)"
              className="anim-voice-wave-2"
            />

            {/* Glowing Wave 3 - Violet & Rose Harmonic Wave */}
            <path
              d="M -100,190 C 220,310 450,120 720,220 C 990,320 1150,160 1300,280"
              stroke="url(#voiceMeshGrad3)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={isDark ? '0.85' : '0.75'}
              className="anim-voice-wave-3"
            />

            {/* Glowing Wave 4 - Golden Turquoise High Frequency Wave */}
            <path
              d="M -100,390 C 140,270 380,440 620,350 C 860,260 1080,430 1300,310"
              stroke="url(#voiceMeshGrad4)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={isDark ? '0.8' : '0.7'}
              className="anim-voice-wave-1"
            />

            {/* Dynamic Pulsing Audio Frequency Beacons (Ride on Wave Peaks) */}
            <circle cx="280" cy="180" r="5" fill="#10B981" filter="url(#neonGlowTeal)" className="anim-particle-pulse" />
            <circle cx="600" cy="260" r="6" fill="#06B6D4" filter="url(#neonGlowTeal)" className="anim-particle-pulse" style={{ animationDelay: '400ms' }} />
            <circle cx="920" cy="170" r="5.5" fill="#3B82F6" filter="url(#neonGlowTeal)" className="anim-particle-pulse" style={{ animationDelay: '800ms' }} />
            <circle cx="420" cy="310" r="6" fill="#F59E0B" filter="url(#neonGlowOrange)" className="anim-particle-pulse" style={{ animationDelay: '300ms' }} />
            <circle cx="760" cy="370" r="5.5" fill="#E2693D" filter="url(#neonGlowOrange)" className="anim-particle-pulse" style={{ animationDelay: '700ms' }} />
            <circle cx="1080" cy="250" r="6" fill="#EC4899" filter="url(#neonGlowOrange)" className="anim-particle-pulse" style={{ animationDelay: '1100ms' }} />
          </svg>
        </div>
      </div>

      {/* Top Header Bar - Clean with Theme Toggle at Top Right */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-end z-20 pb-4">
        {onToggleTheme && (
          <button
            id="btn-intro-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className={`btn-tactile py-2.5 px-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors ${
              isDark
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-[#0D5C5A] border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Bright/Dark Mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#0D5C5A]" />
            )}
            <span className="hidden sm:inline">{isDark ? 'Bright' : 'Dark'}</span>
          </button>
        )}
      </div>

      {/* Main Center Section with Alphabet-by-Alphabet Animation for Project Name */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-6 z-10">
        {/* Project Name Animating Alphabet by Alphabet */}
        <div className="space-y-4 max-w-2xl mx-auto px-4">
          <div>
            {/* Letter by Letter Animated Project Title */}
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight block ${
                isDark ? 'text-white' : 'text-[#0D5C5A]'
              }`}
            >
              <AnimatedAlphabetText
                text="Digital Sathi"
                delayOffset={100}
                letterDelay={50}
              />
            </h1>

            {/* Vernacular / Subtitle Animated Letter by Letter */}
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#D96B43] mt-1.5 sm:mt-2 block">
              <AnimatedAlphabetText
                key={projectNativeName}
                text={projectNativeName}
                delayOffset={500}
                letterDelay={45}
              />
            </p>
          </div>

          <div className="animate-slide-in-up" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
            <p
              className={`text-sm sm:text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed mt-1 sm:mt-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {lang === 'en'
                ? 'Practice smartphone skills step-by-step with voice guidance, safe simulations, and zero worry.'
                : lang === 'mr'
                ? 'आवाजाच्या सोबतीने स्मार्टफोन सुरक्षितपणे आणि कोणत्याही भीतीशिवाय शिका.'
                : 'बिना किसी डर के, बोलती आवाज़ और सरल चरणों के साथ स्मार्टफोन चलाना सीखें।'}
            </p>
          </div>
        </div>

        {/* Clean, Prominent Action Buttons: Start Learning + Language Switcher */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none pt-6 sm:pt-8 animate-slide-in-up relative"
          style={{ animationDelay: '950ms', animationFillMode: 'backwards' }}
        >
          {/* Main Continue / Start Learning Button */}
          <button
            id="btn-intro-continue-hero"
            type="button"
            onClick={onComplete}
            className="btn-tactile w-full sm:w-auto min-w-0 sm:min-w-[260px] py-3.5 sm:py-4 px-6 sm:px-9 rounded-2xl bg-gradient-to-r from-[#D96B43] via-[#CD5B32] to-[#B84E27] hover:from-[#CD5B32] hover:to-[#A34320] text-white font-black text-lg sm:text-2xl flex items-center justify-center gap-2.5 sm:gap-3 shadow-xl ring-4 ring-[#D96B43]/25 cursor-pointer animate-pulse-glow"
          >
            <span>
              {lang === 'en'
                ? 'Start Learning'
                : lang === 'mr'
                ? 'सुरू करा (Start)'
                : 'सीखना शुरू करें (Start)'}
            </span>
            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
          </button>

          {/* Prominent Language Switcher Button (Replacing Listen Guide) */}
          <div className="relative w-full sm:w-auto">
            <button
              id="btn-intro-change-language-main"
              type="button"
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              className={`btn-tactile w-full sm:w-auto py-4 px-7 rounded-2xl border-2 font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-md cursor-pointer transition-all ${
                isDark
                  ? 'bg-slate-800 text-teal-300 border-teal-500/40 hover:bg-slate-700'
                  : 'bg-white text-[#0D5C5A] border-[#0D5C5A]/30 hover:border-[#0D5C5A] hover:bg-teal-50/50 shadow-xs'
              }`}
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-6 h-6 text-[#D96B43]" />
              <span>
                {lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'English'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-lg bg-[#D96B43]/15 text-[#D96B43] font-bold">
                {lang === 'en' ? 'Lang' : 'भाषा'}
              </span>
            </button>

            {/* Language Selection Popup Dropdown (Centered/Anchored) */}
            {showLanguageModal && (
              <div
                className={`absolute left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 bottom-full sm:bottom-auto sm:top-full mb-3 sm:mb-0 sm:mt-2 w-64 rounded-2xl border p-2 shadow-2xl z-50 animate-smooth-scale ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-2 text-xs font-bold text-slate-400 border-b border-slate-200/50 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#D96B43]" />
                  <span>{lang === 'en' ? 'Choose Language' : 'भाषा चुनें'}</span>
                </div>
                {languages.map((item) => {
                  const isSelected = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleLanguageChange(item.code)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between text-base font-extrabold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D5C5A] text-white'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-200'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="block">{item.label}</span>
                        <span
                          className={`text-xs font-normal ${
                            isSelected ? 'text-teal-200' : 'text-slate-400'
                          }`}
                        >
                          {item.sub}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-teal-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Clean Footer */}
      <div
        className={`w-full max-w-4xl mx-auto text-center pt-4 text-xs sm:text-sm font-bold animate-slide-in-up ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}
        style={{ animationDelay: '1100ms', animationFillMode: 'backwards' }}
      >
        <span>Digital Sathi • </span>
        <span className={isDark ? 'text-teal-300' : 'text-[#0D5C5A]'}>
          {lang === 'en'
            ? '100% Free & Senior Friendly'
            : '१००% निःशुल्क एवं वरिष्ठ नागरिकों के लिए समर्पित'}
        </span>
      </div>
    </div>
  );
};


