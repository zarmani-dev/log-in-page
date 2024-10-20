import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
