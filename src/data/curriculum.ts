import { Stage, PracticeTask, SafetyQuizQuestion, LanguageCode } from '../types';
import { stagesMarathi, practiceTasksMarathi } from './curriculumMarathi';
import { stagesEnglish, practiceTasksEnglish } from './curriculumEnglish';

export const stagesData: Stage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'Smartphone Basics',
    subtitle: 'फ़ोन शुरू करना, चार्जिंग और स्क्रीन का सही इस्तेमाल',
    icon: 'Smartphone',
    badge: '10 Lessons',
    lessons: [
      {
        id: 's1-l1',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'What is a Smartphone?',
        shortDesc: 'स्मार्टफोन क्या होता है और यह हमारे काम कैसे आता है?',
        iconName: 'Smartphone',
        youtubeQuery: 'what is a smartphone for seniors hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'स्मार्टफोन: आपकी जेब में एक जादू की डिब्बी',
            description: 'पुराने फोन से सिर्फ बातें होती थीं। स्मार्टफोन में एक शीशे जैसी स्क्रीन होती है जिसे छूकर आप परिवार से वीडियो कॉल कर सकते हैं, गाने सुन सकते हैं और खबरें पढ़ सकते हैं।',
            speechText: 'स्मार्टफोन आपकी जेब में एक जादुई डिब्बी की तरह है। इससे आप सिर्फ बातें ही नहीं, बल्कि अपने बच्चों और पोते-पोतियों का चेहरा देखकर बात कर सकते हैं।',
            tip: 'घबराएं नहीं! छूने से फोन टूटता या खराब नहीं होता।',
            illustrationType: 'touch_gesture',
          },
          {
            stepNumber: 2,
            title: 'स्क्रीन को छूकर चलाना (Touchscreen)',
            description: 'अपनी एक उंगली से स्क्रीन पर हल्का सा छुएं (Tap)। जोर से दबाने की कोई जरूरत नहीं होती।',
            speechText: 'अपनी उंगली से स्क्रीन पर हल्के से छुएं। इसे टैप कहते हैं। जोर से दबाने की बिल्कुल जरूरत नहीं है।',
            tip: 'सूखे और साफ हाथों से इस्तेमाल करने पर फोन सबसे अच्छा चलता है।',
            illustrationType: 'touch_gesture',
          }
        ]
      },
      {
        id: 's1-l2',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'How to Turn Phone ON & OFF',
        shortDesc: 'फोन को चालू और बंद करने का सही तरीका',
        iconName: 'Power',
        youtubeQuery: 'how to turn on smartphone hindi senior',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'पावर बटन को पहचानें',
            description: 'फोन के दाएं या बाएं किनारे पर एक छोटा बटन होता है। इसे पावर बटन (Power Button) कहते हैं।',
            speechText: 'फोन के किनारे पर एक छोटा बटन है। इसे पावर बटन कहते हैं। यह फोन को चालू और बंद करने के काम आता है।',
            illustrationType: 'phone_power',
          },
          {
            stepNumber: 2,
            title: 'फोन चालू (ON) करना',
            description: 'पावर बटन को 3 सेकंड तक दबाकर रखें। फोन थोड़ा सा कांपेगा (Vibrate होगा) और स्क्रीन पर रोशनी आ जाएगी। बटन छोड़ दें।',
            speechText: 'पावर बटन को तीन सेकंड तक दबाकर रखें। जब स्क्रीन पर रोशनी आए तो बटन छोड़ दें।',
            tip: 'फोन पूरी तरह चालू होने में आधा मिनट का समय लेता है। थोड़ा इंतजार करें।',
            illustrationType: 'phone_power',
          },
          {
            stepNumber: 3,
            title: 'फोन बंद (OFF / Restart) करना',
            description: 'पावर बटन को फिर से 3 सेकंड दबाए रखें। स्क्रीन पर "Power Off" (बंद करें) या "Restart" (पुनः चालू करें) का विकल्प आएगा।',
            speechText: 'फोन बंद करने के लिए पावर बटन तीन सेकंड दबाएं, फिर स्क्रीन पर पावर ऑफ वाले लाल निशान को छुएं।',
            illustrationType: 'phone_power',
          }
        ]
      },
      {
        id: 's1-l3',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'Charging & Battery Care',
        shortDesc: 'बैटरी खत्म होने पर क्या करें और चार्जर कैसे लगाएं',
        iconName: 'BatteryCharging',
        youtubeQuery: 'how to charge mobile safely hindi',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: 'बैटरी का निशान देखना',
            description: 'स्क्रीन के सबसे ऊपर कोने में बैटरी का एक छोटा डिब्बा दिखता है। जब वह हरा या सफेद हो तो फोन में जान है, लाल होने पर चार्जिंग की जरूरत है।',
            speechText: 'स्क्रीन के ऊपर कोने में बैटरी का निशान देखें। जब वह लाल हो जाए या 20 प्रतिशत से कम हो, तो फोन को चार्ज पर लगाएं।',
            illustrationType: 'battery_charging',
          },
          {
            stepNumber: 2,
            title: 'चार्जिंग का छेद (Port) पहचानना',
            description: 'फोन के सबसे निचले हिस्से में एक छोटा सा छेद होता है। आजकल ज्यादातर फोन में चौकोर टाइप-सी (Type-C) केबल आसानी से दोनों तरफ से लग जाती है।',
            speechText: 'फोन के नीचे चार्जिंग का छेद होता है। चार्जर के तार को इसमें हल्के हाथ से सीधा लगाएं।',
            illustrationType: 'charging_port',
          },
          {
            stepNumber: 3,
            title: 'चार्जिंग शुरू होना',
            description: 'चार्जर प्लग में लगाकर स्विच ऑन करें। स्क्रीन पर बिजली का निशान  दिखेगा और हल्की घंटी बजेगी। इसका मतलब फोन चार्ज हो रहा है।',
            speechText: 'स्विच चालू करने पर स्क्रीन पर बिजली का निशान दिखेगा। इसका मतलब फोन चार्ज हो रहा है। रात भर चार्ज पर लगाकर छोड़ना जरूरी नहीं है।',
            tip: 'चार्ज होते समय फोन पर बात न करें।',
            warning: 'कभी भी टूटे हुए तार या गीले चार्जर का प्रयोग न करें।',
            illustrationType: 'battery_charging',
          }
        ]
      },
      {
        id: 's1-l4',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'Volume & Sound Buttons',
        shortDesc: 'आवाज़ को कम या ज्यादा करना',
        iconName: 'Volume2',
        youtubeQuery: 'how to increase volume in smartphone',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'आवाज़ के बटन पहचानें',
            description: 'फोन के किनारे पर एक लंबा बटन होता है। ऊपर वाला हिस्सा दबाने से आवाज़ बढ़ती है (+), और नीचे वाला दबाने से घटती है (-)।',
            speechText: 'फोन के किनारे पर लंबा बटन है। ऊपर दबाने से आवाज़ तेज होती है और नीचे दबाने से धीमी होती है।',
            illustrationType: 'volume_buttons',
          },
          {
            stepNumber: 2,
            title: 'बात करते समय आवाज़ बढ़ाना',
            description: 'अगर फोन पर सामने वाले की आवाज़ धीमी आ रही है, तो कान पर फोन लगे रहने के दौरान ही ऊपर वाला बटन दो बार दबाएं।',
            speechText: 'अगर बात करते समय आवाज़ कम लगे, तो फोन के किनारे का ऊपर वाला वॉल्यूम बटन दबाकर आवाज़ बढ़ा लें।',
            tip: 'रिंगटोन तेज रखने से आप कहीं भी हों, फोन की घंटी तुरंत सुनाई देगी।',
            illustrationType: 'volume_buttons',
          }
        ]
      },
      {
        id: 's1-l5',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'Lock and Unlock Screen',
        shortDesc: 'स्क्रीन लॉक खोलना और स्क्रीन को सुलाना',
        iconName: 'Lock',
        youtubeQuery: 'how to unlock phone screen hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'स्क्रीन लॉक क्यों होता है?',
            description: 'जेब या पर्स में फोन रखने पर गलती से किसी को कॉल न लग जाए, इसलिए फोन की स्क्रीन अपने आप सो (Lock हो) जाती है।',
            speechText: 'गलती से किसी को कॉल न लग जाए, इसलिए फोन की स्क्रीन लॉक हो जाती है। इसे खोलना बहुत आसान है।',
            illustrationType: 'lock_screen',
          },
          {
            stepNumber: 2,
            title: 'स्क्रीन को जगाना और स्वाइप करना',
            description: 'पावर बटन को बस एक बार हल्का सा दबाएं। स्क्रीन जल जाएगी। अब अपनी उंगली को स्क्रीन के नीचे से ऊपर की तरफ सरकाएं (Swipe Up)। फोन खुल जाएगा!',
            speechText: 'पावर बटन को एक बार दबाएं। स्क्रीन पर रोशनी आने पर अपनी उंगली को नीचे से ऊपर सरकाएं। फोन खुल जाएगा।',
            illustrationType: 'lock_screen',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: 'Calling & Contacts',
    subtitle: 'फ़ोन मिलाना, बात करना और नए नंबर सुरक्षित करना',
    icon: 'PhoneCall',
    badge: 'Core Skill',
    lessons: [
      {
        id: 's2-l1',
        stageId: 'stage-2',
        stageNumber: 2,
        title: 'How to Make a Phone Call',
        shortDesc: 'फोन कैसे लगाएं: नंबर डायल करना और कॉल काटना',
        iconName: 'Phone',
        youtubeQuery: 'how to make a call smartphone hindi',
        videoDuration: '5 min',
        steps: [
          {
            stepNumber: 1,
            title: 'फोन वाले हरे आइकन को ढूंढें',
            description: 'स्क्रीन पर एक हरे रंग का डिब्बा दिखेगा जिसमें पुराने टेलीफोन का रिसीवर बना होता है। यह आपका "Phone" ऐप है।',
            speechText: 'स्क्रीन पर हरे रंग का टेलीफोन वाला आइकन ढूंढें। इस पर हल्के से अपनी उंगली छुएं।',
            illustrationType: 'phone_app_icon',
          },
          {
            stepNumber: 2,
            title: 'डायल पैड और कॉन्टैक्ट्स (Contacts)',
            description: 'ऐप खुलते ही नीचे दो मुख्य चीजें दिखेंगी: "Keypad" (नंबर दबाने वाला) और "Contacts" (जिनके नंबर पहले से सेव हैं)।',
            speechText: 'नीचे कॉन्टैक्ट्स पर छुएंगे तो आपके परिवार के सभी नाम दिखेंगे। कीपैड पर छूने से नंबर दबाने वाले बटन खुलेंगे।',
            illustrationType: 'dial_pad',
          },
          {
            stepNumber: 3,
            title: 'नाम ढूंढकर कॉल लगाना',
            description: 'कॉन्टैक्ट्स में जाकर ऊपर खोज (Search) में नाम लिखें या सूची में उंगली ऊपर-नीचे करके नाम ढूंढें। नाम के आगे हरे फोन बटन को दबाएं।',
            speechText: 'जिस व्यक्ति से बात करनी है उनके नाम पर छुएं, फिर हरे रंग का कॉल बटन दबाएं। फोन की घंटी बजना शुरू हो जाएगी।',
            illustrationType: 'contacts_list',
          },
          {
            stepNumber: 4,
            title: 'कॉल जुड़ना और बात करना',
            description: 'जब सामने वाला फोन उठाएगा, तो स्क्रीन पर सेकंड की गिनती चलने लगेगी (00:01)। फोन को कान पर लगाएं और आराम से बात करें।',
            speechText: 'जब सामने वाला फोन उठा ले, तो स्क्रीन पर समय शुरू हो जाएगा। फोन को कान से लगाकर आराम से बात करें।',
            tip: 'अगर लाउडस्पीकर पर बात करनी है, तो स्क्रीन पर "Speaker" वाले निशान को छुएं।',
            illustrationType: 'calling_screen',
          },
          {
            stepNumber: 5,
            title: 'कॉल समाप्त करना (लाल बटन)',
            description: 'बात पूरी होने के बाद स्क्रीन पर लाल रंग के गोल फोन बटन को दबाएं। कॉल कट जाएगी।',
            speechText: 'बात पूरी होने के बाद लाल बटन को एक बार दबाएं। इससे फोन कट जाएगा।',
            illustrationType: 'end_call',
          }
        ]
      },
      {
        id: 's2-l2',
        stageId: 'stage-2',
        stageNumber: 2,
        title: 'How to Save a Phone Number',
        shortDesc: 'नया नंबर डायरी की जगह फोन में हमेशा के लिए सुरक्षित रखें',
        iconName: 'UserPlus',
        youtubeQuery: 'how to save phone number hindi',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: 'नया नंबर जोड़ें (+ या Create New)',
            description: 'कॉन्टैक्ट्स में सबसे ऊपर एक बड़ा प्लस (+) का निशान या "Create New Contact" लिखा होता है। उस पर छुएं।',
            speechText: 'कॉन्टैक्ट्स ऐप खोलकर प्लस के निशान को छुएं। इससे नया नंबर जोड़ने का पन्ना खुल जाएगा।',
            illustrationType: 'add_contact',
          },
          {
            stepNumber: 2,
            title: 'नाम और नंबर दर्ज करें',
            description: 'पहले खाने में व्यक्ति का नाम (जैसे: डॉ. मेहता) लिखें और नीचे वाले खाने में उनका 10 अंकों का मोबाइल नंबर डालें।',
            speechText: 'पहले खाने में नाम लिखें और नीचे मोबाइल नंबर डालें। आप परिवार के सदस्य की मदद से बोलकर भी नाम लिख सकते हैं।',
            illustrationType: 'add_contact',
          },
          {
            stepNumber: 3,
            title: 'सुरक्षित (Save) बटन दबाएं',
            description: 'ऊपर कोने में "Save" या टिक का निशान होगा। उसे दबाएं। नंबर अब आपके फोन में हमेशा के लिए सेव हो गया!',
            speechText: 'ऊपर सेव बटन दबाएं। अब यह नंबर कभी नहीं खोएगा।',
            illustrationType: 'add_contact',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'WhatsApp (व्हाट्सऐप)',
    subtitle: 'मैसेज, बोलकर संदेश भेजना, फोटो और वीडियो कॉल',
    icon: 'MessageCircle',
    badge: 'Most Popular',
    lessons: [
      {
        id: 's3-l1',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'Understanding WhatsApp & Chats',
        shortDesc: 'व्हाट्सऐप क्या है और संदेश कैसे खोलें',
        iconName: 'MessageSquare',
        youtubeQuery: 'whatsapp basics for beginners hindi',
        videoDuration: '5 min',
        steps: [
          {
            stepNumber: 1,
            title: 'व्हाट्सऐप का हरा आइकन',
            description: 'व्हाट्सऐप का निशान भी हरा होता है जिसमें अंदर सफेद फोन और चैट का गुब्बारा बना होता है। इस पर छुएं।',
            speechText: 'व्हाट्सऐप का हरा आइकन छुएं। यह अपनों से मुफ्त में संदेश और फोटो भेजने का सबसे आसान साधन है।',
            illustrationType: 'whatsapp_icon',
          },
          {
            stepNumber: 2,
            title: 'चैट (Chats) की सूची',
            description: 'सामने आपके बच्चों, रिश्तेदारों और मित्रों के नाम दिखेंगे। जिस किसी से बात करनी है, उनके नाम पर उंगली रखें।',
            speechText: 'स्क्रीन पर आपके सभी संपर्कों के नाम दिखेंगे। जिनसे बात करनी हो, उनके नाम पर एक बार छुएं। उनकी बातचीत खुल जाएगी।',
            illustrationType: 'whatsapp_chats_list',
          },
          {
            stepNumber: 3,
            title: 'मैसेज पढ़ना और लिखना',
            description: 'नीचे एक सफेद पट्टी होती है जिसमें लिखा होता है "Type a message". वहां छूने से कीबोर्ड ऊपर आ जाता है।',
            speechText: 'नीचे सफेद पट्टी पर छूने से लिखने वाला कीबोर्ड आ जाता है।',
            illustrationType: 'whatsapp_chat',
          }
        ]
      },
      {
        id: 's3-l2',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'Voice Message: बोलकर संदेश भेजें',
        shortDesc: 'टाइपिंग की ज़रूरत नहीं! माइक दबाकर सीधे अपनी आवाज़ भेजें',
        iconName: 'Mic',
        youtubeQuery: 'how to send voice message in whatsapp hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'माइक (Mic) का निशान पहचानें',
            description: 'स्क्रीन के सबसे नीचे दाएं कोने में एक छोटा हरा या भूरा माइक बना होता है। यह बुजुर्गों के लिए सबसे आसान तरीका है।',
            speechText: 'व्हाट्सऐप में नीचे दाएं कोने पर माइक का निशान है। इसमें आपको कुछ भी टाइप नहीं करना पड़ता।',
            illustrationType: 'voice_message',
          },
          {
            stepNumber: 2,
            title: 'माइक दबाकर रखें और बोलें',
            description: 'उस माइक को अपनी उंगली से दबाए रखें और जो कहना चाहते हैं, आराम से बोलें (जैसे: "बेटा, घर कब आओगे?")।',
            speechText: 'माइक के बटन को दबाए रखें और अपना संदेश बोलें। जैसे ही उंगली उठाएंगे, संदेश तुरंत चला जाएगा।',
            tip: 'अगर बोलते समय गलती हो जाए, तो उंगली को बाएं (Left) की तरफ सरका दें, संदेश रद्द हो जाएगा।',
            illustrationType: 'voice_message_record',
          }
        ]
      },
      {
        id: 's3-l3',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'Keyboard Language (हिंदी/मराठी कीबोर्ड)',
        shortDesc: 'अंग्रेजी की जगह अपनी मातृभाषा में टाइप करना सीखें',
        iconName: 'Languages',
        youtubeQuery: 'how to type in hindi in mobile keyboard',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: 'कीबोर्ड पर सेटिंग (Gear Settings) का निशान',
            description: 'जब कीबोर्ड खुलता है, तो उसके ऊपर एक छोटा पहिया (Settings) बना होता है। उस पर छुएं।',
            speechText: 'कीबोर्ड के ऊपर सेटिंग का पहिया बना है। उस पर छुएं।',
            illustrationType: 'keyboard_lang',
          },
          {
            stepNumber: 2,
            title: 'Languages -> Add Language',
            description: '"Languages" (भाषाएं) चुनें, फिर "Add Language" पर जाकर हिंदी या मराठी चुन लें। अब स्पेस बार (Space Bar) को दबाकर रखने से आप कभी भी भाषा बदल सकते हैं!',
            speechText: 'भाषाओं में जाकर हिंदी या मराठी जोड़ लें। अब आप आसानी से अपनी भाषा में संदेश लिख सकते हैं।',
            illustrationType: 'keyboard_add_lang',
          }
        ]
      },
      {
        id: 's3-l4',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'WhatsApp Video Call (चेहरा देखकर बात)',
        shortDesc: 'दूर रहने वाले बच्चों और नाती-पोतों से आमने-सामने बातें',
        iconName: 'Video',
        youtubeQuery: 'how to do whatsapp video call hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'वीडियो कैमरा आइकन',
            description: 'चैट में सबसे ऊपर दाएं कोने में एक छोटा वीडियो कैमरा  बना होता है। उस पर छुएं।',
            speechText: 'चैट में सबसे ऊपर वीडियो कैमरा का निशान है। उस पर छूने से वीडियो कॉल शुरू हो जाती है।',
            illustrationType: 'video_call',
          },
          {
            stepNumber: 2,
            title: 'कॉल में सामने देखना',
            description: 'फोन को थोड़ा चेहरे के सामने सीधा रखें। नीचे आपका खुद का चेहरा दिखेगा और बड़ी स्क्रीन पर सामने वाले का चेहरा दिखेगा।',
            speechText: 'फोन को चेहरे के सामने रखें ताकि सामने वाले को आपका चेहरा साफ दिखे। बात पूरी होने पर लाल बटन दबाकर कॉल काटें।',
            illustrationType: 'video_call_active',
          }
        ]
      },
      {
        id: 's3-l5',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'WhatsApp Status with Music (गाना लगाकर स्टेटस लगाना)',
        shortDesc: 'अपने मनपसंद फोटो के साथ सुंदर भजन या गाना लगाकर 24 घंटे का स्टेटस लगाएं',
        iconName: 'Sparkles',
        youtubeQuery: 'whatsapp status photo par song music kaise lagaye hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'Updates / Status टैब पर छुएं',
            description: 'व्हाट्सऐप खोलते ही ऊपर या नीचे "Updates" (या Status) लिखा होता है। उस पर छुएं।',
            speechText: 'व्हाट्सऐप में अपडेट्स या स्टेटस टैब पर छुएं। यहां आप अपना स्टेटस लगा सकते हैं।',
            illustrationType: 'whatsapp_status_tab',
          },
          {
            stepNumber: 2,
            title: 'कैमरा या "+" पर छूकर सुंदर फोटो चुनें',
            description: '"My Status" के पास बने कैमरे या प्लस (+) पर छुएं और अपनी गैलरी में से फूलों, परिवार या मंदिर का फोटो चुनें।',
            speechText: 'प्लस के निशान पर छूकर गैलरी से अपनी पसंद का फोटो चुनें।',
            illustrationType: 'whatsapp_status_photo',
          },
          {
            stepNumber: 3,
            title: 'ऊपर संगीत (Music) आइकन पर छुएं',
            description: 'फोटो चुनते ही स्क्रीन पर सबसे ऊपर एक छोटा संगीत का निशान दिखेगा। उस पर छूकर अपना पसंदीदा भजन या गाना खोजें और जोड़ें।',
            speechText: 'ऊपर दिए गए संगीत के निशान पर छुएं और अपना पसंदीदा भजन या गाना जोड़ें।',
            illustrationType: 'whatsapp_status_music_search',
          },
          {
            stepNumber: 4,
            title: 'हरा तीर (Send) दबाकर स्टेटस लगाएं',
            description: 'नीचे दिए गए हरे तीर (Send) पर छुएं। आपका संगीत वाला स्टेटस 24 घंटे के लिए सभी दोस्तों और रिश्तेदारों को दिखेगा!',
            speechText: 'हरा तीर दबाकर स्टेटस शेयर करें। यह चौबीस घंटे तक आपके संपर्कों को दिखेगा।',
            tip: 'सुरक्षा नियम: स्टेटस सिर्फ उन्हीं लोगों को दिखता है जिनका नंबर आपके फोन में सुरक्षित है।',
            illustrationType: 'whatsapp_status_send',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'UPI Digital Payments',
    subtitle: 'दुकान पर QR कोड स्कैन करना, रकम जोड़ना और सुरक्षित पेमेंट',
    icon: 'QrCode',
    badge: 'Financial Safety',
    lessons: [
      {
        id: 's4-l1',
        stageId: 'stage-4',
        stageNumber: 4,
        title: 'QR Code Scanning, Amount & Bank SMS',
        shortDesc: 'स्कैनर आइकन की पहचान, QR स्कैन करना, रकम जोड़ना और असली बैंक SMS की पहचान',
        iconName: 'ShieldCheck',
        youtubeQuery: 'how to scan qr code and pay upi safely hindi seniors',
        videoDuration: '5 min',
        steps: [
          {
            stepNumber: 1,
            title: '1. स्कैनर आइकन की पहचान और स्कैन कैसे करें (Scanner Icon Explained)',
            description: 'अपने UPI ऐप (जैसे PhonePe, GPay, Paytm या Digital Sathi) में सबसे ऊपर बने चौकोर कोष्ठक [·] वाले कैमरे के निशान को पहचानें। इसे "Scan QR" या "स्कैनर आइकन" कहते हैं। इसे छूने से कैमरा खुलता है। फोन को दुकानदार के स्टैंड के सामने 6 से 10 इंच दूर रखें ताकि पूरा QR कोड चौकोर डिब्बे में आ जाए।',
            speechText: 'यह स्कैनर आइकन है। इसे छूने से कैमरा खुलता है। कैमरे को दुकानदार के क्यूआर कोड के सामने सीधा रखें ताकि वह आसानी से स्कैन हो जाए।',
            tip: 'हाथ स्थिर रखें, फोन अपने आप कोड पढ़ लेगा।',
            illustrationType: 'upi_scanner_icon',
          },
          {
            stepNumber: 2,
            title: '2. दुकानदार का नाम जांचें और रकम जोड़ें (Add Amount)',
            description: 'स्कैन होते ही स्क्रीन पर दुकानदार का नाम (जैसे: शर्मा जी सब्जी भंडार) दिखेगा। फिर "Add Amount" (रकम जोड़ें) पर छुएं और जितने रुपये देने हैं, उतना नंबर भरें (जैसे: ₹50)। हमेशा दुकानदार से पूछें कि क्या स्क्रीन पर दिख रहा नाम उन्हीं का है।',
            speechText: 'स्कैन होने के बाद दुकानदार का नाम देखें। फिर जितने रुपये देने हैं, वह रकम भरें जैसे पचास रुपये।',
            tip: 'हमेशा भुगतान करने से पहले दुकानदार से नाम जरूर मिला लें।',
            illustrationType: 'upi_amount',
          },
          {
            stepNumber: 3,
            title: '3. गुप्त UPI PIN डालें और पेमेंट पूरी करें',
            description: 'रकम भरने के बाद "Proceed to Pay" दबाएं और अपना 4 या 6 अंकों का UPI PIN डालें। PIN डालते ही स्क्रीन पर बड़ा हरा टिक आ जाएगा और पैसे सुरक्षित पहुंच जाएंगे।',
            speechText: 'पैसे भेजने के लिए अपना गुप्त यूपीआई पिन डालें। याद रखें, पैसे पाने के लिए कभी पिन नहीं डालना पड़ता।',
            warning: 'अपना UPI PIN कभी किसी दुकानदार या अनजान फोन कॉल पर न बताएं।',
            illustrationType: 'upi_pin_safe',
          },
          {
            stepNumber: 4,
            title: '4. स्क्रीन पर बैंक मैसेज पॉप-अप कैसे आता है (Bank Alert Pop-up)',
            description: 'पेमेंट सफल होने के कुछ ही सेकंडों में आपके फोन की स्क्रीन पर ऊपर से बैंक का SMS अलर्ट पॉप-अप आता है। इसमें आपके खाते से कटी रकम और बचा हुआ बैलेंस लिखा होता है।',
            speechText: 'पेमेंट पूरा होते ही आपके फोन पर बैंक का संदेश पॉप अप होगा, जिसमें कटी हुई रकम और बचा हुआ बैंक बैलेंस लिखा होता है।',
            tip: 'इस मैसेज को देखकर आप तुरंत जान सकते हैं कि बैंक से कितने पैसे कटे हैं।',
            illustrationType: 'upi_bank_sms_popup',
          },
          {
            stepNumber: 5,
            title: '5. असली बनाम फर्जी बैंक मैसेज की पहचान (Real vs Fake Bank SMS)',
            description: 'धोखेबाज फर्जी मैसेज भेजकर फंसाते हैं। असली बैंक मैसेज हमेशा 6 अक्षरों के बैंक कोड (जैसे VK-HDFCBK) से आता है, इसमें कटी रकम और सही बैलेंस होता है, और कोई लिंक नहीं होता। फर्जी मैसेज साधारण 10 अंकों के मोबाइल नंबर से आता है और पैसे पाने के लिए लिंक दबाने या PIN डालने को कहता है।',
            speechText: 'सावधान रहें: असली बैंक मैसेज बैंक कोड से आता है और उसमें कोई लिंक नहीं होता। फर्जी मैसेज साधारण मोबाइल नंबर से आता है और पैसे पाने के लिए लिंक दबाने या पिन मांगने का लालच देता है।',
            warning: 'स्वर्ण नियम: पैसे प्राप्त करने के लिए कभी भी UPI PIN नहीं डालना पड़ता!',
            illustrationType: 'upi_fake_vs_real_sms',
          }
        ]
      },
      {
        id: 's4-l2',
        stageId: 'stage-4',
        stageNumber: 4,
        title: 'Entering Amount & The Golden PIN Rule',
        shortDesc: 'पैसे भरना और UPI PIN की सुरक्षा - सबसे जरूरी सबक!',
        iconName: 'CreditCard',
        youtubeQuery: 'how to pay upi safely never share pin hindi',
        videoDuration: '5 min',
        steps: [
          {
            stepNumber: 1,
            title: 'दुकानदार का नाम और रकम जांचना',
            description: 'स्कैन होते ही स्क्रीन पर दुकानदार का असली नाम आ जाएगा। दुकानदार से पूछें "क्या आपका नाम यही है?" फिर जितने रुपये देने हैं, उतना नंबर भरें (जैसे: 150)।',
            speechText: 'स्कैन होने के बाद स्क्रीन पर दुकानदार का नाम जरूर जांचें। फिर सही रकम लिखकर आगे बढ़ें।',
            illustrationType: 'upi_amount',
          },
          {
            stepNumber: 2,
            title: 'स्वर्ण नियम: UPI PIN सिर्फ पैसे कटने पर ही डलता है',
            description: 'पैसे प्राप्त (Receive) करने के लिए कभी भी UPI PIN की जरूरत नहीं होती! PIN सिर्फ तब डाला जाता है जब आपके बैंक से पैसे जा रहे हों।',
            speechText: 'याद रखें, पैसे पाने के लिए कभी पिन नहीं डालना पड़ता। अगर कोई कहे कि लॉटरी पाने के लिए पिन डालो, तो वह धोखेबाज है!',
            warning: 'अपना 4 या 6 अंकों का गुप्त UPI PIN किसी को भी न बताएं, न ही किसी कागज पर लिखकर फोन के कवर में रखें।',
            illustrationType: 'upi_pin_safe',
          },
          {
            stepNumber: 3,
            title: 'हरा टिक और बैंक SMS',
            description: 'पिन डालने के बाद स्क्रीन पर बड़ा हरा टिक दिखेगा और मधुर घंटी बजेगी। इसका मतलब पैसे सफलतापूर्वक चले गए हैं। आपके बैंक से SMS भी आ जाएगा।',
            speechText: 'हरा टिक दिखने का मतलब है पेमेंट पूरी हो गई है। आप दुकानदार को यह स्क्रीन दिखा सकते हैं।',
            illustrationType: 'upi_success',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    title: 'Scam Alert & Digital Safety',
    subtitle: 'ऑनलाइन धोखाधड़ी, फर्जी फोन कॉल और OTP की सुरक्षा',
    icon: 'ShieldAlert',
    badge: 'Crucial',
    lessons: [
      {
        id: 's5-l1',
        stageId: 'stage-5',
        stageNumber: 5,
        title: 'Never Share OTP & Passwords',
        shortDesc: 'बैंक कभी फोन पर गुप्त कोड नहीं मांगता',
        iconName: 'KeyRound',
        youtubeQuery: 'cyber safety for senior citizens hindi otp fraud',
        videoDuration: '6 min',
        steps: [
          {
            stepNumber: 1,
            title: 'OTP क्या है? आपकी डिजिटल चाबी',
            description: 'जब कोई पैसे का लेन-देन होता है, तो बैंक आपके फोन पर 4 या 6 अंकों का एक संदेश भेजता है। इसे OTP कहते हैं। यह आपके घर की तिजोरी की चाबी जैसा है।',
            speechText: 'ओटीपी आपके बैंक खाते की चाबी है। इसे किसी भी अजनबी को फोन पर नहीं बताना चाहिए।',
            illustrationType: 'scam_otp',
          },
          {
            stepNumber: 2,
            title: 'फर्जी बैंक कॉल को कैसे पहचानें?',
            description: 'अगर कोई फोन करके कहे: "हम आपके बैंक से बोल रहे हैं, आपका खाता बंद हो जाएगा, तुरंत OTP बताएं" - तो तुरंत फोन काट दें! असली बैंक कभी फोन पर OTP नहीं मांगता।',
            speechText: 'अगर कोई खुद को बैंक मैनेजर बताकर आपसे ओटीपी या पासवर्ड मांगे, तो तुरंत फोन काट दें और किसी पर विश्वास न करें।',
            warning: 'कभी भी किसी अजनबी के कहने पर AnyDesk, TeamViewer या कोई अनजान ऐप फोन में डाउनलोड न करें।',
            illustrationType: 'scam_fake_call',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-6',
    stageNumber: 6,
    title: 'YouTube (यूट्यूब)',
    subtitle: 'भजन, समाचार, पुरानी फिल्में और बोलकर खोजना',
    icon: 'PlaySquare',
    badge: 'Entertainment',
    lessons: [
      {
        id: 's6-l1',
        stageId: 'stage-6',
        stageNumber: 6,
        title: 'Voice Search on YouTube',
        shortDesc: 'बोलकर पसंदीदा भजन या समाचार चलाना',
        iconName: 'Search',
        youtubeQuery: 'how to search on youtube using voice hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'सर्च बार और माइक',
            description: 'यूट्यूब खोलते ही ऊपर एक लेंस (Search) और उसके बगल में माइक का निशान होता है। माइक पर अपनी उंगली छुएं।',
            speechText: 'यूट्यूब में ऊपर माइक का निशान दबाएं और जो भी सुनना चाहते हैं, साफ आवाज़ में बोलें।',
            illustrationType: 'youtube_search',
          },
          {
            stepNumber: 2,
            title: 'बोलें: "पुराने भजन" या "आज की मुख्य खबरें"',
            description: 'माइक पर छूते ही बीप की आवाज़ आएगी। अब बोलें "लता मंगेशकर के गाने" या "हनुमान चालीसा"। वीडियो की सूची तुरंत सामने आ जाएगी।',
            speechText: 'माइक दबाकर बोलें जैसे "सुबह के भजन"। वीडियो की लिस्ट आ जाएगी, किसी भी फोटो पर छूकर गाना सुन सकते हैं।',
            illustrationType: 'youtube_player',
          }
        ]
      },
      {
        id: 's6-l2',
        stageId: 'stage-6',
        stageNumber: 6,
        title: 'Subscribe, Shorts & Like (चैनल सब्सक्राइब और शॉर्ट्स)',
        shortDesc: 'पसंदीदा चैनल के सदस्य बनें, छोटे वीडियो देखें और लाइक करें',
        iconName: 'Play',
        youtubeQuery: 'how to subscribe channel and watch shorts on youtube hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'लाल Subscribe बटन दबाएं और घंटी  बजाएं',
            description: 'वीडियो के नीचे लाल रंग का "Subscribe" बटन होता है। इसे छूने से उस चैनल के नए वीडियो आपको सबसे पहले दिखते हैं। बगल में घंटी () पर छूकर All चुनें।',
            speechText: 'पसंदीदा चैनल का लाल सब्सक्राइब बटन दबाएं और घंटी बजाएं।',
            illustrationType: 'youtube_subscribe',
          },
          {
            stepNumber: 2,
            title: 'Shorts टैब: छोटे वीडियो देखना',
            description: 'यूट्यूब में नीचे "Shorts" पर छुएं और उंगली से स्क्रीन ऊपर सरकाकर (Swipe Up) एक के बाद एक छोटे मजेदार वीडियो देखें।',
            speechText: 'नीचे शॉर्ट्स पर छुएं और स्क्रीन ऊपर सरकाकर छोटे वीडियो का आनंद लें।',
            illustrationType: 'youtube_player',
          },
          {
            stepNumber: 3,
            title: 'अंगूठा (Like) दबाएं',
            description: 'वीडियो अच्छा लगे तो अंगूठे के निशान (Like) पर छुएं। यह वीडियो आपकी पसंद सूची में सेव हो जाएगा।',
            speechText: 'वीडियो पसंद आने पर लाइक के अंगूठे को छुएं।',
            illustrationType: 'youtube_player',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-7',
    stageNumber: 7,
    title: 'Instagram (इन्स्टाग्राम)',
    subtitle: 'साइन-इन, प्रोफाइल, परिवार को जोड़ना, रील्स देखना और नई पोस्ट करना',
    icon: 'Sparkles',
    badge: 'Social Media',
    lessons: [
      {
        id: 's7-l1',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'Instagram Sign In (इन्स्टाग्राम साइन-इन)',
        shortDesc: 'ऐप खोलकर मोबाइल नंबर या यूजरनेम से सुरक्षित लॉगिन करें',
        iconName: 'User',
        youtubeQuery: 'how to login instagram account senior hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'इन्स्टाग्राम का रंगीन कैमरा आइकन खोलें',
            description: 'गुलाबी, बैंगनी और पीले रंग का कैमरा आइकन इन्स्टाग्राम का होता है। उस पर छुएं।',
            speechText: 'इन्स्टाग्राम का रंगीन आइकन दबाएं। ऐप खुल जाएगा।',
            illustrationType: 'instagram_signin',
          },
          {
            stepNumber: 2,
            title: 'लॉगिन जानकारी भरें (Sign In)',
            description: 'अपना मोबाइल नंबर और पासवर्ड डालकर "Log In" बटन दबाएं। खाता सुरक्षित रूप से खुल जाएगा।',
            speechText: 'अपना नंबर और पासवर्ड डालकर लॉगिन करें।',
            illustrationType: 'instagram_signin',
          }
        ]
      },
      {
        id: 's7-l2',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'Open Profile & Bio (अपनी प्रोफाइल खोलना)',
        shortDesc: 'खुद की फोटो, नाम और साझा की गई यादें देखने के लिए प्रोफाइल टैब खोलें',
        iconName: 'UserCheck',
        youtubeQuery: 'how to check instagram profile hindi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'नीचे दाएं कोने में अपनी फोटो पर छुएं',
            description: 'स्क्रीन में सबसे नीचे दाएं कोने में आपकी अपनी छोटी गोल फोटो या व्यक्ति का निशान होता है। उस पर छुएं।',
            speechText: 'नीचे दाएं कोने में अपनी फोटो पर छुएं। आपकी प्रोफाइल खुल जाएगी।',
            illustrationType: 'instagram_profile',
          },
          {
            stepNumber: 2,
            title: 'अपना नाम, बायो और पोस्ट देखें',
            description: 'यहां आपका नाम, प्रोफाइल फोटो और आपके द्वारा डाले गए सभी फोटो एक साथ दिखेंगे।',
            speechText: 'यहां आपका नाम और आपके पोस्ट किए गए फोटो दिखाई देंगे।',
            illustrationType: 'instagram_profile',
          }
        ]
      },
      {
        id: 's7-l3',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'Add Contact Members & Follow (परिवार को जोड़ें और फॉलो करें)',
        shortDesc: 'सर्च करके बच्चों और नाती-पोतों को ढूंढें और फॉलो करें',
        iconName: 'Users',
        youtubeQuery: 'how to follow friends on instagram hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'सर्च (लेंस ) पर छुएं',
            description: 'नीचे बने लेंस (Search) पर छुएं और ऊपर सर्च बार में अपने बेटे या बेटी का नाम लिखें।',
            speechText: 'सर्च पर छुएं और अपने रिश्तेदार का नाम खोजें।',
            illustrationType: 'instagram_contacts',
          },
          {
            stepNumber: 2,
            title: 'नीला "Follow" बटन दबाएं',
            description: 'रिश्तेदार के नाम के सामने नीले "Follow" बटन को दबाएं। अब उनके नए फोटो और वीडियो आपके होम पर दिखेंगे।',
            speechText: 'नीला फॉलो बटन दबाएं। अब उनके फोटो आपके फोन पर दिखेंगे।',
            illustrationType: 'instagram_contacts',
          }
        ]
      },
      {
        id: 's7-l4',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'How to Watch Reels (रील्स देखना और पसंद करना)',
        shortDesc: 'रील्स पर छुएं, ऊपर स्वाइप करें और लाइक बटन दबाएं',
        iconName: 'Play',
        youtubeQuery: 'how to watch instagram reels hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'नीचे Reels आइकन पर छुएं',
            description: 'स्क्रीन के बीच में नीचे वीडियो प्ले के निशान जैसा Reels आइकन होता है। उस पर छुएं।',
            speechText: 'नीचे रील्स के निशान पर छुएं। सुंदर वीडियो शुरू हो जाएंगे।',
            illustrationType: 'instagram_reels',
          },
          {
            stepNumber: 2,
            title: 'अगला वीडियो देखने के लिए ऊपर स्वाइप करें (Swipe Up)',
            description: 'उंगली से स्क्रीन को नीचे से ऊपर की तरफ सरकाएं। अगला वीडियो आ जाएगा। पसंद आने पर लाइक (Like) बटन पर छुएं।',
            speechText: 'स्क्रीन को ऊपर सरकाकर नया वीडियो देखें और दिल के निशान पर छूकर लाइक करें।',
            illustrationType: 'instagram_reels',
          }
        ]
      },
      {
        id: 's7-l5',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'Accept Follow Requests & Privacy (रिक्वेस्ट स्वीकार करना)',
        shortDesc: 'प्राइवेट खाते में सिर्फ परिचित लोगों की रिक्वेस्ट कन्फर्म करें',
        iconName: 'ShieldCheck',
        youtubeQuery: 'how to accept instagram follow request hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'घंटी या दिल (Notifications) पर छुएं',
            description: 'ऊपर दिल या घंटी पर लाल बिंदु दिखे तो उस पर छुएं। नई आई हुई रिक्वेस्ट दिखेगी।',
            speechText: 'नोटिफिकेशन पर छुएं। नए आए फॉलोअर की रिक्वेस्ट दिखेगी।',
            illustrationType: 'instagram_requests',
          },
          {
            stepNumber: 2,
            title: 'परिचित होने पर "Confirm" दबाएं',
            description: 'अगर नाम आपके परिवार या दोस्त का है तो "Confirm" दबाएं। अनजान व्यक्ति हो तो "Delete" दबाएं।',
            speechText: 'पहचान वाले होने पर कन्फर्म दबाएं, अनजान होने पर डिलीट कर दें।',
            tip: 'सुरक्षा नियम: अनजान लोगों को अपने फोटो न देखने दें।',
            illustrationType: 'instagram_requests',
          }
        ]
      },
      {
        id: 's7-l6',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'How to Post Something (नया फोटो पोस्ट करना)',
        shortDesc: 'गैलरी से फोटो चुनें, अच्छा संदेश लिखें और शेयर करें',
        iconName: 'PlusSquare',
        youtubeQuery: 'how to post photo on instagram hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'बीच में बने "+" पर छुएं',
            description: 'स्क्रीन के नीचे या ऊपर बने प्लस (+) निशान पर छुएं। आपकी फोटो गैलरी खुल जाएगी।',
            speechText: 'प्लस के निशान पर छुएं। गैलरी खुल जाएगी।',
            illustrationType: 'instagram_post',
          },
          {
            stepNumber: 2,
            title: 'फोटो चुनें और Next दबाएं',
            description: 'अपने परिवार या मंदिर का अच्छा फोटो चुनें और ऊपर नीला तीर (Next) दबाएं।',
            speechText: 'अपनी पसंद का फोटो चुनकर नेक्स्ट दबाएं।',
            illustrationType: 'instagram_post',
          },
          {
            stepNumber: 3,
            title: 'संदेश लिखें (Caption) और Share दबाएं',
            description: '"Write a caption" में "शुभ प्रभात" या "हमारा परिवार" लिखें और ऊपर नीला "Share" बटन दबाएं। फोटो पोस्ट हो जाएगा!',
            speechText: 'संदेश लिखकर शेयर बटन दबाएं। आपकी फोटो पोस्ट हो गई है।',
            illustrationType: 'instagram_post',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-8',
    stageNumber: 8,
    title: 'Daily Useful Tools & Emergency',
    subtitle: 'टॉर्च, अलार्म, कैलकुलेटर और आपातकालीन कॉल (SOS)',
    icon: 'Wrench',
    badge: 'Practical',
    lessons: [
      {
        id: 's8-l1',
        stageId: 'stage-8',
        stageNumber: 8,
        title: 'Flashlight (टॉर्च) & Brightness',
        shortDesc: 'रात में अंधेरा होने पर फोन की टॉर्च कैसे जलाएं',
        iconName: 'Flashlight',
        youtubeQuery: 'how to turn on flashlight in smartphone hindi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'ऊपर से पर्दा नीचे खींचें (Quick Settings)',
            description: 'स्क्रीन के सबसे ऊपर किनारे से अपनी उंगली को नीचे की तरफ खींचें। एक नियंत्रण पर्दा खुल जाएगा जिसमें टॉर्च, वाई-फाई और ब्राइटनेस के बटन होते हैं।',
            speechText: 'स्क्रीन के ऊपर से उंगली नीचे खींचने पर टॉर्च का बटन दिखेगा। टॉर्च पर छूते ही फोन की बत्ती जल जाएगी।',
            illustrationType: 'flashlight',
          }
        ]
      },
      {
        id: 's8-l2',
        stageId: 'stage-8',
        stageNumber: 8,
        title: 'Emergency Calling (112 SOS)',
        shortDesc: 'आपातकाल में बिना फोन अनलॉक किए तुरंत मदद मांगना',
        iconName: 'AlertCircle',
        youtubeQuery: 'how to make emergency call 112 hindi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'राष्ट्रीय आपातकालीन नंबर 112',
            description: 'अगर कोई आपातकालीन स्थिति, मेडिकल जरूरत या संकट हो, तो 112 डायल करें। यह पूरे देश में मुफ्त है और बिना बैलेंस या सिम लॉक के भी लगता है।',
            speechText: 'किसी भी आपातकाल में 112 पर फोन लगाएं। यह पुलिस, एम्बुलेंस और डॉक्टर की मदद के लिए 24 घंटे उपलब्ध है।',
            illustrationType: 'emergency_call',
          }
        ]
      }
    ]
  }
];

