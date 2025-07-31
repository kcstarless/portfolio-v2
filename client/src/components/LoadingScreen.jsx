import { Box, Typography } from "@mui/material";

const messages = {
  s1: "Waking up the server...",
  s2: "Server is ready...",
  s3: "Fetching app data...",
  s4: "Pre loading images from Tigris S3...",
  ready: "App ready!",
  error: "Something went wrong. Please try again.",
};

const sxLoadingScreen = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 1)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}


const  LoadingScreen = ({ step }) => {
  return (
    <Box sx={sxLoadingScreen} display="flex" flexDirection="column">
      <Typography fontSize={20}>Standby</Typography>


      <Typography
        sx={{
          fontWeight: 'bold',
          animation: 'colorCycle 10s linear infinite',
          '@keyframes colorCycle': {
            '0%': { color: '#f44336' },
            '25%': { color: '#2196f3' },
            '50%': { color: '#4caf50' },
            '75%': { color: '#ff9800' },
            '100%': { color: '#f44336' },
          },
        }}
      >
        {messages[step]}
      </Typography>
    </Box>
  )
}

export { LoadingScreen }