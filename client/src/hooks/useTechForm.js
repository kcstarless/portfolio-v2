import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTech, deleteTech, updateTech } from '../store/techSlice'
import { deviconList } from '../utils/deviconList'
import * as ut from '../utils/techUtils'

export const useTechForm = (showFormNotification) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(ut.initialFormData)
  const [iconResults, setIconResults] = useState([])
  const [hoveredTech, setHoveredTech] = useState(null)
  const [editingTech, setEditingTech] = useState(null)

  const techs = useSelector(state => state.techs.items)
  // const projects = useSelector(state => state.projects.items)
  const allProjects = useSelector((state) => state.projects.allItems)

  useEffect(() => {
    if (editingTech) {
      setFormData({
        id: editingTech.id,
        name: editingTech.name,
        icon: editingTech.icon || '',
        level: editingTech.level || '',
        comments: editingTech.comments || '',
      })
    } else {
      setFormData(ut.initialFormData)
    }
  }, [editingTech])

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
    
    const action = formData.id ? updateTech : createTech
    const actionLabel = formData.id ? 'updated' : 'added'

    try {
      await dispatch(action(formData)).unwrap()
      if (!formData.id) {
        setFormData(ut.initialFormData)
        setIconResults([])
      }
      showFormNotification('info', `${formData.name} ${actionLabel}`)
    } catch (error) {
      const message = error?.data?.error || error?.message || 'Unexpected error'
      showFormNotification('error', `Failed to ${actionLabel}: ${message}`)
    }
  }

  const handleDelete = async () => {
    const { id, name } = formData
    // console.log(allProjects)

    const techIcon = techs.find(t => t.id === id || t._id === id)
    if (!techIcon) {
      showFormNotification('error', 'Technology icon not found.')
      return
    }

    const isUsed = allProjects.some(project =>
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
      setFormData(ut.initialFormData)
      setEditingTech(null)
    } catch (error) {
      showFormNotification('error', `Failed to delete: ${error.data.error}`)
    }
  }

  const handleEdit = (tech) => {
    if (editingTech !== tech) {
      setEditingTech(tech)
    }
    if (editingTech === tech) {
      setEditingTech(null)
    }
  }

  return {
    formData,
    iconResults,
    hoveredTech,
    techs,
    editingTech,
    handleChange,
    selectIcon,
    handleDelete,
    handleSubmit,
    setHoveredTech,
    handleEdit,
  }
}
