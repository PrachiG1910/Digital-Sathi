import React from 'react';
import { X, Youtube, ExternalLink, Search } from 'lucide-react';
import { LanguageCode } from '../types';

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  query: string;
  lang: LanguageCode;
}

export const YouTubeModal: React.FC<YouTubeModalProps> = ({
  isOpen,
  onClose,
  title,
  query,
  lang,
}) => {
  if (!isOpen) return null;

  // Curated friendly educational video embeds or search references
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  return (
    <div
      id="youtube-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="youtube-modal-content"
        className="w-full max-w-2xl bg-[#FBF9F5] rounded-3xl shadow-2xl border-2 border-red-500/20 p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Youtube className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                {lang === 'hi' ? 'वीडियो ट्यूटोरियल' : lang === 'mr' ? 'व्हिडिओ ट्यूटोरियल' : 'Video Tutorial'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{title}</h3>
            </div>
          </div>
          <button
            id="btn-close-youtube-modal"
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="w-11 h-11 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Honest YouTube search panel: this project stores search topics, not third-party video IDs. */}
        <div className="mt-5 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-inner flex flex-col items-center justify-center text-center p-6 text-white">
          <Search className="w-12 h-12 mb-3 text-red-400" />
          <p className="text-lg font-bold max-w-md">
            {lang === 'hi' ? `YouTube पर ${title} का आसान वीडियो खोजें` : lang === 'mr' ? `YouTube वर ${title} चा सोपा व्हिडिओ शोधा` : `Find a simple YouTube tutorial for: ${title}`}
          </p>
          <p className="text-sm text-slate-300 mt-2">
            {lang === 'hi' ? 'Digital Sathi किसी बाहरी वीडियो को होस्ट नहीं करता। नीचे दिए बटन से YouTube खोज खुलती है।' : lang === 'mr' ? 'Digital Sathi बाहेरील व्हिडिओ होस्ट करत नाही. खालील बटण YouTube शोध उघडते.' : 'Digital Sathi does not host third-party videos. The button opens a YouTube search for this lesson.'}
          </p>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg transition-all"
          >
            <Youtube className="w-5 h-5" />
            <span>{lang === 'hi' ? 'YouTube पर खोजें' : lang === 'mr' ? 'YouTube वर शोधा' : 'Search YouTube'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Senior Guidance Note */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
            <ExternalLink className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-base">{lang === 'hi' ? 'बुजुर्गों के लिए सुझाव:' : lang === 'mr' ? 'ज्येष्ठांसाठी सूचना:' : 'Senior-friendly tip:'}</p>
            <p className="text-sm font-medium mt-0.5 leading-relaxed">
              {lang === 'hi' ? 'YouTube में आवाज़ बढ़ाने के लिए फोन का वॉल्यूम बटन दबाएं। वापस आने के लिए YouTube टैब बंद करें।' : lang === 'mr' ? 'YouTube मध्ये आवाज वाढवण्यासाठी फोनचे व्हॉल्यूम बटण दाबा. परत येण्यासाठी YouTube टॅब बंद करा.' : 'Use your phone volume buttons on YouTube. Close the YouTube tab when you want to return.'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#0D5C5A] text-white font-bold text-lg hover:bg-[#0A4846] transition-colors shadow-md"
          >
            {lang === 'hi' ? 'समझ आ गया, वापस चलें' : lang === 'mr' ? 'समजले, परत चला' : 'Got it, go back'}
          </button>
        </div>
      </div>
    </div>
  );
};
