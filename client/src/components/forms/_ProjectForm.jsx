import { useSelector } from 'react-redux'
import { Box, TextField, Button, FormHelperText } from '@mui/material'
import { ImageUploadField } from 'components/forms/ImageUploadField'
import { TechToggleGroup } from 'components/forms/TechToggleGroup'
import * as hooks from 'hooks'

const sxProjectForm = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
}

const ProjectForm = ({ project }) => {
  const techs = useSelector(state => state.techs.items)
  const loading = useSelector(state => state.projects.status === 'loading')

  const {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleTechChange,
    handleSubmit,
  } = hooks.useProjectForm({ project })

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={sxProjectForm.form}
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
        rows={5}
        value={formData.description}
        onChange={handleChange('description')}
        error={!!errors.description}
        helperText={errors.description}
        disabled={loading}
      />

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
        project={project}
      />

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

      {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {project ? 'Update Project' : 'Add New Project'}
      </Button>
    </Box>
  )
}

export { ProjectForm }
