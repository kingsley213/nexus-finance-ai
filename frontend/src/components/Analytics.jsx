import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart
} from 'recharts';
import { Filter, Download, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { analyticsAPI, transactionsAPI } from '../services/api';
import SharedLayout from './SharedLayout';

const Analytics = () => {
  const [spendingInsights, setSpendingInsights] = useState({});
  const [cashFlowForecast, setCashFlowForecast] = useState({});
  const [financialHealth, setFinancialHealth] = useState({});
  const [timeRange, setTimeRange] = useState('3months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [insightsRes, forecastRes, healthRes] = await Promise.all([
        analyticsAPI.getSpendingInsights(),
        analyticsAPI.getCashFlowForecast(),
        analyticsAPI.getFinancialHealth()
      ]);

      setSpendingInsights(insightsRes.data);
      setCashFlowForecast(forecastRes.data);
      setFinancialHealth(healthRes.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  // Export analytics report to CSV
  const handleExportAnalytics = () => {
    try {
      const exportData = [];
      
      // Header
      exportData.push(['NEXUS FINANCE AI - ANALYTICS REPORT']);
      exportData.push([`Generated: ${new Date().toLocaleString()}`]);
      exportData.push([`Time Range: ${timeRange}`]);
      exportData.push([]);
      
      // Financial Health Score
      if (financialHealth.score) {
        exportData.push(['FINANCIAL HEALTH SCORE']);
        exportData.push(['Overall Score', `${financialHealth.score}/100`]);
        if (financialHealth.breakdown) {
          Object.entries(financialHealth.breakdown).forEach(([key, value]) => {
            exportData.push([key.replace('_', ' ').toUpperCase(), value.toFixed(2)]);
          });
        }
        exportData.push([]);
      }
      
      // Spending by Category
      if (spendingInsights.category_breakdown) {
        exportData.push(['SPENDING BY CATEGORY']);
        exportData.push(['Category', 'Amount (USD)']);
        Object.entries(spendingInsights.category_breakdown).forEach(([category, amount]) => {
          exportData.push([category.charAt(0).toUpperCase() + category.slice(1), Math.abs(amount).toFixed(2)]);
        });
        exportData.push([]);
      }
      
      // Top Categories
      if (spendingInsights.top_categories) {
        exportData.push(['TOP 5 SPENDING CATEGORIES']);
        exportData.push(['Category', 'Amount (USD)']);
        Object.entries(spendingInsights.top_categories).forEach(([category, amount]) => {
          exportData.push([category.charAt(0).toUpperCase() + category.slice(1), amount.toFixed(2)]);
        });
        exportData.push([]);
      }
      
      // Monthly Trends
      if (spendingInsights.monthly_trends && spendingInsights.monthly_trends.length > 0) {
        exportData.push(['MONTHLY SPENDING TRENDS']);
        exportData.push(['Month', 'Amount (USD)']);
        spendingInsights.monthly_trends.forEach(trend => {
          exportData.push([trend.month, trend.amount.toFixed(2)]);
        });
        exportData.push([]);
      }
      
      // Cash Flow Forecast
      if (cashFlowForecast.forecast && cashFlowForecast.forecast.length > 0) {
        exportData.push(['CASH FLOW FORECAST (30 DAYS)']);
        exportData.push(['Date', 'Projected Balance (USD)', 'Day']);
        cashFlowForecast.forecast.slice(0, 10).forEach(day => {
          exportData.push([day.date, day.projected_balance.toFixed(2), day.day_of_week || '']);
        });
        exportData.push(['...', '...', '...']);
        exportData.push(['Risk Assessment', cashFlowForecast.risk_assessment?.toUpperCase() || 'N/A']);
        exportData.push(['Days Until Negative Balance', cashFlowForecast.days_until_negative_balance || 'N/A']);
        exportData.push([]);
      }
      
      // Zimbabwe Context
      if (spendingInsights.zimbabwe_context) {
        exportData.push(['ZIMBABWE CONTEXT INSIGHTS']);
        const zim = spendingInsights.zimbabwe_context;
        if (zim.mobile_money_usage) {
          exportData.push(['Mobile Money Transactions', zim.mobile_money_usage.count || 0]);
          exportData.push(['Mobile Money Usage %', (zim.mobile_money_usage.percentage_of_total || 0).toFixed(1) + '%']);
        }
        if (zim.currency_breakdown) {
          exportData.push(['Currencies Used', Object.keys(zim.currency_breakdown).join(', ')]);
        }
        if (zim.informal_sector_insights) {
          exportData.push(['Informal Sector Transactions', zim.informal_sector_insights.count || 0]);
        }
        exportData.push([]);
      }
      
      // Summary Statistics
      exportData.push(['SUMMARY STATISTICS']);
      if (spendingInsights.total_income) {
        exportData.push(['Total Income', spendingInsights.total_income.toFixed(2)]);
      }
      if (spendingInsights.total_expenses) {
        exportData.push(['Total Expenses', Math.abs(spendingInsights.total_expenses).toFixed(2)]);
      }
      if (spendingInsights.net_cash_flow) {
        exportData.push(['Net Cash Flow', spendingInsights.net_cash_flow.toFixed(2)]);
      }
      if (spendingInsights.average_monthly_spend) {
        exportData.push(['Average Monthly Spend', spendingInsights.average_monthly_spend.toFixed(2)]);
      }
      
      // Recommendations
      if (financialHealth.recommendations && financialHealth.recommendations.length > 0) {
        exportData.push([]);
        exportData.push(['RECOMMENDATIONS']);
        financialHealth.recommendations.forEach((rec, index) => {
          exportData.push([`${index + 1}. ${rec}`]);
        });
      }
      
      // Convert to CSV
      const csvContent = exportData.map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');
      
      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting analytics:', error);
      alert('Failed to export analytics report. Please try again.');
    }
  };

  if (loading) {
    return (
      <SharedLayout activeNav="analytics">
        <div className="space-y-6">
        <div className="skeleton-text h-8 w-48"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-chart h-80"></div>
          ))}
        </div>
      </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="analytics">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Analytics</h1>
          <p className="text-blue-200 font-medium">Deep insights into your financial behavior</p>
        </div>
        <div className="flex space-x-3">
          <label htmlFor="analytics-time-range" className="sr-only">Select time range</label>
          <select 
            id="analytics-time-range"
            aria-label="Select time range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button 
            onClick={handleExportAnalytics}
            className="btn btn-outline"
            title="Export analytics report to CSV"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Financial Health Overview */}
      {financialHealth.score > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-gray-900">{financialHealth.score}/100</div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
          </div>
          {financialHealth.breakdown && Object.entries(financialHealth.breakdown).map(([key, value]) => (
            <div key={key} className="card">
              <div className="card-body text-center">
                <div className="text-2xl font-bold text-gray-900">{value.toFixed(0)}</div>
                <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        {spendingInsights.category_breakdown && Object.keys(spendingInsights.category_breakdown).length > 0 && (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(spendingInsights.category_breakdown).map(([name, value]) => ({
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        value: Math.abs(value)
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
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
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={spendingInsights.monthly_trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                    <Legend />
                    <Bar dataKey="amount" fill="#3B82F6" name="Total Spending" />
                    <Line type="monotone" dataKey="amount" stroke="#EF4444" name="Trend" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Forecast */}
        {cashFlowForecast.forecast && cashFlowForecast.forecast.length > 0 && (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Forecast</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowForecast.forecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Balance']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="projected_balance" 
                      stroke={cashFlowForecast.risk_assessment === 'high' ? '#EF4444' : '#10B981'} 
                      fill={cashFlowForecast.risk_assessment === 'high' ? '#FEE2E2' : '#D1FAE5'} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Risk Level: <span className={`font-medium ${
                  cashFlowForecast.risk_assessment === 'high' ? 'text-red-600' :
                  cashFlowForecast.risk_assessment === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>{cashFlowForecast.risk_assessment}</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Categories */}
        {spendingInsights.top_categories && Object.keys(spendingInsights.top_categories).length > 0 && (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
              <div className="space-y-4">
                {Object.entries(spendingInsights.top_categories).map(([category, amount], index) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="font-medium text-gray-900 capitalize">{category}</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zimbabwe Context Insights */}
      {spendingInsights.zimbabwe_context && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zimbabwe Context Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">
                  {spendingInsights.zimbabwe_context.mobile_money_usage?.percentage_of_total?.toFixed(1)}%
                </div>
                <div className="text-sm text-blue-700">Mobile Money Usage</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">
                  {Object.keys(spendingInsights.zimbabwe_context.currency_breakdown || {}).length}
                </div>
                <div className="text-sm text-green-700">Currencies Used</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">
                  {spendingInsights.zimbabwe_context.informal_sector_insights?.count || 0}
                </div>
                <div className="text-sm text-purple-700">Informal Sector Transactions</div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </SharedLayout>
  );
};

export default Analytics;
