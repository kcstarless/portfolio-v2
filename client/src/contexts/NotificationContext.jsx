import { createContext, useContext, useState, useEffect } from "react"
import { Snackbar, Alert } from "@mui/material"

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

const useAutoClose = (open, closeFn, duration = 3000) => {
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(closeFn, duration)
    return () => clearTimeout(timer)
  }, [open, closeFn, duration])
}

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

  const showNotification = (type, message) => {
    setNotification({ open: true, type, message })
  }

  const showFormNotification = (type, message) => {
    setFormNotification({ open: true, type, message })
  }

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }))
  }

  const closeFormNotification = () => {
    setFormNotification(prev => ({ ...prev, open: false }))
  }

  useAutoClose(notification.open, closeNotification)
  useAutoClose(formNotification.open, closeFormNotification)

  return (
    <NotificationContext.Provider value={{
      showNotification,
      notification,
      showFormNotification,
      formNotification,
      handleClose: () => {
        closeNotification()
        closeFormNotification()
      }
    }}>
      {children}
    </NotificationContext.Provider>
  )
}
