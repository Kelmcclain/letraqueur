import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Statistics() {
  const { records } = useApp();
  const [showGraph, setShowGraph] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  const calculateWeeklyAverages = (data: any[]) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showGraph ? 'Show Table' : 'Show Graph'}
        </button>
      </div>

      {showGraph ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={records}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="incidentCount" 
                stroke="#2563eb" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Day</th>
                  <th className="px-4 py-2 text-left">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr key={record.id} className="border-t">
                    <td className="px-4 py-2">{record.date}</td>
                    <td className="px-4 py-2">{record.day}</td>
                    <td className="px-4 py-2">{record.incidentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {weeklyAverages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Weekly Averages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {weeklyAverages.map((avg, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="text-sm text-gray-600">{avg.week}</div>
                    <div className="text-lg font-semibold">{avg.average}</div>
                    <div className="text-xs text-gray-500">{avg.daysCount} day{avg.daysCount !== 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}