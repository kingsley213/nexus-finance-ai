import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, UserPlus, Smartphone, Mail, User } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const { confirmPassword, ...registerData } = formData;

    const result = await register(registerData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            {/* ...existing form header and content... */}
            <div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-600 rounded-lg"></div>
                <span className="ml-3 text-2xl font-bold text-gray-900">Nexus Finance AI</span>
              </div>
              <h2 className="mt-8 text-3xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* ...existing form fields... */}
                <div>
                  <label htmlFor="full_name" className="form-label">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-input pl-10"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input pl-10"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number (Optional)
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="form-input pl-10"
                      placeholder="+263 77 123 4567"
                    />
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center btn btn-primary py-3 px-4 text-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Start managing your finances smarter</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-sm font-bold">$</span>
                    </div>
                    <span className="text-xs font-medium text-blue-900 text-center">Multi-Currency</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <span className="text-xs font-medium text-green-900 text-center">Smart Categories</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                    <Smartphone className="h-8 w-8 text-purple-600 mb-1" />
                    <span className="text-xs font-medium text-purple-900 text-center">EcoCash Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero image/description */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-700"></div>
        <div className="relative h-full flex items-center justify-center px-8">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl font-bold mb-4">
              Take Control of Your Finances in Zimbabwe
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of Zimbabweans using AI to navigate multi-currency challenges and build financial resilience.
            </p>
            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3">What you'll get:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-5 w-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  Automatic transaction categorization for Zimbabwean vendors
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  Real-time USD, ZiG, and ZAR currency tracking
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  Inflation-aware financial forecasting
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  Mobile money integration ready
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  Financial health scoring and recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
