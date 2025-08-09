import { palette } from "../styles/theme"
import { IoMdLogOut, IoMdLogIn } from "react-icons/io"
import { MdArrowDropDown, MdArrowDropUp, MdDeleteForever, MdUpdate } from "react-icons/md"
import { GrTechnology } from "react-icons/gr"
import { FaProjectDiagram, FaExternalLinkSquareAlt } from "react-icons/fa"
import { SiGithub } from "react-icons/si"
import { RiFocus2Line } from "react-icons/ri"
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

export const iconMap = {
  logout: { component: IoMdLogOut, color: palette.text.secondary },  
  login: { component: IoMdLogIn, color: palette.text.secondary },
  arrowDown: { component: MdArrowDropDown, color: palette.secondary.main }, 
  arrowUp: { component: MdArrowDropUp, color: palette.secondary.main},  
  addTech: { component: GrTechnology, color: palette.primary.main },
  addProject: {component: FaProjectDiagram, color: palette.primary.main },
  github: { component: SiGithub, color: palette.secondary.light},
  demolink: { component: FaExternalLinkSquareAlt, color: palette.secondary.light },
  delete: { component: MdDeleteForever, color: palette.primary.main },
  updateProject: { component: MdUpdate , color: palette.primary.main },
  focus: {component: RiFocus2Line, color: palette.secondary.main },
}

export const weatherIconMap = {
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