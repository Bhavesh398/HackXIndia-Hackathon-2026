# Truefy: Deepfake Forensics Platform

End-to-end system to detect AI-generated media across images, videos, and audio. Combines a FastAPI + PyTorch backend with a modern Vite + React frontend.
Google drive video link = https://drive.google.com/drive/folders/1iV4w0_NE8Bz9H_0CYxqlBKkN0JYps9Km?usp=drive_link
## Architecture
- Backend: FastAPI service with image, video, and audio analysis. See BACKEND.
- Frontend: React UI to upload media and display analysis. See FRONTEND.
- Models & datasets: Stored under BACKEND/models and BACKEND/datasets.

## Quick Start (Windows)
1. Backend
   ```powershell
   cd BACKEND
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn backend.app:app --reload --host 127.0.0.1 --port 8000
   ```
2. Frontend
   ```powershell
   cd FRONTEND
   npm install
   npm run dev
   ```
3. Open the frontend URL (usually http://127.0.0.1:5173) and upload media.

## API Contract
POST /predict (multipart `file`)
```json
{
  "type": "image" | "video" | "audio",
  "fake_probability": number,   // 0-100
  "real_probability": number,   // 0-100
  "verdict": "FAKE" | "REAL" | "UNCERTAIN",
  "confidence": number          // 0-100
}
```

## Common Issues
- CORS: Backend must allow localhost:5173 (already configured).
- Missing models: Place .pth files in BACKEND/models.
- GPU/CPU: Backend auto-selects CUDA if available, else CPU.

## Project Goals
- Reliable local verification for media authenticity.
- Clear UI explaining probabilities and risk.
- Modular pipelines for image/video/audio.

For more details, read BACKEND/README.md and FRONTEND/README.md.


