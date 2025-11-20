import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Newspaper, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SharedLayout from './SharedLayout';

const MarketTrends = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock data for Zimbabwe market trends
  const mockMarketData = {
    exchangeRates: {
      USD: { rate: 1, change: 0, trend: 'stable' },
      ZIG: { rate: 13.5, change: -0.2, trend: 'down' },
      ZAR: { rate: 18.7, change: 0.3, trend: 'up' }
    },
    inflation: {
      current: 4.2,
      previous: 3.8,
      trend: 'up',
      forecast: 4.5
    },
    economicIndicators: {
      gdpGrowth: 2.1,
      unemployment: 8.5,
      interestRate: 9.0
    },
    commodityPrices: [
      { name: 'Maize', price: 250, change: 5, unit: 'USD/ton' },
      { name: 'Gold', price: 1980, change: 1.2, unit: 'USD/oz' },
      { name: 'Platinum', price: 950, change: -0.5, unit: 'USD/oz' },
      { name: 'Tobacco', price: 3200, change: 3.1, unit: 'USD/kg' }
    ],
    news: [
      {
        title: 'RBZ Maintains Monetary Policy Stance',
        source: 'The Herald',
        date: '2024-01-15',
        summary: 'Central bank holds key interest rate steady amid inflation concerns.',
        impact: 'medium'
      },
      {
        title: 'ZiG Shows Stability Against USD',
        source: 'Business Weekly',
        date: '2024-01-14',
        summary: 'New currency maintains value as adoption increases.',
        impact: 'high'
      },
      {
        title: 'Agricultural Sector Growth Projected',
        source: 'Financial Gazette',
        date: '2024-01-13',
        summary: 'Favorable rains boost farming output forecasts.',
        impact: 'medium'
      },
      {
        title: 'Mobile Money Transactions Reach Record High',
        source: 'Tech Zimbabwe',
        date: '2024-01-12',
        summary: 'EcoCash and OneMoney see 25% growth in transaction volumes.',
        impact: 'low'
      }
    ],
    informalSector: {
      activity: 'high',
      trends: [
        { sector: 'Street Vending', growth: 12, stability: 'medium' },
        { sector: 'Cross-border Trade', growth: 8, stability: 'low' },
        { sector: 'Artisanal Mining', growth: 15, stability: 'high' },
        { sector: 'Transport Services', growth: 6, stability: 'medium' }
      ]
    }
  };

  useEffect(() => {
    fetchMarketData();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setMarketData(mockMarketData);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value}%`;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
           trend === 'down' ? <TrendingDown className="h-4 w-4" /> : 
           <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
  };

  if (loading && !marketData) {
    return (
    <SharedLayout activeNav="market-trends">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Market Trends</h1>
            <p className="text-blue-200 font-medium\">Zimbabwe Economic Indicators & News</p>
          </div>
          <div className="skeleton-text h-8 w-32"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-chart h-64"></div>
          ))}
        </div>
      </div>
    </SharedLayout>
    );
  }

  return (
    <SharedLayout activeNav="market-trends">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">Market Trends</h1>
            <p className="text-blue-200 font-medium">Zimbabwe Economic Indicators & News</p>
          </div>
          <div className="flex items-center space-x-3">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchMarketData}
            disabled={loading}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Exchange Rates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(marketData.exchangeRates).map(([currency, data]) => (
          <div key={currency} className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currency}</h3>
                    <p className="text-sm text-gray-500">Exchange Rate</p>
                  </div>
                </div>
                <div className={`flex items-center ${getTrendColor(data.trend)}`}>
                  {getTrendIcon(data.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {formatPercentage(data.change)}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {data.rate} {currency === 'USD' ? 'ZWL' : 'USD'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  1 {currency} = {data.rate} {currency === 'USD' ? 'ZWL' : 'USD'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inflation Trends */}
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inflation Trends</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Inflation</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {marketData.inflation.current}%
                  </span>
                  <div className={`ml-2 flex items-center ${getTrendColor(marketData.inflation.trend)}`}>
                    {getTrendIcon(marketData.inflation.trend)}
                    <span className="ml-1 text-sm">
                      {formatPercentage(marketData.inflation.current - marketData.inflation.previous)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Previous</span>
                <span className="text-gray-900">{marketData.inflation.previous}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Forecast</span>
                <span className="text-orange-600 font-semibold">{marketData.inflation.forecast}%</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  Inflation expected to rise in coming months
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Economic Indicators */}
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Economic Indicators</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GDP Growth</span>
                <span className="text-green-600 font-semibold">{marketData.economicIndicators.gdpGrowth}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unemployment Rate</span>
                <span className="text-red-600 font-semibold">{marketData.economicIndicators.unemployment}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interest Rate</span>
                <span className="text-blue-600 font-semibold">{marketData.economicIndicators.interestRate}%</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Moderate growth with stable monetary policy maintained by RBZ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commodity Prices */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commodity Prices</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.commodityPrices.map((commodity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {commodity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(commodity.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center ${
                        commodity.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {commodity.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {formatPercentage(commodity.change)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {commodity.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* News & Updates */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Latest News</h3>
            <Newspaper className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {marketData.news.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.impact === 'high' ? 'bg-red-100 text-red-800' :
                    item.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.impact} impact
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{item.source}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informal Sector Insights */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informal Sector Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-800 font-medium">Informal Sector Activity: HIGH</span>
              <span className="text-green-600 text-sm">Vibrant and growing</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketData.informalSector.trends.map((sector, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{sector.sector}</span>
                    <span className="text-green-600 text-sm font-medium">+{sector.growth}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Growth</span>
                    <span>Stability: {sector.stability}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Insight:</strong> The informal sector continues to show strong growth, particularly in artisanal mining and street vending. 
                This reflects both economic pressures and entrepreneurial resilience in the current market conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </SharedLayout>
  );
};

export default MarketTrends;
