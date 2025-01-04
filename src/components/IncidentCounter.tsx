import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTimer } from "../hooks/useTimer";
import { Plus, Minus, RotateCcw, AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function IncidentCounter() {
  const { incidentCount, incrementCount, decrementCount, resetCount, loading } = useApp();
  const { startTimer, resetTimer } = useTimer();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [lastAction, setLastAction] = useState<"increment" | "decrement" | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = async () => {
    if (isUpdating || loading || incidentCount === null) return;
    setIsUpdating(true);
    try {
      await incrementCount();
      startTimer();
      setLastAction("increment");
      const button = document.getElementById("incrementBtn");
      button?.classList.remove("animate-press");
      void button?.offsetWidth;
      button?.classList.add("animate-press");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = async () => {
    if (isUpdating || loading || incidentCount === null || incidentCount <= 0) return;
    setIsUpdating(true);
    try {
      await decrementCount();
      startTimer();
      setLastAction("decrement");
      const button = document.getElementById("decrementBtn");
      button?.classList.remove("animate-press");
      void button?.offsetWidth;
      button?.classList.add("animate-press");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = async () => {
    if (isUpdating || loading || incidentCount === null) return;
    setIsUpdating(true);
    try {
      await resetCount();
      resetTimer();
      setShowResetDialog(false);
      setLastAction(null);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm" />
      
      <div className="relative p-6 space-y-8">
        {/* Counter Display */}
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Incident Counter
          </h3>
          <div className="relative min-h-[100px] flex items-center justify-center">
            {loading ? (
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400" />
            ) : (
              <>
                <div className="relative">
                  <div className="text-6xl font-bold text-center bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    {incidentCount ?? 0}
                  </div>
                  <div className="text-sm text-center text-indigo-600/70 dark:text-indigo-400/70 mt-2 font-medium">
                    Total Incidents
                  </div>

                  {lastAction && (
                    <div
                      className={`absolute -right-4 -top-4 text-lg font-bold animate-bounce-once
                        ${lastAction === "increment" 
                          ? "bg-gradient-to-r from-rose-500 to-red-500" 
                          : "bg-gradient-to-r from-emerald-500 to-green-500"} 
                        bg-clip-text text-transparent`}
                    >
                      {lastAction === "increment" ? "+1" : "-1"}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              id="incrementBtn"
              onClick={handleIncrement}
              disabled={isUpdating || loading || incidentCount === null}
              className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 
                text-white font-medium px-6 py-3 hover:shadow-lg disabled:opacity-50 
                transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
              <span className="relative flex items-center justify-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                Add
              </span>
            </button>

            <button
              id="decrementBtn"
              onClick={handleDecrement}
              disabled={isUpdating || loading || incidentCount === null || incidentCount === 0}
              className="relative overflow-hidden group rounded-xl bg-gray-600 
                text-white font-medium px-6 py-3 hover:shadow-lg disabled:opacity-50 
                transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
              <span className="relative flex items-center justify-center gap-2">
                <Minus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                Remove
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowResetDialog(true)}
            disabled={isUpdating || loading || incidentCount === null || incidentCount === 0}
            className="relative overflow-hidden group w-full rounded-xl bg-gradient-to-r from-rose-600 to-red-600 
              text-white font-medium px-6 py-3 hover:shadow-lg disabled:opacity-50 
              transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
            <span className="relative flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              Reset Counter
            </span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="relative overflow-hidden rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 backdrop-blur-xl" />
          <div className="relative">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-lg font-bold">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                  Reset Confirmation
                </span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-400">
                This will reset the incident counter to zero and clear the timer.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                className="rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white hover:shadow-lg"
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}