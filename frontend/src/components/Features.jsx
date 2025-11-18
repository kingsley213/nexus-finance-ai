import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, BarChart3, Shield, Zap, Users, Target, Clock, Star } from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Real-time financial insights with AI-powered predictions and trend analysis to help you make informed decisions.',
      details: 'Comprehensive dashboards showing spending patterns, forecasts, and actionable insights'
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency Support',
      description: 'Manage finances across multiple currencies with real-time exchange rates and comprehensive reporting.',
      details: 'Support for 150+ currencies with live market rates updated every 5 minutes'
    },
    {
      icon: BarChart3,
      title: 'Custom Reports',
      description: 'Generate detailed financial reports with customizable templates and automated scheduling.',
      details: 'Schedule reports to be emailed automatically daily, weekly, or monthly'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption and compliance with international financial regulations.',
      details: 'AES-256 encryption, SOC 2 Type II certified, GDPR and HIPAA compliant'
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Seamlessly integrate with your existing business tools and platforms via our robust REST API.',
      details: 'Extensive API documentation with SDKs for Python, Node.js, Java, and Go'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Invite team members, set permissions, and collaborate on financial management in real-time.',
      details: 'Role-based access control with granular permission settings'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and track financial goals with automated progress monitoring and milestone notifications.',
      details: 'Get alerts when you reach 25%, 50%, 75%, and 100% of your goals'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Dedicated customer support available around the clock to assist with any questions or issues.',
      details: 'Live chat, email, and phone support with average response time of 15 minutes'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CFO, TechStartup Inc',
      text: 'NexusFinance has transformed how we manage our finances. The AI insights alone save us 10 hours per week.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Finance Director, Global Corp',
      text: 'The integration capabilities are outstanding. We connected all our business tools in hours, not days.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Small Business Owner',
      text: 'Finally, a financial tool that\'s both powerful and easy to use. My team loves it!',
      rating: 5
    }
  ];

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
            Powerful Features for Modern Financial Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to streamline your finances and make smarter financial decisions.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>4.9/5 (2,500+ reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>50,000+ active users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group cursor-pointer hover:border-blue-200">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="h-7 w-7 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Feature Highlights</h2>
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Advanced Dashboard</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our machine learning algorithms analyze your financial patterns and provide intelligent recommendations to help you save money and optimize spending.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time spending analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Predictive financial forecasts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Anomaly detection for fraud prevention</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Automated insights and recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h3>
              <p className="text-lg text-gray-600 mb-6">
                Connect NexusFinance with your favorite business tools. Our extensive integration library makes it easy to automate your workflow.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">50+ pre-built integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Custom API for any tool</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Zapier & Make.com support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Webhook support for real-time updates</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Zap className="h-24 w-24 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Powerful Integrations</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Shield className="h-24 w-24 text-red-600 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Enterprise Security</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-lg text-gray-600 mb-6">
                Your financial data is protected with the same security standards used by leading banks and financial institutions worldwide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">AES-256 military-grade encryption</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Multi-factor authentication (MFA)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Regular security audits & penetration testing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">ISO 27001, SOC 2 Type II certified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-blue-600 mb-2">2M+</p>
              <p className="text-gray-600">Transactions Processed Daily</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2">99.99%</p>
              <p className="text-gray-600">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-purple-600 mb-2">50+</p>
              <p className="text-gray-600">Integrations Available</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-red-600 mb-2">15min</p>
              <p className="text-gray-600">Average Support Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your financial management?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using NexusFinance to optimize their finances. Start your free trial today - no credit card required.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl mx-auto"
          >
            <span>Start 14-Day Free Trial</span>
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

export default Features;
