
// RecordsSection.jsx
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecordForm from "../RecordForm";
import Statistics from "../Statistics";
import { memo } from 'react';

const MemoizedRecordForm = memo(RecordForm);
const MemoizedStatistics = memo(Statistics);

const StatisticsCard = memo(() => (
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
      <MemoizedStatistics />
    </CardContent>
  </Card>
));

const QuickTipsCard = memo(() => (
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
));

export const RecordsSection = memo(() => (
  <div className="space-y-6">
    <MemoizedRecordForm />
    <StatisticsCard />
    <QuickTipsCard />
  </div>
));