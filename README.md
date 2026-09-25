# Digital Sathi — tested/fixed prototype

Digital Sathi is a senior-friendly digital literacy web app for Hindi, Marathi and Simple English.

## Fixes in this version

- Removed the fake/default personal profile and fake phone number.
- Added 10-digit Indian mobile validation.
- Added a local IndexedDB profile database with localStorage fallback.
- Existing-user login now checks the saved local profile.
- Progress and practice score are persisted and the score is capped at 100.
- English curriculum is normalized so lesson/practice content does not fall back to Hindi-only text.
- Speech waits for browser voices to load before speaking.
- Marathi speech no longer silently falls back to a Hindi voice.
- YouTube lesson UI now honestly opens a YouTube search instead of pretending a search result is an embedded video.
- Removed a duplicate intro-video asset.
- Removed the duplicate Vite dependency entry.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

For a production build:

```bash
npm run build
npm run preview
```

## Important limitation

The profile database in this build is a **local browser database (IndexedDB)**. It is not a cloud database and does not sync users between devices. A cloud backend such as Supabase/Firebase/MySQL + API can be added later if teacher/admin multi-device accounts are required.
