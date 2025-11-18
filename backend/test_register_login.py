import requests

API_URL = "http://127.0.0.1:8000/api/v1"

# Test user details
email = "testuser@example.com"
password = "TestPassword123"
full_name = "Test User"
phone_number = "1234567890"

# Register user
register_payload = {
    "email": email,
    "password": password,
    "full_name": full_name,
    "phone_number": phone_number
}
print("Registering user...")
reg_response = requests.post(f"{API_URL}/register", json=register_payload)
print("Register response:", reg_response.status_code, reg_response.json())

# Login user
login_payload = {
    "email": email,
    "password": password
}
print("Logging in user...")
login_response = requests.post(f"{API_URL}/login", json=login_payload)
print("Login response:", login_response.status_code, login_response.json())
