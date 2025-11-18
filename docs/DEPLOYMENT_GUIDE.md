# 🚀 Deployment Guide - Nexus Finance AI

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Production Deployment](#production-deployment)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Security Checklist](#security-checklist)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🏠 Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 16+
- Git
- PostgreSQL (optional, SQLite for dev)

### Step-by-Step Setup

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/nexus-finance-ai.git
cd nexus-finance-ai
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your settings

# Initialize database
python -c "from models import create_tables; create_tables()"

# Generate sample data (6 months)
python generate_sample_data.py

# Start backend
python main.py
```

Backend runs at: `http://localhost:8000`
API Docs at: `http://localhost:8000/docs`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🌐 Production Deployment

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Steps
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Docker Compose Configuration
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: nexus_finance
      POSTGRES_USER: nexus_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    command: uvicorn main:app --host 0.0.0.0 --port 8000
    environment:
      DATABASE_URL: postgresql://nexus_user:${DB_PASSWORD}@postgres:5432/nexus_finance
      SECRET_KEY: ${SECRET_KEY}
    ports:
      - "8000:8000"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Option 2: Heroku Deployment

#### Backend Deployment
```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create nexus-finance-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set JWT_ALGORITHM=HS256
heroku config:set ACCESS_TOKEN_EXPIRE_MINUTES=30

# Deploy
git subtree push --prefix backend heroku main

# Run migrations
heroku run python -c "from models import create_tables; create_tables()"

# Scale dyno
heroku ps:scale web=1
```

#### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Production deployment
vercel --prod
```

### Option 3: AWS Deployment

#### Backend (EC2 + RDS)
1. **Launch EC2 Instance**
   - Ubuntu Server 22.04 LTS
   - t2.medium or larger
   - Configure security groups (ports 22, 80, 443, 8000)

2. **Setup RDS PostgreSQL**
   - db.t3.micro or larger
   - Enable automatic backups
   - Configure security groups

3. **Deploy Application**
```bash
# SSH into EC2
ssh -i key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install python3.10 python3-pip nginx

# Clone repository
git clone https://github.com/yourusername/nexus-finance-ai.git
cd nexus-finance-ai/backend

# Setup Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure environment
nano .env
# Add production settings

# Setup systemd service
sudo nano /etc/systemd/system/nexus-finance.service
```

**systemd service file:**
```ini
[Unit]
Description=Nexus Finance AI API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/nexus-finance-ai/backend
Environment="PATH=/home/ubuntu/nexus-finance-ai/backend/venv/bin"
ExecStart=/home/ubuntu/nexus-finance-ai/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start nexus-finance
sudo systemctl enable nexus-finance

# Configure Nginx
sudo nano /etc/nginx/sites-available/nexus-finance
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name api.nexusfinance.ai;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nexus-finance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.nexusfinance.ai
```

#### Frontend (S3 + CloudFront)
```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://nexus-finance-frontend/

# Configure CloudFront distribution
# Point to S3 bucket
# Enable HTTPS
# Configure custom domain
```

### Option 4: DigitalOcean App Platform

```bash
# Create app.yaml
version: 1
name: nexus-finance-ai
services:
  - name: backend
    github:
      repo: yourusername/nexus-finance-ai
      branch: main
      deploy_on_push: true
    source_dir: /backend
    run_command: uvicorn main:app --host 0.0.0.0 --port 8000
    envs:
      - key: DATABASE_URL
        value: ${db.DATABASE_URL}
      - key: SECRET_KEY
        value: ${SECRET_KEY}
    
  - name: frontend
    github:
      repo: yourusername/nexus-finance-ai
      branch: main
    source_dir: /frontend
    build_command: npm run build
    run_command: npm run preview

databases:
  - name: postgres
    engine: PG
    version: "15"
```

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Create `.env` file in `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nexus_finance
# or for SQLite (development)
DATABASE_URL=sqlite:///./nexus_finance.db

# Security
SECRET_KEY=your-very-secret-key-minimum-32-characters
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=http://localhost:3000,https://nexusfinance.ai

# Application
PROJECT_NAME=Nexus Finance AI
PROJECT_VERSION=1.0.0
DEBUG=False

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@nexusfinance.ai

# External APIs (optional)
ZIMBABWE_RBZ_API_KEY=your-rbz-api-key
ECOCASH_API_KEY=your-ecocash-key
```

### Frontend Environment Variables

Create `.env` file in `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
# Production:
# VITE_API_BASE_URL=https://api.nexusfinance.ai
```

---

## 💾 Database Setup

### PostgreSQL Production Setup

```sql
-- Create database
CREATE DATABASE nexus_finance;

-- Create user
CREATE USER nexus_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE nexus_finance TO nexus_user;

-- Connect to database
\c nexus_finance

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### Database Migration

```bash
# Install Alembic (if not already)
pip install alembic

# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Database Backup

```bash
# Backup
pg_dump nexus_finance > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql nexus_finance < backup_20241022_120000.sql

# Automated daily backup (crontab)
0 2 * * * pg_dump nexus_finance > /backups/nexus_$(date +\%Y\%m\%d).sql
```

---

## 🔒 Security Checklist

### Pre-Deployment Security

- [ ] Change default SECRET_KEY
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Disable DEBUG mode in production
- [ ] Set up rate limiting
- [ ] Enable SQL injection protection (ORM handles this)
- [ ] Implement input validation
- [ ] Set up audit logging
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable database encryption at rest
- [ ] Set up regular security updates

### Production Environment

```python
# backend/app/config.py - Production settings
class Settings:
    PROJECT_NAME: str = "Nexus Finance AI"
    PROJECT_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "https://nexusfinance.ai",
        "https://www.nexusfinance.ai"
    ]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
