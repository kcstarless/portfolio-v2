import { Box, CircularProgress, Link, Typography } from "@mui/material"
import { GetWeatherIcon } from "../Icon"
import { motion, AnimatePresence } from "framer-motion"
import { useLocalInfo } from "../../hooks/useLocalInfo"
import { useSelector } from 'react-redux'

const LocalInfo = () => {
  const { setHovered, currentItem } = useLocalInfo()
  const loading = useSelector(state => state.auth.loading)
  // console.log(currentItem)
  if (loading || !currentItem) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"

      >
        <CircularProgress size={25} />
      </Box>
    )
  }

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id || currentItem.name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {currentItem.isWeather ? (
              <>
                <GetWeatherIcon iconName={currentItem.icon} />
                <Typography variant="localInfo">{currentItem.name}</Typography>
              </>
            ) : (
              <Typography variant="localInfo">
                {currentItem.url ? (
                  <Link
                    href={currentItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentItem.name}
                  </Link>
                ) : currentItem.isDemo ? (
                  <Link
                    component="button"
                    onClick={currentItem.onClick}
                    sx={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {currentItem.name}
                  </Link>
                ) : (
                  currentItem.name
                )}
              </Typography>
            )}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export { LocalInfo }