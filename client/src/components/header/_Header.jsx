import { Box, Alert } from '@mui/material';
import { Login } from './Login';
import { useNotification } from '../../contexts/NotificationContext';
import { LocalInfo } from './LocalInfo';

const sxHeader = {
  container: {
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }, 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'secondary.light',
    pl: 3,
    pr: 1,
    zIndex: 1000,
  },
  alert: {
    m: 0,
    p: 0,
    backgroundColor: 'transparent',
  },
};

const Header = () => {
  const { notification } = useNotification();

  return (
    <Box component="header" sx={sxHeader.container}>
      {notification.open ? (
        <Alert severity={notification.type} sx={sxHeader.alert}>
          {notification.message}
        </Alert>
      ) : (
        <LocalInfo />
      )}
      <Login />
    </Box>
  );
};

export { Header };
