import { useState, useEffect } from 'react'
import loginService from '../services/login'
import projectService from '../services/project'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedUserJSON = window.localStorage.getItem('currentUser')
        if (savedUserJSON) {
            const savedUser = JSON.parse(savedUserJSON)
            setUser(savedUser)
            projectService.setToken(savedUser.token)
        }
    }, [])

    const login = async ({ username, password }) => {
        setLoading(true)
        await new Promise((res) => setTimeout(res, 1500))

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('currentUser', JSON.stringify(user))
            projectService.setToken(user.token)

            setUser(user)
            setErrorMessage(null)
            return true
        } catch(error) {
            // console.log('login failed: ', error)
            if (error.response) {
                const status = error.response.status
                const serverMessage = error.response.data?.error || 'Wrong credentials'

                if (status === 401) {
                    setErrorMessage(serverMessage)
                } else {
                    setErrorMessage(`Login failed: ${serverMessage}`)
                }
                } else {
                setErrorMessage("Network error or server not responding")
            }
            setTimeout(() => setErrorMessage(null), 2000)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        loginService.logout()
        projectService.setToken(null)
        setUser(null)
    }

  return { user, errorMessage, loading, login, logout }
}