import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Bug, Plus } from 'lucide-react';

const Updates = () => {
  const navigate = useNavigate();

  const updates = [
    {
      date: 'November 2025',
      title: 'AI-Powered Financial Forecasting',
      description: 'Advanced machine learning algorithms now provide predictive financial forecasts based on your spending patterns and economic indicators.',
      type: 'feature'
    },
    {
      date: 'November 2025',
      title: 'Dark Mode & Accessibility Improvements',
      description: 'Enjoy a new dark mode interface and enhanced accessibility features for users with visual impairments.',
      type: 'feature'
    },
    {
      date: 'October 2025',
      title: 'API v2 Release',
      description: 'Our new API v2 offers improved performance, better error handling, and additional endpoints for advanced integrations.',
      type: 'feature'
    },
    {
      date: 'October 2025',
      title: 'Performance Improvements',
      description: 'Dashboard load times reduced by 40% with optimized database queries and improved caching strategies.',
      type: 'improvement'
    },
    {
      date: 'September 2025',
      title: 'Transaction Categorization AI',
      description: 'Our AI now automatically categorizes transactions with 98% accuracy, saving you hours of manual data entry.',
      type: 'feature'
    },
    {
      date: 'September 2025',
      title: 'Bug Fixes & Stability',
      description: 'Fixed several minor bugs and improved overall platform stability across all modules.',
      type: 'bugfix'
    }
  ];

  const getUpdateIcon = (type) => {
    switch(type) {
      case 'feature': return Plus;
      case 'improvement': return Zap;
      case 'bugfix': return Bug;
      default: return Zap;
    }
  };

  const getUpdateColor = (type) => {
    switch(type) {
      case 'feature': return 'bg-blue-100 text-blue-600';
      case 'improvement': return 'bg-yellow-100 text-yellow-600';
      case 'bugfix': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getUpdateLabel = (type) => {
    switch(type) {
      case 'feature': return 'New Feature';
      case 'improvement': return 'Improvement';
      case 'bugfix': return 'Bug Fix';
      default: return 'Update';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer bg-none border-none">
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 p-2 rounded-xl">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">NexusFinance</span>
            </button>
            <button
              onClick={() => navigate('/register')}
              className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Latest Updates
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay informed about new features, improvements, and enhancements to NexusFinance.
          </p>
        </div>
      </div>

      {/* Updates Timeline */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {updates.map((update, index) => {
              const Icon = getUpdateIcon(update.type);
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-6">
                    <div className={`${getUpdateColor(update.type)} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-semibold text-gray-500">{update.date}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUpdateColor(update.type)}`}>
                          {getUpdateLabel(update.type)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{update.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{update.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Never miss an update
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter to get notified about new features and improvements.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-3 rounded-full transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to experience the latest features?
          </h2>
          <button
            onClick={() => navigate('/register')}
            className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl mx-auto"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 NexusFinance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Updates;
