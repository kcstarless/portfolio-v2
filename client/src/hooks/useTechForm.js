import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTech, deleteTech } from '../store/techSlice'
import { deviconList } from '../utils/deviconList'
import * as ut from '../utils/techUtils'

export const useTechForm = (showFormNotification) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(ut.initialFormData)
  const [iconResults, setIconResults] = useState([])
  const [hoveredTech, setHoveredTech] = useState(null)

  const techs = useSelector(state => state.techs.items)
  const projects = useSelector(state => state.projects.items)

  const handleChange = (field) => (e) => {
    const value = e.target.value
    if (field === 'name') {
      setFormData(prev => ({ ...prev, name: value, icon: '' }))
      const search = value.trim().toLowerCase()
      setIconResults(
        deviconList.filter(icon =>
          icon.name.toLowerCase().includes(search) ||
          icon.class.toLowerCase().includes(search)
        )
      )
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const selectIcon = (icon) => {
    setFormData({ name: icon.name, icon: icon.class, level: formData.level, comments: formData.comments })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.icon || !formData.level) {
      showFormNotification('error', 'Please enter a name, level & select an icon.')
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

  const handleDelete = async (id, name) => {
    const techIcon = techs.find(t => t.id === id || t._id === id)
    if (!techIcon) {
      showFormNotification('error', 'Technology icon not found.')
      return
    }

    const isUsed = projects.some(project =>
      Array.isArray(project.tech) && project.tech.some(t => t.icon === techIcon.icon)
    )
    
    if (isUsed) {
      showFormNotification('error', `${name} is used in projects.`)
      return
    }

    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      await dispatch(deleteTech(id)).unwrap()
      showFormNotification('info', `${name} deleted`)
    } catch (error) {
      showFormNotification('error', `Failed to delete: ${error.data.error}`)
    }
  }

  return {
    formData,
    iconResults,
    hoveredTech,
    techs,
    handleChange,
    selectIcon,
    handleDelete,
    handleSubmit,
    setHoveredTech,
  }
}
