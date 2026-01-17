import sys
import os

# Add BACKEND directory to path so imports work
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from backend.app import app
except ImportError as e:
    # Fallback: create a minimal app if import fails
    from fastapi import FastAPI
    app = FastAPI(title="Deepfake Forensics API")
    
    @app.get("/")
    def root():
        return {"message": "API is running (minimal mode)", "error": str(e)}
    
    @app.get("/health")
    def health():
        return {"status": "ok", "mode": "minimal"}
