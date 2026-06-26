import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#1e1e2e',
          color: '#e2e8f0',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '10px',
          fontSize: '0.9rem',
        },
      }}
    />
  </StrictMode>
)