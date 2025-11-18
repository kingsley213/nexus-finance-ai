import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Shield, Key, Eye } from 'lucide-react';

const Security = () => {
  const navigate = useNavigate();

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption protocols.'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'We employ the same security measures used by leading financial institutions worldwide.'
    },
    {
      icon: Key,
      title: 'Multi-Factor Authentication',
      description: 'Protect your account with two-factor authentication via email, SMS, or authenticator apps.'
    },
    {
      icon: Eye,
      title: 'Regular Security Audits',
      description: 'Third-party security firms conduct regular audits and penetration tests to ensure maximum protection.'
    }
  ];

  const certifications = [
    'SOC 2 Type II Certified',
    'GDPR Compliant',
    'HIPAA Compliant',
    'ISO 27001 Certified',
    'PCI DSS Level 1 Compliant',
    'CCPA Compliant'
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
            Security You Can Trust
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your financial data is our top priority. We maintain enterprise-grade security standards to protect your information.
          </p>
        </div>
      </div>

      {/* Security Features */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Certifications & Compliance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center border border-gray-200">
                <p className="font-semibold text-gray-900">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-4xl font-bold mb-12 text-center">
            How We Protect Your Data
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Infrastructure</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ AWS & Google Cloud infrastructure</li>
                <li>✓ Multiple geographic redundancy</li>
                <li>✓ 99.99% uptime SLA</li>
                <li>✓ Automatic daily backups</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Compliance</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Regular security audits</li>
                <li>✓ Penetration testing</li>
                <li>✓ ISO certifications</li>
                <li>✓ Data protection regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start using NexusFinance securely
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses that trust us with their financial data.
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

export default Security;
