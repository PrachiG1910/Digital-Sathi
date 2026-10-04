import { LanguageCode } from '../types';
import { apiUrl } from './api';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isSupported: boolean = false;
  private listeners: Set<(isSpeaking: boolean) => void> = new Set();
  private isCurrentlySpeaking: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private audioCtx: AudioContext | null = null;
  private voicesReady: Promise<void>;
  private speechSessionId: number = 0;

  constructor() {
    this.voicesReady = Promise.resolve();
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.isSupported = true;

        this.loadVoices();
        this.voicesReady = new Promise((resolve) => {
          if (this.voices.length > 0) return resolve();
          const done = () => { this.loadVoices(); resolve(); };
          window.speechSynthesis.addEventListener('voiceschanged', done, { once: true });
          setTimeout(done, 800);
        });
        if (typeof window.speechSynthesis.addEventListener === 'function') {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            this.loadVoices();
          });
        } else if ('onvoiceschanged' in window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = () => {
            this.loadVoices();
          };
        }
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    try {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    } catch {
      // Ignore
    }
  }

  // Plays a gentle, pleasant 2-tone audio chime (senior-friendly) to unlock audio and confirm action
  public playChime() {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  public subscribe(listener: (isSpeaking: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isCurrentlySpeaking);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(speaking: boolean) {
    this.isCurrentlySpeaking = speaking;
    this.listeners.forEach((fn) => fn(speaking));
  }

  public stop() {
    this.speechSessionId++;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = '';
        this.currentAudio = null;
      } catch {}
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }

    this.notify(false);
  }

  private hasNativeVoiceForLanguage(lang: LanguageCode): boolean {
    if (this.voices.length === 0) this.loadVoices();
    if (lang === 'mr') {
      return this.voices.some(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('mr') ||
          v.name.toLowerCase().includes('marathi') ||
          v.name.includes('मराठी')
      );
    }
    if (lang === 'hi') {
      return this.voices.some(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.toLowerCase().includes('lekha') ||
          v.name.toLowerCase().includes('neerja') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('madhur')
      );
    }
    return true;
  }

  // Find best available browser voice
  private getBestVoiceForLanguage(lang: LanguageCode): { voice: SpeechSynthesisVoice | null; targetLangTag: string } {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    const voices = this.voices;

    if (lang === 'mr') {
      const marathiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('mr') ||
          v.name.toLowerCase().includes('marathi') ||
          v.name.includes('मराठी')
      );
      if (marathiVoice) {
        return { voice: marathiVoice, targetLangTag: marathiVoice.lang || 'mr-IN' };
      }

      const hindiDevanagariVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.toLowerCase().includes('lekha') ||
          v.name.toLowerCase().includes('neerja') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('madhur')
      );
      if (hindiDevanagariVoice) {
        return { voice: hindiDevanagariVoice, targetLangTag: 'hi-IN' };
      }

      const indianVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').includes('en-in') ||
          v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('rishi') ||
          v.name.toLowerCase().includes('veena')
      );
      if (indianVoice) {
        return { voice: indianVoice, targetLangTag: 'hi-IN' };
      }

      const defaultVoice = voices.find((v) => v.default) || voices[0] || null;
      return { voice: defaultVoice, targetLangTag: 'hi-IN' };
    }

    if (lang === 'hi') {
      const hindiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.toLowerCase().includes('lekha') ||
          v.name.toLowerCase().includes('neerja') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('madhur')
      );
      if (hindiVoice) {
        return { voice: hindiVoice, targetLangTag: hindiVoice.lang || 'hi-IN' };
      }

      const marathiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('mr') ||
          v.name.toLowerCase().includes('marathi') ||
          v.name.includes('मराठी')
      );
      if (marathiVoice) {
        return { voice: marathiVoice, targetLangTag: 'mr-IN' };
      }

      const indianVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').includes('en-in') ||
          v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('rishi') ||
          v.name.toLowerCase().includes('veena')
      );
      if (indianVoice) {
        return { voice: indianVoice, targetLangTag: 'hi-IN' };
      }

      const defaultVoice = voices.find((v) => v.default) || voices[0] || null;
      return { voice: defaultVoice, targetLangTag: 'hi-IN' };
    }

    // Prioritize high quality English natural voices
    const englishVoice =
      voices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'en-in' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Neerja') || v.name.includes('Veena'))) ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-us') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Siri') || v.name.includes('Jenny') || v.name.includes('Guy') || v.name.includes('Ava'))) ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-gb') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Oliver') || v.name.includes('Serena'))) ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'en-in') ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-us')) ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-gb')) ||
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en')) ||
      voices.find((v) => v.name.toLowerCase().includes('english')) ||
      voices.find((v) => v.default) ||
      voices[0] ||
      null;

    return { voice: englishVoice, targetLangTag: englishVoice ? englishVoice.lang : 'en-US' };
  }

  private cleanForEnglish(text: string): string {
    return text
      .replace(/[\u0900-\u097F]+/g, ' ')
      .replace(/\s*\([^)]*[\u0900-\u097F][^)]*\)/g, ' ')
      .replace(/undefined/gi, '')
      .replace(/[^\w\s.,!?'"():;-]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  private splitIntoChunks(text: string, maxLength = 180): string[] {
    // Split on sentence boundaries and pauses
    const rawSentences = text.match(/[^.!?।;\n]+(?:[.!?।;\n]+|$)/g) || [text];
    const chunks: string[] = [];
    let current = '';

    for (const raw of rawSentences) {
      const sentence = raw.trim();
      if (!sentence) continue;

      if (!current) {
        current = sentence;
      } else if ((current + ' ' + sentence).length <= maxLength) {
        current = current + ' ' + sentence;
      } else {
        chunks.push(current);
        if (sentence.length <= maxLength) {
          current = sentence;
        } else {
          // If a single sentence exceeds maxLength, split by commas or words
          const subClauses = sentence.match(/[^,:\n]+(?:[,:\n]+|$)/g) || [sentence];
          current = '';
          for (const clause of subClauses) {
            const part = clause.trim();
            if (!part) continue;
            if (!current) {
              current = part;
            } else if ((current + ' ' + part).length <= maxLength) {
              current = current + ' ' + part;
            } else {
              chunks.push(current);
              current = part;
            }
          }
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length ? chunks : [text];
  }

  // Plays natural high-definition speech via online streaming audio with preloaded audio elements for seamless transitions
  private playOnlineAudioSpeech(chunks: string[], lang: LanguageCode, sessionId: number): Promise<boolean> {
    return new Promise((resolve) => {
      const targetLang = lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en';

      // Pre-create Audio objects for all chunks to preload audio data and eliminate gap latency
      const audioElements = chunks.map((chunk) => {
        const url = apiUrl(`/api/tts?lang=${encodeURIComponent(targetLang)}&text=${encodeURIComponent(chunk)}`);
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.volume = 1.0;
        return audio;
      });

      let currentIndex = 0;

      const playCurrent = () => {
        if (this.speechSessionId !== sessionId) {
          resolve(false);
          return;
        }

        if (currentIndex >= audioElements.length) {
          this.notify(false);
          resolve(true);
          return;
        }

        const audio = audioElements[currentIndex];
        this.currentAudio = audio;
        audio.volume = 1.0;
        // Native 1.0 playback rate preserves studio acoustics without browser time-stretch warble
        audio.playbackRate = 1.0;

        audio.onplay = () => {
          if (this.speechSessionId === sessionId) {
            this.notify(true);
          }
        };

        audio.onended = () => {
          if (this.speechSessionId === sessionId) {
            currentIndex++;
            playCurrent();
          }
        };

        audio.onerror = () => {
          // If network stream fails, fallback smoothly to browser WebSpeech synthesis
          resolve(false);
        };

        audio.play().catch(() => {
          resolve(false);
        });
      };

      playCurrent();
    });
  }

  // Web Speech API fallback
  private playBrowserSpeech(chunks: string[], lang: LanguageCode, rate: number, sessionId: number) {
    if (!this.synth) {
      this.notify(false);
      return;
    }

    if (this.voices.length === 0) this.loadVoices();
    const { voice, targetLangTag } = this.getBestVoiceForLanguage(lang);

    let chunkIndex = 0;

    const speakNext = () => {
      if (this.speechSessionId !== sessionId) return;

      if (!this.synth || chunkIndex >= chunks.length) {
        this.notify(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex++]);
      this.currentUtterance = utterance;

      if (typeof window !== 'undefined') {
        (window as unknown as { __dsUtterance: SpeechSynthesisUtterance }).__dsUtterance = utterance;
      }

      utterance.rate = Math.max(0.85, Math.min(1.0, rate || 0.92));
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || targetLangTag;
      } else {
        utterance.lang = targetLangTag;
      }

      utterance.onstart = () => {
        if (this.speechSessionId === sessionId) {
          this.notify(true);
        }
      };

      utterance.onend = () => {
        if (this.speechSessionId === sessionId) {
          setTimeout(speakNext, 20);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error:', e);
        this.notify(false);
      };

      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
        this.synth.speak(utterance);
      } catch (err) {
        console.error('Speech synthesis speak execution error:', err);
        this.notify(false);
      }
    };

    speakNext();
  }

  public async speak(text: string, lang: LanguageCode, rate: number = 0.92) {
    this.stop();
    const currentSession = ++this.speechSessionId;

    this.playChime();

    let cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[#*•]/g, ' ')
      .replace(/undefined/gi, '')
      .trim();

    if (lang === 'en') {
      cleanText = this.cleanForEnglish(cleanText);
    }

    if (!cleanText) return;

    const chunks = this.splitIntoChunks(cleanText);

    // Primary Engine: Studio-grade streaming HD audio for English, Hindi & Marathi
    if (typeof window !== 'undefined') {
      const streamSuccess = await this.playOnlineAudioSpeech(chunks, lang, currentSession);
      if (streamSuccess) {
        return;
      }
    }

    // Graceful Fallback: Web Speech API with top natural browser voices
    if (this.speechSessionId === currentSession) {
      await this.voicesReady;
      this.playBrowserSpeech(chunks, lang, rate, currentSession);
    }
  }

  public getSpeakingState(): boolean {
    return this.isCurrentlySpeaking;
  }

  public getVoicesList(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    return this.voices;
  }
}

export const speechService = new SpeechService();


