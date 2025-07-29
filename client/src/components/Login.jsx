// src/components/Login.jsx
import { Box, IconButton, Tooltip, Slide, CircularProgress } from '@mui/material'
import { GetIcon } from './Icon'
import { AddDialog } from './AddDialog'
import { ProjectForm } from './forms/_ProjectForm'
import { TechForm } from './forms/_TechForm'
import { LoginForm } from './forms/_LoginForm'
import { useLogin } from '../hooks/useLogin'

export const Login = () => {
  const {
    user,
    loading,
    username,
    setUsername,
    password,
    setPassword,
    showLogin,
    setShowLogin,
    handleLogin,
    handleLogout,
  } = useLogin()

  if (user) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <AddDialog addType="tech">
          {({ user, onSuccess }) => <TechForm user={user} onSuccess={onSuccess} />}
        </AddDialog>

        <AddDialog addType="project">
          {({ user, onSuccess }) => <ProjectForm user={user} onSuccess={onSuccess} />}
        </AddDialog>

        <Tooltip title="Click to log out">
          <IconButton onClick={handleLogout} aria-label="Log out" size="large">
            {loading ? <CircularProgress size={25} /> : <GetIcon type="logout" />}
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
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
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
          {showLogin ? <GetIcon type="arrowUp" /> : <GetIcon type="arrowDown" />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
