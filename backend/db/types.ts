export type LanguageCode = 'hi' | 'mr' | 'en';

export interface UserRecord {
  id?: string;
  phone: string;
  name: string;
  language: LanguageCode;
  completedLessons: string[];
  completedPractices: string[];
  practiceScore: number;
  voiceRate: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface AlertRecord {
  id: string;
  phone: string;
  name: string;
  alertType: 'family_help' | 'emergency';
  message?: string;
  createdAt: string;
  status: 'sent' | 'pending';
}

export interface DatabaseSchema {
  version: number;
  lastUpdated: string;
  users: Record<string, UserRecord>;
  alerts: AlertRecord[];
}
