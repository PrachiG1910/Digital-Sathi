import React, { useState } from 'react';
import {
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Sun,
  Moon
} from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';
import { getProfile, saveProfile, registerUser, loginUser } from '../services/profileDb';
import confetti from 'canvas-confetti';

interface LoginScreenProps {
  lang: LanguageCode;
  theme?: 'bright' | 'dark';
  onToggleTheme?: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

const RANDOM_PROFILES = [
  {
    name: { en: 'Anand Verma', hi: 'आनंद वर्मा', mr: 'आनंद जोशी' },
    phone: '9823456789',
    formattedPhone: '98234 56789',
  },
  {
    name: { en: 'Sunita Devi', hi: 'सुनीता देवी', mr: 'सुनिता पवार' },
    phone: '9876512340',
    formattedPhone: '98765 12340',
  },
  {
    name: { en: 'Rajesh Kumar', hi: 'राजेश कुमार', mr: 'राजेश कदम' },
    phone: '9812345678',
    formattedPhone: '98123 45678',
  },
  {
    name: { en: 'Meena Sharma', hi: 'मीना शर्मा', mr: 'मीना कुलकर्णी' },
    phone: '9765432109',
    formattedPhone: '97654 32109',
  },
  {
    name: { en: 'Suresh Patel', hi: 'सुरेश पटेल', mr: 'सुरेश पाटील' },
    phone: '9890123456',
    formattedPhone: '98901 23456',
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  lang,
  theme = 'bright',
  onToggleTheme,
  onLoginSuccess
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = translations[lang];
  const isDark = theme === 'dark';

  const [profileIndex] = useState(() => Math.floor(Math.random() * RANDOM_PROFILES.length));
  const currentDemo = RANDOM_PROFILES[profileIndex];
  const demoName = currentDemo.name[lang] || currentDemo.name.en;
  const namePlaceholder = lang === 'en' ? `e.g. ${demoName}` : `उदा. ${demoName}`;
  const phonePlaceholder = lang === 'en' ? `e.g. ${currentDemo.formattedPhone}` : `उदा. ${currentDemo.formattedPhone}`;

  const handleReadScreen = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      const text =
        lang === 'hi'
          ? 'डिजिटल साथी में आपका स्वागत है! कृपया अपना नाम और 10 अंकों का मोबाइल नंबर लिखें। पासवर्ड की कोई जरूरत नहीं है।'
          : lang === 'mr'
            ? 'डिजिटल साथीमध्ये आपले स्वागत आहे! कृपया आपले नाव आणि १० अंकी मोबाईल नंबर टाका. पासवर्डची आवश्यकता नाही.'
            : 'Welcome to Digital Sathi! Please enter your full name and 10-digit mobile number. No password is required.';
      speechService.speak(text, lang);
      setIsSpeaking(true);
    }
  };

  const handleQuickFill = () => {
    setName(demoName);
    setPhone(currentDemo.phone);
    setErrorMsg('');
    speechService.speak(lang === 'en' ? 'Demo profile filled in.' : lang === 'mr' ? 'डेमो प्रोफाइल भरले आहे.' : 'डेमो प्रोफाइल भर दिया गया है।', lang);
  };

