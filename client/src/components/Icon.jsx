import { IconButton, Tooltip, CircularProgress } from "@mui/material"
import * as utils from "utils"

const GetWeatherIcon = ({ iconName, size=25, color='inherit' }) => {
  const IconComponent = utils.weatherIconMap[iconName]
  if (!IconComponent) return null
  
  return (
    <Tooltip title={iconName}>
      <IconComponent size={size} color={color} />
    </Tooltip>
  )
}

const GetIcon = ({ iconName, size = 25, onClick, colorSelect }) => {
    const iconEntry = utils.iconMap[iconName]
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