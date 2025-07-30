import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { getUserLocation } from "../../utils/locationUtils"
import weatherService from "../../services/weatherService"
import { GetWeatherIcon } from "../Icon"

const LocalInfo = () => {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUserLocation()
      .then((loc) => setLocation(loc))
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!location) return;

    weatherService
      .getWeather(location.latitude, location.longitude)
      .then((weather) => setWeather(weather))
      .catch((err) => setError(err.message));
  }, [location]);

  console.log(weather)

  if (error) {
    return (
      <Box>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!location || !weather) {
    return (
      <Box>
        <Typography>Loading location...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="localInfo" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {location.city} 
        <GetWeatherIcon iconName={weather.currentConditions.icon} /> 
        {weather.currentConditions.temp}°C 
      </Typography>
    </Box>
  );
};

export { LocalInfo }
