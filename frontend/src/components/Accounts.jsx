import React, { useState, useEffect } from 'react';
import { Plus, Wallet, CreditCard, Smartphone, TrendingUp, TrendingDown, X } from 'lucide-react';
import { accountsAPI, transactionsAPI } from '../services/api';
import SharedLayout from './SharedLayout';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: '',
    account_type: 'bank',
    currency: 'USD',
    balance: '',
    color: '#3B82F6'
  });
  const [editAccount, setEditAccount] = useState({
    name: '',
    account_type: 'bank',
    currency: 'USD',
    balance: '',
    color: '#3B82F6'
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success', 'error', 'info'
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await accountsAPI.create({
        ...newAccount,
        balance: parseFloat(newAccount.balance) || 0
      });
      setShowAddModal(false);
      setNewAccount({
        name: '',
        account_type: 'bank',
        currency: 'USD',
        balance: '',
        color: '#3B82F6'
      });
      showNotification(`Account "${newAccount.name}" created successfully!`, 'success');
      fetchAccounts(); // Refresh the list
    } catch (error) {
      console.error('Error adding account:', error);
      showNotification('Failed to create account', 'error');
    }
  };

  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      await accountsAPI.update(selectedAccount.id, {
        ...editAccount,
        balance: parseFloat(editAccount.balance) || 0
      });
      setShowEditModal(false);
      showNotification(`Account "${editAccount.name}" updated successfully!`, 'success');
      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
      showNotification('Failed to update account', 'error');
    }
  };

  const openEditModal = (account) => {
    setSelectedAccount(account);
    setEditAccount({
      name: account.name,
      account_type: account.account_type,
      currency: account.currency,
      balance: account.balance,
      color: account.color
    });
    setShowEditModal(true);
  };

  const openTransactionsModal = async (account) => {
    setSelectedAccount(account);
    try {
      const response = await transactionsAPI.getAll({
        account_id: account.id
      });
      setAccountTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setShowTransactionsModal(true);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getAccountTypeIcon = (type) => {
    switch (type) {
      case 'bank':
        return <CreditCard className="h-5 w-5" />;
      case 'mobile_money':
        return <Smartphone className="h-5 w-5" />;
      case 'cash':
        return <Wallet className="h-5 w-5" />;
      case 'savings':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$',
      ZIG: 'ZiG',
      ZAR: 'R'
    };
    return symbols[currency] || currency;
  };

  const getAccountTypeLabel = (type) => {
    const labels = {
      bank: 'Bank Account',
      mobile_money: 'Mobile Money',
      cash: 'Cash',
      savings: 'Savings'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <SharedLayout activeNav="accounts">
        <div className="space-y-4">
          <div className="skeleton-text h-8 w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-chart h-40"></div>
            ))}
          </div>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="accounts">
      <div className="space-y-6">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fadeIn ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Accounts</h1>
            <p className="text-blue-200 font-medium">Manage your financial accounts</p>
          </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="card hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: account.color }}
                  >
                    {getAccountTypeIcon(account.account_type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500">{getAccountTypeLabel(account.account_type)}</p>
                  </div>
                </div>
                <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-gray-100 text-gray-800">
                  {account.currency}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Balance</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance, account.currency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Account Type</span>
                  <span className="text-gray-700 capitalize">{account.account_type}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Currency</span>
                  <span className="text-gray-700">{account.currency}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => openTransactionsModal(account)}
                  className="flex-1 btn btn-outline py-2 text-sm hover:bg-blue-50"
                >
                  View Transactions
                </button>
                <button 
                  onClick={() => openEditModal(account)}
                  className="flex-1 btn btn-outline py-2 text-sm hover:bg-blue-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {accounts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Wallet className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500 mb-2">No accounts yet</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            Add Your First Account
          </button>
        </div>
      )}

      {/* Account Summary */}
      {accounts.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['USD', 'ZIG', 'ZAR'].map(currency => {
                const currencyAccounts = accounts.filter(acc => acc.currency === currency);
                const totalBalance = currencyAccounts.reduce((sum, acc) => sum + acc.balance, 0);
                
                if (currencyAccounts.length === 0) return null;
                
                return (
                  <div key={currency} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totalBalance, currency)}
                    </div>
                    <div className="text-sm text-gray-600">Total {currency}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currencyAccounts.length} account{currencyAccounts.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                );
              })}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">
                  {formatCurrency(accounts.reduce((sum, acc) => sum + acc.balance, 0))}
                </div>
                <div className="text-sm text-blue-700">Total Balance</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Account</h3>
              
              <form onSubmit={handleAddAccount} className="space-y-4">
                <div>
                  <label className="form-label">Account Name</label>
                  <input
                    type="text"
                    required
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                    className="form-input"
                    placeholder="e.g., EcoCash USD"
                  />
                </div>

                <div>
                  <label className="form-label">Account Type</label>
                  <select
                    required
                    value={newAccount.account_type}
                    onChange={(e) => setNewAccount({...newAccount, account_type: e.target.value})}
                    className="form-select"
                  >
                    <option value="bank">Bank Account</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="cash">Cash</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Currency</label>
                  <select
                    required
                    value={newAccount.currency}
                    onChange={(e) => setNewAccount({...newAccount, currency: e.target.value})}
                    className="form-select"
                  >
                    <option value="USD">USD</option>
                    <option value="ZIG">ZiG</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Initial Balance</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="form-label">Color</label>
                  <div className="flex space-x-2">
                    {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`h-8 w-8 rounded-full border-2 ${
                          newAccount.color === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewAccount({...newAccount, color})}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {showEditModal && selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Account</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditAccount} className="space-y-4">
              <div>
                <label className="form-label">Account Name</label>
                <input
                  type="text"
                  required
                  value={editAccount.name}
                  onChange={(e) => setEditAccount({...editAccount, name: e.target.value})}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Account Type</label>
                <select
                  required
                  value={editAccount.account_type}
                  onChange={(e) => setEditAccount({...editAccount, account_type: e.target.value})}
                  className="form-select"
                >
                  <option value="bank">Bank Account</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="cash">Cash</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div>
                <label className="form-label">Currency</label>
                <select
                  required
                  value={editAccount.currency}
                  onChange={(e) => setEditAccount({...editAccount, currency: e.target.value})}
                  className="form-select"
                >
                  <option value="USD">USD</option>
                  <option value="ZIG">ZiG</option>
                  <option value="ZAR">ZAR</option>
                </select>
              </div>

              <div>
                <label className="form-label">Current Balance</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editAccount.balance}
                  onChange={(e) => setEditAccount({...editAccount, balance: e.target.value})}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Color</label>
                <div className="flex space-x-2">
                  {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`h-8 w-8 rounded-full border-2 ${
                        editAccount.color === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setEditAccount({...editAccount, color})}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Transactions Modal */}
      {showTransactionsModal && selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Transactions</h3>
                <p className="text-sm text-gray-500">{selectedAccount.name}</p>
              </div>
              <button
                onClick={() => setShowTransactionsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {accountTransactions.length > 0 ? (
                accountTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-semibold ${transaction.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount, selectedAccount.currency)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions found for this account
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowTransactionsModal(false)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </SharedLayout>
  );
};

export default Accounts;
