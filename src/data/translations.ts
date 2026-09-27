import { LanguageCode } from '../types';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  skipIntro: string;
  continue: string;
  playVideo: string;
  pauseVideo: string;
  welcomeIntroText: string;
  langSelectTitle: string;
  langSelectSubtitle: string;
  listenToThis: string;
  speakingNow: string;
  stopVoice: string;
  loginTitle: string;
  loginSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  createProfileBtn: string;
  loginBtn: string;
  quickFillBtn: string;
  profileCreatedSuccess: string;
  appTagline: string;
  // Nav
  navHome: string;
  navLearn: string;
  navPractice: string;
  navSafety: string;
  navProgress: string;
  navProfile: string;
  helpBtn: string;
  // Home
  greetingNamaste: string;
  greetingPrompt: string;
  overallProgress: string;
  todayHighlight: string;
  quickPracticeTitle: string;
  quickPracticeDesc: string;
  quickPracticeBtn: string;
  goldenSafetyRuleTitle: string;
  goldenSafetyRuleText: string;
  stagesTitle: string;
  viewAllLessons: string;
  startStageBtn: string;
  continueStageBtn: string;
  // Lesson Detail
  stepLabel: string;
  previousStep: string;
  nextStep: string;
  finishLesson: string;
  watchVideoBtn: string;
  lessonCompletedBadge: string;
  wellDoneLesson: string;
  practiceNowPrompt: string;
  virtualQuizTitle: string;
  practiceInstructionPrompt: string;
  instructionFollowed: string;
  // Practice
  practiceTitle: string;
  practiceSubtitle: string;
  taskLabel: string;
  stepInstructionLabel: string;
  virtualPhoneLabel: string;
  successCelebration: string;
  retryEncouragement: string;
  nextPracticeBtn: string;
  tryAgainBtn: string;
  // Help Drawer
  helpDrawerTitle: string;
  helpDrawerSubtitle: string;
  helpOptionListen: string;
  helpOptionExplain: string;
  helpOptionBack: string;
  helpOptionHome: string;
  helpOptionFamily: string;
  helpFamilyAlert: string;
  closeHelp: string;
  // Profile
  profileTitle: string;
  changeLanguage: string;
  voiceSettings: string;
  voiceSpeedLabel: string;
  voiceSpeedSlow: string;
  voiceSpeedNormal: string;
  fontSizeLabel: string;
  fontSizeNormal: string;
  fontSizeLarge: string;
  fontSizeExtraLarge: string;
  testVoiceBtn: string;
  completedLessonsCount: string;
  practiceScoreLabel: string;
  badgesTitle: string;
  logoutBtn: string;
  confirmLogoutPrompt: string;
  // Safety Quiz
  safetyQuizTitle: string;
  safetyQuizDesc: string;
  checkAnswerBtn: string;
  correctToast: string;
  wrongToast: string;
  // Common UI and Audio Speech Keys
  welcomeGreeting: string;
  whatToLearnToday: string;
  homeWelcomeSubtitle: string;
  safetyGoldenRuleTitle: string;
  safetyGoldenRuleText: string;
  allStages: string;
  lessonsBadge: string;
  startLearning: string;
  backToHome: string;
  voiceActiveHint: string;
  voiceLangBadge: string;
}

