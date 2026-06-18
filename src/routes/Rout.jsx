import { createBrowserRouter } from "react-router";
import App from "../App";
import { Main } from "../pages/Main";
import { AuthCheck } from "../Utils/AuthCheck";

export const router = createBrowserRouter([
  { path: "/", Component: App },
  {
    element: <AuthCheck />,
    children: [
      {
        path: "/main",
        element: <Main></Main>,
      },
    ],
  },
]);
