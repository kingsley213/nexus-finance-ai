import axios from 'axios';

const API_BASE_URL = '/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
};

// Accounts API
export const accountsAPI = {
  getAll: () => api.get('/accounts'),
  create: (accountData) => api.post('/accounts', null, { params: accountData }),
};

// Transactions API
export const transactionsAPI = {
  getAll: (params = {}) => api.get('/transactions', { params }),
  create: (transactionData) => api.post('/transactions', null, { params: transactionData }),
};

// Analytics API
export const analyticsAPI = {
  getSpendingInsights: () => api.get('/analytics/spending-insights'),
  getCashFlowForecast: (inflationRate = 0.02) => 
    api.get('/analytics/cash-flow-forecast', { params: { inflation_rate: inflationRate } }),
  getFinancialHealth: () => api.get('/analytics/financial-health'),
};

// Goals API
export const goalsAPI = {
  getAll: () => api.get('/goals'),
  create: (goalData) => api.post('/goals', null, { params: goalData }),
  updateProgress: (goalId, currentAmount) => 
    api.put(`/goals/${goalId}`, null, { params: { current_amount: currentAmount } }),
};

// ML API
export const mlAPI = {
  predictCategory: (description, amount) => 
    api.get('/ml/predict-category', { params: { description, amount } }),
  getModelInfo: () => api.get('/ml/model-info'),
};

// Recurring Transactions API
export const recurringTransactionsAPI = {
  getAll: () => api.get('/recurring-transactions'),
  create: (data) => api.post('/recurring-transactions', null, { params: data }),
  delete: (id) => api.delete(`/recurring-transactions/${id}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (unreadOnly = false) => api.get('/notifications', { params: { unread_only: unreadOnly } }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

export default api;
