import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Send, Clock, Globe, Users as UsersIcon } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const offices = [
    {
      city: 'New York',
      country: 'United States',
      address: '123 Financial Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '456 Finance Avenue, London, SW1A 1AA',
      phone: '+44 20 7946 0958',
      hours: 'Mon-Fri, 9AM-5PM GMT'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '789 Commerce Drive, Singapore 018957',
      phone: '+65 6511 9266',
      hours: 'Mon-Fri, 9AM-6PM SGT'
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
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6 font-semibold">
            💬 Get in Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Have questions? We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
          <p className="text-gray-600">
            Average response time: <strong>15 minutes</strong> during business hours
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                {/* Email */}
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">support@nexusfinance.com</p>
                    <p className="text-gray-500 text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-6">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Monday-Friday, 9AM-6PM EST</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-6">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">US Headquarters</h3>
                    <p className="text-gray-600 leading-relaxed">
                      123 Financial Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="mailto:careers@nexusfinance.com" className="hover:text-blue-600 transition-colors">Careers - jobs@nexusfinance.com</a></li>
                  <li><a href="mailto:press@nexusfinance.com" className="hover:text-blue-600 transition-colors">Press - press@nexusfinance.com</a></li>
                  <li><a href="mailto:partnerships@nexusfinance.com" className="hover:text-blue-600 transition-colors">Partnerships - partnerships@nexusfinance.com</a></li>
                  <li><a href="mailto:security@nexusfinance.com" className="hover:text-blue-600 transition-colors">Security - security@nexusfinance.com</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 hover:bg-white transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 hover:bg-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 hover:bg-white transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 hover:bg-white transition-colors resize-none"
                    placeholder="Tell us more..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#D4FF00] hover:bg-[#c4ef00] text-gray-900 font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Global Offices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{office.country}</p>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Address:</strong> {office.address}</p>
                  <p><strong>Phone:</strong> {office.phone}</p>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Support Channels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💬',
                title: 'Live Chat',
                description: 'Available on our website 24/7 for quick questions',
                time: 'Instant'
              },
              {
                icon: '📧',
                title: 'Email Support',
                description: 'Comprehensive help with detailed responses',
                time: '< 24 hours'
              },
              {
                icon: '☎️',
                title: 'Phone Support',
                description: 'Speak with our team directly',
                time: 'Business hours'
              }
            ].map((channel, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md border border-gray-200 text-center">
                <div className="text-5xl mb-4">{channel.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
                <p className="text-blue-600 font-semibold text-sm">Response: {channel.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What are your support hours?',
                a: 'We offer email support 24/7. Live chat is available Mon-Fri, 9AM-6PM EST. Phone support is available during business hours in your timezone.'
              },
              {
                q: 'How quickly will I receive a response?',
                a: 'We typically respond to emails within 24 hours. Live chat responses are usually instant during business hours. Priority support is available for Enterprise customers.'
              },
              {
                q: 'Can I schedule a demo?',
                a: 'Yes! Contact our sales team at sales@nexusfinance.com and we\'ll arrange a personalized demo based on your needs. Usually available within 24 hours.'
              },
              {
                q: 'Do you offer onboarding support?',
                a: 'Absolutely. All customers receive personalized onboarding to ensure smooth implementation. Enterprise customers get dedicated onboarding managers.'
              },
              {
                q: 'Can I report a security issue?',
                a: 'Yes, please send security concerns to security@nexusfinance.com. We have a responsible disclosure program and respond to all reports.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
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

export default Contact;
