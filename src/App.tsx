
// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import { TimerProvider } from "./hooks/useTimer";
import { ThemeProvider } from "./context/ThemeProvider";
import { Toaster } from '@/components/ui/toaster';
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import MainDashboard from "./components/MainDashboard";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./components/auth/AuthPage";
import { useApp } from "./context/AppContext";
import ResetPasswordConfirmation from './components/auth/ResetPasswordConfirmation';

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
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/letraqueur" element={<MainDashboard />} />
            <Route path="/letraqueur/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/letraqueur" replace />} />
            <Route path="/letraqueur/reset-password" element={<ResetPasswordConfirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <TimerProvider>
          <AppContent />
          <Toaster />
        </TimerProvider>
      </ThemeProvider>
    </AppProvider>
  );
}