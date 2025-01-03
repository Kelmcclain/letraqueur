import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ message = "Preparing your workspace" }) {
  const [dots, setDots] = useState(1);
  const [progress, setProgress] = useState(0);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(95, p + Math.random() * 10));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 ${isDark ? 'dark' : ''}`}>
      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Main loader container */}
        <div className="relative group">
          {/* Spinner */}
          <div className="relative z-10">
            <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
          
          {/* Animated background elements */}
          <div className="absolute -inset-4 bg-blue-100/30 dark:bg-blue-500/10 rounded-full animate-pulse" />
          <div className="absolute -inset-8 bg-blue-50/20 dark:bg-blue-500/5 rounded-full animate-pulse delay-75" />
          
          {/* Decorative dots */}
          <div className="absolute -inset-12 opacity-0 group-hover:opacity-100 transition-opacity">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-500/30 rounded-full animate-ping"
                style={{
                  top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                  left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 flex flex-col items-center">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
            <span>Loading</span>
            <span className="w-8 text-blue-600 dark:text-blue-400">
              {'.'.repeat(dots)}
            </span>
          </div>
          
          {/* Status message */}
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}