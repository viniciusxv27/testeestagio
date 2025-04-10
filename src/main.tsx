import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ClientsPage from './pages/clients/index.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/clients" replace />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
