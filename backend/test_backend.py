import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_backend():
    print("🧪 Testing Nexus Finance AI Backend...")
    
    # Test health endpoint
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Backend not running: {e}")
        return
    
    # Test registration
    test_user = {
        "email": "test@nexusfinance.ai",
        "password": "testpassword123",
        "full_name": "Test User",
        "phone_number": "+263771234567"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", params=test_user)
        if response.status_code == 200:
            print("✅ User registration: SUCCESS")
            user_data = response.json()
            token = user_data['access_token']
        else:
            print(f"ℹ️ User may already exist, trying login...")
            response = requests.post(f"{BASE_URL}/login", params={
                "email": test_user["email"],
                "password": test_user["password"]
            })
            if response.status_code == 200:
                user_data = response.json()
                token = user_data['access_token']
                print("✅ User login: SUCCESS")
            else:
                print(f"❌ Authentication failed: {response.status_code}")
                return
    except Exception as e:
        print(f"❌ Authentication test failed: {e}")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test accounts endpoint
    try:
        response = requests.get(f"{BASE_URL}/accounts", headers=headers)
        if response.status_code == 200:
            accounts = response.json()
            print(f"✅ Accounts retrieval: SUCCESS ({len(accounts)} accounts)")
        else:
            print(f"❌ Accounts retrieval failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Accounts test failed: {e}")
    
    # Test transaction creation
    test_transaction = {
        "description": "OK Zimbabwe Groceries",
        "amount": -45.50,
        "account_id": 1,
        "currency": "USD"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/transactions", params=test_transaction, headers=headers)
        if response.status_code == 200:
            transaction_data = response.json()
            print(f"✅ Transaction creation: SUCCESS - Category: {transaction_data['transaction']['category']}")
        else:
            print(f"❌ Transaction creation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Transaction test failed: {e}")
    
    # Test analytics
    try:
        response = requests.get(f"{BASE_URL}/analytics/spending-insights", headers=headers)
        if response.status_code == 200:
            insights = response.json()
            print(f"✅ Analytics: SUCCESS - Net Cash Flow: ${insights.get('net_cash_flow', 0):.2f}")
        else:
            print(f"❌ Analytics failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Analytics test failed: {e}")
    
    # Test ML prediction
    try:
        response = requests.get(f"{BASE_URL}/ml/predict-category", params={"description": "EcoCash Agent Payment"}, headers=headers)
        if response.status_code == 200:
            prediction = response.json()
            print(f"✅ ML Prediction: SUCCESS - {prediction['category']} (confidence: {prediction['confidence']:.2f})")
        else:
            print(f"❌ ML prediction failed: {response.status_code}")
    except Exception as e:
        print(f"❌ ML test failed: {e}")
    
    print("\n🎉 Backend testing completed!")

if __name__ == "__main__":
    test_backend()
