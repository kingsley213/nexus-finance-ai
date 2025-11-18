# 📚 Nexus Finance AI - API Documentation

## Base URL
```
Development: http://localhost:8000
Production: https://api.nexusfinance.ai
```

## Authentication

All authenticated endpoints require a JWT Bearer token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Obtain Token

#### Register New User
```http
POST /api/v1/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "phone_number": "+263771234567"
}
```

**Response (200)**:
```json
{
  "message": "User created successfully",
  "user_id": 1,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Login
```http
POST /api/v1/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "full_name": "John Doe"
}
```

---

## 💰 Accounts Management

### Get All Accounts
```http
GET /api/v1/accounts
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Salary Account USD",
    "account_type": "bank",
    "currency": "USD",
    "balance": 2450.75,
    "color": "#4CAF50",
    "created_at": "2024-04-22T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "EcoCash USD",
    "account_type": "mobile_money",
    "currency": "USD",
    "balance": 385.20,
    "color": "#2196F3",
    "created_at": "2024-04-22T10:30:00Z"
  }
]
```

### Create Account
```http
POST /api/v1/accounts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Emergency Fund",
  "account_type": "savings",
  "currency": "USD",
  "balance": 1000.00,
  "color": "#00BCD4"
}
```

**Response (200)**:
```json
{
  "message": "Account created successfully",
  "account": {
    "id": 3,
    "name": "Emergency Fund",
    "account_type": "savings",
    "currency": "USD",
    "balance": 1000.00,
    "color": "#00BCD4"
  }
}
```

---

## 💸 Transactions

### Get Transactions
```http
GET /api/v1/transactions?start_date=2024-01-01&end_date=2024-10-22&category=food&limit=100
Authorization: Bearer <token>
```

**Query Parameters**:
- `start_date` (optional): ISO format date
- `end_date` (optional): ISO format date
- `category` (optional): Filter by category
- `limit` (optional): Max results (default: 100)

**Response (200)**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "account_id": 1,
    "amount": -45.50,
    "description": "Groceries at TM Pick n Pay",
    "merchant": "TM Pick n Pay",
    "category": "food",
    "subcategory": "groceries",
    "currency": "USD",
    "transaction_date": "2024-10-20T14:30:00Z",
    "is_recurring": false,
    "created_at": "2024-10-20T14:30:00Z"
  }
]
```

### Create Transaction
```http
POST /api/v1/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Lunch at Nando's",
  "amount": -25.00,
  "account_id": 2,
  "currency": "USD"
}
```

