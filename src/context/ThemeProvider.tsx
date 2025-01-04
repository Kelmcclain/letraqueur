// ThemeProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{ theme: string; setTheme: (theme: string) => void } | undefined>(undefined);

import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
