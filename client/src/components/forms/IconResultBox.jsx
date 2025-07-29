// components/tech/IconResultBox.jsx
import { Box } from '@mui/material'
import { GetTechIcon } from '../Icon'

const sx = {
  iconBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '2px solid',
    borderRadius: 1,
    p: 1,
    m: 1,
  },
  iconBoxSelected: {
    borderColor: 'secondary.main',
  },
  iconBoxUnselected: {
    borderColor: 'transparent',
  },
  iconResultsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0,
    mb: 1,
    minHeight: 70,
    alignSelf: 'center',
  },
}

export const IconResultBox = ({ iconResults, selectedIcon, selectIcon }) => {
  return (
    <Box sx={sx.iconResultsBox}>
      {iconResults.slice(0, 10).map(icon => {
        const isSelected = selectedIcon === icon.class
        return (
          <Box
            key={icon.class}
            sx={{
              ...sx.iconBox,
              ...(isSelected ? sx.iconBoxSelected : sx.iconBoxUnselected),
            }}
            onClick={() => selectIcon(icon)}
          >
            <GetTechIcon className={icon.class} size={30} />
          </Box>
        )
      })}
    </Box>
  )
}
