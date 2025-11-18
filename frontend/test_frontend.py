#!/usr/bin/env python3
import webbrowser
import time
import requests

def test_frontend():
    print("🧪 Testing Nexus Finance AI Frontend...")
    
    # Wait for frontend to start
    time.sleep(3)
    
    # Test if frontend is running
    try:
        response = requests.get("http://localhost:3001", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running on http://localhost:3001")
            
            # Open browser automatically
            print("🌐 Opening browser...")
            webbrowser.open("http://localhost:3001")
            
        else:
            print(f"❌ Frontend returned status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend not accessible: {e}")
        print("💡 Make sure to run: npm run dev")

if __name__ == "__main__":
    test_frontend()
