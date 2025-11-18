# 🤝 Contributing to Nexus Finance AI

Thank you for your interest in contributing to Nexus Finance AI! This document provides guidelines and instructions for contributing to our production-ready personal finance platform.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Development Setup](#development-setup)
3. [Coding Standards](#coding-standards)
4. [Git Workflow](#git-workflow)
5. [Testing Requirements](#testing-requirements)
6. [Pull Request Process](#pull-request-process)
7. [ML Model Contributions](#ml-model-contributions)

---

## 🤝 Code of Conduct

### Our Standards

- **Be Respectful:** Treat all contributors with respect
- **Be Constructive:** Provide helpful feedback
- **Be Inclusive:** Welcome diverse perspectives
- **Be Professional:** Maintain professional communication

---

## 🛠️ Development Setup

### Prerequisites

```bash
# Required
Python 3.10+
Node.js 16+
PostgreSQL 13+ (or SQLite for development)
Git

# Recommended
Docker
VS Code with extensions
Postman or similar API testing tool
```

### Initial Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/yourusername/nexus-finance-ai.git
cd nexus-finance-ai

# 2. Create a development branch
git checkout -b feature/your-feature-name

# 3. Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 4. Frontend setup
cd ../frontend
npm install

# 5. Generate sample data
cd ../backend
python generate_sample_data.py

# 6. Start development servers
# Terminal 1: Backend
python main.py

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 📐 Coding Standards

### Python (Backend)

```python
# Use PEP 8 style guide
# Use type hints
def classify_transaction(description: str, amount: float) -> dict:
    """
    Classify transaction using ML model.
    
    Args:
        description: Transaction description
        amount: Transaction amount
        
    Returns:
        dict: Classification result with category and confidence
    """
    pass

# Use docstrings for all functions
# Maximum line length: 100 characters
# Use meaningful variable names
```

### JavaScript/React (Frontend)

```javascript
// Use ES6+ features
// Use functional components with hooks

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Meaningful function names
  const handleSaveTransaction = async () => {
    // Implementation
  };
  
  return (
    // JSX code
  );
};

export default TransactionCard;
```

### Naming Conventions

```
Files:           PascalCase for components (Dashboard.jsx)
                 snake_case for Python modules (transaction_classifier.py)
                 
Functions:       camelCase for JS (calculateBalance)
                 snake_case for Python (calculate_balance)
                 
Constants:       UPPER_SNAKE_CASE (API_BASE_URL)

Components:      PascalCase (TransactionList)

CSS Classes:     kebab-case (transaction-card)

Database Tables: snake_case (financial_goals)
```

---

## 🔀 Git Workflow

### Branch Naming

```
feature/add-bill-splitting
bugfix/fix-budget-calculation
hotfix/critical-security-patch
docs/update-api-documentation
ml/improve-classification-model
test/add-analytics-tests
refactor/optimize-queries
```

### Commit Messages

Follow the Conventional Commits specification:

```bash
# Format
<type>(<scope>): <subject>

<body>

<footer>

# Examples
feat(ml): add improved transaction classifier

Implemented new Naive Bayes classifier with 92% accuracy.
Includes confidence scoring and fallback logic.

Closes #123

fix(analytics): resolve cash flow calculation error

Fixed bug where negative balances weren't properly
reflected in forecasting algorithm.

Fixes #456

ml(classifier): retrain model with new dataset

Updated training data with 5000+ additional transactions
from Zimbabwean users. Improved accuracy from 87% to 92%.

Performance improvement: 25% faster inference time.
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `ml`: Machine learning changes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes

---

## 🧪 Testing Requirements

### Minimum Requirements

All contributions must include:

1. **Unit Tests** - Minimum 85% coverage for new code
2. **Integration Tests** - For API endpoints
3. **ML Model Tests** - For classifier changes
4. **Manual Testing** - Test your changes locally

### Running Tests

```bash
# Backend tests
cd backend
pytest test_backend.py -v
pytest test_advanced_features.py -v

# Frontend tests
cd frontend
npm test

# ML model validation
cd backend
python -m pytest tests/test_ml_models.py -v

# Check test coverage
pytest --cov=. --cov-report=html
```

### Writing Tests

```python
# Backend test example
def test_transaction_classification():
    """Test ML classifier with sample transaction."""
    classifier = TransactionClassifier()
    classifier.train()
    
    result = classifier.classify(
        "TM Pick n Pay Groceries",
        125.50
    )
    
    assert result['category'] == 'Groceries'
    assert result['confidence'] > 0.7
    assert 'Groceries' in result['category']
```

```javascript
// Frontend test example
describe('TransactionList', () => {
  it('renders transactions correctly', () => {
    const transactions = [
      { id: 1, description: 'Salary', amount: 1500, type: 'income' }
    ];
    
    render(<TransactionList transactions={transactions} />);
    
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();
  });
});
```

---

## 📝 Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Update documentation if needed
3. ✅ Follow code style guidelines
4. ✅ Add/update tests for your changes
5. ✅ Ensure no merge conflicts
6. ✅ Update CHANGELOG.md

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] ML model improvement
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] ML model validated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally

## Performance Impact
Describe any performance implications

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #issue_number
```

---

## 🤖 ML Model Contributions

### Model Training Guidelines

```python
# 1. Data preparation
def prepare_training_data():
    """Prepare and clean training data."""
    # Load data
    # Clean and normalize
    # Split train/test sets
    pass

# 2. Model training
def train_model():
    """Train the classification model."""
    # Initialize model
    # Train with cross-validation
    # Evaluate performance
    pass

# 3. Model validation
def validate_model():
    """Validate model accuracy."""
    # Test on holdout set
    # Calculate metrics
    # Compare with baseline
    pass
```

### Model Performance Requirements

- **Accuracy:** Minimum 85% on test set
- **Inference Time:** <500ms per prediction
- **False Positive Rate:** <15%
- **Model Size:** <50MB

### Submitting Model Updates

1. Train model with new data
2. Validate performance metrics
3. Document improvements
4. Include test results
5. Update model version

---

## 🏆 Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Credited in release notes
- Added to CONTRIBUTORS.md
- Eligible for contributor badge

---

## 📚 Development Resources

### Documentation
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Manual](docs/USER_MANUAL.md)

### Tools
- **Linting:** Flake8 (Python), ESLint (JavaScript)
- **Formatting:** Black (Python), Prettier (JavaScript)
- **Testing:** Pytest (Backend), Jest (Frontend)
- **ML:** scikit-learn, pandas, numpy

---

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙋 Questions?

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Create a new discussion
4. Contact maintainers

---

**Thank you for contributing to Nexus Finance AI!** 🚀

*Together, we're building better financial management for Zimbabwe* 🇿🇼
