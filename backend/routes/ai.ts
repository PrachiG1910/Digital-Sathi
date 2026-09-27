import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config } from '../config';

export const aiRouter = Router();

const SYSTEM_PROMPT = `
You are "Digital Sathi AI", a very patient, caring, and respectful smartphone assistant specially designed for senior citizens and elderly learners in India.
Your mission is to remove fear of technology and help them use their smartphone safely.

Rules to follow:
1. Speak warmly, respectfully, and gently (e.g. use "आप" in Hindi, "तुम्ही" in Marathi).
2. Use very simple, everyday words. Avoid complicated technical jargon.
3. Keep answers concise: 2 to 4 short, clear steps at most.
4. Always reassure them that pressing buttons will not break their phone.
5. If the question is about UPI, OTP, or money, emphasize NEVER sharing OTP or UPI PIN with anyone, even bank staff.
6. Reply in the user's selected language (Hindi, Marathi, or Simple English).
`;

function getOfflineFallbackAnswer(query: string, lang: 'hi' | 'mr' | 'en'): string {
  const q = query.toLowerCase();

  if (q.includes('otp') || q.includes('पिन') || q.includes('pin') || q.includes('पैसे') || q.includes('पैसे')) {
    if (lang === 'mr') {
      return 'महत्त्वाची सूचना: कोणताही अनोळखी व्यक्ती किंवा बँकेचा कर्मचारी म्हणून फोन आला तरी तुमचा OTP किंवा UPI PIN कोणालाही सांगू नका. पैसे मिळवण्यासाठी कधीही PIN टाकावा लागत नाही.';
    }
    if (lang === 'en') {
      return 'Important Safety Rule: Never share your OTP or UPI PIN with anyone, even if they claim to be a bank officer. You only enter your PIN when sending money, never when receiving money.';
    }
    return 'ज़रूरी सुरक्षा नियम: किसी भी अनजान व्यक्ति या बैंक कर्मचारी को अपना OTP या UPI PIN कभी न बताएं। पैसे प्राप्त करने के लिए कभी भी PIN दर्ज करने की आवश्यकता नहीं होती है।';
  }

  if (q.includes('call') || q.includes('फोन') || q.includes('कॉल')) {
    if (lang === 'mr') {
      return 'फोन कॉल करण्यासाठी: हिरव्या रंगाच्या फोन चिन्हावर (Phone App) बोट ठेवा, नंतर कॉन्टॅक्ट्समधून नाव निवडा किंवा डायल पॅडवर 10 अंकी नंबर दाबून हिरव्या बटनावर स्पर्श करा.';
    }
    if (lang === 'en') {
      return 'To make a phone call: Tap the green Phone app icon on your screen, select Contacts to find a saved family member or tap Keypad to dial a 10-digit number, then tap the green call button.';
    }
    return 'फोन लगाने के लिए: हरे रंग के फोन ऐप पर उंगली छुएं, फिर संपर्कों (Contacts) में से नाम चुनें या कीपैड पर 10 अंकों का नंबर डायल करके हरे बटन को दबाएं।';
  }

  if (q.includes('whatsapp') || q.includes('व्हॉट्सॲप') || q.includes('व्हाट्सएप')) {
    if (lang === 'mr') {
      return 'व्हॉट्सॲप वापरणे: व्हॉट्सॲपच्या हिरव्या चिन्हावर स्पर्श करा, आपल्या नातेवाईकाच्या नावावर बोट ठेवा. बोलून संदेश पाठवण्यासाठी माइकच्या चिन्हाला दाबून ठेवा आणि बोला.';
    }
    if (lang === 'en') {
      return 'Using WhatsApp: Open WhatsApp by tapping its green icon. Tap your family member\'s name. To send a voice message, hold down the small microphone button and speak gently.';
    }
    return 'व्हाट्सएप इस्तेमाल करना: व्हाट्सएप के हरे आइकन को छुएं, अपने परिवारजन के नाम पर टैप करें। बोलकर संदेश भेजने के लिए माइक वाले बटन को दबाकर रखें और अपनी बात कहें।';
  }

  // General reassurance fallback
  if (lang === 'mr') {
    return 'काळजी करू नका! स्मार्टफोन वापरणे खूप सोपे आहे. स्क्रीनवर हलक्या हाताने बोट टेकवा. चूक झाली तरी काहीही बिघडणार नाही. आपण पुन्हा होम बटनावर जाऊन नव्याने सुरुवात करू शकता.';
  }
  if (lang === 'en') {
    return 'Do not worry! Using a smartphone is safe and easy. Gently tap on the screen with dry fingers. Even if you make a mistake, you can always tap the Home button to return to safety.';
  }
  return 'घबराएं नहीं! स्मार्टफोन चलाना बहुत आसान और सुरक्षित है। स्क्रीन पर हल्के हाथ से उंगली छुएं। यदि कोई गलत बटन दब भी जाए, तो नीचे दिए गए गोल (होम) बटन को दबाकर वापस आ सकते हैं।';
}

// POST /api/ai/ask
aiRouter.post('/ask', async (req: Request, res: Response): Promise<void> => {
  const { query, lang = 'hi', context } = req.body;

  if (!query || typeof query !== 'string' || !query.trim()) {
    res.status(400).json({ success: false, error: 'Query is required' });
    return;
  }

  const validLang = ['hi', 'mr', 'en'].includes(lang) ? (lang as 'hi' | 'mr' | 'en') : 'hi';
  const cleanQuery = query.trim();

  // If Gemini API Key is provided, use Google Gen AI
  if (config.geminiApiKey && config.geminiApiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
      const prompt = `${SYSTEM_PROMPT}\nUser language: ${validLang}\n${
        context ? `Screen Context: ${context}\n` : ''
      }\nUser Question: ${cleanQuery}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const replyText = response.text || '';
      if (replyText) {
        res.status(200).json({
          success: true,
          answer: replyText,
          source: 'gemini',
          language: validLang,
        });
        return;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini call failed, using graceful offline guide:', err.message);
    }
  }

  // Graceful offline fallback
  const fallbackAnswer = getOfflineFallbackAnswer(cleanQuery, validLang);
  res.status(200).json({
    success: true,
    answer: fallbackAnswer,
    source: 'offline_knowledge',
    language: validLang,
    note: config.geminiApiKey ? undefined : 'Add GEMINI_API_KEY in .env for custom live AI responses.',
  });
});
