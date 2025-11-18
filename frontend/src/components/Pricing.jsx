import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      description: 'Perfect for individuals and small teams',
      savings: billingCycle === 'annual' ? '$58 /year' : '',
      features: [
        'Up to 5 accounts',
        'Basic analytics',
        'Mobile app access',
        'Email support',
        'Monthly reports',
        '1 GB storage'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      description: 'Ideal for growing businesses',
      savings: billingCycle === 'annual' ? '$158 /year' : '',
      features: [
        'Unlimited accounts',
        'Advanced analytics & AI insights',
        'API access',
        'Priority email & chat support',
        'Custom reports',
        '100 GB storage',
        'Team collaboration (up to 10)',
        'Multi-currency support'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      savings: 'Volume discounts available',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'Unlimited storage',
        'Advanced security',
        'SLA guarantee',
        'Custom training & onboarding'
      ],
      highlighted: false
    }
  ];

  const testimonials = [
    {
      name: 'Lisa Wang',
      company: 'StartupXYZ',
      rating: 5,
      text: 'Switched from 3 different tools to NexusFinance. Saved us $200/month and 15 hours of work. Best decision ever!'
    },
    {
      name: 'David Smith',
      company: 'Fortune 500 Corp',
      rating: 5,
      text: 'Enterprise plan includes everything we need. ROI is incredible - we recovered the cost in the first month.'
    },
    {
      name: 'Jennifer Lee',
      company: 'Mid-Market Solutions',
      rating: 5,
      text: 'Professional plan offers incredible value. The AI insights alone are worth every penny.'
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
            💰 Transparent Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your financial management needs. No hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-full font-semibold transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual 
              <span className="absolute -top-3 -right-12 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-2xl scale-105 relative'
                    : 'bg-white text-gray-900 shadow-lg border border-gray-100 hover:shadow-xl'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`mb-6 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <div className="mb-2">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className={plan.highlighted ? 'text-gray-300' : 'text-gray-600'}>
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold">{plan.price}</span>
                  )}
                </div>
                <p className={`text-sm mb-6 font-semibold ${plan.highlighted ? 'text-green-300' : 'text-green-600'}`}>
                  {plan.savings}
                </p>

                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3 rounded-full font-bold mb-8 transition-all ${
                    plan.highlighted
                      ? 'bg-[#D4FF00] text-gray-900 hover:bg-[#c4ef00]'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">What Customers Say</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Join 50,000+ satisfied customers using NexusFinance</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-gray-600 text-sm">{review.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Feature Comparison</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-8 py-4 text-left">Feature</th>
                    <th className="px-8 py-4 text-center">Starter</th>
                    <th className="px-8 py-4 text-center">Professional</th>
                    <th className="px-8 py-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Accounts', starter: '5', pro: 'Unlimited', ent: 'Unlimited' },
                    { feature: 'Storage', starter: '1 GB', pro: '100 GB', ent: 'Unlimited' },
                    { feature: 'API Access', starter: '❌', pro: '✓', ent: '✓' },
                    { feature: 'Team Members', starter: '1', pro: 'Up to 10', ent: 'Unlimited' },
                    { feature: 'Support', starter: 'Email', pro: 'Email & Chat', ent: '24/7 Phone' },
                    { feature: 'Custom Integrations', starter: '❌', pro: '❌', ent: '✓' },
                    { feature: 'SLA Guarantee', starter: '❌', pro: '❌', ent: '99.99%' }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-8 py-4 font-semibold text-gray-900">{row.feature}</td>
                      <td className="px-8 py-4 text-center text-gray-700">{row.starter}</td>
                      <td className="px-8 py-4 text-center text-gray-700">{row.pro}</td>
                      <td className="px-8 py-4 text-center text-gray-700">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate your charges.'
              },
              {
                q: 'Do you offer discounts for long-term commitments?',
                a: 'Yes! Annual billing includes a 20% discount compared to monthly billing. Contact our sales team for volume discounts.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise customers.'
              },
              {
                q: 'What\'s your refund policy?',
                a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment, no questions asked.'
              },
              {
                q: 'Do you provide invoices?',
                a: 'Yes, invoices are automatically generated and sent to your email. You can download them anytime from your account dashboard.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="group inline-flex items-center space-x-2 bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <span>Start Your Free Trial</span>
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

export default Pricing;
