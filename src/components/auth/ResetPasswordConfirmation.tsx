import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, confirmPasswordReset } from '../../services/firebase';
import { Loader2, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResetPasswordConfirmation() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get the action code from the URL
  const actionCode = new URLSearchParams(window.location.search).get('oobCode');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!actionCode) {
      setError('Invalid password reset link. Please request a new one.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const cleanError = errorMessage.replace('Firebase: ', '').replace('auth/', '');
      setError(cleanError);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl transform rotate-12 absolute top-0 left-1/2 -translate-x-1/2 -z-10 animate-pulse opacity-20" />
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Le Traqueur
              </h1>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900">
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your password has been successfully reset. You can now sign in with your new password.
              </AlertDescription>
            </Alert>

            <button
              onClick={() => navigate('/auth')}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium 
                transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Return to Sign In
            </button>
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
            Create a new password for your account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
          {/* Back to Login */}
          <button
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
              dark:hover:text-blue-400 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </button>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                ${formFocus === 'newPassword' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setFormFocus('newPassword')}
                onBlur={() => setFormFocus(null)}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg 
                  outline-none transition-all duration-200 ${
                    formFocus === 'newPassword'
                      ? 'border-blue-600 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                placeholder="New password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 
                ${formFocus === 'confirmPassword' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFormFocus('confirmPassword')}
                onBlur={() => setFormFocus(null)}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg 
                  outline-none transition-all duration-200 ${
                    formFocus === 'confirmPassword'
                      ? 'border-blue-600 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                placeholder="Confirm new password"
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
                  <span>Resetting password...</span>
                </>
              ) : (
                <span>Reset password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}