**Response (200)**:
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": 2,
    "amount": -25.00,
    "description": "Lunch at Nando's",
    "category": "food",
    "currency": "USD",
    "transaction_date": "2024-10-22T12:15:00Z"
  },
  "category_prediction": {
    "category": "food",
    "confidence": 0.95,
    "subcategory": "dining_out"
  },
  "new_balance": 360.20
}
```

---

## 🎯 Financial Goals

### Get All Goals
```http
GET /api/v1/goals
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Emergency Fund",
    "target_amount": 3000.00,
    "current_amount": 1450.00,
    "currency": "USD",
    "deadline": "2025-10-22T00:00:00Z",
    "category": "savings",
    "priority": "high",
    "progress_percentage": 48.33,
    "created_at": "2024-08-22T10:00:00Z"
  }
]
```

### Create Goal
```http
POST /api/v1/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Vacation Fund",
  "target_amount": 1500.00,
  "currency": "USD",
  "deadline": "2025-06-01T00:00:00Z",
  "category": "travel",
  "priority": "medium"
}
```

### Update Goal Progress
```http
PUT /api/v1/goals/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_amount": 1600.00
}
```

---

## 💰 Budgets

### Get All Budgets
```http
GET /api/v1/budgets
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "category": "food",
    "amount": 300.00,
    "spent_amount": 245.50,
    "remaining": 54.50,
    "currency": "USD",
    "progress": 81.8,
    "status": "warning",
    "period": "monthly",
    "start_date": "2024-10-01T00:00:00Z",
    "end_date": "2024-10-31T23:59:59Z"
  },
  {
    "id": 2,
    "category": "transport",
    "amount": 150.00,
    "spent_amount": 89.30,
    "remaining": 60.70,
    "currency": "USD",
    "progress": 59.5,
    "status": "on_track",
    "period": "monthly",
    "start_date": "2024-10-01T00:00:00Z",
    "end_date": "2024-10-31T23:59:59Z"
  }
]
```

### Create Budget
```http
POST /api/v1/budgets
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "entertainment",
  "amount": 100.00,
  "currency": "USD",
  "period": "monthly",
  "alert_threshold": 0.8
}
```

### Update Budget
```http
PUT /api/v1/budgets/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 350.00,
  "alert_threshold": 0.85
}
```

---

## 📈 Investments

### Get All Investments
```http
GET /api/v1/investments
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "investments": [
    {
      "id": 1,
      "name": "ZSE Blue Chips",
      "type": "stocks",
      "amount_invested": 10000.00,
      "current_value": 12500.00,
      "gain_loss": 2500.00,
      "gain_loss_percentage": 25.00,
      "currency": "USD",
      "risk_level": "medium",
      "purchase_date": "2024-01-15T00:00:00Z",
      "notes": "Diversified portfolio"
    }
  ],
  "summary": {
    "total_invested": 10000.00,
    "total_current_value": 12500.00,
    "total_gain_loss": 2500.00,
    "total_return_percentage": 25.00
  }
}
```

### Create Investment
```http
POST /api/v1/investments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Government Bonds",
  "investment_type": "bonds",
  "amount_invested": 5000.00,
  "current_value": 5000.00,
  "currency": "USD",
  "purchase_date": "2024-10-22",
  "expected_return": 8.5,
  "risk_level": "low",
  "notes": "5-year treasury bonds"
}
```

### Update Investment Value
```http
PUT /api/v1/investments/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_value": 13000.00,
  "notes": "Updated after market close"
}
```

---

## 📊 Analytics

### Spending Insights
```http
GET /api/v1/analytics/spending-insights
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "total_spent": 2450.75,
  "categories": {
    "food": 650.20,
    "transport": 380.50,
    "utilities": 245.00,
    "entertainment": 150.30
  },
  "top_merchants": [
    {"name": "TM Pick n Pay", "amount": 245.50, "count": 8},
    {"name": "Zuva Petroleum", "amount": 180.00, "count": 6}
  ],
  "daily_average": 81.69,
  "trends": {
    "increasing_categories": ["food", "transport"],
    "decreasing_categories": ["entertainment"]
  },
  "zimbabwe_context": {
    "inflation_impact": 4.2,
    "currency_exposure": {
      "USD": 85,
      "ZIG": 15
    },
    "economic_alerts": []
  }
}
```

### Cash Flow Forecast
```http
GET /api/v1/analytics/cash-flow-forecast?inflation_rate=0.02
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "current_balance": 3456.95,
  "forecast_periods": [
    {
      "period": "Month 1",
      "projected_income": 1500.00,
      "projected_expenses": 1200.00,
      "net_flow": 300.00,
      "ending_balance": 3756.95,
      "inflation_adjusted": 3719.26
    },
    {
      "period": "Month 2",
      "projected_income": 1500.00,
      "projected_expenses": 1224.00,
      "net_flow": 276.00,
      "ending_balance": 4032.95,
      "inflation_adjusted": 3946.10
    }
  ],
  "insights": [
    "Your cash flow is positive and sustainable",
    "Consider increasing savings by 10%",
    "Inflation will reduce purchasing power by 4.2% annually"
  ]
}
```

### Financial Health Score
```http
GET /api/v1/analytics/financial-health
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "overall_score": 72,
  "grade": "B",
  "components": {
    "savings_rate": {
      "score": 65,
      "value": 15,
      "benchmark": 20,
      "status": "fair"
    },
    "debt_to_income": {
      "score": 90,
      "value": 10,
      "benchmark": 30,
      "status": "excellent"
    },
    "emergency_fund": {
      "score": 60,
      "months_covered": 2.5,
      "target": 6,
      "status": "needs_improvement"
    },
    "budget_adherence": {
      "score": 75,
      "percentage": 75,
      "status": "good"
    }
  },
  "recommendations": [
    "Increase emergency fund to cover 6 months of expenses",
    "Your savings rate is below recommended 20%",
    "Excellent debt management - keep it up!"
  ]
}
```

### Advanced AI Forecast
```http
GET /api/v1/advanced-analytics/ai-forecast?inflation_rate=0.02
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "forecast_confidence": 0.87,
  "predictions": [
    {
      "month": 1,
      "predicted_spending": 1245.50,
      "confidence_interval": [1180.00, 1310.00],
      "risk_factors": ["seasonal_increase"]
    }
  ],
  "insights": [
    "AI detected recurring payment pattern",
    "Unusual spending spike predicted in month 3",
    "Opportunity to save $150/month identified"
  ],
  "anomaly_detection": {
    "detected": false,
    "recent_anomalies": []
  }
}
```

---

## 🔔 Notifications

### Get Notifications
```http
GET /api/v1/notifications?unread_only=true&limit=20
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "notifications": [
    {
      "id": 1,
      "title": "Budget Alert: Food Category",
      "message": "You've spent 85% of your food budget this month.",
      "notification_type": "budget_alert",
      "priority": "high",
      "is_read": false,
      "action_url": "/budgets",
      "created_at": "2024-10-22T09:15:00Z"
    }
  ],
  "unread_count": 3
}
```

### Mark as Read
```http
PUT /api/v1/notifications/1/read
Authorization: Bearer <token>
```

---

## 🔄 Recurring Transactions

### Get Recurring Bills
```http
GET /api/v1/recurring-transactions?active_only=true
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "description": "Netflix Subscription",
    "amount": 9.99,
    "currency": "USD",
    "category": "entertainment",
    "frequency": "monthly",
    "next_due_date": "2024-10-25T00:00:00Z",
    "days_until_due": 3,
    "status": "upcoming",
    "auto_pay": true,
    "is_active": true
  }
]
```

---

## ⚙️ User Preferences

### Get Preferences
```http
GET /api/v1/preferences
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "id": 1,
  "user_id": 1,
  "default_currency": "USD",
  "theme": "light",
  "language": "en",
  "timezone": "Africa/Harare",
  "email_notifications": true,
  "sms_notifications": false,
  "budget_alerts": true,
  "goal_reminders": true,
  "weekly_summary": true
}
```

### Update Preferences
```http
PUT /api/v1/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "theme": "dark",
  "email_notifications": false,
  "budget_alerts": true
}
```

---

## 🌍 Market Data

### Get Zimbabwe Market Trends
```http
GET /api/v1/market/trends
```

**Response (200)**:
```json
{
  "exchange_rates": {
    "USD": {"rate": 1, "change": 0, "trend": "stable"},
    "ZIG": {"rate": 13.5, "change": -0.2, "trend": "down"},
    "ZAR": {"rate": 18.7, "change": 0.3, "trend": "up"}
  },
  "inflation": {
    "current": 4.2,
    "previous": 3.8,
    "trend": "up",
    "forecast": 4.5
  },
  "economic_indicators": {
    "gdp_growth": 2.1,
    "unemployment": 8.5,
    "interest_rate": 9.0
  },
  "last_updated": "2024-10-22T10:00:00Z"
}
```

---

## 🤖 Machine Learning

### Predict Transaction Category
```http
GET /api/v1/ml/predict-category?description=Groceries at OK Zimbabwe&amount=85.50
```

**Response (200)**:
```json
{
  "category": "food",
  "subcategory": "groceries",
  "confidence": 0.94,
  "alternatives": [
    {"category": "shopping", "confidence": 0.04},
    {"category": "household", "confidence": 0.02}
  ]
}
```

### Get Model Info
```http
GET /api/v1/ml/model-info
```

**Response (200)**:
```json
{
  "is_trained": true,
  "categories": [
    "income", "food", "transport", "utilities", 
    "entertainment", "healthcare", "shopping", 
    "housing", "education", "investment"
  ],
  "model_type": "Multinomial Naive Bayes",
  "training_samples": 5000,
  "accuracy": 0.89
}
```

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid authentication credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "Invalid email format",
      "type": "value_error"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## 📝 Rate Limiting

Production API includes rate limiting:
- **Standard tier**: 100 requests per minute
- **Premium tier**: 1000 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698058800
```

---

## 🔗 Webhooks (Coming Soon)

Subscribe to real-time events:
- Transaction created
- Budget exceeded
- Goal achieved
- Investment update

---

**For additional support, contact: support@nexusfinance.ai**
