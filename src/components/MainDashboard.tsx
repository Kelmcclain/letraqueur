// MainDashboard.jsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { memo } from 'react';
import { useApp } from "../context/AppContext";
import { TimeTrackingSection } from "./MainDashComponents/TimeTrackingSection";
import { RecordsSection } from "./MainDashComponents/RecordsSection";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert = memo(({ error }: ErrorAlertProps) => (
  <div className="mb-6 animate-slideDown">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  </div>
));

export default function MainDashboard() {
  const { error } = useApp();

  return (
    <main className="flex-1 w-full p-4 md:p-6">
      {error && <ErrorAlert error={error} />}
      
      <ScrollArea className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
        <div className="grid gap-6 lg:grid-cols-2 w-full max-w-7xl mx-auto">
          <TimeTrackingSection />
          <RecordsSection />
        </div>
      </ScrollArea>
    </main>
  );
}
