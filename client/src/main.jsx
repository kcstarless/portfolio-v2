// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/theme.js'
import { Provider } from 'react-redux'
import 'modern-css-reset'
import './styles/index.css'
import store from './store/index.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
      <NotificationProvider>
            <Provider store={store}>
                <App />
            </Provider>
      </NotificationProvider>
  </ThemeProvider>

)
