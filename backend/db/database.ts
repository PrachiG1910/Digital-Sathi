import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { DatabaseSchema, UserRecord, AlertRecord } from './types';

const defaultSchema: DatabaseSchema = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  users: {},
  alerts: [],
};

class Database {
  private schema: DatabaseSchema = defaultSchema;
  private isLoaded = false;
  private isWriting = false;
  private writePending = false;

  constructor() {
    this.ensureDataDirectory();
    this.load();
  }

  private ensureDataDirectory() {
    const dir = path.dirname(config.dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private load() {
    try {
      if (fs.existsSync(config.dbFilePath)) {
        const raw = fs.readFileSync(config.dbFilePath, 'utf-8');
        this.schema = JSON.parse(raw);
      } else {
        this.schema = { ...defaultSchema };
        this.saveSync();
      }
      this.isLoaded = true;
    } catch (error) {
      console.warn('[Database] Failed to read database file, initializing with empty state:', error);
      this.schema = { ...defaultSchema };
      this.saveSync();
      this.isLoaded = true;
    }
  }

  private saveSync() {
    try {
      this.schema.lastUpdated = new Date().toISOString();
      const tmpPath = `${config.dbFilePath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(this.schema, null, 2), 'utf-8');
      fs.renameSync(tmpPath, config.dbFilePath);
    } catch (error) {
      console.error('[Database] Failed to write database synchronously:', error);
    }
  }

  private async flush(): Promise<void> {
    if (this.isWriting) {
      this.writePending = true;
      return;
    }

    this.isWriting = true;
    try {
      this.schema.lastUpdated = new Date().toISOString();
      const tmpPath = `${config.dbFilePath}.tmp`;
      await fs.promises.writeFile(tmpPath, JSON.stringify(this.schema, null, 2), 'utf-8');
      await fs.promises.rename(tmpPath, config.dbFilePath);
    } catch (error) {
      console.error('[Database] Error saving database file:', error);
    } finally {
      this.isWriting = false;
      if (this.writePending) {
        this.writePending = false;
        await this.flush();
      }
    }
  }

  public async getUser(phone: string): Promise<UserRecord | null> {
    const cleanPhone = phone.trim();
    return this.schema.users[cleanPhone] || null;
  }

  public async createUser(data: {
    phone: string;
    name: string;
    language?: 'hi' | 'mr' | 'en';
    voiceRate?: number;
    fontSize?: 'normal' | 'large' | 'xlarge';
  }): Promise<UserRecord> {
    const cleanPhone = data.phone.trim();
    const now = new Date().toISOString();

    const existing = this.schema.users[cleanPhone];
    if (existing) {
      existing.name = data.name.trim() || existing.name;
      existing.language = data.language || existing.language;
      if (data.voiceRate !== undefined) existing.voiceRate = data.voiceRate;
      if (data.fontSize !== undefined) existing.fontSize = data.fontSize;
      existing.updatedAt = now;
      existing.lastLoginAt = now;
      await this.flush();
      return existing;
    }

    const newUser: UserRecord = {
      phone: cleanPhone,
      name: data.name.trim(),
      language: data.language || 'hi',
      completedLessons: [],
      completedPractices: [],
      practiceScore: 0,
      voiceRate: data.voiceRate ?? 0.85,
      fontSize: data.fontSize ?? 'large',
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };

    this.schema.users[cleanPhone] = newUser;
    await this.flush();
    return newUser;
  }

  public async updateUser(
    phone: string,
    updates: Partial<Omit<UserRecord, 'phone' | 'createdAt'>>
  ): Promise<UserRecord | null> {
    const cleanPhone = phone.trim();
    const user = this.schema.users[cleanPhone];
    if (!user) return null;

    if (updates.name !== undefined) user.name = updates.name.trim();
    if (updates.language !== undefined) user.language = updates.language;
    if (updates.voiceRate !== undefined) user.voiceRate = updates.voiceRate;
    if (updates.fontSize !== undefined) user.fontSize = updates.fontSize;
    if (updates.completedLessons !== undefined) user.completedLessons = updates.completedLessons;
    if (updates.completedPractices !== undefined) user.completedPractices = updates.completedPractices;
    if (updates.practiceScore !== undefined) {
      user.practiceScore = Math.min(100, Math.max(0, updates.practiceScore));
    }
    if (updates.lastLoginAt !== undefined) user.lastLoginAt = updates.lastLoginAt;

    user.updatedAt = new Date().toISOString();
    await this.flush();
    return user;
  }

  public async recordProgress(
    phone: string,
    data: {
      lessonId?: string;
      practiceId?: string;
      practiceScore?: number;
      addScore?: number;
    }
  ): Promise<UserRecord | null> {
    const cleanPhone = phone.trim();
    const user = this.schema.users[cleanPhone];
    if (!user) return null;

    if (data.lessonId && !user.completedLessons.includes(data.lessonId)) {
      user.completedLessons.push(data.lessonId);
    }

    if (data.practiceId && !user.completedPractices.includes(data.practiceId)) {
      user.completedPractices.push(data.practiceId);
    }

    if (data.practiceScore !== undefined) {
      user.practiceScore = Math.min(100, Math.max(0, data.practiceScore));
    } else if (data.addScore !== undefined) {
      user.practiceScore = Math.min(100, Math.max(0, user.practiceScore + data.addScore));
    }

    user.updatedAt = new Date().toISOString();
    await this.flush();
    return user;
  }

  public async deleteUser(phone: string): Promise<boolean> {
    const cleanPhone = phone.trim();
    if (!this.schema.users[cleanPhone]) return false;
    delete this.schema.users[cleanPhone];
    await this.flush();
    return true;
  }

  public async listUsers(): Promise<UserRecord[]> {
    return Object.values(this.schema.users).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  public async recordAlert(data: {
    phone: string;
    name: string;
    alertType: 'family_help' | 'emergency';
    message?: string;
  }): Promise<AlertRecord> {
    const record: AlertRecord = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      phone: data.phone.trim(),
      name: data.name.trim(),
      alertType: data.alertType,
      message: data.message,
      createdAt: new Date().toISOString(),
      status: 'sent',
    };

    this.schema.alerts.push(record);
    // Keep max 200 alerts
    if (this.schema.alerts.length > 200) {
      this.schema.alerts = this.schema.alerts.slice(-200);
    }

    await this.flush();
    return record;
  }

  public async getAlerts(phone?: string): Promise<AlertRecord[]> {
    if (phone) {
      const cleanPhone = phone.trim();
      return this.schema.alerts.filter((a) => a.phone === cleanPhone);
    }
    return [...this.schema.alerts].reverse();
  }
}

export const db = new Database();
