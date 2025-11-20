import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Plus, Trash2, BarChart3 } from 'lucide-react';
import api from '../services/api';
import SharedLayout from './SharedLayout';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    investment_type: 'stocks',
    amount_invested: '',
    current_value: '',
    currency: 'USD',
    purchase_date: new Date().toISOString().split('T')[0],
    expected_return: '',
    risk_level: 'medium',
    notes: ''
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const investmentTypes = [
    { value: 'stocks', label: 'Stocks' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'business', label: 'Business Investment' },
    { value: 'mutual_funds', label: 'Mutual Funds' },
    { value: 'other', label: 'Other' }
  ];

  const riskLevels = ['low', 'medium', 'high'];
  const currencies = ['USD', 'ZIG', 'ZAR'];

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/investments');
      setInvestments(response.data.investments || []);
      setSummary(response.data.summary || {});
      setError('');
    } catch (err) {
      setError('Failed to load investments');
      console.error('Error fetching investments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createInvestment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/investments', {
        ...newInvestment,
        amount_invested: parseFloat(newInvestment.amount_invested),
        current_value: parseFloat(newInvestment.current_value),
        expected_return: newInvestment.expected_return ? parseFloat(newInvestment.expected_return) : null
      });
      
      setSuccess('Investment added successfully!');
      setShowModal(false);
      setNewInvestment({
        name: '',
        investment_type: 'stocks',
        amount_invested: '',
        current_value: '',
        currency: 'USD',
        purchase_date: new Date().toISOString().split('T')[0],
        expected_return: '',
        risk_level: 'medium',
        notes: ''
      });
      fetchInvestments();
      
      setTimeout(() => setSuccess(''), 3000);
      showNotification(`Investment "${newInvestment.name}" added successfully!`, 'success');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create investment');
      showNotification('Failed to create investment', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const deleteInvestment = async (investmentId) => {
    if (!window.confirm('Are you sure you want to delete this investment?')) return;
    
    try {
      await api.delete(`/api/v1/investments/${investmentId}`);
      setSuccess('Investment deleted successfully');
      fetchInvestments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete investment');
    }
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    };
    return colors[risk] || colors.medium;
  };

  if (loading) {
    return (
      <SharedLayout activeNav="investments">
        <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="investments">
      <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Investment Portfolio</h1>
          <p className="text-blue-200 font-medium">Manage and track your investments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Investment
        </button>
      </div>

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

      {/* Portfolio Summary */}
      {Object.keys(summary).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${summary.total_invested?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${summary.total_current_value?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${summary.total_gain_loss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {summary.total_gain_loss >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${summary.total_gain_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(summary.total_gain_loss || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${summary.total_return_percentage >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <BarChart3 className={`h-6 w-6 ${summary.total_return_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Return</p>
                <p className={`text-2xl font-bold ${summary.total_return_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.total_return_percentage?.toFixed(2) || '0.00'}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment List */}
      {investments.length === 0 ? (
        <div className="card text-center py-12">
          <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Investments Yet</h3>
          <p className="text-gray-600 mb-4">Start building your investment portfolio</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Add Investment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {investments.map((investment) => (
            <div key={investment.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{investment.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskColor(investment.risk_level)}`}>
                      {investment.risk_level} Risk
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {investment.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Invested</p>
                      <p className="font-semibold text-gray-900">
                        {investment.currency} {investment.amount_invested?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Current Value</p>
                      <p className="font-semibold text-gray-900">
                        {investment.currency} {investment.current_value?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Gain/Loss</p>
                      <p className={`font-semibold ${investment.gain_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.gain_loss >= 0 ? '+' : ''}{investment.currency} {investment.gain_loss?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Return</p>
                      <p className={`font-semibold ${investment.gain_loss_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.gain_loss_percentage >= 0 ? '+' : ''}{investment.gain_loss_percentage?.toFixed(2)}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteInvestment(investment.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Investment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <h2 className="text-2xl font-bold mb-4">Add New Investment</h2>
            
            <form onSubmit={createInvestment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Name *
                  </label>
                  <input
                    type="text"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    className="form-input"
                    placeholder="e.g., Apple Stock"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={newInvestment.investment_type}
                    onChange={(e) => setNewInvestment({...newInvestment, investment_type: e.target.value})}
                    className="form-input"
                    required
                  >
                    {investmentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Invested *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvestment.amount_invested}
                    onChange={(e) => setNewInvestment({...newInvestment, amount_invested: e.target.value})}
                    className="form-input"
                    placeholder="1000.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Value *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvestment.current_value}
                    onChange={(e) => setNewInvestment({...newInvestment, current_value: e.target.value})}
                    className="form-input"
                    placeholder="1250.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency *
                  </label>
                  <select
                    value={newInvestment.currency}
                    onChange={(e) => setNewInvestment({...newInvestment, currency: e.target.value})}
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
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    value={newInvestment.purchase_date}
                    onChange={(e) => setNewInvestment({...newInvestment, purchase_date: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvestment.expected_return}
                    onChange={(e) => setNewInvestment({...newInvestment, expected_return: e.target.value})}
                    className="form-input"
                    placeholder="8.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Level *
                  </label>
                  <select
                    value={newInvestment.risk_level}
                    onChange={(e) => setNewInvestment({...newInvestment, risk_level: e.target.value})}
                    className="form-input"
                    required
                  >
                    {riskLevels.map(level => (
                      <option key={level} value={level} className="capitalize">{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={newInvestment.notes}
                  onChange={(e) => setNewInvestment({...newInvestment, notes: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Additional notes about this investment..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Add Investment
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

export default Investments;
