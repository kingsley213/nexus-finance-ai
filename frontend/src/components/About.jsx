import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Globe, Zap, Award, TrendingUp, Heart } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Co-Founder & CEO',
      bio: '15+ years in fintech, previously at Goldman Sachs',
      initial: 'AJ'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Co-Founder & CTO',
      bio: 'AI/ML expert, Stanford PhD in Computer Science',
      initial: 'SM'
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Product',
      bio: 'Former PM at PayPal, 10+ years in financial tech',
      initial: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Operations',
      bio: 'Scaled 3 startups to profitability',
      initial: 'ER'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Founded NexusFinance',
      description: 'Started with a vision to revolutionize financial management for small and medium businesses.'
    },
    {
      year: '2023',
      title: 'First 1,000 Users',
      description: 'Launched beta program with early adopters and received incredible feedback.'
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Raised $5M in Series A to accelerate product development and market expansion.'
    },
    {
      year: '2024',
      title: '50,000 Active Users',
      description: 'Reached 50,000 users across 120+ countries with $10B+ in transactions processed.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Opened offices in London, Singapore, and Sydney to serve customers worldwide.'
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
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6 font-semibold">
            🚀 Our Story
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About NexusFinance
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering businesses and individuals to take control of their financial futures through intelligent technology.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To democratize financial management by providing accessible, intelligent tools that empower businesses of all sizes to make smarter financial decisions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that with the right technology and insights, anyone can master their finances and build a stronger financial future. We're on a mission to make that possible.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Making financial management effortless</span>
                </li>
                <li className="flex items-center space-x-3">
                  <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Driving financial growth and success</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Supporting businesses we believe in</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Trusted by 50,000+ Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((event, i) => (
              <div key={i} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {event.year}
                  </div>
                  {i < timeline.length - 1 && <div className="w-1 h-24 bg-blue-200 mt-4"></div>}
                </div>
                <div className="pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-lg">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'User-Centric',
                description: 'We prioritize our users needs and continuously innovate to deliver the best experience. Customer feedback drives our product roadmap.'
              },
              {
                icon: Globe,
                title: 'Global Impact',
                description: 'We empower businesses worldwide to succeed in the global economy with financial intelligence and tools.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'We push boundaries with cutting-edge AI and technology to solve real financial challenges for our customers.'
              }
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <p className="text-5xl font-bold text-[#D4FF00] mb-2">50K+</p>
              <p className="text-gray-300">Active Users</p>
              <p className="text-xs text-gray-400 mt-2">120+ Countries</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#D4FF00] mb-2">$10B+</p>
              <p className="text-gray-300">Transactions Processed</p>
              <p className="text-xs text-gray-400 mt-2">Since Launch</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#D4FF00] mb-2">99.99%</p>
              <p className="text-gray-300">Uptime</p>
              <p className="text-xs text-gray-400 mt-2">Enterprise SLA</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#D4FF00] mb-2">4.9/5</p>
              <p className="text-gray-300">Rating</p>
              <p className="text-xs text-gray-400 mt-2">2,500+ Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 flex items-center space-x-6">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {member.initial}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-1">{member.bio}</p>
                </div>
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
                title: 'Remote First',
                description: 'We embrace a distributed team culture, allowing top talent from anywhere to join our mission.'
              },
              {
                title: 'Continuous Learning',
                description: 'We invest in our team\'s growth with annual learning budgets and professional development opportunities.'
              },
              {
                title: 'Work-Life Balance',
                description: 'We believe happy employees create great products. Flexible hours, unlimited PTO, and mental health support.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join us on our mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start managing your finances intelligently today. Be part of a financial revolution.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="group flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl mx-auto"
          >
            <span>Get Started</span>
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

export default About;
