import { Box } from '@mui/material'
import { GetTechIcon } from '../Icon'

const sxCurrentTechStack = {
  container: (theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0,
    marginTop: theme.spacing(1),
  }),
  iconBox: ({ theme, selected, disabled }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '3px solid',
    borderColor: selected ? theme.palette.secondary.light : 'transparent',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    pointerEvents: disabled ? 'none' : 'auto',
    opacity: disabled ? 0.5 : 1,
  }),
}

const CurrentTechStack = ({ disabled, techs, handleEdit, editingTech }) => {
  return (
    <Box sx={sxCurrentTechStack.container}>
      {techs.map((tech) => {
        const isSelected = editingTech?.id === tech.id
        return (
          <Box
            key={tech.icon}
            sx={(theme) =>
              sxCurrentTechStack.iconBox({ theme, selected: isSelected, disabled })
            }
            onClick={() => handleEdit(tech)}
          >
            <GetTechIcon className={tech.icon} size={30} />
          </Box>
        )
      })}
    </Box>
  )
}

export { CurrentTechStack }
