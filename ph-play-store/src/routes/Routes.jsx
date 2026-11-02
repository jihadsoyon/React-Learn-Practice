import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/homepage/Homepage";
import Apps from "../pages/apps/Apps";
import InstallApps from "../pages/Installapps/InstallApps";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/Notfound/NotFoundPage";
import AppDetails from "../pages/AppsDetails/AppDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "/apps",
        element: <Apps />
      },
      {
       path: "/apps/:appID",
       element: <AppDetails />
      },
      {
        path: "/installedApps",
        element: <InstallApps />
      },
      {
        path: "/dashboard",
        element: <DashboardPage />
      }
    ],
    errorElement: <NotFoundPage />
  }
])