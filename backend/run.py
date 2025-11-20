#!/usr/bin/env python3
import uvicorn
from main import app

if __name__ == "__main__":
    print("[*] Starting Nexus Finance AI Backend...")
    print("[*] ML Model: Initializing...")
    print("[*] Database: Initializing...")
    print("[*] API: Starting on http://localhost:8000")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
