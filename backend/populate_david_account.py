"""
Populate David Chikwanha's account with 2 years of realistic financial data
"""

import random
from datetime import datetime, timedelta
from models import SessionLocal, User, Account, Transaction, FinancialGoal, Budget, Investment
from seed_data_generator import ZIMBABWE_MERCHANTS
from app.auth import get_password_hash

def populate_david_account():
    """Add 2 years of comprehensive data to david.chikwanha@gmail.com"""
    db = SessionLocal()
    try:
        # Find or create David's account
        user = db.query(User).filter(User.email == "david.chikwanha@gmail.com").first()
        if not user:
            print("Creating david.chikwanha@gmail.com account...")
            user = User(
                email="david.chikwanha@gmail.com",
                hashed_password=get_password_hash("123456"),
                full_name="David Chikwanha",
                phone_number="+263775678901",
                created_at=datetime.utcnow() - timedelta(days=730)
            )
            db.add(user)
            db.flush()
        
        # Create accounts for David (investor profile)
        existing_accounts = db.query(Account).filter(Account.user_id == user.id).all()
        if existing_accounts:
            accounts = existing_accounts
            print(f"Found {len(accounts)} existing accounts")
        else:
            print("Creating accounts for David...")
            accounts = []
            account_configs = [
                {"name": "Trading", "type": "bank", "currency": "USD", "balance": 15420, "color": "#4CAF50"},
                {"name": "Investments", "type": "savings", "currency": "USD", "balance": 25000, "color": "#00BCD4"}
            ]
            
            for cfg in account_configs:
                account = Account(
                    user_id=user.id,
                    name=cfg["name"],
                    account_type=cfg["type"],
                    currency=cfg["currency"],
                    balance=cfg["balance"],
                    color=cfg["color"],
                    created_at=datetime.utcnow() - timedelta(days=730)
                )
                db.add(account)
                accounts.append(account)
            db.flush()
        
        # Delete existing transactions to start fresh
        existing_transactions = db.query(Transaction).filter(Transaction.user_id == user.id).all()
        for t in existing_transactions:
            db.delete(t)
        db.commit()
        print(f"Cleared {len(existing_transactions)} existing transactions")
        
        # Generate 2 years of transactions
        print("Generating 2 years of comprehensive transactions...")
        transactions = []
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=730)
        
        bank_acc = accounts[0]
        savings_acc = accounts[1]
        
        # Monthly salary (investor - high income)
        current = start_date
        while current <= end_date:
            if current.day == 25:
                salary = random.uniform(4000, 8000)
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
        
        # Monthly rent (higher for investor)
        current = start_date
        rent_amount = random.uniform(500, 900)
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
                    amt = random.uniform(50, 120)
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
                amt = random.uniform(120, 250)
                merchant = random.choice(ZIMBABWE_MERCHANTS["food"])
                transactions.append(Transaction(
                    user_id=user.id,
                    account_id=bank_acc.id,
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
            if current.weekday() in [1, 4] and random.random() > 0.2:
                amt = random.uniform(60, 120)
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
        
        # Dining out (frequent)
        for _ in range(random.randint(60, 100)):
            date = start_date + timedelta(days=random.randint(0, 730))
            amt = random.uniform(25, 100)
            merchant = random.choice(ZIMBABWE_MERCHANTS["restaurants"])
            transactions.append(Transaction(
                user_id=user.id,
                account_id=bank_acc.id,
                amount=-round(amt, 2),
                description=f"Dining at {merchant}",
                merchant=merchant,
                category="food",
                subcategory="dining_out",
                currency="USD",
                transaction_date=date.replace(hour=random.randint(12, 21), minute=random.randint(0, 59))
            ))
        
        # Shopping (regular high-value purchases)
        for _ in range(random.randint(30, 50)):
            date = start_date + timedelta(days=random.randint(0, 730))
            amt = random.uniform(80, 400)
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
        for _ in range(random.randint(12, 20)):
            date = start_date + timedelta(days=random.randint(0, 730))
            amt = random.uniform(50, 300)
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
        
        # Entertainment (investor lifestyle)
        for _ in range(random.randint(30, 50)):
            date = start_date + timedelta(days=random.randint(0, 730))
            amt = random.uniform(30, 100)
            merchant = random.choice(ZIMBABWE_MERCHANTS["entertainment"])
            transactions.append(Transaction(
                user_id=user.id,
                account_id=bank_acc.id,
                amount=-round(amt, 2),
                description=f"Entertainment - {merchant}",
                merchant=merchant,
                category="entertainment",
                currency="USD",
                transaction_date=date.replace(hour=random.randint(14, 22), minute=random.randint(0, 59))
            ))
        
        # Transfer to savings (monthly investment)
        current = start_date
        while current <= end_date:
            if current.day == 20:
                amt = random.uniform(2000, 3500)
                transactions.append(Transaction(
                    user_id=user.id,
                    account_id=bank_acc.id,
                    amount=-round(amt, 2),
                    description=f"Transfer to Investments",
                    merchant="Internal Transfer",
                    category="transfer",
                    currency="USD",
                    transaction_date=current.replace(hour=14, minute=0)
                ))
            current += timedelta(days=1)
        
        # Add all transactions
        for t in transactions:
            db.add(t)
        db.commit()
        print(f"✅ Created {len(transactions)} transactions for David Chikwanha")
        
        # Create financial goals
        print("Creating financial goals...")
        existing_goals = db.query(FinancialGoal).filter(FinancialGoal.user_id == user.id).all()
        for g in existing_goals:
            db.delete(g)
        db.commit()
        
        goals = [
            FinancialGoal(
                user_id=user.id,
                title="Property Investment",
                target_amount=50000,
                current_amount=25000,
                currency="USD",
                deadline=datetime.utcnow() + timedelta(days=730),
                category="investment",
                priority="high",
                created_at=datetime.utcnow() - timedelta(days=365)
            ),
            FinancialGoal(
                user_id=user.id,
                title="Stock Portfolio",
                target_amount=20000,
                current_amount=12000,
                currency="USD",
                deadline=datetime.utcnow() + timedelta(days=540),
                category="investment",
                priority="high",
                created_at=datetime.utcnow() - timedelta(days=365)
            ),
        ]
        for g in goals:
            db.add(g)
        db.commit()
        print(f"✅ Created {len(goals)} financial goals")
        
        # Create investments
        print("Creating investments...")
        existing_investments = db.query(Investment).filter(Investment.user_id == user.id).all()
        for inv in existing_investments:
            db.delete(inv)
        db.commit()
        
        investments = [
            Investment(
                user_id=user.id,
                name="ZSE Blue Chips",
                investment_type="stocks",
                amount_invested=10000,
                current_value=12500,
                currency="USD",
                purchase_date=datetime.utcnow() - timedelta(days=730),
                expected_return=12.5,
                risk_level="medium",
                created_at=datetime.utcnow() - timedelta(days=730)
            ),
            Investment(
                user_id=user.id,
                name="Real Estate",
                investment_type="real_estate",
                amount_invested=50000,
                current_value=58000,
                currency="USD",
                purchase_date=datetime.utcnow() - timedelta(days=540),
                expected_return=16.0,
                risk_level="low",
                created_at=datetime.utcnow() - timedelta(days=540)
            ),
            Investment(
                user_id=user.id,
                name="Corporate Bonds",
                investment_type="bonds",
                amount_invested=15000,
                current_value=15900,
                currency="USD",
                purchase_date=datetime.utcnow() - timedelta(days=365),
                expected_return=6.0,
                risk_level="low",
                created_at=datetime.utcnow() - timedelta(days=365)
            ),
        ]
        for inv in investments:
            db.add(inv)
        db.commit()
        print(f"✅ Created {len(investments)} investments")
        
        print("\n" + "="*60)
        print("DAVID CHIKWANHA ACCOUNT FULLY POPULATED!")
        print("="*60)
        print(f"\nEmail: david.chikwanha@gmail.com")
        print(f"Password: 123456")
        print(f"Data Period: {start_date.strftime('%B %d, %Y')} to {end_date.strftime('%B %d, %Y')}")
        print(f"Total Transactions: {len(transactions)}")
        print(f"Total Goals: {len(goals)}")
        print(f"Total Investments: {len(investments)}")
        print("="*60 + "\n")
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    populate_david_account()
