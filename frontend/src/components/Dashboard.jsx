import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Wallet, Target, AlertTriangle,
  ArrowUpRight, ArrowDownRight, DollarSign, PieChart as PieChartIcon
} from 'lucide-react';
import { accountsAPI, analyticsAPI, transactionsAPI } from '../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [spendingInsights, setSpendingInsights] = useState({});
  const [cashFlowForecast, setCashFlowForecast] = useState({});
  const [financialHealth, setFinancialHealth] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [accountsRes, insightsRes, forecastRes, healthRes, transactionsRes] = await Promise.all([
        accountsAPI.getAll(),
        analyticsAPI.getSpendingInsights(),
        analyticsAPI.getCashFlowForecast(),
        analyticsAPI.getFinancialHealth(),
        transactionsAPI.getAll({ limit: 5 })
      ]);

      setAccounts(accountsRes.data);
      setSpendingInsights(insightsRes.data);
      setCashFlowForecast(forecastRes.data);
      setFinancialHealth(healthRes.data);
      setRecentTransactions(transactionsRes.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getCurrencyBreakdown = () => {
    const breakdown = {};
    accounts.forEach(account => {
      breakdown[account.currency] = (breakdown[account.currency] || 0) + account.balance;
    });
    return breakdown;
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="skeleton-text w-48 h-8 mb-2"></div>
            <div className="skeleton-text w-64 h-4"></div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card">
              <div className="card-body">
                <div className="skeleton-chart h-48"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600 font-medium">Welcome to your financial overview</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={fetchDashboardData}
            className="btn btn-primary"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Financial Health Score */}
      {financialHealth.score > 0 && (
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Financial Health Score</h3>
                <p className="text-gray-600">Based on your spending, savings, and goals</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <div className="relative">
                    <div className="h-20 w-20">
                      <svg className="w-20 h-20" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={financialHealth.score >= 70 ? '#10B981' : financialHealth.score >= 40 ? '#F59E0B' : '#EF4444'}
                          strokeWidth="3"
                          strokeDasharray={`${financialHealth.score}, 100`}
                        />
                        <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#4B5563" fontWeight="bold">
                          {financialHealth.score}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  financialHealth.score >= 70 ? 'text-green-600' : 
                  financialHealth.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {financialHealth.score >= 70 ? 'Excellent' : 
                   financialHealth.score >= 40 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
            
            {financialHealth.recommendations && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Recommendations</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {financialHealth.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {/* Total Balance Card */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Balance</h3>
              <Wallet className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(getTotalBalance())}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(getCurrencyBreakdown()).map(([currency, amount]) => (
                  <div key={currency} className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-gray-900">{currency}</div>
                    <div className="text-gray-600">{formatCurrency(amount, currency)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Forecast */}
        {cashFlowForecast.forecast && cashFlowForecast.forecast.length > 0 && (
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cash Flow Forecast</h3>
                <div className={`flex items-center ${
                  cashFlowForecast.risk_assessment === 'high' ? 'text-red-600' :
                  cashFlowForecast.risk_assessment === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium capitalize">{cashFlowForecast.risk_assessment} Risk</span>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowForecast.forecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Balance']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="projected_balance" 
                      stroke={cashFlowForecast.risk_assessment === 'high' ? '#EF4444' : '#3B82F6'} 
                      fill={cashFlowForecast.risk_assessment === 'high' ? '#FEE2E2' : '#DBEAFE'} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                {cashFlowForecast.days_until_negative_balance > 0 ? (
                  <span>Positive balance for next {cashFlowForecast.days_until_negative_balance} days</span>
                ) : (
                  <span className="text-red-600">Negative balance projected</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Spending by Category */}
        {spendingInsights.category_breakdown && Object.keys(spendingInsights.category_breakdown).length > 0 && (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(spendingInsights.category_breakdown).map(([name, value]) => ({
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        value: Math.abs(value)
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {Object.entries(spendingInsights.category_breakdown).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Trends */}
        {spendingInsights.monthly_trends && spendingInsights.monthly_trends.length > 0 && (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingInsights.monthly_trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                    <Bar dataKey="amount" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Link to="/transactions" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {transaction.amount < 0 ? (
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-500 capitalize">{transaction.category}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Wallet className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No transactions yet</p>
                  <Link to="/transactions" className="text-blue-600 hover:text-blue-500 text-sm">
                    Add your first transaction
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {spendingInsights.net_cash_flow !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Net Cash Flow</span>
                  <span className={`font-semibold ${
                    spendingInsights.net_cash_flow >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(spendingInsights.net_cash_flow)}
                  </span>
                </div>
              )}
              
              {spendingInsights.total_income !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Income</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(spendingInsights.total_income)}
                  </span>
                </div>
              )}
              
              {spendingInsights.total_expenses !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(Math.abs(spendingInsights.total_expenses))}
                  </span>
                </div>
              )}
              
              {spendingInsights.spending_velocity !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Spending Velocity</span>
                  <div className="flex items-center">
                    {spendingInsights.spending_velocity > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    )}
                    <span className={`font-semibold ${
                      spendingInsights.spending_velocity > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {Math.abs(spendingInsights.spending_velocity)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
