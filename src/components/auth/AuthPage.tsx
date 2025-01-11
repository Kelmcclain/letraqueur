import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from '../../services/firebase';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FirebaseError } from 'firebase/app';


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);


  type FirebaseErrorMessages = {
    [key: string]: string;
  };
  
  // Mapping of Firebase error codes to user-friendly messages
  const firebaseErrors: FirebaseErrorMessages = {
    'invalid-email': 'Please enter a valid email address.',
    'user-disabled': 'This account has been disabled. Please contact support.',
    'user-not-found': 'Invalid credentials.',
    'wrong-password': 'Incorrect password. Please try again.',
    'email-already-in-use': 'An account with this email already exists. Please log in instead.',
    'operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
    'weak-password': 'Password should be at least 6 characters long.',
    'too-many-requests': 'Too many failed attempts. Please try again later.',
    'network-request-failed': 'Network error. Please check your internet connection.',
    'internal-error': 'An internal error occurred. Please try again.',
    'invalid-credential': 'Invalid login credentials. Please check your email and password.',
    'account-exists-with-different-credential': 'An account already exists with a different sign-in method.',
    'popup-closed-by-user': 'Sign-in popup was closed before completion.',
    'cancelled-popup-request': 'Another sign-in popup is already open.',
    'popup-blocked': 'Sign-in popup was blocked by the browser.',
    'unauthorized-domain': 'This domain is not authorized for OAuth operations.',
  };
  
  // Function to get user-friendly error message
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof FirebaseError) {
      const errorCode = error.code.replace('auth/', '');
      return firebaseErrors[errorCode] || 'An unexpected error occurred. Please try again.';
    }
    return 'An unexpected error occurred. Please try again.';
  };
  
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
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const LogoSection = () => (
    <div className="text-center mb-8">
      <div className="relative inline-block group cursor-pointer">
        {/* Animated background element */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl transform rotate-12 absolute top-0 left-1/2 -translate-x-1/2 -z-10 
          opacity-20 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-45 group-hover:opacity-30 
          animate-pulse" />
        
        <div className="flex flex-col items-center justify-center">
          {/* Logo image with hover effect */}
          <div className="relative overflow-hidden rounded-2xl mb-4 transition-transform duration-300 ease-in-out 
            transform group-hover:scale-105 group-hover:shadow-lg">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/peak-suprstate-384109.appspot.com/o/public%2Flt1.jpeg?alt=media&token=9af95724-a6b9-48ab-adff-6224f12800a7"
              alt="Le Traqueur Logo" 
              className="w-16 h-16 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
            {/* Overlay effect on hover */}
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Text with hover effect */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 
            dark:from-blue-400 dark:to-indigo-400 transition-all duration-300 transform group-hover:scale-105">
            Le Traqueur
          </h1>
        </div>
      </div>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        {isPasswordReset 
          ? 'Reset your password to regain access'
          : (isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started')
        }
      </p>
    </div>
  );

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
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setIsLoading(false);
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
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setIsLoading(false);
      setIsLoading(false);
    }
  };

  if (isPasswordReset) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md px-4">
          <LogoSection />

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
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
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-3 animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-6">
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
        <LogoSection />

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

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

          <form onSubmit={handleEmailSubmit} className="space-y-6">
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