"""
Complete Seed Data Generator - Creates 6 Months of Sample Data
Run this to populate database with realistic demonstration data
"""

import random
from datetime import datetime, timedelta
from models import SessionLocal, User, Account, Transaction, FinancialGoal, Budget, Investment
from seed_data_generator import create_sample_users, create_accounts, ZIMBABWE_MERCHANTS

def generate_transactions(db, user, accounts, profile, months=6):
    """Generate realistic transactions for specified months"""
    
    income_map = {
        "mid_career": (1200, 1800),
        "entrepreneur": (2500, 5000),
        "young_pro": (600, 1000),
        "family": (1800, 2500),
        "investor": (4000, 8000)
    }
    
    income_range = income_map.get(profile, (1000, 2000))
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=months * 30)
    
    transactions = []
    bank_acc = next((a for a in accounts if a.account_type == "bank"), accounts[0])
    mobile_acc = next((a for a in accounts if a.account_type == "mobile_money"), accounts[0])
    cash_acc = next((a for a in accounts if a.account_type == "cash"), accounts[0]) if len(accounts) > 2 else mobile_acc
    
    # Monthly salary
    current = start_date
    while current <= end_date:
        if current.day == 25:
            salary = random.uniform(*income_range)
            transactions.append(Transaction(
                user_id=user.id,
                account_id=bank_acc.id,
                amount=round(salary, 2),
                description=f"Salary - {current.strftime('%B %Y')}",
                merchant="Employer",
                category="income",
                subcategory="salary",
                currency="USD",
                transaction_date=current.replace(hour=9, minute=0)
            ))
        current += timedelta(days=1)
    
    # Monthly rent
    current = start_date
    rent_amount = random.uniform(300, 700)
    while current <= end_date:
        if current.day == 1:
            transactions.append(Transaction(
                user_id=user.id,
                account_id=bank_acc.id,
                amount=-round(rent_amount, 2),
                description="Rent Payment",
                merchant="Landlord",
                category="housing",
                subcategory="rent",
                currency="USD",
                transaction_date=current.replace(hour=8, minute=30)
            ))
        current += timedelta(days=1)
    
    # Utilities (monthly)
    current = start_date
    while current <= end_date:
        if current.day == 5:
            for util in ["ZESA", "City Council", "NetOne"]:
                amt = random.uniform(30, 90)
                transactions.append(Transaction(
                    user_id=user.id,
                    account_id=bank_acc.id,
                    amount=-round(amt, 2),
                    description=f"{util} Bill",
                    merchant=util,
                    category="utilities",
                    currency="USD",
                    transaction_date=current.replace(hour=10, minute=random.randint(0, 59))
                ))
        current += timedelta(days=1)
    
    # Weekly groceries
    current = start_date
    while current <= end_date:
        if current.weekday() == 5:  # Saturday
            amt = random.uniform(70, 180)
            merchant = random.choice(ZIMBABWE_MERCHANTS["food"])
            account = random.choice([bank_acc, mobile_acc])
            transactions.append(Transaction(
                user_id=user.id,
                account_id=account.id,
                amount=-round(amt, 2),
                description=f"Groceries at {merchant}",
                merchant=merchant,
                category="food",
                subcategory="groceries",
                currency="USD",
                transaction_date=current.replace(hour=random.randint(9, 17), minute=random.randint(0, 59))
            ))
        current += timedelta(days=1)
    
    # Fuel (twice weekly)
    current = start_date
    while current <= end_date:
        if current.weekday() in [1, 4] and random.random() > 0.3:
            amt = random.uniform(40, 75)
            merchant = random.choice(ZIMBABWE_MERCHANTS["transport"][-2:])
            transactions.append(Transaction(
                user_id=user.id,
                account_id=bank_acc.id,
                amount=-round(amt, 2),
                description=f"Fuel at {merchant}",
                merchant=merchant,
                category="transport",
                subcategory="fuel",
                currency="USD",
                transaction_date=current.replace(hour=random.randint(7, 19), minute=random.randint(0, 59))
            ))
        current += timedelta(days=1)
    
    # Dining out (random)
    for _ in range(random.randint(30, 60)):
        date = start_date + timedelta(days=random.randint(0, months * 30))
        amt = random.uniform(15, 60)
        merchant = random.choice(ZIMBABWE_MERCHANTS["restaurants"])
        account = random.choice([bank_acc, mobile_acc, cash_acc])
        transactions.append(Transaction(
            user_id=user.id,
            account_id=account.id,
            amount=-round(amt, 2),
            description=f"Dining at {merchant}",
            merchant=merchant,
            category="food",
            subcategory="dining_out",
            currency="USD",
            transaction_date=date.replace(hour=random.randint(12, 21), minute=random.randint(0, 59))
        ))
    
    # Shopping
    for _ in range(random.randint(15, 30)):
        date = start_date + timedelta(days=random.randint(0, months * 30))
        amt = random.uniform(30, 200)
        merchant = random.choice(ZIMBABWE_MERCHANTS["shopping"])
        transactions.append(Transaction(
            user_id=user.id,
            account_id=bank_acc.id,
            amount=-round(amt, 2),
            description=f"Shopping at {merchant}",
            merchant=merchant,
            category="shopping",
            subcategory="clothing",
            currency="USD",
            transaction_date=date.replace(hour=random.randint(10, 18), minute=random.randint(0, 59))
        ))
    
    # Healthcare
    for _ in range(random.randint(5, 12)):
        date = start_date + timedelta(days=random.randint(0, months * 30))
        amt = random.uniform(25, 150)
        merchant = random.choice(ZIMBABWE_MERCHANTS["health"])
        transactions.append(Transaction(
            user_id=user.id,
            account_id=bank_acc.id,
            amount=-round(amt, 2),
            description=f"Medical at {merchant}",
            merchant=merchant,
            category="healthcare",
            currency="USD",
            transaction_date=date.replace(hour=random.randint(8, 17), minute=random.randint(0, 59))
        ))
    
    # Entertainment
    for _ in range(random.randint(10, 25)):
        date = start_date + timedelta(days=random.randint(0, months * 30))
        amt = random.uniform(10, 45)
        merchant = random.choice(ZIMBABWE_MERCHANTS["entertainment"])
        account = random.choice([mobile_acc, cash_acc])
        transactions.append(Transaction(
            user_id=user.id,
            account_id=account.id,
            amount=-round(amt, 2),
            description=f"Entertainment - {merchant}",
            merchant=merchant,
            category="entertainment",
            currency="USD",
            transaction_date=date.replace(hour=random.randint(14, 22), minute=random.randint(0, 59))
        ))
    
    # Transport (taxi/bus)
    for _ in range(random.randint(40, 80)):
        date = start_date + timedelta(days=random.randint(0, months * 30))
        amt = random.uniform(2, 12)
        merchant = random.choice(ZIMBABWE_MERCHANTS["transport"][:3])
        account = random.choice([mobile_acc, cash_acc])
        transactions.append(Transaction(
            user_id=user.id,
            account_id=account.id,
            amount=-round(amt, 2),
            description=f"Transport - {merchant}",
            merchant=merchant,
            category="transport",
            subcategory="public",
            currency="USD",
            transaction_date=date.replace(hour=random.randint(6, 20), minute=random.randint(0, 59))
        ))
    
    for t in transactions:
        db.add(t)
    
    db.commit()
    print(f"  Created {len(transactions)} transactions for {user.full_name}")
    return transactions

