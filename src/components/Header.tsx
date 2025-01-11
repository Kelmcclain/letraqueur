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
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        {/* Modern gradient background with enhanced blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-fuchsia-500/5 to-indigo-600/5" />
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/70 dark:bg-gray-950/80" />
        
        {/* Animated border line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 animate-pulse" />
        </div>

        {/* Main content */}
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="flex h-20 items-center justify-between">
              {/* Logo and user section with enhanced typography */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/peak-suprstate-384109.appspot.com/o/public%2Flt1.jpeg?alt=media&token=9af95724-a6b9-48ab-adff-6224f12800a7" 
                    alt="Le Traqueur Logo" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
                      Le Traqueur
                    </span>
                  </h1>
                </div>
                
                <div className="hidden md:block border-l-2 border-indigo-100 dark:border-indigo-900 pl-6">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Welcome back,
                  </p>
                  <p className="text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    {user?.displayName || user?.email}
                  </p>
                </div>
              </div>

              {/* Actions section with modern interactive elements */}
              <div className="flex items-center space-x-4">
                {/* Theme toggle with enhanced animation */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="relative p-2.5 rounded-xl hover:ring-2 ring-violet-200 dark:ring-violet-800 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                  {theme === 'light' ? (
                    <Sun className="w-5 h-5 text-violet-600 dark:text-violet-400 transform hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-violet-600 dark:text-violet-400 transform hover:-rotate-90 transition-transform duration-300" />
                  )}
                </button>

                {/* User menu dropdown with modern styling */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2.5 rounded-xl hover:ring-2 ring-violet-200 dark:ring-violet-800 transition-all duration-300">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                      <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="end" className="w-64 p-2 backdrop-blur-2xl bg-white/90 dark:bg-gray-950/90 border border-violet-200/50 dark:border-violet-800/50 rounded-xl shadow-xl">
                    <DropdownMenuLabel className="px-2 py-3">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        {user?.email}
                      </p>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator className="bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 my-2" />
                    
                    <DropdownMenuItem asChild>
                      <Link to="/letraqueur/account" className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 transition-colors cursor-pointer">
                        <Settings className="mr-3 h-4 w-4 text-violet-600 dark:text-violet-400" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 transition-colors cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4 text-violet-600 dark:text-violet-400" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}