export const practiceTasks: PracticeTask[] = [
  {
    id: 'practice-power-charging',
    title: 'फोन चालू करें, चार्ज करें व लॉक खोलें (Power, Charging & Unlock)',
    instruction: '1. पावर बटन को 3 सेकंड दबाएं -> 2. चार्जर की पिन लगाएं -> 3. स्क्रीन स्वाइप करके लॉक खोलें।',
    speechText: 'फोन चालू करने, चार्जिंग और लॉक खोलने का अभ्यास करें। पहले पावर बटन को दबाएं।',
    targetApp: 'settings',
    stageNumber: 1,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'दाहिनी तरफ पावर बटन को 3 सेकंड दबाकर फोन चालू करें',
      'फोन के नीचे चार्जर की पिन लगाकर बिजली ऑन करें',
      'स्क्रीन पर नीचे से ऊपर स्वाइप करके लॉक खोलें'
    ]
  },
  {
    id: 'practice-call',
    title: 'रवि को फोन लगाएं (Make a Phone Call)',
    instruction: '1. हरे फोन आइकन पर छुएं -> 2. Contacts पर छुएं -> 3. "रवि (Ravi)" पर छुएं -> 4. हरे कॉल बटन को दबाएं।',
    speechText: 'रवि को फोन लगाने का अभ्यास करें। पहले हरे फोन आइकन को छुएं।',
    targetApp: 'phone',
    stageNumber: 2,
    initialStep: 1,
    totalSteps: 4,
    stepsGuide: [
      'स्क्रीन पर हरे फोन आइकन को छुएं',
      'नीचे Contacts (संपर्क) पर छुएं',
      'सूची में रवि (Ravi) के नाम पर छुएं',
      'हरे कॉल बटन को दबाकर घंटी बजाएं'
    ]
  },
  {
    id: 'practice-incoming-call',
    title: 'आती हुई फोन कॉल उठाएं (Answer Incoming Call)',
    instruction: '1. जब फोन की घंटी बजे -> 2. हरे फोन बटन को ऊपर सरकाएं -> 3. बात करें -> 4. लाल बटन से कॉल काटें।',
    speechText: 'आती हुई कॉल उठाने का अभ्यास करें। हरे बटन को ऊपर की तरफ सरकाएं।',
    targetApp: 'incoming_call',
    stageNumber: 2,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'घंटी बजने पर हरे बटन को ऊपर सरकाएं',
      'बातचीत का आनंद लें',
      'बात पूरी होने पर लाल बटन दबाएं'
    ]
  },
  {
    id: 'practice-whatsapp-msg',
    title: 'व्हाट्सऐप पर मैसेज भेजें (Send WhatsApp Text)',
    instruction: '1. WhatsApp आइकन छुएं -> 2. बेटी नेहा (Neha) की चैट खोलें -> 3. मैसेज पट्टी पर छुएं -> 4. Send बटन दबाएं।',
    speechText: 'व्हाट्सऐप पर मैसेज भेजने का अभ्यास करें। पहले व्हाट्सऐप का हरा आइकन छुएं।',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 4,
    stepsGuide: [
      'व्हाट्सऐप का हरा आइकन छुएं',
      'नेहा (बेटी) के नाम पर छुएं',
      'मैसेज "नमस्ते बेटी" पर छुएं',
      'हरे तीर (Send) बटन पर छुएं'
    ]
  },
  {
    id: 'practice-whatsapp-voice',
    title: 'व्हाट्सऐप पर वॉइस मैसेज भेजें (Send Voice Note)',
    instruction: '1. WhatsApp खोलें -> 2. चैट खोलें -> 3. माइक आइकन को 2 सेकंड दबाकर रखें -> 4. छोड़ दें।',
    speechText: 'व्हाट्सऐप पर बोलकर संदेश भेजने का अभ्यास करें। माइक बटन को दबाकर रखें।',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'व्हाट्सऐप खोलें',
      'चैट में नीचे माइक के निशान को दबाएं',
      'संदेश जाने के लिए माइक छोड़ें'
    ]
  },
  {
    id: 'practice-whatsapp-status',
    title: 'संगीत के साथ व्हाट्सऐप स्टेटस लगाएं (Upload Status with Music)',
    instruction: '1. WhatsApp खोलें -> 2. Status/Updates टैब पर छुएं -> 3. My Status (+) पर छुएं -> 4. संगीत जोड़ें -> 5. Send दबाएं।',
    speechText: 'संगीत के साथ व्हाट्सऐप स्टेटस लगाने का अभ्यास करें। पहले व्हाट्सऐप खोलें।',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 5,
    stepsGuide: [
      'व्हाट्सऐप खोलें',
      'Updates (स्टेटस) टैब पर छुएं',
      'My Status (+) पर छूकर फोटो चुनें',
      'ऊपर संगीत (Music) आइकन पर छूकर गाना चुनें',
      'हरे तीर (Send) पर छूकर स्टेटस लगाएं'
    ]
  },
  {
    id: 'practice-upi-pay',
    title: 'QR स्कैन, रकम जोड़ें और बैंक SMS पहचानें (Scan QR & Add Amount)',
    instruction: '1. स्कैनर आइकन छुएं -> 2. QR स्कैन करें -> 3. ₹50 रकम जोड़ें -> 4. UPI PIN डालें -> 5. बैंक SMS पॉप-अप देखें और असली vs फर्जी पहचानें।',
    speechText: 'दुकान पर QR स्कैन करके पेमेंट करने का अभ्यास करें। पहले स्कैनर आइकन को पहचानें और छुएं।',
    targetApp: 'upi',
    stageNumber: 4,
    initialStep: 1,
    totalSteps: 5,
    stepsGuide: [
      'UPI ऐप में स्कैनर आइकन [·] (Scan QR) पर छुएं',
      'कैमरे को दुकानदार के QR कोड के सामने रखकर स्कैन करें',
      'दुकानदार का नाम देखकर ₹50 रकम जोड़ें (Add Amount)',
      'गोपनीय UPI PIN डालकर सुरक्षित Pay करें',
      'बैंक मैसेज पॉप-अप देखें और असली बनाम फर्जी SMS की पहचान करें'
    ]
  },
  {
    id: 'practice-emergency-call',
    title: 'आपातकालीन सेवा 112 कॉल (Emergency SOS Call)',
    instruction: '1. लॉक स्क्रीन पर SOS/Emergency पर छुएं -> 2. 112 नंबर पर कॉल लगाएं -> 3. अपनी जगह व परेशानी बताएं।',
    speechText: 'आपातकालीन स्थिति में 112 डायल करने का अभ्यास करें।',
    targetApp: 'emergency',
    stageNumber: 5,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'फोन पर 112 आपातकालीन बटन पर छुएं',
      'पुलिस या एम्बुलेंस सहायता के लिए कॉल लगाएं',
      'शांत रहकर अपनी लोकेशन व समस्या बताएं'
    ]
  },
  {
    id: 'practice-youtube-voice',
    title: 'यूट्यूब पर बोलकर भजन ढूंढें (YouTube Voice Search)',
    instruction: '1. YouTube खोलें -> 2. सर्च माइक दबाएं -> 3. "हनुमान चालीसा" चुनें -> 4. प्ले बटन दबाएं।',
    speechText: 'यूट्यूब पर बोलकर भजन खोजने का अभ्यास करें। ऊपर माइक के बटन पर छुएं।',
    targetApp: 'youtube',
    stageNumber: 6,
    initialStep: 1,
    totalSteps: 4,
    stepsGuide: [
      'YouTube ऐप खोलें',
      'सर्च बार के बगल में माइक पर छुएं',
      '"हनुमान चालीसा" वाले विकल्प पर छुएं',
      'वीडियो पर छूकर आनंद लें'
    ]
  },
  {
    id: 'practice-instagram',
    title: 'इन्स्टाग्राम: साइन-इन, प्रोफाइल, रील्स व पोस्ट (Instagram Guide)',
    instruction: '1. Instagram खोलें व Sign In करें -> 2. प्रोफाइल देखें -> 3. नाती/परिवार को Follow करें -> 4. Reels देखकर लाइक करें -> 5. नई पोस्ट शेयर करें।',
    speechText: 'इन्स्टाग्राम इस्तेमाल करने का अभ्यास करें। पहले इन्स्टाग्राम ऐप पर छुएं।',
    targetApp: 'instagram',
    stageNumber: 7,
    initialStep: 1,
    totalSteps: 5,
    stepsGuide: [
      'इन्स्टाग्राम खोलें और सुरक्षित Sign In करें',
      'प्रोफाइल (Profile) पर छूकर अपनी फोटो और बायो देखें',
      'Search पर जाकर परिवार के सदस्य को Follow करें',
      'Reels पर जाकर वीडियो देखें और लाइक (Like) दबाएं',
      'प्लस (+) पर छूकर नई फोटो और शुभ संदेश पोस्ट करें'
    ]
  },
  {
    id: 'practice-flashlight',
    title: 'अंधेरे में टॉर्च (Flashlight) चालू करें',
    instruction: '1. नोटिफिकेशन बार नीचे खींचें -> 2. टॉर्च (Flashlight) आइकन पर छुएं -> 3. काम होने पर बंद करें।',
    speechText: 'टॉर्च चालू करने का अभ्यास करें। टॉर्च के निशान पर छुएं।',
    targetApp: 'settings',
    stageNumber: 8,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'स्क्रीन पर टॉर्च (Flashlight) आइकन पर छुएं',
      'रोशनी चालू होने के बाद दोबारा दबाकर बंद करें'
    ]
  }
];

