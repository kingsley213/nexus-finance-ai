import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { accountsAPI, transactionsAPI, analyticsAPI, recurringTransactionsAPI, notificationsAPI } from '../services/api';
import Chatbot from './Chatbot';
import { 
  Home, BarChart3, MessageSquare, Menu, User, Plus, Bell,
  TrendingUp, TrendingDown, ChevronRight, ArrowUpRight, ArrowDownRight,
  Building2, Wallet, DollarSign, ShoppingBag, UtensilsCrossed, Heart,
  Car, Wifi, LogOut, Settings, UserCircle, Target, PiggyBank, 
  CreditCard, Briefcase, Globe, TrendingUpIcon, AlertCircle, CheckCircle,
  Info, X, BellOff, Shield, Key, Lock, Smartphone, QrCode
} from 'lucide-react';
import { 
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';


const DarkDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [spendingInsights, setSpendingInsights] = useState(null);
  const [financialHealth, setFinancialHealth] = useState(null);
  const [cashFlowForecast, setCashFlowForecast] = useState(null);
  const [recurringTransactions, setRecurringTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [transactionFilter, setTransactionFilter] = useState('All');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const token = localStorage.getItem('token');

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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Check if token exists
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      console.error('No authentication token found');
      navigate('/login');
      return;
    }

    try {
      // Try to fetch data with error handling for each endpoint using API service
      const [accountsRes, transactionsRes, spendingRes, healthRes, forecastRes, recurringRes, notificationsRes] = await Promise.allSettled([
        accountsAPI.getAll(),
        transactionsAPI.getAll({ limit: 10 }),
        analyticsAPI.getSpendingInsights(),
        analyticsAPI.getFinancialHealth(),
        analyticsAPI.getCashFlowForecast(0.02),
        recurringTransactionsAPI.getAll(),
        notificationsAPI.getAll(),
      ]);

      // Set data from successful requests
      if (accountsRes.status === 'fulfilled') setAccounts(accountsRes.value.data);
      if (transactionsRes.status === 'fulfilled') setTransactions(transactionsRes.value.data);
      if (spendingRes.status === 'fulfilled') setSpendingInsights(spendingRes.value.data);
      if (healthRes.status === 'fulfilled') setFinancialHealth(healthRes.value.data);
      if (forecastRes.status === 'fulfilled') setCashFlowForecast(forecastRes.value.data);
      if (recurringRes.status === 'fulfilled') setRecurringTransactions(recurringRes.value.data);
      if (notificationsRes.status === 'fulfilled') {
        setNotifications(notificationsRes.value.data.notifications || []);
        setUnreadCount(notificationsRes.value.data.unread_count || 0);
      }

      // Check if any request failed with 401
      const has401 = [accountsRes, transactionsRes, spendingRes, healthRes, forecastRes, recurringRes, notificationsRes].some(
        res => res.status === 'rejected' && res.reason?.response?.status === 401
      );

      if (has401) {
        console.error('Authentication failed. Redirecting to login...');
        logout();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    if (navId === 'statistics') {
      navigate('/analytics');
    } else if (navId === 'ai-chat') {
      setShowChatbot(true);
    } else if (navId === 'menu') {
      setShowMenu(true);
    }
  };

  const handleAddAccount = () => {
    setShowAddAccount(true);
  };

  const handleAddTransaction = () => {
    navigate('/transactions');
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await accountsAPI.create({
        name: formData.get('name'),
        account_type: formData.get('account_type'),
        currency: formData.get('currency'),
        balance: parseFloat(formData.get('balance')) || 0
      });
      setShowAddAccount(false);
      fetchDashboardData(); // Refresh data
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  const handleViewDetails = () => {
    navigate('/analytics');
  };

  const handleViewAll = (section) => {
    if (section === 'scheduled payments') {
      navigate('/transactions'); // Navigate to transactions page
    } else if (section === 'expenses') {
      navigate('/analytics'); // Navigate to analytics page
    } else {
      navigate('/transactions');
    }
  };

  const handlePaymentClick = (payment) => {
    navigate('/transactions');
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      case 'budget_alert': return PiggyBank;
      case 'goal_progress': return Target;
      case 'payment_due': return Bell;
      default: return Info;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return '#86efac';
      case 'warning': return '#fb923c';
      case 'info': return '#22d3ee';
      case 'budget_alert': return '#fb7185';
      case 'goal_progress': return '#86efac';
      case 'payment_due': return '#fbbf24';
      default: return '#22d3ee';
    }
  };

  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredTransactions = transactions.filter(t => {
    if (transactionFilter === 'Spending') return t.amount < 0;
    if (transactionFilter === 'Income') return t.amount > 0;
    return true;
  });

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  const monthlyIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + (t.amount || 0), 0);
  const monthlyExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + (t.amount || 0), 0));

  // Mock data for charts
  const balanceData = [
    { month: 'Jan', value: 3200 },
    { month: 'Feb', value: 3800 },
    { month: 'Mar', value: 3500 },
    { month: 'Apr', value: 4100 },
    { month: 'May', value: 3900 },
    { month: 'Jun', value: totalBalance || 4253 }
  ];

  const budgetData = [
    { name: 'Within', value: 60, color: '#86efac' },
    { name: 'Risk', value: 25, color: '#fb923c' },
    { name: 'Overspending', value: 15, color: '#f87171' }
  ];

  // Calculate expense categories from real transaction data
  const expenseCategories = React.useMemo(() => {
    if (!spendingInsights?.category_breakdown) return [];
    
    const categoryIcons = {
      food: UtensilsCrossed,
      groceries: ShoppingBag,
      shopping: ShoppingBag,
      transport: Car,
      health: Heart,
      utilities: Wifi,
      entertainment: Heart,
      default: DollarSign
    };
    
    const categoryColors = ['#86efac', '#fb7185', '#fb923c', '#22d3ee', '#8b5cf6'];
    
    return Object.entries(spendingInsights.category_breakdown)
      .filter(([_, amount]) => amount < 0) // Only expenses
      .slice(0, 4) // Top 4
      .map(([category, amount], index) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        amount: Math.abs(amount),
        percentage: 5 + index * 2, // Mock percentage for now
        trend: index % 2 === 0 ? 'down' : 'up',
        icon: categoryIcons[category.toLowerCase()] || categoryIcons.default,
        color: categoryColors[index % categoryColors.length]
      }));
  }, [spendingInsights]);

  // Helper function to calculate days until due date
  const getDaysUntilDue = (nextDueDate) => {
    const today = new Date();
    const due = new Date(nextDueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', isOverdue: true };
    if (diffDays === 0) return { text: 'Today', isOverdue: false };
    if (diffDays === 1) return { text: 'Tomorrow', isOverdue: false };
    return { text: `${diffDays} days`, isOverdue: false };
  };

  // Get icon for payment type
  const getPaymentIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('home') || desc.includes('rent')) return Home;
    if (desc.includes('car') || desc.includes('insurance')) return Car;
    if (desc.includes('internet') || desc.includes('wifi')) return Wifi;
    if (desc.includes('electricity') || desc.includes('power')) return Building2;
    return Wallet;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#86efac] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col relative z-10">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-800">
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 w-full hover:bg-gray-800/50 rounded-lg p-2 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                {user?.full_name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white">{user?.full_name || 'User'}</p>
                <p className="text-sm text-gray-400">Balance: ${totalBalance.toFixed(2)}</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                <button
                  onClick={() => { setShowUserMenu(false); setShowProfile(true); }}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
                >
                  <UserCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Profile</span>
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); setShowSettings(true); }}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Settings</span>
                </button>
                <div className="border-t border-gray-700 my-2"></div>
                <button
                  onClick={() => { setShowUserMenu(false); handleLogout(); }}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-500/10 transition-colors text-left group"
                >
                  <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                  <span className="text-sm group-hover:text-red-500">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'statistics', icon: BarChart3, label: 'Statistics' },
            { id: 'ai-chat', icon: MessageSquare, label: 'AI chat' },
            { id: 'menu', icon: Menu, label: 'Menu' }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#86efac] text-black font-semibold' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button 
            onClick={() => navigate('/accounts')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Account</span>
          </button>
          <button 
            onClick={handleAddTransaction}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add transaction</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative z-[101]" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative"
                aria-label="Notifications"
                title="View notifications"
              >
                <Bell className="h-6 w-6 text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl z-[100] max-h-[600px] overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-[#1a1a1a] z-10">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-[#86efac]" />
                      <h3 className="font-semibold text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-xs text-[#86efac] hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="overflow-y-auto flex-1">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-800">
                        {notifications.map((notification) => {
                          const Icon = getNotificationIcon(notification.type);
                          const color = getNotificationColor(notification.type);
                          
                          return (
                            <div
                              key={notification.id}
                              onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                              className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${
                                !notification.is_read ? 'bg-gray-800/30' : ''
                              }`}
                            >
                              <div className="flex space-x-3">
                                <div 
                                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${color}20` }}
                                >
                                  <Icon className="h-5 w-5" style={{ color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <p className={`text-sm font-medium ${
                                      !notification.is_read ? 'text-white' : 'text-gray-300'
                                    }`}>
                                      {notification.title || 'Notification'}
                                    </p>
                                    {!notification.is_read && (
                                      <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {formatNotificationTime(notification.created_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <BellOff className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No notifications</p>
                        <p className="text-xs mt-1">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* Balance and Accounts Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Total Balance */}
                <div className="col-span-1 bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Total balance</p>
                  <p className="text-3xl font-bold mb-4">${totalBalance.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={balanceData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#86efac" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#86efac" strokeWidth={2} fill="url(#colorBalance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Account Cards */}
                {accounts.slice(0, 2).map((account) => (
                  <div key={account.id} className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gray-800 rounded-xl">
                        <Building2 className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold mb-1">${account.balance.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 uppercase">{account.name}</p>
                  </div>
                ))}

                {/* Add New Account */}
                <button 
                  onClick={handleAddAccount}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-dashed border-gray-700 hover:border-[#86efac] transition-colors flex flex-col items-center justify-center space-y-2"
                  aria-label="Add new account"
                  title="Add a new bank account"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500">Add new</span>
                </button>
              </div>

              {/* Well Done Card */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Well done!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Your spending reduced<br />by 21% from last month.
                    </p>
                    <button 
                      onClick={handleViewDetails}
                      className="text-[#86efac] text-sm font-semibold hover:underline"
                      aria-label="View spending details"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#2a2a2a"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#86efac"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56 * 0.75} ${2 * Math.PI * 56}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">$75</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Transaction History</h3>
                  <button 
                    onClick={() => handleViewAll('transactions')}
                    className="text-gray-400 hover:text-white text-sm"
                    aria-label="View all transactions"
                  >
                    See All
                  </button>
                </div>

                <div className="flex space-x-2 mb-6">
                  {['All', 'Spending', 'Income'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTransactionFilter(tab)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        transactionFilter === tab 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 mb-3">2 July 2023</p>
                  {filteredTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 hover:bg-gray-800/50 rounded-lg px-2 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-[#86efac]' : 'text-white'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.currency}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.transaction_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Budget */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Monthly Budget</h3>
                  <button 
                    onClick={() => handleViewAll('budget')}
                    className="text-gray-400 hover:text-white text-sm"
                    aria-label="View all budget details"
                  >
                    See All
                  </button>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {budgetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Monthly</p>
                        <p className="text-sm text-gray-400">spending limit</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-4">
                      Spend: $3,050 / $5,000
                    </p>
                    <div className="space-y-3">
                      {budgetData.map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-gray-400">{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-[#86efac]" />
                          </div>
                          <span className="text-xs text-gray-400">Income</span>
                        </div>
                        <p className="text-sm font-semibold">+5%</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <TrendingDown className="h-4 w-4 text-[#fb7185]" />
                          </div>
                          <span className="text-xs text-gray-400">Expenses</span>
                        </div>
                        <p className="text-sm font-semibold">-2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Scheduled Payments */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Scheduled payments</h3>
                  <button 
                    onClick={() => handleViewAll('scheduled payments')}
                    className="text-gray-400 hover:text-white text-sm hover:underline"
                    aria-label="View all scheduled payments"
                  >
                    See All
                  </button>
                </div>

                <div className="space-y-3">
                  {recurringTransactions.length > 0 ? (
                    recurringTransactions.slice(0, 5).map((payment, i) => {
                      const Icon = getPaymentIcon(payment.description || '');
                      const dueInfo = getDaysUntilDue(payment.next_due_date);
                      const colors = ['#86efac', '#fb7185', '#fb923c', '#22d3ee', '#8b5cf6'];
                      const color = colors[i % colors.length];
                      
                      return (
                        <div 
                          key={payment.id} 
                          onClick={() => handlePaymentClick(payment)}
                          className="flex items-center justify-between group hover:bg-gray-800/50 rounded-lg p-3 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                              <Icon className="h-5 w-5" style={{ color: color }} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{payment.description || 'Recurring Payment'}</p>
                              <p className={`text-xs ${dueInfo.isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                                {dueInfo.isOverdue ? 'Overdue' : `Due in ${dueInfo.text}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-semibold">
                              {payment.amount < 0 ? '-' : ''}${Math.abs(payment.amount).toFixed(2)}
                            </p>
                            <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No scheduled payments</p>
                      <button
                        onClick={() => navigate('/transactions')}
                        className="mt-2 text-xs text-[#86efac] hover:underline"
                      >
                        Add recurring transaction
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Expenses */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Expenses</h3>
                  <button 
                    onClick={() => handleViewAll('expenses')}
                    className="text-gray-400 hover:text-white text-sm hover:underline"
                    aria-label="View all expenses"
                  >
                    See All
                  </button>
                </div>

                <div className="space-y-4">
                  {expenseCategories.length > 0 ? (
                    expenseCategories.map((category, i) => {
                      const Icon = category.icon;
                      return (
                        <div 
                          key={i} 
                          onClick={() => navigate('/analytics')}
                          className="space-y-2 cursor-pointer hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                                <Icon className="h-5 w-5" style={{ color: category.color }} />
                              </div>
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">${category.amount.toFixed(2)}</p>
                              <div className="flex items-center space-x-1 text-xs">
                                <span className={category.trend === 'up' ? 'text-red-500' : 'text-[#86efac]'}>
                                  {category.percentage}%
                                </span>
                                {category.trend === 'up' ? (
                                  <ArrowUpRight className="h-3 w-3 text-red-500" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-[#86efac]" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full transition-all"
                              style={{ 
                                width: `${Math.min(category.percentage * 5, 100)}%`,
                                backgroundColor: category.color 
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No expense data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-md border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Add New Account</h2>
              <p className="text-sm text-gray-400 mt-1">Create a new financial account</p>
            </div>

            <form onSubmit={createAccount} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g., Bank USD, EcoCash"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type *
                </label>
                <select
                  name="account_type"
                  required
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86efac] transition-colors"
                >
                  <option value="bank">Bank Account</option>
                  <option value="mobile_money">Mobile Money (EcoCash, OneMoney)</option>
                  <option value="cash">Cash</option>
                  <option value="savings">Savings Account</option>
                  <option value="investment">Investment Account</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency *
                </label>
                <select
                  name="currency"
                  required
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86efac] transition-colors"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="ZIG">ZiG - Zimbabwe Gold</option>
                  <option value="ZAR">ZAR - South African Rand</option>
                  <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Balance
                </label>
                <input
                  type="number"
                  name="balance"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAccount(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#86efac] to-[#22d3ee] hover:opacity-90 text-black rounded-lg font-medium transition-opacity"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      {showChatbot && (
        <Chatbot 
          initialOpen={true} 
          onClose={() => setShowChatbot(false)} 
        />
      )}

      {/* Navigation Menu Modal */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-4xl border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#1a1a1a] z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Navigation Menu</h2>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <UserCircle className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Access all pages and features</p>
            </div>

            <div className="p-6">
              {/* Main Pages */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#86efac] mb-4">Main Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => { setShowMenu(false); navigate('/dashboard'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <Home className="h-8 w-8 text-[#86efac] mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Dashboard</h4>
                    <p className="text-xs text-gray-400 mt-1">Overview of your finances</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/transactions'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <CreditCard className="h-8 w-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Transactions</h4>
                    <p className="text-xs text-gray-400 mt-1">Manage your transactions</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/accounts'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <Wallet className="h-8 w-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Accounts</h4>
                    <p className="text-xs text-gray-400 mt-1">Multi-currency accounts</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/analytics'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <BarChart3 className="h-8 w-8 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Analytics</h4>
                    <p className="text-xs text-gray-400 mt-1">Spending insights & reports</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/budgets'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <PiggyBank className="h-8 w-8 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Budgets</h4>
                    <p className="text-xs text-gray-400 mt-1">Track your budget goals</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/goals'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <Target className="h-8 w-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Goals</h4>
                    <p className="text-xs text-gray-400 mt-1">Financial goals & savings</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/investments'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <TrendingUpIcon className="h-8 w-8 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Investments</h4>
                    <p className="text-xs text-gray-400 mt-1">Portfolio tracking</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/market-trends'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <Globe className="h-8 w-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">Market Trends</h4>
                    <p className="text-xs text-gray-400 mt-1">Zimbabwe economic data</p>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); setShowChatbot(true); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                  >
                    <MessageSquare className="h-8 w-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white">AI Assistant</h4>
                    <p className="text-xs text-gray-400 mt-1">Financial advice chatbot</p>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#86efac] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => { setShowMenu(false); setShowAddAccount(true); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group flex items-center space-x-4"
                  >
                    <div className="bg-[#86efac]/20 rounded-lg p-3">
                      <Plus className="h-6 w-6 text-[#86efac]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">Add Account</h4>
                      <p className="text-xs text-gray-400">Create new account</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setShowMenu(false); navigate('/transactions'); }}
                    className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group flex items-center space-x-4"
                  >
                    <div className="bg-blue-400/20 rounded-lg p-3">
                      <Plus className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">Add Transaction</h4>
                      <p className="text-xs text-gray-400">Record new transaction</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Account Summary */}
              <div className="bg-gradient-to-br from-[#86efac]/10 to-[#22d3ee]/10 border border-[#86efac]/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Account Summary</h3>
                  <Wallet className="h-6 w-6 text-[#86efac]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Total Balance</p>
                    <p className="text-2xl font-bold text-white">${totalBalance.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Accounts</p>
                    <p className="text-2xl font-bold text-white">{accounts.length}</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowMenu(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">User Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Profile Information */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-4xl">
                  {user?.full_name?.substring(0, 2).toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{user?.full_name || 'User'}</h3>
                  <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                  <p className="text-2xl font-bold text-[#86efac]">${totalBalance.toFixed(2)}</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1">Accounts</p>
                  <p className="text-2xl font-bold text-white">{accounts.length}</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1">Transactions</p>
                  <p className="text-2xl font-bold text-white">{transactions.length}</p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user?.full_name || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user?.email || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user?.username || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                  <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowProfile(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#1a1a1a] z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Manage your application preferences</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <UserCircle className="h-5 w-5 mr-2 text-[#86efac]" />
                  Account Settings
                </h3>
                <div className="space-y-3 bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive transaction alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86efac]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Budget Alerts</p>
                      <p className="text-sm text-gray-400">Get notified when approaching budget limits</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86efac]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Goal Progress Updates</p>
                      <p className="text-sm text-gray-400">Track your savings goals progress</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86efac]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[#86efac]" />
                  Display Settings
                </h3>
                <div className="space-y-3 bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <div>
                    <label className="block text-white font-medium mb-2">Default Currency</label>
                    <select className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86efac]">
                      <option value="USD">USD - US Dollar</option>
                      <option value="ZiG">ZiG - Zimbabwe Gold</option>
                      <option value="ZAR">ZAR - South African Rand</option>
                      <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Date Format</label>
                    <select className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86efac]">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#86efac]" />
                  Security
                </h3>
                <div className="space-y-3 bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <button 
                    onClick={() => setShowChangePassword(true)}
                    className="w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-gray-800 rounded-lg transition-colors border border-gray-700"
                  >
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-sm text-gray-400 mt-1">Update your account password</p>
                  </button>
                  <button 
                    onClick={() => setShowTwoFactor(true)}
                    className="w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-gray-800 rounded-lg transition-colors border border-gray-700"
                  >
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400 mt-1">Add extra security to your account</p>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Danger Zone
                </h3>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <button className="w-full text-left px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors border border-red-500/50">
                    <p className="text-red-500 font-medium">Delete Account</p>
                    <p className="text-sm text-red-400 mt-1">Permanently delete your account and all data</p>
                  </button>
                </div>
              </div>

              {/* Save/Close Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Settings saved successfully!');
                    setShowSettings(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#86efac] to-[#22d3ee] hover:opacity-90 text-black rounded-lg font-medium transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-md border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#86efac]/20 flex items-center justify-center">
                    <Key className="h-5 w-5 text-[#86efac]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Change Password</h2>
                </div>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Update your account password</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const currentPassword = formData.get('current_password');
                const newPassword = formData.get('new_password');
                const confirmPassword = formData.get('confirm_password');

                if (newPassword !== confirmPassword) {
                  alert('New passwords do not match!');
                  return;
                }

                if (newPassword.length < 8) {
                  alert('Password must be at least 8 characters long!');
                  return;
                }

                // TODO: API call to change password
                alert('Password changed successfully!');
                setShowChangePassword(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="current_password"
                    required
                    placeholder="Enter current password"
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="new_password"
                    required
                    minLength={8}
                    placeholder="Enter new password (min 8 characters)"
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirm_password"
                    required
                    minLength={8}
                    placeholder="Confirm new password"
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                  />
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  <strong>Password Requirements:</strong>
                </p>
                <ul className="text-xs text-blue-400 mt-2 space-y-1 ml-4">
                  <li>• At least 8 characters long</li>
                  <li>• Mix of uppercase and lowercase letters (recommended)</li>
                  <li>• Include numbers and special characters (recommended)</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#86efac] to-[#22d3ee] hover:opacity-90 text-black rounded-lg font-medium transition-opacity"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#86efac]/20 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-[#86efac]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Two-Factor Authentication</h2>
                </div>
                <button
                  onClick={() => setShowTwoFactor(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Secure your account with 2FA</p>
            </div>

            <div className="p-6">
              {/* Setup Instructions */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#86efac] text-black flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Download Authenticator App</h3>
                      <p className="text-sm text-gray-400">
                        Install Google Authenticator, Authy, or Microsoft Authenticator on your mobile device
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#86efac] text-black flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Scan QR Code</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Open your authenticator app and scan this QR code
                      </p>
                      
                      {/* Mock QR Code */}
                      <div className="bg-white rounded-lg p-4 inline-flex flex-col items-center">
                        <QrCode className="h-32 w-32 text-gray-800" />
                        <p className="text-xs text-gray-600 mt-2">Scan with your app</p>
                      </div>

                      <div className="mt-4 bg-[#0a0a0a] border border-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Or enter this key manually:</p>
                        <code className="text-sm text-[#86efac] font-mono">
                          JBSW Y3DP EBLW 64TM MFZX GYLB
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#86efac] text-black flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Enter Verification Code</h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Enter the 6-digit code from your authenticator app
                      </p>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-500 font-medium">Important</p>
                      <p className="text-xs text-yellow-400 mt-1">
                        Save your backup codes in a safe place. You'll need them if you lose access to your authenticator app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowTwoFactor(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Two-Factor Authentication enabled successfully!');
                    setShowTwoFactor(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#86efac] to-[#22d3ee] hover:opacity-90 text-black rounded-lg font-medium transition-opacity"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkDashboard;
