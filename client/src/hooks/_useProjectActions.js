import { useDispatch, useSelector } from 'react-redux'
import * as stores from 'stores'
import * as hooks from 'hooks'

export const useProjectActions = () => {
  const dispatch = useDispatch()
  const { showNotification } = hooks.useNotification()
  const user = useSelector(state => state.auth.user)

  const handleDelete = async (project) => {
    if (!user) return
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) return
    
    try {
      await dispatch(stores.deleteProject(project.id)).unwrap()
      showNotification('info', `${project.title.charAt(0).toUpperCase() + project.title.slice(1)} deleted`)
    } catch (error) {
      showNotification('error', `Failed to delete: ${error.data.error}`)
    }
  }

  return { handleDelete }
}