export const translations: Record<LanguageCode, TranslationStrings> = {
  hi: {
    appName: 'डिजिटल साथी',
    tagline: 'बुजुर्गों का अपना डिजिटल साथी और शिक्षक',
    skipIntro: 'आगे बढ़ें (Skip)',
    continue: 'आगे बढ़ें',
    playVideo: 'वीडियो चलाएं',
    pauseVideo: 'वीडियो रोकें',
    welcomeIntroText: 'डिजिटल साथी में आपका स्वागत है! यह वीडियो आपको ऐप का उपयोग सिखाएगा।',
    langSelectTitle: 'आप किस भाषा में सीखना चाहते हैं?',
    langSelectSubtitle: 'कृपया अपनी पसंद की भाषा चुनें। पूरा ऐप इसी भाषा में चलेगा।',
    listenToThis: 'सुनें (Listen)',
    speakingNow: 'बोल रहे हैं...',
    stopVoice: 'आवाज़ बंद करें',
    loginTitle: 'डिजिटल साथी में आपका स्वागत है!',
    loginSubtitle: 'स्मार्टफोन चलाना सीखना अब बहुत आसान है।',
    fullNameLabel: 'आपका पूरा नाम',
    fullNamePlaceholder: 'उदा. आनंद वर्मा',
    phoneLabel: 'मोबाइल नंबर',
    phonePlaceholder: 'उदा. 98234 56789',
    createProfileBtn: 'नया प्रोफाइल बनाएं',
    loginBtn: 'लॉग इन करें',
    quickFillBtn: 'एक क्लिक में नाम भरें',
    profileCreatedSuccess: 'बहुत बढ़िया! आपका प्रोफाइल तैयार हो गया है।',
    appTagline: 'बुजुर्गों का अपना डिजिटल साथी और शिक्षक',
    navHome: 'होम',
    navLearn: 'सीखें',
    navPractice: 'अभ्यास (Practice)',
    navSafety: 'सुरक्षा',
    navProgress: 'प्रगति',
    navProfile: 'प्रोफाइल',
    helpBtn: 'मदद (Help)',
    greetingNamaste: 'नमस्ते! आज आप क्या सीखना चाहते हैं?',
    greetingPrompt: 'आइए आज कुछ नया और आसान सीखते हैं।',
    overallProgress: 'आपकी सीखने की प्रगति',
    todayHighlight: 'आज का मुख्य पाठ',
    quickPracticeTitle: 'फोन पर खुद करके देखें (Practice Karo)',
    quickPracticeDesc: 'बिना किसी डर के वर्चुअल फोन पर कॉल लगाना, मैसेज भेजना और सुरक्षित रहना सीखें।',
    quickPracticeBtn: 'अभी अभ्यास शुरू करें',
    goldenSafetyRuleTitle: 'आज का सुरक्षा नियम',
    goldenSafetyRuleText: 'अपना बैंक OTP या UPI PIN किसी को भी फोन पर कभी न बताएं, चाहे वह खुद को बैंक मैनेजर ही क्यों न कहे!',
    stagesTitle: 'सीखने के चरण (Learning Stages)',
    viewAllLessons: 'सभी पाठ देखें',
    startStageBtn: 'शुरू करें',
    continueStageBtn: 'आगे सीखें',
    stepLabel: 'कदम (Step)',
    previousStep: 'पिछला कदम',
    nextStep: 'अगला कदम',
    finishLesson: 'पाठ समाप्त करें',
    watchVideoBtn: 'वीडियो ट्यूटोरियल देखें',
    lessonCompletedBadge: 'पूर्ण हुआ (Completed)',
    wellDoneLesson: 'बहुत खूब! आपने यह पाठ सफलतापूर्वक पूरा कर लिया है।',
    practiceNowPrompt: 'अब वर्चुअल फोन पर इसका अभ्यास करें!',
    virtualQuizTitle: 'वर्चुअल अभ्यास क्विज़ (Virtual Working Quiz)',
    practiceInstructionPrompt: 'निर्देश का पालन करके अभ्यास करें',
    instructionFollowed: 'शाबाश! आपने निर्देश का सही पालन किया (+10 अंक)',
    practiceTitle: 'अभ्यास करें (Practice Karo)',
    practiceSubtitle: 'असली फोन की तरह स्क्रीन को छूकर खुद सीखें। गलती होने का कोई डर नहीं!',
    taskLabel: 'आज का काम (Task)',
    stepInstructionLabel: 'निर्देश:',
    virtualPhoneLabel: 'वर्चुअल स्मार्टफोन',
    successCelebration: 'बहुत बढ़िया! आपने यह काम बिल्कुल सही तरीके से पूरा कर लिया।',
    retryEncouragement: 'कोई बात नहीं, दोबारा कोशिश करें। हमने सही बटन दर्शाया है।',
    nextPracticeBtn: 'अगला अभ्यास करें',
    tryAgainBtn: 'फिर से कोशिश करें',
    helpDrawerTitle: 'डिजिटल साथी मदद केंद्र',
    helpDrawerSubtitle: 'घबराएं नहीं, हम आपकी पूरी मदद करेंगे। क्या सहायता चाहिए?',
    helpOptionListen: 'स्क्रीन पर लिखा सब पढ़कर सुनाएं',
    helpOptionExplain: 'मुझे समझ नहीं आया, आसान शब्दों में समझाएं',
    helpOptionBack: 'पिछले पन्ने पर वापस जाएं',
    helpOptionHome: 'मुख्य स्क्रीन (होम) पर जाएं',
    helpOptionFamily: 'परिवार या साथी हेल्पलाइन से संपर्क करें',
    helpFamilyAlert: 'हेल्पलाइन नंबर: 1800-120-0012 (मुफ्त सेवा) या अपने परिवार के सदस्य को तुरंत कॉल करें।',
    closeHelp: 'बंद करें',
    profileTitle: 'मेरी प्रोफाइल',
    changeLanguage: 'भाषा बदलें (Change Language)',
    voiceSettings: 'आवाज़ की गति और सेटिंग्स',
    voiceSpeedLabel: 'बोलने की गति',
    voiceSpeedSlow: 'धीमी और स्पष्ट (Senior Friendly)',
    voiceSpeedNormal: 'सामान्य गति',
    fontSizeLabel: 'अक्षर का आकार (Font Size)',
    fontSizeNormal: 'मध्यम',
    fontSizeLarge: 'बड़ा',
    fontSizeExtraLarge: 'बहुत बड़ा',
    testVoiceBtn: 'आवाज़ सुनकर देखें',
    completedLessonsCount: 'पूरे किए गए पाठ',
    practiceScoreLabel: 'अभ्यास अंक',
    badgesTitle: 'आपके मेडल और उपलब्धियां',
    logoutBtn: 'लॉग आउट करें',
    confirmLogoutPrompt: 'क्या आप सच में बाहर निकलना चाहते हैं?',
    safetyQuizTitle: 'धोखाधड़ी से सुरक्षा क्विज',
    safetyQuizDesc: 'जांचें कि आप अनजान फोन कॉल्स और फर्जी संदेशों से कितने सुरक्षित हैं।',
    checkAnswerBtn: 'जवाब जांचें',
    correctToast: 'शाबाश! सही जवाब। आप पूरी तरह सुरक्षित हैं।',
    wrongToast: 'सावधान! यह गलत है। कभी भी अज्ञात व्यक्ति को अपनी गोपनीय जानकारी न दें।',
    welcomeGreeting: 'नमस्ते',
    whatToLearnToday: 'आज आप क्या सीखना चाहते हैं?',
    homeWelcomeSubtitle: 'अपनी गति से, बिना किसी झिझक के आसानी से सीखें।',
    safetyGoldenRuleTitle: 'आज का सुरक्षा नियम',
    safetyGoldenRuleText: 'अपना बैंक OTP या UPI PIN किसी को भी फोन पर कभी न बताएं!',
    allStages: 'सीखने के चरण (All Stages)',
    lessonsBadge: 'पाठ',
    startLearning: 'सीखना शुरू करें',
    backToHome: 'होम पर वापस जाएं',
    voiceActiveHint: 'आवाज़ सक्रिय है',
    voiceLangBadge: 'हिंदी आवाज़',
  },
  mr: {
    appName: 'डिजिटल साथी',
    tagline: 'ज्येष्ठ नागरिकांचा हक्काचा डिजिटल मित्र आणि मार्गदर्शक',
    skipIntro: 'पुढे जा (Skip)',
    continue: 'पुढे जा',
    playVideo: 'व्हिडिओ सुरू करा',
    pauseVideo: 'व्हिडिओ थांबवा',
    welcomeIntroText: 'डिजिटल साथीमध्ये आपले सहर्ष स्वागत आहे! हा व्हिडिओ तुम्हाला ॲप वापरण्यास शिकवेल.',
    langSelectTitle: 'तुम्हाला कोणत्या भाषेत शिकायचे आहे?',
    langSelectSubtitle: 'कृपया तुमची आवडती भाषा निवडा. संपूर्ण ॲप याच भाषेत काम करेल.',
    listenToThis: 'ऐका (Listen)',
    speakingNow: 'वाचत आहोत...',
    stopVoice: 'आवाज थांबवा',
    loginTitle: 'डिजिटल साथीमध्ये आपले स्वागत आहे!',
    loginSubtitle: 'स्मार्टफोन वापरणे शिकणे आता अतिशय सोपे झाले आहे.',
    fullNameLabel: 'आपले पूर्ण नाव',
    fullNamePlaceholder: 'उदा. आनंद जोशी',
    phoneLabel: 'मोबाईल नंबर',
    phonePlaceholder: 'उदा. 98234 56789',
    createProfileBtn: 'नवीन प्रोफाईल तयार करा',
    loginBtn: 'लॉग इन करा',
    quickFillBtn: 'एका क्लिकवर नाव भरा',
    profileCreatedSuccess: 'छान! तुमचे प्रोफाईल तयार झाले आहे.',
    appTagline: 'ज्येष्ठ नागरिकांचा हक्काचा डिजिटल मित्र आणि मार्गदर्शक',
    navHome: 'होम',
    navLearn: 'शिका',
    navPractice: 'सराव (Practice)',
    navSafety: 'सुरक्षा',
    navProgress: 'प्रगती',
    navProfile: 'प्रोफाईल',
    helpBtn: 'मदत (Help)',
    greetingNamaste: 'नमस्कार! आज तुम्हाला काय शिकायला आवडेल?',
    greetingPrompt: 'चला आज काहीतरी नवीन आणि सोपे शिकूया.',
    overallProgress: 'तुमची शिकण्याची प्रगती',
    todayHighlight: 'आजचा महत्वाचा धडा',
    quickPracticeTitle: 'फोनवर स्वतः करून पहा (Practice)',
    quickPracticeDesc: 'कोणत्याही भीतीशिवाय व्हर्च्युअल फोनवर कॉल करणे, मेसेज पाठवणे आणि सुरक्षित राहणे शिका.',
    quickPracticeBtn: 'आता सराव सुरू करा',
    goldenSafetyRuleTitle: 'आजचा सुरक्षिततेचा नियम',
    goldenSafetyRuleText: 'आपला बँक OTP किंवा UPI PIN कोणालाही फोनवर कधीही सांगू नका, जरी त्यांनी बँक मॅनेजर असल्याचे सांगितले तरीही!',
    stagesTitle: 'शिकण्याचे टप्पे (Learning Stages)',
    viewAllLessons: 'सर्व धडे पहा',
    startStageBtn: 'सुरू करा',
    continueStageBtn: 'पुढे शिका',
    stepLabel: 'पायरी (Step)',
    previousStep: 'मागील पायरी',
    nextStep: 'पुढील पायरी',
    finishLesson: 'धडा पूर्ण करा',
    watchVideoBtn: 'व्हिडिओ ट्युटोरियल पहा',
    lessonCompletedBadge: 'पूर्ण झाले',
    wellDoneLesson: 'फार छान! तुम्ही हा धडा यशस्वीपणे पूर्ण केला आहे.',
    practiceNowPrompt: 'आता व्हर्च्युअल फोनवर याचा सराव करा!',
    virtualQuizTitle: 'व्हर्च्युअल सराव क्विझ (Virtual Working Quiz)',
    practiceInstructionPrompt: 'दिलेल्या सूचनेनुसार सराव करा',
    instructionFollowed: 'शाब्बास! तुम्ही सूचनेचे अचूक पालन केले (+10 गुण)',
    practiceTitle: 'सराव करा (Practice)',
    practiceSubtitle: 'खऱ्या फोनप्रमाणे स्क्रीनला स्पर्श करून स्वतः शिका. चूक होण्याची अजिबात भीती नाही!',
    taskLabel: 'आजचे काम (Task)',
    stepInstructionLabel: 'सूचना:',
    virtualPhoneLabel: 'व्हर्च्युअल स्मार्टफोन',
    successCelebration: 'खूप छान! तुम्ही हे काम अगदी अचूकपणे पूर्ण केले आहे.',
    retryEncouragement: 'काही हरकत नाही, पुन्हा प्रयत्न करा. आम्ही योग्य बटण दाखवत आहोत.',
    nextPracticeBtn: 'पुढील सराव करा',
    tryAgainBtn: 'पुन्हा प्रयत्न करा',
    helpDrawerTitle: 'डिजिटल साथी मदत केंद्र',
    helpDrawerSubtitle: 'काळजी करू नका, आम्ही तुम्हाला मदत करू. काय मदत हवी आहे?',
    helpOptionListen: 'स्क्रीनवरील मजकूर वाचून दाखवा',
    helpOptionExplain: 'मला समजले नाही, सोप्या शब्दात सांगा',
    helpOptionBack: 'मागील पानावर परत जा',
    helpOptionHome: 'मुख्य स्क्रीनवर (होम) जा',
    helpOptionFamily: 'कुटुंबीय किंवा साथी हेल्पलाइनशी संपर्क करा',
    helpFamilyAlert: 'हेल्पलाइन नंबर: 1800-120-0012 (मोफत सेवा) किंवा तुमच्या कुटुंबियांशी तात्काळ संपर्क साधा.',
    closeHelp: 'बंद करा',
    profileTitle: 'माझे प्रोफाईल',
    changeLanguage: 'भाषा बदला (Change Language)',
    voiceSettings: 'आवाजाची गती आणि सेटिंग्स',
    voiceSpeedLabel: 'बोलण्याची गती',
    voiceSpeedSlow: 'हळू आणि स्पष्ट (ज्येष्ठांसाठी योग्य)',
    voiceSpeedNormal: 'सामान्य गती',
    fontSizeLabel: 'अक्षरांचा आकार (Font Size)',
    fontSizeNormal: 'मध्यम',
    fontSizeLarge: 'मोठा',
    fontSizeExtraLarge: 'खूप मोठा',
    testVoiceBtn: 'आवाज ऐकून पहा',
    completedLessonsCount: 'पूर्ण झालेले धडे',
    practiceScoreLabel: 'सराव गुण',
    badgesTitle: 'तुमचे मेडल आणि यश',
    logoutBtn: 'लॉग आऊट करा',
    confirmLogoutPrompt: 'तुम्हाला नक्की बाहेर पडायचे आहे का?',
    safetyQuizTitle: 'फसवणुकीपासून सुरक्षा क्विझ',
    safetyQuizDesc: 'अनोळखी फोन कॉल्स आणि खोट्या मेसेजपासून तुम्ही किती सुरक्षित आहात ते तपासा.',
    checkAnswerBtn: 'उत्तर तपासा',
    correctToast: 'छान! योग्य उत्तर. तुम्ही पूर्णपणे सुरक्षित आहात.',
    wrongToast: 'सावध राहा! हे चुकीचे आहे. कधीही अनोळखी व्यक्तीला खाजगी माहिती देऊ नका.',
    welcomeGreeting: 'नमस्कार',
    whatToLearnToday: 'आज तुम्हाला काय शिकायला आवडेल?',
    homeWelcomeSubtitle: 'आपल्या गतीने, कोणताही ताण न घेता शिका.',
    safetyGoldenRuleTitle: 'आजचा सुरक्षिततेचा नियम',
    safetyGoldenRuleText: 'आपला बँक OTP किंवा UPI PIN कोणालाही सांगू नका!',
    allStages: 'शिकण्याचे टप्पे (All Stages)',
    lessonsBadge: 'धडे',
    startLearning: 'शिकणे सुरू करा',
    backToHome: 'होमवर परत जा',
    voiceActiveHint: 'आवाज सुरू आहे',
    voiceLangBadge: 'मराठी आवाज',
  },
  en: {
    appName: 'Digital Sathi',
    tagline: 'Your friendly digital companion & smartphone teacher for seniors',
    skipIntro: 'Continue / Skip',
    continue: 'Continue',
    playVideo: 'Play Video',
    pauseVideo: 'Pause Video',
    welcomeIntroText: 'Welcome to Digital Sathi! This introduction will show you how to comfortably use this application.',
    langSelectTitle: 'Which language would you like to learn in?',
    langSelectSubtitle: 'Please select your preferred language. The entire application will switch to this language.',
    listenToThis: 'Listen Voice',
    speakingNow: 'Speaking now...',
    stopVoice: 'Stop Voice',
    loginTitle: 'Welcome to Digital Sathi!',
    loginSubtitle: 'Learning to use your smartphone with complete confidence is simple.',
    fullNameLabel: 'Your Full Name',
    fullNamePlaceholder: 'e.g. Anand Verma',
    phoneLabel: 'Mobile Phone Number',
    phonePlaceholder: 'e.g. 98234 56789',
    createProfileBtn: 'Create Profile',
    loginBtn: 'Login',
    quickFillBtn: 'Quick Fill Name',
    profileCreatedSuccess: 'Wonderful! Your profile has been created successfully.',
    appTagline: 'Your friendly digital companion & smartphone teacher for seniors',
    navHome: 'Home',
    navLearn: 'Learn',
    navPractice: 'Practice',
    navSafety: 'Safety',
    navProgress: 'Progress',
    navProfile: 'Profile',
    helpBtn: 'Help',
    greetingNamaste: 'Welcome! What would you like to learn today?',
    greetingPrompt: 'Let us learn something easy, helpful, and empowering today.',
    overallProgress: 'Your Learning Progress',
    todayHighlight: "Today's Featured Lesson",
    quickPracticeTitle: 'Hands-on Practice',
    quickPracticeDesc: 'Learn by doing on a friendly virtual smartphone with zero fear of making mistakes.',
    quickPracticeBtn: 'Start Practice Now',
    goldenSafetyRuleTitle: 'Golden Digital Safety Rule',
    goldenSafetyRuleText: 'Never share your Bank OTP or UPI PIN with anyone over the phone, even if they claim to be your bank manager!',
    stagesTitle: 'Learning Stages',
    viewAllLessons: 'View all lessons',
    startStageBtn: 'Start Learning',
    continueStageBtn: 'Continue',
    stepLabel: 'Step',
    previousStep: 'Previous Step',
    nextStep: 'Next Step',
    finishLesson: 'Finish Lesson',
    watchVideoBtn: 'Watch Video Tutorial',
    lessonCompletedBadge: 'Completed',
    wellDoneLesson: 'Great job! You have completed this lesson successfully.',
    practiceNowPrompt: 'Now try practicing this on the virtual smartphone!',
    virtualQuizTitle: 'Virtual Working Quiz & Practice',
    practiceInstructionPrompt: 'Practice following this instruction',
    instructionFollowed: 'Well done! You followed the instruction (+10 pts)',
    practiceTitle: 'Interactive Practice Mode',
    practiceSubtitle: 'Touch and tap on the realistic virtual phone to learn by doing. There is no risk of making a mistake!',
    taskLabel: 'Current Task',
    stepInstructionLabel: 'Instruction:',
    virtualPhoneLabel: 'Virtual Smartphone',
    successCelebration: 'Splendid! You completed this action correctly and safely.',
    retryEncouragement: 'No worries at all. Let us try again. We have highlighted the right button for you.',
    nextPracticeBtn: 'Next Practice Task',
    tryAgainBtn: 'Try Again',
    helpDrawerTitle: 'Digital Sathi Help Center',
    helpDrawerSubtitle: 'Do not worry, we are right here to guide you. How can we help?',
    helpOptionListen: 'Read this page out loud to me',
    helpOptionExplain: 'I do not understand, please explain simply',
    helpOptionBack: 'Go back to previous screen',
    helpOptionHome: 'Return to Home Screen',
    helpOptionFamily: 'Contact Family or Sathi Helpline',
    helpFamilyAlert: 'Helpline Number: 1800-120-0012 (Toll Free) or call a family member immediately.',
    closeHelp: 'Close Help',
    profileTitle: 'My Profile',
    changeLanguage: 'Change Language',
    voiceSettings: 'Voice & Speech Settings',
    voiceSpeedLabel: 'Speech Speed',
    voiceSpeedSlow: 'Slow & Gentle (Senior Friendly)',
    voiceSpeedNormal: 'Normal Speed',
    fontSizeLabel: 'Font Size',
    fontSizeNormal: 'Medium',
    fontSizeLarge: 'Large',
    fontSizeExtraLarge: 'Extra Large',
    testVoiceBtn: 'Listen to Voice Sample',
    completedLessonsCount: 'Completed Lessons',
    practiceScoreLabel: 'Practice Score',
    badgesTitle: 'Your Badges & Achievements',
    logoutBtn: 'Log Out',
    confirmLogoutPrompt: 'Are you sure you want to log out?',
    safetyQuizTitle: 'Scam Protection Quiz',
    safetyQuizDesc: 'Test how well you recognize suspicious phone calls and fake messages.',
    checkAnswerBtn: 'Check My Answer',
    correctToast: 'Excellent! Correct choice. You are safe and smart.',
    wrongToast: 'Careful! That is unsafe. Never disclose your private details to callers.',
    welcomeGreeting: 'Welcome',
    whatToLearnToday: 'What would you like to learn today?',
    homeWelcomeSubtitle: 'Learn comfortably at your own pace with confidence.',
    safetyGoldenRuleTitle: "Today's Golden Safety Rule",
    safetyGoldenRuleText: 'Never share your bank OTP or UPI PIN with anyone over the phone!',
    allStages: 'All Learning Stages',
    lessonsBadge: 'Lessons',
    startLearning: 'Start Learning',
    backToHome: 'Back to Home',
    voiceActiveHint: 'Voice narration active',
    voiceLangBadge: 'English Voice',
  },
};
