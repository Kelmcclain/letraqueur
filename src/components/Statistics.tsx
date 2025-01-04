import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { BarChart3, TableIcon } from 'lucide-react';

export default function Statistics() {
  const { records } = useApp();
  const [showGraph, setShowGraph] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  interface Record {
    date: string;
    incidentCount: number;
  }

  const calculateWeeklyAverages = (data: Record[]) => {
    if (!data.length) return [];
    
    const weeklyAverages = [];
    let currentWeekTotal = 0;
    let daysInCurrentWeek = 0;
    let weekStartDate = new Date(data[0].date);
    
    // Adjust start date to Monday of the week
    const startDay = weekStartDate.getDay();
    weekStartDate.setDate(weekStartDate.getDate() - (startDay === 0 ? 6 : startDay - 1));
    
    for (let i = 0; i < data.length; i++) {
      const currentDate = new Date(data[i].date);
      const nextDate = i < data.length - 1 ? new Date(data[i + 1].date) : null;
      
      currentWeekTotal += data[i].incidentCount;
      daysInCurrentWeek++;
      
      // Check if we've reached Sunday or the end of data or a gap in dates
      if (currentDate.getDay() === 0 || i === data.length - 1 || 
          (nextDate && nextDate.getDay() === 1)) {
        const weekEndDate = currentDate;
        
        weeklyAverages.push({
          week: formatDateRange(weekStartDate, weekEndDate),
          average: Number((currentWeekTotal / daysInCurrentWeek).toFixed(2)),
          daysCount: daysInCurrentWeek
        });
        
        currentWeekTotal = 0;
        daysInCurrentWeek = 0;
        
        if (nextDate) {
          weekStartDate = new Date(nextDate);
        }
      }
    }

    return weeklyAverages;
  };

  const weeklyAverages = calculateWeeklyAverages(records);
  const totalPages = Math.ceil(records.length / itemsPerPage);
  const currentRecords = records.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg p-4 border-2 border-indigo-200 dark:border-indigo-900 backdrop-blur-lg">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{label}</p>
          <p className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {payload[0].value} incidents
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setShowGraph(!showGraph)}
          className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-6 py-2 hover:shadow-lg transition-all duration-200"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
          <span className="relative flex items-center gap-2">
            {showGraph ? (
              <>
                <TableIcon className="h-4 w-4" />
                View Table
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                View Graph
              </>
            )}
          </span>
        </Button>
      </div>

      {showGraph ? (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl backdrop-blur-xl">
          <div className="h-96 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={records}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="#6366F1"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis
                  stroke="#6366F1"
                  fontSize={12}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="incidentCount"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2, r: 4, stroke: "#FFFFFF" }}
                  activeDot={{ r: 6, fill: "#8B5CF6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden bg-white/50 dark:bg-gray-800/50 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-200/30 dark:border-indigo-800/30">
                  <th className="px-6 py-4 text-left text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr 
                    key={record.id}
                    className="border-b border-indigo-200/30 dark:border-indigo-800/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{record.day}</td>
                    <td className="px-6 py-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">{record.incidentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-indigo-200/30 dark:border-indigo-800/30 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium disabled:opacity-50 hover:shadow-lg transition-all duration-200"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`min-w-[2.5rem] px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200
                      ${currentPage === i + 1
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white/50 text-gray-700 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium disabled:opacity-50 hover:shadow-lg transition-all duration-200"
              >
                Next
              </button>
            </div>
          </div>

          {weeklyAverages.length > 0 && (
            <div className="p-6 border-t border-indigo-200/30 dark:border-indigo-800/30">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Weekly Averages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {weeklyAverages.map((avg, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-indigo-600/5 group-hover:from-violet-600/10 group-hover:to-indigo-600/10 transition-colors" />
                    <div className="relative p-4 space-y-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{avg.week}</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        {avg.average}
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400">
                        {avg.daysCount} day{avg.daysCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}