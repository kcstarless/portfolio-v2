import { useEffect, useState } from 'react'
import { Header } from './components/header/_Header'
import { Sidebar } from './components/sidebar/_Sidebar'
import { Projects } from './components/projects/_Projects'
import { LoadingScreen } from './components/LoadingScreen'
import { useAppLoader } from './hooks/_useAppLoader'
import { Box, Typography, Stack } from '@mui/material'
import { SmoothScroll } from './components/SmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const step = useAppLoader()

  const [showLoader, setShowLoader] = useState(true)
  const fadeDuration = 1 // seconds

  useEffect(() => {
    if (step === 'ready') {
      const timer = setTimeout(() => setShowLoader(false), fadeDuration * 1000)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <>
              <SmoothScroll>
      <AnimatePresence>
        {showLoader && <LoadingScreen step={step} />}
      </AnimatePresence>


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
              <Stack direction={{ xs: 'column', md: 'row' }}  flex={1}>
                <Box component="aside" width={{ xs: '100%', md: '400px' }} p={0}>
                  <Sidebar />
                </Box>

                <Box component="main" flex={1} p={2} bgcolor="#fff">
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
                </SmoothScroll>
    </>
  )
}

export default App
