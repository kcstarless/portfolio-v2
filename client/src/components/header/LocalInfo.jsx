import { useEffect, useState } from "react";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { getUserLocation } from "../../utils/locationUtils";
import weatherService from "../../services/weatherService";
import ticketmasterService from "../../services/ticketmasterService";
import { GetWeatherIcon } from "../Icon";
import { motion, AnimatePresence } from "framer-motion";

const LocalInfo = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then((loc) => setLocation(loc))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!location) return;
    const lat = location.latitude;
    const lon = location.longitude;

    weatherService
      .getWeather(lat, lon)
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message));

    ticketmasterService
      .getLocalEvents(lat, lon)
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message));
  }, [location]);

  //// Combine weather + events into one list
  const combinedItems =
    !location || !weather || !events
      ? []
      : [
          {
            id: "weather-start",
            name: `${location.city} - ${weather.currentConditions.temp}°C`,
            icon: weather.currentConditions.icon,
            isWeather: true,
          },
          {
            name: 'Your local events & tickets'
          },
          ...events,
        ];

  useEffect(() => {
    if (combinedItems.length === 0) return;

    const interval = setInterval(() => {
      if (!hovered) {
        setIndex((prev) => (prev + 1) % combinedItems.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [combinedItems.length, hovered]);

  if (error) {
    return (
      <Box>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!location || !weather || !events || events.length === 0) {
    return (
      <Box>
        <Typography><CircularProgress size={25}/></Typography>
      </Box>
    );
  }

  const currentItem = combinedItems[index];

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

export { LocalInfo };
