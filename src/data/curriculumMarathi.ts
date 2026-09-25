import { Stage, PracticeTask } from '../types';

export const stagesMarathi: Stage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'स्मार्टफोनच्या मूलभूत गोष्टी (Smartphone Basics)',
    subtitle: 'फोन चालू करणे, चार्जिंग आणि स्क्रीनचा योग्य वापर',
    icon: 'Smartphone',
    badge: '5 धडे',
    lessons: [
      {
        id: 's1-l1',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'स्मार्टफोन म्हणजे काय? (What is a Smartphone?)',
        shortDesc: 'स्मार्टफोन काय असतो आणि तो आपल्या दैनंदिन जीवनात कसा उपयुक्त ठरतो?',
        iconName: 'Smartphone',
        youtubeQuery: 'what is smartphone for seniors marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'स्मार्टफोन: आपल्या खिशातील जादूचा डबा',
            description: 'जुन्या फोनवरून फक्त साधे बोलणे व्हायचे. स्मार्टफोनमध्ये काचेसारखा सुंदर स्क्रीन असतो, ज्याला स्पर्श करून तुम्ही मुलांशी, नातवंडांशी व्हिडिओ कॉलवर समोरासमोर बोलू शकता, गाणी आणि भजन ऐकू शकता.',
            speechText: 'स्मार्टफोन म्हणजे आपल्या खिशातील एक जादूचा डबा आहे. यावरून तुम्ही दूर राहणाऱ्या आपल्या मुलांना आणि नातवंडांना प्रत्यक्ष डोळ्यांसमोर पाहून बोलू शकता.',
            tip: 'घाबरू नका! स्क्रीनला हलका स्पर्श केल्याने फोन कधीही फुटत किंवा बिघडत नाही.',
            illustrationType: 'touch_gesture',
          },
          {
            stepNumber: 2,
            title: 'स्क्रीनला स्पर्श करून चालवणे (Touchscreen)',
            description: 'आपल्या एका बोटाने स्क्रीनवर अतिशय हलका स्पर्श करा (टॅप करा). जोरात दाबण्याची अजिबात गरज नसते.',
            speechText: 'आपल्या एका बोटाने काचेच्या स्क्रीनवर हलका स्पर्श करा. याला टॅप करणे म्हणतात. जोरात दाबू नका.',
            tip: 'हात कोरडे आणि स्वच्छ असल्यास स्क्रीन अतिशय छान प्रतिसाद देतो.',
            illustrationType: 'touch_gesture',
          }
        ]
      },
      {
        id: 's1-l2',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'फोन चालू आणि बंद कसा करावा (Turn ON & OFF)',
        shortDesc: 'फोन सुरू करण्याचा आणि सुरक्षितपणे बंद करण्याचा योग्य मार्ग',
        iconName: 'Power',
        youtubeQuery: 'how to turn on smartphone marathi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'पॉवर बटण ओळखा (Power Button)',
            description: 'फोनच्या उजव्या किंवा डाव्या कडेला एक छोटे बटण असते. याला पॉवर बटण म्हणतात. यामुळे फोन सुरू आणि बंद होतो.',
            speechText: 'फोनच्या कडेला असलेले छोटे बटण म्हणजेच पॉवर बटण आहे. हे फोन चालू व बंद करण्यासाठी वापरले जाते.',
            illustrationType: 'phone_power',
          },
          {
            stepNumber: 2,
            title: 'फोन चालू (ON) करणे',
            description: 'पॉवर बटण ३ सेकंद दाबून ठेवा. फोन हलकासा व्हायब्रेट होईल आणि स्क्रीनवर प्रकाश येईल. मग बटण सोडून द्या.',
            speechText: 'पॉवर बटण तीन सेकंद दाबून धरा. स्क्रीनवर उजेड आला की बोट बाजूला घ्या. फोन सुरू होईल.',
            tip: 'फोन पूर्णपणे सुरू होण्यासाठी अर्धा मिनिट लागतो, थोडा वेळ शांत राहा.',
            illustrationType: 'phone_power',
          },
          {
            stepNumber: 3,
            title: 'फोन बंद (Power OFF) करणे',
            description: 'पॉवर बटण पुन्हा ३ सेकंद दाबून ठेवल्यास स्क्रीनवर "Power Off" (बंद करा) किंवा "Restart" (पुन्हा सुरू करा) पर्याय येतो.',
            speechText: 'फोन बंद करण्यासाठी पॉवर बटण ३ सेकंद दाबा आणि स्क्रीनवर लाल रंगाचे पॉवर ऑफ बटण दाबा.',
            illustrationType: 'phone_power',
          }
        ]
      },
      {
        id: 's1-l3',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'चार्जिंग आणि बॅटरीची काळजी (Charging & Battery)',
        shortDesc: 'बॅटरी कमी झाल्यावर काय करावे आणि चार्जर कसा लावावा',
        iconName: 'BatteryCharging',
        youtubeQuery: 'how to charge mobile safely marathi',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: 'बॅटरीचे चिन्ह पाहणे',
            description: 'स्क्रीनच्या सर्वात वरच्या कोपऱ्यात बॅटरीचा एक छोटा डबा दिसतो. तो हिरवा किंवा पांढरा असल्यास चार्जिंग भरपूर आहे, लाल दिसल्यास चार्जिंगची गरज आहे.',
            speechText: 'स्क्रीनच्या वरील कोपऱ्यात बॅटरीचे चिन्ह तपासा. बॅटरी वीस टक्क्यांपेक्षा कमी झाली किंवा लाल दिसली की फोन चार्जिंगला लावा.',
            illustrationType: 'battery_charging',
          },
          {
            stepNumber: 2,
            title: 'चार्जिंगचा स्लॉट (Charging Port) ओळखणे',
            description: 'फोनच्या तळाशी एक लहान छिद्र असते. आजकालच्या बहुतांश फोनमध्ये टाईप-सी (Type-C) वायर कोणत्याही बाजूने सहज बसते.',
            speechText: 'फोनच्या खाली चार्जिंगचे छिद्र असते. चार्जरची वायर त्यात हलक्या हाताने सरळ लावा.',
            illustrationType: 'charging_port',
          },
          {
            stepNumber: 3,
            title: 'चार्जिंग सुरू होणे',
            description: 'चार्जर भिंतीतील प्लगमध्ये लावून बटन दाबा. स्क्रीनवर विजेचे चिन्ह () दिसेल आणि हलकी घंटी वाजेल. याचा अर्थ फोन चार्ज होत आहे.',
            speechText: 'स्विच चालू केल्यावर स्क्रीनवर विजेचे चिन्ह दिसेल. याचा अर्थ फोन व्यवस्थित चार्ज होत आहे.',
            tip: 'चार्ज होत असताना फोनवर कधीही बोलू नका.',
            warning: 'तुटलेली वायर किंवा ओल्या हाताने चार्जर कधीही वापरू नका.',
            illustrationType: 'battery_charging',
          }
        ]
      },
      {
        id: 's1-l4',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'आवाज कमी-जास्त करणे (Volume Buttons)',
        shortDesc: 'रिंगटोन आणि बोलताना आवाज कमी किंवा जास्त कसा करावा',
        iconName: 'Volume2',
        youtubeQuery: 'how to increase volume in smartphone marathi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'आवाजाचे बटण ओळखा',
            description: 'फोनच्या कडेला एक लांबट बटण असते. वरचा भाग दाबल्यास आवाज वाढतो (+) आणि खालचा भाग दाबल्यास आवाज कमी होतो (-).',
            speechText: 'फोनच्या कडेला लांबट बटण आहे. वरचा भाग दाबल्यास आवाज वाढतो, खालचा दाबल्यास कमी होतो.',
            illustrationType: 'volume_buttons',
          },
          {
            stepNumber: 2,
            title: 'बोलताना आवाज वाढवणे',
            description: 'फोनवर बोलताना समोरच्या व्यक्तीचा आवाज कमी येत असल्यास, फोन कानाला लावलेला असतानाच वरचे बटण दोनदा दाबा.',
            speechText: 'कॉलवर बोलताना आवाज कमी वाटल्यास, वरील आवाज वाढवण्याचे बटण दोनदा दाबा.',
            tip: 'रिंगटोनचा आवाज नेहमी मोठा ठेवा, म्हणजे फोनची घंटी घरात कुठेही सहज ऐकू येईल.',
            illustrationType: 'volume_buttons',
          }
        ]
      },
      {
        id: 's1-l5',
        stageId: 'stage-1',
        stageNumber: 1,
        title: 'स्क्रीन लॉक आणि अनलॉक (Screen Lock & Unlock)',
        shortDesc: 'खिशात फोन असताना आपोआप सुरू होऊ नये म्हणून लॉक करणे',
        iconName: 'Lock',
        youtubeQuery: 'how to lock unlock smartphone marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'स्क्रीन लॉक का होतो?',
            description: 'फोन खिशात किंवा पिशवीत असताना स्क्रीनला नकळत धक्का लागून कोणाला कॉल जाऊ नये म्हणून स्क्रीन बंद आणि लॉक होतो.',
            speechText: 'खिशात असताना नकळत कोणाला कॉल जाऊ नये म्हणून स्क्रीन आपोआप लॉक होतो. हे सुरक्षेसाठी आहे.',
            illustrationType: 'lock_screen',
          },
          {
            stepNumber: 2,
            title: 'स्क्रीन सुरू करणे (Swipe to Unlock)',
            description: 'पॉवर बटण एकदा हलकेच दाबा. स्क्रीनवर घड्याळ दिसेल. आता बोटाने स्क्रीन खालून वर ढकला (Swipe Up). फोन उघडेल!',
            speechText: 'पॉवर बटण एकदा दाबा आणि बोटाने स्क्रीन खालून वर सरकवा. फोनचा लॉक उघडेल.',
            illustrationType: 'lock_screen',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: 'कॉलिंग आणि संपर्क (Calling & Contacts)',
    subtitle: 'फोन कॉल लावणे, बोलणे आणि नवीन नंबर सुरक्षित जतन करणे',
    icon: 'PhoneCall',
    badge: '3 धडे',
    lessons: [
      {
        id: 's2-l1',
        stageId: 'stage-2',
        stageNumber: 2,
        title: 'फोन कॉल कसा लावावा (How to Make a Call)',
        shortDesc: 'हिरवा फोन आयकॉन दाबून मुलांशी किंवा नातेवाईकांशी संपर्क साधा',
        iconName: 'Phone',
        youtubeQuery: 'how to make call smartphone marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'हिरव्या फोन आयकॉनला स्पर्श करा',
            description: 'स्क्रीनवर सर्वात खाली एक हिरवा फोनचा आयकॉन असतो. त्याला हलका स्पर्श करा.',
            speechText: 'स्क्रीनच्या खाली असलेला हिरव्या रंगाचा फोन आयकॉन दाबा. याने फोन डायलर उघडेल.',
            illustrationType: 'phone_app_icon',
          },
          {
            stepNumber: 2,
            title: 'नातेवाईकांचे नाव निवडा (Contacts)',
            description: 'खालील "Contacts" (संपर्क) या शब्दावर दाबा. येथे आपल्या सर्व मुलांची, मुलींची आणि नातेवाईकांची नावे दिसतील.',
            speechText: 'कॉन्टॅक्ट्स वर दाबा. ज्यांना कॉल करायचा आहे त्यांचे नाव शोधा आणि नावावर स्पर्श करा.',
            illustrationType: 'contacts_list',
          },
          {
            stepNumber: 3,
            title: 'कॉल संपवणे (लाल बटण)',
            description: 'बोलणे झाल्यावर स्क्रीनवरील लाल रंगाचे गोल बटण (End Call) दाबा. याने फोन कट होतो.',
            speechText: 'बोलणे संपल्यावर लाल रंगाचे बटण दाबा. फोन कट होईल.',
            tip: 'बोलणे झाल्यावर लाल बटण दाबून फोन कट करायला कधीही विसरू नका.',
            illustrationType: 'end_call',
          }
        ]
      },
      {
        id: 's2-l2',
        stageId: 'stage-2',
        stageNumber: 2,
        title: 'नवीन नंबर कसा सेव्ह करावा (Save New Number)',
        shortDesc: 'डायरीतील किंवा मित्राचा नवीन नंबर फोनमध्ये सेव्ह करा',
        iconName: 'UserPlus',
        youtubeQuery: 'how to save contact number marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: '+ चिन्ह किंवा Create New Contact दाबा',
            description: 'Contacts मध्ये जाऊन वरील अधिकच्या (+) चिन्हावर किंवा "नवीन संपर्क जोडा" वर स्पर्श करा.',
            speechText: 'अधिकचे चिन्ह दाबा. यामुळे नवीन नंबर सेव्ह करण्याचे पान उघडेल.',
            illustrationType: 'add_contact',
          },
          {
            stepNumber: 2,
            title: 'नाव आणि १० अंकी नंबर लिहा',
            description: 'नाव (Name) च्या रकान्यात व्यक्तीचे नाव लिहा आणि Phone मध्ये १० आकडी मोबाईल नंबर टाका.',
            speechText: 'नावाच्या जागी नातेवाईकाचे नाव लिहा आणि मोबाईल नंबर टाईप करा.',
            illustrationType: 'add_contact',
          },
          {
            stepNumber: 3,
            title: 'Save (जतन करा) बटण दाबा',
            description: 'वरील कोपऱ्यात "Save" किंवा टिक चिन्हावर दाबा. नंबर सुरक्षित जतन होईल!',
            speechText: 'वरील सेव्ह बटण दाबा. नंबर सुरक्षित सेव्ह झाला आहे.',
            illustrationType: 'add_contact',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'WhatsApp (व्हॉट्सॲप)',
    subtitle: 'मेसेज, बोलून संदेश पाठवणे, व्हिडिओ कॉल आणि गाण्यासोबत स्टेटस',
    icon: 'MessageCircle',
    badge: '5 धडे',
    lessons: [
      {
        id: 's3-l1',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'व्हॉट्सॲप आणि चॅट्स समजून घेणे (WhatsApp Basics)',
        shortDesc: 'हिरवा व्हॉट्सॲप आयकॉन उघडून मुलांचे मेसेज कसे वाचावे',
        iconName: 'MessageCircle',
        youtubeQuery: 'how to use whatsapp for seniors marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'व्हॉट्सॲपचा हिरवा आयकॉन ओळखा',
            description: 'पांढरा फोन चिन्ह असलेला हिरवा गोल आयकॉन म्हणजे व्हॉट्सॲप. त्याला स्पर्श करा.',
            speechText: 'हिरव्या रंगाचा व्हॉट्सॲप आयकॉन दाबा. याने तुमची मेसेजची यादी उघडेल.',
            illustrationType: 'whatsapp_icon',
          },
          {
            stepNumber: 2,
            title: 'चॅट्सची यादी (Chats List)',
            description: 'स्क्रीनवर तुमच्या सर्व मुलांची, नातेवाईकांची नावे दिसतील. ज्यांच्याशी बोलायचे आहे त्यांच्या नावावर एकदा स्पर्श करा.',
            speechText: 'स्क्रीनवर संपर्कांची नावे दिसतील. ज्यांच्याशी बोलायचे त्यांच्या नावावर स्पर्श करा.',
            illustrationType: 'whatsapp_chats_list',
          },
          {
            stepNumber: 3,
            title: 'चॅट उघडणे आणि मेसेज टाईप करणे',
            description: 'खाली "Type a message" पट्टीवर स्पर्श करा. कीबोर्ड वर येईल आणि मेसेज टाईप करता येईल.',
            speechText: 'खालील पांढऱ्या पट्टीवर स्पर्श करा, कीबोर्ड उघडेल आणि मेसेज लिहिता येईल.',
            illustrationType: 'whatsapp_chat',
          }
        ]
      },
      {
        id: 's3-l2',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'Voice Message: बोलून संदेश पाठवा (Voice Note)',
        shortDesc: 'टाईप न करता मायक्रोफोन दाबून स्वतःच्या आवाजात मेसेज पाठवा',
        iconName: 'Mic',
        youtubeQuery: 'how to send voice message in whatsapp marathi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'माइक (Mic) चिन्ह ओळखा',
            description: 'चॅटमध्ये खाली उजव्या कोपऱ्यात एक लहान हिरवा माइक दिसतो.',
            speechText: 'खालील कोपऱ्यात असलेला माइक ओळखा. यामुळे टाईप न करता थेट बोलून मेसेज पाठवता येतो.',
            illustrationType: 'voice_message',
          },
          {
            stepNumber: 2,
            title: 'माइक दाबून धरा, बोला आणि बोट सोडा',
            description: 'माइकवर बोट दाबून ठेवा, आपले बोलणे पूर्ण करा (उदा. "मी मजेत आहे, काळजी करू नका") आणि बोट उचलून सोडा. मेसेज लगेच जाईल!',
            speechText: 'माइकवर बोट दाबून धरून बोला, आणि बोलणे झाल्यावर बोट सोडा. तुमचा आवाज लगेच समोरच्याला जाईल.',
            tip: 'जर बोलताना काही चुकले तर बोट डाव्या बाजूला सरकवून मेसेज रद्द करता येतो.',
            illustrationType: 'voice_message_record',
          }
        ]
      },
      {
        id: 's3-l3',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'कीबोर्ड भाषा (मराठी/हिंदी कीबोर्ड)',
        shortDesc: 'इंग्रजीऐवजी आपल्या मातृभाषेत मराठीत टाईप करा',
        iconName: 'Globe',
        youtubeQuery: 'marathi typing keyboard in mobile',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'कीबोर्डवरील सेटिंग्ज (Settings) किंवा पृथ्वीचे चिन्ह',
            description: 'कीबोर्ड उघडल्यावर स्पेस बारजवळ एक छोटी गोल पृथ्वी किंवा Settings चिन्ह असते. त्यावर स्पर्श करा.',
            speechText: 'कीबोर्डवरील पृथ्वीचे किंवा सेटिंग्जचे चिन्ह दाबा. यातून मराठी भाषा निवडता येते.',
            illustrationType: 'keyboard_lang',
          },
          {
            stepNumber: 2,
            title: 'मराठी भाषा जोडा',
            description: '"Languages" मध्ये जाऊन "मराठी (Marathi)" निवडा. आता स्पेस बार थोडा वेळ दाबून धरल्यास तुम्ही सहज मराठीत टाईप करू शकता!',
            speechText: 'मराठी भाषा निवडा. आता तुम्ही सहजपणे मराठीत सुंदर संदेश लिहू शकता.',
            illustrationType: 'keyboard_add_lang',
          }
        ]
      },
      {
        id: 's3-l4',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'व्हिडिओ कॉल: समोरासमोर बोलणे (WhatsApp Video Call)',
        shortDesc: 'दूर राहणाऱ्या मुलांना डोळ्यांसमोर पाहून प्रत्यक्ष बोलणे',
        iconName: 'Video',
        youtubeQuery: 'how to do video call on whatsapp marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'व्हिडिओ कॅमेरा आयकॉनला स्पर्श करा',
            description: 'मुलांच्या चॅटमध्ये सर्वात वर उजव्या कोपऱ्यात एका व्हिडिओ कॅमेऱ्याचे चिन्ह असते. त्यावर स्पर्श करा.',
            speechText: 'चॅटमध्ये वर दिसणारा व्हिडिओ कॅमेरा आयकॉन दाबा. याने समोरासमोर व्हिडिओ कॉल सुरू होईल.',
            illustrationType: 'video_call',
          },
          {
            stepNumber: 2,
            title: 'फोन चेहऱ्यासमोर सरळ धरा',
            description: 'फोन आपल्या चेहऱ्यासमोर एक फूट अंतरावर धरा, म्हणजे तुमचा चेहरा समोरच्याला स्पष्ट दिसेल.',
            speechText: 'फोन चेहऱ्यासमोर सरळ धरा. समोर मुलांचा किंवा नातवंडांचा हसरा चेहरा दिसेल!',
            illustrationType: 'video_call_active',
          }
        ]
      },
      {
        id: 's3-l5',
        stageId: 'stage-3',
        stageNumber: 3,
        title: 'गाण्यासोबत व्हॉट्सॲप स्टेटस ठेवणे (WhatsApp Status with Music)',
        shortDesc: 'आपल्या आवडीचा फोटो आणि त्यामागे सुंदर भजन किंवा गाणे लावून स्टेटस ठेवा',
        iconName: 'Sparkles',
        youtubeQuery: 'whatsapp status photo with song music marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'Updates / Status टॅब उघडा',
            description: 'व्हॉट्सॲप उघडल्यावर सर्वात वर किंवा खाली "Updates" (अपडेट्स) किंवा "Status" या शब्दावर स्पर्श करा.',
            speechText: 'व्हॉट्सॲपमधील अपडेट्स किंवा स्टेटस टॅबवर स्पर्श करा. येथे तुम्ही स्वतःचे स्टेटस ठेवू शकता.',
            illustrationType: 'whatsapp_status_tab',
          },
          {
            stepNumber: 2,
            title: 'कॅमेरा किंवा "+" दाबून छान फोटो निवडा',
            description: 'खालील कॅमेऱ्यावर किंवा "My Status" जवळील अधिक (+) चिन्हावर दाबा आणि गॅलरीतून सुंदर फुलांचा, मंदिराचा किंवा कुटुंबाचा फोटो निवडा.',
            speechText: 'अधिकचे चिन्ह दाबून गॅलरीतील आपल्या आवडीचा सुंदर फोटो निवडा.',
            illustrationType: 'whatsapp_status_photo',
          },
          {
            stepNumber: 3,
            title: 'वरील संगीत चिन्हावर (Music) दाबा',
            description: 'फोटो निवडल्यावर स्क्रीनच्या वरच्या बाजूला एक लहान संगीताचे चिन्ह दिसेल. त्यावर स्पर्श करून आपले आवडते गाणे, भजन किंवा धून शोधा आणि निवडा.',
            speechText: 'वरील संगीताच्या चिन्हावर स्पर्श करा आणि आपल्या आवडीचे भजन किंवा गाणे निवडून फोटोला जोडा.',
            illustrationType: 'whatsapp_status_music_search',
          },
          {
            stepNumber: 4,
            title: 'हिरवे Send (शेअर) बटण दाबा',
            description: 'खालील हिरव्या बाणावर (Send) दाबा. तुमचे गाण्यासोबतचे स्टेटस २४ तास तुमच्या सर्व मित्रमैत्रिणींना व नातेवाईकांना दिसेल!',
            speechText: 'खालील हिरवा बाण दाबा. तुमचे संगीतासह स्टेटस २४ तास सर्व ओळखीच्या लोकांना दिसेल.',
            tip: 'सुरक्षा नियम: स्टेटस फक्त आपल्या मोबाईलमध्ये सेव्ह असलेल्या ओळखीच्या संपर्कांनाच दिसते. अनोळखी व्यक्तींना दिसत नाही.',
            illustrationType: 'whatsapp_status_send',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'UPI डिजिटल पेमेंट्स (UPI Digital Payments)',
    subtitle: 'दुकानदार QR कोड स्कॅन करणे, रक्कम भरणे आणि बँक मेसेज ओळखणे',
    icon: 'QrCode',
    badge: '2 धडे',
    lessons: [
      {
        id: 's4-l1',
        stageId: 'stage-4',
        stageNumber: 4,
        title: 'QR कोड स्कॅनर आयकॉन, स्कॅन करणे आणि बँक मेसेज (QR Scan, Amount & Bank SMS)',
        shortDesc: 'स्कॅनर आयकॉन ओळखणे, रक्कम भरणे आणि खरा व खोटा बँक मेसेज ओळखणे',
        iconName: 'Scan',
        youtubeQuery: 'how to scan upi qr code phonepe gpay marathi',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: '१. स्कॅनर आयकॉनची ओळख (Scanner Icon Explained)',
            description: 'दुकानदाराला पैसे देण्यासाठी PhonePe, Google Pay किंवा Paytm मध्ये सर्वात वर किंवा खाली चार कोपऱ्यांच्या कॅमेऱ्यासारखा स्कॅनर आयकॉन [·] असतो. त्याला स्पर्श करा.',
            speechText: 'दुकानदाराचा QR स्कॅन करण्यासाठी सर्वात आधी या चौकोनी स्कॅनर आयकॉनला स्पर्श केला जातो.',
            illustrationType: 'upi_scanner_icon',
          },
          {
            stepNumber: 2,
            title: '२. दुकानदाराचा QR कोड स्कॅन करा',
            description: 'कॅमेरा उघडल्यावर दुकानदाराच्या फलकासमोरील (QR Standee) काळ्या-पांढऱ्या कोडवर फोन ६ ते १० इंच अंतरावर सरळ धरा. आपोआप बीप आवाज होऊन दुकानदाराचे नाव दिसेल.',
            speechText: 'फोन कॅमेरा दुकानदाराच्या QR कोडसमोर सरळ धरा. स्कॅन होताच दुकानदाराचे नाव स्क्रीनवर दिसेल.',
            illustrationType: 'upi_qr',
          },
          {
            stepNumber: 3,
            title: '३. दुकानदाराचे नाव तपासा आणि रक्कम जोडा (Add Amount)',
            description: 'स्क्रीनवर दुकानदाराचे नाव (उदा. शर्मा जी भाजी केंद्र ) बरोबर आहे का ते विचारा, मग द्यायची रक्कम (उदा. ₹50) टाईप करा.',
            speechText: 'दुकानदाराचे नाव तपासून द्यायची रक्कम भरा आणि पुढे जाण्याचे बटण दाबा.',
            illustrationType: 'upi_amount',
          },
          {
            stepNumber: 4,
            title: '४. गुप्त UPI PIN टाका आणि पेमेंट पूर्ण करा',
            description: 'शेवटी आपला ४ किंवा ६ अंकी गुप्त UPI PIN टाका. स्क्रीनवर हिरवा टिक दिसेल आणि पैसे व्यवस्थित जमा होतील.',
            speechText: 'आपला गुप्त UPI PIN काळजीपूर्वक टाका. पेमेंट यशस्वी झाल्यावर हिरवा टिक दिसेल.',
            tip: 'सुवर्ण नियम: UPI PIN फक्त तुमच्या खात्यातून पैसे कट होण्यासाठीच टाकला जातो. पैसे मिळवण्यासाठी कधीही PIN टाकावा लागत नाही!',
            illustrationType: 'upi_pin_safe',
          },
          {
            stepNumber: 5,
            title: '५. स्क्रीनवर बँक मेसेज पॉप-अप आणि खरा vs खोटा मेसेज (Bank SMS Alert)',
            description: 'पेमेंट होताच स्क्रीनच्या वरून बँकेचा अधिकृत मेसेज खाली येतो. खऱ्या मेसेजमध्ये ६ अक्षरी बँक कोड (VK-HDFCBK) आणि कट झालेली रक्कम व शिल्लक बॅलन्स असतो.',
            speechText: 'पैसे जाताच बँकेचा खरा मेसेज वरून येतो. १० आकडी मोबाईल नंबरवरून आलेला मेसेज खोटा फ्रॉड असतो.',
            tip: 'खरा मेसेज: VK-HDFCBK सारख्या अधिकृत नावाने येतो. खोटा मेसेज: +91 98765 43210 सारख्या साध्या मोबाईल नंबरवरून येतो आणि त्यात संशयास्पद निळी लिंक असते.',
            illustrationType: 'upi_fake_vs_real_sms',
          }
        ]
      },
      {
        id: 's4-l2',
        stageId: 'stage-4',
        stageNumber: 4,
        title: 'रक्कम भरणे आणि UPI PIN चा सुवर्ण नियम (Safe UPI Payments)',
        shortDesc: 'पैसे मिळवण्यासाठी कधीही PIN लागत नाही हा सोन्यासारखा नियम लक्षात ठेवा',
        iconName: 'ShieldCheck',
        youtubeQuery: 'upi pin safety rules in marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'दुकानदाराचे नाव आणि रक्कम खात्री करणे',
            description: 'पैसे पाठवण्यापूर्वी दुकानदाराला स्क्रीनवरील नाव दाखवून विचारा: "हेच नाव आहे का?".',
            speechText: 'पेमेंट करण्यापूर्वी दुकानदाराचे नाव नक्की विचारा, जेणेकरून पैसे भलत्याच कोणाला जाणार नाहीत.',
            illustrationType: 'upi_amount',
          },
          {
            stepNumber: 2,
            title: 'सुवर्ण नियम: पैसे मिळवण्यासाठी PIN कधीही लागत नाही',
            description: 'कोणीही फोन करून म्हणाले "मी तुम्हाला पेन्शन किंवा लॉटरीचे पैसे पाठवतोय, PIN टाका" तर फोन लगेच कट करा! पैसे खात्यात येण्यासाठी PIN लागतच नाही.',
            speechText: 'लक्षात ठेवा, पैसे मिळवण्यासाठी कधीही UPI PIN टाकायचा नसतो. PIN फक्त पैसे देण्यासाठीच असतो.',
            warning: 'आपला UPI PIN हा घरातील तिजोरीच्या चावीसारखा गुप्त ठेवा.',
            illustrationType: 'upi_pin_safe',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    title: 'सायबर सुरक्षा आणि फसवणुकीपासून बचाव (Scam Alert)',
    subtitle: 'ऑनलाइन फसवणूक, खोटे कॉल्स आणि OTP ची सुरक्षा',
    icon: 'ShieldAlert',
    badge: '2 धडे',
    lessons: [
      {
        id: 's5-l1',
        stageId: 'stage-5',
        stageNumber: 5,
        title: 'OTP आणि पासवर्ड कोणालाही सांगू नका (Never Share OTP)',
        shortDesc: 'बँकेतून बोलतोय सांगणाऱ्या भामट्यांना कधीही OTP सांगू नका',
        iconName: 'Lock',
        youtubeQuery: 'cyber crime awareness for senior citizens marathi',
        videoDuration: '4 min',
        steps: [
          {
            stepNumber: 1,
            title: 'OTP काय असतो? तुमची डिजिटल चावी',
            description: 'OTP हा बँकेकडून तुमच्या मोबाईलवर आलेला ६ आकडी तात्पुरता पासवर्ड असतो. हा ज्याच्या हातात गेला तो तुमचे पैसे काढून घेऊ शकतो.',
            speechText: 'OTP म्हणजे तुमच्या बँक खात्याची गोपनीय चावी आहे. हा कोणालाही सांगू नका.',
            illustrationType: 'scam_otp',
          },
          {
            stepNumber: 2,
            title: 'खोटे बँक कॉल्स कसे ओळखावे?',
            description: 'खरे बँक अधिकारी कधीही फोनवर OTP, ATM चा पासवर्ड किंवा UPI PIN मागत नाहीत. कोणीही मागितल्यास त्वरित फोन कट करा.',
            speechText: 'बँक कधीही फोनवर OTP मागत नाही. कोणी मागितल्यास फोन ताबडतोब कापून टाका.',
            warning: 'कोणालाही घाबरू नका. फोन कट करून आपल्या जवळच्या बँकेत जाऊन चौकशी करा.',
            illustrationType: 'scam_fake_call',
          }
        ]
      },
      {
        id: 's5-l2',
        stageId: 'stage-5',
        stageNumber: 5,
        title: 'खोटे मेसेज आणि लिंक्सपासून सावध राहा (Fake Links)',
        shortDesc: '२५ लाखांची लॉटरी किंवा वीज बिल कापण्याची धमकी देणाऱ्या मेसेजवर क्लिक करू नका',
        iconName: 'AlertTriangle',
        youtubeQuery: 'fake message whatsapp scam marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'निळ्या रंगाच्या संशयास्पद लिंक्सला स्पर्श करू नका',
            description: 'व्हॉट्सॲपवर किंवा मेसेजमध्ये "लॉटरी जिंका" किंवा "वीज बिल भरा नाहीतर वीज कापली जाईल" असा मेसेज आला तर त्यातील निळ्या लिंकला हात लावू नका.',
            speechText: 'अनोळखी मेसेजमधील निळ्या लिंकवर कधीही क्लिक करू नका. तो मेसेज लगेच डिलीट करा.',
            illustrationType: 'upi_fake_vs_real_sms',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-6',
    stageNumber: 6,
    title: 'YouTube (यूट्यूब)',
    subtitle: 'भजन, बातम्या, जुने चित्रपट, चॅनल Subscribe करणे आणि Shorts पाहणे',
    icon: 'Youtube',
    badge: '2 धडे',
    lessons: [
      {
        id: 's6-l1',
        stageId: 'stage-6',
        stageNumber: 6,
        title: 'बोलून यूट्यूबवर भजन व बातम्या शोधणे (Voice Search)',
        shortDesc: 'टाईप न करता मायक्रोफोनवर बोलून आवडती गाणी आणि प्रवचन ऐका',
        iconName: 'Mic',
        youtubeQuery: 'how to search on youtube using voice marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'सर्च बार आणि मायक्रोफोन (Mic) ओळखा',
            description: 'यूट्यूब उघडल्यावर सर्वात वर एक सर्च बार असतो आणि त्याच्या शेजारी काळ्या किंवा लाल रंगाचा लहान माइक असतो. त्याला स्पर्श करा.',
            speechText: 'यूट्यूबमध्ये वर दिसणाऱ्या माइकवर स्पर्श करा आणि काय पाहायचे आहे ते स्पष्ट बोला.',
            illustrationType: 'youtube_search',
          },
          {
            stepNumber: 2,
            title: 'स्पष्ट आवाजात बोला: "हरिपाठ" किंवा "आजच्या ताज्या बातम्या"',
            description: 'माइकवर बीप आवाज होताच "ज्ञानेश्वरी भावार्थ" किंवा "मराठी जुनी गाणी" बोला. लगेच संबंधित सुंदर व्हिडिओंची यादी समोर येईल.',
            speechText: 'माइकवर बीप आवाज होताच स्पष्ट बोला. लगेच तुमचे आवडते व्हिडिओ समोर सुरू होतील.',
            illustrationType: 'youtube_player',
          }
        ]
      },
      {
        id: 's6-l2',
        stageId: 'stage-6',
        stageNumber: 6,
        title: 'चॅनल Subscribe करणे, Shorts पाहणे आणि लाईक करणे (Subscribe, Shorts & Like)',
        shortDesc: 'आवडत्या चॅनलचे सदस्य व्हा, छोटे व्हिडिओ पहा आणि अंगठा दाबून लाईक करा',
        iconName: 'Play',
        youtubeQuery: 'how to subscribe channel and watch shorts on youtube marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'लाल रंगाचे Subscribe बटण दाबा',
            description: 'व्हिडिओच्या खाली लाल रंगाचे "Subscribe" बटण असते. त्याला स्पर्श केल्यास त्या चॅनलचे नवीन व्हिडिओ तुम्हाला सर्वात आधी दिसतात. शेजारील  घंटी दाबून ऑल (All) करा.',
            speechText: 'आवडत्या चॅनलचे लाल रंगाचे सबस्क्राईब बटण दाबा आणि घंटीच्या चिन्हावर स्पर्श करा.',
            illustrationType: 'youtube_subscribe',
          },
          {
            stepNumber: 2,
            title: 'Shorts टॅब: लहान व्हिडिओ पाहणे',
            description: 'यूट्यूबमध्ये खाली "Shorts" असा शब्द असतो. त्यावर स्पर्श करा आणि वर सरकवून (Swipe Up) एकामागून एक लहान मनोरंजक व्हिडिओ पहा.',
            speechText: 'खालील शॉर्ट्स बटणावर दाबा आणि बोटाने वर सरकवून एकामागून एक सुंदर छोटे व्हिडिओ पहा.',
            illustrationType: 'youtube_player',
          },
          {
            stepNumber: 3,
            title: 'आवडल्यास अंगठा (Like) दाबा',
            description: 'व्हिडिओ खूप आवडल्यास वरच्या बाजूला असलेल्या अंगठ्यासारख्या चिन्हावर (Like) हलका स्पर्श करा.',
            speechText: 'व्हिडिओ आवडल्यास लाईकच्या अंगठ्यावर स्पर्श करा. यामुळे तो व्हिडिओ तुमच्या सेव्ह यादीत राहतो.',
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
    subtitle: 'साइन-इन, प्रोफाईल, नातेवाईकांना जोडणे, रील्स पाहणे आणि नवीन पोस्ट करणे',
    icon: 'Sparkles',
    badge: '6 धडे',
    lessons: [
      {
        id: 's7-l1',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'इन्स्टाग्राम साइन-इन (Sign In to Instagram)',
        shortDesc: 'ॲप उघडून मोबाईल नंबर किंवा युझरनेमने सुरक्षितपणे लॉग इन करा',
        iconName: 'User',
        youtubeQuery: 'how to login instagram account senior marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'रंगीबेरंगी कॅमेऱ्याचा इन्स्टाग्राम आयकॉन उघडा',
            description: 'गुलाबी, जांभळा आणि पिवळा रंग असलेला कॅमेऱ्याचा आयकॉन म्हणजे इन्स्टाग्राम. त्याला स्पर्श करा.',
            speechText: 'इन्स्टाग्रामचा सुंदर रंगीत आयकॉन दाबा. ॲप सुरू होईल.',
            illustrationType: 'instagram_signin',
          },
          {
            stepNumber: 2,
            title: 'लॉग-इन माहिती भरा (Sign In)',
            description: 'आपला मोबाईल नंबर किंवा ईमेल आणि गुप्त पासवर्ड टाकून "Log In" बटण दाबा.',
            speechText: 'आपला नंबर आणि पासवर्ड टाकून लॉग-इन करा. तुमचे खाते सुरक्षितपणे उघडेल.',
            tip: 'लॉग-इन झाल्यावर "Save Info" निवडा म्हणजे पुन्हा पासवर्ड टाकावा लागत नाही.',
            illustrationType: 'instagram_signin',
          }
        ]
      },
      {
        id: 's7-l2',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'आपली प्रोफाईल उघडणे (Open Profile & Bio)',
        shortDesc: 'स्वतःचा फोटो, नाव आणि माहिती पाहण्यासाठी प्रोफाईल टॅब उघडा',
        iconName: 'UserCheck',
        youtubeQuery: 'how to check instagram profile marathi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'खाली उजव्या कोपऱ्यातील छोट्या फोटोला स्पर्श करा',
            description: 'स्क्रीनवर सर्वात खाली उजव्या कोपऱ्यात तुमचा स्वतःचा गोल लहान फोटो किंवा माणसाचे चिन्ह दिसेल. त्यावर स्पर्श करा.',
            speechText: 'खाली उजव्या कोपऱ्यात असलेल्या आपल्या फोटोच्या चिन्हावर स्पर्श करा. तुमची स्वतःची प्रोफाईल उघडेल.',
            illustrationType: 'instagram_profile',
          },
          {
            stepNumber: 2,
            title: 'आपले नाव, फोटो आणि पोस्ट पाहणे',
            description: 'येथे तुमचे नाव, तुम्ही शेअर केलेले कौटुंबिक फोटो आणि तुम्हाला फॉलो करणाऱ्यांची संख्या दिसते.',
            speechText: 'येथे तुमचे नाव आणि तुम्ही पोस्ट केलेले सर्व फोटो एकत्र दिसतात.',
            illustrationType: 'instagram_profile',
          }
        ]
      },
      {
        id: 's7-l3',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'संपर्कातील नातेवाईकांना जोडणे (Add Contact Members & Follow)',
        shortDesc: 'मुले, नातवंडे आणि मित्रमैत्रिणींना शोधून फॉलो करा',
        iconName: 'Users',
        youtubeQuery: 'how to find and follow friends on instagram marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'सर्च (भिंग ) चिन्हावर दाबा',
            description: 'खालील भिंगाच्या (Search) चिन्हावर स्पर्श करा आणि वर नातेवाईकाचे नाव किंवा युझरनेम टाईप करा.',
            speechText: 'सर्च चिन्हावर दाबा आणि आपल्या मुलाचे किंवा नातवाचे नाव टाईप करा.',
            illustrationType: 'instagram_contacts',
          },
          {
            stepNumber: 2,
            title: 'निळे "Follow" बटण दाबा',
            description: 'नातेवाईकाचा फोटो दिसल्यावर त्यांच्या नावासमोरील निळ्या रंगाचे "Follow" (फॉलो) बटण दाबा. आता त्यांचे सुंदर फोटो तुम्हाला दिसतील.',
            speechText: 'नातेवाईकांच्या नावासमोरील निळे फॉलो बटण दाबा. आता त्यांचे फोटो तुमच्या होमवर दिसतील.',
            illustrationType: 'instagram_contacts',
          }
        ]
      },
      {
        id: 's7-l4',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'रील्स पाहणे आणि आवडणे (How to Watch Reels)',
        shortDesc: 'व्हिडिओ चिन्ह दाबून सुंदर रील्स पहा, वर स्वाइप करा आणि लाईक दाबा',
        iconName: 'Play',
        youtubeQuery: 'how to watch instagram reels marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'खालील Reels आयकॉन दाबा',
            description: 'स्क्रीनच्या मध्यभागी खाली एक व्हिडिओ प्ले चिन्हासारखा Reels आयकॉन असतो. त्याला स्पर्श करा.',
            speechText: 'खालील रील्स चिन्हावर स्पर्श करा. मनोरंजक व्हिडिओ लगेच सुरू होतील.',
            illustrationType: 'instagram_reels',
          },
          {
            stepNumber: 2,
            title: 'पुढचा व्हिडिओ पाहण्यासाठी वर स्वाइप करा (Swipe Up)',
            description: 'बोटाने स्क्रीन खालून वर ढकला. लगेच पुढचा सुंदर व्हिडिओ येईल. आवडल्यास उजव्या बाजूला असलेल्या लाईक (Like) चिन्हावर दाबा.',
            speechText: 'पुढचा व्हिडिओ पाहण्यासाठी बोटाने स्क्रीन वर ढकला आणि आवडल्यास लाईक चिन्हावर स्पर्श करा.',
            illustrationType: 'instagram_reels',
          }
        ]
      },
      {
        id: 's7-l5',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'फॉलो रिक्वेस्ट कशी स्वीकारायची (Accept Follow Requests & Privacy)',
        shortDesc: 'प्रायव्हेट खात्यात फक्त ओळखीच्या नातेवाईकांचीच रिक्वेस्ट स्वीकारा',
        iconName: 'ShieldCheck',
        youtubeQuery: 'how to accept instagram follow request marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'हार्ट / घंटी चिन्हावर (Notifications) दाबा',
            description: 'वरच्या किंवा खालच्या बाजूला असलेल्या हृदयाच्या किंवा घंटीच्या चिन्हावर लाल ठिपका दिसेल. त्यावर स्पर्श करा.',
            speechText: 'वर दिसणाऱ्या हृदयाच्या किंवा घंटीच्या चिन्हावर स्पर्श करा. नवीन आलेल्या रिक्वेस्ट दिसतील.',
            illustrationType: 'instagram_requests',
          },
          {
            stepNumber: 2,
            title: 'ओळखीच्या व्यक्तीची विनंती "Confirm" करा',
            description: 'जर विनंती तुमच्या कुटुंबातील मुलांची, मुलीची किंवा मित्रांची असेल तर "Confirm" (स्वीकारा) दाबा. अनोळखी व्यक्ती असल्यास "Delete" (नाकारा) करा.',
            speechText: 'ओळखीचे नातेवाईक असतील तर कन्फर्म दाबा, अनोळखी व्यक्ती असल्यास डिलीट करा.',
            tip: 'सुरक्षा नियम: अनोळखी व्यक्तींची विनंती कधीही स्वीकारू नका, म्हणजे तुमचे फोटो सुरक्षित राहतील.',
            illustrationType: 'instagram_requests',
          }
        ]
      },
      {
        id: 's7-l6',
        stageId: 'stage-7',
        stageNumber: 7,
        title: 'नवीन फोटो पोस्ट कसा करावा (How to Post Something)',
        shortDesc: 'गॅलरीतून सुंदर फोटो निवडा, छान संदेश लिहा आणि शेअर करा',
        iconName: 'PlusSquare',
        youtubeQuery: 'how to post photo on instagram marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: 'मध्यभागी असलेले "+" चिन्ह दाबा',
            description: 'स्क्रीनवर खाली किंवा वर अधिकचे (+) चिन्ह दिसेल. त्यावर स्पर्श करा.',
            speechText: 'प्लस (+) चिन्हावर स्पर्श करा. याने तुमच्या फोनची फोटो गॅलरी उघडेल.',
            illustrationType: 'instagram_post',
          },
          {
            stepNumber: 2,
            title: 'छान फोटो निवडा आणि पुढे जा',
            description: 'आपल्या कुटुंबाचा, बागेतील फुलांचा किंवा प्रवासाचा फोटो निवडा आणि वरील निळा बाण (Next) दाबा.',
            speechText: 'आपल्या आवडीचा फोटो निवडा आणि नेक्स्ट दाबा.',
            illustrationType: 'instagram_post',
          },
          {
            stepNumber: 3,
            title: 'मजकूर लिहा (Caption) आणि Share दाबा',
            description: '"Write a caption" मध्ये "सुप्रभात" किंवा "माझे कुटुंब" लिहा आणि वरील निळे "Share" बटण दाबा. तुमचा फोटो लगेच सर्व नातेवाईकांना दिसेल!',
            speechText: 'कॅपशनमध्ये छान संदेश लिहा आणि शेअर बटण दाबा. तुमचा फोटो पोस्ट झाला आहे!',
            illustrationType: 'instagram_post',
          }
        ]
      }
    ]
  },
  {
    id: 'stage-8',
    stageNumber: 8,
    title: 'दैनंदिन उपयुक्त साधने आणि आपत्कालीन मदत (Useful Tools & SOS)',
    subtitle: 'टॉर्च, अलार्म, कॅल्क्युलेटर आणि ११२ आपत्कालीन नंबर',
    icon: 'Flashlight',
    badge: '2 धडे',
    lessons: [
      {
        id: 's8-l1',
        stageId: 'stage-8',
        stageNumber: 8,
        title: 'Flashlight (टॉर्च) आणि स्क्रीन ब्राइटनेस',
        shortDesc: 'अंधारात पायऱ्यांवर किंवा रात्री फिरताना फोनची टॉर्च सुरू करा',
        iconName: 'Flashlight',
        youtubeQuery: 'how to turn on flashlight in phone marathi',
        videoDuration: '2 min',
        steps: [
          {
            stepNumber: 1,
            title: 'स्क्रीनच्या वरून पडदा खाली ओढा (Quick Settings)',
            description: 'स्क्रीनच्या अगदी वरच्या टोकापासून एका बोटाने खाली सरकवा. येथे एक छोटा पडदा खाली येईल.',
            speechText: 'स्क्रीनच्या वरच्या कडेवरून बोटाने खाली ओढा. जलद सेटिंग्सचा पडदा खाली येईल.',
            illustrationType: 'flashlight',
          },
          {
            stepNumber: 2,
            title: 'टॉर्चच्या (Torch ) चिन्हाला स्पर्श करा',
            description: 'विजेरीसारख्या चिन्हाला स्पर्श करताच फोनच्या मागचा प्रकाश सुरू होईल. पुन्हा स्पर्श केल्यास बंद होईल.',
            speechText: 'टॉर्च चिन्हावर दाबा. फोनचा प्रकाश सुरू होईल. पुन्हा दाबल्यास बंद होईल.',
            illustrationType: 'flashlight',
          }
        ]
      },
      {
        id: 's8-l2',
        stageId: 'stage-8',
        stageNumber: 8,
        title: 'Emergency Calling (११२ राष्ट्रीय आपत्कालीन नंबर)',
        shortDesc: 'कोणत्याही संकटात किंवा मदतीसाठी एका कॉलवर पोलीस व रुग्णवाहिका',
        iconName: 'PhoneCall',
        youtubeQuery: '112 emergency helpline india marathi',
        videoDuration: '3 min',
        steps: [
          {
            stepNumber: 1,
            title: '११२ हा संपूर्ण भारताचा एकात्मिक नंबर आहे',
            description: 'पोलीस, रुग्णवाहिका किंवा अग्निशामक दलासाठी वेगवेगळे नंबर लक्षात ठेवण्याची गरज नाही. फक्त ११२ डायल करा.',
            speechText: 'संकटाच्या वेळी फक्त एक एक दोन म्हणजे ११२ डायल करा. तात्काळ पोलीस आणि रुग्णवाहिका मदत मिळेल.',
            tip: 'फोन लॉक असला तरीही स्क्रीनवर Emergency Call दाबून ११२ डायल करता येतो.',
            illustrationType: 'emergency_call',
          }
        ]
      }
    ]
  }
];

