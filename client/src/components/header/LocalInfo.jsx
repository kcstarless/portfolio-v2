import { Box, CircularProgress, Link, Typography } from "@mui/material"
import { GetWeatherIcon } from "../Icon"
import { motion, AnimatePresence } from "framer-motion"
import { useLocalInfo } from "../../hooks/useLocalInfo"

const LocalInfo = () => {
  const {isLoaded, setHovered, currentItem } = useLocalInfo()

  if (!isLoaded) {
    return (
      <Box>
        <Typography><CircularProgress size={25}/></Typography>
      </Box>
    );
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
