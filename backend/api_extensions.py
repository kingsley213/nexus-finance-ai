"""
Extended API Endpoints for Production Features
Budgets, Investments, Notifications, Recurring Transactions, etc.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from models import (
    SessionLocal, User, Budget, Investment, Notification,
    RecurringTransaction, SavingsChallenge, FinancialInsight,
    UserPreference, AuditLog
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# BUDGET ENDPOINTS
@router.post("/api/v1/budgets")
async def create_budget(
    category: str,
    amount: float,
    currency: str = "USD",
    period: str = "monthly",
    alert_threshold: float = 0.8,
    current_user: User = Depends(lambda: None),  # Will be replaced with actual auth
    db: Session = Depends(get_db)
):
    """Create a new budget"""
    start_date = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0)
    end_date = (start_date + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    
    budget = Budget(
        user_id=current_user.id if current_user else 1,
        category=category,
        amount=amount,
        currency=currency,
        period=period,
        start_date=start_date,
        end_date=end_date,
        alert_threshold=alert_threshold,
        is_active=True
    )
    
    db.add(budget)
    db.commit()
    db.refresh(budget)
    
    return {"message": "Budget created", "budget": budget}

@router.get("/api/v1/budgets")
async def get_budgets(
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get all user budgets"""
    user_id = current_user.id if current_user else 1
    budgets = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.is_active == True
    ).all()
    
    # Calculate progress for each budget
    budget_data = []
    for budget in budgets:
        progress = (budget.spent_amount / budget.amount * 100) if budget.amount > 0 else 0
        status = "on_track"
        if progress >= 100:
            status = "exceeded"
        elif progress >= budget.alert_threshold * 100:
            status = "warning"
        
        budget_data.append({
            "id": budget.id,
            "category": budget.category,
            "amount": budget.amount,
            "spent_amount": budget.spent_amount,
            "remaining": budget.amount - budget.spent_amount,
            "currency": budget.currency,
            "progress": round(progress, 1),
            "status": status,
            "period": budget.period,
            "start_date": budget.start_date,
            "end_date": budget.end_date
        })
    
    return budget_data

