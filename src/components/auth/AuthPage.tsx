import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from '../../services/firebase';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const actionCodeSettings = {
        url: 'https://localhost:5174/reset-password',
        handleCodeInApp: true,
      };
  
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setResetSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const cleanError = errorMessage.replace('Firebase: ', '').replace('auth/', '');
      setError(cleanError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const cleanError = errorMessage.replace('Firebase: ', '').replace('auth/', '');
      setError(cleanError);
      setIsLoading(false);
    }
  };

  if (isPasswordReset) {
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
              Reset your password to regain access
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
            {/* Back to Login */}
            <button
              onClick={() => {
                setIsPasswordReset(false);
                setResetSuccess(false);
                setError('');
              }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
                dark:hover:text-blue-400 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </button>

            {resetSuccess ? (
              <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-3 animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-6">
                  {/* Email Input */}
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                      ${formFocus === 'email' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
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
                      placeholder="Enter your email address"
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
                        <span>Sending reset link...</span>
                      </>
                    ) : (
                      <span>Send password reset link</span>
                    )}
                  </button>

                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    We'll send you an email with a link to reset your password.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

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

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 mb-6 bg-white hover:bg-gray-50 dark:bg-gray-800 
              dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 
              text-gray-700 dark:text-gray-200 rounded-lg font-medium shadow-sm
              transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] 
              disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <Separator className="my-4" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-6">
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

            {/* Forgot Password Link */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPasswordReset(true)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 
                    dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                font-medium transition-all duration-200 transform hover:scale-[1.02] 
                active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign in with email' : 'Create account'}</span>
              )}
            </button>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 
                  dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
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