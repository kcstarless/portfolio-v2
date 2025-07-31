import { Header } from './components/header/_Header'
import { Sidebar } from './components/sidebar/_Sidebar'
import { Projects } from './components/Projects'
import { Box, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechs } from './store/techSlice'
import { fetchProjects } from './store/projectSlice'
import { LoadingScreen } from './components/LoadingScreen'
import { useAppLoader } from './hooks/useAppLoader'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const dispatch = useDispatch()
  const step = useAppLoader()

  const [showLoader, setShowLoader] = useState(true)
  const fadeDuration = 1 // seconds

  useEffect(() => {
    dispatch(fetchTechs())
    dispatch(fetchProjects())
  }, [dispatch])

  // Hide loading screen after fade duration once "ready"
  useEffect(() => {
    if (step === 'ready') {
      const timer = setTimeout(() => setShowLoader(false), fadeDuration * 1000)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {showLoader && <LoadingScreen step={step} />}
      </AnimatePresence>

      {/* Main app content fades in after loader */}
      {!showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeDuration }}
        >
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box>
              <Header />
            </Box>
            <Stack direction="row" flex={1}>
              <Box component="aside" width="400px" p={0} bgcolor="#f5f5f5">
                <Sidebar />
              </Box>

              <Box component="main" flex={1} p={2} bgcolor="#f5f5f5">
                <Projects />
              </Box>
            </Stack>

            <Box component="footer" p={2} textAlign="center">
              <Typography variant="body2" color="text.primary">
                © 2025 David Gim
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </>
  )
}

export default App
