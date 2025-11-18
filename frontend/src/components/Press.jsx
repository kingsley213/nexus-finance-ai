import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Newspaper, TrendingUp, Award, Zap } from 'lucide-react';

const Press = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      date: 'November 15, 2025',
      title: 'NexusFinance Reaches 50,000 Active Users, $10B in Transactions Processed',
      excerpt: 'Financial management platform announces record user growth milestone as businesses increasingly adopt AI-powered financial solutions. Company projects 200K users by end of 2026.',
      category: 'Milestone',
      icon: TrendingUp
    },
    {
      date: 'October 28, 2025',
      title: 'Series B Funding Round: $25M Investment',
      excerpt: 'Leading venture capital firms including Sequoia Capital and Andreessen Horowitz invest in NexusFinance to accelerate product development and expand to 50 new markets.',
      category: 'Funding',
      icon: Award
    },
    {
      date: 'October 10, 2025',
      title: 'NexusFinance Partners with Major Banks for Open Banking',
      excerpt: 'New API partnership with top 10 global banks enables seamless integration with banking systems, providing customers with real-time financial visibility across multiple institutions.',
      category: 'Partnership',
      icon: Zap
    },
    {
      date: 'September 22, 2025',
      title: 'Named Best FinTech Innovation by Global Finance Awards',
      excerpt: 'NexusFinance wins prestigious award for technological innovation in financial management, recognized by 500+ finance industry leaders.',
      category: 'Award',
      icon: Award
    },
    {
      date: 'September 5, 2025',
      title: 'AI Transaction Classifier Achieves 98% Accuracy',
      excerpt: 'New machine learning model automatically categorizes transactions with industry-leading accuracy, saving customers an average of 10 hours per month.',
      category: 'Product',
      icon: Zap
    },
    {
      date: 'August 18, 2025',
      title: 'Launches European Operations in London',
      excerpt: 'Expands team and opens London headquarters to better serve growing customer base across Europe and support compliance with GDPR regulations.',
      category: 'Expansion',
      icon: TrendingUp
    }
  ];

  const mediaReach = [
    { outlet: 'Forbes', reaches: '65M+ readers', color: 'from-blue-500 to-blue-600' },
    { outlet: 'TechCrunch', reaches: '12M+ monthly', color: 'from-green-500 to-green-600' },
    { outlet: 'Financial Times', reaches: '8M+ subscribers', color: 'from-pink-500 to-pink-600' },
    { outlet: 'Wall Street Journal', reaches: '5M+ digital', color: 'from-purple-500 to-purple-600' }
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
          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6 font-semibold">
            📰 Latest News
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Press Center
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Latest news, press releases, and media coverage about NexusFinance
          </p>
          <p className="text-gray-600">
            Featured in <strong>Forbes, TechCrunch, Financial Times, and Wall Street Journal</strong>
          </p>
        </div>
      </div>

      {/* Press Releases */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Recent Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => {
              const Icon = release.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-500">{release.date}</span>
                          <span className="ml-3 inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                            {release.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{release.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{release.excerpt}</p>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center space-x-2">
                      <span>Read Full Release</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Mentions */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Featured In</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            NexusFinance has been covered by leading media outlets reaching 90M+ people
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaReach.map((media, i) => (
              <div key={i} className={`bg-gradient-to-br ${media.color} rounded-xl p-8 text-white shadow-lg`}>
                <h3 className="text-2xl font-bold mb-2">{media.outlet}</h3>
                <p className="text-white/80">{media.reaches}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Media Kit</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Company Overview',
                description: 'High-resolution logos, company information, and key statistics for media use.',
                icon: '📋'
              },
              {
                title: 'Executive Bios',
                description: 'Detailed bios and professional photos of our leadership team members.',
                icon: '👥'
              },
              {
                title: 'Product Screenshots',
                description: 'High-quality screenshots of NexusFinance dashboard and features.',
                icon: '📸'
              },
              {
                title: 'Brand Guidelines',
                description: 'Logo usage guidelines, color palette, and brand standards.',
                icon: '🎨'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Download</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Opportunities */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-8">Interview & Speaking Opportunities</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Our executive team is available for interviews, podcasts, and speaking engagements. Topics include fintech innovation, AI in financial management, remote work culture, and startup scaling.
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 mb-8">
            <h3 className="text-xl font-bold mb-4">Available Speakers</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Alex Johnson, CEO - Fintech strategy, startup growth</li>
              <li>• Sarah Mitchell, CTO - AI/ML innovations, technical architecture</li>
              <li>• Marcus Chen, Head of Product - Financial tools, UX design</li>
            </ul>
          </div>
          <a
            href="mailto:press@nexusfinance.com"
            className="inline-flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all"
          >
            <span>Request an Interview</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Relations</h2>
          <p className="text-lg text-gray-600 mb-8">
            For press inquiries, interview requests, media information, or to arrange an interview with our executives, please contact our communications team.
          </p>
          <a
            href="mailto:press@nexusfinance.com"
            className="inline-flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <Newspaper className="h-5 w-5" />
            <span>press@nexusfinance.com</span>
            <ArrowRight className="h-4 w-4" />
          </a>
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

export default Press;
