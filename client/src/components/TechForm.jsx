import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createTech, deleteTech } from "../store/techSlice"
import { useNotification } from '../contexts/NotificationContext'
import { GetIcon, GetTechIcon } from "./Icon"
import { deviconList } from "../utils/deviconList"
import * as ut from '../utils/techUtils'
import {
  Button,
  TextField,
  Box,
  Typography,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

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

const TechForm = ({ user, onSuccess }) => {
  const dispatch = useDispatch()
  const { showFormNotification } = useNotification()

  const [formData, setFormData] = useState(ut.initialFormData)
  const [iconResults, setIconResults] = useState([])
  const [hoveredTech, setHoveredTech] = useState(null)

  const currentTechs = useSelector(state => state.techs.items)
  const projects = useSelector(state => state.projects.items) 

  const handleChange = (field) => (e) => {
    const value = e.target.value
    if (field === 'name') {
      setFormData({ ...formData, name: value, icon: '' })

      const search = value.trim().toLowerCase()
      setIconResults(
        deviconList.filter(icon =>
          icon.name.toLowerCase().includes(search) ||
          icon.class.toLowerCase().includes(search)
        )
      )
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const renderSearchedTechs = () => {
    if (iconResults.length === 0) {
      return <Typography sx={sxTechForm.fadedText}></Typography>
    }

    return iconResults.slice(0, 10).map((icon) => {
      const isSelected = formData.icon === icon.class
      return (
        <Box
          key={icon.class}
          sx={{
            ...sxTechForm.iconBox,
            ...(isSelected ? sxTechForm.iconBoxSelected : sxTechForm.iconBoxUnselected),
          }}
          onClick={() => setFormData({ ...formData, icon: icon.class, name: icon.name })}
        >
          <GetTechIcon className={icon.class} size={30} />
        </Box>
      )
    })
  }

  const renderCurrentTechs = () => {
    if (currentTechs.length === 0) {
      return <Typography sx={sxTechForm.fadedText}>No technologies added yet.</Typography>
    }

    return currentTechs.map((tech) => {
      return (
        <Box
          key={tech.icon}
          sx={{ ...sxTechForm.iconBox, ...sxTechForm.iconBoxUnselected, minWidth: 60 }}
          onMouseEnter={() => setHoveredTech(tech.icon)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          {hoveredTech === tech.icon ? (
            <Tooltip title={`delete ${tech.name}`}>
              <GetIcon
                type="delete"
                size="30"
                color='text.primary'
                onClick={() => handleDelete(tech.id || tech._id, tech.name)}
              />
            </Tooltip>
          ) : (
            <GetTechIcon className={tech.icon} size={30} />
          )}
        </Box>
      )
    })
  }

  const handleDelete = async (id, name) => {
    const techIcon = currentTechs.find(t => t.id === id || t._id === id)
    // console.log(techIcon)
    if (!techIcon) {
        showFormNotification('error', 'Technology icon not found.')
        return
    }

    // Check if tech is used in any project
    const isUsed = projects.some(project =>
        Array.isArray(project.tech) &&
        project.tech.some(t => t.icon === techIcon.icon)
    )

    if (isUsed) {
        showFormNotification('error', `${name} is used in projects.`)
        return
    }

    const confirm = window.confirm(`Are you sure you want to delete "${name}"?`)

    if (!confirm) return
        try {
            await dispatch(deleteTech(id)).unwrap()
            showFormNotification('info', `${name.charAt(0).toUpperCase() + name.slice(1)} deleted`)
        } catch (error) {
            showFormNotification('error', `Failed to delete: ${error.data.error}`)
        }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.icon || !formData.level) {
      showFormNotification('error', 'Please enter a name, level &  select an icon.')
      return
    }

    try {
      await dispatch(createTech(formData)).unwrap()
      setFormData(ut.initialFormData)
      setIconResults([])
      showFormNotification('info', `${formData.name} added to your technology list`)
    } catch (error) {
      showFormNotification('error', `Failed to add: ${error.data.error}`)
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={sxTechForm.formBox}
      onSubmit={handleSubmit}
    >
      <Box sx={sxTechForm.inputRow}>
        <TextField
          label="Technology Stack Search"
          value={formData.name}
          onChange={handleChange('name')}
          fullWidth
          sx={sxTechForm.searchInput}
        />

        <FormControl fullWidth sx={sxTechForm.selectInput}>
          <InputLabel id="tech-level-label">Level</InputLabel>
          <Select
            labelId="tech-level-label"
            value={formData.level}
            label="Level"
            onChange={handleChange('level')}
            required
          >
            {ut.levels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant='contained'color="primary">
          Add New Tech
        </Button>
      </Box>

      <Box sx={sxTechForm.iconResultsBox}>
        {renderSearchedTechs()}
      </Box>

      <Typography variant='h4' sx={sxTechForm.titleRow}>
        <GetIcon type="addTech" /> &nbsp; My Current Stack
      </Typography>

      <Box sx={sxTechForm.currentTechsBox}>
        {renderCurrentTechs()}
      </Box>
    </Box>
  )
}

export { TechForm }
