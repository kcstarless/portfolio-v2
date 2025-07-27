import { useSelector, useDispatch } from 'react-redux'
import { fetchTechs } from '../store/techSlice'
import { useEffect, useState } from 'react'
import projectService from '../services/projectService'
import * as helper from '../utils/projectUtils'

import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  Box,
  Tooltip,
} from '@mui/material'
import { GetTechIcon } from './Icon'

const ProjectForm = ({ user, onSuccess }) => {
  const dispatch = useDispatch()
  const techs = useSelector(state => state.techs.items)

  useEffect(() => {
    dispatch(fetchTechs())
  }, [dispatch])

  const techOptions = techs || []
  const [formData, setFormData] = useState(helper.initialFormData)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    const value = field === 'tech' ? e.target.value : e.target.value
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!helper.validate(formData, setErrors)) return

    const data = helper.prepData(formData, user)

    try {
      await projectService.create(data)
      setFormData(helper.initialFormData) // reset form after success
      if (onSuccess) onSuccess()
    } catch (error) {
      setErrors({ submit: error.response?.data?.error || 'Submission failed' })
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        value={formData.title}
        onChange={handleChange('title')}
        error={!!errors.title}
        helperText={errors.title}
      />

      <TextField
        label="Description"
        multiline
        rows={3}
        value={formData.description}
        onChange={handleChange('description')}
        error={!!errors.description}
        helperText={errors.description}
      />

      <FormControl error={!!errors.image}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          name="image"
          type="file"
          onChange={e => {
            setFormData({ ...formData, image: e.target.files[0] })
          }}
        />
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
          {formData.image && (
            <span style={{ marginLeft: 8 }}>{formData.image.name}</span>
          )}
        </label>
        {errors.image && (
          <FormHelperText>{errors.image}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.tech}>
          <ToggleButtonGroup
            value={formData.tech}
            onChange={(e, newTechs) => setFormData({ ...formData, tech: newTechs })}
            aria-label="tech stack"
            sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}
          >
            {techOptions.map((tech) => (
            <Tooltip title={tech.name}>
              <ToggleButton
                key={tech.id}
                value={tech.id}
                aria-label={tech.name}
              >
                  <GetTechIcon techName={tech.icon} size={20} />
              </ToggleButton>
            </Tooltip>
            ))}
          </ToggleButtonGroup>
        <FormHelperText>{errors.tech}</FormHelperText>
      </FormControl>

      <TextField
        label="Demo URL"
        value={formData.demoUrl}
        onChange={handleChange('demoUrl')}
        error={!!errors.demoUrl}
        helperText={errors.demoUrl}
      />

      <TextField
        label="GitHub URL"
        value={formData.githubUrl}
        onChange={handleChange('githubUrl')}
        error={!!errors.githubUrl}
        helperText={errors.githubUrl}
      />

      {errors.submit && (
        <FormHelperText error>{errors.submit}</FormHelperText>
      )}

      <Button type="submit" variant="contained" color="primary">
        Add New Project
      </Button>
    </Box>
  )
}

export { ProjectForm }