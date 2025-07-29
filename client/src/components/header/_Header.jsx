import { Login } from './Login';
import { useNotification } from '../../contexts/NotificationContext';
import { Box, Typography, Alert } from '@mui/material';

const sxHeader = {
  container: {
    position: 'sticky',
    top: 0,
    display: 'flex',
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
          <Typography variant='localInfo' sx={sxHeader.title}>Melbourne Weather</Typography>
        )}
      </Box>
      <Box>
        <Login />
      </Box>
    </Box>
  );
};

export { Header };
