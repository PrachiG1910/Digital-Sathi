import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  taglineText?: string;
  className?: string;
  lang?: 'en' | 'hi' | 'mr';
}

export const DigitalSathiLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  taglineText = 'Learn Visually. Practice Safely. Use Confidently.',
  className = '',
  lang = 'en',
}) => {
  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl font-extrabold',
  };

  const taglineSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const badgeLabels = {
    en: 'Digital Companion',
    hi: 'डिजिटल साथी',
    mr: 'डिजिटल साथी',
  };

  return (
    <div id="digital-sathi-brand" className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative mb-3 flex items-center justify-center">
        {/* Outer gentle trust aura */}
        <div className="absolute inset-0 bg-[#0D5C5A]/10 rounded-full blur-xl transform scale-125" />
        
        {/* Logo Badge */}
        <div
          className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-[#0D5C5A] via-[#0A4846] to-[#083533] p-2.5 shadow-lg shadow-[#0D5C5A]/25 flex items-center justify-center border-2 border-[#15807D]/30`}
        >
          {/* Stylized Smartphone with Warm Helping Hands & Star */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Phone Body */}
            <rect
              x="26"
              y="12"
              width="48"
              height="76"
              rx="10"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* Phone Screen Area */}
            <rect
              x="30"
              y="18"
              width="40"
              height="60"
              rx="6"
              fill="#F0FDFA"
            />
            {/* Phone Speaker Notch */}
            <line
              x1="44"
              y1="15"
              x2="56"
              y2="15"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Warm Terracotta Companion Arc / Supporting Hand */}
            <path
              d="M18 68C18 52 32 40 50 40C68 40 82 52 82 68"
              stroke="#D96B43"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1 1"
            />
            {/* Heart of Care & Trust */}
            <path
              d="M50 48C46 43 40 44 38 48C35 54 50 63 50 63C50 63 65 54 62 48C60 44 54 43 50 48Z"
              fill="#D96B43"
            />
            {/* Digital Spark / Star */}
            <path
              d="M50 24L52 29L57 31L52 33L50 38L48 33L43 31L48 29L50 24Z"
              fill="#0D5C5A"
            />
            {/* Home indicator bar */}
            <line
              x1="42"
              y1="83"
              x2="58"
              y2="83"
              stroke="#CBD5E1"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Title */}
      <h1 className={`${textSizes[size]} font-bold tracking-tight text-[#0D5C5A] flex items-center gap-2`}>
        <span>Digital Sathi</span>
        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-[#D96B43]/15 text-[#C85A32] rounded-full border border-[#D96B43]/30">
          {badgeLabels[lang] || 'Digital Companion'}
        </span>
      </h1>

      {/* Brand Tagline */}
      {showTagline && (
        <p className={`${taglineSizes[size]} text-[#475569] font-medium mt-1 max-w-sm`}>
          {taglineText}
        </p>
      )}
    </div>
  );
};
