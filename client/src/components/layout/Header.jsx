import { HeaderLogin } from '../HeaderLogin'

import { Box, Typography } from '@mui/material'

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
    return (
        <Box component="header" sx={headerStyles.container}>
            <Typography variant="body1" sx={headerStyles.title}>
                Melbourne Weather Today
            </Typography>
            <Box>
                <HeaderLogin />
            </Box>
        </Box>
    )
}

export default Header