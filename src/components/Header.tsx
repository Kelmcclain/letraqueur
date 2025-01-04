import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { auth, signOut } from '../services/firebase';
import { User, LogOut, Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '../hooks/use-toast';

export default function Header() {
  const { user } = useApp();
  const themeContext = useTheme();
  const theme = themeContext?.theme ?? 'light';
  const setTheme = themeContext?.setTheme ?? (() => {});
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: (error as Error).message,
        variant: "destructive",
        duration: 5000
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      <div className="relative">
        {/* Gradient background with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10" />
        <div className="absolute inset-0 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80" />
        
        {/* Border line with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20" />

        {/* Content */}
        <div className="relative container mx-auto">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo and user info */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Le Traqueur
                </h1>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 font-medium">
                  {user?.displayName || user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Theme toggle button */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="relative overflow-hidden group p-2 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-colors" />
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                ) : (
                  <Moon className="absolute w-5 h-5 text-indigo-600 dark:text-indigo-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                )}
              </button>

              {/* User menu dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative overflow-hidden group p-2 rounded-xl hover:shadow-lg transition-all duration-200">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-colors" />
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-indigo-200/50 dark:border-indigo-800/50">
                  <DropdownMenuLabel className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20" />
                  
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/letraqueur/account" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 transition-colors cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}