import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { ModalProvider } from '@/contexts/Modal'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
  </BrowserRouter>,
)