import React from 'react';
import { Clock, AlertTriangle, History } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export default function Timer() {
  const { 
    seconds, 
    formatTime, 
    getColorForSeconds,
    averageTime 
  } = useTimer();
  
  const progress = Math.min((seconds / 3600) * 100, 100);

  const size = {
    mobile: { width: 160, height: 160, cx: 80, cy: 80, r: 72 },
    desktop: { width: 192, height: 192, cx: 96, cy: 96, r: 88 }
  };

  const getMobileStrokeDasharray = () => 2 * Math.PI * size.mobile.r;
  const getDesktopStrokeDasharray = () => 2 * Math.PI * size.desktop.r;

  const getGradientId = (seconds: number) => {
    if (seconds < 60) return 'url(#gradientGreen)';
    if (seconds < 120) return 'url(#gradientBlue)';
    if (seconds < 180) return 'url(#gradientOrange)';
    if (seconds < 240) return 'url(#gradientOrangeDark)';
    return 'url(#gradientRed)';
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Time Tracker
          </h3>
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div className="relative flex flex-col items-center">
          {/* Mobile Circle */}
          <div className="relative w-40 h-40 sm:hidden">
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size.mobile.width} ${size.mobile.height}`}>
              <defs>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                  <stop offset="100%" stopColor="rgb(74, 222, 128)" />
                </linearGradient>
                <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="100%" stopColor="rgb(96, 165, 250)" />
                </linearGradient>
                <linearGradient id="gradientOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(249, 115, 22)" />
                  <stop offset="100%" stopColor="rgb(251, 146, 60)" />
                </linearGradient>
                <linearGradient id="gradientOrangeDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(194, 65, 12)" />
                  <stop offset="100%" stopColor="rgb(234, 88, 12)" />
                </linearGradient>
                <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" />
                  <stop offset="100%" stopColor="rgb(248, 113, 113)" />
                </linearGradient>
              </defs>
              <circle
                cx={size.mobile.cx}
                cy={size.mobile.cy}
                r={size.mobile.r}
                className="stroke-indigo-100 dark:stroke-indigo-900/30"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx={size.mobile.cx}
                cy={size.mobile.cy}
                r={size.mobile.r}
                stroke={getGradientId(seconds)}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: getMobileStrokeDasharray(),
                  strokeDashoffset: getMobileStrokeDasharray() - (getMobileStrokeDasharray() * progress) / 100,
                  transition: 'stroke-dashoffset 0.5s ease-in-out'
                }}
              />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className={`text-2xl font-bold ${getColorForSeconds(seconds)}`}>
                {formatTime(seconds)}
              </div>
              <div className="text-sm text-indigo-600/70 dark:text-indigo-400/70 font-medium mt-1">
                Since last incident
              </div>
            </div>
          </div>

          {/* Desktop Circle */}
          <div className="relative hidden sm:block w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size.desktop.width} ${size.desktop.height}`}>
              <defs>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                  <stop offset="100%" stopColor="rgb(74, 222, 128)" />
                </linearGradient>
                <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="100%" stopColor="rgb(96, 165, 250)" />
                </linearGradient>
                <linearGradient id="gradientOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(249, 115, 22)" />
                  <stop offset="100%" stopColor="rgb(251, 146, 60)" />
                </linearGradient>
                <linearGradient id="gradientOrangeDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(194, 65, 12)" />
                  <stop offset="100%" stopColor="rgb(234, 88, 12)" />
                </linearGradient>
                <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" />
                  <stop offset="100%" stopColor="rgb(248, 113, 113)" />
                </linearGradient>
              </defs>
              <circle
                cx={size.desktop.cx}
                cy={size.desktop.cy}
                r={size.desktop.r}
                className="stroke-indigo-100 dark:stroke-indigo-900/30"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx={size.desktop.cx}
                cy={size.desktop.cy}
                r={size.desktop.r}
                stroke={getGradientId(seconds)}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: getDesktopStrokeDasharray(),
                  strokeDashoffset: getDesktopStrokeDasharray() - (getDesktopStrokeDasharray() * progress) / 100,
                  transition: 'stroke-dashoffset 0.5s ease-in-out'
                }}
              />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className={`text-4xl font-bold ${getColorForSeconds(seconds)}`}>
                {formatTime(seconds)}
              </div>
              <div className="text-sm text-indigo-600/70 dark:text-indigo-400/70 font-medium mt-2">
                Since last incident
              </div>
            </div>
          </div>

          {/* Average Time Display */}
          <div className="mt-4 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 dark:border-indigo-400/20">
            <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Average Resolution: {averageTime}
            </span>
          </div>

          {/* Warning indicator */}
          {seconds >= 180 && (
            <div className="mt-4 px-4 py-2 rounded-xl bg-orange-500/10 dark:bg-orange-400/10 border border-orange-500/20 dark:border-orange-400/20">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertTriangle className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Extended incident duration</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}