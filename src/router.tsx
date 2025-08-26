import { createBrowserRouter } from "react-router";

// Layouts
import { RootLayout } from "./pages/RootLayout";
import { AnimalsLayout } from "./pages/AnimalsLayout";

// Pages
import { Start } from "./pages/Start";
import { AnimalsOverview } from "./pages/AnimalsOverview";
import { Animal } from "./pages/Animal";

// Error pages
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Start />,
        index: true,
      },
      {
        path: "/animals",
        element: <AnimalsLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <AnimalsOverview />
            },
            {
                path: ":id",
                element: <Animal />
            },
        ],
      },
    ],
  },
]);