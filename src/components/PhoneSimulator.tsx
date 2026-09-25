import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  QrCode,
  Youtube,
  Settings,
  User,
  PhoneCall,
  Search,
  Mic,
  Send,
  Camera,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowUp,
  Volume2,
  Wifi,
  Battery,
  ShieldCheck,
  Video,
  Plus,
  Flashlight,
  Check,
  X,
  PhoneOff,
  Scan,
  Bell,
  AlertTriangle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PracticeTask, LanguageCode } from '../types';
import { speechService } from '../services/speech';

interface PhoneSimulatorProps {
  task: PracticeTask;
  lang: LanguageCode;
  onTaskComplete?: () => void;
  onNextTask?: () => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  task,
  lang,
  onTaskComplete,
  onNextTask,
}) => {
  // Step state within the task
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({
    type: 'info',
    message: task.stepsGuide[0] || task.instruction,
  });

  // App internal states
  const [activeApp, setActiveApp] = useState<'home' | 'phone' | 'whatsapp' | 'upi' | 'youtube' | 'settings'>('home');
  const [phoneTab, setPhoneTab] = useState<'keypad' | 'contacts'>('keypad');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [whatsappChat, setWhatsappChat] = useState<string | null>(null);
  const [whatsappMsgSent, setWhatsappMsgSent] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [voiceNoteSent, setVoiceNoteSent] = useState<boolean>(false);
  const [isVideoCalling, setIsVideoCalling] = useState<boolean>(false);
  const [upiAmount, setUpiAmount] = useState<string>('50');
  const [upiPaid, setUpiPaid] = useState<boolean>(false);
  const [upiSubStep, setUpiSubStep] = useState<'scanner_icon' | 'scanning' | 'add_amount' | 'enter_pin' | 'sms_popup' | 'fake_vs_real'>('scanner_icon');
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [ytSearched, setYtSearched] = useState<boolean>(false);
  const [ytPlaying, setYtPlaying] = useState<boolean>(false);
  const [incomingCallAnswered, setIncomingCallAnswered] = useState<boolean>(false);
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset state when task changes
  useEffect(() => {
    setCurrentStep(1);
    setIsCompleted(false);
    setShowHint(false);
    setSelectedContact(null);
    setIsCalling(false);
    setWhatsappChat(null);
    setWhatsappMsgSent(false);
    setIsRecordingVoice(false);
    setVoiceNoteSent(false);
    setIsVideoCalling(false);
    setUpiPaid(false);
    setUpiSubStep('scanner_icon');
    setEnteredPin('');
    setYtSearched(false);
    setYtPlaying(false);
    setIncomingCallAnswered(false);
    setFlashlightOn(false);

    if (task.targetApp === 'incoming_call') {
      setActiveApp('home');
    } else {
      setActiveApp('home');
    }

    const initMsg = task.stepsGuide[0] || task.instruction;
    setFeedback({
      type: 'info',
      message: initMsg,
    });
    speechService.speak(initMsg, lang);
  }, [task.id, lang]);

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const triggerSuccessCelebration = (customMsg?: string) => {
    setIsCompleted(true);
    const msg =
      customMsg ||
      (lang === 'hi'
        ? 'बहुत बढ़िया! आपने यह काम बिल्कुल सही तरीके से सीख लिया।'
        : lang === 'mr'
        ? 'खूप छान! तुम्ही हे काम अगदी योग्य पद्धतीने शिकलात.'
        : 'Splendid! You completed this task successfully.');

    setFeedback({
      type: 'success',
      message: msg,
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    speechService.speak(msg, lang);
    if (onTaskComplete) onTaskComplete();
  };

  const handleWrongClick = (elementName?: string) => {
    setShowHint(true);
    const errMsg =
      lang === 'hi'
        ? 'कोई बात नहीं  दोबारा कोशिश करें। हमने सही बटन को पीले रंग से घेरा है।'
        : lang === 'mr'
        ? 'काही हरकत नाही  पुन्हा प्रयत्न करा. आम्ही योग्य बटणाला पिवळा रंग दिला आहे.'
        : 'No worries at all  Let us try again. We have highlighted the right button.';

    setFeedback({
      type: 'error',
      message: errMsg,
    });
    speechService.speak(errMsg, lang);
  };

  const advanceStep = (nextStepNum: number, nextGuideIndex: number, successText?: string) => {
    setCurrentStep(nextStepNum);
    setShowHint(false);

    if (nextStepNum > task.totalSteps) {
      triggerSuccessCelebration(successText);
    } else {
      const nextGuide = task.stepsGuide[nextGuideIndex] || 'अगला कदम पूरा करें';
      setFeedback({
        type: 'info',
        message: nextGuide,
      });
      speechService.speak(nextGuide, lang);
    }
  };

  // RENDER SCREEN CONTENT BASED ON APP
  const renderScreen = () => {
    // 1. INCOMING CALL TASK
    if (task.targetApp === 'incoming_call') {
      if (!incomingCallAnswered) {
        return (
          <div className="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-between p-6 text-white text-center">
            <div className="mt-8">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold animate-pulse">
                इनकमिंग कॉल (Incoming Call)...
              </span>
              <div className="w-24 h-24 mx-auto mt-4 rounded-full bg-slate-700 border-4 border-white/20 flex items-center justify-center text-4xl shadow-xl">
                
              </div>
              <h3 className="text-2xl font-bold mt-3">रवि (बेटा / Ravi)</h3>
              <p className="text-slate-400 text-sm mt-1">+91 98765 12345</p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-emerald-300 font-medium mb-4 animate-bounce">
                फोन उठाने के लिए हरे बटन को छुएं 
              </p>
              <div className="flex items-center justify-around">
                <button
                  type="button"
                  onClick={() => handleWrongClick('Decline')}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg active:scale-95"
                >
                  <PhoneOff className="w-8 h-8 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIncomingCallAnswered(true);
                    advanceStep(2, 1, 'शाबाश! आपने कॉल उठा ली है। अब बातचीत करें।');
                  }}
                  className={`w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-2xl active:scale-95 animate-pulse ${
                    showHint ? 'ring-8 ring-amber-400' : ''
                  }`}
                >
                  <Phone className="w-10 h-10 text-white" />
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="h-full bg-slate-900 flex flex-col justify-between p-6 text-white text-center">
            <div className="mt-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-700 flex items-center justify-center text-3xl">
                
              </div>
              <h3 className="text-2xl font-bold mt-3">रवि (Ravi)</h3>
              <p className="text-emerald-400 text-base font-semibold mt-1">
                कॉल चालू है: 00:{callDuration < 10 ? `0${callDuration}` : callDuration}
              </p>
              <p className="text-xs text-slate-400 mt-2">"नमस्ते पिताजी! आप कैसे हैं?"</p>
            </div>
            <div className="mb-6">
              <p className="text-xs text-amber-300 mb-3">बात पूरी होने के बाद लाल बटन से काटें</p>
              <button
                type="button"
                onClick={() => {
                  setIsCalling(false);
                  triggerSuccessCelebration(
                    lang === 'hi'
                      ? 'शानदार! आपने कॉल उठाना और बात पूरी होने पर काटना सीख लिया।'
                      : 'Excellent! You answered the call and safely ended it.'
                  );
                }}
                className={`w-18 h-18 mx-auto rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-xl ${
                  showHint ? 'ring-8 ring-amber-400' : ''
                }`}
              >
                <PhoneOff className="w-9 h-9 text-white" />
              </button>
            </div>
          </div>
        );
      }
    }

    // 2. PHONE CALL TASK
    if (activeApp === 'phone') {
      if (isCalling) {
        return (
          <div className="h-full bg-slate-900 flex flex-col justify-between p-6 text-white text-center">
            <div className="mt-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#0D5C5A] border-4 border-white/20 flex items-center justify-center text-white shadow-xl">
                <User className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mt-4">{selectedContact || 'रवि (Ravi)'}</h3>
              <p className="text-emerald-400 text-lg font-semibold mt-1 animate-pulse">
                घंटी बज रही है... (Calling)
              </p>
              <p className="text-xs text-slate-400 mt-2">00:{callDuration < 10 ? `0${callDuration}` : callDuration}</p>
            </div>

            <div className="mb-8">
              <button
                type="button"
                onClick={() => {
                  setIsCalling(false);
                  triggerSuccessCelebration(
                    lang === 'hi'
                      ? 'बहुत बढ़िया! आपने रवि को कॉल लगाना सफलतापूर्वक सीख लिया।'
                      : 'Splendid! You successfully placed a phone call.'
                  );
                }}
                className={`w-18 h-18 mx-auto rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-xl active:scale-95 ${
                  showHint ? 'ring-8 ring-amber-400' : ''
                }`}
              >
                <PhoneOff className="w-9 h-9 text-white" />
              </button>
              <p className="text-xs text-slate-400 mt-2">कॉल काटने के लिए लाल बटन छुएं</p>
            </div>
          </div>
        );
      }

      return (
        <div className="h-full bg-white flex flex-col">
          {/* Top Bar */}
          <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span>फ़ोन (Phone)</span>
            </h4>
            <button
              type="button"
              onClick={() => setActiveApp('home')}
              className="text-xs font-semibold px-2 py-1 bg-slate-200 rounded text-slate-700"
            >
              होम
            </button>
          </div>

          {/* Sub tabs: Keypad / Contacts */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => {
                setPhoneTab('keypad');
                if (task.id === 'practice-call') handleWrongClick('Keypad');
              }}
              className={`flex-1 py-2 text-center font-bold text-sm ${
                phoneTab === 'keypad'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white'
                  : 'text-slate-500'
              }`}
            >
              कीपैड (Keypad)
            </button>
            <button
              type="button"
              onClick={() => {
                setPhoneTab('contacts');
                if (task.id === 'practice-call' && currentStep === 2) {
                  advanceStep(3, 2, 'शाबाश! अब सूची में से "रवि (Ravi)" के नाम पर छुएं।');
                }
              }}
              className={`flex-1 py-2 text-center font-bold text-sm transition-all ${
                phoneTab === 'contacts'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white'
                  : 'text-slate-500'
              } ${task.id === 'practice-call' && currentStep === 2 && showHint ? 'ring-4 ring-amber-400' : ''}`}
            >
              संपर्क (Contacts)
            </button>
          </div>

          {/* Screen Body */}
          {phoneTab === 'contacts' ? (
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              <div className="p-2 bg-slate-100 rounded-xl flex items-center gap-2 text-xs text-slate-500">
                <Search className="w-4 h-4" />
                <span>नाम खोजें (Search)...</span>
              </div>

              {/* Contact item Ravi */}
              <div
                onClick={() => {
                  if (task.id === 'practice-call' && currentStep === 3) {
                    setSelectedContact('रवि (Ravi)');
                    advanceStep(4, 3, 'बहुत खूब! अब हरे कॉल बटन को दबाकर घंटी बजाएं।');
                  }
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedContact === 'रवि (Ravi)'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                } ${task.id === 'practice-call' && currentStep === 3 && showHint ? 'ring-4 ring-amber-400 bg-amber-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    R
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">रवि (Ravi)</h5>
                    <p className="text-xs text-slate-500">बेटा • +91 98765 12345</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (task.id === 'practice-call' && (currentStep === 3 || currentStep === 4)) {
                      setSelectedContact('रवि (Ravi)');
                      setIsCalling(true);
                      advanceStep(5, 4);
                    }
                  }}
                  className={`w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow ${
                    task.id === 'practice-call' && currentStep === 4 ? 'animate-bounce ring-4 ring-emerald-300' : ''
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>

              {/* Other contacts */}
              <div
                onClick={() => handleWrongClick('Dr. Mehta')}
                className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between opacity-80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    D
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">डॉ. मेहता (Dr. Mehta)</h5>
                    <p className="text-xs text-slate-500">फैमिली डॉक्टर</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
              </div>

              <div
                onClick={() => handleWrongClick('Neha')}
                className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between opacity-80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                    N
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">नेहा (Beti Neha)</h5>
                    <p className="text-xs text-slate-500">बेटी</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>
          ) : (
            /* Keypad */
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="text-center py-4 border-b border-slate-200">
                <span className="text-2xl font-bold tracking-widest text-slate-800">
                  98765 12345
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 my-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleWrongClick(num)}
                    className="h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center active:scale-95"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex justify-center pb-2">
                <button
                  type="button"
                  onClick={() => handleWrongClick('Call')}
                  className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg"
                >
                  <Phone className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 3. WHATSAPP TASK
    if (activeApp === 'whatsapp') {
      if (whatsappChat) {
        return (
          <div className="h-full bg-[#E5DDD5] flex flex-col justify-between">
            {/* WhatsApp Chat Header */}
            <div className="p-2.5 bg-[#075E54] text-white flex items-center justify-between shadow">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWhatsappChat(null)}
                  className="text-white text-sm"
                >
                  ←
                </button>
                <div className="w-9 h-9 rounded-full bg-emerald-200 text-emerald-950 font-bold flex items-center justify-center text-sm">
                  N
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">नेहा बेटी (Neha)</h4>
                  <p className="text-[10px] text-emerald-200">ऑनलाइन (Online)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoCalling(true);
                    triggerSuccessCelebration('शाबाश! आपने व्हाट्सऐप पर वीडियो कॉल शुरू कर दी है।');
                  }}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                >
                  <Video className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCalling(true);
                    triggerSuccessCelebration('शाबाश! आपने व्हाट्सऐप वॉइस कॉल शुरू कर दी है।');
                  }}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-sm max-w-[80%] text-xs text-slate-800">
                <p>प्रणाम पापा जी! आप कैसे हैं? सब ठीक है ना?</p>
                <span className="text-[9px] text-slate-400 block text-right mt-1">10:45 AM</span>
              </div>

              {whatsappMsgSent && (
                <div className="bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-sm max-w-[80%] ml-auto text-xs text-slate-800 animate-in fade-in">
                  <p>नमस्ते बेटी! सब बढ़िया है।</p>
                  <span className="text-[9px] text-emerald-700 block text-right mt-1">10:46 AM </span>
                </div>
              )}

              {voiceNoteSent && (
                <div className="bg-[#DCF8C6] p-2 rounded-xl rounded-tr-none shadow-sm max-w-[85%] ml-auto flex items-center gap-2 text-xs text-slate-800 animate-in fade-in">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-emerald-500 rounded-full w-full" />
                    <span className="text-[9px] text-slate-500">वॉइस मैसेज (0:05)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-2 bg-slate-100 flex items-center gap-2 border-t border-slate-200">
              {task.id === 'practice-whatsapp-msg' ? (
                <>
                  <div
                    onClick={() => {
                      if (currentStep === 3) {
                        advanceStep(4, 3, 'बहुत बढ़िया! अब हरे तीर वाले Send बटन पर छुएं।');
                      }
                    }}
                    className={`flex-1 bg-white py-2 px-3 rounded-full text-xs text-slate-700 border cursor-pointer ${
                      currentStep === 3 && showHint ? 'ring-4 ring-amber-400' : 'border-slate-300'
                    }`}
                  >
                    {currentStep >= 4 ? 'नमस्ते बेटी! सब बढ़िया है।' : 'नमस्ते बेटी (संदेश लिखने के लिए छुएं)...'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 4) {
                        setWhatsappMsgSent(true);
                        triggerSuccessCelebration(
                          lang === 'hi'
                            ? 'बहुत खूब! आपने व्हाट्सऐप पर संदेश भेजना सीख लिया।'
                            : 'Great! You successfully sent a WhatsApp message.'
                        );
                      } else {
                        handleWrongClick('Send');
                      }
                    }}
                    className={`w-10 h-10 rounded-full bg-[#075E54] text-white flex items-center justify-center shadow active:scale-95 ${
                      currentStep === 4 ? 'animate-bounce ring-4 ring-emerald-300' : ''
                    } ${currentStep === 4 && showHint ? 'ring-4 ring-amber-400' : ''}`}
                  >
                    <Send className="w-5 h-5 ml-0.5" />
                  </button>
                </>
              ) : task.id === 'practice-whatsapp-voice' ? (
                <>
                  <div className="flex-1 bg-white py-2 px-3 rounded-full text-xs text-slate-500 border border-slate-300">
                    माइक दबाकर बोलें...
                  </div>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setIsRecordingVoice(true);
                      advanceStep(3, 2, 'बोलिए... संदेश जाने के लिए माइक छोड़ दें!');
                    }}
                    onMouseUp={() => {
                      setIsRecordingVoice(false);
                      setVoiceNoteSent(true);
                      triggerSuccessCelebration(
                        lang === 'hi'
                          ? 'शानदार! आपने बिना टाइप किए अपनी आवाज़ में संदेश भेजना सीख लिया।'
                          : 'Splendid! You sent a voice note on WhatsApp.'
                      );
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isRecordingVoice
                        ? 'bg-red-600 scale-110 text-white animate-pulse'
                        : 'bg-[#128C7E] text-white'
                    } ${currentStep === 2 && showHint ? 'ring-4 ring-amber-400' : ''}`}
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <div className="text-xs text-slate-500">व्हाट्सऐप चैट चालू है</div>
              )}
            </div>
          </div>
        );
      }

      // WhatsApp Chats List
      return (
        <div className="h-full bg-white flex flex-col">
          <div className="p-3 bg-[#075E54] text-white flex items-center justify-between shadow">
            <h4 className="font-bold text-base">WhatsApp</h4>
            <div className="flex gap-2">
              <Search className="w-4 h-4" />
              <button
                type="button"
                onClick={() => setActiveApp('home')}
                className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold"
              >
                होम
              </button>
            </div>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-1">
            <div
              onClick={() => {
                if (task.id === 'practice-whatsapp-msg' || task.id === 'practice-whatsapp-voice') {
                  setWhatsappChat('Neha');
                  if (currentStep === 2) {
                    advanceStep(3, 2);
                  }
                }
              }}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                currentStep === 2 && showHint ? 'ring-4 ring-amber-400 bg-amber-50' : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center">
                  N
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">नेहा बेटी (Neha)</h5>
                  <p className="text-xs text-slate-500">प्रणाम पापा जी! आप कैसे हैं?</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">10:45 AM</span>
            </div>

            <div
              onClick={() => handleWrongClick('Ravi Chat')}
              className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between opacity-70"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-200 text-blue-900 font-bold flex items-center justify-center">
                  R
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">रवि (Ravi)</h5>
                  <p className="text-xs text-slate-500">हाँ पिताजी, मैं शाम को आऊंगा।</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">कल</span>
            </div>
          </div>
        </div>
      );
    }

    // 4. UPI PAYMENT TASK
    if (activeApp === 'upi') {
      return (
        <div className="h-full bg-slate-50 flex flex-col justify-between overflow-hidden">
          {/* Top UPI Header */}
          <div className="p-3 bg-[#0D5C5A] text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <h4 className="font-bold text-sm">
                {lang === 'hi' ? 'सुरक्षित UPI पेमेंट्स' : 'Safe UPI Payments'}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveApp('home')}
              className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold"
            >
              {lang === 'hi' ? 'होम' : 'Home'}
            </button>
          </div>

          {/* SUB-STEP 1: Scanner Icon Explained & Highlighted */}
          {upiSubStep === 'scanner_icon' && (
            <div className="p-4 flex-1 flex flex-col justify-between text-center animate-in fade-in">
              <div className="my-auto">
                <span className="px-3 py-1 rounded-full bg-teal-100 text-[#0D5C5A] text-xs font-black inline-block mb-3">
                  {lang === 'hi' ? 'कदम 1: स्कैनर आइकन की पहचान' : 'Step 1: The Scanner Icon'}
                </span>

                {/* Big Spotlight on Scanner Icon */}
                <div className="p-4 rounded-3xl bg-white border-2 border-amber-400 shadow-xl max-w-[280px] mx-auto text-center relative">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg mb-3 animate-bounce ring-4 ring-amber-300/50">
                    <Scan className="w-11 h-11 stroke-[2.5]" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    {lang === 'hi' ? 'यह स्कैनर आइकन है' : 'This is the Scanner Icon'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {lang === 'hi'
                      ? 'दुकान पर पेमेंट करने के लिए सबसे पहले इसी चौकोर कैमरे वाले स्कैनर आइकन को दबाया जाता है।'
                      : 'To pay at any shop, tap this square camera Scanner icon to open the camera scanner.'}
                  </p>
                </div>

                <div className="mt-4 p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-[#0D5C5A] text-[11px] font-medium max-w-[280px] mx-auto">
                  PhonePe, Google Pay, Paytm में यह आइकन सबसे ऊपर या नीचे रहता है।
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpiSubStep('scanning');
                  advanceStep(2, 1, lang === 'hi' ? 'कैमरा खुल गया है! अब QR कोड स्कैन करें।' : 'Camera opened! Now scan the QR code.');
                }}
                className={`w-full py-3.5 px-6 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                  showHint ? 'ring-4 ring-amber-400 animate-pulse' : ''
                }`}
              >
                <Scan className="w-5 h-5" />
                <span>
                  {lang === 'hi' ? 'स्कैनर आइकन को दबाएं (Open Scanner)' : 'Tap the Scanner Icon'}
                </span>
              </button>
            </div>
          )}

          {/* SUB-STEP 2: Camera Viewfinder & Scan Standee */}
          {upiSubStep === 'scanning' && (
            <div className="p-4 flex-1 flex flex-col justify-between text-center animate-in fade-in">
              <div className="my-auto">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black inline-block mb-3">
                  {lang === 'hi' ? 'कदम 2: QR कोड स्कैन करें' : 'Step 2: Scan QR Code'}
                </span>

                {/* Viewfinder with Vendor QR Standee */}
                <div className="w-64 h-64 mx-auto rounded-3xl bg-slate-900 border-4 border-teal-500 relative p-3 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                  {/* Scanning line animation */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse top-1/2 -translate-y-1/2 shadow-lg" />

                  {/* Standee */}
                  <div className="w-36 p-3 rounded-2xl bg-white text-slate-900 shadow-md text-center border border-slate-300">
                    <div className="text-[9px] font-black text-purple-700 mb-1">
                      PhonePe / UPI QR
                    </div>
                    <QrCode className="w-20 h-20 mx-auto text-slate-900" />
                    <span className="text-[10px] font-extrabold text-slate-800 block mt-1">
                      शर्मा जी सब्जी भंडार
                    </span>
                  </div>

                  <span className="absolute bottom-2 text-[10px] text-teal-200 font-semibold bg-black/60 px-2 py-0.5 rounded-full">
                    6-10 इंच दूर सीधा रखें
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpiSubStep('add_amount');
                  advanceStep(3, 2, lang === 'hi' ? 'स्कैन हो गया! अब ₹50 रकम जोड़ें।' : 'Scanned! Now add the amount ₹50.');
                }}
                className={`w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                  showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <Camera className="w-5 h-5" />
                <span>
                  {lang === 'hi' ? 'QR कोड स्कैन करें (Tap to Scan)' : 'Scan the QR Code'}
                </span>
              </button>
            </div>
          )}

          {/* SUB-STEP 3: Add Amount (रकम जोड़ना) */}
          {upiSubStep === 'add_amount' && (
            <div className="p-4 flex-1 flex flex-col justify-between animate-in fade-in">
              <div>
                <span className="px-3 py-1 rounded-full bg-teal-100 text-[#0D5C5A] text-xs font-black inline-block mb-3">
                  {lang === 'hi' ? 'कदम 3: दुकानदार का नाम और रकम जोड़ना' : 'Step 3: Verify & Add Amount'}
                </span>

                {/* Verified Merchant Banner */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                    मर्चेंट
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">शर्मा जी सब्जी भंडार</h5>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'वेरीफाइड मर्चेंट (सुरक्षित)' : 'Verified Merchant'}</span>
                    </p>
                  </div>
                </div>

                {/* Amount Input Box */}
                <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-[#0D5C5A] text-center shadow-sm">
                  <span className="text-xs text-slate-500 font-bold block mb-1">
                    {lang === 'hi' ? 'रकम जोड़ें (Add Amount)' : 'Add Amount'}
                  </span>
                  <div className="flex items-center justify-center gap-1 text-3xl font-black text-[#0D5C5A]">
                    <span>₹</span>
                    <span>{upiAmount}</span>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div className="mt-3 flex gap-2 justify-center">
                  {['10', '50', '100'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setUpiAmount(amt)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        upiAmount === amt
                          ? 'bg-[#0D5C5A] text-white border-[#0D5C5A]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      + ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>जरूरी नियम:</strong> भुगतान करने से पहले दुकानदार से स्क्रीन पर दिख रहा नाम जरूर पूछें।
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpiSubStep('enter_pin');
                  advanceStep(4, 3, lang === 'hi' ? 'अब अपना गुप्त UPI PIN डालें।' : 'Now enter your secret UPI PIN.');
                }}
                className={`w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                  showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {lang === 'hi' ? `₹${upiAmount} रकम जोड़कर Pay करें` : `Pay ₹${upiAmount}`}
                </span>
              </button>
            </div>
          )}

          {/* SUB-STEP 4: Safe UPI PIN Entry */}
          {upiSubStep === 'enter_pin' && (
            <div className="p-4 flex-1 flex flex-col justify-between text-center animate-in fade-in">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black inline-block mb-3">
                  {lang === 'hi' ? 'कदम 4: गुप्त UPI PIN दर्ज करें' : 'Step 4: Secret UPI PIN'}
                </span>

                <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-xl max-w-[280px] mx-auto">
                  <span className="text-xs font-bold text-amber-400 block">UPI PIN स्क्रीन</span>
                  <p className="text-[11px] text-slate-300 mt-1">शर्मा जी सब्जी भंडार को ₹{upiAmount} भेजने के लिए</p>

                  <div className="flex justify-center gap-3 my-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full bg-white shadow-inner animate-pulse"
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-400">•••• (पिन सुरक्षित है)</span>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 text-xs text-left max-w-[280px] mx-auto">
                  <strong className="block font-black text-rose-800 mb-1">स्वर्ण सुरक्षा नियम:</strong>
                  UPI PIN सिर्फ आपके खाते से पैसे कटने पर ही डलता है! पैसे प्राप्त करने के लिए कभी PIN नहीं डालना पड़ता।
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpiPaid(true);
                  setUpiSubStep('sms_popup');
                  advanceStep(5, 4, lang === 'hi' ? 'पेमेंट सफल हुआ! अब स्क्रीन पर बैंक SMS पॉप-अप देखें।' : 'Payment successful! Now see the bank SMS pop-up.');
                }}
                className={`w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                  showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>
                  {lang === 'hi' ? 'PIN 1234 डालकर Pay करें' : 'Confirm PIN & Pay'}
                </span>
              </button>
            </div>
          )}

          {/* SUB-STEP 5: Bank SMS Pop-Up Animation */}
          {upiSubStep === 'sms_popup' && (
            <div className="p-4 flex-1 flex flex-col justify-between text-center relative overflow-hidden animate-in fade-in">
              {/* Animated Bank SMS Banner dropping from the top */}
              <div
                onClick={() => setUpiSubStep('fake_vs_real')}
                className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-2xl border-2 border-emerald-500 text-left cursor-pointer animate-in slide-in-from-top-6 duration-700 ring-4 ring-emerald-300/40"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                    <Bell className="w-4 h-4 text-emerald-600 fill-emerald-600 animate-bounce" />
                    <span>VK-HDFCBK (बैंक SMS अलर्ट)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">अभी-अभी</span>
                </div>
                <p className="text-xs text-slate-800 leading-snug">
                  "Dear Customer, A/c *4521 debited for <strong>INR {upiAmount}.00</strong> on 09-Sep at Sharma Veggies. Avl Bal: INR 14,250.00."
                </p>
                <div className="mt-2 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg flex items-center justify-between">
                  <span> यह बैंक मैसेज ऊपर आ गया है!</span>
                  <span className="underline">पहचान सीखें &rarr;</span>
                </div>
              </div>

              {/* Payment Success Card */}
              <div className="my-auto py-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl mb-2">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-emerald-800">₹{upiAmount}</h3>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {lang === 'hi' ? 'भुगतान सफल हुआ! ' : 'Payment Successful! '}
                </p>
                <span className="text-xs text-slate-500">शर्मा जी सब्जी भंडार</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpiSubStep('fake_vs_real');
                  const guide = lang === 'hi' ? 'अब असली और फर्जी बैंक मैसेज की पहचान समझें।' : 'Now understand the difference between Real and Fake bank messages.';
                  setFeedback({ type: 'info', message: guide });
                  speechService.speak(guide, lang);
                }}
                className={`w-full py-3.5 px-4 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-bold text-sm shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                  showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>
                  {lang === 'hi' ? 'बैंक SMS देखें: असली vs फर्जी पहचानें' : 'Check Real vs Fake Bank SMS'}
                </span>
              </button>
            </div>
          )}

          {/* SUB-STEP 6: Real vs Fake Bank Message Explanation & Verification */}
          {upiSubStep === 'fake_vs_real' && (
            <div className="p-3.5 flex-1 flex flex-col justify-between overflow-y-auto animate-in fade-in">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black inline-block mb-2">
                  {lang === 'hi' ? 'कदम 5: असली बनाम फर्जी बैंक मैसेज' : 'Step 5: Real vs Fake Bank SMS'}
                </span>

                <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                  {lang === 'hi' ? 'कौन सा SMS असली है और कौन सा फर्जी?' : 'Which SMS is Real and which is Fake?'}
                </h4>

                <div className="space-y-2.5">
                  {/* Card 1: REAL SMS */}
                  <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-left shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        <span>{lang === 'hi' ? '1. असली बैंक SMS (REAL )' : '1. Real Bank SMS (REAL )'}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                        VK-HDFCBK
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-tight">
                      "A/c *4521 debited INR {upiAmount}.00. Avl Bal: INR 14,250.00."
                    </p>
                    <div className="mt-2 text-[10px] text-emerald-900 bg-emerald-100/70 p-2 rounded-xl space-y-0.5 font-semibold">
                      <p> 6 अक्षरों का बैंक कोड (VK-HDFCBK, AX-SBINB)</p>
                      <p> कटी हुई रकम और बचा हुआ बैंक बैलेंस लिखा होता है</p>
                      <p> इसमें कोई लिंक नहीं होता</p>
                    </div>
                  </div>

                  {/* Card 2: FAKE SMS */}
                  <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-500 text-left shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-rose-900 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>{lang === 'hi' ? '2. फर्जी / फ्रॉड SMS (FAKE )' : '2. Fraud Scam SMS (FAKE )'}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-bold">
                        +91 98765 43210
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-tight">
                      "बधाई! ₹5,000 लॉटरी खाते में आई है। तुरंत bit.ly/claim दबाएं और UPI PIN डालकर पैसे पाएं।"
                    </p>
                    <div className="mt-2 text-[10px] text-rose-900 bg-rose-100/70 p-2 rounded-xl space-y-0.5 font-semibold">
                      <p> साधारण 10-अंकों वाला फोन नंबर (बैंक ऐसा नहीं करता)</p>
                      <p> पैसे पाने के लिए PIN मांगना (पिन सिर्फ कटने के लिए होता है!)</p>
                      <p> खतरनाक लिंक (Phishing Link)</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  triggerSuccessCelebration(
                    lang === 'hi'
                      ? 'शानदार! आपने स्कैनर आइकन, QR स्कैन करना, रकम जोड़ना और असली बैंक SMS पहचानना सीख लिया।'
                      : 'Congratulations! You mastered the QR scanner icon, adding amount, and identifying real vs fake bank SMS.'
                  );
                }}
                className={`mt-2 w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                  showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>
                  {lang === 'hi' ? 'मैं समझ गया! अभ्यास पूरा करें' : 'I Understand! Complete Practice'}
                </span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // 5. YOUTUBE TASK
    if (activeApp === 'youtube') {
      if (ytPlaying) {
        return (
          <div className="h-full bg-slate-950 text-white flex flex-col justify-between">
            <div className="p-2 bg-slate-900 flex items-center justify-between">
              <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveApp('home')}
                className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold text-white"
              >
                होम
              </button>
            </div>

            <div className="p-4 text-center">
              <div className="aspect-video w-full rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-2xl">
                <Play className="w-12 h-12 fill-white" />
              </div>
              <h4 className="font-bold text-base mt-3 text-white">श्री हनुमान चालीसा (पूर्ण पाठ)</h4>
              <p className="text-xs text-slate-400 mt-1">हरिहरन • टी-सीरीज़ भक्ति</p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <span className="text-emerald-400 text-xs font-semibold">बज रहा है (Playing)</span>
              </div>
            </div>

            <div className="p-4">
              <button
                type="button"
                onClick={() => {
                  triggerSuccessCelebration(
                    lang === 'hi'
                      ? 'बहुत बढ़िया! आपने बोलकर यूट्यूब पर भजन चलाना सीख लिया।'
                      : 'Great! You played your favorite video using voice search.'
                  );
                }}
                className="w-full py-3 rounded-xl bg-[#0D5C5A] text-white font-bold text-sm shadow"
              >
                अभ्यास पूरा हुआ (Finish)
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="h-full bg-white flex flex-col justify-between">
          <div className="p-3 bg-red-600 text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 fill-white text-red-600" />
              <h4 className="font-bold text-sm">यूट्यूब (YouTube)</h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveApp('home')}
              className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold"
            >
              होम
            </button>
          </div>

          <div className="p-3">
            {/* Search bar with Mic */}
            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-full border border-slate-300">
              <Search className="w-4 h-4 text-slate-400 ml-2" />
              <span className="flex-1 text-xs text-slate-500">
                {ytSearched ? 'हनुमान चालीसा' : 'सर्च करें या बोलें...'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setYtSearched(true);
                  advanceStep(3, 2, 'शाबाश! "हनुमान चालीसा" वीडियो आ गया है। वीडियो पर छुएं।');
                }}
                className={`w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow ${
                  currentStep === 2 && showHint ? 'ring-4 ring-amber-400' : ''
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            {/* Results list */}
            {ytSearched && (
              <div className="mt-4 space-y-3">
                <div
                  onClick={() => {
                    setYtPlaying(true);
                    advanceStep(4, 3);
                  }}
                  className={`p-2 rounded-xl border flex gap-3 cursor-pointer ${
                    currentStep === 3 && showHint ? 'ring-4 ring-amber-400 bg-amber-50' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="w-24 h-16 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xl shrink-0">
                    
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs line-clamp-2">
                      श्री हनुमान चालीसा (पूर्ण पाठ) - हरिहरन
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1">भक्ति सागर • 1.2 Crore views</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            माइक दबाकर अपनी पसंद का गाना या भजन बोलें
          </div>
        </div>
      );
    }

    // 6. DEFAULT VIRTUAL HOME SCREEN (APP ICONS)
    return (
      <div className="h-full bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] text-white flex flex-col justify-between p-4">
        {/* Top Status Clock & Icons */}
        <div className="flex items-center justify-between text-xs text-slate-300 px-1 pt-1">
          <span className="font-bold">10:30 AM</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
            <span>85%</span>
          </div>
        </div>

        {/* Date / Greeting widget */}
        <div className="text-center my-3">
          <p className="text-xs text-slate-300 font-medium">आज, सोमवार</p>
          <h3 className="text-3xl font-light tracking-wide text-white mt-0.5">10:30</h3>
        </div>

        {/* Realistic Grid of App Icons with Large Touch Targets */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-2 my-auto px-1">
          {/* Phone App */}
          <button
            type="button"
            onClick={() => {
              if (task.targetApp === 'phone') {
                setActiveApp('phone');
                advanceStep(2, 1, 'बहुत बढ़िया! अब नीचे Contacts (संपर्क) पर छुएं।');
              } else {
                handleWrongClick('Phone');
              }
            }}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90 ${
              task.targetApp === 'phone' && currentStep === 1 && showHint ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Phone className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">फ़ोन (Phone)</span>
          </button>

          {/* WhatsApp App */}
          <button
            type="button"
            onClick={() => {
              if (task.targetApp === 'whatsapp') {
                setActiveApp('whatsapp');
                advanceStep(2, 1, 'बहुत अच्छा! अब नेहा बेटी की चैट खोलें।');
              } else {
                handleWrongClick('WhatsApp');
              }
            }}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90 ${
              task.targetApp === 'whatsapp' && currentStep === 1 && showHint ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-[#128C7E] text-white flex items-center justify-center shadow-lg shadow-green-600/30">
              <MessageCircle className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">WhatsApp</span>
          </button>

          {/* UPI App */}
          <button
            type="button"
            onClick={() => {
              if (task.targetApp === 'upi') {
                setActiveApp('upi');
                setUpiSubStep('scanner_icon');
                setCurrentStep(1);
                const guide = lang === 'hi'
                  ? 'शाबाश! अब UPI ऐप में सबसे पहले स्कैनर आइकन को पहचानें और छुएं।'
                  : 'Well done! Now identify and tap the QR Scanner icon.';
                setFeedback({ type: 'info', message: guide });
                speechService.speak(guide, lang);
              } else {
                handleWrongClick('UPI');
              }
            }}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90 ${
              task.targetApp === 'upi' && currentStep === 1 && showHint ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D5C5A] to-[#0A4846] text-white flex items-center justify-center shadow-lg shadow-teal-700/30">
              <QrCode className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">UPI Pay</span>
          </button>

          {/* YouTube App */}
          <button
            type="button"
            onClick={() => {
              if (task.targetApp === 'youtube') {
                setActiveApp('youtube');
                advanceStep(2, 1, 'शानदार! अब सर्च बार के बगल वाले माइक पर छुएं।');
              } else {
                handleWrongClick('YouTube');
              }
            }}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90 ${
              task.targetApp === 'youtube' && currentStep === 1 && showHint ? 'ring-4 ring-amber-400 bg-amber-400/20' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
              <Youtube className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">YouTube</span>
          </button>

          {/* Flashlight toggle */}
          <button
            type="button"
            onClick={() => {
              setFlashlightOn(!flashlightOn);
              speechService.speak(flashlightOn ? 'टॉर्च बंद की गई' : 'टॉर्च जलाई गई', lang);
            }}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                flashlightOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <Flashlight className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">
              {flashlightOn ? 'टॉर्च ऑन' : 'टॉर्च'}
            </span>
          </button>

          {/* Emergency SOS */}
          <button
            type="button"
            onClick={() => {
              const msg =
                lang === 'mr'
                  ? '112 आपत्कालीन SOS सेवा डायल केली जात आहे'
                  : '112 Emergency SOS: आपातकालीन सेवा डायल की जा रही है';
              setFeedback({ type: 'info', message: msg });
              speechService.speak(msg, lang);
            }}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-transform active:scale-90 cursor-pointer touch-manipulation select-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-800 text-white flex items-center justify-center shadow-lg shadow-red-900/40">
              <span className="text-xs font-extrabold tracking-tighter">SOS</span>
            </div>
            <span className="text-xs font-bold text-red-400">112 आपातकाल</span>
          </button>
        </div>

        {/* Bottom Navigation Dock */}
        <div className="py-2 px-6 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-around border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Phone className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <MessageCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Camera className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="practice-phone-simulator" className="flex flex-col lg:flex-row items-center gap-8 justify-center w-full max-w-5xl mx-auto">
      {/* Left / Top Guide Column */}
      <div className="w-full lg:w-1/2 space-y-4">
        {/* Task Header */}
        <div className="p-5 rounded-3xl bg-white border-2 border-[#0D5C5A]/20 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0D5C5A]/10 text-[#0D5C5A] font-bold text-sm">
              {lang === 'mr' ? `पायरी ${currentStep} / ${task.totalSteps}` : `कदम ${currentStep} / ${task.totalSteps}`}
            </span>
            <button
              type="button"
              onClick={() => {
                speechService.speak(feedback.message, lang);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Listen instruction"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{task.title}</h3>

          {/* Feedback & Current Instruction Banner */}
          <div
            className={`mt-4 p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : feedback.type === 'error'
                ? 'bg-amber-50 border-amber-500 text-amber-950'
                : 'bg-teal-50 border-teal-400 text-teal-950'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            ) : feedback.type === 'error' ? (
              <AlertCircle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-7 h-7 text-[#0D5C5A] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-lg font-bold leading-snug">{feedback.message}</p>
            </div>
          </div>

          {/* Steps Checklist for Senior Clarity */}
          <div className="mt-4 space-y-2">
            {task.stepsGuide.map((stepDesc, idx) => {
              const stepIdx = idx + 1;
              const isPast = stepIdx < currentStep || isCompleted;
              const isCurrent = stepIdx === currentStep && !isCompleted;

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
                    isPast
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                      : isCurrent
                      ? 'bg-[#0D5C5A]/10 border-[#0D5C5A] text-[#0D5C5A] font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#0D5C5A] text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isPast ? '' : stepIdx}
                  </div>
                  <span className="text-sm font-medium">{stepDesc}</span>
                </div>
              );
            })}
          </div>

          {/* Actions: Restart / Hint */}
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                setIsCompleted(false);
                setShowHint(false);
                setActiveApp('home');
                setSelectedContact(null);
                setIsCalling(false);
                setWhatsappChat(null);
                setWhatsappMsgSent(false);
                setUpiPaid(false);
                setYtSearched(false);
                setYtPlaying(false);
                const initMsg = task.stepsGuide[0] || task.instruction;
                setFeedback({ type: 'info', message: initMsg });
                speechService.speak(initMsg, lang);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{lang === 'mr' ? 'पुन्हा सुरू करा' : 'शुरू से करें'}</span>
            </button>

            {isCompleted && onNextTask && (
              <button
                type="button"
                onClick={onNextTask}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{lang === 'mr' ? 'पुढील सराव करा →' : 'अगला अभ्यास करें →'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right / Bottom: The Realistic Virtual Smartphone */}
      <div className="relative w-full flex flex-col items-center">
        {/* Smartphone Frame Outer Bezel */}
        <div
          id="virtual-phone-outer-frame"
          className="w-full max-w-[315px] sm:max-w-[350px] h-[580px] sm:h-[680px] bg-[#1E293B] rounded-[40px] sm:rounded-[48px] p-2.5 sm:p-3.5 shadow-2xl border-3 sm:border-4 border-slate-700 relative ring-4 sm:ring-8 ring-slate-900/40 mx-auto"
        >
          {/* Top Notch / Speaker Ear Piece */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-3.5 sm:h-4 bg-[#0F172A] rounded-full z-30 flex items-center justify-center pointer-events-none">
            <div className="w-8 sm:w-10 h-1 sm:h-1.5 bg-slate-700 rounded-full" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-800 rounded-full ml-2 sm:ml-3" />
          </div>

          {/* Screen Display Area */}
          <div
            id="virtual-phone-screen-display"
            className="w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-black relative select-none pt-3 sm:pt-4"
          >
            {renderScreen()}
          </div>

          {/* Bottom Virtual Home Bar indicator */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-1 bg-white/40 rounded-full pointer-events-none" />
        </div>

        {/* Floating guidance callout */}
        <div className="mt-3 text-center">
          <p className="text-xs font-semibold text-slate-500">
            {lang === 'mr' ? 'प्रत्यक्ष फोनप्रमाणे स्क्रीनवर स्पर्श करून वापरा' : 'असली फोन की तरह स्क्रीन को छूकर चलाएं'}
          </p>
        </div>
      </div>
    </div>
  );
};