@router.put("/api/v1/budgets/{budget_id}")
async def update_budget(
    budget_id: int,
    amount: Optional[float] = None,
    alert_threshold: Optional[float] = None,
    is_active: Optional[bool] = None,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Update budget"""
    user_id = current_user.id if current_user else 1
    budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == user_id
    ).first()
    
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    if amount is not None:
        budget.amount = amount
    if alert_threshold is not None:
        budget.alert_threshold = alert_threshold
    if is_active is not None:
        budget.is_active = is_active
    
    db.commit()
    db.refresh(budget)
    
    return {"message": "Budget updated", "budget": budget}

# INVESTMENT ENDPOINTS
@router.post("/api/v1/investments")
async def create_investment(
    name: str,
    investment_type: str,
    amount_invested: float,
    current_value: float,
    currency: str = "USD",
    purchase_date: Optional[str] = None,
    expected_return: Optional[float] = None,
    risk_level: str = "medium",
    notes: Optional[str] = None,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Create investment record"""
    purchase_dt = datetime.fromisoformat(purchase_date) if purchase_date else datetime.utcnow()
    
    investment = Investment(
        user_id=current_user.id if current_user else 1,
        name=name,
        investment_type=investment_type,
        amount_invested=amount_invested,
        current_value=current_value,
        currency=currency,
        purchase_date=purchase_dt,
        expected_return=expected_return,
        risk_level=risk_level,
        notes=notes
    )
    
    db.add(investment)
    db.commit()
    db.refresh(investment)
    
    return {"message": "Investment created", "investment": investment}

@router.get("/api/v1/investments")
async def get_investments(
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get all user investments"""
    user_id = current_user.id if current_user else 1
    investments = db.query(Investment).filter(Investment.user_id == user_id).all()
    
    # Calculate returns
    investment_data = []
    total_invested = 0
    total_current = 0
    
    for inv in investments:
        gain_loss = inv.current_value - inv.amount_invested
        gain_loss_pct = (gain_loss / inv.amount_invested * 100) if inv.amount_invested > 0 else 0
        total_invested += inv.amount_invested
        total_current += inv.current_value
        
        investment_data.append({
            "id": inv.id,
            "name": inv.name,
            "type": inv.investment_type,
            "amount_invested": inv.amount_invested,
            "current_value": inv.current_value,
            "gain_loss": round(gain_loss, 2),
            "gain_loss_percentage": round(gain_loss_pct, 2),
            "currency": inv.currency,
            "risk_level": inv.risk_level,
            "purchase_date": inv.purchase_date,
            "notes": inv.notes
        })
    
    total_gain = total_current - total_invested
    total_return_pct = (total_gain / total_invested * 100) if total_invested > 0 else 0
    
    return {
        "investments": investment_data,
        "summary": {
            "total_invested": round(total_invested, 2),
            "total_current_value": round(total_current, 2),
            "total_gain_loss": round(total_gain, 2),
            "total_return_percentage": round(total_return_pct, 2)
        }
    }

@router.put("/api/v1/investments/{investment_id}")
async def update_investment(
    investment_id: int,
    current_value: float,
    notes: Optional[str] = None,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Update investment value"""
    user_id = current_user.id if current_user else 1
    investment = db.query(Investment).filter(
        Investment.id == investment_id,
        Investment.user_id == user_id
    ).first()
    
    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")
    
    investment.current_value = current_value
    if notes:
        investment.notes = notes
    investment.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(investment)
    
    return {"message": "Investment updated", "investment": investment}

# NOTIFICATION ENDPOINTS
@router.get("/api/v1/notifications")
async def get_notifications(
    unread_only: bool = False,
    limit: int = 50,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get user notifications"""
    user_id = current_user.id if current_user else 1
    query = db.query(Notification).filter(Notification.user_id == user_id)
    
    if unread_only:
        query = query.filter(Notification.is_read == False)
    
    notifications = query.order_by(Notification.created_at.desc()).limit(limit).all()
    
    return {
        "notifications": notifications,
        "unread_count": db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        ).count()
    }

@router.put("/api/v1/notifications/{notification_id}/read")
async def mark_notification_read(
    notification_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Mark notification as read"""
    user_id = current_user.id if current_user else 1
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.is_read = True
    notification.read_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Notification marked as read"}

# RECURRING TRANSACTIONS
@router.get("/api/v1/recurring-transactions")
async def get_recurring_transactions(
    active_only: bool = True,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get recurring transactions/bills"""
    user_id = current_user.id if current_user else 1
    query = db.query(RecurringTransaction).filter(RecurringTransaction.user_id == user_id)
    
    if active_only:
        query = query.filter(RecurringTransaction.is_active == True)
    
    recurring = query.order_by(RecurringTransaction.next_due_date).all()
    
    # Add days until due
    recurring_data = []
    for rec in recurring:
        days_until = (rec.next_due_date - datetime.utcnow()).days
        status = "upcoming" if days_until > 7 else "due_soon" if days_until > 0 else "overdue"
        
        recurring_data.append({
            "id": rec.id,
            "description": rec.description,
            "amount": rec.amount,
            "currency": rec.currency,
            "category": rec.category,
            "frequency": rec.frequency,
            "next_due_date": rec.next_due_date,
            "days_until_due": days_until,
            "status": status,
            "auto_pay": rec.auto_pay,
            "is_active": rec.is_active
        })
    
    return recurring_data

# USER PREFERENCES
@router.get("/api/v1/preferences")
async def get_preferences(
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get user preferences"""
    user_id = current_user.id if current_user else 1
    preferences = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    
    if not preferences:
        # Create default preferences
        preferences = UserPreference(user_id=user_id)
        db.add(preferences)
        db.commit()
        db.refresh(preferences)
    
    return preferences

@router.put("/api/v1/preferences")
async def update_preferences(
    default_currency: Optional[str] = None,
    theme: Optional[str] = None,
    email_notifications: Optional[bool] = None,
    budget_alerts: Optional[bool] = None,
    goal_reminders: Optional[bool] = None,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Update user preferences"""
    user_id = current_user.id if current_user else 1
    preferences = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    
    if not preferences:
        preferences = UserPreference(user_id=user_id)
        db.add(preferences)
    
    if default_currency:
        preferences.default_currency = default_currency
    if theme:
        preferences.theme = theme
    if email_notifications is not None:
        preferences.email_notifications = email_notifications
    if budget_alerts is not None:
        preferences.budget_alerts = budget_alerts
    if goal_reminders is not None:
        preferences.goal_reminders = goal_reminders
    
    preferences.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(preferences)
    
    return {"message": "Preferences updated", "preferences": preferences}

# FINANCIAL INSIGHTS
@router.get("/api/v1/insights")
async def get_financial_insights(
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get AI-generated financial insights"""
    user_id = current_user.id if current_user else 1
    insights = db.query(FinancialInsight).filter(
        FinancialInsight.user_id == user_id,
        FinancialInsight.action_taken == False
    ).order_by(FinancialInsight.created_at.desc()).limit(10).all()
    
    return insights
