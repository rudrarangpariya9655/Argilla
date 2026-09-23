"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Preloader } from "./Preloader";

type IntroState = {
  /** True once the preloader has finished (or was skipped). */
  ready: boolean;
};

const IntroContext = createContext<IntroState>({ ready: true });

export const useIntro = () => useContext(IntroContext);

const SESSION_KEY = "argilla:intro-seen";

function alreadySeen() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Private mode or blocked storage: just play the intro again.
    return false;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  // Rendered identically on server and first client paint to avoid hydration
  // mismatch; the preloader itself decides whether to run a full sequence.
  const [ready, setReady] = useState(false);

  const handleDone = useCallback(() => {
    setReady(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable — nothing to persist */
    }
  }, []);

  const value = useMemo<IntroState>(() => ({ ready }), [ready]);

  return (
    <IntroContext.Provider value={value}>
      <Preloader onDone={handleDone} skip={alreadySeen} />
      {children}
    </IntroContext.Provider>
  );
}
