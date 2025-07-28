import { Box, Tooltip } from '@mui/material'
import { GetIcon, GetTechIcon } from '../Icon'

const sx = {
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

const CurrentTechStack = ({ techs, hoveredTech, setHoveredTech, handleDelete }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, mt: 1 }}>
    {techs.map((tech) => (
      <Box
        key={tech.icon}
        sx={sx.iconBox}
        onMouseEnter={() => setHoveredTech(tech.icon)}
        onMouseLeave={() => setHoveredTech(null)}
      >
        {hoveredTech === tech.icon ? (
          <Tooltip title={`delete ${tech.name}`}>
            <GetIcon
              type="delete"
              size={30}
              onClick={() => handleDelete(tech.id || tech._id, tech.name)}
            />
          </Tooltip>
        ) : (
          <GetTechIcon className={tech.icon} size={30} />
        )}
      </Box>
    ))}
  </Box>
)

export { CurrentTechStack }