export const safetyQuizQuestions: SafetyQuizQuestion[] = [
  {
    id: 'sq-1',
    scenario: 'एक अनजान व्यक्ति का फोन आता है: "मैं आपके बैंक की मुख्य शाखा से मैनेजर बोल रहा हूँ। आपका एटीएम कार्ड ब्लॉक हो गया है, तुरंत अपने फोन पर आया 6 अंकों का OTP बताएं।" आपको क्या करना चाहिए?',
    speechText: 'अगर कोई फोन पर कहे कि वह बैंक मैनेजर है और एटीएम चालू रखने के लिए ओटीपी मांग रहा है, तो आपको क्या करना चाहिए?',
    options: [
      {
        id: 'opt-a',
        text: 'घबराकर तुरंत OTP बता देना चाहिए ताकि खाता बंद न हो।',
        isCorrect: false,
        explanation: 'गलत! बैंक कभी फोन पर OTP नहीं मांगता। OTP बताते ही आपके खाते से पैसे उड़ सकते हैं।'
      },
      {
        id: 'opt-b',
        text: 'तुरंत फोन काट दें और जरूरत हो तो खुद बैंक जाकर या अपने बच्चों से बात करें।',
        isCorrect: true,
        explanation: 'बिल्कुल सही! समझदारी इसी में है कि अजनबी का फोन तुरंत काट दिया जाए। बैंक कभी फोन पर पासवर्ड नहीं पूछता।'
      },
      {
        id: 'opt-c',
        text: 'उन्हें अपना गुप्त UPI PIN भी बता दें।',
        isCorrect: false,
        explanation: 'यह बहुत खतरनाक है! UPI PIN किसी को भी बताना मतलब अपनी तिजोरी खोल कर दे देना।'
      }
    ]
  },
  {
    id: 'sq-2',
    scenario: 'व्हाट्सऐप पर एक मैसेज आता है: "बधाई हो! आपने ₹25,00,000 की लॉटरी जीत ली है। पैसे अपने बैंक में पाने के लिए नीचे दिए गए नीले लिंक पर क्लिक करके अपना UPI PIN डालें।" क्या यह सच है?',
    speechText: 'अगर व्हाट्सऐप पर पच्चीस लाख की लॉटरी का संदेश आए और लिंक पर क्लिक करके पिन डालने को कहे, तो क्या यह सच है?',
    options: [
      {
        id: 'opt-a',
        text: 'यह 100% फर्जी और ठगी का प्रयास है। इसे तुरंत डिलीट करें।',
        isCorrect: true,
        explanation: 'शाबाश! आपने बिल्कुल सही पहचाना। बिना लॉटरी खरीदे कोई पैसे नहीं मिलते और पैसे पाने के लिए कभी पिन नहीं डालना होता।'
      },
      {
        id: 'opt-b',
        text: 'लिंक पर क्लिक करके तुरंत अपना पिन डाल दें।',
        isCorrect: false,
        explanation: 'सावधान! जैसे ही आप पिन डालेंगे, आपके खाते से पैसे कट जाएंगे।'
      },
      {
        id: 'opt-c',
        text: 'यह मैसेज अपने 10 दोस्तों को भेजें।',
        isCorrect: false,
        explanation: 'गलत! झूठी और ठगी की बातें दूसरों को भेजने से उनका भी नुकसान हो सकता है।'
      }
    ]
  },
  {
    id: 'sq-3',
    scenario: 'कोई व्यक्ति फोन करके कहता है: "हम बिजली विभाग से हैं। आज रात 9 बजे आपकी बिजली कट जाएगी। इसे रोकने के लिए अपने फोन में यह ऐप (AnyDesk / TeamViewer) डाउनलोड करें।" क्या करना चाहिए?',
    speechText: 'बिजली काटने की धमकी देकर अनजान ऐप डाउनलोड करने को कहे, तो क्या करें?',
    options: [
      {
        id: 'opt-a',
        text: 'फोन काटें और अपने बिजली बिल पर दिए गए आधिकारिक नंबर या दफ्तर में जाकर पूछें।',
        isCorrect: true,
        explanation: 'बहुत खूब! ऐसे ऐप डाउनलोड करने से ठग आपके फोन की स्क्रीन अपने घर बैठे देख लेते हैं और पैसे चुरा लेते हैं।'
      },
      {
        id: 'opt-b',
        text: 'तुरंत वह ऐप डाउनलोड कर लें।',
        isCorrect: false,
        explanation: 'खतरा! अनजान व्यक्ति के कहने पर कभी भी कोई ऐप डाउनलोड न करें।'
      }
    ]
  }
];

