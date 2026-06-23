import { createBrowserRouter } from "react-router";
import App from "../App";
import { Main } from "../pages/Main";
import { AuthCheckProvider } from "../Contexts/Providers/AuthCheckProvider";

export const router = createBrowserRouter([
  { path: "/", Component: App },
  {
    element: <AuthCheckProvider />,
    children: [
      {
        path: "/main",
        element: <Main></Main>,
      },
    ],
  },
]);