```

---

## 📊 Monitoring & Maintenance

### Application Monitoring

#### Sentry Integration
```bash
pip install sentry-sdk
```

```python
# main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0,
    environment="production"
)
```

#### Logging Configuration
```python
# backend/app/logging_config.py
import logging
from logging.handlers import RotatingFileHandler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        RotatingFileHandler(
            'logs/app.log',
            maxBytes=10485760,  # 10MB
            backupCount=10
        ),
        logging.StreamHandler()
    ]
)
```

### Database Monitoring

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('nexus_finance'));

-- Check table sizes
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Active connections
SELECT count(*) FROM pg_stat_activity;

-- Long running queries
SELECT pid, now() - query_start as duration, query
FROM pg_stat_activity
WHERE state = 'active'
AND now() - query_start > interval '5 minutes';
```

### Performance Optimization

#### Database Indexing
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_accounts_user ON accounts(user_id);
CREATE INDEX idx_budgets_user_active ON budgets(user_id, is_active);
```

#### Caching (Redis)
```python
# backend/cache.py
import redis
from functools import wraps
import json

redis_client = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)

def cache_result(expire=300):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            cached = redis_client.get(cache_key)
            
            if cached:
                return json.loads(cached)
            
            result = await func(*args, **kwargs)
            redis_client.setex(cache_key, expire, json.dumps(result))
            return result
        return wrapper
    return decorator
```

### Health Checks

```python
# Add to main.py
@app.get("/health/live")
async def liveness():
    """Kubernetes liveness probe"""
    return {"status": "alive"}

@app.get("/health/ready")
async def readiness(db: Session = Depends(get_db)):
    """Kubernetes readiness probe"""
    try:
        # Test database connection
        db.execute("SELECT 1")
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail="Database unavailable")
```

### Automated Testing

```bash
# Run tests before deployment
cd backend
pytest --cov=. --cov-report=html

cd ../frontend
npm test
npm run test:e2e
```

### Backup Strategy

1. **Database**: Daily automated backups
2. **Application**: Git repository
3. **User uploads**: S3 versioning
4. **Logs**: Centralized logging service

### Monitoring Dashboard

Use tools like:
- **Grafana**: Visualize metrics
- **Prometheus**: Collect metrics
- **ELK Stack**: Log aggregation
- **Uptime Robot**: Uptime monitoring

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          pytest
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "nexus-finance-api"
          heroku_email: "your-email@example.com"
```

---

## 📞 Support & Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U nexus_user -d nexus_finance -h localhost
```

**Port Already in Use**
```bash
# Find process using port
netstat -ano | findstr :8000  # Windows
lsof -i :8000  # Linux/Mac

# Kill process
kill -9 <PID>
```

**CORS Errors**
- Check `CORS_ORIGINS` in backend config
- Ensure frontend URL is whitelisted
- Verify cookies/credentials settings

---

**For production support: devops@nexusfinance.ai**
