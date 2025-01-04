import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Clock, ChartBar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "./Timer";
import IncidentCounter from "./IncidentCounter";
import RecordForm from "./RecordForm";
import Statistics from "./Statistics";
import { useApp } from "../context/AppContext";

export default function MainDashboard() {
  const { error } = useApp();

  return (
    <main className="flex-1 w-full px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8">
      {error && (
        <div className="mb-4 sm:mb-6 md:mb-8 animate-slideDown">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/70 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Today's Focus Time</h4>
                      <p className="text-2xl font-bold text-gray-900">2h 45m</p>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Weekly Average</h4>
                      <p className="text-2xl font-bold text-gray-900">3h 20m</p>
                    </div>
                  </div>
                  <div className="h-48 bg-white/70 rounded-lg p-4">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Weekly Progress Chart
                    </div>
                  </div>
                </div>
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

            {/* Additional Info Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 text-sm text-gray-600">
                  <p>• Take regular breaks to maintain focus and productivity</p>
                  <p>• Set realistic goals for your focus sessions</p>
                  <p>• Review your statistics weekly to track progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}