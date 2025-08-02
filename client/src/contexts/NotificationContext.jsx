import { createContext, useContext, useState, useEffect } from "react"
import { Snackbar, Alert } from "@mui/material"

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        type: 'info',
        message: ''
    })

    const [formNotification, setFormNotification] = useState({
        open: false,
        type: 'info',
        message: ''
    })

    const showNotification = (type, message) =>{
        setNotification({ open: true, type, message })
    }

    const showFormNotification = (type, message) => {
        setFormNotification({ open: true, type, message})
    }

    const handleClose = () => {
        setNotification((prev) => ({ ...prev, open: false}))
        setFormNotification((prev) => ({ ...prev, open: false}))
    }

    useEffect(() => {
        if (notification.open) {
            const timer = setTimeout(handleClose, 3000)
            return () => clearTimeout(timer)
        }
        if (formNotification.open) {
            const timer = setTimeout(handleClose, 3000)
            return () => clearTimeout(timer)
        }
    }, [notification.open, formNotification.open])

    return (
        <NotificationContext.Provider value={{ showNotification, notification, showFormNotification, formNotification, handleClose }}>
            {children}
        </NotificationContext.Provider>
    )
}