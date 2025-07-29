import { Header } from './components/Header'
import { Sidebar } from './components/sidebar/_Sidebar'
import { Projects } from './components/Projects'
import { Box, Typography, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTechs } from './store/techSlice'
import { fetchProjects } from './store/projectSlice'

function App() {
  const dispatch = useDispatch() 
  
  useEffect(() => {
    dispatch(fetchTechs())
    dispatch(fetchProjects())
  }, [dispatch])

  return (
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
        <Typography variant="body2" color="text.primary" >
          © 2025 David Gim
        </Typography>
      </Box>
    </Box>
  )
}

export default App 