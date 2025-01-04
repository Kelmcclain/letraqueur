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
    <main className="flex-1 w-full p-4 md:p-6">
      {error && (
        <div className="mb-6 animate-slideDown">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
        <div className="grid gap-6 lg:grid-cols-2 w-full max-w-7xl mx-auto">
          {/* Time Tracking Section */}
          <div className="space-y-6">
            <Card className="relative overflow-hidden border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/30 backdrop-blur-xl" />
              <CardHeader className="relative p-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Clock className="w-6 h-6 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Time Tracking
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6 p-6">
                <Timer />
                <IncidentCounter />
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/30 backdrop-blur-xl" />
              <CardHeader className="relative p-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <ChartBar className="w-6 h-6 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Analytics Overview
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-background/50 p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Today's Focus Time</h4>
                      <p className="text-2xl font-bold text-foreground">2h 45m</p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Weekly Average</h4>
                      <p className="text-2xl font-bold text-foreground">3h 20m</p>
                    </div>
                  </div>
                  <div className="h-48 rounded-lg bg-background/50 p-4">
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      Weekly Progress Chart
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Records Section */}
          <div className="space-y-6">
            <RecordForm />

            <Card className="relative overflow-hidden border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/30 backdrop-blur-xl" />
              <CardHeader className="relative p-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Activity className="w-6 h-6 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Live Statistics
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-6">
                <Statistics />
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card className="relative overflow-hidden border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/30 backdrop-blur-xl" />
              <CardHeader className="relative p-6">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Quick Tips
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="space-y-4 text-sm text-muted-foreground">
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