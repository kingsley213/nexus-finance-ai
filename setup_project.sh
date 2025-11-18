#!/bin/bash

echo "🚀 Setting up Nexus Finance AI Project..."

echo "📦 Setting up backend..."
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Initialize database
python -c "
from models import create_tables
from ml.transaction_classifier import classifier
create_tables()
classifier.train()
print('✅ Database and ML model initialized')
"

cd ..

echo "📦 Setting up frontend..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo "🎯 To start the application:"
echo "   docker-compose up --build"
echo ""
echo "🌐 Or run separately:"
echo "   Backend: cd backend && python run.py"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "📱 Application will be available at:"
echo "   Frontend: http://localhost:3001"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"