def create_goals(db, user, profile):
    """Create financial goals"""
    goals_map = {
        "mid_career": [
            {"title": "Emergency Fund", "target": 3000, "current": 1450, "cat": "savings", "pri": "high", "months": 12},
            {"title": "Car Down Payment", "target": 5000, "current": 2200, "cat": "major_purchase", "pri": "medium", "months": 18},
        ],
        "entrepreneur": [
            {"title": "Business Expansion", "target": 15000, "current": 8750, "cat": "business", "pri": "high", "months": 12},
            {"title": "Emergency Fund", "target": 10000, "current": 4200, "cat": "savings", "pri": "medium", "months": 15},
        ],
        "young_pro": [
            {"title": "Emergency Fund", "target": 1500, "current": 580, "cat": "savings", "pri": "high", "months": 10},
            {"title": "Laptop Upgrade", "target": 1200, "current": 450, "cat": "technology", "pri": "medium", "months": 8},
        ],
        "family": [
            {"title": "Education Fund", "target": 8000, "current": 3200, "cat": "education", "pri": "high", "months": 24},
            {"title": "Emergency Fund", "target": 5000, "current": 1850, "cat": "savings", "pri": "high", "months": 14},
        ],
        "investor": [
            {"title": "Property Investment", "target": 50000, "current": 25000, "cat": "investment", "pri": "high", "months": 24},
            {"title": "Stock Portfolio", "target": 20000, "current": 12000, "cat": "investment", "pri": "high", "months": 18},
        ]
    }
    
    config = goals_map.get(profile, goals_map["mid_career"])
    goals = []
    
    for g in config:
        deadline = datetime.utcnow() + timedelta(days=g["months"] * 30)
        goal = FinancialGoal(
            user_id=user.id,
            title=g["title"],
            target_amount=g["target"],
            current_amount=g["current"],
            currency="USD",
            deadline=deadline,
            category=g["cat"],
            priority=g["pri"],
            created_at=datetime.utcnow() - timedelta(days=60)
        )
        db.add(goal)
        goals.append(goal)
    
    db.commit()
    print(f"  Created {len(goals)} goals for {user.full_name}")
    return goals

