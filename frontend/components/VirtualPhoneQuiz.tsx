import React from 'react';
import {
  Smartphone,
  Phone,
  PhoneCall,
  PhoneOff,
  MessageCircle,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Search,
  Users,
  UserPlus,
  Flashlight,
  Mic,
  Lock,
  Unlock,
  BatteryCharging,
  Power,
  Volume2,
  Video,
  Scan,
  Bell,
  Check,
  Music,
  Heart,
  UserCheck,
  PlusSquare,
  Send,
  Share2,
  AlertTriangle,
  Camera,
  Image,
  Key,
  Globe,
  Grid,
  CheckCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Youtube,
  Wifi,
  Battery,
  Paperclip,
  Smile,
  Settings,
  CheckCheck,
  Clock,
  ArrowLeft,
  MoreVertical
} from 'lucide-react';
import { LessonStep, LanguageCode } from '../types';

export interface PhoneSimulatorState {
  powerOn: boolean;
  chargingPlugged: boolean;
  volume: number;
  unlocked: boolean;
  callConnected: boolean;
  callAnswered: boolean;
  callEnded: boolean;
  contactAdded: boolean;
  touchDone: boolean;
  whatsappChatOpened: boolean;
  whatsappMsgSent: boolean;
  voiceRecorded: boolean;
  keyboardLangSwitched: boolean;
  videoCallActive: boolean;
  statusMusicAdded: boolean;
  photoSent: boolean;
  qrScanned: boolean;
  amountEntered: boolean;
  pinEntered: boolean;
  paymentSuccess: boolean;
  smsChecked: boolean;
  fakeVsRealChecked: boolean;
  scamBlocked: boolean;
  fakeCallCut: boolean;
  ytSearched: boolean;
  ytPlaying: boolean;
  subscribed: boolean;
  igLoggedIn: boolean;
  igProfileViewed: boolean;
  igFollowed: boolean;
  igReelLiked: boolean;
  igRequestConfirmed: boolean;
  igPostShared: boolean;
  flashlightOn: boolean;
  emergencyDialed: boolean;
}

export const initialPhoneSimulatorState: PhoneSimulatorState = {
  powerOn: false,
  chargingPlugged: false,
  volume: 70,
  unlocked: false,
  callConnected: false,
  callAnswered: false,
  callEnded: false,
  contactAdded: false,
  touchDone: false,
  whatsappChatOpened: false,
  whatsappMsgSent: false,
  voiceRecorded: false,
  keyboardLangSwitched: false,
  videoCallActive: false,
  statusMusicAdded: false,
  photoSent: false,
  qrScanned: false,
  amountEntered: false,
  pinEntered: false,
  paymentSuccess: false,
  smsChecked: false,
  fakeVsRealChecked: false,
  scamBlocked: false,
  fakeCallCut: false,
  ytSearched: false,
  ytPlaying: false,
  subscribed: false,
  igLoggedIn: false,
  igProfileViewed: false,
  igFollowed: false,
  igReelLiked: false,
  igRequestConfirmed: false,
  igPostShared: false,
  flashlightOn: false,
  emergencyDialed: false,
};

export interface QuizDetails {
  question: string;
  correctOption: string;
  wrongOption: string;
  actionLabel: string;
  onPerform: () => void;
}

