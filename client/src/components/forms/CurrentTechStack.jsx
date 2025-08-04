import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { GetTechIcon } from '../Icon'

const CurrentTechStack = ({ disabled, techs, handleEdit, editingTech }) => {
  return (
    <Container>
      {techs.map((tech) => {
        const isSelected = editingTech?.id === tech.id
        return (
          <IconBox
            key={tech.icon}
            selected={isSelected}
            disabled={disabled}
            onClick={() => handleEdit(tech)}
          >
            <GetTechIcon className={tech.icon} size={30}/>
          </IconBox>
        )
      })}
    </Container>
  )
}

export { CurrentTechStack }

// Styled components placed below export
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0,
  marginTop: theme.spacing(1),
}))

const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected, disabled }) => ({
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
}))
