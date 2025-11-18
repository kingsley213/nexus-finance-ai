import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Wallet, Target, AlertTriangle,
  ArrowUpRight, ArrowDownRight, DollarSign, Users, Zap,
  Smartphone, CreditCard, PieChart as PieChartIcon, BarChart3,
  Eye, Download, RefreshCw, Calendar, Shield
} from 'lucide-react';
import { accountsAPI, analyticsAPI, transactionsAPI } from '../services/api';

const EnhancedDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [spendingInsights, setSpendingInsights] = useState({});
  const [cashFlowForecast, setCashFlowForecast] = useState({});
  const [financialHealth, setFinancialHealth] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [accountsRes, insightsRes, forecastRes, healthRes, transactionsRes] = await Promise.all([
        accountsAPI.getAll(),
        analyticsAPI.getSpendingInsights(),
        analyticsAPI.getCashFlowForecast(),
        analyticsAPI.getFinancialHealth(),
        transactionsAPI.getAll({ limit: 6 })
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

  // Mock data for enhanced charts
  const spendingByCategory = [
    { name: 'Groceries', value: 45, color: '#4F46E5' },
    { name: 'Transport', value: 20, color: '#10B981' },
    { name: 'Utilities', value: 15, color: '#F59E0B' },
    { name: 'Entertainment', value: 12, color: '#EF4444' },
    { name: 'Shopping', value: 8, color: '#8B5CF6' }
  ];

  const monthlyTrendData = [
    { month: 'Jan', income: 4500, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3800 },
    { month: 'Mar', income: 4800, expenses: 3500 },
    { month: 'Apr', income: 5100, expenses: 3700 },
    { month: 'May', income: 4900, expenses: 3600 },
    { month: 'Jun', income: 5300, expenses: 3900 }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="skeleton-text w-48 h-8 mb-2"></div>
            <div className="skeleton-text w-64 h-4"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {financialHealth.score >= 70 ? 'great work! 🎉' : 'let\'s optimize your finances!'}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select bg-white border-gray-300"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
          
          <div className="flex space-x-3">
            <button className="btn btn-outline flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button 
              onClick={fetchDashboardData}
              className="btn btn-primary flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance Card */}
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(getTotalBalance())}</p>
                <p className="text-blue-200 text-sm mt-2">
                  Across {accounts.length} accounts
                </p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Net Cash Flow */}
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Net Cash Flow</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(spendingInsights.net_cash_flow || 0)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-green-200 text-sm">
                    {spendingInsights.spending_velocity > 0 ? '+' : ''}{spendingInsights.spending_velocity || 0}% from last month
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Health */}
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Financial Health</p>
                <p className="text-2xl font-bold mt-1">{financialHealth.score || 0}/100</p>
                <p className="text-purple-200 text-sm mt-2 capitalize">
                  {financialHealth.score >= 70 ? 'Excellent' : 
                   financialHealth.score >= 40 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Goals */}
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active Goals</p>
                <p className="text-2xl font-bold mt-1">3</p>
                <p className="text-orange-200 text-sm mt-2">2 ahead of schedule</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <div className="card">
          <div className="card-header bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Income vs Expenses</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="card-body">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="card">
          <div className="card-header bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
              <PieChartIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="card-body">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="card lg:col-span-2">
          <div className="card-header bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Link to="/transactions" className="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="divide-y divide-gray-200">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          transaction.amount < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {transaction.amount < 0 ? (
                            <ArrowDownRight className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
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
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
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

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body space-y-3">
              <Link to="/transactions" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <ArrowUpRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">Add Transaction</span>
              </Link>
              
              <Link to="/goals" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">Set Goal</span>
              </Link>
              
              <Link to="/accounts" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <Wallet className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-gray-700">Manage Accounts</span>
              </Link>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Insight</h3>
                  <p className="text-sm text-gray-600">Smart recommendation</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Based on your spending patterns, you could save ${(spendingInsights.average_monthly_spend * 0.15 || 0).toFixed(0)} monthly by optimizing grocery and entertainment expenses.
              </p>
              <button className="w-full btn btn-primary text-sm py-2">
                View Optimization Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
