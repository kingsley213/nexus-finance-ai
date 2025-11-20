import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Plus, Edit2, Trash2, PieChart, Download } from 'lucide-react';
import api from '../services/api';
import SharedLayout from './SharedLayout';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newBudget, setNewBudget] = useState({
    category: 'food',
    amount: '',
    currency: 'USD',
    period: 'monthly'
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const categories = [
    'food', 'transport', 'utilities', 'entertainment', 'healthcare',
    'education', 'shopping', 'housing', 'personal_care', 'other'
  ];

  const currencies = ['USD', 'ZIG', 'ZAR'];

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/budgets');
      setBudgets(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load budgets');
      console.error('Error fetching budgets:', err);
    } finally {
      setLoading(false);
    }
  };

  const createBudget = async (e) => {
    e.preventDefault();
    try {
      await api.post('/budgets', {
        category: newBudget.category,
        amount: parseFloat(newBudget.amount),
        currency: newBudget.currency,
        period: newBudget.period
      });
      
      setSuccess('Budget created successfully!');
      showNotification(`Budget for ${newBudget.category} created successfully!`, 'success');
      setShowModal(false);
      setNewBudget({ category: 'food', amount: '', currency: 'USD', period: 'monthly' });
      fetchBudgets();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create budget');
      showNotification('Failed to create budget', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const deleteBudget = async (budgetId) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) return;
    
    try {
      await api.delete(`/api/v1/budgets/${budgetId}`);
      setSuccess('Budget deleted successfully');
      fetchBudgets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete budget');
    }
  };

  const getProgressColor = (progress, status) => {
    if (status === 'exceeded') return 'bg-red-500';
    if (status === 'warning') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (status) => {
    const styles = {
      on_track: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      exceeded: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      on_track: 'On Track',
      warning: 'Warning',
      exceeded: 'Exceeded'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  // Export budgets to CSV
  const handleExport = () => {
    try {
      const headers = ['Category', 'Amount', 'Spent', 'Remaining', 'Currency', 'Progress %', 'Status', 'Period'];
      const csvContent = [
        headers.join(','),
        ...budgets.map(b => [
          b.category.replace('_', ' '),
          b.amount.toFixed(2),
          b.spent_amount.toFixed(2),
          b.remaining.toFixed(2),
          b.currency,
          b.progress.toFixed(1),
          b.status,
          b.period
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `budgets_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting budgets:', error);
      alert('Failed to export budgets. Please try again.');
    }
  };

  if (loading) {
    return (
      <SharedLayout activeNav="budgets">
        <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="budgets">
      <div className="p-6">
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

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Budgets</h1>
          <p className="text-gray-600 font-medium">Track your spending against budgets</p>
        </div>
        <div className="flex gap-3">
          {budgets.length > 0 && (
            <button
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2"
              title="Export budgets to CSV"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Budget
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {success}
        </div>
      )}

      {/* Budget Summary */}
      {budgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Budgets</p>
                <p className="text-2xl font-bold text-gray-900">{budgets.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Allocated</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${budgets.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${budgets.reduce((sum, b) => sum + b.spent_amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget List */}
      {budgets.length === 0 ? (
        <div className="card text-center py-12">
          <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Budgets Yet</h3>
          <p className="text-gray-600 mb-4">Create your first budget to start tracking spending</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Create Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {budget.category.replace('_', ' ')}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">{budget.period}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(budget.status)}
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-semibold">
                    {budget.currency} {budget.spent_amount.toFixed(2)} / {budget.amount.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(budget.progress, budget.status)}`}
                    style={{ width: `${Math.min(budget.progress, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{budget.progress}%</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <span className={`font-semibold ${budget.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {budget.currency} {budget.remaining.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Budget</h2>
            
            <form onSubmit={createBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  className="form-input capitalize"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                  className="form-input"
                  placeholder="500.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={newBudget.currency}
                  onChange={(e) => setNewBudget({...newBudget, currency: e.target.value})}
                  className="form-input"
                  required
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({...newBudget, period: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Budget
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </SharedLayout>
  );
};

export default Budgets;
