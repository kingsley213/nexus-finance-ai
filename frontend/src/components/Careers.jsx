import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Users, TrendingUp, Heart, Briefcase, MapPin } from 'lucide-react';

const Careers = () => {
  const navigate = useNavigate();

  const openPositions = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$150K - $200K',
      level: 'Senior',
      skills: 'React, Node.js, PostgreSQL, AWS'
    },
    {
      title: 'Machine Learning Engineer',
      department: 'AI/ML',
      location: 'Remote',
      type: 'Full-time',
      salary: '$160K - $220K',
      level: 'Senior',
      skills: 'Python, TensorFlow, PyTorch, scikit-learn'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$140K - $180K',
      level: 'Mid',
      skills: 'Product strategy, Analytics, Fintech'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120K - $160K',
      level: 'Mid',
      skills: 'Figma, Prototyping, User research'
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100K - $140K',
      level: 'Mid',
      skills: 'SQL, Python, Tableau, Statistics'
    },
    {
      title: 'Customer Success Manager',
      department: 'Sales & Support',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80K - $120K',
      level: 'Mid',
      skills: 'CRM, Customer relations, Sales'
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
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6 font-semibold">
            🚀 We're Hiring
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Join Our Growing Team
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Help us revolutionize financial management for businesses worldwide. Build something incredible with us.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>80+ Team Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>Remote First</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Join NexusFinance?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Cutting-Edge Technology',
                description: 'Work with the latest technologies including AI/ML, cloud infrastructure, and modern web frameworks. Use TypeScript, Python, React, and AWS daily.'
              },
              {
                icon: Users,
                title: 'Talented Team',
                description: 'Collaborate with experienced professionals from top companies like Google, Stripe, and Coinbase who are passionate about solving complex problems.'
              },
              {
                icon: TrendingUp,
                title: 'Growth Opportunities',
                description: 'Fast-growing company with clear career paths. We invest in our team with mentorship, training budget, and opportunities for leadership.'
              }
            ].map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((job, i) => (
              <div key={i} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <span className="font-semibold">{job.level}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{job.salary}</p>
                    <p className="text-xs text-gray-500 mt-1">{job.department}</p>
                  </div>
                </div>
                <div className="pl-16">
                  <p className="text-sm text-gray-600 mb-3">Skills: {job.skills}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Learn More & Apply</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Comprehensive Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '💰', title: 'Competitive Compensation', desc: 'Top-tier salaries with equity packages' },
              { icon: '❤️', title: 'Health & Wellness', desc: 'Comprehensive health, dental, vision insurance' },
              { icon: '🏖️', title: 'Unlimited PTO', desc: 'Flexible time off policy - we trust you' },
              { icon: '🌍', title: 'Remote-First Culture', desc: 'Work from anywhere in the world' },
              { icon: '📚', title: 'Learning Budget', desc: '$2,500/year for professional development' },
              { icon: '🎯', title: 'Career Growth', desc: 'Clear paths for advancement and leadership' },
              { icon: '⏰', title: 'Flexible Hours', desc: 'Core hours only, work when you\'re productive' },
              { icon: '🎁', title: '401(k) Matching', desc: 'Up to 6% employer match' }
            ].map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Collaborative',
                description: 'We believe in open communication, pair programming, and knowledge sharing. Everyone\'s voice matters.'
              },
              {
                title: 'Mission-Driven',
                description: 'Our team is passionate about democratizing financial management. We\'re here to make a real impact.'
              },
              {
                title: 'Inclusive & Diverse',
                description: 'We celebrate diversity and create an inclusive environment where everyone can do their best work.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to make an impact?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Send us your resume and tell us why you'd be a great fit for NexusFinance. We review all applications!
          </p>
          <a
            href="mailto:careers@nexusfinance.com"
            className="group inline-flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <span>💌 careers@nexusfinance.com</span>
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-gray-400 text-sm mt-6">Or apply directly to any position above</p>
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

export default Careers;
