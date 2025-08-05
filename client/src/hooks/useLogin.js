// src/hooks/useLogin.js
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../store/authSlice'
import { useNotification } from '../contexts/NotificationContext'

export const useLogin = () => {
  const dispatch = useDispatch()
  const { showNotification } = useNotification()

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)

  const [username, setUsername] = useState('demo')
  const [password, setPassword] = useState('DemoDemo8!')
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loggedInUser = await dispatch(loginUser({ username, password })).unwrap()
      setUsername('')
      setPassword('')
      setShowLogin(false)
      showNotification('info', `Welcome ${loggedInUser.name}`)
    } catch (err) {
      showNotification('error', err)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await dispatch(logoutUser()).unwrap()
      showNotification('info', 'You have successfully logged out')
    } catch (err) {
      showNotification('error', err)
    }
  }

  return {
    user,
    loading,
    error,
    username,
    setUsername,
    password,
    setPassword,
    showLogin,
    setShowLogin,
    handleLogin,
    handleLogout,
  }
}
