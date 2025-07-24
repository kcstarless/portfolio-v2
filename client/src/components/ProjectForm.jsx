import { useState } from 'react'
import useTech from '../hooks/useTech'
import { getTechIcon } from '../utils/helper'
import projectService from '../services/project'
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
  FormHelperText,
  Box,
} from '@mui/material'

const initialFormData = {
  title: '',
  description: '',
  tech: [],
  demoUrl: '',
  githubUrl: '',
  image: null,
}

const ProjectForm = ({ user, onSuccess }) => {
  const { techs } = useTech()
  const techOptions = techs || []
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.tech.length) newErrors.tech = 'At least one tech is required'
    if (!formData.demoUrl) newErrors.demoUrl = 'Demo URL is required'
    if (!formData.githubUrl) newErrors.githubUrl = 'GitHub URL is required'
    if (!formData.image) newErrors.image = 'Image is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field) => (e) => {
    const value = field === 'tech' ? e.target.value : e.target.value
    setFormData({ ...formData, [field]: value })
  }

  const techIcon = (name) => {
    const Icon = getTechIcon(name)
    return Icon ? <Icon /> : null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('demoUrl', formData.demoUrl)
    data.append('githubUrl', formData.githubUrl)
    data.append('user', user.id)
    data.append('image', formData.image)
    formData.tech.forEach(t => data.append('tech', t))

    try {
      await projectService.create(data)
      setFormData(initialFormData) // reset form after success
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
        <InputLabel>Tech Stack</InputLabel>
        <Select
          multiple
          value={formData.tech}
          onChange={handleChange('tech')}
          input={<OutlinedInput label="Tech Stack" />}
          renderValue={(selected) =>
            selected.map(id => techOptions.find(t => t.id === id)?.name).join(', ')
          }
        >
          {techOptions.map((tech) => (
            <MenuItem key={tech.id} value={tech.id}>
              <Checkbox checked={formData.tech.includes(tech.id)} />
              {techIcon(tech.icon)} &nbsp;
              <ListItemText primary={tech.name} />
            </MenuItem>
          ))}
        </Select>
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
        Submit
      </Button>
    </Box>
  )
}

export default ProjectForm