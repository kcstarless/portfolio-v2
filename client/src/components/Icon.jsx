import { palette } from "../styles/theme"
import { IoMdLogOut, IoMdLogIn } from "react-icons/io"
import { MdArrowDropDown, MdArrowDropUp, MdDeleteForever } from "react-icons/md"
import { GrTechnology } from "react-icons/gr"
import { FaProjectDiagram, FaExternalLinkSquareAlt } from "react-icons/fa"
import { SiGithub } from "react-icons/si"
import { IconButton, Tooltip, CircularProgress } from "@mui/material"
import {
  IoMdSnow,
  IoMdRainy,
  IoMdThunderstorm,
  IoMdCloudyNight,
  IoMdPartlySunny,
  IoMdCloud,
  IoMdSunny,
  IoMdWater,
  IoMdMoon,
  IoMdCloudy,
} from "react-icons/io"

const iconMap = {
  logout: { component: IoMdLogOut, color: palette.text.secondary },  
  login: { component: IoMdLogIn, color: palette.text.secondary },
  arrowDown: { component: MdArrowDropDown, color: palette.secondary.main }, 
  arrowUp: { component: MdArrowDropUp, color: palette.secondary.main},  
  addTech: { component: GrTechnology, color: palette.primary.main },
  addProject: {component: FaProjectDiagram, color: palette.primary.main },
  github: { component: SiGithub, color: palette.secondary.light},
  demolink: { component: FaExternalLinkSquareAlt, color: palette.secondary.light },
  delete: { component: MdDeleteForever, color: palette.primary.main }
}

const weatherIconMap = {
  "snow": IoMdSnow,
  "snow-showers-day": IoMdSnow,
  "snow-showers-night": IoMdSnow,
  "thunder-rain": IoMdThunderstorm,
  "thunder-showers-day": IoMdThunderstorm,
  "thunder-showers-night": IoMdThunderstorm,
  "rain": IoMdRainy,
  "showers-day": IoMdRainy,
  "showers-night": IoMdRainy,
  "fog": IoMdWater,
  "wind": IoMdCloudy, // Not ideal, but closest available in Io set
  "cloudy": IoMdCloud,
  "partly-cloudy-day": IoMdPartlySunny,
  "partly-cloudy-night": IoMdCloudyNight,
  "clear-day": IoMdSunny,
  "clear-night": IoMdMoon,
}

const GetWeatherIcon = ({ iconName, size=25, color='inherit' }) => {
  const IconComponent = weatherIconMap[iconName]
  if (!IconComponent) return null
  
  return (
    <Tooltip title={iconName}>
      <IconComponent size={size} color={color} />
    </Tooltip>
  )
}

const GetIcon = ({ iconName, size = 25, onClick, colorSelect }) => {
    const iconEntry = iconMap[iconName]
    if (!iconEntry) return null

    const { component: IconComponent, color} = iconEntry

    return (
      <IconComponent 
        color={colorSelect ? colorSelect : color} 
        size={size} 
        onClick={onClick} 
      />
    )
}  

const GetTechIcon = ({ className, title, size = 30, ...props }) => (
  <Tooltip title={title}>
    <i className={className} style={{ fontSize: size }} {...props} />
  </Tooltip>
)

const GetIconButton = ({ iconName, loading, title, type, href, target, onClick, size, colorSelect, ...props}) => (
    <Tooltip title={title}>
      <IconButton 
        type={type} 
        href={href} 
        target={target} 
        onClick={onClick} 
        size={size} 
        {...props}
      >
        {loading ? <CircularProgress size={25} /> : <GetIcon iconName={iconName} colorSelect={colorSelect} />}
      </IconButton>
    </Tooltip>
)

export { GetIcon, GetTechIcon, GetIconButton, GetWeatherIcon }