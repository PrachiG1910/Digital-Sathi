import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { speechService } from '../services/speech';
import { LanguageCode } from '../types';

interface VoiceButtonProps {
  text: string;
  lang: LanguageCode;
  voiceRate?: number;
  label?: string;
  size?: 'normal' | 'large' | 'compact';
  className?: string;
  autoPlay?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  text,
  lang,
  voiceRate = 0.92,
  label,
  size = 'normal',
  className = '',
  autoPlay = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (autoPlay && text) {
      const timer = setTimeout(() => {
        speechService.speak(text, lang, voiceRate);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [text, lang, autoPlay, voiceRate]);

  const toggleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      speechService.stop();
    } else {
      speechService.speak(text, lang, voiceRate);
    }
  };

  // Language specific default labels
  const defaultLabels: Record<LanguageCode, string> = {
    hi: 'सुनें',
    mr: 'ऐका',
    en: 'Listen',
  };

  const currentLabel = label || defaultLabels[lang] || 'Listen';

  const stopLabels: Record<LanguageCode, string> = {
    hi: 'रुकें',
    mr: 'थांबा',
    en: 'Stop',
  };

  const stopSpeakingLabels: Record<LanguageCode, string> = {
    hi: 'आवाज़ बंद करें',
    mr: 'आवाज बंद करा',
    en: 'Stop Speaking',
  };

  if (size === 'compact') {
    return (
      <button
        id="btn-voice-compact"
        type="button"
        onClick={toggleSpeak}
        title="Listen to this text"
        aria-label="Listen"
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-base font-semibold transition-all shadow-sm ${
          isSpeaking
            ? 'bg-[#C85A32] text-white animate-pulse ring-4 ring-[#C85A32]/20'
            : 'bg-[#0D5C5A]/10 text-[#0D5C5A] hover:bg-[#0D5C5A]/20 active:scale-95'
        } ${className}`}
      >
        {isSpeaking ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-[#0D5C5A]" />}
        <span>{isSpeaking ? stopLabels[lang] : currentLabel}</span>
      </button>
    );
  }

  if (size === 'large') {
    return (
      <button
        id="btn-voice-large"
        type="button"
        onClick={toggleSpeak}
        aria-label="Listen out loud"
        className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-xl font-bold transition-all shadow-md active:scale-[0.98] ${
          isSpeaking
            ? 'bg-[#C85A32] text-white animate-pulse ring-4 ring-[#C85A32]/25'
            : 'bg-[#0D5C5A] hover:bg-[#0A4846] text-white ring-4 ring-[#0D5C5A]/15'
        } ${className}`}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-7 h-7 animate-bounce" />
            <span>{stopSpeakingLabels[lang]}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-7 h-7 text-amber-300" />
            <span>{currentLabel}</span>
            <Sparkles className="w-5 h-5 text-amber-300 ml-1 opacity-80" />
          </>
        )}
      </button>
    );
  }

  return (
    <button
      id="btn-voice-normal"
      type="button"
      onClick={toggleSpeak}
      aria-label="Listen to content"
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-lg transition-all shadow-sm active:scale-95 border ${
        isSpeaking
          ? 'bg-[#C85A32] border-[#C85A32] text-white animate-pulse'
          : 'bg-white border-[#0D5C5A]/30 text-[#0D5C5A] hover:bg-[#0D5C5A]/5'
      } ${className}`}
    >
      {isSpeaking ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-[#0D5C5A]" />}
      <span>{isSpeaking ? stopLabels[lang] : currentLabel}</span>
    </button>
  );
};
