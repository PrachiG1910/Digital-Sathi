import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, ShieldAlert, Volume2, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';
import confetti from 'canvas-confetti';

interface SafetyQuizScreenProps {
  lang: LanguageCode;
  onBack: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const SafetyQuizScreen: React.FC<SafetyQuizScreenProps> = ({ lang, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const t = translations[lang];

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question:
        lang === 'hi'
          ? 'कोई व्यक्ति फोन करके कहता है कि वह आपके बैंक से बोल रहा है और KYC के लिए OTP मांगता है। आपको क्या करना चाहिए?'
          : lang === 'mr'
          ? 'एखादी व्यक्ती फोन करून सांगते की ती तुमच्या बँकेतून बोलत आहे आणि KYC साठी OTP मागत आहे. तुम्ही काय करावे?'
          : 'Someone calls claiming to be from your bank and asks for an OTP for KYC. What should you do?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) तुरंत फोन काट दें और किसी को OTP न बताएं'
              : lang === 'mr'
              ? 'A) त्वरित फोन कट करा आणि कोणालाही OTP सांगू नका'
              : 'A) Hang up immediately and never share the OTP',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'बिल्कुल सही! असली बैंक कभी भी फोन पर OTP नहीं मांगता। फोन तुरंत काट देना ही सबसे सुरक्षित उपाय है।'
              : 'Correct! Real banks never ask for OTP over the phone.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) OTP बता दें ताकि बैंक खाता बंद न हो'
              : lang === 'mr'
              ? 'B) OTP सांगा जेणेकरून खाते बंद होणार नाही'
              : 'B) Disclose the OTP so the bank account is not blocked',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'गलत! यह फ्रॉड कॉल है। OTP बताने से आपके बैंक से पैसे कट सकते हैं।'
              : 'Incorrect! This is a fraud call. Never share OTP.',
        },
      ],
    },
    {
      id: 2,
      question:
        lang === 'hi'
          ? 'व्हाट्सऐप पर एक अनजान मैसेज आया: "आपको 25 लाख की लॉटरी लगी है, इस नीले लिंक पर क्लिक करें।" आपको क्या करना चाहिए?'
          : lang === 'mr'
          ? 'व्हॉट्सॲपवर मेसेज आला: "तुम्हाला 25 लाखांची लॉटरी लागली आहे, लिंकवर क्लिक करा." तुम्ही काय करावे?'
          : 'You get a message: "You won a 25 Lakh lottery, click this link." What should you do?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) मैसेज को तुरंत डिलीट कर दें और लिंक को न छुएं'
              : lang === 'mr'
              ? 'A) मेसेज लगेच डिलीट करा आणि लिंकला हात लावू नका'
              : 'A) Delete the message immediately and never click the link',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'शाबाश! बिना टिकट लिए कभी लॉटरी नहीं लगती। ऐसे लिंक फोन हैक करने के लिए भेजे जाते हैं।'
              : 'Great job! Lottery without buying a ticket is always a scam.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) लिंक खोलकर अपना बैंक खाता नंबर भरें'
              : lang === 'mr'
              ? 'B) लिंक उघडून खाते क्रमांक भरा'
              : 'B) Open the link and enter your bank account details',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'सावधान! ऐसे लिंक पर कभी क्लिक न करें। इससे ठगी हो सकती है।'
              : 'Danger! Never click unknown prize links.',
        },
      ],
    },
    {
      id: 3,
      question:
        lang === 'hi'
          ? 'दुकानदार आपसे कहता है: "चाचा जी, अपना 4 अंकों का UPI PIN मुझे बोलकर बता दीजिए, मैं डाल देता हूँ।" आपको क्या करना चाहिए?'
          : lang === 'mr'
          ? 'दुकानदार म्हणतो: "काका, तुमचा 4 अंकी UPI PIN मला सांगा, मी टाकतो." तुम्ही काय करावे?'
          : 'A shopkeeper asks: "Uncle, tell me your UPI PIN out loud so I can type it." What should you do?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) मना करें और PIN सिर्फ अपने हाथ से स्क्रीन छुपाकर खुद डालें'
              : lang === 'mr'
              ? 'A) नकार द्या आणि PIN फक्त स्वतःच्या हाताने स्क्रीन लपवून टाका'
              : 'A) Refuse and enter the PIN yourself privately on your phone',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'उत्तम! UPI PIN आपकी तिजोरी की चाबी है। इसे किसी को भी बोलकर नहीं बताना चाहिए।'
              : 'Excellent! Your UPI PIN is confidential like a safe key.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) PIN बोलकर बता दें'
              : lang === 'mr'
              ? 'B) PIN मोठ्याने सांगा'
              : 'B) Tell him the PIN out loud',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'खतरा! PIN कभी किसी को बोलकर नहीं बताना चाहिए।'
              : 'Hazard! Never disclose your PIN.',
        },
      ],
    },
    {
      id: 4,
      question:
        lang === 'hi'
          ? 'व्हाट्सऐप पर अपने फोटो के साथ भजन या संगीत (Music) जोड़कर स्टेटस कैसे लगाते हैं?'
          : lang === 'mr'
          ? 'व्हॉट्सॲपवर आपल्या फोटोसोबत भजन किंवा आवडते संगीत (Music) जोडून स्टेटस कसे ठेवावे?'
          : 'How do you upload a WhatsApp status with your photo and favorite music/bhajan?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) Updates > Status में फोटो चुनें, ऊपर संगीत () आइकन दबाकर पसंदीदा भजन जोड़ें'
              : lang === 'mr'
              ? 'A) Updates > Status मध्ये फोटो निवडा, वर संगीत () चिन्हावर दाबून आवडते गाणे जोडा'
              : 'A) Go to Updates > Status, pick a photo, tap Music () to add a song',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'शाबाश! संगीत आइकन से गाना चुनने पर यह फोटो के साथ 24 घंटे के लिए आपके सुरक्षित दोस्तों को दिखेगा।'
              : lang === 'mr'
              ? 'शाब्बास! संगीत आयकॉनवरून गाणे निवडल्यास फोटोसोबत 24 तासांसाठी ते तुमच्या संपर्कांना दिसेल.'
              : 'Correct! Tapping the Music icon attaches the tune to your photo for 24 hours.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) अनजान ऐप डाउनलोड करें और उसमें अपना पासवर्ड डालें'
              : lang === 'mr'
              ? 'B) अनोळखी ॲप डाउनलोड करून त्यात पासवर्ड टाका'
              : 'B) Download an unknown third party app and give passwords',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'गलत! व्हाट्सऐप के अंदर ही संगीत जोड़ने का सुरक्षित विकल्प मौजूद होता है।'
              : lang === 'mr'
              ? 'चूक! व्हॉट्सॲपमध्येच सुरक्षितपणे संगीत जोडण्याचा पर्याय असतो, कोणतेही बाह्य ॲप घेऊ नका.'
              : 'Wrong! WhatsApp has a built-in safe music feature.',
        },
      ],
    },
    {
      id: 5,
      question:
        lang === 'hi'
          ? 'इंस्टाग्राम पर अनजान व्यक्ति की फॉलो रिक्वेस्ट (Follow Request) आने पर सुरक्षित तरीका क्या है?'
          : lang === 'mr'
          ? 'इन्स्टाग्रामवर अनोळखी व्यक्तीची फॉलो रिक्वेस्ट (Follow Request) आल्यास काय करावे?'
          : 'What is the safe action when receiving an unknown Follow Request on Instagram?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) पहचान न होने पर "Delete" करें, केवल अपने परिवार व दोस्तों की ही रिक्वेस्ट स्वीकारें'
              : lang === 'mr'
              ? 'A) ओळख नसल्यास "Delete" (काढा) दाबावे, फक्त नातेवाईक व मित्रांचीच विनंती स्वीकारावी'
              : 'A) Tap "Delete" if unknown; only confirm family and real friends',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'बिल्कुल सही! अपनी निजी फोटो केवल उन्हीं को दिखनी चाहिए जिन्हें आप व्यक्तिगत रूप से जानते हैं।'
              : lang === 'mr'
              ? 'अगदी बरोबर! आपले फोटो व माहिती फक्त ओळखीच्या लोकांसाठीच सुरक्षित ठेवावी.'
              : 'Correct! Keeping your profile private and deleting strangers keeps you safe.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) तुरंत सब स्वीकार लें और अपना घर का पता भेजें'
              : lang === 'mr'
              ? 'B) लगेच स्वीकारून घरचा पत्ता किंवा फोन नंबर पाठवा'
              : 'B) Accept immediately and share personal address',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'खतरा! अनजान लोगों को निजी सोशल मीडिया में शामिल करने से साइबर धोखाधड़ी हो सकती है।'
              : lang === 'mr'
              ? 'धोका! अनोळखी लोकांना सोशल मीडियावर जोडल्यास फसवणूक होऊ शकते.'
              : 'Hazard! Never accept unknown strangers.',
        },
      ],
    },
    {
      id: 6,
      question:
        lang === 'hi'
          ? 'दुकान पर पेमेंट के बाद आया बैंक का SMS असली (Real) है या नकली (Fake), यह कैसे पहचानेंगे?'
          : lang === 'mr'
          ? 'पेमेंट केल्यानंतर आलेला बँक SMS खरा (Real) आहे की खोटा (Fake), हे कसे ओळखावे?'
          : 'How do you check whether a bank transaction SMS is genuine or fake?',
      options: [
        {
          text:
            lang === 'hi'
              ? 'A) असली SMS में 6-अक्षर बैंक कोड (जैसे VK-HDFCBK) होता है, कटी रकम व बचा बैलेंस दिखता है, कोई लिंक नहीं होता'
              : lang === 'mr'
              ? 'A) खऱ्या SMS मध्ये बँकेचा अधिकृत कोड (उदा. VK-HDFCBK), कपात रक्कम व उर्वरित शिल्लक असते, कोणतीही लिंक नसते'
              : 'A) Genuine SMS has a 6-letter bank header (e.g. VK-HDFCBK), debited amt & balance, and NO links',
          isCorrect: true,
          explanation:
            lang === 'hi'
              ? 'सटीक! असली बैंक कभी लॉटरी लिंक या संदिग्ध मोबाइल नंबर से मैसेज नहीं भेजते।'
              : lang === 'mr'
              ? 'अगदी बरोबर! अधिकृत बँक कधीही साध्या 10-अंकी मोबाईल नंबरवरून किंवा लिंकसह पैसे मागत नाही.'
              : 'Accurate! Real banks use verified sender headers and state account balances.',
        },
        {
          text:
            lang === 'hi'
              ? 'B) साधारण 10-अंक मोबाइल नंबर से आया हो और उसमें "पैसे पाने के लिए इस लिंक पर क्लिक करें" लिखा हो'
              : lang === 'mr'
              ? 'B) साध्या 10-अंकी मोबाईल नंबरवरून आलेला व लिंकवर क्लिक करायला सांगणारा मेसेज'
              : 'B) Ordinary 10-digit number with a clickable link to receive money',
          isCorrect: false,
          explanation:
            lang === 'hi'
              ? 'सावधान! यह 100% फ्रॉड मैसेज है। किसी लिंक पर कभी क्लिक न करें।'
              : lang === 'mr'
              ? 'सावधान! हा १००% खोटा आणि फसवणुकीचा मेसेज आहे. अशा लिंकला कधीही हात लावू नका.'
              : 'Danger! This is a typical phishing scam.',
        },
      ],
    },
  ];

  const currentQ = questions[currentQuestionIndex];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    const chosen = currentQ.options[idx];

    if (chosen.isCorrect) {
      setScore((prev) => prev + 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      speechService.speak(chosen.explanation, lang);
    } else {
      speechService.speak(chosen.explanation, lang);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      const congratsText =
        lang === 'hi'
          ? 'बधाई हो! आपने सुरक्षा प्रश्नोत्तरी सफलतापूर्वक पूरी कर ली है।'
          : lang === 'mr'
          ? 'अभिनंदन! तुम्ही सुरक्षा प्रश्नमंजुषा यशस्वीरीत्या पूर्ण केली आहे.'
          : 'Congratulations! You have completed the safety quiz successfully.';
      speechService.speak(congratsText, lang);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div id="screen-safety-quiz" className="space-y-6 pb-16 max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{t.backToHome}</span>
        </button>

        <button
          type="button"
          onClick={() => speechService.speak(currentQ.question, lang)}
          className="btn-tactile py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#0D5C5A]/20 dark:border-teal-700 hover:border-[#0D5C5A] text-[#0D5C5A] dark:text-teal-200 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Volume2 className="w-5 h-5 text-[#E2693D]" />
          <span>{lang === 'en' ? 'Read Question' : lang === 'mr' ? 'प्रश्न ऐका' : 'सवाल सुनें'}</span>
        </button>
      </div>

      {/* Main Quiz Card */}
      <div className="card-human p-5 sm:p-9 bg-white shadow-xl relative overflow-hidden">
        {quizCompleted ? (
          <div className="py-6 sm:py-8 text-center space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-lg ring-6 sm:ring-8 ring-emerald-50">
              <ShieldCheck className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-[#0D5C5A] tracking-tight">
              {lang === 'en' ? 'Excellent! You are Digitally Safe ' : lang === 'mr' ? 'शाब्बास! तुम्ही डिजिटलदृष्ट्या सुरक्षित आहात ' : 'शानदार! आप डिजिटल रूप से सुरक्षित हैं '}
            </h3>
            <p className="text-lg sm:text-xl font-black text-slate-800">
              {lang === 'en' ? 'Your Score:' : lang === 'mr' ? 'तुमचा स्कोअर:' : 'आपका स्कोर:'} <span className="text-emerald-600">{score} / {questions.length}</span>
            </p>
            <p className="text-base text-slate-600 max-w-md mx-auto font-medium">
              {lang === 'en' ? 'You know how to stay safe from scams and never share an OTP or PIN.' : lang === 'mr' ? 'तुम्हाला फसवणुकीपासून सुरक्षित राहणे आणि कोणाशीही OTP किंवा PIN शेअर न करणे चांगले ठाऊक आहे.' : 'आप जानते हैं कि ठगों से कैसे बचना है और कभी किसी को OTP या PIN नहीं बताना है।'}
            </p>

            <div className="pt-5 flex flex-col sm:flex-row gap-3.5 justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="btn-tactile py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>{lang === 'en' ? 'Play Again' : lang === 'mr' ? 'पुन्हा खेळा' : 'दोबारा खेलें'}</span>
              </button>
              <button
                type="button"
                onClick={onBack}
                className="btn-tactile py-3.5 px-8 rounded-2xl bg-[#0D5C5A] text-white hover:bg-[#0A4846] font-black text-base shadow-md cursor-pointer"
              >
                {lang === 'en' ? 'Go to Home' : lang === 'mr' ? 'मुख्य पृष्ठावर जा' : 'होम पेज पर जाएं'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase border border-amber-200">
                 {lang === 'en' ? 'Safety Question' : lang === 'mr' ? 'सुरक्षा प्रश्न' : 'सुरक्षा सवाल'} {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? 'Score:' : lang === 'mr' ? 'गुण:' : 'अंक:'} {score}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="mt-6 space-y-3.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const hasAnswered = selectedOption !== null;

                let btnStyles = 'bg-white border-2 border-slate-200 hover:border-[#0D5C5A] hover:bg-slate-50/50';
                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyles = 'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 shadow-xs';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyles = 'bg-rose-50/90 border-2 border-rose-500 text-rose-950 shadow-xs';
                  } else {
                    btnStyles = 'bg-slate-50 border-slate-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`btn-tactile w-full p-5 rounded-2xl text-left font-bold text-base sm:text-lg flex items-center justify-between transition-all cursor-pointer select-none ${btnStyles}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-3" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {selectedOption !== null && (
              <div
                className={`mt-6 p-5 rounded-2xl border-2 animate-in fade-in ${
                  currentQ.options[selectedOption].isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                }`}
              >
                <p className="font-bold text-base sm:text-lg">
                  {currentQ.options[selectedOption].explanation}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-tactile py-3 px-6 rounded-2xl bg-[#0D5C5A] hover:bg-[#0A4846] text-white font-black text-base shadow-md cursor-pointer"
                  >
                    {currentQuestionIndex === questions.length - 1 ? (lang === 'en' ? 'View Results' : lang === 'mr' ? 'निकाल पहा' : 'परिणाम देखें') : (lang === 'en' ? 'Next Question →' : lang === 'mr' ? 'पुढील प्रश्न →' : 'अगला सवाल →')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
