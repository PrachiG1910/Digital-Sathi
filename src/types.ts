export type LanguageCode = 'hi' | 'mr' | 'en';

export type AppScreen =
  | 'intro_video'
  | 'logo_splash'
  | 'language_selection'
  | 'login'
  | 'home'
  | 'stage_detail'
  | 'practice'
  | 'safety_quiz'
  | 'profile';

export type MainTab = 'home' | 'learn' | 'practice' | 'safety' | 'profile';

export interface UserProfile {
  name: string;
  phone: string;
  language: LanguageCode;
  completedLessons: string[];
  completedPractices: string[];
  practiceScore: number;
  voiceRate: number; // 0.75 for gentle slow, 0.85 normal
  fontSize: 'normal' | 'large' | 'xlarge';
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  description: string;
  speechText: string;
  tip?: string;
  illustrationType:
    | 'phone_power'
    | 'battery_charging'
    | 'charging_port'
    | 'phone_buttons'
    | 'volume_buttons'
    | 'lock_screen'
    | 'touch_gesture'
    | 'phone_app_icon'
    | 'dial_pad'
    | 'contacts_list'
    | 'calling_screen'
    | 'end_call'
    | 'add_contact'
    | 'whatsapp_icon'
    | 'whatsapp_chats_list'
    | 'whatsapp_chat'
    | 'keyboard_lang'
    | 'keyboard_add_lang'
    | 'voice_message'
    | 'voice_message_record'
    | 'photo_send'
    | 'video_call'
    | 'video_call_active'
    | 'upi_qr'
    | 'upi_scanner_icon'
    | 'upi_amount'
    | 'upi_pin_safe'
    | 'upi_success'
    | 'upi_bank_sms_popup'
    | 'upi_fake_vs_real_sms'
    | 'scam_otp'
    | 'scam_fake_call'
    | 'youtube_search'
    | 'youtube_player'
    | 'youtube_subscribe'
    | 'whatsapp_status_music'
    | 'whatsapp_status_tab'
    | 'whatsapp_status_photo'
    | 'whatsapp_status_music_search'
    | 'whatsapp_status_send'
    | 'instagram_signin'
    | 'instagram_profile'
    | 'instagram_contacts'
    | 'instagram_reels'
    | 'instagram_requests'
    | 'instagram_post'
    | 'social_media'
    | 'flashlight'
    | 'emergency_call';
  warning?: string;
}

export interface Lesson {
  id: string;
  stageId: string;
  stageNumber: number;
  title: string;
  shortDesc: string;
  description?: string;
  iconName: string;
  youtubeQuery?: string;
  videoDuration?: string;
  steps: LessonStep[];
}

export interface Stage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  description?: string;
  icon: string;
  badge: string;
  lessons: Lesson[];
}

export interface SafetyQuizQuestion {
  id: string;
  scenario: string;
  speechText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface PracticeTask {
  id: string;
  title: string;
  instruction: string;
  speechText: string;
  targetApp: 'phone' | 'contacts' | 'whatsapp' | 'upi' | 'youtube' | 'settings' | 'incoming_call' | 'instagram' | 'emergency';
  stageNumber?: number;
  initialStep: number;
  totalSteps: number;
  stepsGuide: string[];
}
