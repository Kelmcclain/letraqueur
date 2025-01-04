import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import { TimerProvider } from "./hooks/useTimer";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import MainDashboard from "./components/MainDashboard";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./components/auth/AuthPage";
import { useApp } from "./context/AppContext";

function AppContent() {
  const { loading, user } = useApp();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <Routes>
          <Route path="/letraqueur" element={<MainDashboard />} />
          <Route path="/letraqueur/account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </AppProvider>
  );
}