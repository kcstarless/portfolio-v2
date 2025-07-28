import { useSelector, useDispatch } from 'react-redux'
import { fetchTechs } from '../store/techSlice'
import { useEffect, useState } from 'react'
import { fetchProjects } from '../store/projectSlice'
import projectService from '../services/projectService'
import { GetTechIcon } from "./Icon";
import { useNotification } from '../contexts/NotificationContext'
import * as helper from '../utils/projectUtils'

import {
  Button,
  TextField,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  Box,
  Tooltip,
} from '@mui/material'

const ProjectForm = ({ user, onSuccess }) => {
  const dispatch = useDispatch()
  const { showFormNotification } = useNotification()
  const techs = useSelector(state => state.techs.items)
  const loading = useSelector(state => state.projects.status === 'loading')

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
      const created = await projectService.create(data)
      dispatch(fetchProjects())
      console.log(data)
      showFormNotification('info', `${created.title} added to your project list`)
      setFormData(helper.initialFormData) // reset form after success
    } catch (error) {
      showFormNotification('error', `Failed to add: ${error.data.error}`)
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
        disabled={loading} 
      />

      <TextField
        label="Description"
        multiline
        rows={3}
        value={formData.description}
        onChange={handleChange('description')}
        error={!!errors.description}
        helperText={errors.description}
        disabled={loading} 
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
          disabled={loading} 
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
            disabled={loading} 
          >
            {techOptions.map((tech) => (
            <Tooltip title={tech.name}>
              <ToggleButton
                key={tech.id}
                value={tech.id}
                aria-label={tech.name}
              >
                  <GetTechIcon className={tech.icon} size={30} />
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
        disabled={loading} 
      />

      <TextField
        label="GitHub URL"
        value={formData.githubUrl}
        onChange={handleChange('githubUrl')}
        error={!!errors.githubUrl}
        helperText={errors.githubUrl}
        disabled={loading} 
      />

      {errors.submit && (
        <FormHelperText error>{errors.submit}</FormHelperText>
      )}

      <Button type="submit" variant="contained" color="primary" disabled={loading} >
        Add New Project
      </Button>
    </Box>
  )
}

export { ProjectForm }