  const handleSubmit = async (action: 'create' | 'login') => {
    const cleanName = name.trim().replace(/\s+/g, ' ');
    const cleanPhone = phone.replace(/\D/g, '');

    if (action === 'create' && cleanName.length < 2) {
      setErrorMsg(lang === 'en' ? 'Please enter your full name.' : lang === 'mr' ? 'कृपया आपले पूर्ण नाव टाका.' : 'कृपया अपना पूरा नाम लिखें।');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg(lang === 'en' ? 'Enter a valid 10-digit Indian mobile number.' : lang === 'mr' ? 'कृपया वैध 10 अंकी मोबाईल नंबर टाका.' : 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।');
      return;
    }

    setErrorMsg('');

    if (action === 'create') {
      const res = await registerUser({
        name: cleanName || demoName,
        phone: cleanPhone,
        language: lang,
      });

      if (!res.success || !res.profile) {
        setErrorMsg(res.error || (lang === 'en' ? 'Registration failed. Please try again.' : 'प्रोफाइल बनाने में त्रुटि हुई।'));
        return;
      }

      localStorage.setItem('ds_active_profile', JSON.stringify(res.profile));
      setIsSuccess(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 } });
      setTimeout(() => onLoginSuccess(res.profile!), 400);
    } else {
      // Login flow: Fetch existing user from MongoDB
      const res = await loginUser(cleanPhone);
      if (!res.success || !res.profile) {
        setErrorMsg(
          res.error ||
          (lang === 'en'
            ? 'No profile was found for this phone number. Create a profile first.'
            : lang === 'mr'
            ? 'या नंबरसाठी प्रोफाइल सापडले नाही. आधी प्रोफाइल तयार करा.'
            : 'इस नंबर के लिए प्रोफाइल नहीं मिला। पहले प्रोफाइल बनाएं।')
        );
        return;
      }

      let profileToUse = res.profile;
      if (cleanName && cleanName !== profileToUse.name) {
        profileToUse = { ...profileToUse, name: cleanName, language: lang };
        void saveProfile(profileToUse);
      }

      localStorage.setItem('ds_active_profile', JSON.stringify(profileToUse));
      setIsSuccess(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 } });
      setTimeout(() => onLoginSuccess(profileToUse), 400);
    }
  };

  return (
    <div
      id="screen-login-signup"
      className={`min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 ${isDark
          ? 'bg-[#0F172A] text-slate-100'
          : 'bg-[#FAF7F2] text-[#0F172A]'
        }`}
    >
      {/* Ambient background glow accents matching Intro page */}
      <div
        className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity ${isDark ? 'bg-[#0D5C5A]/30 opacity-60' : 'bg-[#0D5C5A]/10 opacity-70'
          }`}
      />
      <div
        className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity ${isDark ? 'bg-[#D96B43]/25 opacity-60' : 'bg-[#D96B43]/12 opacity-80'
          }`}
      />

      {/* Top Header with Theme Toggle & Listen Button */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between pb-3 sm:pb-4 z-20 animate-slide-in-down">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md ring-2 ring-[#0D5C5A]/20 shrink-0">
            DS
          </div>
          <div>
            <span className={`text-base sm:text-lg font-black block leading-tight ${isDark ? 'text-white' : 'text-[#0D5C5A]'}`}>
              Digital Sathi
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#D96B43]">
              {lang === 'hi' ? 'डिजिटल साथी' : lang === 'mr' ? 'डिजिटल साथी' : 'Digital Literacy'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              id="btn-login-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className={`btn-tactile py-2 px-2.5 sm:px-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors ${isDark
                  ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-[#0D5C5A] border-slate-200 hover:bg-slate-50'
                }`}
              title="Toggle Bright/Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0D5C5A]" />}
              <span className="hidden sm:inline">{isDark ? 'Bright' : 'Dark'}</span>
            </button>
          )}

          {/* Voice Listen Button */}
          <button
            id="btn-login-listen"
            type="button"
            onClick={handleReadScreen}
            className={`btn-tactile py-2 px-2.5 sm:px-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse'
                : isDark
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-[#0D5C5A] border-[#0D5C5A]/25 hover:border-[#0D5C5A]'
              }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-[#D96B43]" />}
            <span className="truncate max-w-[120px] sm:max-w-none">{t.listenToThis}</span>
          </button>
        </div>
      </div>

      {/* Main Form Card with Intro Styling */}
      <div className="w-full max-w-xl mx-auto my-auto py-2 sm:py-4 z-10 animate-slide-in-up">
        <div
          className={`p-5 sm:p-10 rounded-3xl border-2 shadow-2xl relative overflow-hidden transition-all ${isDark
              ? 'bg-slate-900/90 border-slate-700 text-white'
              : 'bg-white border-[#0D5C5A]/15 text-[#0F172A]'
            }`}
        >
          {/* Top Decorative Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0D5C5A] via-[#D96B43] to-[#0D5C5A]" />

          {/* Heading */}
          <div className="text-center mb-6 sm:mb-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#D96B43]/15 text-[#D96B43] font-black text-[11px] sm:text-xs uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#D96B43]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Simple & Safe Sign In' : lang === 'mr' ? 'सरळ आणि सुरक्षित प्रवेश' : 'सरल और सुरक्षित प्रवेश'}</span>
            </span>
            <h2 className={`text-xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0D5C5A]'}`}>
              {t.loginTitle}
            </h2>
            <p className={`mt-1 sm:mt-1.5 text-sm sm:text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.loginSubtitle}
            </p>
          </div>

          {/* Demo Quick Fill Button */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className={`btn-tactile py-2 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs cursor-pointer ${isDark
                  ? 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/40'
                  : 'bg-amber-50 hover:bg-amber-100/80 border-amber-300/80 text-amber-900'
                }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.quickFillBtn} ({demoName})</span>
            </button>
          </div>

          {/* Success Notification */}
          {isSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 text-emerald-300 flex items-center gap-3 animate-smooth-scale">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <p className="font-black text-lg">{t.profileCreatedSuccess}</p>
                <p className="text-sm font-semibold">{lang === 'en' ? 'Taking you to home screen...' : lang === 'mr' ? 'मुख्य स्क्रीनवर नेले जात आहे...' : 'मुख्य स्क्रीन पर ले जाया जा रहा है...'}</p>
              </div>
            </div>
          )}

          {/* Error Notification */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/15 border border-red-400 text-red-300 text-sm font-bold flex items-center gap-2">
              <LockKeyhole className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label
                htmlFor="input-full-name"
                className={`block text-base sm:text-lg font-extrabold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
              >
                <User className="w-5 h-5 text-[#D96B43]" />
                <span>{t.fullNameLabel}</span>
              </label>
              <input
                id="input-full-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg('');
                }}
                placeholder={namePlaceholder}
                className={`w-full p-4 rounded-2xl border-2 text-lg sm:text-xl font-bold outline-none transition-all shadow-inner ${isDark
                    ? 'bg-slate-800/90 border-slate-700 text-white focus:border-[#D96B43] focus:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0D5C5A] focus:bg-white'
                  }`}
              />
            </div>

            <div>
              <label
                htmlFor="input-phone-number"
                className={`block text-base sm:text-lg font-extrabold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
              >
                <Phone className="w-5 h-5 text-[#D96B43]" />
                <span>{t.phoneLabel}</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-black text-slate-400 text-lg sm:text-xl select-none">
                  +91
                </span>
                <input
                  id="input-phone-number"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={phonePlaceholder}
                  className={`w-full pl-16 pr-4 py-4 rounded-2xl border-2 text-lg sm:text-xl font-bold outline-none transition-all shadow-inner tracking-wider ${isDark
                      ? 'bg-slate-800/90 border-slate-700 text-white focus:border-[#D96B43] focus:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0D5C5A] focus:bg-white'
                    }`}
                />
              </div>
              <p className={`mt-2 text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <LockKeyhole className="w-3.5 h-3.5 text-[#D96B43]" />
                <span>{lang === 'en' ? 'No password needed. Profile is saved safely on your device.' : lang === 'mr' ? 'पासवर्डची आवश्यकता नाही. प्रोफाइल सुरक्षितपणे सेव्ह होते.' : 'पासवर्ड की जरूरत नहीं। डेटा आपके फ़ोन में सुरक्षित रहता है।'}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons with Primary Glowing Terracotta */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              id="btn-create-profile"
              type="button"
              onClick={() => handleSubmit('create')}
              className="btn-tactile flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D96B43] via-[#CD5B32] to-[#B84E27] hover:from-[#CD5B32] hover:to-[#A34320] text-white font-black text-lg sm:text-xl flex items-center justify-center gap-2.5 shadow-xl ring-4 ring-[#D96B43]/25 cursor-pointer"
            >
              <span>{t.createProfileBtn}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>

            <button
              id="btn-login-existing"
              type="button"
              onClick={() => handleSubmit('login')}
              className={`btn-tactile py-4 px-6 rounded-2xl border font-extrabold text-base sm:text-lg flex items-center justify-center transition-colors cursor-pointer ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200'
                }`}
            >
              <span>{t.loginBtn}</span>
            </button>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className={`mt-7 pt-4 border-t flex items-center justify-center gap-2 text-xs font-bold ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>{lang === 'en' ? '100% Secure & Senior Friendly' : '१००% सुरक्षित एवं बुजुर्गों के लिए अनुकूल'}</span>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-xl mx-auto text-center pt-3 text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Digital Sathi • {lang === 'en' ? 'Digital empowerment for seniors' : 'बुजुर्गों के लिए डिजिटल साक्षरता साथी'}
      </div>
    </div>
  );
};


