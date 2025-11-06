import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PredictionPage from './Components/PredictionPage.tsx';
import RiskAnalytics from './Components/RiskAnalytics.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/predict', element: <PredictionPage /> },
  { path: '/analytics', element: <RiskAnalytics /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);