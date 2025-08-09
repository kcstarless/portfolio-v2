// src/components/Login.jsx
import { Box, Slide } from '@mui/material'
import { GetIconButton } from 'components/Icon'
import { AddDialog } from 'components/AddDialog'
import { ProjectForm } from 'components/forms/_ProjectForm'
import { TechForm } from 'components/forms/_TechForm'
import { LoginForm } from 'components/forms/_LoginForm'
import * as hooks from 'hooks'

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
  } = hooks.useLogin()

  if (user) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <AddDialog addType="tech">
          <TechForm />
        </AddDialog>

        <AddDialog addType="project">
          <ProjectForm />
        </AddDialog>

        <GetIconButton title='click to log out' onClick={handleLogout} size='large' iconName='logout' loading={loading} />
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

      <GetIconButton
        title={showLogin ? 'hide login form' : 'show login form'}
        onClick={() => setShowLogin(!showLogin)}
        aria-label={showLogin ? 'hide login form' : 'show login form'}
        aria-expanded={showLogin}
        aria-controls="login-form"
        size='large'
        iconName={showLogin ? 'arrowUp' : 'arrowDown'} 
        colorSelect='white'
      />
    </Box>
  )
}
