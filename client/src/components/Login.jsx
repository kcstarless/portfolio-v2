import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { AddDialog } from './AddDialog'
import { ProjectForm } from './ProjectForm'
import { TechForm } from './TechForm'
import { useNotification } from '../contexts/NotificationContext'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser }from '../store/authSlice'

import { IconButton, Tooltip, Box, Slide, CircularProgress } from '@mui/material'
import { GetIcon } from './Icon'

export const Login = () => {
    const { showNotification } = useNotification()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showLogin, setShowLogin] = useState(false)

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            await dispatch(logoutUser()).unwrap()
            showNotification('info', 'you have successfully logged out')
        } catch (error) {
            showNotification('error', error)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const loggedInUser =await dispatch(loginUser({ username, password })).unwrap()
            setUsername('')
            setPassword('')
            setShowLogin(false)
            showNotification('info', `Welcome ${loggedInUser.name}`)
        } catch (error) {
            showNotification('error', error)
        }
    }

    if (user) {
        return (
            <Box display='flex' alignItems="center" gap={1}>
                <AddDialog addType="tech">
                    {({user, onSuccess}) => <TechForm user={user} onSuccess={onSuccess} />}
                </AddDialog>

                <AddDialog addType="project">
                    {({ user, onSuccess }) => <ProjectForm user={user} onSuccess={onSuccess} />}
                </AddDialog>

                <Tooltip title="Click to log out">
                    <IconButton onClick={handleLogout} aria-label="Log out" size="large">
                        {loading ? <CircularProgress size={25} /> : <GetIcon type='logout' />}
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
                    {showLogin ? <GetIcon type='arrowUp' /> : <GetIcon type='arrowDown' />}
                </IconButton>
            </Tooltip>
        </Box>
    )
}
