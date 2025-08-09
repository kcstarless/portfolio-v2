import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as utils from 'utils'
import * as stores from 'stores'
import * as hooks from 'hooks'

export const useProjectForm = ({ project }) => {
  const [formData, setFormData] = useState(utils.projectFormData)
  const [editingProject, setEditingProject] = useState(null)
  const [errors, setErrors] = useState({})
  const { showFormNotification } = hooks.useNotification()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!editingProject) return
    console.log('edit triggered')
    if (editingProject) {
      console.log(editingProject)
      setFormData({
        id: editingProject._id || editingProject.id, 
        title: editingProject.title,
        description: editingProject.description,
        tech: editingProject.tech.map(t => (typeof t === 'string' ? t : t.id)), // store tech as array of tech ids
        demoUrl: editingProject.demoUrl,
        githubUrl: editingProject.githubUrl,
        image: editingProject.image,
      })
    } else {
      setFormData(utils.projectFormData)
    }
  }, [editingProject])

  useEffect(() => {
    if (project) {
      setEditingProject(project)
    } else {
      setEditingProject(null)
    }
  }, [project])

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
    setFormData(utils.projectFormData)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!utils.validateProject(formData, setErrors)) return

    const data = utils.prepareProjectData(formData, user)

    const action = formData.id ? stores.updateProject : stores.createProject
    const actionLabel = formData.id ? 'updated' : 'added'

    try {
      const result = await dispatch(action(data)).unwrap()
      showFormNotification('info', `${result.title} ${actionLabel}`)

      if (!formData.id) resetForm()
    } catch (error) {
      showFormNotification('error', `Failed to ${actionLabel}: ${error?.data?.error || 'Unknown error'}`)
    }
  }

  return {
    formData,
    errors,
    editingProject,
    handleChange,
    handleFileChange,
    handleTechChange,
    handleSubmit,
  }
}
