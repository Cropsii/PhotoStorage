import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App as AntApp } from "antd";
import { ThemeContextComponent } from "./Utils/ThemeContextComponent.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Rout.jsx";
import { ProjectProvider } from "./Utils/ProjectProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextComponent>
      <ProjectProvider>
        <AntApp>
          <RouterProvider router={router}></RouterProvider>
        </AntApp>
      </ProjectProvider>
    </ThemeContextComponent>
  </StrictMode>,
);
