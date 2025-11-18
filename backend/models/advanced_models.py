from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey, JSON
from datetime import datetime
from .database import Base

class AuditLog(Base):
    """Track all user actions for security and compliance"""
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String(100), nullable=False)  # login, transaction, account_update, etc.
    resource_type = Column(String(50))  # transaction, account, goal
    resource_id = Column(Integer)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    details = Column(JSON)  # Additional context
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class Notification(Base):
    """User notifications for important events"""
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50))  # budget_alert, goal_milestone, transaction_alert
    priority = Column(String(20), default="normal")  # low, normal, high, urgent
    is_read = Column(Boolean, default=False)
    action_url = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    read_at = Column(DateTime)

class Budget(Base):
    """Monthly budgets by category"""
    __tablename__ = "budgets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(3), nullable=False)
    period = Column(String(20), default="monthly")  # weekly, monthly, yearly
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    spent_amount = Column(Float, default=0.0)
    alert_threshold = Column(Float, default=0.8)  # Alert at 80%
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Investment(Base):
    """Track investments and assets"""
    __tablename__ = "investments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(255), nullable=False)
    investment_type = Column(String(50))  # stocks, bonds, real_estate, crypto, business
    amount_invested = Column(Float, nullable=False)
    current_value = Column(Float, nullable=False)
    currency = Column(String(3), nullable=False)
    purchase_date = Column(DateTime, nullable=False)
    expected_return = Column(Float)  # Annual return percentage
    risk_level = Column(String(20))  # low, medium, high
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class RecurringTransaction(Base):
    """Scheduled recurring transactions (bills, subscriptions)"""
    __tablename__ = "recurring_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))
    description = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(3), nullable=False)
    category = Column(String(100))
    frequency = Column(String(20))  # daily, weekly, monthly, yearly
    next_due_date = Column(DateTime, nullable=False)
    reminder_days = Column(Integer, default=3)  # Remind 3 days before
    is_active = Column(Boolean, default=True)
    auto_pay = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class SavingsChallenge(Base):
    """Gamified savings challenges"""
    __tablename__ = "savings_challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    challenge_type = Column(String(50))  # 52_week, no_spend, round_up
    target_amount = Column(Float, nullable=False)
    current_amount = Column(Float, default=0.0)
    currency = Column(String(3), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(20), default="active")  # active, completed, failed
    milestones = Column(JSON)  # Track progress milestones
    created_at = Column(DateTime, default=datetime.utcnow)

class FinancialInsight(Base):
    """AI-generated financial insights and recommendations"""
    __tablename__ = "financial_insights"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    insight_type = Column(String(50))  # spending_pattern, saving_opportunity, risk_alert
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(String(20))  # info, warning, critical
    potential_savings = Column(Float)
    confidence_score = Column(Float)  # AI confidence 0-1
    is_actionable = Column(Boolean, default=True)
    action_taken = Column(Boolean, default=False)
    expires_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

class UserPreference(Base):
    """User settings and preferences"""
    __tablename__ = "user_preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    default_currency = Column(String(3), default="USD")
    theme = Column(String(20), default="light")  # light, dark, auto
    language = Column(String(5), default="en")
    timezone = Column(String(50), default="Africa/Harare")
    email_notifications = Column(Boolean, default=True)
    sms_notifications = Column(Boolean, default=False)
    budget_alerts = Column(Boolean, default=True)
    goal_reminders = Column(Boolean, default=True)
    weekly_summary = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ExchangeRateHistory(Base):
    """Historical exchange rate data for analytics"""
    __tablename__ = "exchange_rate_history"
    
    id = Column(Integer, primary_key=True, index=True)
    base_currency = Column(String(3), nullable=False)
    target_currency = Column(String(3), nullable=False)
    rate = Column(Float, nullable=False)
    source = Column(String(50))  # RBZ, parallel_market, official
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class MerchantCategory(Base):
    """Known merchants and their categories for better classification"""
    __tablename__ = "merchant_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_name = Column(String(255), nullable=False, unique=True)
    category = Column(String(100), nullable=False)
    subcategory = Column(String(100))
    is_verified = Column(Boolean, default=False)
    logo_url = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
