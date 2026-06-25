import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme != "auto") {
      document.documentElement.setAttribute("data-theme", localTheme);
      return localTheme;
    }
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return isSystemDark ? "dark" : "light";
  });

  const Toggle = () => {
    setMode((prev) => {
      switch (prev) {
        case "light":
          localStorage.setItem("theme", "dark");
          return "dark";
        case "dark":
          localStorage.setItem("theme", "auto");
          return "auto";
        default:
          localStorage.setItem("theme", "light");
          return "light";
      }
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, Toggle }}>
      <ConfigProvider
        theme={{
          algorithm:
            mode == "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
