import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { OpportunitiesContextProvider } from './context/OpportunityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OpportunitiesContextProvider>
      <App />
    </OpportunitiesContextProvider>
  </StrictMode>,
)
