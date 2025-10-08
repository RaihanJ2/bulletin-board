import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-orange-500">MyArticle</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-orange-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-lg border border-orange-300 bg-gray-50 text-gray-900
                           focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500
                           px-3 py-2 h-10 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-lg border border-orange-300 bg-gray-50 text-gray-900
                           focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500
                           px-3 py-2 h-10 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-orange-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 hover:opacity-60 transition ease-in-out duration-200">
                Forgot password?
              </Link>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm
                           text-sm font-medium text-white bg-orange-500 hover:bg-orange-600
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to MyArticle?</span>
              </div>
            </div>

            {/* Register button */}
            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border-2 border-orange-500 rounded-lg
                           text-sm font-medium text-orange-500 bg-white hover:bg-orange-200 hover:text-
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-orange-500 hover:text-orange-600">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
