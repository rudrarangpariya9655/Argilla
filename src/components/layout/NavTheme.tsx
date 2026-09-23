"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type NavThemeApi = {
  /** Tone of the content sitting directly under the navbar at scroll top. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const NavThemeContext = createContext<NavThemeApi>({
  theme: "light",
  setTheme: () => {},
});

export const useNavTheme = () => useContext(NavThemeContext);

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <NavThemeContext.Provider value={value}>
      {children}
    </NavThemeContext.Provider>
  );
}

/**
 * Declares the tone of a page's hero so the navbar can invert its own colours.
 * Drop `<HeroTheme theme="dark" />` at the top of any page with a dark hero;
 * it resets to light automatically when the page unmounts.
 */
export function HeroTheme({ theme }: { theme: Theme }) {
  const { setTheme } = useNavTheme();

  useEffect(() => {
    setTheme(theme);
    return () => setTheme("light");
  }, [theme, setTheme]);

  return null;
}
