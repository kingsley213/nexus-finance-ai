# 🚀 Nexus Finance AI - Production-Grade Personal Finance Platform

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Overview

**Nexus Finance AI** is a hyperinflation-resilient, AI-powered personal finance management platform specifically designed for Zimbabwe and emerging markets. Built with 6+ months of development, testing, and production-grade features, this platform provides comprehensive financial tracking, intelligent insights, and multi-currency support.

### 🎯 Key Features

#### 💰 **Financial Management**
- **Multi-Currency Support**: USD, ZiG (Zimbabwe Gold), ZAR, and other currencies
- **Smart Transaction Classification**: ML-powered automatic categorization
- **Multiple Account Types**: Bank accounts, mobile money (EcoCash), cash, and savings
- **Budget Tracking**: Real-time budget monitoring with intelligent alerts
- **Financial Goals**: Track and manage multiple financial objectives

#### 🤖 **AI-Powered Intelligence**
- **Advanced Forecasting**: Predictive cash flow analysis with inflation adjustments
- **Spending Insights**: AI-generated recommendations for savings opportunities
- **Pattern Recognition**: Identify spending patterns and anomalies
- **Zimbabwe-Specific Analytics**: Economic indicators and market trends

#### 📊 **Investment & Asset Tracking**
- **Portfolio Management**: Track stocks, bonds, real estate, and crypto investments
- **Performance Analytics**: Real-time ROI and gain/loss calculations
- **Risk Assessment**: Investment risk profiling and diversification insights
- **Market Integration**: Zimbabwe Stock Exchange (ZSE) data integration

#### 🔔 **Smart Notifications & Alerts**
- **Budget Alerts**: Automatic warnings when approaching budget limits
- **Bill Reminders**: Never miss recurring payments
- **Goal Milestones**: Celebrate financial achievements
- **Security Alerts**: Unusual transaction detection

#### 📈 **Advanced Analytics**
- **Cash Flow Forecasting**: 6-month predictive modeling
- **Financial Health Score**: Comprehensive financial wellness assessment
- **Spending Trends**: Visual analytics and category breakdown
- **Comparative Analysis**: Month-over-month and year-over-year comparisons

#### 🔒 **Enterprise Security**
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user credentials
- **Audit Logging**: Complete activity tracking for compliance
- **Data Encryption**: Secure data storage and transmission

## 🏗️ Technical Architecture

### Backend Stack
- **Framework**: FastAPI (Python 3.10+)
- **Database**: SQLAlchemy ORM with SQLite/PostgreSQL
- **ML/AI**: scikit-learn, pandas, numpy
- **Authentication**: JWT with python-jose
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

### Frontend Stack
- **Framework**: React 18.2 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Machine Learning Models
- **Transaction Classifier**: Multinomial Naive Bayes
- **Spending Predictor**: Time series forecasting
- **Anomaly Detection**: Statistical outlier detection
- **Inflation Modeling**: Economic trend analysis

## 📦 Project Structure

```
nexus-finance-ai/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── user_models.py           # Core data models
│   │   └── advanced_models.py       # Extended features
│   ├── app/
│   │   ├── auth.py                  # Authentication logic
│   │   └── config.py                # Configuration management
│   ├── ml/
│   │   └── transaction_classifier.py # ML categorization
│   ├── analytics/
│   │   └── financial_analytics.py   # Analytics engine
│   ├── advanced_ai/
│   │   └── forecasting.py           # AI forecasting
│   ├── api_extensions.py            # Extended API endpoints
│   ├── main.py                      # Main FastAPI application
│   ├── generate_sample_data.py      # Sample data generator
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Transactions.jsx     # Transaction management
│   │   │   ├── Analytics.jsx        # Analytics views
│   │   │   ├── Goals.jsx            # Financial goals
│   │   │   ├── Accounts.jsx         # Account management
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── services/
│   │   │   └── api.js               # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── USER_MANUAL.md
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- Node.js 16+ and npm
- Git

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/nexus-finance-ai.git
cd nexus-finance-ai
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate sample data (6 months of transactions)
python generate_sample_data.py

# Start backend server
python main.py
```

The backend API will be available at: `http://localhost:8000`

#### 3️⃣ Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

## 👥 Demo Accounts

The sample data generator creates 5 users with 6 months of realistic transaction history:

| Email | Password | Profile Type | Description |
|-------|----------|--------------|-------------|
| john.mukweva@gmail.com | Demo123! | Mid-Career Professional | Salary earner with standard expenses |
| tanya.moyo@yahoo.com | Demo123! | Entrepreneur | Business owner with investments |
| tendai.ncube@outlook.com | Demo123! | Young Professional | Entry-level with education goals |
| grace.sibanda@gmail.com | Demo123! | Family Head | Multiple dependents, education focus |
| david.chikwanha@gmail.com | Demo123! | Investor | Active portfolio management |

Each account includes:
- ✅ 3-4 accounts (Bank, Mobile Money, Cash, Savings)
- ✅ 300-400+ transactions over 6 months
- ✅ Realistic spending patterns (groceries, fuel, utilities, dining, etc.)
- ✅ Financial goals with progress tracking
- ✅ Active budgets across multiple categories
- ✅ Investment portfolios (where applicable)
- ✅ Recurring transactions and bills

## 📊 Features Walkthrough

### Dashboard
- **Real-time Balance Overview**: All accounts at a glance
- **Recent Transactions**: Latest activity with smart categorization
- **Budget Status**: Visual progress bars for all categories
- **Goal Tracking**: Progress toward financial objectives
- **Quick Actions**: Add transactions, transfer funds, create goals

