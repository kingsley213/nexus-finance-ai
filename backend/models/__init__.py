from .database import Base, engine, SessionLocal
from .user_models import User, Account, Transaction, FinancialGoal, ExchangeRate
from .advanced_models import (
    AuditLog, Notification, Budget, Investment, RecurringTransaction,
    SavingsChallenge, FinancialInsight, UserPreference, ExchangeRateHistory,
    MerchantCategory
)

# Create all tables
def create_tables():
    Base.metadata.create_all(bind=engine)

__all__ = [
    "Base", "engine", "SessionLocal", "User", "Account", "Transaction", 
    "FinancialGoal", "ExchangeRate", "create_tables", "AuditLog", 
    "Notification", "Budget", "Investment", "RecurringTransaction",
    "SavingsChallenge", "FinancialInsight", "UserPreference", 
    "ExchangeRateHistory", "MerchantCategory"
]
