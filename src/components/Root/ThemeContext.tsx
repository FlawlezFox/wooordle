import { PrimitiveAtom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { createContext, memo, useCallback, useEffect } from "react";

type Theme = "light" | "dark";

const themeAtom: PrimitiveAtom<Theme> = atomWithStorage<Theme>(
  "theme",
  "light"
);

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  theme: Theme;
  switchTheme: () => void;
};

const ThemeContext = createContext<ContextType>(
  undefined as unknown as ContextType
);

const ThemeProvider = memo(({ children }: Props) => {
  const [theme, setTheme] = useAtom(themeAtom);
  
  const switchTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle(`theme-dark`);
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
});

export { ThemeContext, ThemeProvider };
