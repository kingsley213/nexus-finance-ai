"""
Comprehensive Seed Data Generator - Part 1: Core Functions
Generates 6 months of realistic financial data
"""

import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import (
    SessionLocal, User, Account, Transaction, FinancialGoal, 
    Budget, Investment, RecurringTransaction, SavingsChallenge,
    FinancialInsight, UserPreference, Notification
)
from app.auth import get_password_hash

# Zimbabwe merchants
ZIMBABWE_MERCHANTS = {
    "food": ["TM Pick n Pay", "OK Zimbabwe", "Food Lovers Market", "Spar", "Choppies"],
    "restaurants": ["Nando's", "Chicken Inn", "Pizza Inn", "Steers", "Mama's Kitchen"],
    "transport": ["ZUPCO", "Vaya", "Bolt", "Zuva Petroleum", "Puma Energy"],
    "utilities": ["ZESA", "City Council", "NetOne", "Econet"],
    "entertainment": ["Ster Kinekor", "Nu Metro", "ShowMax"],
    "health": ["Avenues Clinic", "Link Pharmacy", "Med-Plus"],
    "shopping": ["Edgars", "Truworths", "Jet", "Mr Price"]
}

def create_long_term_demo_accounts(db: Session):
    """Create 12 demo users with password '123456' and 2 years of data"""
    profiles = ["mid_career", "entrepreneur", "young_pro", "family", "investor"]
    users = []
    for i in range(1, 13):
        email = f"demo2yr{i}@nexusfinance.com"
        name = f"Demo2Yr User {i}"
        profile = profiles[(i-1) % len(profiles)]
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            users.append(existing)
            continue
        user = User(
            email=email,
            hashed_password=get_password_hash("123456"),
            full_name=name,
            phone_number=f"+26379{i:07d}",
            created_at=datetime.utcnow() - timedelta(days=730)
        )
        db.add(user)
        db.flush()
        pref = UserPreference(
            user_id=user.id,
            default_currency="USD",
            theme="light",
            email_notifications=True
        )
        db.add(pref)
        users.append(user)
    db.commit()
    return users
"""
Comprehensive Seed Data Generator - Part 1: Core Functions
Generates 6 months of realistic financial data
"""

import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import (
    SessionLocal, User, Account, Transaction, FinancialGoal, 
    Budget, Investment, RecurringTransaction, SavingsChallenge,
    FinancialInsight, UserPreference, Notification
)
from app.auth import get_password_hash

# Zimbabwe merchants
ZIMBABWE_MERCHANTS = {
    "food": ["TM Pick n Pay", "OK Zimbabwe", "Food Lovers Market", "Spar", "Choppies"],
    "restaurants": ["Nando's", "Chicken Inn", "Pizza Inn", "Steers", "Mama's Kitchen"],
    "transport": ["ZUPCO", "Vaya", "Bolt", "Zuva Petroleum", "Puma Energy"],
    "utilities": ["ZESA", "City Council", "NetOne", "Econet"],
    "entertainment": ["Ster Kinekor", "Nu Metro", "ShowMax"],
    "health": ["Avenues Clinic", "Link Pharmacy", "Med-Plus"],
    "shopping": ["Edgars", "Truworths", "Jet", "Mr Price"]
}

def create_sample_users(db: Session):
    """Create 20 real users and 32 beta testers with unique profiles"""
    base_users = [
        {"email": "john.mukweva@gmail.com", "password": "123456", "name": "John Mukweva", "phone": "+263771234567", "profile": "mid_career"},
        {"email": "tanya.moyo@yahoo.com", "password": "123456", "name": "Tanya Moyo", "phone": "+263712345678", "profile": "entrepreneur"},
        {"email": "tendai.ncube@outlook.com", "password": "123456", "name": "Tendai Ncube", "phone": "+263783456789", "profile": "young_pro"},
        {"email": "grace.sibanda@gmail.com", "password": "123456", "name": "Grace Sibanda", "phone": "+263734567890", "profile": "family"},
        {"email": "david.chikwanha@gmail.com", "password": "123456", "name": "David Chikwanha", "phone": "+263775678901", "profile": "investor"}
    ]

    # Generate 15 more real users
    profiles = ["mid_career", "entrepreneur", "young_pro", "family", "investor"]
    for i in range(6, 21):
        base_users.append({
            "email": f"user{i}@nexusfinance.com",
            "password": "123456",
            "name": f"User {i} Demo",
            "phone": f"+26377{i:07d}",
            "profile": profiles[(i-1) % len(profiles)]
        })

    # Add 32 beta testers
    for i in range(1, 33):
        base_users.append({
            "email": f"beta{i}@nexusfinance.com",
            "password": "123456",
            "name": f"Beta Tester {i}",
            "phone": f"+26378{i:07d}",
            "profile": profiles[i % len(profiles)]
        })

    users = []
    for data in base_users:
        existing = db.query(User).filter(User.email == data["email"]).first()
        if existing:
            users.append(existing)
            continue
        user = User(
            email=data["email"],
            hashed_password=get_password_hash(data["password"]),
            full_name=data["name"],
            phone_number=data["phone"],
            created_at=datetime.utcnow() - timedelta(days=180)
        )
        db.add(user)
        db.flush()
        pref = UserPreference(
            user_id=user.id,
            default_currency="USD",
            theme="light",
            email_notifications=True
        )
        db.add(pref)
        users.append(user)
    db.commit()
    return users

def create_accounts(db: Session, user: User, profile: str):
    """Create accounts based on profile"""
    configs = {
        "mid_career": [
            {"name": "Salary USD", "type": "bank", "currency": "USD", "balance": 2450, "color": "#4CAF50"},
            {"name": "EcoCash", "type": "mobile_money", "currency": "USD", "balance": 385, "color": "#2196F3"},
            {"name": "Cash", "type": "cash", "currency": "USD", "balance": 120, "color": "#FF9800"}
        ],
        "entrepreneur": [
            {"name": "Business", "type": "bank", "currency": "USD", "balance": 8750, "color": "#4CAF50"},
            {"name": "Savings", "type": "savings", "currency": "USD", "balance": 4200, "color": "#00BCD4"},
            {"name": "EcoCash", "type": "mobile_money", "currency": "USD", "balance": 1250, "color": "#2196F3"}
        ],
        "young_pro": [
            {"name": "Current", "type": "bank", "currency": "USD", "balance": 980, "color": "#4CAF50"},
            {"name": "EcoCash", "type": "mobile_money", "currency": "USD", "balance": 150, "color": "#2196F3"}
        ],
        "family": [
            {"name": "Joint", "type": "bank", "currency": "USD", "balance": 3200, "color": "#4CAF50"},
            {"name": "Emergency", "type": "savings", "currency": "USD", "balance": 1850, "color": "#00BCD4"},
            {"name": "EcoCash", "type": "mobile_money", "currency": "USD", "balance": 420, "color": "#2196F3"}
        ],
        "investor": [
            {"name": "Trading", "type": "bank", "currency": "USD", "balance": 15420, "color": "#4CAF50"},
            {"name": "Investments", "type": "savings", "currency": "USD", "balance": 25000, "color": "#00BCD4"}
        ]
    }
    
    config = configs.get(profile, configs["mid_career"])
    accounts = []
    
    for acc in config:
        account = Account(
            user_id=user.id,
            name=acc["name"],
            account_type=acc["type"],
            currency=acc["currency"],
            balance=acc["balance"],
            color=acc["color"],
            created_at=datetime.utcnow() - timedelta(days=180)
        )
        db.add(account)
        accounts.append(account)
    
    db.commit()
    return accounts

print("Seed data generator loaded successfully!")
