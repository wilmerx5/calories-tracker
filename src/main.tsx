import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ActivityProvider } from './context/ActivityContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityProvider>

      <App />
    </ActivityProvider>
  </StrictMode>,
)
