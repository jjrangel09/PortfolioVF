import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/i18n'           // inicializa i18next antes de renderizar
import '@/styles/global.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
