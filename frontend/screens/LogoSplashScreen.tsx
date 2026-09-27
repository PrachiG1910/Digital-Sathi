import React, { useEffect } from 'react';
import { DigitalSathiLogo } from '../components/DigitalSathiLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LogoSplashScreenProps {
  onComplete: () => void;
}

export const LogoSplashScreen: React.FC<LogoSplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Automatically advance after 2.6 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      id="screen-logo-splash"
      onClick={onComplete}
      className="min-h-screen w-full bg-[#FBF9F5] flex flex-col items-center justify-center p-6 cursor-pointer select-none relative overflow-hidden"
    >
      {/* Gentle ambient background rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0D5C5A]/5 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#D96B43]/5 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      {/* Main Center Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
        <DigitalSathiLogo
          size="xl"
          showTagline={true}
          taglineText="Learn Visually. Practice Safely. Use Confidently."
        />

        {/* Visual trust pillars */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-md">
          <span className="px-4 py-1.5 rounded-full bg-white border border-[#0D5C5A]/20 text-[#0D5C5A] text-xs font-bold shadow-xs flex items-center gap-1.5">
            100% सुरक्षित
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white border border-[#D96B43]/20 text-[#C85A32] text-xs font-bold shadow-xs flex items-center gap-1.5">
            बुजुर्गों के लिए सरल
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-bold shadow-xs flex items-center gap-1.5">
            बोलकर सिखाने वाला साथी
          </span>
        </div>

        {/* Gentle skip/tap indicator */}
        <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm font-semibold animate-pulse">
          <span>आगे बढ़ रहे हैं...</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
