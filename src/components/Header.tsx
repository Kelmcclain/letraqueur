import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { auth, signOut } from '../services/firebase';
import { User, LogOut } from 'lucide-react';

export default function Header() {
  const { user } = useApp();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Le Traqueur</h1>
            <p className="text-sm text-gray-600">{user?.displayName || user?.email}</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowPopup(!showPopup)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {showPopup && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setShowPopup(false)}
                >
                  <User className="w-4 h-4" />
                  Account
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}