import { Router, Request, Response } from 'express';

export const ttsRouter = Router();

// In-memory audio buffer cache (URL query -> Buffer)
const audioCache = new Map<string, Buffer>();
const MAX_CACHE_SIZE = 150;

// GET /api/tts?lang=hi&text=...
ttsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const text = (req.query.text as string || '').trim();
    const lang = (req.query.lang as string || 'hi').trim();

    if (!text) {
      res.status(400).send('Missing text query parameter');
      return;
    }

    const cacheKey = `${lang}:${text}`;
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('X-Cache', 'HIT');
      res.end(cached);
      return;
    }

    const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(
      lang
    )}&client=tw-ob&q=${encodeURIComponent(text)}`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      res.status(response.status).send('TTS upstream audio service error');
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to cache
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, buffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Cache', 'MISS');
    res.end(buffer);
  } catch (error: any) {
    console.error('[TTS Error]', error);
    res.status(500).send('Failed to fetch TTS audio');
  }
});
