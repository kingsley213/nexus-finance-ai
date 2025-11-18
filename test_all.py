#!/usr/bin/env python3
import requests
import time
import webbrowser

def test_backend():
    print("🧪 Testing Backend API...")
    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✅ Backend is running")
            return True
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        return False

def test_frontend():
    print("🧪 Testing Frontend...")
    try:
        response = requests.get("http://localhost:3001", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend is running")
            return True
        else:
            print(f"❌ Frontend returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend not accessible: {e}")
        return False

def main():
    print("🚀 Starting Comprehensive Test...")
    
    # Test backend
    if not test_backend():
        print("💡 Start the backend with: cd backend && python run.py")
        return
    
    # Test frontend
    if not test_frontend():
        print("💡 Start the frontend with: cd frontend && npm run dev")
        return
    
    print("🎉 All systems are operational!")
    print("🌐 Opening application in browser...")
    
    # Open the application
    webbrowser.open("http://localhost:3001")
    
    print("\n📚 Available URLs:")
    print("   Application: http://localhost:3001")
    print("   API Docs: http://localhost:8000/docs")
    print("   Backend: http://localhost:8000")

if __name__ == "__main__":
    main()
