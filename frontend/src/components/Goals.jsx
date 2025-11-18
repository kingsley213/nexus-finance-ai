import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Calendar, Plus, Trash2, Edit2, DollarSign, Download } from 'lucide-react';
import api from '../services/api';
import SharedLayout from './SharedLayout';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target_amount: '',
    currency: 'USD',
    deadline: '',
    category: 'savings',
    priority: 'medium'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/goals');
      setGoals(response.data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post('/goals', {
        ...newGoal,
        target_amount: parseFloat(newGoal.target_amount)
      });
      setShowAddModal(false);
      setNewGoal({
        title: '',
        target_amount: '',
        currency: 'USD',
        deadline: '',
        category: 'savings',
        priority: 'medium'
      });
      fetchGoals(); // Refresh the list
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const updateGoalProgress = async (goalId, currentAmount) => {
    try {
      await api.put(`/goals/${goalId}`, {
        current_amount: parseFloat(currentAmount) || 0
      });
      fetchGoals(); // Refresh the list
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const getGoalStatus = (goal) => {
    const progress = getProgressPercentage(goal);
    const daysRemaining = getDaysRemaining(goal.deadline);
    
    if (progress >= 100) return { status: 'completed', color: 'text-green-600' };
    if (daysRemaining < 0) return { status: 'overdue', color: 'text-red-600' };
    if (daysRemaining < 30) return { status: 'urgent', color: 'text-orange-600' };
    if (progress > 75) return { status: 'on-track', color: 'text-blue-600' };
    return { status: 'in-progress', color: 'text-gray-600' };
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (goal) => {
    return Math.min(100, (goal.current_amount / goal.target_amount) * 100);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <SharedLayout activeNav="goals">
        <div className="space-y-4">
        <div className="skeleton-text h-8 w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-chart h-48"></div>
          ))}
        </div>
      </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="goals">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track your savings and investment targets</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </button>
      </div>

      {/* Goals Summary */}
      {goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-2xl font-bold text-gray-900">{goals.length}</div>
              <div className="text-sm text-gray-600">Total Goals</div>
            </div>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => getProgressPercentage(g) >= 100).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <div className="text-2xl font-bold text-orange-600">
                {goals.filter(g => getDaysRemaining(g.deadline) < 30 && getProgressPercentage(g) < 100).length}
              </div>
              <div className="text-sm text-gray-600">Due Soon</div>
            </div>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(goals.reduce((sum, g) => sum + g.current_amount, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const status = getGoalStatus(goal);
          
          return (
            <div key={goal.id} className="card">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                      <span className={`text-xs font-medium ${status.color}`}>
                        {status.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {daysRemaining < 30 && daysRemaining >= 0 && (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{formatCurrency(goal.current_amount, goal.currency)} / {formatCurrency(goal.target_amount, goal.currency)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {progress.toFixed(1)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category</span>
                      <div className="font-medium text-gray-900 capitalize">{goal.category}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Deadline</span>
                      <div className="font-medium text-gray-900">
                        {formatDate(goal.deadline)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Time remaining</span>
                    <span className={daysRemaining < 0 ? 'text-red-600' : daysRemaining < 30 ? 'text-orange-600' : 'text-green-600'}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Update amount"
                      className="flex-1 form-input text-sm"
                      onBlur={(e) => updateGoalProgress(goal.id, e.target.value)}
                    />
                    <button 
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        updateGoalProgress(goal.id, input.value);
                      }}
                      className="btn btn-outline text-sm"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Target className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500 mb-2">No goals yet</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            Set Your First Goal
          </button>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Set New Goal</h3>
              
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="form-label">Goal Title</label>
                  <input
                    type="text"
                    required
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="form-input"
                    placeholder="e.g., Emergency Fund"
                  />
                </div>

                <div>
                  <label className="form-label">Target Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newGoal.target_amount}
                    onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="form-label">Currency</label>
                  <select
                    required
                    value={newGoal.currency}
                    onChange={(e) => setNewGoal({...newGoal, currency: e.target.value})}
                    className="form-select"
                  >
                    <option value="USD">USD</option>
                    <option value="ZIG">ZiG</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    required
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select
                    required
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    className="form-select"
                  >
                    <option value="savings">Savings</option>
                    <option value="emergency">Emergency Fund</option>
                    <option value="education">Education</option>
                    <option value="investment">Investment</option>
                    <option value="travel">Travel</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Priority</label>
                  <select
                    required
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
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
                    Set Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </SharedLayout>
  );
};

export default Goals;
