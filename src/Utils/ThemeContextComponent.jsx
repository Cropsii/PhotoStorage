import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";


export const ThemeContextComponent = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return isSystemDark ? "dark" : "light";
  });

  const Toggle = () => {
    setMode((prev) => (prev == "light" ? "dark" : "light"));
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
