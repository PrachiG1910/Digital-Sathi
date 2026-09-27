import React, { useState } from 'react';
import { Download, Sparkles, X, CheckCircle2, Volume2, ShieldCheck, Smartphone } from 'lucide-react';
import { useInstallPrompt } from '../services/installPrompt';
import { LanguageCode } from '../types';
import { speechService } from '../services/speech';

interface InstallAppBannerProps {
  lang: LanguageCode;
  theme?: 'bright' | 'dark';
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({
  lang,
  theme = 'bright',
}) => {
  const { canInstall, isStandalone, installApp } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const isDark = theme === 'dark';

  // If already running inside installed standalone app or dismissed, don't show
  if (isStandalone || isDismissed) {
    return null;
  }

  const handleSpeakInstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text =
      lang === 'hi'
        ? 'इस ऐप को अपने फोन में हमेशा के लिए इंस्टॉल करने के लिए "ऐप इंस्टॉल करें" बटन दबाएं। इसके बाद यह बिना इंटरनेट के भी सीधे आपकी फोन स्क्रीन से खुलेगा।'
        : lang === 'mr'
        ? 'हे ॲप आपल्या फोनमध्ये कायमस्वरूपी इन्स्टॉल करण्यासाठी "ॲप इन्स्टॉल करा" बटण दाबा. यानंतर हे इंटरनेटशिवायही थेट फोन स्क्रीनवरून उघडेल.'
        : 'Click Install App to install Digital Sathi on your phone or PC. It will open directly like a regular app with offline support.';
    speechService.speak(text, lang);
  };

  const handleInstallClick = async () => {
    if (canInstall) {
      const ok = await installApp();
      if (ok) {
        setInstalledSuccess(true);
        setTimeout(() => setIsDismissed(true), 3000);
      }
    } else {
      // Guide the senior user how to install via browser menu if browser didn't fire prompt yet
      const msg =
        lang === 'hi'
          ? 'ऐप इंस्टॉल करने के लिए अपने ब्राउज़र के 3 डॉट्स (⋮) पर दबाएं और "Add to Home screen" या "Install" चुनें।'
          : lang === 'mr'
          ? 'ॲप इन्स्टॉल करण्यासाठी ब्राउझरच्या 3 डॉट्स (⋮) वर टॅप करा आणि "Add to Home screen" किंवा "Install" निवडा.'
          : 'To install, tap the 3 dots (⋮) in your browser menu and choose "Add to Home screen" or "Install".';
      speechService.speak(msg, lang);
      alert(msg);
    }
  };

  return (
    <div
      id="banner-pwa-install"
      className={`w-full max-w-xl mx-auto my-3 p-3.5 sm:p-4 rounded-2xl border-2 shadow-lg relative overflow-hidden transition-all animate-slide-in-up ${
        isDark
          ? 'bg-gradient-to-r from-slate-900 via-[#0D5C5A]/40 to-slate-900 border-[#0D5C5A] text-white'
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-[#0D5C5A]/30 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0D5C5A] to-[#08403E] text-white flex items-center justify-center shrink-0 shadow-md ring-2 ring-[#0D5C5A]/30">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-[#0D5C5A] dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {lang === 'hi' ? 'फोन में इंस्टॉल करें' : lang === 'mr' ? 'फोनमध्ये इन्स्टॉल करा' : 'Install on Phone / PC'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300">
              {lang === 'hi'
                ? '१-क्लिक में फोन स्क्रीन से खोलें • बिना इंटरनेट भी चलेगा'
                : lang === 'mr'
                ? '१-क्लिकमध्ये थेट स्क्रीनवरून उघडा • ऑफलाइनही चालते'
                : '1-click access from home screen • Works offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Audio Listen Guide */}
          <button
            type="button"
            onClick={handleSpeakInstall}
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#D96B43] hover:scale-105 transition-transform cursor-pointer shadow-xs"
            title="Listen to install info"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Big Action Install Button */}
          <button
            id="btn-trigger-pwa-install"
            type="button"
            onClick={handleInstallClick}
            className="py-2 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#D96B43] to-[#B84E27] hover:from-[#CD5B32] hover:to-[#A34320] text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md ring-2 ring-[#D96B43]/20 cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            {installedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'hi' ? 'इंस्टॉल हो गया!' : lang === 'mr' ? 'झाले!' : 'Installed!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{lang === 'hi' ? 'इंस्टॉल' : lang === 'mr' ? 'इन्स्टॉल' : 'Install'}</span>
              </>
            )}
          </button>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
