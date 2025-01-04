import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { db, addDoc, collection, doc, serverTimestamp } from '../services/firebase';
import { useToast } from "../hooks/use-toast";
import { PlusCircle, Calendar, Hash, Loader2 } from 'lucide-react';

export default function RecordForm() {
  const { user } = useApp();
  const { toast } = useToast();
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !count) return;

    const countNum = parseInt(count);
    if (isNaN(countNum) || countNum < 0) {
      toast({
        title: "Invalid input",
        description: "Incident count must be a positive number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dateObj = new Date(date);
      const incidentData = {
        date,
        day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
        incidentCount: countNum,
        createdAt: serverTimestamp(),
      };

      const userDocRef = doc(db, 'users', user.uid);
      const dailyIncidentsRef = collection(userDocRef, 'daily_incidents');
      await addDoc(dailyIncidentsRef, incidentData);
      await addDoc(collection(userDocRef, 'graph_data'), incidentData);

      setDate('');
      setCount('');
      
      toast({
        title: "Record added successfully",
        description: "Your incident record has been saved",
      });
    } catch (error) {
      console.error('Error adding record:', error);
      toast({
        title: "Error adding record",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
      <div className="p-6 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <PlusCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Add Record
          </span>
        </h2>
      </div>
      
      <div className="p-6 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="date"
              className="block text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 
                         bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                         text-gray-700 dark:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600
                         transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="count"
              className="block text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Incident Count
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                min="0"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 
                         bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                         text-gray-700 dark:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600
                         transition-all duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full px-4 py-2 rounded-xl overflow-hidden group
                     bg-gradient-to-r from-violet-600 to-indigo-600 
                     text-white font-medium 
                     hover:shadow-lg disabled:opacity-50 
                     transition-all duration-200"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Add Record
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}