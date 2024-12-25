import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
createRoot(document.getElementById('MainDivRoute')!).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
