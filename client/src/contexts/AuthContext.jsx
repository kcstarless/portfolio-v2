// import { createContext, useContext, useState, useEffect } from "react"
// import { useNotification } from './NotificationContext'
// import authService from '../services/authService'
// import projectService from '../services/projectService'
// import techService from '../services/techService'

// const AuthContext = createContext()

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const { showNotification } = useNotification()

//     useEffect(() => {
//         const savedUserJSON = window.localStorage.getItem('currentUser')
//         if (savedUserJSON) {
//             const savedUser = JSON.parse(savedUserJSON)
//             setUser(savedUser)
//             projectService.setToken(savedUser.token)
//             techService.setToken(savedUser.token)
//         }
//     }, [])

//     const login = async ({ username, password }) => {
//         setLoading(true)
//         await new Promise((res) => setTimeout(res, 1500))

//         try {
//             const user = await authService.login({ username, password})
//             window.localStorage.setItem('currentUser', JSON.stringify(user))
//             projectService.setToken(user.token)
//             techService.setToken(user.token)
//             setUser(user)
//             showNotification('info', `Welcome ${user.name}`)
//             return true
//         } catch (error) {
//             let message = 'netwokr error or server not responding'
//             if(error.response) {
//                 const status = error.response.status
//                 const serverMessage = error.response.data?.error || 'wrong credentials'
//                 message = status === 401 ? serverMessage : `login failed: ${serverMessage}`
//             }
//             showNotification('error', message)
//             return false
//         } finally {
//             setLoading(false)
//         }
//     }

//     const logout = async () => {
//         setLoading(true)
//         await new Promise((res) => setTimeout(res, 1500))

//         authService.logout()
//         projectService.setToken(null)
//         techService.setToken(null)

//         setUser(null)
//         setLoading(false)
//         showNotification('info', 'you have successfully logged out')
//     }

//     return (
//         <AuthContext.Provider value={{ user, loading, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

