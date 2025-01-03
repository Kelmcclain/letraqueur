import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Timer from "./components/Timer";
import IncidentCounter from "./components/IncidentCounter";
import RecordForm from "./components/RecordForm";
import Statistics from "./components/Statistics";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./components/auth/AuthPage";
import { useApp } from "./context/AppContext";
import { AlertCircle, Clock, ChartBar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "./components/ui/alert";
import { TimerProvider } from "./hooks/useTimer";

function AppContent() {
  const { loading, user, error } = useApp();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="flex-1 w-full px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8">
        {error && (
          <div className="mb-4 sm:mb-6 md:mb-8 animate-slideDown">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Dynamic height for ScrollArea based on screen size */}
        <ScrollArea className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
          <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 w-full max-w-7xl mx-auto">
            {/* Time Tracking Section */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <Card className="bg-white/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    Time Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">
                  <Timer />
                  <IncidentCounter />
                </CardContent>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    <ChartBar className="w-5 h-5 sm:w-6 sm:h-6" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {/* Analytics content would go here */}
                </CardContent>
              </Card>
            </div>

            {/* Records Section */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
             
              <RecordForm />

              <Card className="bg-white/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                    Live Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Statistics />
                </CardContent>
              </Card>

           
            </div>
          </div>
        </ScrollArea>
      </main>

      <footer className="w-full py-4 sm:py-6 px-4 sm:px-6 border-t bg-white/30 backdrop-blur-sm dark:bg-gray-800/30">
        <div className="w-full text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Le Traqueur © {new Date().getFullYear()} | Building a Better Tomorrow
          </p>
        </div>
      </footer>
    </div>
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