export function getStepQuizDetails(
  step: LessonStep,
  lang: LanguageCode,
  phoneState: PhoneSimulatorState,
  setPhoneState: React.Dispatch<React.SetStateAction<PhoneSimulatorState>>,
  triggerInstructionSuccess: (name: string) => void
): QuizDetails {
  const type = step.illustrationType;
  const isEn = lang === 'en';
  const isMr = lang === 'mr';

  if (type === 'phone_power') {
    return {
      question: isEn ? 'What is the correct way to turn ON your smartphone?' : isMr ? 'फोन चालू करण्यासाठी योग्य कृती कोणती?' : 'फोन चालू करने के लिए सही निर्देश क्या है?',
      correctOption: isEn ? 'Press and hold the side Power button for 3-4 seconds' : isMr ? 'उजवीकडील पॉवर बटण ३-४ सेकंद दाबून ठेवा' : 'दाहिनी तरफ पावर बटन को 3-4 सेकंड दबाकर रखें',
      wrongOption: isEn ? 'Hit or tap repeatedly on the screen' : isMr ? 'स्क्रीनवर जोराने बोट आपटा' : 'स्क्रीन पर जोर-जोर से उंगली मारें',
      actionLabel: isEn ? 'Press Power Button' : isMr ? 'पॉवर बटण दाबा' : 'पावर बटन दबाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, powerOn: true }));
        triggerInstructionSuccess(isEn ? 'Power Button' : isMr ? 'पॉवर बटण' : 'पावर बटन');
      },
    };
  }

  if (type === 'battery_charging' || type === 'charging_port') {
    return {
      question: isEn ? 'What is the safe way to charge your smartphone?' : isMr ? 'फोन सुरक्षित चार्ज करण्यासाठी काय करावे?' : 'फोन सुरक्षित चार्ज करने के लिए सही तरीका क्या है?',
      correctOption: isEn ? 'Gently insert the charger pin into the bottom socket' : isMr ? 'चार्जरची पिन खालील सॉकेटमध्ये हळुवार लावा' : 'चार्जर की पिन नीचे सॉकेट में धीरे से लगाएं',
      wrongOption: isEn ? 'Force the cable upside down with wet hands' : isMr ? 'ओल्या हाताने किंवा जोराने पिन उलटी टोचा' : 'गीले हाथों से या जोर से पिन उल्टी ठूंसे',
      actionLabel: isEn ? 'Connect Charger (Plug In)' : isMr ? 'चार्जर जोडा (Plug In)' : 'चार्जर लगाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, chargingPlugged: true }));
        triggerInstructionSuccess(isEn ? 'Charging Cable' : isMr ? 'चार्जर पिन' : 'चार्जर पिन');
      },
    };
  }

  if (type === 'volume_buttons') {
    return {
      question: isEn ? 'Which button increases the ringtone & voice volume?' : isMr ? 'फोनचा आवाज वाढवण्यासाठी कोणते बटण दाबावे?' : 'फोन की आवाज़ बढ़ाने के लिए कौन सा बटन दबाना चाहिए?',
      correctOption: isEn ? 'Press the top side Volume (+) button once' : isMr ? 'बाजूचे वरचे व्हॉल्यूम (+) बटण एकदा दाबा' : 'साइड का ऊपर वाला वॉल्यूम (+) बटन एक बार दबाएं',
      wrongOption: isEn ? 'Press power button to switch off the phone' : isMr ? 'पॉवर बटण दाबून फोन बंद करा' : 'पावर बटन दबाकर फोन स्विच ऑफ कर दें',
      actionLabel: isEn ? 'Increase Volume (Vol +)' : isMr ? 'आवाज वाढवा (Vol +)' : 'आवाज़ बढ़ाएं (Vol +)',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, volume: 100 }));
        triggerInstructionSuccess(isEn ? 'Volume Button' : isMr ? 'व्हॉल्यूम बटण' : 'वॉल्यूम बटन');
      },
    };
  }

  if (type === 'lock_screen') {
    return {
      question: isEn ? 'How do you unlock the smartphone screen?' : isMr ? 'लॉक स्क्रीन कशी उघडावी?' : 'स्क्रीन लॉक कैसे खोलें?',
      correctOption: isEn ? 'Swipe gently upwards from the bottom of the screen' : isMr ? 'स्क्रीनवर खालून वर हलकेच सरकवा (Swipe Up)' : 'स्क्रीन पर नीचे से ऊपर की ओर धीरे से स्वाइप करें',
      wrongOption: isEn ? 'Press and squeeze hard on the glass' : isMr ? 'स्क्रीनवर जोरजोरात दाबा' : 'स्क्रीन पर कसकर दबाते रहें',
      actionLabel: isEn ? 'Unlock Screen (Swipe Up)' : isMr ? 'स्क्रीन अनलॉक करा' : 'स्क्रीन अनलॉक करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, unlocked: true }));
        triggerInstructionSuccess(isEn ? 'Unlock' : isMr ? 'अनलॉक' : 'अनलॉक');
      },
    };
  }

  if (type === 'touch_gesture') {
    return {
      question: isEn ? 'How should you touch (tap) the smartphone screen?' : isMr ? 'स्क्रीनवर स्पर्श (Touch) कसा करावा?' : 'स्क्रीन पर टच (स्पर्श) कैसे करें?',
      correctOption: isEn ? 'Tap gently once with your fingertip and lift' : isMr ? 'बोटाच्या टोकाने हलकेच एका जागी स्पर्श करून लगेच उचला' : 'उंगली के पोर से धीरे से एक बार छूकर तुरंत उठाएं',
      wrongOption: isEn ? 'Press hard with a sharp nail or excessive force' : isMr ? 'नखाने किंवा जोर लावून स्क्रीन दाबा' : 'नाखून से या ताकत लगाकर स्क्रीन दबाएं',
      actionLabel: isEn ? 'Tap Gently' : isMr ? 'हलकेच स्पर्श करा' : 'हल्के से टच करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, touchDone: true }));
        triggerInstructionSuccess(isEn ? 'Screen Tap' : isMr ? 'स्क्रीन टच' : 'स्क्रीन टच');
      },
    };
  }

  if (type === 'phone_app_icon') {
    return {
      question: isEn ? 'Which app should you open to make a phone call?' : isMr ? 'कॉल लावण्यासाठी कोणते ॲप उघडावे?' : 'फ़ोन कॉल लगाने के लिए कौन सा ऐप खोलें?',
      correctOption: isEn ? 'Tap the green Phone app icon on your screen' : isMr ? 'हिरव्या रंगाचे फोन ॲप चिन्ह दाबा' : 'हरे रंग का फोन ऐप आइकन दबाएं',
      wrongOption: isEn ? 'Open the calculator or camera app' : isMr ? 'कॅल्क्युलेटर किंवा कॅमेरा उघडा' : 'कैलकुलेटर या कैमरा खोलें',
      actionLabel: isEn ? 'Open Phone App' : isMr ? 'फोन ॲप उघडा' : 'फोन ऐप खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, callConnected: false }));
        triggerInstructionSuccess(isEn ? 'Phone App' : isMr ? 'फोन ॲप' : 'फोन ऐप');
      },
    };
  }

  if (type === 'contacts_list') {
    return {
      question: isEn ? 'How do you call a saved family contact?' : isMr ? 'जतन केलेल्या संपर्काला फोन कसा लावावा?' : 'सेव किए गए संपर्क को फोन कैसे लगाएं?',
      correctOption: isEn ? 'Tap the contact name or green call icon' : isMr ? 'नावावर किंवा बाजूच्या हिरव्या कॉल आयकॉनवर स्पर्श करा' : 'नाम या बगल के हरे कॉल आइकन पर टच करें',
      wrongOption: isEn ? 'Tap the red delete button' : isMr ? 'नंबर डिलीट करण्याचे लाल बटण दाबा' : 'नंबर डिलीट करने का लाल बटन दबाएं',
      actionLabel: isEn ? 'Call Contact' : isMr ? 'संपर्काला कॉल करा' : 'कांटेक्ट को कॉल करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, callConnected: true }));
        triggerInstructionSuccess(isEn ? 'Contacts List' : isMr ? 'संपर्क यादी' : 'कांटेक्ट लिस्ट');
      },
    };
  }

  if (type === 'dial_pad') {
    return {
      question: isEn ? 'How do you dial a 10-digit number to call?' : isMr ? 'नंबर टाईप करून कॉल कसा लावावा?' : 'नंबर टाइप करके कॉल कैसे लगाएं?',
      correctOption: isEn ? 'Type the digits on Keypad and tap green Call button' : isMr ? 'अंक डायल करून शेवटी हिरवे कॉल बटण दाबा' : 'अंक डायल करके अंत में हरा कॉल बटन दबाएं',
      wrongOption: isEn ? 'Type the digits and put the phone in your pocket' : isMr ? 'नंबर लिहून फोन बाजूला ठेवा' : 'नंबर लिखकर फोन रख दें',
      actionLabel: isEn ? 'Place Call (Dial)' : isMr ? 'कॉल लावा' : 'कॉल लगाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, callConnected: true }));
        triggerInstructionSuccess(isEn ? 'Dial Pad' : isMr ? 'डायल पॅड' : 'डायल पैड');
      },
    };
  }

  if (type === 'calling_screen') {
    return {
      question: isEn ? 'How do you answer an incoming call?' : isMr ? 'येणारा फोन कसा उचलावा?' : 'आने वाले फोन को कैसे उठाएं?',
      correctOption: isEn ? 'Swipe the green Call button upwards or tap Answer' : isMr ? 'हिरवे फोन बटण वर सरकवून कॉल उचला' : 'हरे फोन बटन को ऊपर सरकाकर कॉल उठाएं',
      wrongOption: isEn ? 'Press the red decline button' : isMr ? 'लाल बटण दाबा' : 'लाल बटन दबा दें',
      actionLabel: isEn ? 'Answer Call' : isMr ? 'कॉल उचला' : 'कॉल उठाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, callAnswered: true }));
        triggerInstructionSuccess(isEn ? 'Accept Call' : isMr ? 'कॉल स्वीकारणे' : 'कॉल स्वीकारना');
      },
    };
  }

  if (type === 'end_call') {
    return {
      question: isEn ? 'How do you hang up when your conversation is finished?' : isMr ? 'बोलणे संपल्यावर कॉल कसा कापावा?' : 'बातचीत पूरी होने पर कॉल कैसे काटें?',
      correctOption: isEn ? 'Tap the circular red End Call button' : isMr ? 'मोठे लाल गोल बटण (End Call) दाबा' : 'बड़ा लाल गोल बटन (End Call) दबाएं',
      wrongOption: isEn ? 'Leave the call running indefinitely' : isMr ? 'फोन चालू ठेवून खिशात ठेवा' : 'फोन खुला छोड़कर रख दें',
      actionLabel: isEn ? 'End Call (Hang Up)' : isMr ? 'कॉल कापा' : 'कॉल काटें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, callEnded: true }));
        triggerInstructionSuccess(isEn ? 'Hang Up Call' : isMr ? 'कॉल कट करणे' : 'कॉल काटना');
      },
    };
  }

  if (type === 'add_contact') {
    return {
      question: isEn ? 'How do you save a new contact number in your phone?' : isMr ? 'नवीन नंबर फोनमध्ये कसा सेव्ह करावा?' : 'नया नंबर फोन में कैसे सुरक्षित (Save) करें?',
      correctOption: isEn ? 'Enter Name and Number, then tap Save' : isMr ? 'नाव आणि नंबर लिहून "Save" बटण दाबा' : 'नाम और नंबर लिखकर "Save" बटन दबाएं',
      wrongOption: isEn ? 'Write it on a slip of paper only' : isMr ? 'कागदावर लिहून फोनमध्ये सेव्ह करू नका' : 'कागज पर लिखकर फोन में सेव न करें',
      actionLabel: isEn ? 'Save Contact' : isMr ? 'नंबर सेव्ह करा' : 'नंबर सेव करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, contactAdded: true }));
        triggerInstructionSuccess(isEn ? 'Save Contact' : isMr ? 'संपर्क सेव्ह' : 'कांटेक्ट सेव');
      },
    };
  }

  if (type === 'whatsapp_icon') {
    return {
      question: isEn ? 'Which app icon opens your WhatsApp chats?' : isMr ? 'व्हॉट्सॲप उघडण्यासाठी कोणते चिन्ह दाबावे?' : 'व्हाट्सऐप खोलने के लिए कौन सा आइकन दबाएं?',
      correctOption: isEn ? 'Tap the green WhatsApp icon with white phone inside' : isMr ? 'हिरव्या वर्तुळातील पांढरा फोन चिन्ह (WhatsApp) दाबा' : 'हरे गोले में सफेद फोन आइकन (WhatsApp) दबाएं',
      wrongOption: isEn ? 'Open the calculator app' : isMr ? 'कॅल्क्युलेटर उघडा' : 'कैलकुलेटर खोलें',
      actionLabel: isEn ? 'Open WhatsApp' : isMr ? 'WhatsApp उघडा' : 'WhatsApp खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, whatsappChatOpened: true }));
        triggerInstructionSuccess(isEn ? 'WhatsApp' : isMr ? 'व्हॉट्सॲप' : 'व्हाट्सऐप');
      },
    };
  }

  if (type === 'whatsapp_chats_list') {
    return {
      question: isEn ? 'How do you open a conversation with your daughter or son?' : isMr ? 'व्हॉट्सॲपवर कोणाशी बोलायचे असल्यास काय करावे?' : 'व्हाट्सऐप पर किसी से बात करनी हो तो क्या करें?',
      correctOption: isEn ? 'Tap on their name in the chats list' : isMr ? 'चॅट यादीतील मुलांच्या नावावर स्पर्श करा' : 'चैट सूची में से नाम पर स्पर्श करें',
      wrongOption: isEn ? 'Switch off the phone' : isMr ? 'फोन बंद करा' : 'फोन बंद कर दें',
      actionLabel: isEn ? 'Open Chat' : isMr ? 'नावावर स्पर्श करा' : 'नाम पर छुएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, whatsappChatOpened: true }));
        triggerInstructionSuccess(isEn ? 'Open Chat' : isMr ? 'चॅट उघडणे' : 'चैट खोलना');
      },
    };
  }

  if (type === 'whatsapp_chat') {
    return {
      question: isEn ? 'How do you send a typed text message on WhatsApp?' : isMr ? 'व्हॉट्सॲपवर मेसेज कसा पाठवावा?' : 'व्हाट्सऐप पर मैसेज कैसे भेजें?',
      correctOption: isEn ? 'Type your message and tap the green arrow Send button' : isMr ? 'मेसेज लिहून हिरवे सेंड (Send) बटण दाबा' : 'संदेश लिखकर हरे तीर (Send) बटन पर छुएं',
      wrongOption: isEn ? 'Delete the chat conversation' : isMr ? 'चॅट डिलीट करा' : 'चैट डिलीट कर दें',
      actionLabel: isEn ? 'Send Message' : isMr ? 'मेसेज पाठवा' : 'मैसेज भेजें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, whatsappMsgSent: true }));
        triggerInstructionSuccess(isEn ? 'WhatsApp Message' : isMr ? 'व्हॉट्सॲप मेसेज' : 'व्हाट्सऐप मैसेज');
      },
    };
  }

  if (type === 'voice_message') {
    return {
      question: isEn ? 'How do you send a voice message without typing?' : isMr ? 'टायपिंग न करता बोलून व्हॉइस मेसेज कसा पाठवावा?' : 'बिना टाइप किए बोलकर वॉइस मैसेज कैसे भेजें?',
      correctOption: isEn ? 'Press and hold the microphone icon at bottom right' : isMr ? 'उजव्या कोपऱ्यातील हिरवा माइक दाबून ठेवा' : 'दाएं कोने में बने माइक को दबाकर रखें',
      wrongOption: isEn ? 'Tap the back button' : isMr ? 'मागे जाण्याचे बटण दाबा' : 'बैक बटन दबाएं',
      actionLabel: isEn ? 'Hold Microphone' : isMr ? 'माइक दाबा' : 'माइक दबाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, voiceRecorded: true }));
        triggerInstructionSuccess(isEn ? 'Voice Note' : isMr ? 'व्हॉइस मेसेज' : 'वॉइस मैसेज');
      },
    };
  }

  if (type === 'voice_message_record') {
    return {
      question: isEn ? 'When should you release your finger to send the voice note?' : isMr ? 'बोलून झाल्यावर व्हॉइस मेसेज पाठवण्यासाठी काय करावे?' : 'बोलना पूरा होने पर वॉइस मैसेज भेजने के लिए क्या करें?',
      correctOption: isEn ? 'Release your finger from the microphone to send immediately' : isMr ? 'बोलणे झाल्यावर माइकवरून बोट उचला' : 'बोलने के बाद माइक से उंगली हटा लें',
      wrongOption: isEn ? 'Keep holding the phone screen for an hour' : isMr ? 'स्क्रीनवर बोट दाबूनच ठेवा' : 'स्क्रीन दबाए ही रखें',
      actionLabel: isEn ? 'Release to Send' : isMr ? 'बोट सोडा' : 'उंगली छोड़ें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, voiceRecorded: true }));
        triggerInstructionSuccess(isEn ? 'Voice Recording' : isMr ? 'आवाज रेकॉर्डिंग' : 'आवाज़ रिकॉर्डिंग');
      },
    };
  }

  if (type === 'keyboard_lang') {
    return {
      question: isEn ? 'Where can you switch your keyboard typing language?' : isMr ? 'कीबोर्डची भाषा कुठून बदलता येते?' : 'कीबोर्ड की भाषा कहाँ से बदल सकते हैं?',
      correctOption: isEn ? 'Tap the gear Settings or globe icon on the keyboard' : isMr ? 'कीबोर्डवरील सेटिंग्ज किंवा पृथ्वीच्या चिन्हावर दाबा' : 'कीबोर्ड पर सेटिंग या ग्लोब के निशान पर छुएं',
      wrongOption: isEn ? 'Power off your smartphone' : isMr ? 'फोन बंद करा' : 'फोन बंद कर दें',
      actionLabel: isEn ? 'Open Language Settings' : isMr ? 'भाषा सेटिंग्ज उघडा' : 'भाषा सेटिंग्स खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, keyboardLangSwitched: true }));
        triggerInstructionSuccess(isEn ? 'Keyboard Language' : isMr ? 'कीबोर्ड भाषा' : 'कीबोर्ड भाषा');
      },
    };
  }

  if (type === 'keyboard_add_lang') {
    return {
      question: isEn ? 'How do you switch between English and your regional language?' : isMr ? 'कीबोर्डवर भाषा पटकन कशी बदलावी?' : 'कीबोर्ड पर भाषा तुरंत कैसे बदलें?',
      correctOption: isEn ? 'Press and hold the Space Bar to switch languages instantly' : isMr ? 'स्पेस बार दाबून धरून हवी ती भाषा निवडा' : 'स्पेस बार को दबाकर रखकर भाषा चुनें',
      wrongOption: isEn ? 'Restart your mobile phone every time' : isMr ? 'प्रत्येक वेळी फोन रीस्टार्ट करा' : 'हर बार फोन रीस्टार्ट करें',
      actionLabel: isEn ? 'Switch Language (Space Bar)' : isMr ? 'भाषा बदला' : 'भाषा बदलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, keyboardLangSwitched: true }));
        triggerInstructionSuccess(isEn ? 'Language Switched' : isMr ? 'भाषा बदलली' : 'भाषा बदली गई');
      },
    };
  }

  if (type === 'video_call') {
    return {
      question: isEn ? 'Where is the Video Call button inside a family chat?' : isMr ? 'व्हॉट्सॲपवर व्हिडिओ कॉल लावण्यासाठी काय दाबावे?' : 'व्हाट्सऐप पर वीडियो कॉल लगाने के लिए क्या दबाएं?',
      correctOption: isEn ? 'Tap the Video Camera icon at top-right' : isMr ? 'वर उजव्या कोपऱ्यातील व्हिडिओ कॅमेरा चिन्ह दाबा' : 'ऊपर दाएं कोने में वीडियो कैमरा आइकन दबाएं',
      wrongOption: isEn ? 'Tap the back arrow button' : isMr ? 'मागे जाण्याचे बटण दाबा' : 'वापस जाने का बटन दबाएं',
      actionLabel: isEn ? 'Start Video Call' : isMr ? 'व्हिडिओ कॉल सुरू करा' : 'वीडियो कॉल शुरू करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, videoCallActive: true }));
        triggerInstructionSuccess(isEn ? 'Video Call' : isMr ? 'व्हिडिओ कॉल' : 'वीडियो कॉल');
      },
    };
  }

  if (type === 'video_call_active') {
    return {
      question: isEn ? 'How should you hold the phone during a video call?' : isMr ? 'व्हिडिओ कॉल सुरू असताना फोन कसा धरावा?' : 'वीडियो कॉल के दौरान फोन कैसे पकड़ना चाहिए?',
      correctOption: isEn ? 'Hold the phone upright in front of your face' : isMr ? 'फोन चेहऱ्यासमोर सरळ धरून शांतपणे बोला' : 'फोन को चेहरे के सामने सीधा रखकर आराम से बात करें',
      wrongOption: isEn ? 'Place the phone face-down on a table' : isMr ? 'फोन उलटा टेबलावर ठेवा' : 'फोन को उल्टा रख दें',
      actionLabel: isEn ? 'Face the Camera' : isMr ? 'चेहरा समोर ठेवा' : 'चेहरा सामने रखें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, videoCallActive: true }));
        triggerInstructionSuccess(isEn ? 'Live Video Call' : isMr ? 'व्हिडिओ कॉल संभाषण' : 'वीडियो कॉल बातचीत');
      },
    };
  }

  if (type === 'whatsapp_status_tab') {
    return {
      question: isEn ? 'Where do you see and upload WhatsApp Status updates?' : isMr ? 'व्हॉट्सॲप स्टेटस कुठे पाहता व ठेवता येते?' : 'व्हाट्सऐप स्टेटस कहाँ देख व लगा सकते हैं?',
      correctOption: isEn ? 'Tap on the Updates / Status tab' : isMr ? 'Updates किंवा Status टॅबवर स्पर्श करा' : 'Updates या Status टैब पर छुएं',
      wrongOption: isEn ? 'Tap Settings and log out' : isMr ? 'ॲपमधून लॉगआउट करा' : 'लॉगआउट कर दें',
      actionLabel: isEn ? 'Open Status Tab' : isMr ? 'स्टेटस टॅब उघडा' : 'स्टेटस टैब खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, statusMusicAdded: true }));
        triggerInstructionSuccess(isEn ? 'Status Tab' : isMr ? 'स्टेटस टॅब' : 'स्टेटस टैब');
      },
    };
  }

  if (type === 'whatsapp_status_photo') {
    return {
      question: isEn ? 'How do you pick a photo for your WhatsApp Status?' : isMr ? 'स्टेटससाठी फोटो कसा निवडावा?' : 'स्टेटस के लिए फोटो कैसे चुनें?',
      correctOption: isEn ? 'Tap My Status (+) and select from your gallery' : isMr ? 'My Status (+) वर दाबून गॅलरीतून सुंदर फोटो निवडा' : 'My Status (+) पर दबाकर गैलरी से फोटो चुनें',
      wrongOption: isEn ? 'Take no action' : isMr ? 'काहीही करू नका' : 'कुछ मत करें',
      actionLabel: isEn ? 'Pick Photo (+)' : isMr ? 'फोटो निवडा' : 'फोटो चुनें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, statusMusicAdded: true }));
        triggerInstructionSuccess(isEn ? 'Pick Photo' : isMr ? 'फोटो निवडणे' : 'फोटो चुनना');
      },
    };
  }

  if (type === 'whatsapp_status_music_search') {
    return {
      question: isEn ? 'How do you add music or bhajans to your status photo?' : isMr ? 'स्टेटस फोटोवर संगीत कसे जोडावे?' : 'स्टेटस फोटो पर संगीत कैसे जोड़ें?',
      correctOption: isEn ? 'Tap the Music icon at the top and select a song' : isMr ? 'वरील संगीत (Music) चिन्हावर दाबून गाणे निवडा' : 'ऊपर संगीत (Music) आइकन पर दबाकर गाना चुनें',
      wrongOption: isEn ? 'Delete the photo immediately' : isMr ? 'फोटो डिलीट करा' : 'फोटो डिलीट कर दें',
      actionLabel: isEn ? 'Add Music' : isMr ? 'संगीत जोडा' : 'संगीत जोड़ें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, statusMusicAdded: true }));
        triggerInstructionSuccess(isEn ? 'Music Added' : isMr ? 'संगीत जोडले' : 'संगीत जोड़ा गया');
      },
    };
  }

  if (type === 'whatsapp_status_send') {
    return {
      question: isEn ? 'How do you publish your musical status for 24 hours?' : isMr ? '२४ तासांसाठी स्टेटस पोस्ट कसे करावे?' : '24 घंटे के लिए स्टेटस पोस्ट कैसे करें?',
      correctOption: isEn ? 'Tap the green circular Send arrow button' : isMr ? 'खालील हिरवे सेंड (Send) बटण दाबा' : 'नीचे हरे तीर (Send) बटन पर छुएं',
      wrongOption: isEn ? 'Close WhatsApp without sending' : isMr ? 'ॲप बंद करा' : 'ऐप बंद कर दें',
      actionLabel: isEn ? 'Post Status' : isMr ? 'स्टेटस लावा' : 'स्टेटस लगाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, statusMusicAdded: true }));
        triggerInstructionSuccess(isEn ? 'Status Uploaded' : isMr ? 'स्टेटस पोस्ट' : 'स्टेटस पोस्ट');
      },
    };
  }

  if (type === 'whatsapp_status_music') {
    return {
      question: isEn ? 'How do you listen to the music attached on your status?' : isMr ? 'स्टेटसवरील गाणे कसे ऐकावे?' : 'स्टेटस पर लगा गाना कैसे सुनें?',
      correctOption: isEn ? 'Tap the Play button on screen' : isMr ? 'प्ले बटणावर स्पर्श करा' : 'प्ले बटन पर छुएं',
      wrongOption: isEn ? 'Turn off the volume completely' : isMr ? 'आवाज बंद करा' : 'आवाज़ बंद कर दें',
      actionLabel: isEn ? 'Play Song' : isMr ? 'गाणे ऐका' : 'गाना सुनें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, statusMusicAdded: true }));
        triggerInstructionSuccess(isEn ? 'Play Song' : isMr ? 'संगीत प्ले' : 'संगीत प्ले');
      },
    };
  }

  if (type === 'photo_send') {
    return {
      question: isEn ? 'How do you send a picture to family on WhatsApp?' : isMr ? 'व्हॉट्सॲपवर फोटो कसा पाठवावा?' : 'व्हाट्सऐप पर फोटो कैसे भेजें?',
      correctOption: isEn ? 'Tap the Paperclip / Camera icon, pick photo & tap Send' : isMr ? 'पिन किंवा कॅमेरा चिन्हावर दाबून फोटो निवडा व सेंड दाबा' : 'पिन या कैमरा पर दबाकर फोटो चुनें और सेंड दबाएं',
      wrongOption: isEn ? 'Send only blank text' : isMr ? 'फक्त रिकामे मेसेज पाठवा' : 'सिर्फ खाली संदेश भेजें',
      actionLabel: isEn ? 'Send Photo' : isMr ? 'फोटो पाठवा' : 'फोटो भेजें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, photoSent: true }));
        triggerInstructionSuccess(isEn ? 'Photo Sent' : isMr ? 'फोटो पाठवला' : 'फोटो भेजा गया');
      },
    };
  }

  if (type === 'upi_scanner_icon') {
    return {
      question: isEn ? 'Which button opens the QR code scanner in UPI apps?' : isMr ? 'दुकानदाराचा QR स्कॅन करण्यासाठी कोणते चिन्ह दाबावे?' : 'दुकानदार का QR स्कैन करने के लिए कौन सा आइकन दबाएं?',
      correctOption: isEn ? 'Tap the Scanner icon [·] (Scan QR)' : isMr ? 'वरील स्कॅनर आयकॉन [·] (Scan QR) दाबा' : 'ऊपर स्कैनर आइकन [·] (Scan QR) दबाएं',
      wrongOption: isEn ? 'Tap logout button' : isMr ? 'लॉगआउट दाबा' : 'लॉगआउट दबाएं',
      actionLabel: isEn ? 'Open QR Scanner' : isMr ? 'स्कॅनर उघडा' : 'स्कैनर खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, qrScanned: true }));
        triggerInstructionSuccess(isEn ? 'QR Scanner' : isMr ? 'स्कॅनर आयकॉन' : 'स्कैनर आइकन');
      },
    };
  }

  if (type === 'upi_qr') {
    return {
      question: isEn ? 'How should you hold your phone to scan a store QR code?' : isMr ? 'QR कोड स्कॅन करताना कॅमेरा कसा धरावा?' : 'QR कोड स्कैन करते समय कैमरा कैसे रखें?',
      correctOption: isEn ? 'Hold phone 6-10 inches away steady in front of the QR' : isMr ? 'फोन QR कोडसमोर सरळ आणि स्थिर धरा' : 'फोन को QR कोड के सामने सीधा और स्थिर रखें',
      wrongOption: isEn ? 'Shake the phone vigorously' : isMr ? 'फोन जोराने हलवा' : 'फोन को जोर-जोर से हिलाएं',
      actionLabel: isEn ? 'Scan QR Code' : isMr ? 'QR स्कॅन करा' : 'QR स्कैन करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, qrScanned: true }));
        triggerInstructionSuccess(isEn ? 'QR Scan' : isMr ? 'QR स्कॅन' : 'QR स्कैन');
      },
    };
  }

  if (type === 'upi_amount') {
    return {
      question: isEn ? 'What should you check before typing the payment amount?' : isMr ? 'रक्कम भरण्यापूर्वी काय खात्री करावी?' : 'रकम भरने से पहले क्या जांचना चाहिए?',
      correctOption: isEn ? 'Confirm merchant name and enter the exact rupees (₹50)' : isMr ? 'दुकानदाराचे नाव तपासा आणि योग्य रक्कम (₹५०) भरा' : 'दुकानदार का नाम मिलाएं और सही रकम (₹50) भरें',
      wrongOption: isEn ? 'Type a random huge number without asking' : isMr ? 'काहीही न विचारता वाटेल ते आकडे भरा' : 'बिना पूछे कोई भी नंबर भर दें',
      actionLabel: isEn ? 'Enter Amount (₹50)' : isMr ? 'रक्कम भरा' : 'रकम भरें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, amountEntered: true }));
        triggerInstructionSuccess(isEn ? 'Amount Entered' : isMr ? 'रक्कम भरली' : 'रकम भरी गई');
      },
    };
  }

  if (type === 'upi_pin_safe') {
    return {
      question: isEn ? 'What is the Golden Rule of UPI PIN?' : isMr ? 'UPI PIN चा सुवर्ण नियम कोणता?' : 'UPI PIN का स्वर्ण नियम क्या है?',
      correctOption: isEn ? 'PIN is ONLY entered to send money, NEVER to receive money' : isMr ? 'PIN फक्त पैसे पाठवण्यासाठी टाकावा, पैसे मिळवण्यासाठी कधीही नाही' : 'पिन सिर्फ पैसे भेजने के लिए डलता है, पैसे पाने के लिए कभी नहीं',
      wrongOption: isEn ? 'Tell your secret PIN to anyone who asks on phone' : isMr ? 'कोणीही विचारल्यास PIN सांगून टाका' : 'फोन पर किसी को भी अपना पिन बता दें',
      actionLabel: isEn ? 'Enter Secret PIN (1234)' : isMr ? 'गुप्त PIN टाका' : 'गुप्त PIN दर्ज करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, pinEntered: true, paymentSuccess: true }));
        triggerInstructionSuccess(isEn ? 'Secure UPI PIN' : isMr ? 'सुरक्षित UPI PIN' : 'सुरक्षित UPI PIN');
      },
    };
  }

  if (type === 'upi_success') {
    return {
      question: isEn ? 'What confirms that your UPI payment succeeded?' : isMr ? 'पेमेंट यशस्वी झाल्याची खात्री कशावरून होते?' : 'पेमेंट सफल होने की पहचान क्या है?',
      correctOption: isEn ? 'A big green checkmark appears on screen with bank chime' : isMr ? 'स्क्रीनवर मोठा हिरवा टिक आणि बँकेचा मेसेज येतो' : 'स्क्रीन पर बड़ा हरा टिक और बैंक का मैसेज आता है',
      wrongOption: isEn ? 'A red error exclamation mark' : isMr ? 'लाल धोक्याचे चिन्ह' : 'लाल खतरे का निशान',
      actionLabel: isEn ? 'View Receipt (Paid)' : isMr ? 'पावती पहा' : 'रसीद देखें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, paymentSuccess: true }));
        triggerInstructionSuccess(isEn ? 'Payment Done' : isMr ? 'पेमेंट पूर्ण' : 'पेमेंट पूरा');
      },
    };
  }

  if (type === 'upi_bank_sms_popup') {
    return {
      question: isEn ? 'How does your bank alert you after a UPI payment?' : isMr ? 'पेमेंट झाल्यावर बँक अलर्ट कसा येतो?' : 'पेमेंट होने के बाद बैंक अलर्ट कैसे आता है?',
      correctOption: isEn ? 'An official bank SMS pop-up shows debited amount and balance' : isMr ? 'स्क्रीनवर बँकेचा SMS पॉप-अप येतो ज्यामध्ये शिल्लक रक्कम दिसते' : 'स्क्रीन पर बैंक का SMS पॉप-अप आता है जिसमें बाकी बैलेंस दिखता है',
      wrongOption: isEn ? 'No notification is ever sent' : isMr ? 'कोणताही मेसेज येत नाही' : 'कोई संदेश नहीं आता',
      actionLabel: isEn ? 'Check Bank Alert' : isMr ? 'बँक मेसेज पहा' : 'बैंक अलर्ट देखें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, smsChecked: true }));
        triggerInstructionSuccess(isEn ? 'Bank SMS Alert' : isMr ? 'बँक SMS अलर्ट' : 'बैंक SMS अलर्ट');
      },
    };
  }

  if (type === 'upi_fake_vs_real_sms') {
    return {
      question: isEn ? 'How do you distinguish real bank SMS from fake scam SMS?' : isMr ? 'खरा बँक मेसेज कसा ओळखावा?' : 'असली बैंक मैसेज कैसे पहचानें?',
      correctOption: isEn ? 'Real SMS comes from official 6-character bank ID with no links' : isMr ? 'खरा मेसेज बँक कोडमधून येतो व त्यात लिंक नसते' : 'असली मैसेज बैंक कोड से आता है और उसमें कोई लिंक नहीं होता',
      wrongOption: isEn ? 'Fake SMS asking to click a link to receive lottery is real' : isMr ? 'लॉटरीची लिंक असलेला मेसेज खरा असतो' : 'लॉटरी की लिंक वाला मैसेज असली होता है',
      actionLabel: isEn ? 'Identify Real vs Fake SMS' : isMr ? 'खरा vs खोटा SMS ओळखा' : 'असली vs फर्जी SMS पहचानें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, fakeVsRealChecked: true }));
        triggerInstructionSuccess(isEn ? 'SMS Verified' : isMr ? 'SMS पडताळणी' : 'SMS सत्यापन');
      },
    };
  }

  if (type === 'scam_otp') {
    return {
      question: isEn ? 'What should you do if an unknown caller asks for your OTP?' : isMr ? 'कोणी फोनवर OTP मागितल्यास काय करावे?' : 'फोन पर कोई OTP मांगे तो क्या करना चाहिए?',
      correctOption: isEn ? 'Never share OTP and hang up the phone immediately' : isMr ? 'कधीही OTP सांगू नका आणि फोन त्वरित कट करा' : 'कभी भी OTP न बताएं और तुरंत फोन काट दें',
      wrongOption: isEn ? 'Read the OTP numbers out loud' : isMr ? 'OTP मोठ्याने सांगा' : 'ओटीपी बोलकर बता दें',
      actionLabel: isEn ? 'Block Scam Call' : isMr ? 'कॉल कट करा' : 'कॉल काटें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, scamBlocked: true }));
        triggerInstructionSuccess(isEn ? 'Scam Blocked' : isMr ? 'फसवणूक ब्लॉक' : 'धोखाधड़ी ब्लॉक');
      },
    };
  }

  if (type === 'scam_fake_call') {
    return {
      question: isEn ? 'Does your real bank ever ask for your password on phone?' : isMr ? 'खरी बँक फोनवर पासवर्ड मागते का?' : 'क्या असली बैंक फोन पर पासवर्ड मांगता है?',
      correctOption: isEn ? 'NEVER! Genuine banks never ask for passwords or PINs' : isMr ? 'कधीच नाही! खरी बँक फोनवर कधीही पासवर्ड मागत नाही' : 'कभी नहीं! असली बैंक फोन पर कभी पासवर्ड या पिन नहीं मांगता',
      wrongOption: isEn ? 'Yes, you must share everything' : isMr ? 'हो, सर्व माहिती द्यावी लागते' : 'हाँ, सारी जानकारी देनी होती है',
      actionLabel: isEn ? 'Hang Up Fake Call' : isMr ? 'कॉल कापा' : 'कॉल काटें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, fakeCallCut: true }));
        triggerInstructionSuccess(isEn ? 'Fake Call Ended' : isMr ? 'कॉल समाप्त' : 'कॉल समाप्त');
      },
    };
  }

  if (type === 'youtube_search') {
    return {
      question: isEn ? 'How do you search for bhajans on YouTube using voice?' : isMr ? 'यूट्यूबवर बोलून भजन कसे शोधावे?' : 'यूट्यूब पर बोलकर भजन कैसे खोजें?',
      correctOption: isEn ? 'Tap the microphone icon next to search bar and speak' : isMr ? 'सर्च बारशेजारील माइक दाबा आणि भजन बोला' : 'सर्च बार के बगल में माइक दबाएं और भजन का नाम बोलें',
      wrongOption: isEn ? 'Switch off the internet connection' : isMr ? 'इंटरनेट बंद करा' : 'इंटरनेट बंद कर दें',
      actionLabel: isEn ? 'Tap Search Mic' : isMr ? 'माइक दाबा' : 'माइक दबाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, ytSearched: true }));
        triggerInstructionSuccess(isEn ? 'YouTube Voice Search' : isMr ? 'यूट्यूब व्हॉइस सर्च' : 'यूट्यूब वॉइस सर्च');
      },
    };
  }

  if (type === 'youtube_player') {
    return {
      question: isEn ? 'How do you play or pause a video on YouTube?' : isMr ? 'यूट्यूब व्हिडिओ कसा सुरू करावा?' : 'यूट्यूब वीडियो कैसे चलाएं?',
      correctOption: isEn ? 'Tap the center Play button on the video screen' : isMr ? 'व्हिडिओच्या मध्यभागी असलेल्या प्ले बटणावर स्पर्श करा' : 'वीडियो के बीच में प्ले बटन पर स्पर्श करें',
      wrongOption: isEn ? 'Restart your mobile phone' : isMr ? 'फोन रीस्टार्ट करा' : 'फोन रीस्टार्ट करें',
      actionLabel: isEn ? 'Play Video' : isMr ? 'व्हिडिओ प्ले करा' : 'वीडियो चलाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, ytPlaying: true }));
        triggerInstructionSuccess(isEn ? 'Video Playing' : isMr ? 'व्हिडिओ सुरू' : 'वीडियो शुरू');
      },
    };
  }

  if (type === 'youtube_subscribe') {
    return {
      question: isEn ? 'How do you follow a YouTube channel for new videos?' : isMr ? 'यूट्यूब चॅनलचे नवीन व्हिडिओ मिळवण्यासाठी काय करावे?' : 'यूट्यूब चैनल के नए वीडियो पाने के लिए क्या करें?',
      correctOption: isEn ? 'Tap the red Subscribe button and the Bell icon' : isMr ? 'लाल Subscribe बटण आणि घंटी दाबा' : 'लाल Subscribe बटन और घंटी दबाएं',
      wrongOption: isEn ? 'Close YouTube' : isMr ? 'यूट्यूब बंद करा' : 'यूट्यूब बंद कर दें',
      actionLabel: isEn ? 'Subscribe Channel' : isMr ? 'सबस्क्राईब करा' : 'सब्सक्राइब करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, subscribed: true }));
        triggerInstructionSuccess(isEn ? 'Subscribed' : isMr ? 'सबस्क्राईब पूर्ण' : 'सब्सक्राइब पूर्ण');
      },
    };
  }

  if (type === 'instagram_signin') {
    return {
      question: isEn ? 'How do you open Instagram on your phone?' : isMr ? 'इन्स्टाग्राम उघडण्यासाठी कोणते चिन्ह दाबावे?' : 'इन्स्टाग्राम खोलने के लिए कौन सा आइकन दबाएं?',
      correctOption: isEn ? 'Tap the colorful camera Instagram icon' : isMr ? 'रंगीत कॅमेऱ्याचे इन्स्टाग्राम चिन्ह दाबा' : 'रंगीन कैमरे का इन्स्टाग्राम आइकन दबाएं',
      wrongOption: isEn ? 'Open phone dialer' : isMr ? 'फोन डायलर उघडा' : 'फोन डायलर खोलें',
      actionLabel: isEn ? 'Open Instagram' : isMr ? 'इन्स्टाग्राम उघडा' : 'इन्स्टाग्राम खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igLoggedIn: true }));
        triggerInstructionSuccess(isEn ? 'Instagram Open' : isMr ? 'इन्स्टाग्राम सुरू' : 'इन्स्टाग्राम शुरू');
      },
    };
  }

  if (type === 'instagram_profile') {
    return {
      question: isEn ? 'Where can you see your own photos and bio on Instagram?' : isMr ? 'स्वतःची प्रोफाईल कुठे दिसते?' : 'खुद की प्रोफाइल कहाँ दिखती है?',
      correctOption: isEn ? 'Tap your circular photo icon at bottom-right corner' : isMr ? 'खालील उजव्या कोपऱ्यातील प्रोफाईल फोटोवर स्पर्श करा' : 'नीचे दाएं कोने में अपनी प्रोफाइल फोटो पर छुएं',
      wrongOption: isEn ? 'Uninstall Instagram' : isMr ? 'ॲप डिलीट करा' : 'ऐप हटा दें',
      actionLabel: isEn ? 'Open Profile' : isMr ? 'प्रोफाईल उघडा' : 'प्रोफाइल खोलें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igProfileViewed: true }));
        triggerInstructionSuccess(isEn ? 'Profile View' : isMr ? 'प्रोफाईल पाहिली' : 'प्रोफाइल देखी');
      },
    };
  }

  if (type === 'instagram_contacts') {
    return {
      question: isEn ? 'How do you follow family members on Instagram?' : isMr ? 'नातेवाईकांना फॉलो कसे करावे?' : 'रिश्तेदारों को फॉलो कैसे करें?',
      correctOption: isEn ? 'Search their name and tap the blue "Follow" button' : isMr ? 'नाव शोधून निळे "Follow" बटण दाबा' : 'नाम खोजकर नीला "Follow" बटन दबाएं',
      wrongOption: isEn ? 'Block their profile' : isMr ? 'ब्लॉक करा' : 'ब्लॉक कर दें',
      actionLabel: isEn ? 'Follow Family' : isMr ? 'फॉलो करा' : 'फॉलो करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igFollowed: true }));
        triggerInstructionSuccess(isEn ? 'Followed' : isMr ? 'फॉलो केले' : 'फॉलो किया');
      },
    };
  }

  if (type === 'instagram_reels') {
    return {
      question: isEn ? 'How do you watch short fun Reels on Instagram?' : isMr ? 'रील्स व्हिडिओ कसे पाहावे?' : 'रील्स वीडियो कैसे देखें?',
      correctOption: isEn ? 'Tap Reels tab and swipe up to browse videos; tap Heart to like' : isMr ? 'Reels टॅब दाबा, वर स्वाइप करा आणि लाईक दाबा' : 'Reels टैब दबाएं, ऊपर स्वाइप करें और लाइक दबाएं',
      wrongOption: isEn ? 'Keep watching a static screen' : isMr ? 'स्क्रीन तशीच ठेवा' : 'स्क्रीन रोककर रखें',
      actionLabel: isEn ? 'Watch & Like Reel' : isMr ? 'रील पहा व लाईक करा' : 'रील देखें व लाइक करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igReelLiked: true }));
        triggerInstructionSuccess(isEn ? 'Reel Liked' : isMr ? 'रील लाईक केली' : 'रील लाइक की');
      },
    };
  }

  if (type === 'instagram_requests') {
    return {
      question: isEn ? 'Who should you confirm on Instagram follow requests?' : isMr ? 'कोणाची फॉलो रिक्वेस्ट स्वीकारावी?' : 'किसकी फॉलो रिक्वेस्ट स्वीकारनी चाहिए?',
      correctOption: isEn ? 'Only confirm real family and friends; delete unknown strangers' : isMr ? 'फक्त ओळखीच्या नातेवाईकांची रिक्वेस्ट स्वीकारा' : 'सिर्फ परिचित रिश्तेदारों की रिक्वेस्ट स्वीकारें',
      wrongOption: isEn ? 'Confirm everyone including suspicious strangers' : isMr ? 'सर्व अनोळखी लोकांना जोडा' : 'सभी अजनबियों को जोड़ें',
      actionLabel: isEn ? 'Confirm Known Request' : isMr ? 'कन्फर्म करा' : 'कन्फर्म करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igRequestConfirmed: true }));
        triggerInstructionSuccess(isEn ? 'Request Confirmed' : isMr ? 'स्वीकारले' : 'स्वीकार किया');
      },
    };
  }

  if (type === 'instagram_post') {
    return {
      question: isEn ? 'How do you share a photo post on Instagram?' : isMr ? 'इन्स्टाग्रामवर नवीन फोटो कसा पोस्ट करावा?' : 'इन्स्टाग्राम पर नया फोटो कैसे पोस्ट करें?',
      correctOption: isEn ? 'Tap Plus (+), select photo, type caption & tap Share' : isMr ? '+ दाबा, फोटो निवडा आणि Share दाबा' : '+ दबाएं, फोटो चुनें और Share दबाएं',
      wrongOption: isEn ? 'Cancel without sharing' : isMr ? 'रद्द करा' : 'रद्द कर दें',
      actionLabel: isEn ? 'Share Photo Post' : isMr ? 'फोटो पोस्ट करा' : 'फोटो पोस्ट करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, igPostShared: true }));
        triggerInstructionSuccess(isEn ? 'Post Shared' : isMr ? 'फोटो शेअर केला' : 'फोटो शेयर किया');
      },
    };
  }

  if (type === 'flashlight') {
    return {
      question: isEn ? 'How do you turn on your flashlight in the dark?' : isMr ? 'अंधारात टॉर्च कशी चालू करावी?' : 'अंधेरे में टॉर्च कैसे चालू करें?',
      correctOption: isEn ? 'Swipe down top panel and tap the Flashlight button' : isMr ? 'वरचा पडदा खाली ओढून टॉर्च चिन्हावर दाबा' : 'ऊपर का पर्दा नीचे खींचकर टॉर्च आइकन पर दबाएं',
      wrongOption: isEn ? 'Lock the phone and do nothing' : isMr ? 'काहीही करू नका' : 'कुछ मत करें',
      actionLabel: isEn ? 'Turn ON Flashlight' : isMr ? 'टॉर्च चालू करा' : 'टॉर्च चालू करें',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, flashlightOn: !s.flashlightOn }));
        triggerInstructionSuccess(isEn ? 'Flashlight ON' : isMr ? 'टॉर्च चालू' : 'टॉर्च चालू');
      },
    };
  }

  if (type === 'emergency_call') {
    return {
      question: isEn ? 'What is the National Emergency number in India?' : isMr ? 'भारतात आपत्कालीन नंबर कोणता आहे?' : 'भारत में राष्ट्रीय आपातकालीन नंबर कौन सा है?',
      correctOption: isEn ? 'Dial 112 for Police, Ambulance & Emergency help' : isMr ? 'पोलीस आणि रुग्णवाहिकेसाठी 112 डायल करा' : 'पुलिस और एम्बुलेंस सहायता के लिए 112 डायल करें',
      wrongOption: isEn ? 'Dial random unknown numbers' : isMr ? 'काहीही डायल करा' : 'कोई भी नंबर डायल करें',
      actionLabel: isEn ? 'Call 112 SOS' : isMr ? '112 कॉल लावा' : '112 पर कॉल लगाएं',
      onPerform: () => {
        setPhoneState((s) => ({ ...s, emergencyDialed: true }));
        triggerInstructionSuccess(isEn ? 'Emergency 112' : isMr ? 'आपत्कालीन 112' : 'आपातकालीन 112');
      },
    };
  }

  // Default fallback
  return {
    question: isEn
      ? `Follow the visual guide: ${step.title}`
      : isMr
      ? `मार्गदर्शिकेनुसार सराव पूर्ण करा: ${step.title}`
      : `दिए गए मार्गदर्शन के अनुसार अभ्यास करें: ${step.title}`,
    correctOption: isEn
      ? 'Perform the safe action indicated on the phone screen'
      : isMr
      ? 'फोन स्क्रीनवर दाखवलेली योग्य कृती करा'
      : 'फोन स्क्रीन पर दिखाई गई सुरक्षित क्रिया करें',
    wrongOption: isEn
      ? 'Press random unknown buttons'
      : isMr
      ? 'स्क्रीनवर कोणतेही चुकीचे बटण दाबा'
      : 'स्क्रीन पर कोई भी गलत बटन दबाएं',
    actionLabel: isEn ? 'Tap Phone Screen' : isMr ? 'स्क्रीनवर स्पर्श करा' : 'स्क्रीन पर टैप करें',
    onPerform: () => {
      setPhoneState((s) => ({ ...s }));
      triggerInstructionSuccess(step.title);
    },
  };
}

