import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoginForm from './LoginForm'
import AddDialog from './AddDialog'
import ProjectForm from './ProjectForm'
import TechForm from './TechForm'

import { IconButton, Tooltip, Typography, Box, Slide } from '@mui/material'
import { MdArrowDropDown, MdArrowDropUp  } from "react-icons/md"
import { IoMdLogOut  } from "react-icons/io"


export const Login = () => {
    const { user, login, logout, errorMessage, loading } = useAuth()
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

    if (user) {
        return (
            <Box display='flex' alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ px: 1 }}>
                            {user.name} 
                </Typography>

                <AddDialog>
                    {({user, onSuccess}) => <TechForm user={user} onSuccess={onSuccess} />}
                </AddDialog>

                <AddDialog>
                    {({ user, onSuccess }) => <ProjectForm user={user} onSuccess={onSuccess} />}
                </AddDialog>

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
                <Box>
                    <LoginForm 
                        handleLogin={handleLogin}
                        password={password} 
                        setPassword={setPassword}
                        username={username}
                        setUsername={setUsername}
                        errorMessage={errorMessage}
                        loading={loading}
                    />
                </Box>
            </Slide>
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
        </Box>
    )
}
