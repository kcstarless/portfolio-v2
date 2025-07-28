import { palette } from "../styles/theme"
import { IoMdLogOut, IoMdLogIn } from "react-icons/io"
import { MdArrowDropDown, MdArrowDropUp, MdDeleteForever } from "react-icons/md"
import { GrTechnology } from "react-icons/gr"
import { FcBiotech } from "react-icons/fc";
import { FaProjectDiagram, FaExternalLinkSquareAlt } from "react-icons/fa";
import { SiGithub } from "react-icons/si"
import { IconButton, Tooltip } from "@mui/material";

const iconMap = {
  logout: { component: IoMdLogOut, color: palette.text.secondary },  
  login: { component: IoMdLogIn, color: palette.text.secondary },
  arrowDown: { component: MdArrowDropDown, color: palette.text.primary }, 
  arrowUp: { component: MdArrowDropUp, color: palette.text.primary },  
  addTech: { component: GrTechnology, color: palette.primary.main },
  addProject: {component: FaProjectDiagram, color: palette.primary.main },
  github: { component: SiGithub, color: palette.text.primary},
  demolink: { component: FaExternalLinkSquareAlt, color: palette.text.primary },
  delete: { component: MdDeleteForever, color: palette.primary.main }
}

const GetIcon = ({ type, size = 25, ...props }) => {
    const iconEntry = iconMap[type]
    if (!iconEntry) return null;
    const { component: IconComponent, color } = iconEntry
    return <IconComponent color={color} size={size} {...props} />
}  

const GetTechIcon = ({ className, title, size = 30, ...props }) => (
  <Tooltip title={title}>
    <i className={className} style={{ fontSize: size }} {...props} />
  </Tooltip>
)

const GetIconButton = ({ title, type, href, target,  ...props}) => (
    <Tooltip title={title}>
      <IconButton href={href} target={target}>
        <GetIcon type={type} {...props} />
      </IconButton>
    </Tooltip>
)

export { GetIcon, GetTechIcon, GetIconButton }