export const practiceTasksMarathi: PracticeTask[] = [
  {
    id: 'practice-power-charging',
    title: 'फोन चालू करा, चार्जिंग लावा व लॉक उघडा (Power & Charging)',
    instruction: 'उजवीकडील पॉवर बटण ३ सेकंद दाबा, चार्जर लावा आणि स्क्रीन वर सरकवून लॉक उघडा.',
    speechText: 'फोन चालू करणे, चार्जिंग आणि लॉक उघडण्याचा सराव करा.',
    targetApp: 'settings',
    stageNumber: 1,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'उजवीकडील पॉवर बटण ३ सेकंद दाबून फोन सुरू करा.',
      'फोनच्या तळाशी चार्जरची पिन लावून चार्जिंग सुरू करा.',
      'स्क्रीनवर खालून वर स्वाइप करून लॉक उघडा.'
    ]
  },
  {
    id: 'practice-call',
    title: 'मुलाला फोन कॉल लावा (Make a Call)',
    instruction: 'हिरवा फोन आयकॉन उघडून संपर्कातील "रोहन (मुलगा)" या नावावर स्पर्श करून कॉल लावा.',
    speechText: 'हिरवा फोन आयकॉन उघडा आणि रोहन नावावर स्पर्श करून कॉल लावा.',
    targetApp: 'phone',
    stageNumber: 2,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'होम स्क्रीनवरील हिरव्या फोन चिन्हाला स्पर्श करा.',
      'Contacts टॅबमध्ये रोहन (मुलगा) च्या नावावर दाबा.',
      'हिरवे कॉल बटण दाबून बोलणे सुरू करा, शेवटी लाल बटण दाबून फोन कट करा.'
    ]
  },
  {
    id: 'practice-whatsapp-msg',
    title: 'व्हॉट्सॲपवर मेसेज पाठवा (Send WhatsApp Text)',
    instruction: 'व्हॉट्सॲप उघडून मुलीला "मी मजेत आहे" असा संदेश पाठवा.',
    speechText: 'व्हॉट्सॲप उघडा आणि मुलीला मेसेज पाठवा.',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 3,
    stepsGuide: [
      'होम स्क्रीनवरील व्हॉट्सॲप आयकॉन दाबा.',
      'नेहा (मुलगी) च्या चॅटवर स्पर्श करा.',
      'खाली दिलेल्या मेसेजवर स्पर्श करून हिरवे सेंड बटण दाबा.'
    ]
  },
  {
    id: 'practice-whatsapp-voice',
    title: 'व्हॉट्सॲपवर व्हॉइस मेसेज पाठवा (Voice Note)',
    instruction: 'माइकवर बोट दाबून ठेवून स्वतःच्या आवाजात संदेश रेकॉर्ड करा आणि पाठवा.',
    speechText: 'माइकवर बोट दाबून धरा, आवाज रेकॉर्ड करा आणि सोडा.',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'व्हॉट्सॲपमधील नेहाच्या चॅटमध्ये जा.',
      'खालील हिरवा माइक ३ सेकंद दाबून धरा आणि बोट सोडा.'
    ]
  },
  {
    id: 'practice-whatsapp-status',
    title: 'गाण्यासोबत व्हॉट्सॲप स्टेटस ठेवा (WhatsApp Status with Music)',
    instruction: 'स्टेटस टॅबमध्ये जाऊन फोटो निवडा, संगीत जोडा आणि हिरवे सेंड बटण दाबा.',
    speechText: 'स्टेटस टॅब उघडा, सुंदर फोटो निवडा, गाणे जोडा आणि सेंड दाबा.',
    targetApp: 'whatsapp',
    stageNumber: 3,
    initialStep: 1,
    totalSteps: 4,
    stepsGuide: [
      'व्हॉट्सॲपमध्ये Updates / Status टॅबवर स्पर्श करा.',
      'कॅमेरा किंवा "+" दाबून सुंदर फोटो निवडा.',
      'वरील संगीताच्या चिन्हावर स्पर्श करून आवडते भजन/गाणे निवडा.',
      'खालील हिरवे सेंड बटण दाबून २४ तासांसाठी स्टेटस पोस्ट करा.'
    ]
  },
  {
    id: 'practice-upi-pay',
    title: 'QR स्कॅनर आयकॉन, रक्कम भरणे आणि बँक मेसेज ओळखणे (UPI Pay & Bank SMS)',
    instruction: 'स्कॅनर आयकॉन ओळखा, ₹50 रक्कम जोडा, PIN टाका आणि बँक मेसेज तपासा.',
    speechText: 'स्कॅनर आयकॉन दाबा, QR स्कॅन करा, पन्नास रुपये रक्कम भरा आणि बँक मेसेज तपासा.',
    targetApp: 'upi',
    stageNumber: 4,
    initialStep: 1,
    totalSteps: 5,
    stepsGuide: [
      'UPI ॲपमध्ये सर्वात आधी स्कॅनर आयकॉन [·] ओळखा आणि दाबा.',
      'दुकानदाराच्या QR कोडसमोर कॅमेरा धरून स्कॅन करा.',
      'दुकानदाराचे नाव तपासून ₹50 रक्कम जोडा आणि Pay दाबा.',
      'आपला गुप्त UPI PIN (1234) काळजीपूर्वक टाका.',
      'स्क्रीनवरील बँक मेसेज पॉप-अप पहा आणि खरा vs खोटा मेसेज समजून घ्या.'
    ]
  },
  {
    id: 'practice-youtube-voice',
    title: 'यूट्यूबवर बोलून भजन शोधा (YouTube Voice Search)',
    instruction: 'माइक चिन्हाला स्पर्श करा आणि बोलून भजन सुरू करा.',
    speechText: 'यूट्यूबवर माइक दाबा आणि हरिपाठ किंवा भजन सुरू करा.',
    targetApp: 'youtube',
    stageNumber: 6,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'यूट्यूब ॲप उघडा.',
      'सर्च बारशेजारील माइकवर स्पर्श करा.'
    ]
  },
  {
    id: 'practice-instagram',
    title: 'इन्स्टाग्राम: प्रोफाईल, रील्स, फॉलो आणि पोस्ट (Instagram Complete)',
    instruction: 'इन्स्टाग्राम उघडून प्रोफाईल पहा, रील्स बघा, रिक्वेस्ट स्वीकारा आणि नवीन पोस्ट शेअर करा.',
    speechText: 'इन्स्टाग्राम उघडून रील्स पहा, नातेवाईकांची रिक्वेस्ट स्वीकारा आणि फोटो पोस्ट करा.',
    targetApp: 'instagram',
    stageNumber: 7,
    initialStep: 1,
    totalSteps: 6,
    stepsGuide: [
      'होम स्क्रीनवरील इन्स्टाग्राम आयकॉनवर स्पर्श करा.',
      'खालील उजव्या कोपऱ्यातील प्रोफाईल आयकॉन उघडा.',
      'सर्च करून संपर्कातील नातेवाईकाला (रोहन) फॉलो करा.',
      'खालील Reels टॅब दाबून व्हिडिओ वर स्वाइप करा आणि Like दाबा.',
      'घंटी चिन्ह उघडून नातेवाईकाची फॉलो रिक्वेस्ट Confirm करा.',
      '+ चिन्ह दाबून छान फोटो निवडा आणि Share दाबा.'
    ]
  },
  {
    id: 'practice-incoming-call',
    title: 'आलेला फोन कॉल उचला (Answer Incoming Call)',
    instruction: 'फोन वाजल्यावर हिरवा फोन आयकॉन वर सरकवून कॉल उचला.',
    speechText: 'हिरवे फोन चिन्ह वर सरकवून आलेला कॉल उचला.',
    targetApp: 'incoming_call',
    stageNumber: 2,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'फोन वाजताना हिरवे फोन चिन्ह ओळखा.',
      'हिरवे चिन्ह बोटाने वर सरकवून कॉल स्वीकारा आणि बोला.'
    ]
  },
  {
    id: 'practice-emergency-call',
    title: 'आपत्कालीन सेवा 112 कॉल (Emergency 112 Call)',
    instruction: 'लॉक स्क्रीनवर SOS किंवा 112 दाबा आणि आपत्कालीन मदत मिळवा.',
    speechText: 'संकटसमयी 112 नंबरवर कॉल करण्याचा सराव करा.',
    targetApp: 'emergency',
    stageNumber: 5,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'स्क्रीनवरील 112 आपत्कालीन बटणावर स्पर्श करा.',
      'शांत राहून आपली समस्या व ठिकाण सांगा.'
    ]
  },
  {
    id: 'practice-flashlight',
    title: 'अंधारात टॉर्च (Flashlight) चालू करा',
    instruction: 'टॉर्च आयकॉनवर स्पर्श करून बॅटरी ऑन करा, काम संपल्यावर बंद करा.',
    speechText: 'टॉर्च चालू करण्याचा सराव करा.',
    targetApp: 'settings',
    stageNumber: 8,
    initialStep: 1,
    totalSteps: 2,
    stepsGuide: [
      'स्क्रीनवरील टॉर्च (Flashlight) चिन्हावर स्पर्श करा.',
      'उजेड सुरू झाल्यावर पुन्हा एकदा दाबून टॉर्च बंद करा.'
    ]
  }
];
