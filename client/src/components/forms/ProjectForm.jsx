import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Box, TextField, Button, FormControl, FormHelperText } from '@mui/material'
import { fetchTechs } from '../../store/techSlice'
import { useNotification } from '../../contexts/NotificationContext'
import { useProjectForm } from '../../hooks/useProjectForm'
import { ImageUploadField } from './ImageUploadField'
import { TechToggleGroup } from './TechToggleGroup'

const ProjectForm = ({ user, onSuccess }) => {
  const dispatch = useDispatch()
  const { showFormNotification } = useNotification()
  const techs = useSelector(state => state.techs.items)
  const loading = useSelector(state => state.projects.status === 'loading')

  const {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleTechChange,
    handleSubmit,
  } = useProjectForm({ user, onSuccess, dispatch, showFormNotification })

  useEffect(() => {
    dispatch(fetchTechs())
  }, [dispatch])

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField label="Title" value={formData.title} onChange={handleChange('title')}
        error={!!errors.title} helperText={errors.title} disabled={loading} />

      <TextField label="Description" multiline rows={3} value={formData.description}
        onChange={handleChange('description')} error={!!errors.description}
        helperText={errors.description} disabled={loading} />

      <ImageUploadField
        value={formData.image}
        onChange={handleFileChange('image')}
        error={errors.image}
        disabled={loading}
      />

      <TechToggleGroup
        techs={techs}
        value={formData.tech}
        onChange={handleTechChange}
        error={errors.tech}
        disabled={loading}
      />

      <TextField label="Demo URL" value={formData.demoUrl}
        onChange={handleChange('demoUrl')} error={!!errors.demoUrl}
        helperText={errors.demoUrl} disabled={loading} />

      <TextField label="GitHub URL" value={formData.githubUrl}
        onChange={handleChange('githubUrl')} error={!!errors.githubUrl}
        helperText={errors.githubUrl} disabled={loading} />

      {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        Add New Project
      </Button>
    </Box>
  )
}

export { ProjectForm }
