from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from .database import Base

class CurrencyType(enum.Enum):
    USD = "USD"
    ZIG = "ZIG"  # Zimbabwe Gold
    ZAR = "ZAR"  # South African Rand
    ZWL = "ZWL"  # Zimbabwean Dollar

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    phone_number = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    accounts = relationship("Account", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    financial_goals = relationship("FinancialGoal", back_populates="user")

class Account(Base):
    __tablename__ = "accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(100), nullable=False)
    account_type = Column(String(50))  # savings, mobile_money, cash, bank
    currency = Column(String(3), nullable=False)  # USD, ZIG, ZAR
    balance = Column(Float, default=0.0)
    color = Column(String(7))  # Hex color for UI
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))
    amount = Column(Float, nullable=False)
    description = Column(String(255), nullable=False)
    merchant = Column(String(255))
    category = Column(String(100))
    subcategory = Column(String(100))
    currency = Column(String(3), nullable=False)
    transaction_date = Column(DateTime, default=datetime.utcnow)
    is_recurring = Column(Boolean, default=False)
    recurrence_pattern = Column(String(50))  # daily, weekly, monthly
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="transactions")
    account = relationship("Account", back_populates="transactions")

class FinancialGoal(Base):
    __tablename__ = "financial_goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    target_amount = Column(Float, nullable=False)
    current_amount = Column(Float, default=0.0)
    currency = Column(String(3), nullable=False)
    deadline = Column(DateTime)
    category = Column(String(100))  # emergency, education, investment
    priority = Column(String(20))  # low, medium, high
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="financial_goals")

class ExchangeRate(Base):
    __tablename__ = "exchange_rates"
    
    id = Column(Integer, primary_key=True, index=True)
    base_currency = Column(String(3), nullable=False)
    target_currency = Column(String(3), nullable=False)
    rate = Column(Float, nullable=False)
    last_updated = Column(DateTime, default=datetime.utcnow)
