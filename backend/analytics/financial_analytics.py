import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any
import asyncio

class AdvancedFinancialAnalytics:
    def __init__(self):
        self.inflation_rate = 0.02  # Default 2% monthly inflation
        
    def calculate_spending_insights(self, transactions: List[Dict]) -> Dict[str, Any]:
        """Generate comprehensive spending insights"""
        if not transactions:
            return {}
        
        df = pd.DataFrame(transactions)
        
        # Convert transaction_date if it's string
        if 'transaction_date' in df.columns:
            df['transaction_date'] = pd.to_datetime(df['transaction_date'])
            df['month'] = df['transaction_date'].dt.to_period('M')
        
        # Monthly spending trends
        monthly_spending = df.groupby('month')['amount'].sum().reset_index()
        monthly_spending['month'] = monthly_spending['month'].astype(str)
        
        # Category breakdown (only expenses, negative amounts)
        expense_df = df[df['amount'] < 0].copy()
        if not expense_df.empty:
            expense_df['amount_abs'] = expense_df['amount'].abs()
            category_spending = expense_df.groupby('category')['amount_abs'].sum().sort_values(ascending=False)
        else:
            category_spending = pd.Series(dtype=float)
        
        # Spending velocity (rate of spending)
        current_month = datetime.now().strftime('%Y-%m')
        last_month = (datetime.now() - timedelta(days=30)).strftime('%Y-%m')
        
        current_spending = monthly_spending[monthly_spending['month'] == current_month]['amount'].sum()
        previous_spending = monthly_spending[monthly_spending['month'] == last_month]['amount'].sum()
        
        spending_velocity = ((current_spending - previous_spending) / abs(previous_spending) * 100 
                           if previous_spending != 0 else 0)
        
        # Recurring expense identification
        recurring_patterns = self.identify_recurring_expenses(df)
        
        # Top merchants
        top_merchants = df.groupby('description')['amount'].sum().abs().sort_values(ascending=False).head(10)
        
        return {
            'monthly_trends': monthly_spending.to_dict('records'),
            'category_breakdown': category_spending.to_dict(),
            'spending_velocity': round(spending_velocity, 2),
            'average_monthly_spend': round(monthly_spending['amount'].mean(), 2),
            'recurring_expenses': recurring_patterns,
            'top_categories': dict(list(category_spending.head(5).items())),
            'top_merchants': top_merchants.to_dict(),
            'total_income': df[df['amount'] > 0]['amount'].sum(),
            'total_expenses': df[df['amount'] < 0]['amount'].sum(),
            'net_cash_flow': df['amount'].sum()
        }
    
    def identify_recurring_expenses(self, df: pd.DataFrame) -> List[Dict]:
        """Identify potential recurring expenses"""
        if df.empty:
            return []
        
        # Group by description and look for patterns
        expense_patterns = df.groupby('description').agg({
            'amount': ['count', 'mean', 'std'],
            'transaction_date': ['min', 'max']
        }).round(2)
        
        # Flatten column names
        expense_patterns.columns = ['_'.join(col).strip() for col in expense_patterns.columns.values]
        
        recurring = []
        for desc, stats in expense_patterns.iterrows():
            count = stats['amount_count']
            date_min = stats['transaction_date_min']
            date_max = stats['transaction_date_max']
            
            if pd.notna(date_min) and pd.notna(date_max):
                date_range = (date_max - date_min).days
            else:
                date_range = 0
            
            if count >= 3 and date_range > 30:  # At least 3 occurrences over 30+ days
                avg_amount = stats['amount_mean']
                frequency = date_range / count  # Average days between occurrences
                
                recurring.append({
                    'description': desc,
                    'frequency_days': round(frequency),
                    'average_amount': round(abs(avg_amount), 2),
                    'occurrences': int(count),
                    'estimated_next_date': (datetime.now() + timedelta(days=frequency)).strftime('%Y-%m-%d')
                })
        
        return sorted(recurring, key=lambda x: x['occurrences'], reverse=True)[:10]  # Top 10
    
    def generate_cash_flow_forecast(self, transactions: List[Dict], 
                                  accounts: List[Dict], inflation_rate: float = None) -> Dict:
        """Generate advanced cash flow forecast with inflation adjustment"""
        if inflation_rate is None:
            inflation_rate = self.inflation_rate
        
        if not transactions:
            return {
                'forecast': [],
                'risk_assessment': 'low',
                'days_until_negative_balance': 30,
                'average_daily_spending': 0,
                'inflation_adjustment': inflation_rate
            }
        
        df = pd.DataFrame(transactions)
        
        # Calculate historical averages (only expenses)
        expense_df = df[df['amount'] < 0].copy()
        if not expense_df.empty:
            expense_df['transaction_date'] = pd.to_datetime(expense_df['transaction_date'])
            expense_df['month'] = expense_df['transaction_date'].dt.to_period('M')
            
            monthly_data = expense_df.groupby('month').agg({
                'amount': ['sum', 'mean', 'std']
            }).reset_index()
            
            # Flatten columns
            monthly_data.columns = ['month', 'total_spent', 'avg_transaction', 'std_transaction']
            
            # Simple forecasting with inflation adjustment
            if len(monthly_data) >= 3:
                last_3_months_avg = monthly_data['total_spent'].tail(3).mean()
            else:
                last_3_months_avg = monthly_data['total_spent'].mean() if not monthly_data.empty else 0
            
            forecast_amount = abs(last_3_months_avg) * (1 + inflation_rate)
        else:
            forecast_amount = 0
        
        # Generate 30-day forecast
        forecast_dates = [datetime.now() + timedelta(days=i) for i in range(1, 31)]
        daily_forecast = forecast_amount / 30  # Distribute monthly forecast
        
        forecast_data = []
        running_balance = sum(acc.get('balance', 0) for acc in accounts)
        
        for i, date in enumerate(forecast_dates):
            running_balance -= daily_forecast
            forecast_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'projected_spending': round(daily_forecast, 2),
                'projected_balance': round(running_balance, 2),
                'day_of_week': date.strftime('%A')
            })
        
        # Risk assessment
        days_until_negative = len([x for x in forecast_data if x['projected_balance'] > 0])
        
        if days_until_negative > 20:
            risk_level = "low"
        elif days_until_negative > 10:
            risk_level = "medium"
        else:
            risk_level = "high"
        
        return {
            'forecast': forecast_data,
            'risk_assessment': risk_level,
            'days_until_negative_balance': days_until_negative,
            'average_daily_spending': round(daily_forecast, 2),
            'inflation_adjustment': inflation_rate,
            'current_balance': sum(acc.get('balance', 0) for acc in accounts)
        }
    
    def calculate_financial_health_score(self, transactions: List[Dict], 
                                       accounts: List[Dict], goals: List[Dict]) -> Dict:
        """Calculate comprehensive financial health score"""
        if not transactions:
            return {
                'score': 0, 
                'breakdown': {},
                'recommendations': ['Start tracking your transactions to get a financial health score.']
            }
        
        df = pd.DataFrame(transactions)
        total_balance = sum(acc.get('balance', 0) for acc in accounts)
        
        # Spending diversity (positive to have diverse spending)
        category_counts = df['category'].nunique() if 'category' in df.columns else 0
        spending_diversity = min(category_counts / 10, 1.0)  # Normalize to 0-1
        
        # Savings rate
        income_transactions = df[df['amount'] > 0]['amount'].sum()
        expense_transactions = abs(df[df['amount'] < 0]['amount'].sum())
        
        if income_transactions > 0:
            savings_rate = (income_transactions - expense_transactions) / income_transactions
            savings_rate = max(0, min(savings_rate, 1))  # Clamp between 0 and 1
        else:
            savings_rate = 0
        
        # Goal progress
        if goals:
            goal_progress = sum(goal.get('current_amount', 0) for goal in goals) / \
                           sum(goal.get('target_amount', 1) for goal in goals)
            goal_progress = min(goal_progress, 1.0)
        else:
            goal_progress = 0
        
        # Balance to monthly expenses ratio
        monthly_expenses = expense_transactions / (len(df['transaction_date'].unique()) or 1)
        if monthly_expenses > 0:
            emergency_fund_ratio = total_balance / monthly_expenses
        else:
            emergency_fund_ratio = 0
        
        # Calculate composite score (0-100)
        score_components = {
            'spending_diversity': spending_diversity * 20,
            'savings_rate': savings_rate * 30,
            'goal_progress': goal_progress * 20,
            'emergency_fund': min(emergency_fund_ratio * 2, 20),  # Cap at 10 months
            'account_diversity': min(len(accounts) * 2, 10)  # Bonus for multiple accounts
        }
        
        total_score = sum(score_components.values())
        
        return {
            'score': round(total_score),
            'breakdown': score_components,
            'recommendations': self.generate_recommendations(score_components, total_balance, monthly_expenses)
        }
    
    def generate_recommendations(self, score_breakdown: Dict, total_balance: float, monthly_expenses: float) -> List[str]:
        """Generate personalized financial recommendations"""
        recommendations = []
        
        if score_breakdown['savings_rate'] < 15:
            recommendations.append("💡 Consider increasing your savings rate by 5-10% of your income")
        
        if score_breakdown['emergency_fund'] < 10:
            months_covered = total_balance / monthly_expenses if monthly_expenses > 0 else 0
            recommendations.append(f"🛡️ Build an emergency fund (currently {months_covered:.1f} months covered, aim for 3-6 months)")
        
        if score_breakdown['spending_diversity'] < 10:
            recommendations.append("📊 Diversify your spending categories for better budget management")
        
        if score_breakdown['goal_progress'] < 10:
            recommendations.append("🎯 Set clear financial goals and track your progress regularly")
        
        if score_breakdown['account_diversity'] < 5:
            recommendations.append("🏦 Consider diversifying your accounts across different financial institutions")
        
        if not recommendations:
            recommendations.append("✅ Great job! Your financial health is on track. Consider exploring investment opportunities.")
        
        return recommendations[:5]  # Return top 5 recommendations

    def generate_zimbabwe_specific_insights(self, transactions: List[Dict]) -> Dict[str, Any]:
        """Generate insights specific to Zimbabwe's economic context"""
        if not transactions:
            return {}
        
        df = pd.DataFrame(transactions)
        
        # Multi-currency analysis
        currency_breakdown = df.groupby('currency')['amount'].sum().to_dict()
        
        # Mobile money vs bank transactions
        mobile_keywords = ['ecocash', 'onemoney', 'telecash', 'mobile money']
        bank_keywords = ['bank', 'atm', 'cbz', 'stanbic', 'standard chartered', 'nmb']
        
        mobile_transactions = df[df['description'].str.lower().str.contains('|'.join(mobile_keywords), na=False)]
        bank_transactions = df[df['description'].str.lower().str.contains('|'.join(bank_keywords), na=False)]
        
        return {
            'currency_breakdown': currency_breakdown,
            'mobile_money_usage': {
                'count': len(mobile_transactions),
                'total_amount': mobile_transactions['amount'].sum(),
                'percentage_of_total': len(mobile_transactions) / len(df) * 100 if len(df) > 0 else 0
            },
            'bank_usage': {
                'count': len(bank_transactions),
                'total_amount': bank_transactions['amount'].sum(),
                'percentage_of_total': len(bank_transactions) / len(df) * 100 if len(df) > 0 else 0
            },
            'informal_sector_insights': self.analyze_informal_sector_spending(df)
        }
    
    def analyze_informal_sector_spending(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze spending patterns in the informal sector"""
        informal_keywords = [
            'market', 'musika', 'vendor', 'street', 'informal', 'hawker',
            'mbare', 'road port', 'avondale', 'flea market'
        ]
        
        informal_transactions = df[df['description'].str.lower().str.contains('|'.join(informal_keywords), na=False)]
        
        return {
            'count': len(informal_transactions),
            'total_amount': informal_transactions['amount'].sum(),
            'average_transaction': informal_transactions['amount'].mean() if len(informal_transactions) > 0 else 0,
            'common_categories': informal_transactions['category'].value_counts().to_dict() if 'category' in informal_transactions.columns else {}
        }

# Export analytics_engine instance for import in main.py
analytics_engine = AdvancedFinancialAnalytics()
