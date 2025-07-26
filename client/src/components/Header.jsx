import { Login } from './Login'
import { useNotification } from '../contexts/NotificationContext'
import { Box, Typography, Alert } from '@mui/material'

const headerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ccc',
    px: 1,
  },
  title: {
    color: 'text.primary',
  },
}

const Header = () => {
    const { notification } = useNotification()

    return (
        <Box component="header" sx={headerStyles.container}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  m: 0, p: 0 }}>
              {notification.open ? (
                <Alert
                  severity={notification.type}
                  sx={{ m: 0, p: 0, backgroundColor: 'transparent' }}
                >
                  {notification.message}
                </Alert>
              ) : (
                <Typography>Melbourne Weather</Typography>
              )}
            </Box>
            <Box>
                <Login />
            </Box>
        </Box>
    )
}

export { Header }