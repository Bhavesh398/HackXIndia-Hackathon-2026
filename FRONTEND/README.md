
# Truefy Frontend (Vite + React + TypeScript)

Modern UI for uploading media and viewing deepfake analysis. Connects to the local FastAPI backend.

## Tech Stack
- Vite, React, TypeScript
- Tailwind CSS, shadcn/ui

## Setup (Windows)
1. Open a terminal in the `FRONTEND` folder.
2. Install Node dependencies:

```powershell
npm install
```

3. Configure backend URL (optional):
- Default is `http://127.0.0.1:8000` from `src/config/api.ts`.
- To override, create `.env` and set:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Run
Start the dev server:

```powershell
npm run dev
```

Open the printed local URL (usually `http://127.0.0.1:5173`).

## Usage
- Click Upload to select image/video/audio
- Press Analyze to send to backend `POST /predict`
- See verdict, fake probability, and confidence in the dashboard

## Backend Contract
Frontend expects the FastAPI response:

```json
{
  "type": "image" | "video" | "audio",
  "fake_probability": number,   // 0-100
  "real_probability": number,   // 0-100
  "verdict": "FAKE" | "REAL" | "UNCERTAIN",
  "confidence": number          // 0-100
}
```

## Troubleshooting
- CORS: ensure backend has `CORSMiddleware` allowing `localhost:5173`.
- Network errors: confirm backend is running and reachable.
- If probabilities look inverted, verify the backend `verdict` and `fake_probability` fields.

