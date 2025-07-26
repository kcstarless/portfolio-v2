import { Header } from './components/Header'
import { Projects } from './components/Projects'
import { Box, Typography, Stack } from '@mui/material'

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Stack direction="row" flex={1}>
        <Box component="aside" width="350px" p={2} bgcolor="#f5f5f5">
          Sidebar
        </Box>

        <Box component="main" flex={1} p={2}>
          <Projects />
        </Box>
      </Stack>

      <Box component="footer" p={2} textAlign="center" bgcolor="#eee">
        <Typography variant="body2" color="text.secondary">
          © 2025 David Gim
        </Typography>
      </Box>
    </Box>
  )
}

export default App 