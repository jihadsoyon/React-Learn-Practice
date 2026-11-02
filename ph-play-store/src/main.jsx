import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/Routes';
import InstalledAppsProvider from './context/InstalledAppsContext';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InstalledAppsProvider>
    <RouterProvider router={router} />
    </InstalledAppsProvider>
  </StrictMode>,
)
