import { Box } from '@mui/material'
import { GetTechIcon } from '../Icon'

const sxCurrentTechStack = {
  iconBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '3px solid transparent',
    borderRadius: 1,
    p: 1,
    m: 1,
  },
}

const CurrentTechStack = ({ techs, handleEdit, editingTech }) => {

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, mt: 1 }}>
      {techs.map((tech) => {
        const isSelected = editingTech?.id === tech.id

        return (
          <Box
            key={tech.icon}
            sx={{
              ...sxCurrentTechStack.iconBox,
              borderColor: isSelected ? 'secondary.light' : 'transparent',
            }}
          >
            <GetTechIcon
              className={tech.icon}
              size={30}
              onClick={() => handleEdit(tech)}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export { CurrentTechStack }
