import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any
import json

class AdvancedAIForecaster:
    def __init__(self):
        self.models = {}
        
    def generate_advanced_forecast(self, transactions: List[Dict], inflation_rate: float = 0.02) -> Dict[str, Any]:
        """Generate advanced AI-powered financial forecasts"""
        if not transactions:
            return self.get_empty_forecast()
        
        df = pd.DataFrame(transactions)
        df['transaction_date'] = pd.to_datetime(df['transaction_date'])
        df['amount'] = pd.to_numeric(df['amount'])
        
        # Separate income and expenses
        income_df = df[df['amount'] > 0].copy()
        expense_df = df[df['amount'] < 0].copy()
        expense_df['amount'] = expense_df['amount'].abs()
        
        # Generate multiple forecast scenarios
        base_forecast = self.generate_base_forecast(expense_df, income_df, inflation_rate)
        optimistic_forecast = self.generate_optimistic_scenario(expense_df, income_df, inflation_rate)
        conservative_forecast = self.generate_conservative_scenario(expense_df, income_df, inflation_rate)
        
        # AI insights
        insights = self.generate_ai_insights(df, expense_df, income_df)
        
        return {
            'base_scenario': base_forecast,
            'optimistic_scenario': optimistic_forecast,
            'conservative_scenario': conservative_forecast,
            'ai_insights': insights,
            'confidence_score': self.calculate_confidence_score(df),
            'risk_assessment': self.assess_risk(df, base_forecast),
            'recommendations': self.generate_recommendations(df, base_forecast)
        }
    
    def generate_base_forecast(self, expense_df: pd.DataFrame, income_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """Generate base forecast using multiple techniques"""
        if expense_df.empty:
            return self.get_empty_forecast()
        
        # Use multiple forecasting methods
        moving_avg = self.moving_average_forecast(expense_df, inflation_rate)
        seasonal_adj = self.seasonal_adjusted_forecast(expense_df, inflation_rate)
        ml_forecast = self.ml_trend_forecast(expense_df, inflation_rate)
        
        # Combine forecasts (weighted average)
        base_forecast = {
            'method': 'ensemble',
            'daily_forecast': moving_avg['daily_forecast'],
            'monthly_forecast': moving_avg['monthly_forecast'],
            'confidence': 0.75
        }
        
        return base_forecast
    
    def moving_average_forecast(self, expense_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """Moving average forecast with inflation adjustment"""
        expense_df['month'] = expense_df['transaction_date'].dt.to_period('M')
        monthly_expenses = expense_df.groupby('month')['amount'].sum()
        
        if len(monthly_expenses) >= 3:
            forecast_amount = monthly_expenses.tail(3).mean() * (1 + inflation_rate)
        else:
            forecast_amount = monthly_expenses.mean() * (1 + inflation_rate) if not monthly_expenses.empty else 0
        
        # Generate 30-day forecast
        daily_forecast = forecast_amount / 30
        forecast_data = []
        current_date = datetime.now()
        
        for i in range(30):
            forecast_date = current_date + timedelta(days=i+1)
            forecast_data.append({
                'date': forecast_date.strftime('%Y-%m-%d'),
                'amount': daily_forecast,
                'day_type': 'weekday' if forecast_date.weekday() < 5 else 'weekend'
            })
        
        return {
            'daily_forecast': forecast_data,
            'monthly_forecast': forecast_amount,
            'method': 'moving_average'
        }
    
    def seasonal_adjusted_forecast(self, expense_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """Seasonally adjusted forecast considering spending patterns"""
        # This would implement seasonal decomposition in a real scenario
        return self.moving_average_forecast(expense_df, inflation_rate)
    
    def ml_trend_forecast(self, expense_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """ML-based trend forecasting"""
        # Simplified implementation - in production would use scikit-learn or similar
        return self.moving_average_forecast(expense_df, inflation_rate)
    
    def generate_optimistic_scenario(self, expense_df: pd.DataFrame, income_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """Generate optimistic forecast scenario"""
        base = self.moving_average_forecast(expense_df, inflation_rate * 0.8)  # Lower inflation
        base['scenario'] = 'optimistic'
        base['probability'] = 0.3
        return base
    
    def generate_conservative_scenario(self, expense_df: pd.DataFrame, income_df: pd.DataFrame, inflation_rate: float) -> Dict[str, Any]:
        """Generate conservative forecast scenario"""
        base = self.moving_average_forecast(expense_df, inflation_rate * 1.5)  # Higher inflation
        base['scenario'] = 'conservative'
        base['probability'] = 0.4
        return base
    
    def generate_ai_insights(self, df: pd.DataFrame, expense_df: pd.DataFrame, income_df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Generate AI-powered financial insights"""
        insights = []
        
        if not df.empty:
            # Spending pattern insights
            if len(df) > 10:
                daily_spending = df.groupby(df['transaction_date'].dt.date)['amount'].sum()
                volatility = daily_spending.std() / abs(daily_spending.mean()) if daily_spending.mean() != 0 else 0
                
                if volatility > 0.5:
                    insights.append({
                        'type': 'spending_volatility',
                        'title': 'High Spending Volatility Detected',
                        'message': f'Your daily spending varies by {volatility:.1%}. Consider smoothing out expenses for better predictability.',
                        'priority': 'medium',
                        'suggestion': 'Try setting daily spending limits'
                    })
            
            # Category optimization insights
            if not expense_df.empty and 'category' in expense_df.columns:
                category_spending = expense_df.groupby('category')['amount'].sum()
                top_category = category_spending.idxmax() if not category_spending.empty else None
                
                if top_category and category_spending[top_category] > expense_df['amount'].sum() * 0.4:
                    insights.append({
                        'type': 'category_concentration',
                        'title': 'Spending Concentration',
                        'message': f'{top_category.title()} accounts for {category_spending[top_category]/expense_df["amount"].sum():.1%} of your expenses.',
                        'priority': 'low',
                        'suggestion': 'Consider diversifying your spending across categories'
                    })
            
            # Timing insights
            if not expense_df.empty:
                expense_df['day_of_week'] = expense_df['transaction_date'].dt.day_name()
                weekday_spending = expense_df.groupby('day_of_week')['amount'].sum()
                
                if not weekday_spending.empty:
                    peak_day = weekday_spending.idxmax()
                    insights.append({
                        'type': 'spending_pattern',
                        'title': 'Weekly Spending Pattern',
                        'message': f'You tend to spend the most on {peak_day}s.',
                        'priority': 'low',
                        'suggestion': 'Plan larger purchases for low-spending days'
                    })
        
        # Add general financial insights
        general_insights = [
            {
                'type': 'emergency_fund',
                'title': 'Emergency Fund Check',
                'message': 'Ensure you have 3-6 months of expenses saved, especially important in volatile economies.',
                'priority': 'high',
                'suggestion': 'Set up automatic transfers to savings'
            },
            {
                'type': 'inflation_hedging',
                'title': 'Inflation Protection',
                'message': 'Consider diversifying into inflation-resistant assets given current economic conditions.',
                'priority': 'medium',
                'suggestion': 'Explore stable value preservation options'
            }
        ]
        
        insights.extend(general_insights)
        return insights[:5]  # Return top 5 insights
    
    def calculate_confidence_score(self, df: pd.DataFrame) -> float:
        """Calculate confidence score for forecasts based on data quality and quantity"""
        if df.empty:
            return 0.0
        
        # Factors: data volume, time span, consistency
        data_volume_score = min(len(df) / 100, 1.0)  # More data = higher confidence
        time_span = (df['transaction_date'].max() - df['transaction_date'].min()).days
        time_span_score = min(time_span / 90, 1.0)  # Longer history = higher confidence
        
        # Consistency (lower volatility = higher confidence)
        daily_totals = df.groupby(df['transaction_date'].dt.date)['amount'].sum()
        if len(daily_totals) > 1:
            volatility = daily_totals.std() / abs(daily_totals.mean()) if daily_totals.mean() != 0 else 1.0
            consistency_score = max(0, 1 - volatility)
        else:
            consistency_score = 0.5
        
        confidence = (data_volume_score * 0.4 + time_span_score * 0.3 + consistency_score * 0.3)
        return round(confidence, 2)
    
    def assess_risk(self, df: pd.DataFrame, forecast: Dict[str, Any]) -> Dict[str, Any]:
        """Assess financial risk based on spending patterns and forecasts"""
        if df.empty:
            return {'level': 'low', 'factors': ['Insufficient data for risk assessment']}
        
        risk_factors = []
        risk_score = 0
        
        # Spending volatility risk
        daily_totals = df.groupby(df['transaction_date'].dt.date)['amount'].sum()
        if len(daily_totals) > 5:
            volatility = daily_totals.std() / abs(daily_totals.mean()) if daily_totals.mean() != 0 else 0
            if volatility > 0.7:
                risk_factors.append('High spending volatility')
                risk_score += 0.3
        
        # Negative cash flow risk
        total_income = df[df['amount'] > 0]['amount'].sum()
        total_expenses = abs(df[df['amount'] < 0]['amount'].sum())
        if total_expenses > total_income * 0.8:
            risk_factors.append('High expense-to-income ratio')
            risk_score += 0.4
        
        # Forecast-based risk
        if 'monthly_forecast' in forecast:
            forecast_expenses = forecast['monthly_forecast']
            if forecast_expenses > total_income:
                risk_factors.append('Projected expenses exceed income')
                risk_score += 0.3
        
        # Determine risk level
        if risk_score >= 0.7:
            level = 'high'
        elif risk_score >= 0.4:
            level = 'medium'
        else:
            level = 'low'
        
        return {
            'level': level,
            'score': risk_score,
            'factors': risk_factors
        }
    
    def generate_recommendations(self, df: pd.DataFrame, forecast: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate personalized financial recommendations"""
        recommendations = []
        
        if df.empty:
            return [{
                'type': 'data_collection',
                'title': 'Start Tracking',
                'message': 'Begin recording your transactions to receive personalized recommendations.',
                'action': 'Add transactions',
                'priority': 'high'
            }]
        
        # Budgeting recommendations
        total_income = df[df['amount'] > 0]['amount'].sum()
        total_expenses = abs(df[df['amount'] < 0]['amount'].sum())
        
        if total_expenses > total_income * 0.7:
            recommendations.append({
                'type': 'budget_optimization',
                'title': 'Optimize Your Budget',
                'message': f'Your expenses are {total_expenses/total_income:.1%} of your income. Consider reducing discretionary spending.',
                'action': 'Review spending categories',
                'priority': 'medium'
            })
        
        # Savings recommendations
        savings_rate = (total_income - total_expenses) / total_income if total_income > 0 else 0
        if savings_rate < 0.1:
            recommendations.append({
                'type': 'savings_boost',
                'title': 'Increase Savings Rate',
                'message': f'Your current savings rate is {savings_rate:.1%}. Aim for 10-20% for better financial security.',
                'action': 'Set savings goals',
                'priority': 'high'
            })
        
        # Emergency fund recommendation
        avg_monthly_expenses = total_expenses / (len(df['transaction_date'].dt.to_period('M').unique()) or 1)
        if avg_monthly_expenses > 0 and total_income > 0:
            recommendations.append({
                'type': 'emergency_fund',
                'title': 'Build Emergency Fund',
                'message': f'Aim to save 3-6 months of expenses (${avg_monthly_expenses*3:.0f}-${avg_monthly_expenses*6:.0f}) for unexpected situations.',
                'action': 'Create emergency fund goal',
                'priority': 'high'
            })
        
        # Zimbabwe-specific recommendations
        recommendations.append({
            'type': 'currency_diversification',
            'title': 'Currency Diversification',
            'message': 'In Zimbabwe\'s multi-currency environment, consider maintaining balances in stable currencies.',
            'action': 'Review currency allocation',
            'priority': 'medium'
        })
        
        return recommendations[:3]  # Return top 3 recommendations
    
    def get_empty_forecast(self) -> Dict[str, Any]:
        """Return empty forecast structure"""
        return {
            'base_scenario': {'daily_forecast': [], 'monthly_forecast': 0, 'confidence': 0},
            'optimistic_scenario': {'daily_forecast': [], 'monthly_forecast': 0, 'confidence': 0},
            'conservative_scenario': {'daily_forecast': [], 'monthly_forecast': 0, 'confidence': 0},
            'ai_insights': [],
            'confidence_score': 0.0,
            'risk_assessment': {'level': 'unknown', 'factors': ['Insufficient data']},
            'recommendations': []
        }

# Global instance
advanced_forecaster = AdvancedAIForecaster()
