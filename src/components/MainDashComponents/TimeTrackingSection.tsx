
// TimeTrackingSection.jsx
import { Clock, ChartBar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "../Timer";
import IncidentCounter from "../IncidentCounter";
import { memo } from 'react';

const MemoizedTimer = memo(Timer);
const MemoizedIncidentCounter = memo(IncidentCounter);

const TimeTrackingCard = memo(() => (
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
      <MemoizedTimer />
      <MemoizedIncidentCounter />
    </CardContent>
  </Card>
));

const AnalyticsCard = memo(() => (
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
          <StatCard title="Today's Focus Time" value="2h 45m" />
          <StatCard title="Weekly Average" value="3h 20m" />
        </div>
        <WeeklyChart />
      </div>
    </CardContent>
  </Card>
));

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard = memo(({ title, value }: StatCardProps) => (
  <div className="rounded-lg bg-background/50 p-4">
    <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
));

const WeeklyChart = memo(() => (
  <div className="h-48 rounded-lg bg-background/50 p-4">
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      Weekly Progress Chart
    </div>
  </div>
));

export const TimeTrackingSection = memo(() => (
  <div className="space-y-6">
    <TimeTrackingCard />
    <AnalyticsCard />
  </div>
));