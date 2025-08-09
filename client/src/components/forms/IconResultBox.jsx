// components/tech/IconResultBox.jsx
import { Box } from '@mui/material'
import { GetTechIcon } from 'components/Icon'

const sxIconResultBox = {
  container: (theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0,
    marginBottom: theme.spacing(1),
    minHeight: 70,
    alignSelf: 'center',
  }),
  iconBox: ({ theme, selected }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '2px solid',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderColor: selected ? theme.palette.secondary.main : 'transparent',
  }),
}

export const IconResultBox = ({ iconResults, selectedIcon, selectIcon }) => {
  return (
    <Box sx={(theme) => sxIconResultBox.container(theme)}>
      {iconResults.slice(0, 10).map((icon) => {
        const isSelected = selectedIcon === icon.class
        return (
          <Box
            key={icon.class}
            sx={(theme) =>
              sxIconResultBox.iconBox({ theme, selected: isSelected })
            }
            onClick={() => selectIcon(icon)}
          >
            <GetTechIcon className={icon.class} size={30} />
          </Box>
        )
      })}
    </Box>
  )
}
