import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App as AntApp } from "antd";
import { RouterProvider } from "react-router";
import { router } from "./routes/Rout.jsx";
import { ProjectProvider } from "./Contexts/Providers/ProjectProvider.jsx";
import { ThemeContextProvider } from "./Contexts/Providers/ThemeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <ProjectProvider>
        <AntApp>
          <RouterProvider router={router}></RouterProvider>
        </AntApp>
      </ProjectProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
