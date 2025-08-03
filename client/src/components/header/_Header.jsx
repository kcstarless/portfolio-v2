import { Login } from './Login'
import { useNotification } from '../../contexts/NotificationContext'
import { Box, Typography, Alert } from '@mui/material'
import { LocalInfo } from './LocalInfo';

const sxHeader = {
  container: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    // flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'secondary.light',
    px: 1,
    zIndex: '1000'
  },
  leftBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: 0,
    p: 0,
    ml: 2,
  },
  alert: {
    m: 0,
    p: 0,
    backgroundColor: 'transparent',
  },
  title: {
    color: 'text.primary',
  },
  rightBox: {

  },
};

const Header = () => {
  const { notification } = useNotification();

  return (
    <Box component="header" sx={sxHeader.container}>
      <Box sx={sxHeader.leftBox}>
        {notification.open ? (
          <Alert severity={notification.type} sx={sxHeader.alert}>
            {notification.message}
          </Alert>
        ) : (
          <LocalInfo />
        )}
      </Box>
      <Box sx={sxHeader.rightBox}>
        <Login />
      </Box>
    </Box>
  );
};

export { Header };
