import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface TimerContextType {
  seconds: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
  getColorForSeconds: (seconds: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setSeconds(0);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const getColorForSeconds = (seconds: number) => {
    if (seconds < 60) return 'text-green-500 dark:text-green-400';
    if (seconds < 120) return 'text-white dark:text-blue';
    if (seconds < 180) return 'text-orange-500 dark:text-orange-400';
    if (seconds < 240) return 'text-orange-700 dark:text-orange-600';
    return 'text-red-500 dark:text-red-400';
  };

  const value = {
    seconds,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime,
    getColorForSeconds,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}