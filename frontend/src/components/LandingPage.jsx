import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Home, DollarSign, CreditCard, TrendingUp, 
  Users, Shield, Smartphone, BarChart3, Zap, Globe, 
  ArrowUpRight, CheckCircle, Star, Award, Target
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 p-2 rounded-xl">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">NexusFinance</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors font-medium bg-none border-none cursor-pointer">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium bg-none border-none cursor-pointer">
                <BarChart3 className="h-4 w-4" />
                <span>Services</span>
              </button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium bg-none border-none cursor-pointer">
                <DollarSign className="h-4 w-4" />
                <span>Pricing</span>
              </button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium bg-none border-none cursor-pointer">
                <Star className="h-4 w-4" />
                <span>Features</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="hidden md:block text-gray-700 hover:text-gray-900 font-semibold transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                <span>Open Account</span>
                <div className="bg-gray-900 rounded-full p-1 group-hover:scale-110 transition-transform">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Control your<br />
                finance<br />
                future easily
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Streamline your business's financial management with our intuitive, 
                scalable SaaS platform. Designed for U.S. enterprises.
              </p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/register')}
                  className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Open Account</span>
                  <div className="bg-gray-900 rounded-full p-1.5 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                    <div className="relative bg-white rounded-full p-4 shadow-lg border-4 border-blue-100">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">15 Million+</p>
                    <p className="text-sm text-gray-600">
                      Unlock the power of real-time analytics<br />
                      with our cutting-edge financial
                    </p>
                  </div>
                </div>
              </div>

              {/* User Avatars */}
              <div className="flex items-center space-x-2 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative">
              <div className="relative z-10">
                {/* Phone Frame */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-[3rem] p-3 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-semibold">9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-3 bg-gray-900 rounded-sm"></div>
                          <div className="w-1 h-3 bg-gray-900 rounded-sm"></div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-700 p-2 rounded-lg">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Hello, Alex</span>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                        </div>
                      </div>

                      {/* Balance Card */}
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-6">
                        <p className="text-sm text-gray-600 mb-2">Total Balance</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-4xl font-bold text-gray-900 mb-1">$123,981.00</p>
                            <div className="flex items-center space-x-1 text-green-600 text-sm font-semibold">
                              <ArrowUpRight className="h-4 w-4" />
                              <span>+100%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                          { icon: ArrowUpRight, label: 'Deposit' },
                          { icon: ArrowRight, label: 'Withdraw' },
                          { icon: Zap, label: 'Topup' },
                          { icon: ArrowRight, label: 'Send' }
                        ].map((action, i) => (
                          <div key={i} className="text-center">
                            <div className="bg-white rounded-xl p-3 shadow-md mb-2 hover:scale-105 transition-transform">
                              <action.icon className="h-5 w-5 mx-auto text-gray-700" />
                            </div>
                            <p className="text-xs text-gray-600 font-medium">{action.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Transfer Money */}
                      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
                        <p className="text-sm font-bold text-gray-900 mb-3">Transfer Money</p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
                            ))}
                          </div>
                          <button className="bg-blue-100 rounded-full p-2">
                            <Users className="h-4 w-4 text-blue-600" />
                          </button>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-white rounded-2xl p-4 shadow-md">
                        <p className="text-sm font-bold text-gray-900 mb-3">Recent Activity</p>
                        <div className="space-y-3">
                          {[
                            { name: 'Jonathon Alex', amount: '+$589.99', color: 'green' },
                            { name: 'Behance Project', amount: '+$219.78', color: 'green' },
                            { name: 'MacBook Air', amount: '-$450.56', color: 'red' }
                          ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                                  {tx.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{tx.name}</p>
                                  <p className="text-xs text-gray-500">Today</p>
                                </div>
                              </div>
                              <span className={`text-sm font-bold ${tx.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Easily Section */}
      <section id="services" className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Card - Connect Easily */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Connect Easily</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  See all
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Savannah Nguyen', subtitle: 'Unlock the power of real-time' },
                  { name: 'Brooklyn Simmons', subtitle: 'Unlock the power of real-time' }
                ].map((person, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500"></div>
                      <div>
                        <p className="font-semibold text-gray-900">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.subtitle}</p>
                      </div>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                      <ArrowRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Card - Digital Banking */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Digital Banking<br />Platform!</h3>
                <div className="flex items-center justify-center my-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#D4FF00] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">TRY NOW</span>
                    </div>
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <Smartphone className="h-10 w-10 text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            </div>

            {/* Right Card - Grow Capital */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute top-8 right-8">
                <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm transform -rotate-12">
                  Featured App
                </div>
              </div>
              <div className="absolute top-16 right-24">
                <div className="w-16 h-16 bg-blue-200 rounded-full"></div>
              </div>
              <div className="absolute bottom-8 left-8">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Revolutionary
                </div>
              </div>
              <div className="relative z-10 mt-auto pt-32">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Grow your capital with<br />
                  No boundary at all
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Trusted by 50,000+ people</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Everything you need in one platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you manage your finances effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Bank-level Security', desc: 'Your data is protected with enterprise-grade encryption' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Real-time updates and instant transactions' },
              { icon: BarChart3, title: 'Smart Analytics', desc: 'AI-powered insights to optimize your finances' },
              { icon: Globe, title: 'Multi-Currency', desc: 'Support for 150+ currencies worldwide' },
              { icon: Smartphone, title: 'Mobile First', desc: 'Seamless experience across all devices' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized by industry leaders globally' }
            ].map((feature, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join millions of users who trust NexusFinance for their financial management
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => navigate('/register')}
              className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-10 py-5 rounded-full transition-all shadow-xl hover:shadow-2xl text-lg"
            >
              <span>Get Started Free</span>
              <div className="bg-gray-900 rounded-full p-2 group-hover:scale-110 transition-transform">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-gray-200 font-bold px-10 py-5 rounded-full border-2 border-white hover:bg-white/10 transition-all text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">NexusFinance</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering financial futures with intelligent solutions.
              </p>
            </div>
            {[
              { title: 'Product', links: [{ name: 'Features', route: '/features' }, { name: 'Pricing', route: '/pricing' }, { name: 'Security', route: '/security' }, { name: 'Updates', route: '/updates' }] },
              { title: 'Company', links: [{ name: 'About', route: '/about' }, { name: 'Careers', route: '/careers' }, { name: 'Press', route: '/press' }, { name: 'Contact', route: '/contact' }] },
              { title: 'Legal', links: [{ name: 'Terms', route: '#' }, { name: 'Privacy', route: '#' }, { name: 'Cookies', route: '#' }, { name: 'Licenses', route: '#' }] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button onClick={() => navigate(link.route)} className="text-gray-400 hover:text-white transition-colors text-sm bg-none border-none cursor-pointer">
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 NexusFinance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
