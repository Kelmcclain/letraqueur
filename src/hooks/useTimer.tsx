import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface TimerContextType {
  seconds: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
  getColorForSeconds: (seconds: number) => string;
  averageTime: string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [averageTime, setAverageTime] = useState("00:00:00");

  const updateAverageTime = useCallback((currentTime: number) => {
    // Only update if there was actually time elapsed
    if (currentTime === 0) return;

    const storedTimes = JSON.parse(localStorage.getItem('incidentTimes') || '[]');
    const newTimes = [...storedTimes, currentTime].slice(-10); // Keep last 10 incidents
    localStorage.setItem('incidentTimes', JSON.stringify(newTimes));

    if (newTimes.length > 0) {
      const sum = newTimes.reduce((acc: number, time: number) => acc + time, 0);
      const avg = Math.round(sum / storedTimes.length);
      setAverageTime(formatTime(avg));
    }
  }, []);

  // Load average time on mount
  useEffect(() => {
    const storedTimes = JSON.parse(localStorage.getItem('incidentTimes') || '[]');
    if (storedTimes.length > 0) {
      const sum = storedTimes.reduce((acc: number, time: number) => acc + time, 0);
      const avg = Math.round(sum / storedTimes.length);
      setAverageTime(formatTime(avg));
    }
  }, []);

  const startTimer = useCallback(() => {
    // If timer was running, capture the previous time
    if (isRunning) {
      updateAverageTime(seconds);
    }
    setIsRunning(true);
    setSeconds(0);
  }, [isRunning, seconds, updateAverageTime]);

  const resetTimer = useCallback(() => {
    // Capture the time when resetting if timer was running
    if (isRunning) {
      updateAverageTime(seconds);
    }
    setIsRunning(false);
    setSeconds(0);
  }, [isRunning, seconds, updateAverageTime]);

  const stopTimer = useCallback(() => {
    // Capture the time when stopping
    updateAverageTime(seconds);
    setIsRunning(false);
  }, [seconds, updateAverageTime]);

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
    if (seconds < 120) return 'text-blue-500 dark:text-blue-400';
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
    averageTime,
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