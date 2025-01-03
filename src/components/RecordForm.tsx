import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db, addDoc, collection, doc, serverTimestamp } from '../services/firebase';

export default function RecordForm() {
  const { user } = useApp();
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !count) return;

    const countNum = parseInt(count);
    if (isNaN(countNum) || countNum < 0) {
      alert('Incident count must be a positive number');
      return;
    }

    const dateObj = new Date(date);
    const incidentData = {
      date,
      day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
      incidentCount: countNum,
      createdAt: serverTimestamp(),
    };

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const dailyIncidentsRef = collection(userDocRef, 'daily_incidents');
      await addDoc(dailyIncidentsRef, incidentData);
      
      // Also add to graph data collection
      const graphDataRef = collection(userDocRef, 'graph_data');
      await addDoc(graphDataRef, incidentData);

      // Clear form
      setDate('');
      setCount('');
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Error adding record');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add Record</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incident Count
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Record
        </button>
      </form>
    </div>
  );
}