import { useSelector } from 'react-redux'
import { Box, CircularProgress, Tooltip } from '@mui/material'
import { GetTechIcon, GetIcon } from '../Icon'

const sxCurrentTechStack = {
  iconBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    borderRadius: 1,
    p: 1,
    m: 1,
    minWidth: 60,
  },
}

const CurrentTechStack = ({ techs, hoveredTech, setHoveredTech, handleDelete, handleEdit }) => {
  const deletingId = useSelector((state) => state.techs.deletingId)

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, mt: 1 }}>
      {techs.map((tech) => (
        <Box
          key={tech.icon}
          sx={sxCurrentTechStack.iconBox}
          onMouseEnter={() => setHoveredTech(tech.icon)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          {deletingId === tech.id || deletingId === tech._id ? (
            // Show loading spinner if this tech is being deleted
            <CircularProgress size={24} />
          ) : hoveredTech === tech.icon ? (
            // Show delete button only if hovered and not deleting
            <Tooltip title={`delete ${tech.name}`}>
              <GetIcon
                iconName="delete"
                size={30}
                onClick={() => handleDelete(tech.id || tech._id, tech.name)}
                sx={{ cursor: 'pointer' }}
              />
            </Tooltip>
          ) : (
            // Otherwise show the tech icon
            <GetTechIcon className={tech.icon} size={30} />
          )}
        </Box>
      ))}
    </Box>
  )
}

export { CurrentTechStack }