def create_budgets_for_user(db, user, profile):
    """Create monthly budgets"""
    budget_map = {
        "mid_career": {"food": 300, "transport": 150, "entertainment": 100, "utilities": 200, "shopping": 150},
        "entrepreneur": {"food": 400, "transport": 250, "entertainment": 200, "utilities": 300, "business": 1000},
        "young_pro": {"food": 200, "transport": 100, "entertainment": 80, "utilities": 100, "shopping": 100},
        "family": {"food": 500, "transport": 200, "entertainment": 120, "utilities": 250, "education": 300},
        "investor": {"food": 500, "transport": 300, "entertainment": 250, "utilities": 300, "investment": 2000}
    }
    
    config = budget_map.get(profile, budget_map["mid_career"])
    budgets = []
    
    start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0)
    end = (start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    
    for cat, amt in config.items():
        spent = amt * random.uniform(0.45, 0.85)
        budget = Budget(
            user_id=user.id,
            category=cat,
            amount=amt,
            currency="USD",
            period="monthly",
            start_date=start,
            end_date=end,
            spent_amount=round(spent, 2),
            alert_threshold=0.8,
            is_active=True
        )
        db.add(budget)
        budgets.append(budget)
    
    db.commit()
    print(f"  Created {len(budgets)} budgets for {user.full_name}")
    return budgets

def create_investments_for_user(db, user, profile):
    """Create investments"""
    if profile not in ["entrepreneur", "investor", "family"]:
        return []
    
    inv_map = {
        "entrepreneur": [
            {"name": "Business Equipment", "type": "business", "inv": 5000, "curr": 5800, "risk": "medium"},
            {"name": "ZSE Stocks", "type": "stocks", "inv": 2000, "curr": 2340, "risk": "high"},
        ],
        "investor": [
            {"name": "ZSE Blue Chips", "type": "stocks", "inv": 10000, "curr": 12500, "risk": "medium"},
            {"name": "Real Estate", "type": "real_estate", "inv": 50000, "curr": 58000, "risk": "low"},
            {"name": "Bonds", "type": "bonds", "inv": 15000, "curr": 15900, "risk": "low"},
        ],
        "family": [
            {"name": "Education Bond", "type": "bonds", "inv": 3000, "curr": 3180, "risk": "low"},
            {"name": "Unit Trusts", "type": "stocks", "inv": 2000, "curr": 2240, "risk": "medium"},
        ]
    }
    
    config = inv_map.get(profile, [])
    investments = []
    
    for inv in config:
        purchase = datetime.utcnow() - timedelta(days=random.randint(180, 540))
        investment = Investment(
            user_id=user.id,
            name=inv["name"],
            investment_type=inv["type"],
            amount_invested=inv["inv"],
            current_value=inv["curr"],
            currency="USD",
            purchase_date=purchase,
            expected_return=random.uniform(5, 15),
            risk_level=inv["risk"],
            created_at=purchase
        )
        db.add(investment)
        investments.append(investment)
    
    db.commit()
    print(f"  Created {len(investments)} investments for {user.full_name}")
    return investments

def main():
    # Create 12 demo users with 2 years of data
    from seed_data_generator import create_long_term_demo_accounts
    print("Creating 12 demo users with 2 years of data...")
    db = SessionLocal()
    try:
        demo_users = create_long_term_demo_accounts(db)
        for user in demo_users:
            profile = ["mid_career", "entrepreneur", "young_pro", "family", "investor"][(demo_users.index(user)) % 5]
            accounts = create_accounts(db, user, profile)
            print(f"  Created {len(accounts)} accounts for {user.email}")
            generate_transactions(db, user, accounts, profile, months=24)
            create_goals(db, user, profile)
            create_budgets_for_user(db, user, profile)
            create_investments_for_user(db, user, profile)
        print("Created 12 demo users with 2 years of data.\n")
        print("\n" + "="*60)
        print("NEXUS FINANCE AI - SAMPLE DATA GENERATOR")
        print("="*60)
        print("\nGenerating 6 months of production-grade sample data...\n")
        # Create users
        print("Creating sample users...")
        users = create_sample_users(db)
        print(f"Created {len(users)} users\n")
        profiles = ["mid_career", "entrepreneur", "young_pro", "family", "investor"]
        for user, profile in zip(users, profiles):
            print(f"Processing {user.full_name} ({profile})...")
            # Create accounts
            accounts = create_accounts(db, user, profile)
            print(f"  Created {len(accounts)} accounts")
            # Generate transactions (6 months)
            generate_transactions(db, user, accounts, profile, months=6)
            # Create goals
            create_goals(db, user, profile)
            # Create budgets
            create_budgets_for_user(db, user, profile)
            # Create investments
            create_investments_for_user(db, user, profile)
        print("="*60)
        print("SAMPLE DATA GENERATION COMPLETE!")
        print("="*60)
        print("\nSummary:")
        print(f"   * {len(users)} Users with diverse profiles")
        print(f"   * ~{len(users) * 3} Accounts across different types")
        print(f"   * ~{len(users) * 350} Transactions over 6 months")
        print(f"   * Financial goals, budgets, and investments")
        print("\nLogin Credentials (all passwords: 123456):")
        for user in users:
            print(f"   * {user.email}")
        print("\n" + "="*60 + "\n")
    except Exception as e:
        print(f"ERROR: {str(e)}")
        db.rollback()
    finally:
        db.close()

    if __name__ == "__main__":
        main()
