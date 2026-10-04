import fs from 'fs';
import { getDB } from './mongodb';
import { config } from '../config';
import { UserRecord, AlertRecord, DatabaseSchema } from './types';

class Database {
  private get usersCollection() {
    return getDB().collection<UserRecord>('users');
  }

  private get alertsCollection() {
    return getDB().collection<AlertRecord>('alerts');
  }

  /**
   * Migrate any legacy file data from ds_database.json into MongoDB if not already present.
   */
  public async migrateLegacyData(): Promise<void> {
    try {
      if (!fs.existsSync(config.dbFilePath)) {
        return;
      }

      const raw = fs.readFileSync(config.dbFilePath, 'utf-8');
      const schema: DatabaseSchema = JSON.parse(raw);

      if (schema.users && typeof schema.users === 'object') {
        const legacyUsers = Object.values(schema.users);
        for (const user of legacyUsers) {
          if (!user || !user.phone) continue;
          const cleanPhone = user.phone.trim();
          const existing = await this.usersCollection.findOne({ phone: cleanPhone });
          if (!existing) {
            await this.usersCollection.insertOne({
              phone: cleanPhone,
              name: user.name || 'Learner',
              language: user.language || 'hi',
              completedLessons: user.completedLessons || [],
              completedPractices: user.completedPractices || [],
              practiceScore: typeof user.practiceScore === 'number' ? user.practiceScore : 0,
              voiceRate: typeof user.voiceRate === 'number' ? user.voiceRate : 0.85,
              fontSize: user.fontSize || 'large',
              createdAt: user.createdAt || new Date().toISOString(),
              updatedAt: user.updatedAt || new Date().toISOString(),
              lastLoginAt: user.lastLoginAt || new Date().toISOString(),
            });
            console.log(`[Migration] Migrated legacy user ${cleanPhone} (${user.name}) to MongoDB`);
          }
        }
      }

      if (Array.isArray(schema.alerts)) {
        for (const alert of schema.alerts) {
          if (!alert || !alert.id) continue;
          const existing = await this.alertsCollection.findOne({ id: alert.id });
          if (!existing) {
            await this.alertsCollection.insertOne({
              id: alert.id,
              phone: alert.phone || 'NotProvided',
              name: alert.name || 'Learner',
              alertType: alert.alertType || 'family_help',
              message: alert.message,
              createdAt: alert.createdAt || new Date().toISOString(),
              status: alert.status || 'sent',
            });
          }
        }
      }

      console.log('✅ Legacy data check and migration to MongoDB complete.');
    } catch (error) {
      console.warn('[Migration] Note: Legacy migration skipped or not needed:', error);
    }
  }

  public async getUser(phone: string): Promise<UserRecord | null> {
    const cleanPhone = phone.trim();
    const doc = await this.usersCollection.findOne(
      { phone: cleanPhone },
      { projection: { _id: 0 } }
    );
    return doc || null;
  }

  public async createUser(data: {
    phone: string;
    name: string;
    language?: 'hi' | 'mr' | 'en';
    voiceRate?: number;
    fontSize?: 'normal' | 'large' | 'xlarge';
  }): Promise<UserRecord> {
    const cleanPhone = data.phone.trim();
    const cleanName = data.name.trim();
    const now = new Date().toISOString();

    const existing = await this.getUser(cleanPhone);
    if (existing) {
      const updatedName = cleanName || existing.name;
      const updatedLanguage = data.language || existing.language;
      const updatedVoiceRate = data.voiceRate !== undefined ? data.voiceRate : existing.voiceRate;
      const updatedFontSize = data.fontSize !== undefined ? data.fontSize : existing.fontSize;

      const updated = await this.usersCollection.findOneAndUpdate(
        { phone: cleanPhone },
        {
          $set: {
            name: updatedName,
            language: updatedLanguage,
            voiceRate: updatedVoiceRate,
            fontSize: updatedFontSize,
            updatedAt: now,
            lastLoginAt: now,
          },
        },
        { returnDocument: 'after', projection: { _id: 0 } }
      );

      return updated || {
        ...existing,
        name: updatedName,
        language: updatedLanguage,
        voiceRate: updatedVoiceRate,
        fontSize: updatedFontSize,
        updatedAt: now,
        lastLoginAt: now,
      };
    }

    const newUser: UserRecord = {
      phone: cleanPhone,
      name: cleanName,
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

    await this.usersCollection.insertOne({ ...newUser });
    return newUser;
  }

  public async updateUser(
    phone: string,
    updates: Partial<Omit<UserRecord, 'phone' | 'createdAt'>>
  ): Promise<UserRecord | null> {
    const cleanPhone = phone.trim();
    const now = new Date().toISOString();

    const setFields: Record<string, any> = { updatedAt: now };

    if (updates.name !== undefined) setFields.name = updates.name.trim();
    if (updates.language !== undefined) setFields.language = updates.language;
    if (updates.voiceRate !== undefined) setFields.voiceRate = updates.voiceRate;
    if (updates.fontSize !== undefined) setFields.fontSize = updates.fontSize;
    if (updates.completedLessons !== undefined) setFields.completedLessons = updates.completedLessons;
    if (updates.completedPractices !== undefined) setFields.completedPractices = updates.completedPractices;
    if (updates.practiceScore !== undefined) {
      setFields.practiceScore = Math.min(100, Math.max(0, updates.practiceScore));
    }
    if (updates.lastLoginAt !== undefined) setFields.lastLoginAt = updates.lastLoginAt;

    const result = await this.usersCollection.findOneAndUpdate(
      { phone: cleanPhone },
      { $set: setFields },
      { returnDocument: 'after', projection: { _id: 0 } }
    );

    return result || null;
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
    const user = await this.getUser(cleanPhone);
    if (!user) return null;

    const updateOps: Record<string, any> = {
      $set: { updatedAt: new Date().toISOString() },
    };

    if (data.lessonId) {
      updateOps.$addToSet = { ...updateOps.$addToSet, completedLessons: data.lessonId };
    }

    if (data.practiceId) {
      updateOps.$addToSet = { ...updateOps.$addToSet, completedPractices: data.practiceId };
    }

    if (data.practiceScore !== undefined) {
      updateOps.$set.practiceScore = Math.min(100, Math.max(0, data.practiceScore));
    } else if (data.addScore !== undefined) {
      updateOps.$set.practiceScore = Math.min(100, Math.max(0, user.practiceScore + data.addScore));
    }

    const result = await this.usersCollection.findOneAndUpdate(
      { phone: cleanPhone },
      updateOps,
      { returnDocument: 'after', projection: { _id: 0 } }
    );

    return result || null;
  }

  public async deleteUser(phone: string): Promise<boolean> {
    const cleanPhone = phone.trim();
    const res = await this.usersCollection.deleteOne({ phone: cleanPhone });
    return res.deletedCount > 0;
  }

  public async listUsers(): Promise<UserRecord[]> {
    const users = await this.usersCollection
      .find({}, { projection: { _id: 0 } })
      .sort({ updatedAt: -1 })
      .toArray();

    return users;
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

    await this.alertsCollection.insertOne({ ...record });
    return record;
  }

  public async getAlerts(phone?: string): Promise<AlertRecord[]> {
    const filter = phone ? { phone: phone.trim() } : {};
    const alerts = await this.alertsCollection
      .find(filter, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return alerts;
  }
}

export const db = new Database();
