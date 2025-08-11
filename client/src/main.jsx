/** /client/src/main.jsx */
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import { theme } from './styles/theme.js'
import { Provider } from 'react-redux'
// import 'modern-css-reset'
// import './styles/index.css'
import store from './stores/index.js'
import App from './App.jsx'
import 'devicon/devicon.min.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '#root': {
            maxWidth: 1290,
            height: '100%',
            margin: '0 auto',
            textAlign: 'center',
          },
        }}
      />
      <NotificationProvider>
            <Provider store={store}>
                <App />
            </Provider>
      </NotificationProvider>
  </ThemeProvider>

)
