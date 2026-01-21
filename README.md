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

What This System Does
DeepScan detects manipulated or AI-generated media using multiple forensic signals, not just a single neural network prediction.
It supports:
🖼️ Images (GAN / diffusion generated faces)
🎞️ Videos (frame-level analysis + robust aggregation)
🔊 Audio (voice synthesis detection)
Each prediction returns:
Probability (real vs fake)
Confidence score
A safe UNCERTAIN state when the model is unsure
🧠 Why “UNCERTAIN” Exists
Real forensic systems never force a binary answer.
DeepScan avoids dangerous false accusations by introducing an UNCERTAIN verdict when the evidence is inconclusive.
This is critical for:
Legal use cases
Journalism
Security & trust systems
Responsible AI deployment
🧩 System Architecture (How It Works)
User Upload
   │
   ▼
FastAPI Backend
   │
   ├── Image Analysis (CNN)
   ├── Video Frame Analysis
   ├── Audio Spectral Analysis
   ├── Probability Calibration
   └── Decision Engine
          ├── REAL
          ├── FAKE
          └── UNCERTAIN
🔍 Image Detection Pipeline
Image is resized & normalized
CNN extracts spatial artifacts
Model detects:
Texture inconsistencies
GAN artifacts
Synthetic patterns
Softmax probabilities are calibrated
Final verdict is produced using thresholds
Example logic:
if fake_prob >= 0.7:
    verdict = "FAKE"
elif fake_prob <= 0.3:
    verdict = "REAL"
else:
    verdict = "UNCERTAIN"
🎞️ Video Detection Pipeline
Videos are not classified as a whole.
Instead:
Frames are extracted every N frames
Each frame is analyzed independently
Only the most suspicious frames influence the result
Outliers are trimmed to avoid noise
Final probability is aggregated safely
This prevents:
Single bad frame → false fake
Motion blur false positives
🔊 Audio Detection Pipeline
Audio detection is based on spectral analysis, not speech content.
Audio converted to mono WAV
MFCC & frequency features extracted
Voice synthesis artifacts detected
Model predicts fake probability
Threshold-based verdict returned
📁 Project Structure
.
├── backend/
│   ├── app.py                # FastAPI server
│   ├── models/               # Image & audio models
│   ├── preprocessing/        # Image/audio loaders
│   ├── video/                # Frame extraction
│   └── audio/                # Audio inference
│
├── scripts/                   # Training & testing scripts
├── models/                    # Trained model weights
├── uploads/                   # Runtime uploads
├── temp_frames/               # Video frames
│
├── requirements.txt
├── runtime.txt
└── README.md
🛠️ Running Locally
1️⃣ Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
2️⃣ Install dependencies
pip install -r requirements.txt
3️⃣ Start backend
uvicorn backend.app:app --reload
API available at:
http://127.0.0.1:8000/docs
🔌 API Usage
POST /predict
Supports:
.jpg .png
.mp4 .avi
.wav
Example response
{
  "type": "image",
  "fake_probability": 78.32,
  "real_probability": 21.68,
  "verdict": "FAKE",
  "confidence": 56.64
}
🧪 Model Training
Image Dataset Structure
datasets/images/
├── real/
└── fake/
Train:
python -m scripts.train_image_model
Audio Dataset Structure
datasets/audio/
├── real/
└── fake/
Train:
python -m scripts.train_audio_model
🚀 Deployment (Render)
Service Type
Web Service
Build Command
pip install -r requirements.txt
Start Command
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
runtime.txt
python-3.11.9
⚠️ Important Deployment Notes
Render has no GPU
CPU-only PyTorch must be used
GPU torch will crash builds
UNCERTAIN results are expected & healthy
📊 Accuracy Expectations (Realistic)
Media	Good Accuracy
Images	85–92%
Video	80–90%
Audio	90%+
⚠️ 99% accuracy usually means overfitting
🧠 Key Design Principles
Never blindly accuse
Prefer uncertainty over false positives
Combine multiple signals
Calibrate confidence
Be explainable
Be responsible
🔮 Future Enhancements
Temporal CNNs (I3D / X3D)
Frequency-domain fusion
Grad-CAM heatmaps in UI
Ensemble image models
Cryptographic media fingerprinting
Blockchain authenticity proofs