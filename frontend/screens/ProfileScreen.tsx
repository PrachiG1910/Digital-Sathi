import React, { useState } from 'react';
import {
  User,
  Phone,
  Globe,
  Volume2,
  Type,
  Award,
  LogOut,
  ShieldCheck,
  Heart,
  Sparkles,
  PhoneCall,
  Check,
  Sparkle,
  MessageCircle,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface ProfileScreenProps {
  profile: UserProfile;
  lang: LanguageCode;
  onBack?: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onChangeLanguage: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  lang,
  onBack,
  onUpdateProfile,
  onChangeLanguage,
  onLogout,
}) => {
  const t = translations[lang];
  const [voiceRate, setVoiceRate] = useState<number>(profile.voiceRate || 0.85);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(
    profile.fontSize || 'large'
  );

  const handleTestVoice = (rate: number) => {
    setVoiceRate(rate);
    onUpdateProfile({ voiceRate: rate });
    const msg =
      lang === 'hi'
        ? 'नमस्ते! यह डिजिटल साथी की आवाज़ है। क्या यह आपके सुनने के लिए ठीक है?'
        : lang === 'mr'
        ? 'नमस्कार! हा डिजिटल साथीचा आवाज आहे. तुम्हाला ऐकायला स्पष्ट येत आहे का?'
        : 'Hello! This is Digital Sathi speaking. Is this voice speed comfortable for you?';
    speechService.speak(msg, lang, rate);
  };

  const handleFontSizeChange = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    onUpdateProfile({ fontSize: size });
  };

  const badges = [
    { title: lang === 'en' ? 'Calling Champion' : lang === 'mr' ? 'कॉलिंग चॅम्पियन' : 'कॉलिंग चैंपियन', icon: Phone, desc: lang === 'en' ? 'Learned how to make phone calls' : lang === 'mr' ? 'फोन कॉल करणे शिकले' : 'फोन कॉल लगाना सीखा', done: true },
    { title: lang === 'en' ? 'WhatsApp Master' : lang === 'mr' ? 'व्हॉट्सॲप मास्टर' : 'व्हाट्सऐप मास्टर', icon: MessageCircle, desc: lang === 'en' ? 'Messages and voice notes' : lang === 'mr' ? 'संदेश आणि व्हॉइस नोट्स' : 'संदेश और वॉइस नोट', done: true },
    { title: lang === 'en' ? 'UPI Safe User' : lang === 'mr' ? 'सुरक्षित UPI वापरकर्ता' : 'सुरक्षित UPI उपयोगकर्ता', icon: QrCode, desc: lang === 'en' ? 'Safe digital payments' : lang === 'mr' ? 'सुरक्षित डिजिटल पेमेंट' : 'सुरक्षित डिजिटल भुगतान', done: profile.completedPractices.includes('practice-upi') },
    { title: lang === 'en' ? 'Scam Shield' : lang === 'mr' ? 'सायबर सुरक्षा कवच' : 'धोखाधड़ी से सुरक्षा', icon: ShieldCheck, desc: lang === 'en' ? 'Protection from scams' : lang === 'mr' ? 'फसवणुकीपासून संरक्षण' : 'धोखाधड़ी से सुरक्षा', done: true },
  ];

  return (
    <div id="screen-profile" className="space-y-6 pb-16 max-w-3xl mx-auto">
      {/* Top back button row if onBack is provided */}
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>{t.backToHome}</span>
          </button>
        </div>
      )}
      {/* Header Profile Card */}
      <div className="card-human p-6 sm:p-8 bg-white shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0D5C5A] via-[#0A4846] to-[#083533] text-white flex items-center justify-center text-4xl font-black shadow-lg ring-4 ring-[#0D5C5A]/15 shrink-0">
          {profile.name ? profile.name.trim().charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="flex-1 space-y-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#0D5C5A]/10 text-[#0D5C5A] font-extrabold text-xs uppercase tracking-wider">
            {lang === 'en' ? 'Digital Sathi Learner' : lang === 'mr' ? 'डिजिटल साथी विद्यार्थी' : 'डिजिटल साथी शिक्षार्थी'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {profile.name || (lang === 'en' ? 'Learner' : lang === 'mr' ? 'वापरकर्ता' : 'शिक्षार्थी')}
          </h2>
          <p className="text-sm sm:text-base font-bold text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
            <Phone className="w-4 h-4 text-[#0D5C5A]" />
            <span>+91 {profile.phone || '9876543210'}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            speechService.speak(
              lang === 'en'
                ? `Your profile: Name ${profile.name || 'Learner'}, Phone number ${profile.phone || '9876543210'}.`
                : lang === 'mr'
                ? `तुमचे प्रोफाइल: नाव ${profile.name || 'वापरकर्ता'}, फोन नंबर ${profile.phone || '9876543210'}.`
                : `आपकी प्रोफाइल: नाम ${profile.name || 'शिक्षार्थी'}, फोन नंबर ${profile.phone || '9876543210'}.`,
              lang
            )
          }
          className="btn-tactile p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          title="Listen profile"
        >
          <Volume2 className="w-6 h-6 text-[#E2693D]" />
        </button>
      </div>

      {/* Language Setting */}
      <div className="card-human p-5 sm:p-6 bg-white shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0D5C5A]/10 text-[#0D5C5A] flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">{t.changeLanguage}</h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              {lang === 'en' ? 'Active Language: ' : lang === 'mr' ? 'सध्याची भाषा: ' : 'वर्तमान भाषा: '}
              <strong className="text-[#0D5C5A]">
                {lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'English'}
              </strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChangeLanguage}
          className="btn-tactile py-2.5 px-4 sm:px-5 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-extrabold text-xs sm:text-sm shadow-xs cursor-pointer shrink-0"
        >
          {lang === 'en' ? 'Change' : lang === 'mr' ? 'बदला' : 'बदलें'}
        </button>
      </div>

      {/* Voice Speed Settings for Seniors */}
      <div className="card-human p-6 sm:p-7 bg-white shadow-md space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {lang === 'en' ? 'Voice Speed' : lang === 'mr' ? 'बोलण्याचा वेग' : 'बोलने की गति'}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              {lang === 'en' ? 'A slow and clear voice is comfortable for seniors' : lang === 'mr' ? 'ज्येष्ठांसाठी शांत आणि स्पष्ट आवाज सर्वात सोयीस्कर असतो' : 'बुजुर्गों के लिए धीमी और स्पष्ट आवाज़ सबसे आरामदायक होती है'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { rate: 0.75, label: lang === 'en' ? 'Slow' : lang === 'mr' ? 'हळू' : 'धीमी' },
            { rate: 0.88, label: lang === 'en' ? 'Normal' : lang === 'mr' ? 'मध्यम' : 'सामान्य' },
            { rate: 1.0, label: lang === 'en' ? 'Fast' : lang === 'mr' ? 'जलद' : 'तेज़' },
          ].map((item) => (
            <button
              key={item.rate}
              type="button"
              onClick={() => handleTestVoice(item.rate)}
              className={`btn-tactile p-2.5 sm:p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                Math.abs(voiceRate - item.rate) < 0.05
                  ? 'bg-teal-50 border-[#0D5C5A] text-[#0D5C5A] ring-2 ring-[#0D5C5A]/30 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-extrabold">{item.label}</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold">{lang === 'en' ? 'Test Voice' : lang === 'mr' ? 'आवाज ऐका' : 'आवाज़ सुनें'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Size Setting */}
      <div className="card-human p-5 sm:p-7 bg-white shadow-md space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-100/80 text-[#0D5C5A] flex items-center justify-center shrink-0">
            <Type className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">{lang === 'en' ? 'Text Size' : lang === 'mr' ? 'अक्षरांचा आकार' : 'अक्षरों का आकार'}</h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              {lang === 'en' ? 'Choose larger text for comfortable reading' : lang === 'mr' ? 'डोळ्यांच्या आरामासाठी मोठे अक्षरे निवडा' : 'आंखों के आराम के लिए बड़ा टेक्स्ट चुनें'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { key: 'normal' as const, label: lang === 'en' ? 'Medium' : lang === 'mr' ? 'मध्यम' : 'सामान्य' },
            { key: 'large' as const, label: lang === 'en' ? 'Large' : lang === 'mr' ? 'मोठे' : 'बड़ा' },
            { key: 'xlarge' as const, label: lang === 'en' ? 'Extra Large' : lang === 'mr' ? 'खूप मोठे' : 'बहुत बड़ा' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleFontSizeChange(item.key)}
              className={`btn-tactile p-2.5 sm:p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-center cursor-pointer transition-all ${
                fontSize === item.key
                  ? 'bg-teal-50 border-[#0D5C5A] text-[#0D5C5A] ring-2 ring-[#0D5C5A]/30 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Earned Badges */}
      <div className="card-human p-6 sm:p-7 bg-white shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-[#E2693D]" />
          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {lang === 'en' ? 'Your Learning Badges' : lang === 'mr' ? 'तुमची पदके' : 'आपके अर्जित मेडल'}
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b, idx) => {
            const BadgeIcon = b.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1.5 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center">
                  <BadgeIcon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h5 className="font-extrabold text-xs text-amber-950">{b.title}</h5>
                <p className="text-[10px] text-amber-800/80 font-medium">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Family / Helpline Support */}
      <div className="p-6 rounded-3xl bg-teal-50/80 border-2 border-teal-300 text-teal-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Heart className="w-8 h-8 text-[#E2693D] shrink-0" />
          <div>
            <h5 className="font-black text-lg">{lang === 'en' ? 'Digital Sathi Helpline' : lang === 'mr' ? 'डिजिटल साथी हेल्पलाइन' : 'डिजिटल साथी हेल्पलाइन'}</h5>
            <p className="text-xs sm:text-sm font-semibold text-teal-900">
              {lang === 'en' ? 'If you need any guidance or support, call our free helpline:' : lang === 'mr' ? 'कोणतीही तांत्रिक अडचण असल्यास, आमच्या मोफत हेल्पलाइनवर कॉल करा:' : 'कोई भी तकनीकी सवाल हो, तो हमारी निःशुल्क हेल्पलाइन पर कॉल करें:'}
            </p>
          </div>
        </div>

        <a
          href="tel:18001200012"
          className="btn-tactile py-3 px-5 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-black text-base flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
        >
          <PhoneCall className="w-5 h-5" />
          <span>1800-120-0012</span>
        </a>
      </div>

      {/* Logout button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onLogout}
          className="btn-tactile py-3 px-6 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{lang === 'en' ? 'Log Out' : lang === 'mr' ? 'लॉगआउट करा' : 'लॉगआउट करें'}</span>
        </button>
      </div>
    </div>
  );
};

