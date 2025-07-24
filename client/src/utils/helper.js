import * as SiIcons from 'react-icons/si'

const getTechIcon = (iconName) => SiIcons[iconName] || null

export { getTechIcon }