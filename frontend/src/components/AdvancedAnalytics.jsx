import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { analyticsAPI } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdvancedAnalytics = () => {
  const [aiForecast, setAiForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inflationRate, setInflationRate] = useState(0.02);

  useEffect(() => {
    fetchAdvancedAnalytics();
  }, [inflationRate]);

  const fetchAdvancedAnalytics = async () => {
    try {
      // This would call the new advanced AI endpoint
      // For now, we'll enhance the existing analytics
      const [insightsRes, forecastRes, healthRes] = await Promise.all([
        analyticsAPI.getSpendingInsights(),
        analyticsAPI.getCashFlowForecast(inflationRate),
        analyticsAPI.getFinancialHealth()
      ]);

      // Simulate AI-enhanced data
      const enhancedData = {
        insights: insightsRes.data,
        forecast: forecastRes.data,
        health: healthRes.data,
        aiRecommendations: generateAIRecommendations(insightsRes.data, healthRes.data)
      };

      setAiForecast(enhancedData);
    } catch (error) {
      console.error('Error fetching advanced analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIRecommendations = (insights, health) => {
    const recommendations = [];
    
    if (insights.spending_velocity > 10) {
      recommendations.push({
        type: 'spending_growth',
        title: 'Rapid Spending Increase',
        message: `Your spending is growing at ${insights.spending_velocity}% monthly. Consider reviewing discretionary expenses.`,
        priority: 'high',
        icon: 'trending-up'
      });
    }

    if (health.score < 50) {
      recommendations.push({
        type: 'financial_health',
        title: 'Financial Health Improvement',
        message: 'Your financial health score needs attention. Focus on building emergency savings and reducing high-interest debt.',
        priority: 'high',
        icon: 'heart'
      });
    }

    if (insights.net_cash_flow < 0) {
      recommendations.push({
        type: 'negative_cashflow',
        title: 'Negative Cash Flow',
        message: 'You\'re spending more than you earn. Identify areas to reduce expenses or increase income.',
        priority: 'critical',
        icon: 'alert'
      });
    }

    // Add Zimbabwe-specific recommendations
    recommendations.push({
      type: 'currency_management',
      title: 'Multi-Currency Strategy',
      message: 'In Zimbabwe\'s economy, maintain USD for savings and local currency for daily expenses. Monitor exchange rates regularly.',
      priority: 'medium',
      icon: 'currency'
    });

    return recommendations;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton-text h-8 w-48"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-chart h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Advanced Analytics</h1>
          <p className="text-gray-600 font-medium">AI-powered insights and forecasts</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Inflation Rate:</label>
            <select 
              value={inflationRate}
              onChange={(e) => setInflationRate(parseFloat(e.target.value))}
              className="form-select text-sm"
            >
              <option value={0.01}>1%</option>
              <option value={0.02}>2%</option>
              <option value={0.03}>3%</option>
              <option value={0.05}>5%</option>
              <option value={0.08}>8%</option>
            </select>
          </div>
          <button 
            onClick={fetchAdvancedAnalytics}
            className="btn btn-primary"
          >
            Refresh Analysis
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      {aiForecast?.aiRecommendations && aiForecast.aiRecommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiForecast.aiRecommendations.map((rec, index) => (
            <div key={index} className={`card border-l-4 ${
              rec.priority === 'critical' ? 'border-red-500' :
              rec.priority === 'high' ? 'border-orange-500' :
              'border-blue-500'
            }`}>
              <div className="card-body">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    rec.priority === 'critical' ? 'bg-red-100' :
                    rec.priority === 'high' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    {rec.icon === 'trending-up' && <TrendingUp className="h-4 w-4 text-current" />}
                    {rec.icon === 'alert' && <AlertTriangle className="h-4 w-4 text-current" />}
                    {rec.icon === 'heart' && <Brain className="h-4 w-4 text-current" />}
                    {rec.icon === 'currency' && <Lightbulb className="h-4 w-4 text-current" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.message}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Take action →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Health with AI Insights */}
        {aiForecast?.health && (
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Financial Health Analysis</h3>
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <svg className="w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke={aiForecast.health.score >= 70 ? '#10B981' : aiForecast.health.score >= 40 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="376.8"
                      strokeDashoffset={376.8 * (1 - aiForecast.health.score / 100)}
                      transform="rotate(-90 64 64)"
                    />
                    <text
                      x="64"
                      y="64"
                      textAnchor="middle"
                      dy="7"
                      fontSize="20"
                      fontWeight="bold"
                      fill="#4B5563"
                    >
                      {aiForecast.health.score}
                    </text>
                  </svg>
                </div>
                <div className="mt-2">
                  <span className={`text-lg font-semibold ${
                    aiForecast.health.score >= 70 ? 'text-green-600' : 
                    aiForecast.health.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {aiForecast.health.score >= 70 ? 'Excellent' : 
                     aiForecast.health.score >= 40 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              {aiForecast.health.breakdown && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Score Breakdown</h4>
                  {Object.entries(aiForecast.health.breakdown).map(([category, score]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">
                        {category.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cash Flow Forecast with Inflation */}
        {aiForecast?.forecast && (
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Inflation-Aware Forecast</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Inflation: {(inflationRate * 100).toFixed(1)}%</span>
                  <div className={`h-3 w-3 rounded-full ${
                    aiForecast.forecast.risk_assessment === 'high' ? 'bg-red-500' :
                    aiForecast.forecast.risk_assessment === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiForecast.forecast.forecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="projected_balance" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <span className={`font-medium capitalize ${
                    aiForecast.forecast.risk_assessment === 'high' ? 'text-red-600' :
                    aiForecast.forecast.risk_assessment === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {aiForecast.forecast.risk_assessment}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Days Until Negative</span>
                  <span className="font-medium text-gray-900">
                    {aiForecast.forecast.days_until_negative_balance}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Daily Spending</span>
                  <span className="font-medium text-gray-900">
                    ${aiForecast.forecast.average_daily_spending}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spending Analysis */}
      {aiForecast?.insights && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending by Category */}
          {aiForecast.insights.category_breakdown && Object.keys(aiForecast.insights.category_breakdown).length > 0 && (
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(aiForecast.insights.category_breakdown).map(([name, value]) => ({
                          name: name.charAt(0).toUpperCase() + name.slice(1),
                          value: Math.abs(value)
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {Object.entries(aiForecast.insights.category_breakdown).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Trends */}
          {aiForecast.insights.monthly_trends && aiForecast.insights.monthly_trends.length > 0 && (
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aiForecast.insights.monthly_trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI-Powered Action Plan */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Action Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-900">Short-term (1 month)</h4>
              <p className="text-sm text-blue-700 mt-1">
                Review top 3 spending categories and identify one area to reduce by 10%
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-900">Medium-term (3 months)</h4>
              <p className="text-sm text-green-700 mt-1">
                Build emergency fund to cover 1 month of essential expenses
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-900">Long-term (1 year)</h4>
              <p className="text-sm text-purple-700 mt-1">
                Achieve 20% savings rate and establish 3-6 month emergency fund
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
