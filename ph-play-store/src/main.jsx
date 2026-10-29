import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from 'react-router';
import RootLayout from './layout/RootLayout';
import Homepage from './pages/homepage/Homepage';
import Apps from './pages/apps/Apps';
import InstallApps from './pages/Installapps/InstallApps';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/Notfound/NotFoundPage';

const router = createBrowserRouter([
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