export const stages = stagesData;

const englishStageMeta: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'Smartphone Basics',
    subtitle: 'Turning on your phone, charging safely, and using the touchscreen.',
  },
  2: {
    title: 'Calling & Contacts',
    subtitle: 'Making phone calls, answering incoming calls, and saving contact numbers.',
  },
  3: {
    title: 'WhatsApp Messaging & Video Calls',
    subtitle: 'Sending messages, voice notes, photos, and making face-to-face video calls.',
  },
  4: {
    title: 'UPI & Safe Digital Payments',
    subtitle: 'Scanning QR codes, sending money safely, and checking bank balance.',
  },
  5: {
    title: 'Scam Alert & Digital Safety',
    subtitle: 'Protecting your money, never sharing OTPs, and staying safe online.',
  },
  6: {
    title: 'YouTube & Entertainment',
    subtitle: 'Watching bhajans, news, health guides, and searching favorite videos.',
  },
  7: {
    title: 'Instagram & Social Media',
    subtitle: 'Viewing family photos, watching reels, and staying connected with loved ones.',
  },
  8: {
    title: 'Daily Useful Tools & Emergency',
    subtitle: 'Using the flashlight, setting alarms, and making emergency SOS calls.',
  },
};

function toEnglishStageData(source: Stage[]): Stage[] {
  const cleanEnglish = (value: string | undefined): string => {
    if (!value) return '';
    const cleaned = value
      .replace(/\([^)]*[\u0900-\u097F][^)]*\)/g, '') // remove (देवनागरी)
      .replace(/[\u0900-\u097F]+/g, '') // remove Hindi glyphs
      .replace(/[^\w\s.,!?'"()-]/g, ' ') // remove stray foreign punctuation
      .replace(/\(\s*\)/g, '') // remove empty parens ()
      .replace(/\s{2,}/g, ' ')
      .trim();
    // Must contain actual alphanumeric letters or numbers
    return /[a-zA-Z0-9]/.test(cleaned) ? cleaned : '';
  };

  return source.map((stage) => {
    const meta = englishStageMeta[stage.stageNumber];
    const title = meta?.title || cleanEnglish(stage.title) || `Stage ${stage.stageNumber}`;
    const subtitle = meta?.subtitle || cleanEnglish(stage.subtitle) || 'Simple step-by-step digital skills for seniors.';

    return {
      ...stage,
      title,
      subtitle,
      description: subtitle,
      badge: `${stage.lessons.length} Lessons`,
      lessons: stage.lessons.map((lesson) => {
        const lessonTitle = cleanEnglish(lesson.title) || `Lesson ${lesson.id}`;
        return {
          ...lesson,
          title: lessonTitle,
          shortDesc: cleanEnglish(lesson.shortDesc) || `Learn ${lessonTitle} safely, one step at a time.`,
          steps: lesson.steps.map((step) => {
            const cleanTitle = cleanEnglish(step.title);
            const cleanDescription = cleanEnglish(step.description);
            const cleanTip = step.tip ? cleanEnglish(step.tip) : undefined;
            const cleanWarning = step.warning ? cleanEnglish(step.warning) : undefined;
            const stepTitle = cleanTitle || `Step ${step.stepNumber}: ${lessonTitle}`;
            const stepDescription = cleanDescription || `Follow this step carefully on your screen to practice ${lessonTitle}.`;
            return {
              ...step,
              title: stepTitle,
              description: stepDescription,
              speechText: stepDescription,
              tip: cleanTip || (step.stepNumber === 1 ? 'Take your time. You can tap the voice button anytime to listen to this guide.' : undefined),
              warning: cleanWarning || undefined,
            };
          }),
        };
      }),
    };
  });
}

export function getStages(lang: LanguageCode): Stage[] {
  if (lang === 'mr') return stagesMarathi;
  if (lang === 'en') return stagesEnglish;
  return stagesData;
}

export function getPracticeTasks(lang: LanguageCode): PracticeTask[] {
  if (lang === 'mr') return practiceTasksMarathi;
  if (lang === 'en') return practiceTasksEnglish;
  return practiceTasks;
}
