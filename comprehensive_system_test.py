import requests
import json
from datetime import datetime, timedelta
import random

BASE_URL = "http://localhost:8000/api/v1"

# Color codes for output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_section(title):
    print(f"\n{BOLD}{BLUE}{'='*80}{RESET}")
    print(f"{BOLD}{BLUE}{title.center(80)}{RESET}")
    print(f"{BOLD}{BLUE}{'='*80}{RESET}\n")

def print_success(msg):
    print(f"{GREEN}[+] {msg}{RESET}")

def print_error(msg):
    print(f"{RED}[-] {msg}{RESET}")

def print_info(msg):
    print(f"{YELLOW}[*] {msg}{RESET}")

def test_comprehensive():
    """Comprehensive test of all NexusFinance features"""
    
    print_section("NEXUS FINANCE AI - COMPREHENSIVE SYSTEM TEST")
    
    # Setup: Create test account
    print_info("Setting up test account")
    test_user = {
        "email": f"tester_{random.randint(10000, 99999)}@test.com",
        "password": "TestPass123!",
        "full_name": "System Test User"
    }
    
    # Step 1: Register account
    print_section("STEP 1: User Registration & Authentication")
    try:
        response = requests.post(f"{BASE_URL}/register", json=test_user)
        if response.status_code == 200:
            print_success(f"Account created: {test_user['email']}")
        elif response.status_code == 400:
            print_info(f"Account already exists, will use existing")
        else:
            print_error(f"Registration failed: {response.text}")
            return
    except Exception as e:
        print_error(f"Registration error: {e}")
        return
    
    # Step 2: Login
    print_info("Logging in...")
    try:
        response = requests.post(f"{BASE_URL}/login", json={
            "email": test_user["email"],
            "password": test_user["password"]
        })
        if response.status_code == 200:
            token_data = response.json()
            token = token_data['access_token']
            headers = {"Authorization": f"Bearer {token}"}
            print_success(f"Login successful for {test_user['email']}")
        else:
            print_error(f"Login failed: {response.text}")
            return
    except Exception as e:
        print_error(f"Login error: {e}")
        return
    
    # Step 2: Get existing accounts
    print_section("STEP 2: Retrieve User Accounts")
    try:
        response = requests.get(f"{BASE_URL}/accounts", headers=headers)
        if response.status_code == 200:
            accounts = response.json()
            if isinstance(accounts, list) and len(accounts) > 0:
                print_success(f"Retrieved {len(accounts)} accounts")
                account_id = accounts[0].get('id') or 1
                for acc in accounts[:3]:
                    balance = acc.get('balance', 'N/A')
                    acct_name = acc.get('name', 'Unknown')
                    print(f"   - {acct_name}: ${balance}")
            else:
                print_error("No accounts found")
                return
        else:
            print_error(f"Failed to retrieve accounts: {response.status_code}")
            return
    except Exception as e:
        print_error(f"Error retrieving accounts: {e}")
        return
    
    # Step 3: Test Transactions
    print_section("STEP 3: Test Transaction Management")
    
    transaction_payloads = [
        {"description": "Pick n Pay groceries", "amount": 45.50, "currency": "USD"},
        {"description": "Shell fuel station", "amount": 35.00, "currency": "USD"},
        {"description": "Netflix subscription", "amount": 9.99, "currency": "USD"},
        {"description": "ZESA electricity bill", "amount": 120.00, "currency": "USD"},
        {"description": "Restaurant dinner", "amount": 28.75, "currency": "USD"},
    ]
    
    transactions_added = 0
    for trans in transaction_payloads:
        params = {
            "account_id": account_id,
            "description": trans["description"],
            "amount": trans["amount"],
            "currency": trans["currency"]
        }
        try:
            response = requests.post(f"{BASE_URL}/transactions", params=params, headers=headers)
            if response.status_code == 200:
                result = response.json()
                category = result.get('category', 'Uncategorized')
                print_success(f"Added: {trans['description'][:30]} (${trans['amount']}) - Category: {category}")
                transactions_added += 1
            else:
                print_error(f"Failed to add {trans['description']}: {response.status_code}")
                if response.status_code != 200:
                    print(f"   Response: {response.text[:150]}")
        except Exception as e:
            print_error(f"Error adding {trans['description']}: {str(e)[:100]}")
    
    print_info(f"Total transactions added: {transactions_added}/5")
    
    # Step 4: Test Budgets
    print_section("STEP 4: Test Budget Management")
    
    budget_payloads = [
        {"category": "Groceries", "amount": 500},
        {"category": "Fuel", "amount": 300},
        {"category": "Entertainment", "amount": 200},
    ]
    
    budgets_added = 0
    for budget in budget_payloads:
        params = {
            "category": budget["category"],
            "amount": budget["amount"]
        }
        try:
            response = requests.post(f"{BASE_URL}/budgets", params=params, headers=headers)
            if response.status_code == 200:
                print_success(f"Created budget: {budget['category']} - ${budget['amount']}/month")
                budgets_added += 1
            else:
                print_error(f"Failed to create {budget['category']} budget: {response.status_code}")
                print(f"   Response: {response.text[:150]}")
        except Exception as e:
            print_error(f"Error creating {budget['category']} budget: {str(e)[:100]}")
    
    print_info(f"Total budgets created: {budgets_added}/3")
    
    # Step 5: Test Financial Goals
    print_section("STEP 5: Test Financial Goals")
    
    goal_payloads = [
        {"title": "Emergency Fund", "target_amount": 5000, "deadline": "2025-12-31", "currency": "USD"},
        {"title": "Vacation Savings", "target_amount": 2000, "deadline": "2025-07-31", "currency": "USD"},
        {"title": "Home Upgrade", "target_amount": 10000, "deadline": "2026-12-31", "currency": "USD"},
    ]
    
    goals_added = 0
    for goal in goal_payloads:
        params = {
            "title": goal["title"],
            "target_amount": goal["target_amount"],
            "deadline": goal["deadline"],
            "currency": goal["currency"]
        }
        try:
            response = requests.post(f"{BASE_URL}/goals", params=params, headers=headers)
            if response.status_code == 200:
                print_success(f"Created goal: {goal['title']} - Target: ${goal['target_amount']}")
                goals_added += 1
            else:
                print_error(f"Failed to create {goal['title']} goal: {response.status_code}")
                print(f"   Response: {response.text[:150]}")
        except Exception as e:
            print_error(f"Error creating {goal['title']} goal: {str(e)[:100]}")
    
    print_info(f"Total goals created: {goals_added}/3")
    
    # Step 6: Test Investments
    print_section("STEP 6: Test Investment Tracking")
    
    investment_payloads = [
        {"name": "Apple Inc", "type": "Stock", "quantity": 10, "purchase_price": 150, "amount_invested": 1500},
        {"name": "Bitcoin", "type": "Cryptocurrency", "quantity": 0.5, "purchase_price": 40000, "amount_invested": 20000},
        {"name": "ZSE Index", "type": "Fund", "quantity": 100, "purchase_price": 25, "amount_invested": 2500},
    ]
    
    investments_added = 0
    for inv in investment_payloads:
        # Calculate current value with random variance
        current_price = inv["purchase_price"] * random.uniform(0.95, 1.15)
        current_value = inv["quantity"] * current_price
        
        params = {
            "name": inv["name"],
            "investment_type": inv["type"],
            "quantity": inv["quantity"],
            "purchase_price": inv["purchase_price"],
            "amount_invested": inv["amount_invested"],
            "current_value": current_value
        }
        try:
            response = requests.post(f"{BASE_URL}/investments", params=params, headers=headers)
            if response.status_code == 200:
                print_success(f"Added investment: {inv['name']} ({inv['type']}) - {inv['quantity']} units")
                investments_added += 1
            else:
                print_error(f"Failed to add {inv['name']}: {response.status_code}")
                print(f"   Response: {response.text[:150]}")
        except Exception as e:
            print_error(f"Error adding {inv['name']}: {str(e)[:100]}")
    
    print_info(f"Total investments added: {investments_added}/3")
    
    # Step 7: Test Analytics
    print_section("STEP 7: Test Analytics & Insights")
    
    analytics_endpoints = [
        ("Spending Insights", "/analytics/spending-insights"),
        ("Cash Flow Forecast", "/analytics/cash-flow-forecast"),
        ("Financial Health", "/analytics/financial-health"),
    ]
    
    analytics_retrieved = 0
    for endpoint_name, endpoint_path in analytics_endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint_path}", headers=headers)
            if response.status_code == 200:
                data = response.json()
                print_success(f"Retrieved {endpoint_name}")
                # Show sample data
                if isinstance(data, dict):
                    for key, value in list(data.items())[:2]:
                        print(f"   - {key}: {str(value)[:50]}...")
                analytics_retrieved += 1
            else:
                print_error(f"Failed to retrieve {endpoint_name}: {response.status_code}")
        except Exception as e:
            print_error(f"Error retrieving {endpoint_name}: {str(e)[:100]}")
    
    print_info(f"Total analytics endpoints accessible: {analytics_retrieved}/3")
    
    # Step 8: Get Dashboard Summary
    print_section("STEP 8: Dashboard Summary")
    
    try:
        # Get all data for summary
        accounts_resp = requests.get(f"{BASE_URL}/accounts", headers=headers)
        transactions_resp = requests.get(f"{BASE_URL}/transactions", headers=headers)
        budgets_resp = requests.get(f"{BASE_URL}/budgets", headers=headers)
        goals_resp = requests.get(f"{BASE_URL}/goals", headers=headers)
        
        accounts_count = len(accounts_resp.json()) if accounts_resp.status_code == 200 else 0
        transactions_count = len(transactions_resp.json()) if transactions_resp.status_code == 200 else 0
        budgets_count = len(budgets_resp.json()) if budgets_resp.status_code == 200 else 0
        goals_count = len(goals_resp.json()) if goals_resp.status_code == 200 else 0
        
        print_success("Dashboard Data Retrieved:")
        print(f"   - Total Accounts: {accounts_count}")
        print(f"   - Total Transactions: {transactions_count}")
        print(f"   - Active Budgets: {budgets_count}")
        print(f"   - Financial Goals: {goals_count}")
        
    except Exception as e:
        print_error(f"Error retrieving dashboard data: {e}")
    
    # Final Summary
    print_section("TEST SUMMARY")
    
    total_passed = sum([
        1 if transactions_added > 0 else 0,
        1 if budgets_added > 0 else 0,
        1 if goals_added > 0 else 0,
        1 if investments_added > 0 else 0,
        1 if analytics_retrieved > 0 else 0,
    ])
    
    print(f"{BOLD}RESULTS:{RESET}")
    print(f"  {GREEN}[+] Authentication: PASSED{RESET}")
    print(f"  {GREEN}[+] Account Retrieval: PASSED{RESET}")
    print(f"  {'[+] Transactions: PASSED' if transactions_added > 0 else '[!] Transactions: FAILED'} ({transactions_added}/5)")
    print(f"  {'[+] Budgets: PASSED' if budgets_added > 0 else '[!] Budgets: FAILED'} ({budgets_added}/3)")
    print(f"  {'[+] Goals: PASSED' if goals_added > 0 else '[!] Goals: FAILED'} ({goals_added}/3)")
    print(f"  {'[+] Investments: PASSED' if investments_added > 0 else '[!] Investments: FAILED'} ({investments_added}/3)")
    print(f"  {'[+] Analytics: PASSED' if analytics_retrieved > 0 else '[!] Analytics: FAILED'} ({analytics_retrieved}/3)")
    
    print(f"\n{BOLD}OVERALL: {total_passed}/5 feature groups working{RESET}")
    
    if total_passed >= 4:
        print(f"{GREEN}{BOLD}[+] System is MOSTLY FUNCTIONAL!{RESET}")
    elif total_passed >= 2:
        print(f"{YELLOW}{BOLD}[*] System has PARTIAL functionality - some features need fixes{RESET}")
    else:
        print(f"{RED}{BOLD}[-] System needs significant work{RESET}")
    
    print_section("END OF TEST")

if __name__ == "__main__":
    test_comprehensive()
