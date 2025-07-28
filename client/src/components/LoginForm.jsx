import { IconButton, Tooltip, Box, TextField, CircularProgress } from '@mui/material'
import { GetIcon } from './Icon'

const LoginForm = (props) => {
    return (
        <Box
            component="form"
            id="login-form"
            onSubmit={props.handleLogin}
            aria-labelledby="login-form-title"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {/* <Typography variant="h6" id="login-form-title">
                Login
            </Typography> */}

            <TextField
                id="username-input"
                disabled={props.loading}
                placeholder='Username'
                variant="outlined"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
                autoComplete="username"
                required
                size="small"
            />

            <TextField
                id="password-input"
                disabled={props.loading}
                type="password"
                variant="outlined"
                placeholder='Password'
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                autoComplete="current-password"
                required
                size="small"
            />

            <Tooltip title="Click to Log in">
                <IconButton type='submit' aria-label="Log in" size="large" sx={{ ml: -1}}>
                    {props.loading ? (
                        <CircularProgress size={25} />
                    ) : (
                        <GetIcon type='login' />
                    )}
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export { LoginForm }