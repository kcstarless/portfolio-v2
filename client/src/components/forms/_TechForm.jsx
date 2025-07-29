import { Box, Button, TextField, Typography, Tooltip, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useNotification } from '../../contexts/NotificationContext'
import { GetIcon, GetTechIcon } from '../Icon'
import { IconResultBox } from './IconResultBox'
import { CurrentTechStack } from './CurrentTechStack'
import { useTechForm } from '../../hooks/useTechForm'
import * as ut from '../../utils/techUtils'

const sxTechForm = {
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    m: 1,
  },
  iconResultsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0,
    mb: 1,
    minHeight: 70,
    alignSelf: 'center',
  },
  currentTechsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0,
    mt: 1,
  },
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
  fadedText: {
    opacity: 0.7,
    alignSelf: 'center',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  searchInput: {
    flex: 2,
  },
  selectInput: {
    flex: 1,
  },
  titleRow: {
    mt: 2,
    p: 0,
    display: 'flex',
    alignItems: 'center',
  },
}

const TechForm = ({ user }) => {
  const { showFormNotification } = useNotification()

  const {
    formData,
    iconResults,
    hoveredTech,
    techs,
    handleChange,
    selectIcon,
    handleDelete,
    handleSubmit,
    setHoveredTech
  } = useTechForm(showFormNotification)

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={sxTechForm.formBox}>
      <Box sx={sxTechForm.inputRow}>
        <TextField
          label="Technology Stack Search"
          value={formData.name}
          onChange={handleChange('name')}
          sx={sxTechForm.searchInput}
        />
        <FormControl sx={sxTechForm.selectInput}>
          <InputLabel id="tech-level-label">Level</InputLabel>
          <Select
            labelId="tech-level-label"
            value={formData.level}
            label="Level"
            onChange={handleChange('level')}
          >
            {ut.levels.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Add New Tech</Button>
      </Box>

      <IconResultBox
        iconResults={iconResults}
        selectedIcon={formData.icon}
        selectIcon={selectIcon}
      />

      <Typography variant="h4" sx={sxTechForm.titleRow}>
        <GetIcon type="addTech" /> &nbsp; My Current Stack
      </Typography>

      <CurrentTechStack
        techs={techs}
        hoveredTech={hoveredTech}
        setHoveredTech={setHoveredTech}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

export { TechForm }
