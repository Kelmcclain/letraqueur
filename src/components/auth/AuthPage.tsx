import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../services/firebase';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState<'email' | 'password' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const cleanError = errorMessage.replace('Firebase: ', '').replace('auth/', '');
      setError(cleanError);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl transform rotate-12 absolute top-0 left-1/2 -translate-x-1/2 -z-10 animate-pulse opacity-20" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Le Traqueur
            </h1>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                ${formFocus === 'email' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFormFocus('email')}
                onBlur={() => setFormFocus(null)}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg 
                  outline-none transition-all duration-200 ${
                    formFocus === 'email'
                      ? 'border-blue-600 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                ${formFocus === 'password' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFormFocus('password')}
                onBlur={() => setFormFocus(null)}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg 
                  outline-none transition-all duration-200 ${
                    formFocus === 'password'
                      ? 'border-blue-600 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
                hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 
                transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign in' : 'Create account'}</span>
              )}
            </button>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors duration-200"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}