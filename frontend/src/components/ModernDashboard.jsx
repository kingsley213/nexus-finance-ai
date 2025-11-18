import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wallet, TrendingUp, Target, PieChart, ArrowUpRight, ArrowDownRight,
  DollarSign, CreditCard, Activity, Calendar, TrendingDown,
  BarChart3, LineChart, AlertCircle, CheckCircle, Clock, Menu,
  Bell, User, Search, ChevronRight, Sparkles, Shield, LogOut, Settings, UserCircle
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const API_URL = 'http://localhost:8000';

const ModernDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [spendingInsights, setSpendingInsights] = useState(null);
  const [financialHealth, setFinancialHealth] = useState(null);
  const [cashFlowForecast, setCashFlowForecast] = useState(null);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const userMenuRef = useRef(null);
  const token = localStorage.getItem('token');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [accountsRes, transactionsRes, spendingRes, healthRes, forecastRes, modelsRes] = await Promise.all([
        axios.get(`${API_URL}/api/v1/accounts`, { headers }),
        axios.get(`${API_URL}/api/v1/transactions?limit=10`, { headers }),
        axios.get(`${API_URL}/api/v1/analytics/spending-insights`, { headers }),
        axios.get(`${API_URL}/api/v1/analytics/financial-health`, { headers }),
        axios.get(`${API_URL}/api/v1/analytics/cash-flow-forecast?inflation_rate=0.02`, { headers }),
        axios.get(`${API_URL}/v1/models`)
      ]);

      setAccounts(accountsRes.data);
      setTransactions(transactionsRes.data);
      setSpendingInsights(spendingRes.data);
      setFinancialHealth(healthRes.data);
      setCashFlowForecast(forecastRes.data);
      setModels(modelsRes.data?.models || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to load dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  const monthlyIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + (t.amount || 0), 0);
  const monthlyExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + (t.amount || 0), 0));

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'accounts', name: 'Accounts', icon: Wallet },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'forecast', name: 'Forecast', icon: LineChart },
    { id: 'models', name: 'AI Models', icon: Activity }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">Loading your financial dashboard...</p>
          <p className="mt-2 text-sm text-gray-500">Analyzing your financial data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Modern Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">NexusFinance AI</h1>
                  <p className="text-xs text-gray-500">Intelligent Financial Management</p>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-6 w-6 text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative pl-3 border-l border-gray-200" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
                    <p className="text-xs text-gray-500">Premium Member</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-semibold shadow-lg">
                    {user?.full_name?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to profile if you have that route
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <UserCircle className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to settings if you have that route
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/dashboard');
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <BarChart3 className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Dashboard</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors text-left group"
                      >
                        <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                        <span className="text-sm text-gray-700 group-hover:text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Error Notification */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty State - No Data */}
        {!loading && accounts.length === 0 && transactions.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 bg-blue-50 rounded-full mb-6">
              <AlertCircle className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Data Available</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We couldn't load your financial data. This could be due to authentication issues or missing data.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={fetchDashboardData}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Retry Loading
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 transition-all font-semibold"
              >
                Re-login
              </button>
            </div>
          </div>
        )}

        {activeTab === 'overview' && accounts.length > 0 && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Balance"
                value={`$${totalBalance.toFixed(2)}`}
                change="+5.2%"
                isPositive={true}
                icon={DollarSign}
                color="blue"
              />
              <StatCard
                title="Monthly Income"
                value={`$${monthlyIncome.toFixed(2)}`}
                change="+12.3%"
                isPositive={true}
                icon={ArrowUpRight}
                color="green"
              />
              <StatCard
                title="Monthly Expenses"
                value={`$${monthlyExpenses.toFixed(2)}`}
                change="-3.1%"
                isPositive={true}
                icon={ArrowDownRight}
                color="orange"
              />
              <StatCard
                title="Financial Health"
                value={financialHealth?.overall_grade || 'A'}
                subtitle={`${financialHealth?.overall_score || 85}/100`}
                icon={Activity}
                color="purple"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Spending by Category */}
              {spendingInsights?.spending_by_category && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Spending by Category</h3>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <PieChart className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={Object.entries(spendingInsights.spending_by_category).map(([name, value]) => ({
                          name,
                          value: Math.abs(value)
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.keys(spendingInsights.spending_by_category).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 6).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2.5 rounded-xl ${transaction.amount > 0 ? 'bg-gradient-to-br from-green-100 to-green-200' : 'bg-gradient-to-br from-red-100 to-red-200'}`}>
                          {transaction.amount > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.currency} ${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Health Details */}
            {financialHealth && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Financial Health Breakdown</h3>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Overall: {financialHealth?.overall_grade || 'A'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HealthMetric
                    label="Savings Rate"
                    value={`${(financialHealth?.savings_rate ?? 0).toFixed(1)}%`}
                    target="20%"
                    status={(financialHealth?.savings_rate ?? 0) >= 20 ? 'good' : 'warning'}
                  />
                  <HealthMetric
                    label="Emergency Fund"
                    value={`${(financialHealth?.emergency_fund_months ?? 0).toFixed(1)} months`}
                    target="3-6 months"
                    status={(financialHealth?.emergency_fund_months ?? 0) >= 3 ? 'good' : 'warning'}
                  />
                  <HealthMetric
                    label="Goal Progress"
                    value={`${(financialHealth?.goal_progress_rate ?? 0).toFixed(1)}%`}
                    target="100%"
                    status={(financialHealth?.goal_progress_rate ?? 0) >= 50 ? 'good' : 'warning'}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'accounts' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Accounts</h2>
              <p className="text-gray-600 mt-1">Manage and monitor all your financial accounts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <div key={account.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{account.account_type}</p>
                          <h3 className="text-lg font-bold text-gray-900">{account.name}</h3>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {account.currency} ${account.balance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <Wallet className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No accounts available</h3>
                  <p className="text-gray-500 text-center max-w-sm">Add your first account to start tracking your finances</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && spendingInsights && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Monthly Spending Trend</h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              {spendingInsights.spending_by_category && (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={Object.entries(spendingInsights.spending_by_category).map(([name, value]) => ({
                    category: name,
                    amount: Math.abs(value)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {spendingInsights.top_merchants && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Top Merchants</h3>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(spendingInsights.top_merchants).slice(0, 5).map(([merchant, amount], index) => (
                    <div key={merchant} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm text-gray-900">{merchant}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">${Math.abs(amount).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'forecast' && cashFlowForecast && cashFlowForecast.forecast && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">6-Month Cash Flow Forecast</h3>
                  <p className="text-sm text-gray-600 mt-1">AI-powered predictions based on your spending patterns</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <LineChart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart data={cashFlowForecast.forecast || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="predicted_balance" stroke="#3B82F6" strokeWidth={2} name="Predicted Balance" />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ForecastCard
                title="Average Monthly Income"
                value={`$${(cashFlowForecast?.average_income ?? 0).toFixed(2)}`}
                icon={TrendingUp}
                color="green"
              />
              <ForecastCard
                title="Average Monthly Expenses"
                value={`$${Math.abs(cashFlowForecast?.average_expenses ?? 0).toFixed(2)}`}
                icon={TrendingDown}
                color="red"
              />
              <ForecastCard
                title="Projected 6-Month Balance"
                value={`$${(cashFlowForecast?.forecast?.[cashFlowForecast?.forecast?.length - 1]?.predicted_balance ?? 0).toFixed(2)}`}
                icon={Target}
                color="blue"
              />
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">AI Models</h2>
              <p className="text-gray-600 mt-1">Intelligent models powering your financial insights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.length > 0 ? (
                models.map((model, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 group">
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <Sparkles className="h-7 w-7 text-white" />
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                        model.status === 'active' 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{model.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 font-medium w-20">Type:</span>
                        <span className="text-gray-900 font-semibold">{model.type}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 font-medium w-20">Version:</span>
                        <span className="text-gray-900 font-semibold">{model.version}</span>
                      </div>
                    </div>
                    {model.accuracy && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Model Accuracy</p>
                        <p className="text-lg font-bold text-blue-600">{model.accuracy}</p>
                      </div>
                    )}
                    {model.categories && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {model.categories.slice(0, 5).map((cat, i) => (
                            <span key={i} className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                              {cat}
                            </span>
                          ))}
                          {model.categories.length > 5 && (
                            <span className="text-xs text-gray-500 font-semibold">+{model.categories.length - 5}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="p-4 bg-purple-100 rounded-full mb-4">
                    <Sparkles className="h-12 w-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI models available</h3>
                  <p className="text-gray-500 text-center max-w-sm">AI models will appear here once configured</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold">NexusFinance AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering your financial future with intelligent insights and AI-powered analytics.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forecasting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Models</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-400 mb-2">support@nexusfinance.ai</p>
              <p className="text-sm text-gray-400">Available 24/7</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 NexusFinance AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, subtitle, change, isPositive, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
          {subtitle && <p className="text-sm text-gray-600 font-medium">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
      {change && (
        <div className="pt-3 border-t border-gray-100">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold ${
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            {change} from last month
          </div>
        </div>
      )}
    </div>
  );
};

// Health Metric Component
const HealthMetric = ({ label, value, target, status }) => {
  return (
    <div className={`rounded-xl p-5 transition-all hover:shadow-md ${
      status === 'good' ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</p>
        <div className={`p-2 rounded-lg ${status === 'good' ? 'bg-green-200' : 'bg-orange-200'}`}>
          {status === 'good' ? (
            <CheckCircle className="h-5 w-5 text-green-700" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-700" />
          )}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-xs font-medium text-gray-600 flex items-center">
        <Target className="h-3 w-3 mr-1" /> Target: {target}
      </p>
    </div>
  );
};

// Forecast Card Component
const ForecastCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
