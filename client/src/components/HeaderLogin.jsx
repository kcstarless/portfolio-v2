import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { IconButton, Tooltip, Typography, Box, TextField, Slide, Alert, CircularProgress } from '@mui/material'
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoMdLogIn, IoMdLogOut  } from "react-icons/io";


export const HeaderLogin = () => {
    const { user, errorMessage, loading, login, logout } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showLogin, setShowLogin] = useState(false)

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const success = await login({ username, password })
        if (success) {
            setUsername('')
            setPassword('')
            setShowLogin(false)
        }
    }

    const loginForm = () => (
        <Box
            component="form"
            id="login-form"
            onSubmit={handleLogin}
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

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField
                id="username-input"
                disabled={loading}
                placeholder='Username'
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                size="small"
            />

            <TextField
                id="password-input"
                disabled={loading}
                type="password"
                variant="outlined"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                size="small"
            />

            <Tooltip title="Click to Log in">
                <IconButton type='submit' aria-label="Log in" size="large">
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <IoMdLogIn size='30' />
                    )}
                </IconButton>
            </Tooltip>
        </Box>
    )

    const toggleLoginForm = () => (
        <Tooltip title={showLogin ? 'Hide login form' : 'Show login form'}>
            <IconButton
                type="button"
                onClick={() => setShowLogin(!showLogin)}
                aria-label={showLogin ? 'Hide login form' : 'Show login form'}
                aria-expanded={showLogin}
                aria-controls="login-form"
                size="large"
                >
                {showLogin ? <MdArrowDropUp color='navy' size='30' /> : <MdArrowDropDown color='navy' size='30' />}
            </IconButton>
        </Tooltip>
    )

    if (user) {
        return (
            <Box display='flex' alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                            {user.name} 
                </Typography>
                <Tooltip title="Click to log out">
                    <IconButton onClick={handleLogout} aria-label="Log out" size="large">
                        <IoMdLogOut />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Slide direction="top" in={showLogin} mountOnEnter unmountOnExit>
                <Box>{loginForm()}</Box>
            </Slide>
            {toggleLoginForm()}
        </Box>
    )
}
