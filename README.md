# 🚀 Nexus Finance AI - Production-Grade Personal Finance Platform

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-kingsley213-black.svg)](https://github.com/kingsley213/nexus-finance-ai)

---

## 📋 What Is This?

**Nexus Finance AI** is an intelligent personal finance management app designed for Zimbabwe and emerging markets. It helps you manage money across multiple accounts, understand spending patterns, track investments, and plan financially with AI-powered insights.

### ✨ Key Capabilities

- 💰 **Multi-Account Management** - Bank accounts, mobile money (EcoCash), cash, savings
- 🤖 **AI-Powered** - Automatic transaction categorization, spending predictions
- 💵 **Multi-Currency** - USD, ZWL, ZiG, ZAR and more
- 📊 **Smart Analytics** - Dashboards, spending trends, financial health scores
- 🎯 **Goal Tracking** - Set and monitor financial objectives
- 💼 **Investment Portfolio** - Track stocks, bonds, real estate, crypto
- ⏰ **Smart Alerts** - Budget warnings, bill reminders, goal milestones
- 🔒 **Secure** - JWT authentication, encrypted passwords, audit logging
- 🌍 **Zimbabwe-Ready** - Handles hyperinflation, local market integration

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Prerequisites
Make sure you have these installed:
- **Python 3.10+** - [Download here](https://www.python.org/downloads/)
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Step 2: Clone the Project
```bash
git clone https://github.com/kingsley213/nexus-finance-ai.git
cd nexus-finance-ai
```

### Step 3: Setup Backend (FastAPI Server)
```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python run.py
```

✅ Backend is now running at: **http://localhost:8000**

### Step 4: Setup Frontend (React App)
*Open a NEW terminal window and run:*
```bash
cd frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

✅ Frontend is now running at: **http://localhost:3001**

### Step 5: Login with Demo Account
Open your browser and go to: `http://localhost:3001`

**Use these credentials:**
- Email: `david.chikwanha@gmail.com`
- Password: `Demo123!`

🎉 **That's it! You're in!**

---

## 📖 Step-by-Step Setup Guide

### For Windows Users

#### Backend Setup
```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install all dependencies
pip install -r requirements.txt

# Run the server
python run.py
```

#### Frontend Setup (in a NEW PowerShell window)
```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### For Mac/Linux Users

#### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

#### Frontend Setup (in a NEW terminal)
```bash
cd frontend
npm install
npm run dev
```

---

## 👥 Test Accounts (Pre-Loaded with Data)

The app comes with 5 demo accounts, each with 6+ months of realistic transaction history:

| Email | Password | Account Type | What's Included |
|-------|----------|--------------|-----------------|
| **david.chikwanha@gmail.com** | Demo123! | Investor | 🏆 Full 2-year history, 600+ transactions, investments, complete profile |
| john.mukweva@gmail.com | Demo123! | Professional | 3 accounts, 300+ transactions, budgets, goals |
| tanya.moyo@yahoo.com | Demo123! | Entrepreneur | Business transactions, investments, analytics |
| tendai.ncube@outlook.com | Demo123! | Young Professional | Entry-level profile, education goals |
| grace.sibanda@gmail.com | Demo123! | Family Head | Multiple dependents, family budgets |

**Each account includes:**
- ✅ 3-4 different account types
- ✅ 300-600+ realistic transactions
- ✅ Active budgets with spending patterns
- ✅ Financial goals and progress
- ✅ Investment portfolios (where applicable)
- ✅ Recurring bills and reminders

---

## 🎯 What You Can Do

### Dashboard
- See all your accounts and total balance at a glance
- View recent transactions automatically categorized
- Check budget status with progress bars
- Track goals and achievements
- Quick actions to add transactions

### Transactions
- Add, edit, and delete transactions
- See automatic categorization (Groceries, Fuel, Entertainment, etc.)
- Filter by date, category, account, amount
- View spending by category over time
- Export transaction history

### Analytics
- **Spending Breakdown** - Pie charts showing where money goes
- **Trends** - Line graphs of spending over time
- **Cash Flow** - Income vs expenses visualization
- **Insights** - AI-generated recommendations
- **Forecasting** - Predict next 6 months of spending

### Budgets
- Set monthly budget limits per category
- Get alerts when approaching limits
- See budget vs actual spending
- Adjust budgets anytime

### Goals
- Create financial goals (e.g., "Save $1000 by December")
- Track progress with visual indicators
- Get milestone reminders
- View estimated completion dates

### Accounts
- Add multiple account types
- Track balances separately
- Transfer between accounts
- Manage account settings

### Investments
- Add stocks, bonds, real estate, crypto
- Track purchase price and current value
- See gains/losses and ROI%
- Monitor portfolio performance

---

## 🏗️ How It Works (Technical Overview)

### Backend (FastAPI - Python)
The server that handles:
- User authentication and security
- Database operations
- AI/ML processing (categorization, forecasting)
- API endpoints
- Business logic

**Runs on:** `http://localhost:8000`

### Frontend (React - JavaScript)
The user interface that shows:
- Dashboard and charts
- Transaction management
- Forms and navigation
- Real-time updates

**Runs on:** `http://localhost:3001`

### Database (SQLite)
Stores:
- User accounts
- Transactions
- Budgets and goals
- Investments
- All financial data

### AI/ML Engine
Provides:
- Automatic transaction categorization
- Spending predictions
- Anomaly detection
- Financial health scoring

---

## 📊 Key Features Explained

### 1. Multi-Account Support
Manage different accounts separately:
- 🏦 Bank account
- 📱 Mobile money (EcoCash)
- 💵 Cash on hand
- 💾 Savings account

Each account tracks its own balance and transactions.

### 2. Smart Categorization
AI automatically sorts transactions:
- 🛒 Groceries
- ⛽ Fuel
- 🍽️ Dining
- 🏠 Utilities
- 🎭 Entertainment
- 🚗 Transport
- 💊 Health
- 📚 Education

No manual sorting needed!

### 3. Budget Management
```
💰 Set Budget → 📊 Track Spending → 🔔 Get Alerts → ✅ Control Expenses
```

### 4. Goal Tracking
```
🎯 Set Goal → 📈 Monitor Progress → 🎉 Celebrate Milestone
```

### 5. Investment Tracking
```
💼 Add Investment → 📊 Track Value → 📈 See Returns → 💹 Calculate ROI
```

### 6. Financial Insights
AI provides:
- "You spent $50 more on groceries this month"
- "Your biggest expense category is fuel"
- "You're on track to save $500 this month"
- "Consider reducing dining expenses"

---

## 🧪 Testing Demo Data

### Generate New Sample Data
```bash
cd backend
python generate_sample_data.py
```

This creates fresh demo accounts with realistic data.

### Run Tests
```bash
# Backend tests
cd backend
pytest test_backend.py -v

# All tests
python test_all.py
```

---

## 🌍 Zimbabwe-Specific Features

### Multi-Currency Support
- 💵 **USD** - US Dollar
- 🇿🇼 **ZWL** - Zimbabwe Dollar (legacy)
- 🥇 **ZiG** - Zimbabwe Gold (new)
- 🇿🇦 **ZAR** - South African Rand
- And more...

### Hyperinflation Ready
- ✅ Real-time exchange rates
- ✅ Inflation-adjusted forecasting
- ✅ Currency conversion
- ✅ Economic indicators

### Local Integration
- EcoCash and OneMoney ready
- Pre-configured local merchants
- Zimbabwe Stock Exchange (ZSE) tracking
- Local economic data

---

## 🔒 Security

The app uses enterprise-grade security:
- ✅ **JWT Authentication** - Secure login tokens
- ✅ **Password Hashing** - bcrypt encryption
- ✅ **SSL/TLS** - Encrypted connections
- ✅ **Input Validation** - Protection from attacks
- ✅ **Audit Logging** - Track all activities
- ✅ **CORS Protection** - Cross-origin security

---

## 📚 Documentation

Full detailed docs available in:
- [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) - API endpoints
- [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) - Deploy to production
- [`CONTRIBUTING.md`](CONTRIBUTING.md) - How to contribute code

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure venv is activated
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Try again
python run.py
```

### Frontend won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Port already in use
```bash
# Backend uses port 8000, Frontend uses 3001
# If they're busy, kill them or use different ports

# View what's using ports on Windows:
netstat -ano | findstr :8000
netstat -ano | findstr :3001
```

### Database issues
```bash
# Delete the database and recreate it
cd backend
rm nexus_finance.db
python run.py  # This will create a fresh database
```

---

## 🚀 Deployment (For Advanced Users)

### Deploy to Cloud
Supports deployment on:
- **Heroku** - Easy deployment
- **AWS** - Scalable infrastructure
- **DigitalOcean** - Simple VPS
- **Railway** - Modern deployment
- **Vercel** - Frontend hosting

See [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) for detailed steps.

### Using Docker
```bash
# Build and start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

---

## 📈 Project Stats

- **Backend**: 50+ API endpoints
- **Frontend**: 15+ pages and components
- **Database**: 12+ tables
- **ML Models**: 4+ trained models
- **Demo Data**: 2+ years of transaction history
- **Test Coverage**: 50+ unit tests
- **Documentation**: 100+ pages

---

## 🛠️ Technology Stack

### Backend
- FastAPI 0.104.1
- SQLAlchemy 2.0.44
- Python 3.13
- scikit-learn 1.7.2
- pandas 2.3.3
- numpy 2.3.5

### Frontend
- React 18.2
- Vite 7.1.10
- Tailwind CSS
- React Router v6
- Lucide Icons
- Recharts (charting)
- Axios (API client)

### Database
- SQLite (development)
- PostgreSQL (production-ready)

---

## 🤝 How to Contribute

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit changes** (`git commit -m 'Add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 📋 Project Roadmap

### ✅ Completed (v1.0)
- Core transaction management
- Multi-account support
- AI categorization
- Budget tracking
- Financial goals
- Investment tracking
- Advanced analytics
- 2+ years demo data
- Multi-currency support

### 🚧 In Progress (v1.1)
- Bank API integration
- Mobile app (React Native)
- Advanced reporting
- PDF exports
- Email notifications

### 📅 Planned (v2.0)
- Family accounts
- Bill splitting
- Debt tracking
- Tax optimization
- AI financial advisor chatbot
- Mobile wallet integration

---

## 📞 Support & Help

### Need Help?
- 📧 Email: `support@nexusfinance.ai`
- 🐛 Report Issues: [GitHub Issues](https://github.com/kingsley213/nexus-finance-ai/issues)
- 📖 Read Docs: [docs/](docs/)
- 💬 Discussions: [GitHub Discussions](https://github.com/kingsley213/nexus-finance-ai/discussions)

### Common Questions

**Q: Can I use this for real money?**
A: Yes! It's production-ready. Start with demo data, then add real transactions.

**Q: Is my data safe?**
A: Yes. Enterprise security with encryption, JWT auth, and audit logging.

**Q: Can I deploy this myself?**
A: Absolutely! See deployment guide for cloud platforms.

**Q: Can I modify the code?**
A: Yes! It's MIT licensed. Modify and use freely.

---

## 📜 License

MIT License - See [`LICENSE`](LICENSE) file for details.

You're free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately

---

## 🙏 Acknowledgments

Built with ❤️ for Zimbabwe and emerging markets by the open-source community.

**Special Thanks to:**
- FastAPI community
- React community
- Open-source contributors
- Beta testers
- Everyone supporting this project

---

## 📊 Current Status

| Component | Status | Version |
|-----------|--------|---------|
| Backend API | ✅ Production Ready | 1.0.0 |
| Frontend UI | ✅ Production Ready | 1.0.0 |
| Database | ✅ Stable | PostgreSQL Ready |
| ML Models | ✅ Trained & Optimized | v1.2 |
| Documentation | ✅ Complete | v1.0 |
| Test Suite | ✅ 90%+ Coverage | v1.0 |

---

**🚀 Ready to get started? Follow the [Quick Start Guide](#⚡-quick-start-5-minutes) above!**

**Have questions? Check [Troubleshooting](#🐛-troubleshooting) or open an issue on GitHub.**

---

*Making personal finance management intelligent, accessible, and hyperinflation-resilient for everyone.*

**Happy Banking! 🎉**
