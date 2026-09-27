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

## Backend Architecture & Fullstack Setup

This version features a dedicated **Node.js + Express + TypeScript** backend server located in the `backend/` directory and client code in `frontend/`:

- **Offline-First & Cloud Synchronization**: User profiles, progress, and safety scores are persisted in both local browser storage (IndexedDB/localStorage) and synchronized to the backend database (`data/ds_database.json`).
- **RESTful API**:
  - `POST /api/auth/register`: 10-digit Indian phone validated learner registration.
  - `POST /api/auth/login`: Learner login with phone validation.
  - `GET /api/users/:phone`: Fetch user profile and progress.
  - `PUT /api/users/:phone`: Update profile (voice speed, font size, language).
  - `POST /api/users/:phone/progress`: Mark lesson/practice completion and cap score at 100.
  - `GET /api/users`: Admin/instructor view of all learners and statistics.
  - `GET /api/tts`: Streaming proxy for natural Hindi, Marathi, and English voice synthesis with caching.
  - `GET /api/curriculum`: Localized stages, lessons, and safety quiz questions.
  - `POST /api/ai/ask`: Digital Sathi AI guide (integrating Google Gemini with empathetic, senior-friendly offline fallback).
  - `POST /api/help/alert`: Emergency and family assistance notifications.

## Run Locally

### 1. Run the Backend Server
```bash
npm run server
# or in watch mode during development:
npm run server:watch
```
The backend starts on `http://localhost:5001`.

### 2. Run the Frontend (Vite Dev Server)
```bash
npm run dev
```
Open `http://localhost:3000` in the browser. Requests to `/api/*` are automatically proxied to the backend on port 5001.

### 3. Run Unified Production Server
```bash
npm run build
npm start
```
This runs the fullstack app (serving both static frontend and API) from a single port at `http://localhost:5001`.
