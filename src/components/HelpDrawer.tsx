import React, { useState } from 'react';
import { HelpCircle, Volume2, ArrowLeft, Home, Phone, X, AlertTriangle, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  onGoHome: () => void;
  onGoBack: () => void;
  currentScreenDescription?: string;
}

export const HelpDrawer: React.FC<HelpDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  onGoHome,
  onGoBack,
  currentScreenDescription = 'You can use this help button anytime in Digital Sathi.',
}) => {
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showSimplifyExplanation, setShowSimplifyExplanation] = useState(false);
  const [familyAlertSent, setFamilyAlertSent] = useState(false);
  const t = translations[lang];

  if (!isOpen) return null;

  const handleReadOutLoud = () => {
    speechService.speak(currentScreenDescription, lang);
  };

  const handleExplainSimply = () => {
    setShowSimplifyExplanation(true);
    const simpleText =
      lang === 'hi'
        ? 'चिंता मत कीजिए। आप जो भी काम करना चाहते हैं, बस स्क्रीन पर दिए गए बटन को छुएं। गलती होने पर फोन खराब नहीं होगा।'
        : lang === 'mr'
        ? 'काळजी करू नका. तुम्हाला जे काम करायचे आहे, फक्त स्क्रीनवरील बटनाला स्पर्श करा. चूक झाली तरी काहीही बिघडणार नाही.'
        : 'Do not worry. Whatever you wish to do, just tap the large buttons on screen. There is zero risk of breaking anything.';
    speechService.speak(simpleText, lang);
  };

  return (
    <div
      id="help-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="help-drawer-content"
        className="w-full max-w-lg bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 border-[#0D5C5A]/20 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0D5C5A]/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0D5C5A] tracking-tight">{t.helpDrawerTitle}</h2>
              <p className="text-sm font-semibold text-slate-600">{t.helpDrawerSubtitle}</p>
            </div>
          </div>
          <button
            id="btn-close-help-drawer"
            type="button"
            onClick={onClose}
            aria-label="Close help"
            className="btn-tactile w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simplified explanation card */}
        {showSimplifyExplanation && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 animate-in slide-in-from-top-2">
            <h3 className="font-extrabold text-base flex items-center gap-2 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{lang === 'en' ? 'In simple words:' : lang === 'mr' ? 'सोप्या शब्दांत:' : 'आसान शब्दों में समझाएं:'}</span>
            </h3>
            <p className="mt-1.5 text-base font-semibold leading-relaxed">
              {lang === 'hi'
                ? 'चिंता मत कीजिए। आप जो भी सीखना चाहते हैं, बस स्क्रीन पर दिए गए कार्ड या बटन को हल्के से छुएं। गलती होने पर कुछ भी खराब नहीं होता।'
                : lang === 'mr'
                ? 'काळजी करू नका. फक्त स्क्रीनवरील बटनाला स्पर्श करा. चूक झाली तरी काहीही बिघडणार नाही.'
                : 'Do not worry. Just tap the large highlighted cards or buttons. There is zero risk of breaking anything.'}
            </p>
          </div>
        )}

        {/* Family helpline modal/card */}
        {showFamilyModal && (
          <div className="mt-4 p-5 rounded-2xl bg-[#0D5C5A]/10 border-2 border-[#0D5C5A]/30 text-[#0D5C5A] space-y-3">
            <h3 className="font-black text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#E2693D]" />
              <span>{t.helpOptionFamily}</span>
            </h3>
            <p className="text-sm font-bold text-slate-700">{t.helpFamilyAlert}</p>
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:18001200012"
                className="btn-tactile w-full py-3.5 px-4 rounded-2xl bg-[#0D5C5A] text-white text-center font-black text-base flex items-center justify-center gap-2 shadow-md hover:bg-[#0A4846] cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>1800-120-0012 (Toll Free)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setFamilyAlertSent(true);
                  const msg =
                    lang === 'hi'
                      ? 'परिवार के सदस्य को संदेश भेज दिया गया है।'
                      : lang === 'mr'
                      ? 'कुटुंबातील सदस्याला मदतीसाठी संदेश पाठवला आहे.'
                      : 'Family notified for senior assistance.';
                  speechService.speak(msg, lang);
                }}
                className="btn-tactile w-full py-3 px-4 rounded-2xl bg-white border-2 border-[#E2693D] text-[#E2693D] text-center font-extrabold text-sm hover:bg-orange-50 cursor-pointer"
              >
                {lang === 'mr' ? 'कुटुंबाला SOS सूचना पाठवा' : lang === 'en' ? 'Send SOS message to Family' : 'परिवार को SOS सूचना भेजें'}
              </button>
              {familyAlertSent && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold text-center animate-in fade-in">
                  {lang === 'mr' ? 'संदेश यशस्वीरित्या पाठवला आहे' : lang === 'en' ? 'Message sent successfully' : 'संदेश सफलतापूर्वक भेज दिया गया है'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Big accessible options */}
        <div className="mt-5 space-y-3">
          <button
            id="btn-help-listen"
            type="button"
            onClick={handleReadOutLoud}
            className="btn-tactile w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#0D5C5A]/20 flex items-center gap-4 text-left shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0D5C5A]/10 text-[#0D5C5A] flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black text-[#0D5C5A]">{t.helpOptionListen}</span>
              <span className="block text-xs font-semibold text-slate-500">
                {lang === 'hi' ? 'स्क्रीन का विवरण बोलकर सुनाएं' : lang === 'en' ? 'Hear this screen spoken clearly' : 'स्क्रीन ऐका'}
              </span>
            </div>
          </button>

          <button
            id="btn-help-explain"
            type="button"
            onClick={handleExplainSimply}
            className="btn-tactile w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-amber-300/80 flex items-center gap-4 text-left shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black text-amber-900">{t.helpOptionExplain}</span>
              <span className="block text-xs font-semibold text-slate-500">
                {lang === 'hi' ? 'सरल भाषा में दोबारा समझें' : lang === 'en' ? 'Explain again in simple terms' : 'सोप्या भाषेत समजावून सांगा'}
              </span>
            </div>
          </button>

          <button
            id="btn-help-back"
            type="button"
            onClick={() => {
              onClose();
              onGoBack();
            }}
            className="btn-tactile w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 flex items-center gap-4 text-left shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black text-slate-800">{t.helpOptionBack}</span>
              <span className="block text-xs font-semibold text-slate-500">
                {lang === 'hi' ? 'पिछले पन्ने पर लौटें' : lang === 'en' ? 'Return to previous screen' : 'मागे जा'}
              </span>
            </div>
          </button>

          <button
            id="btn-help-home"
            type="button"
            onClick={() => {
              onClose();
              onGoHome();
            }}
            className="btn-tactile w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-teal-200 flex items-center gap-4 text-left shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#0D5C5A] flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black text-[#0D5C5A]">{t.helpOptionHome}</span>
              <span className="block text-xs font-semibold text-slate-500">
                {lang === 'hi' ? 'मुख्य होम पेज पर जाएं' : lang === 'en' ? 'Return to main home dashboard' : 'मुख्य पृष्ठावर जा'}
              </span>
            </div>
          </button>

          <button
            id="btn-help-family"
            type="button"
            onClick={() => setShowFamilyModal(true)}
            className="btn-tactile w-full p-4 rounded-2xl bg-[#E2693D]/10 hover:bg-[#E2693D]/15 border-2 border-[#E2693D]/40 flex items-center gap-4 text-left shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E2693D] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-black text-[#C85A32]">{t.helpOptionFamily}</span>
              <span className="block text-xs font-semibold text-slate-600">
                {lang === 'hi' ? 'टोल-फ्री हेल्पलाइन या परिवार से मदद' : lang === 'en' ? 'Toll-free helpline & emergency family alert' : 'हेल्पलाइन किंवा कुटुंब'}
              </span>
            </div>
          </button>
        </div>

        {/* Safety tip */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-amber-950">
          <AlertTriangle className="w-5 h-5 text-[#E2693D] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {lang === 'hi'
              ? 'याद रखें: डिजिटल साथी आपको सुरक्षित रहना सिखाता है। कभी भी किसी अजनबी को अपना बैंक पासवर्ड या OTP न बताएं।'
              : lang === 'mr'
              ? 'लक्षात ठेवा: डिजिटल साथी तुम्हाला सुरक्षित राहण्यास मदत करतो. कधीही कोणाशीही आपला बँक पासवर्ड किंवा OTP शेअर करू नका.'
              : 'Remember: Never disclose your bank OTP or UPI PIN to anyone over the phone.'}
          </p>
        </div>

        {/* Close button */}
        <button
          id="btn-close-help-bottom"
          type="button"
          onClick={onClose}
          className="btn-tactile mt-5 w-full py-3.5 rounded-2xl bg-slate-200/80 hover:bg-slate-300 font-extrabold text-base text-slate-800 transition-colors cursor-pointer"
        >
          {t.closeHelp}
        </button>
      </div>
    </div>
  );
};

