import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { NoteProvider } from './context/NoteContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <App />
          <ToastContainer position="bottom-right" />
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)