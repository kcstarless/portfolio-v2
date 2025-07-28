// src/components/forms/LoginForm.jsx
import { Box, TextField, IconButton, Tooltip, CircularProgress } from '@mui/material'
import { GetIcon } from '../Icon'

export const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  loading,
}) => {
  return (
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
      <TextField
        id="username-input"
        disabled={loading}
        placeholder="Username"
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
        size="small"
      />

      <Tooltip title="Click to Log in">
        <IconButton type="submit" aria-label="Log in" size="large" sx={{ ml: -1 }}>
          {loading ? <CircularProgress size={25} /> : <GetIcon type="login" />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