### Analytics
- **Spending Breakdown**: Interactive pie charts by category
- **Trend Analysis**: Line graphs showing spending patterns
- **Cash Flow Visualization**: Income vs. expenses over time
- **Category Insights**: Detailed analysis of spending habits
- **Zimbabwe Context**: Inflation-adjusted analytics

### Advanced Features
- **AI Forecasting**: 6-month predictive cash flow analysis
- **Financial Health Score**: Comprehensive wellness assessment
- **Investment Tracking**: Portfolio performance and ROI
- **Recurring Bills**: Automated payment tracking and reminders
- **Budget Alerts**: Smart notifications for overspending

## 🔧 API Documentation

### Core Endpoints

#### Authentication
```
POST /api/v1/register - Register new user
POST /api/v1/login - User login
GET  /api/v1/me - Get current user
```

#### Accounts
```
GET  /api/v1/accounts - List all accounts
POST /api/v1/accounts - Create new account
PUT  /api/v1/accounts/{id} - Update account
```

#### Transactions
```
GET  /api/v1/transactions - List transactions (with filters)
POST /api/v1/transactions - Create transaction
PUT  /api/v1/transactions/{id} - Update transaction
DELETE /api/v1/transactions/{id} - Delete transaction
```

#### Budgets
```
GET  /api/v1/budgets - Get all budgets
POST /api/v1/budgets - Create budget
PUT  /api/v1/budgets/{id} - Update budget
```

#### Investments
```
GET  /api/v1/investments - List investments with returns
POST /api/v1/investments - Add investment
PUT  /api/v1/investments/{id} - Update investment value
```

#### Analytics
```
GET  /api/v1/analytics/spending-insights - AI spending analysis
GET  /api/v1/analytics/cash-flow-forecast - Predictive modeling
GET  /api/v1/analytics/financial-health - Health score calculation
GET  /api/v1/advanced-analytics/ai-forecast - Advanced forecasting
```

#### Goals
```
GET  /api/v1/goals - List financial goals
POST /api/v1/goals - Create goal
PUT  /api/v1/goals/{id} - Update goal progress
```

Full API documentation available at: `http://localhost:8000/docs` (Swagger UI)

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest test_backend.py -v
pytest test_advanced_features.py -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
python test_all.py
```

## 📈 Database Schema

### Core Tables
- **users**: User accounts and authentication
- **accounts**: Financial accounts (bank, mobile money, cash)
- **transactions**: All financial transactions
- **financial_goals**: Savings and financial objectives

### Extended Tables
- **budgets**: Monthly/periodic budget allocations
- **investments**: Investment portfolio tracking
- **recurring_transactions**: Scheduled bills and payments
- **notifications**: User alerts and reminders
- **audit_logs**: Security and compliance logging
- **financial_insights**: AI-generated recommendations
- **user_preferences**: User settings and configurations

## 🌍 Zimbabwe-Specific Features

### Multi-Currency Support
- **USD**: Primary transaction currency
- **ZiG**: Zimbabwe Gold (new currency)
- **ZAR**: South African Rand
- **Historical ZWL**: Legacy currency support

### Local Market Integration
- **Real-time Exchange Rates**: Official and parallel market rates
- **Inflation Modeling**: Hyperinflation-adjusted forecasting
- **Local Merchants**: Pre-configured Zimbabwean retailers
- **Mobile Money**: EcoCash and OneMoney integration ready

### Economic Indicators
- Exchange rate trends
- Inflation rates and forecasts
- GDP growth tracking
- Interest rate monitoring

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔐 Security Best Practices

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS configuration for production
- ✅ SQL injection prevention via ORM
- ✅ Input validation and sanitization
- ✅ Audit logging for compliance
- ✅ Rate limiting (production ready)
- ✅ HTTPS enforcement (deployment)

## 🚀 Production Deployment

### Environment Variables
Create `.env` file in backend directory:
```env
DATABASE_URL=postgresql://user:pass@localhost/nexus_finance
SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=https://yourdomain.com
```

### Deployment Platforms
- **Backend**: Heroku, AWS, DigitalOcean, Railway
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: PostgreSQL (AWS RDS, Heroku Postgres)

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Manual](docs/USER_MANUAL.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development Team

- **Lead Developer**: Your Name
- **ML Engineer**: Your Name
- **UI/UX Designer**: Your Name
- **QA Engineer**: Your Name

## 📞 Support

- **Email**: support@nexusfinance.ai
- **Documentation**: https://docs.nexusfinance.ai
- **Issue Tracker**: https://github.com/yourusername/nexus-finance-ai/issues

## 🎯 Roadmap

### ✅ Completed (v1.0)
- Core transaction management
- Multi-account support
- AI-powered categorization
- Budget tracking
- Financial goals
- Investment tracking
- Advanced analytics
- 6 months sample data

### 🚧 In Progress (v1.1)
- Bank API integration
- Mobile app (React Native)
- Advanced reporting
- Export capabilities

### 📅 Planned (v2.0)
- Multi-user family accounts
- Bill splitting
- Debt tracking
- Tax optimization
- Financial advisor AI chatbot

## ⭐ Acknowledgments

- Zimbabwe economic data providers
- Open-source community
- Beta testers and early adopters
- Financial technology experts

---

**Built with ❤️ for Zimbabwe and emerging markets**

*Making financial management accessible, intelligent, and hyperinflation-resilient.*
