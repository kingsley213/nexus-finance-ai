import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, LogIn, Smartphone } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

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

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
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
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up for free
                </Link>
              </p>
            </div>

            <div className="mt-8">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  {typeof error === 'string' ? (
                    <p className="text-sm text-red-600">{error}</p>
                  ) : Array.isArray(error) ? (
                    error.map((err, idx) => (
                      <p key={idx} className="text-sm text-red-600">
                        {err.msg || JSON.stringify(err)}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-red-600">{JSON.stringify(error)}</p>
                  )}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* ...existing form fields... */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                    />
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
                      autoComplete="current-password"
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center btn btn-primary py-3 px-4 text-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5 mr-2" />
                        Sign in
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
                    <span className="px-2 bg-white text-gray-500">Zimbabwe Focused Features</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-900">EcoCash Support</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="h-5 w-5 text-green-600 mr-2 font-bold">ZiG</div>
                    <span className="text-sm font-medium text-green-900">Multi-Currency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero image/description */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>
        <div className="relative h-full flex items-center justify-center px-8">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl font-bold mb-4">
              Smart Finance Management for Zimbabwe
            </h1>
            <p className="text-xl mb-6 opacity-90">
              AI-powered personal finance advisor designed specifically for Zimbabwe's multi-currency economy and hyperinflation challenges.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                Multi-currency tracking (USD, ZiG, ZAR)
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                AI-powered transaction categorization
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                Inflation-aware cash flow forecasting
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                Zimbabwe-specific vendor recognition
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