export interface VirtualPhoneIllustrationProps {
  step: LessonStep;
  lang: LanguageCode;
  phoneState: PhoneSimulatorState;
  quiz: QuizDetails;
  isPracticed: boolean;
  setPhoneState?: React.Dispatch<React.SetStateAction<PhoneSimulatorState>>;
}

export const VirtualPhoneIllustration: React.FC<VirtualPhoneIllustrationProps> = ({
  step,
  lang,
  phoneState,
  quiz,
  isPracticed,
}) => {
  const type = step.illustrationType;
  const isEn = lang === 'en';
  const isMr = lang === 'mr';

  // Outer phone wrapper with full touch & click reliability
  const renderPhoneShell = (content: React.ReactNode) => (
    <div
      onClick={() => quiz.onPerform()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          quiz.onPerform();
        }
      }}
      className={`w-full max-w-[270px] sm:max-w-[290px] h-80 sm:h-88 mx-auto rounded-[32px] sm:rounded-[36px] bg-slate-950 border-3 sm:border-4 ${
        isPracticed ? 'border-emerald-500 ring-4 ring-emerald-400/40' : 'border-slate-700 hover:border-teal-500'
      } p-3 shadow-2xl relative flex flex-col justify-between text-white select-none touch-manipulation cursor-pointer active:scale-[0.99] transition-all group overflow-hidden`}
    >
      {/* Top phone bezel, speaker earpiece & front camera */}
      <div className="w-full flex items-center justify-between px-2 pt-0.5 text-[10px] text-slate-400 pointer-events-none shrink-0">
        <span className="font-bold">10:30</span>
        <div className="w-14 h-3 bg-slate-800 rounded-full flex items-center justify-center">
          <div className="w-7 h-1 bg-slate-600 rounded-full" />
        </div>
        <div className="flex items-center gap-1 font-semibold text-[9px] text-emerald-400">
          <span>5G</span>
          <span>100% </span>
        </div>
      </div>

      {/* Screen Interactive Workspace */}
      <div className="w-full flex-1 flex flex-col justify-between py-1.5 overflow-hidden">
        {content}
      </div>

      {/* Bottom Virtual Home Bar indicator */}
      <div className="w-full flex justify-center py-0.5 pointer-events-none shrink-0">
        <div className="w-24 h-1 bg-slate-600 rounded-full" />
      </div>

      {/* Practiced Green Badge Overlay */}
      {isPracticed && (
        <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md pointer-events-none animate-in zoom-in">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  const renderActionButton = (label: string, icon?: React.ReactNode, customColor?: string) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        quiz.onPerform();
      }}
      className={`w-full py-2.5 px-3 rounded-2xl ${
        customColor || 'bg-[#0D5C5A] hover:bg-[#0A4846] text-white ring-2 ring-teal-400/40'
      } font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer touch-manipulation select-none transition-transform shrink-0 mt-auto`}
    >
      {icon || <Check className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );

  // 1. Phone Power On/Off
  if (type === 'phone_power') {
    return renderPhoneShell(
      <>
        {phoneState.powerOn || isPracticed ? (
          <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center mb-2 shadow-inner">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <span className="text-sm font-extrabold text-white">Digital Sathi</span>
            <span className="text-[11px] text-emerald-300 mt-0.5">
              {isEn ? 'Phone is Turned ON ' : isMr ? 'फोन चालू झाला आहे ' : 'फोन चालू हो गया है '}
            </span>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform animate-pulse">
              <Power className="w-8 h-8" />
            </div>
            <span className="text-xs font-extrabold text-amber-300">
              {isEn ? 'Press Power Button on Right' : isMr ? 'उजवीकडील पॉवर बटण दाबा' : 'दाहिनी तरफ पावर बटन दबाएं'}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">{isEn ? 'Hold for 3-4 seconds' : isMr ? '३-४ सेकंद दाबून ठेवा' : '3-4 सेकंड दबाकर रखें'}</span>
          </div>
        )}
        {renderActionButton(quiz.actionLabel, <Power className="w-4 h-4" />, 'bg-amber-600 hover:bg-amber-700 text-white')}
      </>
    );
  }

  // 2. Battery Charging & Charging Port
  if (type === 'battery_charging' || type === 'charging_port') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <BatteryCharging className="w-10 h-10 animate-pulse" />
          </div>
          <span className="text-base font-extrabold text-emerald-300">
            {phoneState.chargingPlugged || isPracticed ? (isEn ? '100% Safely Charging ' : isMr ? '100% सुरक्षित चार्ज होत आहे ' : '100% सुरक्षित चार्ज हो रहा है ') : (isEn ? 'Plug in Charger' : isMr ? 'चार्जर जोडा' : 'चार्जर लगाएं')}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">
            {isEn ? 'Insert pin gently into bottom socket' : isMr ? 'खालील सॉकेटमध्ये पिन हळुवार लावा' : 'नीचे सॉकेट में पिन धीरे से लगाएं'}
          </span>
        </div>
        {renderActionButton(quiz.actionLabel, <BatteryCharging className="w-4 h-4" />, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 3. Volume Buttons
  if (type === 'volume_buttons') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2">
            <Volume2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            {isEn ? 'Ringtone Volume: 100%' : isMr ? 'रिंगटोन आवाज: १००%' : 'रिंगटोन आवाज़: 100%'}
          </span>
          <div className="w-40 h-3 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500 w-full" />
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Volume2 className="w-4 h-4" />)}
      </>
    );
  }

  // 4. Lock Screen
  if (type === 'lock_screen') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mb-1">
            {phoneState.unlocked || isPracticed ? <Unlock className="w-6 h-6 text-emerald-400" /> : <Lock className="w-6 h-6" />}
          </div>
          <span className="text-2xl font-light text-white tracking-wider">10:30</span>
          <span className="text-[10px] text-slate-400 mt-0.5">{isEn ? 'Monday, August 15' : isMr ? 'सोमवार, १५ ऑगस्ट' : 'सोमवार, 15 अगस्त'}</span>
          <p className="text-[11px] text-amber-300 font-bold mt-2 animate-bounce">
             {isEn ? 'Swipe up to unlock' : isMr ? 'अनलॉक करण्यासाठी वर सरकवा' : 'अनलॉक करने के लिए ऊपर स्वाइप करें'}
          </p>
        </div>
        {renderActionButton(quiz.actionLabel, <Unlock className="w-4 h-4" />)}
      </>
    );
  }

  // 5. Touch Gesture
  if (type === 'touch_gesture') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 border-2 border-dashed border-teal-400 flex items-center justify-center mb-2 animate-pulse">
            <span className="text-2xl"></span>
          </div>
          <span className="text-xs font-extrabold text-teal-300">
            {isEn ? 'Tap gently here' : isMr ? 'येथे हलकेच स्पर्श करा' : 'यहाँ हल्के से टच करें'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">
            {isEn ? 'Tap with fingertip and lift immediately' : isMr ? 'बोटाने एक सेकंदात स्पर्श करून उचला' : 'उंगली से एक बार छूकर तुरंत उठाएं'}
          </span>
        </div>
        {renderActionButton(quiz.actionLabel, <span></span>)}
      </>
    );
  }

  // 6. Phone App Icon
  if (type === 'phone_app_icon') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-2">
          <p className="text-[10px] text-slate-400 text-center mb-3">{isEn ? 'Home Screen' : isMr ? 'होम स्क्रीन' : 'होम स्क्रीन'}</p>
          <div className="grid grid-cols-3 gap-2 place-items-center">
            <div className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-emerald-500/20 ring-2 ring-emerald-400 scale-105">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-emerald-300">{isEn ? 'Phone ' : isMr ? 'फोन ' : 'फ़ोन '}</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-50">
              <div className="w-11 h-11 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-slate-300">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-50">
              <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-slate-300">YouTube</span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Phone className="w-4 h-4" />)}
      </>
    );
  }

  // 7. Contacts List
  if (type === 'contacts_list') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col p-1">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800 px-1">
            <span className="text-[11px] font-bold text-slate-300">{isEn ? 'Contacts' : isMr ? 'संपर्क यादी' : 'संपर्क सूची'}</span>
            <Users className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                  रो
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{isEn ? 'Rohan (Grandson)' : isMr ? 'रोहन (नातू)' : 'रोहन (पोता)'}</p>
                  <p className="text-[9px] text-slate-400">9876543210</p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between opacity-70">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
                  ने
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{isEn ? 'Neha (Daughter)' : isMr ? 'नेहा (मुलगी)' : 'नेहा (बेटी)'}</p>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Phone className="w-4 h-4" />)}
      </>
    );
  }

  // 8. Dial Pad
  if (type === 'dial_pad') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between p-1">
          <div className="text-center py-1 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-base font-extrabold text-emerald-400 tracking-wider">98765 43210</span>
          </div>
          <div className="grid grid-cols-3 gap-1 place-items-center my-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((n) => (
              <div
                key={n}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shadow-xs"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <PhoneCall className="w-4 h-4" />, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 9. Calling Screen (Incoming)
  if (type === 'calling_screen') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl mb-1 shadow-lg animate-bounce">
            ‍
          </div>
          <h4 className="text-sm font-extrabold text-white">{isEn ? 'Rohan' : isMr ? 'रोहन' : 'रोहन'}</h4>
          <span className="text-[11px] text-emerald-400 font-bold animate-pulse">{isEn ? 'Incoming Call... (Ringing)' : isMr ? 'कॉल येत आहे...' : 'कॉल आ रहा है...'}</span>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-70">
              <PhoneOff className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-400/50 animate-pulse">
              <Phone className="w-6 h-6" />
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Phone className="w-4 h-4" />, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 10. End Call
  if (type === 'end_call') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center text-xl mb-1">
            ‍
          </div>
          <h4 className="text-sm font-extrabold text-white">{isEn ? 'Rohan' : isMr ? 'रोहन' : 'रोहन'}</h4>
          <span className="text-[11px] text-emerald-400 font-semibold">{isEn ? 'Call Active: 00:15' : isMr ? 'कॉल चालू आहे: 00:15' : 'कॉल चालू है: 00:15'}</span>
          <p className="text-[10px] text-slate-400 mt-2">{isEn ? '"Yes Grandpa, coming in evening!"' : isMr ? '"हो बाबा, मी संध्याकाळी येतो!"' : '"हाँ दादाजी, मैं शाम को आता हूँ!"'}</p>
          <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl mt-2 ring-4 ring-rose-400/50 animate-pulse">
            <PhoneOff className="w-6 h-6" />
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <PhoneOff className="w-4 h-4" />, 'bg-rose-600 hover:bg-rose-700 text-white')}
      </>
    );
  }

  // 11. Add Contact
  if (type === 'add_contact') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-2 space-y-2">
          <div className="flex items-center gap-1.5 text-teal-400 pb-1 border-b border-slate-800">
            <UserPlus className="w-4 h-4" />
            <span className="text-xs font-bold">{isEn ? 'New Contact' : isMr ? 'नवीन संपर्क' : 'नया संपर्क'}</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-1.5">
            <div>
              <span className="text-[9px] text-slate-400 block">{isEn ? 'Name:' : isMr ? 'नाव:' : 'नाम:'}</span>
              <p className="text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded">{isEn ? 'Neha' : isMr ? 'नेहा' : 'नेहा'}</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block">{isEn ? 'Mobile Number:' : isMr ? 'मोबाईल नंबर:' : 'मोबाइल नंबर:'}</span>
              <p className="text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded">98765 00000</p>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <UserCheck className="w-4 h-4" />)}
      </>
    );
  }

  // 12. WhatsApp Icon
  // 12. WhatsApp Icon on Smartphone Home Screen
  if (type === 'whatsapp_icon') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between p-1 relative">
          {/* Realistic Home Screen Wallpaper & Date */}
          <div className="text-center pt-2">
            <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">10:30</span>
            <p className="text-[10px] text-slate-300 font-semibold drop-shadow">{isEn ? 'Monday, August 15 • 28°C' : isMr ? 'सोमवार, १५ ऑगस्ट • 28°C' : 'सोमवार, 15 अगस्त • 28°C'}</p>
          </div>

          {/* Home Screen App Grid */}
          <div className="grid grid-cols-3 gap-2 px-1 my-auto">
            {/* Phone dialer */}
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[9px] text-slate-300 font-bold mt-1">{isEn ? 'Phone' : isMr ? 'फोन' : 'फ़ोन'}</span>
            </div>

            {/* Messages */}
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[9px] text-slate-300 font-bold mt-1">{isEn ? 'Messages' : isMr ? 'मेसेज' : 'मैसेज'}</span>
            </div>

            {/* WhatsApp - Highlighted with pulsing glow and pointer */}
            <div className="flex flex-col items-center relative">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-400/80 animate-pulse relative">
                <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  2
                </span>
              </div>
              <span className="text-[10px] text-emerald-300 font-extrabold mt-1">WhatsApp</span>
              <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full mt-0.5 shadow-sm animate-bounce">
                 येथे दाबा
              </span>
            </div>
          </div>

          {/* Hint overlay */}
          <div className="p-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-center">
            <span className="text-[10px] text-emerald-300 font-bold">
              {phoneState.whatsappChatOpened || isPracticed ? 'व्हॉट्सॲप उघडले ' : 'हिरव्या व्हॉट्सॲप (WhatsApp) आयकॉनवर स्पर्श करा'}
            </span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <MessageCircle className="w-4 h-4" />, 'bg-[#25D366] hover:bg-[#1EBE5D] text-white')}
      </>
    );
  }

  // 12B. WhatsApp Chats List
  if (type === 'whatsapp_chats_list') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* Authentic WhatsApp Top Bar */}
          <div className="bg-[#075E54] text-white px-2 py-1.5 rounded-t-xl flex items-center justify-between shadow-sm">
            <span className="text-xs font-black tracking-wide">WhatsApp</span>
            <div className="flex items-center gap-2 text-slate-200">
              <Search className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* WhatsApp Navigation Tabs */}
          <div className="bg-[#075E54] text-white flex text-[10px] font-bold border-b-2 border-emerald-400 px-1">
            <div className="flex-1 text-center py-1 border-b-2 border-white text-white">
              चॅट्स (Chats 3)
            </div>
            <div className="flex-1 text-center py-1 text-teal-200">
              Updates
            </div>
            <div className="flex-1 text-center py-1 text-teal-200">
              Calls
            </div>
          </div>

          {/* Realistic Chat Rows */}
          <div className="flex-1 bg-slate-900 divide-y divide-slate-800/80 overflow-y-auto p-1 space-y-1">
            {/* Rohan - Highlighted Target */}
            <div className="p-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/60 flex items-center justify-between relative shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  रो
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-white">रोहन (बेटा)</span>
                    <span className="text-[9px] text-emerald-400"></span>
                  </div>
                  <span className="text-[9px] text-slate-300 line-clamp-1">नमस्ते बाबा, संध्याकाळी येतो...</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[8px] text-emerald-400 font-bold block">10:15 AM</span>
                <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full shadow-xs">
                   उघडा
                </span>
              </div>
            </div>

            {/* Sunita (Daughter) */}
            <div className="p-1.5 rounded-xl bg-slate-900 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  सु
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-slate-200">सुनीता (मुलगी)</span>
                  <span className="text-[9px] text-slate-400 block">बाबा, औषध घेतले का?</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-slate-500 block">09:30 AM</span>
                <span className="w-4 h-4 bg-emerald-500 text-white font-bold text-[8px] rounded-full flex items-center justify-center ml-auto">
                  1
                </span>
              </div>
            </div>

            {/* Family Group */}
            <div className="p-1.5 rounded-xl bg-slate-900 flex items-center justify-between opacity-70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center shrink-0">
                  ‍‍
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-slate-300">आपले कुटुंब (Family)</span>
                  <span className="text-[9px] text-slate-400 block">सुप्रभात सर्वांना </span>
                </div>
              </div>
              <span className="text-[8px] text-slate-500">काल</span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <MessageCircle className="w-4 h-4" />, 'bg-[#075E54] hover:bg-[#064e46] text-white')}
      </>
    );
  }

  // 13. WhatsApp Chat Screen & Send Message
  if (type === 'whatsapp_chat') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* WhatsApp Chat Header */}
          <div className="bg-[#075E54] text-white px-2 py-1.5 rounded-t-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-200" />
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                रो
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-extrabold text-white">रोहन (बेटा) </p>
                <p className="text-[8px] text-emerald-300 font-semibold">🟢 ऑनलाइन (Online)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Video className="w-3.5 h-3.5" />
              <Phone className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Chat Messages canvas */}
          <div className="flex-1 bg-slate-900 p-2 space-y-1.5 overflow-y-auto">
            {/* Incoming message */}
            <div className="bg-slate-800 text-slate-100 p-2 rounded-2xl rounded-tl-xs max-w-[85%] text-[10px] shadow-sm leading-snug">
              <p>नमस्ते बाबा! मी संध्याकाळी घरी येताना काही आणू का?</p>
              <span className="text-[8px] text-slate-400 block text-right mt-0.5">10:14 AM</span>
            </div>

            {/* Outgoing reply */}
            <div className="bg-[#056162] text-white p-2 rounded-2xl rounded-tr-xs max-w-[85%] ml-auto text-[10px] shadow-sm leading-snug">
              <p>हो बेटा, ताजी फळे आणि औषध घेऊन ये.</p>
              <div className="flex items-center justify-end gap-1 text-[8px] text-teal-300 mt-0.5">
                <span>10:15 AM</span>
                <CheckCheck className="w-3 h-3 text-cyan-300" />
              </div>
            </div>
          </div>

          {/* Typing box & On-screen Virtual Keyboard */}
          <div className="bg-slate-950 p-1.5 border-t border-slate-800 space-y-1">
            {/* Input pill */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-full border border-slate-700">
              <Smile className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[10px] text-white font-medium flex-1">धन्यवाद बेटा...</span>
              <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {/* Send Button highlighted */}
              <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md ring-2 ring-emerald-400 animate-pulse">
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>

            {/* Keyboard visual */}
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-center gap-1 text-[9px] text-slate-300 font-bold">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">क</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">ख</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">ग</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">म</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">र</span>
              </div>
              <div className="w-full py-0.5 bg-slate-800 rounded text-center text-[9px] text-slate-300 font-bold">
                [  स्पेसबार: मराठी / हिंदी / Eng ]
              </div>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Send className="w-4 h-4" />, 'bg-[#075E54] hover:bg-[#064e46] text-white')}
      </>
    );
  }

  // 14. Voice Message Button Focus
  if (type === 'voice_message') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* WhatsApp Header with Rohan */}
          <div className="bg-[#075E54] text-white px-2 py-1.5 rounded-t-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-200" />
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                रो
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-extrabold text-white">रोहन (बेटा) </p>
                <p className="text-[8px] text-emerald-300 font-semibold">🟢 ऑनलाइन</p>
              </div>
            </div>
          </div>

          {/* Chat history showing typing is not needed */}
          <div className="flex-1 bg-slate-900 p-2 space-y-2 flex flex-col justify-center text-center">
            <div className="p-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-[11px] font-bold">
              {lang === 'mr' ? ' "टाईप करण्याची गरज नाही!"' : ' "टाइप करने की ज़रूरत नहीं!"'}
              <p className="text-[10px] text-slate-300 font-normal mt-0.5">
                {lang === 'mr'
                  ? 'फक्त खाली उजवीकडील हिरवे माइक () बटण दाबून ठेवा आणि बोला.'
                  : 'बस नीचे दाईं ओर हरे माइक () बटन को दबाकर रखें और बोलें।'}
              </p>
            </div>
          </div>

          {/* Bottom input area with glowing Mic button */}
          <div className="bg-slate-950 p-2 border-t border-slate-800 flex items-center gap-2">
            <div className="flex-1 bg-slate-900 px-3 py-2 rounded-full border border-slate-800 text-[10px] text-slate-400">
              {lang === 'mr' ? 'संदेश लिहा (किंवा माइक दाबा)...' : 'संदेश लिखें (या माइक दबाएं)...'}
            </div>
            {/* Big Pulsing Green Mic Button with Pointer */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-400/90 animate-pulse">
                <Mic className="w-6 h-6" />
              </div>
              <span className="absolute -top-7 -left-12 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-md animate-bounce">
                {lang === 'mr' ? ' येथे आहे माइक!' : ' यहाँ है माइक!'}
              </span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Mic className="w-4 h-4" />, 'bg-[#25D366] hover:bg-[#1EBE5D] text-white')}
      </>
    );
  }

  // 14B. Voice Message Recording Active
  if (type === 'voice_message_record') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* WhatsApp Header with Rohan */}
          <div className="bg-[#075E54] text-white px-2 py-1.5 rounded-t-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                रो
              </div>
              <p className="text-[11px] font-extrabold text-white">रोहन (बेटा)</p>
            </div>
          </div>

          {/* Chat canvas with Sent Voice Note preview */}
          <div className="flex-1 bg-slate-900 p-2 space-y-2">
            {/* Outgoing Voice Message Note */}
            <div className="bg-[#056162] text-white p-2 rounded-2xl rounded-tr-xs max-w-[90%] ml-auto shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <div className="flex-1 space-y-1">
                  {/* Waveform visual */}
                  <div className="h-1.5 bg-teal-400/40 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-300 w-3/5 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[8px] text-teal-200">
                    <span>0:14</span>
                    <span className="flex items-center gap-0.5">
                       <Mic className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Voice Recording Bar */}
          <div className="bg-slate-950 p-2 border-t border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-emerald-500/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-mono font-black text-rose-400">0:05</span>
                {/* Real-time wave bars */}
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-2.5 bg-emerald-400 rounded animate-bounce" />
                  <div className="w-0.5 h-4 bg-emerald-400 rounded animate-bounce delay-75" />
                  <div className="w-0.5 h-1.5 bg-emerald-400 rounded animate-bounce delay-150" />
                  <div className="w-0.5 h-5 bg-emerald-400 rounded animate-bounce delay-100" />
                  <div className="w-0.5 h-3 bg-emerald-400 rounded animate-bounce delay-200" />
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-bold">
                &larr; Slide to cancel
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Mic className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Mic className="w-4 h-4" />, 'bg-[#25D366] hover:bg-[#1EBE5D] text-white')}
      </>
    );
  }

  // 15. Keyboard Language Gear Settings
  if (type === 'keyboard_lang') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* Chat Message Box */}
          <div className="p-2 bg-slate-900 border-b border-slate-800">
            <span className="text-[10px] text-slate-400 block">संदेश लिहा (Type message):</span>
            <p className="text-xs font-bold text-white bg-slate-950 p-1.5 rounded-lg border border-slate-800 mt-1">
              मला मराठीत टाईप करायचे आहे |
            </p>
          </div>

          {/* Realistic Virtual Keyboard with Settings Highlighted */}
          <div className="bg-slate-950 p-1.5 space-y-1.5">
            {/* Keyboard upper toolbar */}
            <div className="flex items-center justify-between px-1 py-1 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-black text-blue-400 px-1">G</span>
              <span className="text-[10px] text-slate-400"></span>
              <span className="text-[10px] text-slate-400"></span>
              {/* Highlighted Gear  */}
              <div className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[9px] flex items-center gap-1 shadow-sm ring-2 ring-amber-300 animate-pulse">
                <Settings className="w-3 h-3 text-slate-950" />
                <span>सेटिंग (Gear ) </span>
              </div>
              <Mic className="w-3 h-3 text-slate-400" />
            </div>

            {/* Keys layout */}
            <div className="space-y-1">
              <div className="flex justify-center gap-1 text-[10px] text-slate-200 font-bold">
                <span className="bg-slate-800 px-2 py-1 rounded">क</span>
                <span className="bg-slate-800 px-2 py-1 rounded">ख</span>
                <span className="bg-slate-800 px-2 py-1 rounded">ग</span>
                <span className="bg-slate-800 px-2 py-1 rounded">घ</span>
                <span className="bg-slate-800 px-2 py-1 rounded">च</span>
              </div>
              {/* Spacebar */}
              <div className="w-full py-1.5 rounded-xl bg-teal-800/60 border border-teal-500 text-white text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm">
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>[  मराठी / हिंदी / Eng ]</span>
              </div>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Settings className="w-4 h-4" />)}
      </>
    );
  }

  // 15B. Keyboard Add Language
  if (type === 'keyboard_add_lang') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left p-1">
          <div className="p-1.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-800 text-teal-300">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black">Languages (भाषा निवडा)</span>
            </div>
            {/* Active Language Toggles */}
            <div className="space-y-1 pt-0.5">
              <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500 flex items-center justify-between text-[10px]">
                <span className="font-bold text-emerald-300"> मराठी (भारत) - Marathi</span>
                <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">सक्रिय</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/60 flex items-center justify-between text-[10px]">
                <span className="font-bold text-emerald-300"> हिन्दी (भारत) - Hindi</span>
                <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">सक्रिय</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>English (India)</span>
                <span className="text-[9px] text-slate-500">QWERTY</span>
              </div>
            </div>
          </div>

          {/* Spacebar Instruction Demonstration */}
          <div className="p-2 rounded-xl bg-slate-900 border border-teal-500 text-center space-y-1">
            <span className="text-[9px] text-amber-300 font-bold block">
               स्पेसबार दाबून ठेवा आणि भाषा बदला
            </span>
            <div className="py-1 rounded-lg bg-teal-600 text-white text-[10px] font-black flex items-center justify-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>[  मराठी / हिंदी / Eng ]</span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Globe className="w-4 h-4" />)}
      </>
    );
  }

  // 16. WhatsApp Video Call Icon Focus
  if (type === 'video_call') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* Header with Video Camera highlighted */}
          <div className="bg-[#075E54] text-white px-2 py-2 rounded-t-xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-200" />
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                रो
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-white">रोहन (बेटा) </p>
                <p className="text-[8px] text-emerald-300 font-semibold">🟢 ऑनलाइन</p>
              </div>
            </div>

            {/* Video Call Icon Highlighted with Glowing Ring and Pointer */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg ring-4 ring-amber-300 animate-pulse">
                  <Video className="w-4 h-4 text-slate-950" />
                </div>
                <span className="absolute -bottom-6 -right-2 bg-amber-400 text-slate-950 font-black text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-md animate-bounce">
                   व्हिडिओ कॉल
                </span>
              </div>
              <Phone className="w-3.5 h-3.5 text-slate-300" />
              <MoreVertical className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>

          {/* Explanation canvas */}
          <div className="flex-1 bg-slate-900 p-3 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-teal-600/30 border-2 border-teal-400 text-teal-300 flex items-center justify-center text-2xl shadow-inner">
               &harr; 
            </div>
            <p className="text-xs font-extrabold text-white">समोरासमोर व्हिडिओ कॉल</p>
            <p className="text-[10px] text-slate-300 leading-snug">
              वर उजवीकडील व्हिडिओ कॅमेरा () चिन्हावर स्पर्श करून कुटुंबियांशी समोरासमोर बोला.
            </p>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Video className="w-4 h-4" />)}
      </>
    );
  }

  // 16B. Video Call Active Screen (Red Button to End)
  if (type === 'video_call_active') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden relative rounded-2xl bg-slate-900">
          {/* Full Screen Grandson video feed */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-950/80 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-center">
            <span className="text-6xl drop-shadow-lg animate-bounce"></span>
            <p className="text-xs font-black text-white mt-2">रोहन (बेटा)</p>
            <span className="text-[9px] text-emerald-300 font-mono font-bold mt-0.5">🟢 02:35 • WhatsApp Video (HD)</span>
          </div>

          {/* Picture-in-picture Grandma front camera at top-right */}
          <div className="absolute top-2 right-2 w-14 h-18 rounded-xl bg-slate-800 border-2 border-teal-400 shadow-xl flex flex-col items-center justify-center text-center z-10">
            <span className="text-2xl"></span>
            <span className="text-[7px] text-slate-300 font-bold">तुम्ही (You)</span>
          </div>

          {/* Bottom Call Controls with Prominent Red End Button */}
          <div className="mt-auto w-full p-2 bg-slate-950/80 backdrop-blur-md flex items-center justify-around z-10 border-t border-slate-800">
            {/* Flip camera */}
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs">
              <RotateCcw className="w-4 h-4" />
            </div>

            {/* Red End Call Button with Pointer */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl ring-4 ring-rose-400/80 animate-pulse">
                <PhoneOff className="w-6 h-6" />
              </div>
              <span className="absolute -top-6 -left-8 bg-rose-500 text-white font-black text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-md animate-bounce">
                 कॉल बंद करा (लाल बटण)
              </span>
            </div>

            {/* Mute Mic */}
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs">
              <Mic className="w-4 h-4" />
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <PhoneOff className="w-4 h-4" />, 'bg-rose-600 hover:bg-rose-700 text-white')}
      </>
    );
  }

  // 17A. WhatsApp Status Tab
  if (type === 'whatsapp_status_tab') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left">
          {/* Authentic WhatsApp Top Bar */}
          <div className="bg-[#075E54] text-white px-2 py-1.5 rounded-t-xl flex items-center justify-between shadow-sm">
            <span className="text-xs font-black tracking-wide">WhatsApp</span>
            <div className="flex items-center gap-2 text-slate-200">
              <Search className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Navigation Tabs with Updates / Status Tab Active */}
          <div className="bg-[#075E54] text-white flex text-[10px] font-bold border-b-2 border-emerald-400 px-1">
            <div className="flex-1 text-center py-1 text-teal-200">
              {isEn ? 'Chats' : isMr ? 'चॅट्स' : 'चैट्स'}
            </div>
            <div className="flex-1 text-center py-1 border-b-2 border-white text-white font-black">
              Updates (स्टेटस) 🟢
            </div>
            <div className="flex-1 text-center py-1 text-teal-200">
              Calls
            </div>
          </div>

          {/* Status Section */}
          <div className="flex-1 bg-slate-900 p-2 space-y-2">
            <span className="text-[10px] text-slate-400 font-bold block">Status (स्टेटस)</span>

            {/* My Status row with + button highlighted */}
            <div className="p-2 rounded-2xl bg-emerald-950/50 border border-emerald-500/70 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-bold">
                    
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#25D366] text-white font-extrabold text-xs rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-900 animate-pulse">
                    +
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-black text-white">माझे स्टेटस (My Status)</p>
                  <p className="text-[9px] text-emerald-300">नवीन फोटो लावण्यासाठी स्पर्श करा</p>
                </div>
              </div>
              <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                 + दाबा
              </span>
            </div>

            {/* Recent status from daughter */}
            <div className="p-1.5 rounded-xl bg-slate-900 flex items-center gap-2.5 opacity-70">
              <div className="w-9 h-9 rounded-full ring-2 ring-emerald-400 p-0.5">
                <div className="w-full h-full rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  सु
                </div>
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-slate-200">सुनीता (मुलगी)</p>
                <p className="text-[8px] text-slate-400">20 मिनिटांपूर्वी</p>
              </div>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <PlusSquare className="w-4 h-4" />, 'bg-[#075E54] hover:bg-[#064e46] text-white')}
      </>
    );
  }

  // 17B. WhatsApp Status Photo Picker
  if (type === 'whatsapp_status_photo') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left p-1">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-[11px] font-bold text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> गॅलरीतून फोटो निवडा (Gallery)
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">१ फोटो निवडला </span>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-2 my-auto p-1">
            {/* Selected Flower with Diya */}
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-950/60 p-2 text-center shadow-lg relative">
              <span className="text-3xl block animate-bounce"></span>
              <span className="text-[9px] font-extrabold text-white mt-1 block">सुंदर ताजी फुले</span>
              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">
                
              </div>
            </div>

            {/* Mandir Diya */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-center opacity-80">
              <span className="text-3xl block"></span>
              <span className="text-[9px] font-bold text-slate-300 mt-1 block">मंदिर दिवा</span>
            </div>

            {/* Sunrise */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-center opacity-80">
              <span className="text-3xl block"></span>
              <span className="text-[9px] font-bold text-slate-300 mt-1 block">प्रभात सूर्योदय</span>
            </div>

            {/* Family photo */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-center opacity-80">
              <span className="text-3xl block">‍‍</span>
              <span className="text-[9px] font-bold text-slate-300 mt-1 block">कुटुंब</span>
            </div>
          </div>

          <div className="p-1 rounded-lg bg-emerald-950/80 border border-emerald-500 text-center">
            <span className="text-[10px] text-emerald-300 font-bold">
               सुंदर फुलांचा फोटो निवडला आहे
            </span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Camera className="w-4 h-4" />, 'bg-teal-600 hover:bg-teal-700 text-white')}
      </>
    );
  }

  // 17C. WhatsApp Status Music Search
  if (type === 'whatsapp_status_music_search' || type === 'whatsapp_status_music') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left relative">
          {/* Photo background preview */}
          <div className="p-2 bg-gradient-to-b from-amber-950/60 to-slate-950 rounded-xl flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="text-[10px] font-bold text-white">निवडलेला फोटो</p>
                <p className="text-[8px] text-amber-300">शुभ प्रभात संदेश</p>
              </div>
            </div>
            {/* Top Toolbar with Music Icon Highlighted */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400">Aa</span>
              <span className="text-[10px] text-slate-400"></span>
              <div className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[9px] flex items-center gap-1 shadow-sm ring-2 ring-amber-300 animate-pulse">
                <Music className="w-3 h-3 text-slate-950" />
                <span>संगीत  </span>
              </div>
            </div>
          </div>

          {/* Music Search and Picker Modal */}
          <div className="flex-1 bg-slate-900/95 rounded-2xl border border-amber-500/60 p-2 my-1.5 space-y-1.5 shadow-xl">
            {/* Search Input */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-xl border border-slate-700">
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] text-white font-bold flex-1">श्री राम जानकी</span>
            </div>

            {/* Selected Song Row */}
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-black text-white">श्री राम जानकी बैठे हैं</p>
                  <p className="text-[8px] text-amber-300">लखबीर सिंह लक्खा • भजन</p>
                </div>
              </div>
              <span className="text-[8px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                 जोडले
              </span>
            </div>

            {/* Audio Wave preview badge on photo */}
            <div className="p-1.5 bg-slate-950/80 rounded-xl border border-teal-500 flex items-center justify-center gap-1.5 text-cyan-300 text-[9px] font-bold">
              <Music className="w-3 h-3 animate-pulse" />
              <span>भजन संगीत फोटोसोबत वाजेल </span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Music className="w-4 h-4" />, 'bg-amber-600 hover:bg-amber-700 text-white')}
      </>
    );
  }

  // 17D. WhatsApp Status Send
  if (type === 'whatsapp_status_send') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left relative">
          {/* Full Status Preview */}
          <div className="flex-1 rounded-2xl bg-gradient-to-b from-rose-950/60 via-amber-950/50 to-slate-950 p-3 flex flex-col items-center justify-center text-center relative border border-slate-800">
            <span className="text-5xl block drop-shadow-md"></span>
            <p className="text-xs font-extrabold text-white mt-2">सुप्रभात सर्वांना </p>

            {/* Music badge */}
            <div className="mt-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-400 text-amber-300 text-[9px] font-bold flex items-center gap-1.5 shadow-md">
              <Music className="w-3 h-3" />
              <span>श्री राम जानकी बैठे हैं मेरे सीने में...</span>
            </div>
          </div>

          {/* Bottom Send Action Row with Green Arrow */}
          <div className="bg-slate-950 p-2 rounded-b-xl border-t border-slate-800 flex items-center justify-between">
            <div className="leading-tight">
              <span className="text-[10px] font-bold text-white block">Status (माझे संपर्क)</span>
              <span className="text-[8px] text-slate-400">२४ तास सर्वांना दिसेल</span>
            </div>

            {/* Prominent Green Send Button with Pointer */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-400/90 animate-pulse">
                <Send className="w-5 h-5 ml-0.5" />
              </div>
              <span className="absolute -top-6 -left-10 bg-amber-400 text-slate-950 font-black text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-md animate-bounce">
                 येथे दाबा (Send)
              </span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Send className="w-4 h-4" />, 'bg-[#25D366] hover:bg-[#1EBE5D] text-white')}
      </>
    );
  }

  // 18. Photo Send
  if (type === 'photo_send') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-1 shadow-lg">
            <Camera className="w-8 h-8" />
          </div>
          <span className="text-xs font-extrabold text-blue-300">
            {phoneState.photoSent || isPracticed ? 'फोटो पाठवला ' : 'कॅमेरा / गॅलरीतून फोटो निवडा'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">कुटुंबियांना सणाचा फोटो पाठवा</span>
        </div>
        {renderActionButton(quiz.actionLabel, <Camera className="w-4 h-4" />, 'bg-blue-600 hover:bg-blue-700 text-white')}
      </>
    );
  }

  // 19. UPI Scanner Icon
  if (type === 'upi_scanner_icon') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-16 h-16 rounded-3xl bg-teal-600 text-white flex items-center justify-center shadow-xl ring-4 ring-teal-400/40 animate-pulse">
            <QrCode className="w-10 h-10" />
          </div>
          <span className="text-xs font-extrabold text-teal-300 mt-2">
            दुकानदाराचा QR स्कॅनर [·]
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">पैसे पाठवण्यासाठी स्कॅनर उघडा</span>
        </div>
        {renderActionButton(quiz.actionLabel, <QrCode className="w-4 h-4" />)}
      </>
    );
  }

  // 20. UPI QR Scan
  if (type === 'upi_qr') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-20 h-20 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center p-2 relative bg-emerald-950/30">
            <Scan className="w-12 h-12 text-emerald-300" />
            <div className="absolute inset-x-2 top-1/2 h-0.5 bg-emerald-400 shadow-md animate-ping" />
          </div>
          <span className="text-xs font-extrabold text-emerald-300 mt-2">
            {phoneState.qrScanned || isPracticed ? 'QR कोड स्कॅन झाला ' : 'QR कोड कॅमेऱ्यासमोर धरा'}
          </span>
          <span className="text-[10px] text-slate-400">किराणा स्टोअर (Kirana Store)</span>
        </div>
        {renderActionButton(quiz.actionLabel, <Scan className="w-4 h-4" />, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 21. UPI Amount Entry
  if (type === 'upi_amount') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <span className="text-[10px] text-slate-400">रक्कम तपासा (Verify Amount)</span>
          <div className="w-28 py-1.5 bg-slate-900 border-2 border-emerald-400 rounded-2xl text-xl font-extrabold text-emerald-300 mt-1 shadow-inner">
            ₹ 50.00
          </div>
          <span className="text-[10px] text-slate-300 mt-1.5">किराणा दुकान: ५० रुपये</span>
          <span className="text-[9px] text-amber-300 mt-0.5 font-bold">शून्यांची संख्या नीट मोजा</span>
        </div>
        {renderActionButton(quiz.actionLabel, <span>₹</span>, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 22. UPI PIN Safe
  if (type === 'upi_pin_safe') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1">
            <Key className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-amber-300">
            {phoneState.pinEntered || isPracticed ? 'गोपनीय PIN सुरक्षित टाकला ' : 'आपला गुप्त UPI PIN टाका'}
          </span>
          <div className="flex justify-center gap-2 my-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-emerald-300"
              />
            ))}
          </div>
          <span className="text-[9px] text-rose-300 font-bold"> PIN कोणालाही सांगू नका</span>
        </div>
        {renderActionButton(quiz.actionLabel, <Key className="w-4 h-4" />, 'bg-amber-600 hover:bg-amber-700 text-white')}
      </>
    );
  }

  // 23. UPI Success
  if (type === 'upi_success') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1 shadow-2xl ring-4 ring-emerald-300 animate-in zoom-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-sm font-extrabold text-emerald-300">₹ 50 Paid Successfully</h4>
          <span className="text-[10px] text-slate-300 mt-0.5">किराणा स्टोअरला पैसे पोहोचले </span>
          <span className="text-[9px] text-slate-500 mt-1 font-mono">UPI Ref: 428901239</span>
        </div>
        {renderActionButton(quiz.actionLabel, <CheckCircle2 className="w-4 h-4" />, 'bg-emerald-600 hover:bg-emerald-700 text-white')}
      </>
    );
  }

  // 24. UPI Bank SMS Popup
  if (type === 'upi_bank_sms_popup') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-1 space-y-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-[10px] font-bold text-teal-400">अधिकृत बँक मेसेज (Bank SMS)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                VM-SBIINB 
              </span>
              <span className="text-[9px] text-slate-500">10:31</span>
            </div>
            <p className="text-[10px] text-slate-200 leading-snug">
              A/c XX1234 debited by INR 50.00 on 15-Aug. Avl Bal: INR 12,450.00
            </p>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <ShieldCheck className="w-4 h-4" />)}
      </>
    );
  }

  // 25. UPI Fake vs Real SMS
  if (type === 'upi_fake_vs_real_sms') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-1 space-y-1.5 text-left">
          <div className="p-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500 text-[10px]">
            <span className="text-emerald-400 font-extrabold block"> खरा बँक SMS:</span>
            <span className="text-slate-300 block text-[9px]">AX-HDFCBK: INR 500 debited...</span>
          </div>
          <div className="p-1.5 rounded-xl bg-rose-950/40 border border-rose-500 text-[10px]">
            <span className="text-rose-400 font-extrabold block">X खोटा फ्रॉड SMS (सावधान):</span>
            <span className="text-slate-300 block text-[9px]">+91-9876543210: 25 Lakh Lottery click...</span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <ShieldCheck className="w-4 h-4" />)}
      </>
    );
  }

  // 26. Scam OTP Protection
  if (type === 'scam_otp') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center mb-1 ring-2 ring-rose-500 animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h4 className="text-xs font-extrabold text-rose-300">खोटा बँक मॅनेजर कॉल!</h4>
          <p className="text-[10px] text-slate-300 mt-1 leading-snug">
            "मी बँकेतून बोलत आहे, KYC साठी OTP सांगा"
          </p>
          <span className="text-[10px] text-amber-300 font-bold mt-1">
             OTP कधीही कोणाला सांगू नका!
          </span>
        </div>
        {renderActionButton(quiz.actionLabel, <PhoneOff className="w-4 h-4" />, 'bg-rose-600 hover:bg-rose-700 text-white')}
      </>
    );
  }

  // 27. Scam Fake Call Cut
  if (type === 'scam_fake_call') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center mb-1 shadow-lg animate-bounce">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-xs font-extrabold text-rose-300">अनोळखी फ्रॉड कॉल </h4>
          <span className="text-[10px] text-slate-400 mt-0.5">+91 00000 00000</span>
          <p className="text-[10px] text-rose-400 font-bold mt-2">कॉल त्वरित कट करा आणि ब्लॉक करा</p>
        </div>
        {renderActionButton(quiz.actionLabel, <PhoneOff className="w-4 h-4" />, 'bg-rose-600 hover:bg-rose-700 text-white')}
      </>
    );
  }

  // 28. YouTube Search
  if (type === 'youtube_search') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-1.5 space-y-2">
          <div className="flex items-center gap-1.5 text-red-500 pb-1 border-b border-slate-800">
            <Youtube className="w-5 h-5" />
            <span className="text-xs font-extrabold text-white">YouTube</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 p-2 rounded-2xl border border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-300 flex-1">श्री राम भजन...</span>
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm animate-pulse">
              <Mic className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-teal-300 text-center font-bold"> माइक दाबून भजन बोला</p>
        </div>
        {renderActionButton(quiz.actionLabel, <Mic className="w-4 h-4" />, 'bg-red-600 hover:bg-red-700 text-white')}
      </>
    );
  }

  // 29. YouTube Player
  if (type === 'youtube_player') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-center p-1 space-y-1.5">
          <div className="w-full h-24 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
            <div className="absolute bottom-1 left-2 right-2 h-1 bg-slate-700 rounded-full">
              <div className="h-full bg-red-600 w-2/3 rounded-full" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-white line-clamp-1">प्रभात सुंदर भजन - अनूप जलोटा</p>
        </div>
        {renderActionButton(quiz.actionLabel, <Play className="w-4 h-4" />, 'bg-red-600 hover:bg-red-700 text-white')}
      </>
    );
  }

  // 30. YouTube Subscribe
  if (type === 'youtube_subscribe') {
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-1">
            <Bell className="w-6 h-6 animate-bounce" />
          </div>
          <h4 className="text-xs font-bold text-white">भक्ती सागर चॅनल</h4>
          <span className="text-[10px] text-slate-400 mt-0.5">५ लाख भाविक जोडले आहेत</span>
          <div className="flex items-center gap-2 mt-2">
            <div className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-extrabold">
              {phoneState.subscribed || isPracticed ? 'Subscribed ' : 'Subscribe'}
            </div>
            <Bell className="w-4 h-4 text-amber-400" />
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Bell className="w-4 h-4" />, 'bg-red-600 hover:bg-red-700 text-white')}
      </>
    );
  }

  // 31. Instagram Sign In / App Launch
  if (type === 'instagram_signin') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between p-1 relative text-left">
          {/* Authentic Home Screen Wallpaper */}
          <div className="text-center pt-2">
            <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">10:30</span>
            <p className="text-[10px] text-slate-300 font-semibold drop-shadow">
              {isMr ? 'सोमवार, १५ ऑगस्ट' : 'सोमवार, 15 अगस्त'}
            </p>
          </div>

          {/* Smartphone Apps Grid with Instagram Highlighted */}
          <div className="grid grid-cols-3 gap-2 px-1 my-auto">
            <div className="flex flex-col items-center opacity-70">
              <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[9px] text-slate-300 mt-1">{isMr ? 'फोन' : 'फ़ोन'}</span>
            </div>

            <div className="flex flex-col items-center opacity-70">
              <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[9px] text-slate-300 mt-1">WhatsApp</span>
            </div>

            {/* Instagram App Icon - Iconic Gradient with Glowing Pointer */}
            <div className="flex flex-col items-center relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xl ring-4 ring-rose-400/80 animate-pulse">
                <Camera className="w-7 h-7" />
              </div>
              <span className="text-[10px] text-rose-300 font-extrabold mt-1">Instagram</span>
              <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full mt-0.5 shadow-sm animate-bounce whitespace-nowrap">
                {isMr ? ' येथे दाबा' : ' यहाँ छुएं'}
              </span>
            </div>
          </div>

          <div className="p-1.5 rounded-xl bg-slate-900/90 border border-rose-500/40 text-center">
            <span className="text-[10px] text-rose-300 font-bold">
              {phoneState.igLoggedIn || isPracticed
                ? (isMr ? 'इन्स्टाग्राम उघडले ' : 'इन्स्टाग्राम खुल गया ')
                : (isMr ? 'रंगीबेरंगी Instagram चिन्हावर स्पर्श करा' : 'रंग-बिरंगे Instagram आइकन पर छुएं')}
            </span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Camera className="w-4 h-4" />, 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white')}
      </>
    );
  }

  // 32. Instagram Profile
  if (type === 'instagram_profile') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left bg-slate-950 rounded-xl">
          {/* Instagram Header */}
          <div className="px-2 py-1.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-black text-white flex items-center gap-1">
              sudha_sharma  <span className="text-[8px] text-slate-400">v</span>
            </span>
            <div className="flex items-center gap-2 text-slate-300 text-xs font-bold">
              <span>+</span>
              <span>≡</span>
            </div>
          </div>

          {/* Profile Header & Stats */}
          <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              {/* Avatar with Story Gradient Ring */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl">
                  
                </div>
              </div>
              <div className="flex gap-3 text-center">
                <div>
                  <span className="text-xs font-black text-white block">12</span>
                  <span className="text-[8px] text-slate-400">Posts</span>
                </div>
                <div>
                  <span className="text-xs font-black text-white block">48</span>
                  <span className="text-[8px] text-slate-400">Followers</span>
                </div>
                <div>
                  <span className="text-xs font-black text-white block">35</span>
                  <span className="text-[8px] text-slate-400">Following</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-[11px] font-black text-white">
                {isMr ? 'सुधा शर्मा (Sudha Sharma)' : 'सुधा शर्मा (Sudha Sharma)'}
              </p>
              <p className="text-[9px] text-slate-300 leading-tight">
                {isMr
                  ? 'कुटुंब आणि ईश्वराची भक्ती  | नातवंडांचे गोड क्षण '
                  : 'परिवार और प्रभु भक्ति  | नाती-पोतों के प्यारे पल '}
              </p>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base"></div>
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base">‍‍</div>
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base"></div>
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base"></div>
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base"></div>
              <div className="aspect-square rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-base"></div>
            </div>
          </div>

          {/* Bottom Nav Bar with Profile Highlighted */}
          <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-slate-400">
            <span className="text-xs"></span>
            <span className="text-xs"></span>
            <span className="text-xs">+</span>
            <span className="text-xs"></span>
            {/* Highlighted Profile icon */}
            <div className="w-5 h-5 rounded-full ring-2 ring-rose-500 flex items-center justify-center text-[10px] bg-slate-800 animate-pulse">
              
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Users className="w-4 h-4" />)}
      </>
    );
  }

  // 33. Instagram Contacts / Search & Follow
  if (type === 'instagram_contacts') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left bg-slate-950 rounded-xl p-1 space-y-1">
          {/* Search bar */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] text-white font-bold flex-1">रोहन शर्मा (Rohan)</span>
          </div>

          {/* Search Results */}
          <div className="space-y-1.5 my-auto">
            {/* Rohan Target Card */}
            <div className="p-2 rounded-2xl bg-slate-900 border-2 border-blue-500/70 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  रो
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-black text-white">रोहन शर्मा (Rohan)</p>
                  <p className="text-[9px] text-blue-400 font-medium">
                    {isMr ? '@rohan_sharma • नातू' : '@rohan_sharma • नाती / पोता'}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-xl text-[10px] font-black shadow-sm transition-all ${
                    phoneState.igFollowed || isPracticed
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-blue-600 text-white ring-2 ring-blue-400 animate-pulse'
                  }`}
                >
                  {phoneState.igFollowed || isPracticed ? 'Following ' : 'Follow '}
                </button>
              </div>
            </div>

            {/* Sunita (Daughter) */}
            <div className="p-2 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  सु
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-slate-200">सुनीता वर्मा (Sunita)</p>
                  <p className="text-[9px] text-slate-400">
                    {isMr ? '@sunita_family • मुलगी' : '@sunita_family • बेटी'}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-[9px] font-bold">
                Follow
              </span>
            </div>
          </div>

          <div className="p-1 rounded-lg bg-blue-950/60 border border-blue-500/40 text-center">
            <span className="text-[9px] text-blue-300 font-bold">
              {phoneState.igFollowed || isPracticed
                ? (isMr ? 'नातवाला फॉलो केले ' : 'नाती/पोते को फॉलो किया ')
                : (isMr ? 'नातवाच्या समोरील निळे Follow बटण दाबा' : 'नाती/पोते के सामने नीला Follow बटन दबाएं')}
            </span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <UserCheck className="w-4 h-4" />, 'bg-blue-600 hover:bg-blue-700 text-white')}
      </>
    );
  }

  // 34. Instagram Reels
  if (type === 'instagram_reels') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden relative rounded-2xl bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-950 text-left">
          {/* Reel Header */}
          <div className="p-2 flex items-center justify-between z-10">
            <span className="text-xs font-black text-white flex items-center gap-1 drop-shadow">
              Reels 
            </span>
            <Camera className="w-4 h-4 text-white" />
          </div>

          {/* Reel Video Simulation Center */}
          <div className="my-auto text-center z-10 px-4">
            <span className="text-5xl block animate-bounce drop-shadow-xl"></span>
            <p className="text-xs font-extrabold text-white mt-2 drop-shadow">
              {isMr ? 'सकाळची मंदिर आरती आणि भजन ' : 'सुबह की मंदिर आरती और भजन '}
            </p>
            <span className="text-[9px] text-amber-300 font-bold">@bhakti_sandhya • Follow</span>
          </div>

          {/* Right Action Sidebar (Heart, Comments, Share) */}
          <div className="absolute right-2 bottom-12 flex flex-col items-center gap-3 z-20">
            {/* Heart Like Button Highlighted with Glowing Ring */}
            <div className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                  phoneState.igReelLiked || isPracticed
                    ? 'bg-rose-600 text-white ring-4 ring-rose-400'
                    : 'bg-slate-900/80 text-white ring-4 ring-rose-500/80 animate-pulse'
                }`}
              >
                <Heart className={`w-5 h-5 ${phoneState.igReelLiked || isPracticed ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />
              </div>
              <span className="text-[9px] font-bold text-white drop-shadow mt-0.5">
                {phoneState.igReelLiked || isPracticed ? '1.2k ' : 'Like'}
              </span>
              <span className="absolute -left-16 top-1 bg-rose-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-md animate-bounce">
                {isMr ? ' लाईक करा' : ' लाइक करें'}
              </span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center text-white">
              <MessageCircle className="w-5 h-5" />
              <span className="text-[8px] font-bold">84</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center text-white">
              <Send className="w-5 h-5" />
              <span className="text-[8px] font-bold">Share</span>
            </div>
          </div>

          {/* Audio bar at bottom */}
          <div className="p-2 z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            <div className="flex items-center gap-1.5 text-[9px] text-white font-medium">
              <Music className="w-3 h-3 text-amber-400 animate-spin" />
              <span className="truncate">
                {isMr ? 'श्री राम जानकी भजन • Original Audio' : 'श्री राम जानकी भजन • Original Audio'}
              </span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Heart className="w-4 h-4 fill-white" />, 'bg-rose-600 hover:bg-rose-700 text-white')}
      </>
    );
  }

  // 35. Instagram Follow Requests
  if (type === 'instagram_requests') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left bg-slate-950 rounded-xl p-1.5 space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2 pb-1 border-b border-slate-800 text-white">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-xs font-black">
              {isMr ? 'Notifications (सूचना)' : 'Notifications (सूचनाएं)'}
            </span>
          </div>

          {/* Follow Request Card */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">
              {isMr ? 'फॉलो विनंती (Follow Request):' : 'फॉलो रिक्वेस्ट (Follow Request):'}
            </span>
            <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  ने
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white">
                    {isMr ? 'नेहा वर्मा (मुलगी)' : 'नेहा वर्मा (बेटी)'}
                  </p>
                  <p className="text-[9px] text-slate-400">
                    {isMr ? '@neha_family • विनंती पाठवली' : '@neha_family • रिक्वेस्ट भेजी'}
                  </p>
                </div>
              </div>

              {/* Confirm button with Glowing Ring */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-xl text-[10px] font-black shadow-sm transition-all ${
                    phoneState.igRequestConfirmed || isPracticed
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500'
                      : 'bg-blue-600 text-white ring-2 ring-blue-400 animate-pulse'
                  }`}
                >
                  {phoneState.igRequestConfirmed || isPracticed ? 'Confirmed ' : 'Confirm '}
                </button>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-center mt-auto">
            <span className="text-[9px] text-purple-300 font-bold">
              {phoneState.igRequestConfirmed || isPracticed
                ? (isMr ? 'मुलीची विनंती स्वीकारली ' : 'बेटी की रिक्वेस्ट स्वीकार की ')
                : (isMr ? 'मुलीची विनंती स्वीकारण्यासाठी निळे Confirm बटण दाबा' : 'बेटी की रिक्वेस्ट स्वीकारने के लिए नीला Confirm बटन दबाएं')}
            </span>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <UserCheck className="w-4 h-4" />, 'bg-blue-600 hover:bg-blue-700 text-white')}
      </>
    );
  }

  // 36. Instagram Post / Share
  if (type === 'instagram_post') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-left bg-slate-950 rounded-xl p-1.5 space-y-1.5">
          {/* Top Bar with Blue Share Button */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-black text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> {isMr ? 'नवीन पोस्ट (New Post)' : 'नई पोस्ट (New Post)'}
            </span>
            <div className="relative">
              <button
                type="button"
                className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[10px] font-black shadow-md ring-2 ring-blue-400 animate-pulse"
              >
                Share 
              </button>
            </div>
          </div>

          {/* Photo & Caption */}
          <div className="flex gap-2 items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-amber-950 to-rose-950 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
              
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white font-bold">
                {isMr ? 'सुप्रभात सर्वांना ' : 'सुप्रभात सभी को '}
              </p>
              <span className="text-[8px] text-slate-400 mt-0.5 block">
                {isMr ? 'आजचा दिवस सर्वांसाठी आनंदाचा जावो!' : 'आज का दिन सभी के लिए मंगलमय हो!'}
              </span>
            </div>
          </div>

          {/* Tag people & Add location */}
          <div className="space-y-1 text-[9px] text-slate-300">
            <div className="p-1.5 bg-slate-900 rounded-lg flex items-center justify-between">
              <span>{isMr ? ' नातेवाईकांना टॅग करा (Tag People)' : ' परिवार को टैग करें (Tag People)'}</span>
              <span className="text-blue-400 font-bold">
                {isMr ? 'रोहन, नेहा ' : 'रोहन, नेहा '}
              </span>
            </div>
            <div className="p-1.5 bg-slate-900 rounded-lg flex items-center justify-between">
              <span>{isMr ? ' ठिकाण (Location)' : ' स्थान (Location)'}</span>
              <span className="text-slate-400">{isMr ? 'घर / पुणे' : 'घर / नई दिल्ली'}</span>
            </div>
          </div>
        </div>
        {renderActionButton(quiz.actionLabel, <Share2 className="w-4 h-4" />, 'bg-blue-600 hover:bg-blue-700 text-white')}
      </>
    );
  }

  // 37. Flashlight
  if (type === 'flashlight') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-2 shadow-2xl transition-all ${
              phoneState.flashlightOn || isPracticed ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Flashlight className="w-9 h-9" />
          </div>
          <span className="text-xs font-extrabold text-amber-300">
            {phoneState.flashlightOn || isPracticed
              ? (isMr ? 'टॉर्च चालू आहे ' : 'टॉर्च चालू है ')
              : (isMr ? 'टॉर्च चालू करा' : 'टॉर्च चालू करें')}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">
            {isMr ? 'अंधारात मार्ग शोधण्यासाठी वापरा' : 'अंधेरे में रास्ता देखने के लिए उपयोग करें'}
          </span>
        </div>
        {renderActionButton(quiz.actionLabel, <Flashlight className="w-4 h-4" />, 'bg-amber-500 hover:bg-amber-600 text-slate-950')}
      </>
    );
  }

  // 38. Emergency Call (112 SOS)
  if (type === 'emergency_call') {
    const isEn = lang === 'en';
  const isMr = lang === 'mr';
    return renderPhoneShell(
      <>
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden text-center p-2">
          {phoneState.emergencyDialed || isPracticed ? (
            /* Live 112 Emergency Call Connected Screen */
            <div className="my-auto space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-2xl ring-4 ring-emerald-400 animate-pulse">
                <PhoneCall className="w-9 h-9" />
              </div>
              <div className="leading-tight">
                <span className="text-sm font-black text-white block">
                  {isMr ? ' 112 आपत्कालीन कॉल जोडला!' : ' 112 आपातकालीन कॉल कनेक्ट हुआ!'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold mt-0.5 block">
                  {isMr ? '🟢 00:12 • राष्ट्रीय सेवा सक्रिय' : '🟢 00:12 • राष्ट्रीय आपात सेवा सक्रिय'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-emerald-500/60 text-left text-[9px] text-slate-200 space-y-1">
                <p className="text-emerald-300 font-bold">
                  {isMr ? ' ऑपरेटर संदेश:' : ' ऑपरेटर संदेश:'}
                </p>
                <p>
                  {isMr
                    ? '"आपले लोकेशन नोंदवले आहे. जवळचे पोलीस वाहन आणि रुग्णवाहिका तात्काळ निघत आहे. कृपया फोन जवळ ठेवा."'
                    : '"आपकी लोकेशन दर्ज कर ली गई है। निकटतम पुलिस पीसीआर और एम्बुलेंस तत्काल रवाना हो चुकी है। कृपया फोन पास रखें।"'}
                </p>
              </div>
              <div className="p-1 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-[9px] font-extrabold">
                {isMr ? ' मदत तात्काळ पाठवली गेली आहे!' : ' सहायता तत्काल भेजी गई है!'}
              </div>
            </div>
          ) : (
            /* Initial 112 Dial Screen */
            <div className="my-auto space-y-2">
              <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-2xl ring-4 ring-rose-400/80 animate-pulse">
                <span className="text-base font-black tracking-tight">112 SOS</span>
              </div>
              <div className="leading-tight">
                <h4 className="text-xs font-black text-rose-400">
                  {isMr ? 'आपत्कालीन राष्ट्रीय सेवा (Emergency)' : 'आपातकालीन राष्ट्रीय सेवा (Emergency)'}
                </h4>
                <p className="text-[9px] text-slate-300 mt-1">
                  {isMr
                    ? 'पोलीस (100) • रुग्णवाहिका (108) • अग्निशमन (101)'
                    : 'पुलिस (100) • एम्बुलेंस (108) • दमकल (101)'}
                </p>
              </div>
              <div className="p-1.5 rounded-xl bg-rose-950/60 border border-rose-500/60 text-[9px] text-rose-200">
                {isMr
                  ? ' संकट किंवा अपघाताच्या वेळी फक्त एका क्लिकवर मदत मिळवा'
                  : ' संकट या दुर्घटना के समय एक क्लिक पर तुरंत सहायता पाएं'}
              </div>
            </div>
          )}
        </div>
        {renderActionButton(
          quiz.actionLabel,
          <PhoneCall className="w-4 h-4" />,
          phoneState.emergencyDialed || isPracticed ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
        )}
      </>
    );
  }

  // Universal Default
  return renderPhoneShell(
    <>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-2">
        <div className="w-14 h-14 rounded-3xl bg-teal-700/40 text-teal-300 flex items-center justify-center shadow-inner mb-2">
          <Smartphone className="w-8 h-8" />
        </div>
        <span className="text-xs text-teal-300 font-extrabold block uppercase tracking-wider">
          Digital Sathi
        </span>
        <span className="text-xs text-slate-200 mt-1 block font-bold line-clamp-2">{step.title}</span>
      </div>
      {renderActionButton(quiz.actionLabel)}
    </>
  );
};
