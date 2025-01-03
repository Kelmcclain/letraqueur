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
  const { incidentCount, incrementCount, decrementCount, resetCount, loading } =
    useApp();
  const { startTimer, resetTimer } = useTimer();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [lastAction, setLastAction] = useState<
    "increment" | "decrement" | null
  >(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = async () => {
    if (isUpdating || loading || incidentCount === null) return;
    setIsUpdating(true);
    try {
      await incrementCount();
      startTimer();
      setLastAction("increment");
      // Trigger button animation
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
      // Trigger button animation
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md mx-auto transition-all duration-300">
      {/* Counter Display */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Incident Counter
        </h3>
        <div className="relative min-h-[80px] flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
          ) : (
            <>
              <div className="text-4xl sm:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                {incidentCount ?? 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center absolute -bottom-6">
                Total Incidents
              </div>

              {lastAction && (
                <div
                  className={`absolute -right-1 sm:-right-2 -top-1 sm:-top-2 text-sm sm:text-base ${
                    lastAction === "increment" ? "text-red-500" : "text-green-500"
                  } animate-bounce-once`}
                >
                  {lastAction === "increment" ? "+1" : "-1"}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <button
            id="incrementBtn"
            onClick={handleIncrement}
            disabled={isUpdating || loading || incidentCount === null}
            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 
              transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span>Add</span>
          </button>

          <button
            id="decrementBtn"
            onClick={handleDecrement}
            disabled={isUpdating || loading || incidentCount === null || incidentCount === 0}
            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 
              text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 transform hover:scale-105 
              active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Minus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span>Remove</span>
          </button>
        </div>

        <button
          onClick={() => setShowResetDialog(true)}
          disabled={isUpdating || loading || incidentCount === null}
          className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 
            text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200 transform hover:scale-105 
            active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
          <span>Reset Counter</span>
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 border dark:border-gray-700 w-[95vw] max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400 text-base sm:text-lg">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
              Reset Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              This will reset the incident counter to zero and clear the timer.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}