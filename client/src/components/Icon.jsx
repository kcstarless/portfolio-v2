import { palette } from "../styles/theme"
import { IoMdLogOut, IoMdLogIn } from "react-icons/io"
import { MdArrowDropDown, MdArrowDropUp, MdDeleteForever } from "react-icons/md"
import { FcBiotech } from "react-icons/fc";
import { FaProjectDiagram, FaExternalLinkSquareAlt } from "react-icons/fa";
import { SiGithub } from "react-icons/si"
import * as SiIconsTechs from "react-icons/si"

const iconMap = {
  logout: { component: IoMdLogOut, color: palette.primary.main },  
  login: { component: IoMdLogIn, color: palette.primary.main },
  arrowDown: { component: MdArrowDropDown, color: palette.primary.main }, 
  arrowUp: { component: MdArrowDropUp, color: palette.primary.main },  
  addTech: { component: FcBiotech, color: palette.secondary.main },
  addProject: {component: FaProjectDiagram, color: palette.secondary.main },
  github: { component: SiGithub, color: palette.primary.main},
  demolink: { component: FaExternalLinkSquareAlt, color: palette.primary.main },
  delete: { component: MdDeleteForever, color: palette.primary.main }
}

const GetIcon = ({ type, size = 25, ...props }) => {
    const iconEntry = iconMap[type]
    if (!iconEntry) return null;
    const { component: IconComponent, color } = iconEntry
    return <IconComponent color={color} size={size} {...props} />
}  

const GetTechIcon = ({ techName, size= 30, ...props }) => {
    const Icon = SiIconsTechs[techName]
    if (!Icon) return null
    return <Icon size={size} {...props} />
}


export { GetIcon, GetTechIcon }