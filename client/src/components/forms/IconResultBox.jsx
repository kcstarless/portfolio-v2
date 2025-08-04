// components/tech/IconResultBox.jsx
import { Box, styled } from '@mui/material'
import { GetTechIcon } from '../Icon'

const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  border: '2px solid',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderColor: selected ? theme.palette.secondary.main : 'transparent',
}))

const IconResultsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0,
  marginBottom: theme.spacing(1),
  minHeight: 70,
  alignSelf: 'center',
}))

export const IconResultBox = ({ iconResults, selectedIcon, selectIcon }) => {
  return (
    <IconResultsBox>
      {iconResults.slice(0, 10).map((icon) => {
        const isSelected = selectedIcon === icon.class
        return (
          <IconBox
            key={icon.class}
            selected={isSelected}
            onClick={() => selectIcon(icon)}
          >
            <GetTechIcon className={icon.class} size={30} />
          </IconBox>
        )
      })}
    </IconResultsBox>
  )
}
