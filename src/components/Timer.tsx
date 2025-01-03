import { Clock, AlertTriangle } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export default function Timer() {
  const { seconds, formatTime, getColorForSeconds } = useTimer();
  
  // Calculate progress percentage for the circular indicator
  const progress = Math.min((seconds / 3600) * 100, 100);

  // SVG calculations
  const size = {
    mobile: { width: 160, height: 160, cx: 80, cy: 80, r: 72 },
    desktop: { width: 192, height: 192, cx: 96, cy: 96, r: 88 }
  };

  // Calculate strokeDasharray based on radius
  const getMobileStrokeDasharray = () => 2 * Math.PI * size.mobile.r;
  const getDesktopStrokeDasharray = () => 2 * Math.PI * size.desktop.r;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
          Time Tracker
        </h3>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Mobile Circle (shown below sm breakpoint) */}
        <div className="relative w-40 h-40 sm:hidden">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size.mobile.width} ${size.mobile.height}`}>
            <circle
              cx={size.mobile.cx}
              cy={size.mobile.cy}
              r={size.mobile.r}
              className="stroke-current text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx={size.mobile.cx}
              cy={size.mobile.cy}
              r={size.mobile.r}
              className={`stroke-current ${getColorForSeconds(seconds)}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: getMobileStrokeDasharray(),
                strokeDashoffset: getMobileStrokeDasharray() - (getMobileStrokeDasharray() * progress) / 100,
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className={`text-2xl sm:text-4xl font-mono font-bold ${getColorForSeconds(seconds)}`}>
              {formatTime(seconds)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              Since last incident
            </div>
          </div>
        </div>

        {/* Desktop Circle (hidden on mobile, shown above sm breakpoint) */}
        <div className="relative hidden sm:block w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size.desktop.width} ${size.desktop.height}`}>
            <circle
              cx={size.desktop.cx}
              cy={size.desktop.cy}
              r={size.desktop.r}
              className="stroke-current text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx={size.desktop.cx}
              cy={size.desktop.cy}
              r={size.desktop.r}
              className={`stroke-current ${getColorForSeconds(seconds)}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: getDesktopStrokeDasharray(),
                strokeDashoffset: getDesktopStrokeDasharray() - (getDesktopStrokeDasharray() * progress) / 100,
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className={`text-4xl font-mono font-bold ${getColorForSeconds(seconds)}`}>
              {formatTime(seconds)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Since last incident
            </div>
          </div>
        </div>

        {/* Warning indicator for high times */}
        {seconds >= 180 && (
          <div className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-2 text-orange-500 dark:text-orange-400 animate-pulse">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Extended incident duration</span>
          </div>
        )}
      </div>
    </div>
  );
}