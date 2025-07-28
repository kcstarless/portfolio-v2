import { useState } from 'react'
import * as helper from '../utils/projectUtils'
import projectService from '../services/projectService'
import { fetchProjects } from '../store/projectSlice'

export const useProjectForm = ({ user, onSuccess, dispatch, showFormNotification }) => {
  const [formData, setFormData] = useState(helper.initialFormData)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleFileChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.files[0] }))
  }

  const handleTechChange = (e, newTechs) => {
    setFormData(prev => ({ ...prev, tech: newTechs }))
  }

  const resetForm = () => {
    setFormData(helper.initialFormData)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!helper.validate(formData, setErrors)) return

    const data = helper.prepData(formData, user)

    try {
      const created = await projectService.create(data)
      dispatch(fetchProjects())
      showFormNotification('info', `${created.title} added to your project list`)
      resetForm()
    //   if (onSuccess) onSuccess(created)
    } catch (error) {
      showFormNotification('error', `Failed to add: ${error?.data?.error || 'Unknown error'}`)
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleTechChange,
    handleSubmit,
  }
}
