import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  db,
  onAuthStateChanged,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  serverTimestamp,
} from "../services/firebase";
import { initializeUserData } from "../services/user";
import type { User } from "firebase/auth";

interface AppContextType {
  user: User | null;
  loading: boolean;
  incidentCount: number | null; // Changed to allow null for initial loading
  records: any[];
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  setIncidentCount: (count: number) => void;
  incrementCount: () => Promise<void>;
  decrementCount: () => Promise<void>;
  resetCount: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [incidentCount, setIncidentCount] = useState<number | null>(null); // Initialize as null
  const [records, setRecords] = useState<any[]>([]);

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await initializeUserData(user);
        } catch (error) {
          console.error("Error initializing user:", error);
          setError("Failed to initialize user data");
        }
      }
      setUser(user);
      if (!user) {
        setIncidentCount(null); // Reset to null when user logs out
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  useEffect(() => {
    if (!user) return;

    // Subscribe to incident count
    const countRef = doc(db, "users", user.uid, "incident_count", "counter");
    const unsubscribeCount = onSnapshot(countRef, (doc) => {
      if (doc.exists()) {
        setIncidentCount(doc.data()?.incidents ?? 0);
      }
      setLoading(false); // Set loading to false after we get the initial count
    }, (error) => {
      console.error("Error fetching count:", error);
      setError("Failed to fetch incident count");
      setLoading(false);
    });

    // Subscribe to records
    const recordsRef = collection(db, "users", user.uid, "daily_incidents");
    const q = query(recordsRef, orderBy("createdAt", "asc"));
    const unsubscribeRecords = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecords(records);
    });

    return () => {
      unsubscribeCount();
      unsubscribeRecords();
    };
  }, [user]);

  // Only allow updates if we have a valid incident count
  const updateFirebaseCount = async (newCount: number) => {
    if (!user || incidentCount === null) return;
    
    try {
      const countRef = doc(db, "users", user.uid, "incident_count", "counter");
      await updateDoc(countRef, {
        incidents: newCount,
        lastUpdated: serverTimestamp()
      });
    } catch (err) {
      console.error("Error updating count:", err);
      setError("Failed to update incident count");
    }
  };

  const incrementCount = async () => {
    if (incidentCount === null) return;
    const newCount = incidentCount + 1;
    await updateFirebaseCount(newCount);
  };

  const decrementCount = async () => {
    if (incidentCount === null || incidentCount <= 0) return;
    const newCount = incidentCount - 1;
    await updateFirebaseCount(newCount);
  };

  const resetCount = async () => {
    if (incidentCount === null) return;
    await updateFirebaseCount(0);
  };

  const value = {
    user,
    loading,
    error,
    setError,
    clearError,
    incidentCount,
    records,
    setIncidentCount,
    incrementCount,
    decrementCount,
    resetCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}