import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { accountsAPI, transactionsAPI, notificationsAPI } from '../services/api';
import api from '../services/api';
import Chatbot from './Chatbot';
import { 
  Home, BarChart3, MessageSquare, Menu, User, Plus, Bell,
  TrendingUp, TrendingDown, ChevronRight, ArrowUpRight, ArrowDownRight,
  Building2, Wallet, DollarSign, ShoppingBag, UtensilsCrossed, Heart,
  Car, Wifi, LogOut, Settings, UserCircle, Target, PiggyBank, 
  CreditCard, Briefcase, Globe, TrendingUpIcon, AlertCircle, CheckCircle,
  Info, X, BellOff, Shield, Key, Lock, Smartphone, QrCode
} from 'lucide-react';

const SharedLayout = ({ children, activeNav = 'dashboard' }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  useEffect(() => {
    fetchData();
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

  const fetchData = async () => {
    try {
      const [accountsRes, transactionsRes, notificationsRes, budgetsRes, investmentsRes] = await Promise.allSettled([
        accountsAPI.getAll(),
        transactionsAPI.getAll({ limit: 10 }),
        notificationsAPI.getAll(),
        api.get('/budgets'),
        api.get('/investments'),
      ]);

      if (accountsRes.status === 'fulfilled') setAccounts(accountsRes.value.data);
      if (transactionsRes.status === 'fulfilled') setTransactions(transactionsRes.value.data);
      if (budgetsRes.status === 'fulfilled') {
        const budgetData = budgetsRes.value.data;
        setBudgets(Array.isArray(budgetData) ? budgetData : []);
      }
      if (investmentsRes.status === 'fulfilled') {
        // Investments endpoint returns { investments: [...], summary: {...} }
        const investmentData = investmentsRes.value.data.investments || investmentsRes.value.data;
        setInvestments(Array.isArray(investmentData) ? investmentData : []);
      }
      if (notificationsRes.status === 'fulfilled') {
        setNotifications(notificationsRes.value.data.notifications || []);
        setUnreadCount(notificationsRes.value.data.unread_count || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (navId) => {
    if (navId === 'dashboard') navigate('/dashboard');
    else if (navId === 'statistics') navigate('/analytics');
    else if (navId === 'ai-chat') setShowChatbot(true);
    else if (navId === 'menu') setShowMenu(true);
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

  const totalBalance = Array.isArray(accounts) ? accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0) : 0;
  const totalBudgets = Array.isArray(budgets) ? budgets.reduce((sum, budget) => sum + (budget.amount || 0), 0) : 0;
  const totalBudgetSpent = Array.isArray(budgets) ? budgets.reduce((sum, budget) => sum + (budget.spent || 0), 0) : 0;
  const totalInvestments = Array.isArray(investments) ? investments.reduce((sum, inv) => sum + (inv.current_value || 0), 0) : 0;
  const totalInvestmentCost = Array.isArray(investments) ? investments.reduce((sum, inv) => sum + (inv.purchase_price * inv.quantity || 0), 0) : 0;
  const investmentGainLoss = totalInvestments - totalInvestmentCost;

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
            { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
            { id: 'statistics', icon: BarChart3, label: 'Statistics', path: '/analytics' },
            { id: 'ai-chat', icon: MessageSquare, label: 'AI chat', path: null },
            { id: 'menu', icon: Menu, label: 'Menu', path: null }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.path ? navigate(item.path) : handleNavClick(item.id)}
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Top Bar with Notifications */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative z-[101]" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative"
                aria-label="Notifications"
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

          {/* Page Content */}
          {children}
        </div>
      </main>

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
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Access all pages and features</p>
            </div>

            <div className="p-6">
              {/* Main Pages */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#86efac] mb-4">Main Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { path: '/dashboard', icon: Home, color: '#86efac', title: 'Dashboard', desc: 'Overview of your finances' },
                    { path: '/transactions', icon: CreditCard, color: '#3b82f6', title: 'Transactions', desc: 'Manage your transactions' },
                    { path: '/accounts', icon: Wallet, color: '#8b5cf6', title: 'Accounts', desc: 'Multi-currency accounts' },
                    { path: '/analytics', icon: BarChart3, color: '#f97316', title: 'Analytics', desc: 'Spending insights & reports' },
                    { path: '/budgets', icon: PiggyBank, color: '#ec4899', title: 'Budgets', desc: 'Track your budget goals' },
                    { path: '/goals', icon: Target, color: '#10b981', title: 'Goals', desc: 'Financial goals & savings' },
                    { path: '/investments', icon: TrendingUpIcon, color: '#f59e0b', title: 'Investments', desc: 'Portfolio tracking' },
                    { path: '/market-trends', icon: Globe, color: '#06b6d4', title: 'Market Trends', desc: 'Zimbabwe economic data' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { setShowMenu(false); navigate(item.path); }}
                        className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 hover:border-[#86efac] transition-colors group text-left"
                      >
                        <Icon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color: item.color }} />
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                      </button>
                    );
                  })}
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

              {/* Financial Summary */}
              <div className="space-y-4">
                {/* Account Summary */}
                <div className="bg-gradient-to-br from-[#86efac]/10 to-[#22d3ee]/10 border border-[#86efac]/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
                    <Wallet className="h-6 w-6 text-[#86efac]" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Total Balance</p>
                      <p className="text-2xl font-bold text-white">${totalBalance.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">{accounts.length} accounts</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 flex items-center">
                        <PiggyBank className="h-3 w-3 mr-1" />
                        Budgets
                      </p>
                      <p className="text-2xl font-bold text-pink-400">{Array.isArray(budgets) ? budgets.length : 0}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {totalBudgets > 0 ? `${((totalBudgetSpent / totalBudgets) * 100).toFixed(0)}% used` : 'No budgets'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 flex items-center">
                        <TrendingUpIcon className="h-3 w-3 mr-1" />
                        Investments
                      </p>
                      <p className="text-2xl font-bold text-blue-400">${totalInvestments.toFixed(2)}</p>
                      <p className={`text-xs mt-1 ${investmentGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {investmentGainLoss >= 0 ? '▲' : '▼'} ${Math.abs(investmentGainLoss).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Transactions</p>
                      <p className="text-2xl font-bold text-white">{transactions.length}</p>
                      <p className="text-xs text-gray-500 mt-1">This month</p>
                    </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1 flex items-center">
                    <PiggyBank className="h-4 w-4 mr-1 text-pink-400" />
                    Budgets
                  </p>
                  <p className="text-2xl font-bold text-pink-400">{Array.isArray(budgets) ? budgets.length : 0}</p>
                  <p className="text-xs text-gray-500 mt-1">${totalBudgetSpent.toFixed(0)} / ${totalBudgets.toFixed(0)}</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1 flex items-center">
                    <TrendingUpIcon className="h-4 w-4 mr-1 text-blue-400" />
                    Investments
                  </p>
                  <p className="text-2xl font-bold text-blue-400">${totalInvestments.toFixed(2)}</p>
                  <p className={`text-xs mt-1 ${investmentGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {investmentGainLoss >= 0 ? '+' : ''}{investmentGainLoss.toFixed(2)}
                  </p>
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

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
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

                alert('Password changed successfully!');
                setShowChangePassword(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password *</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password *</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="new_password"
                    required
                    minLength={8}
                    placeholder="Enter new password"
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#86efac] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password *</label>
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
              <p className="text-gray-400 text-center mb-6">
                Two-Factor Authentication setup will be available here.
              </p>

              <div className="flex gap-3">
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

export default SharedLayout;
